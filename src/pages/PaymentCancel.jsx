// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\pages\PaymentCancel.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <AlertTriangle className="mx-auto text-orange-500" size={70} />

        <h1 className="mt-6 text-4xl font-black text-slate-950">
          Payment was cancelled
        </h1>

        <p className="mt-3 text-lg font-bold text-slate-600">
          No payment was recorded. You can return to the tenant portal and try again.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/tenant-portal"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-lg font-black text-white hover:bg-blue-700"
          >
            Back to Tenant Portal
          </Link>

          {paymentId ? (
            <Link
              to="/tenant-portal"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-lg font-black text-white hover:bg-slate-800"
            >
              Try Again
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PaymentCancel;