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

import { Char } from "./ts/enum";


type StringToJson = {
    parsed: boolean;
    object: any;
};


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Groups
    const _groups_Default: string = "default";
    let _groups_Current: string = _groups_Default;
    const _groups: object = {};


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