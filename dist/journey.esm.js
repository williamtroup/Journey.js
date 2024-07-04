var __getOwnPropNames = Object.getOwnPropertyNames;

var __esm = (e, t) => function n() {
    return e && (t = (0, e[__getOwnPropNames(e)[0]])(e = 0)), t;
};

var __commonJS = (e, t) => function n() {
    return t || (0, e[__getOwnPropNames(e)[0]])((t = {
        exports: {}
    }).exports, t), t.exports;
};

var init_enum = __esm({
    "src/ts/enum.ts"() {}
});

var Constants;

var init_constant = __esm({
    "src/ts/constant.ts"() {
        (e => {
            e.JOURNEY_JS_ATTRIBUTE_NAME = "data-journey-js";
        })(Constants || (Constants = {}));
    }
});

var require_journey = __commonJS({
    "src/journey.ts"(exports, module) {
        init_enum();
        init_constant();
        () => {
            let _configuration = {};
            let _configuration_ShortcutKeysEnabled = true;
            const _groups_Default = "default";
            let _groups_Current = _groups_Default;
            let _groups = {};
            let _element_Focus_Element_PositionStyle = null;
            let _element_Disabled_Background = null;
            let _element_Dialog = null;
            let _element_Dialog_Close_Button = null;
            let _element_Dialog_Title = null;
            let _element_Dialog_Description = null;
            let _element_Dialog_CheckBox_Container = null;
            let _element_Dialog_CheckBox_Input = null;
            let _element_Dialog_ProgressDots = null;
            let _element_Dialog_ProgressBar = null;
            let _element_Dialog_ProgressBar_Percentage = null;
            let _element_Dialog_ProgressBar_Percentage_Text = null;
            let _element_Dialog_Buttons = null;
            let _element_Dialog_Buttons_Back_Button = null;
            let _element_Dialog_Buttons_Next_Button = null;
            let _element_Dialog_IsHint = false;
            let _element_Dialog_Move_Original_X = 0;
            let _element_Dialog_Move_Original_Y = 0;
            let _element_Dialog_Move_IsMoving = false;
            let _element_Dialog_Move_X = 0;
            let _element_Dialog_Move_Y = 0;
            let _element_ToolTip = null;
            let _element_ToolTip_Timer = 0;
            function setupDefaultGroup(e) {
                _groups = getDefaultObject(e, {});
                _groups[_groups_Default] = {
                    json: {},
                    keys: [],
                    position: 0
                };
            }
            function setupNewGroup(e) {
                if (!_groups.hasOwnProperty(e)) {
                    _groups[e] = {
                        json: {},
                        keys: [],
                        position: 0
                    };
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
                addNode(document.body, _element_Disabled_Background);
            }
            function hideDisabledBackground() {
                removeNode(document.body, _element_Disabled_Background);
            }
            function renderDialog() {
                _element_Dialog = createElement("div", "journey-js-dialog");
                _element_Dialog.style.display = "none";
                document.body.appendChild(_element_Dialog);
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
                        fireCustomTriggerEvent(_configuration.onDoNotShowAgainChange, _element_Dialog_CheckBox_Input.checked);
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
            function onDialogClose(e = true) {
                let t = false;
                if (isDefinedString(_configuration.closeDialogConfirmationText) && e) {
                    t = confirm(_configuration.closeDialogConfirmationText);
                } else {
                    t = true;
                }
                if (t) {
                    const e = getGroupBindingOptions();
                    if (isDefined(e) && isDefined(e._currentView.element)) {
                        fireCustomTriggerEvent(e.events.onClose, e._currentView.element);
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
                    const e = getGroupBindingOptions();
                    onDialogClose(false);
                    fireCustomTriggerEvent(e.events.onFinish, e._currentView.element);
                } else {
                    removeFocusClassFromLastElement();
                    _groups[_groups_Current].position++;
                    showDialogAndSetPosition();
                }
            }
            function showDialogAndSetPosition() {
                const e = getGroupBindingOptions();
                if (isDefined(e) && isDefined(e._currentView.element)) {
                    if (e.showDisabledBackground) {
                        showDisabledBackground();
                    } else {
                        hideDisabledBackground();
                    }
                    hideToolTip();
                    _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block" : "none";
                    _configuration_ShortcutKeysEnabled = true;
                    e._currentView.element.className += " " + "journey-js-element-focus";
                    if (_configuration.scrollToElements) {
                        e._currentView.element.scrollIntoView();
                    }
                    const t = getStyleValueByName(e._currentView.element, "position");
                    if (t !== "" && t.toLowerCase() === "static") {
                        _element_Focus_Element_PositionStyle = t;
                        e._currentView.element.style.position = "relative";
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
                    setDialogText(e);
                    setDialogPosition(null, e);
                    buildProcessDots();
                    setProgressBarPosition();
                    fireCustomTriggerEvent(e.events.onEnter, e._currentView.element);
                    if (e.sendClick) {
                        e._currentView.element.click();
                    }
                }
            }
            function setDialogText(e) {
                if (isDefinedString(e.title)) {
                    _element_Dialog_Title.innerHTML = e.title;
                } else {
                    _element_Dialog_Title.innerHTML = "";
                }
                if (isDefinedString(e.description)) {
                    _element_Dialog_Description.innerHTML = e.description;
                } else {
                    _element_Dialog_Description.innerHTML = "";
                }
            }
            function setDialogPosition(e, t) {
                if (_element_Dialog.style.display !== "block") {
                    _element_Dialog.style.display = "block";
                    fireCustomTriggerEvent(t.events.onOpen, t._currentView.element);
                }
                if (_groups[_groups_Current].position === 0) {
                    fireCustomTriggerEvent(t.events.onStart, t._currentView.element);
                }
                _element_Dialog_IsHint = t.isHint === true;
                if (t.attach || t.isHint) {
                    if (t.isHint && t.alignHintToClickPosition) {
                        showElementAtMousePosition(e, _element_Dialog);
                    } else {
                        const e = getOffset(t._currentView.element);
                        let n = e.top + t._currentView.element.offsetHeight;
                        let o = e.left;
                        if (o + _element_Dialog.offsetWidth > window.innerWidth || t.alignRight) {
                            o -= _element_Dialog.offsetWidth;
                            o += t._currentView.element.offsetWidth;
                        }
                        if (n + _element_Dialog.offsetHeight > window.innerHeight || t.alignTop) {
                            n -= _element_Dialog.offsetHeight + t._currentView.element.offsetHeight;
                        }
                        _element_Dialog.style.top = n + "px";
                        _element_Dialog.style.left = o + "px";
                    }
                } else {
                    const e = getScrollPosition();
                    const t = Math.max(0, (window.innerWidth - _element_Dialog.offsetWidth) / 2 + e.left);
                    const n = Math.max(0, (window.innerHeight - _element_Dialog.offsetHeight) / 2 + e.top);
                    _element_Dialog.style.left = t + "px";
                    _element_Dialog.style.top = n + "px";
                }
            }
            function removeFocusClassFromLastElement(e = true) {
                const t = getGroupBindingOptions();
                if (isDefined(t) && isDefined(t._currentView.element)) {
                    t._currentView.element.className = t._currentView.element.className.replace(" " + "journey-js-element-focus", "");
                    if (isDefined(_element_Focus_Element_PositionStyle)) {
                        t._currentView.element.style.position = _element_Focus_Element_PositionStyle;
                    }
                    if (e) {
                        fireCustomTriggerEvent(t.events.onLeave, t._currentView.element);
                    }
                }
            }
            function buildProcessDots() {
                _element_Dialog_ProgressDots.innerHTML = "";
                if (_configuration.showProgressDots) {
                    const e = _groups[_groups_Current].keys.length;
                    for (let t = 0; t < e; t++) {
                        buildProgressDot(t, _groups[_groups_Current].keys[t]);
                    }
                }
            }
            function buildProgressDot(e, t) {
                const n = _groups[_groups_Current].json[t];
                let o = null;
                if (e === _groups[_groups_Current].position) {
                    o = createElement("div", "dot-active");
                } else {
                    o = createElement("div", "dot");
                    o.onclick = function() {
                        removeFocusClassFromLastElement();
                        _groups[_groups_Current].position = e;
                        showDialogAndSetPosition();
                    };
                }
                _element_Dialog_ProgressDots.appendChild(o);
                if (_configuration.showProgressDotToolTips) {
                    if (isDefinedString(n.tooltip)) {
                        addToolTip(o, n.tooltip);
                    } else {
                        addToolTip(o, n.title);
                    }
                }
                if (_configuration.showProgressDotNumbers) {
                    o.className += " dot-number";
                    o.innerHTML = (e + 1).toString();
                }
            }
            function setProgressBarPosition() {
                if (_configuration.showProgressBar) {
                    const e = _element_Dialog_ProgressBar.offsetWidth / _groups[_groups_Current].keys.length;
                    const t = (_groups[_groups_Current].position + 1) * e;
                    const n = Math.ceil((_groups[_groups_Current].position + 1) / _groups[_groups_Current].keys.length * 100);
                    _element_Dialog_ProgressBar_Percentage.style.width = t + "px";
                    _element_Dialog_ProgressBar_Percentage_Text.innerHTML = n + "%";
                }
            }
            function makeDialogMovable() {
                _element_Dialog_Title.onmousedown = onMoveTitleBarMouseDown;
                _element_Dialog_Title.onmouseup = onMoveTitleBarMouseUp;
                _element_Dialog_Title.oncontextmenu = onMoveTitleBarMouseUp;
                document.body.addEventListener("mousemove", onMoveDocumentMouseMove);
                document.body.addEventListener("mouseleave", onMoveDocumentMouseLeave);
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
                    document.body.appendChild(_element_ToolTip);
                    document.body.addEventListener("mousemove", (function() {
                        hideToolTip();
                    }));
                    document.addEventListener("scroll", (function() {
                        hideToolTip();
                    }));
                }
            }
            function addToolTip(e, t) {
                if (e !== null) {
                    e.onmousemove = function(e) {
                        showToolTip(e, t);
                    };
                }
            }
            function showToolTip(e, t) {
                cancelBubble(e);
                hideToolTip();
                _element_ToolTip_Timer = setTimeout((function() {
                    _element_ToolTip.innerHTML = t;
                    _element_ToolTip.style.display = "block";
                    showElementAtMousePosition(e, _element_ToolTip);
                }), _configuration.tooltipDelay);
            }
            function hideToolTip() {
                if (isDefined(_element_ToolTip)) {
                    if (_element_ToolTip_Timer !== 0) {
                        clearTimeout(_element_ToolTip_Timer);
                        _element_ToolTip_Timer = 0;
                    }
                    if (_element_ToolTip.style.display === "block") {
                        _element_ToolTip.style.display = "none";
                    }
                }
            }
            function getElements() {
                const e = _configuration.domElementTypes;
                const t = e.length;
                for (let n = 0; n < t; n++) {
                    const t = document.getElementsByTagName(e[n]);
                    const o = [].slice.call(t);
                    const i = o.length;
                    for (let e = 0; e < i; e++) {
                        if (!getElement(o[e])) {
                            break;
                        }
                    }
                }
                _groups[_groups_Current].keys.sort();
            }
            function getElement(e) {
                let t = true;
                if (isDefined(e) && e.hasAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME)) {
                    const n = e.getAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME);
                    if (isDefinedString(n)) {
                        const o = getObjectFromString(n);
                        if (o.parsed && isDefinedObject(o.object)) {
                            setupElement(e, buildAttributeOptions(o.object));
                        } else {
                            if (!_configuration.safeMode) {
                                console.error(_configuration.attributeNotValidErrorText.replace("{{attribute_name}}", Constants.JOURNEY_JS_ATTRIBUTE_NAME));
                                t = false;
                            }
                        }
                    } else {
                        if (!_configuration.safeMode) {
                            console.error(_configuration.attributeNotSetErrorText.replace("{{attribute_name}}", Constants.JOURNEY_JS_ATTRIBUTE_NAME));
                            t = false;
                        }
                    }
                }
                return t;
            }
            function setupElement(e, t) {
                t._currentView = {};
                t._currentView.element = e;
                if (isDefinedNumber(t.order) && (isDefinedString(t.title) || isDefinedString(t.description))) {
                    e.removeAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME);
                    if (!t.isHint) {
                        setupNewGroup(t.group);
                        _groups[t.group].json[t.order] = t;
                        _groups[t.group].keys.push(t.order);
                        fireCustomTriggerEvent(t.events.onAddStep, e);
                    } else {
                        renderHint(t);
                    }
                }
            }
            function renderHint(e) {
                const t = getStyleValueByName(e._currentView.element, "position");
                if (t !== "" && t.toLowerCase() === "static") {
                    e._currentView.element.style.position = "relative";
                }
                const n = createElement("div", "journey-js-hint");
                e._currentView.element.appendChild(n);
                n.onclick = function(t) {
                    cancelBubble(t);
                    _element_Dialog_CheckBox_Container.style.display = "none";
                    _element_Dialog_ProgressDots.style.display = "none";
                    _element_Dialog_ProgressBar.style.display = "none";
                    _element_Dialog_Buttons.style.display = "none";
                    _configuration_ShortcutKeysEnabled = false;
                    setDialogText(e);
                    setDialogPosition(t, e);
                    if (e.removeHintWhenViewed) {
                        clearElementsByClassName(e._currentView.element, "journey-js-hint");
                    }
                };
            }
            function buildDocumentEvents(e = true) {
                const t = e ? document.addEventListener : document.removeEventListener;
                const n = e ? window.addEventListener : window.removeEventListener;
                if (_configuration.shortcutKeysEnabled) {
                    t("keydown", onWindowKeyDown);
                }
                n("resize", onWindowResize);
            }
            function onWindowKeyDown(e) {
                if (_public.isOpen() && _configuration.shortcutKeysEnabled) {
                    if (e.keyCode === 27) {
                        e.preventDefault();
                        onDialogClose();
                    } else {
                        if (_configuration_ShortcutKeysEnabled) {
                            if (e.keyCode === 37) {
                                e.preventDefault();
                                onDialogBack();
                            } else if (e.keyCode === 39) {
                                e.preventDefault();
                                onDialogNext();
                            } else if (e.keyCode === 38) {
                                e.preventDefault();
                                onWindowKeyCodeUp();
                            } else if (e.keyCode === 40) {
                                e.preventDefault();
                                onWindowKeyCodeDown();
                            }
                        }
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
            function buildAttributeOptions(e) {
                let t = !isDefinedObject(e) ? {} : e;
                t.order = getDefaultNumber(t.order, 0);
                t.attach = getDefaultBoolean(t.attach, true);
                t.sendClick = getDefaultBoolean(t.sendClick, false);
                t.alignTop = getDefaultBoolean(t.alignTop, false);
                t.alignRight = getDefaultBoolean(t.alignRight, false);
                t.isHint = getDefaultBoolean(t.isHint, false);
                t.alignHintToClickPosition = getDefaultBoolean(t.alignHintToClickPosition, false);
                t.showDisabledBackground = getDefaultBoolean(t.showDisabledBackground, true);
                t.removeHintWhenViewed = getDefaultBoolean(t.removeHintWhenViewed, false);
                t.group = getDefaultString(t.group, _groups_Default);
                t = buildAttributeOptionStrings(t);
                return buildAttributeOptionCustomTriggers(t);
            }
            function buildAttributeOptionStrings(e) {
                e.title = getDefaultString(e.title, null);
                e.description = getDefaultString(e.description, null);
                e.tooltip = getDefaultString(e.tooltip, null);
                return e;
            }
            function buildAttributeOptionCustomTriggers(e) {
                e.events = getDefaultObject(e.events, {});
                e.events.onEnter = getDefaultFunction(e.events.onEnter, null);
                e.events.onLeave = getDefaultFunction(e.events.onLeave, null);
                e.events.onClose = getDefaultFunction(e.events.onClose, null);
                e.events.onFinish = getDefaultFunction(e.events.onFinish, null);
                e.events.onOpen = getDefaultFunction(e.events.onOpen, null);
                e.events.onStart = getDefaultFunction(e.events.onStart, null);
                e.events.onAddStep = getDefaultFunction(e.events.onAddStep, null);
                e.events.onRemoveStep = getDefaultFunction(e.events.onRemoveStep, null);
                return e;
            }
            function createElement(e, t = "") {
                const n = e.toLowerCase();
                const o = n === "text";
                let i = o ? document.createTextNode("") : document.createElement(n);
                if (isDefined(t)) {
                    i.className = t;
                }
                return i;
            }
            function getOffset(e) {
                let t = 0;
                let n = 0;
                while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
                    t += e.offsetLeft - e.scrollLeft;
                    n += e.offsetTop - e.scrollTop;
                    e = e.offsetParent;
                }
                return {
                    left: t,
                    top: n
                };
            }
            function getScrollPosition() {
                const e = document.documentElement;
                const t = (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
                const n = (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
                return {
                    left: t,
                    top: n
                };
            }
            function getStyleValueByName(e, t) {
                let n = null;
                if (document.defaultView.getComputedStyle) {
                    n = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
                } else if (e.currentStyle) {
                    n = e.currentStyle[t];
                }
                return n;
            }
            function addNode(e, t) {
                try {
                    if (!e.contains(t)) {
                        e.appendChild(t);
                    }
                } catch (e) {
                    console.warn(e.message);
                }
            }
            function removeNode(e, t) {
                try {
                    if (e.contains(t)) {
                        e.removeChild(t);
                    }
                } catch (e) {
                    console.warn(e.message);
                }
            }
            function cancelBubble(e) {
                e.preventDefault();
                e.cancelBubble = true;
            }
            function showElementAtMousePosition(e, t) {
                let n = e.pageX;
                let o = e.pageY;
                const i = getScrollPosition();
                t.style.display = "block";
                if (n + t.offsetWidth > window.innerWidth) {
                    n -= t.offsetWidth;
                } else {
                    n++;
                }
                if (o + t.offsetHeight > window.innerHeight) {
                    o -= t.offsetHeight;
                } else {
                    o++;
                }
                if (n < i.left) {
                    n = e.pageX + 1;
                }
                if (o < i.top) {
                    o = e.pageY + 1;
                }
                t.style.left = n + "px";
                t.style.top = o + "px";
            }
            function showElementBasedOnCondition(e, t) {
                if (t) {
                    if (e.style.display !== "block") {
                        e.style.display = "block";
                    }
                } else {
                    if (e.style.display !== "none") {
                        e.style.display = "none";
                    }
                }
            }
            function buildCheckBox(e, t) {
                const n = createElement("div");
                const o = createElement("label", "checkbox");
                const i = createElement("input");
                e.appendChild(n);
                n.appendChild(o);
                o.appendChild(i);
                i.type = "checkbox";
                const l = createElement("span", "check-mark");
                const r = createElement("span", "text");
                r.innerHTML = t;
                o.appendChild(l);
                o.appendChild(r);
                return {
                    input: i,
                    label: o
                };
            }
            function clearElementsByClassName(e, t) {
                let n = e.getElementsByClassName(t);
                while (n[0]) {
                    n[0].parentNode.removeChild(n[0]);
                }
            }
            function fireCustomTriggerEvent(e, ...t) {
                if (isDefinedFunction(e)) {
                    e.apply(null, [].slice.call(t, 0));
                }
            }
            function getBrowserUrlParameters() {
                let e = false;
                if (_configuration.browserUrlParametersEnabled) {
                    const t = window.location.href;
                    const n = getBrowserUrlArguments(t);
                    if (isDefined(n.sjOrderId)) {
                        const e = parseInt(n.sjOrderId, 10);
                        if (!isNaN(e) && e <= _groups[_groups_Current].keys.length - 1) {
                            _groups[_groups_Current].position = e;
                        }
                    }
                    if (isDefined(n.sjShow)) {
                        e = n.sjShow === "true";
                    }
                }
                return e;
            }
            function getBrowserUrlArguments(e) {
                const t = {};
                const n = e.split("?");
                if (n.length > 1) {
                    const e = n[1].split("&");
                    const o = e.length;
                    for (let n = 0; n < o; n++) {
                        const o = e[n].split("=");
                        t[o[0]] = o[1];
                    }
                }
                return t;
            }
            function isDefined(e) {
                return e !== null && e !== void 0 && e !== "";
            }
            function isDefinedObject(e) {
                return isDefined(e) && typeof e === "object";
            }
            function isDefinedBoolean(e) {
                return isDefined(e) && typeof e === "boolean";
            }
            function isDefinedString(e) {
                return isDefined(e) && typeof e === "string";
            }
            function isDefinedFunction(e) {
                return isDefined(e) && typeof e === "function";
            }
            function isDefinedNumber(e) {
                return isDefined(e) && typeof e === "number";
            }
            function isDefinedArray(e) {
                return isDefinedObject(e) && e instanceof Array;
            }
            function getDefaultAnyString(e, t) {
                return typeof e === "string" ? e : t;
            }
            function getDefaultString(e, t) {
                return isDefinedString(e) ? e : t;
            }
            function getDefaultBoolean(e, t) {
                return isDefinedBoolean(e) ? e : t;
            }
            function getDefaultNumber(e, t) {
                return isDefinedNumber(e) ? e : t;
            }
            function getDefaultFunction(e, t) {
                return isDefinedFunction(e) ? e : t;
            }
            function getDefaultObject(e, t) {
                return isDefinedObject(e) ? e : t;
            }
            function getDefaultArray(e, t) {
                return isDefinedArray(e) ? e : t;
            }
            function getDefaultStringOrArray(e, t) {
                let n = t;
                if (isDefinedString(e)) {
                    const o = e.toString().split(" ");
                    if (o.length === 0) {
                        e = t;
                    } else {
                        n = o;
                    }
                } else {
                    n = getDefaultArray(e, t);
                }
                return n;
            }
            function getObjectFromString(objectString) {
                const result = {
                    parsed: true,
                    object: null
                };
                try {
                    if (isDefinedString(objectString)) {
                        result.object = JSON.parse(objectString);
                    }
                } catch (e1) {
                    try {
                        result.object = eval("(" + objectString + ")");
                        if (isDefinedFunction(result.object)) {
                            result.object = result.object();
                        }
                    } catch (e) {
                        if (!_configuration.safeMode) {
                            console.error(_configuration.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
                            result.parsed = false;
                        }
                        result.object = null;
                    }
                }
                return result;
            }
            const _public = {
                start: function(e) {
                    throw new Error("Function not implemented.");
                },
                show: function(e) {
                    throw new Error("Function not implemented.");
                },
                hide: function() {
                    throw new Error("Function not implemented.");
                },
                isOpen: function() {
                    throw new Error("Function not implemented.");
                },
                isComplete: function() {
                    throw new Error("Function not implemented.");
                },
                addDocumentSteps: function() {
                    throw new Error("Function not implemented.");
                },
                addStep: function(e, t) {
                    throw new Error("Function not implemented.");
                },
                removeStep: function(e) {
                    throw new Error("Function not implemented.");
                },
                clearSteps: function(e) {
                    throw new Error("Function not implemented.");
                },
                clearHints: function() {
                    throw new Error("Function not implemented.");
                },
                reverseStepOrder: function() {
                    throw new Error("Function not implemented.");
                },
                setConfiguration: function(e) {
                    throw new Error("Function not implemented.");
                },
                getVersion: function() {
                    throw new Error("Function not implemented.");
                }
            };
            (() => {})();
        };
    }
});

export default require_journey();//# sourceMappingURL=journey.esm.js.map