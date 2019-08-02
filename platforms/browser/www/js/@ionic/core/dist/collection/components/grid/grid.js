import { h } from "@stencil/core";
import { getIonMode } from '../../global/ionic-global';
export class Grid {
    constructor() {
        /**
         * If `true`, the grid will have a fixed width based on the screen size.
         */
        this.fixed = false;
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: {
                [mode]: true,
                'grid-fixed': this.fixed
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-grid"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["grid.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["grid.css"]
    }; }
    static get properties() { return {
        "fixed": {
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
                "text": "If `true`, the grid will have a fixed width based on the screen size."
            },
            "attribute": "fixed",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
