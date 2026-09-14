/**
 * Raw exports of tlottie.wasm (tlottie/src/bindings/wasm.rs) — a
 * wasm32-unknown-unknown build with no JS glue. Every pointer is a byte
 * offset into `memory.buffer`; every buffer returned by a render call is
 * owned by the instance and overwritten by the instance's next render call.
 */
export interface TLottieWasmExports {
    memory: WebAssembly.Memory;
    tlottie_alloc(len: number): number;
    tlottie_free(ptr: number, len: number): void;
    tlottie_new(jsonPtr: number, jsonLen: number): number;
    tlottie_new_with_options(jsonPtr: number, jsonLen: number, fitzModifier: number, replacementsPtr: number, replacementsLen: number): number;
    tlottie_drop(inst: number): void;
    tlottie_width(inst: number): number;
    tlottie_height(inst: number): number;
    tlottie_frame_rate(inst: number): number;
    tlottie_frame_count(inst: number): number;
    tlottie_render(inst: number, frame: number, width: number, height: number, antialias: number): number;
    tlottie_render_with_options(inst: number, frame: number, width: number, height: number, antialias: number, curveTolerance: number): number;
    tlottie_render_alpha8(inst: number, frame: number, width: number, height: number, antialias: number): number;
    tlottie_render_alpha8_with_options(inst: number, frame: number, width: number, height: number, antialias: number, curveTolerance: number): number;
    tlottie_render_alpha8_color(inst: number, frame: number, width: number, height: number, antialias: number, color: number): number;
    tlottie_render_alpha8_color_with_options(inst: number, frame: number, width: number, height: number, antialias: number, color: number, curveTolerance: number): number;
}
export declare function loadWasmModule(wasmUrl: string | URL): Promise<TLottieWasmExports>;
