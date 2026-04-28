import React from 'react';

// Simplified trend lines using SVG. This is an illustration.
const SimplifiedLines = () => (
    <svg viewBox="0 0 500 200" className="w-full h-full">
        {/* Y Axis Lines */}
        {[0, 1, 2, 3].map(i => (
            <line key={i} x1="30" y1={40 + i * 40} x2="470" y2={40 + i * 40} stroke="#E5E7EB" strokeWidth="1" />
        ))}

        {/* Rent Line (Blue) - illustrative data */}
        <path d="M40,150 C70,120 100,100 130,110 S200,90 230,120 S300,100 330,80 S400,90 430,70" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
        
        {/* Occupancy Line (Green) - illustrative data */}
        <path d="M40,160 C70,140 100,130 130,140 S200,120 230,130 S300,110 330,90 S400,70 430,50" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
        
        {/* X Axis Labels */}
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((label, i) => (
            <text key={label} x={40 + i * 55} y="190" fontSize="12" fill="#6B7280">{label}</text>
        ))}

         {/* Y Axis Labels */}
         {[100, 75, 50, 25, 0].map((label, i) => (
             <text key={label} x="5" y={45 + i * 40} fontSize="12" fill="#6B7280" textAnchor="start">{label}</text>
         ))}
    </svg>
);

const TrendChart = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900">Rent Collection & Occupancy Trend (Last 6 Months)</h3>
                <div className="flex items-center space-x-6 text-sm text-neutral-600">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-brand-primary mr-2"></span>
                        Rent Collected
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-brand-success mr-2"></span>
                        Occupancy Rate %
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-neutral-100 rounded-2xl p-6 h-64">
                {/* Real chart would go here. Using illustration. */}
                <SimplifiedLines />
            </div>
        </div>
    );
};

export default TrendChart;