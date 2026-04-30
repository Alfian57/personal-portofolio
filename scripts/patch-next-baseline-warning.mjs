import fs from "node:fs";
import path from "node:path";

const targetFile = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "compiled",
  "browserslist",
  "index.js",
);

if (!fs.existsSync(targetFile)) {
  process.exit(0);
}

const source = fs.readFileSync(targetFile, "utf8");
const warningPattern =
  /console\.warn\("\[baseline-browser-mapping\] The data in this module is over two months old\.\s+To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`"\)/;

if (!warningPattern.test(source)) {
  process.exit(0);
}

const patchedSource = source.replace(warningPattern, "void 0");

if (patchedSource !== source) {
  fs.writeFileSync(targetFile, patchedSource);
  console.log("Patched Next.js compiled browserslist baseline warning.");
}
