import { ComponentInterface } from '../../stencil.core';
import { Color } from '../../interface';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export declare class CardHeader implements ComponentInterface {
    /**
     * The color to use from your application's color palette.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information on colors, see [theming](/docs/theming/basics).
     */
    color?: Color;
    /**
     * If `true`, the card header will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    translucent: boolean;
    hostData(): {
        class: {
            'card-header-translucent': boolean;
        } | {
            [x: string]: boolean;
            'card-header-translucent': boolean;
        };
    };
    render(): any;
}
