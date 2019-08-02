import { ComponentInterface, EventEmitter } from '../../stencil.core';
import { AlertButton, AlertInput, Animation, AnimationBuilder, OverlayEventDetail, OverlayInterface } from '../../interface';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export declare class Alert implements ComponentInterface, OverlayInterface {
    private activeId?;
    private inputType?;
    private processedInputs;
    private processedButtons;
    presented: boolean;
    animation?: Animation;
    mode: "ios" | "md";
    el: HTMLIonAlertElement;
    /** @internal */
    overlayIndex: number;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    keyboardClose: boolean;
    /**
     * Animation to use when the alert is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the alert is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * The main title in the heading of the alert.
     */
    header?: string;
    /**
     * The subtitle in the heading of the alert. Displayed under the title.
     */
    subHeader?: string;
    /**
     * The main message to be displayed in the alert.
     * `message` can accept either plaintext or HTML as a string.
     * To display characters normally reserved for HTML, they
     * must be escaped. For example `<Ionic>` would become
     * `&lt;Ionic&gt;`
     *
     * For more information: [Security Documentation](https://ionicframework.com/docs/faq/security)
     */
    message?: string;
    /**
     * Array of buttons to be added to the alert.
     */
    buttons: (AlertButton | string)[];
    /**
     * Array of input to show in the alert.
     */
    inputs: AlertInput[];
    /**
     * If `true`, the alert will be dismissed when the backdrop is clicked.
     */
    backdropDismiss: boolean;
    /**
     * If `true`, the alert will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    translucent: boolean;
    /**
     * If `true`, the alert will animate.
     */
    animated: boolean;
    /**
     * Emitted after the alert has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the alert has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the alert has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the alert has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    buttonsChanged(): void;
    inputsChanged(): void;
    componentWillLoad(): void;
    protected onBackdropTap(): void;
    protected dispatchCancelHandler(ev: CustomEvent): void;
    /**
     * Present the alert overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the alert overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the alert.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the alert.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    dismiss(data?: any, role?: string): Promise<boolean>;
    /**
     * Returns a promise that resolves when the alert did dismiss.
     */
    onDidDismiss(): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the alert will dismiss.
     */
    onWillDismiss(): Promise<OverlayEventDetail>;
    private rbClick;
    private cbClick;
    private buttonClick;
    private callButtonHandler;
    private getValues;
    private renderAlertInputs;
    private renderCheckbox;
    private renderRadio;
    private renderInput;
    hostData(): {
        'role': string;
        'aria-modal': string;
        style: {
            zIndex: number;
        };
        class: {
            [x: string]: boolean;
            'alert-translucent': boolean;
        };
    };
    private renderAlertButtons;
    render(): any[];
}
