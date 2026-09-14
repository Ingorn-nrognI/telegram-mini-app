/** Round-robin pool of tlottie render workers, grown lazily up to `size`. */
export declare class TLottieWorkerPool {
    private workers;
    private nextIndex;
    private size;
    constructor(size?: number);
    setSize(size: number): void;
    getWorker(): Worker;
    /** Eagerly grows the pool to its full configured `size` (if not already there) and returns every worker in it — each worker owns its own wasm module instance, so warming up "the pool" means warming up every slot, not just the one `getWorker()` would hand back next. */
    getAllWorkers(): Worker[];
    terminateAll(): void;
}
export declare const defaultWorkerPool: TLottieWorkerPool;
