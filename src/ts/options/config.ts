/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        config.ts
 * @version     v2.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration, type ConfigurationEvents, type ConfigurationText } from "../type";
import { Default } from "../data/default";
import { Char } from "../data/enum";


export namespace Config {
    export namespace Options {
        export function get( newConfiguration: Configuration = null! ) : Configuration {
            let configuration: Configuration = Default.getObject( newConfiguration, {} as Configuration );
            configuration.safeMode = Default.getBoolean( configuration.safeMode, true );
            configuration.domElementTypes = Default.getStringOrArray( configuration.domElementTypes, [ "*" ] );
            configuration.showCloseButton = Default.getBoolean( configuration.showCloseButton, true );
            configuration.shortcutKeysEnabled = Default.getBoolean( configuration.shortcutKeysEnabled, true );
            configuration.showProgressDots = Default.getBoolean( configuration.showProgressDots, true );
            configuration.browserUrlParametersEnabled = Default.getBoolean( configuration.browserUrlParametersEnabled, true );
            configuration.showProgressDotNumbers = Default.getBoolean( configuration.showProgressDotNumbers, false );
            configuration.showButtons = Default.getBoolean( configuration.showButtons, true );
            configuration.showDoNotShowAgain = Default.getBoolean( configuration.showDoNotShowAgain, false );
            configuration.tooltipDelay = Default.getNumber( configuration.tooltipDelay, 750 );
            configuration.showProgressDotToolTips = Default.getBoolean( configuration.showProgressDotToolTips, true );
            configuration.closeDialogOnDisabledBackgroundClick = Default.getBoolean( configuration.closeDialogOnDisabledBackgroundClick, false );
            configuration.showProgressBar = Default.getBoolean( configuration.showProgressBar, false );
            configuration.scrollToElements = Default.getBoolean( configuration.scrollToElements, false );
            configuration.dialogMovingEnabled = Default.getBoolean( configuration.dialogMovingEnabled, false );
            configuration.showProgressBarText = Default.getBoolean( configuration.showProgressBarText, false );
    
            configuration = getText( configuration );
            configuration = getEvents( configuration );

            return configuration;
        }
    
        function getText( configuration: Configuration ) : Configuration {
            configuration.text = Default.getObject( configuration.text, {} as ConfigurationText );
            configuration.text!.backButtonText = Default.getAnyString( configuration.text!.backButtonText, "Back" );
            configuration.text!.nextButtonText = Default.getAnyString( configuration.text!.nextButtonText, "Next" );
            configuration.text!.finishButtonText = Default.getAnyString( configuration.text!.finishButtonText, "Finish" );
            configuration.text!.closeButtonToolTipText = Default.getAnyString( configuration.text!.closeButtonToolTipText, "Close" );
            configuration.text!.doNotShowAgainText = Default.getAnyString( configuration.text!.doNotShowAgainText, "Do not show again" );
            configuration.text!.objectErrorText = Default.getAnyString( configuration.text!.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
            configuration.text!.attributeNotValidErrorText = Default.getAnyString( configuration.text!.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
            configuration.text!.attributeNotSetErrorText = Default.getAnyString( configuration.text!.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
            configuration.text!.closeDialogConfirmationText = Default.getAnyString( configuration.text!.closeDialogConfirmationText, Char.empty );

            return configuration;
        }
    
        function getEvents( configuration: Configuration ) : Configuration {
            configuration.events = Default.getObject( configuration.events, {} as ConfigurationEvents );
            configuration.events!.onDoNotShowAgainChange = Default.getFunction( configuration.events!.onDoNotShowAgainChange, null );

            return configuration;
        }
    }
}