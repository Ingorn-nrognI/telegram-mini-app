import { initializeTLottie } from '../main/initialize';
import { configureTLottie, TLottie, TLottieConfig } from '../main/TLottie';
export * from '../core/types';
export type { InitializeTLottieOptions } from '../main/initialize';
export type { TLottieConfig };
export { configureTLottie, initializeTLottie, TLottie };
export interface CreateTLottiePlayerOptions extends Omit<TLottieConfig, "canvas"> {
    /** Raw SVG string used as a loading/error skeleton via CSS mask-image. */
    outline?: string;
    className?: string;
    /** When set, clicking the canvas calls `play()` — mainly useful for non-looping animations that should replay on click after completing. */
    playOnClick?: boolean;
}
export interface TLottiePlayerHandle {
    readonly tlottie: TLottie;
    readonly element: HTMLDivElement;
    readonly canvas: HTMLCanvasElement;
    destroy(): void;
}
/** Builds a canvas + optional shimmer skeleton inside `container` and wires up a TLottie player. */
export declare function createTLottiePlayer(container: HTMLElement, options: CreateTLottiePlayerOptions): TLottiePlayerHandle;
