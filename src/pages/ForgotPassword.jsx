// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message || "Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <section className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-600">Password help</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Reset your password</h1>
        <p className="mt-2 text-lg font-semibold text-slate-500">Enter your account email and Firebase will send a reset link.</p>
        {message ? <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-base font-bold text-emerald-700">{message}</div> : null}
        {error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-base font-bold text-red-700">{error}</div> : null}
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className="block">
            <span className="text-sm font-black uppercase tracking-wide text-slate-500">Email</span>
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          <button disabled={loading} type="submit" className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-xl font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
        <Link className="mt-6 block text-center text-base font-black text-blue-600" to="/login">Back to login</Link>
      </section>
    </div>
  );
}

export default ForgotPassword;
