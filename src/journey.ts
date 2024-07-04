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
    type Events, 
    CurrentView} from "./ts/type";

import { Char, KeyCode } from "./ts/enum";
import { Constants } from "./ts/constant";
import { PublicApi } from "./ts/api";


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
    let _groups: object = {};

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
    let _element_Dialog_CheckBox_Input: HTMLInputElement = null;
    let _element_Dialog_ProgressDots: HTMLElement = null;
    let _element_Dialog_ProgressBar: HTMLElement = null;
    let _element_Dialog_ProgressBar_Percentage: HTMLElement = null;
    let _element_Dialog_ProgressBar_Percentage_Text: HTMLElement = null;
    let _element_Dialog_Buttons: HTMLElement = null;
    let _element_Dialog_Buttons_Back_Button: HTMLInputElement = null;
    let _element_Dialog_Buttons_Next_Button: HTMLInputElement = null;
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
     * Groups
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function setupDefaultGroup( groups: any = null ) : void {
        _groups = getDefaultObject( groups, {} );

        _groups[ _groups_Default ] = {
            json: {},
            keys: [],
            position: 0
        };
    }

    function setupNewGroup( group: string ) : void {
        if ( !_groups.hasOwnProperty( group ) ) {
            _groups[ group ] = {
                json: {},
                keys: [],
                position: 0
            };
        }
    }

    function getGroupBindingOptions() : BindingOptions {
        return _groups[ _groups_Current ].json[ _groups[ _groups_Current ].keys[ _groups[ _groups_Current ].position ] ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Disabled Background
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDisabledBackground() : void {
        _element_Disabled_Background = createElement( "div", "journey-js-disabled-background" );

        _element_Disabled_Background.onclick = function() {
            if ( _configuration.closeDialogOnDisabledBackgroundClick ) {
                onDialogClose();
            }
        };
    }

    function showDisabledBackground() : void {
        addNode( document.body, _element_Disabled_Background );
    }

    function hideDisabledBackground() : void {
        removeNode( document.body, _element_Disabled_Background );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDialog() : void {
        _element_Dialog = createElement( "div", "journey-js-dialog" );
        _element_Dialog.style.display = "none";
        document.body.appendChild( _element_Dialog );

        _element_Dialog_Close_Button = createElement( "button", "close" );
        _element_Dialog.appendChild( _element_Dialog_Close_Button );

        _element_Dialog_Close_Button.onclick = function() {
            onDialogClose();
        };

        addToolTip( _element_Dialog_Close_Button, _configuration.closeButtonToolTipText );

        _element_Dialog_Title = createElement( "div", "title" );
        _element_Dialog.appendChild( _element_Dialog_Title );

        _element_Dialog_Description = createElement( "div", "description" );
        _element_Dialog.appendChild( _element_Dialog_Description );

        _element_Dialog_CheckBox_Container = createElement( "div", "checkbox-container" );
        _element_Dialog.appendChild( _element_Dialog_CheckBox_Container );

        _element_Dialog_CheckBox_Input = buildCheckBox( _element_Dialog_CheckBox_Container, _configuration.doNotShowAgainText ).input;
        
        _element_Dialog_CheckBox_Input.onchange = function() {
            if ( _configuration.showDoNotShowAgain ) {
                fireCustomTriggerEvent( _configuration.onDoNotShowAgainChange, _element_Dialog_CheckBox_Input.checked );
            }
        };

        _element_Dialog_ProgressDots = createElement( "div", "progress-dots" );
        _element_Dialog.appendChild( _element_Dialog_ProgressDots );

        _element_Dialog_ProgressBar = createElement( "div", "progress-bar" );
        _element_Dialog.appendChild( _element_Dialog_ProgressBar );

        _element_Dialog_ProgressBar_Percentage = createElement( "div", "progress-bar-percentage" );
        _element_Dialog_ProgressBar.appendChild( _element_Dialog_ProgressBar_Percentage );

        _element_Dialog_ProgressBar_Percentage_Text = createElement( "p", "progress-bar-percentage-text" );
        _element_Dialog_ProgressBar_Percentage.appendChild( _element_Dialog_ProgressBar_Percentage_Text );

        _element_Dialog_Buttons = createElement( "div", "buttons" );
        _element_Dialog.appendChild( _element_Dialog_Buttons );

        _element_Dialog_Buttons_Back_Button = createElement( "button", "back" ) as HTMLInputElement;
        _element_Dialog_Buttons_Back_Button.onclick = onDialogBack;
        _element_Dialog_Buttons.appendChild( _element_Dialog_Buttons_Back_Button );

        _element_Dialog_Buttons_Next_Button = createElement( "button", "next" ) as HTMLInputElement;
        _element_Dialog_Buttons_Next_Button.onclick = onDialogNext;
        _element_Dialog_Buttons.appendChild( _element_Dialog_Buttons_Next_Button );

        makeDialogMovable();
    }

    function onDialogClose( showConfirmationBox: boolean = true ) : void {
        let confirmed: boolean = false;

        if ( isDefinedString( _configuration.closeDialogConfirmationText ) && showConfirmationBox ) {
            confirmed = confirm( _configuration.closeDialogConfirmationText );
        } else {
            confirmed = true;
        }

        if ( confirmed ) {
            const bindingOptions: BindingOptions = getGroupBindingOptions();

            if ( isDefined( bindingOptions ) && isDefined( bindingOptions._currentView.element ) ) {
                fireCustomTriggerEvent( bindingOptions.events.onClose, bindingOptions._currentView.element );
            }
    
            removeFocusClassFromLastElement( false );
            hideDisabledBackground();
            hideToolTip();
    
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
        if ( _groups[ _groups_Current ].position === _groups[ _groups_Current ].keys.length - 1 ) {
            const bindingOptions: BindingOptions = getGroupBindingOptions();

            onDialogClose( false );
            fireCustomTriggerEvent( bindingOptions.events.onFinish, bindingOptions._currentView.element );

        } else {
            removeFocusClassFromLastElement();

            _groups[ _groups_Current ].position++;

            showDialogAndSetPosition();
        }
    }

    function showDialogAndSetPosition() : void {
        const bindingOptions: BindingOptions = getGroupBindingOptions();

        if ( isDefined( bindingOptions ) && isDefined( bindingOptions._currentView.element ) ) {
            if ( bindingOptions.showDisabledBackground ) {
                showDisabledBackground();
            } else {
                hideDisabledBackground();
            }

            hideToolTip();
            
            _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block": "none";
            _configuration_ShortcutKeysEnabled = true;
            
            bindingOptions._currentView.element.className += Char.space + "journey-js-element-focus";

            if ( _configuration.scrollToElements ) {
                bindingOptions._currentView.element.scrollIntoView();
            }

            const lastPositionStyle: string = getStyleValueByName( bindingOptions._currentView.element, "position" );

            if ( lastPositionStyle !== Char.empty && lastPositionStyle.toLowerCase() === "static" ) {
                _element_Focus_Element_PositionStyle = lastPositionStyle;
                bindingOptions._currentView.element.style.position = "relative";
            }

            showElementBasedOnCondition( _element_Dialog_CheckBox_Container, _configuration.showDoNotShowAgain );
            showElementBasedOnCondition( _element_Dialog_ProgressDots, _configuration.showProgressDots && _groups[ _groups_Current ].keys.length > 1 );
            showElementBasedOnCondition( _element_Dialog_ProgressBar, _configuration.showProgressBar && _groups[ _groups_Current ].keys.length > 1 );
            showElementBasedOnCondition( _element_Dialog_ProgressBar_Percentage_Text, _configuration.showProgressBarText );
            showElementBasedOnCondition( _element_Dialog_Buttons, _configuration.showButtons );

            _element_Dialog_Buttons_Back_Button.innerHTML = _configuration.backButtonText;
            _element_Dialog_Buttons_Back_Button.disabled = _groups[ _groups_Current ].position === 0;
            
            if ( _groups[ _groups_Current ].position >= _groups[ _groups_Current ].keys.length - 1 ) {
                _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.finishButtonText;
            } else {
                _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.nextButtonText;
            }

            setDialogText( bindingOptions );
            setDialogPosition( null, bindingOptions );
            buildProcessDots();
            setProgressBarPosition();
            fireCustomTriggerEvent( bindingOptions.events.onEnter, bindingOptions._currentView.element );

            if ( bindingOptions.sendClick ) {
                bindingOptions._currentView.element.click();
            }
        }
    }

    function setDialogText( bindingOptions: BindingOptions ) : void {
        if ( isDefinedString( bindingOptions.title ) ) {
            _element_Dialog_Title.innerHTML = bindingOptions.title;
        } else {
            _element_Dialog_Title.innerHTML = Char.empty;
        }

        if ( isDefinedString( bindingOptions.description ) ) {
            _element_Dialog_Description.innerHTML = bindingOptions.description;
        } else {
            _element_Dialog_Description.innerHTML = Char.empty;
        }
    }

    function setDialogPosition( e: any, bindingOptions: BindingOptions ) : void {
        if ( _element_Dialog.style.display !== "block" ) {
            _element_Dialog.style.display = "block";

            fireCustomTriggerEvent( bindingOptions.events.onOpen, bindingOptions._currentView.element );
        }

        if ( _groups[ _groups_Current ].position === 0 ) {
            fireCustomTriggerEvent( bindingOptions.events.onStart, bindingOptions._currentView.element );
        }

        _element_Dialog_IsHint = bindingOptions.isHint === true;

        if ( bindingOptions.attach || bindingOptions.isHint ) {
            if ( bindingOptions.isHint && bindingOptions.alignHintToClickPosition ) {
                showElementAtMousePosition( e, _element_Dialog );

            } else {
                const offset: any = getOffset( bindingOptions._currentView.element );
                let top: number = ( offset.top ) + bindingOptions._currentView.element.offsetHeight;
                let left: number = ( offset.left );

                if ( left + _element_Dialog.offsetWidth > window.innerWidth || bindingOptions.alignRight ) {
                    left -=  _element_Dialog.offsetWidth;
                    left += bindingOptions._currentView.element.offsetWidth;
                }
        
                if ( top + _element_Dialog.offsetHeight > window.innerHeight || bindingOptions.alignTop ) {
                    top -= ( _element_Dialog.offsetHeight + bindingOptions._currentView.element.offsetHeight );
                }

                _element_Dialog.style.top = top + "px";
                _element_Dialog.style.left = left + "px";
            }

        } else {
            const scrollPosition: any = getScrollPosition();
            const centerLeft: number = Math.max( 0, ( ( window.innerWidth - _element_Dialog.offsetWidth ) / 2 ) + scrollPosition.left );
            const centerTop: number = Math.max( 0, ( ( window.innerHeight - _element_Dialog.offsetHeight ) / 2 ) + scrollPosition.top );

            _element_Dialog.style.left = centerLeft + "px";
            _element_Dialog.style.top = centerTop + "px";
        }
    }

    function removeFocusClassFromLastElement( callCustomTrigger: boolean = true ) : void {
        const bindingOptions: BindingOptions = getGroupBindingOptions();

        if ( isDefined( bindingOptions ) && isDefined( bindingOptions._currentView.element ) ) {
            bindingOptions._currentView.element.className = bindingOptions._currentView.element.className.replace( Char.space + "journey-js-element-focus", Char.empty );

            if ( isDefined( _element_Focus_Element_PositionStyle ) ) {
                bindingOptions._currentView.element.style.position = _element_Focus_Element_PositionStyle;
            }

            if ( callCustomTrigger ) {
                fireCustomTriggerEvent( bindingOptions.events.onLeave, bindingOptions._currentView.element );
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
        let dot: HTMLElement = null;

        if ( keyIndex === _groups[ _groups_Current ].position ) {
            dot = createElement( "div", "dot-active" );
        } else {
            
            dot = createElement( "div", "dot" );
    
            dot.onclick = function() {
                removeFocusClassFromLastElement();

                _groups[ _groups_Current ].position = keyIndex;

                showDialogAndSetPosition();
            };
        }

        _element_Dialog_ProgressDots.appendChild( dot );

        if ( _configuration.showProgressDotToolTips ) {
            if ( isDefinedString( bindingOptions.tooltip ) ) {
                addToolTip( dot, bindingOptions.tooltip );
            } else {
                addToolTip( dot, bindingOptions.title );
            }
        }

        if ( _configuration.showProgressDotNumbers ) {
            dot.className += " dot-number";
            dot.innerHTML = ( keyIndex + 1 ).toString();
        }
    }

    function setProgressBarPosition() : void {
        if ( _configuration.showProgressBar ) {
            const pixelsPerStage: number = _element_Dialog_ProgressBar.offsetWidth / _groups[ _groups_Current ].keys.length;
            const width: number = ( _groups[ _groups_Current ].position + 1 ) * pixelsPerStage;
            const percentageComplete: number = Math.ceil( ( ( _groups[ _groups_Current ].position + 1 ) / _groups[ _groups_Current ].keys.length ) * 100 );

            _element_Dialog_ProgressBar_Percentage.style.width = width + "px";
            _element_Dialog_ProgressBar_Percentage_Text.innerHTML = percentageComplete + "%";
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
            _element_Dialog.className += " journey-js-dialog-moving";
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
            _element_Dialog.style.left = ( e.pageX - _element_Dialog_Move_X ) + "px";
            _element_Dialog.style.top = ( e.pageY - _element_Dialog_Move_Y ) + "px";
        }
    }

    function onMoveDocumentMouseLeave() : void {
        if ( _element_Dialog_Move_IsMoving ) {
            _element_Dialog.style.left = _element_Dialog_Move_Original_X + "px";
            _element_Dialog.style.top = _element_Dialog_Move_Original_Y + "px";

            _element_Dialog_Move_IsMoving = false;
            _element_Dialog_Move_Original_X = 0;
            _element_Dialog_Move_Original_Y = 0;
            _element_Dialog.className = "journey-js-dialog";
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  ToolTip
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderToolTip() : void {
        if ( !isDefined( _element_ToolTip ) ) {
            _element_ToolTip = createElement( "div", "journey-js-tooltip" );
            _element_ToolTip.style.display = "none";

            document.body.appendChild( _element_ToolTip );
    
            document.body.addEventListener( "mousemove", function() {
                hideToolTip();
            } );
    
            document.addEventListener( "scroll", function() {
                hideToolTip();
            } );
        }
    }

    function addToolTip( element: HTMLElement, text: string ) : void {
        if ( element !== null ) {
            element.onmousemove = function( e ) {
                showToolTip( e, text );
            };
        }
    }

    function showToolTip( e: any, text: string ) : void {
        cancelBubble( e );
        hideToolTip();

        _element_ToolTip_Timer = setTimeout( function() {
            _element_ToolTip.innerHTML = text;
            _element_ToolTip.style.display = "block";

            showElementAtMousePosition( e, _element_ToolTip );
        }, _configuration.tooltipDelay );
    }

    function hideToolTip() : void {
        if ( isDefined( _element_ToolTip ) ) {
            if ( _element_ToolTip_Timer !== 0 ) {
                clearTimeout( _element_ToolTip_Timer );
                _element_ToolTip_Timer = 0;
            }
    
            if ( _element_ToolTip.style.display === "block" ) {
                _element_ToolTip.style.display = "none";
            }
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

        if ( isDefined( element ) && element.hasAttribute( Constants.JOURNEY_JS_ATTRIBUTE_NAME ) ) {
            const bindingOptionsData: string = element.getAttribute( Constants.JOURNEY_JS_ATTRIBUTE_NAME );

            if ( isDefinedString( bindingOptionsData ) ) {
                const bindingOptions: StringToJson = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && isDefinedObject( bindingOptions.object ) ) {
                    setupElement( element, buildAttributeOptions( bindingOptions.object ) );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( _configuration.attributeNotValidErrorText.replace( "{{attribute_name}}", Constants.JOURNEY_JS_ATTRIBUTE_NAME ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.attributeNotSetErrorText.replace( "{{attribute_name}}", Constants.JOURNEY_JS_ATTRIBUTE_NAME ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function setupElement( element: HTMLElement, bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView = {} as CurrentView;
        bindingOptions._currentView.element = element;

        if ( isDefinedNumber( bindingOptions.order ) && ( isDefinedString( bindingOptions.title ) || isDefinedString( bindingOptions.description ) ) ) {
            element.removeAttribute( Constants.JOURNEY_JS_ATTRIBUTE_NAME );
            
            if ( !bindingOptions.isHint ) {
                setupNewGroup( bindingOptions.group );

                _groups[ bindingOptions.group ].json[ bindingOptions.order ] = bindingOptions;
                _groups[ bindingOptions.group ].keys.push( bindingOptions.order );

                fireCustomTriggerEvent( bindingOptions.events.onAddStep, element );

            } else {
                renderHint( bindingOptions );
            }
        }
    }

    function renderHint( bindingOptions: BindingOptions ) : void {
        const positionStyle: string = getStyleValueByName( bindingOptions._currentView.element, "position" );

        if ( positionStyle !== Char.empty && positionStyle.toLowerCase() === "static" ) {
            bindingOptions._currentView.element.style.position = "relative";
        }

        const hint: HTMLElement = createElement( "div", "journey-js-hint" );
        bindingOptions._currentView.element.appendChild( hint );

        hint.onclick = function( e ) {
            cancelBubble( e );

            _element_Dialog_CheckBox_Container.style.display = "none";
            _element_Dialog_ProgressDots.style.display = "none";
            _element_Dialog_ProgressBar.style.display = "none";
            _element_Dialog_Buttons.style.display = "none";
            _configuration_ShortcutKeysEnabled = false;

            setDialogText( bindingOptions );
            setDialogPosition( e, bindingOptions );

            if ( bindingOptions.removeHintWhenViewed ) {
                clearElementsByClassName( bindingOptions._currentView.element, "journey-js-hint" );
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
            if ( e.keyCode === KeyCode.escape ) {
                e.preventDefault();
                onDialogClose();
            } else {

                if ( _configuration_ShortcutKeysEnabled ) {
                    if ( e.keyCode === KeyCode.left ) {
                        e.preventDefault();
                        onDialogBack();
        
                    } else if ( e.keyCode === KeyCode.right ) {
                        e.preventDefault();
                        onDialogNext();
        
                    } else if ( e.keyCode === KeyCode.up ) {
                        e.preventDefault();
                        onWindowKeyCodeUp();
        
                    } else if ( e.keyCode === KeyCode.down ) {
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
        let left: number = e.pageX;
        let top: number = e.pageY;
        const scrollPosition: any = getScrollPosition();

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

        const checkMark: HTMLElement = createElement( "span", "check-mark" );
        const text: HTMLElement = createElement( "span", "text" );

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

            for ( let parsedArgsIndex: number = 0; parsedArgsIndex < parsedArgsLength; parsedArgsIndex++ ) {
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
	 * Public API Functions:  Helpers:  Configuration
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function buildDefaultConfiguration( newConfiguration: Configuration = null ) : void {
        _configuration = getDefaultObject( newConfiguration, {} as Configuration );
        _configuration.safeMode = getDefaultBoolean( _configuration.safeMode, true );
        _configuration.domElementTypes = getDefaultStringOrArray( _configuration.domElementTypes, [ "*" ] );
        _configuration.showCloseButton = getDefaultBoolean( _configuration.showCloseButton, true );
        _configuration.shortcutKeysEnabled = getDefaultBoolean( _configuration.shortcutKeysEnabled, true );
        _configuration.showProgressDots = getDefaultBoolean( _configuration.showProgressDots, true );
        _configuration.browserUrlParametersEnabled = getDefaultBoolean( _configuration.browserUrlParametersEnabled, true );
        _configuration.showProgressDotNumbers = getDefaultBoolean( _configuration.showProgressDotNumbers, false );
        _configuration.showButtons = getDefaultBoolean( _configuration.showButtons, true );
        _configuration.showDoNotShowAgain = getDefaultBoolean( _configuration.showDoNotShowAgain, false );
        _configuration.tooltipDelay = getDefaultNumber( _configuration.tooltipDelay, 750 );
        _configuration.showProgressDotToolTips = getDefaultBoolean( _configuration.showProgressDotToolTips, true );
        _configuration.closeDialogOnDisabledBackgroundClick = getDefaultBoolean( _configuration.closeDialogOnDisabledBackgroundClick, false );
        _configuration.showProgressBar = getDefaultBoolean( _configuration.showProgressBar, false );
        _configuration.scrollToElements = getDefaultBoolean( _configuration.scrollToElements, false );
        _configuration.dialogMovingEnabled = getDefaultBoolean( _configuration.dialogMovingEnabled, false );
        _configuration.showProgressBarText = getDefaultBoolean( _configuration.showProgressBarText, false );

        buildDefaultConfigurationStrings();
        buildDefaultConfigurationCustomTriggers();
    }

    function buildDefaultConfigurationStrings() : void {
        _configuration.backButtonText = getDefaultAnyString( _configuration.backButtonText, "Back" );
        _configuration.nextButtonText = getDefaultAnyString( _configuration.nextButtonText, "Next" );
        _configuration.finishButtonText = getDefaultAnyString( _configuration.finishButtonText, "Finish" );
        _configuration.closeButtonToolTipText = getDefaultAnyString( _configuration.closeButtonToolTipText, "Close" );
        _configuration.doNotShowAgainText = getDefaultAnyString( _configuration.doNotShowAgainText, "Do not show again" );
        _configuration.objectErrorText = getDefaultAnyString( _configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
        _configuration.attributeNotValidErrorText = getDefaultAnyString( _configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
        _configuration.attributeNotSetErrorText = getDefaultAnyString( _configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
        _configuration.closeDialogConfirmationText = getDefaultAnyString( _configuration.closeDialogConfirmationText, null );
    }

    function buildDefaultConfigurationCustomTriggers() : void {
        _configuration.onDoNotShowAgainChange = getDefaultFunction( _configuration.onDoNotShowAgainChange, null );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Show/Hide
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        start: function ( group: string = null ) : PublicApi {
            if ( !_public.isOpen() ) {
                _groups_Current = getDefaultString( group, _groups_Default );
    
                if ( _groups.hasOwnProperty( _groups_Current ) ) {
                    _groups[ _groups_Current ].position = 0;
        
                    showDialogAndSetPosition();
                }
            }
    
            return _public;
        },

        show: function ( group: string = null ) : PublicApi {
            if ( !_public.isOpen() ) {
                _groups_Current = getDefaultString( group, _groups_Current );
    
                if ( _groups.hasOwnProperty( _groups_Current ) ) {
                    if ( _groups[ _groups_Current ].position === _groups[ _groups_Current ].keys.length - 1 ) {
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
            return isDefined( _element_Dialog ) && _element_Dialog.style.display === "block";
        },

        isComplete: function () : boolean {
            return _groups[ _groups_Current ].position >= _groups[ _groups_Current ].keys.length - 1;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Managing Steps
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        addDocumentSteps: function () : PublicApi {
            getElements();

            return _public;
        },

        addStep: function ( element: HTMLElement, options: BindingOptions ) : PublicApi {
            if ( isDefinedObject( element ) && isDefinedObject( options ) ) {
                setupElement( element, buildAttributeOptions( options ) );
    
                _groups[ _groups_Current ].keys.sort();
        
                resetDialogPosition();
            }
    
            return _public;
        },

        removeStep: function ( element: HTMLElement ) : PublicApi {
            if ( isDefinedObject( element ) ) {
                let removed: boolean = false;
    
                for ( let group in _groups ) {
                    if ( _groups.hasOwnProperty( group ) ) {
                        for ( let order in _groups[ group ].json ) {
                            if ( _groups[ group ].json.hasOwnProperty( order ) ) {
                                const bindingOptions: BindingOptions = _groups[ group ].json[ order ];
            
                                if ( bindingOptions._currentView.element === element ) {
                                    fireCustomTriggerEvent( bindingOptions.events.onRemoveStep, bindingOptions._currentView.element );
            
                                    _groups[ group ].keys.splice( _groups[ group ].keys.indexOf( bindingOptions.order ), 1 );
            
                                    delete _groups[ group ].json[ bindingOptions.order ];
            
                                    _groups[ group ].keys.sort();
                
                                    removed = true;
                                    break;
                                }
                            }
                        }
                    }
                }
    
                if ( !removed ) {
                    clearElementsByClassName( element, "journey-js-hint" );
                } else {
                    resetDialogPosition();
                }
            }
    
            return _public;
        },

        clearSteps: function ( group: string = null ) : PublicApi {
            resetDialogPosition();

            for ( let groupName in _groups ) {
                if ( _groups.hasOwnProperty( groupName ) ) {
                    if ( !isDefinedString( group ) || group === groupName ) {
                        for ( let order in _groups[ groupName ].json ) {
                            if ( _groups[ groupName ].json.hasOwnProperty( order ) ) {
                                const bindingOptions: BindingOptions = _groups[ groupName ].json[ order ];
            
                                fireCustomTriggerEvent( bindingOptions.events.onRemoveStep, bindingOptions._currentView.element );
                            }
                        }
                    }
                }
            }
    
            if ( isDefinedString( group ) ) {
                if ( _groups.hasOwnProperty( group ) ) {
                    delete _groups[ group ];
                }
    
            } else {
                _groups = {};
            }
    
            if ( !isDefinedString( group ) || group === _groups_Default ) {
                setupDefaultGroup( _groups );
            }
    
            return _public;
        },

        clearHints: function () : PublicApi {
            clearElementsByClassName( document.body, "journey-js-hint" );

            return _public;
        },

        reverseStepOrder: function () : PublicApi {
            _groups[ _groups_Current ].keys.reverse();

            resetDialogPosition();
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( newConfiguration: Configuration ) : PublicApi {
            if ( isDefinedObject( newConfiguration ) ) {
                let configurationHasChanged: boolean = false;
            
                for ( let propertyName in newConfiguration ) {
                    if ( newConfiguration.hasOwnProperty( propertyName ) && _configuration.hasOwnProperty( propertyName ) && _configuration[ propertyName ] !== newConfiguration[ propertyName ] ) {
                        _configuration[ propertyName ] = newConfiguration[ propertyName ];
                        configurationHasChanged = true;
                    }
                }
        
                if ( configurationHasChanged ) {
                    buildDefaultConfiguration( _configuration );
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getVersion: function (): string {
            return "2.0.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Journey.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        buildDefaultConfiguration();

        document.addEventListener( "DOMContentLoaded", function() {
            setupDefaultGroup();
            renderDisabledBackground();
            renderDialog();
            renderToolTip();
            getElements();
            buildDocumentEvents();

            if ( getBrowserUrlParameters() ) {
                _public.show();
            }
        } );

        if ( !isDefined( window.$journey ) ) {
            window.$journey = _public;
        }
    } ) ();
} ) ();