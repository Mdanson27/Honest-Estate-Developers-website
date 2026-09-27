import { properties } from "./data";

const heroAndCorridorImages = [
  "https://www.honestestatedevelopers.com/images/property/21025318020260608084742pm.jpg",
  "https://www.honestestatedevelopers.com/images/property/119185025120230921022129pm.jpg",
  "https://www.honestestatedevelopers.com/images/property/150364507020231006041201pm.jpg",
  "https://www.honestestatedevelopers.com/images/property/166002707620230926041943pm.jpg",
];

export const criticalImageUrls = Array.from(new Set(heroAndCorridorImages));

export const deferredImageUrls = Array.from(
  new Set(
    properties
      .map((property) => property.image)
      .filter(Boolean)
      .filter((src) => !criticalImageUrls.includes(src))
  )
);

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function loadAndDecodeImage(src, priority = "auto", timeoutMs = 2400) {
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
          // Successful network load is enough if decode() rejects.
        }
      }
      finish(true);
    };

    image.onerror = () => finish(false);
    image.src = src;

    if (image.complete && image.naturalWidth > 0) {
      finish(true);
    }
  });
}

async function loadSequentially(urls, { retries = 1, gapMs = 120 } = {}) {
  for (let index = 0; index < urls.length; index += 1) {
    const src = urls[index];
    let loaded = false;

    for (let attempt = 0; attempt <= retries && !loaded; attempt += 1) {
      const result = await loadAndDecodeImage(
        src,
        index === 0 ? "high" : "auto",
        attempt === 0 ? 2200 : 3000
      );
      loaded = result.ok;

      if (!loaded && attempt < retries) {
        await wait(250);
      }
    }

    if (gapMs && index < urls.length - 1) {
      await wait(gapMs);
    }
  }
}

export async function preloadCriticalImages(timeoutMs = 6500) {
  if (typeof window === "undefined" || typeof Image === "undefined") return;

  const work = loadSequentially(criticalImageUrls, {
    retries: 1,
    gapMs: 140,
  });

  const timeout = wait(timeoutMs);
  await Promise.race([work, timeout]);
}

export async function preloadDeferredImages() {
  if (typeof window === "undefined" || typeof Image === "undefined") return;
  await wait(650);
  await loadSequentially(deferredImageUrls, {
    retries: 0,
    gapMs: 240,
  });
}
