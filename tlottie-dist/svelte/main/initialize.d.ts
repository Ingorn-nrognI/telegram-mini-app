import { TLottieWorkerPool } from '../worker/pool';
export interface InitializeTLottieOptions {
    /** Warm up a dedicated pool of this size instead of the shared default pool. */
    workerCount?: number;
    /** Advanced: warm up a specific pool instance (e.g. one you're about to pass as `pool` to several players). */
    pool?: TLottieWorkerPool;
    wasmUrl?: string | URL;
}
/**
 * Without calling this, the render worker(s) and the wasm module are both
 * created lazily — the first `Worker` spins up when the first `TLottie`
 * instance mounts (deferred one frame), and the wasm binary isn't fetched
 * until that instance's animation source has resolved. That's fine for a
 * single player appearing immediately, but means the wasm download doesn't
 * even start until fairly late in a page's lifecycle.
 *
 * Call this as early as you like (module load, route change, hover intent,
 * etc.) to kick off worker creation and the wasm fetch/instantiate ahead of
 * time — by the time a real `TLottie`/`LottiePlayer` mounts, its worker is
 * already warm. Every worker in the (grown-to-full-size) pool is warmed,
 * since each one owns its own wasm module instance. Safe to call multiple
 * times or with different pools; safe to ignore the returned promise.
 */
export declare function initializeTLottie(options?: InitializeTLottieOptions): Promise<void>;
