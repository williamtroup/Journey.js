/*! Journey.js v1.1.0 | (c) Bunoon 2024 | MIT License */
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
    _element_Dialog_Close_Button.title = _configuration.closeButtonToolTipText;
    _element_Dialog_Close_Button.onclick = onDialogClose;
    _element_Dialog.appendChild(_element_Dialog_Close_Button);
    _element_Dialog_Title = createElement("div", "title");
    _element_Dialog.appendChild(_element_Dialog_Title);
    _element_Dialog_Description = createElement("div", "description");
    _element_Dialog.appendChild(_element_Dialog_Description);
    _element_Dialog_CheckBox_Container = createElement("div", "checkbox-container");
    _element_Dialog.appendChild(_element_Dialog_CheckBox_Container);
    var label = createElement("label");
    var textContent = createElement("text");
    _element_Dialog_CheckBox_Input = createElement("input");
    _element_Dialog_CheckBox_Input.type = "checkbox";
    textContent.nodeValue = _configuration.doNotShowAgainText;
    label.appendChild(_element_Dialog_CheckBox_Input);
    label.appendChild(textContent);
    _element_Dialog_CheckBox_Container.appendChild(label);
    _element_Dialog_ProgressDots = createElement("div", "progress-dots");
    _element_Dialog.appendChild(_element_Dialog_ProgressDots);
    _element_Dialog_Buttons = createElement("div", "buttons");
    _element_Dialog.appendChild(_element_Dialog_Buttons);
    _element_Dialog_Back_Button = createElement("button", "back");
    _element_Dialog_Back_Button.onclick = onDialogBack;
    _element_Dialog_Buttons.appendChild(_element_Dialog_Back_Button);
    _element_Dialog_Next_Button = createElement("button", "next");
    _element_Dialog_Next_Button.onclick = onDialogNext;
    _element_Dialog_Buttons.appendChild(_element_Dialog_Next_Button);
  }
  function onDialogClose() {
    var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[_elements_Attributes_Position]];
    if (isDefined(bindingOptions) && isDefined(bindingOptions.element)) {
      fireCustomTrigger(bindingOptions.onClose, bindingOptions.element);
    }
    if (_configuration.showDoNotShowAgain) {
      fireCustomTrigger(_configuration.onDoNotShowAgainChange, _element_Dialog_CheckBox_Input.checked);
    }
    removeFocusClassFromLastElement(false);
    hideDisabledBackground();
    _element_Dialog.style.display = "none";
  }
  function onDialogBack() {
    if (_elements_Attributes_Position > 0) {
      removeFocusClassFromLastElement();
      _elements_Attributes_Position--;
      showDialogAndSetPosition();
    }
  }
  function onDialogNext() {
    if (_elements_Attributes_Position === _elements_Attributes_Keys.length - 1) {
      var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[_elements_Attributes_Position]];
      onDialogClose();
      fireCustomTrigger(bindingOptions.onFinish, bindingOptions.element);
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
      _configuration_ShortcutKeysEnabled = true;
      bindingOptions.element.className += _string.space + "journey-js-element-focus";
      var lastPositionStyle = getStyleValueByName(bindingOptions.element, "position");
      if (lastPositionStyle !== _string.empty && lastPositionStyle.toLowerCase() === "static") {
        _element_Focus_Element_PositionStyle = lastPositionStyle;
        bindingOptions.element.style.position = "relative";
      }
      showElementBasedOnCondition(_element_Dialog_CheckBox_Container, _configuration.showDoNotShowAgain);
      showElementBasedOnCondition(_element_Dialog_ProgressDots, _configuration.showProgressDots && _elements_Attributes_Keys.length > 1);
      showElementBasedOnCondition(_element_Dialog_Buttons, _configuration.showButtons);
      _element_Dialog_Back_Button.innerHTML = _configuration.backButtonText;
      _element_Dialog_Back_Button.disabled = _elements_Attributes_Position === 0;
      if (_elements_Attributes_Position >= _elements_Attributes_Keys.length - 1) {
        _element_Dialog_Next_Button.innerHTML = _configuration.finishButtonText;
      } else {
        _element_Dialog_Next_Button.innerHTML = _configuration.nextButtonText;
      }
      setDialogText(bindingOptions);
      setDialogPosition(null, bindingOptions);
      buildProcessDots();
      fireCustomTrigger(bindingOptions.onEnter, bindingOptions.element);
      if (bindingOptions.sendClick) {
        bindingOptions.element.click();
      }
    }
  }
  function setDialogText(bindingOptions) {
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
  }
  function setDialogPosition(e, bindingOptions) {
    var scrollPosition = getScrollPosition();
    if (_element_Dialog.style.display !== "block") {
      _element_Dialog.style.display = "block";
      fireCustomTrigger(bindingOptions.onOpen, bindingOptions.element);
    }
    if (bindingOptions.attach || bindingOptions.isHint) {
      if (bindingOptions.isHint && bindingOptions.alignHintToClickPosition) {
        showElementAtMousePosition(e, _element_Dialog);
      } else {
        var offset = getOffset(bindingOptions.element);
        var top = offset.top - scrollPosition.top + bindingOptions.element.offsetHeight;
        var left = offset.left - scrollPosition.left;
        if (left + _element_Dialog.offsetWidth > _parameter_Window.innerWidth || bindingOptions.alignRight) {
          left = left - _element_Dialog.offsetWidth;
          left = left + bindingOptions.element.offsetWidth;
        }
        if (top + _element_Dialog.offsetHeight > _parameter_Window.innerHeight || bindingOptions.alignTop) {
          top = top - (_element_Dialog.offsetHeight + bindingOptions.element.offsetHeight);
        }
        _element_Dialog.style.top = top + "px";
        _element_Dialog.style.left = left + "px";
      }
    } else {
      var centerLeft = Math.max(0, (_parameter_Window.innerWidth - _element_Dialog.offsetWidth) / 2 + scrollPosition.left);
      var centerTop = Math.max(0, (_parameter_Window.innerHeight - _element_Dialog.offsetHeight) / 2 + scrollPosition.top);
      _element_Dialog.style.left = centerLeft + "px";
      _element_Dialog.style.top = centerTop + "px";
    }
  }
  function removeFocusClassFromLastElement(callCustomTrigger) {
    callCustomTrigger = isDefined(callCustomTrigger) ? callCustomTrigger : true;
    var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[_elements_Attributes_Position]];
    if (isDefined(bindingOptions) && isDefined(bindingOptions.element)) {
      bindingOptions.element.className = bindingOptions.element.className.replace(_string.space + "journey-js-element-focus", _string.empty);
      if (isDefined(_element_Focus_Element_PositionStyle)) {
        bindingOptions.element.style.position = _element_Focus_Element_PositionStyle;
      }
      if (callCustomTrigger) {
        fireCustomTrigger(bindingOptions.onLeave, bindingOptions.element);
      }
    }
  }
  function buildProcessDots() {
    _element_Dialog_ProgressDots.innerHTML = _string.empty;
    if (_configuration.showProgressDots) {
      var keysLength = _elements_Attributes_Keys.length;
      var keyIndex = 0;
      for (; keyIndex < keysLength; keyIndex++) {
        buildProgressDot(keyIndex);
      }
    }
  }
  function buildProgressDot(keyIndex) {
    var bindingOptions = _elements_Attributes_Json[_elements_Attributes_Keys[keyIndex]];
    if (keyIndex === _elements_Attributes_Position) {
      var activeDot = createElement("div", "dot-active");
      activeDot.title = bindingOptions.title;
      _element_Dialog_ProgressDots.appendChild(activeDot);
      if (_configuration.showProgressDotNumbers) {
        activeDot.className += " dot-number";
        activeDot.innerHTML = (keyIndex + 1).toString();
      }
    } else {
      var dot = createElement("div", "dot");
      dot.title = bindingOptions.title;
      _element_Dialog_ProgressDots.appendChild(dot);
      if (_configuration.showProgressDotNumbers) {
        dot.className += " dot-number";
        dot.innerHTML = (keyIndex + 1).toString();
      }
      dot.onclick = function() {
        removeFocusClassFromLastElement();
        _elements_Attributes_Position = keyIndex;
        showDialogAndSetPosition();
      };
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
          setupElement(element, buildAttributeOptions(bindingOptions.result));
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
  function setupElement(element, bindingOptions) {
    bindingOptions.element = element;
    if (isDefinedNumber(bindingOptions.order) && (isDefinedString(bindingOptions.title) || isDefinedString(bindingOptions.description))) {
      if (!bindingOptions.isHint) {
        _elements_Attributes_Json[bindingOptions.order] = bindingOptions;
        _elements_Attributes_Keys.push(bindingOptions.order);
      } else {
        renderHint(bindingOptions);
      }
      element.removeAttribute(_attribute_Name_Journey);
    }
  }
  function renderHint(bindingOptions) {
    var positionStyle = getStyleValueByName(bindingOptions.element, "position");
    if (positionStyle !== _string.empty && positionStyle.toLowerCase() === "static") {
      bindingOptions.element.style.position = "relative";
    }
    var hint = createElement("div", "journey-js-hint");
    bindingOptions.element.appendChild(hint);
    hint.onclick = function(e) {
      cancelBubble(e);
      _element_Dialog_CheckBox_Container.style.display = "none";
      _element_Dialog_ProgressDots.style.display = "none";
      _element_Dialog_Buttons.style.display = "none";
      _configuration_ShortcutKeysEnabled = false;
      setDialogText(bindingOptions);
      setDialogPosition(e, bindingOptions);
    };
  }
  function buildDocumentEvents(addEvents) {
    addEvents = isDefined(addEvents) ? addEvents : true;
    var documentFunc = addEvents ? _parameter_Document.addEventListener : _parameter_Document.removeEventListener;
    var windowFunc = addEvents ? _parameter_Window.addEventListener : _parameter_Window.removeEventListener;
    if (_configuration.shortcutKeysEnabled) {
      documentFunc("keydown", onWindowKeyDown);
    }
    windowFunc("resize", onWindowResize);
  }
  function onWindowKeyDown(e) {
    if (_this.isOpen()) {
      if (e.keyCode === _enum_KeyCodes.escape) {
        e.preventDefault();
        onDialogClose();
      } else if (e.keyCode === _enum_KeyCodes.left && _configuration_ShortcutKeysEnabled) {
        e.preventDefault();
        onDialogBack();
      } else if (e.keyCode === _enum_KeyCodes.right && _configuration_ShortcutKeysEnabled) {
        e.preventDefault();
        onDialogNext();
      } else if (e.keyCode === _enum_KeyCodes.up && _configuration_ShortcutKeysEnabled) {
        e.preventDefault();
        onWindowKeyCodeUp();
      } else if (e.keyCode === _enum_KeyCodes.down && _configuration_ShortcutKeysEnabled) {
        e.preventDefault();
        onWindowKeyCodeDown();
      }
    }
  }
  function onWindowResize() {
    if (_this.isOpen()) {
      showDialogAndSetPosition();
    }
  }
  function onWindowKeyCodeUp() {
    if (_elements_Attributes_Position !== 0) {
      removeFocusClassFromLastElement();
      _elements_Attributes_Position = 0;
      showDialogAndSetPosition();
    }
  }
  function onWindowKeyCodeDown() {
    if (_elements_Attributes_Position !== _elements_Attributes_Keys.length - 1) {
      removeFocusClassFromLastElement();
      _elements_Attributes_Position = _elements_Attributes_Keys.length - 1;
      showDialogAndSetPosition();
    }
  }
  function buildAttributeOptions(newOptions) {
    var options = !isDefinedObject(newOptions) ? {} : newOptions;
    options.order = getDefaultNumber(options.order, 0);
    options.attach = getDefaultBoolean(options.attach, true);
    options.sendClick = getDefaultBoolean(options.sendClick, false);
    options.alignTop = getDefaultBoolean(options.alignTop, false);
    options.alignRight = getDefaultBoolean(options.alignRight, false);
    options.isHint = getDefaultBoolean(options.isHint, false);
    options.alignHintToClickPosition = getDefaultBoolean(options.alignHintToClickPosition, false);
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
    options.onFinish = getDefaultFunction(options.onFinish, null);
    options.onOpen = getDefaultFunction(options.onOpen, null);
    return options;
  }
  function getBrowserUrlParameters() {
    var show = false;
    if (_configuration.browserUrlParametersEnabled) {
      var url = _parameter_Window.location.href;
      var urlArguments = getBrowserUrlArguments(url);
      if (isDefined(urlArguments.sjOrderId)) {
        var orderId = parseInt(urlArguments.sjOrderId, 10);
        if (!isNaN(orderId) && orderId <= _elements_Attributes_Keys.length - 1) {
          _elements_Attributes_Position = orderId;
        }
      }
      if (isDefined(urlArguments.sjShow)) {
        show = urlArguments.sjShow === "true";
      }
    }
    return show;
  }
  function getBrowserUrlArguments(url) {
    var urlArguments = {};
    var urlDataParts = url.split("?");
    if (urlDataParts.length > 1) {
      var parsedArgs = urlDataParts[1].split("&");
      var parsedArgsLength = parsedArgs.length;
      var parsedArgsIndex = 0;
      for (; parsedArgsIndex < parsedArgsLength; parsedArgsIndex++) {
        var parsedArg = parsedArgs[parsedArgsIndex].split("=");
        urlArguments[parsedArg[0]] = parsedArg[1];
      }
    }
    return urlArguments;
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
      value = _parameter_Document.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
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
  function cancelBubble(e) {
    e.preventDefault();
    e.cancelBubble = true;
  }
  function showElementAtMousePosition(e, element) {
    var left = e.pageX;
    var top = e.pageY;
    var scrollPosition = getScrollPosition();
    element.style.display = "block";
    if (left + element.offsetWidth > _parameter_Window.innerWidth) {
      left = left - element.offsetWidth;
    } else {
      left++;
    }
    if (top + element.offsetHeight > _parameter_Window.innerHeight) {
      top = top - element.offsetHeight;
    } else {
      top++;
    }
    if (left < scrollPosition.left) {
      left = e.pageX + 1;
    }
    if (top < scrollPosition.top) {
      top = e.pageY + 1;
    }
    element.style.left = left + "px";
    element.style.top = top + "px";
  }
  function showElementBasedOnCondition(element, condition) {
    if (condition) {
      if (element.style.display !== "block") {
        element.style.display = "block";
      }
    } else {
      if (element.style.display !== "none") {
        element.style.display = "none";
      }
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
    _configuration.backButtonText = getDefaultString(_configuration.backButtonText, "Back");
    _configuration.nextButtonText = getDefaultString(_configuration.nextButtonText, "Next");
    _configuration.finishButtonText = getDefaultString(_configuration.finishButtonText, "Finish");
    _configuration.showCloseButton = getDefaultBoolean(_configuration.showCloseButton, true);
    _configuration.shortcutKeysEnabled = getDefaultBoolean(_configuration.shortcutKeysEnabled, true);
    _configuration.showProgressDots = getDefaultBoolean(_configuration.showProgressDots, true);
    _configuration.browserUrlParametersEnabled = getDefaultBoolean(_configuration.browserUrlParametersEnabled, true);
    _configuration.showProgressDotNumbers = getDefaultBoolean(_configuration.showProgressDotNumbers, false);
    _configuration.showButtons = getDefaultBoolean(_configuration.showButtons, true);
    _configuration.closeButtonToolTipText = getDefaultString(_configuration.closeButtonToolTipText, "Close");
    _configuration.doNotShowAgainText = getDefaultString(_configuration.doNotShowAgainText, "Do not show again");
    _configuration.showDoNotShowAgain = getDefaultBoolean(_configuration.showDoNotShowAgain, false);
    buildDefaultConfigurationCustomTriggers();
  }
  function buildDefaultConfigurationCustomTriggers() {
    _configuration.onDoNotShowAgainChange = getDefaultFunction(_configuration.onDoNotShowAgainChange, null);
  }
  var _this = this;
  var _parameter_Document = null;
  var _parameter_Window = null;
  var _configuration = {};
  var _configuration_ShortcutKeysEnabled = true;
  var _enum_KeyCodes = {escape:27, left:37, up:38, right:39, down:40};
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
  var _element_Dialog_CheckBox_Container = null;
  var _element_Dialog_CheckBox_Input = null;
  var _element_Dialog_ProgressDots = null;
  var _element_Dialog_Buttons = null;
  var _element_Dialog_Back_Button = null;
  var _element_Dialog_Next_Button = null;
  var _attribute_Name_Journey = "data-journey-options";
  this.start = function() {
    _elements_Attributes_Position = 0;
    showDialogAndSetPosition();
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
    return isDefined(_element_Dialog) && _element_Dialog.style.display === "block";
  };
  this.isComplete = function() {
    return _elements_Attributes_Position >= _elements_Attributes_Keys.length - 1;
  };
  this.addStep = function(element, options) {
    setupElement(element, buildAttributeOptions(options));
    _elements_Attributes_Keys.sort();
    if (_this.isOpen()) {
      onDialogClose();
      _elements_Attributes_Position = 0;
    }
    return this;
  };
  this.setConfiguration = function(newOptions) {
    _configuration = !isDefinedObject(newOptions) ? {} : newOptions;
    buildDefaultConfiguration();
    if (_this.isOpen()) {
      onDialogClose();
      _elements_Attributes_Position = 0;
    }
    return this;
  };
  this.getVersion = function() {
    return "1.1.0";
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
      if (getBrowserUrlParameters()) {
        _this.show();
      }
    });
    if (!isDefined(_parameter_Window.$journey)) {
      _parameter_Window.$journey = this;
    }
  })(document, window);
})();