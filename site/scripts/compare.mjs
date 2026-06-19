import sharp from "sharp";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(root, "public", "images", "design-reference.png");
const implementationPath = path.join(root, "screenshots", "desktop-full.png");
const outputPath = path.join(root, "screenshots", "qa-comparison.png");

const source = await sharp(sourcePath).png().toBuffer();
const implementation = await sharp(implementationPath).png().toBuffer();
const sourceMeta = await sharp(source).metadata();
const implementationMeta = await sharp(implementation).metadata();
const width = (sourceMeta.width ?? 0) + (implementationMeta.width ?? 0);
const height = Math.max(sourceMeta.height ?? 0, implementationMeta.height ?? 0);

await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: "#f5efe3",
  },
})
  .composite([
    { input: source, left: 0, top: 0 },
    { input: implementation, left: sourceMeta.width ?? 0, top: 0 },
  ])
  .png()
  .toFile(outputPath);

console.log(outputPath);
