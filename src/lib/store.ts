"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Toast = { id: number; message: string };

type State = {
  /** Event ids this visitor holds a spot for. */
  reservations: string[];
  toasts: Toast[];
  reserve: (id: string) => void;
  hasReserved: (id: string) => boolean;
  pushToast: (message: string) => void;
  dismissToast: (id: number) => void;
};

/** localStorage that never throws — private mode, disabled storage, quota. */
const safeStorage = {
  getItem: (name: string) => {
    try {
      return globalThis.localStorage?.getItem(name) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      globalThis.localStorage?.setItem(name, value);
    } catch {
      /* storage unavailable — reservations stay in memory for this session */
    }
  },
  removeItem: (name: string) => {
    try {
      globalThis.localStorage?.removeItem(name);
    } catch {
      /* no-op */
    }
  },
};

let toastSeq = 0;

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      reservations: [],
      toasts: [],

      reserve: (id) =>
        set((s) =>
          s.reservations.includes(id)
            ? s
            : { reservations: [...s.reservations, id] },
        ),

      hasReserved: (id) => get().reservations.includes(id),

      pushToast: (message) => {
        const id = ++toastSeq;
        set((s) => ({ toasts: [...s.toasts, { id, message }] }));
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
        }, 2800);
      },

      dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "bafl-reservations",
      storage: createJSONStorage(() => safeStorage),
      // Toasts are ephemeral; only reservations survive a refresh.
      partialize: (s) => ({ reservations: s.reservations }),
    },
  ),
);

/**
 * Reservations come from localStorage, so the first client render must match
 * the server's empty list. Components gate on this before trusting the store,
 * which keeps the markup identical on both sides and avoids hydration warnings.
 */
export function useHydrated() {
  return useSyncExternalStore(
    (onChange) => useStore.persist.onFinishHydration(onChange),
    () => useStore.persist.hasHydrated(),
    () => false, // server and first client paint agree: nothing restored yet
  );
}
