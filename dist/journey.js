var Constants;

(e => {
    e.JOURNEY_JS_ATTRIBUTE_NAME = "data-journey-js";
})(Constants || (Constants = {}));

(() => {
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
    function setupDefaultGroup(e = null) {
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
                let o = e.top + t._currentView.element.offsetHeight;
                let n = e.left;
                if (n + _element_Dialog.offsetWidth > window.innerWidth || t.alignRight) {
                    n -= _element_Dialog.offsetWidth;
                    n += t._currentView.element.offsetWidth;
                }
                if (o + _element_Dialog.offsetHeight > window.innerHeight || t.alignTop) {
                    o -= _element_Dialog.offsetHeight + t._currentView.element.offsetHeight;
                }
                _element_Dialog.style.top = o + "px";
                _element_Dialog.style.left = n + "px";
            }
        } else {
            const e = getScrollPosition();
            const t = Math.max(0, (window.innerWidth - _element_Dialog.offsetWidth) / 2 + e.left);
            const o = Math.max(0, (window.innerHeight - _element_Dialog.offsetHeight) / 2 + e.top);
            _element_Dialog.style.left = t + "px";
            _element_Dialog.style.top = o + "px";
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
        const o = _groups[_groups_Current].json[t];
        let n = null;
        if (e === _groups[_groups_Current].position) {
            n = createElement("div", "dot-active");
        } else {
            n = createElement("div", "dot");
            n.onclick = function() {
                removeFocusClassFromLastElement();
                _groups[_groups_Current].position = e;
                showDialogAndSetPosition();
            };
        }
        _element_Dialog_ProgressDots.appendChild(n);
        if (_configuration.showProgressDotToolTips) {
            if (isDefinedString(o.tooltip)) {
                addToolTip(n, o.tooltip);
            } else {
                addToolTip(n, o.title);
            }
        }
        if (_configuration.showProgressDotNumbers) {
            n.className += " dot-number";
            n.innerHTML = (e + 1).toString();
        }
    }
    function setProgressBarPosition() {
        if (_configuration.showProgressBar) {
            const e = _element_Dialog_ProgressBar.offsetWidth / _groups[_groups_Current].keys.length;
            const t = (_groups[_groups_Current].position + 1) * e;
            const o = Math.ceil((_groups[_groups_Current].position + 1) / _groups[_groups_Current].keys.length * 100);
            _element_Dialog_ProgressBar_Percentage.style.width = t + "px";
            _element_Dialog_ProgressBar_Percentage_Text.innerHTML = o + "%";
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
        for (let o = 0; o < t; o++) {
            const t = document.getElementsByTagName(e[o]);
            const n = [].slice.call(t);
            const i = n.length;
            for (let e = 0; e < i; e++) {
                if (!getElement(n[e])) {
                    break;
                }
            }
        }
        _groups[_groups_Current].keys.sort();
    }
    function getElement(e) {
        let t = true;
        if (isDefined(e) && e.hasAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME)) {
            const o = e.getAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME);
            if (isDefinedString(o)) {
                const n = getObjectFromString(o);
                if (n.parsed && isDefinedObject(n.object)) {
                    setupElement(e, buildAttributeOptions(n.object));
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
        const o = createElement("div", "journey-js-hint");
        e._currentView.element.appendChild(o);
        o.onclick = function(t) {
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
        const o = e ? window.addEventListener : window.removeEventListener;
        if (_configuration.shortcutKeysEnabled) {
            t("keydown", onWindowKeyDown);
        }
        o("resize", onWindowResize);
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
        const o = e.toLowerCase();
        const n = o === "text";
        let i = n ? document.createTextNode("") : document.createElement(o);
        if (isDefined(t)) {
            i.className = t;
        }
        return i;
    }
    function getOffset(e) {
        let t = 0;
        let o = 0;
        while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
            t += e.offsetLeft - e.scrollLeft;
            o += e.offsetTop - e.scrollTop;
            e = e.offsetParent;
        }
        return {
            left: t,
            top: o
        };
    }
    function getScrollPosition() {
        const e = document.documentElement;
        const t = (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
        const o = (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
        return {
            left: t,
            top: o
        };
    }
    function getStyleValueByName(e, t) {
        let o = null;
        if (document.defaultView.getComputedStyle) {
            o = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
        } else if (e.currentStyle) {
            o = e.currentStyle[t];
        }
        return o;
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
        let o = e.pageX;
        let n = e.pageY;
        const i = getScrollPosition();
        t.style.display = "block";
        if (o + t.offsetWidth > window.innerWidth) {
            o -= t.offsetWidth;
        } else {
            o++;
        }
        if (n + t.offsetHeight > window.innerHeight) {
            n -= t.offsetHeight;
        } else {
            n++;
        }
        if (o < i.left) {
            o = e.pageX + 1;
        }
        if (n < i.top) {
            n = e.pageY + 1;
        }
        t.style.left = o + "px";
        t.style.top = n + "px";
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
        const o = createElement("div");
        const n = createElement("label", "checkbox");
        const i = createElement("input");
        e.appendChild(o);
        o.appendChild(n);
        n.appendChild(i);
        i.type = "checkbox";
        const l = createElement("span", "check-mark");
        const r = createElement("span", "text");
        r.innerHTML = t;
        n.appendChild(l);
        n.appendChild(r);
        return {
            input: i,
            label: n
        };
    }
    function clearElementsByClassName(e, t) {
        let o = e.getElementsByClassName(t);
        while (o[0]) {
            o[0].parentNode.removeChild(o[0]);
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
            const o = getBrowserUrlArguments(t);
            if (isDefined(o.sjOrderId)) {
                const e = parseInt(o.sjOrderId, 10);
                if (!isNaN(e) && e <= _groups[_groups_Current].keys.length - 1) {
                    _groups[_groups_Current].position = e;
                }
            }
            if (isDefined(o.sjShow)) {
                e = o.sjShow === "true";
            }
        }
        return e;
    }
    function getBrowserUrlArguments(e) {
        const t = {};
        const o = e.split("?");
        if (o.length > 1) {
            const e = o[1].split("&");
            const n = e.length;
            for (let o = 0; o < n; o++) {
                const n = e[o].split("=");
                t[n[0]] = n[1];
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
        let o = t;
        if (isDefinedString(e)) {
            const n = e.toString().split(" ");
            if (n.length === 0) {
                e = t;
            } else {
                o = n;
            }
        } else {
            o = getDefaultArray(e, t);
        }
        return o;
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
    function resetDialogPosition() {
        if (_public.isOpen()) {
            onDialogClose(false);
            _groups[_groups_Current].position = 0;
        }
    }
    function buildDefaultConfiguration(e = null) {
        _configuration = getDefaultObject(e, {});
        _configuration.safeMode = getDefaultBoolean(_configuration.safeMode, true);
        _configuration.domElementTypes = getDefaultStringOrArray(_configuration.domElementTypes, [ "*" ]);
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
        _configuration.showProgressBarText = getDefaultBoolean(_configuration.showProgressBarText, false);
        buildDefaultConfigurationStrings();
        buildDefaultConfigurationCustomTriggers();
    }
    function buildDefaultConfigurationStrings() {
        _configuration.backButtonText = getDefaultAnyString(_configuration.backButtonText, "Back");
        _configuration.nextButtonText = getDefaultAnyString(_configuration.nextButtonText, "Next");
        _configuration.finishButtonText = getDefaultAnyString(_configuration.finishButtonText, "Finish");
        _configuration.closeButtonToolTipText = getDefaultAnyString(_configuration.closeButtonToolTipText, "Close");
        _configuration.doNotShowAgainText = getDefaultAnyString(_configuration.doNotShowAgainText, "Do not show again");
        _configuration.objectErrorText = getDefaultAnyString(_configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
        _configuration.attributeNotValidErrorText = getDefaultAnyString(_configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
        _configuration.attributeNotSetErrorText = getDefaultAnyString(_configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
        _configuration.closeDialogConfirmationText = getDefaultAnyString(_configuration.closeDialogConfirmationText, null);
    }
    function buildDefaultConfigurationCustomTriggers() {
        _configuration.onDoNotShowAgainChange = getDefaultFunction(_configuration.onDoNotShowAgainChange, null);
    }
    const _public = {
        start: function(e = null) {
            if (!_public.isOpen()) {
                _groups_Current = getDefaultString(e, _groups_Default);
                if (_groups.hasOwnProperty(_groups_Current)) {
                    _groups[_groups_Current].position = 0;
                    showDialogAndSetPosition();
                }
            }
            return _public;
        },
        show: function(e = null) {
            if (!_public.isOpen()) {
                _groups_Current = getDefaultString(e, _groups_Current);
                if (_groups.hasOwnProperty(_groups_Current)) {
                    if (_groups[_groups_Current].position === _groups[_groups_Current].keys.length - 1) {
                        _groups[_groups_Current].position = 0;
                    }
                    showDialogAndSetPosition();
                }
            }
            return _public;
        },
        hide: function() {
            if (_public.isOpen()) {
                onDialogClose();
            }
            return _public;
        },
        isOpen: function() {
            return isDefined(_element_Dialog) && _element_Dialog.style.display === "block";
        },
        isComplete: function() {
            return _groups[_groups_Current].position >= _groups[_groups_Current].keys.length - 1;
        },
        addDocumentSteps: function() {
            getElements();
            return _public;
        },
        addStep: function(e, t) {
            if (isDefinedObject(e) && isDefinedObject(t)) {
                setupElement(e, buildAttributeOptions(t));
                _groups[_groups_Current].keys.sort();
                resetDialogPosition();
            }
            return _public;
        },
        removeStep: function(e) {
            if (isDefinedObject(e)) {
                let t = false;
                for (let o in _groups) {
                    if (_groups.hasOwnProperty(o)) {
                        for (let n in _groups[o].json) {
                            if (_groups[o].json.hasOwnProperty(n)) {
                                const i = _groups[o].json[n];
                                if (i._currentView.element === e) {
                                    fireCustomTriggerEvent(i.events.onRemoveStep, i._currentView.element);
                                    _groups[o].keys.splice(_groups[o].keys.indexOf(i.order), 1);
                                    delete _groups[o].json[i.order];
                                    _groups[o].keys.sort();
                                    t = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!t) {
                    clearElementsByClassName(e, "journey-js-hint");
                } else {
                    resetDialogPosition();
                }
            }
            return _public;
        },
        clearSteps: function(e = null) {
            resetDialogPosition();
            for (let t in _groups) {
                if (_groups.hasOwnProperty(t)) {
                    if (!isDefinedString(e) || e === t) {
                        for (let e in _groups[t].json) {
                            if (_groups[t].json.hasOwnProperty(e)) {
                                const o = _groups[t].json[e];
                                fireCustomTriggerEvent(o.events.onRemoveStep, o._currentView.element);
                            }
                        }
                    }
                }
            }
            if (isDefinedString(e)) {
                if (_groups.hasOwnProperty(e)) {
                    delete _groups[e];
                }
            } else {
                _groups = {};
            }
            if (!isDefinedString(e) || e === _groups_Default) {
                setupDefaultGroup(_groups);
            }
            return _public;
        },
        clearHints: function() {
            clearElementsByClassName(document.body, "journey-js-hint");
            return _public;
        },
        reverseStepOrder: function() {
            _groups[_groups_Current].keys.reverse();
            resetDialogPosition();
            return _public;
        },
        setConfiguration: function(e) {
            if (isDefinedObject(e)) {
                let t = false;
                for (let o in e) {
                    if (e.hasOwnProperty(o) && _configuration.hasOwnProperty(o) && _configuration[o] !== e[o]) {
                        _configuration[o] = e[o];
                        t = true;
                    }
                }
                if (t) {
                    buildDefaultConfiguration(_configuration);
                }
            }
            return _public;
        },
        getVersion: function() {
            return "2.0.0";
        }
    };
    (() => {
        buildDefaultConfiguration();
        document.addEventListener("DOMContentLoaded", (function() {
            setupDefaultGroup();
            renderDisabledBackground();
            renderDialog();
            renderToolTip();
            getElements();
            buildDocumentEvents();
            if (getBrowserUrlParameters()) {
                _public.show();
            }
        }));
        if (!isDefined(window.$journey)) {
            window.$journey = _public;
        }
    })();
})();//# sourceMappingURL=journey.js.map