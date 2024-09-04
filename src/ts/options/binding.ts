/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        binding.ts
 * @version     v2.1.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type BindingOptions, type BindingOptionsEvents } from "../type";
import { Constant } from "../constant";
import { Default } from "../data/default";
import { Char } from "../data/enum";


export namespace Binding {
    export namespace Options {
        export function get( newOptions: any ) : BindingOptions {
            let options: BindingOptions = Default.getObject( newOptions, {} as BindingOptions );
            options.order = Default.getNumber( options.order, 0 );
            options.attach = Default.getBoolean( options.attach, true );
            options.sendClick = Default.getBoolean( options.sendClick, false );
            options.alignTop = Default.getBoolean( options.alignTop, false );
            options.alignRight = Default.getBoolean( options.alignRight, false );
            options.isHint = Default.getBoolean( options.isHint, false );
            options.alignHintToClickPosition = Default.getBoolean( options.alignHintToClickPosition, false );
            options.showDisabledBackground = Default.getBoolean( options.showDisabledBackground, true );
            options.removeHintWhenViewed = Default.getBoolean( options.removeHintWhenViewed, false );
            options.group = Default.getString( options.group, Constant.DEFAULT_GROUP );
            options.ignore = Default.getBoolean( options.ignore, false );
            options.moveToNextOnClick = Default.getBoolean( options.moveToNextOnClick, false );

            options = getText( options );
            options = getEvents( options );
    
            return options;
        }
    
        function getText( options: BindingOptions ) : BindingOptions {
            options.title = Default.getString( options.title, Char.empty );
            options.description = Default.getString( options.description, Char.empty );
            options.tooltip = Default.getString( options.tooltip, Char.empty );
    
            return options;
        }
    
        function getEvents( options: BindingOptions ) : BindingOptions {
            options.events = Default.getObject( options.events, {} as BindingOptionsEvents );
            options.events!.onEnter = Default.getFunction( options.events!.onEnter, null );
            options.events!.onLeave = Default.getFunction( options.events!.onLeave, null );
            options.events!.onClose = Default.getFunction( options.events!.onClose, null );
            options.events!.onFinish = Default.getFunction( options.events!.onFinish, null );
            options.events!.onOpen = Default.getFunction( options.events!.onOpen, null );
            options.events!.onStart = Default.getFunction( options.events!.onStart, null );
            options.events!.onAddStep = Default.getFunction( options.events!.onAddStep, null );
            options.events!.onRemoveStep = Default.getFunction( options.events!.onRemoveStep, null );
    
            return options;
        }
    }
}