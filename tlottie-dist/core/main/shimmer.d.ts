export interface ShimmerMaskStyle {
    maskImage: string;
    WebkitMaskImage: string;
}
/** Builds a CSS mask-image style from a raw outline SVG string, for the loading/error shimmer. */
export declare function buildShimmerMaskStyle(outlineSvg: string): ShimmerMaskStyle;
