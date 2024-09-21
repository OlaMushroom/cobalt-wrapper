async function request(options?: object) {
  try {
    const res = await fetch('https://api.cobalt.tools', options)
    if (!res.ok) throw Error(`HTTP Error: ${res.status} ${res.statusText}`)
    return await res.json()
  } catch (e) {
    throw Error('Error: ', { cause: e })
  }
}
export const info = async (): Promise<{
  cobalt: {
    version: string
    url: string
    startTime: string
    durationLimit: number
    services: string[]
  }
  git: {
    commit: string
    branch: string
    remote: string
  }
}> => await request()
export default async function cobalt(req: {
  url: string
  videoQuality?:
    | '144'
    | '240'
    | '360'
    | '480'
    | '720'
    | '1080'
    | '1440'
    | '2160'
    | '4320'
    | 'max'
    | string
  audioFormat?: 'best' | 'mp3' | 'ogg' | 'opus' | 'wav'
  audioBitrate?: '8' | '64' | '96' | '128' | '256' | '320'
  filenameStyle?: 'classic' | 'pretty' | 'basic' | 'nerdy'
  downloadMode?: 'auto' | 'audio' | 'mute'
  youtubeVideoCodec?: 'h264' | 'av1' | 'vp9'
  youtubeDubLang?: 'en' | 'ru' | 'cs' | 'ja' | string
  youtubeDubBrowserLang?: boolean
  alwaysProxy?: boolean
  disableMetadata?: boolean
  tiktokFullAudio?: boolean
  tiktokH265?: boolean
  twitterGif?: boolean
}): Promise<{
  status: 'error' | 'picker' | 'redirect' | 'tunnel'
  url?: string
  filename?: string
  audio?: string
  audioFilename?: string
  picker?: {
    type: 'photo' | 'video' | 'gif'
    url: string
    thumb?: string
  }[]
  error?: {
    code: string
    context?: {
      service?: string
      limit?: number
    }
  }
}> {
  return await request({
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
}
