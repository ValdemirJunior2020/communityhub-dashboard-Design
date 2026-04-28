import React, { useState } from 'react';
import { 
  Building, House, DollarSign, Wrench, AlertTriangle, ListChecks, Search, Bell, ChevronDown, UserCircle,
  LayoutDashboard, Users, FileText, Settings, CreditCard, ClipboardCheck
} from 'lucide-react';

// --- MOCK DATA ---
const metricData = [
  { icon: House, label: 'Total Properties', value: '15', color: 'green' },
  { icon: Building, label: 'Occupied Units', value: '412', color: 'blue' },
  { icon: DollarSign, label: 'Monthly Rent Collected', value: '$845,750', color: 'gold' },
  { icon: Wrench, label: 'Pending Maintenance', value: '23 Requests', color: 'red' },
  { icon: AlertTriangle, label: 'Overdue Payments', value: '8 Tenants', color: 'amber' },
  { icon: ListChecks, label: 'Open Work Orders', value: '11 Active', color: 'teal' },
];

const propertyData = [
  { image: 'https://placehold.co/400x300/e2e8f0/475569?text=Townhouse', name: 'Modern Townhouse', income: '$120k', status: 'Stable' },
  { image: 'https://placehold.co/400x300/e2e8f0/475569?text=Luxury+Apts', name: 'Luxury Apartment Complex', income: '$120k', status: 'Rising' },
  { image: 'https://placehold.co/400x300/e2e8f0/475569?text=Downtown', name: 'Downtown High-Rise', income: '$120k', status: 'Stable' },
  { image: 'https://placehold.co/400x300/e2e8f0/475569?text=Office+Bldg', name: 'Commercial Office Building', income: '$120k', status: 'Rising' },
];

const maintenanceData = [
  { tenant: 'A. Smith', property: '123 Main St.', issue: 'High-Priority Leak', status: 'Paid', statusColor: 'green' },
  { tenant: 'B. Jones', property: 'The Heights', issue: 'Overdue Rent (8 tenants)', status: 'Overdue', statusColor: 'red' },
  { tenant: 'C. Davis', property: 'The Heights', issue: 'Inspection Scheduled (Tomorrow)', status: 'Open', statusColor: 'amber' },
  { tenant: 'D. Evans', property: '123 Main St.', issue: 'Suggest next actions', status: 'Payment', statusColor: 'teal' },
];

// --- COMPONENTS ---

