import { ComponentProps, JSX } from 'solid-js';
import { TLottie, TLottieConfig, TLottieEventPayload } from '../main/TLottie';
export interface LottiePlayerProps extends Omit<TLottieConfig, "canvas">, Omit<ComponentProps<"div">, "onLoad" | "onError"> {
    /** Raw SVG string used as a loading/error skeleton via CSS mask-image. */
    outline?: string;
    /** When set, clicking the canvas calls `play()` — mainly useful for non-looping animations that should replay on click after completing. */
    playOnClick?: boolean;
    onLoad?: (payload: TLottieEventPayload) => void;
    onError?: (payload: TLottieEventPayload) => void;
    onComplete?: (payload: TLottieEventPayload) => void;
    lottieRefCallback?: (tlottie: TLottie | null) => void;
}
export declare function LottiePlayer(props: LottiePlayerProps): JSX.Element;
