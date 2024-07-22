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
    "src/ts/data/enum.ts"() {
        "use strict";
    }
});

var Constant;

var init_constant = __esm({
    "src/ts/constant.ts"() {
        "use strict";
        (e => {
            e.JOURNEY_JS_ATTRIBUTE_NAME = "data-journey-js";
            e.DEFAULT_GROUP = "default";
        })(Constant || (Constant = {}));
    }
});

var Is;

var init_is = __esm({
    "src/ts/data/is.ts"() {
        "use strict";
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
            function l(e) {
                return t(e) && typeof e === "function";
            }
            e.definedFunction = l;
            function r(e) {
                return t(e) && typeof e === "number";
            }
            e.definedNumber = r;
            function s(e) {
                return o(e) && e instanceof Array;
            }
            e.definedArray = s;
        })(Is || (Is = {}));
    }
});

var Default;

var init_default = __esm({
    "src/ts/data/default.ts"() {
        "use strict";
        init_enum();
        init_is();
        (e => {
            function t(e, t) {
                return typeof e === "string" ? e : t;
            }
            e.getAnyString = t;
            function o(e, t) {
                return Is.definedString(e) ? e : t;
            }
            e.getString = o;
            function n(e, t) {
                return Is.definedBoolean(e) ? e : t;
            }
            e.getBoolean = n;
            function i(e, t) {
                return Is.definedNumber(e) ? e : t;
            }
            e.getNumber = i;
            function l(e, t) {
                return Is.definedFunction(e) ? e : t;
            }
            e.getFunction = l;
            function r(e, t) {
                return Is.definedObject(e) ? e : t;
            }
            e.getObject = r;
            function s(e, t) {
                return Is.definedArray(e) ? e : t;
            }
            e.getArray = s;
            function _(e, t) {
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
            e.getStringOrArray = _;
        })(Default || (Default = {}));
    }
});

var DomElement;

var init_dom = __esm({
    "src/ts/dom/dom.ts"() {
        "use strict";
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
                    left: e.scrollLeft - (e.clientLeft || 0),
                    top: e.scrollTop - (e.clientTop || 0)
                };
                return t;
            }
            e.getScrollPosition = n;
            function i(e, t) {
                const o = getComputedStyle(e);
                let n = o.getPropertyValue(t);
                return n;
            }
            e.getStyleValueByName = i;
            function l(e, t) {
                try {
                    if (!e.contains(t)) {
                        e.appendChild(t);
                    }
                } catch (e) {
                    console.warn(e.message);
                }
            }
            e.addNode = l;
            function r(e, t) {
                try {
                    if (e.contains(t)) {
                        e.removeChild(t);
                    }
                } catch (e) {
                    console.warn(e.message);
                }
            }
            e.removeNode = r;
            function s(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            e.cancelBubble = s;
            function _(e, t) {
                let o = e.pageX;
                let i = e.pageY;
                const l = n();
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
                if (o < l.left) {
                    o = e.pageX + 1;
                }
                if (i < l.top) {
                    i = e.pageY + 1;
                }
                t.style.left = `${o}px`;
                t.style.top = `${i}px`;
            }
            e.showElementAtMousePosition = _;
            function a(e, t) {
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
            e.showElementBasedOnCondition = a;
            function u(e, o) {
                const n = t("div");
                const i = t("label", "checkbox");
                const l = t("input");
                e.appendChild(n);
                n.appendChild(i);
                i.appendChild(l);
                l.type = "checkbox";
                const r = t("span", "check-mark");
                const s = t("span", "text");
                s.innerHTML = o;
                i.appendChild(r);
                i.appendChild(s);
                return l;
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

var Binding;

var init_binding = __esm({
    "src/ts/options/binding.ts"() {
        "use strict";
        init_constant();
        init_default();
        init_enum();
        (e => {
            let t;
            (e => {
                function t(e) {
                    let t = Default.getObject(e, {});
                    t.order = Default.getNumber(t.order, 0);
                    t.attach = Default.getBoolean(t.attach, true);
                    t.sendClick = Default.getBoolean(t.sendClick, false);
                    t.alignTop = Default.getBoolean(t.alignTop, false);
                    t.alignRight = Default.getBoolean(t.alignRight, false);
                    t.isHint = Default.getBoolean(t.isHint, false);
                    t.alignHintToClickPosition = Default.getBoolean(t.alignHintToClickPosition, false);
                    t.showDisabledBackground = Default.getBoolean(t.showDisabledBackground, true);
                    t.removeHintWhenViewed = Default.getBoolean(t.removeHintWhenViewed, false);
                    t.group = Default.getString(t.group, Constant.DEFAULT_GROUP);
                    t = o(t);
                    return n(t);
                }
                e.get = t;
                function o(e) {
                    e.title = Default.getString(e.title, "");
                    e.description = Default.getString(e.description, "");
                    e.tooltip = Default.getString(e.tooltip, "");
                    return e;
                }
                function n(e) {
                    e.events = Default.getObject(e.events, {});
                    e.events.onEnter = Default.getFunction(e.events.onEnter, null);
                    e.events.onLeave = Default.getFunction(e.events.onLeave, null);
                    e.events.onClose = Default.getFunction(e.events.onClose, null);
                    e.events.onFinish = Default.getFunction(e.events.onFinish, null);
                    e.events.onOpen = Default.getFunction(e.events.onOpen, null);
                    e.events.onStart = Default.getFunction(e.events.onStart, null);
                    e.events.onAddStep = Default.getFunction(e.events.onAddStep, null);
                    e.events.onRemoveStep = Default.getFunction(e.events.onRemoveStep, null);
                    return e;
                }
            })(t = e.Options || (e.Options = {}));
        })(Binding || (Binding = {}));
    }
});

var Config;

var init_config = __esm({
    "src/ts/options/config.ts"() {
        "use strict";
        init_default();
        init_enum();
        (e => {
            let t;
            (e => {
                function t(e = {}) {
                    let t = Default.getObject(e, {});
                    t.safeMode = Default.getBoolean(t.safeMode, true);
                    t.domElementTypes = Default.getStringOrArray(t.domElementTypes, [ "*" ]);
                    t.showCloseButton = Default.getBoolean(t.showCloseButton, true);
                    t.shortcutKeysEnabled = Default.getBoolean(t.shortcutKeysEnabled, true);
                    t.showProgressDots = Default.getBoolean(t.showProgressDots, true);
                    t.browserUrlParametersEnabled = Default.getBoolean(t.browserUrlParametersEnabled, true);
                    t.showProgressDotNumbers = Default.getBoolean(t.showProgressDotNumbers, false);
                    t.showButtons = Default.getBoolean(t.showButtons, true);
                    t.showDoNotShowAgain = Default.getBoolean(t.showDoNotShowAgain, false);
                    t.tooltipDelay = Default.getNumber(t.tooltipDelay, 750);
                    t.showProgressDotToolTips = Default.getBoolean(t.showProgressDotToolTips, true);
                    t.closeDialogOnDisabledBackgroundClick = Default.getBoolean(t.closeDialogOnDisabledBackgroundClick, false);
                    t.showProgressBar = Default.getBoolean(t.showProgressBar, false);
                    t.scrollToElements = Default.getBoolean(t.scrollToElements, false);
                    t.dialogMovingEnabled = Default.getBoolean(t.dialogMovingEnabled, false);
                    t.showProgressBarText = Default.getBoolean(t.showProgressBarText, false);
                    t = o(t);
                    t = n(t);
                    return t;
                }
                e.get = t;
                function o(e) {
                    e.text = Default.getObject(e.text, {});
                    e.text.backButtonText = Default.getAnyString(e.text.backButtonText, "Back");
                    e.text.nextButtonText = Default.getAnyString(e.text.nextButtonText, "Next");
                    e.text.finishButtonText = Default.getAnyString(e.text.finishButtonText, "Finish");
                    e.text.closeButtonToolTipText = Default.getAnyString(e.text.closeButtonToolTipText, "Close");
                    e.text.doNotShowAgainText = Default.getAnyString(e.text.doNotShowAgainText, "Do not show again");
                    e.text.objectErrorText = Default.getAnyString(e.text.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
                    e.text.attributeNotValidErrorText = Default.getAnyString(e.text.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
                    e.text.attributeNotSetErrorText = Default.getAnyString(e.text.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
                    e.text.closeDialogConfirmationText = Default.getAnyString(e.text.closeDialogConfirmationText, "");
                    return e;
                }
                function n(e) {
                    e.events = Default.getObject(e.events, {});
                    e.events.onDoNotShowAgainChange = Default.getFunction(e.events.onDoNotShowAgainChange, null);
                    return e;
                }
            })(t = e.Options || (e.Options = {}));
        })(Config || (Config = {}));
    }
});

var require_journey = __commonJS({
    "src/journey.ts"(exports, module) {
        init_enum();
        init_constant();
        init_is();
        init_default();
        init_dom();
        init_binding();
        init_config();
        (() => {
            let _configuration = {};
            let _configuration_ShortcutKeysEnabled = true;
            let _groups_Current = Constant.DEFAULT_GROUP;
            let _groups = {};
            let _element_Focus_Element_PositionStyle = "";
            let _element_Disabled_Background;
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
                _groups = Default.getObject(e, {});
                _groups[Constant.DEFAULT_GROUP] = {
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
                addToolTip(_element_Dialog_Close_Button, _configuration.text.closeButtonToolTipText);
                _element_Dialog_Title = DomElement.create("div", "title");
                _element_Dialog.appendChild(_element_Dialog_Title);
                _element_Dialog_Description = DomElement.create("div", "description");
                _element_Dialog.appendChild(_element_Dialog_Description);
                _element_Dialog_CheckBox_Container = DomElement.create("div", "checkbox-container");
                _element_Dialog.appendChild(_element_Dialog_CheckBox_Container);
                _element_Dialog_CheckBox_Input = DomElement.createCheckBox(_element_Dialog_CheckBox_Container, _configuration.text.doNotShowAgainText);
                _element_Dialog_CheckBox_Input.onchange = () => {
                    if (_configuration.showDoNotShowAgain) {
                        fireCustomTriggerEvent(_configuration.events.onDoNotShowAgainChange, _element_Dialog_CheckBox_Input.checked);
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
                let t = false;
                if (Is.definedString(_configuration.text.closeDialogConfirmationText) && e) {
                    t = confirm(_configuration.text.closeDialogConfirmationText);
                } else {
                    t = true;
                }
                if (t) {
                    const e = getGroupBindingOptions();
                    if (Is.defined(e) && Is.defined(e._currentView.element)) {
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
                if (Is.defined(e) && Is.defined(e._currentView.element)) {
                    if (e.showDisabledBackground) {
                        showDisabledBackground();
                    } else {
                        hideDisabledBackground();
                    }
                    hideToolTip();
                    _element_Dialog_Close_Button.style.display = _configuration.showCloseButton ? "block" : "none";
                    _configuration_ShortcutKeysEnabled = true;
                    e._currentView.element.classList.add("journey-js-element-focus");
                    if (_configuration.scrollToElements) {
                        e._currentView.element.scrollIntoView();
                    }
                    const t = DomElement.getStyleValueByName(e._currentView.element, "position");
                    if (t !== "" && t.toLowerCase() === "static") {
                        _element_Focus_Element_PositionStyle = t;
                        e._currentView.element.style.position = "relative";
                    }
                    DomElement.showElementBasedOnCondition(_element_Dialog_CheckBox_Container, _configuration.showDoNotShowAgain);
                    DomElement.showElementBasedOnCondition(_element_Dialog_ProgressDots, _configuration.showProgressDots && _groups[_groups_Current].keys.length > 1);
                    DomElement.showElementBasedOnCondition(_element_Dialog_ProgressBar, _configuration.showProgressBar && _groups[_groups_Current].keys.length > 1);
                    DomElement.showElementBasedOnCondition(_element_Dialog_ProgressBar_Percentage_Text, _configuration.showProgressBarText);
                    DomElement.showElementBasedOnCondition(_element_Dialog_Buttons, _configuration.showButtons);
                    _element_Dialog_Buttons_Back_Button.innerHTML = _configuration.text.backButtonText;
                    _element_Dialog_Buttons_Back_Button.disabled = _groups[_groups_Current].position === 0;
                    if (_groups[_groups_Current].position >= _groups[_groups_Current].keys.length - 1) {
                        _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.text.finishButtonText;
                    } else {
                        _element_Dialog_Buttons_Next_Button.innerHTML = _configuration.text.nextButtonText;
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
                        _element_Dialog.style.top = `${o}px`;
                        _element_Dialog.style.left = `${n}px`;
                    }
                } else {
                    const e = DomElement.getScrollPosition();
                    const t = Math.max(0, (window.innerWidth - _element_Dialog.offsetWidth) / 2 + e.left);
                    const o = Math.max(0, (window.innerHeight - _element_Dialog.offsetHeight) / 2 + e.top);
                    _element_Dialog.style.left = `${t}px`;
                    _element_Dialog.style.top = `${o}px`;
                }
            }
            function removeFocusClassFromLastElement(e = true) {
                const t = getGroupBindingOptions();
                if (Is.defined(t) && Is.defined(t._currentView.element)) {
                    t._currentView.element.classList.remove("journey-js-element-focus");
                    if (Is.defined(_element_Focus_Element_PositionStyle)) {
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
                    n.classList.add("dot-number");
                    n.innerHTML = (e + 1).toString();
                }
            }
            function setProgressBarPosition() {
                if (_configuration.showProgressBar) {
                    const e = _element_Dialog_ProgressBar.offsetWidth / _groups[_groups_Current].keys.length;
                    const t = (_groups[_groups_Current].position + 1) * e;
                    const o = Math.ceil((_groups[_groups_Current].position + 1) / _groups[_groups_Current].keys.length * 100);
                    _element_Dialog_ProgressBar_Percentage.style.width = `${t}px`;
                    _element_Dialog_ProgressBar_Percentage_Text.innerHTML = `${o}%`;
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
                    _element_Dialog.classList.add("journey-js-dialog-moving");
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
                    _element_Dialog.style.left = `${e.pageX - _element_Dialog_Move_X}px`;
                    _element_Dialog.style.top = `${e.pageY - _element_Dialog_Move_Y}px`;
                }
            }
            function onMoveDocumentMouseLeave() {
                if (_element_Dialog_Move_IsMoving) {
                    _element_Dialog.style.left = `${_element_Dialog_Move_Original_X}px`;
                    _element_Dialog.style.top = `${_element_Dialog_Move_Original_Y}px`;
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
                let t = true;
                if (Is.defined(e) && e.hasAttribute(Constant.JOURNEY_JS_ATTRIBUTE_NAME)) {
                    const o = e.getAttribute(Constant.JOURNEY_JS_ATTRIBUTE_NAME);
                    if (Is.definedString(o)) {
                        const n = getObjectFromString(o);
                        if (n.parsed && Is.definedObject(n.object)) {
                            setupElement(e, Binding.Options.get(n.object));
                        } else {
                            if (!_configuration.safeMode) {
                                console.error(_configuration.text.attributeNotValidErrorText.replace("{{attribute_name}}", Constant.JOURNEY_JS_ATTRIBUTE_NAME));
                                t = false;
                            }
                        }
                    } else {
                        if (!_configuration.safeMode) {
                            console.error(_configuration.text.attributeNotSetErrorText.replace("{{attribute_name}}", Constant.JOURNEY_JS_ATTRIBUTE_NAME));
                            t = false;
                        }
                    }
                }
                return t;
            }
            function setupElement(e, t) {
                t._currentView = {};
                t._currentView.element = e;
                if (Is.definedNumber(t.order) && (Is.definedString(t.title) || Is.definedString(t.description))) {
                    e.removeAttribute(Constant.JOURNEY_JS_ATTRIBUTE_NAME);
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
                        result.object = eval(`(${objectString})`);
                        if (Is.definedFunction(result.object)) {
                            result.object = result.object();
                        }
                    } catch (e) {
                        if (!_configuration.safeMode) {
                            console.error(_configuration.text.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
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
            const _public = {
                start: function(e = "") {
                    if (!_public.isOpen()) {
                        _groups_Current = Default.getString(e, Constant.DEFAULT_GROUP);
                        if (_groups.hasOwnProperty(_groups_Current)) {
                            _groups[_groups_Current].position = 0;
                            showDialogAndSetPosition();
                        }
                    }
                    return _public;
                },
                show: function(e = "") {
                    if (!_public.isOpen()) {
                        _groups_Current = Default.getString(e, _groups_Current);
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
                        setupElement(e, Binding.Options.get(t));
                        _groups[_groups_Current].keys.sort();
                        resetDialogPosition();
                    }
                    return _public;
                },
                removeStep: function(e) {
                    if (Is.definedObject(e)) {
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
                            DomElement.clearElementsByClassName(e, "journey-js-hint");
                        } else {
                            resetDialogPosition();
                        }
                    }
                    return _public;
                },
                clearSteps: function(e = "") {
                    resetDialogPosition();
                    for (let t in _groups) {
                        if (_groups.hasOwnProperty(t)) {
                            if (!Is.definedString(e) || e === t) {
                                for (let e in _groups[t].json) {
                                    if (_groups[t].json.hasOwnProperty(e)) {
                                        const o = _groups[t].json[e];
                                        fireCustomTriggerEvent(o.events.onRemoveStep, o._currentView.element);
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
                    if (!Is.definedString(e) || e === Constant.DEFAULT_GROUP) {
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
                        const o = _configuration;
                        for (let n in e) {
                            if (e.hasOwnProperty(n) && _configuration.hasOwnProperty(n) && o[n] !== e[n]) {
                                o[n] = e[n];
                                t = true;
                            }
                        }
                        if (t) {
                            _configuration = Config.Options.get(o);
                        }
                    }
                    return _public;
                },
                getVersion: function() {
                    return "2.1.0";
                }
            };
            (() => {
                _configuration = Config.Options.get();
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