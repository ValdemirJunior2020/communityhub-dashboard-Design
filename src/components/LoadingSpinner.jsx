// src/components/LoadingSpinner.jsx
import React from "react";

function LoadingSpinner({ label = "Loading...", fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="text-lg font-black text-slate-700">{label}</p>
    </div>
  );

  if (fullScreen) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100">{content}</div>;
  }

  return <div className="flex min-h-[260px] items-center justify-center">{content}</div>;
}

export default LoadingSpinner;