const Sidebar = () => {
  const [active, setActive] = useState('Dashboard');
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Properties', icon: Building },
    { name: 'Tenants', icon: Users },
    { name: 'Rent Payments', icon: CreditCard },
    { name: 'Maintenance', icon: Wrench },
    { name: 'Inspections', icon: ClipboardCheck },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-8 flex items-center gap-4 border-b border-gray-100 mb-6">
        <Building className="h-14 w-14 text-blue-600" />
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">Propel</h2>
          <span className="text-xl font-medium text-gray-500">Properties</span>
        </div>
      </div>
      <nav className="flex-1 px-6 space-y-3 overflow-y-auto">
        {menu.map((item) => (
          <button 
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl text-xl font-bold transition-all ${
              active === item.name 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-8 w-8 ${active === item.name ? 'text-blue-600' : 'text-gray-400'}`} />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

const Header = () => (
  <header className="flex items-center justify-between p-8 bg-white border-b border-gray-200 sticky top-0 z-10">
    <h1 className="text-5xl font-extrabold text-gray-900">Dashboard</h1>
    
    <div className="flex-1 max-w-4xl relative mx-12">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-8 w-8" />
      <input 
        type="search" 
        placeholder="Search properties, tenants, reports..." 
        className="w-full pl-20 pr-8 py-5 text-2xl border-2 border-gray-200 rounded-full bg-gray-50 focus:border-blue-400 focus:bg-white focus:outline-none" 
      />
    </div>

    <div className="flex items-center gap-10">
      <div className="relative cursor-pointer">
        <Bell className="h-10 w-10 text-gray-500 hover:text-gray-900 transition" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-base font-bold rounded-full px-3 py-1 border-4 border-white">1</span>
      </div>
      <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition">
        <UserCircle className="h-16 w-16 text-gray-400" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900">Valdemir Junior</span>
          <span className="text-lg text-gray-500">Full Stack / QA / iOS</span>
        </div>
        <ChevronDown className="h-8 w-8 text-gray-400 ml-2" />
      </div>
      <button className="px-8 py-4 bg-emerald-500 text-white rounded-full text-xl font-bold hover:bg-emerald-600 shadow-md transition">
        Quick Action
      </button>
    </div>
  </header>
);

const MetricCard = ({ icon: Icon, label, value, color }) => {
  const colorMap = {
    green: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    blue: 'border-blue-200 bg-blue-50 text-blue-800',
    gold: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    red: 'border-red-200 bg-red-50 text-red-800',
    amber: 'border-amber-200 bg-amber-50 text-amber-800',
    teal: 'border-teal-200 bg-teal-50 text-teal-800',
  };
  const iconBgMap = {
    green: 'bg-emerald-200 text-emerald-700',
    blue: 'bg-blue-200 text-blue-700',
    gold: 'bg-yellow-200 text-yellow-700',
    red: 'bg-red-200 text-red-700',
    amber: 'bg-amber-200 text-amber-700',
    teal: 'bg-teal-200 text-teal-700',
  }

  return (
    <div className={`p-8 rounded-[2rem] border-2 shadow-sm transition hover:shadow-lg ${colorMap[color]}`}>
      <div className="flex items-center gap-5 mb-6">
        <div className={`p-4 rounded-2xl ${iconBgMap[color]}`}>
          <Icon className="h-10 w-10" />
        </div>
        <span className="text-2xl font-bold opacity-80">{label}</span>
      </div>
      <div className="text-6xl font-black">{value}</div>
    </div>
  );
};

const PropertyCard = ({ image, name, income, status }) => (
  <div className="flex gap-6 p-6 rounded-3xl border-2 border-gray-200 bg-white hover:border-blue-300 transition shadow-sm">
    <img src={image} alt={name} className="h-40 w-40 rounded-2xl object-cover" />
    <div className="flex flex-col flex-1 justify-center space-y-3">
      <div>
        <h4 className="text-2xl font-bold text-gray-900">{name}</h4>
        <span className="text-xl text-gray-500 font-medium">{`Monthly Income: ${income}`}</span>
      </div>
      <div className={`text-xl font-bold ${status === 'Rising' ? 'text-emerald-600' : 'text-gray-900'}`}>
        {`Status: ${status}`}
      </div>
    </div>
  </div>
);

const SidebarPanel = ({ title, children }) => (
  <aside className="p-10 rounded-[2rem] border-2 border-gray-200 bg-white h-fit shadow-sm">
    <h3 className="text-3xl font-extrabold text-gray-900 mb-8">{title}</h3>
    <div className="space-y-6">
      {children}
    </div>
  </aside>
);

const StatusBadge = ({ status, color }) => {
  const colorMap = {
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
  };
  return (
    <span className={`px-5 py-2.5 rounded-full text-lg font-bold border ${colorMap[color]}`}>{status}</span>
  );
};

// --- MAIN DASHBOARD ---

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* LEFT SIDEBAR RE-ADDED HERE */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Massive padding and gaps for ultrawide */}
        <main className="p-12 grid grid-cols-[1fr,550px] gap-12">
          
          {/* Main Column */}
          <div className="space-y-12">
            
            {/* Metrics */}
            <section className="grid grid-cols-2 2xl:grid-cols-3 gap-8">
              {metricData.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </section>

            {/* Chart & Properties */}
            <section className="grid grid-cols-1 2xl:grid-cols-[1.2fr,1fr] gap-10">
              
              <div className="p-10 rounded-[2rem] border-2 border-gray-200 bg-white shadow-sm min-h-[500px] flex flex-col">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Rent Collection & Occupancy</h3>
                <div className="flex-1 bg-gray-50 rounded-3xl flex items-center justify-center border-4 border-dashed border-gray-200">
                  <span className="text-2xl text-gray-400 font-bold">[ Chart Graphic Area ]</span>
                </div>
              </div>

              <div className="p-10 rounded-[2rem] border-2 border-gray-200 bg-white shadow-sm">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Property Overview</h3>
                <div className="grid grid-cols-1 gap-6">
                  {propertyData.map((prop) => (
                    <PropertyCard key={prop.name} {...prop} />
                  ))}
                </div>
              </div>
            </section>

            {/* Table Area */}
            <section className="p-10 rounded-[2rem] border-2 border-gray-200 bg-white shadow-sm">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Maintenance Center</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-8 py-6 text-xl font-bold text-gray-600 uppercase tracking-wider rounded-tl-2xl">Tenant Name</th>
                      <th className="px-8 py-6 text-xl font-bold text-gray-600 uppercase tracking-wider">Property</th>
                      <th className="px-8 py-6 text-xl font-bold text-gray-600 uppercase tracking-wider">Issue Type</th>
                      <th className="px-8 py-6 text-xl font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-8 py-6 text-xl font-bold text-gray-600 uppercase tracking-wider rounded-tr-2xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100">
                    {maintenanceData.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-8 py-8 text-2xl font-bold text-gray-900">{data.tenant}</td>
                        <td className="px-8 py-8 text-2xl text-gray-700">{data.property}</td>
                        <td className="px-8 py-8 text-2xl text-gray-500">{data.issue}</td>
                        <td className="px-8 py-8 text-2xl font-black text-gray-900">{data.statusColor === 'red' ? '$12,500' : '$120.00'}</td>
                        <td className="px-8 py-8"><StatusBadge status={data.status} color={data.statusColor} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column (Alerts & AI) */}
          <div className="space-y-12">
            
            <SidebarPanel title="Smart Alerts Panel">
              {[
                { icon: AlertTriangle, text: '5 Leases Expiring this Month', color: 'amber' },
                { icon: AlertTriangle, text: '3 High-Priority Maintenance Requests', color: 'red' },
                { icon: AlertTriangle, text: '8 Overdue Rent Payments', color: 'red' },
                { icon: ListChecks, text: 'Inspection Scheduled Tomorrow', color: 'green' },
              ].map((alert, i) => (
                <div key={i} className={`flex items-center gap-6 p-6 rounded-2xl border-2 ${alert.color === 'red' ? 'border-red-200 bg-red-50 text-red-800' : alert.color === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                  <alert.icon className="h-10 w-10 flex-shrink-0" />
                  <span className="text-2xl font-bold">{alert.text}</span>
                </div>
              ))}
            </SidebarPanel>

            <SidebarPanel title="Property AI Assistant">
              <div className="p-8 rounded-3xl bg-teal-50 border-2 border-teal-200 space-y-6">
                <h4 className="text-2xl font-extrabold text-teal-900">Suggested Prompts</h4>
                <ul className="text-xl font-medium text-teal-800 list-disc list-inside space-y-4">
                  <li>Summarize the tenant issue at The Heights.</li>
                  <li>Suggest next actions for maintenance.</li>
                  <li>Generate an investor-ready owner report.</li>
                </ul>
              </div>
              <div className="relative mt-8">
                <input 
                  type="text" 
                  placeholder="Ask your AI assistant..." 
                  className="w-full pl-8 pr-32 py-6 text-2xl border-2 border-gray-300 rounded-full bg-white focus:border-teal-500 focus:outline-none shadow-sm" 
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-teal-600 text-white rounded-full text-xl font-bold hover:bg-teal-700 shadow-md">
                  Run Task
                </button>
              </div>
            </SidebarPanel>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;