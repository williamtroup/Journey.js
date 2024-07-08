/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        is.ts
 * @version     v2.0.2
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Char } from "./enum";


export namespace Is {
    export function defined( value: any ) : boolean {
        return value !== null && value !== undefined && value !== Char.empty;
    }

    export function definedObject( object: any ) : boolean {
        return defined( object ) && typeof object === "object";
    }

    export function definedBoolean( object: any ) : boolean {
        return defined( object ) && typeof object === "boolean";
    }

    export function definedString( object: any ) : boolean {
        return defined( object ) && typeof object === "string";
    }

    export function definedFunction( object: any ) : boolean {
        return defined( object ) && typeof object === "function";
    }

    export function definedNumber( object: any ) : boolean {
        return defined( object ) && typeof object === "number";
    }

    export function definedArray( object: any ) : boolean {
        return definedObject( object ) && object instanceof Array;
    }
}