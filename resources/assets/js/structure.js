function scaleVideoContainer() {
    var t = $(window).height() + 5, e = parseInt(t) + "px";
    $(".homepage-hero-module").css("height", e)
}
function initBannerVideoSize(t) {
    $(t).each(function() {
        $(this).data("height", $(this).height()), $(this).data("width", $(this).width())
    }), scaleBannerVideoSize(t)
}
function scaleBannerVideoSize(t) {
    var n, a, e = $(window).width(), i = $(window).height() + 5;
    $(t).each(function() {
        var t = $(this).data("height") / $(this).data("width");
        $(this).width(e), 1e3 > e && (a = i, n = a / t, $(this).css({
            "margin-top": 0,
            "margin-left": - (n - e) / 2 + "px"
        }), $(this).width(n).height(a)), $(".homepage-hero-module .video-container video").addClass("fadeIn animated")
    })
}
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(t, e, i, n, a) {
        return jQuery.easing[jQuery.easing.def](t, e, i, n, a)
    },
    easeInQuad: function(t, e, i, n, a) {
        return n * (e/=a) * e + i
    },
    easeOutQuad: function(t, e, i, n, a) {
        return - n * (e/=a) * (e - 2) + i
    },
    easeInOutQuad: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e + i : - n / 2 * (--e * (e - 2) - 1) + i
    },
    easeInCubic: function(t, e, i, n, a) {
        return n * (e/=a) * e * e + i
    },
    easeOutCubic: function(t, e, i, n, a) {
        return n * ((e = e / a - 1) * e * e + 1) + i
    },
    easeInOutCubic: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i
    },
    easeInQuart: function(t, e, i, n, a) {
        return n * (e/=a) * e * e * e + i
    },
    easeOutQuart: function(t, e, i, n, a) {
        return - n * ((e = e / a - 1) * e * e * e - 1) + i
    },
    easeInOutQuart: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e * e * e + i : - n / 2 * ((e -= 2) * e * e * e - 2) + i
    },
    easeInQuint: function(t, e, i, n, a) {
        return n * (e/=a) * e * e * e * e + i
    },
    easeOutQuint: function(t, e, i, n, a) {
        return n * ((e = e / a - 1) * e * e * e * e + 1) + i
    },
    easeInOutQuint: function(t, e, i, n, a) {
        return (e/=a / 2) < 1 ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i
    },
    easeInSine: function(t, e, i, n, a) {
        return - n * Math.cos(e / a * (Math.PI / 2)) + n + i
    },
    easeOutSine: function(t, e, i, n, a) {
        return n * Math.sin(e / a * (Math.PI / 2)) + i
    },
    easeInOutSine: function(t, e, i, n, a) {
        return - n / 2 * (Math.cos(Math.PI * e / a) - 1) + i
    },
    easeInExpo: function(t, e, i, n, a) {
        return 0 == e ? i : n * Math.pow(2, 10 * (e / a - 1)) + i
    },
    easeOutExpo: function(t, e, i, n, a) {
        return e == a ? i + n : n * ( - Math.pow(2, - 10 * e / a) + 1) + i
    },
    easeInOutExpo: function(t, e, i, n, a) {
        return 0 == e ? i : e == a ? i + n : (e/=a / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * ( - Math.pow(2, - 10*--e) + 2) + i
    },
    easeInCirc: function(t, e, i, n, a) {
        return - n * (Math.sqrt(1 - (e/=a) * e) - 1) + i
    },
    easeOutCirc: function(t, e, i, n, a) {
        return n * Math.sqrt(1 - (e = e / a - 1) * e) + i
    },
    easeInOutCirc: function(t, e, i, n, a) {
        return (e/=a / 2) < 1?-n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
    },
    easeInElastic: function(t, e, i, n, a) {
        var o = 1.70158, s = 0, r = n;
        if (0 == e)
            return i;
        if (1 == (e/=a))
            return i + n;
        if (s || (s = .3 * a), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else
            var o = s / (2 * Math.PI) * Math.asin(n / r);
        return - (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s)) + i
    },
    easeOutElastic: function(t, e, i, n, a) {
        var o = 1.70158, s = 0, r = n;
        if (0 == e)
            return i;
        if (1 == (e/=a))
            return i + n;
        if (s || (s = .3 * a), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else
            var o = s / (2 * Math.PI) * Math.asin(n / r);
        return r * Math.pow(2, - 10 * e) * Math.sin((e * a - o) * (2 * Math.PI) / s) + n + i
    },
    easeInOutElastic: function(t, e, i, n, a) {
        var o = 1.70158, s = 0, r = n;
        if (0 == e)
            return i;
        if (2 == (e/=a / 2))
            return i + n;
        if (s || (s = a * (.3 * 1.5)), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else
            var o = s / (2 * Math.PI) * Math.asin(n / r);
        return 1 > e?-.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s)) + i : r * Math.pow(2, - 10 * (e -= 1)) * Math.sin((e * a - o) * (2 * Math.PI) / s) * .5 + n + i
    },
    easeInBack: function(t, e, i, n, a, o) {
        return void 0 == o && (o = 1.70158), n * (e/=a) * e * ((o + 1) * e - o) + i
    },
    easeOutBack: function(t, e, i, n, a, o) {
        return void 0 == o && (o = 1.70158), n * ((e = e / a - 1) * e * ((o + 1) * e + o) + 1) + i
    },
    easeInOutBack: function(t, e, i, n, a, o) {
        return void 0 == o && (o = 1.70158), (e/=a / 2) < 1 ? n / 2 * (e * e * (((o*=1.525) + 1) * e - o)) + i : n / 2 * ((e -= 2) * e * (((o*=1.525) + 1) * e + o) + 2) + i
    },
    easeInBounce: function(t, e, i, n, a) {
        return n - jQuery.easing.easeOutBounce(t, a - e, 0, n, a) + i
    },
    easeOutBounce: function(t, e, i, n, a) {
        return (e/=a) < 1 / 2.75 ? n * (7.5625 * e * e) + i : 2 / 2.75 > e ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : 2.5 / 2.75 > e ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
    },
    easeInOutBounce: function(t, e, i, n, a) {
        return a / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, a) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - a, 0, n, a) + .5 * n + i
    }
}), function(t) {
    t.Package ? Materialize = {} : t.Materialize = {}
}(window), Materialize.guid = function() {
    function t() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return function() {
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
    }
}(), Materialize.elementOrParentIsFixed = function(t) {
    var e = $(t), i = e.add(e.parents()), n=!1;
    return i.each(function() {
        return "fixed" === $(this).css("position") ? (n=!0, !1) : void 0
    }), n
};
var Vel;
Vel = $ ? $.Velocity : jQuery ? jQuery.Velocity : Velocity, jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (!function(t) {
    function e(t) {
        var e = t.length, n = i.type(t);
        return "function" === n || i.isWindow(t)?!1 : 1 === t.nodeType && e?!0 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }
    if (!t.jQuery) {
        var i = function(t, e) {
            return new i.fn.init(t, e)
        };
        i.isWindow = function(t) {
            return null != t && t == t.window
        }, i.type = function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? a[s.call(t)] || "object" : typeof t
        }, i.isArray = Array.isArray || function(t) {
            return "array" === i.type(t)
        }, i.isPlainObject = function(t) {
            var e;
            if (!t || "object" !== i.type(t) || t.nodeType || i.isWindow(t))
                return !1;
            try {
                if (t.constructor&&!o.call(t, "constructor")&&!o.call(t.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            for (e in t);
            return void 0 === e || o.call(t, e)
        }, i.each = function(t, i, n) {
            var a, o = 0, s = t.length, r = e(t);
            if (n) {
                if (r)
                    for (; s > o && (a = i.apply(t[o], n), a!==!1); o++);
                else
                    for (o in t)
                        if (a = i.apply(t[o], n), a===!1)
                            break
            } else if (r)
                for (; s > o && (a = i.call(t[o], o, t[o]), a!==!1); o++);
            else
                for (o in t)
                    if (a = i.call(t[o], o, t[o]), a===!1)
                        break;
            return t
        }, i.data = function(t, e, a) {
            if (void 0 === a) {
                var o = t[i.expando], s = o && n[o];
                if (void 0 === e)
                    return s;
                if (s && e in s)
                    return s[e]
            } else if (void 0 !== e) {
                var o = t[i.expando] || (t[i.expando]=++i.uuid);
                return n[o] = n[o] || {}, n[o][e] = a, a
            }
        }, i.removeData = function(t, e) {
            var a = t[i.expando], o = a && n[a];
            o && i.each(e, function(t, e) {
                delete o[e]
            })
        }, i.extend = function() {
            var t, e, n, a, o, s, r = arguments[0] || {}, l = 1, c = arguments.length, u=!1;
            for ("boolean" == typeof r && (u = r, r = arguments[l] || {}, l++), "object" != typeof r && "function" !== i.type(r) && (r = {}), l === c && (r = this, l--); c > l; l++)
                if (null != (o = arguments[l]))
                    for (a in o)
                        t = r[a], n = o[a], r !== n && (u && n && (i.isPlainObject(n) || (e = i.isArray(n))) ? (e ? (e=!1, s = t && i.isArray(t) ? t : []) : s = t && i.isPlainObject(t) ? t : {}, r[a] = i.extend(u, s, n)) : void 0 !== n && (r[a] = n));
            return r
        }, i.queue = function(t, n, a) {
            function o(t, i) {
                var n = i || [];
                return null != t && (e(Object(t))?!function(t, e) {
                    for (var i =+ e.length, n = 0, a = t.length; i > n;)
                        t[a++] = e[n++];
                    if (i !== i)
                        for (; void 0 !== e[n];)
                            t[a++] = e[n++];
                    return t.length = a, t
                }(n, "string" == typeof t ? [t] : t) : [].push.call(n, t)), n
            }
            if (t) {
                n = (n || "fx") + "queue";
                var s = i.data(t, n);
                return a ? (!s || i.isArray(a) ? s = i.data(t, n, o(a)) : s.push(a), s) : s || []
            }
        }, i.dequeue = function(t, e) {
            i.each(t.nodeType ? [t] : t, function(t, n) {
                e = e || "fx";
                var a = i.queue(n, e), o = a.shift();
                "inprogress" === o && (o = a.shift()), o && ("fx" === e && a.unshift("inprogress"), o.call(n, function() {
                    i.dequeue(n, e)
                }))
            })
        }, i.fn = i.prototype = {
            init: function(t) {
                if (t.nodeType)
                    return this[0] = t, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect(): {
                    top: 0,
                    left: 0
                };
                return {
                    top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function t() {
                    for (var t = this.offsetParent || document; t && "html"===!t.nodeType.toLowerCase && "static" === t.style.position;)
                        t = t.offsetParent;
                    return t || document
                }
                var e = this[0], t = t.apply(e), n = this.offset(), a = /^(?:body|html)$/i.test(t.nodeName) ? {
                    top: 0,
                    left: 0
                }
                : i(t).offset();
                return n.top -= parseFloat(e.style.marginTop) || 0, n.left -= parseFloat(e.style.marginLeft) || 0, t.style && (a.top += parseFloat(t.style.borderTopWidth) || 0, a.left += parseFloat(t.style.borderLeftWidth) || 0), {
                    top: n.top - a.top,
                    left: n.left - a.left
                }
            }
        };
        var n = {};
        i.expando = "velocity" + (new Date).getTime(), i.uuid = 0;
        for (var a = {}, o = a.hasOwnProperty, s = a.toString, r = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < r.length; l++)
            a["[object " + r[l] + "]"] = r[l].toLowerCase();
        i.fn.init.prototype = i.fn, t.Velocity = {
            Utilities: i
        }
    }
}(window), function(t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : t()
}(function() {
    return function(t, e, i, n) {
        function a(t) {
            for (var e =- 1, i = t ? t.length : 0, n = []; ++e < i;) {
                var a = t[e];
                a && n.push(a)
            }
            return n
        }
        function o(t) {
            return m.isWrapped(t) ? t = [].slice.call(t) : m.isNode(t) && (t = [t]), t
        }
        function s(t) {
            var e = f.data(t, "velocity");
            return null === e ? n : e
        }
        function r(t) {
            return function(e) {
                return Math.round(e * t) * (1 / t)
            }
        }
        function l(t, i, n, a) {
            function o(t, e) {
                return 1 - 3 * e + 3 * t
            }
            function s(t, e) {
                return 3 * e - 6 * t
            }
            function r(t) {
                return 3 * t
            }
            function l(t, e, i) {
                return ((o(e, i) * t + s(e, i)) * t + r(e)) * t
            }
            function c(t, e, i) {
                return 3 * o(e, i) * t * t + 2 * s(e, i) * t + r(e)
            }
            function u(e, i) {
                for (var a = 0; m > a; ++a) {
                    var o = c(i, t, n);
                    if (0 === o)
                        return i;
                    var s = l(i, t, n) - e;
                    i -= s / o
                }
                return i
            }
            function h() {
                for (var e = 0; b > e; ++e)
                    S[e] = l(e * w, t, n)
            }
            function f(e, i, a) {
                var o, s, r = 0;
                do
                    s = i + (a - i) / 2, o = l(s, t, n) - e, o > 0 ? a = s : i = s;
                while (Math.abs(o) > g&&++r < y);
                return s
            }
            function d(e) {
                for (var i = 0, a = 1, o = b - 1; a != o && S[a] <= e; ++a)
                    i += w;
                --a;
                var s = (e - S[a]) / (S[a + 1] - S[a]), r = i + s * w, l = c(r, t, n);
                return l >= v ? u(e, r) : 0 == l ? r : f(e, i, i + w)
            }
            function p() {
                k=!0, (t != i || n != a) && h()
            }
            var m = 4, v = .001, g = 1e-7, y = 10, b = 11, w = 1 / (b - 1), x = "Float32Array"in e;
            if (4 !== arguments.length)
                return !1;
            for (var C = 0; 4 > C; ++C)
                if ("number" != typeof arguments[C] || isNaN(arguments[C]) ||!isFinite(arguments[C]))
                    return !1;
            t = Math.min(t, 1), n = Math.min(n, 1), t = Math.max(t, 0), n = Math.max(n, 0);
            var S = x ? new Float32Array(b): new Array(b), k=!1, P = function(e) {
                return k || p(), t === i && n === a ? e : 0 === e ? 0 : 1 === e ? 1 : l(d(e), i, a)
            };
            P.getControlPoints = function() {
                return [{
                    x: t,
                    y: i
                }, {
                    x: n,
                    y: a
                }
                ]
            };
            var T = "generateBezier(" + [t, i, n, a] + ")";
            return P.toString = function() {
                return T
            }, P
        }
        function c(t, e) {
            var i = t;
            return m.isString(t) ? b.Easings[t] || (i=!1) : i = m.isArray(t) && 1 === t.length ? r.apply(null, t) : m.isArray(t) && 2 === t.length ? w.apply(null, t.concat([e])) : m.isArray(t) && 4 === t.length ? l.apply(null, t) : !1, i===!1 && (i = b.Easings[b.defaults.easing] ? b.defaults.easing : y), i
        }
        function u(t) {
            if (t) {
                var e = (new Date).getTime(), i = b.State.calls.length;
                i > 1e4 && (b.State.calls = a(b.State.calls));
                for (var o = 0; i > o; o++)
                    if (b.State.calls[o]) {
                        var r = b.State.calls[o], l = r[0], c = r[2], d = r[3], p=!!d, v = null;
                        d || (d = b.State.calls[o][3] = e - 16);
                        for (var g = Math.min((e - d) / c.duration, 1), y = 0, w = l.length; w > y; y++) {
                            var C = l[y], k = C.element;
                            if (s(k)) {
                                var P=!1;
                                if (c.display !== n && null !== c.display && "none" !== c.display) {
                                    if ("flex" === c.display) {
                                        var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        f.each(T, function(t, e) {
                                            x.setPropertyValue(k, "display", e)
                                        })
                                    }
                                    x.setPropertyValue(k, "display", c.display)
                                }
                                c.visibility !== n && "hidden" !== c.visibility && x.setPropertyValue(k, "visibility", c.visibility);
                                for (var A in C)
                                    if ("element" !== A) {
                                        var E, M = C[A], L = m.isString(M.easing) ? b.Easings[M.easing]: M.easing;
                                        if (1 === g)
                                            E = M.endValue;
                                        else {
                                            var F = M.endValue - M.startValue;
                                            if (E = M.startValue + F * L(g, c, F), !p && E === M.currentValue)
                                                continue
                                        }
                                        if (M.currentValue = E, "tween" === A)
                                            v = E;
                                        else {
                                            if (x.Hooks.registered[A]) {
                                                var O = x.Hooks.getRoot(A), I = s(k).rootPropertyValueCache[O];
                                                I && (M.rootPropertyValue = I)
                                            }
                                            var R = x.setPropertyValue(k, A, M.currentValue + (0 === parseFloat(E) ? "" : M.unitType), M.rootPropertyValue, M.scrollData);
                                            x.Hooks.registered[A] && (s(k).rootPropertyValueCache[O] = x.Normalizations.registered[O] ? x.Normalizations.registered[O]("extract", null, R[1]) : R[1]), "transform" === R[0] && (P=!0)
                                        }
                                    }
                                    c.mobileHA && s(k).transformCache.translate3d === n && (s(k).transformCache.translate3d = "(0px, 0px, 0px)", P=!0), P && x.flushTransformCache(k)
                                }
                            }
                            c.display !== n && "none" !== c.display && (b.State.calls[o][2].display=!1), c.visibility !== n && "hidden" !== c.visibility && (b.State.calls[o][2].visibility=!1), c.progress && c.progress.call(r[1], r[1], g, Math.max(0, d + c.duration - e), d, v), 1 === g && h(o)
                        }
                }
            b.State.isTicking && S(u)
        }
        function h(t, e) {
            if (!b.State.calls[t])
                return !1;
            for (var i = b.State.calls[t][0], a = b.State.calls[t][1], o = b.State.calls[t][2], r = b.State.calls[t][4], l=!1, c = 0, u = i.length; u > c; c++) {
                var h = i[c].element;
                if (e || o.loop || ("none" === o.display && x.setPropertyValue(h, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(h, "visibility", o.visibility)), o.loop!==!0 && (f.queue(h)[1] === n ||!/\.velocityQueueEntryFlag/i.test(f.queue(h)[1])) && s(h)) {
                    s(h).isAnimating=!1, s(h).rootPropertyValueCache = {};
                    var d=!1;
                    f.each(x.Lists.transforms3D, function(t, e) {
                        var i = /^scale/.test(e) ? 1: 0, a = s(h).transformCache[e];
                        s(h).transformCache[e] !== n && new RegExp("^\\(" + i + "[^.]").test(a) && (d=!0, delete s(h).transformCache[e])
                    }), o.mobileHA && (d=!0, delete s(h).transformCache.translate3d), d && x.flushTransformCache(h), x.Values.removeClass(h, "velocity-animating")
                }
                if (!e && o.complete&&!o.loop && c === u - 1)
                    try {
                        o.complete.call(a, a)
                    } catch (p) {
                    setTimeout(function() {
                        throw p
                    }, 1)
                }
                r && o.loop!==!0 && r(a), s(h) && o.loop===!0&&!e && (f.each(s(h).tweensContainer, function(t, e) {
                    /^rotate/.test(t) && 360 === parseFloat(e.endValue) && (e.endValue = 0, e.startValue = 360), /^backgroundPosition/.test(t) && 100 === parseFloat(e.endValue) && "%" === e.unitType && (e.endValue = 0, e.startValue = 100)
                }), b(h, "reverse", {
                    loop: !0,
                    delay: o.delay
                })), o.queue!==!1 && f.dequeue(h, o.queue)
            }
            b.State.calls[t]=!1;
            for (var m = 0, v = b.State.calls.length; v > m; m++)
                if (b.State.calls[m]!==!1) {
                    l=!0;
                    break
                }
            l===!1 && (b.State.isTicking=!1, delete b.State.calls, b.State.calls = [])
        }
        var f, d = function() {
            if (i.documentMode)
                return i.documentMode;
            for (var t = 7; t > 4; t--) {
                var e = i.createElement("div");
                if (e.innerHTML = "<!--[if IE " + t + "]><span></span><![endif]-->", e.getElementsByTagName("span").length)
                    return e = null, t
            }
            return n
        }(), p = function() {
            var t = 0;
            return e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function(e) {
                var i, n = (new Date).getTime();
                return i = Math.max(0, 16 - (n - t)), t = n + i, setTimeout(function() {
                    e(n + i)
                }, i)
            }
        }(), m = {
            isString: function(t) {
                return "string" == typeof t
            },
            isArray: Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            isFunction: function(t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            },
            isNode: function(t) {
                return t && t.nodeType
            },
            isNodeList: function(t) {
                return "object" == typeof t && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(t)) && t.length !== n && (0 === t.length || "object" == typeof t[0] && t[0].nodeType > 0)
            },
            isWrapped: function(t) {
                return t && (t.jquery || e.Zepto && e.Zepto.zepto.isZ(t))
            },
            isSVG: function(t) {
                return e.SVGElement && t instanceof e.SVGElement
            },
            isEmptyObject: function(t) {
                for (var e in t)
                    return !1;
                return !0
            }
        }, v=!1;
        if (t.fn && t.fn.jquery ? (f = t, v=!0) : f = e.Velocity.Utilities, 8 >= d&&!v)
            throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= d)
            return void(jQuery.fn.velocity = jQuery.fn.animate);
        var g = 400, y = "swing", b = {
            State: {
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isAndroid: /Android/i.test(navigator.userAgent),
                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                isChrome: e.chrome,
                isFirefox: /Firefox/i.test(navigator.userAgent),
                prefixElement: i.createElement("div"),
                prefixMatches: {},
                scrollAnchor: null,
                scrollPropertyLeft: null,
                scrollPropertyTop: null,
                isTicking: !1,
                calls: []
            },
            CSS: {},
            Utilities: f,
            Redirects: {},
            Easings: {},
            Promise: e.Promise,
            defaults: {
                queue: "",
                duration: g,
                easing: y,
                begin: n,
                complete: n,
                progress: n,
                display: n,
                visibility: n,
                loop: !1,
                delay: !1,
                mobileHA: !0,
                _cacheValues: !0
            },
            init: function(t) {
                f.data(t, "velocity", {
                    isSVG: m.isSVG(t),
                    isAnimating: !1,
                    computedStyle: null,
                    tweensContainer: null,
                    rootPropertyValueCache: {},
                    transformCache: {}
                })
            },
            hook: null,
            mock: !1,
            version: {
                major: 1,
                minor: 2,
                patch: 2
            },
            debug: !1
        };
        e.pageYOffset !== n ? (b.State.scrollAnchor = e, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = i.documentElement || i.body.parentNode || i.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");
        var w = function() {
            function t(t) {
                return - t.tension * t.x - t.friction * t.v
            }
            function e(e, i, n) {
                var a = {
                    x: e.x + n.dx * i,
                    v: e.v + n.dv * i,
                    tension: e.tension,
                    friction: e.friction
                };
                return {
                    dx: a.v,
                    dv: t(a)
                }
            }
            function i(i, n) {
                var a = {
                    dx: i.v,
                    dv: t(i)
                }, o = e(i, .5 * n, a), s = e(i, .5 * n, o), r = e(i, n, s), l = 1 / 6 * (a.dx + 2 * (o.dx + s.dx) + r.dx), c = 1 / 6 * (a.dv + 2 * (o.dv + s.dv) + r.dv);
                return i.x = i.x + l * n, i.v = i.v + c * n, i
            }
            return function n(t, e, a) {
                var o, s, r, l = {
                    x: - 1,
                    v: 0,
                    tension: null,
                    friction: null
                }, c = [0], u = 0, h = 1e-4, f = .016;
                for (t = parseFloat(t) || 500, e = parseFloat(e) || 20, a = a || null, l.tension = t, l.friction = e, o = null !== a, o ? (u = n(t, e), s = u / a * f) : s = f; r = i(r || l, s), c.push(1 + r.x), u += 16, Math.abs(r.x) > h && Math.abs(r.v) > h;);
                return o ? function(t) {
                    return c[t * (c.length - 1) | 0]
                } : u
            }
        }();
        b.Easings = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            spring: function(t) {
                return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6*-t)
            }
        }, f.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function(t, e) {
            b.Easings[e[0]] = l.apply(null, e[1])
        });
        var x = b.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var t = 0; t < x.Lists.colors.length; t++) {
                        var e = "color" === x.Lists.colors[t] ? "0 0 0 1": "255 255 255 1";
                        x.Hooks.templates[x.Lists.colors[t]] = ["Red Green Blue Alpha", e]
                    }
                    var i, n, a;
                    if (d)
                        for (i in x.Hooks.templates) {
                            n = x.Hooks.templates[i], a = n[0].split(" ");
                            var o = n[1].match(x.RegEx.valueSplit);
                            "Color" === a[0] && (a.push(a.shift()), o.push(o.shift()), x.Hooks.templates[i] = [a.join(" "), o.join(" ")])
                        }
                    for (i in x.Hooks.templates) {
                        n = x.Hooks.templates[i], a = n[0].split(" ");
                        for (var t in a) {
                            var s = i + a[t], r = t;
                            x.Hooks.registered[s] = [i, r]
                        }
                    }
                },
                getRoot: function(t) {
                    var e = x.Hooks.registered[t];
                    return e ? e[0] : t
                },
                cleanRootPropertyValue: function(t, e) {
                    return x.RegEx.valueUnwrap.test(e) && (e = e.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(e) && (e = x.Hooks.templates[t][1]), e
                },
                extractValue: function(t, e) {
                    var i = x.Hooks.registered[t];
                    if (i) {
                        var n = i[0], a = i[1];
                        return e = x.Hooks.cleanRootPropertyValue(n, e), e.toString().match(x.RegEx.valueSplit)[a]
                    }
                    return e
                },
                injectValue: function(t, e, i) {
                    var n = x.Hooks.registered[t];
                    if (n) {
                        var a, o, s = n[0], r = n[1];
                        return i = x.Hooks.cleanRootPropertyValue(s, i), a = i.toString().match(x.RegEx.valueSplit), a[r] = e, o = a.join(" ")
                    }
                    return i
                }
            },
            Normalizations: {
                registered: {
                    clip: function(t, e, i) {
                        switch (t) {
                        case"name":
                            return "clip";
                        case"extract":
                            var n;
                            return x.RegEx.wrappedValueAlreadyExtracted.test(i) ? n = i : (n = i.toString().match(x.RegEx.valueUnwrap), n = n ? n[1].replace(/,(\s+)?/g, " ") : i), n;
                        case"inject":
                            return "rect(" + i + ")"
                        }
                    },
                    blur: function(t, e, i) {
                        switch (t) {
                        case"name":
                            return b.State.isFirefox ? "filter" : "-webkit-filter";
                        case"extract":
                            var n = parseFloat(i);
                            if (!n && 0 !== n) {
                                var a = i.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                n = a ? a[1] : 0
                            }
                            return n;
                        case"inject":
                            return parseFloat(i) ? "blur(" + i + ")" : "none"
                        }
                    },
                    opacity: function(t, e, i) {
                        if (8 >= d)
                            switch (t) {
                            case"name":
                                return "filter";
                            case"extract":
                                var n = i.toString().match(/alpha\(opacity=(.*)\)/i);
                                return i = n ? n[1] / 100 : 1;
                            case"inject":
                                return e.style.zoom = 1, parseFloat(i) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(i), 10) + ")"
                            } else
                                switch (t) {
                                case"name":
                                    return "opacity";
                                case"extract":
                                    return i;
                                case"inject":
                                    return i
                                }
                    }
                },
                register: function() {
                    9 >= d || b.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
                    for (var t = 0; t < x.Lists.transformsBase.length; t++)
                        !function() {
                            var e = x.Lists.transformsBase[t];
                            x.Normalizations.registered[e] = function(t, i, a) {
                                switch (t) {
                                case"name":
                                    return "transform";
                                case"extract":
                                    return s(i) === n || s(i).transformCache[e] === n ? /^scale/i.test(e) ? 1 : 0 : s(i).transformCache[e].replace(/[()]/g, "");
                                case"inject":
                                    var o=!1;
                                    switch (e.substr(0, e.length - 1)) {
                                    case"translate":
                                        o=!/(%|px|em|rem|vw|vh|\d)$/i.test(a);
                                        break;
                                    case"scal":
                                    case"scale":
                                        b.State.isAndroid && s(i).transformCache[e] === n && 1 > a && (a = 1), o=!/(\d)$/i.test(a);
                                        break;
                                    case"skew":
                                        o=!/(deg|\d)$/i.test(a);
                                        break;
                                    case"rotate":
                                        o=!/(deg|\d)$/i.test(a)
                                    }
                                    return o || (s(i).transformCache[e] = "(" + a + ")"), s(i).transformCache[e]
                                }
                            }
                        }();
                    for (var t = 0; t < x.Lists.colors.length; t++)
                        !function() {
                            var e = x.Lists.colors[t];
                            x.Normalizations.registered[e] = function(t, i, a) {
                                switch (t) {
                                case"name":
                                    return e;
                                case"extract":
                                    var o;
                                    if (x.RegEx.wrappedValueAlreadyExtracted.test(a))
                                        o = a;
                                    else {
                                        var s, r = {
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            red: "rgb(255, 0, 0)",
                                            white: "rgb(255, 255, 255)"
                                        };
                                        /^[A-z]+$/i.test(a) ? s = r[a] !== n ? r[a] : r.black : x.RegEx.isHex.test(a) ? s = "rgb(" + x.Values.hexToRgb(a).join(" ") + ")" : /^rgba?\(/i.test(a) || (s = r.black), o = (s || a).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return 8 >= d || 3 !== o.split(" ").length || (o += " 1"), o;
                                case"inject":
                                    return 8 >= d ? 4 === a.split(" ").length && (a = a.split(/\s+/).slice(0, 3).join(" ")) : 3 === a.split(" ").length && (a += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + a.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                }
            },
            Names: {
                camelCase: function(t) {
                    return t.replace(/-(\w)/g, function(t, e) {
                        return e.toUpperCase()
                    })
                },
                SVGAttribute: function(t) {
                    var e = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (d || b.State.isAndroid&&!b.State.isChrome) && (e += "|transform"), new RegExp("^(" + e + ")$", "i").test(t)
                },
                prefixCheck: function(t) {
                    if (b.State.prefixMatches[t])
                        return [b.State.prefixMatches[t], !0];
                    for (var e = ["", "Webkit", "Moz", "ms", "O"], i = 0, n = e.length; n > i; i++) {
                        var a;
                        if (a = 0 === i ? t : e[i] + t.replace(/^\w/, function(t) {
                            return t.toUpperCase()
                        }), m.isString(b.State.prefixElement.style[a]))
                            return b.State.prefixMatches[t] = a, [a, !0]
                    }
                    return [t, !1]
                }
            },
            Values: {
                hexToRgb: function(t) {
                    var e, i = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return t = t.replace(i, function(t, e, i, n) {
                        return e + e + i + i + n + n
                    }), e = n.exec(t), e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(t) {
                    return 0 == t || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(t)
                },
                getUnitType: function(t) {
                    return /^(rotate|skew)/i.test(t) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(t) ? "" : "px"
                },
                getDisplayType: function(t) {
                    var e = t && t.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e) ? "inline" : /^(li)$/i.test(e) ? "list-item" : /^(tr)$/i.test(e) ? "table-row" : /^(table)$/i.test(e) ? "table" : /^(tbody)$/i.test(e) ? "table-row-group" : "block"
                },
                addClass: function(t, e) {
                    t.classList ? t.classList.add(e) : t.className += (t.className.length ? " " : "") + e
                },
                removeClass: function(t, e) {
                    t.classList ? t.classList.remove(e) : t.className = t.className.toString().replace(new RegExp("(^|\\s)" + e.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                }
            },
            getPropertyValue: function(t, i, a, o) {
                function r(t, i) {
                    function a() {
                        c && x.setPropertyValue(t, "display", "none")
                    }
                    var l = 0;
                    if (8 >= d)
                        l = f.css(t, i);
                    else {
                        var c=!1;
                        if (/^(width|height)$/.test(i) && 0 === x.getPropertyValue(t, "display") && (c=!0, x.setPropertyValue(t, "display", x.Values.getDisplayType(t))), !o) {
                            if ("height" === i && "border-box" !== x.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                var u = t.offsetHeight - (parseFloat(x.getPropertyValue(t, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingBottom")) || 0);
                                return a(), u
                            }
                            if ("width" === i && "border-box" !== x.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                var h = t.offsetWidth - (parseFloat(x.getPropertyValue(t, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(t, "paddingRight")) || 0);
                                return a(), h
                            }
                        }
                        var p;
                        p = s(t) === n ? e.getComputedStyle(t, null) : s(t).computedStyle ? s(t).computedStyle : s(t).computedStyle = e.getComputedStyle(t, null), "borderColor" === i && (i = "borderTopColor"), l = 9 === d && "filter" === i ? p.getPropertyValue(i) : p[i], ("" === l || null === l) && (l = t.style[i]), a()
                    }
                    if ("auto" === l && /^(top|right|bottom|left)$/i.test(i)) {
                        var m = r(t, "position");
                        ("fixed" === m || "absolute" === m && /top|left/i.test(i)) && (l = f(t).position()[i] + "px")
                    }
                    return l
                }
                var l;
                if (x.Hooks.registered[i]) {
                    var c = i, u = x.Hooks.getRoot(c);
                    a === n && (a = x.getPropertyValue(t, x.Names.prefixCheck(u)[0])), x.Normalizations.registered[u] && (a = x.Normalizations.registered[u]("extract", t, a)), l = x.Hooks.extractValue(c, a)
                } else if (x.Normalizations.registered[i]) {
                    var h, p;
                    h = x.Normalizations.registered[i]("name", t), "transform" !== h && (p = r(t, x.Names.prefixCheck(h)[0]), x.Values.isCSSNullValue(p) && x.Hooks.templates[i] && (p = x.Hooks.templates[i][1])), l = x.Normalizations.registered[i]("extract", t, p)
                }
                if (!/^[\d-]/.test(l))
                    if (s(t) && s(t).isSVG && x.Names.SVGAttribute(i))
                        if (/^(height|width)$/i.test(i))
                            try {
                                l = t.getBBox()[i]
                            } catch (m) {
                    l = 0
                } else
                    l = t.getAttribute(i);
                    else
                        l = r(t, x.Names.prefixCheck(i)[0]);
            return x.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + i + ": " + l), l
        },
        setPropertyValue: function(t, i, n, a, o) {
            var r = i;
            if ("scroll" === i)
                o.container ? o.container["scroll" + o.direction] = n : "Left" === o.direction ? e.scrollTo(n, o.alternateValue) : e.scrollTo(o.alternateValue, n);
            else if (x.Normalizations.registered[i] && "transform" === x.Normalizations.registered[i]("name", t))
                x.Normalizations.registered[i]("inject", t, n), r = "transform", n = s(t).transformCache[i];
            else {
                if (x.Hooks.registered[i]) {
                    var l = i, c = x.Hooks.getRoot(i);
                    a = a || x.getPropertyValue(t, c), n = x.Hooks.injectValue(l, n, a), i = c
                }
                if (x.Normalizations.registered[i] && (n = x.Normalizations.registered[i]("inject", t, n), i = x.Normalizations.registered[i]("name", t)), r = x.Names.prefixCheck(i)[0], 8 >= d)
                    try {
                        t.style[r] = n
                } catch (u) {
                    b.debug && console.log("Browser does not support [" + n + "] for [" + r + "]")
                } else
                    s(t) && s(t).isSVG && x.Names.SVGAttribute(i) ? t.setAttribute(i, n) : t.style[r] = n;
                b.debug >= 2 && console.log("Set " + i + " (" + r + "): " + n)
            }
            return [r, n]
        },
        flushTransformCache: function(t) {
            function e(e) {
                return parseFloat(x.getPropertyValue(t, e))
            }
            var i = "";
            if ((d || b.State.isAndroid&&!b.State.isChrome) && s(t).isSVG) {
                var n = {
                    translate: [e("translateX"), e("translateY")],
                    skewX: [e("skewX")],
                    skewY: [e("skewY")],
                    scale: 1 !== e("scale") ? [e("scale"), e("scale")]: [e("scaleX"), e("scaleY")],
                    rotate: [e("rotateZ"), 0, 0]
                };
                f.each(s(t).transformCache, function(t) {
                    /^translate/i.test(t) ? t = "translate" : /^scale/i.test(t) ? t = "scale" : /^rotate/i.test(t) && (t = "rotate"), n[t] && (i += t + "(" + n[t].join(" ") + ") ", delete n[t])
                })
            } else {
                var a, o;
                f.each(s(t).transformCache, function(e) {
                    return a = s(t).transformCache[e], "transformPerspective" === e ? (o = a, !0) : (9 === d && "rotateZ" === e && (e = "rotate"), void(i += e + a + " "))
                }), o && (i = "perspective" + o + " " + i)
            }
            x.setPropertyValue(t, "transform", i)
        }
    };
    x.Hooks.register(), x.Normalizations.register(), b.hook = function(t, e, i) {
        var a = n;
        return t = o(t), f.each(t, function(t, o) {
            if (s(o) === n && b.init(o), i === n)
                a === n && (a = b.CSS.getPropertyValue(o, e));
            else {
                var r = b.CSS.setPropertyValue(o, e, i);
                "transform" === r[0] && b.CSS.flushTransformCache(o), a = r
            }
        }), a
    };
    var C = function() {
        function t() {
            return r ? A.promise || null : l
        }
        function a() {
            function t(t) {
                function h(t, e) {
                    var i = n, a = n, s = n;
                    return m.isArray(t) ? (i = t[0], !m.isArray(t[1]) && /^[\d-]/.test(t[1]) || m.isFunction(t[1]) || x.RegEx.isHex.test(t[1]) ? s = t[1] : (m.isString(t[1])&&!x.RegEx.isHex.test(t[1]) || m.isArray(t[1])) && (a = e ? t[1] : c(t[1], r.duration), t[2] !== n && (s = t[2]))) : i = t, e || (a = a || r.easing), m.isFunction(i) && (i = i.call(o, k, S)), m.isFunction(s) && (s = s.call(o, k, S)), [i || 0, a, s]
                }
                function d(t, e) {
                    var i, n;
                    return n = (e || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(t) {
                        return i = t, ""
                    }), i || (i = x.Values.getUnitType(t)), [n, i]
                }
                function g() {
                    var t = {
                        myParent: o.parentNode || i.body,
                        position: x.getPropertyValue(o, "position"),
                        fontSize: x.getPropertyValue(o, "fontSize")
                    }, n = t.position === R.lastPosition && t.myParent === R.lastParent, a = t.fontSize === R.lastFontSize;
                    R.lastParent = t.myParent, R.lastPosition = t.position, R.lastFontSize = t.fontSize;
                    var r = 100, l = {};
                    if (a && n)
                        l.emToPx = R.lastEmToPx, l.percentToPxWidth = R.lastPercentToPxWidth, l.percentToPxHeight = R.lastPercentToPxHeight;
                    else {
                        var c = s(o).isSVG ? i.createElementNS("http://www.w3.org/2000/svg", "rect"): i.createElement("div");
                        b.init(c), t.myParent.appendChild(c), f.each(["overflow", "overflowX", "overflowY"], function(t, e) {
                            b.CSS.setPropertyValue(c, e, "hidden")
                        }), b.CSS.setPropertyValue(c, "position", t.position), b.CSS.setPropertyValue(c, "fontSize", t.fontSize), b.CSS.setPropertyValue(c, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(t, e) {
                            b.CSS.setPropertyValue(c, e, r + "%")
                        }), b.CSS.setPropertyValue(c, "paddingLeft", r + "em"), l.percentToPxWidth = R.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(c, "width", null, !0)) || 1) / r, l.percentToPxHeight = R.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(c, "height", null, !0)) || 1) / r, l.emToPx = R.lastEmToPx = (parseFloat(x.getPropertyValue(c, "paddingLeft")) || 1) / r, t.myParent.removeChild(c)
                    }
                    return null === R.remToPx && (R.remToPx = parseFloat(x.getPropertyValue(i.body, "fontSize")) || 16), null === R.vwToPx && (R.vwToPx = parseFloat(e.innerWidth) / 100, R.vhToPx = parseFloat(e.innerHeight) / 100), l.remToPx = R.remToPx, l.vwToPx = R.vwToPx, l.vhToPx = R.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l
                }
                if (r.begin && 0 === k)
                    try {
                        r.begin.call(p, p)
                } catch (w) {
                    setTimeout(function() {
                        throw w
                    }, 1)
                }
                if ("scroll" === E) {
                    var C, P, T, M = /^x$/i.test(r.axis) ? "Left": "Top", L = parseFloat(r.offset) || 0;
                    r.container ? m.isWrapped(r.container) || m.isNode(r.container) ? (r.container = r.container[0] || r.container, C = r.container["scroll" + M], T = C + f(o).position()[M.toLowerCase()] + L) : r.container = null : (C = b.State.scrollAnchor[b.State["scrollProperty" + M]], P = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === M ? "Top" : "Left")]], T = f(o).offset()[M.toLowerCase()] + L), l = {
                        scroll: {
                            rootPropertyValue: !1,
                            startValue: C,
                            currentValue: C,
                            endValue: T,
                            unitType: "",
                            easing: r.easing,
                            scrollData: {
                                container: r.container,
                                direction: M,
                                alternateValue: P
                            }
                        },
                        element: o
                    }, b.debug && console.log("tweensContainer (scroll): ", l.scroll, o)
                } else if ("reverse" === E) {
                    if (!s(o).tweensContainer)
                        return void f.dequeue(o, r.queue);
                    "none" === s(o).opts.display && (s(o).opts.display = "auto"), "hidden" === s(o).opts.visibility && (s(o).opts.visibility = "visible"), s(o).opts.loop=!1, s(o).opts.begin = null, s(o).opts.complete = null, y.easing || delete r.easing, y.duration || delete r.duration, r = f.extend({}, s(o).opts, r);
                    var F = f.extend(!0, {}, s(o).tweensContainer);
                    for (var O in F)
                        if ("element" !== O) {
                            var I = F[O].startValue;
                            F[O].startValue = F[O].currentValue = F[O].endValue, F[O].endValue = I, m.isEmptyObject(y) || (F[O].easing = r.easing), b.debug && console.log("reverse tweensContainer (" + O + "): " + JSON.stringify(F[O]), o)
                        }
                    l = F
                } else if ("start" === E) {
                    var F;
                    s(o).tweensContainer && s(o).isAnimating===!0 && (F = s(o).tweensContainer), f.each(v, function(t, e) {
                        if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(t)) {
                            var i = h(e, !0), a = i[0], o = i[1], s = i[2];
                            if (x.RegEx.isHex.test(a)) {
                                for (var r = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(a), c = s ? x.Values.hexToRgb(s) : n, u = 0; u < r.length; u++) {
                                    var f = [l[u]];
                                    o && f.push(o), c !== n && f.push(c[u]), v[t + r[u]] = f
                                }
                                delete v[t]
                            }
                        }
                    });
                    for (var z in v) {
                        var V = h(v[z]), W = V[0], _ = V[1], H = V[2];
                        z = x.Names.camelCase(z);
                        var B = x.Hooks.getRoot(z), N=!1;
                        if (s(o).isSVG || "tween" === B || x.Names.prefixCheck(B)[1]!==!1 || x.Normalizations.registered[B] !== n) {
                            (r.display !== n && null !== r.display && "none" !== r.display || r.visibility !== n && "hidden" !== r.visibility) && /opacity|filter/.test(z)&&!H && 0 !== W && (H = 0), r._cacheValues && F && F[z] ? (H === n && (H = F[z].endValue + F[z].unitType), N = s(o).rootPropertyValueCache[B]) : x.Hooks.registered[z] ? H === n ? (N = x.getPropertyValue(o, B), H = x.getPropertyValue(o, z, N)) : N = x.Hooks.templates[B][1] : H === n && (H = x.getPropertyValue(o, z));
                            var j, $, q, X=!1;
                            if (j = d(z, H), H = j[0], q = j[1], j = d(z, W), W = j[0].replace(/^([+-\/*])=/, function(t, e) {
                                return X = e, ""
                            }), $ = j[1], H = parseFloat(H) || 0, W = parseFloat(W) || 0, "%" === $ && (/^(fontSize|lineHeight)$/.test(z) ? (W/=100, $ = "em") : /^scale/.test(z) ? (W/=100, $ = "") : /(Red|Green|Blue)$/i.test(z) && (W = W / 100 * 255, $ = "")), /[\/*]/.test(X))
                                $ = q;
                            else if (q !== $ && 0 !== H)
                                if (0 === W)
                                    $ = q;
                                else {
                                    a = a || g();
                                    var Y = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) || "x" === z ? "x": "y";
                                    switch (q) {
                                    case"%":
                                        H*="x" === Y ? a.percentToPxWidth : a.percentToPxHeight;
                                        break;
                                    case"px":
                                        break;
                                    default:
                                        H*=a[q + "ToPx"]
                                    }
                                    switch ($) {
                                    case"%":
                                        H*=1 / ("x" === Y ? a.percentToPxWidth : a.percentToPxHeight);
                                        break;
                                    case"px":
                                        break;
                                    default:
                                        H*=1 / a[$ + "ToPx"]
                                    }
                                }
                            switch (X) {
                            case"+":
                                W = H + W;
                                break;
                            case"-":
                                W = H - W;
                                break;
                            case"*":
                                W = H * W;
                                break;
                            case"/":
                                W = H / W
                            }
                            l[z] = {
                                rootPropertyValue: N,
                                startValue: H,
                                currentValue: H,
                                endValue: W,
                                unitType: $,
                                easing: _
                            }, b.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(l[z]), o)
                        } else
                            b.debug && console.log("Skipping [" + B + "] due to a lack of browser support.")
                        }
                    l.element = o
                }
                l.element && (x.Values.addClass(o, "velocity-animating"), D.push(l), "" === r.queue && (s(o).tweensContainer = l, s(o).opts = r), s(o).isAnimating=!0, k === S - 1 ? (b.State.calls.push([D, p, r, null, A.resolver]), b.State.isTicking===!1 && (b.State.isTicking=!0, u())) : k++)
            }
            var a, o = this, r = f.extend({}, b.defaults, y), l = {};
            switch (s(o) === n && b.init(o), parseFloat(r.delay) && r.queue!==!1 && f.queue(o, r.queue, function(t) {
                b.velocityQueueEntryFlag=!0, s(o).delayTimer = {
                    setTimeout: setTimeout(t, parseFloat(r.delay)),
                    next: t
                }
            }), r.duration.toString().toLowerCase()) {
            case"fast":
                r.duration = 200;
                break;
            case"normal":
                r.duration = g;
                break;
            case"slow":
                r.duration = 600;
                break;
            default:
                r.duration = parseFloat(r.duration) || 1
            }
            b.mock!==!1 && (b.mock===!0 ? r.duration = r.delay = 1 : (r.duration*=parseFloat(b.mock) || 1, r.delay*=parseFloat(b.mock) || 1)), r.easing = c(r.easing, r.duration), r.begin&&!m.isFunction(r.begin) && (r.begin = null), r.progress&&!m.isFunction(r.progress) && (r.progress = null), r.complete&&!m.isFunction(r.complete) && (r.complete = null), r.display !== n && null !== r.display && (r.display = r.display.toString().toLowerCase(), "auto" === r.display && (r.display = b.CSS.Values.getDisplayType(o))), r.visibility !== n && null !== r.visibility && (r.visibility = r.visibility.toString().toLowerCase()), r.mobileHA = r.mobileHA && b.State.isMobile&&!b.State.isGingerbread, r.queue===!1 ? r.delay ? setTimeout(t, r.delay) : t() : f.queue(o, r.queue, function(e, i) {
                return i===!0 ? (A.promise && A.resolver(p), !0) : (b.velocityQueueEntryFlag=!0, void t(e))
            }), "" !== r.queue && "fx" !== r.queue || "inprogress" === f.queue(o)[0] || f.dequeue(o)
        }
        var r, l, d, p, v, y, w = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names || m.isString(arguments[0].properties));
        if (m.isWrapped(this) ? (r=!1, d = 0, p = this, l = this) : (r=!0, d = 1, p = w ? arguments[0].elements || arguments[0].e : arguments[0]), p = o(p)) {
            w ? (v = arguments[0].properties || arguments[0].p, y = arguments[0].options || arguments[0].o) : (v = arguments[d], y = arguments[d + 1]);
            var S = p.length, k = 0;
            if (!/^(stop|finish)$/i.test(v)&&!f.isPlainObject(y)) {
                var P = d + 1;
                y = {};
                for (var T = P; T < arguments.length; T++)
                    m.isArray(arguments[T]) ||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T]) ? m.isString(arguments[T]) || m.isArray(arguments[T]) ? y.easing = arguments[T] : m.isFunction(arguments[T]) && (y.complete = arguments[T]) : y.duration = arguments[T]
            }
            var A = {
                promise: null,
                resolver: null,
                rejecter: null
            };
            r && b.Promise && (A.promise = new b.Promise(function(t, e) {
                A.resolver = t, A.rejecter = e
            }));
            var E;
            switch (v) {
            case"scroll":
                E = "scroll";
                break;
            case"reverse":
                E = "reverse";
                break;
            case"finish":
            case"stop":
                f.each(p, function(t, e) {
                    s(e) && s(e).delayTimer && (clearTimeout(s(e).delayTimer.setTimeout), s(e).delayTimer.next && s(e).delayTimer.next(), delete s(e).delayTimer)
                });
                var M = [];
                return f.each(b.State.calls, function(t, e) {
                    e && f.each(e[1], function(i, a) {
                        var o = y === n ? "": y;
                        return o===!0 || e[2].queue === o || y === n && e[2].queue===!1 ? void f.each(p, function(i, n) {
                            n === a && ((y===!0 || m.isString(y)) && (f.each(f.queue(n, m.isString(y) ? y : ""), function(t, e) {
                                m.isFunction(e) && e(null, !0)
                            }), f.queue(n, m.isString(y) ? y : "", [])), "stop" === v ? (s(n) && s(n).tweensContainer && o!==!1 && f.each(s(n).tweensContainer, function(t, e) {
                                e.endValue = e.currentValue
                            }), M.push(t)) : "finish" === v && (e[2].duration = 1))
                        }) : !0
                    })
                }), "stop" === v && (f.each(M, function(t, e) {
                    h(e, !0)
                }), A.promise && A.resolver(p)), t();
            default:
                if (!f.isPlainObject(v) || m.isEmptyObject(v)) {
                    if (m.isString(v) && b.Redirects[v]) {
                        var L = f.extend({}, y), F = L.duration, O = L.delay || 0;
                        return L.backwards===!0 && (p = f.extend(!0, [], p).reverse()), f.each(p, function(t, e) {
                            parseFloat(L.stagger) ? L.delay = O + parseFloat(L.stagger) * t : m.isFunction(L.stagger) && (L.delay = O + L.stagger.call(e, t, S)), L.drag && (L.duration = parseFloat(F) || (/^(callout|transition)/.test(v) ? 1e3 : g), L.duration = Math.max(L.duration * (L.backwards ? 1 - t / S : (t + 1) / S), .75 * L.duration, 200)), b.Redirects[v].call(e, e, L || {}, t, S, p, A.promise ? A : n)
                        }), t()
                    }
                    var I = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                    return A.promise ? A.rejecter(new Error(I)) : console.log(I), t()
                }
                E = "start"
            }
            var R = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPx: null,
                vwToPx: null,
                vhToPx: null
            }, D = [];
            f.each(p, function(t, e) {
                m.isNode(e) && a.call(e)
            });
            var z, L = f.extend({}, b.defaults, y);
            if (L.loop = parseInt(L.loop), z = 2 * L.loop - 1, L.loop)
                for (var V = 0; z > V; V++) {
                    var W = {
                        delay: L.delay,
                        progress: L.progress
                    };
                    V === z - 1 && (W.display = L.display, W.visibility = L.visibility, W.complete = L.complete), C(p, "reverse", W)
                }
            return t()
        }
    };
    b = f.extend(C, b), b.animate = C;
    var S = e.requestAnimationFrame || p;
    return b.State.isMobile || i.hidden === n || i.addEventListener("visibilitychange", function() {
        i.hidden ? (S = function(t) {
            return setTimeout(function() {
                t(!0)
            }, 16)
        }, u()) : S = e.requestAnimationFrame || p
    }), t.Velocity = b, t !== e && (t.fn.velocity = C, t.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function(t, e) {
        b.Redirects["slide" + e] = function(t, i, a, o, s, r) {
            var l = f.extend({}, i), c = l.begin, u = l.complete, h = {
                height: "",
                marginTop: "",
                marginBottom: "",
                paddingTop: "",
                paddingBottom: ""
            }, d = {};
            l.display === n && (l.display = "Down" === e ? "inline" === b.CSS.Values.getDisplayType(t) ? "inline-block" : "block" : "none"), l.begin = function() {
                c && c.call(s, s);
                for (var i in h) {
                    d[i] = t.style[i];
                    var n = b.CSS.getPropertyValue(t, i);
                    h[i] = "Down" === e ? [n, 0] : [0, n]
                }
                d.overflow = t.style.overflow, t.style.overflow = "hidden"
            }, l.complete = function() {
                for (var e in d)
                    t.style[e] = d[e];
                u && u.call(s, s), r && r.resolver(s)
            }, b(t, h, l)
        }
    }), f.each(["In", "Out"], function(t, e) {
        b.Redirects["fade" + e] = function(t, i, a, o, s, r) {
            var l = f.extend({}, i), c = {
                opacity: "In" === e ? 1: 0
            }, u = l.complete;
            l.complete = a !== o - 1 ? l.begin = null : function() {
                u && u.call(s, s), r && r.resolver(s)
            }, l.display === n && (l.display = "In" === e ? "auto" : "none"), b(this, c, l)
        }
    }), b
}(window.jQuery || window.Zepto || window, window, document)
})), function() {
    "use strict";
    var t = this, e = t.Chart, i = function(t) {
        this.canvas = t.canvas, this.ctx = t;
        var i = function(t, e) {
            return t["offset" + e] ? t["offset" + e] : document.defaultView.getComputedStyle(t).getPropertyValue(e)
        }, a = this.width = i(t.canvas, "Width") || t.canvas.width, o = this.height = i(t.canvas, "Height") || t.canvas.height;
        return a = this.width = t.canvas.width, o = this.height = t.canvas.height, this.aspectRatio = this.width / this.height, n.retinaScale(this), this
    };
    i.defaults = {
        global: {
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            showScale: !0,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleIntegersOnly: !0,
            scaleBeginAtZero: !1,
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            responsive: !1,
            maintainAspectRatio: !0,
            showTooltips: !0,
            customTooltips: !1,
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
            tooltipFillColor: "rgba(0,0,0,0.8)",
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 14,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 14,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff",
            tooltipTitleTemplate: "<%= label%>",
            tooltipYPadding: 6,
            tooltipXPadding: 6,
            tooltipCaretSize: 8,
            tooltipCornerRadius: 6,
            tooltipXOffset: 10,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%= value %>",
            multiTooltipKeyBackground: "#fff",
            segmentColorDefault: ["#A6CEE3", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00", "#CAB2D6", "#6A3D9A", "#B4B482", "#B15928"],
            segmentHighlightColorDefaults: ["#CEF6FF", "#47A0DC", "#DAFFB2", "#5BC854", "#FFC2C1", "#FF4244", "#FFE797", "#FFA728", "#F2DAFE", "#9265C2", "#DCDCAA", "#D98150"],
            onAnimationProgress: function() {},
            onAnimationComplete: function() {}
        }
    }, i.types = {};
    var n = i.helpers = {}, a = n.each = function(t, e, i) {
        var n = Array.prototype.slice.call(arguments, 3);
        if (t)
            if (t.length ===+ t.length) {
                var a;
                for (a = 0; a < t.length; a++)
                    e.apply(i, [t[a], a].concat(n))
            } else
                for (var o in t)
                    e.apply(i, [t[o], o].concat(n))
    }, o = n.clone = function(t) {
        var e = {};
        return a(t, function(i, n) {
            t.hasOwnProperty(n) && (e[n] = i)
        }), e
    }, s = n.extend = function(t) {
        return a(Array.prototype.slice.call(arguments, 1), function(e) {
            a(e, function(i, n) {
                e.hasOwnProperty(n) && (t[n] = i)
            })
        }), t
    }, r = n.merge = function(t, e) {
        var i = Array.prototype.slice.call(arguments, 0);
        return i.unshift({}), s.apply(null, i)
    }, l = n.indexOf = function(t, e) {
        if (Array.prototype.indexOf)
            return t.indexOf(e);
        for (var i = 0; i < t.length; i++)
            if (t[i] === e)
                return i;
        return - 1
    }, f = (n.where = function(t, e) {
        var i = [];
        return n.each(t, function(t) {
            e(t) && i.push(t)
        }), i
    }, n.findNextWhere = function(t, e, i) {
        i || (i =- 1);
        for (var n = i + 1; n < t.length; n++) {
            var a = t[n];
            if (e(a))
                return a
        }
    }, n.findPreviousWhere = function(t, e, i) {
        i || (i = t.length);
        for (var n = i - 1; n >= 0; n--) {
            var a = t[n];
            if (e(a))
                return a
        }
    }, n.inherits = function(t) {
        var e = this, i = t && t.hasOwnProperty("constructor") ? t.constructor: function() {
            return e.apply(this, arguments)
        }, n = function() {
            this.constructor = i
        };
        return n.prototype = e.prototype, i.prototype = new n, i.extend = f, t && s(i.prototype, t), i.__super__ = e.prototype, i
    }), d = n.noop = function() {}, p = n.uid = function() {
        var t = 0;
        return function() {
            return "chart-" + t++
        }
    }(), m = n.warn = function(t) {
        window.console && "function" == typeof window.console.warn && console.warn(t)
    }, v = n.amd = "function" == typeof define && define.amd, g = n.isNumber = function(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }, y = n.max = function(t) {
        return Math.max.apply(Math, t)
    }, b = n.min = function(t) {
        return Math.min.apply(Math, t)
    }, x = (n.cap = function(t, e, i) {
        if (g(e)) {
            if (t > e)
                return e
        } else if (g(i) && i > t)
            return i;
        return t
    }, n.getDecimalPlaces = function(t) {
        if (t%1 !== 0 && g(t)) {
            var e = t.toString();
            if (e.indexOf("e-") < 0)
                return e.split(".")[1].length;
            if (e.indexOf(".") < 0)
                return parseInt(e.split("e-")[1]);
            var i = e.split(".")[1].split("e-");
            return i[0].length + parseInt(i[1])
        }
        return 0
    }), C = n.radians = function(t) {
        return t * (Math.PI / 180)
    }, k = (n.getAngleFromPoint = function(t, e) {
        var i = e.x - t.x, n = e.y - t.y, a = Math.sqrt(i * i + n * n), o = 2 * Math.PI + Math.atan2(n, i);
        return 0 > i && 0 > n && (o += 2 * Math.PI), {
            angle: o,
            distance: a
        }
    }, n.aliasPixel = function(t) {
        return t%2 === 0 ? 0 : .5
    }), T = (n.splineCurve = function(t, e, i, n) {
        var a = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)), o = Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2)), s = n * a / (a + o), r = n * o / (a + o);
        return {
            inner: {
                x: e.x - s * (i.x - t.x),
                y: e.y - s * (i.y - t.y)
            },
            outer: {
                x: e.x + r * (i.x - t.x),
                y: e.y + r * (i.y - t.y)
            }
        }
    }, n.calculateOrderOfMagnitude = function(t) {
        return Math.floor(Math.log(t) / Math.LN10)
    }), E = (n.calculateScaleRange = function(t, e, i, n, o) {
        var s = 2, r = Math.floor(e / (1.5 * i)), l = s >= r, c = [];
        a(t, function(t) {
            null == t || c.push(t)
        });
        var u = b(c), h = y(c);
        h === u && (h += .5, u >= .5&&!n ? u -= .5 : h += .5);
        for (var f = Math.abs(h - u), d = T(f), p = Math.ceil(h / (1 * Math.pow(10, d))) * Math.pow(10, d), m = n ? 0 : Math.floor(u / (1 * Math.pow(10, d))) * Math.pow(10, d), v = p - m, g = Math.pow(10, d), w = Math.round(v / g); (w > r || r > 2 * w)&&!l;)
            if (w > r)
                g*=2, w = Math.round(v / g), w%1 !== 0 && (l=!0);
            else if (o && d >= 0) {
                if (g / 2%1 !== 0)
                    break;
                    g/=2, w = Math.round(v / g)
            } else
                g/=2, w = Math.round(v / g);
        return l && (w = s, g = v / w), {
            steps: w,
            stepValue: g,
            min: m,
            max: m + w * g
        }
    }, n.template = function(t, e) {
        function n(t, e) {
            var n = /\W/.test(t) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');"): i[t] = i[t];
            return e ? n(e) : n
        }
        if (t instanceof Function)
            return t(e);
        var i = {};
        return n(t, e)
    }), L = (n.generateLabels = function(t, e, i, n) {
        var o = new Array(e);
        return t && a(o, function(e, a) {
            o[a] = E(t, {
                value: i + n * (a + 1)
            })
        }), o
    }, n.easingEffects = {
        linear: function(t) {
            return t
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeOutQuad: function(t) {
            return - 1 * t * (t - 2)
        },
        easeInOutQuad: function(t) {
            return (t/=.5) < 1 ? .5 * t * t : - 0.5 * (--t * (t - 2) - 1)
        },
        easeInCubic: function(t) {
            return t * t * t
        },
        easeOutCubic: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1)
        },
        easeInOutCubic: function(t) {
            return (t/=.5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        },
        easeInQuart: function(t) {
            return t * t * t * t
        },
        easeOutQuart: function(t) {
            return - 1 * ((t = t / 1 - 1) * t * t * t - 1)
        },
        easeInOutQuart: function(t) {
            return (t/=.5) < 1 ? .5 * t * t * t * t : - 0.5 * ((t -= 2) * t * t * t - 2)
        },
        easeInQuint: function(t) {
            return 1 * (t/=1) * t * t * t * t
        },
        easeOutQuint: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
        },
        easeInOutQuint: function(t) {
            return (t/=.5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        },
        easeInSine: function(t) {
            return - 1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
        },
        easeOutSine: function(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2))
        },
        easeInOutSine: function(t) {
            return - 0.5 * (Math.cos(Math.PI * t / 1) - 1)
        },
        easeInExpo: function(t) {
            return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
        },
        easeOutExpo: function(t) {
            return 1 === t ? 1 : 1 * ( - Math.pow(2, - 10 * t / 1) + 1)
        },
        easeInOutExpo: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t/=.5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * ( - Math.pow(2, - 10*--t) + 2)
        },
        easeInCirc: function(t) {
            return t >= 1 ? t : - 1 * (Math.sqrt(1 - (t/=1) * t) - 1)
        },
        easeOutCirc: function(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
        },
        easeInOutCirc: function(t) {
            return (t/=.5) < 1?-0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        easeInElastic: function(t) {
            var e = 1.70158, i = 0, n = 1;
            return 0 === t ? 0 : 1 == (t/=1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), - (n * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)))
        },
        easeOutElastic: function(t) {
            var e = 1.70158, i = 0, n = 1;
            return 0 === t ? 0 : 1 == (t/=1) ? 1 : (i || (i = .3), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, - 10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / i) + 1)
        },
        easeInOutElastic: function(t) {
            var e = 1.70158, i = 0, n = 1;
            return 0 === t ? 0 : 2 == (t/=.5) ? 1 : (i || (i = 1 * (.3 * 1.5)), n < Math.abs(1) ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), 1 > t?-.5 * (n * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)) : n * Math.pow(2, - 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i) * .5 + 1)
        },
        easeInBack: function(t) {
            var e = 1.70158;
            return 1 * (t/=1) * t * ((e + 1) * t - e)
        },
        easeOutBack: function(t) {
            var e = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
        },
        easeInOutBack: function(t) {
            var e = 1.70158;
            return (t/=.5) < 1 ? .5 * (t * t * (((e*=1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e*=1.525) + 1) * t + e) + 2)
        },
        easeInBounce: function(t) {
            return 1 - L.easeOutBounce(1 - t)
        },
        easeOutBounce: function(t) {
            return (t/=1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        },
        easeInOutBounce: function(t) {
            return .5 > t ? .5 * L.easeInBounce(2 * t) : .5 * L.easeOutBounce(2 * t - 1) + .5
        }
    }), F = n.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            return window.setTimeout(t, 1e3 / 60)
        }
    }(), D = (n.cancelAnimFrame = function() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
            return window.clearTimeout(t, 1e3 / 60)
        }
    }(), n.animationLoop = function(t, e, i, n, a, o) {
        var s = 0, r = L[i] || L.linear, l = function() {
            s++;
            var i = s / e, c = r(i);
            t.call(o, c, i, s), n.call(o, c, i), e > s ? o.animationFrame = F(l) : a.apply(o)
        };
        F(l)
    }, n.getRelativePosition = function(t) {
        var e, i, n = t.originalEvent || t, a = t.currentTarget || t.srcElement, o = a.getBoundingClientRect();
        return n.touches ? (e = n.touches[0].clientX - o.left, i = n.touches[0].clientY - o.top) : (e = n.clientX - o.left, i = n.clientY - o.top), {
            x: e,
            y: i
        }
    }, n.addEvent = function(t, e, i) {
        t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
    }), z = n.removeEvent = function(t, e, i) {
        t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = d
    }, W = (n.bindEvents = function(t, e, i) {
        t.events || (t.events = {}), a(e, function(e) {
            t.events[e] = function() {
                i.apply(t, arguments)
            }, D(t.chart.canvas, e, t.events[e])
        })
    }, n.unbindEvents = function(t, e) {
        a(e, function(e, i) {
            z(t.chart.canvas, i, e)
        })
    }), _ = n.getMaximumWidth = function(t) {
        var e = t.parentNode, i = parseInt(B(e, "padding-left")) + parseInt(B(e, "padding-right"));
        return e.clientWidth - i
    }, H = n.getMaximumHeight = function(t) {
        var e = t.parentNode, i = parseInt(B(e, "padding-bottom")) + parseInt(B(e, "padding-top"));
        return e.clientHeight - i
    }, B = n.getStyle = function(t, e) {
        return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
    }, j = (n.getMaximumSize = n.getMaximumWidth, n.retinaScale = function(t) {
        var e = t.ctx, i = t.canvas.width, n = t.canvas.height;
        window.devicePixelRatio && (e.canvas.style.width = i + "px", e.canvas.style.height = n + "px", e.canvas.height = n * window.devicePixelRatio, e.canvas.width = i * window.devicePixelRatio, e.scale(window.devicePixelRatio, window.devicePixelRatio))
    }), $ = n.clear = function(t) {
        t.ctx.clearRect(0, 0, t.width, t.height)
    }, q = n.fontString = function(t, e, i) {
        return e + " " + t + "px " + i
    }, X = n.longestText = function(t, e, i) {
        t.font = e;
        var n = 0;
        return a(i, function(e) {
            var i = t.measureText(e).width;
            n = i > n ? i : n
        }), n
    }, Y = n.drawRoundedRectangle = function(t, e, i, n, a, o) {
        t.beginPath(), t.moveTo(e + o, i), t.lineTo(e + n - o, i), t.quadraticCurveTo(e + n, i, e + n, i + o), t.lineTo(e + n, i + a - o), t.quadraticCurveTo(e + n, i + a, e + n - o, i + a), t.lineTo(e + o, i + a), t.quadraticCurveTo(e, i + a, e, i + a - o), t.lineTo(e, i + o), t.quadraticCurveTo(e, i, e + o, i), t.closePath()
    };
    i.instances = {}, i.Type = function(t, e, n) {
        this.options = e, this.chart = n, this.id = p(), i.instances[this.id] = this, e.responsive && this.resize(), this.initialize.call(this, t)
    }, s(i.Type.prototype, {
        initialize: function() {
            return this
        },
        clear: function() {
            return $(this.chart), this
        },
        stop: function() {
            return i.animationService.cancelAnimation(this), this
        },
        resize: function(t) {
            this.stop();
            var e = this.chart.canvas, i = _(this.chart.canvas), n = this.options.maintainAspectRatio ? i / this.chart.aspectRatio: H(this.chart.canvas);
            return e.width = this.chart.width = i, e.height = this.chart.height = n, j(this.chart), "function" == typeof t && t.apply(this, Array.prototype.slice.call(arguments, 1)), this
        },
        reflow: d,
        render: function(t) {
            if (t && this.reflow(), this.options.animation&&!t) {
                var e = new i.Animation;
                e.numSteps = this.options.animationSteps, e.easing = this.options.animationEasing, e.render = function(t, e) {
                    var i = n.easingEffects[e.easing], a = e.currentStep / e.numSteps, o = i(a);
                    t.draw(o, a, e.currentStep)
                }, e.onAnimationProgress = this.options.onAnimationProgress, e.onAnimationComplete = this.options.onAnimationComplete, i.animationService.addAnimation(this, e)
            } else
                this.draw(), this.options.onAnimationComplete.call(this);
            return this
        },
        generateLegend: function() {
            return E(this.options.legendTemplate, this)
        },
        destroy: function() {
            this.clear(), W(this, this.events);
            var t = this.chart.canvas;
            t.width = this.chart.width, t.height = this.chart.height, t.style.removeProperty ? (t.style.removeProperty("width"), t.style.removeProperty("height")) : (t.style.removeAttribute("width"), t.style.removeAttribute("height")), delete i.instances[this.id]
        },
        showTooltip: function(t, e) {
            "undefined" == typeof this.activeElements && (this.activeElements = []);
            var o = function(t) {
                var e=!1;
                return t.length !== this.activeElements.length ? e=!0 : (a(t, function(t, i) {
                    t !== this.activeElements[i] && (e=!0)
                }, this), e)
            }.call(this, t);
            if (o || e) {
                if (this.activeElements = t, this.draw(), this.options.customTooltips && this.options.customTooltips(!1), t.length > 0)
                    if (this.datasets && this.datasets.length > 1) {
                        for (var s, r, c = this.datasets.length - 1; c >= 0 && (s = this.datasets[c].points || this.datasets[c].bars || this.datasets[c].segments, r = l(s, t[0]), - 1 === r); c--);
                        var u = [], h = [], f = function(t) {
                            var i, s, l, c, f, e = [], a = [], o = [];
                            return n.each(this.datasets, function(t) {
                                i = t.points || t.bars || t.segments, i[r] && i[r].hasValue() && e.push(i[r])
                            }), n.each(e, function(t) {
                                a.push(t.x), o.push(t.y), u.push(n.template(this.options.multiTooltipTemplate, t)), h.push({
                                    fill: t._saved.fillColor || t.fillColor,
                                    stroke: t._saved.strokeColor || t.strokeColor
                                })
                            }, this), f = b(o), l = y(o), c = b(a), s = y(a), {
                                x: c > this.chart.width / 2 ? c: s,
                                y: (f + l) / 2
                            }
                        }.call(this, r);
                        new i.MultiTooltip({
                            x: f.x,
                            y: f.y,
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            xOffset: this.options.tooltipXOffset,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            titleTextColor: this.options.tooltipTitleFontColor,
                            titleFontFamily: this.options.tooltipTitleFontFamily,
                            titleFontStyle: this.options.tooltipTitleFontStyle,
                            titleFontSize: this.options.tooltipTitleFontSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            labels: u,
                            legendColors: h,
                            legendColorBackground: this.options.multiTooltipKeyBackground,
                            title: E(this.options.tooltipTitleTemplate, t[0]),
                            chart: this.chart,
                            ctx: this.chart.ctx,
                            custom: this.options.customTooltips
                        }).draw()
                    } else
                        a(t, function(t) {
                            var e = t.tooltipPosition();
                            new i.Tooltip({
                                x: Math.round(e.x),
                                y: Math.round(e.y),
                                xPadding: this.options.tooltipXPadding,
                                yPadding: this.options.tooltipYPadding,
                                fillColor: this.options.tooltipFillColor,
                                textColor: this.options.tooltipFontColor,
                                fontFamily: this.options.tooltipFontFamily,
                                fontStyle: this.options.tooltipFontStyle,
                                fontSize: this.options.tooltipFontSize,
                                caretHeight: this.options.tooltipCaretSize,
                                cornerRadius: this.options.tooltipCornerRadius,
                                text: E(this.options.tooltipTemplate, t),
                                chart: this.chart,
                                custom: this.options.customTooltips
                            }).draw()
                        }, this);
                return this
            }
        },
        toBase64Image: function() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
        }
    }), i.Type.extend = function(t) {
        var e = this, n = function() {
            return e.apply(this, arguments)
        };
        if (n.prototype = o(e.prototype), s(n.prototype, t), n.extend = i.Type.extend, t.name || e.prototype.name) {
            var a = t.name || e.prototype.name, l = i.defaults[e.prototype.name] ? o(i.defaults[e.prototype.name]): {};
            i.defaults[a] = s(l, t.defaults), i.types[a] = n, i.prototype[a] = function(t, e) {
                var o = r(i.defaults.global, i.defaults[a], e || {});
                return new n(t, o, this)
            }
        } else
            m("Name not provided for this chart, so it hasn't been registered");
        return e
    }, i.Element = function(t) {
        s(this, t), this.initialize.apply(this, arguments), this.save()
    }, s(i.Element.prototype, {
        initialize: function() {},
        restore: function(t) {
            return t ? a(t, function(t) {
                this[t] = this._saved[t]
            }, this) : s(this, this._saved), this
        },
        save: function() {
            return this._saved = o(this), delete this._saved._saved, this
        },
        update: function(t) {
            return a(t, function(t, e) {
                this._saved[e] = this[e], this[e] = t
            }, this), this
        },
        transition: function(t, e) {
            return a(t, function(t, i) {
                this[i] = (t - this._saved[i]) * e + this._saved[i]
            }, this), this
        },
        tooltipPosition: function() {
            return {
                x: this.x,
                y: this.y
            }
        },
        hasValue: function() {
            return g(this.value)
        }
    }), i.Element.extend = f, i.Point = i.Element.extend({
        display: !0,
        inRange: function(t, e) {
            var i = this.hitDetectionRadius + this.radius;
            return Math.pow(t - this.x, 2) + Math.pow(e - this.y, 2) < Math.pow(i, 2)
        },
        draw: function() {
            if (this.display) {
                var t = this.ctx;
                t.beginPath(), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), t.closePath(), t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.fillStyle = this.fillColor, t.fill(), t.stroke()
            }
        }
    }), i.Arc = i.Element.extend({
        inRange: function(t, e) {
            var i = n.getAngleFromPoint(this, {
                x: t,
                y: e
            }), a = i.angle%(2 * Math.PI), o = (2 * Math.PI + this.startAngle)%(2 * Math.PI), s = (2 * Math.PI + this.endAngle)%(2 * Math.PI) || 360, r = o > s ? s >= a || a >= o: a >= o && s >= a, l = i.distance >= this.innerRadius && i.distance <= this.outerRadius;
            return r && l
        },
        tooltipPosition: function() {
            var t = this.startAngle + (this.endAngle - this.startAngle) / 2, e = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
            return {
                x: this.x + Math.cos(t) * e,
                y: this.y + Math.sin(t) * e
            }
        },
        draw: function(t) {
            var i = this.ctx;
            i.beginPath(), i.arc(this.x, this.y, this.outerRadius < 0 ? 0 : this.outerRadius, this.startAngle, this.endAngle), i.arc(this.x, this.y, this.innerRadius < 0 ? 0 : this.innerRadius, this.endAngle, this.startAngle, !0), i.closePath(), i.strokeStyle = this.strokeColor, i.lineWidth = this.strokeWidth, i.fillStyle = this.fillColor, i.fill(), i.lineJoin = "bevel", this.showStroke && i.stroke()
        }
    }), i.Rectangle = i.Element.extend({
        draw: function() {
            var t = this.ctx, e = this.width / 2, i = this.x - e, n = this.x + e, a = this.base - (this.base - this.y), o = this.strokeWidth / 2;
            this.showStroke && (i += o, n -= o, a += o), t.beginPath(), t.fillStyle = this.fillColor, t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.moveTo(i, this.base), t.lineTo(i, a), t.lineTo(n, a), t.lineTo(n, this.base), t.fill(), this.showStroke && t.stroke()
        },
        height: function() {
            return this.base - this.y
        },
        inRange: function(t, e) {
            return t >= this.x - this.width / 2 && t <= this.x + this.width / 2 && e >= this.y && e <= this.base
        }
    }), i.Animation = i.Element.extend({
        currentStep: null,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
    }), i.Tooltip = i.Element.extend({
        draw: function() {
            var t = this.chart.ctx;
            t.font = q(this.fontSize, this.fontStyle, this.fontFamily), this.xAlign = "center", this.yAlign = "above";
            var e = this.caretPadding = 2, i = t.measureText(this.text).width + 2 * this.xPadding, n = this.fontSize + 2 * this.yPadding, a = n + this.caretHeight + e;
            this.x + i / 2 > this.chart.width ? this.xAlign = "left" : this.x - i / 2 < 0 && (this.xAlign = "right"), this.y - a < 0 && (this.yAlign = "below");
            var o = this.x - i / 2, s = this.y - a;
            if (t.fillStyle = this.fillColor, this.custom)
                this.custom(this);
            else {
                switch (this.yAlign) {
                case"above":
                    t.beginPath(), t.moveTo(this.x, this.y - e), t.lineTo(this.x + this.caretHeight, this.y - (e + this.caretHeight)), t.lineTo(this.x - this.caretHeight, this.y - (e + this.caretHeight)), t.closePath(), t.fill();
                    break;
                case"below":
                    s = this.y + e + this.caretHeight, t.beginPath(), t.moveTo(this.x, this.y + e), t.lineTo(this.x + this.caretHeight, this.y + e + this.caretHeight), t.lineTo(this.x - this.caretHeight, this.y + e + this.caretHeight), t.closePath(), t.fill()
                }
                switch (this.xAlign) {
                case"left":
                    o = this.x - i + (this.cornerRadius + this.caretHeight);
                    break;
                case"right":
                    o = this.x - (this.cornerRadius + this.caretHeight)
                }
                Y(t, o, s, i, n, this.cornerRadius), t.fill(), t.fillStyle = this.textColor, t.textAlign = "center", t.textBaseline = "middle", t.fillText(this.text, o + i / 2, s + n / 2)
            }
        }
    }), i.MultiTooltip = i.Element.extend({
        initialize: function() {
            this.font = q(this.fontSize, this.fontStyle, this.fontFamily), this.titleFont = q(this.titleFontSize, this.titleFontStyle, this.titleFontFamily), this.titleHeight = this.title ? 1.5 * this.titleFontSize : 0, this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + this.titleHeight, this.ctx.font = this.titleFont;
            var t = this.ctx.measureText(this.title).width, e = X(this.ctx, this.font, this.labels) + this.fontSize + 3, i = y([e, t]);
            this.width = i + 2 * this.xPadding;
            var n = this.height / 2;
            this.y - n < 0 ? this.y = n : this.y + n > this.chart.height && (this.y = this.chart.height - n), this.x > this.chart.width / 2 ? this.x -= this.xOffset + this.width : this.x += this.xOffset
        },
        getLineHeight: function(t) {
            var e = this.y - this.height / 2 + this.yPadding, i = t - 1;
            return 0 === t ? e + this.titleHeight / 3 : e + (1.5 * this.fontSize * i + this.fontSize / 2) + this.titleHeight
        },
        draw: function() {
            if (this.custom)
                this.custom(this);
            else {
                Y(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                var t = this.ctx;
                t.fillStyle = this.fillColor, t.fill(), t.closePath(), t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = this.titleTextColor, t.font = this.titleFont, t.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)), t.font = this.font, n.each(this.labels, function(e, i) {
                    t.fillStyle = this.textColor, t.fillText(e, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(i + 1)), t.fillStyle = this.legendColorBackground, t.fillRect(this.x + this.xPadding, this.getLineHeight(i + 1) - this.fontSize / 2, this.fontSize, this.fontSize), t.fillStyle = this.legendColors[i].fill, t.fillRect(this.x + this.xPadding, this.getLineHeight(i + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                }, this)
            }
        }
    }), i.Scale = i.Element.extend({
        initialize: function() {
            this.fit()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var t = x(this.stepValue), e = 0; e <= this.steps; e++)
                this.yLabels.push(E(this.templateString, {
                    value: (this.min + e * this.stepValue).toFixed(t)
                }));
            this.yLabelWidth = this.display && this.showLabels ? X(this.ctx, this.font, this.yLabels) + 10 : 0
        },
        addXLabel: function(t) {
            this.xLabels.push(t), this.valuesCount++, this.fit()
        },
        removeXLabel: function() {
            this.xLabels.shift(), this.valuesCount--, this.fit()
        },
        fit: function() {
            this.startPoint = this.display ? this.fontSize : 0, this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height, this.startPoint += this.padding, this.endPoint -= this.padding;
            var i, t = this.endPoint, e = this.endPoint - this.startPoint;
            for (this.calculateYRange(e), this.buildYLabels(), this.calculateXLabelRotation(); e > this.endPoint - this.startPoint;)
                e = this.endPoint - this.startPoint, i = this.yLabelWidth, this.calculateYRange(e), this.buildYLabels(), i < this.yLabelWidth && (this.endPoint = t, this.calculateXLabelRotation())
        },
        calculateXLabelRotation: function() {
            this.ctx.font = this.font;
            var i, n, t = this.ctx.measureText(this.xLabels[0]).width, e = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
            if (this.xScalePaddingRight = e / 2 + 3, this.xScalePaddingLeft = t / 2 > this.yLabelWidth ? t / 2 : this.yLabelWidth, this.xLabelRotation = 0, this.display) {
                var o, a = X(this.ctx, this.font, this.xLabels);
                this.xLabelWidth = a;
                for (var r = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; this.xLabelWidth > r && 0 === this.xLabelRotation || this.xLabelWidth > r && this.xLabelRotation <= 90 && this.xLabelRotation > 0;)
                    o = Math.cos(C(this.xLabelRotation)), i = o * t, n = o * e, i + this.fontSize / 2 > this.yLabelWidth && (this.xScalePaddingLeft = i + this.fontSize / 2), this.xScalePaddingRight = this.fontSize / 2, this.xLabelRotation++, this.xLabelWidth = o * a;
                this.xLabelRotation > 0 && (this.endPoint -= Math.sin(C(this.xLabelRotation)) * a + 3)
            } else
                this.xLabelWidth = 0, this.xScalePaddingRight = this.padding, this.xScalePaddingLeft = this.padding
        },
        calculateYRange: d,
        drawingArea: function() {
            return this.startPoint - this.endPoint
        },
        calculateY: function(t) {
            var e = this.drawingArea() / (this.min - this.max);
            return this.endPoint - e * (t - this.min)
        },
        calculateX: function(t) {
            var i = (this.xLabelRotation > 0, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)), n = i / Math.max(this.valuesCount - (this.offsetGridLines ? 0 : 1), 1), a = n * t + this.xScalePaddingLeft;
            return this.offsetGridLines && (a += n / 2), Math.round(a)
        },
        update: function(t) {
            n.extend(this, t), this.fit()
        },
        draw: function() {
            var t = this.ctx, e = (this.endPoint - this.startPoint) / this.steps, i = Math.round(this.xScalePaddingLeft);
            this.display && (t.fillStyle = this.textColor, t.font = this.font, a(this.yLabels, function(a, o) {
                var s = this.endPoint - e * o, r = Math.round(s), l = this.showHorizontalLines;
                t.textAlign = "right", t.textBaseline = "middle", this.showLabels && t.fillText(a, i - 10, s), 0 !== o || l || (l=!0), l && t.beginPath(), o > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), r += n.aliasPixel(t.lineWidth), l && (t.moveTo(i, r), t.lineTo(this.width, r), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(i - 5, r), t.lineTo(i, r), t.stroke(), t.closePath()
            }, this), a(this.xLabels, function(e, i) {
                var n = this.calculateX(i) + k(this.lineWidth), a = this.calculateX(i - (this.offsetGridLines ? .5 : 0)) + k(this.lineWidth), o = this.xLabelRotation > 0, s = this.showVerticalLines;
                0 !== i || s || (s=!0), s && t.beginPath(), i > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), s && (t.moveTo(a, this.endPoint), t.lineTo(a, this.startPoint - 3), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(a, this.endPoint), t.lineTo(a, this.endPoint + 5),
                t.stroke(), t.closePath(), t.save(), t.translate(n, o ? this.endPoint + 12 : this.endPoint + 8), t.rotate( - 1 * C(this.xLabelRotation)), t.font = this.font, t.textAlign = o ? "right" : "center", t.textBaseline = o ? "middle" : "top", t.fillText(e, 0, 0), t.restore()
            }, this))
        }
    }), i.RadialScale = i.Element.extend({
        initialize: function() {
            this.size = b([this.height, this.width]), this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2
        },
        calculateCenterOffset: function(t) {
            var e = this.drawingArea / (this.max - this.min);
            return (t - this.min) * e
        },
        update: function() {
            this.lineArc ? this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2 : this.setScaleSize(), this.buildYLabels()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var t = x(this.stepValue), e = 0; e <= this.steps; e++)
                this.yLabels.push(E(this.templateString, {
                    value: (this.min + e * this.stepValue).toFixed(t)
                }))
        },
        getCircumference: function() {
            return 2 * Math.PI / this.valuesCount
        },
        setScaleSize: function() {
            var e, i, n, a, s, r, c, u, h, f, d, p, t = b([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]), o = this.width, l = 0;
            for (this.ctx.font = q(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), i = 0; i < this.valuesCount; i++)
                e = this.getPointPosition(i, t), n = this.ctx.measureText(E(this.templateString, {
                    value: this.labels[i]
                })).width + 5, 0 === i || i === this.valuesCount / 2 ? (a = n / 2, e.x + a > o && (o = e.x + a, s = i), e.x - a < l && (l = e.x - a, c = i)) : i < this.valuesCount / 2 ? e.x + n > o && (o = e.x + n, s = i) : i > this.valuesCount / 2 && e.x - n < l && (l = e.x - n, c = i);
            h = l, f = Math.ceil(o - this.width), r = this.getIndexAngle(s), u = this.getIndexAngle(c), d = f / Math.sin(r + Math.PI / 2), p = h / Math.sin(u + Math.PI / 2), d = g(d) ? d : 0, p = g(p) ? p : 0, this.drawingArea = t - (p + d) / 2, this.setCenterPoint(p, d)
        },
        setCenterPoint: function(t, e) {
            var i = this.width - e - this.drawingArea, n = t + this.drawingArea;
            this.xCenter = (n + i) / 2, this.yCenter = this.height / 2
        },
        getIndexAngle: function(t) {
            var e = 2 * Math.PI / this.valuesCount;
            return t * e - Math.PI / 2
        },
        getPointPosition: function(t, e) {
            var i = this.getIndexAngle(t);
            return {
                x: Math.cos(i) * e + this.xCenter,
                y: Math.sin(i) * e + this.yCenter
            }
        },
        draw: function() {
            if (this.display) {
                var t = this.ctx;
                if (a(this.yLabels, function(e, i) {
                    if (i > 0) {
                        var o, n = i * (this.drawingArea / this.steps), a = this.yCenter - n;
                        if (this.lineWidth > 0)
                            if (t.strokeStyle = this.lineColor, t.lineWidth = this.lineWidth, this.lineArc)
                                t.beginPath(), t.arc(this.xCenter, this.yCenter, n, 0, 2 * Math.PI), t.closePath(), t.stroke();
                            else {
                                t.beginPath();
                                for (var s = 0; s < this.valuesCount; s++)
                                    o = this.getPointPosition(s, this.calculateCenterOffset(this.min + i * this.stepValue)), 0 === s ? t.moveTo(o.x, o.y) : t.lineTo(o.x, o.y);
                                    t.closePath(), t.stroke()
                                }
                        if (this.showLabels) {
                            if (t.font = q(this.fontSize, this.fontStyle, this.fontFamily), this.showLabelBackdrop) {
                                var r = t.measureText(e).width;
                                t.fillStyle = this.backdropColor, t.fillRect(this.xCenter - r / 2 - this.backdropPaddingX, a - this.fontSize / 2 - this.backdropPaddingY, r + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY)
                            }
                            t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = this.fontColor, t.fillText(e, this.xCenter, a)
                        }
                    }
                }, this), !this.lineArc) {
                    t.lineWidth = this.angleLineWidth, t.strokeStyle = this.angleLineColor;
                    for (var e = this.valuesCount - 1; e >= 0; e--) {
                        var i = null, n = null;
                        if (this.angleLineWidth > 0 && (i = this.calculateCenterOffset(this.max), n = this.getPointPosition(e, i), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(n.x, n.y), t.stroke(), t.closePath()), this.backgroundColors && this.backgroundColors.length == this.valuesCount) {
                            null == i && (i = this.calculateCenterOffset(this.max)), null == n && (n = this.getPointPosition(e, i));
                            var o = this.getPointPosition(0 === e ? this.valuesCount - 1 : e - 1, i), s = this.getPointPosition(e === this.valuesCount - 1 ? 0 : e + 1, i), r = {
                                x: (o.x + n.x) / 2,
                                y: (o.y + n.y) / 2
                            }, l = {
                                x: (n.x + s.x) / 2,
                                y: (n.y + s.y) / 2
                            };
                            t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(r.x, r.y), t.lineTo(n.x, n.y), t.lineTo(l.x, l.y), t.fillStyle = this.backgroundColors[e], t.fill(), t.closePath()
                        }
                        var c = this.getPointPosition(e, this.calculateCenterOffset(this.max) + 5);
                        t.font = q(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), t.fillStyle = this.pointLabelFontColor;
                        var u = this.labels.length, h = this.labels.length / 2, f = h / 2, d = f > e || e > u - f, p = e === f || e === u - f;
                        0 === e ? t.textAlign = "center" : e === h ? t.textAlign = "center" : h > e ? t.textAlign = "left" : t.textAlign = "right", p ? t.textBaseline = "middle" : d ? t.textBaseline = "bottom" : t.textBaseline = "top", t.fillText(this.labels[e], c.x, c.y)
                    }
                }
            }
        }
    }), i.animationService = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        addAnimation: function(t, e) {
            for (var i = 0; i < this.animations.length; ++i)
                if (this.animations[i].chartInstance === t)
                    return void(this.animations[i].animationObject = e);
            this.animations.push({
                chartInstance: t,
                animationObject: e
            }), 1 == this.animations.length && n.requestAnimFrame.call(window, this.digestWrapper)
        },
        cancelAnimation: function(t) {
            var e = n.findNextWhere(this.animations, function(e) {
                return e.chartInstance === t
            });
            e && this.animations.splice(e, 1)
        },
        digestWrapper: function() {
            i.animationService.startDigest.call(i.animationService)
        },
        startDigest: function() {
            var t = Date.now(), e = 0;
            this.dropFrames > 1 && (e = Math.floor(this.dropFrames), this.dropFrames -= e);
            for (var i = 0; i < this.animations.length; i++)
                null === this.animations[i].animationObject.currentStep && (this.animations[i].animationObject.currentStep = 0), this.animations[i].animationObject.currentStep += 1 + e, this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps && (this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps), this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject), this.animations[i].animationObject.currentStep == this.animations[i].animationObject.numSteps && (this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance), this.animations.splice(i, 1), i--);
            var a = Date.now(), o = a - t - this.frameDuration, s = o / this.frameDuration;
            s > 1 && (this.dropFrames += s), this.animations.length > 0 && n.requestAnimFrame.call(window, this.digestWrapper)
        }
    }, n.addEvent(window, "resize", function() {
        var t;
        return function() {
            clearTimeout(t), t = setTimeout(function() {
                a(i.instances, function(t) {
                    t.options.responsive && t.resize(t.render, !0)
                })
            }, 50)
        }
    }()), v ? define(function() {
        return i
    }) : "object" == typeof module && module.exports && (module.exports = i), t.Chart = i, i.noConflict = function() {
        return t.Chart = e, i
    }
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !0,
        barShowStroke: !0,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'
    };
    e.Type.extend({
        name: "Bar",
        defaults: n,
        initialize: function(t) {
            var n = this.options;
            this.ScaleClass = e.Scale.extend({
                offsetGridLines: !0,
                calculateBarX: function(t, e, i) {
                    var a = this.calculateBaseWidth(), o = this.calculateX(i) - a / 2, s = this.calculateBarWidth(t);
                    return o + s * e + e * n.barDatasetSpacing + s / 2
                },
                calculateBaseWidth: function() {
                    return this.calculateX(1) - this.calculateX(0) - 2 * n.barValueSpacing
                },
                calculateBarWidth: function(t) {
                    var e = this.calculateBaseWidth() - (t - 1) * n.barDatasetSpacing;
                    return e / t
                }
            }), this.datasets = [], this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getBarsAtEvent(t): [];
                this.eachBars(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), this.BarClass = e.Rectangle.extend({
                strokeWidth: this.options.barStrokeWidth,
                showStroke: this.options.barShowStroke,
                ctx: this.chart.ctx
            }), i.each(t.datasets, function(e, n) {
                var a = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    bars: []
                };
                this.datasets.push(a), i.each(e.data, function(i, n) {
                    a.bars.push(new this.BarClass({
                        value: i,
                        label: t.labels[n],
                        datasetLabel: e.label,
                        strokeColor: e.strokeColor,
                        fillColor: e.fillColor,
                        highlightFill: e.highlightFill || e.fillColor,
                        highlightStroke: e.highlightStroke || e.strokeColor
                    }))
                }, this)
            }, this), this.buildScale(t.labels), this.BarClass.prototype.base = this.scale.endPoint, this.eachBars(function(t, e, n) {
                i.extend(t, {
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, n, e),
                    y: this.scale.endPoint
                }), t.save()
            }, this), this.render()
        },
        update: function() {
            this.scale.update(), i.each(this.activeElements, function(t) {
                t.restore(["fillColor", "strokeColor"])
            }), this.eachBars(function(t) {
                t.save()
            }), this.render()
        },
        eachBars: function(t) {
            i.each(this.datasets, function(e, n) {
                i.each(e.bars, t, this, n)
            }, this)
        },
        getBarsAtEvent: function(t) {
            for (var o, e = [], n = i.getRelativePosition(t), a = function(t) {
                e.push(t.bars[o])
            }, s = 0; s < this.datasets.length; s++)
                for (o = 0; o < this.datasets[s].bars.length; o++)
                    if (this.datasets[s].bars[o].inRange(n.x, n.y))
                        return i.each(this.datasets, a), e;
            return e
        },
        buildScale: function(t) {
            var e = this, n = function() {
                var t = [];
                return e.eachBars(function(e) {
                    t.push(e.value)
                }), t
            }, a = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: t.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function(t) {
                    var e = i.calculateScaleRange(n(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                    i.extend(this, e)
                },
                xLabels: t,
                font: i.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth: 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor: "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0: this.options.barShowStroke ? this.options.barStrokeWidth: 0,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && i.extend(a, {
                calculateYRange: i.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new this.ScaleClass(a)
        },
        addData: function(t, e) {
            i.each(t, function(t, i) {
                this.datasets[i].bars.push(new this.BarClass({
                    value: t,
                    label: e,
                    datasetLabel: this.datasets[i].label,
                    x: this.scale.calculateBarX(this.datasets.length, i, this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    base: this.scale.endPoint,
                    strokeColor: this.datasets[i].strokeColor,
                    fillColor: this.datasets[i].fillColor
                }))
            }, this), this.scale.addXLabel(e), this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(), i.each(this.datasets, function(t) {
                t.bars.shift()
            }, this), this.update()
        },
        reflow: function() {
            i.extend(this.BarClass.prototype, {
                y: this.scale.endPoint,
                base: this.scale.endPoint
            });
            var t = i.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(t)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear();
            this.chart.ctx;
            this.scale.draw(e), i.each(this.datasets, function(t, n) {
                i.each(t.bars, function(t, i) {
                    t.hasValue() && (t.base = this.scale.endPoint, t.transition({
                        x: this.scale.calculateBarX(this.datasets.length, n, i),
                        y: this.scale.calculateY(t.value),
                        width: this.scale.calculateBarWidth(this.datasets.length)
                    }, e).draw())
                }, this)
            }, this)
        }
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        segmentShowStroke: !0,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: !0,
        animateScale: !1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'
    };
    e.Type.extend({
        name: "Doughnut",
        defaults: n,
        initialize: function(t) {
            this.segments = [], this.outerRadius = (i.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, this.SegmentArc = e.Arc.extend({
                ctx: this.chart.ctx,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t): [];
                i.each(this.segments, function(t) {
                    t.restore(["fillColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightColor
                }), this.showTooltip(e)
            }), this.calculateTotal(t), i.each(t, function(e, i) {
                e.color || (e.color = "hsl(" + 360 * i / t.length + ", 100%, 50%)"), this.addData(e, i, !0)
            }, this), this.render()
        },
        getSegmentsAtEvent: function(t) {
            var e = [], n = i.getRelativePosition(t);
            return i.each(this.segments, function(t) {
                t.inRange(n.x, n.y) && e.push(t)
            }, this), e
        },
        addData: function(t, i, n) {
            var a = void 0 !== i ? i : this.segments.length;
            "undefined" == typeof t.color && (t.color = e.defaults.global.segmentColorDefault[a%e.defaults.global.segmentColorDefault.length], t.highlight = e.defaults.global.segmentHighlightColorDefaults[a%e.defaults.global.segmentHighlightColorDefaults.length]), this.segments.splice(a, 0, new this.SegmentArc({
                value: t.value,
                outerRadius: this.options.animateScale ? 0: this.outerRadius,
                innerRadius: this.options.animateScale ? 0: this.outerRadius / 100 * this.options.percentageInnerCutout,
                fillColor: t.color,
                highlightColor: t.highlight || t.color,
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                startAngle: 1.5 * Math.PI,
                circumference: this.options.animateRotate ? 0: this.calculateCircumference(t.value),
                label: t.label
            })), n || (this.reflow(), this.update())
        },
        calculateCircumference: function(t) {
            return this.total > 0 ? 2 * Math.PI * (t / this.total) : 0
        },
        calculateTotal: function(t) {
            this.total = 0, i.each(t, function(t) {
                this.total += Math.abs(t.value)
            }, this)
        },
        update: function() {
            this.calculateTotal(this.segments), i.each(this.activeElements, function(t) {
                t.restore(["fillColor"])
            }), i.each(this.segments, function(t) {
                t.save()
            }), this.render()
        },
        removeData: function(t) {
            var e = i.isNumber(t) ? t: this.segments.length - 1;
            this.segments.splice(e, 1), this.reflow(), this.update()
        },
        reflow: function() {
            i.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.outerRadius = (i.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, i.each(this.segments, function(t) {
                t.update({
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                })
            }, this)
        },
        draw: function(t) {
            var e = t ? t: 1;
            this.clear(), i.each(this.segments, function(t, i) {
                t.transition({
                    circumference: this.calculateCircumference(t.value),
                    outerRadius: this.outerRadius,
                    innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                }, e), t.endAngle = t.startAngle + t.circumference, t.draw(), 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle)
            }, this)
        }
    }), e.types.Doughnut.extend({
        name: "Pie",
        defaults: i.merge(n, {
            percentageInnerCutout: 0
        })
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !0,
        bezierCurve: !0,
        bezierCurveTension: .4,
        pointDot: !0,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: !0,
        datasetStrokeWidth: 2,
        datasetFill: !0,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',
        offsetGridLines: !1
    };
    e.Type.extend({
        name: "Line",
        defaults: n,
        initialize: function(t) {
            this.PointClass = e.Point.extend({
                offsetGridLines: this.options.offsetGridLines,
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx,
                inRange: function(t) {
                    return Math.pow(t - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                }
            }), this.datasets = [], this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t): [];
                this.eachPoints(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    pointColor: e.pointColor,
                    pointStrokeColor: e.pointStrokeColor,
                    points: []
                };
                this.datasets.push(n), i.each(e.data, function(i, a) {
                    n.points.push(new this.PointClass({
                        value: i,
                        label: t.labels[a],
                        datasetLabel: e.label,
                        strokeColor: e.pointStrokeColor,
                        fillColor: e.pointColor,
                        highlightFill: e.pointHighlightFill || e.pointColor,
                        highlightStroke: e.pointHighlightStroke || e.pointStrokeColor
                    }))
                }, this), this.buildScale(t.labels), this.eachPoints(function(t, e) {
                    i.extend(t, {
                        x: this.scale.calculateX(e),
                        y: this.scale.endPoint
                    }), t.save()
                }, this)
            }, this), this.render()
        },
        update: function() {
            this.scale.update(), i.each(this.activeElements, function(t) {
                t.restore(["fillColor", "strokeColor"])
            }), this.eachPoints(function(t) {
                t.save()
            }), this.render()
        },
        eachPoints: function(t) {
            i.each(this.datasets, function(e) {
                i.each(e.points, t, this)
            }, this)
        },
        getPointsAtEvent: function(t) {
            var e = [], n = i.getRelativePosition(t);
            return i.each(this.datasets, function(t) {
                i.each(t.points, function(t) {
                    t.inRange(n.x, n.y) && e.push(t)
                })
            }, this), e
        },
        buildScale: function(t) {
            var n = this, a = function() {
                var t = [];
                return n.eachPoints(function(e) {
                    t.push(e.value)
                }), t
            }, o = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                offsetGridLines: this.options.offsetGridLines,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: t.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function(t) {
                    var e = i.calculateScaleRange(a(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                    i.extend(this, e)
                },
                xLabels: t,
                font: i.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth: 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor: "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0: this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && i.extend(o, {
                calculateYRange: i.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }), this.scale = new e.Scale(o)
        },
        addData: function(t, e) {
            i.each(t, function(t, i) {
                this.datasets[i].points.push(new this.PointClass({
                    value: t,
                    label: e,
                    datasetLabel: this.datasets[i].label,
                    x: this.scale.calculateX(this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor
                }))
            }, this), this.scale.addXLabel(e), this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(), i.each(this.datasets, function(t) {
                t.points.shift()
            }, this), this.update()
        },
        reflow: function() {
            var t = i.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(t)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear();
            var n = this.chart.ctx, a = function(t) {
                return null !== t.value
            }, o = function(t, e, n) {
                return i.findNextWhere(e, a, n) || t
            }, s = function(t, e, n) {
                return i.findPreviousWhere(e, a, n) || t
            };
            this.scale && (this.scale.draw(e), i.each(this.datasets, function(t) {
                var r = i.where(t.points, a);
                i.each(t.points, function(t, i) {
                    t.hasValue() && t.transition({
                        y: this.scale.calculateY(t.value),
                        x: this.scale.calculateX(i)
                    }, e)
                }, this), this.options.bezierCurve && i.each(r, function(t, e) {
                    var n = e > 0 && e < r.length - 1 ? this.options.bezierCurveTension: 0;
                    t.controlPoints = i.splineCurve(s(t, r, e), t, o(t, r, e), n), t.controlPoints.outer.y > this.scale.endPoint ? t.controlPoints.outer.y = this.scale.endPoint : t.controlPoints.outer.y < this.scale.startPoint && (t.controlPoints.outer.y = this.scale.startPoint), t.controlPoints.inner.y > this.scale.endPoint ? t.controlPoints.inner.y = this.scale.endPoint : t.controlPoints.inner.y < this.scale.startPoint && (t.controlPoints.inner.y = this.scale.startPoint)
                }, this), n.lineWidth = this.options.datasetStrokeWidth, n.strokeStyle = t.strokeColor, n.beginPath(), i.each(r, function(t, e) {
                    if (0 === e)
                        n.moveTo(t.x, t.y);
                    else if (this.options.bezierCurve) {
                        var i = s(t, r, e);
                        n.bezierCurveTo(i.controlPoints.outer.x, i.controlPoints.outer.y, t.controlPoints.inner.x, t.controlPoints.inner.y, t.x, t.y)
                    } else
                        n.lineTo(t.x, t.y)
                }, this), this.options.datasetStroke && n.stroke(), this.options.datasetFill && r.length > 0 && (n.lineTo(r[r.length - 1].x, this.scale.endPoint), n.lineTo(r[0].x, this.scale.endPoint), n.fillStyle = t.fillColor, n.closePath(), n.fill()), i.each(r, function(t) {
                    t.draw()
                })
            }, this))
        }
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers, n = {
        scaleShowLabelBackdrop: !0,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: !0,
        scaleBackdropPaddingY: 2,
        scaleBackdropPaddingX: 2,
        scaleShowLine: !0,
        segmentShowStroke: !0,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: !0,
        animateScale: !1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'
    };
    e.Type.extend({
        name: "PolarArea",
        defaults: n,
        initialize: function(t) {
            this.segments = [], this.SegmentArc = e.Arc.extend({
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                ctx: this.chart.ctx,
                innerRadius: 0,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.scale = new e.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth: 0,
                lineColor: this.options.scaleLineColor,
                lineArc: !0,
                width: this.chart.width,
                height: this.chart.height,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                valuesCount: t.length
            }), this.updateScaleRange(t), this.scale.update(), i.each(t, function(t, e) {
                this.addData(t, e, !0)
            }, this), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t): [];
                i.each(this.segments, function(t) {
                    t.restore(["fillColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightColor
                }), this.showTooltip(e)
            }), this.render()
        },
        getSegmentsAtEvent: function(t) {
            var e = [], n = i.getRelativePosition(t);
            return i.each(this.segments, function(t) {
                t.inRange(n.x, n.y) && e.push(t)
            }, this), e
        },
        addData: function(t, e, i) {
            var n = e || this.segments.length;
            this.segments.splice(n, 0, new this.SegmentArc({
                fillColor: t.color,
                highlightColor: t.highlight || t.color,
                label: t.label,
                value: t.value,
                outerRadius: this.options.animateScale ? 0: this.scale.calculateCenterOffset(t.value),
                circumference: this.options.animateRotate ? 0: this.scale.getCircumference(),
                startAngle: 1.5 * Math.PI
            })), i || (this.reflow(), this.update())
        },
        removeData: function(t) {
            var e = i.isNumber(t) ? t: this.segments.length - 1;
            this.segments.splice(e, 1), this.reflow(), this.update()
        },
        calculateTotal: function(t) {
            this.total = 0, i.each(t, function(t) {
                this.total += t.value
            }, this), this.scale.valuesCount = this.segments.length
        },
        updateScaleRange: function(t) {
            var e = [];
            i.each(t, function(t) {
                e.push(t.value)
            });
            var n = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }
            : i.calculateScaleRange(e, i.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            i.extend(this.scale, n, {
                size: i.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            })
        },
        update: function() {
            this.calculateTotal(this.segments), i.each(this.segments, function(t) {
                t.save()
            }), this.reflow(), this.render()
        },
        reflow: function() {
            i.extend(this.SegmentArc.prototype, {
                x: this.chart.width / 2,
                y: this.chart.height / 2
            }), this.updateScaleRange(this.segments), this.scale.update(), i.extend(this.scale, {
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), i.each(this.segments, function(t) {
                t.update({
                    outerRadius: this.scale.calculateCenterOffset(t.value)
                })
            }, this)
        },
        draw: function(t) {
            var e = t || 1;
            this.clear(), i.each(this.segments, function(t, i) {
                t.transition({
                    circumference: this.scale.getCircumference(),
                    outerRadius: this.scale.calculateCenterOffset(t.value)
                }, e), t.endAngle = t.startAngle + t.circumference, 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle), t.draw()
            }, this), this.scale.draw()
        }
    })
}.call(this), function() {
    "use strict";
    var t = this, e = t.Chart, i = e.helpers;
    e.Type.extend({
        name: "Radar",
        defaults: {
            scaleShowLine: !0,
            angleShowLineOut: !0,
            scaleShowLabels: !1,
            scaleBeginAtZero: !0,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 10,
            pointLabelFontColor: "#666",
            pointDot: !0,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'
        },
        initialize: function(t) {
            this.PointClass = e.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx
            }), this.datasets = [], this.buildScale(t), this.options.showTooltips && i.bindEvents(this, this.options.tooltipEvents, function(t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t): [];
                this.eachPoints(function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), i.each(e, function(t) {
                    t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                }), this.showTooltip(e)
            }), i.each(t.datasets, function(e) {
                var n = {
                    label: e.label || null,
                    fillColor: e.fillColor,
                    strokeColor: e.strokeColor,
                    pointColor: e.pointColor,
                    pointStrokeColor: e.pointStrokeColor,
                    points: []
                };
                this.datasets.push(n), i.each(e.data, function(i, a) {
                    var o;
                    this.scale.animation || (o = this.scale.getPointPosition(a, this.scale.calculateCenterOffset(i))), n.points.push(new this.PointClass({
                        value: i,
                        label: t.labels[a],
                        datasetLabel: e.label,
                        x: this.options.animation ? this.scale.xCenter: o.x,
                        y: this.options.animation ? this.scale.yCenter: o.y,
                        strokeColor: e.pointStrokeColor,
                        fillColor: e.pointColor,
                        highlightFill: e.pointHighlightFill || e.pointColor,
                        highlightStroke: e.pointHighlightStroke || e.pointStrokeColor
                    }))
                }, this)
            }, this), this.render()
        },
        eachPoints: function(t) {
            i.each(this.datasets, function(e) {
                i.each(e.points, t, this)
            }, this)
        },
        getPointsAtEvent: function(t) {
            var e = i.getRelativePosition(t), n = i.getAngleFromPoint({
                x: this.scale.xCenter,
                y: this.scale.yCenter
            }, e), a = 2 * Math.PI / this.scale.valuesCount, o = Math.round((n.angle - 1.5 * Math.PI) / a), s = [];
            return (o >= this.scale.valuesCount || 0 > o) && (o = 0), n.distance <= this.scale.drawingArea && i.each(this.datasets, function(t) {
                s.push(t.points[o])
            }), s
        },
        buildScale: function(t) {
            this.scale = new e.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backgroundColors: this.options.scaleBackgroundColors,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth: 0,
                lineColor: this.options.scaleLineColor,
                angleLineColor: this.options.angleLineColor,
                angleLineWidth: this.options.angleShowLineOut ? this.options.angleLineWidth: 0,
                pointLabelFontColor: this.options.pointLabelFontColor,
                pointLabelFontSize: this.options.pointLabelFontSize,
                pointLabelFontFamily: this.options.pointLabelFontFamily,
                pointLabelFontStyle: this.options.pointLabelFontStyle,
                height: this.chart.height,
                width: this.chart.width,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                labels: t.labels,
                valuesCount: t.datasets[0].data.length
            }), this.scale.setScaleSize(), this.updateScaleRange(t.datasets), this.scale.buildYLabels()
        },
        updateScaleRange: function(t) {
            var e = function() {
                var e = [];
                return i.each(t, function(t) {
                    t.data ? e = e.concat(t.data) : i.each(t.points, function(t) {
                        e.push(t.value)
                    })
                }), e
            }(), n = this.options.scaleOverride ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }
            : i.calculateScaleRange(e, i.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            i.extend(this.scale, n)
        },
        addData: function(t, e) {
            this.scale.valuesCount++, i.each(t, function(t, i) {
                var n = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(t));
                this.datasets[i].points.push(new this.PointClass({
                    value: t,
                    label: e,
                    datasetLabel: this.datasets[i].label,
                    x: n.x,
                    y: n.y,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor
                }))
            }, this), this.scale.labels.push(e), this.reflow(), this.update()
        },
        removeData: function() {
            this.scale.valuesCount--, this.scale.labels.shift(), i.each(this.datasets, function(t) {
                t.points.shift()
            }, this), this.reflow(), this.update()
        },
        update: function() {
            this.eachPoints(function(t) {
                t.save()
            }), this.reflow(), this.render()
        },
        reflow: function() {
            i.extend(this.scale, {
                width: this.chart.width,
                height: this.chart.height,
                size: i.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            }), this.updateScaleRange(this.datasets), this.scale.setScaleSize(), this.scale.buildYLabels()
        },
        draw: function(t) {
            var e = t || 1, n = this.chart.ctx;
            this.clear(), this.scale.draw(), i.each(this.datasets, function(t) {
                i.each(t.points, function(t, i) {
                    t.hasValue() && t.transition(this.scale.getPointPosition(i, this.scale.calculateCenterOffset(t.value)), e)
                }, this), n.lineWidth = this.options.datasetStrokeWidth, n.strokeStyle = t.strokeColor, n.beginPath(), i.each(t.points, function(t, e) {
                    0 === e ? n.moveTo(t.x, t.y) : n.lineTo(t.x, t.y)
                }, this), n.closePath(), n.stroke(), n.fillStyle = t.fillColor, this.options.datasetFill && n.fill(), i.each(t.points, function(t) {
                    t.hasValue() && t.draw()
                })
            }, this)
        }
    })
}.call(this), $(document).ready(function() {
    scaleVideoContainer(), initBannerVideoSize(".video-container .poster img"), initBannerVideoSize(".video-container .filter"), initBannerVideoSize(".video-container video"), $(window).on("resize", function() {
        scaleVideoContainer(), scaleBannerVideoSize(".video-container .poster img"), scaleBannerVideoSize(".video-container .filter"), scaleBannerVideoSize(".video-container video")
    })
}), function() {
    var t, e, i, n, a, o = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }, s = [].indexOf || function(t) {
        for (var e = 0, i = this.length; i > e; e++)
            if (e in this && this[e] === t)
                return e;
        return - 1
    };
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var i, n;
            for (i in e)
                n = e[i], null == t[i] && (t[i] = n);
            return t
        }, t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function(t, e, i, n) {
            var a;
            return null == e && (e=!1), null == i && (i=!1), null == n && (n = null), null != document.createEvent ? (a = document.createEvent("CustomEvent"), a.initCustomEvent(t, e, i, n)) : null != document.createEventObject ? (a = document.createEventObject(), a.eventType = t) : a.eventName = t, a
        }, t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function(t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }, t.prototype.removeEvent = function(t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), i = this.WeakMap || this.MozWeakMap || (i = function() {
        function t() {
            this.keys = [], this.values = []
        }
        return t.prototype.get = function(t) {
            var e, i, n, a, o;
            for (o = this.keys, e = n = 0, a = o.length; a > n; e=++n)
                if (i = o[e], i === t)
                    return this.values[e]
        }, t.prototype.set = function(t, e) {
            var i, n, a, o, s;
            for (s = this.keys, i = a = 0, o = s.length; o > a; i=++a)
                if (n = s[i], n === t)
                    return void(this.values[i] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported=!0, t.prototype.observe = function() {}, t
    }()), n = this.getComputedStyle || function(t, e) {
        return this.getPropertyValue = function(e) {
            var i;
            return "float" === e && (e = "styleFloat"), a.test(e) && e.replace(a, function(t, e) {
                return e.toUpperCase()
            }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
        }, this
    }, a = /(\-([a-z]){1})/g, this.WOW = function() {
        function a(t) {
            null == t && (t = {}), this.scrollCallback = o(this.scrollCallback, this), this.scrollHandler = o(this.scrollHandler, this), this.resetAnimation = o(this.resetAnimation, this), this.start = o(this.start, this), this.scrolled=!0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return a.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, a.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, a.prototype.start = function() {
            var e, i, n, a;
            if (this.stopped=!1, this.boxes = function() {
                var t, i, n, a;
                for (n = this.element.querySelectorAll("." + this.config.boxClass), a = [], t = 0, i = n.length; i > t; t++)
                    e = n[t], a.push(e);
                return a
            }.call(this), this.all = function() {
                var t, i, n, a;
                for (n = this.boxes, a = [], t = 0, i = n.length; i > t; t++)
                    e = n[t], a.push(e);
                return a
            }.call(this), this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (a = this.boxes, i = 0, n = a.length; n > i; i++)
                        e = a[i], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function(t) {
                return function(e) {
                    var i, n, a, o, s;
                    for (s = [], i = 0, n = e.length; n > i; i++)
                        o = e[i], s.push(function() {
                            var t, e, i, n;
                            for (i = o.addedNodes || [], n = [], t = 0, e = i.length; e > t; t++)
                                a = i[t], n.push(this.doSync(a));
                                return n
                            }.call(t));
                    return s
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, a.prototype.stop = function() {
            return this.stopped=!0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, a.prototype.sync = function(e) {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, a.prototype.doSync = function(t) {
            var e, i, n, a, o;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (t = t.parentNode || t, a = t.querySelectorAll("." + this.config.boxClass), o = [], i = 0, n = a.length; n > i; i++)
                    e = a[i], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), o.push(this.scrolled=!0)) : o.push(void 0);
                return o
            }
        }, a.prototype.show = function(t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, a.prototype.applyStyle = function(t, e) {
            var i, n, a;
            return n = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), a = t.getAttribute("data-wow-iteration"), this.animate(function(o) {
                return function() {
                    return o.customStyle(t, e, n, i, a)
                }
            }(this))
        }, a.prototype.animate = function() {
            return "requestAnimationFrame"in window ? function(t) {
                return window.requestAnimationFrame(t)
            } : function(t) {
                return t()
            }
        }(), a.prototype.resetStyle = function() {
            var t, e, i, n, a;
            for (n = this.boxes, a = [], e = 0, i = n.length; i > e; e++)
                t = n[e], a.push(t.style.visibility = "visible");
            return a
        }, a.prototype.resetAnimation = function(t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, a.prototype.customStyle = function(t, e, i, n, a) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                animationDuration: i
            }), n && this.vendorSet(t.style, {
                animationDelay: n
            }), a && this.vendorSet(t.style, {
                animationIterationCount: a
            }), this.vendorSet(t.style, {
                animationName: e ? "none": this.cachedAnimationName(t)
            }), t
        }, a.prototype.vendors = ["moz", "webkit"], a.prototype.vendorSet = function(t, e) {
            var i, n, a, o;
            n = [];
            for (i in e)
                a = e[i], t["" + i] = a, n.push(function() {
                    var e, n, s, r;
                    for (s = this.vendors, r = [], e = 0, n = s.length; n > e; e++)
                        o = s[e], r.push(t["" + o + i.charAt(0).toUpperCase() + i.substr(1)] = a);
                        return r
                    }.call(this));
            return n
        }, a.prototype.vendorCSS = function(t, e) {
            var i, a, o, s, r, l;
            for (r = n(t), s = r.getPropertyCSSValue(e), o = this.vendors, i = 0, a = o.length; a > i; i++)
                l = o[i], s = s || r.getPropertyCSSValue("-" + l + "-" + e);
            return s
        }, a.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = n(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, a.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, a.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, a.prototype.scrollHandler = function() {
            return this.scrolled=!0
        }, a.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled=!1, this.boxes = function() {
                var e, i, n, a;
                for (n = this.boxes, a = [], e = 0, i = n.length; i > e; e++)
                    t = n[e], t && (this.isVisible(t) ? this.show(t) : a.push(t));
                return a
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, a.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;)
                t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;)
                e += t.offsetTop;
            return e
        }, a.prototype.isVisible = function(t) {
            var e, i, n, a, o;
            return i = t.getAttribute("data-wow-offset") || this.config.offset, o = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, a = o + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, n = this.offsetTop(t), e = n + t.clientHeight, a >= n && e >= o
        }, a.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }, a.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, a
    }()
}.call(this), $(window).scroll(function() {
    $(".navbar").offset() && ($(".navbar").offset().top > 50 ? $(".scrolling-navbar").addClass("top-nav-collapse") : $(".scrolling-navbar").removeClass("top-nav-collapse"))
}), $(function() {
    $("a.page-scroll").bind("click", function(t) {
        var e = $(this);
        $("html, body").stop().animate({
            scrollTop: $(e.attr("href")).offset().top
        }, 1500, "easeInOutExpo"), t.preventDefault()
    })
}), function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define([], function() {
        return e.apply(t)
    }) : "object" == typeof exports ? module.exports = e.call(t) : t.Waves = e.call(t)
}("object" == typeof global ? global : this, function() {
    "use strict";
    function a(t) {
        return null !== t && t === t.window
    }
    function o(t) {
        return a(t) ? t : 9 === t.nodeType && t.defaultView
    }
    function s(t) {
        var e = typeof t;
        return "function" === e || "object" === e&&!!t
    }
    function r(t) {
        return s(t) && t.nodeType > 0
    }
    function l(t) {
        var n = i.call(t);
        return "[object String]" === n ? e(t) : s(t) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(n) && t.hasOwnProperty("length") ? t : r(t) ? [t] : []
    }
    function c(t) {
        var e, i, n = {
            top: 0,
            left: 0
        }, a = t && t.ownerDocument;
        return e = a.documentElement, "undefined" != typeof t.getBoundingClientRect && (n = t.getBoundingClientRect()), i = o(a), {
            top: n.top + i.pageYOffset - e.clientTop,
            left: n.left + i.pageXOffset - e.clientLeft
        }
    }
    function u(t) {
        var e = "";
        for (var i in t)
            t.hasOwnProperty(i) && (e += i + ":" + t[i] + ";");
        return e
    }
    function d(t, e, i) {
        if (i) {
            i.classList.remove("waves-rippling");
            var n = i.getAttribute("data-x"), a = i.getAttribute("data-y"), o = i.getAttribute("data-scale"), s = i.getAttribute("data-translate"), r = Date.now() - Number(i.getAttribute("data-hold")), l = 350 - r;
            0 > l && (l = 0), "mousemove" === t.type && (l = 150);
            var c = "mousemove" === t.type ? 2500: h.duration;
            setTimeout(function() {
                var t = {
                    top: a + "px",
                    left: n + "px",
                    opacity: "0",
                    "-webkit-transition-duration": c + "ms",
                    "-moz-transition-duration": c + "ms",
                    "-o-transition-duration": c + "ms",
                    "transition-duration": c + "ms",
                    "-webkit-transform": o + " " + s,
                    "-moz-transform": o + " " + s,
                    "-ms-transform": o + " " + s,
                    "-o-transform": o + " " + s,
                    transform: o + " " + s
                };
                i.setAttribute("style", u(t)), setTimeout(function() {
                    try {
                        e.removeChild(i)
                    } catch (t) {
                        return !1
                    }
                }, c)
            }, l)
        }
    }
    function m(t) {
        if (p.allowEvent(t)===!1)
            return null;
        for (var e = null, i = t.target || t.srcElement; null !== i.parentElement;) {
            if (i.classList.contains("waves-effect")&&!(i instanceof SVGElement)) {
                e = i;
                break
            }
            i = i.parentElement
        }
        return e
    }
    function v(t) {
        var e = m(t);
        if (null !== e) {
            if (e.disabled || e.getAttribute("disabled") || e.classList.contains("disabled"))
                return;
            if (p.registerEvent(t), "touchstart" === t.type && h.delay) {
                var i=!1, a = setTimeout(function() {
                    a = null, h.show(t, e)
                }, h.delay), o = function(n) {
                    a && (clearTimeout(a), a = null, h.show(t, e)), i || (i=!0, h.hide(n, e))
                }, s = function(t) {
                    a && (clearTimeout(a), a = null), o(t)
                };
                e.addEventListener("touchmove", s, !1), e.addEventListener("touchend", o, !1), e.addEventListener("touchcancel", o, !1)
            } else
                h.show(t, e), n && (e.addEventListener("touchend", h.hide, !1), e.addEventListener("touchcancel", h.hide, !1)), e.addEventListener("mouseup", h.hide, !1), e.addEventListener("mouseleave", h.hide, !1)
        }
    }
    var t = t || {}, e = document.querySelectorAll.bind(document), i = Object.prototype.toString, n = "ontouchstart"in window, h = {
        duration: 750,
        delay: 200,
        show: function(t, e, i) {
            if (2 === t.button)
                return !1;
            e = e || this;
            var n = document.createElement("div");
            n.className = "waves-ripple waves-rippling", e.appendChild(n);
            var a = c(e), o = 0, s = 0;
            "touches"in t && t.touches.length ? (o = t.touches[0].pageY - a.top, s = t.touches[0].pageX - a.left) : (o = t.pageY - a.top, s = t.pageX - a.left), s = s >= 0 ? s : 0, o = o >= 0 ? o : 0;
            var r = "scale(" + e.clientWidth / 100 * 3 + ")", l = "translate(0,0)";
            i && (l = "translate(" + i.x + "px, " + i.y + "px)"), n.setAttribute("data-hold", Date.now()), n.setAttribute("data-x", s), n.setAttribute("data-y", o), n.setAttribute("data-scale", r), n.setAttribute("data-translate", l);
            var f = {
                top: o + "px",
                left: s + "px"
            };
            n.classList.add("waves-notransition"), n.setAttribute("style", u(f)), n.classList.remove("waves-notransition"), f["-webkit-transform"] = r + " " + l, f["-moz-transform"] = r + " " + l, f["-ms-transform"] = r + " " + l, f["-o-transform"] = r + " " + l, f.transform = r + " " + l, f.opacity = "1";
            var d = "mousemove" === t.type ? 2500: h.duration;
            f["-webkit-transition-duration"] = d + "ms", f["-moz-transition-duration"] = d + "ms", f["-o-transition-duration"] = d + "ms", f["transition-duration"] = d + "ms", n.setAttribute("style", u(f))
        },
        hide: function(t, e) {
            e = e || this;
            for (var i = e.getElementsByClassName("waves-rippling"), n = 0, a = i.length; a > n; n++)
                d(t, e, i[n])
        }
    }, f = {
        input: function(t) {
            var e = t.parentNode;
            if ("i" !== e.tagName.toLowerCase() ||!e.classList.contains("waves-effect")) {
                var i = document.createElement("i");
                i.className = t.className + " waves-input-wrapper", t.className = "waves-button-input", e.replaceChild(i, t), i.appendChild(t);
                var n = window.getComputedStyle(t, null), a = n.color, o = n.backgroundColor;
                i.setAttribute("style", "color:" + a + ";background:" + o), t.setAttribute("style", "background-color:rgba(0,0,0,0);")
            }
        },
        img: function(t) {
            var e = t.parentNode;
            if ("i" !== e.tagName.toLowerCase() ||!e.classList.contains("waves-effect")) {
                var i = document.createElement("i");
                e.replaceChild(i, t), i.appendChild(t)
            }
        }
    }, p = {
        touches: 0,
        allowEvent: function(t) {
            var e=!0;
            return /^(mousedown|mousemove)$/.test(t.type) && p.touches && (e=!1), e
        },
        registerEvent: function(t) {
            var e = t.type;
            "touchstart" === e ? p.touches += 1 : /^(touchend|touchcancel)$/.test(e) && setTimeout(function() {
                p.touches && (p.touches -= 1)
            }, 500)
        }
    };
    return t.init = function(t) {
        var e = document.body;
        t = t || {}, "duration"in t && (h.duration = t.duration), "delay"in t && (h.delay = t.delay), n && (e.addEventListener("touchstart", v, !1), e.addEventListener("touchcancel", p.registerEvent, !1), e.addEventListener("touchend", p.registerEvent, !1)), e.addEventListener("mousedown", v, !1)
    }, t.attach = function(t, e) {
        t = l(t), "[object Array]" === i.call(e) && (e = e.join(" ")), e = e ? " " + e : "";
        for (var n, a, o = 0, s = t.length; s > o; o++)
            n = t[o], a = n.tagName.toLowerCase(), - 1 !== ["input", "img"].indexOf(a) && (f[a](n), n = n.parentElement), - 1 === n.className.indexOf("waves-effect") && (n.className += " waves-effect" + e)
    }, t.ripple = function(t, e) {
        t = l(t);
        var i = t.length;
        if (e = e || {}, e.wait = e.wait || 0, e.position = e.position || null, i)
            for (var n, a, o, s = {}, r = 0, u = {
                type: "mousedown",
                button: 1
            }, f = function(t, e) {
                return function() {
                    h.hide(t, e)
                }
            }; i > r; r++)
                if (n = t[r], a = e.position || {
                    x: n.clientWidth / 2,
                    y: n.clientHeight / 2
                }, o = c(n), s.x = o.left + a.x, s.y = o.top + a.y, u.pageX = s.x, u.pageY = s.y, h.show(u, n), e.wait >= 0 && null !== e.wait) {
                    var d = {
                        type: "mouseup",
                        button: 1
                    };
                    setTimeout(f(d, n), e.wait)
                }
    }, t.calm = function(t) {
        t = l(t);
        for (var e = {
            type: "mouseup",
            button: 1
        }, i = 0, n = t.length; n > i; i++)
            h.hide(e, t[i])
    }, t.displayEffect = function(e) {
        console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"), t.init(e)
    }, t
}), Waves.attach(".btn, .btn-floating", ["waves-light"]), Waves.attach(".view .mask", ["waves-light"]), Waves.attach(".waves-light", ["waves-light"]), Waves.attach(".navbar-nav a, .navbar form", ["waves-light"]), Waves.attach(".navbar-brand", ["waves-light"]), Waves.attach(".double-nav li", ["waves-light"]), Waves.init(), $(document).ready(function() {
    $("#preloader-markup").load("mdb-addons/preloader.html", function() {
        $(window).load(function() {
            $("#mdb-preloader").fadeOut("slow")
        })
    })
}), function(t) {
    t(document).ready(function() {
        t(document).on("click.card", ".card", function(e) {
            t(this).find(".card-reveal").length && (t(e.target).is(t(".card-reveal .card-title")) || t(e.target).is(t(".card-reveal .card-title i")) ? t(this).find(".card-reveal").velocity({
                translateY: 0
            }, {
                duration: 225,
                queue: !1,
                easing: "easeInOutQuad",
                complete: function() {
                    t(this).css({
                        display: "none"
                    })
                }
            }) : (t(e.target).is(t(".card .activator")) || t(e.target).is(t(".card .activator i"))) && t(this).find(".card-reveal").css({
                display: "block"
            }).velocity("stop", !1).velocity({
                translateY: "-100%"
            }, {
                duration: 300,
                queue: !1,
                easing: "easeInOutQuad"
            }))
        })
    })
}(jQuery), $(document).ready(function(t) {
    t(".card-share > a").on("click", function(e) {
        e.preventDefault(), t(this).parent().find("div").toggleClass("social-reveal-active"), t(this).toggleClass("share-expanded")
    })
}), function(t) {
    function e() {
        var e =+ t(this).attr("length"), i =+ t(this).val().length, n = e >= i;
        t(this).parent().find('span[class="character-counter"]').html(i + "/" + e), a(n, t(this))
    }
    function i(e) {
        var i = t("<span/>").addClass("character-counter").css("float", "right").css("font-size", "12px").css("height", 1);
        e.parent().append(i)
    }
    function n() {
        t(this).parent().find('span[class="character-counter"]').html("")
    }
    function a(t, e) {
        var i = e.hasClass("invalid");
        t && i ? e.removeClass("invalid") : t || i || (e.removeClass("valid"), e.addClass("invalid"))
    }
    t.fn.characterCounter = function() {
        return this.each(function() {
            var a = void 0 !== t(this).attr("length");
            a && (t(this).on("input", e), t(this).on("focus", e), t(this).on("blur", n), i(t(this)))
        })
    }, t(document).ready(function() {
        t("input, textarea").characterCounter()
    })
}(jQuery), function(t) {
    t(["jquery"], function(t) {
        return function() {
            function r(t, e, i) {
                return w({
                    type: a.error,
                    iconClass: x().iconClasses.error,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function l(i, n) {
                return i || (i = x()), e = t("#" + i.containerId), e.length ? e : (n && (e = g(i)), e)
            }
            function c(t, e, i) {
                return w({
                    type: a.info,
                    iconClass: x().iconClasses.info,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function u(t) {
                i = t
            }
            function h(t, e, i) {
                return w({
                    type: a.success,
                    iconClass: x().iconClasses.success,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function f(t, e, i) {
                return w({
                    type: a.warning,
                    iconClass: x().iconClasses.warning,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }
            function d(t, i) {
                var n = x();
                e || l(n), v(t, n, i) || m(n)
            }
            function p(i) {
                var n = x();
                return e || l(n), i && 0 === t(":focus", i).length ? void C(i) : void(e.children().length && e.remove())
            }
            function m(i) {
                for (var n = e.children(), a = n.length - 1; a >= 0; a--)
                    v(t(n[a]), i)
            }
            function v(e, i, n) {
                var a = n && n.force ? n.force: !1;
                return e && (a || 0 === t(":focus", e).length) ? (e[i.hideMethod]({
                    duration: i.hideDuration,
                    easing: i.hideEasing,
                    complete: function() {
                        C(e)
                    }
                }), !0) : !1
            }
            function g(i) {
                return e = t("<div/>").attr("id", i.containerId).addClass(i.positionClass).attr("aria-live", "polite").attr("role", "alert"), e.appendTo(t(i.target)), e
            }
            function y() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    closeMethod: !1,
                    closeDuration: !1,
                    closeEasing: !1,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    }, iconClass : "toast-info", positionClass : "toast-top-right", timeOut : 5e3, titleClass : "toast-title", messageClass : "toast-message", escapeHtml : !1, target : "body", closeHtml : '<button type="button">&times;</button>', newestOnTop : !0, preventDuplicates : !1, progressBar : !1
                }
            }
            function b(t) {
                i && i(t)
            }
            function w(i) {
                function v(t) {
                    return null == t && (t = ""), new String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }
                function g() {
                    S(), P(), T(), A(), E(), k()
                }
                function y() {
                    c.hover(O, F), !a.onclick && a.tapToDismiss && c.click(L), a.closeButton && d && d.click(function(t) {
                        t.stopPropagation ? t.stopPropagation() : void 0 !== t.cancelBubble && t.cancelBubble!==!0 && (t.cancelBubble=!0), L(!0)
                    }), a.onclick && c.click(function(t) {
                        a.onclick(t), L()
                    })
                }
                function w() {
                    c.hide(), c[a.showMethod]({
                        duration: a.showDuration,
                        easing: a.showEasing,
                        complete: a.onShown
                    }), a.timeOut > 0 && (r = setTimeout(L, a.timeOut), p.maxHideTime = parseFloat(a.timeOut), p.hideEta = (new Date).getTime() + p.maxHideTime, a.progressBar && (p.intervalId = setInterval(I, 10)))
                }
                function S() {
                    i.iconClass && c.addClass(a.toastClass).addClass(o)
                }
                function k() {
                    a.newestOnTop ? e.prepend(c) : e.append(c)
                }
                function P() {
                    i.title && (u.append(a.escapeHtml ? v(i.title) : i.title).addClass(a.titleClass), c.append(u))
                }
                function T() {
                    i.message && (h.append(a.escapeHtml ? v(i.message) : i.message).addClass(a.messageClass), c.append(h))
                }
                function A() {
                    a.closeButton && (d.addClass("toast-close-button").attr("role", "button"), c.prepend(d))
                }
                function E() {
                    a.progressBar && (f.addClass("toast-progress"), c.prepend(f))
                }
                function M(t, e) {
                    if (t.preventDuplicates) {
                        if (e.message === s)
                            return !0;
                        s = e.message
                    }
                    return !1
                }
                function L(e) {
                    var i = e && a.closeMethod!==!1 ? a.closeMethod: a.hideMethod, n = e && a.closeDuration!==!1 ? a.closeDuration: a.hideDuration, o = e && a.closeEasing!==!1 ? a.closeEasing: a.hideEasing;
                    return !t(":focus", c).length || e ? (clearTimeout(p.intervalId), c[i]({
                        duration: n,
                        easing: o,
                        complete: function() {
                            C(c), a.onHidden && "hidden" !== m.state && a.onHidden(), m.state = "hidden", m.endTime = new Date, b(m)
                        }
                    })) : void 0
                }
                function F() {
                    (a.timeOut > 0 || a.extendedTimeOut > 0) && (r = setTimeout(L, a.extendedTimeOut), p.maxHideTime = parseFloat(a.extendedTimeOut), p.hideEta = (new Date).getTime() + p.maxHideTime)
                }
                function O() {
                    clearTimeout(r), p.hideEta = 0, c.stop(!0, !0)[a.showMethod]({
                        duration: a.showDuration,
                        easing: a.showEasing
                    })
                }
                function I() {
                    var t = (p.hideEta - (new Date).getTime()) / p.maxHideTime * 100;
                    f.width(t + "%")
                }
                var a = x(), o = i.iconClass || a.iconClass;
                if ("undefined" != typeof i.optionsOverride && (a = t.extend(a, i.optionsOverride), o = i.optionsOverride.iconClass || o), !M(a, i)) {
                    n++, e = l(a, !0);
                    var r = null, c = t("<div/>"), u = t("<div/>"), h = t("<div/>"), f = t("<div/>"), d = t(a.closeHtml), p = {
                        intervalId: null,
                        hideEta: null,
                        maxHideTime: null
                    }, m = {
                        toastId: n,
                        state: "visible",
                        startTime: new Date,
                        options: a,
                        map: i
                    };
                    return g(), w(), y(), b(m), a.debug && console && console.log(m), c
                }
            }
            function x() {
                return t.extend({}, y(), o.options)
            }
            function C(t) {
                e || (e = l()), t.is(":visible") || (t.remove(), t = null, 0 === e.children().length && (e.remove(), s = void 0))
            }
            var e, i, s, n = 0, a = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            }, o = {
                clear: d,
                remove: p,
                error: r,
                getContainer: l,
                info: c,
                options: {},
                subscribe: u,
                success: h,
                version: "2.1.2",
                warning: f
            };
            return o
        }()
    })
}("function" == typeof define && define.amd ? define : function(t, e) {
    "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : window.toastr = e(window.jQuery)
}), $(".smooth-scroll").on("click", "a", function(t) {
    t.preventDefault();
    var e = $(this).attr("href");
    $("body,html").animate({
        scrollTop: $(e).offset().top
    }, 700)
}), function(t) {
    t.fn.scrollTo = function(e) {
        return t(this).scrollTop(t(this).scrollTop() - t(this).offset().top + t(e).offset().top), this
    }, t.fn.dropdown = function(e) {
        var i = {
            inDuration: 300,
            outDuration: 225,
            constrain_width: !0,
            hover: !1,
            gutter: 0,
            belowOrigin: !1,
            alignment: "left"
        };
        this.each(function() {
            function r() {
                void 0 !== n.data("induration") && (a.inDuration = n.data("inDuration")), void 0 !== n.data("outduration") && (a.outDuration = n.data("outDuration")), void 0 !== n.data("constrainwidth") && (a.constrain_width = n.data("constrainwidth")), void 0 !== n.data("hover") && (a.hover = n.data("hover")), void 0 !== n.data("gutter") && (a.gutter = n.data("gutter")), void 0 !== n.data("beloworigin") && (a.belowOrigin = n.data("beloworigin")), void 0 !== n.data("alignment") && (a.alignment = n.data("alignment"))
            }
            function l(e) {
                "focus" === e && (o=!0), r(), s.addClass("active"), n.addClass("active"), a.constrain_width===!0 ? s.css("width", n.outerWidth()) : s.css("white-space", "nowrap");
                var i = window.innerHeight, l = n.innerHeight(), c = n.offset().left, u = n.offset().top - t(window).scrollTop(), h = a.alignment, f = 0, d = 0, p = 0;
                a.belowOrigin===!0 && (p = l);
                var m = 0, v = n.parent();
                if (!v.is("body") && v[0].scrollHeight > v[0].clientHeight && (m = v[0].scrollTop), c + s.innerWidth() > t(window).width() ? h = "right" : c - s.innerWidth() + n.innerWidth() < 0 && (h = "left"), u + s.innerHeight() > i)
                    if (u + l - s.innerHeight() < 0) {
                        var g = i - u - p;
                        s.css("max-height", g)
                    } else
                        p || (p += l), p -= s.innerHeight();
                if ("left" === h)
                    f = a.gutter, d = n.position().left + f;
                else if ("right" === h) {
                    var y = n.position().left + n.outerWidth() - s.outerWidth();
                    f =- a.gutter, d = y + f
                }
                s.css({
                    position: "absolute",
                    top: n.position().top + p + m,
                    left: d
                }), s.stop(!0, !0).css("opacity", 0).slideDown({
                    queue: !1,
                    duration: a.inDuration,
                    easing: "easeOutCubic",
                    complete: function() {
                        t(this).css("height", "")
                    }
                }).animate({
                    opacity: 1
                }, {
                    queue: !1,
                    duration: a.inDuration,
                    easing: "easeOutSine"
                })
            }
            function c() {
                o=!1, s.fadeOut(a.outDuration), s.removeClass("active"), n.removeClass("active"), setTimeout(function() {
                    s.css("max-height", "")
                }, a.outDuration)
            }
            var n = t(this), a = t.extend({}, i, e), o=!1, s = t("#" + n.attr("data-activates"));
            if (r(), n.after(s), a.hover) {
                var u=!1;
                n.unbind("click." + n.attr("id")), n.on("mouseenter", function(t) {
                    u===!1 && (l(), u=!0)
                }), n.on("mouseleave", function(e) {
                    var i = e.toElement || e.relatedTarget;
                    t(i).closest(".dropdown-content").is(s) || (s.stop(!0, !0), c(), u=!1)
                }), s.on("mouseleave", function(e) {
                    var i = e.toElement || e.relatedTarget;
                    t(i).closest(".dropdown-button").is(n) || (s.stop(!0, !0), c(), u=!1)
                })
            } else
                n.unbind("click." + n.attr("id")), n.bind("click." + n.attr("id"), function(e) {
                    o || (n[0] != e.currentTarget || n.hasClass("active") || 0 !== t(e.target).closest(".dropdown-content").length ? n.hasClass("active") && (c(), t(document).unbind("click." + s.attr("id") + " touchstart." + s.attr("id"))) : (e.preventDefault(), l("click")), s.hasClass("active") && t(document).bind("click." + s.attr("id") + " touchstart." + s.attr("id"), function(e) {
                        s.is(e.target) || n.is(e.target) || n.find(e.target).length || (c(), t(document).unbind("click." + s.attr("id") + " touchstart." + s.attr("id")))
                    }))
                });
            n.on("open", function(t, e) {
                l(e)
            }), n.on("close", c)
        })
    }, t(document).ready(function() {
        t(".dropdown-button").dropdown()
    })
}(jQuery), $(".rotate-btn").on("click", function() {
    var t = $(this).attr("data-card");
    $("#" + t).toggleClass("flipped")
}), function(t) {
    function n(e) {
        if ($this = e, $this.hasClass("active")===!1) {
            $this.addClass("active"), $this.find("ul .btn-floating").velocity({
                scaleY: ".4",
                scaleX: ".4",
                translateY: "40px"
            }, {
                duration: 0
            });
            var i = 0;
            $this.find("ul .btn-floating").reverse().each(function() {
                t(this).velocity({
                    opacity: "1",
                    scaleX: "1",
                    scaleY: "1",
                    translateY: "0"
                }, {
                    duration: 80,
                    delay: i
                }), i += 40
            })
        } else {
            $this.removeClass("active");
            var i = 0;
            $this.find("ul .btn-floating").velocity("stop", !0), $this.find("ul .btn-floating").velocity({
                opacity: "0",
                scaleX: ".4",
                scaleY: ".4",
                translateY: "40px"
            }, {
                duration: 80
            })
        }
    }
    t(document).ready(function() {
        t.fn.reverse = [].reverse, t(document).on("mouseenter.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(i) {
            var n = t(this);
            e(n)
        }), t(document).on("mouseleave.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function(e) {
            var n = t(this);
            i(n)
        }), t(document).on("click.fixedActionBtn", ".fixed-action-btn.click-to-toggle > a", function(n) {
            var a = t(this), o = a.parent();
            o.hasClass("active") ? i(o) : e(o)
        })
    }), t.fn.extend({
        openFAB: function() {
            e(t(this))
        },
        closeFAB: function() {
            i(t(this))
        }
    });
    var e = function(e) {
        if ($this = e, $this.hasClass("active")===!1) {
            var n, a, i = $this.hasClass("horizontal");
            i===!0 ? a = 40 : n = 40, $this.addClass("active"), $this.find("ul .btn-floating").velocity({
                scaleY: ".4",
                scaleX: ".4",
                translateY: n + "px",
                translateX: a + "px"
            }, {
                duration: 0
            });
            var o = 0;
            $this.find("ul .btn-floating").reverse().each(function() {
                t(this).velocity({
                    opacity: "1",
                    scaleX: "1",
                    scaleY: "1",
                    translateY: "0",
                    translateX: "0"
                }, {
                    duration: 80,
                    delay: o
                }), o += 40
            })
        }
    }, i = function(t) {
        $this = t;
        var i, n, e = $this.hasClass("horizontal");
        e===!0 ? n = 40 : i = 40, $this.removeClass("active");
        $this.find("ul .btn-floating").velocity("stop", !0), $this.find("ul .btn-floating").velocity({
            opacity: "0",
            scaleX: ".4",
            scaleY: ".4",
            translateY: i + "px",
            translateX: n + "px"
        }, {
            duration: 80
        })
    };
    t(".fixed-action-btn").on({
        click: function(e) {
            return e.preventDefault(), n(t(".fixed-action-btn")), !1
        }
    })
}(jQuery), function(t) {
    var e = 0, i = 0, n = function() {
        return i++, "materialize-lean-overlay-" + i
    };
    t.fn.extend({
        openModal: function(i) {
            t("body").css("overflow", "hidden");
            var a = {
                opacity: .5,
                in_duration: 350,
                out_duration: 250,
                ready: void 0,
                complete: void 0,
                dismissible: !0,
                starting_top: "4%"
            }, o = n(), s = t(this), r = t('<div class="lean-overlay"></div>'), l=++e;
            r.attr("id", o).css("z-index", 1e3 + 2 * l), s.data("overlay-id", o).css("z-index", 1e3 + 2 * l + 1), t("body").append(r), i = t.extend(a, i), i.dismissible && (r.click(function() {
                s.closeModal(i)
            }), t(document).on("keyup.leanModal" + o, function(t) {
                27 === t.keyCode && s.closeModal(i)
            })), s.find(".modal-close").on("click.close", function(t) {
                s.closeModal(i)
            }), r.css({
                display: "block",
                opacity: 0
            }), s.css({
                display: "block",
                opacity: 0
            }), r.velocity({
                opacity: i.opacity
            }, {
                duration: i.in_duration,
                queue: !1,
                ease: "easeOutCubic"
            }), s.data("associated-overlay", r[0]), s.hasClass("bottom-sheet") ? s.velocity({
                bottom: "0",
                opacity: 1
            }, {
                duration: i.in_duration,
                queue: !1,
                ease: "easeOutCubic",
                complete: function() {
                    "function" == typeof i.ready && i.ready()
                }
            }) : (t.Velocity.hook(s, "scaleX", .7), s.css({
                top: i.starting_top
            }), s.velocity({
                top: "10%",
                opacity: 1,
                scaleX: "1"
            }, {
                duration: i.in_duration,
                queue: !1,
                ease: "easeOutCubic",
                complete: function() {
                    "function" == typeof i.ready && i.ready()
                }
            }))
        }
    }), t.fn.extend({
        closeModal: function(i) {
            var n = {
                out_duration: 250,
                complete: void 0
            }, a = t(this), o = a.data("overlay-id"), s = t("#" + o);
            i = t.extend(n, i), t("body").css("overflow", ""), a.find(".modal-close").off("click.close"), t(document).off("keyup.leanModal" + o), s.velocity({
                opacity: 0
            }, {
                duration: i.out_duration,
                queue: !1,
                ease: "easeOutQuart"
            }), a.hasClass("bottom-sheet") ? a.velocity({
                bottom: "-100%",
                opacity: 0
            }, {
                duration: i.out_duration,
                queue: !1,
                ease: "easeOutCubic",
                complete: function() {
                    s.css({
                        display: "none"
                    }), "function" == typeof i.complete && i.complete(), s.remove(), e--
                }
            }) : a.velocity({
                top: i.starting_top,
                opacity: 0,
                scaleX: .7
            }, {
                duration: i.out_duration,
                complete: function() {
                    t(this).css("display", "none"), "function" == typeof i.complete && i.complete(), s.remove(), e--
                }
            })
        }
    }), t.fn.extend({
        leanModal: function(e) {
            return this.each(function() {
                var i = {
                    starting_top: "4%"
                }, n = t.extend(i, e);
                t(this).click(function(e) {
                    n.starting_top = (t(this).offset().top - t(window).scrollTop()) / 1.15;
                    var i = t(this).attr("href") || "#" + t(this).data("target");
                    t(i).openModal(n), e.preventDefault()
                })
            })
        }
    })
}(jQuery), function(t, e, i, n) {
    "use strict";
    function u(t, e, i) {
        return setTimeout(y(t, i), e)
    }
    function h(t, e, i) {
        return Array.isArray(t) ? (f(t, i[e], i), !0) : !1
    }
    function f(t, e, i) {
        var a;
        if (t)
            if (t.forEach)
                t.forEach(e, i);
            else if (t.length !== n)
                for (a = 0; a < t.length;)
                    e.call(i, t[a], a, t), a++;
            else
                for (a in t)
                    t.hasOwnProperty(a) && e.call(i, t[a], a, t)
    }
    function d(e, i, n) {
        var a = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
        return function() {
            var i = new Error("get-stack-trace"), n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@"): "Unknown Stack Trace", o = t.console && (t.console.warn || t.console.log);
            return o && o.call(t.console, a, n), e.apply(this, arguments)
        }
    }
    function g(t, e, i) {
        var a, n = e.prototype;
        a = t.prototype = Object.create(n), a.constructor = t, a._super = n, i && p(a, i)
    }
    function y(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function b(t, e) {
        return typeof t == s ? t.apply(e ? e[0] || n : n, e) : t
    }
    function w(t, e) {
        return t === n ? e : t
    }
    function x(t, e, i) {
        f(P(e), function(e) {
            t.addEventListener(e, i, !1)
        })
    }
    function C(t, e, i) {
        f(P(e), function(e) {
            t.removeEventListener(e, i, !1)
        })
    }
    function S(t, e) {
        for (; t;) {
            if (t == e)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    function k(t, e) {
        return t.indexOf(e)>-1
    }
    function P(t) {
        return t.trim().split(/\s+/g)
    }
    function T(t, e, i) {
        if (t.indexOf&&!i)
            return t.indexOf(e);
        for (var n = 0; n < t.length;) {
            if (i && t[n][i] == e ||!i && t[n] === e)
                return n;
            n++
        }
        return - 1
    }
    function A(t) {
        return Array.prototype.slice.call(t, 0)
    }
    function E(t, e, i) {
        for (var n = [], a = [], o = 0; o < t.length;) {
            var s = e ? t[o][e]: t[o];
            T(a, s) < 0 && n.push(t[o]), a[o] = s, o++
        }
        return i && (n = e ? n.sort(function(t, i) {
            return t[e] > i[e]
        }) : n.sort()), n
    }
    function M(t, e) {
        for (var i, o, s = e[0].toUpperCase() + e.slice(1), r = 0; r < a.length;) {
            if (i = a[r], o = i ? i + s : e, o in t)
                return o;
            r++
        }
        return n
    }
    function F() {
        return L++
    }
    function O(e) {
        var i = e.ownerDocument || e;
        return i.defaultView || i.parentWindow || t
    }
    function it(t, e) {
        var i = this;
        this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
            b(t.options.enable, [t]) && i.handler(e)
        }, this.init()
    }
    function nt(t) {
        var e, i = t.options.inputClass;
        return new (e = i ? i : D ? kt : z ? Ot : R ? zt : bt)(t, at)
    }
    function at(t, e, i) {
        var n = i.pointers.length, a = i.changedPointers.length, o = e & N && n - a === 0, s = e & ($ | q) && n - a === 0;
        i.isFirst=!!o, i.isFinal=!!s, o && (t.session = {}), i.eventType = e, ot(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
    }
    function ot(t, e) {
        var i = t.session, n = e.pointers, a = n.length;
        i.firstInput || (i.firstInput = lt(e)), a > 1&&!i.firstMultiple ? i.firstMultiple = lt(e) : 1 === a && (i.firstMultiple=!1);
        var o = i.firstInput, s = i.firstMultiple, r = s ? s.center: o.center, u = e.center = ct(n);
        e.timeStamp = c(), e.deltaTime = e.timeStamp - o.timeStamp, e.angle = dt(r, u), e.distance = ft(r, u), st(i, e), e.offsetDirection = ht(e.deltaX, e.deltaY);
        var h = ut(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = h.x, e.overallVelocityY = h.y, e.overallVelocity = l(h.x) > l(h.y) ? h.x : h.y, e.scale = s ? mt(s.pointers, n) : 1, e.rotation = s ? pt(s.pointers, n) : 0, e.maxPointers = i.prevInput ? e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers : e.pointers.length,
        rt(i, e);
        var f = t.element;
        S(e.srcEvent.target, f) && (f = e.srcEvent.target), e.target = f
    }
    function st(t, e) {
        var i = e.center, n = t.offsetDelta || {}, a = t.prevDelta || {}, o = t.prevInput || {};
        (e.eventType === N || o.eventType === $) && (a = t.prevDelta = {
            x: o.deltaX || 0,
            y: o.deltaY || 0
        }, n = t.offsetDelta = {
            x: i.x,
            y: i.y
        }), e.deltaX = a.x + (i.x - n.x), e.deltaY = a.y + (i.y - n.y)
    }
    function rt(t, e) {
        var o, s, r, c, i = t.lastInterval || e, a = e.timeStamp - i.timeStamp;
        if (e.eventType != q && (a > B || i.velocity === n)) {
            var u = e.deltaX - i.deltaX, h = e.deltaY - i.deltaY, f = ut(a, u, h);
            s = f.x, r = f.y, o = l(f.x) > l(f.y) ? f.x : f.y, c = ht(u, h), t.lastInterval = e
        } else
            o = i.velocity, s = i.velocityX, r = i.velocityY, c = i.direction;
        e.velocity = o, e.velocityX = s, e.velocityY = r, e.direction = c
    }
    function lt(t) {
        for (var e = [], i = 0; i < t.pointers.length;)
            e[i] = {
                clientX: r(t.pointers[i].clientX),
                clientY: r(t.pointers[i].clientY)
            }, i++;
        return {
            timeStamp: c(),
            pointers: e,
            center: ct(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }
    function ct(t) {
        var e = t.length;
        if (1 === e)
            return {
                x: r(t[0].clientX),
                y: r(t[0].clientY)
            };
        for (var i = 0, n = 0, a = 0; e > a;)
            i += t[a].clientX, n += t[a].clientY, a++;
        return {
            x: r(i / e),
            y: r(n / e)
        }
    }
    function ut(t, e, i) {
        return {
            x: e / t || 0,
            y: i / t || 0
        }
    }
    function ht(t, e) {
        return t === e ? X : l(t) >= l(e) ? 0 > t ? Y : Q : 0 > e ? Z : G
    }
    function ft(t, e, i) {
        i || (i = tt);
        var n = e[i[0]] - t[i[0]], a = e[i[1]] - t[i[1]];
        return Math.sqrt(n * n + a * a)
    }
    function dt(t, e, i) {
        i || (i = tt);
        var n = e[i[0]] - t[i[0]], a = e[i[1]] - t[i[1]];
        return 180 * Math.atan2(a, n) / Math.PI
    }
    function pt(t, e) {
        return dt(e[1], e[0], et) + dt(t[1], t[0], et)
    }
    function mt(t, e) {
        return ft(e[0], e[1], et) / ft(t[0], t[1], et)
    }
    function bt() {
        this.evEl = gt, this.evWin = yt, this.pressed=!1, it.apply(this, arguments)
    }
    function kt() {
        this.evEl = Ct, this.evWin = St, it.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    function Et() {
        this.evTarget = Tt, this.evWin = At, this.started=!1, it.apply(this, arguments)
    }
    function Mt(t, e) {
        var i = A(t.touches), n = A(t.changedTouches);
        return e & ($ | q) && (i = E(i.concat(n), "identifier", !0)), [i, n]
    }
    function Ot() {
        this.evTarget = Ft, this.targetIds = {}, it.apply(this, arguments)
    }
    function It(t, e) {
        var i = A(t.touches), n = this.targetIds;
        if (e & (N | j) && 1 === i.length)
            return n[i[0].identifier]=!0, [i, i];
        var a, o, s = A(t.changedTouches), r = [], l = this.target;
        if (o = i.filter(function(t) {
            return S(t.target, l)
        }), e === N)
            for (a = 0; a < o.length;)
                n[o[a].identifier]=!0, a++;
        for (a = 0; a < s.length;)
            n[s[a].identifier] && r.push(s[a]), e & ($ | q) && delete n[s[a].identifier], a++;
        return r.length ? [E(o.concat(r), "identifier", !0), r] : void 0
    }
    function zt() {
        it.apply(this, arguments);
        var t = y(this.handler, this);
        this.touch = new Ot(this.manager, t), this.mouse = new bt(this.manager, t), this.primaryTouch = null, this.lastTouches = []
    }
    function Vt(t, e) {
        t & N ? (this.primaryTouch = e.changedPointers[0].identifier, Wt.call(this, e)) : t & ($ | q) && Wt.call(this, e)
    }
    function Wt(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
            var i = {
                x: e.clientX,
                y: e.clientY
            };
            this.lastTouches.push(i);
            var n = this.lastTouches, a = function() {
                var t = n.indexOf(i);
                t>-1 && n.splice(t, 1)
            };
            setTimeout(a, Rt)
        }
    }
    function _t(t) {
        for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
            var a = this.lastTouches[n], o = Math.abs(e - a.x), s = Math.abs(i - a.y);
            if (Dt >= o && Dt >= s)
                return !0
        }
        return !1
    }
    function Zt(t, e) {
        this.manager = t, this.set(e)
    }
    function Gt(t) {
        if (k(t, qt))
            return qt;
        var e = k(t, Xt), i = k(t, Yt);
        return e && i ? qt : e || i ? e ? Xt : Yt : k(t, $t) ? $t : jt
    }
    function Ut() {
        if (!Bt)
            return !1;
        var e = {}, i = t.CSS && t.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
            e[n] = i ? t.CSS.supports("touch-action", n) : !0
        }), e
    }
    function oe(t) {
        this.options = p({}, this.defaults, t || {}), this.id = F(), this.manager = null, this.options.enable = w(this.options.enable, !0), this.state = Kt, this.simultaneous = {}, this.requireFail = []
    }
    function se(t) {
        return t & ne ? "cancel" : t & ee ? "end" : t & te ? "move" : t & Jt ? "start" : ""
    }
    function re(t) {
        return t == G ? "down" : t == Z ? "up" : t == Y ? "left" : t == Q ? "right" : ""
    }
    function le(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t
    }
    function ce() {
        oe.apply(this, arguments)
    }
    function ue() {
        ce.apply(this, arguments), this.pX = null, this.pY = null
    }
    function he() {
        ce.apply(this, arguments)
    }
    function fe() {
        oe.apply(this, arguments), this._timer = null, this._input = null
    }
    function de() {
        ce.apply(this, arguments)
    }
    function pe() {
        ce.apply(this, arguments)
    }
    function me() {
        oe.apply(this, arguments), this.pTime=!1, this.pCenter=!1, this._timer = null, this._input = null, this.count = 0
    }
    function ve(t, e) {
        return e = e || {}, e.recognizers = w(e.recognizers, ve.defaults.preset), new be(t, e)
    }
    function be(t, e) {
        this.options = p({}, ve.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = nt(this), this.touchAction = new Zt(this, this.options.touchAction), we(this, !0), f(this.options.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
    }
    function we(t, e) {
        var i = t.element;
        if (i.style) {
            var n;
            f(t.options.cssProps, function(a, o) {
                n = M(i.style, o), e ? (t.oldCssProps[n] = i.style[n], i.style[n] = a) : i.style[n] = t.oldCssProps[n] || ""
            }), e || (t.oldCssProps = {})
        }
    }
    function xe(t, i) {
        var n = e.createEvent("Event");
        n.initEvent(t, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
    }
    var p, a = ["", "webkit", "Moz", "MS", "ms", "o"], o = e.createElement("div"), s = "function", r = Math.round, l = Math.abs, c = Date.now;
    p = "function" != typeof Object.assign ? function(t) {
        if (t === n || null === t)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), i = 1; i < arguments.length; i++) {
            var a = arguments[i];
            if (a !== n && null !== a)
                for (var o in a)
                    a.hasOwnProperty(o) && (e[o] = a[o])
        }
        return e
    } : Object.assign;
    var m = d(function(t, e, i) {
        for (var a = Object.keys(e), o = 0; o < a.length;)(!i || i && t[a[o]] === n)
            && (t[a[o]] = e[a[o]]), o++;
        return t
    }, "extend", "Use `assign`."), v = d(function(t, e) {
        return m(t, e, !0)
    }, "merge", "Use `assign`."), L = 1, I = /mobile|tablet|ip(ad|hone|od)|android/i, R = "ontouchstart"in t, D = M(t, "PointerEvent") !== n, z = R && I.test(navigator.userAgent), V = "touch", W = "pen", _ = "mouse", H = "kinect", B = 25, N = 1, j = 2, $ = 4, q = 8, X = 1, Y = 2, Q = 4, Z = 8, G = 16, U = Y | Q, K = Z | G, J = U | K, tt = ["x", "y"], et = ["clientX", "clientY"];
    it.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && x(this.element, this.evEl, this.domHandler), this.evTarget && x(this.target, this.evTarget, this.domHandler), this.evWin && x(O(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && C(this.element, this.evEl, this.domHandler), this.evTarget && C(this.target, this.evTarget, this.domHandler), this.evWin && C(O(this.element), this.evWin, this.domHandler)
        }
    };
    var vt = {
        mousedown: N,
        mousemove: j,
        mouseup: $
    }, gt = "mousedown", yt = "mousemove mouseup";
    g(bt, it, {
        handler: function(t) {
            var e = vt[t.type];
            e & N && 0 === t.button && (this.pressed=!0), e & j && 1 !== t.which && (e = $), this.pressed && (e & $ && (this.pressed=!1), this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: _,
                srcEvent: t
            }))
        }
    });
    var wt = {
        pointerdown: N,
        pointermove: j,
        pointerup: $,
        pointercancel: q,
        pointerout: q
    }, xt = {
        2: V,
        3: W,
        4: _,
        5: H
    }, Ct = "pointerdown", St = "pointermove pointerup pointercancel";
    t.MSPointerEvent&&!t.PointerEvent && (Ct = "MSPointerDown", St = "MSPointerMove MSPointerUp MSPointerCancel"), g(kt, it, {
        handler: function(t) {
            var e = this.store, i=!1, n = t.type.toLowerCase().replace("ms", ""), a = wt[n], o = xt[t.pointerType] || t.pointerType, s = o == V, r = T(e, t.pointerId, "pointerId");
            a & N && (0 === t.button || s) ? 0 > r && (e.push(t), r = e.length - 1) : a & ($ | q) && (i=!0), 0 > r || (e[r] = t, this.callback(this.manager, a, {
                pointers: e,
                changedPointers: [t],
                pointerType: o,
                srcEvent: t
            }), i && e.splice(r, 1))
        }
    });
    var Pt = {
        touchstart: N,
        touchmove: j,
        touchend: $,
        touchcancel: q
    }, Tt = "touchstart", At = "touchstart touchmove touchend touchcancel";
    g(Et, it, {
        handler: function(t) {
            var e = Pt[t.type];
            if (e === N && (this.started=!0), this.started) {
                var i = Mt.call(this, t, e);
                e & ($ | q) && i[0].length - i[1].length === 0 && (this.started=!1), this.callback(this.manager, e, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: V,
                    srcEvent: t
                })
            }
        }
    });
    var Lt = {
        touchstart: N,
        touchmove: j,
        touchend: $,
        touchcancel: q
    }, Ft = "touchstart touchmove touchend touchcancel";
    g(Ot, it, {
        handler: function(t) {
            var e = Lt[t.type], i = It.call(this, t, e);
            i && this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: V,
                srcEvent: t
            })
        }
    });
    var Rt = 2500, Dt = 25;
    g(zt, it, {
        handler: function(t, e, i) {
            var n = i.pointerType == V, a = i.pointerType == _;
            if (!(a && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                if (n)
                    Vt.call(this, e, i);
                else if (a && _t.call(this, i))
                    return;
                this.callback(t, e, i)
            }
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Ht = M(o.style, "touchAction"), Bt = Ht !== n, Nt = "compute", jt = "auto", $t = "manipulation", qt = "none", Xt = "pan-x", Yt = "pan-y", Qt = Ut();
    Zt.prototype = {
        set: function(t) {
            t == Nt && (t = this.compute()), Bt && this.manager.element.style && Qt[t] && (this.manager.element.style[Ht] = t), this.actions = t.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var t = [];
            return f(this.manager.recognizers, function(e) {
                b(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }), Gt(t.join(" "))
        },
        preventDefaults: function(t) {
            var e = t.srcEvent, i = t.offsetDirection;
            if (this.manager.session.prevented)
                return void e.preventDefault();
            var n = this.actions, a = k(n, qt)&&!Qt[qt], o = k(n, Yt)&&!Qt[Yt], s = k(n, Xt)&&!Qt[Xt];
            if (a) {
                var r = 1 === t.pointers.length, l = t.distance < 2, c = t.deltaTime < 250;
                if (r && l && c)
                    return
            }
            return s && o ? void 0 : a || o && i & U || s && i & K ? this.preventSrc(e) : void 0
        },
        preventSrc: function(t) {
            this.manager.session.prevented=!0, t.preventDefault()
        }
    };
    var Kt = 1, Jt = 2, te = 4, ee = 8, ie = ee, ne = 16, ae = 32;
    oe.prototype = {
        defaults: {},
        set: function(t) {
            return p(this.options, t), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(t) {
            if (h(t, "recognizeWith", this))
                return this;
            var e = this.simultaneous;
            return t = le(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
        },
        dropRecognizeWith: function(t) {
            return h(t, "dropRecognizeWith", this) ? this : (t = le(t, this), delete this.simultaneous[t.id], this)
        },
        requireFailure: function(t) {
            if (h(t, "requireFailure", this))
                return this;
            var e = this.requireFail;
            return t = le(t, this), - 1 === T(e, t) && (e.push(t), t.requireFailure(this)), this
        },
        dropRequireFailure: function(t) {
            if (h(t, "dropRequireFailure", this))
                return this;
            t = le(t, this);
            var e = T(this.requireFail, t);
            return e>-1 && this.requireFail.splice(e, 1), this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },
        emit: function(t) {
            function n(i) {
                e.manager.emit(i, t)
            }
            var e = this, i = this.state;
            ee > i && n(e.options.event + se(i)), n(e.options.event), t.additionalEvent && n(t.additionalEvent), i >= ee && n(e.options.event + se(i))
        },
        tryEmit: function(t) {
            return this.canEmit() ? this.emit(t) : void(this.state = ae)
        },
        canEmit: function() {
            for (var t = 0; t < this.requireFail.length;) {
                if (!(this.requireFail[t].state & (ae | Kt)))
                    return !1;
                t++
            }
            return !0
        },
        recognize: function(t) {
            var e = p({}, t);
            return b(this.options.enable, [this, e]) ? (this.state & (ie | ne | ae) && (this.state = Kt), this.state = this.process(e), void(this.state & (Jt | te | ee | ne) && this.tryEmit(e))) : (this.reset(), void(this.state = ae))
        },
        process: function(t) {},
        getTouchAction: function() {},
        reset: function() {}
    }, g(ce, oe, {
        defaults: {
            pointers: 1
        },
        attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function(t) {
            var e = this.state, i = t.eventType, n = e & (Jt | te), a = this.attrTest(t);
            return n && (i & q ||!a) ? e | ne : n || a ? i & $ ? e | ee : e & Jt ? e | te : Jt : ae
        }
    }), g(ue, ce, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: J
        },
        getTouchAction: function() {
            var t = this.options.direction, e = [];
            return t & U && e.push(Yt), t & K && e.push(Xt), e
        },
        directionTest: function(t) {
            var e = this.options, i=!0, n = t.distance, a = t.direction, o = t.deltaX, s = t.deltaY;
            return a & e.direction || (e.direction & U ? (a = 0 === o ? X : 0 > o ? Y : Q, i = o != this.pX, n = Math.abs(t.deltaX)) : (a = 0 === s ? X : 0 > s ? Z : G, i = s != this.pY, n = Math.abs(t.deltaY))), t.direction = a, i && n > e.threshold && a & e.direction
        },
        attrTest: function(t) {
            return ce.prototype.attrTest.call(this, t) && (this.state & Jt ||!(this.state & Jt) && this.directionTest(t))
        },
        emit: function(t) {
            this.pX = t.deltaX, this.pY = t.deltaY;
            var e = re(t.direction);
            e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
        }
    }), g(he, ce, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [qt]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & Jt)
        },
        emit: function(t) {
            if (1 !== t.scale) {
                var e = t.scale < 1 ? "in": "out";
                t.additionalEvent = this.options.event + e
            }
            this._super.emit.call(this, t)
        }
    }), g(fe, oe, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [jt]
        },
        process: function(t) {
            var e = this.options, i = t.pointers.length === e.pointers, n = t.distance < e.threshold, a = t.deltaTime > e.time;
            if (this._input = t, !n ||!i || t.eventType & ($ | q)&&!a)
                this.reset();
            else if (t.eventType & N)
                this.reset(), this._timer = u(function() {
                    this.state = ie, this.tryEmit()
                }, e.time, this);
            else if (t.eventType & $)
                return ie;
            return ae
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(t) {
            this.state === ie && (t && t.eventType & $ ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = c(), this.manager.emit(this.options.event, this._input)))
        }
    }), g(de, ce, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [qt]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & Jt)
        }
    }), g(pe, ce, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: U | K,
            pointers: 1
        },
        getTouchAction: function() {
            return ue.prototype.getTouchAction.call(this)
        },
        attrTest: function(t) {
            var i, e = this.options.direction;
            return e & (U | K) ? i = t.overallVelocity : e & U ? i = t.overallVelocityX : e & K && (i = t.overallVelocityY), this._super.attrTest.call(this, t) && e & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && l(i) > this.options.velocity && t.eventType & $
        },
        emit: function(t) {
            var e = re(t.offsetDirection);
            e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }
    }), g(me, oe, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [$t]
        },
        process: function(t) {
            var e = this.options, i = t.pointers.length === e.pointers, n = t.distance < e.threshold, a = t.deltaTime < e.time;
            if (this.reset(), t.eventType & N && 0 === this.count)
                return this.failTimeout();
            if (n && a && i) {
                if (t.eventType != $)
                    return this.failTimeout();
                var o = this.pTime ? t.timeStamp - this.pTime < e.interval: !0, s=!this.pCenter || ft(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp, this.pCenter = t.center, s && o ? this.count += 1 : this.count = 1, this._input = t;
                var r = this.count%e.taps;
                if (0 === r)
                    return this.hasRequireFailures() ? (this._timer = u(function() {
                        this.state = ie, this.tryEmit()
                    }, e.interval, this), Jt) : ie
            }
            return ae
        },
        failTimeout: function() {
            return this._timer = u(function() {
                this.state = ae
            }, this.options.interval, this), ae
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == ie && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), ve.VERSION = "2.0.7", ve.defaults = {
        domEvents: !1,
        touchAction: Nt,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[de, {
            enable: !1
        }
        ], [he, {
            enable: !1
        }, ["rotate"]], [pe, {
            direction: U
        }
        ], [ue, {
            direction: U
        }, ["swipe"]], [me], [me, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [fe]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var ge = 1, ye = 2;
    be.prototype = {
        set: function(t) {
            return p(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },
        stop: function(t) {
            this.session.stopped = t ? ye : ge
        },
        recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i, n = this.recognizers, a = e.curRecognizer;
                (!a || a && a.state & ie) && (a = e.curRecognizer = null);
                for (var o = 0; o < n.length;)
                    i = n[o], e.stopped === ye || a && i != a&&!i.canRecognizeWith(a) ? i.reset() : i.recognize(t), !a && i.state & (Jt | te | ee) && (a = e.curRecognizer = i), o++
            }
        },
        get: function(t) {
            if (t instanceof oe)
                return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t)
                    return e[i];
            return null
        },
        add: function(t) {
            if (h(t, "add", this))
                return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
        },
        remove: function(t) {
            if (h(t, "remove", this))
                return this;
            if (t = this.get(t)) {
                var e = this.recognizers, i = T(e, t);
                - 1 !== i && (e.splice(i, 1), this.touchAction.update())
            }
            return this
        },
        on: function(t, e) {
            if (t !== n && e !== n) {
                var i = this.handlers;
                return f(P(t), function(t) {
                    i[t] = i[t] || [], i[t].push(e)
                }), this
            }
        },
        off: function(t, e) {
            if (t !== n) {
                var i = this.handlers;
                return f(P(t), function(t) {
                    e ? i[t] && i[t].splice(T(i[t], e), 1) : delete i[t]
                }), this
            }
        },
        emit: function(t, e) {
            this.options.domEvents && xe(t, e);
            var i = this.handlers[t] && this.handlers[t].slice();
            if (i && i.length) {
                e.type = t, e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                };
                for (var n = 0; n < i.length;)
                    i[n](e), n++
            }
        },
        destroy: function() {
            this.element && we(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, p(ve, {
        INPUT_START: N,
        INPUT_MOVE: j,
        INPUT_END: $,
        INPUT_CANCEL: q,
        STATE_POSSIBLE: Kt,
        STATE_BEGAN: Jt,
        STATE_CHANGED: te,
        STATE_ENDED: ee,
        STATE_RECOGNIZED: ie,
        STATE_CANCELLED: ne,
        STATE_FAILED: ae,
        DIRECTION_NONE: X,
        DIRECTION_LEFT: Y,
        DIRECTION_RIGHT: Q,
        DIRECTION_UP: Z,
        DIRECTION_DOWN: G,
        DIRECTION_HORIZONTAL: U,
        DIRECTION_VERTICAL: K,
        DIRECTION_ALL: J,
        Manager: be,
        Input: it,
        TouchAction: Zt,
        TouchInput: Ot,
        MouseInput: bt,
        PointerEventInput: kt,
        TouchMouseInput: zt,
        SingleTouchInput: Et,
        Recognizer: oe,
        AttrRecognizer: ce,
        Tap: me,
        Pan: ue,
        Swipe: pe,
        Pinch: he,
        Rotate: de,
        Press: fe,
        on: x,
        off: C,
        each: f,
        merge: v,
        extend: m,
        assign: p,
        inherit: g,
        bindFn: y,
        prefixed: M
    });
    var Ce = "undefined" != typeof t ? t: "undefined" != typeof self ? self: {};
    Ce.Hammer = ve, "function" == typeof define && define.amd ? define(function() {
        return ve
    }) : "undefined" != typeof module && module.exports ? module.exports = ve : t[i] = ve
}(window, document, "Hammer"), function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], t) : "object" == typeof exports ? t(require("jquery"), require("hammerjs")) : t(jQuery, Hammer)
}(function(t, e) {
    function i(i, n) {
        var a = t(i);
        a.data("hammer") || a.data("hammer", new e(a[0], n))
    }
    t.fn.hammer = function(t) {
        return this.each(function() {
            i(this, t)
        })
    }, e.Manager.prototype.emit = function(e) {
        return function(i, n) {
            e.call(this, i, n), t(this.element).trigger({
                type: i,
                gesture: n
            })
        }
    }(e.Manager.prototype.emit)
}), function(t) {
    var e = {
        init: function(e) {
            var i = {
                menuWidth: 240,
                edge: "left",
                closeOnClick: !1
            };
            e = t.extend(i, e), t(this).each(function() {
                function o(i) {
                    s=!1, r=!1, t("body").css({
                        overflow: "",
                        width: ""
                    }), t("#sidenav-overlay").velocity({
                        opacity: 0
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function() {
                            t(this).remove()
                        }
                    }), "left" === e.edge ? (a.css({
                        width: "",
                        right: "",
                        left: "0"
                    }), n.velocity({
                        translateX: "-100%"
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutCubic",
                        complete: function() {
                            i===!0 && (n.removeAttr("style"), n.css("width", e.menuWidth))
                        }
                    })) : (a.css({
                        width: "",
                        right: "0",
                        left: ""
                    }), n.velocity({
                        translateX: "100%"
                    }, {
                        duration: 200,
                        queue: !1,
                        easing: "easeOutCubic",
                        complete: function() {
                            i===!0 && (n.removeAttr("style"), n.css("width", e.menuWidth))
                        }
                    }))
                }
                var i = t(this), n = t("#" + i.attr("data-activates"));
                240 != e.menuWidth && n.css("width", e.menuWidth);
                var a = t('<div class="drag-target"></div>');
                t("body").append(a), "left" == e.edge ? (n.css("transform", "translateX(-100%)"), a.css({
                    left: 0
                })) : (n.addClass("right-aligned").css("transform", "translateX(100%)"), a.css({
                    right: 0
                })), n.hasClass("fixed") && window.innerWidth > 992 && n.css("transform", "translateX(0)"), n.hasClass("fixed") && t(window).resize(function() {
                    window.innerWidth > 992 ? 0 != t("#sidenav-overlay").length && r ? o(!0) : n.css("transform", "translateX(0%)") : r===!1 && ("left" === e.edge ? n.css("transform", "translateX(-100%)") : n.css("transform", "translateX(100%)"))
                }), e.closeOnClick===!0 && n.on("click.itemclick", "a:not(.collapsible-header)", function() {
                    o()
                });
                var s=!1, r=!1;
                a.on("click", function() {
                    o()
                }), a.hammer({
                    prevent_default: !1
                }).bind("pan", function(i) {
                    if ("touch" == i.gesture.pointerType) {
                        var s = (i.gesture.direction, i.gesture.center.x), u = (i.gesture.center.y, i.gesture.velocityX, t("body")), h = u.innerWidth();
                        if (u.css("overflow", "hidden"), u.width(h), 0 === t("#sidenav-overlay").length) {
                            var f = t('<div id="sidenav-overlay"></div>');
                            f.css("opacity", 0).click(function() {
                                o()
                            }), t("body").append(f)
                        }
                        if ("left" === e.edge && (s > e.menuWidth ? s = e.menuWidth : 0 > s && (s = 0)), "left" === e.edge)
                            s < e.menuWidth / 2 ? r=!1 : s >= e.menuWidth / 2 && (r=!0), n.css("transform", "translateX(" + (s - e.menuWidth) + "px)");
                        else {
                            s < window.innerWidth - e.menuWidth / 2 ? r=!0 : s >= window.innerWidth - e.menuWidth / 2 && (r=!1);
                            var d = s - e.menuWidth / 2;
                            0 > d && (d = 0), n.css("transform", "translateX(" + d + "px)")
                        }
                        var p;
                        "left" === e.edge ? (p = s / e.menuWidth, t("#sidenav-overlay").velocity({
                            opacity: p
                        }, {
                            duration: 10,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (p = Math.abs((s - window.innerWidth) / e.menuWidth), t("#sidenav-overlay").velocity({
                            opacity: p
                        }, {
                            duration: 10,
                            queue: !1,
                            easing: "easeOutQuad"
                        }))
                    }
                }).bind("panend", function(i) {
                    if ("touch" == i.gesture.pointerType) {
                        var o = i.gesture.velocityX, l = i.gesture.center.x, c = l - e.menuWidth, u = l - e.menuWidth / 2;
                        c > 0 && (c = 0), 0 > u && (u = 0), s=!1, "left" === e.edge ? r && .3 >= o||-.5 > o ? (0 != c && n.velocity({
                            translateX: [0, c]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 1
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a.css({
                            width: "50%",
                            right: 0,
                            left: ""
                        })) : (!r || o > .3) && (t("body").css({
                            overflow: "",
                            width: ""
                        }), n.velocity({
                            translateX: [ - 1 * e.menuWidth - 10, c]
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                t(this).remove()
                            }
                        }), a.css({
                            width: "10px",
                            right: "",
                            left: 0
                        })) : r && o>=-.3 || o > .5 ? (n.velocity({
                            translateX: [0, u]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 1
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), a.css({
                            width: "50%",
                            right: "",
                            left: 0
                        })) : (!r||-.3 > o) && (t("body").css({
                            overflow: "",
                            width: ""
                        }), n.velocity({
                            translateX: [e.menuWidth + 10, u]
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), t("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                t(this).remove()
                            }
                        }), a.css({
                            width: "10px",
                            right: 0,
                            left: ""
                        }))
                    }
                }), i.click(function() {
                    if (r===!0)
                        r=!1, s=!1, o();
                    else {
                        var i = t("body"), l = i.innerWidth();
                        i.css("overflow", "hidden"), i.width(l), t("body").append(a), "left" === e.edge ? (a.css({
                            width: "50%",
                            right: 0,
                            left: ""
                        }), n.velocity({
                            translateX: [0, - 1 * e.menuWidth]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (a.css({
                            width: "50%",
                            right: "",
                            left: 0
                        }), n.velocity({
                            translateX: [0, e.menuWidth]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }));
                        var c = t('<div id="sidenav-overlay"></div>');
                        c.css("opacity", 0).click(function() {
                            r=!1, s=!1, o(), c.velocity({
                                opacity: 0
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function() {
                                    t(this).remove()
                                }
                            })
                        }), t("body").append(c), c.velocity({
                            opacity: 1
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function() {
                                r=!0, s=!1
                            }
                        })
                    }
                    return !1
                })
            })
        },
        show: function() {
            this.trigger("click")
        },
        hide: function() {
            t("#sidenav-overlay").trigger("click")
        }
    };
    t.fn.sideNav = function(i) {
        return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sideNav") : e.init.apply(this, arguments)
    }
}(jQuery), function(t) {
    t.fn.collapsible = function(e) {
        var i = {
            accordion: void 0
        };
        return e = t.extend(i, e), this.each(function() {
            function o(e) {
                n = i.find("> li > .collapsible-header"), e.hasClass("active") ? e.parent().addClass("active") : e.parent().removeClass("active"), e.parent().hasClass("active") ? e.siblings(".collapsible-body").stop(!0, !1).slideDown({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                }) : e.siblings(".collapsible-body").stop(!0, !1).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                }), n.not(e).removeClass("active").parent().removeClass("active"), n.not(e).parent().children(".collapsible-body").stop(!0, !1).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                })
            }
            function s(e) {
                e.hasClass("active") ? e.parent().addClass("active") : e.parent().removeClass("active"), e.parent().hasClass("active") ? e.siblings(".collapsible-body").stop(!0, !1).slideDown({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                }) : e.siblings(".collapsible-body").stop(!0, !1).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: !1,
                    complete: function() {
                        t(this).css("height", "")
                    }
                })
            }
            function r(t) {
                var e = l(t);
                return e.length > 0
            }
            function l(t) {
                return t.closest("li > .collapsible-header")
            }
            var i = t(this), n = t(this).find("> li > .collapsible-header"), a = i.data("collapsible");
            i.off("click.collapse", ".collapsible-header"), n.off("click.collapse"), e.accordion || "accordion" === a || void 0 === a ? (n = i.find("> li > .collapsible-header"), n.on("click.collapse", function(e) {
                var i = t(e.target);
                r(i) && (i = l(i)), i.toggleClass("active"), o(i)
            }), o(n.filter(".active").first())) : n.each(function() {
                t(this).on("click.collapse", function(e) {
                    var i = t(e.target);
                    r(i) && (i = l(i)), i.toggleClass("active"), s(i)
                }), t(this).hasClass("active") && s(t(this))
            })
        })
    }, t(document).ready(function() {
        t(".collapsible").collapsible()
    })
}(jQuery), function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(this, function(t) {
    var e = function(t, e) {
        var i, n = document.createElement("canvas");
        t.appendChild(n), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(n);
        var a = n.getContext("2d");
        n.width = n.height = e.size;
        var o = 1;
        window.devicePixelRatio > 1 && (o = window.devicePixelRatio, n.style.width = n.style.height = [e.size, "px"].join(""), n.width = n.height = e.size * o, a.scale(o, o)), a.translate(e.size / 2, e.size / 2), a.rotate(( - 0.5 + e.rotate / 180) * Math.PI);
        var s = (e.size - e.lineWidth) / 2;
        e.scaleColor && e.scaleLength && (s -= e.scaleLength + 2), Date.now = Date.now || function() {
            return + new Date
        };
        var r = function(t, e, i) {
            i = Math.min(Math.max( - 1, i || 0), 1);
            var n = 0 >= i?!0 : !1;
            a.beginPath(), a.arc(0, 0, s, 0, 2 * Math.PI * i, n), a.strokeStyle = t, a.lineWidth = e, a.stroke()
        }, l = function() {
            var t, i;
            a.lineWidth = 1, a.fillStyle = e.scaleColor, a.save();
            for (var n = 24; n > 0; --n)
                n%6 === 0 ? (i = e.scaleLength, t = 0) : (i = .6 * e.scaleLength, t = e.scaleLength - i), a.fillRect( - e.size / 2 + t, 0, i, 1), a.rotate(Math.PI / 12);
            a.restore()
        }, c = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                window.setTimeout(t, 1e3 / 60)
            }
        }(), u = function() {
            e.scaleColor && l(), e.trackColor && r(e.trackColor, e.trackWidth || e.lineWidth, 1)
        };
        this.getCanvas = function() {
            return n
        }, this.getCtx = function() {
            return a
        }, this.clear = function() {
            a.clearRect(e.size/-2, e.size/-2, e.size, e.size)
        }, this.draw = function(t) {
            e.scaleColor || e.trackColor ? a.getImageData && a.putImageData ? i ? a.putImageData(i, 0, 0) : (u(), i = a.getImageData(0, 0, e.size * o, e.size * o)) : (this.clear(), u()) : this.clear(), a.lineCap = e.lineCap;
            var n;
            n = "function" == typeof e.barColor ? e.barColor(t) : e.barColor, r(n, e.lineWidth, t / 100)
        }.bind(this), this.animate = function(t, i) {
            var n = Date.now();
            e.onStart(t, i);
            var a = function() {
                var o = Math.min(Date.now() - n, e.animate.duration), s = e.easing(this, o, t, i - t, e.animate.duration);
                this.draw(s), e.onStep(t, i, s), o >= e.animate.duration ? e.onStop(t, i) : c(a)
            }.bind(this);
            c(a)
        }.bind(this)
    }, i = function(t, i) {
        var n = {
            barColor: "#ef1e25",
            trackColor: "#f9f9f9",
            scaleColor: "#dfe0e0",
            scaleLength: 5,
            lineCap: "round",
            lineWidth: 3,
            trackWidth: void 0,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1e3,
                enabled: !0
            }, easing : function(t, e, i, n, a) {
                return e/=a / 2, 1 > e ? n / 2 * e * e + i : - n / 2 * (--e * (e - 2) - 1) + i
            }, onStart: function(t, e) {}, onStep: function(t, e, i) {}, onStop: function(t, e) {}
        };
        if ("undefined" != typeof e)
            n.renderer = e;
        else {
            if ("undefined" == typeof SVGRenderer)
                throw new Error("Please load either the SVG- or the CanvasRenderer");
            n.renderer = SVGRenderer
        }
        var a = {}, o = 0, s = function() {
            this.el = t, this.options = a;
            for (var e in n)
                n.hasOwnProperty(e) && (a[e] = i && "undefined" != typeof i[e] ? i[e] : n[e], "function" == typeof a[e] && (a[e] = a[e].bind(this)));
            "string" == typeof a.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[a.easing]) ? a.easing = jQuery.easing[a.easing] : a.easing = n.easing, "number" == typeof a.animate && (a.animate = {
                duration: a.animate,
                enabled: !0
            }), "boolean" != typeof a.animate || a.animate || (a.animate = {
                duration: 1e3,
                enabled: a.animate
            }), this.renderer = new a.renderer(t, a), this.renderer.draw(o), t.dataset && t.dataset.percent ? this.update(parseFloat(t.dataset.percent)) : t.getAttribute && t.getAttribute("data-percent") && this.update(parseFloat(t.getAttribute("data-percent")))
        }.bind(this);
        this.update = function(t) {
            return t = parseFloat(t), a.animate.enabled ? this.renderer.animate(o, t) : this.renderer.draw(t), o = t, this
        }.bind(this), this.disableAnimation = function() {
            return a.animate.enabled=!1, this
        }, this.enableAnimation = function() {
            return a.animate.enabled=!0, this
        }, s()
    }; t.fn.easyPieChart = function(e) {
        return this.each(function() {
            var n;
            t.data(this, "easyPieChart") || (n = t.extend({}, e, t(this).data()), t.data(this, "easyPieChart", new i(this, n)))
        })
    }
}), $(function() {
    var t=!0;
    $("#accordion").on("show.bs.collapse", function() {
        t && $("#accordion .in").collapse("hide")
    })
}), function(t) {
    t(document).ready(function() {
        function a(e) {
            var n = e.css("font-family"), a = e.css("font-size");
            a && i.css("font-size", a), n && i.css("font-family", n), "off" === e.attr("wrap") && i.css("overflow-wrap", "normal").css("white-space", "pre"), i.text(e.val() + "\n");
            var o = i.html().replace(/\n/g, "<br>");
            i.html(o), e.is(":visible") ? i.css("width", e.width()) : i.css("width", t(window).width() / 2), e.css("height", i.height())
        }
        Materialize.updateTextFields = function() {
            var e = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
            t(e).each(function(e, i) {
                t(i).val().length > 0 || i.autofocus || void 0 !== t(this).attr("placeholder") || t(i)[0].validity.badInput===!0 ? t(this).siblings("label, i").addClass("active") : t(this).siblings("label, i").removeClass("active")
            })
        };
        var e = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
        t(document).on("change", e, function() {
            (0 !== t(this).val().length || void 0 !== t(this).attr("placeholder")) && t(this).siblings("label").addClass("active"), validate_field(t(this))
        }), t(document).ready(function() {
            Materialize.updateTextFields()
        }), t(document).on("reset", function(i) {
            var n = t(i.target);
            n.is("form") && (n.find(e).removeClass("valid").removeClass("invalid"), n.find(e).each(function() {
                "" === t(this).attr("value") && t(this).siblings("label, i").removeClass("active")
            }), n.find("select.initialized").each(function() {
                var t = n.find("option[selected]").text();
                n.siblings("input.select-dropdown").val(t)
            }))
        }), t(document).on("focus", e, function() {
            t(this).siblings("label, i").addClass("active")
        }), t(document).on("blur", e, function() {
            var e = t(this);
            0 === e.val().length && e[0].validity.badInput!==!0 && void 0 === e.attr("placeholder") && e.siblings("label, i").removeClass("active"), 0 === e.val().length && e[0].validity.badInput!==!0 && void 0 !== e.attr("placeholder") && e.siblings("i").removeClass("active"), validate_field(e)
        }), window.validate_field = function(t) {
            var e = void 0 !== t.attr("length"), i = parseInt(t.attr("length")), n = t.val().length;
            0 === t.val().length && t[0].validity.badInput===!1 ? t.hasClass("validate") && (t.removeClass("valid"), t.removeClass("invalid")) : t.hasClass("validate") && (t.is(":valid") && e && i >= n || t.is(":valid")&&!e ? (t.removeClass("invalid"), t.addClass("valid")) : (t.removeClass("valid"), t.addClass("invalid")))
        };
        var i = t(".hiddendiv").first();
        i.length || (i = t('<div class="hiddendiv common"></div>'), t("body").append(i));
        var n = ".materialize-textarea";
        t(n).each(function() {
            var e = t(this);
            e.val().length && a(e)
        }), t("body").on("keyup keydown autoresize", n, function() {
            a(t(this))
        }), t(document).on("change", '.file-field input[type="file"]', function() {
            for (var e = t(this).closest(".file-field"), i = e.find("input.file-path"), n = t(this)[0].files, a = [], o = 0; o < n.length; o++)
                a.push(n[o].name);
            i.val(a.join(", ")), i.trigger("change")
        });
        var r, o = "input[type=range]", s=!1;
        t(o).each(function() {
            var e = t('<span class="thumb"><span class="value"></span></span>');
            t(this).after(e)
        });
        var l = ".range-field";
        t(document).on("change", o, function(e) {
            var i = t(this).siblings(".thumb");
            i.find(".value").html(t(this).val())
        }), t(document).on("input mousedown touchstart", o, function(e) {
            var i = t(this).siblings(".thumb"), n = t(this).outerWidth();
            i.length <= 0 && (i = t('<span class="thumb"><span class="value"></span></span>'), t(this).after(i)), i.find(".value").html(t(this).val()), s=!0, t(this).addClass("active"), i.hasClass("active") || i.velocity({
                height: "30px",
                width: "30px",
                top: "-20px",
                marginLeft: "-15px"
            }, {
                duration: 300,
                easing: "easeOutExpo"
            }), "input" !== e.type && (r = void 0 === e.pageX || null === e.pageX ? e.originalEvent.touches[0].pageX - t(this).offset().left : e.pageX - t(this).offset().left, 0 > r ? r = 0 : r > n && (r = n), i.addClass("active").css("left", r)), i.find(".value").html(t(this).val())
        }), t(document).on("mouseup touchend", l, function() {
            s=!1, t(this).removeClass("active")
        }), t(document).on("mousemove touchmove", l, function(e) {
            var n, i = t(this).children(".thumb");
            if (s) {
                i.hasClass("active") || i.velocity({
                    height: "30px",
                    width: "30px",
                    top: "-20px",
                    marginLeft: "-15px"
                }, {
                    duration: 300,
                    easing: "easeOutExpo"
                }), n = void 0 === e.pageX || null === e.pageX ? e.originalEvent.touches[0].pageX - t(this).offset().left : e.pageX - t(this).offset().left;
                var a = t(this).outerWidth();
                0 > n ? n = 0 : n > a && (n = a), i.addClass("active").css("left", n), i.find(".value").html(i.siblings(o).val())
            }
        }), t(document).on("mouseout touchleave", l, function() {
            if (!s) {
                var e = t(this).children(".thumb");
                e.hasClass("active") && e.velocity({
                    height: "0",
                    width: "0",
                    top: "10px",
                    marginLeft: "-6px"
                }, {
                    duration: 100
                }), e.removeClass("active")
            }
        })
    }), t.fn.material_select = function(e) {
        function i(t, e, i) {
            var a = t.indexOf(e), o =- 1 === a;
            return o ? t.push(e) : t.splice(a, 1), i.siblings("ul.dropdown-content").find("li").eq(e).toggleClass("active"), i.find("option").eq(e).prop("selected", o), n(t, i), o
        }
        function n(t, e) {
            for (var i = "", n = 0, a = t.length; a > n; n++) {
                var o = e.find("option").eq(t[n]).text();
                i += 0 === n ? o : ", " + o
            }
            "" === i && (i = e.find("option:disabled").eq(0).text()), e.siblings("input.select-dropdown").val(i)
        }
        t(this).each(function() {
            var n = t(this);
            if (!n.hasClass("browser-default")) {
                var a = n.attr("multiple")?!0 : !1, o = n.data("select-id");
                if (o && (n.parent().find("span.caret").remove(), n.parent().find("input").remove(), n.unwrap(), t("ul#select-options-" + o).remove()), "destroy" === e)
                    return void n.data("select-id", null).removeClass("initialized");
                var s = Materialize.guid();
                n.data("select-id", s);
                var r = t('<div class="select-wrapper"></div>');
                r.addClass(n.attr("class"));
                var l = t('<ul id="select-options-' + s + '" class="dropdown-content select-dropdown ' + (a ? "multiple-select-dropdown" : "") + '"></ul>'), c = n.children("option, optgroup"), u = [], h=!1, f = n.find("option:selected").html() || n.find("option:first").html() || "", d = function(e, i, n) {
                    var a = i.is(":disabled") ? "disabled ": "", o = i.data("icon"), s = i.attr("class");
                    if (o) {
                        var r = "";
                        return s && (r = ' class="' + s + '"'), "multiple" === n ? l.append(t('<li class="' + a + '"><img src="' + o + '"' + r + '><span><input type="checkbox"' + a + "/><label></label>" + i.html() + "</span></li>")) : l.append(t('<li class="' + a + '"><img src="' + o + '"' + r + "><span>" + i.html() + "</span></li>")), !0
                    }
                    "multiple" === n ? l.append(t('<li class="' + a + '"><span><input type="checkbox"' + a + "/><label></label>" + i.html() + "</span></li>")) : l.append(t('<li class="' + a + '"><span>' + i.html() + "</span></li>"))
                };
                c.length && c.each(function() {
                    if (t(this).is("option"))
                        a ? d(n, t(this), "multiple") : d(n, t(this));
                    else if (t(this).is("optgroup")) {
                        var e = t(this).children("option");
                        l.append(t('<li class="optgroup"><span>' + t(this).attr("label") + "</span></li>")), e.each(function() {
                            d(n, t(this))
                        })
                    }
                }), l.find("li:not(.optgroup)").each(function(o) {
                    t(this).click(function(s) {
                        if (!t(this).hasClass("disabled")&&!t(this).hasClass("optgroup")) {
                            var r=!0;
                            a ? (t('input[type="checkbox"]', this).prop("checked", function(t, e) {
                                return !e
                            }), r = i(u, t(this).index(), n), v.trigger("focus")) : (l.find("li").removeClass("active"), t(this).toggleClass("active"), v.val(t(this).text())), activateOption(l, t(this)), n.find("option").eq(o).prop("selected", r), n.trigger("change"), "undefined" != typeof e && e()
                        }
                        s.stopPropagation()
                    })
                }), n.wrap(r);
                var p = t('<span class="caret">&#9660;</span>');
                n.is(":disabled") && p.addClass("disabled");
                var m = f.replace(/"/g, "&quot;"), v = t('<input type="text" class="select-dropdown" readonly="true" ' + (n.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + s + '" value="' + m + '"/>');
                n.before(v), v.before(p), v.after(l), n.is(":disabled") || v.dropdown({
                    hover: !1,
                    closeOnClick: !1
                }), n.attr("tabindex") && t(v[0]).attr("tabindex", n.attr("tabindex")), n.addClass("initialized"), v.on({
                    focus: function() {
                        if (t("ul.select-dropdown").not(l[0]).is(":visible") && t("input.select-dropdown").trigger("close"), !l.is(":visible")) {
                            t(this).trigger("open", ["focus"]);
                            var e = t(this).val(), i = l.find("li").filter(function() {
                                return t(this).text().toLowerCase() === e.toLowerCase()
                            })[0];
                            activateOption(l, i)
                        }
                    },
                    click: function(t) {
                        t.stopPropagation()
                    }
                }), v.on("blur", function() {
                    a || t(this).trigger("close"), l.find("li.selected").removeClass("selected")
                }), l.hover(function() {
                    h=!0
                }, function() {
                    h=!1
                }), t(window).on({
                    click: function() {
                        a && (h || v.trigger("close"))
                    }
                }), a && n.find("option:selected:not(:disabled)").each(function() {
                    var e = t(this).index();
                    i(u, e, n), l.find("li").eq(e).find(":checkbox").prop("checked", !0)
                }), activateOption = function(e, i) {
                    if (i) {
                        e.find("li.selected").removeClass("selected");
                        var n = t(i);
                        n.addClass("selected"), l.scrollTo(n)
                    }
                };
                var g = [], y = function(e) {
                    if (9 == e.which)
                        return void v.trigger("close");
                    if (40 == e.which&&!l.is(":visible"))
                        return void v.trigger("open");
                    if (13 != e.which || l.is(":visible")) {
                        e.preventDefault();
                        var i = String.fromCharCode(e.which).toLowerCase(), n = [9, 13, 27, 38, 40];
                        if (i&&-1 === n.indexOf(e.which)) {
                            g.push(i);
                            var o = g.join(""), s = l.find("li").filter(function() {
                                return 0 === t(this).text().toLowerCase().indexOf(o)
                            })[0];
                            s && activateOption(l, s)
                        }
                        if (13 == e.which) {
                            var r = l.find("li.selected:not(.disabled)")[0];
                            r && (t(r).trigger("click"), a || v.trigger("close"))
                        }
                        40 == e.which && (s = l.find("li.selected").length ? l.find("li.selected").next("li:not(.disabled)")[0] : l.find("li:not(.disabled)")[0], activateOption(l, s)), 27 == e.which && v.trigger("close"), 38 == e.which && (s = l.find("li.selected").prev("li:not(.disabled)")[0], s && activateOption(l, s)), setTimeout(function() {
                            g = []
                        }, 1e3)
                    }
                };
                v.on("keydown", y)
            }
        })
    }
}(jQuery), function(t) {
    "function" == typeof define && define.amd ? define("picker", ["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : this.Picker = t(jQuery)
}(function(t) {
    function o(e, c, u, f) {
        function w() {
            return o._.node("div", o._.node("div", o._.node("div", o._.node("div", b.component.nodes(p.open), v.box), v.wrap), v.frame), v.holder, 'tabindex="-1"')
        }
        function x() {
            g.data(c, b).addClass(v.input).val(g.data("value") ? b.get("select", m.format) : e.value), m.editable || g.on("focus." + p.id + " click." + p.id, function(t) {
                t.preventDefault(), b.open()
            }).on("keydown." + p.id, A), l(e, {
                haspopup: !0,
                expanded: !1,
                readonly: !1,
                owns: e.id + "_root"
            })
        }
        function C() {
            l(b.$root[0], "hidden", !0)
        }
        function S() {
            b.$holder.on({
                keydown: A,
                "focus.toOpen": T,
                blur: function() {
                    g.removeClass(v.target)
                },
                focusin: function(t) {
                    b.$root.removeClass(v.focused), t.stopPropagation()
                },
                "mousedown click": function(e) {
                    var i = e.target;
                    i != b.$holder[0] && (e.stopPropagation(), "mousedown" != e.type || t(i).is("input, select, textarea, button, option") || (e.preventDefault(), b.$holder[0].focus()))
                }
            }).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function() {
                var e = t(this), i = e.data(), n = e.hasClass(v.navDisabled) || e.hasClass(v.disabled), a = h();
                a = a && (a.type || a.href), (n || a&&!t.contains(b.$root[0], a)) && b.$holder[0].focus(), !n && i.nav ? b.set("highlight", b.component.item.highlight, {
                    nav: i.nav
                }) : !n && "pick"in i ? (b.set("select", i.pick), m.closeOnSelect && b.close(!0)) : i.clear ? (b.clear(), m.closeOnClear && b.close(!0)) : i.close && b.close(!0)
            })
        }
        function k() {
            var i;
            m.hiddenName===!0 ? (i = e.name, e.name = "") : (i = ["string" == typeof m.hiddenPrefix ? m.hiddenPrefix: "", "string" == typeof m.hiddenSuffix ? m.hiddenSuffix: "_submit"], i = i[0] + e.name + i[1]), b._hidden = t('<input type=hidden name="' + i + '"' + (g.data("value") || e.value ? ' value="' + b.get("select", m.formatSubmit) + '"' : "") + ">")[0], g.on("change." + p.id, function() {
                b._hidden.value = e.value ? b.get("select", m.formatSubmit) : ""
            })
        }
        function P() {
            d && a ? b.$holder.find("." + v.frame).one("transitionend", function() {
                b.$holder[0].focus()
            }) : b.$holder[0].focus()
        }
        function T(t) {
            t.stopPropagation(), g.addClass(v.target), b.$root.addClass(v.focused), b.open()
        }
        function A(t) {
            var e = t.keyCode, i = /^(8|46)$/.test(e);
            return 27 == e ? (b.close(!0), !1) : void((32 == e || i ||!p.open && b.component.key[e]) && (t.preventDefault(), t.stopPropagation(), i ? b.clear().close() : b.open()))
        }
        if (!e)
            return o;
        var d=!1, p = {
            id: e.id || "P" + Math.abs(~~(Math.random() * new Date))
        }, m = u ? t.extend(!0, {}, u.defaults, f) : f || {}, v = t.extend({}, o.klasses(), m.klass), g = t(e), y = function() {
            return this.start()
        }, b = y.prototype = {
            constructor: y,
            $node: g,
            start: function() {
                return p && p.start ? b : (p.methods = {}, p.start=!0, p.open=!1, p.type = e.type, e.autofocus = e == h(), e.readOnly=!m.editable, e.id = e.id || p.id, "text" != e.type && (e.type = "text"), b.component = new u(b, m), b.$root = t('<div class="' + v.picker + '" id="' + e.id + '_root" />'), C(), b.$holder = t(w()).appendTo(b.$root), S(), m.formatSubmit && k(), x(), m.containerHidden ? t(m.containerHidden).append(b._hidden) : g.after(b._hidden), m.container ? t(m.container).append(b.$root) : g.after(b.$root), b.on({
                    start: b.component.onStart,
                    render: b.component.onRender,
                    stop: b.component.onStop,
                    open: b.component.onOpen,
                    close: b.component.onClose,
                    set: b.component.onSet
                }).on({
                    start: m.onStart,
                    render: m.onRender,
                    stop: m.onStop,
                    open: m.onOpen,
                    close: m.onClose,
                    set: m.onSet
                }), d = s(b.$holder[0]), e.autofocus && b.open(), b.trigger("start").trigger("render"))
            },
            render: function(e) {
                return e ? (b.$holder = t(w()), S(), b.$root.html(b.$holder)) : b.$root.find("." + v.box).html(b.component.nodes(p.open)), b.trigger("render")
            },
            stop: function() {
                return p.start ? (b.close(), b._hidden && b._hidden.parentNode.removeChild(b._hidden), b.$root.remove(), g.removeClass(v.input).removeData(c), setTimeout(function() {
                    g.off("." + p.id)
                }, 0), e.type = p.type, e.readOnly=!1, b.trigger("stop"), p.methods = {}, p.start=!1, b) : b
            },
            open: function(a) {
                return p.open ? b : (g.addClass(v.active), l(e, "expanded", !0), setTimeout(function() {
                    b.$root.addClass(v.opened), l(b.$root[0], "hidden", !1)
                }, 0), a!==!1 && (p.open=!0, d && n.css("overflow", "hidden").css("padding-right", "+=" + r()), P(), i.on("click." + p.id + " focusin." + p.id, function(t) {
                    var i = t.target;
                    i != e && i != document && 3 != t.which && b.close(i === b.$holder[0])
                }).on("keydown." + p.id, function(e) {
                    var i = e.keyCode, n = b.component.key[i], a = e.target;
                    27 == i ? b.close(!0) : a != b.$holder[0] ||!n && 13 != i ? t.contains(b.$root[0], a) && 13 == i && (e.preventDefault(), a.click()) : (e.preventDefault(), n ? o._.trigger(b.component.key.go, b, [o._.trigger(n)]) : b.$root.find("." + v.highlighted).hasClass(v.disabled) || (b.set("select", b.component.item.highlight), m.closeOnSelect && b.close(!0)))
                })), b.trigger("open"))
            },
            close: function(t) {
                return t && (m.editable ? e.focus() : (b.$holder.off("focus.toOpen").focus(), setTimeout(function() {
                    b.$holder.on("focus.toOpen", T)
                }, 0))), g.removeClass(v.active), l(e, "expanded", !1), setTimeout(function() {
                    b.$root.removeClass(v.opened + " " + v.focused), l(b.$root[0], "hidden", !0)
                }, 0), p.open ? (p.open=!1, d && n.css("overflow", "").css("padding-right", "-=" + r()), i.off("." + p.id), b.trigger("close")) : b
            },
            clear: function(t) {
                return b.set("clear", null, t)
            },
            set: function(e, i, n) {
                var a, o, s = t.isPlainObject(e), r = s ? e: {};
                if (n = s && t.isPlainObject(i) ? i : n || {}, e) {
                    s || (r[e] = i);
                    for (a in r)
                        o = r[a], a in b.component.item && (void 0 === o && (o = null), b.component.set(a, o, n)), ("select" == a || "clear" == a) && g.val("clear" == a ? "" : b.get(a, m.format)).trigger("change");
                    b.render()
                }
                return n.muted ? b : b.trigger("set", r)
            },
            get: function(t, i) {
                if (t = t || "value", null != p[t])
                    return p[t];
                if ("valueSubmit" == t) {
                    if (b._hidden)
                        return b._hidden.value;
                    t = "value"
                }
                if ("value" == t)
                    return e.value;
                if (t in b.component.item) {
                    if ("string" == typeof i) {
                        var n = b.component.get(t);
                        return n ? o._.trigger(b.component.formats.toString, b.component, [i, n]) : ""
                    }
                    return b.component.get(t)
                }
            },
            on: function(e, i, n) {
                var a, o, s = t.isPlainObject(e), r = s ? e: {};
                if (e) {
                    s || (r[e] = i);
                    for (a in r)
                        o = r[a], n && (a = "_" + a), p.methods[a] = p.methods[a] || [], p.methods[a].push(o)
                }
                return b
            },
            off: function() {
                var t, e, i = arguments;
                for (t = 0, namesCount = i.length; t < namesCount; t += 1)
                    e = i[t], e in p.methods && delete p.methods[e];
                return b
            },
            trigger: function(t, e) {
                var i = function(t) {
                    var i = p.methods[t];
                    i && i.map(function(t) {
                        o._.trigger(t, b, [e])
                    })
                };
                return i("_" + t), i(t), b
            }
        };
        return new y
    }
    function s(t) {
        var e, i = "position";
        return t.currentStyle ? e = t.currentStyle[i] : window.getComputedStyle && (e = getComputedStyle(t)[i]), "fixed" == e
    }
    function r() {
        if (n.height() <= e.height())
            return 0;
        var i = t('<div style="visibility:hidden;width:100px" />').appendTo("body"), a = i[0].offsetWidth;
        i.css("overflow", "scroll");
        var o = t('<div style="width:100%" />').appendTo(i), s = o[0].offsetWidth;
        return i.remove(), a - s
    }
    function l(e, i, n) {
        if (t.isPlainObject(i))
            for (var a in i)
                c(e, a, i[a]);
        else
            c(e, i, n)
    }
    function c(t, e, i) {
        t.setAttribute(("role" == e ? "" : "aria-") + e, i)
    }
    function u(e, i) {
        t.isPlainObject(e) || (e = {
            attribute: i
        }), i = "";
        for (var n in e) {
            var a = ("role" == n ? "" : "aria-") + n, o = e[n];
            i += null == o ? "" : a + '="' + e[n] + '"'
        }
        return i
    }
    function h() {
        try {
            return document.activeElement
        } catch (t) {}
    }
    var e = t(window), i = t(document), n = t(document.documentElement), a = null != document.documentElement.style.transition;
    return o.klasses = function(t) {
        return t = t || "picker", {
            picker: t,
            opened: t + "--opened",
            focused: t + "--focused",
            input: t + "__input",
            active: t + "__input--active",
            target: t + "__input--target",
            holder: t + "__holder",
            frame: t + "__frame",
            wrap: t + "__wrap",
            box: t + "__box"
        }
    }, o._ = {
        group: function(t) {
            for (var e, i = "", n = o._.trigger(t.min, t); n <= o._.trigger(t.max, t, [n]); n += t.i)
                e = o._.trigger(t.item, t, [n]), i += o._.node(t.node, e[0], e[1], e[2]);
            return i
        },
        node: function(e, i, n, a) {
            return i ? (i = t.isArray(i) ? i.join("") : i, n = n ? ' class="' + n + '"' : "", a = a ? " " + a : "", "<" + e + n + a + ">" + i + "</" + e + ">") : ""
        },
        lead: function(t) {
            return (10 > t ? "0" : "") + t
        },
        trigger: function(t, e, i) {
            return "function" == typeof t ? t.apply(e, i || []) : t
        },
        digits: function(t) {
            return /\d/.test(t[1]) ? 2 : 1
        },
        isDate: function(t) {
            return {}.toString.call(t).indexOf("Date")>-1 && this.isInteger(t.getDate())
        },
        isInteger: function(t) {
            return {}.toString.call(t).indexOf("Number")>-1 && t%1 === 0
        },
        ariaAttr: u
    }, o.extend = function(e, i) {
        t.fn[e] = function(n, a) {
            var s = this.data(e);
            return "picker" == n ? s : s && "string" == typeof n ? o._.trigger(s[n], s, [a]) : this.each(function() {
                var a = t(this);
                a.data(e) || new o(this, e, i, n)
            })
        }, t.fn[e].defaults = i.defaults
    }, o
}), function(t) {
    "function" == typeof define && define.amd ? define(["picker", "jquery"], t) : "object" == typeof exports ? module.exports = t(require("./picker.js"), require("jquery")) : t(Picker, jQuery)
}(function(t, e) {
    function o(t, e) {
        var i = this, n = t.$node[0], a = n.value, o = t.$node.data("value"), s = o || a, r = o ? e.formatSubmit: e.format, l = function() {
            return n.currentStyle ? "rtl" == n.currentStyle.direction : "rtl" == getComputedStyle(t.$root[0]).direction
        };
        i.settings = e, i.$node = t.$node, i.queue = {
            min: "measure create",
            max: "measure create",
            now: "now create",
            select: "parse create validate",
            highlight: "parse navigate create validate",
            view: "parse create validate viewset",
            disable: "deactivate",
            enable: "activate"
        }, i.item = {}, i.item.clear = null, i.item.disable = (e.disable || []).slice(0), i.item.enable =- function(t) {
            return t[0]===!0 ? t.shift() : - 1
        }(i.item.disable), i.set("min", e.min).set("max", e.max).set("now"), s ? i.set("select", s, {
            format: r,
            defaultValue: !0
        }) : i.set("select", null).set("highlight", i.item.now), i.key = {
            40: 7,
            38: - 7,
            39: function() {
                return l()?-1 : 1
            },
            37: function() {
                return l() ? 1 : - 1
            },
            go: function(t) {
                var e = i.item.highlight, n = new Date(e.year, e.month, e.date + t);
                i.set("highlight", n, {
                    interval: t
                }), this.render()
            }
        }, t.on("render", function() {
            t.$root.find("." + e.klass.selectMonth).on("change", function() {
                var i = this.value;
                i && (t.set("highlight", [t.get("view").year, i, t.get("highlight").date]), t.$root.find("." + e.klass.selectMonth).trigger("focus"))
            }), t.$root.find("." + e.klass.selectYear).on("change", function() {
                var i = this.value;
                i && (t.set("highlight", [i, t.get("view").month, t.get("highlight").date]), t.$root.find("." + e.klass.selectYear).trigger("focus"))
            })
        }, 1).on("open", function() {
            var n = "";
            i.disabled(i.get("now")) && (n = ":not(." + e.klass.buttonToday + ")"), t.$root.find("button" + n + ", select").attr("disabled", !1)
        }, 1).on("close", function() {
            t.$root.find("button, select").attr("disabled", !0)
        }, 1)
    }
    var i = 7, n = 6, a = t._;
    o.prototype.set = function(t, e, i) {
        var n = this, a = n.item;
        return null === e ? ("clear" == t && (t = "select"), a[t] = e, n) : (a["enable" == t ? "disable": "flip" == t ? "enable": t] = n.queue[t].split(" ").map(function(a) {
            return e = n[a](t, e, i)
        }).pop(), "select" == t ? n.set("highlight", a.select, i) : "highlight" == t ? n.set("view", a.highlight, i) : t.match(/^(flip|min|max|disable|enable)$/) && (a.select && n.disabled(a.select) && n.set("select", a.select, i), a.highlight && n.disabled(a.highlight) && n.set("highlight", a.highlight, i)), n)
    }, o.prototype.get = function(t) {
        return this.item[t]
    }, o.prototype.create = function(t, i, n) {
        var o, s = this;
        return i = void 0 === i ? t : i, i==-(1 / 0) || i == 1 / 0 ? o = i : e.isPlainObject(i) && a.isInteger(i.pick) ? i = i.obj : e.isArray(i) ? (i = new Date(i[0], i[1], i[2]), i = a.isDate(i) ? i : s.create().obj) : i = a.isInteger(i) || a.isDate(i) ? s.normalize(new Date(i), n) : s.now(t, i, n), {
            year: o || i.getFullYear(),
            month: o || i.getMonth(),
            date: o || i.getDate(),
            day: o || i.getDay(),
            obj: o || i,
            pick: o || i.getTime()
        }
    }, o.prototype.createRange = function(t, i) {
        var n = this, o = function(t) {
            return t===!0 || e.isArray(t) || a.isDate(t) ? n.create(t) : t
        };
        return a.isInteger(t) || (t = o(t)), a.isInteger(i) || (i = o(i)), a.isInteger(t) && e.isPlainObject(i) ? t = [i.year, i.month, i.date + t] : a.isInteger(i) && e.isPlainObject(t) && (i = [t.year, t.month, t.date + i]), {
            from: o(t),
            to: o(i)
        }
    }, o.prototype.withinRange = function(t, e) {
        return t = this.createRange(t.from, t.to), e.pick >= t.from.pick && e.pick <= t.to.pick
    }, o.prototype.overlapRanges = function(t, e) {
        var i = this;
        return t = i.createRange(t.from, t.to), e = i.createRange(e.from, e.to), i.withinRange(t, e.from) || i.withinRange(t, e.to) || i.withinRange(e, t.from) || i.withinRange(e, t.to)
    }, o.prototype.now = function(t, e, i) {
        return e = new Date, i && i.rel && e.setDate(e.getDate() + i.rel), this.normalize(e, i)
    }, o.prototype.navigate = function(t, i, n) {
        var a, o, s, r, l = e.isArray(i), c = e.isPlainObject(i), u = this.item.view;
        if (l || c) {
            for (c ? (o = i.year, s = i.month, r = i.date) : (o =+ i[0], s =+ i[1], r =+ i[2]), n && n.nav && u && u.month !== s && (o = u.year, s = u.month), a = new Date(o, s + (n && n.nav ? n.nav : 0), 1), o = a.getFullYear(), s = a.getMonth(); new Date(o, s, r)
                .getMonth() !== s;
            )r -= 1;
            i = [o, s, r]
        }
        return i
    }, o.prototype.normalize = function(t) {
        return t.setHours(0, 0, 0, 0), t
    }, o.prototype.measure = function(t, e) {
        var i = this;
        return e ? "string" == typeof e ? e = i.parse(t, e) : a.isInteger(e) && (e = i.now(t, e, {
            rel: e
        })) : e = "min" == t?-(1 / 0) : 1 / 0, e
    }, o.prototype.viewset = function(t, e) {
        return this.create([e.year, e.month, 1])
    }, o.prototype.validate = function(t, i, n) {
        var c, u, d, p, o = this, s = i, r = n && n.interval ? n.interval: 1, l =- 1 === o.item.enable, h = o.item.min, f = o.item.max, m = l && o.item.disable.filter(function(t) {
            if (e.isArray(t)) {
                var n = o.create(t).pick;
                n < i.pick ? c=!0 : n > i.pick && (u=!0)
            }
            return a.isInteger(t)
        }).length;
        if ((!n ||!n.nav&&!n.defaultValue) && (!l && o.disabled(i) || l && o.disabled(i) && (m || c || u) ||!l && (i.pick <= h.pick || i.pick >= f.pick)))
            for (l&&!m && (!u && r > 0 ||!c && 0 > r) && (r*=-1); o.disabled(i) && (Math.abs(r) > 1 && (i.month < s.month || i.month > s.month) && (i = s, r = r > 0 ? 1 : - 1), i.pick <= h.pick ? (d=!0, r = 1, i = o.create([h.year, h.month, h.date + (i.pick === h.pick ? 0 : - 1)])) : i.pick >= f.pick && (p=!0, r =- 1, i = o.create([f.year, f.month, f.date + (i.pick === f.pick ? 0 : 1)])), !d ||!p);)
                i = o.create([i.year, i.month, i.date + r]);
        return i
    }, o.prototype.disabled = function(t) {
        var i = this, n = i.item.disable.filter(function(n) {
            return a.isInteger(n) ? t.day === (i.settings.firstDay ? n : n - 1)%7 : e.isArray(n) || a.isDate(n) ? t.pick === i.create(n).pick : e.isPlainObject(n) ? i.withinRange(n, t) : void 0
        });
        return n = n.length&&!n.filter(function(t) {
            return e.isArray(t) && "inverted" == t[3] || e.isPlainObject(t) && t.inverted
        }).length, - 1 === i.item.enable?!n : n || t.pick < i.item.min.pick || t.pick > i.item.max.pick
    }, o.prototype.parse = function(t, e, i) {
        var n = this, o = {};
        return e && "string" == typeof e ? (i && i.format || (i = i || {}, i.format = n.settings.format), n.formats.toArray(i.format).map(function(t) {
            var i = n.formats[t], s = i ? a.trigger(i, n, [e, o]): t.replace(/^!/, "").length;
            i && (o[t] = e.substr(0, s)), e = e.substr(s)
        }), [o.yyyy || o.yy, + (o.mm || o.m) - 1, o.dd || o.d]) : e
    }, o.prototype.formats = function() {
        function t(t, e, i) {
            var n = t.match(/[^\x00-\x7F]+|\w+/)[0];
            return i.mm || i.m || (i.m = e.indexOf(n) + 1), n.length
        }
        function e(t) {
            return t.match(/\w+/)[0].length
        }
        return {
            d: function(t, e) {
                return t ? a.digits(t) : e.date
            },
            dd: function(t, e) {
                return t ? 2 : a.lead(e.date)
            },
            ddd: function(t, i) {
                return t ? e(t) : this.settings.weekdaysShort[i.day]
            },
            dddd: function(t, i) {
                return t ? e(t) : this.settings.weekdaysFull[i.day]
            },
            m: function(t, e) {
                return t ? a.digits(t) : e.month + 1
            },
            mm: function(t, e) {
                return t ? 2 : a.lead(e.month + 1)
            },
            mmm: function(e, i) {
                var n = this.settings.monthsShort;
                return e ? t(e, n, i) : n[i.month]
            },
            mmmm: function(e, i) {
                var n = this.settings.monthsFull;
                return e ? t(e, n, i) : n[i.month]
            },
            yy: function(t, e) {
                return t ? 2 : ("" + e.year).slice(2)
            },
            yyyy: function(t, e) {
                return t ? 4 : e.year
            },
            toArray: function(t) {
                return t.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
            },
            toString: function(t, e) {
                var i = this;
                return i.formats.toArray(t).map(function(t) {
                    return a.trigger(i.formats[t], i, [0, e]) || t.replace(/^!/, "")
                }).join("")
            }
        }
    }(), o.prototype.isDateExact = function(t, i) {
        var n = this;
        return a.isInteger(t) && a.isInteger(i) || "boolean" == typeof t && "boolean" == typeof i ? t === i : (a.isDate(t) || e.isArray(t)) && (a.isDate(i) || e.isArray(i)) ? n.create(t).pick === n.create(i).pick : e.isPlainObject(t) && e.isPlainObject(i) ? n.isDateExact(t.from, i.from) && n.isDateExact(t.to, i.to) : !1
    }, o.prototype.isDateOverlap = function(t, i) {
        var n = this, o = n.settings.firstDay ? 1: 0;
        return a.isInteger(t) && (a.isDate(i) || e.isArray(i)) ? (t = t%7 + o, t === n.create(i).day + 1) : a.isInteger(i) && (a.isDate(t) || e.isArray(t)) ? (i = i%7 + o, i === n.create(t).day + 1) : e.isPlainObject(t) && e.isPlainObject(i) ? n.overlapRanges(t, i) : !1
    }, o.prototype.flipEnable = function(t) {
        var e = this.item;
        e.enable = t || ( - 1 == e.enable ? 1 : - 1)
    }, o.prototype.deactivate = function(t, i) {
        var n = this, o = n.item.disable.slice(0);
        return "flip" == i ? n.flipEnable() : i===!1 ? (n.flipEnable(1), o = []) : i===!0 ? (n.flipEnable( - 1), o = []) : i.map(function(t) {
            for (var i, s = 0; s < o.length; s += 1)
                if (n.isDateExact(t, o[s])) {
                    i=!0;
                    break
                }
            i || (a.isInteger(t) || a.isDate(t) || e.isArray(t) || e.isPlainObject(t) && t.from && t.to) && o.push(t)
        }), o
    }, o.prototype.activate = function(t, i) {
        var n = this, o = n.item.disable, s = o.length;
        return "flip" == i ? n.flipEnable() : i===!0 ? (n.flipEnable(1), o = []) : i===!1 ? (n.flipEnable( - 1), o = []) : i.map(function(t) {
            var i, r, l, c;
            for (l = 0; s > l; l += 1) {
                if (r = o[l], n.isDateExact(r, t)) {
                    i = o[l] = null, c=!0;
                    break
                }
                if (n.isDateOverlap(r, t)) {
                    e.isPlainObject(t) ? (t.inverted=!0, i = t) : e.isArray(t) ? (i = t, i[3] || i.push("inverted")) : a.isDate(t) && (i = [t.getFullYear(), t.getMonth(), t.getDate(), "inverted"]);
                    break
                }
            }
            if (i)
                for (l = 0; s > l; l += 1)
                    if (n.isDateExact(o[l], t)) {
                        o[l] = null;
                        break
                    }
            if (c)
                for (l = 0; s > l; l += 1)
                    if (n.isDateOverlap(o[l], t)) {
                        o[l] = null;
                        break
                    }
            i && o.push(i)
        }), o.filter(function(t) {
            return null != t
        })
    }, o.prototype.nodes = function(t) {
        var e = this, o = e.settings, s = e.item, r = s.now, l = s.select, c = s.highlight, u = s.view, h = s.disable, f = s.min, d = s.max, p = function(t, e) {
            return o.firstDay && (t.push(t.shift()), e.push(e.shift())), a.node("thead", a.node("tr", a.group({
                min: 0,
                max: i - 1,
                i: 1,
                node: "th",
                item: function(i) {
                    return [t[i], o.klass.weekdays, 'scope=col title="' + e[i] + '"']
                }
            })))
        }((o.showWeekdaysFull ? o.weekdaysFull : o.weekdaysShort).slice(0), o.weekdaysFull.slice(0)), m = function(t) {
            return a.node("div", " ", o.klass["nav" + (t ? "Next" : "Prev")] + (t && u.year >= d.year && u.month >= d.month ||!t && u.year <= f.year && u.month <= f.month ? " " + o.klass.navDisabled : ""), "data-nav=" + (t||-1) + " " + a.ariaAttr({
                role: "button",
                controls: e.$node[0].id + "_table"
            }) + ' title="' + (t ? o.labelMonthNext : o.labelMonthPrev) + '"')
        }, v = function() {
            var i = o.showMonthsShort ? o.monthsShort: o.monthsFull;
            return o.selectMonths ? a.node("select", a.group({
                min: 0,
                max: 11,
                i: 1,
                node: "option",
                item: function(t) {
                    return [i[t], 0, "value=" + t + (u.month == t ? " selected" : "") + (u.year == f.year && t < f.month || u.year == d.year && t > d.month ? " disabled" : "")]
                }
            }), o.klass.selectMonth, (t ? "" : "disabled") + " " + a.ariaAttr({
                controls: e.$node[0].id + "_table"
            }) + ' title="' + o.labelMonthSelect + '"') : a.node("div", i[u.month], o.klass.month)
        }, g = function() {
            var i = u.year, n = o.selectYears===!0 ? 5: ~~(o.selectYears / 2);
            if (n) {
                var s = f.year, r = d.year, l = i - n, c = i + n;
                if (s > l && (c += s - l, l = s), c > r) {
                    var h = l - s, p = c - r;
                    l -= h > p ? p : h, c = r
                }
                return a.node("select", a.group({
                    min: l,
                    max: c,
                    i: 1,
                    node: "option",
                    item: function(t) {
                        return [t, 0, "value=" + t + (i == t ? " selected" : "")]
                    }
                }), o.klass.selectYear, (t ? "" : "disabled") + " " + a.ariaAttr({
                    controls: e.$node[0].id + "_table"
                }) + ' title="' + o.labelYearSelect + '"')
            }
            return a.node("div", i, o.klass.year)
        };
        return a.node("div", (o.selectYears ? g() + v() : v() + g()) + m() + m(1), o.klass.header) + a.node("table", p + a.node("tbody", a.group({
            min: 0,
            max: n - 1,
            i: 1,
            node: "tr",
            item: function(t) {
                var n = o.firstDay && 0 === e.create([u.year, u.month, 1]).day?-7 : 0;
                return [a.group({
                    min: i * t - u.day + n + 1,
                    max: function() {
                        return this.min + i - 1
                    },
                    i: 1,
                    node: "td",
                    item: function(t) {
                        t = e.create([u.year, u.month, t + (o.firstDay ? 1 : 0)]);
                        var i = l && l.pick == t.pick, n = c && c.pick == t.pick, s = h && e.disabled(t) || t.pick < f.pick || t.pick > d.pick, p = a.trigger(e.formats.toString, e, [o.format, t]);
                        return [a.node("div", t.date, function(e) {
                            return e.push(u.month == t.month ? o.klass.infocus : o.klass.outfocus), r.pick == t.pick && e.push(o.klass.now), i && e.push(o.klass.selected), n && e.push(o.klass.highlighted), s && e.push(o.klass.disabled), e.join(" ")
                        }([o.klass.day]), "data-pick=" + t.pick + " " + a.ariaAttr({
                            role: "gridcell",
                            label: p,
                            selected: i && e.$node.val() === p?!0: null,
                            activedescendant: n?!0: null,
                            disabled: s?!0: null
                        })), "", a.ariaAttr({
                            role: "presentation"
                        })]
                    }
                })]
            }
        })), o.klass.table, 'id="' + e.$node[0].id + '_table" ' + a.ariaAttr({
            role: "grid",
            controls: e.$node[0].id,
            readonly: !0
        })) + a.node("div", a.node("button", o.today, o.klass.buttonToday, "type=button data-pick=" + r.pick + (t&&!e.disabled(r) ? "" : " disabled") + " " + a.ariaAttr({
            controls: e.$node[0].id
        })) + a.node("button", o.clear, o.klass.buttonClear, "type=button data-clear=1" + (t ? "" : " disabled") + " " + a.ariaAttr({
            controls: e.$node[0].id
        })) + a.node("button", o.close, o.klass.buttonClose, "type=button data-close=true " + (t ? "" : " disabled") + " " + a.ariaAttr({
            controls: e.$node[0].id
        })), o.klass.footer)
    }, o.defaults = function(t) {
        return {
            labelMonthNext: "Next month",
            labelMonthPrev: "Previous month",
            labelMonthSelect: "Select a month",
            labelYearSelect: "Select a year",
            monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            today: "Today",
            clear: "Clear",
            close: "Close",
            closeOnSelect: !0,
            closeOnClear: !0,
            format: "d mmmm, yyyy",
            klass: {
                table: t + "table",
                header: t + "header",
                navPrev: t + "nav--prev",
                navNext: t + "nav--next",
                navDisabled: t + "nav--disabled",
                month: t + "month",
                year: t + "year",
                selectMonth: t + "select--month",
                selectYear: t + "select--year",
                weekdays: t + "weekday",
                day: t + "day",
                disabled: t + "day--disabled",
                selected: t + "day--selected",
                highlighted: t + "day--highlighted",
                now: t + "day--today",
                infocus: t + "day--infocus",
                outfocus: t + "day--outfocus",
                footer: t + "footer",
                buttonClear: t + "button--clear",
                buttonToday: t + "button--today",
                buttonClose: t + "button--close"
            }
        }
    }(t.klasses().picker + "__"), t.extend("pickadate", o)
}), $.extend($.fn.pickadate.defaults, {
    selectMonths: !0,
    selectYears: 15,
    onRender: function() {
        var t = this.$root, e = this.get("highlight", "yyyy"), i = this.get("highlight", "dd"), n = this.get("highlight", "mmm"), a = this.get("highlight", "dddd");
        t.find(".picker__header").prepend('<div class="picker__date-display"><div class="picker__weekday-display">' + a + '</div><div class="picker__month-display"><div>' + n + '</div></div><div class="picker__day-display"><div>' + i + '</div></div><div    class="picker__year-display"><div>' + e + "</div></div></div>")
    }
}), function() {
    function h(t) {
        return document.createElementNS(n, t)
    }
    function f(t) {
        return (10 > t ? "0" : "") + t
    }
    function p(t) {
        var e=++d + "";
        return t ? t + e : e
    }
    function C(e, n) {
        function W(t, e) {
            var o = s.offset(), r = /^touch/.test(t.type), u = o.left + m, h = o.top + m, f = (r ? t.originalEvent.touches[0] : t).pageX - u, d = (r ? t.originalEvent.touches[0] : t).pageY - h, p = Math.sqrt(f * f + d * d), g=!1;
            if (!e ||!(v - y > p || p > v + y)) {
                t.preventDefault();
                var b = setTimeout(function() {
                    E.popover.addClass("clockpicker-moving")
                }, 200);
                a && s.append(E.canvas), E.setHand(f, d, !e, !0), i.off(l).on(l, function(t) {
                    t.preventDefault();
                    var e = /^touch/.test(t.type), i = (e ? t.originalEvent.touches[0] : t).pageX - u, n = (e ? t.originalEvent.touches[0] : t).pageY - h;
                    (g || i !== f || n !== d) && (g=!0, E.setHand(i, n, !1, !0))
                }), i.off(c).on(c, function(t) {
                    i.off(c), t.preventDefault();
                    var a = /^touch/.test(t.type), o = (a ? t.originalEvent.changedTouches[0] : t).pageX - u, r = (a ? t.originalEvent.changedTouches[0] : t).pageY - h;
                    (e || g) && o === f && r === d && E.setHand(o, r), "hours" === E.currentView ? E.toggleView("minutes", w / 2) : n.autoclose && (E.minutesView.addClass("clockpicker-dial-out"), setTimeout(function() {
                        E.done()
                    }, w / 2)), s.prepend(_), clearTimeout(b), E.popover.removeClass("clockpicker-moving"), i.off(l)
                })
            }
        }
        var o = t(x), s = o.find(".clockpicker-plate"), u = o.find(".picker__holder"), d = o.find(".clockpicker-hours"), C = o.find(".clockpicker-minutes"), k = o.find(".clockpicker-am-pm-block"), P = "INPUT" === e.prop("tagName"), T = P ? e: e.find("input"), A = t("label[for=" + T.attr("id") + "]"), E = this;
        if (this.id = p("cp"), this.element = e, this.holder = u, this.options = n, this.isAppended=!1, this.isShown=!1, this.currentView = "hours", this.isInput = P, this.input = T, this.label = A, this.popover = o, this.plate = s, this.hoursView = d, this.minutesView = C, this.amPmBlock = k, this.spanHours = o.find(".clockpicker-span-hours"), this.spanMinutes = o.find(".clockpicker-span-minutes"), this.spanAmPm = o.find(".clockpicker-span-am-pm"), this.footer = o.find(".picker__footer"), this.amOrPm = "PM", n.twelvehour) {
            var L = ['<div class="clockpicker-am-pm-block">', '<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-am-button">', "AM", "</button>", '<button type="button" class="btn-floating btn-flat clockpicker-button clockpicker-pm-button">', "PM", "</button>", "</div>"].join("");
            t(L);
            n.ampmclickable ? (this.spanAmPm.empty(), t('<div id="click-am">AM</div>').on("click", function() {
                E.spanAmPm.children("#click-am").addClass("text-primary"), E.spanAmPm.children("#click-pm").removeClass("text-primary"), E.amOrPm = "AM"
            }).appendTo(this.spanAmPm), t('<div id="click-pm">PM</div>').on("click", function() {
                E.spanAmPm.children("#click-pm").addClass("text-primary"), E.spanAmPm.children("#click-am").removeClass("text-primary"), E.amOrPm = "PM"
            }).appendTo(this.spanAmPm)) : (t('<button type="button" class="btn-floating btn-flat clockpicker-button am-button" tabindex="1">AM</button>').on("click", function() {
                E.amOrPm = "AM", E.amPmBlock.children(".pm-button").removeClass("active"), E.amPmBlock.children(".am-button").addClass("active"), E.spanAmPm.empty().append("AM")
            }).appendTo(this.amPmBlock), t('<button type="button" class="btn-floating btn-flat clockpicker-button pm-button" tabindex="2">PM</button>').on("click", function() {
                E.amOrPm = "PM", E.amPmBlock.children(".am-button").removeClass("active"), E.amPmBlock.children(".pm-button").addClass("active"), E.spanAmPm.empty().append("PM")
            }).appendTo(this.amPmBlock))
        }
        n.darktheme && o.addClass("darktheme"), t('<button type="button" class="btn-flat clockpicker-button" tabindex="' + (n.twelvehour ? "3" : "1") + '">' + n.donetext + "</button>").click(t.proxy(this.done, this)).appendTo(this.footer), this.spanHours.click(t.proxy(this.toggleView, this, "hours")), this.spanMinutes.click(t.proxy(this.toggleView, this, "minutes")), T.on("focus.clockpicker click.clockpicker", t.proxy(this.show, this));
        var I, R, D, z, O = t('<div class="clockpicker-tick"></div>');
        if (n.twelvehour)
            for (I = 1; 13 > I; I += 1)
                R = O.clone(), D = I / 6 * Math.PI, z = v, R.css("font-size", "140%"), R.css({
                    left: m + Math.sin(D) * z - y,
                    top: m - Math.cos(D) * z - y
                }), R.html(0 === I ? "00" : I), d.append(R), R.on(r, W);
        else
            for (I = 0; 24 > I; I += 1) {
                R = O.clone(), D = I / 6 * Math.PI;
                var V = I > 0 && 13 > I;
                z = V ? g : v, R.css({
                    left: m + Math.sin(D) * z - y,
                    top: m - Math.cos(D) * z - y
                }), V && R.css("font-size", "120%"), R.html(0 === I ? "00" : I), d.append(R), R.on(r, W)
            }
        for (I = 0; 60 > I; I += 5)
            R = O.clone(), D = I / 30 * Math.PI, R.css({
                left: m + Math.sin(D) * v - y,
                top: m - Math.cos(D) * v - y
            }), R.css("font-size", "140%"), R.html(f(I)), C.append(R), R.on(r, W);
        if (s.on(r, function(e) {
            0 === t(e.target).closest(".clockpicker-tick").length && W(e, !0)
        }), a) {
            var _ = o.find(".clockpicker-canvas"), H = h("svg");
            H.setAttribute("class", "clockpicker-svg"), H.setAttribute("width", b), H.setAttribute("height", b);
            var B = h("g");
            B.setAttribute("transform", "translate(" + m + "," + m + ")");
            var N = h("circle");
            N.setAttribute("class", "clockpicker-canvas-bearing"), N.setAttribute("cx", 0), N.setAttribute("cy", 0), N.setAttribute("r", 2);
            var j = h("line");
            j.setAttribute("x1", 0), j.setAttribute("y1", 0);
            var $ = h("circle");
            $.setAttribute("class", "clockpicker-canvas-bg"), $.setAttribute("r", y);
            var q = h("circle");
            q.setAttribute("class", "clockpicker-canvas-fg"), q.setAttribute("r", 5), B.appendChild(j), B.appendChild($), B.appendChild(q), B.appendChild(N),
            H.appendChild(B), _.append(H), this.hand = j, this.bg = $, this.fg = q, this.bearing = N, this.g = B, this.canvas = _
        }
        S(this.options.init)
    }
    function S(t) {
        t && "function" == typeof t && t()
    }
    var t = window.jQuery, e = t(window), i = t(document), n = "http://www.w3.org/2000/svg", a = "SVGAngle"in window && function() {
        var t, e = document.createElement("div");
        return e.innerHTML = "<svg/>", t = (e.firstChild && e.firstChild.namespaceURI) == n, e.innerHTML = "", t
    }(), o = function() {
        var t = document.createElement("div").style;
        return "transition"in t || "WebkitTransition"in t || "MozTransition"in t || "msTransition"in t || "OTransition"in t
    }(), s = "ontouchstart"in window, r = "mousedown" + (s ? " touchstart" : ""), l = "mousemove.clockpicker" + (s ? " touchmove.clockpicker" : ""), c = "mouseup.clockpicker" + (s ? " touchend.clockpicker" : ""), u = navigator.vibrate ? "vibrate": navigator.webkitVibrate ? "webkitVibrate": null, d = 0, m = 135, v = 110, g = 80, y = 20, b = 2 * m, w = o ? 350: 1, x = ['<div class="clockpicker picker">', '<div class="picker__holder">', '<div class="picker__frame">', '<div class="picker__wrap">', '<div class="picker__box">', '<div class="picker__date-display">', '<div class="clockpicker-display">', '<div class="clockpicker-display-column">', '<span class="clockpicker-span-hours text-primary"></span>', ":", '<span class="clockpicker-span-minutes"></span>', "</div>", '<div class="clockpicker-display-column clockpicker-display-am-pm">', '<div class="clockpicker-span-am-pm"></div>', "</div>", "</div>", "</div>", '<div class="picker__calendar-container">', '<div class="clockpicker-plate">', '<div class="clockpicker-canvas"></div>', '<div class="clockpicker-dial clockpicker-hours"></div>', '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>', "</div>", '<div class="clockpicker-am-pm-block">', "</div>", "</div>", '<div class="picker__footer">', "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
    C.DEFAULTS = {
        "default": "",
        fromnow: 0,
        donetext: "Done",
        autoclose: !1,
        ampmclickable: !1,
        darktheme: !1,
        twelvehour: !0,
        vibrate: !0
    }, C.prototype.toggle = function() {
        this[this.isShown ? "hide": "show"]()
    }, C.prototype.locate = function() {
        var t = this.element, e = this.popover;
        t.offset(), t.outerWidth(), t.outerHeight(), this.options.align;
        e.show()
    }, C.prototype.show = function(n) {
        if (!this.isShown) {
            S(this.options.beforeShow), t(":input").each(function() {
                t(this).attr("tabindex", - 1)
            });
            var a = this;
            this.input.blur(), this.popover.addClass("picker--opened"), this.input.addClass("picker__input picker__input--active"), t(document.body).css("overflow", "hidden"), this.isAppended || (this.popover.insertAfter(this.input), this.options.twelvehour && (this.amOrPm = "PM", this.options.ampmclickable ? (this.spanAmPm.children("#click-pm").addClass("text-primary"), this.spanAmPm.children("#click-am").removeClass("text-primary")) : (this.amPmBlock.children(".am-button").removeClass("active"), this.amPmBlock.children(".pm-button").addClass("active"), this.spanAmPm.empty().append("PM"))), e.on("resize.clockpicker" + this.id, function() {
                a.isShown && a.locate()
            }), this.isAppended=!0);
            var o = ((this.input.prop("value") || this.options["default"] || "") + "").split(":");
            if (this.options.twelvehour && "undefined" != typeof o[1] && (o[1] = o[1].replace("AM", "").replace("PM", "")), "now" === o[0]) {
                var s = new Date( + new Date + this.options.fromnow);
                o = [s.getHours(), s.getMinutes()]
            }
            this.hours =+ o[0] || 0, this.minutes =+ o[1] || 0, this.spanHours.html(f(this.hours)), this.spanMinutes.html(f(this.minutes)), this.toggleView("hours"), this.locate(), this.isShown=!0, i.on("click.clockpicker." + this.id + " focusin.clockpicker." + this.id, function(e) {
                var i = t(e.target);
                0 === i.closest(a.popover.find(".picker__wrap")).length && 0 === i.closest(a.input).length && a.hide()
            }), i.on("keyup.clockpicker." + this.id, function(t) {
                27 === t.keyCode && a.hide()
            }), S(this.options.afterShow)
        }
    }, C.prototype.hide = function() {
        S(this.options.beforeHide), this.input.removeClass("picker__input picker__input--active"), this.popover.removeClass("picker--opened"), t(document.body).css("overflow", "visible"), this.isShown=!1, t(":input").each(function(e) {
            t(this).attr("tabindex", e + 1)
        }), i.off("click.clockpicker." + this.id + " focusin.clockpicker." + this.id), i.off("keyup.clockpicker." + this.id), this.popover.hide(), S(this.options.afterHide)
    }, C.prototype.toggleView = function(e, i) {
        var n=!1;
        "minutes" === e && "visible" === t(this.hoursView).css("visibility") && (S(this.options.beforeHourSelect), n=!0);
        var a = "hours" === e, o = a ? this.hoursView: this.minutesView, s = a ? this.minutesView: this.hoursView;
        this.currentView = e, this.spanHours.toggleClass("text-primary", a), this.spanMinutes.toggleClass("text-primary", !a), s.addClass("clockpicker-dial-out"), o.css("visibility", "visible").removeClass("clockpicker-dial-out"), this.resetClock(i), clearTimeout(this.toggleViewTimer), this.toggleViewTimer = setTimeout(function() {
            s.css("visibility", "hidden")
        }, w), n && S(this.options.afterHourSelect)
    }, C.prototype.resetClock = function(t) {
        var e = this.currentView, i = this[e], n = "hours" === e, o = Math.PI / (n ? 6 : 30), s = i * o, r = n && i > 0 && 13 > i ? g: v, l = Math.sin(s) * r, c =- Math.cos(s) * r, u = this;
        a && t ? (u.canvas.addClass("clockpicker-canvas-out"), setTimeout(function() {
            u.canvas.removeClass("clockpicker-canvas-out"), u.setHand(l, c)
        }, t)) : this.setHand(l, c)
    }, C.prototype.setHand = function(e, i, n, o) {
        var m, s = Math.atan2(e, - i), r = "hours" === this.currentView, l = Math.PI / (r || n ? 6 : 30), c = Math.sqrt(e * e + i * i), h = this.options, d = r && (v + g) / 2 > c, p = d ? g: v;
        if (h.twelvehour && (p = v), 0 > s && (s = 2 * Math.PI + s), m = Math.round(s / l), s = m * l, h.twelvehour ? r ? 0 === m && (m = 12) : (n && (m*=5), 60 === m && (m = 0)) : r ? (12 === m && (m = 0), m = d ? 0 === m ? 12 : m : 0 === m ? 0 : m + 12) : (n && (m*=5), 60 === m && (m = 0)), r ? this.fg.setAttribute("class", "clockpicker-canvas-fg") : m%5 == 0 ? this.fg.setAttribute("class", "clockpicker-canvas-fg") : this.fg.setAttribute("class", "clockpicker-canvas-fg active"), this[this.currentView] !== m && u && this.options.vibrate && (this.vibrateTimer || (navigator[u](10), this.vibrateTimer = setTimeout(t.proxy(function() {
            this.vibrateTimer = null
        }, this), 100))), this[this.currentView] = m, this[r ? "spanHours": "spanMinutes"].html(f(m)), !a)
            return void this[r ? "hoursView": "minutesView"].find(".clockpicker-tick").each(function() {
            var e = t(this);
            e.toggleClass("active", m ===+ e.html())
        });
        o ||!r && m%5 ? (this.g.insertBefore(this.hand, this.bearing), this.g.insertBefore(this.bg, this.fg), this.bg.setAttribute("class", "clockpicker-canvas-bg clockpicker-canvas-bg-trans")) : (this.g.insertBefore(this.hand, this.bg), this.g.insertBefore(this.fg, this.bg), this.bg.setAttribute("class", "clockpicker-canvas-bg"));
        var b = Math.sin(s) * (p - y), w =- Math.cos(s) * (p - y), x = Math.sin(s) * p, C =- Math.cos(s) * p;
        this.hand.setAttribute("x2", b), this.hand.setAttribute("y2", w), this.bg.setAttribute("cx", x), this.bg.setAttribute("cy", C), this.fg.setAttribute("cx", x), this.fg.setAttribute("cy", C)
    }, C.prototype.done = function() {
        S(this.options.beforeDone), this.hide(), this.label.addClass("active");
        var t = this.input.prop("value"), e = f(this.hours) + ":" + f(this.minutes);
        this.options.twelvehour && (e += this.amOrPm), this.input.prop("value", e), e !== t && (this.input.triggerHandler("change"), this.isInput || this.element.trigger("change")), this.options.autoclose && this.input.trigger("blur"), S(this.options.afterDone)
    }, C.prototype.remove = function() {
        this.element.removeData("clockpicker"), this.input.off("focus.clockpicker click.clockpicker"), this.isShown && this.hide(), this.isAppended && (e.off("resize.clockpicker" + this.id), this.popover.remove())
    }, t.fn.pickatime = function(e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var n = t(this), a = n.data("clockpicker");
            if (a)
                "function" == typeof a[e] && a[e].apply(a, i);
            else {
                var o = t.extend({}, C.DEFAULTS, n.data(), "object" == typeof e && e);
                n.data("clockpicker", new C(n, o))
            }
        })
    }
}(), !function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipe = e()
}(this, function() {
    "use strict";
    var t = function(t, e, i, n) {
        var a = {
            features: null,
            bind: function(t, e, i, n) {
                var a = (n ? "remove" : "add") + "EventListener";
                e = e.split(" ");
                for (var o = 0; o < e.length; o++)
                    e[o] && t[a](e[o], i, !1)
            },
            isArray: function(t) {
                return t instanceof Array
            },
            createEl: function(t, e) {
                var i = document.createElement(e || "div");
                return t && (i.className = t), i
            },
            getScrollY: function() {
                var t = window.pageYOffset;
                return void 0 !== t ? t : document.documentElement.scrollTop
            },
            unbind: function(t, e, i) {
                a.bind(t, e, i, !0)
            },
            removeClass: function(t, e) {
                var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
                t.className = t.className.replace(i, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(t, e) {
                a.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
            },
            hasClass: function(t, e) {
                return t.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
            },
            getChildByClass: function(t, e) {
                for (var i = t.firstChild; i;) {
                    if (a.hasClass(i, e))
                        return i;
                    i = i.nextSibling
                }
            },
            arraySearch: function(t, e, i) {
                for (var n = t.length; n--;)
                    if (t[n][i] === e)
                        return n;
                return - 1
            },
            extend: function(t, e, i) {
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        if (i && t.hasOwnProperty(n))
                            continue;
                            t[n] = e[n]
                    }
            },
            easing: {
                sine: {
                    out: function(t) {
                        return Math.sin(t * (Math.PI / 2))
                    },
                    inOut: function(t) {
                        return - (Math.cos(Math.PI * t) - 1) / 2
                    }
                },
                cubic: {
                    out: function(t) {
                        return --t * t * t + 1
                    }
                }
            },
            detectFeatures: function() {
                if (a.features)
                    return a.features;
                var t = a.createEl(), e = t.style, i = "", n = {};
                if (n.oldIE = document.all&&!document.addEventListener, n.touch = "ontouchstart"in window, window.requestAnimationFrame && (n.raf = window.requestAnimationFrame, n.caf = window.cancelAnimationFrame), n.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !n.pointerEvent) {
                    var o = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var s = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        s && s.length > 0 && (s = parseInt(s[1], 10), s >= 1 && 8 > s && (n.isOldIOSPhone=!0))
                    }
                    var r = o.match(/Android\s([0-9\.]*)/), l = r ? r[1]: 0;
                    l = parseFloat(l), l >= 1 && (4.4 > l && (n.isOldAndroid=!0), n.androidVersion = l), n.isMobileOpera = /opera mini|opera mobi/i.test(o)
                }
                for (var c, u, h = ["transform", "perspective", "animationName"], f = ["", "webkit", "Moz", "ms", "O"], d = 0; 4 > d; d++) {
                    i = f[d];
                    for (var p = 0; 3 > p; p++)
                        c = h[p], u = i + (i ? c.charAt(0).toUpperCase() + c.slice(1) : c), !n[c] && u in e && (n[c] = u);
                    i&&!n.raf && (i = i.toLowerCase(), n.raf = window[i + "RequestAnimationFrame"], n.raf && (n.caf = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]))
                }
                if (!n.raf) {
                    var m = 0;
                    n.raf = function(t) {
                        var e = (new Date).getTime(), i = Math.max(0, 16 - (e - m)), n = window.setTimeout(function() {
                            t(e + i)
                        }, i);
                        return m = e + i, n
                    }, n.caf = function(t) {
                        clearTimeout(t)
                    }
                }
                return n.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, a.features = n, n
            }
        };
        a.detectFeatures(), a.features.oldIE && (a.bind = function(t, e, i, n) {
            e = e.split(" ");
            for (var a, o = (n ? "detach" : "attach") + "Event", s = function() {
                i.handleEvent.call(i)
            }, r = 0; r < e.length; r++)
                if (a = e[r])
                    if ("object" == typeof i && i.handleEvent) {
                        if (n) {
                            if (!i["oldIE" + a])
                                return !1
                        } else
                            i["oldIE" + a] = s;
                            t[o]("on" + a, i["oldIE" + a])
                    } else
                        t[o]("on" + a, i)
        });
        var o = this, s = 25, r = 3, l = {
            allowPanToNext: !0,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: !1,
            loop: !0,
            pinchToClose: !0,
            closeOnScroll: !0,
            closeOnVerticalDrag: !0,
            verticalDragRange: .75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: !1,
            focus: !0,
            escKey: !0,
            arrowKeys: !0,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function(t) {
                return "A" === t.tagName
            },
            getDoubleTapZoom: function(t, e) {
                return t ? 1 : e.initialZoomLevel < .7 ? 1 : 1.33
            },
            maxSpreadZoom: 1.33,
            modal: !0,
            scaleMode: "fit"
        };
        a.extend(l, n);
        var c, u, h, f, d, p, m, v, g, y, b, w, x, C, S, k, P, T, A, E, M, L, F, O, I, R, D, z, V, W, _, H, B, N, j, $, q, X, Y, Q, Z, G, U, K, J, tt, et, it, nt, at, ot, st, rt, lt, ct, ut, ht = function() {
            return {
                x: 0,
                y: 0
            }
        }, ft = ht(), dt = ht(), pt = ht(), mt = {}, vt = 0, gt = {}, yt = ht(), bt = 0, wt=!0, xt = [], Ct = {}, St=!1, kt = function(t, e) {
            a.extend(o, e.publicMethods), xt.push(t)
        }, Pt = function(t) {
            var e = Je();
            return t > e - 1 ? t - e : 0 > t ? e + t : t
        }, Tt = {}, At = function(t, e) {
            return Tt[t] || (Tt[t] = []), Tt[t].push(e)
        }, Et = function(t) {
            var e = Tt[t];
            if (e) {
                var i = Array.prototype.slice.call(arguments);
                i.shift();
                for (var n = 0; n < e.length; n++)
                    e[n].apply(o, i)
            }
        }, Mt = function() {
            return (new Date).getTime()
        }, Lt = function(t) {
            lt = t, o.bg.style.opacity = t * l.bgOpacity
        }, Ft = function(t, e, i, n, a) {
            (!St || a && a !== o.currItem) && (n/=a ? a.fitRatio : o.currItem.fitRatio), t[L] = w + e + "px, " + i + "px" + x + " scale(" + n + ")"
        }, Ot = function(t) {
            nt && (t && (y > o.currItem.fitRatio ? St || (hi(o.currItem, !1, !0), St=!0) : St && (hi(o.currItem), St=!1)), Ft(nt, pt.x, pt.y, y))
        }, It = function(t) {
            t.container && Ft(t.container.style, t.initialPosition.x, t.initialPosition.y, t.initialZoomLevel, t)
        }, Rt = function(t, e) {
            e[L] = w + t + "px, 0px" + x
        }, Dt = function(t, e) {
            if (!l.loop && e) {
                var i = f + (yt.x * vt - t) / yt.x, n = Math.round(t - ye.x);
                (0 > i && n > 0 || i >= Je() - 1 && 0 > n) && (t = ye.x + n * l.mainScrollEndFriction)
            }
            ye.x = t, Rt(t, d)
        }, zt = function(t, e) {
            var i = be[t] - gt[t];
            return dt[t] + ft[t] + i - i * (e / b)
        }, Vt = function(t, e) {
            t.x = e.x, t.y = e.y, e.id && (t.id = e.id)
        }, Wt = function(t) {
            t.x = Math.round(t.x), t.y = Math.round(t.y)
        }, _t = null, Ht = function() {
            _t && (a.unbind(document, "mousemove", Ht), a.addClass(t, "pswp--has_mouse"), l.mouseUsed=!0, Et("mouseUsed")), _t = setTimeout(function() {
                _t = null
            }, 100)
        }, Bt = function() {
            a.bind(document, "keydown", o), _.transform && a.bind(o.scrollWrap, "click", o), l.mouseUsed || a.bind(document, "mousemove", Ht), a.bind(window, "resize scroll", o), Et("bindEvents")
        }, Nt = function() {
            a.unbind(window, "resize", o), a.unbind(window, "scroll", g.scroll), a.unbind(document, "keydown", o), a.unbind(document, "mousemove", Ht), _.transform && a.unbind(o.scrollWrap, "click", o), X && a.unbind(window, m, o), Et("unbindEvents")
        }, jt = function(t, e) {
            var i = ri(o.currItem, mt, t);
            return e && (it = i), i
        }, $t = function(t) {
            return t || (t = o.currItem), t.initialZoomLevel
        }, qt = function(t) {
            return t || (t = o.currItem), t.w > 0 ? l.maxSpreadZoom : 1
        }, Xt = function(t, e, i, n) {
            return n === o.currItem.initialZoomLevel ? (i[t] = o.currItem.initialPosition[t], !0) : (i[t] = zt(t, n), i[t] > e.min[t] ? (i[t] = e.min[t], !0) : i[t] < e.max[t] ? (i[t] = e.max[t], !0) : !1)
        }, Yt = function() {
            if (L) {
                var e = _.perspective&&!O;
                return w = "translate" + (e ? "3d(" : "("), void(x = _.perspective ? ", 0px)" : ")")
            }
            L = "left", a.addClass(t, "pswp--ie"), Rt = function(t, e) {
                e.left = t + "px"
            }, It = function(t) {
                var e = t.fitRatio > 1 ? 1: t.fitRatio, i = t.container.style, n = e * t.w, a = e * t.h;
                i.width = n + "px", i.height = a + "px", i.left = t.initialPosition.x + "px", i.top = t.initialPosition.y + "px"
            }, Ot = function() {
                if (nt) {
                    var t = nt, e = o.currItem, i = e.fitRatio > 1 ? 1: e.fitRatio, n = i * e.w, a = i * e.h;
                    t.width = n + "px", t.height = a + "px", t.left = pt.x + "px", t.top = pt.y + "px"
                }
            }
        }, Qt = function(t) {
            var e = "";
            l.escKey && 27 === t.keyCode ? e = "close" : l.arrowKeys && (37 === t.keyCode ? e = "prev" : 39 === t.keyCode && (e = "next")), e && (t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || (t.preventDefault ? t.preventDefault() : t.returnValue=!1, o[e]()))
        }, Zt = function(t) {
            t && (Z || Q || at || $) && (t.preventDefault(), t.stopPropagation())
        }, Gt = function() {
            o.setScrollOffset(0, a.getScrollY())
        }, Ut = {}, Kt = 0, Jt = function(t) {
            Ut[t] && (Ut[t].raf && R(Ut[t].raf), Kt--, delete Ut[t])
        }, te = function(t) {
            Ut[t] && Jt(t), Ut[t] || (Kt++, Ut[t] = {})
        }, ee = function() {
            for (var t in Ut)
                Ut.hasOwnProperty(t) && Jt(t)
        }, ie = function(t, e, i, n, a, o, s) {
            var r, l = Mt();
            te(t);
            var c = function() {
                if (Ut[t]) {
                    if (r = Mt() - l, r >= n)
                        return Jt(t), o(i), void(s && s());
                    o((i - e) * a(r / n) + e), Ut[t].raf = I(c)
                }
            };
            c()
        }, ne = {
            shout: Et,
            listen: At,
            viewportSize: mt,
            options: l,
            isMainScrollAnimating: function() {
                return at
            },
            getZoomLevel: function() {
                return y
            },
            getCurrentIndex: function() {
                return f
            },
            isDragging: function() {
                return X
            },
            isZooming: function() {
                return J
            },
            setScrollOffset: function(t, e) {
                gt.x = t, W = gt.y = e, Et("updateScrollOffset", gt)
            },
            applyZoomPan: function(t, e, i, n) {
                pt.x = e, pt.y = i, y = t, Ot(n)
            },
            init: function() {
                if (!c&&!u) {
                    var i;
                    o.framework = a, o.template = t, o.bg = a.getChildByClass(t, "pswp__bg"), D = t.className, c=!0, _ = a.detectFeatures(), I = _.raf, R = _.caf, L = _.transform, V = _.oldIE, o.scrollWrap = a.getChildByClass(t, "pswp__scroll-wrap"), o.container = a.getChildByClass(o.scrollWrap, "pswp__container"), d = o.container.style, o.itemHolders = k = [{
                        el: o.container.children[0],
                        wrap: 0,
                        index: - 1
                    }, {
                        el: o.container.children[1],
                        wrap: 0,
                        index: - 1
                    }, {
                        el: o.container.children[2],
                        wrap: 0,
                        index: - 1
                    }
                    ], k[0].el.style.display = k[2].el.style.display = "none", Yt(), g = {
                        resize: o.updateSize,
                        scroll: Gt,
                        keydown: Qt,
                        click: Zt
                    };
                    var n = _.isOldIOSPhone || _.isOldAndroid || _.isMobileOpera;
                    for (_.animationName && _.transform&&!n || (l.showAnimationDuration = l.hideAnimationDuration = 0), i = 0; i < xt.length; i++)
                        o["init" + xt[i]]();
                    if (e) {
                        var s = o.ui = new e(o, a);
                        s.init()
                    }
                    Et("firstUpdate"), f = f || l.index || 0, (isNaN(f) || 0 > f || f >= Je()) && (f = 0), o.currItem = Ke(f), (_.isOldIOSPhone || _.isOldAndroid) && (wt=!1), t.setAttribute("aria-hidden", "false"), l.modal && (wt ? t.style.position = "fixed" : (t.style.position = "absolute", t.style.top = a.getScrollY() + "px")), void 0 === W && (Et("initialLayout"), W = z = a.getScrollY());
                    var h = "pswp--open ";
                    for (l.mainClass && (h += l.mainClass + " "), l.showHideOpacity && (h += "pswp--animate_opacity "), h += O ? "pswp--touch" : "pswp--notouch", h += _.animationName ? " pswp--css_animation" : "", h += _.svg ? " pswp--svg" : "", a.addClass(t, h), o.updateSize(), p =- 1, bt = null, i = 0; r > i; i++)
                        Rt((i + p) * yt.x, k[i].el.style);
                    V || a.bind(o.scrollWrap, v, o), At("initialZoomInEnd", function() {
                        o.setContent(k[0], f - 1), o.setContent(k[2], f + 1), k[0].el.style.display = k[2].el.style.display = "block", l.focus && t.focus(), Bt()
                    }), o.setContent(k[1], f), o.updateCurrItem(), Et("afterInit"), wt || (C = setInterval(function() {
                        Kt || X || J || y !== o.currItem.initialZoomLevel || o.updateSize()
                    }, 1e3)), a.addClass(t, "pswp--visible")
                }
            },
            close: function() {
                c && (c=!1, u=!0, Et("close"), Nt(), ei(o.currItem, null, !0, o.destroy))
            },
            destroy: function() {
                Et("destroy"), Qe && clearTimeout(Qe), t.setAttribute("aria-hidden", "true"), t.className = D, C && clearInterval(C), a.unbind(o.scrollWrap, v, o), a.unbind(window, "scroll", o), ke(), ee(), Tt = null
            },
            panTo: function(t, e, i) {
                i || (t > it.min.x ? t = it.min.x : t < it.max.x && (t = it.max.x), e > it.min.y ? e = it.min.y : e < it.max.y && (e = it.max.y)), pt.x = t, pt.y = e, Ot()
            },
            handleEvent: function(t) {
                t = t || window.event, g[t.type] && g[t.type](t)
            },
            goTo: function(t) {
                t = Pt(t);
                var e = t - f;
                bt = e, f = t, o.currItem = Ke(f), vt -= e, Dt(yt.x * vt), ee(), at=!1, o.updateCurrItem()
            },
            next: function() {
                o.goTo(f + 1)
            },
            prev: function() {
                o.goTo(f - 1)
            },
            updateCurrZoomItem: function(t) {
                if (t && Et("beforeChange", 0), k[1].el.children.length) {
                    var e = k[1].el.children[0];
                    nt = a.hasClass(e, "pswp__zoom-wrap") ? e.style : null
                } else
                    nt = null;
                it = o.currItem.bounds, b = y = o.currItem.initialZoomLevel, pt.x = it.center.x, pt.y = it.center.y, t && Et("afterChange")
            },
            invalidateCurrItems: function() {
                S=!0;
                for (var t = 0; r > t; t++)
                    k[t].item && (k[t].item.needsUpdate=!0)
            },
            updateCurrItem: function(t) {
                if (0 !== bt) {
                    var e, i = Math.abs(bt);
                    if (!(t && 2 > i)) {
                        o.currItem = Ke(f), St=!1, Et("beforeChange", bt), i >= r && (p += bt + (bt > 0?-r : r), i = r);
                        for (var n = 0; i > n; n++)
                            bt > 0 ? (e = k.shift(), k[r - 1] = e, p++, Rt((p + 2) * yt.x, e.el.style), o.setContent(e, f - i + n + 1 + 1)) : (e = k.pop(), k.unshift(e), p--, Rt(p * yt.x, e.el.style), o.setContent(e, f + i - n - 1 - 1));
                        if (nt && 1 === Math.abs(bt)) {
                            var a = Ke(P);
                            a.initialZoomLevel !== y && (ri(a, mt), hi(a), It(a))
                        }
                        bt = 0, o.updateCurrZoomItem(), P = f, Et("afterChange")
                    }
                }
            },
            updateSize: function(e) {
                if (!wt && l.modal) {
                    var i = a.getScrollY();
                    if (W !== i && (t.style.top = i + "px", W = i), !e && Ct.x === window.innerWidth && Ct.y === window.innerHeight)
                        return;
                    Ct.x = window.innerWidth, Ct.y = window.innerHeight, t.style.height = Ct.y + "px"
                }
                if (mt.x = o.scrollWrap.clientWidth, mt.y = o.scrollWrap.clientHeight, Gt(), yt.x = mt.x + Math.round(mt.x * l.spacing), yt.y = mt.y, Dt(yt.x * vt), Et("beforeResize"), void 0 !== p) {
                    for (var n, s, c, u = 0; r > u; u++)
                        n = k[u], Rt((u + p) * yt.x, n.el.style), c = f + u - 1, l.loop && Je() > 2 && (c = Pt(c)), s = Ke(c), s && (S || s.needsUpdate ||!s.bounds) ? (o.cleanSlide(s), o.setContent(n, c), 1 === u && (o.currItem = s, o.updateCurrZoomItem(!0)), s.needsUpdate=!1) : - 1 === n.index && c >= 0 && o.setContent(n, c), s && s.container && (ri(s, mt), hi(s), It(s));
                    S=!1
                }
                b = y = o.currItem.initialZoomLevel, it = o.currItem.bounds, it && (pt.x = it.center.x, pt.y = it.center.y, Ot(!0)), Et("resize")
            },
            zoomTo: function(t, e, i, n, o) {
                e && (b = y, be.x = Math.abs(e.x) - pt.x, be.y = Math.abs(e.y) - pt.y, Vt(dt, pt));
                var s = jt(t, !1), r = {};
                Xt("x", s, r, t), Xt("y", s, r, t);
                var l = y, c = {
                    x: pt.x,
                    y: pt.y
                };
                Wt(r);
                var u = function(e) {
                    1 === e ? (y = t, pt.x = r.x, pt.y = r.y) : (y = (t - l) * e + l, pt.x = (r.x - c.x) * e + c.x, pt.y = (r.y - c.y) * e + c.y), o && o(e), Ot(1 === e)
                };
                i ? ie("customZoomTo", 0, 1, i, n || a.easing.sine.inOut, u) : u(1)
            }
        }, ae = 30, oe = 10, se = {}, re = {}, le = {}, ce = {}, ue = {}, he = [], fe = {}, de = [], pe = {}, me = 0, ve = ht(), ge = 0, ye = ht(), be = ht(), we = ht(), xe = function(t, e) {
            return t.x === e.x && t.y === e.y
        }, Ce = function(t, e) {
            return Math.abs(t.x - e.x) < s && Math.abs(t.y - e.y) < s
        }, Se = function(t, e) {
            return pe.x = Math.abs(t.x - e.x), pe.y = Math.abs(t.y - e.y), Math.sqrt(pe.x * pe.x + pe.y * pe.y)
        }, ke = function() {
            G && (R(G), G = null)
        }, Pe = function() {
            X && (G = I(Pe), Be())
        }, Te = function() {
            return !("fit" === l.scaleMode && y === o.currItem.initialZoomLevel)
        }, Ae = function(t, e) {
            return t && t !== document ? t.getAttribute("class") && t.getAttribute("class").indexOf("pswp__scroll-wrap")>-1?!1 : e(t) ? t : Ae(t.parentNode, e) : !1
        }, Ee = {}, Me = function(t, e) {
            return Ee.prevent=!Ae(t.target, l.isClickableElement), Et("preventDragEvent", t, e, Ee), Ee.prevent
        }, Le = function(t, e) {
            return e.x = t.pageX, e.y = t.pageY, e.id = t.identifier, e
        }, Fe = function(t, e, i) {
            i.x = .5 * (t.x + e.x), i.y = .5 * (t.y + e.y)
        }, Oe = function(t, e, i) {
            if (t - B > 50) {
                var n = de.length > 2 ? de.shift(): {};
                n.x = e, n.y = i, de.push(n), B = t
            }
        }, Ie = function() {
            var t = pt.y - o.currItem.initialPosition.y;
            return 1 - Math.abs(t / (mt.y / 2))
        }, Re = {}, De = {}, ze = [], Ve = function(t) {
            for (; ze.length > 0;)
                ze.pop();
            return F ? (ut = 0, he.forEach(function(t) {
                0 === ut ? ze[0] = t : 1 === ut && (ze[1] = t), ut++
            })) : t.type.indexOf("touch")>-1 ? t.touches && t.touches.length > 0 && (ze[0] = Le(t.touches[0], Re), t.touches.length > 1 && (ze[1] = Le(t.touches[1], De))) : (Re.x = t.pageX, Re.y = t.pageY, Re.id = "", ze[0] = Re), ze
        }, We = function(t, e) {
            var i, n, a, s, r = 0, c = pt[t] + e[t], u = e[t] > 0, h = ye.x + e.x, f = ye.x - fe.x;
            return i = c > it.min[t] || c < it.max[t] ? l.panEndFriction : 1, c = pt[t] + e[t] * i, !l.allowPanToNext && y !== o.currItem.initialZoomLevel || (nt ? "h" !== ot || "x" !== t || Q || (u ? (c > it.min[t] && (i = l.panEndFriction, r = it.min[t] - c, n = it.min[t] - dt[t]), (0 >= n || 0 > f) && Je() > 1 ? (s = h, 0 > f && h > fe.x && (s = fe.x)) : it.min.x !== it.max.x && (a = c)) : (c < it.max[t] && (i = l.panEndFriction, r = c - it.max[t], n = dt[t] - it.max[t]), (0 >= n || f > 0) && Je() > 1 ? (s = h, f > 0 && h < fe.x && (s = fe.x)) : it.min.x !== it.max.x && (a = c))) : s = h, "x" !== t) ? void(at || U || y > o.currItem.fitRatio && (pt[t] += e[t] * i)) : (void 0 !== s && (Dt(s, !0), U = s === fe.x?!1 : !0), it.min.x !== it.max.x && (void 0 !== a ? pt.x = a : U || (pt.x += e.x * i)), void 0 !== s)
        }, _e = function(t) {
            if (!("mousedown" === t.type && t.button > 0)) {
                if (Ue)
                    return void t.preventDefault();
                if (!q || "mousedown" !== t.type) {
                    if (Me(t, !0) && t.preventDefault(), Et("pointerDown"), F) {
                        var e = a.arraySearch(he, t.pointerId, "id");
                        0 > e && (e = he.length), he[e] = {
                            x: t.pageX,
                            y: t.pageY,
                            id: t.pointerId
                        }
                    }
                    var i = Ve(t), n = i.length;
                    K = null, ee(), X && 1 !== n || (X = st=!0, a.bind(window, m, o), j = ct = rt = $ = U = Z = Y = Q=!1, ot = null, Et("firstTouchStart", i), Vt(dt, pt), ft.x = ft.y = 0, Vt(ce, i[0]), Vt(ue, ce), fe.x = yt.x * vt, de = [{
                        x: ce.x,
                        y: ce.y
                    }
                    ], B = H = Mt(), jt(y, !0), ke(), Pe()), !J && n > 1&&!at&&!U && (b = y, Q=!1, J = Y=!0, ft.y = ft.x = 0, Vt(dt, pt), Vt(se, i[0]), Vt(re, i[1]), Fe(se, re, we), be.x = Math.abs(we.x) - pt.x, be.y = Math.abs(we.y) - pt.y, tt = et = Se(se, re))
                }
            }
        }, He = function(t) {
            if (t.preventDefault(), F) {
                var e = a.arraySearch(he, t.pointerId, "id");
                if (e>-1) {
                    var i = he[e];
                    i.x = t.pageX, i.y = t.pageY
                }
            }
            if (X) {
                var n = Ve(t);
                if (ot || Z || J)
                    K = n;
                else if (ye.x !== yt.x * vt)
                    ot = "h";
                else {
                    var o = Math.abs(n[0].x - ce.x) - Math.abs(n[0].y - ce.y);
                    Math.abs(o) >= oe && (ot = o > 0 ? "h" : "v", K = n)
                }
            }
        }, Be = function() {
            if (K) {
                var t = K.length;
                if (0 !== t)
                    if (Vt(se, K[0]), le.x = se.x - ce.x, le.y = se.y - ce.y, J && t > 1) {
                        if (ce.x = se.x, ce.y = se.y, !le.x&&!le.y && xe(K[1], re))
                            return;
                            Vt(re, K[1]), Q || (Q=!0, Et("zoomGestureStarted"));
                            var e = Se(se, re), i = Xe(e);
                            i > o.currItem.initialZoomLevel + o.currItem.initialZoomLevel / 15 && (ct=!0);
                            var n = 1, a = $t(), s = qt();
                            if (a > i)
                                if (l.pinchToClose&&!ct && b <= o.currItem.initialZoomLevel) {
                                    var r = a - i, c = 1 - r / (a / 1.2);
                                    Lt(c), Et("onPinchClose", c), rt=!0
                                } else
                                    n = (a - i) / a, n > 1 && (n = 1), i = a - n * (a / 3);
                            else
                                i > s && (n = (i - s) / (6 * a), n > 1 && (n = 1), i = s + n * a);
                                0 > n && (n = 0), tt = e, Fe(se, re, ve), ft.x += ve.x - we.x, ft.y += ve.y - we.y, Vt(we, ve), pt.x = zt("x", i), pt.y = zt("y", i), j = i > y, y = i, Ot()
                    } else {
                        if (!ot)
                            return;
                            if (st && (st=!1, Math.abs(le.x) >= oe && (le.x -= K[0].x - ue.x), Math.abs(le.y) >= oe && (le.y -= K[0].y - ue.y)), ce.x = se.x, ce.y = se.y, 0 === le.x && 0 === le.y)
                                return;
                                if ("v" === ot && l.closeOnVerticalDrag&&!Te()) {
                                    ft.y += le.y, pt.y += le.y;
                                    var u = Ie();
                                    return $=!0, Et("onVerticalDrag", u), Lt(u), void Ot()
                                }
                                Oe(Mt(), se.x, se.y), Z=!0, it = o.currItem.bounds;
                                var h = We("x", le);
                                h || (We("y", le), Wt(pt), Ot())
                            }
                        }
            }, Ne = function(t) {
            if (_.isOldAndroid) {
                if (q && "mouseup" === t.type)
                    return;
                t.type.indexOf("touch")>-1 && (clearTimeout(q), q = setTimeout(function() {
                    q = 0
                }, 600))
            }
            Et("pointerUp"), Me(t, !1) && t.preventDefault();
            var e;
            if (F) {
                var i = a.arraySearch(he, t.pointerId, "id");
                if (i>-1)
                    if (e = he.splice(i, 1)[0], navigator.pointerEnabled)
                        e.type = t.pointerType || "mouse";
                    else {
                        var n = {
                            4: "mouse",
                            2: "touch",
                            3: "pen"
                        };
                        e.type = n[t.pointerType], e.type || (e.type = t.pointerType || "mouse")
                    }
                }
            var s, r = Ve(t), c = r.length;
            if ("mouseup" === t.type && (c = 0), 2 === c)
                return K = null, !0;
            1 === c && Vt(ue, r[0]), 0 !== c || ot || at || (e || ("mouseup" === t.type ? e = {
                x: t.pageX,
                y: t.pageY,
                type: "mouse"
            } : t.changedTouches && t.changedTouches[0] && (e = {
                x: t.changedTouches[0].pageX,
                y: t.changedTouches[0].pageY,
                type: "touch"
            })), Et("touchRelease", t, e));
            var u =- 1;
            if (0 === c && (X=!1, a.unbind(window, m, o), ke(), J ? u = 0 : - 1 !== ge && (u = Mt() - ge)), ge = 1 === c ? Mt() : - 1, s =- 1 !== u && 150 > u ? "zoom" : "swipe", J && 2 > c && (J=!1, 1 === c && (s = "zoomPointerUp"), Et("zoomGestureEnded")), K = null, Z || Q || at || $)
                if (ee(), N || (N = je()), N.calculateSwipeSpeed("x"), $) {
                    var h = Ie();
                    if (h < l.verticalDragRange)
                        o.close();
                    else {
                        var f = pt.y, d = lt;
                        ie("verticalDrag", 0, 1, 300, a.easing.cubic.out, function(t) {
                            pt.y = (o.currItem.initialPosition.y - f) * t + f, Lt((1 - d) * t + d), Ot()
                        }), Et("onVerticalDrag", 1)
                    }
                } else {
                    if ((U || at) && 0 === c) {
                        var p = qe(s, N);
                        if (p)
                            return;
                            s = "zoomPointerUp"
                    }
                    if (!at)
                        return "swipe" !== s ? void Ye() : void(!U && y > o.currItem.fitRatio && $e(N))
                }
            }, je = function() {
            var t, e, i = {
                lastFlickOffset: {},
                lastFlickDist: {},
                lastFlickSpeed: {},
                slowDownRatio: {},
                slowDownRatioReverse: {},
                speedDecelerationRatio: {},
                speedDecelerationRatioAbs: {},
                distanceOffset: {},
                backAnimDestination: {},
                backAnimStarted: {},
                calculateSwipeSpeed: function(n) {
                    de.length > 1 ? (t = Mt() - B + 50, e = de[de.length - 2][n]) : (t = Mt() - H, e = ue[n]), i.lastFlickOffset[n] = ce[n] - e, i.lastFlickDist[n] = Math.abs(i.lastFlickOffset[n]), i.lastFlickDist[n] > 20 ? i.lastFlickSpeed[n] = i.lastFlickOffset[n] / t : i.lastFlickSpeed[n] = 0, Math.abs(i.lastFlickSpeed[n]) < .1 && (i.lastFlickSpeed[n] = 0), i.slowDownRatio[n] = .95, i.slowDownRatioReverse[n] = 1 - i.slowDownRatio[n], i.speedDecelerationRatio[n] = 1
                },
                calculateOverBoundsAnimOffset: function(t, e) {
                    i.backAnimStarted[t] || (pt[t] > it.min[t] ? i.backAnimDestination[t] = it.min[t] : pt[t] < it.max[t] && (i.backAnimDestination[t] = it.max[t]), void 0 !== i.backAnimDestination[t] && (i.slowDownRatio[t] = .7, i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t], i.speedDecelerationRatioAbs[t] < .05 && (i.lastFlickSpeed[t] = 0, i.backAnimStarted[t]=!0, ie("bounceZoomPan" + t, pt[t], i.backAnimDestination[t], e || 300, a.easing.sine.out, function(e) {
                        pt[t] = e, Ot()
                    }))))
                },
                calculateAnimOffset: function(t) {
                    i.backAnimStarted[t] || (i.speedDecelerationRatio[t] = i.speedDecelerationRatio[t] * (i.slowDownRatio[t] + i.slowDownRatioReverse[t] - i.slowDownRatioReverse[t] * i.timeDiff / 10), i.speedDecelerationRatioAbs[t] = Math.abs(i.lastFlickSpeed[t] * i.speedDecelerationRatio[t]), i.distanceOffset[t] = i.lastFlickSpeed[t] * i.speedDecelerationRatio[t] * i.timeDiff, pt[t] += i.distanceOffset[t])
                },
                panAnimLoop: function() {
                    return Ut.zoomPan && (Ut.zoomPan.raf = I(i.panAnimLoop), i.now = Mt(), i.timeDiff = i.now - i.lastNow, i.lastNow = i.now, i.calculateAnimOffset("x"), i.calculateAnimOffset("y"), Ot(), i.calculateOverBoundsAnimOffset("x"), i.calculateOverBoundsAnimOffset("y"), i.speedDecelerationRatioAbs.x < .05 && i.speedDecelerationRatioAbs.y < .05) ? (pt.x = Math.round(pt.x), pt.y = Math.round(pt.y), Ot(), void Jt("zoomPan")) : void 0
                }
            };
            return i
        }, $e = function(t) {
            return t.calculateSwipeSpeed("y"), it = o.currItem.bounds, t.backAnimDestination = {}, t.backAnimStarted = {}, Math.abs(t.lastFlickSpeed.x) <= .05 && Math.abs(t.lastFlickSpeed.y) <= .05 ? (t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y = 0, t.calculateOverBoundsAnimOffset("x"), t.calculateOverBoundsAnimOffset("y"), !0) : (te("zoomPan"), t.lastNow = Mt(), void t.panAnimLoop())
        }, qe = function(t, e) {
            var i;
            at || (me = f);
            var n;
            if ("swipe" === t) {
                var s = ce.x - ue.x, r = e.lastFlickDist.x < 10;
                s > ae && (r || e.lastFlickOffset.x > 20) ? n =- 1 : - ae > s && (r || e.lastFlickOffset.x<-20) && (n = 1)
            }
            var c;
            n && (f += n, 0 > f ? (f = l.loop ? Je() - 1 : 0, c=!0) : f >= Je() && (f = l.loop ? 0 : Je() - 1, c=!0), (!c || l.loop) && (bt += n, vt -= n, i=!0));
            var u, h = yt.x * vt, d = Math.abs(h - ye.x);
            return i || h > ye.x == e.lastFlickSpeed.x > 0 ? (u = Math.abs(e.lastFlickSpeed.x) > 0 ? d / Math.abs(e.lastFlickSpeed.x) : 333, u = Math.min(u, 400), u = Math.max(u, 250)) : u = 333, me === f && (i=!1), at=!0, Et("mainScrollAnimStart"), ie("mainScroll", ye.x, h, u, a.easing.cubic.out, Dt, function() {
                ee(), at=!1, me =- 1, (i || me !== f) && o.updateCurrItem(), Et("mainScrollAnimComplete")
            }), i && o.updateCurrItem(!0), i
        }, Xe = function(t) {
            return 1 / et * t * b
        }, Ye = function() {
            var t = y, e = $t(), i = qt();
            e > y ? t = e : y > i && (t = i);
            var n, s = 1, r = lt;
            return rt&&!j&&!ct && e > y ? (o.close(), !0) : (rt && (n = function(t) {
                Lt((s - r) * t + r)
            }), o.zoomTo(t, 0, 200, a.easing.cubic.out, n), !0)
        };
        kt("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var t = function(t, e, i, n, a) {
                        T = t + e, A = t + i, E = t + n, M = a ? t + a : ""
                    };
                    F = _.pointerEvent, F && _.touch && (_.touch=!1), F ? navigator.pointerEnabled ? t("pointer", "down", "move", "up", "cancel") : t("MSPointer", "Down", "Move", "Up", "Cancel") : _.touch ? (t("touch", "start", "move", "end", "cancel"), O=!0) : t("mouse", "down", "move", "up"), m = A + " " + E + " " + M, v = T, F&&!O && (O = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), o.likelyTouchDevice = O, g[T] = _e, g[A] = He, g[E] = Ne, M && (g[M] = g[E]), _.touch && (v += " mousedown", m += " mousemove mouseup", g.mousedown = g[T], g.mousemove = g[A], g.mouseup = g[E]), O || (l.allowPanToNext=!1)
                }
            }
        });
        var Qe, Ze, Ge, Ue, Ke, Je, ti, ei = function(e, i, n, s) {
            Qe && clearTimeout(Qe), Ue=!0, Ge=!0;
            var r;
            e.initialLayout ? (r = e.initialLayout, e.initialLayout = null) : r = l.getThumbBoundsFn && l.getThumbBoundsFn(f);
            var c = n ? l.hideAnimationDuration: l.showAnimationDuration, u = function() {
                Jt("initialZoom"), n ? (o.template.removeAttribute("style"), o.bg.removeAttribute("style")) : (Lt(1), i && (i.style.display = "block"), a.addClass(t, "pswp--animated-in"), Et("initialZoom" + (n ? "OutEnd" : "InEnd"))), s && s(), Ue=!1
            };
            if (!c ||!r || void 0 === r.x)
                return Et("initialZoom" + (n ? "Out" : "In")), y = e.initialZoomLevel, Vt(pt, e.initialPosition), Ot(), t.style.opacity = n ? 0 : 1, Lt(1), void(c ? setTimeout(function() {
                    u()
                }, c) : u());
            var d = function() {
                var i = h, s=!o.currItem.src || o.currItem.loadError || l.showHideOpacity;
                e.miniImg && (e.miniImg.style.webkitBackfaceVisibility = "hidden"), n || (y = r.w / e.w, pt.x = r.x, pt.y = r.y - z, o[s ? "template": "bg"].style.opacity = .001, Ot()), te("initialZoom"), n&&!i && a.removeClass(t, "pswp--animated-in"), s && (n ? a[(i ? "remove" : "add") + "Class"](t, "pswp--animate_opacity") : setTimeout(function() {
                    a.addClass(t, "pswp--animate_opacity")
                }, 30)), Qe = setTimeout(function() {
                    if (Et("initialZoom" + (n ? "Out" : "In")), n) {
                        var o = r.w / e.w, l = {
                            x: pt.x,
                            y: pt.y
                        }, h = y, f = lt, d = function(e) {
                            1 === e ? (y = o, pt.x = r.x, pt.y = r.y - W) : (y = (o - h) * e + h, pt.x = (r.x - l.x) * e + l.x, pt.y = (r.y - W - l.y) * e + l.y), Ot(), s ? t.style.opacity = 1 - e : Lt(f - e * f)
                        };
                        i ? ie("initialZoom", 0, 1, c, a.easing.cubic.out, d, u) : (d(1), Qe = setTimeout(u, c + 20))
                    } else
                        y = e.initialZoomLevel, Vt(pt, e.initialPosition), Ot(), Lt(1), s ? t.style.opacity = 1 : Lt(1), Qe = setTimeout(u, c + 20)
                }, n ? 25 : 90)
            };
            d()
        }, ii = {}, ni = [], ai = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: !1,
            preload: [1, 1],
            getNumItemsFn: function() {
                return Ze.length
            }
        }, oi = function() {
            return {
                center: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: 0,
                    y: 0
                },
                min: {
                    x: 0,
                    y: 0
                }
            }
        }, si = function(t, e, i) {
            var n = t.bounds;
            n.center.x = Math.round((ii.x - e) / 2), n.center.y = Math.round((ii.y - i) / 2) + t.vGap.top, n.max.x = e > ii.x ? Math.round(ii.x - e) : n.center.x, n.max.y = i > ii.y ? Math.round(ii.y - i) + t.vGap.top : n.center.y, n.min.x = e > ii.x ? 0 : n.center.x, n.min.y = i > ii.y ? t.vGap.top : n.center.y
        }, ri = function(t, e, i) {
            if (t.src&&!t.loadError) {
                var n=!i;
                if (n && (t.vGap || (t.vGap = {
                    top: 0,
                    bottom: 0
                }), Et("parseVerticalMargin", t)), ii.x = e.x, ii.y = e.y - t.vGap.top - t.vGap.bottom, n) {
                    var a = ii.x / t.w, o = ii.y / t.h;
                    t.fitRatio = o > a ? a : o;
                    var s = l.scaleMode;
                    "orig" === s ? i = 1 : "fit" === s && (i = t.fitRatio), i > 1 && (i = 1), t.initialZoomLevel = i, t.bounds || (t.bounds = oi())
                }
                if (!i)
                    return;
                return si(t, t.w * i, t.h * i), n && i === t.initialZoomLevel && (t.initialPosition = t.bounds.center), t.bounds
            }
            return t.w = t.h = 0, t.initialZoomLevel = t.fitRatio = 1, t.bounds = oi(), t.initialPosition = t.bounds.center, t.bounds
        }, li = function(t, e, i, n, a, s) {
            e.loadError || n && (e.imageAppended=!0, hi(e, n, e === o.currItem && St), i.appendChild(n), s && setTimeout(function() {
                e && e.loaded && e.placeholder && (e.placeholder.style.display = "none", e.placeholder = null)
            }, 500))
        }, ci = function(t) {
            t.loading=!0, t.loaded=!1;
            var e = t.img = a.createEl("pswp__img", "img"), i = function() {
                t.loading=!1, t.loaded=!0, t.loadComplete ? t.loadComplete(t) : t.img = null, e.onload = e.onerror = null, e = null
            };
            return e.onload = i, e.onerror = function() {
                t.loadError=!0, i()
            }, e.src = t.src, e
        }, ui = function(t, e) {
            return t.src && t.loadError && t.container ? (e && (t.container.innerHTML = ""), t.container.innerHTML = l.errorMsg.replace("%url%", t.src), !0) : void 0
        }, hi = function(t, e, i) {
            if (t.src) {
                e || (e = t.container.lastChild);
                var n = i ? t.w: Math.round(t.w * t.fitRatio), a = i ? t.h: Math.round(t.h * t.fitRatio);
                t.placeholder&&!t.loaded && (t.placeholder.style.width = n + "px", t.placeholder.style.height = a + "px"), e.style.width = n + "px", e.style.height = a + "px"
            }
        }, fi = function() {
            if (ni.length) {
                for (var t, e = 0; e < ni.length; e++)
                    t = ni[e], t.holder.index === t.index && li(t.index, t.item, t.baseDiv, t.img, !1, t.clearPlaceholder);
                ni = []
            }
        };
        kt("Controller", {
            publicMethods: {
                lazyLoadItem: function(t) {
                    t = Pt(t);
                    var e = Ke(t);
                    e && (!e.loaded&&!e.loading || S) && (Et("gettingData", t, e), e.src && ci(e))
                },
                initController: function() {
                    a.extend(l, ai, !0), o.items = Ze = i, Ke = o.getItemAt, Je = l.getNumItemsFn, ti = l.loop, Je() < 3 && (l.loop=!1), At("beforeChange", function(t) {
                        var e, i = l.preload, n = null === t?!0 : t >= 0, a = Math.min(i[0], Je()), s = Math.min(i[1], Je());
                        for (e = 1; (n ? s : a) >= e; e++)
                            o.lazyLoadItem(f + e);
                        for (e = 1; (n ? a : s) >= e; e++)
                            o.lazyLoadItem(f - e)
                    }), At("initialLayout", function() {
                        o.currItem.initialLayout = l.getThumbBoundsFn && l.getThumbBoundsFn(f)
                    }), At("mainScrollAnimComplete", fi), At("initialZoomInEnd", fi), At("destroy", function() {
                        for (var t, e = 0; e < Ze.length; e++)
                            t = Ze[e], t.container && (t.container = null), t.placeholder && (t.placeholder = null), t.img && (t.img = null), t.preloader && (t.preloader = null), t.loadError && (t.loaded = t.loadError=!1);
                        ni = null
                    })
                },
                getItemAt: function(t) {
                    return t >= 0 && void 0 !== Ze[t] ? Ze[t] : !1
                },
                allowProgressiveImg: function() {
                    return l.forceProgressiveLoading ||!O || l.mouseUsed || screen.width > 1200
                },
                setContent: function(t, e) {
                    l.loop && (e = Pt(e));
                    var i = o.getItemAt(t.index);
                    i && (i.container = null);
                    var n, s = o.getItemAt(e);
                    if (!s)
                        return void(t.el.innerHTML = "");
                    Et("gettingData", e, s), t.index = e, t.item = s;
                    var r = s.container = a.createEl("pswp__zoom-wrap");
                    if (!s.src && s.html && (s.html.tagName ? r.appendChild(s.html) : r.innerHTML = s.html), ui(s), ri(s, mt), !s.src || s.loadError || s.loaded)
                        s.src&&!s.loadError && (n = a.createEl("pswp__img", "img"), n.style.opacity = 1, n.src = s.src, hi(s, n), li(e, s, r, n, !0));
                    else {
                        if (s.loadComplete = function(i) {
                            if (c) {
                                if (t && t.index === e) {
                                    if (ui(i, !0))
                                        return i.loadComplete = i.img = null, ri(i, mt), It(i), void(t.index === f && o.updateCurrZoomItem());
                                    i.imageAppended?!Ue && i.placeholder && (i.placeholder.style.display = "none", i.placeholder = null) : _.transform && (at || Ue) ? ni.push({
                                        item: i,
                                        baseDiv: r,
                                        img: i.img,
                                        index: e,
                                        holder: t,
                                        clearPlaceholder: !0
                                    }) : li(e, i, r, i.img, at || Ue, !0)
                                }
                                i.loadComplete = null, i.img = null, Et("imageLoadComplete", e, i)
                            }
                        }, a.features.transform) {
                            var u = "pswp__img pswp__img--placeholder";
                            u += s.msrc ? "" : " pswp__img--placeholder--blank";
                            var h = a.createEl(u, s.msrc ? "img" : "");
                            s.msrc && (h.src = s.msrc), hi(s, h), r.appendChild(h), s.placeholder = h
                        }
                        s.loading || ci(s), o.allowProgressiveImg() && (!Ge && _.transform ? ni.push({
                            item: s,
                            baseDiv: r,
                            img: s.img,
                            index: e,
                            holder: t
                        }) : li(e, s, r, s.img, !0, !0))
                    }
                    Ge || e !== f ? It(s) : (nt = r.style, ei(s, n || s.img)), t.el.innerHTML = "", t.el.appendChild(r)
                },
                cleanSlide: function(t) {
                    t.img && (t.img.onload = t.img.onerror = null), t.loaded = t.loading = t.img = t.imageAppended=!1
                }
            }
        });
        var di, pi = {}, mi = function(t, e, i) {
            var n = document.createEvent("CustomEvent"), a = {
                origEvent: t,
                target: t.target,
                releasePoint: e,
                pointerType: i || "touch"
            };
            n.initCustomEvent("pswpTap", !0, !0, a), t.target.dispatchEvent(n)
        };
        kt("Tap", {
            publicMethods: {
                initTap: function() {
                    At("firstTouchStart", o.onTapStart), At("touchRelease", o.onTapRelease), At("destroy", function() {
                        pi = {}, di = null
                    })
                },
                onTapStart: function(t) {
                    t.length > 1 && (clearTimeout(di), di = null)
                },
                onTapRelease: function(t, e) {
                    if (e&&!Z&&!Y&&!Kt) {
                        var i = e;
                        if (di && (clearTimeout(di), di = null, Ce(i, pi)))
                            return void Et("doubleTap", i);
                        if ("mouse" === e.type)
                            return void mi(t, e, "mouse");
                        var n = t.target.tagName.toUpperCase();
                        if ("BUTTON" === n || a.hasClass(t.target, "pswp__single-tap"))
                            return void mi(t, e);
                        Vt(pi, i), di = setTimeout(function() {
                            mi(t, e), di = null
                        }, 300)
                    }
                }
            }
        });
        var vi;
        kt("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    V || (O ? At("mouseUsed", function() {
                        o.setupDesktopZoom()
                    }) : o.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(e) {
                    vi = {};
                    var i = "wheel mousewheel DOMMouseScroll";
                    At("bindEvents", function() {
                        a.bind(t, i, o.handleMouseWheel)
                    }), At("unbindEvents", function() {
                        vi && a.unbind(t, i, o.handleMouseWheel)
                    }), o.mouseZoomedIn=!1;
                    var n, s = function() {
                        o.mouseZoomedIn && (a.removeClass(t, "pswp--zoomed-in"), o.mouseZoomedIn=!1), 1 > y ? a.addClass(t, "pswp--zoom-allowed") : a.removeClass(t, "pswp--zoom-allowed"), r()
                    }, r = function() {
                        n && (a.removeClass(t, "pswp--dragging"), n=!1)
                    };
                    At("resize", s), At("afterChange", s), At("pointerDown", function() {
                        o.mouseZoomedIn && (n=!0, a.addClass(t, "pswp--dragging"))
                    }), At("pointerUp", r), e || s()
                },
                handleMouseWheel: function(t) {
                    if (y <= o.currItem.fitRatio)
                        return l.modal && (!l.closeOnScroll || Kt || X ? t.preventDefault() : L && Math.abs(t.deltaY) > 2 && (h=!0, o.close())), !0;
                    if (t.stopPropagation(), vi.x = 0, "deltaX"in t)
                        1 === t.deltaMode ? (vi.x = 18 * t.deltaX, vi.y = 18 * t.deltaY) : (vi.x = t.deltaX, vi.y = t.deltaY);
                    else if ("wheelDelta"in t)
                        t.wheelDeltaX && (vi.x =- .16 * t.wheelDeltaX), t.wheelDeltaY ? vi.y =- .16 * t.wheelDeltaY : vi.y =- .16 * t.wheelDelta;
                    else {
                        if (!("detail"in t))
                            return;
                        vi.y = t.detail
                    }
                    jt(y, !0);
                    var e = pt.x - vi.x, i = pt.y - vi.y;
                    (l.modal || e <= it.min.x && e >= it.max.x && i <= it.min.y && i >= it.max.y) && t.preventDefault(), o.panTo(e, i)
                },
                toggleDesktopZoom: function(e) {
                    e = e || {
                        x: mt.x / 2 + gt.x,
                        y: mt.y / 2 + gt.y
                    };
                    var i = l.getDoubleTapZoom(!0, o.currItem), n = y === i;
                    o.mouseZoomedIn=!n, o.zoomTo(n ? o.currItem.initialZoomLevel : i, e, 333), a[(n ? "remove" : "add") + "Class"](t, "pswp--zoomed-in")
                }
            }
        });
        var gi, yi, bi, wi, xi, Ci, Si, ki, Pi, Ti, Ai, Ei, Mi = {
            history: !0,
            galleryUID: 1
        }, Li = function() {
            return Ai.hash.substring(1)
        }, Fi = function() {
            gi && clearTimeout(gi), bi && clearTimeout(bi)
        }, Oi = function() {
            var t = Li(), e = {};
            if (t.length < 5)
                return e;
            var i, n = t.split("&");
            for (i = 0; i < n.length; i++)
                if (n[i]) {
                    var a = n[i].split("=");
                    a.length < 2 || (e[a[0]] = a[1])
                }
            if (l.galleryPIDs) {
                var o = e.pid;
                for (e.pid = 0, i = 0; i < Ze.length; i++)
                    if (Ze[i].pid === o) {
                        e.pid = i;
                        break
                    }
            } else
                e.pid = parseInt(e.pid, 10) - 1;
            return e.pid < 0 && (e.pid = 0), e
        }, Ii = function() {
            if (bi && clearTimeout(bi), Kt || X)
                return void(bi = setTimeout(Ii, 500));
            wi ? clearTimeout(yi) : wi=!0;
            var t = f + 1, e = Ke(f);
            e.hasOwnProperty("pid") && (t = e.pid);
            var i = Si + "&gid=" + l.galleryUID + "&pid=" + t;
            ki||-1 === Ai.hash.indexOf(i) && (Ti=!0);
            var n = Ai.href.split("#")[0] + "#" + i;
            Ei ? "#" + i !== window.location.hash && history[ki ? "replaceState": "pushState"]("", document.title, n) : ki ? Ai.replace(n) : Ai.hash = i, ki=!0, yi = setTimeout(function() {
                wi=!1
            }, 60)
        };
        kt("History", {
            publicMethods: {
                initHistory: function() {
                    if (a.extend(l, Mi, !0), l.history) {
                        Ai = window.location, Ti=!1, Pi=!1, ki=!1, Si = Li(), Ei = "pushState"in history, Si.indexOf("gid=")>-1 && (Si = Si.split("&gid=")[0], Si = Si.split("?gid=")[0]), At("afterChange", o.updateURL), At("unbindEvents", function() {
                            a.unbind(window, "hashchange", o.onHashChange)
                        });
                        var t = function() {
                            Ci=!0, Pi || (Ti ? history.back() : Si ? Ai.hash = Si : Ei ? history.pushState("", document.title, Ai.pathname + Ai.search) : Ai.hash = ""), Fi()
                        };
                        At("unbindEvents", function() {
                            h && t()
                        }), At("destroy", function() {
                            Ci || t()
                        }), At("firstUpdate", function() {
                            f = Oi().pid
                        });
                        var e = Si.indexOf("pid=");
                        e>-1 && (Si = Si.substring(0, e), "&" === Si.slice( - 1) && (Si = Si.slice(0, - 1))), setTimeout(function() {
                            c && a.bind(window, "hashchange", o.onHashChange)
                        }, 40)
                    }
                },
                onHashChange: function() {
                    return Li() === Si ? (Pi=!0, void o.close()) : void(wi || (xi=!0, o.goTo(Oi().pid), xi=!1))
                },
                updateURL: function() {
                    Fi(), xi || (ki ? gi = setTimeout(Ii, 800) : Ii())
                }
            }
        }), a.extend(o, ne)
    };
    return t
}), !function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipeUI_Default = e()
}(this, function() {
    "use strict";
    var t = function(t, e) {
        var i, n, a, o, s, r, l, c, u, h, f, d, p, m, v, g, y, b, w, x = this, C=!1, S=!0, k=!0, P = {
            barsSize: {
                top: 44,
                bottom: "auto"
            },
            closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
            timeToIdle: 4e3,
            timeToIdleOutside: 1e3,
            loadingIndicatorDelay: 1e3,
            addCaptionHTMLFn: function(t, e) {
                return t.title ? (e.children[0].innerHTML = t.title, !0) : (e.children[0].innerHTML = "", !1)
            },
            closeEl: !0,
            captionEl: !0,
            fullscreenEl: !0,
            zoomEl: !0,
            shareEl: !0,
            counterEl: !0,
            arrowEl: !0,
            preloaderEl: !0,
            tapToClose: !1,
            tapToToggleControls: !0,
            clickToCloseNonZoomable: !0,
            shareButtons: [{
                id: "facebook",
                label: "Share on Facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
            }, {
                id: "twitter",
                label: "Tweet",
                url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
            }, {
                id: "pinterest",
                label: "Pin it",
                url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
            }, {
                id: "download",
                label: "Download image",
                url: "{{raw_image_url}}",
                download: !0
            }
            ],
            getImageURLForShare: function() {
                return t.currItem.src || ""
            },
            getPageURLForShare: function() {
                return window.location.href
            },
            getTextForShare: function() {
                return t.currItem.title || ""
            },
            indexIndicatorSep: " / ",
            fitControlsWidth: 1200
        }, T = function(t) {
            if (g)
                return !0;
            t = t || window.event, v.timeToIdle && v.mouseUsed&&!u && z();
            for (var i, n, a = t.target || t.srcElement, o = a.getAttribute("class") || "", s = 0; s < $.length; s++)
                i = $[s], i.onTap && o.indexOf("pswp__" + i.name)>-1 && (i.onTap(), n=!0);
            if (n) {
                t.stopPropagation && t.stopPropagation(), g=!0;
                var r = e.features.isOldAndroid ? 600: 30;
                y = setTimeout(function() {
                    g=!1
                }, r)
            }
        }, A = function() {
            return !t.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
        }, E = function(t, i, n) {
            e[(n ? "add" : "remove") + "Class"](t, "pswp__" + i)
        }, M = function() {
            var t = 1 === v.getNumItemsFn();
            t !== m && (E(n, "ui--one-slide", t), m = t)
        }, L = function() {
            E(l, "share-modal--hidden", k)
        }, F = function() {
            return k=!k, k ? (e.removeClass(l, "pswp__share-modal--fade-in"), setTimeout(function() {
                k && L()
            }, 300)) : (L(), setTimeout(function() {
                k || e.addClass(l, "pswp__share-modal--fade-in")
            }, 30)), k || I(), !1
        }, O = function(e) {
            e = e || window.event;
            var i = e.target || e.srcElement;
            return t.shout("shareLinkClick", e, i), i.href ? i.hasAttribute("download")?!0 : (window.open(i.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), k || F(), !1) : !1
        }, I = function() {
            for (var t, e, i, n, a, o = "", s = 0; s < v.shareButtons.length; s++)
                t = v.shareButtons[s], i = v.getImageURLForShare(t), n = v.getPageURLForShare(t), a = v.getTextForShare(t), e = t.url.replace("{{url}}", encodeURIComponent(n)).replace("{{image_url}}", encodeURIComponent(i)).replace("{{raw_image_url}}", i).replace("{{text}}", encodeURIComponent(a)), o += '<a href="' + e + '" target="_blank" class="pswp__share--' + t.id + '"' + (t.download ? "download" : "") + ">" + t.label + "</a>", v.parseShareButtonOut && (o = v.parseShareButtonOut(t, o));
            l.children[0].innerHTML = o, l.children[0].onclick = O
        }, R = function(t) {
            for (var i = 0; i < v.closeElClasses.length; i++)
                if (e.hasClass(t, "pswp__" + v.closeElClasses[i]))
                    return !0
        }, D = 0, z = function() {
            clearTimeout(w), D = 0, u && x.setIdle(!1)
        }, V = function(t) {
            t = t ? t : window.event;
            var e = t.relatedTarget || t.toElement;
            e && "HTML" !== e.nodeName || (clearTimeout(w), w = setTimeout(function() {
                x.setIdle(!0)
            }, v.timeToIdleOutside))
        }, W = function() {
            v.fullscreenEl&&!e.features.isOldAndroid && (i || (i = x.getFullscreenAPI()), i ? (e.bind(document, i.eventK, x.updateFullscreen), x.updateFullscreen(), e.addClass(t.template, "pswp--supports-fs")) : e.removeClass(t.template, "pswp--supports-fs"))
        }, _ = function() {
            v.preloaderEl && (H(!0), h("beforeChange", function() {
                clearTimeout(p), p = setTimeout(function() {
                    t.currItem && t.currItem.loading ? (!t.allowProgressiveImg() || t.currItem.img&&!t.currItem.img.naturalWidth) && H(!1) : H(!0)
                }, v.loadingIndicatorDelay)
            }), h("imageLoadComplete", function(e, i) {
                t.currItem === i && H(!0)
            }))
        }, H = function(t) {
            d !== t && (E(f, "preloader--active", !t), d = t)
        }, B = function(t) {
            var i = t.vGap;
            if (A()) {
                var s = v.barsSize;
                if (v.captionEl && "auto" === s.bottom)
                    if (o || (o = e.createEl("pswp__caption pswp__caption--fake"), o.appendChild(e.createEl("pswp__caption__center")), n.insertBefore(o, a), e.addClass(n, "pswp__ui--fit")), v.addCaptionHTMLFn(t, o, !0)) {
                        var r = o.clientHeight;
                        i.bottom = parseInt(r, 10) || 44
                    } else
                        i.bottom = s.top;
                else
                    i.bottom = "auto" === s.bottom ? 0 : s.bottom;
                i.top = s.top
            } else
                i.top = i.bottom = 0
        }, N = function() {
            v.timeToIdle && h("mouseUsed", function() {
                e.bind(document, "mousemove", z), e.bind(document, "mouseout", V), b = setInterval(function() {
                    D++, 2 === D && x.setIdle(!0)
                }, v.timeToIdle / 2)
            })
        }, j = function() {
            h("onVerticalDrag", function(t) {
                S && .95 > t ? x.hideControls() : !S && t >= .95 && x.showControls()
            });
            var t;
            h("onPinchClose", function(e) {
                S && .9 > e ? (x.hideControls(), t=!0) : t&&!S && e > .9 && x.showControls()
            }), h("zoomGestureEnded", function() {
                t=!1, t&&!S && x.showControls()
            })
        }, $ = [{
            name: "caption",
            option: "captionEl",
            onInit: function(t) {
                a = t
            }
        }, {
            name: "share-modal",
            option: "shareEl",
            onInit: function(t) {
                l = t
            },
            onTap: function() {
                F()
            }
        }, {
            name: "button--share",
            option: "shareEl",
            onInit: function(t) {
                r = t
            },
            onTap: function() {
                F()
            }
        }, {
            name: "button--zoom",
            option: "zoomEl",
            onTap: t.toggleDesktopZoom
        }, {
            name: "counter",
            option: "counterEl",
            onInit: function(t) {
                s = t
            }
        }, {
            name: "button--close",
            option: "closeEl",
            onTap: t.close
        }, {
            name: "button--arrow--left",
            option: "arrowEl",
            onTap: t.prev
        }, {
            name: "button--arrow--right",
            option: "arrowEl",
            onTap: t.next
        }, {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function() {
                i.isFullscreen() ? i.exit() : i.enter()
            }
        }, {
            name: "preloader",
            option: "preloaderEl",
            onInit: function(t) {
                f = t
            }
        }
        ], q = function() {
            var t, i, a, o = function(n) {
                if (n)
                    for (var o = n.length, s = 0; o > s; s++) {
                        t = n[s], i = t.className;
                        for (var r = 0; r < $.length; r++)
                            a = $[r], i.indexOf("pswp__" + a.name)>-1 && (v[a.option] ? (e.removeClass(t, "pswp__element--disabled"), a.onInit && a.onInit(t)) : e.addClass(t, "pswp__element--disabled"))
                    }
            };
            o(n.children);
            var s = e.getChildByClass(n, "pswp__top-bar");
            s && o(s.children)
        };
        x.init = function() {
            e.extend(t.options, P, !0), v = t.options, n = e.getChildByClass(t.scrollWrap, "pswp__ui"), h = t.listen, j(), h("beforeChange", x.update), h("doubleTap", function(e) {
                var i = t.currItem.initialZoomLevel;
                t.getZoomLevel() !== i ? t.zoomTo(i, e, 333) : t.zoomTo(v.getDoubleTapZoom(!1, t.currItem), e, 333)
            }), h("preventDragEvent", function(t, e, i) {
                var n = t.target || t.srcElement;
                n && n.getAttribute("class") && t.type.indexOf("mouse")>-1 && (n.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent=!1)
            }), h("bindEvents", function() {
                e.bind(n, "pswpTap click", T), e.bind(t.scrollWrap, "pswpTap", x.onGlobalTap), t.likelyTouchDevice || e.bind(t.scrollWrap, "mouseover", x.onMouseOver)
            }), h("unbindEvents", function() {
                k || F(), b && clearInterval(b), e.unbind(document, "mouseout", V), e.unbind(document, "mousemove", z), e.unbind(n, "pswpTap click", T), e.unbind(t.scrollWrap, "pswpTap", x.onGlobalTap), e.unbind(t.scrollWrap, "mouseover", x.onMouseOver), i && (e.unbind(document, i.eventK, x.updateFullscreen), i.isFullscreen() && (v.hideAnimationDuration = 0, i.exit()), i = null)
            }), h("destroy", function() {
                v.captionEl && (o && n.removeChild(o), e.removeClass(a, "pswp__caption--empty")), l && (l.children[0].onclick = null), e.removeClass(n, "pswp__ui--over-close"), e.addClass(n, "pswp__ui--hidden"), x.setIdle(!1)
            }), v.showAnimationDuration || e.removeClass(n, "pswp__ui--hidden"), h("initialZoomIn", function() {
                v.showAnimationDuration && e.removeClass(n, "pswp__ui--hidden")
            }), h("initialZoomOut", function() {
                e.addClass(n, "pswp__ui--hidden")
            }), h("parseVerticalMargin", B), q(), v.shareEl && r && l && (k=!0), M(), N(), W(), _()
        }, x.setIdle = function(t) {
            u = t, E(n, "ui--idle", t)
        }, x.update = function() {
            S && t.currItem ? (x.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(t.currItem, a), E(a, "caption--empty", !t.currItem.title)), C=!0) : C=!1, k || F(), M()
        }, x.updateFullscreen = function(n) {
            n && setTimeout(function() {
                t.setScrollOffset(0, e.getScrollY())
            }, 50), e[(i.isFullscreen() ? "add" : "remove") + "Class"](t.template, "pswp--fs")
        }, x.updateIndexIndicator = function() {
            v.counterEl && (s.innerHTML = t.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
        }, x.onGlobalTap = function(i) {
            i = i || window.event;
            var n = i.target || i.srcElement;
            if (!g)
                if (i.detail && "mouse" === i.detail.pointerType) {
                    if (R(n))
                        return void t.close();
                        e.hasClass(n, "pswp__img") && (1 === t.getZoomLevel() && t.getZoomLevel() <= t.currItem.fitRatio ? v.clickToCloseNonZoomable && t.close() : t.toggleDesktopZoom(i.detail.releasePoint))
                } else if (v.tapToToggleControls && (S ? x.hideControls() : x.showControls()), v.tapToClose && (e.hasClass(n, "pswp__img") || R(n)))
                    return void t.close()
        }, x.onMouseOver = function(t) {
            t = t || window.event;
            var e = t.target || t.srcElement;
            E(n, "ui--over-close", R(e))
        }, x.hideControls = function() {
            e.addClass(n, "pswp__ui--hidden"), S=!1
        }, x.showControls = function() {
            S=!0, C || x.update(), e.removeClass(n, "pswp__ui--hidden")
        }, x.supportsFullscreen = function() {
            var t = document;
            return !!(t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen)
        }, x.getFullscreenAPI = function() {
            var e, i = document.documentElement, n = "fullscreenchange";
            return i.requestFullscreen ? e = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: n
            } : i.mozRequestFullScreen ? e = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + n
            } : i.webkitRequestFullscreen ? e = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + n
            } : i.msRequestFullscreen && (e = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), e && (e.enter = function() {
                return c = v.closeOnScroll, v.closeOnScroll=!1, "webkitRequestFullscreen" !== this.enterK ? t.template[this.enterK]() : void t.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, e.exit = function() {
                return v.closeOnScroll = c, document[this.exitK]()
            }, e.isFullscreen = function() {
                return document[this.elementK]
            }), e
        }
    };
    return t
});
var initPhotoSwipeFromDOM = function(t) {
    for (var e = function(t) {
        for (var a, o, s, r, e = t.childNodes, i = e.length, n = [], l = 0; i > l; l++)
            a = e[l], 1 === a.nodeType && (o = a.children[0], s = o.getAttribute("data-size").split("x"), r = {
                src: o.getAttribute("href"),
                w: parseInt(s[0], 10),
                h: parseInt(s[1], 10)
            }, a.children.length > 1 && (r.title = a.children[1].innerHTML), o.children.length > 0 && (r.msrc = o.children[0].getAttribute("src")), r.el = a, n.push(r));
        return n
    }, i = function u(t, e) {
        return t && (e(t) ? t : u(t.parentNode, e))
    }, n = function(t) {
        t = t || window.event, t.preventDefault ? t.preventDefault() : t.returnValue=!1;
        var e = t.target || t.srcElement, n = i(e, function(t) {
            return t.tagName && "FIGURE" === t.tagName.toUpperCase()
        });
        if (n) {
            for (var c, a = n.parentNode, s = n.parentNode.childNodes, r = s.length, l = 0, u = 0; r > u; u++)
                if (1 === s[u].nodeType) {
                    if (s[u] === n) {
                        c = l;
                        break
                    }
                    l++
                }
            return c >= 0 && o(c, a), !1
        }
    }, a = function() {
        var t = window.location.hash.substring(1), e = {};
        if (t.length < 5)
            return e;
        for (var i = t.split("&"), n = 0; n < i.length; n++)
            if (i[n]) {
                var a = i[n].split("=");
                a.length < 2 || (e[a[0]] = a[1])
            }
        return e.gid && (e.gid = parseInt(e.gid, 10)), e
    }, o = function(t, i, n, a) {
        var s, r, l, o = document.querySelectorAll(".pswp")[0];
        if (l = e(i), r = {
            galleryUID: i.getAttribute("data-pswp-uid"),
            getThumbBoundsFn: function(t) {
                var e = l[t].el.getElementsByTagName("img")[0], i = window.pageYOffset || document.documentElement.scrollTop, n = e.getBoundingClientRect();
                return {
                    x: n.left,
                    y: n.top + i,
                    w: n.width
                }
            }
        }, a)
            if (r.galleryPIDs) {
                for (var c = 0; c < l.length; c++)
                    if (l[c].pid == t) {
                        r.index = c;
                        break
                    }
            } else
                r.index = parseInt(t, 10) - 1;
        else
            r.index = parseInt(t, 10);
        isNaN(r.index) || (n && (r.showAnimationDuration = 0), s = new PhotoSwipe(o, PhotoSwipeUI_Default, l, r), s.init())
    }, s = document.querySelectorAll(t), r = 0, l = s.length; l > r; r++)
        s[r].setAttribute("data-pswp-uid", r + 1), s[r].onclick = n;
    var c = a();
    c.pid && c.gid && o(c.pid, s[c.gid - 1], !0, !0)
};
initPhotoSwipeFromDOM(".mdb-lightbox"), function(t) {
    t.fn.sticky = function(e) {
        function a() {
            return "number" == typeof n.zIndex?!0 : !1
        }
        function s() {
            return 0 < t(n.stopper).length || "number" == typeof n.stopper?!0 : !1
        }
        var i = {
            topSpacing: 0,
            zIndex: "",
            stopper: ".sticky-stopper"
        }, n = t.extend({}, i, e), o = a(), r = s();
        return this.each(function() {
            function d() {
                var n = f.scrollTop();
                if (r && "string" == typeof h)
                    var a = t(h).offset().top, d = a - i - s;
                else if (r && "number" == typeof h)
                    var d = h;
                if (n > c) {
                    if (e.after(u).css({
                        position: "fixed",
                        top: s
                    }), o && e.css({
                        zIndex: l
                    }), r && n > d) {
                        var p = d - n + s;
                        e.css({
                            top: p
                        })
                    }
                } else
                    e.css({
                        position: "static",
                        top: null,
                        left: null
                    }), u.remove()
            }
            var e = t(this), i = e.outerHeight(), a = e.outerWidth(), s = n.topSpacing, l = n.zIndex, c = e.offset().top - s, u = t("<div></div>").width(a).height(i).addClass("sticky-placeholder"), h = n.stopper, f = t(window);
            f.bind("scroll", d)
        })
    }
}(jQuery);
