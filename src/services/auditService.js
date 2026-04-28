// src/services/auditService.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function writeAuditLog({ action, collectionName, documentId, user, description }) {
  if (!user?.uid) return;

  await addDoc(collection(db, "auditLogs"), {
    action,
    collectionName,
    documentId: documentId || "unknown",
    userId: user.uid,
    userEmail: user.email || "unknown",
    description,
    createdAt: serverTimestamp()
  });
}
