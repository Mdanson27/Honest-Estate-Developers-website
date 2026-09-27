import { properties } from "./data";

export const criticalImageUrls = Array.from(
  new Set(properties.map((property) => property.image).filter(Boolean))
);

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function loadAndDecodeImage(src, priority = "auto", timeoutMs = 1800) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";

    try {
      image.fetchPriority = priority;
    } catch {
      // Browsers without fetchPriority can ignore this hint.
    }

    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve({ src, ok });
    };

    const timeout = window.setTimeout(() => finish(false), timeoutMs);

    image.onload = async () => {
      if (typeof image.decode === "function") {
        try {
          await image.decode();
        } catch {
          // The successfully loaded image can still be painted.
        }
      }
      finish(true);
    };

    image.onerror = () => finish(false);
    image.src = src;

    if (image.complete && image.naturalWidth > 0) finish(true);
  });
}

export async function preloadCriticalImages(timeoutMs = 2600) {
  if (typeof window === "undefined" || typeof Image === "undefined") return;

  await Promise.race([
    Promise.allSettled(
      criticalImageUrls.map((src, index) =>
        loadAndDecodeImage(src, index === 0 ? "high" : "auto")
      )
    ),
    wait(timeoutMs),
  ]);
}

// All verified property images are now same-origin and preloaded with the loader.
// Kept as a no-op for compatibility with the existing loader flow.
export async function preloadDeferredImages() {
  return undefined;
}
