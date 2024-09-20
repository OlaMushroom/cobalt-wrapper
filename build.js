await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './lib',
  packages: 'external',
  format: 'esm',
  minify: true
})
