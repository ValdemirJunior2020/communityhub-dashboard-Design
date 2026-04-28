// src/pages/Vendors.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { toOptions, vendorStatuses } from "../data/resourceConfigs";
import { useCollection } from "../hooks/useCollection";

function Vendors() {
  const vendors = useCollection("vendors");
  const fields = [
    { name: "companyName", label: "Company Name", required: true },
    { name: "contactName", label: "Contact Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone" },
    { name: "serviceType", label: "Service Type", required: true },
    { name: "address", label: "Address", fullWidth: true },
    { name: "status", label: "Status", type: "select", options: toOptions(vendorStatuses), defaultValue: "active" },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];
  const columns = [
    { key: "companyName", label: "Vendor" },
    { key: "serviceType", label: "Service" },
    { key: "contactName", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status", type: "status" }
  ];
  return (
    <CrudPage
      title="Vendors"
      subtitle="Manage approved vendors, service types, contact details, insurance notes, and active/inactive status."
      collectionName="vendors"
      fields={fields}
      columns={columns}
      data={vendors.data}
      loading={vendors.loading}
      error={vendors.error}
      searchFields={["companyName", "contactName", "email", "phone", "serviceType", "status"]}
      filters={[{ name: "status", label: "Status", options: toOptions(vendorStatuses) }]}
    />
  );
}

export default Vendors;
