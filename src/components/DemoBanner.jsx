// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\components\DemoBanner.jsx
import React, { useState } from "react";
import { Lock, Mail, MapPin, Phone, Sparkles, UserRound, X } from "lucide-react";
import { APP_MODE } from "../config/appMode";

const developerInfo = {
  name: "Valdemir R. Goncalves Junior",
  email: "infojr.83@gmail.com",
  phone: "7543669922",
  location: "West Palm Beach, Florida",
};

function ContactModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">
              Activate Full Version
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">
              Contact Developer
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
            aria-label="Close contact modal"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <UserRound size={22} className="text-blue-600" />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Name
              </p>
              <p className="text-base font-black text-slate-950">
                {developerInfo.name}
              </p>
            </div>
          </div>

          <a
            href={`mailto:${developerInfo.email}?subject=Activate Full Version - Community Hub Dashboard&body=Hello Valdemir,%0D%0A%0D%0AI am interested in activating the full version of the Community Hub dashboard for my community.%0D%0A%0D%0ACommunity Name:%0D%0APhone:%0D%0ARequested Features:%0D%0A`}
            className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-blue-700 hover:bg-blue-100"
          >
            <Mail size={22} />
            <div>
              <p className="text-xs font-black uppercase tracking-widest">
                Email
              </p>
              <p className="text-base font-black">{developerInfo.email}</p>
            </div>
          </a>

          <a
            href={`tel:${developerInfo.phone}`}
            className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-700 hover:bg-emerald-100"
          >
            <Phone size={22} />
            <div>
              <p className="text-xs font-black uppercase tracking-widest">
                Phone
              </p>
              <p className="text-base font-black">{developerInfo.phone}</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-700">
            <MapPin size={22} />
            <div>
              <p className="text-xs font-black uppercase tracking-widest">
                Location
              </p>
              <p className="text-base font-black">{developerInfo.location}</p>
            </div>
          </div>
        </div>

        <p className="mt-5 rounded-2xl bg-slate-950 p-4 text-center text-sm font-bold text-white">
          Full version is activated after onboarding and payment.
        </p>
      </div>
    </div>
  );
}

function DemoBanner() {
  const [contactOpen, setContactOpen] = useState(false);

  if (!APP_MODE.isDemo) return null;

  return (
    <>
      <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={22} />
            </span>

            <div>
              <p className="text-lg font-black text-slate-950">
                Demo Mode Active
              </p>

              <p className="mt-1 max-w-4xl text-sm font-bold leading-6 text-slate-600">
                This dashboard is using sample community data. Real payments,
                onboarding, production settings, and full functionality are
                unlocked after purchase.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">
              <Lock size={17} />
              Sales Demo
            </div>

            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800"
            >
              Contact Developer
            </button>
          </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

export default DemoBanner;