import fs from "node:fs/promises";
import typescript from "@rollup/plugin-typescript";
import { cleandir } from "rollup-plugin-cleandir";
import srcManifest from "./src/manifest.json" with { type: "json" };
import srcPackage from "./package.json" with { type: "json" };

const OUT_DIR = "./dist";

export default {
  input: ["src/index.ts", "src/background.ts"],
  output: {
    dir: OUT_DIR,
    format: "es",
  },
  plugins: [
    cleandir(OUT_DIR),
    typescript(),
    {
      async writeBundle() {
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
      },
    },
  ],
};
