import { mkdirSync, writeFileSync } from 'node:fs';
import contentDisposition from 'content-disposition';

export interface RequestBody {
  url: string | null;
  vCodec?: 'h264' | 'av1' | 'vp9';
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
    | string;
  aFormat?: 'best' | 'mp3' | 'ogg' | 'opus' | 'wav';
  filenamePattern?: 'classic' | 'pretty' | 'basic' | 'nerdy';
  isAudioOnly?: boolean;
  isTTFullAudio?: boolean;
  isAudioMuted?: boolean;
  dubLang?: boolean;
  disableMetadata?: boolean;
  twitterGif?: boolean;
  tiktokH265?: boolean;
}

interface ResponseBody {
  status: 'error' | 'redirect' | 'stream' | 'success' | 'rate-limit' | 'picker';
  text?: string;
  url: string;
  pickerType?: 'various' | 'images';
  picker?: PickerItem[];
  audio?: string;
}

interface PickerItem {
  type?: 'video';
  url: string;
  thumb?: string;
}

export async function request(req: RequestBody): Promise<ResponseBody> {
  try {
    const res = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });
    if (!res.ok) throw Error(`HTTP Error: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (e) {
    throw Error('Error: ', { cause: e });
  }
}

export async function download(url: string): Promise<void> {
  try {
    const data = await fetch(url);
    const file = contentDisposition.parse(
      data.headers.get('Content-Disposition') as string
    ).parameters.filename;
    const path = './downloaded/';
    mkdirSync(path, { recursive: true });
    console.log(`Writing file...: ${file}`);
    writeFileSync(`${path}${file}`, new Uint8Array(await data.arrayBuffer()));
    console.log(`File written successfully: ${path}${file}`);
  } catch (e) {
    throw Error('Error: ', { cause: e });
  }
}
