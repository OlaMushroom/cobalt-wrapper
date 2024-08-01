await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './lib',
  packages: 'external',
  target: 'node',
  format: 'esm',
  minify: true
})
