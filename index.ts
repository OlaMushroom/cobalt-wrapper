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
  url?: string;
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
    const res = await fetch(url);
    if (!res.ok) throw Error(`HTTP Error: ${res.status} ${res.statusText}`);
    const file = contentDisposition.parse(
      res.headers.get('Content-Disposition') as string
    ).parameters.filename;
    console.log(`Writing file...: ${file}`);
    const dir = './downloaded/';
    mkdirSync(dir, { recursive: true });
    const path = dir + file;
    writeFileSync(path, new Uint8Array(await res.arrayBuffer()));
    console.log(`File written successfully: ${path}`);
  } catch (e) {
    throw Error('Error: ', { cause: e });
  }
}
