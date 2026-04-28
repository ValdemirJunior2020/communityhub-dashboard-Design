// src/components/TrendChart.jsx
import React from 'react';

const SimplifiedLines = () => (
  <svg viewBox="0 0 720 330" className="h-full w-full" role="img" aria-label="Rent collection and occupancy trend chart">
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1="55" y1={45 + i * 55} x2="690" y2={45 + i * 55} stroke="#dbe3ee" strokeWidth="2" />
    ))}

    <path
      d="M70,260 C115,190 150,135 205,130 S285,160 340,142 S450,128 500,88 S590,82 670,92"
      fill="none"
      stroke="#2563EB"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M70,240 C120,195 170,170 220,175 S295,198 350,170 S445,165 500,115 S600,120 670,66"
      fill="none"
      stroke="#10B981"
      strokeWidth="7"
      strokeLinecap="round"
    />

    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((label, i) => (
      <text key={label} x={70 + i * 86} y="315" fontSize="20" fontWeight="600" fill="#475569" textAnchor="middle">
        {label}
      </text>
    ))}

    {[100, 75, 50, 25, 0].map((label, i) => (
      <text key={label} x="8" y={52 + i * 55} fontSize="18" fontWeight="600" fill="#64748b">
        {label}
      </text>
    ))}
  </svg>
);

const TrendChart = () => {
  return (
    <div className="dashboard-card flex min-h-[22rem] flex-col p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h3 className="dashboard-section-title">Rent Collection & Occupancy Trend (Last 6 Months)</h3>
        <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-7 rounded-full bg-blue-600" />
            Rent Collected
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-7 rounded-full bg-emerald-500" />
            Occupancy Rate %
          </div>
        </div>
      </div>

      <div className="min-h-[17rem] flex-1 rounded-2xl bg-gradient-to-b from-slate-50 to-white p-3">
        <SimplifiedLines />
      </div>
    </div>
  );
};

export default TrendChart;