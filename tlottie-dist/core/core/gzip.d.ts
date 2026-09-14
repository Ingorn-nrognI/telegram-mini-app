/** `.tgs` files (Telegram sticker Lottie) are plain Lottie JSON gzipped — detect by magic bytes. */
export declare function isGzip(bytes: Uint8Array): boolean;
/** Decompresses gzip bytes using the browser-native streaming API — no gzip dependency needed. */
export declare function gunzip(bytes: Uint8Array): Promise<Uint8Array>;
/** Decompresses `bytes` if gzipped, otherwise returns them unchanged. */
export declare function decodeAnimationBytes(bytes: Uint8Array): Promise<Uint8Array>;
