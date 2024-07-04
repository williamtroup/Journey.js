() => {
    let _configuration = {};
    const _groups_Default = "default";
    let _groups_Current = _groups_Default;
    const _groups = {};
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
            const i = e.length;
            for (var r = 0; r < i; r++) {
                const n = e[r].split("=");
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
            const r = e.toString().split(" ");
            if (r.length === 0) {
                e = t;
            } else {
                n = r;
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
};//# sourceMappingURL=journey.js.map