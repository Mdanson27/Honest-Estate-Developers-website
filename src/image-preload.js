import { company, properties } from "./data";

const extraCriticalImages = [
  "https://www.honestestatedevelopers.com/images/property/21025318020260608084742pm.jpg",
  "https://www.honestestatedevelopers.com/images/property/119185025120230921022129pm.jpg",
  "https://www.honestestatedevelopers.com/images/property/150364507020231006041201pm.jpg",
  "https://www.honestestatedevelopers.com/images/property/166002707620230926041943pm.jpg",
];

export const criticalImageUrls = Array.from(
  new Set([
    company.logo,
    ...extraCriticalImages,
    ...properties.map((property) => property.image).filter(Boolean),
  ])
);

function loadAndDecodeImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    try {
      image.fetchPriority = "high";
    } catch {
      // Older browsers can ignore fetchPriority.
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(src);
    };

    image.onload = async () => {
      if (typeof image.decode === "function") {
        try {
          await image.decode();
        } catch {
          // The image is still usable if decoding resolves via normal paint.
        }
      }
      finish();
    };

    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finish();
    }
  });
}

export async function preloadCriticalImages(timeoutMs = 5200) {
  if (typeof window === "undefined" || typeof Image === "undefined") return;

  const work = Promise.allSettled(
    criticalImageUrls.map((src) => loadAndDecodeImage(src))
  );

  const timeout = new Promise((resolve) => {
    window.setTimeout(resolve, timeoutMs);
  });

  await Promise.race([work, timeout]);
}
