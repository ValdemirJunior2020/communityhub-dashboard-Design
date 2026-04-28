// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\context\AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { loginUser, logoutUser, resetUserPassword, signupUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
      setUserProfile(null);

      if (!firebaseUser) {
        setProfileLoading(false);
        setLoading(false);
        return;
      }

      setProfileLoading(true);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser?.uid) return undefined;

    const userRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserProfile({
            id: snapshot.id,
            ...snapshot.data(),
          });
        } else {
          setUserProfile({
            uid: currentUser.uid,
            fullName: currentUser.displayName || "New User",
            email: currentUser.email || "",
            phone: "",
            role: "viewer",
            status: "active",
          });
        }

        setProfileLoading(false);
      },
      () => {
        setUserProfile({
          uid: currentUser.uid,
          fullName: currentUser.displayName || "New User",
          email: currentUser.email || "",
          phone: "",
          role: "viewer",
          status: "active",
        });

        setProfileLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const value = useMemo(
    () => ({
      user: currentUser,
      currentUser,
      userProfile,
      loading: loading || profileLoading,
      login: loginUser,
      signup: signupUser,
      logout: logoutUser,
      resetPassword: resetUserPassword,
    }),
    [currentUser, userProfile, loading, profileLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}