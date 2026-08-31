import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  entry: [
    'src/index.ts',
    'src/limit-m1.ts',
    'src/limit-m2.ts',
    'src/limit-p1.ts',
    'src/limit-p2.ts',
  ],
  format: 'esm',
  minify: true,
  outDir: 'dist',
  platform: 'neutral',
  sourcemap: 'hidden',
});
