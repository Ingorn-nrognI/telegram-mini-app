import { TLottieWasmExports } from './wasm';
export interface WasmAlloc {
    ptr: number;
    len: number;
}
/**
 * Allocates `bytes.length` bytes in wasm memory and copies `bytes` in.
 * Returns null on allocation failure (OOM or zero length).
 *
 * The memory view is always freshly derived from the current
 * `exports.memory.buffer` right before the copy — never cache a view across
 * an `tlottie_alloc`/`tlottie_*` call, since memory growth detaches prior
 * `ArrayBuffer`s.
 */
export declare function writeBytes(exports: TLottieWasmExports, bytes: Uint8Array): WasmAlloc | null;
export declare function freeBytes(exports: TLottieWasmExports, alloc: WasmAlloc): void;
/** Freshly derives a view over an instance-owned RGBA8 render target. Do not retain past the next render call. */
export declare function readRgba(exports: TLottieWasmExports, ptr: number, width: number, height: number): Uint8ClampedArray<ArrayBuffer>;
/** Freshly derives a view over an instance-owned Alpha8 render target. Do not retain past the next render call. */
export declare function readAlpha8(exports: TLottieWasmExports, ptr: number, width: number, height: number): Uint8Array<ArrayBuffer>;
