// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden lg:block">
          <div className="rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-500 text-white shadow-xl shadow-blue-950/40">
              <Building2 size={42} />
            </div>
            <h1 className="mt-8 text-6xl font-black leading-tight">Property management that feels alive.</h1>
            <p className="mt-6 max-w-2xl text-2xl font-semibold leading-relaxed text-slate-300">
              Manage communities, tenants, rent, maintenance, vendors, documents, and reports from one executive dashboard.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {["Realtime data", "Role access", "Audit logs"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/10 p-5 text-lg font-black text-blue-100">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-600">Secure login</p>
          <h2 className="mt-3 text-4xl font-black">Welcome back</h2>
          <p className="mt-2 text-lg font-semibold text-slate-500">Sign in to manage your property operations.</p>

          {error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-base font-bold text-red-700">{error}</div> : null}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <label className="block">
              <span className="text-sm font-black uppercase tracking-wide text-slate-500">Email</span>
              <input name="email" type="email" required value={form.email} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </label>
            <label className="block">
              <span className="text-sm font-black uppercase tracking-wide text-slate-500">Password</span>
              <input name="password" type="password" required value={form.password} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </label>
            <button disabled={loading} type="submit" className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-xl font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 text-base font-bold sm:flex-row sm:justify-between">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700">Forgot password?</Link>
            <Link to="/signup" className="text-slate-600 hover:text-slate-950">Create an account</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
