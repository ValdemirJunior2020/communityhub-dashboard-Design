import React from 'react';

const PlaceHolderThumbnail = () => (
    <div className="w-28 h-20 rounded-lg bg-neutral-300 border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-600 text-sm">
        Image
    </div>
);

const PropertyGridItem = ({ address, complexName, occupancy, maintenance, monthlyIncome }) => (
    <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-start space-x-4">
        <PlaceHolderThumbnail />
        <div className="flex-1 space-y-3">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-neutral-900">{address}</span>
                <span className="text-neutral-600 text-sm -mt-1">{complexName}</span>
            </div>
            
            {/* Split Metrics Section */}
            {occupancy ? (
                 <div className="flex space-x-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-600">Occupancy %</span>
                        <span className="text-lg font-bold text-neutral-900">{occupancy}%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-600">Maintenance</span>
                        <span className={`text-lg font-bold ${maintenance === 'Stable' ? 'text-brand-success' : 'text-neutral-900'}`}>{maintenance}</span>
                    </div>
                </div>
            ) : monthlyIncome ? (
                 <div className="flex space-x-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-600">Monthly Income</span>
                        <span className="text-lg font-bold text-neutral-900">{monthlyIncome}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-600">Maintenance</span>
                        <span className={`text-lg font-bold ${maintenance === 'Stable' ? 'text-brand-success' : 'text-neutral-900'}`}>{maintenance}</span>
                    </div>
                </div>
            ) : null}
            
        </div>
    </div>
);

const PropertyGrid = () => {
    // Hardcoded sample data for different card configurations from image
    const properties = [
        { address: "123 Main St", complexName: "The Heights Apartments", occupancy: 96, maintenance: "$120k" },
        { address: "123 Main St", complexName: "The Heights Apartments", occupancy: 96, maintenance: "$120k" },
        { address: "123 Main St", complexName: "The Heights Apartments", monthlyIncome: "$120k", maintenance: "Stable" },
        { address: "123 Main St", complexName: "The Heights Apartments", occupancy: 96, maintenance: "Stable" },
        { address: "123 Main St", complexName: "The Heights Apartments", monthlyIncome: "$120k", maintenance: "Stable" },
        { address: "123 Main St", complexName: "The Heights Apartments", occupancy: 96, maintenance: "Stable" },
    ];

    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-neutral-900">Property Overview</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {properties.map((property, index) => (
                    <PropertyGridItem key={index} {...property} />
                ))}
            </div>
        </div>
    );
};

export default PropertyGrid;