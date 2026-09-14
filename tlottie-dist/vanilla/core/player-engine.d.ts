import { LoopConfig, PlayDirection, PlayerEngineConfig, PlayerEventName, PlayerFrameSnapshot, PlayerState } from './types';
type Listener = (frames: PlayerFrameSnapshot) => void;
/**
 * Framework- and DOM-agnostic playback clock. Runs inside the worker,
 * driven by its render loop's rAF timestamp — never touches wasm, canvas,
 * or postMessage directly, so it's trivial to unit test in isolation.
 */
export declare class PlayerEngine {
    state: PlayerState;
    private frame;
    private frameCount;
    private frameRate;
    private speed;
    private loop;
    private direction;
    private loopsCompleted;
    private lastTickAt;
    private listeners;
    constructor(config: PlayerEngineConfig);
    get currentFrame(): number;
    get snapshot(): PlayerFrameSnapshot;
    on(event: PlayerEventName, cb: Listener): void;
    off(event: PlayerEventName, cb: Listener): void;
    play(): void;
    pause(): void;
    stop(): void;
    seek(frame: number): void;
    setSpeed(speed: number): void;
    setLoop(loop: LoopConfig): void;
    setDirection(direction: PlayDirection): void;
    /** Call after re-creating the wasm instance (e.g. after a recolor) with the new frame count. */
    setFrameCount(frameCount: number): void;
    /**
     * Advances the clock from a render-loop timestamp. Returns true if
     * `currentFrame` changed (or a redraw is otherwise due) and the caller
     * should render.
     */
    tick(nowMs: number): boolean;
    destroy(): void;
    private emit;
}
export {};
