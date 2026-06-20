"use client";

// Reusable hook that fetches data using a userId — handles loading and error states
import { useEffect, useState } from "react";

export function useSessionData(userId, fetcher, key) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetcher(userId).then((result) => {
      if (result.error) setError(result.error);
      else setData(result[key] ?? []);
      setLoading(false);
    });
  }, [userId]);

  return { data, error, loading };
}
