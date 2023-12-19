/*! Journey.js v0.3.0 | (c) Bunoon | MIT License */
(function() {
  function renderDisabledBackground() {
    _element_Disabled_Background = createElement("div", "journey-js-disabled-background");
  }
  function showDisabledBackground() {
    addNode(_parameter_Document.body, _element_Disabled_Background);
  }
  function hideDisabledBackground() {
    removeNode(_parameter_Document.body, _element_Disabled_Background);
  }
  function renderDialog() {
    _element_Dialog = createElement("div", "journey-js-dialog");
    _element_Dialog.style.display = "none";
    _parameter_Document.body.appendChild(_element_Dialog);
    _element_Dialog_Close_Button = createElement("button", "close");
    _element_Dialog_Close_Button.onclick = onDialogClose;
    _element_Dialog.appendChild(_element_Dialog_Close_Button);
    _element_Dialog_Title = createElement("div", "title");
    _element_Dialog.appendChild(_element_Dialog_Title);
    _element_Dialog_Description = createElement("div", "description");
    _element_Dialog.appendChild(_element_Dialog_Description);
    var buttons = createElement("div", "buttons");
    _element_Dialog.appendChild(buttons);
    _element_Dialog_Previous_Button = createElement("button", "previous");
    _element_Dialog_Previous_Button.onclick = onDialogPrevious;
    buttons.appendChild(_element_Dialog_Previous_Button);
    _element_Dialog_Next_Button = createElement("button", "next");
    _element_Dialog_Next_Button.onclick = onDialogNext;
    buttons.appendChild(_element_Dialog_Next_Button);
  }
  function onDialogClose() {
    var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[_elements_Attributes_Position]];
    if (isDefined(bindingOptions.element)) {
      fireCustomTrigger(bindingOptions.onClose, bindingOptions.element);
    }
    removeFocusClassFromLastElement(false);
    hideDisabledBackground();
    _element_Dialog.style.display = "none";
  }
  function onDialogPrevious() {
    if (_elements_Attributes_Position > 0) {
      removeFocusClassFromLastElement();
      _elements_Attributes_Position--;
      showDialogAndSetPosition();
    }
  }
  function onDialogNext() {
    if (_elements_Attributes_Position === _elements_Attributes_Keys.length - 1) {
      onDialogClose();
    } else {
      removeFocusClassFromLastElement();
      _elements_Attributes_Position++;
      showDialogAndSetPosition();
    }
  }
  function showDialogAndSetPosition() {
    var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[_elements_Attributes_Position]];
    if (isDefined(bindingOptions) && isDefined(bindingOptions.element)) {
      showDisabledBackground();
      _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block" : "none";
      bindingOptions.element.className += _string.space + "journey-js-element-focus";
      var offset = getOffset(bindingOptions.element);
      var scrollPosition = getScrollPosition();
      var top = offset.top - scrollPosition.top + bindingOptions.element.offsetHeight;
      var left = offset.left - scrollPosition.left;
      var lastPositionStyle = getStyleValueByName(bindingOptions.element, "position");
      if (lastPositionStyle !== _string.empty && lastPositionStyle.toLowerCase() === "static") {
        _element_Focus_Element_PositionStyle = lastPositionStyle;
        bindingOptions.element.style.position = "relative";
      }
      _element_Dialog_Previous_Button.innerHTML = _configuration.previousButtonText;
      _element_Dialog_Previous_Button.disabled = _elements_Attributes_Position === 0;
      if (_elements_Attributes_Position >= _elements_Attributes_Keys.length - 1) {
        _element_Dialog_Next_Button.innerHTML = _configuration.finishButtonText;
      } else {
        _element_Dialog_Next_Button.innerHTML = _configuration.nextButtonText;
      }
      if (isDefinedString(bindingOptions.title)) {
        _element_Dialog_Title.innerHTML = bindingOptions.title;
      } else {
        _element_Dialog_Title.innerHTML = _string.empty;
      }
      if (isDefinedString(bindingOptions.description)) {
        _element_Dialog_Description.innerHTML = bindingOptions.description;
      } else {
        _element_Dialog_Description.innerHTML = _string.empty;
      }
      _element_Dialog.style.display = "block";
      if (left + _element_Dialog.offsetWidth > _parameter_Window.innerWidth) {
        left = left - (_element_Dialog.offsetWidth + bindingOptions.element.offsetWidth);
      }
      if (top + _element_Dialog.offsetHeight > _parameter_Window.innerHeight) {
        top = top - (_element_Dialog.offsetHeight + bindingOptions.element.offsetHeight);
      }
      _element_Dialog.style.top = top + "px";
      _element_Dialog.style.left = left + "px";
      fireCustomTrigger(bindingOptions.onEnter, bindingOptions.element);
    }
  }
  function removeFocusClassFromLastElement(callCustomTrigger) {
    callCustomTrigger = isDefined(callCustomTrigger) ? callCustomTrigger : true;
    var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[_elements_Attributes_Position]];
    if (isDefined(bindingOptions.element)) {
      bindingOptions.element.className = bindingOptions.element.className.replace(_string.space + "journey-js-element-focus", _string.empty);
      if (isDefined(_element_Focus_Element_PositionStyle)) {
        bindingOptions.element.style.position = _element_Focus_Element_PositionStyle;
      }
      if (callCustomTrigger) {
        fireCustomTrigger(bindingOptions.onLeave, bindingOptions.element);
      }
    }
  }
  function getElements() {
    var tagTypes = _configuration.domElementTypes;
    var tagTypesLength = tagTypes.length;
    var tagTypeIndex = 0;
    for (; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
      var domElements = _parameter_Document.getElementsByTagName(tagTypes[tagTypeIndex]);
      var elements = [].slice.call(domElements);
      var elementsLength = elements.length;
      var elementIndex = 0;
      for (; elementIndex < elementsLength; elementIndex++) {
        if (!getElement(elements[elementIndex])) {
          break;
        }
      }
    }
    _elements_Attributes_Keys.sort();
  }
  function getElement(element) {
    var result = true;
    if (isDefined(element) && element.hasAttribute(_attribute_Name_Journey)) {
      var bindingOptionsData = element.getAttribute(_attribute_Name_Journey);
      if (isDefinedString(bindingOptionsData)) {
        var bindingOptions = getObjectFromString(bindingOptionsData);
        if (bindingOptions.parsed && isDefinedObject(bindingOptions.result)) {
          bindingOptions = buildAttributeOptions(bindingOptions.result);
          bindingOptions.element = element;
          if (isDefinedNumber(bindingOptions.order) && (isDefinedString(bindingOptions.title) || isDefinedString(bindingOptions.description))) {
            _elements_Attributes_Json[bindingOptions.order] = bindingOptions;
            _elements_Attributes_Keys.push(bindingOptions.order);
            element.removeAttribute(_attribute_Name_Journey);
          }
        } else {
          if (!_configuration.safeMode) {
            console.error("The attribute '" + _attribute_Name_Journey + "' is not a valid object.");
            result = false;
          }
        }
      } else {
        if (!_configuration.safeMode) {
          console.error("The attribute '" + _attribute_Name_Journey + "' has not been set correctly.");
          result = false;
        }
      }
    }
    return result;
  }
  function buildDocumentEvents(addEvents) {
    addEvents = isDefined(addEvents) ? addEvents : true;
    var documentFunc = addEvents ? _parameter_Document.addEventListener : _parameter_Document.removeEventListener;
    if (_configuration.shortcutKeysEnabled) {
      documentFunc("keydown", onWindowKeyDown);
    }
  }
  function onWindowKeyDown(e) {
    if (_this.isOpen()) {
      if (e.keyCode === _enum_KeyCodes.escape) {
        e.preventDefault();
        onDialogClose();
      } else if (e.keyCode === _enum_KeyCodes.left) {
        e.preventDefault();
        onDialogPrevious();
      } else if (e.keyCode === _enum_KeyCodes.right) {
        e.preventDefault();
        onDialogNext();
      }
    }
  }
  function buildAttributeOptions(newOptions) {
    var options = !isDefinedObject(newOptions) ? {} : newOptions;
    options.order = getDefaultNumber(options.order, 0);
    options = buildAttributeOptionStrings(options);
    return buildAttributeOptionCustomTriggers(options);
  }
  function buildAttributeOptionStrings(options) {
    options.title = getDefaultString(options.title, null);
    options.description = getDefaultString(options.description, null);
    return options;
  }
  function buildAttributeOptionCustomTriggers(options) {
    options.onEnter = getDefaultFunction(options.onEnter, null);
    options.onLeave = getDefaultFunction(options.onLeave, null);
    options.onClose = getDefaultFunction(options.onClose, null);
    return options;
  }
  function isDefined(value) {
    return value !== null && value !== undefined && value !== _string.empty;
  }
  function isDefinedObject(object) {
    return isDefined(object) && typeof object === "object";
  }
  function isDefinedBoolean(object) {
    return isDefined(object) && typeof object === "boolean";
  }
  function isDefinedString(object) {
    return isDefined(object) && typeof object === "string";
  }
  function isDefinedFunction(object) {
    return isDefined(object) && typeof object === "function";
  }
  function isDefinedNumber(object) {
    return isDefined(object) && typeof object === "number";
  }
  function isDefinedArray(object) {
    return isDefinedObject(object) && object instanceof Array;
  }
  function createElement(type, className) {
    var result = null;
    var nodeType = type.toLowerCase();
    var isText = nodeType === "text";
    if (!_elements_Type.hasOwnProperty(nodeType)) {
      _elements_Type[nodeType] = isText ? _parameter_Document.createTextNode(_string.empty) : _parameter_Document.createElement(nodeType);
    }
    result = _elements_Type[nodeType].cloneNode(false);
    if (isDefined(className)) {
      result.className = className;
    }
    return result;
  }
  function getOffset(element) {
    var left = 0;
    var top = 0;
    for (; element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop);) {
      left = left + (element.offsetLeft - element.scrollLeft);
      top = top + (element.offsetTop - element.scrollTop);
      element = element.offsetParent;
    }
    return {left:left, top:top};
  }
  function getScrollPosition() {
    var doc = _parameter_Document.documentElement;
    var left = (_parameter_Window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (_parameter_Window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return {left:left, top:top};
  }
  function getStyleValueByName(element, stylePropertyName) {
    var value = null;
    if (_parameter_Window.getComputedStyle) {
      value = document.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
    } else if (element.currentStyle) {
      value = element.currentStyle[stylePropertyName];
    }
    return value;
  }
  function addNode(parent, node) {
    try {
      if (!parent.contains(node)) {
        parent.appendChild(node);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }
  function removeNode(parent, node) {
    try {
      if (parent.contains(node)) {
        parent.removeChild(node);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }
  function fireCustomTrigger(triggerFunction) {
    if (isDefinedFunction(triggerFunction)) {
      triggerFunction.apply(null, [].slice.call(arguments, 1));
    }
  }
  function getDefaultString(value, defaultValue) {
    return isDefinedString(value) ? value : defaultValue;
  }
  function getDefaultBoolean(value, defaultValue) {
    return isDefinedBoolean(value) ? value : defaultValue;
  }
  function getDefaultFunction(value, defaultValue) {
    return isDefinedFunction(value) ? value : defaultValue;
  }
  function getDefaultArray(value, defaultValue) {
    return isDefinedArray(value) ? value : defaultValue;
  }
  function getDefaultNumber(value, defaultValue) {
    return isDefinedNumber(value) ? value : defaultValue;
  }
  function getDefaultStringOrArray(value, defaultValue) {
    if (isDefinedString(value)) {
      value = value.split(_string.space);
      if (value.length === 0) {
        value = defaultValue;
      }
    } else {
      value = getDefaultArray(value, defaultValue);
    }
    return value;
  }
  function getObjectFromString(objectString) {
    var parsed = true;
    var result = null;
    try {
      if (isDefinedString(objectString)) {
        result = JSON.parse(objectString);
      }
    } catch (e1) {
      try {
        result = eval("(" + objectString + ")");
        if (isDefinedFunction(result)) {
          result = result();
        }
      } catch (e2) {
        if (!_configuration.safeMode) {
          console.error("Errors in object: " + e1.message + ", " + e2.message);
          parsed = false;
        }
        result = null;
      }
    }
    return {parsed:parsed, result:result};
  }
  function buildDefaultConfiguration() {
    _configuration.safeMode = getDefaultBoolean(_configuration.safeMode, true);
    _configuration.domElementTypes = getDefaultStringOrArray(_configuration.domElementTypes, ["*"]);
    _configuration.previousButtonText = getDefaultString(_configuration.previousButtonText, "Previous");
    _configuration.nextButtonText = getDefaultString(_configuration.nextButtonText, "Next");
    _configuration.finishButtonText = getDefaultString(_configuration.finishButtonText, "Finish");
    _configuration.showCloseButton = getDefaultBoolean(_configuration.showCloseButton, true);
    _configuration.shortcutKeysEnabled = getDefaultBoolean(_configuration.shortcutKeysEnabled, true);
  }
  var _this = this;
  var _parameter_Document = null;
  var _parameter_Window = null;
  var _configuration = {};
  var _enum_KeyCodes = {escape:27, left:37, right:39};
  var _string = {empty:"", space:" "};
  var _elements_Type = {};
  var _elements_Attributes_Json = {};
  var _elements_Attributes_Keys = [];
  var _elements_Attributes_Position = 0;
  var _element_Focus_Element_PositionStyle = null;
  var _element_Disabled_Background = null;
  var _element_Dialog = null;
  var _element_Dialog_Close_Button = null;
  var _element_Dialog_Title = null;
  var _element_Dialog_Description = null;
  var _element_Dialog_Previous_Button = null;
  var _element_Dialog_Next_Button = null;
  var _attribute_Name_Journey = "data-journey-options";
  this.setConfiguration = function(newOptions) {
    _configuration = !isDefinedObject(newOptions) ? {} : newOptions;
    buildDefaultConfiguration();
    if (_this.isOpen()) {
      onDialogClose();
      _elements_Attributes_Position = 0;
    }
    return this;
  };
  this.show = function() {
    if (_elements_Attributes_Position === _elements_Attributes_Keys.length - 1) {
      _elements_Attributes_Position = 0;
    }
    showDialogAndSetPosition();
  };
  this.hide = function() {
    onDialogClose();
  };
  this.isOpen = function() {
    return _element_Dialog.style.display === "block";
  };
  this.isComplete = function() {
    return _elements_Attributes_Position >= _elements_Attributes_Keys.length - 1;
  };
  this.getVersion = function() {
    return "0.3.0";
  };
  (function(documentObject, windowObject) {
    _parameter_Document = documentObject;
    _parameter_Window = windowObject;
    buildDefaultConfiguration();
    _parameter_Document.addEventListener("DOMContentLoaded", function() {
      renderDisabledBackground();
      renderDialog();
      getElements();
      buildDocumentEvents();
    });
    if (!isDefined(_parameter_Window.$journey)) {
      _parameter_Window.$journey = this;
    }
  })(document, window);
})();