#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { cac } from 'cac'
import contentDisposition from 'content-disposition'
import sendRequest from './lib/index.js'
const cli = cac('cobalt')
cli.help()
cli.option('-c, --clean', 'Clean the cache directory')
function removeDir(dir) {
  if (existsSync(dir)) {
    try {
      rmSync(dir, { recursive: true, force: true })
      return true
    } catch (e) {
      throw Error('Error: ', { cause: e })
    }
  }
  return false
}
async function download(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw Error(`HTTP Error: ${res.status} ${res.statusText}`)
    const file = contentDisposition.parse(
      res.headers.get('Content-Disposition')
    ).parameters.filename
    console.log(`Writing file...: ${file}`)
    const dir = './downloaded/'
    mkdirSync(dir, { recursive: true })
    const path = dir + file
    writeFileSync(path, new Uint8Array(await res.arrayBuffer()))
    console.log(`File written successfully: ${path}`)
  } catch (e) {
    throw Error('Error: ', { cause: e })
  }
}
cli
  .command('request <url>', 'Request download stream')
  .alias('r')
  .option('-d, --download', 'Download file')
  .action(async (url, options) => {
    const req = await sendRequest({ url })
    console.log(req)
    if (options.download) download(req.url)
  })
cli.parse()
const opts = cli.options
if (opts.clean) {
  if (removeDir('./downloaded')) console.log('Cleaned cache successfully.')
  else console.log('No cache directory is found.')
}
