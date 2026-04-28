// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\pages\ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus({
      loading: true,
      error: "",
      success: "",
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send password reset email.");
      }

      setStatus({
        loading: false,
        error: "",
        success:
          "Password reset email sent. Please check your inbox for the Community Hub reset link.",
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || "Unable to send password reset email.",
        success: "",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to login
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Mail size={30} />
          </div>

          <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
            Password Reset
          </p>

          <h1 className="mt-2 text-4xl font-black text-slate-950">
            Reset your password
          </h1>

          <p className="mt-3 text-base font-bold text-slate-600">
            Enter your email and the Community Hub Team will send you a secure reset link.
          </p>
        </div>

        {status.error ? (
          <div className="mb-5 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-700">
            {status.error}
          </div>
        ) : null}

        {status.success ? (
          <div className="mb-5 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-700">
            {status.success}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-black uppercase tracking-widest text-slate-500">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              className="h-14 w-full rounded-2xl border border-slate-300 px-4 text-base font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="h-14 w-full rounded-2xl bg-blue-600 text-base font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-bold text-slate-500">
          Need help? Contact Valdemir R. Goncalves Junior at infojr.83@gmail.com
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;