import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';

export default {
  input: 'src/index.ts',
  output: {
    dir: "dist",
    format: 'cjs'
  },
  plugins: [
    cleaner({
      targets: ["./dist"]
    }),
    typescript(),
    copy({
      targets: [
        {
          src: 'src/manifest.json',
          dest: 'dist',
          transform(content) {
            const manifest = JSON.parse(content);
            manifest.version = process.env.npm_package_version;
            return JSON.stringify(manifest, null, 2);
          }
        },
      ]
    })
  ]
}
