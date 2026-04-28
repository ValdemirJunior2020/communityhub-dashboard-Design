// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\services\paymentService.js
import { auth } from "../firebase/firebase";
import { APP_MODE } from "../config/appMode";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export async function startRentCheckout(paymentId) {
  if (APP_MODE.isDemo) {
    throw new Error(APP_MODE.demoLockMessage);
  }

  if (!paymentId) {
    throw new Error("Missing payment ID.");
  }

  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to pay rent.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_BASE_URL}/api/payments/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ paymentId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Unable to start checkout.");
  }

  if (!data.url) {
    throw new Error("Payment checkout URL was not returned.");
  }

  window.location.href = data.url;
}