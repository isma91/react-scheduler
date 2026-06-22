import { existsSync, readdirSync } from "fs";
import { exit } from "process";

const dir = "dist";

if (false === existsSync(dir)) {
  console.error("dist folder is missing. Run `npm run build`.");
  exit(1);
}

const files = readdirSync(dir);
if (0 === files.length) {
  console.error("dist folder is empty. Build seems broken.");
  exit(1);
}

if (false === files.includes("index.js") || false === files.includes("index.d.ts")) {
  console.error("dist/index.js or dist/index.d.ts is missing.");
  exit(1);
}

console.log("dist folder is valid.");
