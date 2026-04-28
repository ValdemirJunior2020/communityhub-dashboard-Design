// src/components/PropertyGrid.jsx
import React from 'react';

const propertyImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=280&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=280&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=280&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=280&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=280&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=280&q=80',
];

const PropertyGridItem = ({ image, address, complexName, occupancy, maintenance, monthlyIncome }) => (
  <div className="flex min-h-[150px] items-start gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
    <img src={image} alt={address} className="h-28 w-36 shrink-0 rounded-xl object-cover" />

    <div className="min-w-0 flex-1">
      <p className="truncate text-3xl font-black leading-tight text-slate-950">{address}</p>
      <p className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-slate-600">{complexName}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xl font-black text-slate-600">{occupancy ? 'Occupancy %' : 'Monthly Income'}</p>
          <p className="text-3xl font-black text-slate-950">{occupancy ? `${occupancy}%` : monthlyIncome}</p>
        </div>
        <div>
          <p className="text-xl font-black text-slate-600">Maintenance</p>
          <p className={`text-3xl font-black ${maintenance === 'Stable' ? 'text-emerald-600' : 'text-slate-950'}`}>
            {maintenance}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PropertyGrid = () => {
  const properties = [
    { address: '123 Main St', complexName: 'The Heights Apartments', occupancy: 96, maintenance: '$120k' },
    { address: '123 Main St', complexName: 'The Heights Apartments', occupancy: 96, maintenance: '$120k' },
    { address: '123 Main St', complexName: 'The Heights Apartments', monthlyIncome: '$120k', maintenance: 'Stable' },
    { address: '123 Main St', complexName: 'The Heights Apartments', occupancy: 96, maintenance: 'Stable' },
    { address: '123 Main St', complexName: 'The Heights Apartments', monthlyIncome: '$120k', maintenance: 'Stable' },
    { address: '123 Main St', complexName: 'The Heights Apartments', occupancy: 96, maintenance: 'Stable' },
  ];

  return (
    <div className="dashboard-card flex flex-col p-7">
      <h3 className="dashboard-section-title mb-6">Property Overview</h3>
      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
        {properties.map((property, index) => (
          <PropertyGridItem key={`${property.address}-${index}`} image={propertyImages[index]} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;