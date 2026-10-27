"use client";
import { useEffect, useState } from "react";

// A small localStorage-backed state for per-browser data (wishlist, addresses, your reviews).
// `seed` is used only when the key has never been written in this browser (absent, not empty).
export function useStored<T>(key: string, initial: T, seed?: T): [T, (v: T | ((p: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
      else if (raw === null && seed !== undefined) setValue(seed);
    } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);
  return [value, setValue, ready];
}
