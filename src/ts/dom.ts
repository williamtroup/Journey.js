/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        dom.ts
 * @version     v2.0.2
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Char } from "./enum";
import { Is } from "./is";
import { type Position } from "./type";


export namespace DomElement {
    export function create( type: string, className: string = Char.empty ) : HTMLElement {
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        let result: any = isText ? document.createTextNode( Char.empty ) : document.createElement( nodeType );

        if ( Is.defined( className ) ) {
            result.className = className;
        }

        return result;
    }

    export function getOffset( element: HTMLElement ) : Position {
        const result: Position = {
            left: 0,
            top: 0
        } as Position;

        while ( element && !isNaN( element.offsetLeft ) && !isNaN( element.offsetTop ) ) {
            result.left += element.offsetLeft - element.scrollLeft;
            result.top += element.offsetTop - element.scrollTop;

            element = element.offsetParent as HTMLElement;
        }

        return result;
    }

    export function getScrollPosition() : Position {
        const documentElement: HTMLElement = document.documentElement;

        const result: Position = {
            left: documentElement.scrollLeft  - ( documentElement.clientLeft || 0 ),
            top: documentElement.scrollTop - ( documentElement.clientTop || 0 )
        } as Position;

        return result;
    }

    export function getStyleValueByName( element: any, stylePropertyName: string ) : string {
        const styles: CSSStyleDeclaration = getComputedStyle( element );
        let style: string = styles.getPropertyValue( stylePropertyName ); 

        return style;
    }

    export function addNode( parent: HTMLElement, node: HTMLElement ) : void {
        try {
            if ( !parent.contains( node ) ) {
                parent.appendChild( node );
            }
        } catch ( e: any ) {
            console.warn( e.message );
        }
    }

    export function removeNode( parent: HTMLElement, node: HTMLElement ) : void {
        try {
            if ( parent.contains( node ) ) {
                parent.removeChild( node );
            }
        } catch ( e: any ) {
            console.warn( e.message );
        }
    }

    export function cancelBubble( e: Event ) : void {
        e.preventDefault();
        e.stopPropagation();
    }

    export function showElementAtMousePosition( e: MouseEvent, element: HTMLElement ) : void {
        let left: number = e.pageX;
        let top: number = e.pageY;
        const scrollPosition: Position = getScrollPosition();

        element.style.display = "block";

        if ( left + element.offsetWidth > window.innerWidth ) {
            left -= element.offsetWidth;
        } else {
            left++;
        }

        if ( top + element.offsetHeight > window.innerHeight ) {
            top -= element.offsetHeight;
        } else {
            top++;
        }

        if ( left < scrollPosition.left ) {
            left = e.pageX + 1;
        }

        if ( top < scrollPosition.top ) {
            top = e.pageY + 1;
        }
        
        element.style.left = left + "px";
        element.style.top = top + "px";
    }

    export function showElementBasedOnCondition( element: HTMLElement, condition: boolean ) : void {
        if ( condition ) {
            if ( element.style.display !== "block" ) {
                element.style.display = "block";
            }
            
        } else {
            if ( element.style.display !== "none" ) {
                element.style.display = "none";
            }
        }
    }

    export function createCheckBox( container: HTMLElement, labelText: string ) : HTMLInputElement {
        const lineContainer: HTMLElement = create( "div" );
        const label: HTMLElement = create( "label", "checkbox" );
        const input: HTMLInputElement = create( "input" ) as HTMLInputElement;

        container.appendChild( lineContainer );
        lineContainer.appendChild( label );
        label.appendChild( input );

        input.type = "checkbox";

        const checkMark: HTMLElement = create( "span", "check-mark" );
        const text: HTMLElement = create( "span", "text" );

        text.innerHTML = labelText;
        
        label.appendChild( checkMark );
        label.appendChild( text );

        return input;
    }

    export function clearElementsByClassName( container: HTMLElement, className: string ) : void {
        let elements: HTMLCollectionOf<Element> = container.getElementsByClassName( className );

        while ( elements[ 0 ] ) {
            elements[ 0 ].parentNode!.removeChild( elements[ 0 ] );
        }
    }
}