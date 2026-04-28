// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "", requestedRole: "viewer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <section className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-600">New account</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Create your dashboard access</h1>
        <p className="mt-2 text-lg font-semibold text-slate-500">New users start as viewers until an admin updates access.</p>

        {error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-base font-bold text-red-700">{error}</div> : null}

        <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-black uppercase tracking-wide text-slate-500">Full name *</span>
            <input name="fullName" required value={form.fullName} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-black uppercase tracking-wide text-slate-500">Email *</span>
            <input name="email" type="email" required value={form.email} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          <label className="block">
            <span className="text-sm font-black uppercase tracking-wide text-slate-500">Password *</span>
            <input name="password" type="password" required minLength="6" value={form.password} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          <label className="block">
            <span className="text-sm font-black uppercase tracking-wide text-slate-500">Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-black uppercase tracking-wide text-slate-500">Requested role</span>
            <select name="requestedRole" value={form.requestedRole} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="viewer">Viewer</option>
              <option value="maintenance">Maintenance</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button disabled={loading} type="submit" className="rounded-2xl bg-blue-600 px-5 py-4 text-xl font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60 sm:col-span-2">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-base font-bold text-slate-600">
          Already have an account? <Link className="text-blue-600" to="/login">Login</Link>
        </p>
      </section>
    </div>
  );
}

export default Signup;
