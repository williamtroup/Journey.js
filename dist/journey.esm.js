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

var require_journey = __commonJS({
    "src/journey.ts"(exports, module) {
        init_enum();
        () => {
            let _configuration = {};
            let _configuration_ShortcutKeysEnabled = true;
            const _groups_Default = "default";
            let _groups_Current = _groups_Default;
            const _groups = {};
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
                const l = n === "text";
                let o = l ? document.createTextNode("") : document.createElement(n);
                if (isDefined(t)) {
                    o.className = t;
                }
                return o;
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
                var n = e.pageX, l = e.pageY, o = getScrollPosition();
                t.style.display = "block";
                if (n + t.offsetWidth > window.innerWidth) {
                    n -= t.offsetWidth;
                } else {
                    n++;
                }
                if (l + t.offsetHeight > window.innerHeight) {
                    l -= t.offsetHeight;
                } else {
                    l++;
                }
                if (n < o.left) {
                    n = e.pageX + 1;
                }
                if (l < o.top) {
                    l = e.pageY + 1;
                }
                t.style.left = n + "px";
                t.style.top = l + "px";
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
                const l = createElement("label", "checkbox");
                const o = createElement("input");
                e.appendChild(n);
                n.appendChild(l);
                l.appendChild(o);
                o.type = "checkbox";
                var i = createElement("span", "check-mark"), r = createElement("span", "text");
                r.innerHTML = t;
                l.appendChild(i);
                l.appendChild(r);
                return {
                    input: o,
                    label: l
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
                    for (var l = 0; l < o; l++) {
                        const n = e[l].split("=");
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
                let n = t;
                if (isDefinedString(e)) {
                    const l = e.toString().split(" ");
                    if (l.length === 0) {
                        e = t;
                    } else {
                        n = l;
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
            (() => {})();
        };
    }
});

export default require_journey();//# sourceMappingURL=journey.esm.js.map