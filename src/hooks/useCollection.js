// src/hooks/useCollection.js
import { useEffect, useState } from "react";
import { subscribeToCollection } from "../services/firestoreService";

export function useCollection(collectionName, orderField = "createdAt", enabled = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      setData([]);
      setLoading(false);
      setError("");
      return undefined;
    }

    setLoading(true);
    const unsubscribe = subscribeToCollection(
      collectionName,
      (items) => {
        setData(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Unable to load data.");
        setLoading(false);
      },
      orderField
    );

    return unsubscribe;
  }, [collectionName, enabled, orderField]);

  return { data, loading, error };
}
