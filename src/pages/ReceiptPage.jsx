// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\pages\ReceiptPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Download, Printer, Receipt } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import LoadingSpinner from "../components/LoadingSpinner";
import { downloadReceiptHtml, getReceiptNumber } from "../services/receiptService";

function money(value) {
  return Number(value || 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

function ReceiptPage() {
  const { paymentId } = useParams();

  const [payment, setPayment] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [unit, setUnit] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const receiptNumber = useMemo(() => getReceiptNumber(paymentId), [paymentId]);

  useEffect(() => {
    async function loadReceiptData() {
      setLoading(true);

      const paymentSnap = await getDoc(doc(db, "rentPayments", paymentId));

      if (!paymentSnap.exists()) {
        setPayment(null);
        setLoading(false);
        return;
      }

      const paymentData = {
        id: paymentSnap.id,
        ...paymentSnap.data(),
      };

      setPayment(paymentData);

      const receiptSnap = await getDoc(doc(db, "receipts", paymentId));

      if (receiptSnap.exists()) {
        paymentData.receiptNumber = receiptSnap.data().receiptNumber;
      }

      if (paymentData.tenantId) {
        const tenantSnap = await getDoc(doc(db, "tenants", paymentData.tenantId));
        setTenant(
          tenantSnap.exists()
            ? {
                id: tenantSnap.id,
                ...tenantSnap.data(),
              }
            : null
        );
      }

      if (paymentData.propertyId) {
        const propertySnap = await getDoc(doc(db, "properties", paymentData.propertyId));
        setProperty(
          propertySnap.exists()
            ? {
                id: propertySnap.id,
                ...propertySnap.data(),
              }
            : null
        );
      }

      if (paymentData.unitId) {
        const unitSnap = await getDoc(doc(db, "units", paymentData.unitId));
        setUnit(
          unitSnap.exists()
            ? {
                id: unitSnap.id,
                ...unitSnap.data(),
              }
            : null
        );
      }

      const companySnap = await getDoc(doc(db, "settings", "company"));

      setCompany(
        companySnap.exists()
          ? {
              id: companySnap.id,
              ...companySnap.data(),
            }
          : {
              companyName: "Propel Properties",
              contactEmail: "",
              contactPhone: "",
              address: "",
            }
      );

      setLoading(false);
    }

    loadReceiptData();
  }, [paymentId]);

  function handleDownload() {
    downloadReceiptHtml({
      payment,
      tenant,
      property,
      unit,
      company,
    });
  }

  if (loading) {
    return <LoadingSpinner label="Loading receipt..." />;
  }

  if (!payment) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-black text-slate-950">Receipt not found</h1>
        <Link to="/tenant-portal" className="mt-5 inline-block font-black text-blue-600">
          Back to Tenant Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="no-print flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
            Rent Receipt
          </p>
          <h1 className="text-4xl font-black text-slate-950">{receiptNumber}</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white hover:bg-blue-700"
          >
            <Printer size={22} />
            Print / PDF
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-lg font-black text-white hover:bg-slate-800"
          >
            <Download size={22} />
            Download HTML
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 sm:flex-row">
          <div>
            <h2 className="text-4xl font-black text-slate-950">
              {company?.companyName || "Propel Properties"}
            </h2>
            <p className="mt-2 text-lg font-bold text-slate-500">
              {company?.address || "Property Management"}
            </p>
            <p className="text-lg font-bold text-slate-500">
              {company?.contactEmail || ""} {company?.contactPhone || ""}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase text-emerald-700">
              Paid
            </span>
            <p className="mt-3 text-lg font-black text-slate-950">
              Receipt # {receiptNumber}
            </p>
            <p className="text-lg font-bold text-slate-500">
              Paid Date: {payment.paidDate || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-black text-slate-950">
              <Receipt size={28} />
              Tenant
            </h3>

            <div className="space-y-3 text-lg font-bold text-slate-700">
              <p>
                <span className="text-slate-950">Name:</span>{" "}
                {tenant?.fullName || payment.tenantName || "Tenant"}
              </p>
              <p>
                <span className="text-slate-950">Email:</span>{" "}
                {tenant?.email || payment.tenantEmail || "N/A"}
              </p>
              <p>
                <span className="text-slate-950">Phone:</span>{" "}
                {tenant?.phone || "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6">
            <h3 className="mb-4 text-2xl font-black text-slate-950">
              Property / Unit
            </h3>

            <div className="space-y-3 text-lg font-bold text-slate-700">
              <p>
                <span className="text-slate-950">Property:</span>{" "}
                {property?.propertyName || payment.propertyName || payment.propertyId || "N/A"}
              </p>
              <p>
                <span className="text-slate-950">Unit:</span>{" "}
                {unit?.unitNumber || payment.unitNumber || payment.unitId || "N/A"}
              </p>
              <p>
                <span className="text-slate-950">Due Date:</span>{" "}
                {payment.dueDate || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-50 p-6">
          <h3 className="mb-4 text-2xl font-black text-slate-950">
            Payment Details
          </h3>

          <div className="grid gap-4 text-lg font-bold text-slate-700 md:grid-cols-2">
            <p>
              <span className="text-slate-950">Method:</span>{" "}
              {payment.paymentMethod || "stripe"}
            </p>
            <p>
              <span className="text-slate-950">Status:</span>{" "}
              {payment.paymentStatus || "paid"}
            </p>
            <p>
              <span className="text-slate-950">Stripe Session:</span>{" "}
              {payment.stripeSessionId || "N/A"}
            </p>
            <p>
              <span className="text-slate-950">Transaction:</span>{" "}
              {payment.stripePaymentIntentId || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-between rounded-3xl bg-slate-950 p-6 text-white">
          <span className="text-2xl font-black">Total Paid</span>
          <span className="text-3xl font-black">
            {money(payment.amountPaid || payment.amountDue)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReceiptPage;