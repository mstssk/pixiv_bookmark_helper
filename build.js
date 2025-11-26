import fs from "node:fs/promises";
import esbuild from "esbuild";
import { cleandir } from "@mstssk/cleandir";
import srcManifest from "./src/manifest.json" with { type: "json" };
import srcPackage from "./package.json" with { type: "json" };

const OUT_DIR = "./dist";

await cleandir(OUT_DIR);

await esbuild.build({
  entryPoints: ["src/index.ts", "src/jump.ts", "src/background.ts"],
  bundle: true,
  outdir: OUT_DIR,
});

// アイコン
await fs.cp("src/img", `${OUT_DIR}/img`, { recursive: true });

// manifest.json
const manifest = {
  ...srcManifest,
  description: srcPackage.description,
  version: srcPackage.version,
};
await fs.writeFile(
  `${OUT_DIR}/manifest.json`,
  JSON.stringify(manifest, null, 2),
);
