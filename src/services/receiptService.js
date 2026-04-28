// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\services\receiptService.js
function money(value) {
  return Number(value || 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

export function getReceiptNumber(paymentId) {
  return `RP-${new Date().getFullYear()}-${String(paymentId || "")
    .slice(0, 8)
    .toUpperCase()}`;
}

export function buildReceiptHtml({ payment, tenant, property, unit, company }) {
  const receiptNumber = payment.receiptNumber || getReceiptNumber(payment.id);
  const paidDate = payment.paidDate || new Date().toISOString().slice(0, 10);

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Rent Receipt ${receiptNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 32px;
    }
    .receipt {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 32px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    h1 {
      margin: 0;
      font-size: 34px;
    }
    h2 {
      margin: 0 0 8px;
      font-size: 20px;
    }
    .muted {
      color: #64748b;
      font-weight: 700;
    }
    .badge {
      display: inline-block;
      background: #dcfce7;
      color: #166534;
      font-weight: 900;
      border-radius: 999px;
      padding: 8px 14px;
      text-transform: uppercase;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      margin-top: 24px;
    }
    .box {
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 18px;
      background: #f8fafc;
    }
    .line {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      border-bottom: 1px solid #e2e8f0;
      padding: 12px 0;
      font-size: 16px;
    }
    .line:last-child {
      border-bottom: none;
    }
    .total {
      margin-top: 24px;
      border-radius: 18px;
      background: #0f172a;
      color: white;
      padding: 24px;
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      font-weight: 900;
    }
    .footer {
      margin-top: 24px;
      color: #64748b;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .receipt {
        border: none;
        border-radius: 0;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="top">
      <div>
        <h1>${company?.companyName || "Propel Properties"}</h1>
        <p class="muted">${company?.address || "Property Management"}</p>
        <p class="muted">${company?.contactEmail || ""} ${company?.contactPhone || ""}</p>
      </div>
      <div style="text-align:right;">
        <span class="badge">Paid</span>
        <p class="muted">Receipt # ${receiptNumber}</p>
        <p class="muted">Paid Date: ${paidDate}</p>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <h2>Tenant</h2>
        <div class="line"><strong>Name</strong><span>${tenant?.fullName || payment.tenantName || "Tenant"}</span></div>
        <div class="line"><strong>Email</strong><span>${tenant?.email || payment.tenantEmail || ""}</span></div>
        <div class="line"><strong>Phone</strong><span>${tenant?.phone || ""}</span></div>
      </div>

      <div class="box">
        <h2>Property / Unit</h2>
        <div class="line"><strong>Property</strong><span>${property?.propertyName || payment.propertyName || payment.propertyId || ""}</span></div>
        <div class="line"><strong>Unit</strong><span>${unit?.unitNumber || payment.unitNumber || payment.unitId || ""}</span></div>
        <div class="line"><strong>Due Date</strong><span>${payment.dueDate || ""}</span></div>
      </div>
    </div>

    <div class="box" style="margin-top:24px;">
      <h2>Payment Details</h2>
      <div class="line"><strong>Payment Method</strong><span>${payment.paymentMethod || "stripe"}</span></div>
      <div class="line"><strong>Payment Status</strong><span>${payment.paymentStatus || "paid"}</span></div>
      <div class="line"><strong>Transaction ID</strong><span>${payment.stripePaymentIntentId || payment.stripeSessionId || payment.id || ""}</span></div>
    </div>

    <div class="total">
      <span>Total Paid</span>
      <span>${money(payment.amountPaid || payment.amountDue)}</span>
    </div>

    <p class="footer">
      This receipt confirms rent payment was recorded for the property/unit listed above.
    </p>
  </div>
</body>
</html>
`;
}

export function downloadReceiptHtml({ payment, tenant, property, unit, company }) {
  const html = buildReceiptHtml({ payment, tenant, property, unit, company });
  const receiptNumber = payment.receiptNumber || getReceiptNumber(payment.id);

  const blob = new Blob([html], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${receiptNumber}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}