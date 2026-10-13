import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "public", "property-images", "2026");
const outputRoot = path.join(root, "public", "media");
const posterSource = path.join(root, "public", "videos", "2026", "mpambire");
const posterOutput = path.join(outputRoot, "video-posters");

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

async function optimizePhoto(folder, filename) {
  const input = path.join(sourceRoot, folder, filename);
  const destination = path.join(outputRoot, folder);
  await fs.mkdir(destination, { recursive: true });

  const stem = safeStem(filename);
  const main = path.join(destination, `${stem}-main.webp`);
  const thumb = path.join(destination, `${stem}-thumb.webp`);

  await Promise.all([
    sharp(input)
      .rotate()
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5, smartSubsample: true })
      .toFile(main),
    sharp(input)
      .rotate()
      .resize({ width: 520, withoutEnlargement: true })
      .webp({ quality: 68, effort: 5, smartSubsample: true })
      .toFile(thumb),
  ]);
}

async function optimizePoster(filename) {
  const input = path.join(posterSource, filename);
  if (!(await exists(input))) return;

  await fs.mkdir(posterOutput, { recursive: true });
  const output = path.join(posterOutput, `${safeStem(filename)}.webp`);

  await sharp(input)
    .rotate()
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 72, effort: 5, smartSubsample: true })
    .toFile(output);
}

async function runPool(tasks, concurrency = 4) {
  let cursor = 0;
  async function worker() {
    while (cursor < tasks.length) {
      const task = tasks[cursor++];
      await task();
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length || 1) }, worker));
}

async function main() {
  await fs.rm(outputRoot, { recursive: true, force: true });

  if (!(await exists(sourceRoot))) {
    console.log("No 2026 property image library found; skipping media optimization.");
    return;
  }

  const folders = await fs.readdir(sourceRoot, { withFileTypes: true });
  const tasks = [];
  let sourceCount = 0;

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const folderPath = path.join(sourceRoot, folder.name);
    const files = await fs.readdir(folderPath);
    for (const filename of files) {
      if (!/\.(jpe?g|png|webp)$/i.test(filename)) continue;
      sourceCount += 1;
      tasks.push(() => optimizePhoto(folder.name, filename));
    }
  }

  await runPool(tasks, 4);
  await Promise.all([
    optimizePoster("mpambire-drone-poster.jpg"),
    optimizePoster("mpambire-site-visit-1-poster.jpg"),
    optimizePoster("mpambire-site-visit-3-poster.jpg"),
  ]);

  console.log(`Optimized ${sourceCount} estate photos into 1440px main and 520px thumbnail WebP files.`);
  console.log("Video poster frames were converted to lightweight WebP. Video files themselves are never preloaded by the UI.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
