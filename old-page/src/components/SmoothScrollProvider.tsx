import { useEffect } from "react";
import { initSmoothScroll } from "../lib/smoothScroll";

export default function SmoothScrollProvider() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return null;
}
