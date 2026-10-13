import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "public", "videos", "2026");
const outputRoot = path.join(root, "public", "media", "video-posters");

const safeStem = (filename) =>
  filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function collect(dir) {
  const files = [];
  if (!(await exists(dir))) return files;
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(full)));
    else if (/-poster\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

async function main() {
  const posters = await collect(sourceRoot);
  await fs.mkdir(outputRoot, { recursive: true });

  for (const input of posters) {
    const filename = path.basename(input);
    const output = path.join(outputRoot, `${safeStem(filename)}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 72, effort: 5, smartSubsample: true })
      .toFile(output);
  }

  console.log(`Optimized ${posters.length} HED video poster images.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
