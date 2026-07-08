"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { detectDeviceTier, type DeviceTier } from "@/lib/deviceCapability";

const DeviceTierContext = createContext<DeviceTier | null>(null);

export function DeviceTierProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<DeviceTier | null>(null);

  useEffect(() => {
    setTier(detectDeviceTier());
  }, []);

  return <DeviceTierContext.Provider value={tier}>{children}</DeviceTierContext.Provider>;
}

export function useDeviceTier() {
  return useContext(DeviceTierContext);
}
