import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts', 'src/helpers.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  minify: false,
  treeshake: true,
  cjsInterop: true,
});
