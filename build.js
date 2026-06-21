import * as esbuild from "esbuild";
import fs from "node:fs/promises";

const OUT_DIR = "./dist";

const srcManifest = JSON.parse(
  await fs.readFile("./src/manifest.json", "utf-8"),
);
const srcPackage = JSON.parse(await fs.readFile("./package.json", "utf-8"));

await fs.rm(OUT_DIR, { recursive: true, force: true });
await fs.mkdir(OUT_DIR, { recursive: true });

await esbuild.build({
  entryPoints: ["src/index.ts", "src/jump.ts", "src/background.ts"],
  outdir: OUT_DIR,
  format: "esm",
  bundle: true,
  target: "es2020",
});

await fs.cp("src/img", `${OUT_DIR}/img`, { recursive: true });

const manifest = {
  ...srcManifest,
  description: srcPackage.description,
  version: srcPackage.version,
};
await fs.writeFile(
  `${OUT_DIR}/manifest.json`,
  JSON.stringify(manifest, null, 2),
);
