// src/services/firestoreService.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { writeAuditLog } from "./auditService";

export function subscribeToCollection(collectionName, callback, errorCallback, orderField = "createdAt") {
  const q = query(collection(db, collectionName), orderBy(orderField, "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    errorCallback
  );
}

export function subscribeToCollectionWhere(collectionName, fieldName, operator, value, callback, errorCallback) {
  const q = query(collection(db, collectionName), where(fieldName, operator, value));
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    errorCallback
  );
}

export async function fetchCollection(collectionName) {
  const snapshot = await getDocs(query(collection(db, collectionName), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function fetchDocument(collectionName, documentId) {
  const snapshot = await getDoc(doc(db, collectionName, documentId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function createRecord(collectionName, data, user, description = "Created record") {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  await writeAuditLog({ action: "create", collectionName, documentId: ref.id, user, description });
  return ref.id;
}

export async function updateRecord(collectionName, documentId, data, user, description = "Updated record") {
  await updateDoc(doc(db, collectionName, documentId), {
    ...data,
    updatedAt: serverTimestamp()
  });

  await writeAuditLog({ action: "update", collectionName, documentId, user, description });
}

export async function deleteRecord(collectionName, documentId, user, description = "Deleted record") {
  await deleteDoc(doc(db, collectionName, documentId));
  await writeAuditLog({ action: "delete", collectionName, documentId, user, description });
}

export async function setRecord(collectionName, documentId, data, user, description = "Saved record") {
  await setDoc(
    doc(db, collectionName, documentId),
    {
      ...data,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  await writeAuditLog({ action: "set", collectionName, documentId, user, description });
}

export function formatDate(value) {
  if (!value) return "—";
  if (typeof value === "string") return value;
  if (value?.toDate) return value.toDate().toLocaleDateString();
  return "—";
}

export function formatDateTime(value) {
  if (!value) return "—";
  if (value?.toDate) return value.toDate().toLocaleString();
  if (typeof value === "string") return value;
  return "—";
}
