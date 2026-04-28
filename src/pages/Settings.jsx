// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import FormInput from "../components/FormInput";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { setRecord } from "../services/firestoreService";

const defaultSettings = {
  companyName: "Propel Properties",
  logoUrl: "",
  primaryColor: "#2563EB",
  contactEmail: "admin@example.com",
  contactPhone: "",
  address: "",
  dashboardPreferences: "Large KPI cards, realtime Firestore stats, responsive tables."
};

function Settings() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "company"),
      (snapshot) => {
        if (snapshot.exists()) setForm({ ...defaultSettings, ...snapshot.data() });
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, []);

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await setRecord("settings", "company", form, { uid: currentUser?.uid, email: currentUser?.email }, "Updated company settings.");
      setToast({ type: "success", message: "Settings saved." });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Unable to save settings." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner label="Loading settings..." />;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">Company settings</p>
        <h1 className="dashboard-section-title mt-2">Settings</h1>
        <p className="mt-2 max-w-4xl text-lg font-semibold text-slate-500">Configure your management company identity and dashboard preferences.</p>
      </section>

      <form onSubmit={handleSubmit} className="dashboard-card grid gap-5 p-5 sm:p-7 md:grid-cols-2">
        <FormInput name="companyName" label="Company Name" value={form.companyName} onChange={handleChange} required />
        <FormInput name="logoUrl" label="Logo URL" value={form.logoUrl} onChange={handleChange} type="url" />
        <FormInput name="primaryColor" label="Primary Color" value={form.primaryColor} onChange={handleChange} type="text" />
        <FormInput name="contactEmail" label="Contact Email" value={form.contactEmail} onChange={handleChange} type="email" />
        <FormInput name="contactPhone" label="Contact Phone" value={form.contactPhone} onChange={handleChange} />
        <FormInput name="address" label="Address" value={form.address} onChange={handleChange} />
        <div className="md:col-span-2">
          <FormInput name="dashboardPreferences" label="Dashboard Preferences" value={form.dashboardPreferences} onChange={handleChange} type="textarea" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="rounded-2xl bg-blue-600 px-6 py-4 text-lg font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60">
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default Settings;
