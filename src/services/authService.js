// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export async function signupUser({ fullName, email, password, phone = "", requestedRole = "viewer" }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: fullName });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    fullName,
    email,
    phone,
    requestedRole,
    role: "viewer",
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp()
  });

  return userCredential;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, "users", userCredential.user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } else {
    await setDoc(userRef, {
      uid: userCredential.user.uid,
      fullName: userCredential.user.displayName || "New User",
      email: userCredential.user.email,
      phone: "",
      role: "viewer",
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    });
  }

  return userCredential;
}

export function logoutUser() {
  return signOut(auth);
}

export function resetUserPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
