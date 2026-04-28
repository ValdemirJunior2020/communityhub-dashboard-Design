// src/pages/Documents.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, documentTypes, relationOptions, toOptions } from "../data/resourceConfigs";
import { useCollection } from "../hooks/useCollection";

function Documents() {
  const documents = useCollection("documents");
  const properties = useCollection("properties");
  const tenants = useCollection("tenants");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const tenantMap = createRelationMap(tenants.data, "fullName");

  const fields = [
    { name: "title", label: "Title", required: true },
    { name: "documentType", label: "Document Type", type: "select", options: toOptions(documentTypes), required: true },
    { name: "relatedPropertyId", label: "Related Property", type: "select", options: relationOptions(properties.data, "propertyName", "No property") },
    { name: "relatedTenantId", label: "Related Tenant", type: "select", options: relationOptions(tenants.data, "fullName", "No tenant") },
    { name: "documentUrl", label: "Document URL", type: "url", fullWidth: true, required: true },
    { name: "expirationDate", label: "Expiration Date", type: "date" },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];
  const columns = [
    { key: "title", label: "Document" },
    { key: "documentType", label: "Type" },
    { key: "relatedPropertyId", label: "Property", render: (row) => propertyMap[row.relatedPropertyId] || "—" },
    { key: "relatedTenantId", label: "Tenant", render: (row) => tenantMap[row.relatedTenantId] || "—" },
    { key: "expirationDate", label: "Expires" },
    { key: "documentUrl", label: "URL", render: (row) => row.documentUrl ? <a className="text-blue-600 hover:underline" href={row.documentUrl} target="_blank" rel="noreferrer">Open</a> : "—" }
  ];
  return (
    <CrudPage
      title="Documents"
      subtitle="Track document records by URL only for now: leases, policies, insurance, invoices, inspections, and owner statements."
      collectionName="documents"
      fields={fields}
      columns={columns}
      data={documents.data}
      loading={documents.loading || properties.loading || tenants.loading}
      error={documents.error || properties.error || tenants.error}
      searchFields={["title", "documentType", "documentUrl", "notes"]}
      filters={[{ name: "documentType", label: "Type", options: toOptions(documentTypes) }]}
    />
  );
}

export default Documents;
