import { Host, h, readTask } from "@stencil/core";
import { getIonMode } from '../../global/ionic-global';
import { debounceEvent, findItemLabel } from '../../utils/helpers';
import { createColorClasses } from '../../utils/theme';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class Textarea {
    constructor() {
        this.inputId = `ion-input-${textareaIds++}`;
        this.didBlurAfterEdit = false;
        this.hasFocus = false;
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
         */
        this.autocapitalize = 'none';
        /**
         * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
         */
        this.autofocus = false;
        /**
         * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
         */
        this.clearOnEdit = false;
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke.
         */
        this.debounce = 0;
        /**
         * If `true`, the user cannot interact with the textarea.
         */
        this.disabled = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the user cannot modify the value.
         */
        this.readonly = false;
        /**
         * If `true`, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * If `true`, the element will have its spelling and grammar checked.
         */
        this.spellcheck = false;
        /**
         * If `true`, the element height will increase based on the value.
         */
        this.autoGrow = false;
        /**
         * The value of the textarea.
         */
        this.value = '';
        this.onInput = (ev) => {
            if (this.nativeInput) {
                this.value = this.nativeInput.value;
            }
            this.emitStyle();
            this.ionInput.emit(ev);
        };
        this.onFocus = () => {
            this.hasFocus = true;
            this.focusChange();
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.hasFocus = false;
            this.focusChange();
            this.ionBlur.emit();
        };
        this.onKeyDown = () => {
            this.checkClearOnEdit();
        };
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    /**
     * Update the native input element when the value changes
     */
    valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();
        if (nativeInput && nativeInput.value !== value) {
            nativeInput.value = value;
        }
        this.runAutoGrow();
        this.emitStyle();
        this.ionChange.emit({ value });
    }
    componentWillLoad() {
        this.emitStyle();
    }
    componentDidLoad() {
        this.debounceChanged();
        this.runAutoGrow();
        this.ionInputDidLoad.emit();
    }
    // TODO: performance hit, this cause layout thrashing
    runAutoGrow() {
        const nativeInput = this.nativeInput;
        if (nativeInput && this.autoGrow) {
            readTask(() => {
                nativeInput.style.height = 'inherit';
                nativeInput.style.height = nativeInput.scrollHeight + 'px';
            });
        }
    }
    componentDidUnload() {
        this.ionInputDidUnload.emit();
    }
    /**
     * Sets focus on the specified `ion-textarea`. Use this method instead of the global
     * `input.focus()`.
     */
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    /**
     * Returns the native `<textarea>` element used under the hood.
     */
    getInputElement() {
        return Promise.resolve(this.nativeInput);
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'textarea': true,
            'input': true,
            'interactive-disabled': this.disabled,
            'has-placeholder': this.placeholder != null,
            'has-value': this.hasValue(),
            'has-focus': this.hasFocus
        });
    }
    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    checkClearOnEdit() {
        if (!this.clearOnEdit) {
            return;
        }
        // Did the input value change after it was blurred and edited?
        if (this.didBlurAfterEdit && this.hasValue()) {
            // Clear the input
            this.value = '';
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
    }
    focusChange() {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
        this.emitStyle();
    }
    hasValue() {
        return this.getValue() !== '';
    }
    getValue() {
        return this.value || '';
    }
    render() {
        const mode = getIonMode(this);
        const value = this.getValue();
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        return (h(Host, { "aria-disabled": this.disabled ? 'true' : null, class: Object.assign({}, createColorClasses(this.color), { [mode]: true }) },
            h("textarea", { class: "native-textarea", ref: el => this.nativeInput = el, autoCapitalize: this.autocapitalize, autoFocus: this.autofocus, disabled: this.disabled, maxLength: this.maxlength, minLength: this.minlength, name: this.name, placeholder: this.placeholder || '', readOnly: this.readonly, required: this.required, spellCheck: this.spellcheck, cols: this.cols, rows: this.rows, wrap: this.wrap, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, value)));
    }
    static get is() { return "ion-textarea"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() { return {
        "ios": ["textarea.ios.scss"],
        "md": ["textarea.md.scss"]
    }; }
    static get styleUrls() { return {
        "ios": ["textarea.ios.css"],
        "md": ["textarea.md.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Color",
                "resolved": "string | undefined",
                "references": {
                    "Color": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
            },
            "attribute": "color",
            "reflect": false
        },
        "autocapitalize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user."
            },
            "attribute": "autocapitalize",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "autofocus": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This Boolean attribute lets you specify that a form control should have input focus when the page loads."
            },
            "attribute": "autofocus",
            "reflect": false,
            "defaultValue": "false"
        },
        "clearOnEdit": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `\"password\"`, `false` for all other types."
            },
            "attribute": "clear-on-edit",
            "reflect": false,
            "defaultValue": "false"
        },
        "debounce": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke."
            },
            "attribute": "debounce",
            "reflect": false,
            "defaultValue": "0"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the user cannot interact with the textarea."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "maxlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter."
            },
            "attribute": "maxlength",
            "reflect": false
        },
        "minlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter."
            },
            "attribute": "minlength",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the control, which is submitted with the form data."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "this.inputId"
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | null",
                "resolved": "null | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Instructional text that shows before the input has a value."
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "readonly": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the user cannot modify the value."
            },
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "required": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the user must fill in a value before submitting a form."
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "spellcheck": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the element will have its spelling and grammar checked."
            },
            "attribute": "spellcheck",
            "reflect": false,
            "defaultValue": "false"
        },
        "cols": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer."
            },
            "attribute": "cols",
            "reflect": false
        },
        "rows": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The number of visible text lines for the control."
            },
            "attribute": "rows",
            "reflect": false
        },
        "wrap": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'hard' | 'soft' | 'off'",
                "resolved": "\"hard\" | \"off\" | \"soft\" | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Indicates how the control wraps text."
            },
            "attribute": "wrap",
            "reflect": false
        },
        "autoGrow": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the element height will increase based on the value."
            },
            "attribute": "auto-grow",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string | null",
                "resolved": "null | string | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The value of the textarea."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "hasFocus": {}
    }; }
    static get events() { return [{
            "method": "ionChange",
            "name": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the input value has changed."
            },
            "complexType": {
                "original": "TextareaChangeEventDetail",
                "resolved": "TextareaChangeEventDetail",
                "references": {
                    "TextareaChangeEventDetail": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            }
        }, {
            "method": "ionInput",
            "name": "ionInput",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when a keyboard input ocurred."
            },
            "complexType": {
                "original": "KeyboardEvent",
                "resolved": "KeyboardEvent",
                "references": {
                    "KeyboardEvent": {
                        "location": "global"
                    }
                }
            }
        }, {
            "method": "ionStyle",
            "name": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": "Emitted when the styles change."
            },
            "complexType": {
                "original": "StyleEventDetail",
                "resolved": "StyleEventDetail",
                "references": {
                    "StyleEventDetail": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            }
        }, {
            "method": "ionBlur",
            "name": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the input loses focus."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "ionFocus",
            "name": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the input has focus."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "ionInputDidLoad",
            "name": "ionInputDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": "Emitted when the input has been created."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "ionInputDidUnload",
            "name": "ionInputDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": "Emitted when the input has been removed."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets focus on the specified `ion-textarea`. Use this method instead of the global\n`input.focus()`.",
                "tags": []
            }
        },
        "getInputElement": {
            "complexType": {
                "signature": "() => Promise<HTMLTextAreaElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLTextAreaElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLTextAreaElement>"
            },
            "docs": {
                "text": "Returns the native `<textarea>` element used under the hood.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "debounce",
            "methodName": "debounceChanged"
        }, {
            "propName": "disabled",
            "methodName": "disabledChanged"
        }, {
            "propName": "value",
            "methodName": "valueChanged"
        }]; }
}
let textareaIds = 0;
