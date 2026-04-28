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
    <div className="mb-5 rounded-3xl border border-blue-200 bg-blue-50 p-4 shadow-sm xl:p-5">
      <div className="grid gap-4 xl:grid-cols-[1fr_250px] xl:items-center">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Sparkles size={23} />
          </span>

          <div className="min-w-0">
            <p className="text-xl font-black text-slate-950 xl:text-2xl">
              Demo Mode Active
            </p>

            <p className="mt-1 max-w-4xl text-sm font-bold leading-6 text-slate-600 sm:text-base">
              This dashboard is using sample community data. Real payments,
              client onboarding, production settings, and full functionality are
              unlocked after purchase and setup.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-800">
                <UserRound size={16} className="shrink-0 text-blue-600" />
                <span className="truncate">{developerInfo.name}</span>
              </div>

              <a
                href={`mailto:${developerInfo.email}`}
                className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100"
              >
                <Mail size={16} className="shrink-0" />
                <span className="truncate">{developerInfo.email}</span>
              </a>

              <a
                href={`tel:${developerInfo.phone}`}
                className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
              >
                <Phone size={16} className="shrink-0" />
                <span className="truncate">{developerInfo.phone}</span>
              </a>

              <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-800">
                <MapPin size={16} className="shrink-0 text-red-500" />
                <span className="truncate">{developerInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex w-fit items-center gap-2 rounded-2xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">
            <Lock size={18} />
            Sales Demo
          </div>

          <a
            href={`mailto:${developerInfo.email}?subject=Activate Full Version - Community Hub Dashboard&body=Hello Valdemir,%0D%0A%0D%0AI am interested in activating the full version of the Community Hub dashboard for my community.%0D%0A%0D%0ACommunity Name:%0D%0APhone:%0D%0ARequested Features:%0D%0A`}
            className="block rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800"
          >
            Contact Developer
          </a>

          <p className="mt-3 text-center text-xs font-bold text-slate-500">
            Full version activated after onboarding.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DemoBanner;