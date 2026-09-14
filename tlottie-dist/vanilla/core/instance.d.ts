import { FitzModifier, LayerColorReplacementInput, RenderQuality } from './types';
import { TLottieWasmExports } from './wasm';
export interface CreateInstanceOptions {
    fitzModifier?: FitzModifier;
    layerColorReplacements?: LayerColorReplacementInput[];
}
/**
 * Wraps a `tlottie_new*` pointer. Every render call returns a view into a
 * buffer owned (and reused) by this instance — never hold onto a returned
 * view past the next render/drop call.
 */
export declare class TLottieInstance {
    private ptr;
    readonly width: number;
    readonly height: number;
    readonly frameRate: number;
    readonly frameCount: number;
    private readonly exports;
    private constructor();
    static create(exports: TLottieWasmExports, json: Uint8Array, options?: CreateInstanceOptions): TLottieInstance | null;
    render(frame: number, width: number, height: number, quality?: RenderQuality): Uint8ClampedArray<ArrayBuffer> | null;
    renderAlpha8(frame: number, width: number, height: number, quality?: RenderQuality): Uint8Array<ArrayBuffer> | null;
    /** Renders the alpha mask expanded to a solid straight-alpha RGBA8 tint (0x00RRGGBB). */
    renderAlpha8Color(frame: number, width: number, height: number, color: number, quality?: RenderQuality): Uint8ClampedArray<ArrayBuffer> | null;
    drop(): void;
}
