/*! Journey.js v1.7.0 | (c) Bunoon 2024 | MIT License */
(function() {
  var _parameter_Document = null, _parameter_Window = null, _parameter_Math = null, _parameter_Json = null, _public = {}, _configuration = {}, _configuration_ShortcutKeysEnabled = true, _enum_KeyCodes = {escape:27, left:37, up:38, right:39, down:40}, _string = {empty:"", space:" "}, _elements_Type = {}, _groups_Default = "default", _groups_Current = _groups_Default, _groups = {}, _element_Focus_Element_PositionStyle = null, _element_Disabled_Background = null, _element_Dialog = null, _element_Dialog_Close_Button = 
  null, _element_Dialog_Title = null, _element_Dialog_Description = null, _element_Dialog_CheckBox_Container = null, _element_Dialog_CheckBox_Input = null, _element_Dialog_ProgressDots = null, _element_Dialog_ProgressBar = null, _element_Dialog_ProgressBar_Percentage = null, _element_Dialog_ProgressBar_Percentage_Text = null, _element_Dialog_Buttons = null, _element_Dialog_Buttons_Back_Button = null, _element_Dialog_Buttons_Next_Button = null, _element_Dialog_IsHint = false, _element_Dialog_Move_Original_X = 
  0, _element_Dialog_Move_Original_Y = 0, _element_Dialog_Move_IsMoving = false, _element_Dialog_Move_X = 0, _element_Dialog_Move_Y = 0, _element_ToolTip = null, _element_ToolTip_Timer = null, _attribute_Name_Options = "data-journey-js";
  function setupDefaultGroup(groups) {
    _groups = getDefaultObject(groups, {});
    _groups[_groups_Default] = {json:{}, keys:[], position:0};
  }
  function setupNewGroup(group) {
    if (!_groups.hasOwnProperty(group)) {
      _groups[group] = {json:{}, keys:[], position:0};
    }
  }
  function getGroupBindingOptions() {
    return _groups[_groups_Current].json[_groups[_groups_Current].keys[_groups[_groups_Current].position]];
  }
  function renderDisabledBackground() {
    _element_Disabled_Background = createElement("div", "journey-js-disabled-background");
    _element_Disabled_Background.onclick = function() {
      if (_configuration.closeDialogOnDisabledBackgroundClick) {
        onDialogClose();
      }
    };
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
    _element_Dialog.appendChild(_element_Dialog_Close_Button);
    _element_Dialog_Close_Button.onclick = function() {
      onDialogClose();
    };
    addToolTip(_element_Dialog_Close_Button, _configuration.closeButtonToolTipText);
    _element_Dialog_Title = createElement("div", "title");
    _element_Dialog.appendChild(_element_Dialog_Title);
    _element_Dialog_Description = createElement("div", "description");
    _element_Dialog.appendChild(_element_Dialog_Description);
    _element_Dialog_CheckBox_Container = createElement("div", "checkbox-container");
    _element_Dialog.appendChild(_element_Dialog_CheckBox_Container);
    _element_Dialog_CheckBox_Input = buildCheckBox(_element_Dialog_CheckBox_Container, _configuration.doNotShowAgainText).input;
    _element_Dialog_CheckBox_Input.onchange = function() {
      if (_configuration.showDoNotShowAgain) {
        fireCustomTrigger(_configuration.onDoNotShowAgainChange, _element_Dialog_CheckBox_Input.checked);
      }
    };
    _element_Dialog_ProgressDots = createElement("div", "progress-dots");
    _element_Dialog.appendChild(_element_Dialog_ProgressDots);
    _element_Dialog_ProgressBar = createElement("div", "progress-bar");
    _element_Dialog.appendChild(_element_Dialog_ProgressBar);
    _element_Dialog_ProgressBar_Percentage = createElement("div", "progress-bar-percentage");
    _element_Dialog_ProgressBar.appendChild(_element_Dialog_ProgressBar_Percentage);
    _element_Dialog_ProgressBar_Percentage_Text = createElement("p", "progress-bar-percentage-text");
    _element_Dialog_ProgressBar_Percentage.appendChild(_element_Dialog_ProgressBar_Percentage_Text);
    _element_Dialog_Buttons = createElement("div", "buttons");
    _element_Dialog.appendChild(_element_Dialog_Buttons);
    _element_Dialog_Buttons_Back_Button = createElement("button", "back");
    _element_Dialog_Buttons_Back_Button.onclick = onDialogBack;
    _element_Dialog_Buttons.appendChild(_element_Dialog_Buttons_Back_Button);
    _element_Dialog_Buttons_Next_Button = createElement("button", "next");
    _element_Dialog_Buttons_Next_Button.onclick = onDialogNext;
    _element_Dialog_Buttons.appendChild(_element_Dialog_Buttons_Next_Button);
    makeDialogMovable();
  }
  function onDialogClose(showConfirmationBox) {
    var confirmed = false;
    showConfirmationBox = getDefaultBoolean(showConfirmationBox, true);
    if (isDefinedString(_configuration.closeDialogConfirmationText) && showConfirmationBox) {
      confirmed = confirm(_configuration.closeDialogConfirmationText);
    } else {
      confirmed = true;
    }
    if (confirmed) {
      var bindingOptions = getGroupBindingOptions();
      if (isDefined(bindingOptions) && isDefined(bindingOptions.currentView.element)) {
        fireCustomTrigger(bindingOptions.events.onClose, bindingOptions.currentView.element);
      }
      removeFocusClassFromLastElement(false);
      hideDisabledBackground();
      hideToolTip();
      _element_Dialog.style.display = "none";
    }
  }
  function onDialogBack() {
    if (_groups[_groups_Current].position > 0) {
      removeFocusClassFromLastElement();
      _groups[_groups_Current].position--;
      showDialogAndSetPosition();
    }
  }
  function onDialogNext() {
    if (_groups[_groups_Current].position === _groups[_groups_Current].keys.length - 1) {
      var bindingOptions = getGroupBindingOptions();
      onDialogClose(false);
      fireCustomTrigger(bindingOptions.events.onFinish, bindingOptions.currentView.element);
    } else {
      removeFocusClassFromLastElement();
      _groups[_groups_Current].position++;
      showDialogAndSetPosition();
    }
  }
  function showDialogAndSetPosition() {
    var bindingOptions = getGroupBindingOptions();
    if (isDefined(bindingOptions) && isDefined(bindingOptions.currentView.element)) {
      if (bindingOptions.showDisabledBackground) {
        showDisabledBackground();
      } else {
        hideDisabledBackground();
      }
      hideToolTip();
      _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block" : "none";
      _configuration_ShortcutKeysEnabled = true;
      bindingOptions.currentView.element.className += _string.space + "journey-js-element-focus";
      if (_configuration.scrollToElements) {
        bindingOptions.currentView.element.scrollIntoView();
      }
      var lastPositionStyle = getStyleValueByName(bindingOptions.currentView.element, "position");
      if (lastPositionStyle !== _string.empty && lastPositionStyle.toLowerCase() === "static") {
        _element_Focus_Element_PositionStyle = lastPositionStyle;
        bindingOptions.currentView.element.style.position = "relative";
      }
      showElementBasedOnCondition(_element_Dialog_CheckBox_Container, _configuration.showDoNotShowAgain);
      showElementBasedOnCondition(_element_Dialog_ProgressDots, _configuration.showProgressDots && _groups[_groups_Current].keys.length > 1);
      showElementBasedOnCondition(_element_Dialog_ProgressBar, _configuration.showProgressBar && _groups[_groups_Current].keys.length > 1);
      showElementBasedOnCondition(_element_Dialog_ProgressBar_Percentage_Text, _configuration.showProgressBarText);
      showElementBasedOnCondition(_element_Dialog_Buttons, _configuration.showButtons);
      _element_Dialog_Buttons_Back_Button.innerHTML = _configuration.backButtonText;
      _element_Dialog_Buttons_Back_Button.disabled = _groups[_groups_Current].position === 0;
      if (_groups[_groups_Current].position >= _groups[_groups_Current].keys.length - 1) {
        _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.finishButtonText;
      } else {
        _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.nextButtonText;
      }
      setDialogText(bindingOptions);
      setDialogPosition(null, bindingOptions);
      buildProcessDots();
      setProgressBarPosition();
      fireCustomTrigger(bindingOptions.events.onEnter, bindingOptions.currentView.element);
      if (bindingOptions.sendClick) {
        bindingOptions.currentView.element.click();
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
    if (_element_Dialog.style.display !== "block") {
      _element_Dialog.style.display = "block";
      fireCustomTrigger(bindingOptions.events.onOpen, bindingOptions.currentView.element);
    }
    if (_groups[_groups_Current].position === 0) {
      fireCustomTrigger(bindingOptions.events.onStart, bindingOptions.currentView.element);
    }
    _element_Dialog_IsHint = bindingOptions.isHint === true;
    if (bindingOptions.attach || bindingOptions.isHint) {
      if (bindingOptions.isHint && bindingOptions.alignHintToClickPosition) {
        showElementAtMousePosition(e, _element_Dialog);
      } else {
        var offset = getOffset(bindingOptions.currentView.element), top = offset.top + bindingOptions.currentView.element.offsetHeight, left = offset.left;
        if (left + _element_Dialog.offsetWidth > _parameter_Window.innerWidth || bindingOptions.alignRight) {
          left -= _element_Dialog.offsetWidth;
          left += bindingOptions.currentView.element.offsetWidth;
        }
        if (top + _element_Dialog.offsetHeight > _parameter_Window.innerHeight || bindingOptions.alignTop) {
          top -= _element_Dialog.offsetHeight + bindingOptions.currentView.element.offsetHeight;
        }
        _element_Dialog.style.top = top + "px";
        _element_Dialog.style.left = left + "px";
      }
    } else {
      var scrollPosition = getScrollPosition(), centerLeft = _parameter_Math.max(0, (_parameter_Window.innerWidth - _element_Dialog.offsetWidth) / 2 + scrollPosition.left), centerTop = _parameter_Math.max(0, (_parameter_Window.innerHeight - _element_Dialog.offsetHeight) / 2 + scrollPosition.top);
      _element_Dialog.style.left = centerLeft + "px";
      _element_Dialog.style.top = centerTop + "px";
    }
  }
  function removeFocusClassFromLastElement(callCustomTrigger) {
    callCustomTrigger = isDefined(callCustomTrigger) ? callCustomTrigger : true;
    var bindingOptions = getGroupBindingOptions();
    if (isDefined(bindingOptions) && isDefined(bindingOptions.currentView.element)) {
      bindingOptions.currentView.element.className = bindingOptions.currentView.element.className.replace(_string.space + "journey-js-element-focus", _string.empty);
      if (isDefined(_element_Focus_Element_PositionStyle)) {
        bindingOptions.currentView.element.style.position = _element_Focus_Element_PositionStyle;
      }
      if (callCustomTrigger) {
        fireCustomTrigger(bindingOptions.events.onLeave, bindingOptions.currentView.element);
      }
    }
  }
  function buildProcessDots() {
    _element_Dialog_ProgressDots.innerHTML = _string.empty;
    if (_configuration.showProgressDots) {
      var keysLength = _groups[_groups_Current].keys.length;
      for (var keyIndex = 0; keyIndex < keysLength; keyIndex++) {
        buildProgressDot(keyIndex, _groups[_groups_Current].keys[keyIndex]);
      }
    }
  }
  function buildProgressDot(keyIndex, order) {
    var bindingOptions = _groups[_groups_Current].json[order], dot = null;
    if (keyIndex === _groups[_groups_Current].position) {
      dot = createElement("div", "dot-active");
    } else {
      dot = createElement("div", "dot");
      dot.onclick = function() {
        removeFocusClassFromLastElement();
        _groups[_groups_Current].position = keyIndex;
        showDialogAndSetPosition();
      };
    }
    _element_Dialog_ProgressDots.appendChild(dot);
    if (_configuration.showProgressDotToolTips) {
      if (isDefinedString(bindingOptions.tooltip)) {
        addToolTip(dot, bindingOptions.tooltip);
      } else {
        addToolTip(dot, bindingOptions.title);
      }
    }
    if (_configuration.showProgressDotNumbers) {
      dot.className += " dot-number";
      dot.innerHTML = (keyIndex + 1).toString();
    }
  }
  function setProgressBarPosition() {
    if (_configuration.showProgressBar) {
      var pixelsPerStage = _element_Dialog_ProgressBar.offsetWidth / _groups[_groups_Current].keys.length, width = (_groups[_groups_Current].position + 1) * pixelsPerStage, percentageComplete = _parameter_Math.ceil((_groups[_groups_Current].position + 1) / _groups[_groups_Current].keys.length * 100);
      _element_Dialog_ProgressBar_Percentage.style.width = width + "px";
      _element_Dialog_ProgressBar_Percentage_Text.innerHTML = percentageComplete + "%";
    }
  }
  function makeDialogMovable() {
    _element_Dialog_Title.onmousedown = onMoveTitleBarMouseDown;
    _element_Dialog_Title.onmouseup = onMoveTitleBarMouseUp;
    _element_Dialog_Title.oncontextmenu = onMoveTitleBarMouseUp;
    _parameter_Document.body.addEventListener("mousemove", onMoveDocumentMouseMove);
    _parameter_Document.body.addEventListener("mouseleave", onMoveDocumentMouseLeave);
  }
  function onMoveTitleBarMouseDown(e) {
    if (!_element_Dialog_Move_IsMoving && !_element_Dialog_IsHint && _configuration.dialogMovingEnabled) {
      _element_Dialog.className += " journey-js-dialog-moving";
      _element_Dialog_Move_IsMoving = true;
      _element_Dialog_Move_X = e.pageX - _element_Dialog.offsetLeft;
      _element_Dialog_Move_Y = e.pageY - _element_Dialog.offsetTop;
      _element_Dialog_Move_Original_X = _element_Dialog.offsetLeft;
      _element_Dialog_Move_Original_Y = _element_Dialog.offsetTop;
    }
  }
  function onMoveTitleBarMouseUp() {
    if (_element_Dialog_Move_IsMoving) {
      _element_Dialog_Move_IsMoving = false;
      _element_Dialog_Move_Original_X = 0;
      _element_Dialog_Move_Original_Y = 0;
      _element_Dialog.className = "journey-js-dialog";
    }
  }
  function onMoveDocumentMouseMove(e) {
    if (_element_Dialog_Move_IsMoving) {
      _element_Dialog.style.left = e.pageX - _element_Dialog_Move_X + "px";
      _element_Dialog.style.top = e.pageY - _element_Dialog_Move_Y + "px";
    }
  }
  function onMoveDocumentMouseLeave() {
    if (_element_Dialog_Move_IsMoving) {
      _element_Dialog.style.left = _element_Dialog_Move_Original_X + "px";
      _element_Dialog.style.top = _element_Dialog_Move_Original_Y + "px";
      _element_Dialog_Move_IsMoving = false;
      _element_Dialog_Move_Original_X = 0;
      _element_Dialog_Move_Original_Y = 0;
      _element_Dialog.className = "journey-js-dialog";
    }
  }
  function renderToolTip() {
    if (!isDefined(_element_ToolTip)) {
      _element_ToolTip = createElement("div", "journey-js-tooltip");
      _element_ToolTip.style.display = "none";
      _parameter_Document.body.appendChild(_element_ToolTip);
      _parameter_Document.body.addEventListener("mousemove", function() {
        hideToolTip();
      });
      _parameter_Document.addEventListener("scroll", function() {
        hideToolTip();
      });
    }
  }
  function addToolTip(element, text) {
    if (element !== null) {
      element.onmousemove = function(e) {
        showToolTip(e, text);
      };
    }
  }
  function showToolTip(e, text) {
    cancelBubble(e);
    hideToolTip();
    _element_ToolTip_Timer = setTimeout(function() {
      _element_ToolTip.innerHTML = text;
      _element_ToolTip.style.display = "block";
      showElementAtMousePosition(e, _element_ToolTip);
    }, _configuration.tooltipDelay);
  }
  function hideToolTip() {
    if (isDefined(_element_ToolTip)) {
      if (isDefined(_element_ToolTip_Timer)) {
        clearTimeout(_element_ToolTip_Timer);
        _element_ToolTip_Timer = null;
      }
      if (_element_ToolTip.style.display === "block") {
        _element_ToolTip.style.display = "none";
      }
    }
  }
  function getElements() {
    var tagTypes = _configuration.domElementTypes, tagTypesLength = tagTypes.length;
    for (var tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
      var domElements = _parameter_Document.getElementsByTagName(tagTypes[tagTypeIndex]), elements = [].slice.call(domElements), elementsLength = elements.length;
      for (var elementIndex = 0; elementIndex < elementsLength; elementIndex++) {
        if (!getElement(elements[elementIndex])) {
          break;
        }
      }
    }
    _groups[_groups_Current].keys.sort();
  }
  function getElement(element) {
    var result = true;
    if (isDefined(element) && element.hasAttribute(_attribute_Name_Options)) {
      var bindingOptionsData = element.getAttribute(_attribute_Name_Options);
      if (isDefinedString(bindingOptionsData)) {
        var bindingOptions = getObjectFromString(bindingOptionsData);
        if (bindingOptions.parsed && isDefinedObject(bindingOptions.result)) {
          setupElement(element, buildAttributeOptions(bindingOptions.result));
        } else {
          if (!_configuration.safeMode) {
            console.error(_configuration.attributeNotValidErrorText.replace("{{attribute_name}}", _attribute_Name_Options));
            result = false;
          }
        }
      } else {
        if (!_configuration.safeMode) {
          console.error(_configuration.attributeNotSetErrorText.replace("{{attribute_name}}", _attribute_Name_Options));
          result = false;
        }
      }
    }
    return result;
  }
  function setupElement(element, bindingOptions) {
    bindingOptions.currentView = {};
    bindingOptions.currentView.element = element;
    if (isDefinedNumber(bindingOptions.order) && (isDefinedString(bindingOptions.title) || isDefinedString(bindingOptions.description))) {
      element.removeAttribute(_attribute_Name_Options);
      if (!bindingOptions.isHint) {
        setupNewGroup(bindingOptions.group);
        _groups[bindingOptions.group].json[bindingOptions.order] = bindingOptions;
        _groups[bindingOptions.group].keys.push(bindingOptions.order);
        fireCustomTrigger(bindingOptions.events.onAddStep, element);
      } else {
        renderHint(bindingOptions);
      }
    }
  }
  function renderHint(bindingOptions) {
    var positionStyle = getStyleValueByName(bindingOptions.currentView.element, "position");
    if (positionStyle !== _string.empty && positionStyle.toLowerCase() === "static") {
      bindingOptions.currentView.element.style.position = "relative";
    }
    var hint = createElement("div", "journey-js-hint");
    bindingOptions.currentView.element.appendChild(hint);
    hint.onclick = function(e) {
      cancelBubble(e);
      _element_Dialog_CheckBox_Container.style.display = "none";
      _element_Dialog_ProgressDots.style.display = "none";
      _element_Dialog_ProgressBar.style.display = "none";
      _element_Dialog_Buttons.style.display = "none";
      _configuration_ShortcutKeysEnabled = false;
      setDialogText(bindingOptions);
      setDialogPosition(e, bindingOptions);
      if (bindingOptions.removeHintWhenViewed) {
        clearElementsByClassName(bindingOptions.currentView.element, "journey-js-hint");
      }
    };
  }
  function buildDocumentEvents(addEvents) {
    addEvents = isDefined(addEvents) ? addEvents : true;
    var documentFunc = addEvents ? _parameter_Document.addEventListener : _parameter_Document.removeEventListener, windowFunc = addEvents ? _parameter_Window.addEventListener : _parameter_Window.removeEventListener;
    if (_configuration.shortcutKeysEnabled) {
      documentFunc("keydown", onWindowKeyDown);
    }
    windowFunc("resize", onWindowResize);
  }
  function onWindowKeyDown(e) {
    if (_public.isOpen() && _configuration.shortcutKeysEnabled) {
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
    if (_public.isOpen()) {
      showDialogAndSetPosition();
    }
  }
  function onWindowKeyCodeUp() {
    if (_groups[_groups_Current].position !== 0) {
      removeFocusClassFromLastElement();
      _groups[_groups_Current].position = 0;
      showDialogAndSetPosition();
    }
  }
  function onWindowKeyCodeDown() {
    if (_groups[_groups_Current].position !== _groups[_groups_Current].keys.length - 1) {
      removeFocusClassFromLastElement();
      _groups[_groups_Current].position = _groups[_groups_Current].keys.length - 1;
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
    options.showDisabledBackground = getDefaultBoolean(options.showDisabledBackground, true);
    options.removeHintWhenViewed = getDefaultBoolean(options.removeHintWhenViewed, false);
    options.group = getDefaultString(options.group, _groups_Default);
    options = buildAttributeOptionStrings(options);
    return buildAttributeOptionCustomTriggers(options);
  }
  function buildAttributeOptionStrings(options) {
    options.title = getDefaultString(options.title, null);
    options.description = getDefaultString(options.description, null);
    options.tooltip = getDefaultString(options.tooltip, null);
    return options;
  }
  function buildAttributeOptionCustomTriggers(options) {
    options.events = getDefaultObject(options.events, {});
    options.events.onEnter = getDefaultFunction(options.events.onEnter, null);
    options.events.onLeave = getDefaultFunction(options.events.onLeave, null);
    options.events.onClose = getDefaultFunction(options.events.onClose, null);
    options.events.onFinish = getDefaultFunction(options.events.onFinish, null);
    options.events.onOpen = getDefaultFunction(options.events.onOpen, null);
    options.events.onStart = getDefaultFunction(options.events.onStart, null);
    options.events.onAddStep = getDefaultFunction(options.events.onAddStep, null);
    options.events.onRemoveStep = getDefaultFunction(options.events.onRemoveStep, null);
    return options;
  }
  function getBrowserUrlParameters() {
    var show = false;
    if (_configuration.browserUrlParametersEnabled) {
      var url = _parameter_Window.location.href, urlArguments = getBrowserUrlArguments(url);
      if (isDefined(urlArguments.sjOrderId)) {
        var orderId = parseInt(urlArguments.sjOrderId, 10);
        if (!isNaN(orderId) && orderId <= _groups[_groups_Current].keys.length - 1) {
          _groups[_groups_Current].position = orderId;
        }
      }
      if (isDefined(urlArguments.sjShow)) {
        show = urlArguments.sjShow === "true";
      }
    }
    return show;
  }
  function getBrowserUrlArguments(url) {
    var urlArguments = {}, urlDataParts = url.split("?");
    if (urlDataParts.length > 1) {
      var parsedArgs = urlDataParts[1].split("&"), parsedArgsLength = parsedArgs.length;
      for (var parsedArgsIndex = 0; parsedArgsIndex < parsedArgsLength; parsedArgsIndex++) {
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
    var result = null, nodeType = type.toLowerCase(), isText = nodeType === "text";
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
    var left = 0, top = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      left += element.offsetLeft - element.scrollLeft;
      top += element.offsetTop - element.scrollTop;
      element = element.offsetParent;
    }
    return {left:left, top:top};
  }
  function getScrollPosition() {
    var doc = _parameter_Document.documentElement, left = (_parameter_Window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0), top = (_parameter_Window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
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
    var left = e.pageX, top = e.pageY, scrollPosition = getScrollPosition();
    element.style.display = "block";
    if (left + element.offsetWidth > _parameter_Window.innerWidth) {
      left -= element.offsetWidth;
    } else {
      left++;
    }
    if (top + element.offsetHeight > _parameter_Window.innerHeight) {
      top -= element.offsetHeight;
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
  function buildCheckBox(container, labelText) {
    var lineContainer = createElement("div"), label = createElement("label", "checkbox"), input = createElement("input");
    container.appendChild(lineContainer);
    lineContainer.appendChild(label);
    label.appendChild(input);
    input.type = "checkbox";
    var checkMark = createElement("span", "check-mark"), text = createElement("span", "text");
    text.innerHTML = labelText;
    label.appendChild(checkMark);
    label.appendChild(text);
    return {input:input, label:label};
  }
  function clearElementsByClassName(container, className) {
    var elements = container.getElementsByClassName(className);
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
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
  function getDefaultNumber(value, defaultValue) {
    return isDefinedNumber(value) ? value : defaultValue;
  }
  function getDefaultFunction(value, defaultValue) {
    return isDefinedFunction(value) ? value : defaultValue;
  }
  function getDefaultObject(value, defaultValue) {
    return isDefinedObject(value) ? value : defaultValue;
  }
  function getDefaultArray(value, defaultValue) {
    return isDefinedArray(value) ? value : defaultValue;
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
    var parsed = true, result = null;
    try {
      if (isDefinedString(objectString)) {
        result = _parameter_Json.parse(objectString);
      }
    } catch (e1) {
      try {
        result = eval("(" + objectString + ")");
        if (isDefinedFunction(result)) {
          result = result();
        }
      } catch (e2) {
        if (!_configuration.safeMode) {
          console.error(_configuration.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e2.message));
          parsed = false;
        }
        result = null;
      }
    }
    return {parsed:parsed, result:result};
  }
  _public.start = function(group) {
    _groups_Current = getDefaultString(group, _groups_Default);
    if (_groups.hasOwnProperty(_groups_Current)) {
      _groups[_groups_Current].position = 0;
      showDialogAndSetPosition();
    }
    return _public;
  };
  _public.show = function(group) {
    _groups_Current = getDefaultString(group, _groups_Current);
    if (_groups.hasOwnProperty(_groups_Current)) {
      if (_groups[_groups_Current].position === _groups[_groups_Current].keys.length - 1) {
        _groups[_groups_Current].position = 0;
      }
      showDialogAndSetPosition();
    }
    return _public;
  };
  _public.hide = function() {
    onDialogClose();
    return _public;
  };
  _public.isOpen = function() {
    return isDefined(_element_Dialog) && _element_Dialog.style.display === "block";
  };
  _public.isComplete = function() {
    return _groups[_groups_Current].position >= _groups[_groups_Current].keys.length - 1;
  };
  _public.addDocumentSteps = function() {
    getElements();
    return _public;
  };
  _public.addStep = function(element, options) {
    if (isDefinedObject(element) && isDefinedObject(options)) {
      setupElement(element, buildAttributeOptions(options));
      _groups[_groups_Current].keys.sort();
      resetDialogPosition();
    }
    return _public;
  };
  _public.removeStep = function(element) {
    if (isDefinedObject(element)) {
      var removed = false;
      for (var group in _groups) {
        if (_groups.hasOwnProperty(group)) {
          for (var order in _groups[group].json) {
            if (_groups[group].json.hasOwnProperty(order)) {
              var bindingOptions = _groups[group].json[order];
              if (bindingOptions.currentView.element === element) {
                fireCustomTrigger(bindingOptions.events.onRemoveStep, bindingOptions.currentView.element);
                _groups[group].keys.splice(_groups[group].keys.indexOf(bindingOptions.order), 1);
                delete _groups[group].json[bindingOptions.order];
                _groups[group].keys.sort();
                removed = true;
                break;
              }
            }
          }
        }
      }
      if (!removed) {
        clearElementsByClassName(element, "journey-js-hint");
      } else {
        resetDialogPosition();
      }
    }
    return _public;
  };
  _public.clearSteps = function(group) {
    resetDialogPosition();
    for (var groupName in _groups) {
      if (_groups.hasOwnProperty(groupName)) {
        if (!isDefinedString(group) || group === groupName) {
          for (var order in _groups[groupName].json) {
            if (_groups[groupName].json.hasOwnProperty(order)) {
              var bindingOptions = _groups[groupName].json[order];
              fireCustomTrigger(bindingOptions.events.onRemoveStep, bindingOptions.currentView.element);
            }
          }
        }
      }
    }
    if (isDefinedString(group)) {
      if (_groups.hasOwnProperty(group)) {
        delete _groups[group];
      }
    } else {
      _groups = {};
    }
    if (!isDefinedString(group) || group === _groups_Default) {
      setupDefaultGroup(_groups);
    }
    return _public;
  };
  _public.clearHints = function() {
    clearElementsByClassName(_parameter_Document.body, "journey-js-hint");
    return _public;
  };
  _public.reverseStepOrder = function() {
    _groups[_groups_Current].keys.reverse();
    resetDialogPosition();
    return _public;
  };
  function resetDialogPosition() {
    if (_public.isOpen()) {
      onDialogClose(false);
      _groups[_groups_Current].position = 0;
    }
  }
  _public.setConfiguration = function(newConfiguration) {
    if (isDefinedObject(newConfiguration)) {
      var configurationHasChanged = false;
      for (var propertyName in newConfiguration) {
        if (newConfiguration.hasOwnProperty(propertyName) && _configuration.hasOwnProperty(propertyName) && _configuration[propertyName] !== newConfiguration[propertyName]) {
          _configuration[propertyName] = newConfiguration[propertyName];
          configurationHasChanged = true;
        }
      }
      if (configurationHasChanged) {
        buildDefaultConfiguration(_configuration);
      }
    }
    return _public;
  };
  function buildDefaultConfiguration(newConfiguration) {
    _configuration = getDefaultObject(newConfiguration, {});
    _configuration.safeMode = getDefaultBoolean(_configuration.safeMode, true);
    _configuration.domElementTypes = getDefaultStringOrArray(_configuration.domElementTypes, ["*"]);
    _configuration.showCloseButton = getDefaultBoolean(_configuration.showCloseButton, true);
    _configuration.shortcutKeysEnabled = getDefaultBoolean(_configuration.shortcutKeysEnabled, true);
    _configuration.showProgressDots = getDefaultBoolean(_configuration.showProgressDots, true);
    _configuration.browserUrlParametersEnabled = getDefaultBoolean(_configuration.browserUrlParametersEnabled, true);
    _configuration.showProgressDotNumbers = getDefaultBoolean(_configuration.showProgressDotNumbers, false);
    _configuration.showButtons = getDefaultBoolean(_configuration.showButtons, true);
    _configuration.showDoNotShowAgain = getDefaultBoolean(_configuration.showDoNotShowAgain, false);
    _configuration.tooltipDelay = getDefaultNumber(_configuration.tooltipDelay, 750);
    _configuration.showProgressDotToolTips = getDefaultBoolean(_configuration.showProgressDotToolTips, true);
    _configuration.closeDialogOnDisabledBackgroundClick = getDefaultBoolean(_configuration.closeDialogOnDisabledBackgroundClick, false);
    _configuration.showProgressBar = getDefaultBoolean(_configuration.showProgressBar, false);
    _configuration.scrollToElements = getDefaultBoolean(_configuration.scrollToElements, false);
    _configuration.dialogMovingEnabled = getDefaultBoolean(_configuration.dialogMovingEnabled, false);
    buildDefaultConfigurationStrings();
    buildDefaultConfigurationCustomTriggers();
  }
  function buildDefaultConfigurationStrings() {
    _configuration.backButtonText = getDefaultString(_configuration.backButtonText, "Back");
    _configuration.nextButtonText = getDefaultString(_configuration.nextButtonText, "Next");
    _configuration.finishButtonText = getDefaultString(_configuration.finishButtonText, "Finish");
    _configuration.closeButtonToolTipText = getDefaultString(_configuration.closeButtonToolTipText, "Close");
    _configuration.doNotShowAgainText = getDefaultString(_configuration.doNotShowAgainText, "Do not show again");
    _configuration.objectErrorText = getDefaultString(_configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
    _configuration.attributeNotValidErrorText = getDefaultString(_configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
    _configuration.attributeNotSetErrorText = getDefaultString(_configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
    _configuration.closeDialogConfirmationText = getDefaultString(_configuration.closeDialogConfirmationText, null);
    _configuration.showProgressBarText = getDefaultBoolean(_configuration.showProgressBarText, false);
  }
  function buildDefaultConfigurationCustomTriggers() {
    _configuration.onDoNotShowAgainChange = getDefaultFunction(_configuration.onDoNotShowAgainChange, null);
  }
  _public.getVersion = function() {
    return "1.7.0";
  };
  (function(documentObject, windowObject, mathObject, jsonObject) {
    _parameter_Document = documentObject;
    _parameter_Window = windowObject;
    _parameter_Math = mathObject;
    _parameter_Json = jsonObject;
    buildDefaultConfiguration();
    _parameter_Document.addEventListener("DOMContentLoaded", function() {
      setupDefaultGroup();
      renderDisabledBackground();
      renderDialog();
      renderToolTip();
      getElements();
      buildDocumentEvents();
      if (getBrowserUrlParameters()) {
        _public.show();
      }
    });
    if (!isDefined(_parameter_Window.$journey)) {
      _parameter_Window.$journey = _public;
    }
  })(document, window, Math, JSON);
})();