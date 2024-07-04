/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        journey.js
 * @version     v2.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import {
    type Configuration,
    type BindingOptions,
    type Events } from "./ts/type";

import { Char, KeyCode } from "./ts/enum";


type StringToJson = {
    parsed: boolean;
    object: any;
};


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Configuration (overrides)
    let _configuration_ShortcutKeysEnabled: boolean = true;

    // Variables: Groups
    const _groups_Default: string = "default";
    let _groups_Current: string = _groups_Default;
    const _groups: object = {};

    // Variables: Focus Element
    let _element_Focus_Element_PositionStyle: string = null;

    // Variables: Disabled Background
    let _element_Disabled_Background: HTMLElement = null;

    // Variables: Dialog
    let _element_Dialog: HTMLElement = null;
    let _element_Dialog_Close_Button: HTMLElement = null;
    let _element_Dialog_Title: HTMLElement = null;
    let _element_Dialog_Description: HTMLElement = null;
    let _element_Dialog_CheckBox_Container: HTMLElement = null;
    let _element_Dialog_CheckBox_Input: HTMLElement = null;
    let _element_Dialog_ProgressDots: HTMLElement = null;
    let _element_Dialog_ProgressBar: HTMLElement = null;
    let _element_Dialog_ProgressBar_Percentage: HTMLElement = null;
    let _element_Dialog_ProgressBar_Percentage_Text: HTMLElement = null;
    let _element_Dialog_Buttons: HTMLElement = null;
    let _element_Dialog_Buttons_Back_Button: HTMLElement = null;
    let _element_Dialog_Buttons_Next_Button: HTMLElement = null;
    let _element_Dialog_IsHint: boolean = false;

    // Variables: Dialog - Move
    let _element_Dialog_Move_Original_X: number = 0;
    let _element_Dialog_Move_Original_Y: number = 0;
    let _element_Dialog_Move_IsMoving: boolean = false;
    let _element_Dialog_Move_X: number = 0;
    let _element_Dialog_Move_Y: number = 0;

    // Variables: Dialog
    let _element_ToolTip = null;
    let _element_ToolTip_Timer: number = 0;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions: any ) {
        let options: BindingOptions = !isDefinedObject( newOptions ) ? {} as BindingOptions : newOptions;
        options.order = getDefaultNumber( options.order, 0 );
        options.attach = getDefaultBoolean( options.attach, true );
        options.sendClick = getDefaultBoolean( options.sendClick, false );
        options.alignTop = getDefaultBoolean( options.alignTop, false );
        options.alignRight = getDefaultBoolean( options.alignRight, false );
        options.isHint = getDefaultBoolean( options.isHint, false );
        options.alignHintToClickPosition = getDefaultBoolean( options.alignHintToClickPosition, false );
        options.showDisabledBackground = getDefaultBoolean( options.showDisabledBackground, true );
        options.removeHintWhenViewed = getDefaultBoolean( options.removeHintWhenViewed, false );
        options.group = getDefaultString( options.group, _groups_Default );

        options = buildAttributeOptionStrings( options );

        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionStrings( options: BindingOptions ) : BindingOptions {
        options.title = getDefaultString( options.title, null );
        options.description = getDefaultString( options.description, null );
        options.tooltip = getDefaultString( options.tooltip, null );

        return options;
    }

    function buildAttributeOptionCustomTriggers( options: BindingOptions ) : BindingOptions {
        options.events = getDefaultObject( options.events, {} as Events );
        options.events.onEnter = getDefaultFunction( options.events.onEnter, null );
        options.events.onLeave = getDefaultFunction( options.events.onLeave, null );
        options.events.onClose = getDefaultFunction( options.events.onClose, null );
        options.events.onFinish = getDefaultFunction( options.events.onFinish, null );
        options.events.onOpen = getDefaultFunction( options.events.onOpen, null );
        options.events.onStart = getDefaultFunction( options.events.onStart, null );
        options.events.onAddStep = getDefaultFunction( options.events.onAddStep, null );
        options.events.onRemoveStep = getDefaultFunction( options.events.onRemoveStep, null );

        return options;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createElement( type: string, className: string = Char.empty ) : HTMLElement {
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        let result: any = isText ? document.createTextNode( Char.empty ) : document.createElement( nodeType );

        if ( isDefined( className ) ) {
            result.className = className;
        }

        return result;
    }

    function getOffset( element: HTMLElement ) : any {
        let left: number = 0;
        let top: number = 0;

        while ( element && !isNaN( element.offsetLeft ) && !isNaN( element.offsetTop ) ) {
            left += element.offsetLeft - element.scrollLeft;
            top += element.offsetTop - element.scrollTop;

            element = element.offsetParent as HTMLElement;
        }

        return {
            left: left,
            top: top
        };
    }

    function getScrollPosition() : any {
        const doc: HTMLElement = document.documentElement;
        const left: number = ( window.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 );
        const top: number = ( window.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    function getStyleValueByName( element: any, stylePropertyName: string ) : any {
        let value: any = null;
        
        if ( document.defaultView.getComputedStyle ) {
            value = document.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        } else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }   

        return value;
    }

    function addNode( parent: HTMLElement, node: HTMLElement ) : void {
        try {
            if ( !parent.contains( node ) ) {
                parent.appendChild( node );
            }
        } catch ( e ) {
            console.warn( e.message );
        }
    }

    function removeNode( parent: HTMLElement, node: HTMLElement ) : void {
        try {
            if ( parent.contains( node ) ) {
                parent.removeChild( node );
            }
        } catch ( e ) {
            console.warn( e.message );
        }
    }

    function cancelBubble( e: any ) : void {
        e.preventDefault();
        e.cancelBubble = true;
    }

    function showElementAtMousePosition( e: MouseEvent, element: HTMLElement ) : void {
        var left = e.pageX,
            top = e.pageY,
            scrollPosition = getScrollPosition();

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

    function showElementBasedOnCondition( element: HTMLElement, condition: boolean ) : void {
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

    function buildCheckBox( container: HTMLElement, labelText: string ) : any {
        const lineContainer: HTMLElement = createElement( "div" );
        const label: HTMLElement = createElement( "label", "checkbox" );
        const input: HTMLInputElement = createElement( "input" ) as HTMLInputElement;

        container.appendChild( lineContainer );
        lineContainer.appendChild( label );
        label.appendChild( input );

        input.type = "checkbox";

        var checkMark = createElement( "span", "check-mark" ),
            text = createElement( "span", "text" );

        text.innerHTML = labelText;
        
        label.appendChild( checkMark );
        label.appendChild( text );

        return {
            input: input,
            label: label
        };
    }

    function clearElementsByClassName( container: HTMLElement, className: string ) : void {
        let elements: HTMLCollectionOf<Element> = container.getElementsByClassName( className );

        while ( elements[ 0 ] ) {
            elements[ 0 ].parentNode.removeChild( elements[ 0 ] );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTriggerEvent( triggerFunction: Function, ...args : any[] ) : void {
        if ( isDefinedFunction( triggerFunction ) ) {
            triggerFunction.apply( null, [].slice.call( args, 0 ) );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Browser URL Parameters
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getBrowserUrlParameters() : boolean {
        let show: boolean = false;

        if ( _configuration.browserUrlParametersEnabled ) {
            const url: string = window.location.href;
            const urlArguments: any = getBrowserUrlArguments( url );

            if ( isDefined( urlArguments.sjOrderId ) ) {
                const orderId: number = parseInt( urlArguments.sjOrderId, 10 );

                if ( !isNaN( orderId ) && orderId <= _groups[ _groups_Current ].keys.length - 1 ) {
                    _groups[ _groups_Current ].position = orderId;
                }
            }

            if ( isDefined( urlArguments.sjShow ) ) {
                show = urlArguments.sjShow === "true";
            }
        }

        return show;
    }

    function getBrowserUrlArguments( url: string ) : any {
        const urlArguments: object = {};
        const urlDataParts: string[] = url.split( "?" );

        if ( urlDataParts.length > 1 ) {
            const parsedArgs: string[] = urlDataParts[ 1 ].split( "&" );
            const parsedArgsLength: number = parsedArgs.length;

            for ( var parsedArgsIndex = 0; parsedArgsIndex < parsedArgsLength; parsedArgsIndex++ ) {
                const parsedArg: string[] = parsedArgs[ parsedArgsIndex ].split( "=" );

                urlArguments[ parsedArg[ 0 ] ] = parsedArg[ 1 ];
            }
        }

        return urlArguments;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value: any ) : boolean {
        return value !== null && value !== undefined && value !== Char.empty;
    }

    function isDefinedObject( object: any ) : boolean {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object: any ) : boolean {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object: any ) : boolean {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object: any ) : boolean {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object: any ) : boolean {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object: any ) : boolean {
        return isDefinedObject( object ) && object instanceof Array;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultAnyString( value: any, defaultValue: string ) : string {
        return typeof value === "string" ? value : defaultValue;
    }

    function getDefaultString( value: any, defaultValue: string ) : string {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value: any, defaultValue: boolean ) : boolean {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value: any, defaultValue: number ) : number {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value: any, defaultValue: object ) : any {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultObject( value: any, defaultValue: object ) : object {
        return isDefinedObject( value ) ? value : defaultValue;
    }

    function getDefaultArray( value: any, defaultValue: any[] ) : any[] {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value: any, defaultValue: any[] ) : any[] {
        let result: any[] = defaultValue;

        if ( isDefinedString( value ) ) {
            const values: string[] = value.toString().split( Char.space );

            if ( values.length === 0 ) {
                value = defaultValue;
            } else {
                result = values;
            }

        } else {
            result = getDefaultArray( value, defaultValue );
        }

        return result;
    }

    function getObjectFromString( objectString: any ) : StringToJson {
        const result: StringToJson = {
            parsed: true,
            object: null
        } as StringToJson;

        try {
            if ( isDefinedString( objectString ) ) {
                result.object = JSON.parse( objectString );
            }

        } catch ( e1 ) {
            try {
                result.object = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result.object ) ) {
                    result.object = result.object();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.objectErrorText.replace( "{{error_1}}",  e1.message ).replace( "{{error_2}}",  e2.message ) );
                    result.parsed = false;
                }
                
                result.object = null;
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Journey.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
    } ) ();
} );