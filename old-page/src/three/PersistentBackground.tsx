import React, { Suspense, lazy, useEffect } from "react";
import { useDeviceCapability } from "../hooks/useDeviceCapability";
import SpaceBackground from "../components/SpaceBackground";

const FullScene = lazy(() => import("./FullScene"));

export default function PersistentBackground() {
  const tier = useDeviceCapability();

  useEffect(() => {
    if (tier !== "full") {
      window.dispatchEvent(new CustomEvent("mitrox:background-ready"));
    }
  }, [tier]);

  if (tier === "static") {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: "radial-gradient(120% 80% at 50% -10%, rgba(138,92,255,0.18), transparent 60%), #000000",
        }}
        aria-hidden="true"
      />
    );
  }

  if (tier === "lite") {
    return <SpaceBackground />;
  }

  return (
    <Suspense fallback={null}>
      <FullScene onReady={() => window.dispatchEvent(new CustomEvent("mitrox:background-ready"))} />
    </Suspense>
  );
}
