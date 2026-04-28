// src/hooks/useCollectionWhere.js
import { useEffect, useState } from "react";
import { subscribeToCollectionWhere } from "../services/firestoreService";

export function useCollectionWhere(collectionName, fieldName, operator, value, enabled = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled || value === undefined || value === null || value === "") {
      setData([]);
      setLoading(false);
      setError("");
      return undefined;
    }

    setLoading(true);
    const unsubscribe = subscribeToCollectionWhere(
      collectionName,
      fieldName,
      operator,
      value,
      (items) => {
        setData(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Unable to load filtered data.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, enabled, fieldName, operator, value]);

  return { data, loading, error };
}
