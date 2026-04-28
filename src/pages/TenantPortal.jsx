// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\pages\TenantPortal.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CreditCard,
  Download,
  FileText,
  Home,
  Loader2,
  Receipt,
  User,
  Wrench,
} from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { startRentCheckout } from "../services/paymentService";
import Toast from "../components/Toast";
import EmptyState from "../components/EmptyState";

function money(value) {
  return Number(value || 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

function isOverdue(payment) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    payment.paymentStatus === "overdue" ||
    (payment.dueDate &&
      payment.dueDate < today &&
      Number(payment.amountPaid || 0) < Number(payment.amountDue || 0))
  );
}

function TenantCard({ icon: Icon, label, value, tone = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${colors[tone]}`}>
        <Icon size={28} />
      </div>
      <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function TenantPortal() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();

  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [unit, setUnit] = useState(null);
  const [payments, setPayments] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!currentUser?.email && !userProfile?.tenantId) return undefined;

    setLoading(true);

    let tenantQuery;

    if (userProfile?.tenantId) {
      tenantQuery = query(
        collection(db, "tenants"),
        where("__name__", "==", userProfile.tenantId),
        limit(1)
      );
    } else {
      tenantQuery = query(
        collection(db, "tenants"),
        where("email", "==", currentUser.email),
        limit(1)
      );
    }

    const unsubscribe = onSnapshot(
      tenantQuery,
      async (snapshot) => {
        const tenantDoc = snapshot.docs[0];

        if (!tenantDoc) {
          setTenant(null);
          setProperty(null);
          setUnit(null);
          setPayments([]);
          setMaintenance([]);
          setLoading(false);
          return;
        }

        const tenantData = {
          id: tenantDoc.id,
          ...tenantDoc.data(),
        };

        setTenant(tenantData);

        if (tenantData.propertyId) {
          const propertySnap = await getDoc(doc(db, "properties", tenantData.propertyId));
          setProperty(
            propertySnap.exists()
              ? {
                  id: propertySnap.id,
                  ...propertySnap.data(),
                }
              : null
          );
        }

        if (tenantData.unitId) {
          const unitSnap = await getDoc(doc(db, "units", tenantData.unitId));
          setUnit(
            unitSnap.exists()
              ? {
                  id: unitSnap.id,
                  ...unitSnap.data(),
                }
              : null
          );
        }

        setLoading(false);
      },
      (error) => {
        setToast({
          type: "error",
          message: error.message || "Unable to load tenant profile.",
        });
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser?.email, userProfile?.tenantId]);

  useEffect(() => {
    if (!tenant?.id) return undefined;

    const paymentsQuery = query(
      collection(db, "rentPayments"),
      where("tenantId", "==", tenant.id),
      orderBy("dueDate", "desc")
    );

    const unsubscribe = onSnapshot(
      paymentsQuery,
      (snapshot) => {
        setPayments(
          snapshot.docs.map((paymentDoc) => ({
            id: paymentDoc.id,
            ...paymentDoc.data(),
          }))
        );
      },
      (error) => {
        setToast({
          type: "error",
          message: error.message || "Unable to load rent payments.",
        });
      }
    );

    return unsubscribe;
  }, [tenant?.id]);

  useEffect(() => {
    if (!tenant?.id) return undefined;

    const maintenanceQuery = query(
      collection(db, "maintenanceRequests"),
      where("tenantId", "==", tenant.id),
      limit(8)
    );

    const unsubscribe = onSnapshot(
      maintenanceQuery,
      (snapshot) => {
        setMaintenance(
          snapshot.docs.map((maintenanceDoc) => ({
            id: maintenanceDoc.id,
            ...maintenanceDoc.data(),
          }))
        );
      },
      () => {
        setMaintenance([]);
      }
    );

    return unsubscribe;
  }, [tenant?.id]);

  const summary = useMemo(() => {
    const unpaidPayments = payments.filter(
      (payment) => payment.paymentStatus !== "paid"
    );

    const balance = unpaidPayments.reduce((sum, payment) => {
      return (
        sum +
        Math.max(
          Number(payment.amountDue || 0) - Number(payment.amountPaid || 0),
          0
        )
      );
    }, 0);

    const overdueCount = payments.filter(isOverdue).length;
    const latestDue = unpaidPayments.sort((a, b) =>
      String(a.dueDate || "").localeCompare(String(b.dueDate || ""))
    )[0];

    return {
      balance,
      overdueCount,
      latestDue,
      paidCount: payments.filter((payment) => payment.paymentStatus === "paid").length,
    };
  }, [payments]);

  async function handlePay(paymentId) {
    setPayingId(paymentId);

    try {
      await startRentCheckout(paymentId);
    } catch (error) {
      setToast({
        type: "error",
        message:
          error.message ||
          "Unable to start payment. Make sure the payment server is running.",
      });
      setPayingId("");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-3xl bg-white p-8 text-xl font-black text-slate-700 shadow-sm">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          Loading tenant portal...
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="space-y-6">
        <EmptyState
          title="Tenant account is not connected yet"
          description="Ask the admin to connect your login email to a tenant record. The tenant email should match your login email, or your users profile should include tenantId."
        />

        <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-2xl font-black text-orange-900">
            Admin setup needed
          </h2>
          <p className="mt-2 text-lg font-bold text-orange-800">
            In Firestore, connect this user to a tenant:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-white p-5 text-sm font-bold text-slate-800">
{`users/{uid}
role: "tenant"
status: "active"
tenantId: "TENANT_DOCUMENT_ID"
propertyId: "PROPERTY_DOCUMENT_ID"
unitId: "UNIT_DOCUMENT_ID"

tenants/{tenantId}
email: "${currentUser?.email || "tenant@email.com"}"
userId: "${currentUser?.uid || "USER_UID"}"`}
          </pre>
        </div>

        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-950 to-blue-950 p-8 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.4em] text-blue-200">
              Tenant Portal
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Welcome, {tenant.fullName || currentUser?.displayName || "Tenant"}
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold text-slate-200">
              View rent balance, payment history, receipts, property details, and maintenance updates.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-100">
              Current Balance
            </p>
            <p className="mt-2 text-5xl font-black">{money(summary.balance)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <TenantCard
          icon={Home}
          label="Property"
          value={property?.propertyName || tenant.propertyName || "Assigned"}
          tone="blue"
        />
        <TenantCard
          icon={Building2}
          label="Unit"
          value={unit?.unitNumber || tenant.unitNumber || tenant.unitId || "N/A"}
          tone="green"
        />
        <TenantCard
          icon={AlertTriangle}
          label="Overdue"
          value={summary.overdueCount}
          tone={summary.overdueCount ? "red" : "slate"}
        />
        <TenantCard
          icon={Receipt}
          label="Paid Records"
          value={summary.paidCount}
          tone="orange"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-2xl font-black text-slate-950">Rent Payments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-500">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-500">
                    Amount Due
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-500">
                    Paid
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => {
                  const paid = payment.paymentStatus === "paid";
                  const overdue = isOverdue(payment);

                  return (
                    <tr key={payment.id} className="border-t border-slate-100">
                      <td className="px-6 py-4 text-lg font-bold text-slate-800">
                        {payment.dueDate || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-lg font-black text-slate-950">
                        {money(payment.amountDue)}
                      </td>
                      <td className="px-6 py-4 text-lg font-bold text-slate-700">
                        {money(payment.amountPaid)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-black uppercase ${
                            paid
                              ? "bg-emerald-100 text-emerald-700"
                              : overdue
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {paid ? "Paid" : overdue ? "Overdue" : payment.paymentStatus || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {paid ? (
                          <button
                            type="button"
                            onClick={() => navigate(`/receipt/${payment.id}`)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-base font-black text-white hover:bg-slate-800"
                          >
                            <Download size={20} />
                            Receipt
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handlePay(payment.id)}
                            disabled={payingId === payment.id}
                            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-base font-black text-white hover:bg-emerald-600 disabled:opacity-60"
                          >
                            <CreditCard size={20} />
                            {payingId === payment.id ? "Opening..." : "Pay Rent"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {!payments.length ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-lg font-bold text-slate-500">
                      No rent payment records yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <User className="text-blue-600" size={30} />
              <h2 className="text-2xl font-black text-slate-950">Tenant Details</h2>
            </div>

            <div className="mt-5 space-y-3 text-lg font-bold text-slate-700">
              <p>
                <span className="text-slate-950">Name:</span>{" "}
                {tenant.fullName || "N/A"}
              </p>
              <p>
                <span className="text-slate-950">Email:</span>{" "}
                {tenant.email || currentUser?.email}
              </p>
              <p>
                <span className="text-slate-950">Phone:</span>{" "}
                {tenant.phone || "N/A"}
              </p>
              <p>
                <span className="text-slate-950">Lease:</span>{" "}
                {tenant.leaseStartDate || "N/A"} - {tenant.leaseEndDate || "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Wrench className="text-orange-500" size={30} />
              <h2 className="text-2xl font-black text-slate-950">Maintenance</h2>
            </div>

            <div className="mt-5 space-y-3">
              {maintenance.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-lg font-black text-slate-950">
                    {item.issueTitle || "Maintenance Request"}
                  </p>
                  <p className="text-sm font-bold text-slate-500">
                    {item.status || "open"} • {item.priority || "medium"}
                  </p>
                </div>
              ))}

              {!maintenance.length ? (
                <p className="rounded-2xl bg-slate-50 p-4 text-base font-bold text-slate-500">
                  No maintenance requests yet.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="text-slate-700" size={30} />
              <h2 className="text-2xl font-black text-slate-950">Documents</h2>
            </div>

            <p className="mt-4 text-base font-bold text-slate-500">
              Future tenant documents, lease files, notices, and payment receipts can show here.
            </p>
          </div>
        </div>
      </section>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default TenantPortal;