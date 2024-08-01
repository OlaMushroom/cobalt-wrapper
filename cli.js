#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { cac } from 'cac'
import contentDisposition from 'content-disposition'
import cobalt from './lib/index.js'
const dir = './downloaded/'
const cli = cac('cobalt')
cli.help()
cli.option('-c, --clean', 'Clean the cache directory')
cli
  .command('request <url>', 'Request download stream')
  .alias('r')
  .option('-d, --download', 'Download file')
  .action(async (url, options) => {
    const data = await cobalt({ url })
    console.log(data)
    if (options.download) {
      try {
        const res = await fetch(data.url)
        if (!res.ok) throw Error(`HTTP Error: ${res.status} ${res.statusText}`)
        const file = contentDisposition.parse(
          res.headers.get('Content-Disposition')
        ).parameters.filename
        console.log(`Writing file...: ${file}`)
        mkdirSync(dir, { recursive: true })
        const path = dir + file
        writeFileSync(path, new Uint8Array(await res.arrayBuffer()))
        console.log(`File written successfully: ${path}`)
      } catch (e) {
        throw Error('Error: ', { cause: e })
      }
    }
  })
cli.parse()
const opts = cli.options
if (opts.clean) {
  if (existsSync(dir)) {
    try {
      rmSync(dir, { recursive: true, force: true })
      console.log('Cleaned cache successfully.')
    } catch (e) {
      throw Error('Error: ', { cause: e })
    }
  } else console.log('No cache directory is found.')
}
