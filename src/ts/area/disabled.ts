/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        disabled.ts
 * @version     v2.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration } from "../type";
import { DomElement } from "../dom/dom";


export namespace Disabled {
    export namespace Background {
        let _element_Disabled_Background: HTMLElement;

        export function render( configuration: Configuration, onClickFunc: any ) : void {
            _element_Disabled_Background = DomElement.create( "div", "journey-js-disabled-background" );
    
            _element_Disabled_Background.onclick = () => {
                if ( configuration.closeDialogOnDisabledBackgroundClick ) {
                    onClickFunc();
                }
            };
        }
    
        export function show() : void {
            DomElement.addNode( document.body, _element_Disabled_Background );
        }
    
        export function hide() : void {
            DomElement.removeNode( document.body, _element_Disabled_Background );
        }
    }
}