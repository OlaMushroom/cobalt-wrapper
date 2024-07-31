export declare function request(req: {
    url: string | null;
    vCodec?: 'h264' | 'av1' | 'vp9';
    vQuality?: '144' | '240' | '360' | '480' | '720' | '1080' | '1440' | '2160' | 'max' | string;
    aFormat?: 'best' | 'mp3' | 'ogg' | 'opus' | 'wav';
    filenamePattern?: 'classic' | 'pretty' | 'basic' | 'nerdy';
    isAudioOnly?: boolean;
    isTTFullAudio?: boolean;
    isAudioMuted?: boolean;
    dubLang?: boolean;
    disableMetadata?: boolean;
    twitterGif?: boolean;
    tiktokH265?: boolean;
}): Promise<{
    status: 'error' | 'redirect' | 'stream' | 'success' | 'rate-limit' | 'picker';
    text?: string;
    url?: string;
    pickerType?: 'various' | 'images';
    picker?: {
        type?: 'video' | 'photo' | 'gif';
        url: string;
        thumb?: string;
    }[];
    audio?: string;
}>;
export declare function download(url: string): Promise<void>;
