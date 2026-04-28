// src/pages/Owners.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { useCollection } from "../hooks/useCollection";

function Owners() {
  const owners = useCollection("owners");
  const fields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone" },
    { name: "companyName", label: "Company Name" },
    { name: "address", label: "Address", fullWidth: true },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];
  const columns = [
    { key: "fullName", label: "Owner" },
    { key: "companyName", label: "Company" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" }
  ];
  return (
    <CrudPage
      title="Owners"
      subtitle="Manage owner profiles, company names, contact information, addresses, and portfolio notes."
      collectionName="owners"
      fields={fields}
      columns={columns}
      data={owners.data}
      loading={owners.loading}
      error={owners.error}
      searchFields={["fullName", "companyName", "email", "phone", "address"]}
    />
  );
}

export default Owners;
