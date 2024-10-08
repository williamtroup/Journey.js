/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        journey.ts
 * @version     v2.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import {
    type Configuration,
    type BindingOptions,
    type BindingOptionsCurrentView, 
    type Position } from "./ts/type";

import { type PublicApi } from "./ts/api";
import { Char, KeyCode } from "./ts/data/enum";
import { Constant } from "./ts/constant";
import { Is } from "./ts/data/is";
import { Default } from "./ts/data/default";
import { DomElement } from "./ts/dom/dom";
import { Binding } from "./ts/options/binding";
import { Config } from "./ts/options/config";
import { Trigger } from "./ts/area/trigger";
import { ToolTip } from "./ts/area/tooltip";
import { Disabled } from "./ts/area/disabled";


type StringToJson = {
    parsed: boolean;
    object: any;
};

type Groups = Record<string, {
    json: Record<number, BindingOptions>;
    keys: number[];
    position: number;
}>;


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Configuration (overrides)
    let _configuration_ShortcutKeysEnabled: boolean = true;

    // Variables: Groups
    let _groups_Current: string = Constant.DEFAULT_GROUP;
    let _groups: Groups = {} as Groups;

    // Variables: Focus Element
    let _element_Focus_Element_PositionStyle: string = Char.empty;

    // Variables: Dialog
    let _element_Dialog: HTMLElement = null!;
    let _element_Dialog_Close_Button: HTMLElement = null!;
    let _element_Dialog_Title: HTMLElement = null!;
    let _element_Dialog_Description: HTMLElement = null!;
    let _element_Dialog_CheckBox_Container: HTMLElement = null!;
    let _element_Dialog_CheckBox_Input: HTMLInputElement = null!;
    let _element_Dialog_ProgressDots: HTMLElement = null!;
    let _element_Dialog_ProgressBar: HTMLElement = null!;
    let _element_Dialog_ProgressBar_Percentage: HTMLElement = null!;
    let _element_Dialog_ProgressBar_Percentage_Text: HTMLElement = null!;
    let _element_Dialog_Buttons: HTMLElement = null!;
    let _element_Dialog_Buttons_Back_Button: HTMLInputElement = null!;
    let _element_Dialog_Buttons_Next_Button: HTMLInputElement = null!;
    let _element_Dialog_IsHint: boolean = false;

    // Variables: Dialog - Move
    let _element_Dialog_Move_Original_X: number = 0;
    let _element_Dialog_Move_Original_Y: number = 0;
    let _element_Dialog_Move_IsMoving: boolean = false;
    let _element_Dialog_Move_X: number = 0;
    let _element_Dialog_Move_Y: number = 0;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Groups
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function setupDefaultGroup( groups: any = null ) : void {
        _groups = Default.getObject( groups, {} as Groups );

        _groups[ Constant.DEFAULT_GROUP ] = {
            json: {} as BindingOptions,
            keys: [],
            position: 0
        };
    }

    function setupNewGroup( group: string ) : void {
        if ( !_groups.hasOwnProperty( group ) ) {
            _groups[ group ] = {
                json: {} as BindingOptions,
                keys: [],
                position: 0
            };
        }
    }

    function getGroupBindingOptions() : BindingOptions {
        return _groups[ _groups_Current ].json[ _groups[ _groups_Current ].keys[ _groups[ _groups_Current ].position ] ];
    }

    function isGroupPositionAtEnd() {
        return _groups[ _groups_Current ].position === _groups[ _groups_Current ].keys.length - 1;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDialog() : void {
        _element_Dialog = DomElement.create( "div", "journey-js-dialog" );
        _element_Dialog.style.display = "none";
        document.body.appendChild( _element_Dialog );

        _element_Dialog_Close_Button = DomElement.create( "button", "close" );
        _element_Dialog_Close_Button.onclick = () => onDialogClose();
        _element_Dialog.appendChild( _element_Dialog_Close_Button );

        ToolTip.add( _element_Dialog_Close_Button, _configuration.text!.closeButtonToolTipText!, _configuration );

        _element_Dialog_Title = DomElement.create( "div", "title" );
        _element_Dialog.appendChild( _element_Dialog_Title );

        _element_Dialog_Description = DomElement.create( "div", "description" );
        _element_Dialog.appendChild( _element_Dialog_Description );

        _element_Dialog_CheckBox_Container = DomElement.create( "div", "checkbox-container" );
        _element_Dialog.appendChild( _element_Dialog_CheckBox_Container );

        _element_Dialog_CheckBox_Input = DomElement.createCheckBox( _element_Dialog_CheckBox_Container, _configuration.text!.doNotShowAgainText! );
        
        _element_Dialog_CheckBox_Input.onchange = () => {
            if ( _configuration.showDoNotShowAgain ) {
                Trigger.customEvent( _configuration.events!.onDoNotShowAgainChange!, _element_Dialog_CheckBox_Input.checked );
            }
        };

        _element_Dialog_ProgressDots = DomElement.create( "div", "progress-dots" );
        _element_Dialog.appendChild( _element_Dialog_ProgressDots );

        _element_Dialog_ProgressBar = DomElement.create( "div", "progress-bar" );
        _element_Dialog.appendChild( _element_Dialog_ProgressBar );

        _element_Dialog_ProgressBar_Percentage = DomElement.create( "div", "progress-bar-percentage" );
        _element_Dialog_ProgressBar.appendChild( _element_Dialog_ProgressBar_Percentage );

        _element_Dialog_ProgressBar_Percentage_Text = DomElement.create( "p", "progress-bar-percentage-text" );
        _element_Dialog_ProgressBar_Percentage.appendChild( _element_Dialog_ProgressBar_Percentage_Text );

        _element_Dialog_Buttons = DomElement.create( "div", "buttons" );
        _element_Dialog.appendChild( _element_Dialog_Buttons );

        _element_Dialog_Buttons_Back_Button = DomElement.create( "button", "back" ) as HTMLInputElement;
        _element_Dialog_Buttons_Back_Button.onclick = onDialogBack;
        _element_Dialog_Buttons.appendChild( _element_Dialog_Buttons_Back_Button );

        _element_Dialog_Buttons_Next_Button = DomElement.create( "button", "next" ) as HTMLInputElement;
        _element_Dialog_Buttons_Next_Button.onclick = onDialogNext;
        _element_Dialog_Buttons.appendChild( _element_Dialog_Buttons_Next_Button );

        makeDialogMovable();
    }

    function onDialogClose( showConfirmationBox: boolean = true ) : void {
        let confirmed: boolean = false;

        if ( Is.definedString( _configuration.text!.closeDialogConfirmationText ) && showConfirmationBox ) {
            confirmed = confirm( _configuration.text!.closeDialogConfirmationText );
        } else {
            confirmed = true;
        }

        if ( confirmed ) {
            const bindingOptions: BindingOptions = getGroupBindingOptions();

            if ( Is.defined( bindingOptions ) && Is.defined( bindingOptions._currentView.element ) ) {
                Trigger.customEvent( bindingOptions.events!.onClose!, bindingOptions._currentView.element );
            }
    
            removeFocusClassFromLastElement( false );
            Disabled.Background.hide();
            ToolTip.hide();
    
            _element_Dialog.style.display = "none";
        }
    }

    function onDialogBack() : void {
        if ( _groups[ _groups_Current ].position > 0 ) {
            removeFocusClassFromLastElement();

            _groups[ _groups_Current ].position--;

            showDialogAndSetPosition();
        }        
    }

    function onDialogNext() : void {
        if ( isGroupPositionAtEnd() ) {
            const bindingOptions: BindingOptions = getGroupBindingOptions();

            onDialogClose( false );
            Trigger.customEvent( bindingOptions.events!.onFinish!, bindingOptions._currentView.element );

        } else {
            removeFocusClassFromLastElement();

            _groups[ _groups_Current ].position++;

            showDialogAndSetPosition();
        }
    }

    function showDialogAndSetPosition() : void {
        const bindingOptions: BindingOptions = getGroupBindingOptions();

        if ( Is.defined( bindingOptions ) && Is.defined( bindingOptions._currentView.element ) ) {
            if ( bindingOptions.showDisabledBackground ) {
                Disabled.Background.show();
            } else {
                Disabled.Background.hide();
            }

            ToolTip.hide();
            
            _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block": "none";
            _configuration_ShortcutKeysEnabled = true;
            
            bindingOptions._currentView.element.classList.add( "journey-js-element-focus" );

            if ( _configuration.scrollToElements ) {
                bindingOptions._currentView.element.scrollIntoView();
            }

            const lastPositionStyle: string = DomElement.getStyleValueByName( bindingOptions._currentView.element, "position" );

            if ( lastPositionStyle !== Char.empty && lastPositionStyle.toLowerCase() === "static" ) {
                _element_Focus_Element_PositionStyle = lastPositionStyle;
                bindingOptions._currentView.element.style.position = "relative";
            }

            DomElement.showElementBasedOnCondition( _element_Dialog_CheckBox_Container, _configuration.showDoNotShowAgain! );
            DomElement.showElementBasedOnCondition( _element_Dialog_ProgressDots, _configuration.showProgressDots! && _groups[ _groups_Current ].keys.length > 1 );
            DomElement.showElementBasedOnCondition( _element_Dialog_ProgressBar, _configuration.showProgressBar! && _groups[ _groups_Current ].keys.length > 1 );
            DomElement.showElementBasedOnCondition( _element_Dialog_ProgressBar_Percentage_Text, _configuration.showProgressBarText! );
            DomElement.showElementBasedOnCondition( _element_Dialog_Buttons, _configuration.showButtons! );

            _element_Dialog_Buttons_Back_Button.innerHTML = _configuration.text!.backButtonText!;
            _element_Dialog_Buttons_Back_Button.disabled = _groups[ _groups_Current ].position === 0;
            
            if ( _groups[ _groups_Current ].position >= _groups[ _groups_Current ].keys.length - 1 ) {
                _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.text!.finishButtonText!;
            } else {
                _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.text!.nextButtonText!;
            }

            setDialogText( bindingOptions );
            setDialogPosition( null, bindingOptions );
            buildProcessDots();
            setProgressBarPosition();
            Trigger.customEvent( bindingOptions.events!.onEnter!, bindingOptions._currentView.element );

            if ( bindingOptions.sendClick ) {
                bindingOptions._currentView.element.click();
            }

            if ( bindingOptions.moveToNextOnClick ) {
                bindingOptions._currentView.element.addEventListener( "click", onDialogNext );
            }
        }
    }

    function setDialogText( bindingOptions: BindingOptions ) : void {
        _element_Dialog_Title.innerHTML = Char.empty;

        if ( _configuration.showStepNumbersInTitle ) {
            DomElement.createWithHTML( _element_Dialog_Title, "span", "step-number", `${bindingOptions.order!.toString()}.` );
        }

        if ( Is.definedString( bindingOptions.title ) ) {
            DomElement.createWithHTML( _element_Dialog_Title, "span", "title", bindingOptions.title! );
        } else {
            DomElement.createWithHTML( _element_Dialog_Title, "span", "title", Char.empty );
        }

        if ( Is.definedString( bindingOptions.description ) ) {
            _element_Dialog_Description.innerHTML = bindingOptions.description!;
        } else {
            _element_Dialog_Description.innerHTML = Char.empty;
        }
    }

    function setDialogPosition( e: any, bindingOptions: BindingOptions ) : void {
        _element_Dialog_IsHint = bindingOptions.isHint === true;

        if ( _element_Dialog_IsHint ) {
            _element_Dialog.className = "journey-js-dialog";

        } else {
            if ( bindingOptions.useLargerDisplay && _element_Dialog.className === "journey-js-dialog" ) {
                _element_Dialog.className = "journey-js-dialog-lg";
            } else if ( !bindingOptions.useLargerDisplay && _element_Dialog.className === "journey-js-dialog-lg" ) {
                _element_Dialog.className = "journey-js-dialog";
            }
        }

        if ( _element_Dialog.style.display !== "block" ) {
            _element_Dialog.style.display = "block";

            Trigger.customEvent( bindingOptions.events!.onOpen!, bindingOptions._currentView.element );
        }

        if ( _groups[ _groups_Current ].position === 0 ) {
            Trigger.customEvent( bindingOptions.events!.onStart!, bindingOptions._currentView.element );
        }

        if ( bindingOptions.attach || bindingOptions.isHint ) {
            if ( bindingOptions.isHint && bindingOptions.alignHintToClickPosition ) {
                DomElement.showElementAtMousePosition( e, _element_Dialog, _configuration.hintClickPositionOffset! );

            } else {
                const offset: Position = DomElement.getOffset( bindingOptions._currentView.element );
                let top: number = ( offset.top ) + bindingOptions._currentView.element.offsetHeight;
                let left: number = ( offset.left );

                if ( left + _element_Dialog.offsetWidth > window.innerWidth || bindingOptions.alignRight ) {
                    left -=  _element_Dialog.offsetWidth;
                    left += bindingOptions._currentView.element.offsetWidth;
                    left -= bindingOptions.offset!;

                } else {
                    left += bindingOptions.offset!;
                }
        
                if ( top + _element_Dialog.offsetHeight > window.innerHeight || bindingOptions.alignTop ) {
                    top -= ( _element_Dialog.offsetHeight + bindingOptions._currentView.element.offsetHeight );
                    top -= bindingOptions.offset!;
                    
                } else {
                    top += bindingOptions.offset!;
                }

                _element_Dialog.style.top = `${top}px`;
                _element_Dialog.style.left = `${left}px`;
            }

        } else {
            const scrollPosition: Position = DomElement.getScrollPosition();
            const centerLeft: number = Math.max( 0, ( ( window.innerWidth - _element_Dialog.offsetWidth ) / 2 ) + scrollPosition.left );
            const centerTop: number = Math.max( 0, ( ( window.innerHeight - _element_Dialog.offsetHeight ) / 2 ) + scrollPosition.top );

            _element_Dialog.style.left = `${centerLeft}px`;
            _element_Dialog.style.top = `${centerTop}px`;
        }
    }

    function removeFocusClassFromLastElement( callCustomTrigger: boolean = true ) : void {
        const bindingOptions: BindingOptions = getGroupBindingOptions();

        if ( Is.defined( bindingOptions ) && Is.defined( bindingOptions._currentView.element ) ) {
            bindingOptions._currentView.element.classList.remove( "journey-js-element-focus" );

            if ( bindingOptions.moveToNextOnClick ) {
                bindingOptions._currentView.element.removeEventListener( "click", onDialogNext );
            }

            if ( Is.defined( _element_Focus_Element_PositionStyle ) ) {
                bindingOptions._currentView.element.style.position = _element_Focus_Element_PositionStyle;
            }

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onLeave!, bindingOptions._currentView.element );
            }
        }
    }

    function buildProcessDots() : void {
        _element_Dialog_ProgressDots.innerHTML = Char.empty;

        if ( _configuration.showProgressDots ) {
            const keysLength: number = _groups[ _groups_Current ].keys.length;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                buildProgressDot( keyIndex, _groups[ _groups_Current ].keys[ keyIndex ] );
            }
        }
    }

    function buildProgressDot( keyIndex: number, order: number ) : void {
        const bindingOptions: BindingOptions = _groups[ _groups_Current ].json[ order ];
        let dot: HTMLElement;

        if ( keyIndex === _groups[ _groups_Current ].position ) {
            dot = DomElement.create( "div", "dot-active" );
        } else {
            
            dot = DomElement.create( "div", "dot" );
    
            dot.onclick = () => {
                removeFocusClassFromLastElement();

                _groups[ _groups_Current ].position = keyIndex;

                showDialogAndSetPosition();
            };
        }

        _element_Dialog_ProgressDots.appendChild( dot );

        if ( _configuration.showProgressDotToolTips ) {
            if ( Is.definedString( bindingOptions.tooltip ) ) {
                ToolTip.add( dot, bindingOptions.tooltip!, _configuration );
            } else {
                ToolTip.add( dot, bindingOptions.title!, _configuration );
            }
        }

        if ( _configuration.showProgressDotNumbers ) {
            dot.classList.add( "dot-number" );
            dot.innerHTML = ( keyIndex + 1 ).toString();
        }
    }

    function setProgressBarPosition() : void {
        if ( _configuration.showProgressBar ) {
            const pixelsPerStage: number = _element_Dialog_ProgressBar.offsetWidth / _groups[ _groups_Current ].keys.length;
            const width: number = ( _groups[ _groups_Current ].position + 1 ) * pixelsPerStage;
            const percentageComplete: number = Math.ceil( ( ( _groups[ _groups_Current ].position + 1 ) / _groups[ _groups_Current ].keys.length ) * 100 );

            _element_Dialog_ProgressBar_Percentage.style.width = `${width}px`;
            _element_Dialog_ProgressBar_Percentage_Text.innerHTML = `${percentageComplete}%`;
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Dialog - Move
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function makeDialogMovable() : void {
        _element_Dialog_Title.onmousedown = onMoveTitleBarMouseDown;
        _element_Dialog_Title.onmouseup = onMoveTitleBarMouseUp;
        _element_Dialog_Title.oncontextmenu = onMoveTitleBarMouseUp;

        document.body.addEventListener( "mousemove", onMoveDocumentMouseMove );
        document.body.addEventListener( "mouseleave", onMoveDocumentMouseLeave );
    }

    function onMoveTitleBarMouseDown( e: MouseEvent ) : void {
        if ( !_element_Dialog_Move_IsMoving && !_element_Dialog_IsHint && _configuration.dialogMovingEnabled ) {
            _element_Dialog.classList.add( "journey-js-dialog-moving" );
            _element_Dialog_Move_IsMoving = true;
            _element_Dialog_Move_X = e.pageX - _element_Dialog.offsetLeft;
            _element_Dialog_Move_Y = e.pageY - _element_Dialog.offsetTop;
            _element_Dialog_Move_Original_X = _element_Dialog.offsetLeft;
            _element_Dialog_Move_Original_Y = _element_Dialog.offsetTop;
        }
    }

    function onMoveTitleBarMouseUp() : void {
        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog_Move_IsMoving = false;
            _element_Dialog_Move_Original_X = 0;
            _element_Dialog_Move_Original_Y = 0;
            _element_Dialog.className = "journey-js-dialog";
        }
    }

    function onMoveDocumentMouseMove( e: MouseEvent ) : void {
        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog.style.left = `${e.pageX - _element_Dialog_Move_X}px`;
            _element_Dialog.style.top = `${e.pageY - _element_Dialog_Move_Y}px`;
        }
    }

    function onMoveDocumentMouseLeave() : void {
        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog.style.left = `${_element_Dialog_Move_Original_X}px`;
            _element_Dialog.style.top = `${_element_Dialog_Move_Original_Y}px`;

            _element_Dialog_Move_IsMoving = false;
            _element_Dialog_Move_Original_X = 0;
            _element_Dialog_Move_Original_Y = 0;
            _element_Dialog.className = "journey-js-dialog";
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Rendering
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getElements() : void {
        const tagTypes: string[] = _configuration.domElementTypes as string[];
        const tagTypesLength: number = tagTypes.length;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( !getElement( elements[ elementIndex ] ) ) {
                    break;
                }
            }
        }

        _groups[ _groups_Current ].keys.sort();
    }

    function getElement( element: HTMLElement ) : boolean {
        let result: boolean = true;

        if ( Is.defined( element ) && element.hasAttribute( Constant.JOURNEY_JS_ATTRIBUTE_NAME ) ) {
            const bindingOptionsData: string = element.getAttribute( Constant.JOURNEY_JS_ATTRIBUTE_NAME )!;

            if ( Is.definedString( bindingOptionsData ) ) {
                const bindingOptions: StringToJson = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && Is.definedObject( bindingOptions.object ) ) {
                    setupElement( element, Binding.Options.get( bindingOptions.object ) );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( _configuration.text!.attributeNotValidErrorText!.replace( "{{attribute_name}}", Constant.JOURNEY_JS_ATTRIBUTE_NAME ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.text!.attributeNotSetErrorText!.replace( "{{attribute_name}}", Constant.JOURNEY_JS_ATTRIBUTE_NAME ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function setupElement( element: HTMLElement, bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView = {} as BindingOptionsCurrentView;
        bindingOptions._currentView.element = element;

        if ( !bindingOptions.ignore && Is.definedNumber( bindingOptions.order ) && ( Is.definedString( bindingOptions.title ) || Is.definedString( bindingOptions.description ) ) ) {
            element.removeAttribute( Constant.JOURNEY_JS_ATTRIBUTE_NAME );
            
            if ( !bindingOptions.isHint ) {
                setupNewGroup( bindingOptions.group! );

                _groups[ bindingOptions.group! ].json[ bindingOptions.order! ] = bindingOptions;
                _groups[ bindingOptions.group! ].keys.push( bindingOptions.order! );

                Trigger.customEvent( bindingOptions.events!.onAddStep!, element );

            } else {
                renderHint( bindingOptions );
            }
        }
    }

    function renderHint( bindingOptions: BindingOptions ) : void {
        const positionStyle: string = DomElement.getStyleValueByName( bindingOptions._currentView.element, "position" );

        if ( positionStyle !== Char.empty && positionStyle.toLowerCase() === "static" ) {
            bindingOptions._currentView.element.style.position = "relative";
        }

        const hint: HTMLElement = DomElement.create( "div", "journey-js-hint" );
        bindingOptions._currentView.element.appendChild( hint );

        hint.onclick = ( e: MouseEvent ) => {
            DomElement.cancelBubble( e );

            _element_Dialog_CheckBox_Container.style.display = "none";
            _element_Dialog_ProgressDots.style.display = "none";
            _element_Dialog_ProgressBar.style.display = "none";
            _element_Dialog_Buttons.style.display = "none";
            _configuration_ShortcutKeysEnabled = false;

            setDialogText( bindingOptions );
            setDialogPosition( e, bindingOptions );

            if ( bindingOptions.removeHintWhenViewed ) {
                DomElement.clearElementsByClassName( bindingOptions._currentView.element, "journey-js-hint" );
            }
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Document Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDocumentEvents( addEvents: boolean = true ) : void {
        const documentFunc: Function = addEvents ? document.addEventListener : document.removeEventListener;
        const windowFunc: Function = addEvents ? window.addEventListener : window.removeEventListener;

        if ( _configuration.shortcutKeysEnabled ) {
            documentFunc( "keydown", onWindowKeyDown );
        }

        windowFunc( "resize", onWindowResize );
    }

    function onWindowKeyDown( e: KeyboardEvent ) : void {
        if ( _public.isOpen() && _configuration.shortcutKeysEnabled ) {
            if ( e.code === KeyCode.escape ) {
                e.preventDefault();
                onDialogClose();
            } else {

                if ( _configuration_ShortcutKeysEnabled ) {
                    if ( e.code === KeyCode.left ) {
                        e.preventDefault();
                        onDialogBack();
        
                    } else if ( e.code === KeyCode.right ) {
                        e.preventDefault();
                        onDialogNext();
        
                    } else if ( e.code === KeyCode.up ) {
                        e.preventDefault();
                        onWindowKeyCodeUp();
        
                    } else if ( e.code === KeyCode.down ) {
                        e.preventDefault();
                        onWindowKeyCodeDown();
                    }
                }
            }
        }
    }

    function onWindowResize() : void {
        if ( _public.isOpen() ) {
            showDialogAndSetPosition();
        }
    }

    function onWindowKeyCodeUp() : void {
        if ( _groups[ _groups_Current ].position !== 0 ) {
            removeFocusClassFromLastElement();

            _groups[ _groups_Current ].position = 0;
    
            showDialogAndSetPosition();
        }
    }

    function onWindowKeyCodeDown() : void {
        if ( _groups[ _groups_Current ].position !== _groups[ _groups_Current ].keys.length - 1 ) {
            removeFocusClassFromLastElement();

            _groups[ _groups_Current ].position = _groups[ _groups_Current ].keys.length - 1;
    
            showDialogAndSetPosition();
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

            if ( Is.defined( urlArguments.sjOrderId ) ) {
                const orderId: number = parseInt( urlArguments.sjOrderId, 10 );

                if ( !isNaN( orderId ) && orderId <= _groups[ _groups_Current ].keys.length - 1 ) {
                    _groups[ _groups_Current ].position = orderId;
                }
            }

            if ( Is.defined( urlArguments.sjShow ) ) {
                show = urlArguments.sjShow === "true";
            }
        }

        return show;
    }

    function getBrowserUrlArguments( url: string ) : any {
        const urlArguments: any = {};
        const urlDataParts: string[] = url.split( "?" );

        if ( urlDataParts.length > 1 ) {
            const parsedArgs: string[] = urlDataParts[ 1 ].split( "&" );
            const parsedArgsLength: number = parsedArgs.length;

            for ( let parsedArgsIndex: number = 0; parsedArgsIndex < parsedArgsLength; parsedArgsIndex++ ) {
                const parsedArg: string[] = parsedArgs[ parsedArgsIndex ].split( "=" );

                urlArguments[ parsedArg[ 0 ] ] = parsedArg[ 1 ];
            }
        }

        return urlArguments;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getObjectFromString( objectString: any ) : StringToJson {
        const result: StringToJson = {
            parsed: true,
            object: null
        } as StringToJson;

        try {
            if ( Is.definedString( objectString ) ) {
                result.object = JSON.parse( objectString );
            }

        } catch ( e1: any ) {
            try {
                result.object = eval( `(${objectString})` );

                if ( Is.definedFunction( result.object ) ) {
                    result.object = result.object();
                }
                
            } catch ( e2: any ) {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.text!.objectErrorText!.replace( "{{error_1}}",  e1.message ).replace( "{{error_2}}",  e2.message ) );
                    result.parsed = false;
                }
                
                result.object = null;
            }
        }

        return result;
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Managing Steps
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function resetDialogPosition() : void {
        if ( _public.isOpen() ) {
            onDialogClose( false );

            _groups[ _groups_Current ].position = 0;
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Show/Hide
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        start: function ( group: string = Char.empty ) : PublicApi {
            if ( !_public.isOpen() ) {
                _groups_Current = Default.getString( group, Constant.DEFAULT_GROUP );
    
                if ( _groups.hasOwnProperty( _groups_Current ) ) {
                    _groups[ _groups_Current ].position = 0;
        
                    showDialogAndSetPosition();
                }
            }
    
            return _public;
        },

        show: function ( group: string = Char.empty ) : PublicApi {
            if ( !_public.isOpen() ) {
                _groups_Current = Default.getString( group, _groups_Current );
    
                if ( _groups.hasOwnProperty( _groups_Current ) ) {
                    if ( isGroupPositionAtEnd() ) {
                        _groups[ _groups_Current ].position = 0;
                    }
            
                    showDialogAndSetPosition();
                }
            }
    
            return _public;
        },

        hide: function () : PublicApi {
            if ( _public.isOpen() ) {
                onDialogClose();
            }
    
            return _public;
        },

        isOpen: function () : boolean {
            return Is.defined( _element_Dialog ) && _element_Dialog.style.display === "block";
        },

        isComplete: function () : boolean {
            return _groups[ _groups_Current ].position >= _groups[ _groups_Current ].keys.length - 1;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Managing Steps
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        addDocumentSteps: function () : PublicApi {
            getElements();

            return _public;
        },

        addStep: function ( element: HTMLElement, options: BindingOptions ) : PublicApi {
            if ( Is.definedObject( element ) && Is.definedObject( options ) ) {
                setupElement( element, Binding.Options.get( options ) );
    
                _groups[ _groups_Current ].keys.sort();
        
                resetDialogPosition();
            }
    
            return _public;
        },

        removeStep: function ( element: HTMLElement ) : PublicApi {
            if ( Is.definedObject( element ) ) {
                let removed: boolean = false;
    
                for ( let group in _groups ) {
                    if ( _groups.hasOwnProperty( group ) ) {
                        for ( let order in _groups[ group ].json ) {
                            if ( _groups[ group ].json.hasOwnProperty( order ) ) {
                                const bindingOptions: BindingOptions = _groups[ group ].json[ order ];
            
                                if ( bindingOptions._currentView.element === element ) {
                                    Trigger.customEvent( bindingOptions.events!.onRemoveStep!, bindingOptions._currentView.element );
            
                                    _groups[ group ].keys.splice( _groups[ group ].keys.indexOf( bindingOptions.order! ), 1 );
            
                                    delete _groups[ group ].json[ bindingOptions.order! ];
            
                                    _groups[ group ].keys.sort();
                
                                    removed = true;
                                    break;
                                }
                            }
                        }
                    }
                }
    
                if ( !removed ) {
                    DomElement.clearElementsByClassName( element, "journey-js-hint" );
                } else {
                    resetDialogPosition();
                }
            }
    
            return _public;
        },

        clearSteps: function ( group: string = Char.empty ) : PublicApi {
            resetDialogPosition();

            for ( let groupName in _groups ) {
                if ( _groups.hasOwnProperty( groupName ) ) {
                    if ( !Is.definedString( group ) || group === groupName ) {
                        for ( let order in _groups[ groupName ].json ) {
                            if ( _groups[ groupName ].json.hasOwnProperty( order ) ) {
                                const bindingOptions: BindingOptions = _groups[ groupName ].json[ order ];
            
                                Trigger.customEvent( bindingOptions.events!.onRemoveStep!, bindingOptions._currentView.element );
                            }
                        }
                    }
                }
            }
    
            if ( Is.definedString( group ) ) {
                if ( _groups.hasOwnProperty( group ) ) {
                    delete _groups[ group ];
                }
    
            } else {
                _groups = {} as Groups;
            }
    
            if ( !Is.definedString( group ) || group === Constant.DEFAULT_GROUP ) {
                setupDefaultGroup( _groups );
            }
    
            return _public;
        },

        clearHints: function () : PublicApi {
            DomElement.clearElementsByClassName( document.body, "journey-js-hint" );

            return _public;
        },

        reverseStepOrder: function () : PublicApi {
            _groups[ _groups_Current ].keys.reverse();

            resetDialogPosition();
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( newConfiguration: any ) : PublicApi {
            if ( Is.definedObject( newConfiguration ) ) {
                let configurationHasChanged: boolean = false;
                const newInternalConfiguration: any = _configuration;

                for ( let propertyName in newConfiguration ) {
                    if ( newConfiguration.hasOwnProperty( propertyName ) && _configuration.hasOwnProperty( propertyName ) && newInternalConfiguration[ propertyName ] !== newConfiguration[ propertyName ] ) {
                        newInternalConfiguration[ propertyName ] = newConfiguration[ propertyName ];
                        configurationHasChanged = true;
                    }
                }
        
                if ( configurationHasChanged ) {
                    _configuration = Config.Options.get( newInternalConfiguration );
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getVersion: function () : string {
            return "2.2.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Journey.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        _configuration = Config.Options.get();

        document.addEventListener( "DOMContentLoaded", () => {
            setupDefaultGroup();
            Disabled.Background.render( _configuration, onDialogClose );
            renderDialog();
            ToolTip.render();
            getElements();
            buildDocumentEvents();

            if ( getBrowserUrlParameters() ) {
                _public.show();
            }
        } );

        if ( !Is.defined( window.$journey ) ) {
            window.$journey = _public;
        }
    } ) ();
} ) ();