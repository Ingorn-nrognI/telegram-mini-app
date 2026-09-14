/**
 * `<tlottie-player src="..." loop autoplay></tlottie-player>`
 *
 * Attribute changes to `src`/`data`/`outline`/`worker-count`/`fitz` remount
 * the player (they change the underlying source or worker pool); `speed`,
 * `loop`, and `direction` are applied live to the running instance instead.
 */
export declare class TLottiePlayerElement extends HTMLElement {
    static get observedAttributes(): readonly string[];
    private handle;
    private connected;
    private explicitData;
    get data(): string | Uint8Array | undefined;
    set data(value: string | Uint8Array | undefined);
    get tlottie(): import('./index.ts').TLottie | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string): void;
    private applyLiveTweak;
    private readLoop;
    private readDirection;
    private mount;
    private unmount;
}
export declare function registerTLottiePlayerElement(tagName?: string): void;
