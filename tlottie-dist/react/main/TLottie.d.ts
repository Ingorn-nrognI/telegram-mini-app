import { FitzModifier, LayerColorReplacementInput, LoopConfig, PlayDirection, PlayerEventName, PlayerFrameSnapshot, PlayerState, RenderQuality, TLottieColorConfig, TLottieError, TLottiePlaybackConfig, TLottieSource } from '../core/types';
import { TLottieWorkerPool } from '../worker/pool';
export interface TLottieConfig extends TLottieSource, TLottiePlaybackConfig, TLottieColorConfig {
    canvas: HTMLCanvasElement;
    wasmUrl?: string | URL;
    quality?: Partial<RenderQuality>;
    /** Spins up a dedicated pool of this size just for this player, instead of using the shared default pool. */
    workerCount?: number;
    /** Advanced: bring your own worker pool (e.g. to share one across a subset of players). */
    pool?: TLottieWorkerPool;
    /** Keep rendering while off-screen (skips the IntersectionObserver pause). */
    forceRender?: boolean;
    /** Emit throttled (~10Hz) 'frame' events for progress UIs. Off by default — costs a postMessage per emission. */
    reportFrames?: boolean;
}
export type TLottieEventName = PlayerEventName | "error";
export interface TLottieEventPayload {
    frames?: PlayerFrameSnapshot;
    error?: TLottieError;
}
export type TLottieListener = (payload: TLottieEventPayload) => void;
/** Sets the default worker pool size for players that don't bring their own pool/workerCount. Call once, before creating players. */
export declare function configureTLottie(options: {
    workerCount?: number;
}): void;
/** Main-thread facade over a worker-rendered Lottie/TGS animation. */
export declare class TLottie {
    readonly id: string;
    state: PlayerState;
    frames: PlayerFrameSnapshot;
    lastError: TLottieError | null;
    private readonly config;
    private readonly canvas;
    private readonly pool;
    private worker;
    private resizeObserver;
    private resizeRaf;
    private destroyed;
    private readonly listeners;
    constructor(config: TLottieConfig);
    on(event: TLottieEventName, cb: TLottieListener): void;
    off(event: TLottieEventName, cb: TLottieListener): void;
    play(): void;
    pause(): void;
    stop(): void;
    seek(frame: number): void;
    setSpeed(speed: number): void;
    setLoop(loop: LoopConfig): void;
    setDirection(direction: PlayDirection): void;
    /** Re-parses the animation with a new Fitzpatrick modifier (parse-time only in the wasm core — this recreates the instance). */
    setFitzModifier(fitzModifier: FitzModifier): void;
    /** Re-parses the animation with new per-layer-prefix color overrides (parse-time only — this recreates the instance). */
    setLayerColors(layerColorReplacements: LayerColorReplacementInput[]): void;
    /** Called by the shared IntersectionObserver; also usable directly to force-pause/resume rendering. */
    setObservable(observable: boolean): void;
    destroy(): void;
    private start;
    private loadAndInit;
    private resolveSourceBytes;
    private measure;
    private scheduleResize;
    private send;
    private readonly onMessage;
    private handleError;
    private emit;
}
