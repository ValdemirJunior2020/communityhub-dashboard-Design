// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\server\server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const admin = require("firebase-admin");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const STRIPE_CURRENCY = process.env.STRIPE_CURRENCY || "usd";

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

function initializeFirebaseAdmin() {
  if (admin.apps.length) return;

  const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!encodedServiceAccount) {
    console.warn("Missing FIREBASE_SERVICE_ACCOUNT_BASE64. Payment endpoints will not work until this is added.");
    return;
  }

  const serviceAccount = JSON.parse(
    Buffer.from(encodedServiceAccount, "base64").toString("utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
  });
}

initializeFirebaseAdmin();

function getDb() {
  if (!admin.apps.length) {
    throw new Error("Firebase Admin is not initialized.");
  }

  return admin.firestore();
}

function getAdminTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

async function verifyFirebaseToken(req) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    const error = new Error("Missing Firebase auth token.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.replace("Bearer ", "");
  return admin.auth().verifyIdToken(token);
}

function isStaffRole(role) {
  return ["superAdmin", "admin", "manager"].includes(role);
}

async function getUserProfile(uid) {
  const db = getDb();
  const profileSnap = await db.collection("users").doc(uid).get();

  if (!profileSnap.exists) {
    return null;
  }

  return {
    id: profileSnap.id,
    ...profileSnap.data(),
  };
}

async function createReceiptForPayment({ paymentId, paymentData, session }) {
  const db = getDb();

  const receiptRef = db.collection("receipts").doc(paymentId);
  const receiptSnap = await receiptRef.get();

  if (receiptSnap.exists) {
    return;
  }

  const receiptNumber = `RP-${new Date().getFullYear()}-${paymentId.slice(0, 8).toUpperCase()}`;

  await receiptRef.set({
    receiptNumber,
    paymentId,
    tenantId: paymentData.tenantId || "",
    tenantName: paymentData.tenantName || "",
    tenantEmail: paymentData.tenantEmail || "",
    propertyId: paymentData.propertyId || "",
    propertyName: paymentData.propertyName || "",
    unitId: paymentData.unitId || "",
    unitNumber: paymentData.unitNumber || "",
    amountDue: Number(paymentData.amountDue || 0),
    amountPaid: Number(paymentData.amountDue || paymentData.amountPaid || 0),
    currency: STRIPE_CURRENCY.toUpperCase(),
    paymentMethod: "stripe",
    stripeSessionId: session?.id || "",
    stripePaymentIntentId: session?.payment_intent || "",
    paidDate: new Date().toISOString().slice(0, 10),
    status: "paid",
    createdAt: getAdminTimestamp(),
    updatedAt: getAdminTimestamp(),
  });
}

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!stripe || !STRIPE_WEBHOOK_SECRET) {
      return res.status(500).json({
        error: "Stripe webhook is not configured.",
      });
    }

    let event;

    try {
      const signature = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        if (session.payment_status === "paid") {
          const paymentId = session.metadata?.paymentId;

          if (!paymentId) {
            throw new Error("Missing paymentId metadata on Stripe session.");
          }

          const db = getDb();
          const paymentRef = db.collection("rentPayments").doc(paymentId);
          const paymentSnap = await paymentRef.get();

          if (!paymentSnap.exists) {
            throw new Error(`Payment ${paymentId} not found.`);
          }

          const paymentData = paymentSnap.data();
          const amountPaid = Number(paymentData.amountDue || 0);

          await paymentRef.update({
            amountPaid,
            paidDate: new Date().toISOString().slice(0, 10),
            paymentStatus: "paid",
            paymentMethod: "stripe",
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent || "",
            updatedAt: getAdminTimestamp(),
          });

          await createReceiptForPayment({
            paymentId,
            paymentData,
            session,
          });

          await db.collection("auditLogs").add({
            action: "payment_paid",
            collectionName: "rentPayments",
            documentId: paymentId,
            userId: session.metadata?.userId || "",
            userEmail: session.customer_details?.email || paymentData.tenantEmail || "",
            description: `Stripe rent payment completed for ${paymentData.tenantName || "tenant"}.`,
            createdAt: getAdminTimestamp(),
          });
        }
      }

      return res.json({ received: true });
    } catch (err) {
      console.error("Webhook processing failed:", err);
      return res.status(500).json({
        error: err.message || "Webhook failed.",
      });
    }
  }
);

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    stripeConfigured: Boolean(STRIPE_SECRET_KEY),
    firebaseAdminConfigured: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64),
  });
});

app.post("/api/payments/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: "Stripe is not configured. Add STRIPE_SECRET_KEY in server/.env.",
      });
    }

    const decodedUser = await verifyFirebaseToken(req);
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        error: "paymentId is required.",
      });
    }

    const db = getDb();
    const userProfile = await getUserProfile(decodedUser.uid);

    if (!userProfile || userProfile.status !== "active") {
      return res.status(403).json({
        error: "Your account is inactive or missing a user profile.",
      });
    }

    const paymentRef = db.collection("rentPayments").doc(paymentId);
    const paymentSnap = await paymentRef.get();

    if (!paymentSnap.exists) {
      return res.status(404).json({
        error: "Rent payment record was not found.",
      });
    }

    const paymentData = paymentSnap.data();

    const userIsStaff = isStaffRole(userProfile.role);
    const userIsTenant =
      userProfile.tenantId === paymentData.tenantId ||
      paymentData.tenantEmail === decodedUser.email;

    if (!userIsStaff && !userIsTenant) {
      return res.status(403).json({
        error: "You are not allowed to pay this rent record.",
      });
    }

    if (paymentData.paymentStatus === "paid") {
      return res.status(400).json({
        error: "This rent payment is already paid.",
      });
    }

    const amountDue = Number(paymentData.amountDue || 0);
    const amountPaid = Number(paymentData.amountPaid || 0);
    const balance = Math.max(amountDue - amountPaid, 0);

    if (balance <= 0) {
      return res.status(400).json({
        error: "This rent payment does not have a balance due.",
      });
    }

    const amountInCents = Math.round(balance * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      client_reference_id: paymentId,
      customer_email: decodedUser.email || paymentData.tenantEmail || undefined,
      success_url: `${CLIENT_URL}/payment-success?paymentId=${paymentId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/payment-cancel?paymentId=${paymentId}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: STRIPE_CURRENCY,
            unit_amount: amountInCents,
            product_data: {
              name: `Rent Payment - ${paymentData.propertyName || "Property"}`,
              description: `Tenant: ${paymentData.tenantName || "Tenant"} | Unit: ${
                paymentData.unitNumber || paymentData.unitId || "N/A"
              } | Due date: ${paymentData.dueDate || "N/A"}`,
            },
          },
        },
      ],
      metadata: {
        paymentId,
        tenantId: paymentData.tenantId || "",
        propertyId: paymentData.propertyId || "",
        unitId: paymentData.unitId || "",
        userId: decodedUser.uid,
      },
    });

    await paymentRef.update({
      paymentStatus: "pending",
      stripeSessionId: session.id,
      updatedAt: getAdminTimestamp(),
    });

    return res.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Create checkout session failed:", err);

    return res.status(err.statusCode || 500).json({
      error: err.message || "Unable to create checkout session.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Propel payment server running on port ${PORT}`);
});