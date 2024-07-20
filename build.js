console.log(
  await Bun.build({
    entrypoints: ['./index.ts'],
    outdir: './lib',
    format: 'esm',
    target: 'node',
    external: ['contentDisposition', 'safe-buffer']
  })
);
