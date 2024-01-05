/**
 * Journey.js
 * 
 * A lightweight, easy-to-use JavaScript library to create interactive, customizable, accessible guided tours across your websites or web apps!
 * 
 * @file        journey.js
 * @version     v0.7.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2023
 */


( function() {
    var _this = this,

        // Variables: Constructor Parameters
        _parameter_Document = null,
        _parameter_Window = null,

        // Variables: Configuration
        _configuration = {},

        // Variables: Enums
        _enum_KeyCodes = {
            escape: 27,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        },

        // Variables: Strings
        _string = {
            empty: "",
            space: " "
        },

        // Variables: Elements
        _elements_Type = {},
        _elements_Attributes_Json = {},
        _elements_Attributes_Keys = [],
        _elements_Attributes_Position = 0,

        // Variables: Focus Element
        _element_Focus_Element_PositionStyle = null,

        // Variables: Disabled Background
        _element_Disabled_Background = null,

        // Variables: Dialog
        _element_Dialog = null,
        _element_Dialog_Close_Button = null,
        _element_Dialog_Title = null,
        _element_Dialog_Description = null,
        _element_Dialog_ProgressDots = null,
        _element_Dialog_Back_Button = null,
        _element_Dialog_Next_Button = null,

        // Variables: Attribute Names
        _attribute_Name_Journey = "data-journey-options";


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Disabled Background
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDisabledBackground() {
        _element_Disabled_Background = createElement( "div", "journey-js-disabled-background" );
    }

    function showDisabledBackground() {
        addNode( _parameter_Document.body, _element_Disabled_Background );
    }

    function hideDisabledBackground() {
        removeNode( _parameter_Document.body, _element_Disabled_Background );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDialog() {
        _element_Dialog = createElement( "div", "journey-js-dialog" );
        _element_Dialog.style.display = "none";
        _parameter_Document.body.appendChild( _element_Dialog );

        _element_Dialog_Close_Button = createElement( "button", "close" );
        _element_Dialog_Close_Button.onclick = onDialogClose;
        _element_Dialog.appendChild( _element_Dialog_Close_Button );

        _element_Dialog_Title = createElement( "div", "title" );
        _element_Dialog.appendChild( _element_Dialog_Title );

        _element_Dialog_Description = createElement( "div", "description" );
        _element_Dialog.appendChild( _element_Dialog_Description );

        _element_Dialog_ProgressDots = createElement( "div", "progress-dots" );
        _element_Dialog.appendChild( _element_Dialog_ProgressDots );

        var buttons = createElement( "div", "buttons" );
        _element_Dialog.appendChild( buttons );

        _element_Dialog_Back_Button = createElement( "button", "back" );
        _element_Dialog_Back_Button.onclick = onDialogBack;
        buttons.appendChild( _element_Dialog_Back_Button );

        _element_Dialog_Next_Button = createElement( "button", "next" );
        _element_Dialog_Next_Button.onclick = onDialogNext;
        buttons.appendChild( _element_Dialog_Next_Button );
    }

    function onDialogClose() {
        var bindingOptions = _elements_Attributes_Json[ _elements_Attributes_Keys[ _elements_Attributes_Position ] ];

        if ( isDefined( bindingOptions.element ) ) {
            fireCustomTrigger( bindingOptions.onClose, bindingOptions.element );
        }

        removeFocusClassFromLastElement( false );
        hideDisabledBackground();

        _element_Dialog.style.display = "none";
    }

    function onDialogBack() {
        if ( _elements_Attributes_Position > 0 ) {
            removeFocusClassFromLastElement();

            _elements_Attributes_Position--;

            showDialogAndSetPosition();
        }        
    }

    function onDialogNext() {
        if ( _elements_Attributes_Position === _elements_Attributes_Keys.length - 1 ) {
            var bindingOptions = _elements_Attributes_Json[ _elements_Attributes_Keys[ _elements_Attributes_Position ] ];

            onDialogClose();
            fireCustomTrigger( bindingOptions.onFinish, bindingOptions.element );

        } else {
            removeFocusClassFromLastElement();

            _elements_Attributes_Position++;

            showDialogAndSetPosition();
        }
    }

    function showDialogAndSetPosition() {
        var bindingOptions = _elements_Attributes_Json[ _elements_Attributes_Keys[ _elements_Attributes_Position ] ];

        if ( isDefined( bindingOptions ) && isDefined( bindingOptions.element ) ) {
            showDisabledBackground();
            
            _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block": "none";
            bindingOptions.element.className += _string.space + "journey-js-element-focus";

            var lastPositionStyle = getStyleValueByName( bindingOptions.element, "position" ),
                scrollPosition = getScrollPosition();

            if ( lastPositionStyle !== _string.empty && lastPositionStyle.toLowerCase() === "static" ) {
                _element_Focus_Element_PositionStyle = lastPositionStyle;
                bindingOptions.element.style.position = "relative";
            }

            _element_Dialog_Back_Button.innerHTML = _configuration.backButtonText;
            _element_Dialog_Back_Button.disabled = _elements_Attributes_Position === 0;
            
            if ( _elements_Attributes_Position >= _elements_Attributes_Keys.length - 1 ) {
                _element_Dialog_Next_Button.innerHTML = _configuration.finishButtonText;
            } else {
                _element_Dialog_Next_Button.innerHTML = _configuration.nextButtonText;
            }

            if ( isDefinedString( bindingOptions.title ) ) {
                _element_Dialog_Title.innerHTML = bindingOptions.title;
            } else {
                _element_Dialog_Title.innerHTML = _string.empty;
            }

            if ( isDefinedString( bindingOptions.description ) ) {
                _element_Dialog_Description.innerHTML = bindingOptions.description;
            } else {
                _element_Dialog_Description.innerHTML = _string.empty;
            }

            if ( _element_Dialog.style.display !== "block" ) {
                _element_Dialog.style.display = "block";

                fireCustomTrigger( bindingOptions.onOpen, bindingOptions.element );
            }

            if ( bindingOptions.attach ) {
                var offset = getOffset( bindingOptions.element ),
                    top = ( offset.top - scrollPosition.top ) + bindingOptions.element.offsetHeight,
                    left = ( offset.left - scrollPosition.left );

                if ( left + _element_Dialog.offsetWidth > _parameter_Window.innerWidth || bindingOptions.alignRight ) {
                    left -=  _element_Dialog.offsetWidth;
                    left += bindingOptions.element.offsetWidth;
                }
        
                if ( top + _element_Dialog.offsetHeight > _parameter_Window.innerHeight || bindingOptions.alignTop ) {
                    top -= ( _element_Dialog.offsetHeight + bindingOptions.element.offsetHeight );
                }
    
                _element_Dialog.style.top = top + "px";
                _element_Dialog.style.left = left + "px";

            } else {
                var centerLeft = Math.max( 0, ( ( _parameter_Window.innerWidth - _element_Dialog.offsetWidth ) / 2 ) + scrollPosition.left ),
                    centerTop = Math.max( 0, ( ( _parameter_Window.innerHeight - _element_Dialog.offsetHeight ) / 2 ) + scrollPosition.top );
    
                _element_Dialog.style.left = centerLeft + "px";
                _element_Dialog.style.top = centerTop + "px";
            }

            if ( bindingOptions.sendClick ) {
                bindingOptions.element.click();
            }

            buildProcessDots();
            fireCustomTrigger( bindingOptions.onEnter, bindingOptions.element );
        }
    }

    function removeFocusClassFromLastElement( callCustomTrigger ) {
        callCustomTrigger = isDefined( callCustomTrigger ) ? callCustomTrigger : true;

        var bindingOptions = _elements_Attributes_Json[ _elements_Attributes_Keys[ _elements_Attributes_Position ] ];

        if ( isDefined( bindingOptions.element ) ) {
            bindingOptions.element.className = bindingOptions.element.className.replace( _string.space + "journey-js-element-focus", _string.empty );

            if ( isDefined( _element_Focus_Element_PositionStyle ) ) {
                bindingOptions.element.style.position = _element_Focus_Element_PositionStyle;
            }

            if ( callCustomTrigger ) {
                fireCustomTrigger( bindingOptions.onLeave, bindingOptions.element );
            }
        }
    }

    function buildProcessDots() {
        _element_Dialog_ProgressDots.innerHTML = _string.empty;

        if ( _configuration.showProgressDots ) {
            var keysLength = _elements_Attributes_Keys.length;

            for ( var keyIndex = 0; keyIndex < keysLength; keyIndex++ ) {
                buildProgressDot( keyIndex );
            }
        }
    }

    function buildProgressDot( keyIndex ) {
        if ( keyIndex === _elements_Attributes_Position ) {
            _element_Dialog_ProgressDots.appendChild( createElement( "div", "dot-active" ) );
            
        } else {
            var dot = createElement( "div", "dot" );
            _element_Dialog_ProgressDots.appendChild( dot );
    
            dot.onclick = function() {
                removeFocusClassFromLastElement();

                _elements_Attributes_Position = keyIndex;

                showDialogAndSetPosition();
            };
        }
    }

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Rendering
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getElements() {
        var tagTypes = _configuration.domElementTypes,
            tagTypesLength = tagTypes.length;

        for ( var tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            var domElements = _parameter_Document.getElementsByTagName( tagTypes[ tagTypeIndex ] ),
                elements = [].slice.call( domElements ),
                elementsLength = elements.length;

            for ( var elementIndex = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( !getElement( elements[ elementIndex ] ) ) {
                    break;
                }
            }
        }

        _elements_Attributes_Keys.sort();
    }

    function getElement( element ) {
        var result = true;

        if ( isDefined( element ) && element.hasAttribute( _attribute_Name_Journey ) ) {
            var bindingOptionsData = element.getAttribute( _attribute_Name_Journey );

            if ( isDefinedString( bindingOptionsData ) ) {
                var bindingOptions = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && isDefinedObject( bindingOptions.result ) ) {
                    bindingOptions = buildAttributeOptions( bindingOptions.result );
                    bindingOptions.element = element;

                    if ( isDefinedNumber( bindingOptions.order ) && ( isDefinedString( bindingOptions.title ) || isDefinedString( bindingOptions.description ) ) ) {
                        _elements_Attributes_Json[ bindingOptions.order ] = bindingOptions;
                        _elements_Attributes_Keys.push( bindingOptions.order );

                        element.removeAttribute( _attribute_Name_Journey );
                    }

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( "The attribute '" + _attribute_Name_Journey + "' is not a valid object." );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( "The attribute '" + _attribute_Name_Journey + "' has not been set correctly." );
                    result = false;
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Document Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildDocumentEvents( addEvents ) {
        addEvents = isDefined( addEvents ) ? addEvents : true;

        var documentFunc = addEvents ? _parameter_Document.addEventListener : _parameter_Document.removeEventListener,
            windowFunc = addEvents ? _parameter_Window.addEventListener : _parameter_Window.removeEventListener;

        if ( _configuration.shortcutKeysEnabled ) {
            documentFunc( "keydown", onWindowKeyDown );
        }

        windowFunc( "resize", onWindowResize );
    }

    function onWindowKeyDown( e ) {
        if ( _this.isOpen() ) {
            if ( e.keyCode === _enum_KeyCodes.escape ) {
                e.preventDefault();
                onDialogClose();

            } else if ( e.keyCode === _enum_KeyCodes.left ) {
                e.preventDefault();
                onDialogBack();

            } else if ( e.keyCode === _enum_KeyCodes.right ) {
                e.preventDefault();
                onDialogNext();

            } else if ( e.keyCode === _enum_KeyCodes.up ) {
                e.preventDefault();
                onWindowKeyCodeUp();

            } else if ( e.keyCode === _enum_KeyCodes.down ) {
                e.preventDefault();
                onWindowKeyCodeDown();
            }
        }
    }

    function onWindowResize() {
        if ( _this.isOpen() ) {
            showDialogAndSetPosition();
        }
    }

    function onWindowKeyCodeUp() {
        if ( _elements_Attributes_Position !== 0 ) {
            removeFocusClassFromLastElement();

            _elements_Attributes_Position = 0;
    
            showDialogAndSetPosition();
        }
    }

    function onWindowKeyCodeDown() {
        if ( _elements_Attributes_Position !== _elements_Attributes_Keys.length - 1 ) {
            removeFocusClassFromLastElement();

            _elements_Attributes_Position = _elements_Attributes_Keys.length - 1;
    
            showDialogAndSetPosition();
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions ) {
        var options = !isDefinedObject( newOptions ) ? {} : newOptions;
        options.order = getDefaultNumber( options.order, 0 );
        options.attach = getDefaultBoolean( options.attach, true );
        options.sendClick = getDefaultBoolean( options.sendClick, false );
        options.alignTop = getDefaultBoolean( options.alignTop, false );
        options.alignRight = getDefaultBoolean( options.alignRight, false );

        options = buildAttributeOptionStrings( options );

        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionStrings( options ) {
        options.title = getDefaultString( options.title, null );
        options.description = getDefaultString( options.description, null );

        return options;
    }

    function buildAttributeOptionCustomTriggers( options ) {
        options.onEnter = getDefaultFunction( options.onEnter, null );
        options.onLeave = getDefaultFunction( options.onLeave, null );
        options.onClose = getDefaultFunction( options.onClose, null );
        options.onFinish = getDefaultFunction( options.onFinish, null );
        options.onOpen = getDefaultFunction( options.onOpen, null );

        return options;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Browser URL Parameters
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getBrowserUrlParameters() {
        var show = false;

        if ( _configuration.browserUrlParametersEnabled ) {
            var url = _parameter_Window.location.href,
                urlArguments = getBrowserUrlArguments( url );

            if ( isDefined( urlArguments.sjOrderId ) ) {
                var orderId = parseInt( urlArguments.sjOrderId, 10 );

                if ( !isNaN( orderId ) && orderId <= _elements_Attributes_Keys.length - 1 ) {
                    _elements_Attributes_Position = orderId;
                }
            }

            if ( isDefined( urlArguments.sjShow ) ) {
                show = urlArguments.sjShow === "true";
            }
        }

        return show;
    }

    function getBrowserUrlArguments( url ) {
        var urlArguments = {},
            urlDataParts = url.split( "?" );

        if ( urlDataParts.length > 1 ) {
            var parsedArgs = urlDataParts[ 1 ].split( "&" ),
                parsedArgsLength = parsedArgs.length;

            for ( var parsedArgsIndex = 0; parsedArgsIndex < parsedArgsLength; parsedArgsIndex++ ) {
                var parsedArg = parsedArgs[ parsedArgsIndex ].split( "=" );

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

    function isDefined( value ) {
        return value !== null && value !== undefined && value !== _string.empty;
    }

    function isDefinedObject( object ) {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object ) {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object ) {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object ) {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object ) {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object ) {
        return isDefinedObject( object ) && object instanceof Array;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createElement( type, className ) {
        var result = null,
            nodeType = type.toLowerCase(),
            isText = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? _parameter_Document.createTextNode( _string.empty ) : _parameter_Document.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        if ( isDefined( className ) ) {
            result.className = className;
        }

        return result;
    }

    function getOffset( element ) {
        var left = 0,
            top = 0;

        while ( element && !isNaN( element.offsetLeft ) && !isNaN( element.offsetTop ) ) {
            left += element.offsetLeft - element.scrollLeft;
            top += element.offsetTop - element.scrollTop;

            element = element.offsetParent;
        }

        return {
            left: left,
            top: top
        };
    }

    function getScrollPosition() {
        var doc = _parameter_Document.documentElement,
            left = ( _parameter_Window.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 ),
            top = ( _parameter_Window.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    function getStyleValueByName( element, stylePropertyName ) {
        var value = null;

        if ( _parameter_Window.getComputedStyle ) {
            value = document.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        }  
        else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }                     

        return value;
    }

    function addNode( parent, node ) {
        try {
            if ( !parent.contains( node ) ) {
                parent.appendChild( node );
            }
        } catch ( e ) {
            console.warn( e.message );
        }
    }

    function removeNode( parent, node ) {
        try {
            if ( parent.contains( node ) ) {
                parent.removeChild( node );
            }
        } catch ( e ) {
            console.warn( e.message );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTrigger( triggerFunction ) {
        if ( isDefinedFunction( triggerFunction ) ) {
            triggerFunction.apply( null, [].slice.call( arguments, 1 ) );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultString( value, defaultValue ) {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value, defaultValue ) {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value, defaultValue ) {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultArray( value, defaultValue ) {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value, defaultValue ) {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value, defaultValue ) {
        if ( isDefinedString( value ) ) {
            value = value.split( _string.space );

            if ( value.length === 0 ) {
                value = defaultValue;
            }

        } else {
            value = getDefaultArray( value, defaultValue );
        }

        return value;
    }

    function getObjectFromString( objectString ) {
        var parsed = true,
            result = null;

        try {
            if ( isDefinedString( objectString ) ) {
                result = JSON.parse( objectString );
            }

        } catch ( e1 ) {

            try {
                result = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result ) ) {
                    result = result();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( "Errors in object: " + e1.message + ", " + e2.message );
                    parsed = false;
                }
                
                result = null;
            }
        }

        return {
            parsed: parsed,
            result: result
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * 
     * @param       {Object}   newConfiguration                             All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Journey.js class instance.
     */
    this.setConfiguration = function( newOptions ) {
        _configuration = !isDefinedObject( newOptions ) ? {} : newOptions;
        
        buildDefaultConfiguration();

        if ( _this.isOpen() ) {
            onDialogClose();

            _elements_Attributes_Position = 0;
        }

        return this;
    };

    function buildDefaultConfiguration() {
        _configuration.safeMode = getDefaultBoolean( _configuration.safeMode, true );
        _configuration.domElementTypes = getDefaultStringOrArray( _configuration.domElementTypes, [ "*" ] );
        _configuration.backButtonText = getDefaultString( _configuration.backButtonText, "Back" );
        _configuration.nextButtonText = getDefaultString( _configuration.nextButtonText, "Next" );
        _configuration.finishButtonText = getDefaultString( _configuration.finishButtonText, "Finish" );
        _configuration.showCloseButton = getDefaultBoolean( _configuration.showCloseButton, true );
        _configuration.shortcutKeysEnabled = getDefaultBoolean( _configuration.shortcutKeysEnabled, true );
        _configuration.showProgressDots = getDefaultBoolean( _configuration.showProgressDots, true );
        _configuration.browserUrlParametersEnabled = getDefaultBoolean( _configuration.browserUrlParametersEnabled, true );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Show/Hide
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * show().
     * 
     * Shows the Journey.js dialog for the element in the last known position (defaults to the start).
     * 
     * @public
     */
    this.show = function() {
        if ( _elements_Attributes_Position === _elements_Attributes_Keys.length - 1 ) {
            _elements_Attributes_Position = 0;
        }

        showDialogAndSetPosition();
    };

    /**
     * hide().
     * 
     * Hides the Journey.js dialog.
     * 
     * @public
     */
    this.hide = function() {
        onDialogClose();
    };

    /**
     * isOpen().
     * 
     * Returns a flag that states if the dialog is opened.
     * 
     * @public
     * 
     * @returns     {boolean}                                               The flag that states if the dialog is open.
     */
    this.isOpen = function() {
        return _element_Dialog.style.display === "block";
    };

    /**
     * isComplete().
     * 
     * Returns a flag that states if the full journey has been completed.
     * 
     * @public
     * 
     * @returns     {boolean}                                               The flag that states if the full journey has been completed.
     */
    this.isComplete = function() {
        return _elements_Attributes_Position >= _elements_Attributes_Keys.length - 1;
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getVersion().
     * 
     * Returns the version of Journey.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    this.getVersion = function() {
        return "0.7.0";
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Journey.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( function ( documentObject, windowObject ) {
        _parameter_Document = documentObject;
        _parameter_Window = windowObject;

        buildDefaultConfiguration();

        _parameter_Document.addEventListener( "DOMContentLoaded", function() {
            renderDisabledBackground();
            renderDialog();
            getElements();
            buildDocumentEvents();

            if ( getBrowserUrlParameters() ) {
                _this.show();
            }
        } );

        if ( !isDefined( _parameter_Window.$journey ) ) {
            _parameter_Window.$journey = this;
        }

    } ) ( document, window );
} )();