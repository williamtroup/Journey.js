var __getOwnPropNames = Object.getOwnPropertyNames;

var __esm = (e, t) => function o() {
    return e && (t = (0, e[__getOwnPropNames(e)[0]])(e = 0)), t;
};

var __commonJS = (e, t) => function o() {
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

var Is;

var init_is = __esm({
    "src/ts/is.ts"() {
        init_enum();
        (e => {
            function t(e) {
                return e !== null && e !== void 0 && e !== "";
            }
            e.defined = t;
            function o(e) {
                return t(e) && typeof e === "object";
            }
            e.definedObject = o;
            function n(e) {
                return t(e) && typeof e === "boolean";
            }
            e.definedBoolean = n;
            function i(e) {
                return t(e) && typeof e === "string";
            }
            e.definedString = i;
            function r(e) {
                return t(e) && typeof e === "function";
            }
            e.definedFunction = r;
            function l(e) {
                return t(e) && typeof e === "number";
            }
            e.definedNumber = l;
            function s(e) {
                return o(e) && e instanceof Array;
            }
            e.definedArray = s;
        })(Is || (Is = {}));
    }
});

var Data;

var init_data = __esm({
    "src/ts/data.ts"() {
        init_enum();
        init_is();
        (e => {
            function t(e, t) {
                return typeof e === "string" ? e : t;
            }
            e.getDefaultAnyString = t;
            function o(e, t) {
                return Is.definedString(e) ? e : t;
            }
            e.getDefaultString = o;
            function n(e, t) {
                return Is.definedBoolean(e) ? e : t;
            }
            e.getDefaultBoolean = n;
            function i(e, t) {
                return Is.definedNumber(e) ? e : t;
            }
            e.getDefaultNumber = i;
            function r(e, t) {
                return Is.definedFunction(e) ? e : t;
            }
            e.getDefaultFunction = r;
            function l(e, t) {
                return Is.definedObject(e) ? e : t;
            }
            e.getDefaultObject = l;
            function s(e, t) {
                return Is.definedArray(e) ? e : t;
            }
            e.getDefaultArray = s;
            function a(e, t) {
                let o = t;
                if (Is.definedString(e)) {
                    const n = e.toString().split(" ");
                    if (n.length === 0) {
                        e = t;
                    } else {
                        o = n;
                    }
                } else {
                    o = s(e, t);
                }
                return o;
            }
            e.getDefaultStringOrArray = a;
        })(Data || (Data = {}));
    }
});

var DomElement;

var init_dom = __esm({
    "src/ts/dom.ts"() {
        init_enum();
        init_is();
        (e => {
            function t(e, t = "") {
                const o = e.toLowerCase();
                const n = o === "text";
                let i = n ? document.createTextNode("") : document.createElement(o);
                if (Is.defined(t)) {
                    i.className = t;
                }
                return i;
            }
            e.create = t;
            function o(e) {
                const t = {
                    left: 0,
                    top: 0
                };
                while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
                    t.left += e.offsetLeft - e.scrollLeft;
                    t.top += e.offsetTop - e.scrollTop;
                    e = e.offsetParent;
                }
                return t;
            }
            e.getOffset = o;
            function n() {
                const e = document.documentElement;
                const t = {
                    left: (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0),
                    top: (window.pageYOffset || e.scrollTop) - (e.clientTop || 0)
                };
                return t;
            }
            e.getScrollPosition = n;
            function i(e, t) {
                let o = null;
                if (document.defaultView.getComputedStyle) {
                    o = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
                } else if (e.currentStyle) {
                    o = e.currentStyle[t];
                }
                return o;
            }
            e.getStyleValueByName = i;
            function r(e, t) {
                try {
                    if (!e.contains(t)) {
                        e.appendChild(t);
                    }
                } catch (e) {
                    console.warn(e.message);
                }
            }
            e.addNode = r;
            function l(e, t) {
                try {
                    if (e.contains(t)) {
                        e.removeChild(t);
                    }
                } catch (e) {
                    console.warn(e.message);
                }
            }
            e.removeNode = l;
            function s(e) {
                e.preventDefault();
                e.cancelBubble = true;
            }
            e.cancelBubble = s;
            function a(e, t) {
                let o = e.pageX;
                let i = e.pageY;
                const r = n();
                t.style.display = "block";
                if (o + t.offsetWidth > window.innerWidth) {
                    o -= t.offsetWidth;
                } else {
                    o++;
                }
                if (i + t.offsetHeight > window.innerHeight) {
                    i -= t.offsetHeight;
                } else {
                    i++;
                }
                if (o < r.left) {
                    o = e.pageX + 1;
                }
                if (i < r.top) {
                    i = e.pageY + 1;
                }
                t.style.left = o + "px";
                t.style.top = i + "px";
            }
            e.showElementAtMousePosition = a;
            function _(e, t) {
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
            e.showElementBasedOnCondition = _;
            function u(e, o) {
                const n = t("div");
                const i = t("label", "checkbox");
                const r = t("input");
                e.appendChild(n);
                n.appendChild(i);
                i.appendChild(r);
                r.type = "checkbox";
                const l = t("span", "check-mark");
                const s = t("span", "text");
                s.innerHTML = o;
                i.appendChild(l);
                i.appendChild(s);
                return r;
            }
            e.createCheckBox = u;
            function g(e, t) {
                let o = e.getElementsByClassName(t);
                while (o[0]) {
                    o[0].parentNode.removeChild(o[0]);
                }
            }
            e.clearElementsByClassName = g;
        })(DomElement || (DomElement = {}));
    }
});

var require_journey = __commonJS({
    "src/journey.ts"(exports, module) {
        init_enum();
        init_constant();
        init_is();
        init_data();
        init_dom();
        (() => {
            let _configuration = {};
            let _configuration_ShortcutKeysEnabled = true;
            const _groups_Default = "default";
            let _groups_Current = _groups_Default;
            let _groups = {};
            let _element_Focus_Element_PositionStyle = "";
            let _element_Disabled_Background;
            let _element_Dialog;
            let _element_Dialog_Close_Button;
            let _element_Dialog_Title;
            let _element_Dialog_Description;
            let _element_Dialog_CheckBox_Container;
            let _element_Dialog_CheckBox_Input;
            let _element_Dialog_ProgressDots;
            let _element_Dialog_ProgressBar;
            let _element_Dialog_ProgressBar_Percentage;
            let _element_Dialog_ProgressBar_Percentage_Text;
            let _element_Dialog_Buttons;
            let _element_Dialog_Buttons_Back_Button;
            let _element_Dialog_Buttons_Next_Button;
            let _element_Dialog_IsHint = false;
            let _element_Dialog_Move_Original_X = 0;
            let _element_Dialog_Move_Original_Y = 0;
            let _element_Dialog_Move_IsMoving = false;
            let _element_Dialog_Move_X = 0;
            let _element_Dialog_Move_Y = 0;
            let _element_ToolTip;
            let _element_ToolTip_Timer = 0;
            function setupDefaultGroup(e = null) {
                _groups = Data.getDefaultObject(e, {});
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
                _element_Disabled_Background = DomElement.create("div", "journey-js-disabled-background");
                _element_Disabled_Background.onclick = () => {
                    if (_configuration.closeDialogOnDisabledBackgroundClick) {
                        onDialogClose();
                    }
                };
            }
            function showDisabledBackground() {
                DomElement.addNode(document.body, _element_Disabled_Background);
            }
            function hideDisabledBackground() {
                DomElement.removeNode(document.body, _element_Disabled_Background);
            }
            function renderDialog() {
                _element_Dialog = DomElement.create("div", "journey-js-dialog");
                _element_Dialog.style.display = "none";
                document.body.appendChild(_element_Dialog);
                _element_Dialog_Close_Button = DomElement.create("button", "close");
                _element_Dialog.appendChild(_element_Dialog_Close_Button);
                _element_Dialog_Close_Button.onclick = () => {
                    onDialogClose();
                };
                addToolTip(_element_Dialog_Close_Button, _configuration.closeButtonToolTipText);
                _element_Dialog_Title = DomElement.create("div", "title");
                _element_Dialog.appendChild(_element_Dialog_Title);
                _element_Dialog_Description = DomElement.create("div", "description");
                _element_Dialog.appendChild(_element_Dialog_Description);
                _element_Dialog_CheckBox_Container = DomElement.create("div", "checkbox-container");
                _element_Dialog.appendChild(_element_Dialog_CheckBox_Container);
                _element_Dialog_CheckBox_Input = DomElement.createCheckBox(_element_Dialog_CheckBox_Container, _configuration.doNotShowAgainText);
                _element_Dialog_CheckBox_Input.onchange = () => {
                    if (_configuration.showDoNotShowAgain) {
                        fireCustomTriggerEvent(_configuration.onDoNotShowAgainChange, _element_Dialog_CheckBox_Input.checked);
                    }
                };
                _element_Dialog_ProgressDots = DomElement.create("div", "progress-dots");
                _element_Dialog.appendChild(_element_Dialog_ProgressDots);
                _element_Dialog_ProgressBar = DomElement.create("div", "progress-bar");
                _element_Dialog.appendChild(_element_Dialog_ProgressBar);
                _element_Dialog_ProgressBar_Percentage = DomElement.create("div", "progress-bar-percentage");
                _element_Dialog_ProgressBar.appendChild(_element_Dialog_ProgressBar_Percentage);
                _element_Dialog_ProgressBar_Percentage_Text = DomElement.create("p", "progress-bar-percentage-text");
                _element_Dialog_ProgressBar_Percentage.appendChild(_element_Dialog_ProgressBar_Percentage_Text);
                _element_Dialog_Buttons = DomElement.create("div", "buttons");
                _element_Dialog.appendChild(_element_Dialog_Buttons);
                _element_Dialog_Buttons_Back_Button = DomElement.create("button", "back");
                _element_Dialog_Buttons_Back_Button.onclick = onDialogBack;
                _element_Dialog_Buttons.appendChild(_element_Dialog_Buttons_Back_Button);
                _element_Dialog_Buttons_Next_Button = DomElement.create("button", "next");
                _element_Dialog_Buttons_Next_Button.onclick = onDialogNext;
                _element_Dialog_Buttons.appendChild(_element_Dialog_Buttons_Next_Button);
                makeDialogMovable();
            }
            function onDialogClose(e = true) {
                var t;
                let o = false;
                if (Is.definedString(_configuration.closeDialogConfirmationText) && e) {
                    o = confirm(_configuration.closeDialogConfirmationText);
                } else {
                    o = true;
                }
                if (o) {
                    const e = getGroupBindingOptions();
                    if (Is.defined(e) && Is.defined(e._currentView.element)) {
                        fireCustomTriggerEvent((t = e.events) == null ? void 0 : t.onClose, e._currentView.element);
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
                var e;
                if (_groups[_groups_Current].position === _groups[_groups_Current].keys.length - 1) {
                    const t = getGroupBindingOptions();
                    onDialogClose(false);
                    fireCustomTriggerEvent((e = t.events) == null ? void 0 : e.onFinish, t._currentView.element);
                } else {
                    removeFocusClassFromLastElement();
                    _groups[_groups_Current].position++;
                    showDialogAndSetPosition();
                }
            }
            function showDialogAndSetPosition() {
                var e;
                const t = getGroupBindingOptions();
                if (Is.defined(t) && Is.defined(t._currentView.element)) {
                    if (t.showDisabledBackground) {
                        showDisabledBackground();
                    } else {
                        hideDisabledBackground();
                    }
                    hideToolTip();
                    _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block" : "none";
                    _configuration_ShortcutKeysEnabled = true;
                    t._currentView.element.className += " " + "journey-js-element-focus";
                    if (_configuration.scrollToElements) {
                        t._currentView.element.scrollIntoView();
                    }
                    const o = DomElement.getStyleValueByName(t._currentView.element, "position");
                    if (o !== "" && o.toLowerCase() === "static") {
                        _element_Focus_Element_PositionStyle = o;
                        t._currentView.element.style.position = "relative";
                    }
                    DomElement.showElementBasedOnCondition(_element_Dialog_CheckBox_Container, _configuration.showDoNotShowAgain);
                    DomElement.showElementBasedOnCondition(_element_Dialog_ProgressDots, _configuration.showProgressDots && _groups[_groups_Current].keys.length > 1);
                    DomElement.showElementBasedOnCondition(_element_Dialog_ProgressBar, _configuration.showProgressBar && _groups[_groups_Current].keys.length > 1);
                    DomElement.showElementBasedOnCondition(_element_Dialog_ProgressBar_Percentage_Text, _configuration.showProgressBarText);
                    DomElement.showElementBasedOnCondition(_element_Dialog_Buttons, _configuration.showButtons);
                    _element_Dialog_Buttons_Back_Button.innerHTML = _configuration.backButtonText;
                    _element_Dialog_Buttons_Back_Button.disabled = _groups[_groups_Current].position === 0;
                    if (_groups[_groups_Current].position >= _groups[_groups_Current].keys.length - 1) {
                        _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.finishButtonText;
                    } else {
                        _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.nextButtonText;
                    }
                    setDialogText(t);
                    setDialogPosition(null, t);
                    buildProcessDots();
                    setProgressBarPosition();
                    fireCustomTriggerEvent((e = t.events) == null ? void 0 : e.onEnter, t._currentView.element);
                    if (t.sendClick) {
                        t._currentView.element.click();
                    }
                }
            }
            function setDialogText(e) {
                if (Is.definedString(e.title)) {
                    _element_Dialog_Title.innerHTML = e.title;
                } else {
                    _element_Dialog_Title.innerHTML = "";
                }
                if (Is.definedString(e.description)) {
                    _element_Dialog_Description.innerHTML = e.description;
                } else {
                    _element_Dialog_Description.innerHTML = "";
                }
            }
            function setDialogPosition(e, t) {
                var o, n;
                if (_element_Dialog.style.display !== "block") {
                    _element_Dialog.style.display = "block";
                    fireCustomTriggerEvent((o = t.events) == null ? void 0 : o.onOpen, t._currentView.element);
                }
                if (_groups[_groups_Current].position === 0) {
                    fireCustomTriggerEvent((n = t.events) == null ? void 0 : n.onStart, t._currentView.element);
                }
                _element_Dialog_IsHint = t.isHint === true;
                if (t.attach || t.isHint) {
                    if (t.isHint && t.alignHintToClickPosition) {
                        DomElement.showElementAtMousePosition(e, _element_Dialog);
                    } else {
                        const e = DomElement.getOffset(t._currentView.element);
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
                    const e = DomElement.getScrollPosition();
                    const t = Math.max(0, (window.innerWidth - _element_Dialog.offsetWidth) / 2 + e.left);
                    const o = Math.max(0, (window.innerHeight - _element_Dialog.offsetHeight) / 2 + e.top);
                    _element_Dialog.style.left = t + "px";
                    _element_Dialog.style.top = o + "px";
                }
            }
            function removeFocusClassFromLastElement(e = true) {
                var t;
                const o = getGroupBindingOptions();
                if (Is.defined(o) && Is.defined(o._currentView.element)) {
                    o._currentView.element.className = o._currentView.element.className.replace(" " + "journey-js-element-focus", "");
                    if (Is.defined(_element_Focus_Element_PositionStyle)) {
                        o._currentView.element.style.position = _element_Focus_Element_PositionStyle;
                    }
                    if (e) {
                        fireCustomTriggerEvent((t = o.events) == null ? void 0 : t.onLeave, o._currentView.element);
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
                let n;
                if (e === _groups[_groups_Current].position) {
                    n = DomElement.create("div", "dot-active");
                } else {
                    n = DomElement.create("div", "dot");
                    n.onclick = () => {
                        removeFocusClassFromLastElement();
                        _groups[_groups_Current].position = e;
                        showDialogAndSetPosition();
                    };
                }
                _element_Dialog_ProgressDots.appendChild(n);
                if (_configuration.showProgressDotToolTips) {
                    if (Is.definedString(o.tooltip)) {
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
                if (!Is.defined(_element_ToolTip)) {
                    _element_ToolTip = DomElement.create("div", "journey-js-tooltip");
                    _element_ToolTip.style.display = "none";
                    document.body.appendChild(_element_ToolTip);
                    document.body.addEventListener("mousemove", (() => {
                        hideToolTip();
                    }));
                    document.addEventListener("scroll", (() => {
                        hideToolTip();
                    }));
                }
            }
            function addToolTip(e, t) {
                if (e !== null) {
                    e.onmousemove = e => {
                        showToolTip(e, t);
                    };
                }
            }
            function showToolTip(e, t) {
                DomElement.cancelBubble(e);
                hideToolTip();
                _element_ToolTip_Timer = setTimeout((() => {
                    _element_ToolTip.innerHTML = t;
                    _element_ToolTip.style.display = "block";
                    DomElement.showElementAtMousePosition(e, _element_ToolTip);
                }), _configuration.tooltipDelay);
            }
            function hideToolTip() {
                if (Is.defined(_element_ToolTip)) {
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
                var t, o;
                let n = true;
                if (Is.defined(e) && e.hasAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME)) {
                    const i = e.getAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME);
                    if (Is.definedString(i)) {
                        const o = getObjectFromString(i);
                        if (o.parsed && Is.definedObject(o.object)) {
                            setupElement(e, buildAttributeOptions(o.object));
                        } else {
                            if (!_configuration.safeMode) {
                                console.error((t = _configuration.attributeNotValidErrorText) == null ? void 0 : t.replace("{{attribute_name}}", Constants.JOURNEY_JS_ATTRIBUTE_NAME));
                                n = false;
                            }
                        }
                    } else {
                        if (!_configuration.safeMode) {
                            console.error((o = _configuration.attributeNotSetErrorText) == null ? void 0 : o.replace("{{attribute_name}}", Constants.JOURNEY_JS_ATTRIBUTE_NAME));
                            n = false;
                        }
                    }
                }
                return n;
            }
            function setupElement(e, t) {
                var o;
                t._currentView = {};
                t._currentView.element = e;
                if (Is.definedNumber(t.order) && (Is.definedString(t.title) || Is.definedString(t.description))) {
                    e.removeAttribute(Constants.JOURNEY_JS_ATTRIBUTE_NAME);
                    if (!t.isHint) {
                        setupNewGroup(t.group);
                        _groups[t.group].json[t.order] = t;
                        _groups[t.group].keys.push(t.order);
                        fireCustomTriggerEvent((o = t.events) == null ? void 0 : o.onAddStep, e);
                    } else {
                        renderHint(t);
                    }
                }
            }
            function renderHint(e) {
                const t = DomElement.getStyleValueByName(e._currentView.element, "position");
                if (t !== "" && t.toLowerCase() === "static") {
                    e._currentView.element.style.position = "relative";
                }
                const o = DomElement.create("div", "journey-js-hint");
                e._currentView.element.appendChild(o);
                o.onclick = t => {
                    DomElement.cancelBubble(t);
                    _element_Dialog_CheckBox_Container.style.display = "none";
                    _element_Dialog_ProgressDots.style.display = "none";
                    _element_Dialog_ProgressBar.style.display = "none";
                    _element_Dialog_Buttons.style.display = "none";
                    _configuration_ShortcutKeysEnabled = false;
                    setDialogText(e);
                    setDialogPosition(t, e);
                    if (e.removeHintWhenViewed) {
                        DomElement.clearElementsByClassName(e._currentView.element, "journey-js-hint");
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
                    if (e.code === "Escape") {
                        e.preventDefault();
                        onDialogClose();
                    } else {
                        if (_configuration_ShortcutKeysEnabled) {
                            if (e.code === "ArrowLeft") {
                                e.preventDefault();
                                onDialogBack();
                            } else if (e.code === "ArrowRight") {
                                e.preventDefault();
                                onDialogNext();
                            } else if (e.code === "ArrowUp") {
                                e.preventDefault();
                                onWindowKeyCodeUp();
                            } else if (e.code === "ArrowDown") {
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
                let t = !Is.definedObject(e) ? {} : e;
                t.order = Data.getDefaultNumber(t.order, 0);
                t.attach = Data.getDefaultBoolean(t.attach, true);
                t.sendClick = Data.getDefaultBoolean(t.sendClick, false);
                t.alignTop = Data.getDefaultBoolean(t.alignTop, false);
                t.alignRight = Data.getDefaultBoolean(t.alignRight, false);
                t.isHint = Data.getDefaultBoolean(t.isHint, false);
                t.alignHintToClickPosition = Data.getDefaultBoolean(t.alignHintToClickPosition, false);
                t.showDisabledBackground = Data.getDefaultBoolean(t.showDisabledBackground, true);
                t.removeHintWhenViewed = Data.getDefaultBoolean(t.removeHintWhenViewed, false);
                t.group = Data.getDefaultString(t.group, _groups_Default);
                t = buildAttributeOptionStrings(t);
                return buildAttributeOptionCustomTriggers(t);
            }
            function buildAttributeOptionStrings(e) {
                e.title = Data.getDefaultString(e.title, "");
                e.description = Data.getDefaultString(e.description, "");
                e.tooltip = Data.getDefaultString(e.tooltip, "");
                return e;
            }
            function buildAttributeOptionCustomTriggers(e) {
                var t, o, n, i, r, l, s, a;
                e.events = Data.getDefaultObject(e.events, {});
                e.events.onEnter = Data.getDefaultFunction((t = e.events) == null ? void 0 : t.onEnter, null);
                e.events.onLeave = Data.getDefaultFunction((o = e.events) == null ? void 0 : o.onLeave, null);
                e.events.onClose = Data.getDefaultFunction((n = e.events) == null ? void 0 : n.onClose, null);
                e.events.onFinish = Data.getDefaultFunction((i = e.events) == null ? void 0 : i.onFinish, null);
                e.events.onOpen = Data.getDefaultFunction((r = e.events) == null ? void 0 : r.onOpen, null);
                e.events.onStart = Data.getDefaultFunction((l = e.events) == null ? void 0 : l.onStart, null);
                e.events.onAddStep = Data.getDefaultFunction((s = e.events) == null ? void 0 : s.onAddStep, null);
                e.events.onRemoveStep = Data.getDefaultFunction((a = e.events) == null ? void 0 : a.onRemoveStep, null);
                return e;
            }
            function fireCustomTriggerEvent(e, ...t) {
                if (Is.definedFunction(e)) {
                    e.apply(null, [].slice.call(t, 0));
                }
            }
            function getBrowserUrlParameters() {
                let e = false;
                if (_configuration.browserUrlParametersEnabled) {
                    const t = window.location.href;
                    const o = getBrowserUrlArguments(t);
                    if (Is.defined(o.sjOrderId)) {
                        const e = parseInt(o.sjOrderId, 10);
                        if (!isNaN(e) && e <= _groups[_groups_Current].keys.length - 1) {
                            _groups[_groups_Current].position = e;
                        }
                    }
                    if (Is.defined(o.sjShow)) {
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
            function getObjectFromString(objectString) {
                var _a;
                const result = {
                    parsed: true,
                    object: null
                };
                try {
                    if (Is.definedString(objectString)) {
                        result.object = JSON.parse(objectString);
                    }
                } catch (e1) {
                    try {
                        result.object = eval("(" + objectString + ")");
                        if (Is.definedFunction(result.object)) {
                            result.object = result.object();
                        }
                    } catch (e) {
                        if (!_configuration.safeMode) {
                            console.error((_a = _configuration.objectErrorText) == null ? void 0 : _a.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
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
            function buildDefaultConfiguration(e = {}) {
                _configuration = Data.getDefaultObject(e, {});
                _configuration.safeMode = Data.getDefaultBoolean(_configuration.safeMode, true);
                _configuration.domElementTypes = Data.getDefaultStringOrArray(_configuration.domElementTypes, [ "*" ]);
                _configuration.showCloseButton = Data.getDefaultBoolean(_configuration.showCloseButton, true);
                _configuration.shortcutKeysEnabled = Data.getDefaultBoolean(_configuration.shortcutKeysEnabled, true);
                _configuration.showProgressDots = Data.getDefaultBoolean(_configuration.showProgressDots, true);
                _configuration.browserUrlParametersEnabled = Data.getDefaultBoolean(_configuration.browserUrlParametersEnabled, true);
                _configuration.showProgressDotNumbers = Data.getDefaultBoolean(_configuration.showProgressDotNumbers, false);
                _configuration.showButtons = Data.getDefaultBoolean(_configuration.showButtons, true);
                _configuration.showDoNotShowAgain = Data.getDefaultBoolean(_configuration.showDoNotShowAgain, false);
                _configuration.tooltipDelay = Data.getDefaultNumber(_configuration.tooltipDelay, 750);
                _configuration.showProgressDotToolTips = Data.getDefaultBoolean(_configuration.showProgressDotToolTips, true);
                _configuration.closeDialogOnDisabledBackgroundClick = Data.getDefaultBoolean(_configuration.closeDialogOnDisabledBackgroundClick, false);
                _configuration.showProgressBar = Data.getDefaultBoolean(_configuration.showProgressBar, false);
                _configuration.scrollToElements = Data.getDefaultBoolean(_configuration.scrollToElements, false);
                _configuration.dialogMovingEnabled = Data.getDefaultBoolean(_configuration.dialogMovingEnabled, false);
                _configuration.showProgressBarText = Data.getDefaultBoolean(_configuration.showProgressBarText, false);
                buildDefaultConfigurationStrings();
                buildDefaultConfigurationCustomTriggers();
            }
            function buildDefaultConfigurationStrings() {
                _configuration.backButtonText = Data.getDefaultAnyString(_configuration.backButtonText, "Back");
                _configuration.nextButtonText = Data.getDefaultAnyString(_configuration.nextButtonText, "Next");
                _configuration.finishButtonText = Data.getDefaultAnyString(_configuration.finishButtonText, "Finish");
                _configuration.closeButtonToolTipText = Data.getDefaultAnyString(_configuration.closeButtonToolTipText, "Close");
                _configuration.doNotShowAgainText = Data.getDefaultAnyString(_configuration.doNotShowAgainText, "Do not show again");
                _configuration.objectErrorText = Data.getDefaultAnyString(_configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
                _configuration.attributeNotValidErrorText = Data.getDefaultAnyString(_configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
                _configuration.attributeNotSetErrorText = Data.getDefaultAnyString(_configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
                _configuration.closeDialogConfirmationText = Data.getDefaultAnyString(_configuration.closeDialogConfirmationText, "");
            }
            function buildDefaultConfigurationCustomTriggers() {
                _configuration.onDoNotShowAgainChange = Data.getDefaultFunction(_configuration.onDoNotShowAgainChange, null);
            }
            const _public = {
                start: function(e = "") {
                    if (!_public.isOpen()) {
                        _groups_Current = Data.getDefaultString(e, _groups_Default);
                        if (_groups.hasOwnProperty(_groups_Current)) {
                            _groups[_groups_Current].position = 0;
                            showDialogAndSetPosition();
                        }
                    }
                    return _public;
                },
                show: function(e = "") {
                    if (!_public.isOpen()) {
                        _groups_Current = Data.getDefaultString(e, _groups_Current);
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
                    return Is.defined(_element_Dialog) && _element_Dialog.style.display === "block";
                },
                isComplete: function() {
                    return _groups[_groups_Current].position >= _groups[_groups_Current].keys.length - 1;
                },
                addDocumentSteps: function() {
                    getElements();
                    return _public;
                },
                addStep: function(e, t) {
                    if (Is.definedObject(e) && Is.definedObject(t)) {
                        setupElement(e, buildAttributeOptions(t));
                        _groups[_groups_Current].keys.sort();
                        resetDialogPosition();
                    }
                    return _public;
                },
                removeStep: function(e) {
                    var t;
                    if (Is.definedObject(e)) {
                        let o = false;
                        for (let n in _groups) {
                            if (_groups.hasOwnProperty(n)) {
                                for (let i in _groups[n].json) {
                                    if (_groups[n].json.hasOwnProperty(i)) {
                                        const r = _groups[n].json[i];
                                        if (r._currentView.element === e) {
                                            fireCustomTriggerEvent((t = r.events) == null ? void 0 : t.onRemoveStep, r._currentView.element);
                                            _groups[n].keys.splice(_groups[n].keys.indexOf(r.order), 1);
                                            delete _groups[n].json[r.order];
                                            _groups[n].keys.sort();
                                            o = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if (!o) {
                            DomElement.clearElementsByClassName(e, "journey-js-hint");
                        } else {
                            resetDialogPosition();
                        }
                    }
                    return _public;
                },
                clearSteps: function(e = "") {
                    var t;
                    resetDialogPosition();
                    for (let o in _groups) {
                        if (_groups.hasOwnProperty(o)) {
                            if (!Is.definedString(e) || e === o) {
                                for (let e in _groups[o].json) {
                                    if (_groups[o].json.hasOwnProperty(e)) {
                                        const n = _groups[o].json[e];
                                        fireCustomTriggerEvent((t = n.events) == null ? void 0 : t.onRemoveStep, n._currentView.element);
                                    }
                                }
                            }
                        }
                    }
                    if (Is.definedString(e)) {
                        if (_groups.hasOwnProperty(e)) {
                            delete _groups[e];
                        }
                    } else {
                        _groups = {};
                    }
                    if (!Is.definedString(e) || e === _groups_Default) {
                        setupDefaultGroup(_groups);
                    }
                    return _public;
                },
                clearHints: function() {
                    DomElement.clearElementsByClassName(document.body, "journey-js-hint");
                    return _public;
                },
                reverseStepOrder: function() {
                    _groups[_groups_Current].keys.reverse();
                    resetDialogPosition();
                    return _public;
                },
                setConfiguration: function(e) {
                    if (Is.definedObject(e)) {
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
                document.addEventListener("DOMContentLoaded", (() => {
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
                if (!Is.defined(window.$journey)) {
                    window.$journey = _public;
                }
            })();
        })();
    }
});

export default require_journey();//# sourceMappingURL=journey.esm.js.map