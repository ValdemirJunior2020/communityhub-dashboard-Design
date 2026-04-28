// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\pages\PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Receipt } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(Boolean(paymentId));

  useEffect(() => {
    if (!paymentId) return undefined;

    const unsubscribe = onSnapshot(doc(db, "rentPayments", paymentId), (snapshot) => {
      if (snapshot.exists()) {
        setPayment({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [paymentId]);

  const paid = payment?.paymentStatus === "paid";

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        {loading || !paid ? (
          <>
            <Loader2 className="mx-auto animate-spin text-blue-600" size={60} />
            <h1 className="mt-6 text-4xl font-black text-slate-950">
              Payment is processing
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-600">
              Stripe is confirming the payment. This page will update when the webhook marks it paid.
            </p>
          </>
        ) : (
          <>
            <CheckCircle2 className="mx-auto text-emerald-500" size={70} />
            <h1 className="mt-6 text-4xl font-black text-slate-950">
              Rent payment received
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-600">
              Your rent payment has been recorded successfully.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to={`/receipt/${paymentId}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-lg font-black text-white hover:bg-slate-800"
              >
                <Receipt size={22} />
                View Receipt
              </Link>

              <Link
                to="/tenant-portal"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-lg font-black text-white hover:bg-blue-700"
              >
                Back to Tenant Portal
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;