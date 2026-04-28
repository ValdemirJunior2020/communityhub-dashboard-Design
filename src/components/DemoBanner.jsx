// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\components\DemoBanner.jsx
import React from "react";
import { Lock, Mail, MapPin, Phone, Sparkles, UserRound } from "lucide-react";
import { APP_MODE } from "../config/appMode";

const developerInfo = {
  name: "Valdemir R. Goncalves Junior",
  email: "infojr.83@gmail.com",
  phone: "7543669922",
  location: "West Palm Beach, Florida",
};

function DemoBanner() {
  if (!APP_MODE.isDemo) return null;

  return (
    <div className="mb-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Sparkles size={26} />
          </span>

          <div>
            <p className="text-xl font-black text-slate-950">
              Demo Mode Active
            </p>

            <p className="mt-1 text-base font-bold text-slate-600">
              This dashboard is using sample community data. Real payments,
              client onboarding, production settings, and full functionality are
              unlocked after purchase and setup.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-800">
                <UserRound size={18} className="text-blue-600" />
                {developerInfo.name}
              </div>

              <a
                href={`mailto:${developerInfo.email}`}
                className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-100"
              >
                <Mail size={18} />
                {developerInfo.email}
              </a>

              <a
                href={`tel:${developerInfo.phone}`}
                className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
              >
                <Phone size={18} />
                {developerInfo.phone}
              </a>

              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-800">
                <MapPin size={18} className="text-red-500" />
                {developerInfo.location}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm xl:min-w-[280px]">
          <div className="flex w-fit items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-base font-black text-blue-700">
            <Lock size={20} />
            Sales Demo
          </div>

          <a
            href={`mailto:${developerInfo.email}?subject=Activate Full Version - Propel Properties Dashboard&body=Hello Valdemir,%0D%0A%0D%0AI am interested in activating the full version of the Propel Properties dashboard for my community.%0D%0A%0D%0ACommunity Name:%0D%0APhone:%0D%0ARequested Features:%0D%0A`}
            className="rounded-2xl bg-slate-950 px-5 py-4 text-center text-base font-black text-white transition hover:bg-slate-800"
          >
            Contact Developer
          </a>

          <p className="text-center text-xs font-bold text-slate-500">
            Full version activated after onboarding.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DemoBanner;