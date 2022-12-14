/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface UcSpinner {
    }
    interface UcStockFinder {
    }
    interface UcStockPrice {
        "stockSymbol": string;
    }
}
export interface UcStockFinderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLUcStockFinderElement;
}
declare global {
    interface HTMLUcSpinnerElement extends Components.UcSpinner, HTMLStencilElement {
    }
    var HTMLUcSpinnerElement: {
        prototype: HTMLUcSpinnerElement;
        new (): HTMLUcSpinnerElement;
    };
    interface HTMLUcStockFinderElement extends Components.UcStockFinder, HTMLStencilElement {
    }
    var HTMLUcStockFinderElement: {
        prototype: HTMLUcStockFinderElement;
        new (): HTMLUcStockFinderElement;
    };
    interface HTMLUcStockPriceElement extends Components.UcStockPrice, HTMLStencilElement {
    }
    var HTMLUcStockPriceElement: {
        prototype: HTMLUcStockPriceElement;
        new (): HTMLUcStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "uc-spinner": HTMLUcSpinnerElement;
        "uc-stock-finder": HTMLUcStockFinderElement;
        "uc-stock-price": HTMLUcStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface UcSpinner {
    }
    interface UcStockFinder {
        "onUcSymbolSelected"?: (event: UcStockFinderCustomEvent<string>) => void;
    }
    interface UcStockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "uc-spinner": UcSpinner;
        "uc-stock-finder": UcStockFinder;
        "uc-stock-price": UcStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "uc-spinner": LocalJSX.UcSpinner & JSXBase.HTMLAttributes<HTMLUcSpinnerElement>;
            "uc-stock-finder": LocalJSX.UcStockFinder & JSXBase.HTMLAttributes<HTMLUcStockFinderElement>;
            "uc-stock-price": LocalJSX.UcStockPrice & JSXBase.HTMLAttributes<HTMLUcStockPriceElement>;
        }
    }
}
