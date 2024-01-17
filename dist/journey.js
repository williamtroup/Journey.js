/*! Journey.js v1.0.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function y() {
    var a = z[l[h]];
    k(a.element) && A(a.onClose, a.element);
    d.showDoNotShowAgain && A(d.onDoNotShowAgainChange, N.checked);
    B(!1);
    a = r.body;
    var b = T;
    try {
      a.contains(b) && a.removeChild(b);
    } catch (c) {
      console.warn(c.message);
    }
    g.style.display = "none";
  }
  function Z() {
    0 < h && (B(), h--, u());
  }
  function aa() {
    if (h === l.length - 1) {
      var a = z[l[h]];
      y();
      A(a.onFinish, a.element);
    } else {
      B(), h++, u();
    }
  }
  function u() {
    var a = z[l[h]];
    if (k(a) && k(a.element)) {
      var b = r.body, c = T;
      try {
        b.contains(c) || b.appendChild(c);
      } catch (f) {
        console.warn(f.message);
      }
      H.style.display = d.showCloseButton ? "block" : "none";
      C = !0;
      a.element.className += t.space + "journey-js-element-focus";
      b = ba(a.element, "position");
      b !== t.empty && "static" === b.toLowerCase() && (U = b, a.element.style.position = "relative");
      V(I, d.showDoNotShowAgain);
      V(w, d.showProgressDots);
      V(D, d.showButtons);
      J.innerHTML = d.backButtonText;
      J.disabled = 0 === h;
      O.innerHTML = h >= l.length - 1 ? d.finishButtonText : d.nextButtonText;
      ca(a);
      da(null, a);
      w.innerHTML = t.empty;
      if (d.showProgressDots) {
        for (b = l.length, c = 0; c < b; c++) {
          ka(c);
        }
      }
      A(a.onEnter, a.element);
      a.sendClick && a.element.click();
    }
  }
  function ca(a) {
    v(a.title) ? P.innerHTML = a.title : P.innerHTML = t.empty;
    v(a.description) ? Q.innerHTML = a.description : Q.innerHTML = t.empty;
  }
  function da(a, b) {
    var c = ea();
    "block" !== g.style.display && (g.style.display = "block", A(b.onOpen, b.element));
    if (b.attach || b.isHint) {
      if (b.isHint && b.alignHintToClickPosition) {
        c = g;
        var f = a.pageX, e = a.pageY, q = ea();
        c.style.display = "block";
        f + c.offsetWidth > n.innerWidth ? f -= c.offsetWidth : f++;
        e + c.offsetHeight > n.innerHeight ? e -= c.offsetHeight : e++;
        f < q.left && (f = a.pageX + 1);
        e < q.top && (e = a.pageY + 1);
        c.style.left = f + "px";
        c.style.top = e + "px";
      } else {
        e = b.element;
        for (q = f = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) {
          f += e.offsetLeft - e.scrollLeft, q += e.offsetTop - e.scrollTop, e = e.offsetParent;
        }
        e = q - c.top + b.element.offsetHeight;
        c = f - c.left;
        if (c + g.offsetWidth > n.innerWidth || b.alignRight) {
          c -= g.offsetWidth, c += b.element.offsetWidth;
        }
        if (e + g.offsetHeight > n.innerHeight || b.alignTop) {
          e -= g.offsetHeight + b.element.offsetHeight;
        }
        g.style.top = e + "px";
        g.style.left = c + "px";
      }
    } else {
      f = Math.max(0, (n.innerHeight - g.offsetHeight) / 2 + c.top), g.style.left = Math.max(0, (n.innerWidth - g.offsetWidth) / 2 + c.left) + "px", g.style.top = f + "px";
    }
  }
  function B(a) {
    a = k(a) ? a : !0;
    var b = z[l[h]];
    k(b.element) && (b.element.className = b.element.className.replace(t.space + "journey-js-element-focus", t.empty), k(U) && (b.element.style.position = U), a && A(b.onLeave, b.element));
  }
  function ka(a) {
    var b = z[l[a]];
    if (a === h) {
      var c = m("div", "dot-active");
      c.title = b.title;
      w.appendChild(c);
      d.showProgressDotNumbers && (c.className += " dot-number", c.innerHTML = (a + 1).toString());
    } else {
      c = m("div", "dot"), c.title = b.title, w.appendChild(c), d.showProgressDotNumbers && (c.className += " dot-number", c.innerHTML = (a + 1).toString()), c.onclick = function() {
        B();
        h = a;
        u();
      };
    }
  }
  function fa(a, b) {
    b.element = a;
    ha(b.order) && (v(b.title) || v(b.description)) && (b.isHint ? la(b) : (z[b.order] = b, l.push(b.order)), a.removeAttribute("data-journey-options"));
  }
  function la(a) {
    var b = ba(a.element, "position");
    b !== t.empty && "static" === b.toLowerCase() && (a.element.style.position = "relative");
    b = m("div", "journey-js-hint");
    a.element.appendChild(b);
    b.onclick = function(c) {
      c.preventDefault();
      c.cancelBubble = !0;
      I.style.display = "none";
      w.style.display = "none";
      D.style.display = "none";
      C = !1;
      ca(a);
      da(c, a);
    };
  }
  function ma(a) {
    K.isOpen() && (a.keyCode === L.escape ? (a.preventDefault(), y()) : a.keyCode === L.left && C ? (a.preventDefault(), Z()) : a.keyCode === L.right && C ? (a.preventDefault(), aa()) : a.keyCode === L.up && C ? (a.preventDefault(), 0 !== h && (B(), h = 0, u())) : a.keyCode === L.down && C && (a.preventDefault(), h !== l.length - 1 && (B(), h = l.length - 1, u())));
  }
  function na() {
    K.isOpen() && u();
  }
  function ia(a) {
    var b = a = R(a) ? a : {};
    var c = a.order;
    c = ha(c) ? c : 0;
    b.order = c;
    a.attach = p(a.attach, !0);
    a.sendClick = p(a.sendClick, !1);
    a.alignTop = p(a.alignTop, !1);
    a.alignRight = p(a.alignRight, !1);
    a.isHint = p(a.isHint, !1);
    a.alignHintToClickPosition = p(a.alignHintToClickPosition, !1);
    a.title = x(a.title, null);
    a.description = x(a.description, null);
    a.onEnter = E(a.onEnter, null);
    a.onLeave = E(a.onLeave, null);
    a.onClose = E(a.onClose, null);
    a.onFinish = E(a.onFinish, null);
    a.onOpen = E(a.onOpen, null);
    return a;
  }
  function k(a) {
    return null !== a && void 0 !== a && a !== t.empty;
  }
  function R(a) {
    return k(a) && "object" === typeof a;
  }
  function v(a) {
    return k(a) && "string" === typeof a;
  }
  function W(a) {
    return k(a) && "function" === typeof a;
  }
  function ha(a) {
    return k(a) && "number" === typeof a;
  }
  function m(a, b) {
    var c = a.toLowerCase();
    var f = "text" === c;
    X.hasOwnProperty(c) || (X[c] = f ? r.createTextNode(t.empty) : r.createElement(c));
    c = X[c].cloneNode(!1);
    k(b) && (c.className = b);
    return c;
  }
  function ea() {
    var a = r.documentElement;
    return {left:(n.pageXOffset || a.scrollLeft) - (a.clientLeft || 0), top:(n.pageYOffset || a.scrollTop) - (a.clientTop || 0)};
  }
  function ba(a, b) {
    var c = null;
    n.getComputedStyle ? c = document.defaultView.getComputedStyle(a, null).getPropertyValue(b) : a.currentStyle && (c = a.currentStyle[b]);
    return c;
  }
  function V(a, b) {
    b ? "block" !== a.style.display && (a.style.display = "block") : "none" !== a.style.display && (a.style.display = "none");
  }
  function A(a) {
    W(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function x(a, b) {
    return v(a) ? a : b;
  }
  function p(a, b) {
    return k(a) && "boolean" === typeof a ? a : b;
  }
  function E(a, b) {
    return W(a) ? a : b;
  }
  function oa(a) {
    var b = !0, c = null;
    try {
      v(a) && (c = JSON.parse(a));
    } catch (f) {
      try {
        c = eval("(" + a + ")"), W(c) && (c = c());
      } catch (e) {
        d.safeMode || (console.error("Errors in object: " + f.message + ", " + e.message), b = !1), c = null;
      }
    }
    return {parsed:b, result:c};
  }
  function ja() {
    d.safeMode = p(d.safeMode, !0);
    var a = d, b = d.domElementTypes, c = ["*"];
    v(b) ? (b = b.split(t.space), 0 === b.length && (b = c)) : b = R(b) && b instanceof Array ? b : c;
    a.domElementTypes = b;
    d.backButtonText = x(d.backButtonText, "Back");
    d.nextButtonText = x(d.nextButtonText, "Next");
    d.finishButtonText = x(d.finishButtonText, "Finish");
    d.showCloseButton = p(d.showCloseButton, !0);
    d.shortcutKeysEnabled = p(d.shortcutKeysEnabled, !0);
    d.showProgressDots = p(d.showProgressDots, !0);
    d.browserUrlParametersEnabled = p(d.browserUrlParametersEnabled, !0);
    d.showProgressDotNumbers = p(d.showProgressDotNumbers, !1);
    d.showButtons = p(d.showButtons, !0);
    d.closeButtonToolTipText = x(d.closeButtonToolTipText, "Close");
    d.doNotShowAgainText = x(d.doNotShowAgainText, "Do not show again");
    d.showDoNotShowAgain = p(d.showDoNotShowAgain, !1);
    d.onDoNotShowAgainChange = E(d.onDoNotShowAgainChange, null);
  }
  var K = this, r = null, n = null, d = {}, C = !0, L = {escape:27, left:37, up:38, right:39, down:40}, t = {empty:"", space:" "}, X = {}, z = {}, l = [], h = 0, U = null, T = null, g = null, H = null, P = null, Q = null, I = null, N = null, w = null, D = null, J = null, O = null;
  this.start = function() {
    h = 0;
    u();
  };
  this.show = function() {
    h === l.length - 1 && (h = 0);
    u();
  };
  this.hide = function() {
    y();
  };
  this.isOpen = function() {
    return k(g) && "block" === g.style.display;
  };
  this.isComplete = function() {
    return h >= l.length - 1;
  };
  this.addStep = function(a, b) {
    fa(a, ia(b));
    l.sort();
    K.isOpen() && (y(), h = 0);
    return this;
  };
  this.setConfiguration = function(a) {
    d = R(a) ? a : {};
    ja();
    K.isOpen() && (y(), h = 0);
    return this;
  };
  this.getVersion = function() {
    return "1.0.0";
  };
  (function(a, b) {
    r = a;
    n = b;
    ja();
    r.addEventListener("DOMContentLoaded", function() {
      T = m("div", "journey-js-disabled-background");
      g = m("div", "journey-js-dialog");
      g.style.display = "none";
      r.body.appendChild(g);
      H = m("button", "close");
      H.title = d.closeButtonToolTipText;
      H.onclick = y;
      g.appendChild(H);
      P = m("div", "title");
      g.appendChild(P);
      Q = m("div", "description");
      g.appendChild(Q);
      I = m("div", "checkbox-container");
      g.appendChild(I);
      var c = m("label"), f = m("text");
      N = m("input");
      N.type = "checkbox";
      f.nodeValue = d.doNotShowAgainText;
      c.appendChild(N);
      c.appendChild(f);
      I.appendChild(c);
      w = m("div", "progress-dots");
      g.appendChild(w);
      D = m("div", "buttons");
      g.appendChild(D);
      J = m("button", "back");
      J.onclick = Z;
      D.appendChild(J);
      O = m("button", "next");
      O.onclick = aa;
      D.appendChild(O);
      c = d.domElementTypes;
      f = c.length;
      for (var e = 0; e < f; e++) {
        var q = r.getElementsByTagName(c[e]);
        q = [].slice.call(q);
        for (var M = q.length, F = 0; F < M; F++) {
          var S = q[F], Y = !0;
          if (k(S) && S.hasAttribute("data-journey-options")) {
            var G = S.getAttribute("data-journey-options");
            v(G) ? (G = oa(G), G.parsed && R(G.result) ? fa(S, ia(G.result)) : d.safeMode || (console.error("The attribute 'data-journey-options' is not a valid object."), Y = !1)) : d.safeMode || (console.error("The attribute 'data-journey-options' has not been set correctly."), Y = !1);
          }
          if (!Y) {
            break;
          }
        }
      }
      l.sort();
      f = void 0;
      c = (f = k(f) ? f : !0) ? r.addEventListener : r.removeEventListener;
      f = f ? n.addEventListener : n.removeEventListener;
      d.shortcutKeysEnabled && c("keydown", ma);
      f("resize", na);
      c = !1;
      if (d.browserUrlParametersEnabled) {
        f = {};
        e = n.location.href.split("?");
        if (1 < e.length) {
          for (e = e[1].split("&"), q = e.length, M = 0; M < q; M++) {
            F = e[M].split("="), f[F[0]] = F[1];
          }
        }
        k(f.sjOrderId) && (e = parseInt(f.sjOrderId, 10), !isNaN(e) && e <= l.length - 1 && (h = e));
        k(f.sjShow) && (c = "true" === f.sjShow);
      }
      c && K.show();
    });
    k(n.$journey) || (n.$journey = this);
  })(document, window);
})();