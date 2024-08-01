export default async function request(req: {
  url: string | null
  vCodec?: 'h264' | 'av1' | 'vp9'
  vQuality?:
    | '144'
    | '240'
    | '360'
    | '480'
    | '720'
    | '1080'
    | '1440'
    | '2160'
    | 'max'
    | string
  aFormat?: 'best' | 'mp3' | 'ogg' | 'opus' | 'wav'
  filenamePattern?: 'classic' | 'pretty' | 'basic' | 'nerdy'
  isAudioOnly?: boolean
  isTTFullAudio?: boolean
  isAudioMuted?: boolean
  dubLang?: boolean
  disableMetadata?: boolean
  twitterGif?: boolean
  tiktokH265?: boolean
}): Promise<{
  status: 'error' | 'redirect' | 'stream' | 'success' | 'rate-limit' | 'picker'
  text?: string
  url?: string
  pickerType?: 'various' | 'images'
  picker?: {
    type?: 'video' | 'photo' | 'gif'
    url: string
    thumb?: string
  }[]
  audio?: string
}> {
  try {
    const res = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    if (!res.ok) throw Error(`HTTP Error: ${res.status} ${res.statusText}`)
    return await res.json()
  } catch (e) {
    throw Error('Error: ', { cause: e })
  }
}
