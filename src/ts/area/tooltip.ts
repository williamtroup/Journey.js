/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        tooltip.ts
 * @version     v2.1.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration } from "../type";
import { Is } from "../data/is";
import { DomElement } from "../dom/dom";


export namespace ToolTip {
    let _element_ToolTip: HTMLElement = null!;
    let _element_ToolTip_Timer: number = 0;

    export function render() : void {
        if ( !Is.defined( _element_ToolTip ) ) {
            _element_ToolTip = DomElement.create( "div", "journey-js-tooltip" );
            _element_ToolTip.style.display = "none";

            document.body.appendChild( _element_ToolTip );
    
            document.body.addEventListener( "mousemove", () => {
                hide();
            } );
    
            document.addEventListener( "scroll", () => {
                hide();
            } );
        }
    }

    export function add( element: HTMLElement, text: string, configuration: Configuration ) : void {
        if ( element !== null ) {
            element.onmousemove = ( e: MouseEvent ) => {
                show( e, text, configuration );
            };
        }
    }

    export function show( e: any, text: string, configuration: Configuration ) : void {
        DomElement.cancelBubble( e );
        hide();

        _element_ToolTip_Timer = setTimeout( () => {
            _element_ToolTip.innerHTML = text;
            _element_ToolTip.style.display = "block";

            DomElement.showElementAtMousePosition( e, _element_ToolTip, configuration.tooltipOffset! );
        }, configuration.tooltipDelay );
    }

    export function hide() : void {
        if ( Is.defined( _element_ToolTip ) ) {
            if ( _element_ToolTip_Timer !== 0 ) {
                clearTimeout( _element_ToolTip_Timer );
                _element_ToolTip_Timer = 0;
            }
    
            if ( _element_ToolTip.style.display === "block" ) {
                _element_ToolTip.style.display = "none";
            }
        }
    }
}