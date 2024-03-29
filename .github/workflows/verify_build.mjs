import { strict as assert } from "node:assert";
import { statSync } from "node:fs";
import { globSync } from "glob";

const expected = [
  "background.js",
  "img",
  "img/icon_128.png",
  "img/icon_16.png",
  "img/icon_48.png",
  "index.js",
  "manifest.json",
];
const actual = globSync("./**/*", { cwd: "./dist" }).sort();
assert.deepEqual(actual, expected);

for (const path of actual) {
  const stat = statSync(`./dist/${path}`);
  if (stat.isFile() && stat.size === 0) {
    assert.fail(`Empty file: ${path}`);
  }
}
