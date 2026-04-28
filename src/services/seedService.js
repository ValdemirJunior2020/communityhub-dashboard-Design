// src/services/seedService.js
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { writeAuditLog } from "./auditService";

const imageUrls = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80"
];

async function seedCollection(collectionName, items) {
  const ids = [];
  for (const item of items) {
    const ref = await addDoc(collection(db, collectionName), {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    ids.push(ref.id);
  }
  return ids;
}

export async function seedDemoData(user) {
  const existingProperties = await getDocs(collection(db, "properties"));
  if (!existingProperties.empty) {
    throw new Error("Seed data was not added because properties already exist.");
  }

  const ownerIds = await seedCollection("owners", [
    { fullName: "Marcus Holt", email: "marcus@holtestates.com", phone: "561-555-1001", companyName: "Holt Estates", address: "101 Lake Ave, Lake Worth, FL", notes: "Primary investor group." },
    { fullName: "Ana Rodrigues", email: "ana@suncoastliving.com", phone: "561-555-1002", companyName: "Suncoast Living LLC", address: "302 Ocean Dr, Palm Beach, FL", notes: "Prefers monthly income reports." },
    { fullName: "David Miller", email: "david@evergreenassets.com", phone: "561-555-1003", companyName: "Evergreen Assets", address: "55 Worth Ave, Palm Beach, FL", notes: "Commercial/residential portfolio." }
  ]);

  const vendorIds = await seedCollection("vendors", [
    { companyName: "Rapid Plumbing Pros", contactName: "Eli Watson", email: "dispatch@rapidplumbing.com", phone: "561-555-2101", serviceType: "Plumbing", address: "220 Service Rd, West Palm Beach, FL", status: "active", notes: "Emergency calls accepted." },
    { companyName: "Bright Spark Electric", contactName: "Maya Fox", email: "jobs@brightspark.com", phone: "561-555-2102", serviceType: "Electrical", address: "88 Industrial Way, Lake Worth, FL", status: "active", notes: "Licensed and insured." },
    { companyName: "Palm Coast HVAC", contactName: "Carlos Rivera", email: "service@palmcoasthvac.com", phone: "561-555-2103", serviceType: "HVAC", address: "19 Commerce Blvd, Boynton Beach, FL", status: "active", notes: "Same day scheduling when available." },
    { companyName: "Premier Cleaning Crew", contactName: "Tanya James", email: "hello@premiercleaning.com", phone: "561-555-2104", serviceType: "Cleaning", address: "711 Market St, West Palm Beach, FL", status: "active", notes: "Move-out turns and inspections." }
  ]);

  const propertyData = [
    { propertyName: "Lazyland Lake Community", address: "1915 Lakeview Dr", city: "Lake Worth", state: "FL", zipCode: "33460", propertyType: "Mobile Home Community", imageUrl: imageUrls[0], ownerId: ownerIds[0], totalUnits: 6, occupiedUnits: 5, monthlyIncome: 9800, status: "active", notes: "Flagship community with strong occupancy." },
    { propertyName: "Palm Grove Villas", address: "420 Palm Grove Blvd", city: "West Palm Beach", state: "FL", zipCode: "33401", propertyType: "Townhomes", imageUrl: imageUrls[1], ownerId: ownerIds[1], totalUnits: 4, occupiedUnits: 3, monthlyIncome: 7600, status: "active", notes: "High-demand family units." },
    { propertyName: "Sunrise RV Resort", address: "88 Sunrise Way", city: "Boynton Beach", state: "FL", zipCode: "33435", propertyType: "RV Community", imageUrl: imageUrls[2], ownerId: ownerIds[0], totalUnits: 4, occupiedUnits: 4, monthlyIncome: 5200, status: "active", notes: "Seasonal guests and long-term leases." },
    { propertyName: "Ocean Breeze Apartments", address: "212 Atlantic Ave", city: "Delray Beach", state: "FL", zipCode: "33444", propertyType: "Apartments", imageUrl: imageUrls[3], ownerId: ownerIds[2], totalUnits: 4, occupiedUnits: 3, monthlyIncome: 8900, status: "active", notes: "Premium coastal location." },
    { propertyName: "Garden Square Homes", address: "700 Garden Square", city: "Lake Worth", state: "FL", zipCode: "33461", propertyType: "Single Family Portfolio", imageUrl: imageUrls[4], ownerId: ownerIds[1], totalUnits: 2, occupiedUnits: 1, monthlyIncome: 4100, status: "maintenance", notes: "Two homes under one owner account." }
  ];

  const propertyIds = await seedCollection("properties", propertyData);

  const units = [];
  propertyIds.forEach((propertyId, propertyIndex) => {
    const unitCount = propertyData[propertyIndex].totalUnits;
    for (let i = 1; i <= unitCount; i += 1) {
      units.push({
        propertyId,
        unitNumber: `${propertyIndex + 1}${String(i).padStart(2, "0")}`,
        bedrooms: propertyIndex === 2 ? 1 : (i % 3) + 1,
        bathrooms: i % 2 === 0 ? 2 : 1,
        squareFeet: 650 + i * 90,
        rentAmount: 950 + propertyIndex * 175 + i * 45,
        status: i <= propertyData[propertyIndex].occupiedUnits ? "occupied" : i % 2 === 0 ? "maintenance" : "available",
        tenantId: "",
        notes: i % 4 === 0 ? "Recently renovated." : "Standard unit."
      });
    }
  });
  const unitIds = await seedCollection("units", units);

  const tenantBase = [
    "Sophia Grant", "Noah Bennett", "Emma Parker", "Liam Carter", "Olivia Brooks",
    "Mason Reed", "Ava Collins", "Lucas Rivera", "Mia Thompson", "Ethan Walker"
  ];

  const tenants = tenantBase.map((name, index) => ({
    fullName: name,
    email: `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
    phone: `561-555-30${String(index + 1).padStart(2, "0")}`,
    emergencyContactName: index % 2 === 0 ? "Family Contact" : "Primary Contact",
    emergencyContactPhone: `561-555-40${String(index + 1).padStart(2, "0")}`,
    propertyId: propertyIds[index % propertyIds.length],
    unitId: unitIds[index],
    leaseStartDate: "2026-01-01",
    leaseEndDate: "2026-12-31",
    rentAmount: units[index].rentAmount,
    status: index === 8 ? "notice" : "active",
    notes: index === 3 ? "Prefers text notifications." : "Good standing."
  }));
  const tenantIds = await seedCollection("tenants", tenants);

  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const payments = tenants.map((tenant, index) => ({
    tenantId: tenantIds[index],
    propertyId: tenant.propertyId,
    unitId: tenant.unitId,
    amountDue: tenant.rentAmount,
    amountPaid: index % 4 === 0 ? tenant.rentAmount / 2 : index % 5 === 0 ? 0 : tenant.rentAmount,
    dueDate: `${currentMonth}-05`,
    paidDate: index % 4 === 0 || index % 5 === 0 ? "" : `${currentMonth}-03`,
    paymentStatus: index % 4 === 0 ? "partial" : index % 5 === 0 ? "overdue" : "paid",
    paymentMethod: index % 3 === 0 ? "ACH" : "Card",
    notes: index % 5 === 0 ? "Follow-up required." : "Monthly rent payment."
  }));
  await seedCollection("rentPayments", payments);

  await seedCollection("maintenanceRequests", [
    { tenantId: tenantIds[0], propertyId: propertyIds[0], unitId: unitIds[0], issueTitle: "AC not cooling", issueDescription: "Tenant reports AC running but not cooling.", priority: "high", status: "open", assignedVendorId: vendorIds[2], assignedUserId: "", dueDate: "2026-05-03", completedDate: "", cost: 0, notes: "Schedule HVAC vendor." },
    { tenantId: tenantIds[2], propertyId: propertyIds[1], unitId: unitIds[6], issueTitle: "Kitchen sink leak", issueDescription: "Small leak below kitchen sink.", priority: "medium", status: "inProgress", assignedVendorId: vendorIds[0], assignedUserId: "", dueDate: "2026-05-01", completedDate: "", cost: 125, notes: "Vendor confirmed appointment." },
    { tenantId: "", propertyId: propertyIds[4], unitId: unitIds[18], issueTitle: "Exterior paint touch-up", issueDescription: "Owner requested fresh paint near entry.", priority: "low", status: "open", assignedVendorId: "", assignedUserId: "", dueDate: "2026-05-15", completedDate: "", cost: 0, notes: "Bundle with inspection." }
  ]);

  await seedCollection("workOrders", [
    { maintenanceId: "", propertyId: propertyIds[0], unitId: unitIds[0], title: "HVAC diagnostic", description: "Inspect condenser and air handler.", assignedTo: "Maintenance Team", vendorId: vendorIds[2], status: "scheduled", priority: "high", scheduledDate: "2026-05-02", completedDate: "", estimatedCost: 250, finalCost: 0, notes: "Tenant available after 2 PM." },
    { maintenanceId: "", propertyId: propertyIds[1], unitId: unitIds[6], title: "Repair sink leak", description: "Replace p-trap and check water lines.", assignedTo: "Rapid Plumbing Pros", vendorId: vendorIds[0], status: "inProgress", priority: "medium", scheduledDate: "2026-04-30", completedDate: "", estimatedCost: 175, finalCost: 0, notes: "Parts may be needed." }
  ]);

  await seedCollection("inspections", [
    { propertyId: propertyIds[0], unitId: unitIds[1], inspectionType: "Move-in", scheduledDate: "2026-05-04", completedDate: "", inspectorName: "Jordan Lee", status: "scheduled", result: "pending", notes: "New tenant walkthrough." },
    { propertyId: propertyIds[3], unitId: unitIds[15], inspectionType: "Annual", scheduledDate: "2026-04-20", completedDate: "2026-04-20", inspectorName: "Nina Patel", status: "completed", result: "passed", notes: "No major concerns." }
  ]);

  await seedCollection("documents", [
    { title: "Community Rules 2026", documentType: "Policy", relatedPropertyId: propertyIds[0], relatedTenantId: "", documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", expirationDate: "", notes: "General resident handbook." },
    { title: "Vendor Insurance - Rapid Plumbing", documentType: "Insurance", relatedPropertyId: "", relatedTenantId: "", documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", expirationDate: "2026-12-31", notes: "COI on file." }
  ]);

  await writeAuditLog({
    action: "seed",
    collectionName: "all",
    documentId: "demo-data",
    user,
    description: "Seeded realistic property management demo data."
  });

  return true;
}
