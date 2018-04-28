var mApp = function() {
    var t = {
            brand: "#716aca",
            metal: "#c4c5d6",
            light: "#ffffff",
            accent: "#00c5dc",
            primary: "#5867dd",
            success: "#34bfa3",
            info: "#36a3f7",
            warning: "#ffb822",
            danger: "#f4516c",
            focus: "#9816f4"
        },
        a = function(e) {
            var t = e.data("skin") ? "m-tooltip--skin-" + e.data("skin") : "",
                a = "auto" == e.data("width") ? "m-tooltop--auto-width" : "",
                n = e.data("trigger") ? e.data("trigger") : "hover";
            e.tooltip({
                trigger: n,
                template: '<div class="m-tooltip ' + t + " " + a + ' tooltip" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
            })
        },
        e = function() {
            $('[data-toggle="m-tooltip"]').each(function() {
                a($(this))
            })
        },
        n = function(e) {
            var t = e.data("skin") ? "m-popover--skin-" + e.data("skin") : "",
                a = e.data("trigger") ? e.data("trigger") : "hover";
            e.popover({
                trigger: a,
                template: '            <div class="m-popover ' + t + ' popover" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
            })
        },
        o = function() {
            $('[data-toggle="m-popover"]').each(function() {
                n($(this))
            })
        },
        i = function(e, t) {
            e = $(e), new mPortlet(e[0], t)
        },
        l = function() {
            $('[m-portlet="true"]').each(function() {
                var e = $(this);
                !0 !== e.data("portlet-initialized") && (i(e, {}), e.data("portlet-initialized", !0))
            })
        },
        r = function() {
            $("[data-tab-target]").each(function() {
                1 != $(this).data("tabs-initialized") && ($(this).click(function(e) {
                    e.preventDefault();
                    var t = $(this),
                        a = t.closest('[data-tabs="true"]'),
                        n = $(a.data("tabs-contents")),
                        o = $(t.data("tab-target"));
                    a.find(".m-tabs__item.m-tabs__item--active").removeClass("m-tabs__item--active"), t.addClass("m-tabs__item--active"), n.find(".m-tabs-content__item.m-tabs-content__item--active").removeClass("m-tabs-content__item--active"), o.addClass("m-tabs-content__item--active")
                }), $(this).data("tabs-initialized", !0))
            })
        };
    return {
        init: function(e) {
            e && e.colors && (t = e.colors), mApp.initComponents()
        },
        initComponents: function() {
            jQuery.event.special.touchstart = {
                setup: function(e, t, a) {
                    "function" == typeof this && (t.includes("noPreventDefault") ? this.addEventListener("touchstart", a, {
                        passive: !1
                    }) : this.addEventListener("touchstart", a, {
                        passive: !0
                    }))
                }
            }, jQuery.event.special.touchmove = {
                setup: function(e, t, a) {
                    "function" == typeof this && (t.includes("noPreventDefault") ? this.addEventListener("touchmove", a, {
                        passive: !1
                    }) : this.addEventListener("touchmove", a, {
                        passive: !0
                    }))
                }
            }, jQuery.event.special.wheel = {
                setup: function(e, t, a) {
                    "function" == typeof this && (t.includes("noPreventDefault") ? this.addEventListener("wheel", a, {
                        passive: !1
                    }) : this.addEventListener("wheel", a, {
                        passive: !0
                    }))
                }
            }, $('[data-scrollable="true"]').each(function() {
                var e, t, a = $(this);
                mUtil.isInResponsiveRange("tablet-and-mobile") ? (e = a.data("mobile-max-height") ? a.data("mobile-max-height") : a.data("max-height"), t = a.data("mobile-height") ? a.data("mobile-height") : a.data("height")) : (e = a.data("max-height"), t = a.data("max-height")), e && a.css("max-height", e), t && a.css("height", t), mApp.initScroller(a, {})
            }), e(), o(), $("body").on("click", "[data-close=alert]", function() {
                $(this).closest(".alert").hide()
            }), l(), $(".custom-file-input").on("change", function() {
                var e = $(this).val();
                $(this).next(".custom-file-label").addClass("selected").html(e)
            }), r()
        },
        initCustomTabs: function() {
            r()
        },
        initTooltips: function() {
            e()
        },
        initTooltip: function(e) {
            a(e)
        },
        initPopovers: function() {
            o()
        },
        initPopover: function(e) {
            n(e)
        },
        initPortlet: function(e, t) {
            i(e, t)
        },
        initPortlets: function() {
            l()
        },
        scrollTo: function(e, t) {
            el = $(e);
            var a = el && 0 < el.length ? el.offset().top : 0;
            a += t || 0, jQuery("html,body").animate({
                scrollTop: a
            }, "slow")
        },
        scrollToViewport: function(e) {
            var t = $(e).offset().top,
                a = e.height(),
                n = t - (mUtil.getViewPort().height / 2 - a / 2);
            jQuery("html,body").animate({
                scrollTop: n
            }, "slow")
        },
        scrollTop: function() {
            mApp.scrollTo()
        },
        initScroller: function(e, t, a) {
            mUtil.isMobileDevice() ? e.css("overflow", "auto") : (!0 !== a && mApp.destroyScroller(e), e.mCustomScrollbar({
                scrollInertia: 0,
                autoDraggerLength: !0,
                autoHideScrollbar: !0,
                autoExpandScrollbar: !1,
                alwaysShowScrollbar: 0,
                axis: e.data("axis") ? e.data("axis") : "y",
                mouseWheel: {
                    scrollAmount: 120,
                    preventDefault: !0
                },
                setHeight: t.height ? t.height : "",
                theme: "minimal-dark"
            }))
        },
        destroyScroller: function(e) {
            e.mCustomScrollbar("destroy"), e.removeClass("mCS_destroyed")
        },
        alert: function(e) {
            e = $.extend(!0, {
                container: "",
                place: "append",
                type: "success",
                message: "",
                close: !0,
                reset: !0,
                focus: !0,
                closeInSeconds: 0,
                icon: ""
            }, e);
            var t = mUtil.getUniqueID("App_alert"),
                a = '<div id="' + t + '" class="custom-alerts alert alert-' + e.type + ' fade in">' + (e.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : "") + ("" !== e.icon ? '<i class="fa-lg fa fa-' + e.icon + '"></i>  ' : "") + e.message + "</div>";
            return e.reset && $(".custom-alerts").remove(), e.container ? "append" == e.place ? $(e.container).append(a) : $(e.container).prepend(a) : 1 === $(".page-fixed-main-content").size() ? $(".page-fixed-main-content").prepend(a) : ($("body").hasClass("page-container-bg-solid") || $("body").hasClass("page-content-white")) && 0 === $(".page-head").size() ? $(".page-title").after(a) : 0 < $(".page-bar").size() ? $(".page-bar").after(a) : $(".page-breadcrumb, .breadcrumbs").after(a), e.focus && mApp.scrollTo($("#" + t)), 0 < e.closeInSeconds && setTimeout(function() {
                $("#" + t).remove()
            }, 1e3 * e.closeInSeconds), t
        },
        block: function(e, t) {
            var a, n, o, i = $(e);
            if ("spinner" == (t = $.extend(!0, {
                    opacity: .03,
                    overlayColor: "#000000",
                    state: "brand",
                    type: "loader",
                    size: "lg",
                    centerX: !0,
                    centerY: !0,
                    message: "",
                    shadow: !0,
                    width: "auto"
                }, t)).type ? o = '<div class="m-spinner ' + (a = t.skin ? "m-spinner--skin-" + t.skin : "") + " " + (n = t.state ? "m-spinner--" + t.state : "") + '"></div' : (a = t.skin ? "m-loader--skin-" + t.skin : "", n = t.state ? "m-loader--" + t.state : "", size = t.size ? "m-loader--" + t.size : "", o = '<div class="m-loader ' + a + " " + n + " " + size + '"></div'), t.message && 0 < t.message.length) {
                var l = "m-blockui " + (!1 === t.shadow ? "m-blockui-no-shadow" : "");
                html = '<div class="' + l + '"><span>' + t.message + "</span><span>" + o + "</span></div>";
                i = document.createElement("div");
                mUtil.get("body").prepend(i), mUtil.addClass(i, l), i.innerHTML = "<span>" + t.message + "</span><span>" + o + "</span>", t.width = mUtil.actualWidth(i) + 10, mUtil.remove(i), "body" == e && (html = '<div class="' + l + '" style="margin-left:-' + t.width / 2 + 'px;"><span>' + t.message + "</span><span>" + o + "</span></div>")
            } else html = o;
            var r = {
                message: html,
                centerY: t.centerY,
                centerX: t.centerX,
                css: {
                    top: "30%",
                    left: "50%",
                    border: "0",
                    padding: "0",
                    backgroundColor: "none",
                    width: t.width
                },
                overlayCSS: {
                    backgroundColor: t.overlayColor,
                    opacity: t.opacity,
                    cursor: "wait",
                    zIndex: "10"
                },
                onUnblock: function() {
                    i && (i.css("position", ""), i.css("zoom", ""))
                }
            };
            "body" == e ? (r.css.top = "50%", $.blockUI(r)) : (i = $(e)).block(r)
        },
        unblock: function(e) {
            e && "body" != e ? $(e).unblock() : $.unblockUI()
        },
        blockPage: function(e) {
            return mApp.block("body", e)
        },
        unblockPage: function() {
            return mApp.unblock("body")
        },
        progress: function(e, t) {
            var a = "m-loader m-loader--" + (t && t.skin ? t.skin : "light") + " m-loader--" + (t && t.alignment ? t.alignment : "right") + " m-loader--" + (t && t.size ? "m-spinner--" + t.size : "");
            mApp.unprogress(e), $(e).addClass(a), $(e).data("progress-classes", a)
        },
        unprogress: function(e) {
            $(e).removeClass($(e).data("progress-classes"))
        },
        getColor: function(e) {
            return t[e]
        }
    }
}();
$(document).ready(function() {
        mApp.init({})
    }), this.Element && function(e) {
        e.matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document).querySelectorAll(e), a = -1; t[++a] && t[a] != this;);
            return !!t[a]
        }
    }(Element.prototype), this.Element && function(e) {
        e.closest = e.closest || function(e) {
            for (var t = this; t.matches && !t.matches(e);) t = t.parentNode;
            return t.matches ? t : null
        }
    }(Element.prototype), this.Element && function(e) {
        e.matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document).querySelectorAll(e), a = -1; t[++a] && t[a] != this;);
            return !!t[a]
        }
    }(Element.prototype),
    function() {
        for (var o = 0, e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
            var t = (new Date).getTime(),
                a = Math.max(0, 16 - (t - o)),
                n = window.setTimeout(function() {
                    e(t + a)
                }, a);
            return o = t + a, n
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(e) {
        e.hasOwnProperty("prepend") || Object.defineProperty(e, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
                var e = Array.prototype.slice.call(arguments),
                    a = document.createDocumentFragment();
                e.forEach(function(e) {
                    var t = e instanceof Node;
                    a.appendChild(t ? e : document.createTextNode(String(e)))
                }), this.insertBefore(a, this.firstChild)
            }
        })
    }), window.mUtilElementDataStore = {}, window.mUtilElementDataStoreID = 0, window.mUtilDelegatedEventHandlers = {}, window.noZensmooth = !0;
var mUtil = function() {
    var t = [],
        a = {
            sm: 544,
            md: 768,
            lg: 1024,
            xl: 1200
        },
        n = function() {
            var e = !1;
            window.addEventListener("resize", function() {
                clearTimeout(e), e = setTimeout(function() {
                    ! function() {
                        for (var e = 0; e < t.length; e++) t[e].call()
                    }()
                }, 250)
            })
        };
    return {
        init: function(e) {
            e && e.breakpoints && (a = e.breakpoints), n()
        },
        addResizeHandler: function(e) {
            t.push(e)
        },
        runResizeHandlers: function() {
            _runResizeHandlers()
        },
        getURLParam: function(e) {
            var t, a, n = window.location.search.substring(1).split("&");
            for (t = 0; t < n.length; t++)
                if ((a = n[t].split("="))[0] == e) return unescape(a[1]);
            return null
        },
        isMobileDevice: function() {
            return this.getViewPort().width < this.getBreakpoint("lg")
        },
        isDesktopDevice: function() {
            return !mUtil.isMobileDevice()
        },
        getViewPort: function() {
            var e = window,
                t = "inner";
            return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), {
                width: e[t + "Width"],
                height: e[t + "Height"]
            }
        },
        isInResponsiveRange: function(e) {
            var t = this.getViewPort().width;
            return "general" == e || ("desktop" == e && t >= this.getBreakpoint("lg") + 1 || ("tablet" == e && t >= this.getBreakpoint("md") + 1 && t < this.getBreakpoint("lg") || ("mobile" == e && t <= this.getBreakpoint("md") || ("desktop-and-tablet" == e && t >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" == e && t <= this.getBreakpoint("lg") || "minimal-desktop-and-below" == e && t <= this.getBreakpoint("xl"))))))
        },
        getUniqueID: function(e) {
            return e + Math.floor(Math.random() * (new Date).getTime())
        },
        getBreakpoint: function(e) {
            return a[e]
        },
        isset: function(e, t) {
            var a;
            if (-1 !== (t = t || "").indexOf("[")) throw new Error("Unsupported object path notation.");
            t = t.split(".");
            do {
                if (void 0 === e) return !1;
                if (a = t.shift(), !e.hasOwnProperty(a)) return !1;
                e = e[a]
            } while (t.length);
            return !0
        },
        getHighestZindex1: function(e) {
            for (var t, a; e && e !== document && e !== window;) {
                if (("absolute" === (t = mUtil.css(e, "position")) || "relative" === t || "fixed" === t) && (a = parseInt(elem.css("zIndex"), 10), !isNaN(a) && 0 !== a)) return a;
                e = e.parentNode
            }
        },
        getHighestZindex: function(e) {
            for (var t, a, n = mUtil.get(e); n.length && n[0] !== document;) {
                if (("absolute" === (t = n.css("position")) || "relative" === t || "fixed" === t) && (a = parseInt(n.css("zIndex"), 10), !isNaN(a) && 0 !== a)) return a;
                n = n.parent()
            }
        },
        hasFixedPositionedParent: function(e) {
            for (; e && e !== document;) {
                if (position = mUtil.css(e, "position"), "fixed" === position) return !0;
                e = e.parentNode
            }
            return !1
        },
        sleep: function(e) {
            for (var t = (new Date).getTime(), a = 0; a < 1e7 && !((new Date).getTime() - t > e); a++);
        },
        getRandomInt: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        },
        isAngularVersion: function() {
            return void 0 !== window.Zone
        },
        deepExtend: function(e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                if (a)
                    for (var n in a) a.hasOwnProperty(n) && ("object" == typeof a[n] ? e[n] = mUtil.deepExtend(e[n], a[n]) : e[n] = a[n])
            }
            return e
        },
        extend: function(e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++)
                if (arguments[t])
                    for (var a in arguments[t]) arguments[t].hasOwnProperty(a) && (e[a] = arguments[t][a]);
            return e
        },
        get: function(e) {
            var t;
            return e === document ? document : e && 1 === e.nodeType ? e : (t = document.getElementById(e)) ? t : (t = document.getElementsByTagName(e)) ? t[0] : (t = document.getElementsByClassName(e)) ? t[0] : null
        },
        hasClasses: function(e, t) {
            if (e) {
                for (var a = t.split(" "), n = 0; n < a.length; n++)
                    if (0 == mUtil.hasClass(e, mUtil.trim(a[n]))) return !1;
                return !0
            }
        },
        hasClass: function(e, t) {
            if (e) return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)
        },
        addClass: function(e, t) {
            if (e) {
                var a = t.split(" ");
                if (e.classList)
                    for (var n = 0; n < a.length; n++) a[n] && 0 < a[n].length && e.classList.add(mUtil.trim(a[n]));
                else if (!hasClass(e, t))
                    for (n = 0; n < a.length; n++) e.className += " " + mUtil.trim(a[n])
            }
        },
        removeClass: function(e, t) {
            if (e) {
                var a = t.split(" ");
                if (e.classList)
                    for (var n = 0; n < a.length; n++) e.classList.remove(mUtil.trim(a[n]));
                else if (mUtil.hasClass(e, t))
                    for (n = 0; n < a.length; n++) e.className = e.className.replace(new RegExp("\\b" + mUtil.trim(a[n]) + "\\b", "g"), "")
            }
        },
        triggerCustomEvent: function(e, t, a) {
            if (window.CustomEvent) var n = new CustomEvent(t, {
                detail: a
            });
            else(n = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, a);
            e.dispatchEvent(n)
        },
        trim: function(e) {
            return e.trim()
        },
        eventTriggered: function(e) {
            return !!e.currentTarget.dataset.triggered || !(e.currentTarget.dataset.triggered = !0)
        },
        remove: function(e) {
            e && e.parentNode && e.parentNode.removeChild(e)
        },
        find: function(e, t) {
            return e.querySelector(t)
        },
        findAll: function(e, t) {
            return e.querySelectorAll(t)
        },
        insertAfter: function(e, t) {
            return t.parentNode.insertBefore(e, t.nextSibling)
        },
        parents: function(e, t) {
            function o(e, t) {
                for (var a = 0, n = e.length; a < n; a++)
                    if (e[a] == t) return !0;
                return !1
            }
            return function(e, t) {
                for (var a = document.querySelectorAll(t), n = e.parentNode; n && !o(a, n);) n = n.parentNode;
                return n
            }(e, t)
        },
        children: function(e, t, a) {
            if (e && e.childNodes) {
                for (var n = [], o = 0, i = e.childNodes.length; o < i; ++o) 1 == e.childNodes[o].nodeType && mUtil.matches(e.childNodes[o], t, a) && n.push(e.childNodes[o]);
                return n
            }
        },
        child: function(e, t, a) {
            var n = mUtil.children(e, t, a);
            return n ? n[0] : null
        },
        matches: function(e, t, a) {
            var n = Element.prototype,
                o = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function(e) {
                    return -1 !== [].indexOf.call(document.querySelectorAll(e), this)
                };
            return !(!e || !e.tagName) && o.call(e, t)
        },
        data: function(a) {
            return a = mUtil.get(a), {
                set: function(e, t) {
                    void 0 === a.customDataTag && (mUtilElementDataStoreID++, a.customDataTag = mUtilElementDataStoreID), void 0 === mUtilElementDataStore[a.customDataTag] && (mUtilElementDataStore[a.customDataTag] = {}), mUtilElementDataStore[a.customDataTag][e] = t
                },
                get: function(e) {
                    return this.has(e) ? mUtilElementDataStore[a.customDataTag][e] : null
                },
                has: function(e) {
                    return !(!mUtilElementDataStore[a.customDataTag] || !mUtilElementDataStore[a.customDataTag][e])
                },
                remove: function(e) {
                    this.has(e) && delete mUtilElementDataStore[a.customDataTag][e]
                }
            }
        },
        outerWidth: function(e, t) {
            if (!0 === t) {
                var a = parseFloat(e.offsetWidth);
                return a += parseFloat(mUtil.css(e, "margin-left")) + parseFloat(mUtil.css(e, "margin-right")), parseFloat(a)
            }
            return a = parseFloat(e.offsetWidth)
        },
        offset: function(e) {
            var t = e.getBoundingClientRect();
            return {
                top: t.top + document.body.scrollTop,
                left: t.left + document.body.scrollLeft
            }
        },
        height: function(e) {
            return mUtil.css(e, "height")
        },
        visible: function(e) {
            return !(0 === e.offsetWidth && 0 === e.offsetHeight)
        },
        attr: function(e, t, a) {
            if (null != (e = mUtil.get(e))) return void 0 === a ? e.getAttribute(t) : void e.setAttribute(t, a)
        },
        hasAttr: function(e, t) {
            if (null != (e = mUtil.get(e))) return !!e.getAttribute(t)
        },
        removeAttr: function(e, t) {
            null != (e = mUtil.get(e)) && e.removeAttribute(t)
        },
        animate: function(n, o, i, l, r, s) {
            var e = {
                linear: function(e, t, a, n) {
                    return a * e / n + t
                }
            };
            if ("number" == typeof n && "number" == typeof o && "number" == typeof i && "function" == typeof l) {
                "string" == typeof r && e[r] && (r = e[r]), "function" != typeof r && (r = e.linear), "function" != typeof s && (s = function() {});
                var d = window.requestAnimationFrame || function(e) {
                        window.setTimeout(e, 1e3 / 60)
                    },
                    c = o - n;
                l(n);
                var m = window.performance && window.performance.now ? window.performance.now() : +new Date;
                d(function e(t) {
                    var a = (t || +new Date) - m;
                    0 <= a && l(r(a, n, c, i)), 0 <= a && i <= a ? (l(o), s()) : d(e)
                })
            }
        },
        actualCss: function(e, t, a) {
            var n;
            if (e instanceof HTMLElement != !1) return e.getAttribute("m-hidden-" + t) && !1 !== a ? parseFloat(e.getAttribute("m-hidden-" + t)) : (e.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == t ? n = e.offsetWidth : "height" == t && (n = e.offsetHeight), e.style.cssText = "", e.setAttribute("m-hidden-" + t, n), parseFloat(n))
        },
        actualHeight: function(e, t) {
            return mUtil.actualCss(e, "height", t)
        },
        actualWidth: function(e, t) {
            return mUtil.actualCss(e, "width", t)
        },
        getScroll: function(e, t) {
            return t = "scroll" + t, e == window || e == document ? self["scrollTop" == t ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[t] || document.body[t] : e[t]
        },
        css: function(e, t, a) {
            if (e = mUtil.get(e), void 0 !== a) e.style[t] = a;
            else {
                var n = (e.ownerDocument || document).defaultView;
                if (n && n.getComputedStyle) return t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(e, null).getPropertyValue(t);
                if (e.currentStyle) return t = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                }), a = e.currentStyle[t], /^\d+(em|pt|%|ex)?$/i.test(a) ? (o = a, i = e.style.left, l = e.runtimeStyle.left, e.runtimeStyle.left = e.currentStyle.left, e.style.left = o || 0, o = e.style.pixelLeft + "px", e.style.left = i, e.runtimeStyle.left = l, o) : a
            }
            var o, i, l
        },
        slide: function(t, e, a, n, o) {
            if (!(!t || "up" == e && !1 === mUtil.visible(t) || "down" == e && !0 === mUtil.visible(t))) {
                a = a || 600;
                var i = mUtil.actualHeight(t),
                    l = !1,
                    r = !1;
                mUtil.css(t, "padding-top") && !0 !== mUtil.data(t).has("slide-padding-top") && mUtil.data(t).set("slide-padding-top", mUtil.css(t, "padding-top")), mUtil.css(t, "padding-bottom") && !0 !== mUtil.data(t).has("slide-padding-bottom") && mUtil.data(t).set("slide-padding-bottom", mUtil.css(t, "padding-bottom")), mUtil.data(t).has("slide-padding-top") && (l = parseInt(mUtil.data(t).get("slide-padding-top"))), mUtil.data(t).has("slide-padding-bottom") && (r = parseInt(mUtil.data(t).get("slide-padding-bottom"))), "up" == e ? (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(e) {
                    t.style.paddingTop = l - e + "px"
                }, "linear"), r && mUtil.animate(0, r, a, function(e) {
                    t.style.paddingBottom = r - e + "px"
                }, "linear"), mUtil.animate(0, i, a, function(e) {
                    t.style.height = i - e + "px"
                }, "linear", function() {
                    n(), t.style.height = "", t.style.display = "none"
                })) : "down" == e && (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(e) {
                    t.style.paddingTop = e + "px"
                }, "linear", function() {
                    t.style.paddingTop = ""
                }), r && mUtil.animate(0, r, a, function(e) {
                    t.style.paddingBottom = e + "px"
                }, "linear", function() {
                    t.style.paddingBottom = ""
                }), mUtil.animate(0, i, a, function(e) {
                    t.style.height = e + "px"
                }, "linear", function() {
                    n(), t.style.height = "", t.style.display = "", t.style.overflow = ""
                }))
            }
        },
        slideUp: function(e, t, a) {
            mUtil.slide(e, "up", t, a)
        },
        slideDown: function(e, t, a) {
            mUtil.slide(e, "down", t, a)
        },
        show: function(e, t) {
            e.style.display = t || "block"
        },
        hide: function(e) {
            e.style.display = "none"
        },
        addEvent: function(e, t, a, n) {
            void 0 !== (e = mUtil.get(e)) && e.addEventListener(t, a)
        },
        removeEvent: function(e, t, a) {
            (e = mUtil.get(e)).removeEventListener(t, a)
        },
        on: function(i, l, e, r) {
            if (l) {
                var t = mUtil.getUniqueID("event");
                return mUtilDelegatedEventHandlers[t] = function(e) {
                    for (var t = i.querySelectorAll(l), a = e.target; a && a !== i;) {
                        for (var n = 0, o = t.length; n < o; n++) a === t[n] && r.call(a, e);
                        a = a.parentNode
                    }
                }, mUtil.addEvent(i, e, mUtilDelegatedEventHandlers[t]), t
            }
        },
        off: function(e, t, a) {
            e && mUtilDelegatedEventHandlers[a] && (mUtil.removeEvent(e, t, mUtilDelegatedEventHandlers[a]), delete mUtilDelegatedEventHandlers[a])
        },
        one: function(e, t, a) {
            (e = mUtil.get(e)).addEventListener(t, function(e) {
                return e.target.removeEventListener(e.type, arguments.callee), a(e)
            })
        },
        hash: function(e) {
            var t, a = 0;
            if (0 === e.length) return a;
            for (t = 0; t < e.length; t++) a = (a << 5) - a + e.charCodeAt(t), a |= 0;
            return a
        },
        animateClass: function(e, t, a) {
            mUtil.addClass(e, "animated " + t), mUtil.one(e, "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                mUtil.removeClass(e, "animated " + t)
            }), a && mUtil.one(e.animationEnd, a)
        },
        animateDelay: function(e, t) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(e, a[n] + "animation-delay", t)
        },
        animateDuration: function(e, t) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(e, a[n] + "animation-duration", t)
        },
        scrollTo: function(e, t, a) {
            a || (a = 600), zenscroll.toY(e, a)
        },
        scrollToViewport: function(e, t) {
            t || (t = 1200), zenscroll.intoView(e, t)
        },
        scrollToCenter: function(e, t) {
            t || (t = 1200), zenscroll.center(e, t)
        },
        scrollTop: function(e) {
            e || (e = 600), zenscroll.toY(0, e)
        },
        isArray: function(e) {
            return e && Array.isArray(e)
        },
        ready: function(e) {
            (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? e(): document.addEventListener("DOMContentLoaded", e)
        }
    }
}();
mUtil.ready(function() {
        mUtil.init()
    }),
    function(b) {
        if (void 0 === mUtil) throw new Error("mUtil is required and must be included before mDatatable.");
        b.fn.mDatatable = function(f) {
            if (0 !== b(this).length) {
                var g = this;
                g.debug = !1;
                var h = {
                    isInit: !(g.API = {
                        record: null,
                        value: null,
                        params: null
                    }),
                    offset: 110,
                    stateId: "meta",
                    ajaxParams: {},
                    init: function(e) {
                        return null === e.data.source && h.extractTable(), h.setupBaseDOM.call(), h.setupDOM(g.table), h.spinnerCallback(!0), h.setDataSourceQuery(h.getOption("data.source.read.params.query")), b(g).on("m-datatable--on-layout-updated", h.afterRender), g.debug && h.stateRemove(h.stateId), b.each(h.getOption("extensions"), function(e, t) {
                            "function" == typeof b.fn.mDatatable[e] && new b.fn.mDatatable[e](g, t)
                        }), "remote" !== e.data.type && "local" !== e.data.type || ((!1 === e.data.saveState || !1 === e.data.saveState.cookie && !1 === e.data.saveState.webstorage) && h.stateRemove(h.stateId), "local" === e.data.type && "object" == typeof e.data.source && (g.dataSet = g.originalDataSet = h.dataMapCallback(e.data.source)), h.dataRender()), h.setHeadTitle(), h.setHeadTitle(g.tableFoot), void 0 !== e.layout.header && !1 === e.layout.header && b(g.table).find("thead").remove(), void 0 !== e.layout.footer && !1 === e.layout.footer && b(g.table).find("tfoot").remove(), null !== e.data.type && "local" !== e.data.type || (h.setupCellField.call(), h.setupTemplateCell.call(), h.setupSubDatatable.call(), h.setupSystemColumn.call(), h.redraw()), b(window).resize(h.fullRender), b(g).height(""), b(h.getOption("search.input")).on("keyup", function(e) {
                            h.getOption("search.onEnter") && 13 !== e.which || h.search(b(this).val().toLowerCase())
                        }), g
                    },
                    extractTable: function() {
                        var i = [],
                            n = b(g).find("tr:first-child th").get().map(function(e, t) {
                                var a = b(e).data("field");
                                void 0 === a && (a = b(e).text().trim());
                                var n = {
                                    field: a,
                                    title: a
                                };
                                for (var o in f.columns) f.columns[o].field === a && (n = b.extend(!0, {}, f.columns[o], n));
                                return i.push(n), a
                            });
                        f.columns = i;
                        var t = [],
                            e = b(g).find("tr").get().map(function(e) {
                                return b(e).find("td").length && t.push(b(e).prop("attributes")), b(e).find("td").get().map(function(e, t) {
                                    return b(e).html()
                                })
                            });
                        f.data.attr.rowProps = t;
                        var o = [];
                        b.each(e, function(e, t) {
                            if (0 !== t.length) {
                                var a = {};
                                b.each(t, function(e, t) {
                                    a[n[e]] = b.trim(t)
                                }), o.push(a)
                            }
                        }), f.data.source = o
                    },
                    layoutUpdate: function() {
                        h.setupSubDatatable.call(), h.setupSystemColumn.call(), h.setupHover.call(), void 0 === f.detail && 1 === h.getDepth() && h.lockTable.call(), h.columnHide.call(), h.resetScroll(), h.isInit || (b(g).trigger("m-datatable--on-init", {
                            table: b(g.wrap).attr("id"),
                            options: f
                        }), h.isInit = !0), b(g).trigger("m-datatable--on-layout-updated", {
                            table: b(g.wrap).attr("id")
                        })
                    },
                    lockTable: function() {
                        var t = {
                            lockEnabled: !1,
                            init: function() {
                                t.lockEnabled = h.lockEnabledColumns(), 0 === t.lockEnabled.left.length && 0 === t.lockEnabled.right.length || t.enable()
                            },
                            enable: function() {
                                b(g.table).find("thead,tbody,tfoot").each(function() {
                                    var e = this;
                                    0 === b(this).find(".m-datatable__lock").length && b(this).ready(function() {
                                        ! function(e) {
                                            if (0 < b(e).find(".m-datatable__lock").length) h.log("Locked container already exist in: ", e);
                                            else if (0 !== b(e).find(".m-datatable__row").length) {
                                                var o = b("<div/>").addClass("m-datatable__lock m-datatable__lock--left"),
                                                    i = b("<div/>").addClass("m-datatable__lock m-datatable__lock--scroll"),
                                                    l = b("<div/>").addClass("m-datatable__lock m-datatable__lock--right");
                                                b(e).find(".m-datatable__row").each(function() {
                                                    var t = b("<tr/>").addClass("m-datatable__row").appendTo(o),
                                                        a = b("<tr/>").addClass("m-datatable__row").appendTo(i),
                                                        n = b("<tr/>").addClass("m-datatable__row").appendTo(l);
                                                    b(this).find(".m-datatable__cell").each(function() {
                                                        var e = b(this).data("locked");
                                                        void 0 !== e ? (void 0 === e.left && !0 !== e || b(this).appendTo(t), void 0 !== e.right && b(this).appendTo(n)) : b(this).appendTo(a)
                                                    }), b(this).remove()
                                                }), 0 < t.lockEnabled.left.length && (b(g.wrap).addClass("m-datatable--lock"), b(o).appendTo(e)), (0 < t.lockEnabled.left.length || 0 < t.lockEnabled.right.length) && b(i).appendTo(e), 0 < t.lockEnabled.right.length && (b(g.wrap).addClass("m-datatable--lock"), b(l).appendTo(e))
                                            } else h.log("No row exist in: ", e)
                                        }(e)
                                    })
                                })
                            }
                        };
                        return t.init(), t
                    },
                    fullRender: function() {
                        h.spinnerCallback(!0), b(g.wrap).removeClass("m-datatable--loaded"), h.insertData()
                    },
                    lockEnabledColumns: function() {
                        var a = b(window).width(),
                            e = f.columns,
                            n = {
                                left: [],
                                right: []
                            };
                        return b.each(e, function(e, t) {
                            void 0 !== t.locked && (void 0 !== t.locked.left && mUtil.getBreakpoint(t.locked.left) <= a && n.left.push(t.locked.left), void 0 !== t.locked.right && mUtil.getBreakpoint(t.locked.right) <= a && n.right.push(t.locked.right))
                        }), n
                    },
                    afterRender: function(e, t) {
                        t.table == b(g.wrap).attr("id") && b(g).ready(function() {
                            h.isLocked() || (h.redraw(), h.getOption("rows.autoHide") && (h.autoHide(), b(g.table).find(".m-datatable__row").css("height", ""))), b(g.tableBody).find(".m-datatable__row").removeClass("m-datatable__row--even"), b(g.wrap).hasClass("m-datatable--subtable") ? b(g.tableBody).find(".m-datatable__row:not(.m-datatable__row-detail):even").addClass("m-datatable__row--even") : b(g.tableBody).find(".m-datatable__row:nth-child(even)").addClass("m-datatable__row--even"), h.isLocked() && h.redraw(), b(g.tableBody).css("visibility", ""), b(g.wrap).addClass("m-datatable--loaded"), h.scrollbar.call(), h.sorting.call(), h.spinnerCallback(!1)
                        })
                    },
                    hoverTimer: 0,
                    isScrolling: !1,
                    setupHover: function() {
                        b(window).scroll(function(e) {
                            clearTimeout(h.hoverTimer), h.isScrolling = !0
                        }), b(g.tableBody).find(".m-datatable__cell").off("mouseenter", "mouseleave").on("mouseenter", function() {
                            if (h.hoverTimer = setTimeout(function() {
                                    h.isScrolling = !1
                                }, 200), !h.isScrolling) {
                                var e = b(this).closest(".m-datatable__row").addClass("m-datatable__row--hover"),
                                    t = b(e).index() + 1;
                                b(e).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + t + ")").addClass("m-datatable__row--hover")
                            }
                        }).on("mouseleave", function() {
                            var e = b(this).closest(".m-datatable__row").removeClass("m-datatable__row--hover"),
                                t = b(e).index() + 1;
                            b(e).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + t + ")").removeClass("m-datatable__row--hover")
                        })
                    },
                    adjustLockContainer: function() {
                        if (!h.isLocked()) return 0;
                        var e = b(g.tableHead).width(),
                            t = b(g.tableHead).find(".m-datatable__lock--left").width(),
                            a = b(g.tableHead).find(".m-datatable__lock--right").width();
                        void 0 === t && (t = 0), void 0 === a && (a = 0);
                        var n = Math.floor(e - t - a);
                        return b(g.table).find(".m-datatable__lock--scroll").css("width", n), n
                    },
                    dragResize: function() {
                        var i, l, r = !1,
                            s = void 0;
                        b(g.tableHead).find(".m-datatable__cell").mousedown(function(e) {
                            s = b(this), r = !0, i = e.pageX, l = b(this).width(), b(s).addClass("m-datatable__cell--resizing")
                        }).mousemove(function(a) {
                            if (r) {
                                var n = b(s).index(),
                                    e = b(g.tableBody),
                                    t = b(s).closest(".m-datatable__lock");
                                if (t) {
                                    var o = b(t).index();
                                    e = b(g.tableBody).find(".m-datatable__lock").eq(o)
                                }
                                b(e).find(".m-datatable__row").each(function(e, t) {
                                    b(t).find(".m-datatable__cell").eq(n).width(l + (a.pageX - i)).children().width(l + (a.pageX - i))
                                }), b(s).children().css("width", l + (a.pageX - i))
                            }
                        }).mouseup(function() {
                            b(s).removeClass("m-datatable__cell--resizing"), r = !1
                        }), b(document).mouseup(function() {
                            b(s).removeClass("m-datatable__cell--resizing"), r = !1
                        })
                    },
                    initHeight: function() {
                        if (f.layout.height && f.layout.scroll) {
                            var e = b(g.tableHead).find(".m-datatable__row").height(),
                                t = b(g.tableFoot).find(".m-datatable__row").height(),
                                a = f.layout.height;
                            0 < e && (a -= e), 0 < t && (a -= t), b(g.tableBody).css("max-height", a)
                        }
                    },
                    setupBaseDOM: function() {
                        g.initialDatatable = b(g).clone(), "TABLE" === b(g).prop("tagName") ? (g.table = b(g).removeClass("m-datatable").addClass("m-datatable__table"), 0 === b(g.table).parents(".m-datatable").length && (g.table.wrap(b("<div/>").addClass("m-datatable").addClass("m-datatable--" + f.layout.theme)), g.wrap = b(g.table).parent())) : (g.wrap = b(g).addClass("m-datatable").addClass("m-datatable--" + f.layout.theme), g.table = b("<table/>").addClass("m-datatable__table").appendTo(g)), void 0 !== f.layout.class && b(g.wrap).addClass(f.layout.class), b(g.table).removeClass("m-datatable--destroyed").css("display", "block"), void 0 === b(g).attr("id") && (h.setOption("data.saveState", !1), b(g.table).attr("id", mUtil.getUniqueID("m-datatable--"))), h.getOption("layout.minHeight") && b(g.table).css("min-height", h.getOption("layout.minHeight")), h.getOption("layout.height") && b(g.table).css("max-height", h.getOption("layout.height")), null === f.data.type && b(g.table).css("width", "").css("display", ""), g.tableHead = b(g.table).find("thead"), 0 === b(g.tableHead).length && (g.tableHead = b("<thead/>").prependTo(g.table)), g.tableBody = b(g.table).find("tbody"), 0 === b(g.tableBody).length && (g.tableBody = b("<tbody/>").appendTo(g.table)), void 0 !== f.layout.footer && f.layout.footer && (g.tableFoot = b(g.table).find("tfoot"), 0 === b(g.tableFoot).length && (g.tableFoot = b("<tfoot/>").appendTo(g.table)))
                    },
                    setupCellField: function(e) {
                        void 0 === e && (e = b(g.table).children());
                        var a = f.columns;
                        b.each(e, function(e, t) {
                            b(t).find(".m-datatable__row").each(function(e, t) {
                                b(t).find(".m-datatable__cell").each(function(e, t) {
                                    void 0 !== a[e] && b(t).data(a[e])
                                })
                            })
                        })
                    },
                    setupTemplateCell: function(e) {
                        void 0 === e && (e = g.tableBody);
                        var r = f.columns;
                        b(e).find(".m-datatable__row").each(function(i, e) {
                            var l = b(e).data("obj") || {};
                            l.getIndex = function() {
                                return i
                            }, l.getDatatable = function() {
                                return g
                            };
                            var t = h.getOption("rows.callback");
                            "function" == typeof t && t(b(e), l, i);
                            var a = h.getOption("rows.beforeTemplate");
                            "function" == typeof a && a(b(e), l, i), void 0 === l && (l = {}, b(e).find(".m-datatable__cell").each(function(e, a) {
                                var t = b.grep(r, function(e, t) {
                                    return b(a).data("field") === e.field
                                })[0];
                                void 0 !== t && (l[t.field] = b(a).text())
                            })), b(e).find(".m-datatable__cell").each(function(e, a) {
                                var t = b.grep(r, function(e, t) {
                                    return b(a).data("field") === e.field
                                })[0];
                                if (void 0 !== t && void 0 !== t.template) {
                                    var n = "";
                                    "string" == typeof t.template && (n = h.dataPlaceholder(t.template, l)), "function" == typeof t.template && (n = t.template(l, i, g));
                                    var o = b("<span/>").append(n);
                                    b(a).html(o), void 0 !== t.overflow && b(o).css("overflow", t.overflow)
                                }
                            });
                            var n = h.getOption("rows.afterTemplate");
                            "function" == typeof n && n(b(e), l, i)
                        })
                    },
                    setupSystemColumn: function() {
                        if (g.dataSet = g.dataSet || [], 0 !== g.dataSet.length) {
                            var i = f.columns;
                            b(g.tableBody).find(".m-datatable__row").each(function(e, t) {
                                b(t).find(".m-datatable__cell").each(function(e, a) {
                                    var t = b.grep(i, function(e, t) {
                                        return b(a).data("field") === e.field
                                    })[0];
                                    if (void 0 !== t) {
                                        var n = b(a).text();
                                        if (void 0 !== t.selector && !1 !== t.selector) {
                                            if (0 < b(a).find('.m-checkbox [type="checkbox"]').length) return;
                                            b(a).addClass("m-datatable__cell--check");
                                            var o = b("<label/>").addClass("m-checkbox m-checkbox--single").append(b("<input/>").attr("type", "checkbox").attr("value", n).on("click", function() {
                                                b(this).is(":checked") ? h.setActive(this) : h.setInactive(this)
                                            })).append(b("<span/>"));
                                            void 0 !== t.selector.class && b(o).addClass(t.selector.class), b(a).children().html(o)
                                        }
                                        if (void 0 !== t.subtable && t.subtable) {
                                            if (0 < b(a).find(".m-datatable__toggle-subtable").length) return;
                                            b(a).children().html(b("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", n).append(b("<i/>").addClass(h.getOption("layout.icons.rowDetail.collapse"))))
                                        }
                                    }
                                })
                            });
                            var e = function(e) {
                                var t = b.grep(i, function(e, t) {
                                    return void 0 !== e.selector && !1 !== e.selector
                                })[0];
                                if (void 0 !== t && void 0 !== t.selector && !1 !== t.selector) {
                                    var a = b(e).find('[data-field="' + t.field + '"]');
                                    if (0 < b(a).find('.m-checkbox [type="checkbox"]').length) return;
                                    b(a).addClass("m-datatable__cell--check");
                                    var n = b("<label/>").addClass("m-checkbox m-checkbox--single m-checkbox--all").append(b("<input/>").attr("type", "checkbox").on("click", function() {
                                        b(this).is(":checked") ? h.setActiveAll(!0) : h.setActiveAll(!1)
                                    })).append(b("<span/>"));
                                    void 0 !== t.selector.class && b(n).addClass(t.selector.class), b(a).children().html(n)
                                }
                            };
                            f.layout.header && e(b(g.tableHead).find(".m-datatable__row").first()), f.layout.footer && e(b(g.tableFoot).find(".m-datatable__row").first())
                        }
                    },
                    adjustCellsWidth: function() {
                        var e = b(g.tableHead).width(),
                            t = b(g.tableHead).find(".m-datatable__row:first-child").find(".m-datatable__cell:visible").length;
                        if (0 < t) {
                            e -= 20 * t;
                            var o = Math.floor(e / t);
                            o <= h.offset && (o = h.offset), b(g.table).find(".m-datatable__row").find(".m-datatable__cell:visible").each(function(e, t) {
                                var a = o,
                                    n = b(t).data("width");
                                void 0 !== n && (a = n), b(t).children().css("width", a)
                            })
                        }
                        return g
                    },
                    adjustCellsHeight: function() {
                        b.each(b(g.table).children(), function(e, t) {
                            for (var a = b(t).find(".m-datatable__row").first().parent().find(".m-datatable__row").length, n = 1; n <= a; n++) {
                                var o = b(t).find(".m-datatable__row:nth-child(" + n + ")");
                                if (0 < b(o).length) {
                                    var i = Math.max.apply(null, b(o).map(function() {
                                        return b(this).height()
                                    }).get());
                                    b(o).css("height", Math.ceil(parseInt(i)))
                                }
                            }
                        })
                    },
                    setupDOM: function(e) {
                        b(e).find("> thead").addClass("m-datatable__head"), b(e).find("> tbody").addClass("m-datatable__body"), b(e).find("> tfoot").addClass("m-datatable__foot"), b(e).find("tr").addClass("m-datatable__row"), b(e).find("tr > th, tr > td").addClass("m-datatable__cell"), b(e).find("tr > th, tr > td").each(function(e, t) {
                            0 === b(t).find("span").length && b(t).wrapInner(b("<span/>").css("width", h.offset))
                        })
                    },
                    scrollbar: function() {
                        var n = {
                            scrollable: null,
                            tableLocked: null,
                            mcsOptions: {
                                scrollInertia: 0,
                                autoDraggerLength: !0,
                                autoHideScrollbar: !0,
                                autoExpandScrollbar: !1,
                                alwaysShowScrollbar: 0,
                                mouseWheel: {
                                    scrollAmount: 120,
                                    preventDefault: !1
                                },
                                advanced: {
                                    updateOnContentResize: !0,
                                    autoExpandHorizontalScroll: !0
                                },
                                theme: "minimal-dark"
                            },
                            init: function() {
                                h.destroyScroller(n.scrollable);
                                var e = mUtil.getViewPort().width;
                                if (f.layout.scroll) {
                                    b(g.wrap).addClass("m-datatable--scroll");
                                    var t = b(g.tableBody).find(".m-datatable__lock--scroll");
                                    0 < b(t).find(".m-datatable__row").length && 0 < b(t).length ? (n.scrollHead = b(g.tableHead).find("> .m-datatable__lock--scroll > .m-datatable__row"), n.scrollFoot = b(g.tableFoot).find("> .m-datatable__lock--scroll > .m-datatable__row"), n.tableLocked = b(g.tableBody).find(".m-datatable__lock:not(.m-datatable__lock--scroll)"), e > mUtil.getBreakpoint("lg") ? n.mCustomScrollbar(t) : n.defaultScrollbar(t)) : 0 < b(g.tableBody).find(".m-datatable__row").length && (n.scrollHead = b(g.tableHead).find("> .m-datatable__row"), n.scrollFoot = b(g.tableFoot).find("> .m-datatable__row"), e > mUtil.getBreakpoint("lg") ? n.mCustomScrollbar(g.tableBody) : n.defaultScrollbar(g.tableBody))
                                } else b(g.table).css("overflow-x", "auto")
                            },
                            defaultScrollbar: function(e) {
                                b(e).css("overflow", "auto").css("max-height", h.getOption("layout.height")).on("scroll", n.onScrolling)
                            },
                            onScrolling: function(e) {
                                var t = b(this).scrollLeft(),
                                    a = b(this).scrollTop();
                                b(n.scrollHead).css("left", -t), b(n.scrollFoot).css("left", -t), b(n.tableLocked).each(function(e, t) {
                                    b(t).css("top", -a)
                                })
                            },
                            mCustomScrollbar: function(e) {
                                n.scrollable = e;
                                var t = "xy";
                                null === h.getOption("layout.height") && (t = "x");
                                var a = b.extend({}, n.mcsOptions, {
                                    axis: t,
                                    setHeight: b(g.tableBody).height(),
                                    callbacks: {
                                        whileScrolling: function() {
                                            var a = this.mcs;
                                            b(n.scrollHead).css("left", a.left), b(n.scrollFoot).css("left", a.left), b(n.tableLocked).each(function(e, t) {
                                                b(t).css("top", a.top)
                                            }), clearTimeout(h.hoverTimer), h.isScrolling = !0
                                        }
                                    }
                                });
                                !0 === h.getOption("layout.smoothScroll.scrollbarShown") && b(e).attr("data-scrollbar-shown", "true"), h.mCustomScrollbar(e, a)
                            }
                        };
                        return n.init(), n
                    },
                    mCustomScrollbar: function(e, t) {
                        b(g.tableBody).css("overflow", ""), h.destroyScroller(b(g.table).find(".mCustomScrollbar")), b(e).mCustomScrollbar(t)
                    },
                    setHeadTitle: function(e) {
                        void 0 === e && (e = g.tableHead);
                        var t = f.columns,
                            o = b(e).find(".m-datatable__row"),
                            i = b(e).find(".m-datatable__cell");
                        0 === b(o).length && (o = b("<tr/>").appendTo(e)), b.each(t, function(e, t) {
                            var a = b(i).eq(e);
                            if (0 === b(a).length && (a = b("<th/>").appendTo(o)), void 0 !== t.title && b(a).addClass(t.class).html(t.title).attr("data-field", t.field).data(t), void 0 !== t.textAlign) {
                                var n = void 0 !== g.textAlign[t.textAlign] ? g.textAlign[t.textAlign] : "";
                                b(a).addClass(n)
                            }
                        }), h.setupDOM(e)
                    },
                    dataRender: function(e) {
                        b(g.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded");
                        var n = function() {
                                g.dataSet = g.dataSet || [], h.localDataUpdate();
                                var e = h.getDataSourceParam("pagination");
                                0 === e.perpage && (e.perpage = f.data.pageSize || 10), e.total = g.dataSet.length;
                                var t = Math.max(e.perpage * (e.page - 1), 0),
                                    a = Math.min(t + e.perpage, e.total);
                                return g.dataSet = b(g.dataSet).slice(t, a), e
                            },
                            t = function(e) {
                                var t = function(t, a) {
                                    b(t.pager).hasClass("m-datatable--paging-loaded") || (b(t.pager).remove(), t.init(a)), b(t.pager).off().on("m-datatable--on-goto-page", function(e) {
                                        b(t.pager).remove(), t.init(a)
                                    });
                                    var e = Math.max(a.perpage * (a.page - 1), 0),
                                        n = Math.min(e + a.perpage, a.total);
                                    h.localDataUpdate(), g.dataSet = b(g.dataSet).slice(e, n), h.insertData()
                                };
                                if (b(g.wrap).removeClass("m-datatable--error"), f.pagination)
                                    if (f.data.serverPaging && "local" !== f.data.type) {
                                        var a = h.getObject("meta", e || null);
                                        null !== a ? h.paging(a) : h.paging(n(), t)
                                    } else h.paging(n(), t);
                                else h.localDataUpdate();
                                h.insertData()
                            };
                        "local" === f.data.type || void 0 === f.data.source.read && null !== g.dataSet || !1 === f.data.serverSorting && "sort" === e || !1 === f.data.serverFiltering && "search" === e ? t() : h.getData().done(t)
                    },
                    insertData: function() {
                        g.dataSet = g.dataSet || [];
                        var c = h.getDataSourceParam(),
                            e = c.pagination,
                            t = (Math.max(e.page, 1) - 1) * e.perpage,
                            a = Math.min(e.page, e.pages) * e.perpage,
                            m = {};
                        void 0 !== f.data.attr.rowProps && f.data.attr.rowProps.length && (m = f.data.attr.rowProps.slice(t, a));
                        var u = b("<tbody/>").addClass("m-datatable__body").css("visibility", "hidden"),
                            p = f.columns.length;
                        b.each(g.dataSet, function(e, t) {
                            var a = b("<tr/>").attr("data-row", e).data("obj", t);
                            void 0 !== m[e] && b.each(m[e], function() {
                                b(a).attr(this.name, this.value)
                            });
                            for (var n = 0, o = [], i = 0; i < p; i += 1) {
                                var l = f.columns[i],
                                    r = [];
                                if (h.getObject("sort.field", c) === l.field && r.push("m-datatable__cell--sorted"), void 0 !== l.textAlign) {
                                    var s = void 0 !== g.textAlign[l.textAlign] ? g.textAlign[l.textAlign] : "";
                                    r.push(s)
                                }
                                var d = "";
                                void 0 !== l.class && (d = ' class="' + l.class + '"'), o[n++] = "<td" + d + ' data-field="' + l.field + '"', o[n++] = ' class="' + r.join(" ") + '"', o[n++] = ">", o[n++] = h.getObject(l.field, t), o[n++] = "</td>"
                            }
                            b(a).append(o.join("")), b(u).append(a)
                        }), 0 === g.dataSet.length && (h.destroyScroller(b(g.table).find(".mCustomScrollbar")), b(u).html(b("<span/>").addClass("m-datatable--error").html(h.getOption("translate.records.noRecords"))), b(g.wrap).addClass("m-datatable--error m-datatable--loaded"), h.spinnerCallback(!1)), b(g.tableBody).replaceWith(u), g.tableBody = u, h.setupDOM(g.table), h.setupCellField([g.tableBody]), h.setupTemplateCell(g.tableBody), h.layoutUpdate()
                    },
                    updateTableComponents: function() {
                        g.tableHead = b(g.table).children("thead"), g.tableBody = b(g.table).children("tbody"), g.tableFoot = b(g.table).children("tfoot")
                    },
                    getData: function() {
                        h.spinnerCallback(!0);
                        var e = {
                            dataType: "json",
                            method: "GET",
                            data: {},
                            timeout: h.getOption("data.source.read.timeout") || 3e4
                        };
                        if ("local" === f.data.type && (e.url = f.data.source), "remote" === f.data.type) {
                            e.url = h.getOption("data.source.read.url"), "string" != typeof e.url && (e.url = h.getOption("data.source.read")), "string" != typeof e.url && (e.url = h.getOption("data.source")), e.headers = h.getOption("data.source.read.headers"), e.method = h.getOption("data.source.read.method") || "POST";
                            var t = h.getDataSourceParam();
                            h.getOption("data.serverPaging") || delete t.pagination, h.getOption("data.serverSorting") || delete t.sort, e.data = b.extend(!0, e.data, t, h.getOption("data.source.read.params"))
                        }
                        return b.ajax(e).done(function(e, t, a) {
                            g.lastResponse = e, g.dataSet = g.originalDataSet = h.dataMapCallback(e), h.setAutoColumns(), b(g).trigger("m-datatable--on-ajax-done", [g.dataSet])
                        }).fail(function(e, t, a) {
                            h.destroyScroller(b(g.table).find(".mCustomScrollbar")), b(g).trigger("m-datatable--on-ajax-fail", [e]), b(g.tableBody).html(b("<span/>").addClass("m-datatable--error").html(h.getOption("translate.records.noRecords"))), b(g.wrap).addClass("m-datatable--error m-datatable--loaded"), h.spinnerCallback(!1)
                        }).always(function() {})
                    },
                    paging: function(e, t) {
                        var m = {
                            meta: null,
                            pager: null,
                            paginateEvent: null,
                            pagerLayout: {
                                pagination: null,
                                info: null
                            },
                            callback: null,
                            init: function(e) {
                                m.meta = e, m.meta.pages = Math.max(Math.ceil(m.meta.total / m.meta.perpage), 1), m.meta.page > m.meta.pages && (m.meta.page = m.meta.pages), m.paginateEvent = h.getTablePrefix(), m.pager = b(g.table).siblings(".m-datatable__pager"), b(m.pager).hasClass("m-datatable--paging-loaded") || (b(m.pager).remove(), 0 !== m.meta.pages && (h.setDataSourceParam("pagination", {
                                    page: m.meta.page,
                                    pages: m.meta.pages,
                                    perpage: m.meta.perpage,
                                    total: m.meta.total
                                }), m.callback = m.serverCallback, "function" == typeof t && (m.callback = t), m.addPaginateEvent(), m.populate(), m.meta.page = Math.max(m.meta.page || 1, m.meta.page), b(g).trigger(m.paginateEvent, m.meta), m.pagingBreakpoint.call(), b(window).resize(m.pagingBreakpoint)))
                            },
                            serverCallback: function(e, t) {
                                h.dataRender()
                            },
                            populate: function() {
                                var e = h.getOption("layout.icons.pagination"),
                                    t = h.getOption("translate.toolbar.pagination.items.default");
                                m.pager = b("<div/>").addClass("m-datatable__pager m-datatable--paging-loaded clearfix");
                                var a = b("<ul/>").addClass("m-datatable__pager-nav");
                                m.pagerLayout.pagination = a, b("<li/>").append(b("<a/>").attr("title", t.first).addClass("m-datatable__pager-link m-datatable__pager-link--first").append(b("<i/>").addClass(e.first)).on("click", m.gotoMorePage).attr("data-page", 1)).appendTo(a), b("<li/>").append(b("<a/>").attr("title", t.prev).addClass("m-datatable__pager-link m-datatable__pager-link--prev").append(b("<i/>").addClass(e.prev)).on("click", m.gotoMorePage)).appendTo(a), b("<li/>").append(b("<a/>").attr("title", t.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-prev").html(b("<i/>").addClass(e.more)).on("click", m.gotoMorePage)).appendTo(a), b("<li/>").append(b("<input/>").attr("type", "text").addClass("m-pager-input form-control").attr("title", t.input).on("keyup", function() {
                                    b(this).attr("data-page", Math.abs(b(this).val()))
                                }).on("keypress", function(e) {
                                    13 === e.which && m.gotoMorePage(e)
                                })).appendTo(a);
                                var n = h.getOption("toolbar.items.pagination.pages.desktop.pagesNumber"),
                                    o = Math.ceil(m.meta.page / n) * n,
                                    i = o - n;
                                o > m.meta.pages && (o = m.meta.pages);
                                for (var l = i; l < o; l++) {
                                    var r = l + 1;
                                    b("<li/>").append(b("<a/>").addClass("m-datatable__pager-link m-datatable__pager-link-number").text(r).attr("data-page", r).attr("title", r).on("click", m.gotoPage)).appendTo(a)
                                }
                                b("<li/>").append(b("<a/>").attr("title", t.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-next").html(b("<i/>").addClass(e.more)).on("click", m.gotoMorePage)).appendTo(a), b("<li/>").append(b("<a/>").attr("title", t.next).addClass("m-datatable__pager-link m-datatable__pager-link--next").append(b("<i/>").addClass(e.next)).on("click", m.gotoMorePage)).appendTo(a), b("<li/>").append(b("<a/>").attr("title", t.last).addClass("m-datatable__pager-link m-datatable__pager-link--last").append(b("<i/>").addClass(e.last)).on("click", m.gotoMorePage).attr("data-page", m.meta.pages)).appendTo(a), h.getOption("toolbar.items.info") && (m.pagerLayout.info = b("<div/>").addClass("m-datatable__pager-info").append(b("<span/>").addClass("m-datatable__pager-detail"))), b.each(h.getOption("toolbar.layout"), function(e, t) {
                                    b(m.pagerLayout[t]).appendTo(m.pager)
                                });
                                var s = b("<select/>").addClass("selectpicker m-datatable__pager-size").attr("title", h.getOption("translate.toolbar.pagination.items.default.select")).attr("data-width", "70px").val(m.meta.perpage).on("change", m.updatePerpage).prependTo(m.pagerLayout.info),
                                    d = h.getOption("toolbar.items.pagination.pageSizeSelect");
                                0 == d.length && (d = [10, 20, 30, 50, 100]), b.each(d, function(e, t) {
                                    var a = t; - 1 === t && (a = "All"), b("<option/>").attr("value", t).html(a).appendTo(s)
                                }), b(g).ready(function() {
                                    b(".selectpicker").selectpicker().siblings(".dropdown-toggle").attr("title", h.getOption("translate.toolbar.pagination.items.default.select"))
                                }), m.paste()
                            },
                            paste: function() {
                                b.each(b.unique(h.getOption("toolbar.placement")), function(e, t) {
                                    "bottom" === t && b(m.pager).clone(!0).insertAfter(g.table), "top" === t && b(m.pager).clone(!0).addClass("m-datatable__pager--top").insertBefore(g.table)
                                })
                            },
                            gotoMorePage: function(e) {
                                if (e.preventDefault(), "disabled" === b(this).attr("disabled")) return !1;
                                var t = b(this).attr("data-page");
                                return void 0 === t && (t = b(e.target).attr("data-page")), m.openPage(parseInt(t)), !1
                            },
                            gotoPage: function(e) {
                                e.preventDefault(), b(this).hasClass("m-datatable__pager-link--active") || m.openPage(parseInt(b(this).data("page")))
                            },
                            openPage: function(e) {
                                m.meta.page = parseInt(e), b(g).trigger(m.paginateEvent, m.meta), m.callback(m, m.meta), b(m.pager).trigger("m-datatable--on-goto-page", m.meta)
                            },
                            updatePerpage: function(e) {
                                e.preventDefault(), null === h.getOption("layout.height") && b("html, body").animate({
                                    scrollTop: b(g).position().top
                                }), m.pager = b(g.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded"), e.originalEvent && (m.meta.perpage = parseInt(b(this).val())), b(m.pager).find("select.m-datatable__pager-size").val(m.meta.perpage).attr("data-selected", m.meta.perpage), h.setDataSourceParam("pagination", {
                                    page: m.meta.page,
                                    pages: m.meta.pages,
                                    perpage: m.meta.perpage,
                                    total: m.meta.total
                                }), b(m.pager).trigger("m-datatable--on-update-perpage", m.meta), b(g).trigger(m.paginateEvent, m.meta), m.callback(m, m.meta), m.updateInfo.call()
                            },
                            addPaginateEvent: function(e) {
                                b(g).off(m.paginateEvent).on(m.paginateEvent, function(e, t) {
                                    h.spinnerCallback(!0), m.pager = b(g.table).siblings(".m-datatable__pager");
                                    var a = b(m.pager).find(".m-datatable__pager-nav");
                                    b(a).find(".m-datatable__pager-link--active").removeClass("m-datatable__pager-link--active"), b(a).find('.m-datatable__pager-link-number[data-page="' + t.page + '"]').addClass("m-datatable__pager-link--active"), b(a).find(".m-datatable__pager-link--prev").attr("data-page", Math.max(t.page - 1, 1)), b(a).find(".m-datatable__pager-link--next").attr("data-page", Math.min(t.page + 1, t.pages)), b(m.pager).each(function() {
                                        b(this).find('.m-pager-input[type="text"]').prop("value", t.page)
                                    }), b(m.pager).find(".m-datatable__pager-nav").show(), t.pages <= 1 && b(m.pager).find(".m-datatable__pager-nav").hide(), h.setDataSourceParam("pagination", {
                                        page: m.meta.page,
                                        pages: m.meta.pages,
                                        perpage: m.meta.perpage,
                                        total: m.meta.total
                                    }), b(m.pager).find("select.m-datatable__pager-size").val(t.perpage).attr("data-selected", t.perpage), b(g.table).find('.m-checkbox > [type="checkbox"]').prop("checked", !1), b(g.table).find(".m-datatable__row--active").removeClass("m-datatable__row--active"), m.updateInfo.call(), m.pagingBreakpoint.call()
                                })
                            },
                            updateInfo: function() {
                                var e = Math.max(m.meta.perpage * (m.meta.page - 1) + 1, 1),
                                    t = Math.min(e + m.meta.perpage - 1, m.meta.total);
                                b(m.pager).find(".m-datatable__pager-info").find(".m-datatable__pager-detail").html(h.dataPlaceholder(h.getOption("translate.toolbar.pagination.items.info"), {
                                    start: e,
                                    end: -1 === m.meta.perpage ? m.meta.total : t,
                                    pageSize: -1 === m.meta.perpage || m.meta.perpage >= m.meta.total ? m.meta.total : m.meta.perpage,
                                    total: m.meta.total
                                }))
                            },
                            pagingBreakpoint: function() {
                                var a = b(g.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav");
                                if (0 !== b(a).length) {
                                    var n = h.getCurrentPage(),
                                        o = b(a).find(".m-pager-input").closest("li");
                                    b(a).find("li").show(), b.each(h.getOption("toolbar.items.pagination.pages"), function(e, t) {
                                        if (mUtil.isInResponsiveRange(e)) {
                                            switch (e) {
                                                case "desktop":
                                                case "tablet":
                                                    Math.ceil(n / t.pagesNumber), t.pagesNumber, t.pagesNumber;
                                                    b(o).hide(), m.meta = h.getDataSourceParam("pagination"), m.paginationUpdate();
                                                    break;
                                                case "mobile":
                                                    b(o).show(), b(a).find(".m-datatable__pager-link--more-prev").closest("li").hide(), b(a).find(".m-datatable__pager-link--more-next").closest("li").hide(), b(a).find(".m-datatable__pager-link-number").closest("li").hide()
                                            }
                                            return !1
                                        }
                                    })
                                }
                            },
                            paginationUpdate: function() {
                                var e = b(g.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav"),
                                    t = b(e).find(".m-datatable__pager-link--more-prev"),
                                    a = b(e).find(".m-datatable__pager-link--more-next"),
                                    n = b(e).find(".m-datatable__pager-link--first"),
                                    o = b(e).find(".m-datatable__pager-link--prev"),
                                    i = b(e).find(".m-datatable__pager-link--next"),
                                    l = b(e).find(".m-datatable__pager-link--last"),
                                    r = b(e).find(".m-datatable__pager-link-number"),
                                    s = Math.max(b(r).first().data("page") - 1, 1);
                                b(t).each(function(e, t) {
                                    b(t).attr("data-page", s)
                                }), 1 === s ? b(t).parent().hide() : b(t).parent().show();
                                var d = Math.min(b(r).last().data("page") + 1, m.meta.pages);
                                b(a).each(function(e, t) {
                                    b(a).attr("data-page", d).show()
                                }), d === m.meta.pages && d === b(r).last().data("page") ? b(a).parent().hide() : b(a).parent().show(), 1 === m.meta.page ? (b(n).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), b(o).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (b(n).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), b(o).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled")), m.meta.page === m.meta.pages ? (b(i).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), b(l).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (b(i).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), b(l).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"));
                                var c = h.getOption("toolbar.items.pagination.navigation");
                                c.first || b(n).remove(), c.prev || b(o).remove(), c.next || b(i).remove(), c.last || b(l).remove()
                            }
                        };
                        return m.init(e), m
                    },
                    columnHide: function() {
                        var o = mUtil.getViewPort().width;
                        b.each(f.columns, function(e, t) {
                            if (void 0 !== t.responsive) {
                                var a = t.field,
                                    n = b.grep(b(g.table).find(".m-datatable__cell"), function(e, t) {
                                        return a === b(e).data("field")
                                    });
                                mUtil.getBreakpoint(t.responsive.hidden) >= o ? b(n).hide() : b(n).show(), mUtil.getBreakpoint(t.responsive.visible) <= o ? b(n).show() : b(n).hide()
                            }
                        })
                    },
                    setupSubDatatable: function() {
                        var l = h.getOption("detail.content");
                        if ("function" == typeof l && !(0 < b(g.table).find(".m-datatable__subtable").length)) {
                            b(g.wrap).addClass("m-datatable--subtable"), f.columns[0].subtable = !0;
                            var o = function(a) {
                                    a.preventDefault();
                                    var e = b(this).closest(".m-datatable__row"),
                                        t = b(e).next(".m-datatable__row-subtable");
                                    0 === b(t).length && (t = b("<tr/>").addClass("m-datatable__row-subtable m-datatable__row-loading").hide().append(b("<td/>").addClass("m-datatable__subtable").attr("colspan", h.getTotalColumns())), b(e).after(t), b(e).hasClass("m-datatable__row--even") && b(t).addClass("m-datatable__row-subtable--even")), b(t).toggle();
                                    var n = b(t).find(".m-datatable__subtable"),
                                        o = b(this).closest("[data-field]:first-child").find(".m-datatable__toggle-subtable").data("value"),
                                        i = b(this).find("i").removeAttr("class");
                                    b(e).hasClass("m-datatable__row--subtable-expanded") ? (b(i).addClass(h.getOption("layout.icons.rowDetail.collapse")), b(e).removeClass("m-datatable__row--subtable-expanded"), b(g).trigger("m-datatable--on-collapse-subtable", [e])) : (b(i).addClass(h.getOption("layout.icons.rowDetail.expand")), b(e).addClass("m-datatable__row--subtable-expanded"), b(g).trigger("m-datatable--on-expand-subtable", [e])), 0 === b(n).find(".m-datatable").length && (b.map(g.dataSet, function(e, t) {
                                        return o === e[f.columns[0].field] && (a.data = e, !0)
                                    }), a.detailCell = n, a.parentRow = e, a.subTable = n, l(a), b(n).children(".m-datatable").on("m-datatable--on-init", function(e) {
                                        b(t).removeClass("m-datatable__row-loading")
                                    }), "local" === h.getOption("data.type") && b(t).removeClass("m-datatable__row-loading"))
                                },
                                i = f.columns;
                            b(g.tableBody).find(".m-datatable__row").each(function(e, t) {
                                b(t).find(".m-datatable__cell").each(function(e, a) {
                                    var t = b.grep(i, function(e, t) {
                                        return b(a).data("field") === e.field
                                    })[0];
                                    if (void 0 !== t) {
                                        var n = b(a).text();
                                        if (void 0 !== t.subtable && t.subtable) {
                                            if (0 < b(a).find(".m-datatable__toggle-subtable").length) return;
                                            b(a).html(b("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", n).attr("title", h.getOption("detail.title")).on("click", o).append(b("<i/>").css("width", b(a).data("width")).addClass(h.getOption("layout.icons.rowDetail.collapse"))))
                                        }
                                    }
                                })
                            })
                        }
                    },
                    dataMapCallback: function(e) {
                        var t = e;
                        return "function" == typeof h.getOption("data.source.read.map") ? h.getOption("data.source.read.map")(e) : (void 0 !== e.data && (t = e.data), t)
                    },
                    isSpinning: !1,
                    spinnerCallback: function(e) {
                        if (e) {
                            if (!h.isSpinning) {
                                var t = h.getOption("layout.spinner");
                                !0 === t.message && (t.message = h.getOption("translate.records.processing")), h.isSpinning = !0, void 0 !== mApp && mApp.block(g, t)
                            }
                        } else h.isSpinning = !1, void 0 !== mApp && mApp.unblock(g)
                    },
                    sortCallback: function(e, i, t) {
                        var l = t.type || "string",
                            r = t.format || "",
                            s = t.field;
                        if ("date" === l && "undefined" == typeof moment) throw new Error("Moment.js is required.");
                        return b(e).sort(function(e, t) {
                            var a = e[s],
                                n = t[s];
                            switch (l) {
                                case "date":
                                    var o = moment(a, r).diff(moment(n, r));
                                    return "asc" === i ? 0 < o ? 1 : o < 0 ? -1 : 0 : o < 0 ? 1 : 0 < o ? -1 : 0;
                                case "number":
                                    return isNaN(parseFloat(a)) && null != a && (a = Number(a.replace(/[^0-9\.-]+/g, ""))), isNaN(parseFloat(n)) && null != n && (n = Number(n.replace(/[^0-9\.-]+/g, ""))), a = parseFloat(a), n = parseFloat(n), "asc" === i ? n < a ? 1 : a < n ? -1 : 0 : a < n ? 1 : n < a ? -1 : 0;
                                case "string":
                                default:
                                    return "asc" === i ? n < a ? 1 : a < n ? -1 : 0 : a < n ? 1 : n < a ? -1 : 0
                            }
                        })
                    },
                    log: function(e, t) {
                        void 0 === t && (t = ""), g.debug && console.log(e, t)
                    },
                    autoHide: function() {
                        b(g.table).find(".m-datatable__cell").show(), b(g.tableBody).each(function() {
                            for (; b(this)[0].offsetWidth < b(this)[0].scrollWidth;) b(g.table).find(".m-datatable__row").each(function(e) {
                                var t = b(this).find(".m-datatable__cell").not(":hidden").last();
                                b(t).hide()
                            }), h.adjustCellsWidth.call()
                        });
                        var e = function(e) {
                            e.preventDefault();
                            var t = b(this).closest(".m-datatable__row"),
                                a = b(t).next();
                            if (b(a).hasClass("m-datatable__row-detail")) b(this).find("i").removeClass(h.getOption("layout.icons.rowDetail.expand")).addClass(h.getOption("layout.icons.rowDetail.collapse")), b(a).remove();
                            else {
                                b(this).find("i").removeClass(h.getOption("layout.icons.rowDetail.collapse")).addClass(h.getOption("layout.icons.rowDetail.expand"));
                                var n = b(t).find(".m-datatable__cell:hidden").clone().show();
                                a = b("<tr/>").addClass("m-datatable__row-detail").insertAfter(t);
                                var o = b("<td/>").addClass("m-datatable__detail").attr("colspan", h.getTotalColumns()).appendTo(a),
                                    i = b("<table/>");
                                b(n).each(function() {
                                    var a = b(this).data("field"),
                                        e = b.grep(f.columns, function(e, t) {
                                            return a === e.field
                                        })[0];
                                    b(i).append(b('<tr class="m-datatable__row"></tr>').append(b('<td class="m-datatable__cell"></td>').append(b("<span/>").css("width", h.offset).append(e.title))).append(this))
                                }), b(o).append(i)
                            }
                        };
                        b(g.tableBody).find(".m-datatable__row").each(function() {
                            b(this).prepend(b("<td/>").addClass("m-datatable__cell m-datatable__toggle--detail").append(b("<a/>").addClass("m-datatable__toggle-detail").attr("href", "#").on("click", e).append(b("<i/>").css("width", "21px").addClass(h.getOption("layout.icons.rowDetail.collapse"))))), 0 === b(g.tableHead).find(".m-datatable__toggle-detail").length ? (b(g.tableHead).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>'), b(g.tableFoot).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>')) : b(g.tableHead).find(".m-datatable__toggle-detail").find("span").css("width", "21px")
                        })
                    },
                    hoverColumn: function() {
                        b(g.tableBody).on("mouseenter", ".m-datatable__cell", function() {
                            var e = b(h.cell(this).nodes()).index();
                            b(h.cells().nodes()).removeClass("m-datatable__cell--hover"), b(h.column(e).nodes()).addClass("m-datatable__cell--hover")
                        })
                    },
                    setAutoColumns: function() {
                        h.getOption("data.autoColumns") && (b.each(g.dataSet[0], function(a, e) {
                            0 === b.grep(f.columns, function(e, t) {
                                return a === e.field
                            }).length && f.columns.push({
                                field: a,
                                title: a
                            })
                        }), b(g.tableHead).find(".m-datatable__row").remove(), h.setHeadTitle(), h.getOption("layout.footer") && (b(g.tableFoot).find(".m-datatable__row").remove(), h.setHeadTitle(g.tableFoot)))
                    },
                    isLocked: function() {
                        return b(g.wrap).hasClass("m-datatable--lock") || !1
                    },
                    replaceTableContent: function(e, t) {
                        void 0 === t && (t = g.tableBody), b(t).hasClass("mCustomScrollbar") ? b(t).find(".mCSB_container").html(e) : b(t).html(e)
                    },
                    getExtraSpace: function(e) {
                        return parseInt(b(e).css("paddingRight")) + parseInt(b(e).css("paddingLeft")) + (parseInt(b(e).css("marginRight")) + parseInt(b(e).css("marginLeft"))) + Math.ceil(b(e).css("border-right-width").replace("px", ""))
                    },
                    dataPlaceholder: function(e, t) {
                        var a = e;
                        return b.each(t, function(e, t) {
                            a = a.replace("{{" + e + "}}", t)
                        }), a
                    },
                    getTableId: function(e) {
                        void 0 === e && (e = "");
                        var t = b(g).attr("id");
                        return void 0 === t && (t = b(g).attr("class").split(" ")[0]), t + e
                    },
                    getTablePrefix: function(e) {
                        return void 0 !== e && (e = "-" + e), h.getTableId() + "-" + h.getDepth() + e
                    },
                    getDepth: function() {
                        for (var e = 0, t = g.table; t = b(t).parents(".m-datatable__table"), e++, 0 < b(t).length;);
                        return e
                    },
                    stateKeep: function(e, t) {
                        e = h.getTablePrefix(e), !1 !== h.getOption("data.saveState") && (h.getOption("data.saveState.webstorage") && localStorage && localStorage.setItem(e, JSON.stringify(t)), h.getOption("data.saveState.cookie") && Cookies.set(e, JSON.stringify(t)))
                    },
                    stateGet: function(e, t) {
                        if (e = h.getTablePrefix(e), !1 !== h.getOption("data.saveState")) {
                            var a = null;
                            return null != (a = h.getOption("data.saveState.webstorage") && localStorage ? localStorage.getItem(e) : Cookies.get(e)) ? JSON.parse(a) : void 0
                        }
                    },
                    stateUpdate: function(e, t) {
                        var a = h.stateGet(e);
                        null == a && (a = {}), h.stateKeep(e, b.extend({}, a, t))
                    },
                    stateRemove: function(e) {
                        e = h.getTablePrefix(e), localStorage && localStorage.removeItem(e), Cookies.remove(e)
                    },
                    getTotalColumns: function(e) {
                        return void 0 === e && (e = g.tableBody), b(e).find(".m-datatable__row").first().find(".m-datatable__cell").length
                    },
                    getOneRow: function(e, t, a) {
                        void 0 === a && (a = !0);
                        var n = b(e).find(".m-datatable__row:not(.m-datatable__row-detail):nth-child(" + t + ")");
                        return a && (n = n.find(".m-datatable__cell")), n
                    },
                    hasOverflowY: function(e) {
                        var t = b(e).find(".m-datatable__row"),
                            a = 0;
                        return 0 < t.length && (b(t).each(function(e, t) {
                            a += Math.floor(b(t).innerHeight())
                        }), a > b(e).innerHeight())
                    },
                    sortColumn: function(e, o, i) {
                        void 0 === o && (o = "asc"), void 0 === i && (i = !1);
                        var l = b(e).index(),
                            t = b(g.tableBody).find(".m-datatable__row"),
                            a = b(e).closest(".m-datatable__lock").index(); - 1 !== a && (t = b(g.tableBody).find(".m-datatable__lock:nth-child(" + (a + 1) + ")").find(".m-datatable__row"));
                        var n = b(t).parent();
                        b(t).sort(function(e, t) {
                            var a = b(e).find("td:nth-child(" + l + ")").text(),
                                n = b(t).find("td:nth-child(" + l + ")").text();
                            return i && (a = parseInt(a), n = parseInt(n)), "asc" === o ? n < a ? 1 : a < n ? -1 : 0 : a < n ? 1 : n < a ? -1 : 0
                        }).appendTo(n)
                    },
                    sorting: function() {
                        var i = {
                            init: function() {
                                f.sortable && (b(g.tableHead).find(".m-datatable__cell:not(.m-datatable__cell--check)").addClass("m-datatable__cell--sort").off("click").on("click", i.sortClick), i.setIcon())
                            },
                            setIcon: function() {
                                var e = h.getDataSourceParam("sort");
                                if (!b.isEmptyObject(e)) {
                                    var t = b(g.tableHead).find('.m-datatable__cell[data-field="' + e.field + '"]').attr("data-sort", e.sort),
                                        a = b(t).find("span"),
                                        n = b(a).find("i"),
                                        o = h.getOption("layout.icons.sort");
                                    0 < b(n).length ? b(n).removeAttr("class").addClass(o[e.sort]) : b(a).append(b("<i/>").addClass(o[e.sort]))
                                }
                            },
                            sortClick: function(e) {
                                var t = h.getDataSourceParam("sort"),
                                    a = b(this).data("field"),
                                    n = h.getColumnByField(a);
                                if ((void 0 === n.sortable || !1 !== n.sortable) && (b(g.tableHead).find(".m-datatable__cell > span > i").remove(), f.sortable)) {
                                    h.spinnerCallback(!0);
                                    var o = "desc";
                                    h.getObject("field", t) === a && (o = h.getObject("sort", t)), t = {
                                        field: a,
                                        sort: o = void 0 === o || "desc" === o ? "asc" : "desc"
                                    }, h.setDataSourceParam("sort", t), i.setIcon(), setTimeout(function() {
                                        h.dataRender("sort"), b(g).trigger("m-datatable--on-sort", t)
                                    }, 300)
                                }
                            }
                        };
                        i.init()
                    },
                    localDataUpdate: function() {
                        var a = h.getDataSourceParam();
                        void 0 === g.originalDataSet && (g.originalDataSet = g.dataSet);
                        var e = h.getObject("sort.field", a),
                            t = h.getObject("sort.sort", a),
                            n = h.getColumnByField(e);
                        if (void 0 !== n && !0 !== h.getOption("data.serverSorting") ? "function" == typeof n.sortCallback ? g.dataSet = n.sortCallback(g.originalDataSet, t, n) : g.dataSet = h.sortCallback(g.originalDataSet, t, n) : g.dataSet = g.originalDataSet, "object" == typeof a.query && !h.getOption("data.serverFiltering")) {
                            a.query = a.query || {};
                            var o = b(h.getOption("search.input")).val();
                            void 0 !== o && "" !== o && (o = o.toLowerCase(), g.dataSet = b.grep(g.dataSet, function(e) {
                                for (var t in e)
                                    if (e.hasOwnProperty(t) && "string" == typeof e[t] && -1 < e[t].toLowerCase().indexOf(o)) return !0;
                                return !1
                            }), delete a.query[h.getGeneralSearchKey()]), b.each(a.query, function(e, t) {
                                "" === t && delete a.query[e]
                            }), g.dataSet = h.filterArray(g.dataSet, a.query), g.dataSet = g.dataSet.filter(function() {
                                return !0
                            })
                        }
                        return g.dataSet
                    },
                    filterArray: function(e, o, i) {
                        if ("object" != typeof e) return [];
                        if (void 0 === i && (i = "AND"), "object" != typeof o) return e;
                        if (i = i.toUpperCase(), -1 === b.inArray(i, ["AND", "OR", "NOT"])) return [];
                        var l = Object.keys(o).length,
                            r = [];
                        return b.each(e, function(e, t) {
                            var a = t,
                                n = 0;
                            b.each(o, function(e, t) {
                                t = t instanceof Array ? t : [t], a.hasOwnProperty(e) && (a[e] = a[e].toString(), -1 !== b.inArray(a[e], t) && n++)
                            }), ("AND" == i && n == l || "OR" == i && 0 < n || "NOT" == i && 0 == n) && (r[e] = t)
                        }), e = r
                    },
                    resetScroll: function() {
                        void 0 === f.detail && 1 === h.getDepth() && (b(g.table).find(".m-datatable__row").css("left", 0), b(g.table).find(".m-datatable__lock").css("top", 0), b(g.tableBody).scrollTop(0))
                    },
                    getColumnByField: function(a) {
                        var n;
                        if (void 0 !== a) return b.each(f.columns, function(e, t) {
                            if (a === t.field) return n = t, !1
                        }), n
                    },
                    getDefaultSortColumn: function() {
                        var a;
                        return b.each(f.columns, function(e, t) {
                            if (void 0 !== t.sortable && -1 !== b.inArray(t.sortable, ["asc", "desc"])) return !(a = {
                                sort: t.sortable,
                                field: t.field
                            })
                        }), a
                    },
                    getHiddenDimensions: function(e, t) {
                        var n = {
                                position: "absolute",
                                visibility: "hidden",
                                display: "block"
                            },
                            a = {
                                width: 0,
                                height: 0,
                                innerWidth: 0,
                                innerHeight: 0,
                                outerWidth: 0,
                                outerHeight: 0
                            },
                            o = b(e).parents().addBack().not(":visible");
                        t = "boolean" == typeof t && t;
                        var i = [];
                        return o.each(function() {
                            var e = {};
                            for (var t in n) e[t] = this.style[t], this.style[t] = n[t];
                            i.push(e)
                        }), a.width = b(e).width(), a.outerWidth = b(e).outerWidth(t), a.innerWidth = b(e).innerWidth(), a.height = b(e).height(), a.innerHeight = b(e).innerHeight(), a.outerHeight = b(e).outerHeight(t), o.each(function(e) {
                            var t = i[e];
                            for (var a in n) this.style[a] = t[a]
                        }), a
                    },
                    getGeneralSearchKey: function() {
                        var e = b(h.getOption("search.input"));
                        return b(e).prop("name") || b(e).prop("id")
                    },
                    getObject: function(e, t) {
                        return e.split(".").reduce(function(e, t) {
                            return null !== e && void 0 !== e[t] ? e[t] : null
                        }, t)
                    },
                    extendObj: function(e, t, n) {
                        var o = t.split("."),
                            i = 0;
                        return function e(t) {
                            var a = o[i++];
                            void 0 !== t[a] && null !== t[a] ? "object" != typeof t[a] && "function" != typeof t[a] && (t[a] = {}) : t[a] = {}, i === o.length ? t[a] = n : e(t[a])
                        }(e), e
                    },
                    timer: 0,
                    redraw: function() {
                        return h.adjustCellsWidth.call(), h.isLocked() && (h.scrollbar(), h.resetScroll(), h.adjustCellsHeight.call()), h.adjustLockContainer.call(), h.initHeight.call(), g
                    },
                    load: function() {
                        return h.reload(), g
                    },
                    reload: function() {
                        return function(e, t) {
                            clearTimeout(h.timer), h.timer = setTimeout(e, t)
                        }(function() {
                            f.data.serverFiltering || h.localDataUpdate(), h.dataRender(), b(g).trigger("m-datatable--on-reloaded")
                        }, h.getOption("search.delay")), g
                    },
                    getRecord: function(n) {
                        return void 0 === g.tableBody && (g.tableBody = b(g.table).children("tbody")), b(g.tableBody).find(".m-datatable__cell:first-child").each(function(e, t) {
                            if (n == b(t).text()) {
                                var a = b(t).closest(".m-datatable__row").index() + 1;
                                return g.API.record = g.API.value = h.getOneRow(g.tableBody, a), g
                            }
                        }), g
                    },
                    getColumn: function(e) {
                        return h.setSelectedRecords(), g.API.value = b(g.API.record).find('[data-field="' + e + '"]'), g
                    },
                    destroy: function() {
                        b(g).parent().find(".m-datatable__pager").remove();
                        var e = b(g.initialDatatable).addClass("m-datatable--destroyed").show();
                        return b(g).replaceWith(e), b(g = e).trigger("m-datatable--on-destroy"), h.isInit = !1, e = null
                    },
                    sort: function(e, t) {
                        t = void 0 === t ? "asc" : t, h.spinnerCallback(!0);
                        var a = {
                            field: e,
                            sort: t
                        };
                        return h.setDataSourceParam("sort", a), setTimeout(function() {
                            h.dataRender("sort"), b(g).trigger("m-datatable--on-sort", a), b(g.tableHead).find(".m-datatable__cell > span > i").remove()
                        }, 300), g
                    },
                    getValue: function() {
                        return b(g.API.value).text()
                    },
                    setActive: function(e) {
                        "string" == typeof e && (e = b(g.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + e + '"]')), b(e).prop("checked", !0);
                        var t = b(e).closest(".m-datatable__row").addClass("m-datatable__row--active"),
                            a = b(t).index() + 1;
                        b(t).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").addClass("m-datatable__row--active");
                        var n = [];
                        b(t).each(function(e, t) {
                            var a = b(t).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
                            void 0 !== a && n.push(a)
                        }), b(g).trigger("m-datatable--on-check", [n])
                    },
                    setInactive: function(e) {
                        "string" == typeof e && (e = b(g.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + e + '"]')), b(e).prop("checked", !1);
                        var t = b(e).closest(".m-datatable__row").removeClass("m-datatable__row--active"),
                            a = b(t).index() + 1;
                        b(t).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").removeClass("m-datatable__row--active");
                        var n = [];
                        b(t).each(function(e, t) {
                            var a = b(t).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
                            void 0 !== a && n.push(a)
                        }), b(g).trigger("m-datatable--on-uncheck", [n])
                    },
                    setActiveAll: function(e) {
                        var t = b(g.table).find(".m-datatable__body .m-datatable__row").find('.m-datatable__cell .m-checkbox [type="checkbox"]');
                        e ? h.setActive(t) : h.setInactive(t)
                    },
                    setSelectedRecords: function() {
                        return g.API.record = b(g.tableBody).find(".m-datatable__row--active"), g
                    },
                    getSelectedRecords: function() {
                        return h.setSelectedRecords(), g.API.record = g.rows(".m-datatable__row--active").nodes(), g.API.record
                    },
                    getOption: function(e) {
                        return h.getObject(e, f)
                    },
                    setOption: function(e, t) {
                        f = h.extendObj(f, e, t)
                    },
                    search: function(n, t) {
                        void 0 !== t && (t = b.makeArray(t)), e = function() {
                            var a = h.getDataSourceQuery();
                            if (void 0 === t && void 0 !== n) {
                                var e = h.getGeneralSearchKey();
                                a[e] = n
                            }
                            "object" == typeof t && (b.each(t, function(e, t) {
                                a[t] = n
                            }), b.each(a, function(e, t) {
                                ("" === t || b.isEmptyObject(t)) && delete a[e]
                            })), h.setDataSourceQuery(a), f.data.serverFiltering || h.localDataUpdate(), h.dataRender("search")
                        }, a = h.getOption("search.delay"), clearTimeout(h.timer), h.timer = setTimeout(e, a);
                        var e, a
                    },
                    setDataSourceParam: function(e, t) {
                        g.API.params = b.extend({}, {
                            pagination: {
                                page: 1,
                                perpage: h.getOption("data.pageSize")
                            },
                            sort: h.getDefaultSortColumn(),
                            query: {}
                        }, g.API.params, h.stateGet(h.stateId)), g.API.params = h.extendObj(g.API.params, e, t), h.stateKeep(h.stateId, g.API.params)
                    },
                    getDataSourceParam: function(e) {
                        return g.API.params = b.extend({}, {
                            pagination: {
                                page: 1,
                                perpage: h.getOption("data.pageSize")
                            },
                            sort: h.getDefaultSortColumn(),
                            query: {}
                        }, g.API.params, h.stateGet(h.stateId)), "string" == typeof e ? h.getObject(e, g.API.params) : g.API.params
                    },
                    getDataSourceQuery: function() {
                        return h.getDataSourceParam("query") || {}
                    },
                    setDataSourceQuery: function(e) {
                        h.setDataSourceParam("query", e)
                    },
                    getCurrentPage: function() {
                        return b(g.table).siblings(".m-datatable__pager").last().find(".m-datatable__pager-nav").find(".m-datatable__pager-link.m-datatable__pager-link--active").data("page") || 1
                    },
                    getPageSize: function() {
                        return b(g.table).siblings(".m-datatable__pager").last().find("select.m-datatable__pager-size").val() || 10
                    },
                    getTotalRows: function() {
                        return g.API.params.pagination.total
                    },
                    getDataSet: function() {
                        return g.originalDataSet
                    },
                    hideColumn: function(a) {
                        b.map(f.columns, function(e) {
                            return a === e.field && (e.responsive = {
                                hidden: "xl"
                            }), e
                        });
                        var e = b.grep(b(g.table).find(".m-datatable__cell"), function(e, t) {
                            return a === b(e).data("field")
                        });
                        b(e).hide()
                    },
                    showColumn: function(a) {
                        b.map(f.columns, function(e) {
                            return a === e.field && delete e.responsive, e
                        });
                        var e = b.grep(b(g.table).find(".m-datatable__cell"), function(e, t) {
                            return a === b(e).data("field")
                        });
                        b(e).show()
                    },
                    destroyScroller: function(e) {
                        void 0 === e && (e = g.tableBody), b(e).each(function() {
                            if (b(this).hasClass("mCustomScrollbar")) try {
                                mApp.destroyScroller(b(this))
                            } catch (e) {
                                console.log(e)
                            }
                        })
                    },
                    nodeTr: [],
                    nodeTd: [],
                    nodeCols: [],
                    recentNode: [],
                    table: function() {
                        return g.table
                    },
                    row: function(e) {
                        return h.rows(e), h.nodeTr = h.recentNode = b(h.nodeTr).first(), g
                    },
                    rows: function(e) {
                        return h.nodeTr = h.recentNode = b(g.tableBody).find(e).filter(".m-datatable__row"), g
                    },
                    column: function(e) {
                        return h.nodeCols = h.recentNode = b(g.tableBody).find(".m-datatable__cell:nth-child(" + (e + 1) + ")"), g
                    },
                    columns: function(e) {
                        var t = g.table;
                        h.nodeTr === h.recentNode && (t = h.nodeTr);
                        var a = b(t).find('.m-datatable__cell[data-field="' + e + '"]');
                        return 0 < a.length ? h.nodeCols = h.recentNode = a : h.nodeCols = h.recentNode = b(t).find(e).filter(".m-datatable__cell"), g
                    },
                    cell: function(e) {
                        return h.cells(e), h.nodeTd = h.recentNode = b(h.nodeTd).first(), g
                    },
                    cells: function(e) {
                        var t = b(g.tableBody).find(".m-datatable__cell");
                        return void 0 !== e && (t = b(t).filter(e)), h.nodeTd = h.recentNode = t, g
                    },
                    remove: function() {
                        return b(h.nodeTr.length) && h.nodeTr === h.recentNode && b(h.nodeTr).remove(), h.layoutUpdate(), g
                    },
                    visible: function(e) {
                        if (b(h.recentNode.length)) {
                            var t = h.lockEnabledColumns();
                            if (h.recentNode === h.nodeCols) {
                                var a = h.recentNode.index();
                                if (h.isLocked()) {
                                    var n = b(h.recentNode).closest(".m-datatable__lock--scroll").length;
                                    n ? a += t.left.length + 1 : b(h.recentNode).closest(".m-datatable__lock--right").length && (a += t.left.length + n + 1)
                                }
                            }
                            e ? (h.recentNode === h.nodeCols && delete f.columns[a].responsive, b(h.recentNode).show()) : (h.recentNode === h.nodeCols && h.setOption("columns." + a + ".responsive", {
                                hidden: "xl"
                            }), b(h.recentNode).hide()), h.redraw()
                        }
                    },
                    nodes: function() {
                        return h.recentNode
                    },
                    dataset: function() {
                        return g
                    }
                };
                if (b.each(h, function(e, t) {
                        g[e] = t
                    }), void 0 !== f)
                    if ("string" == typeof f) {
                        var e = f;
                        void 0 !== (g = b(this).data("mDatatable")) && (f = g.options, h[e].apply(this, Array.prototype.slice.call(arguments, 1)))
                    } else g.data("mDatatable") || b(this).hasClass("m-datatable--loaded") || (g.dataSet = null, g.textAlign = {
                        left: "m-datatable__cell--left",
                        center: "m-datatable__cell--center",
                        right: "m-datatable__cell--right"
                    }, f = b.extend(!0, {}, b.fn.mDatatable.defaults, f), g.options = f, h.init.apply(this, [f]), b(g.wrap).data("mDatatable", g));
                else void 0 === (g = b(this).data("mDatatable")) && b.error("mDatatable not initialized"), f = g.options;
                return g
            }
            console.log("No mDatatable element exist.")
        }, b.fn.mDatatable.defaults = {
            data: {
                type: "local",
                source: null,
                pageSize: 10,
                saveState: {
                    cookie: !1,
                    webstorage: !0
                },
                serverPaging: !1,
                serverFiltering: !1,
                serverSorting: !1,
                autoColumns: !1,
                attr: {
                    rowProps: []
                }
            },
            layout: {
                theme: "default",
                class: "m-datatable--brand",
                scroll: !1,
                height: null,
                minHeight: 300,
                footer: !1,
                header: !0,
                smoothScroll: {
                    scrollbarShown: !0
                },
                spinner: {
                    overlayColor: "#000000",
                    opacity: 0,
                    type: "loader",
                    state: "brand",
                    message: !0
                },
                icons: {
                    sort: {
                        asc: "la la-arrow-up",
                        desc: "la la-arrow-down"
                    },
                    pagination: {
                        next: "la la-angle-right",
                        prev: "la la-angle-left",
                        first: "la la-angle-double-left",
                        last: "la la-angle-double-right",
                        more: "la la-ellipsis-h"
                    },
                    rowDetail: {
                        expand: "fa fa-caret-down",
                        collapse: "fa fa-caret-right"
                    }
                }
            },
            sortable: !0,
            resizable: !1,
            filterable: !1,
            pagination: !0,
            editable: !1,
            columns: [],
            search: {
                onEnter: !1,
                input: null,
                delay: 400
            },
            rows: {
                callback: function() {},
                beforeTemplate: function() {},
                afterTemplate: function() {},
                autoHide: !1
            },
            toolbar: {
                layout: ["pagination", "info"],
                placement: ["bottom"],
                items: {
                    pagination: {
                        type: "default",
                        pages: {
                            desktop: {
                                layout: "default",
                                pagesNumber: 6
                            },
                            tablet: {
                                layout: "default",
                                pagesNumber: 3
                            },
                            mobile: {
                                layout: "compact"
                            }
                        },
                        navigation: {
                            prev: !0,
                            next: !0,
                            first: !0,
                            last: !0
                        },
                        pageSizeSelect: []
                    },
                    info: !0
                }
            },
            translate: {
                records: {
                    processing: "Please wait...",
                    noRecords: "No records found"
                },
                toolbar: {
                    pagination: {
                        items: {
                            default: {
                                first: "First",
                                prev: "Previous",
                                next: "Next",
                                last: "Last",
                                more: "More pages",
                                input: "Page number",
                                select: "Select page size"
                            },
                            info: "Displaying {{start}} - {{end}} of {{total}} records"
                        }
                    }
                }
            },
            extensions: {}
        }
    }(jQuery);
var mDropdown = function(e, t) {
    var o = this,
        n = mUtil.get(e),
        i = mUtil.get("body");
    if (n) {
        var a = {
                toggle: "click",
                hoverTimeout: 300,
                skin: "light",
                height: "auto",
                maxHeight: !1,
                minHeight: !1,
                persistent: !1,
                mobileOverlay: !0
            },
            l = {
                construct: function(e) {
                    return mUtil.data(n).has("dropdown") ? o = mUtil.data(n).get("dropdown") : (l.init(e), l.setup(), mUtil.data(n).set("dropdown", o)), o
                },
                init: function(e) {
                    o.options = mUtil.deepExtend({}, a, e), o.events = [], o.eventHandlers = {}, o.open = !1, o.layout = {}, o.layout.close = mUtil.find(n, ".m-dropdown__close"), o.layout.toggle = mUtil.find(n, ".m-dropdown__toggle"), o.layout.arrow = mUtil.find(n, ".m-dropdown__arrow"), o.layout.wrapper = mUtil.find(n, ".m-dropdown__wrapper"), o.layout.defaultDropPos = mUtil.hasClass(n, "m-dropdown--up") ? "up" : "down", o.layout.currentDropPos = o.layout.defaultDropPos, "hover" == mUtil.attr(n, "m-dropdown-toggle") && (o.options.toggle = "hover")
                },
                setup: function() {
                    o.options.placement && mUtil.addClass(n, "m-dropdown--" + o.options.placement), o.options.align && mUtil.addClass(n, "m-dropdown--align-" + o.options.align), o.options.width && mUtil.css(o.layout.wrapper, "width", o.options.width + "px"), "1" == mUtil.attr(n, "m-dropdown-persistent") && (o.options.persistent = !0), "hover" == o.options.toggle && mUtil.addEvent(n, "mouseout", l.hide), l.setZindex()
                },
                toggle: function() {
                    return o.open ? l.hide() : l.show()
                },
                setContent: function(e) {
                    e = mUtil.find(n, ".m-dropdown__content").innerHTML = e;
                    return o
                },
                show: function() {
                    if ("hover" == o.options.toggle && mUtil.hasAttr(n, "hover")) return l.clearHovered(), o;
                    if (o.open) return o;
                    if (o.layout.arrow && l.adjustArrowPos(), l.eventTrigger("beforeShow"), l.hideOpened(), mUtil.addClass(n, "m-dropdown--open"), mUtil.isMobileDevice() && o.options.mobileOverlay) {
                        var e = mUtil.css(n, "z-index") - 1,
                            t = mUtil.insertAfter(document.createElement("DIV"), n);
                        mUtil.addClass(t, "m-dropdown__dropoff"), mUtil.css(t, "z-index", e), mUtil.data(t).set("dropdown", n), mUtil.data(n).set("dropoff", t), mUtil.addEvent(t, "click", function(e) {
                            l.hide(), mUtil.remove(this), e.preventDefault()
                        })
                    }
                    return n.focus(), n.setAttribute("aria-expanded", "true"), o.open = !0, l.eventTrigger("afterShow"), o
                },
                clearHovered: function() {
                    var e = mUtil.attr(n, "timeout");
                    mUtil.removeAttr(n, "hover"), mUtil.removeAttr(n, "timeout"), clearTimeout(e)
                },
                hideHovered: function(e) {
                    if (!0 === e) {
                        if (!1 === l.eventTrigger("beforeHide")) return;
                        l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), o.open = !1, l.eventTrigger("afterHide")
                    } else {
                        if (!0 === mUtil.hasAttr(n, "hover")) return;
                        if (!1 === l.eventTrigger("beforeHide")) return;
                        var t = setTimeout(function() {
                            mUtil.attr(n, "hover") && (l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), o.open = !1, l.eventTrigger("afterHide"))
                        }, o.options.hoverTimeout);
                        mUtil.attr(n, "hover", "1"), mUtil.attr(n, "timeout", t)
                    }
                },
                hideClicked: function() {
                    !1 !== l.eventTrigger("beforeHide") && (mUtil.removeClass(n, "m-dropdown--open"), mUtil.data(n).remove("dropoff"), o.open = !1, l.eventTrigger("afterHide"))
                },
                hide: function(e) {
                    return !1 === o.open || ("hover" == o.options.toggle ? l.hideHovered(e) : l.hideClicked(), "down" == o.layout.defaultDropPos && "up" == o.layout.currentDropPos && (mUtil.removeClass(n, "m-dropdown--up"), o.layout.arrow.prependTo(o.layout.wrapper), o.layout.currentDropPos = "down")), o
                },
                hideOpened: function() {
                    for (var e = mUtil.findAll(i, ".m-dropdown.m-dropdown--open"), t = 0, a = e.length; t < a; t++) {
                        var n = e[t];
                        mUtil.data(n).get("dropdown").hide(!0)
                    }
                },
                adjustArrowPos: function() {
                    var e = mUtil.outerWidth(n),
                        t = mUtil.hasClass(o.layout.arrow, "m-dropdown__arrow--right") ? "right" : "left",
                        a = 0;
                    o.layout.arrow && (mUtil.isInResponsiveRange("mobile") && mUtil.hasClass(n, "m-dropdown--mobile-full-width") ? (a = mUtil.offset(n).left + e / 2 - Math.abs(parseInt(mUtil.css(o.layout.arrow, "width")) / 2) - parseInt(mUtil.css(o.layout.wrapper, "left")), mUtil.css(o.layout.arrow, "right", "auto"), mUtil.css(o.layout.arrow, "left", a + "px"), mUtil.css(o.layout.arrow, "margin-left", "auto"), mUtil.css(o.layout.arrow, "margin-right", "auto")) : mUtil.hasClass(o.layout.arrow, "m-dropdown__arrow--adjust") && (a = e / 2 - Math.abs(parseInt(mUtil.css(o.layout.arrow, "width")) / 2), mUtil.hasClass(n, "m-dropdown--align-push") && (a += 20), "right" == t ? (mUtil.css(o.layout.arrow, "left", "auto"), mUtil.css(o.layout.arrow, "right", a + "px")) : (mUtil.css(o.layout.arrow, "right", "auto"), mUtil.css(o.layout.arrow, "left", a + "px"))))
                },
                setZindex: function() {
                    mUtil.css(o.layout.wrapper, "z-index") < mUtil.getHighestZindex(n) && mUtil.css(o.layout.wrapper, "z-index", zindex)
                },
                isPersistent: function() {
                    return o.options.persistent
                },
                isShown: function() {
                    return o.open
                },
                eventTrigger: function(e, t) {
                    for (var a = 0; a < o.events.length; a++) {
                        var n = o.events[a];
                        n.name == e && (1 == n.one ? 0 == n.fired && (o.events[a].fired = !0, n.handler.call(this, o, t)) : n.handler.call(this, o, t))
                    }
                },
                addEvent: function(e, t, a) {
                    o.events.push({
                        name: e,
                        handler: t,
                        one: a,
                        fired: !1
                    })
                }
            };
        return o.setDefaults = function(e) {
            a = e
        }, o.show = function() {
            return l.show()
        }, o.hide = function() {
            return l.hide()
        }, o.toggle = function() {
            return l.toggle()
        }, o.isPersistent = function() {
            return l.isPersistent()
        }, o.isShown = function() {
            return l.isShown()
        }, o.setContent = function(e) {
            return l.setContent(e)
        }, o.on = function(e, t) {
            return l.addEvent(e, t)
        }, o.one = function(e, t) {
            return l.addEvent(e, t, !0)
        }, l.construct.apply(o, [t]), !0, o
    }
};
mUtil.on(document, '[m-dropdown-toggle="click"] .m-dropdown__toggle', "click", function(e) {
    var t = this.closest(".m-dropdown");
    t && ((mUtil.data(t).has("dropdown") ? mUtil.data(t).get("dropdown") : new mDropdown(t)).toggle(), e.preventDefault())
}), mUtil.on(document, '[m-dropdown-toggle="hover"] .m-dropdown__toggle', "click", function(e) {
    if (mUtil.isMobileDevice()) {
        var t = this.closest(".m-dropdown");
        t && ((mUtil.data(t).has("dropdown") ? mUtil.data(t).get("dropdown") : new mDropdown(t)).toggle(), e.preventDefault())
    }
}), mUtil.on(document, '[m-dropdown-toggle="hover"]', "mouseover", function(e) {
    if (mUtil.isDesktopDevice()) {
        this && ((mUtil.data(this).has("dropdown") ? mUtil.data(this).get("dropdown") : new mDropdown(this)).show(), e.preventDefault())
    }
}), document.addEventListener("click", function(e) {
    var t, a = mUtil.get("body"),
        n = e.target;
    if (t = a.querySelectorAll(".m-dropdown.m-dropdown--open"))
        for (var o = 0, i = t.length; o < i; o++) {
            var l = t[o];
            if (!1 === mUtil.data(l).has("dropdown")) return;
            var r = mUtil.data(l).get("dropdown"),
                s = mUtil.find(l, ".m-dropdown__toggle");
            mUtil.hasClass(l, "m-dropdown--disable-close") && (e.preventDefault(), e.stopPropagation()), s && n !== s && !1 === s.contains(n) && !1 === n.contains(s) ? !0 === r.isPersistent() ? !1 === l.contains(n) && r.hide() : r.hide() : !1 === l.contains(n) && r.hide()
        }
});
var mHeader = function(e, t) {
        var i = this,
            a = mUtil.get(e),
            l = mUtil.get("body");
        if (void 0 !== a) {
            var n = {
                    classic: !1,
                    offset: {
                        mobile: 150,
                        desktop: 200
                    },
                    minimize: {
                        mobile: !1,
                        desktop: !1
                    }
                },
                o = {
                    construct: function(e) {
                        return mUtil.data(a).has("header") ? i = mUtil.data(a).get("header") : (o.init(e), o.build(), mUtil.data(a).set("header", i)), i
                    },
                    init: function(e) {
                        i.events = [], i.options = mUtil.deepExtend({}, n, e)
                    },
                    build: function() {
                        var o = 0;
                        !1 === i.options.minimize.mobile && !1 === i.options.minimize.desktop || window.addEventListener("scroll", function() {
                            var e, t, a, n = 0;
                            mUtil.isInResponsiveRange("desktop") ? (n = i.options.offset.desktop, e = i.options.minimize.desktop.on, t = i.options.minimize.desktop.off) : mUtil.isInResponsiveRange("tablet-and-mobile") && (n = i.options.offset.mobile, e = i.options.minimize.mobile.on, t = i.options.minimize.mobile.off), a = window.pageYOffset, mUtil.isInResponsiveRange("tablet-and-mobile") && i.options.classic && i.options.classic.mobile || mUtil.isInResponsiveRange("desktop") && i.options.classic && i.options.classic.desktop ? n < a ? (mUtil.addClass(l, e), mUtil.removeClass(l, t)) : (mUtil.addClass(l, t), mUtil.removeClass(l, e)) : (n < a && o < a ? (mUtil.addClass(l, e), mUtil.removeClass(l, t)) : (mUtil.addClass(l, t), mUtil.removeClass(l, e)), o = a)
                        })
                    },
                    eventTrigger: function(e, t) {
                        for (var a = 0; a < i.events.length; a++) {
                            var n = i.events[a];
                            n.name == e && (1 == n.one ? 0 == n.fired && (i.events[a].fired = !0, n.handler.call(this, i, t)) : n.handler.call(this, i, t))
                        }
                    },
                    addEvent: function(e, t, a) {
                        i.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        })
                    }
                };
            return i.setDefaults = function(e) {
                n = e
            }, i.on = function(e, t) {
                return o.addEvent(e, t)
            }, o.construct.apply(i, [t]), !0, i
        }
    },
    mMenu = function(e, t) {
        var p = this,
            a = !1,
            d = mUtil.get(e),
            i = mUtil.get("body");
        if (d) {
            var n = {
                    autoscroll: {
                        speed: 1200
                    },
                    accordion: {
                        slideSpeed: 200,
                        autoScroll: !0,
                        autoScrollSpeed: 1200,
                        expandAll: !0
                    },
                    dropdown: {
                        timeout: 500
                    }
                },
                f = {
                    construct: function(e) {
                        return mUtil.data(d).has("menu") ? p = mUtil.data(d).get("menu") : (f.init(e), f.reset(), f.build(), mUtil.data(d).set("menu", p)), p
                    },
                    init: function(e) {
                        p.events = [], p.eventHandlers = {}, p.options = mUtil.deepExtend({}, n, e), p.pauseDropdownHoverTime = 0, p.uid = mUtil.getUniqueID()
                    },
                    reload: function() {
                        f.reset(), f.build()
                    },
                    build: function() {
                        p.eventHandlers.event_1 = mUtil.on(d, ".m-menu__toggle", "click", f.handleSubmenuAccordion), ("dropdown" === f.getSubmenuMode() || f.isConditionalSubmenuDropdown()) && (p.eventHandlers.event_2 = mUtil.on(d, '[m-menu-submenu-toggle="hover"]', "mouseover", f.handleSubmenuDrodownHoverEnter), p.eventHandlers.event_3 = mUtil.on(d, '[m-menu-submenu-toggle="hover"]', "mouseout", f.handleSubmenuDrodownHoverExit), p.eventHandlers.event_4 = mUtil.on(d, '[m-menu-submenu-toggle="click"] > .m-menu__toggle, [m-menu-submenu-toggle="click"] > .m-menu__link .m-menu__toggle', "click", f.handleSubmenuDropdownClick), p.eventHandlers.event_5 = mUtil.on(d, '[m-menu-submenu-toggle="tab"] > .m-menu__toggle, [m-menu-submenu-toggle="tab"] > .m-menu__link .m-menu__toggle', "click", f.handleSubmenuDropdownTabClick)), p.eventHandlers.event_6 = mUtil.on(d, ".m-menu__item:not(.m-menu__item--submenu) > .m-menu__link:not(.m-menu__toggle):not(.m-menu__link--toggle-skip)", "click", f.handleLinkClick)
                    },
                    reset: function() {
                        mUtil.off(d, "click", p.eventHandlers.event_1), mUtil.off(d, "mouseover", p.eventHandlers.event_2), mUtil.off(d, "mouseout", p.eventHandlers.event_3), mUtil.off(d, "click", p.eventHandlers.event_4), mUtil.off(d, "click", p.eventHandlers.event_5), mUtil.off(d, "click", p.eventHandlers.event_6)
                    },
                    getSubmenuMode: function() {
                        return mUtil.isInResponsiveRange("desktop") ? mUtil.isset(p.options.submenu, "desktop.state.body") ? mUtil.hasClass(i, p.options.submenu.desktop.state.body) ? p.options.submenu.desktop.state.mode : p.options.submenu.desktop.default : mUtil.isset(p.options.submenu, "desktop") ? p.options.submenu.desktop : void 0 : mUtil.isInResponsiveRange("tablet") && mUtil.isset(p.options.submenu, "tablet") ? p.options.submenu.tablet : !(!mUtil.isInResponsiveRange("mobile") || !mUtil.isset(p.options.submenu, "mobile")) && p.options.submenu.mobile
                    },
                    isConditionalSubmenuDropdown: function() {
                        return !(!mUtil.isInResponsiveRange("desktop") || !mUtil.isset(p.options.submenu, "desktop.state.body"))
                    },
                    handleLinkClick: function(e) {
                        !1 === f.eventTrigger("linkClick", this) && e.preventDefault(), ("dropdown" === f.getSubmenuMode() || f.isConditionalSubmenuDropdown()) && f.handleSubmenuDropdownClose(e, this)
                    },
                    handleSubmenuDrodownHoverEnter: function(e) {
                        if ("accordion" !== f.getSubmenuMode() && !1 !== p.resumeDropdownHover()) {
                            var t = this;
                            "1" == t.getAttribute("data-hover") && (t.removeAttribute("data-hover"), clearTimeout(t.getAttribute("data-timeout")), t.removeAttribute("data-timeout")), f.showSubmenuDropdown(t)
                        }
                    },
                    handleSubmenuDrodownHoverExit: function(e) {
                        if (!1 !== p.resumeDropdownHover() && "accordion" !== f.getSubmenuMode()) {
                            var t = this,
                                a = p.options.dropdown.timeout,
                                n = setTimeout(function() {
                                    "1" == t.getAttribute("data-hover") && f.hideSubmenuDropdown(t, !0)
                                }, a);
                            t.setAttribute("data-hover", "1"), t.setAttribute("data-timeout", n)
                        }
                    },
                    handleSubmenuDropdownClick: function(e) {
                        if ("accordion" !== f.getSubmenuMode()) {
                            var t = this.closest(".m-menu__item");
                            "accordion" != t.getAttribute("m-menu-submenu-mode") && (!1 === mUtil.hasClass(t, "m-menu__item--hover") ? (mUtil.addClass(t, "m-menu__item--open-dropdown"), f.showSubmenuDropdown(t)) : (mUtil.removeClass(t, "m-menu__item--open-dropdown"), f.hideSubmenuDropdown(t, !0)), e.preventDefault())
                        }
                    },
                    handleSubmenuDropdownTabClick: function(e) {
                        if ("accordion" !== f.getSubmenuMode()) {
                            var t = this.closest(".m-menu__item");
                            "accordion" != t.getAttribute("m-menu-submenu-mode") && (0 == mUtil.hasClass(t, "m-menu__item--hover") && (mUtil.addClass(t, "m-menu__item--open-dropdown"), f.showSubmenuDropdown(t)), e.preventDefault())
                        }
                    },
                    handleSubmenuDropdownClose: function(e, t) {
                        if ("accordion" !== f.getSubmenuMode()) {
                            var a = d.querySelectorAll(".m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)");
                            if (0 < a.length && !1 === mUtil.hasClass(t, "m-menu__toggle") && 0 === t.querySelectorAll(".m-menu__toggle").length)
                                for (var n = 0, o = a.length; n < o; n++) f.hideSubmenuDropdown(a[0], !0)
                        }
                    },
                    handleSubmenuAccordion: function(e, t) {
                        var a, n = t || this;
                        if ("dropdown" === f.getSubmenuMode() && (a = n.closest(".m-menu__item")) && "accordion" != a.getAttribute("m-menu-submenu-mode")) e.preventDefault();
                        else {
                            var o = n.closest(".m-menu__item"),
                                i = mUtil.child(o, ".m-menu__submenu, .m-menu__inner");
                            if (!mUtil.hasClass(n.closest(".m-menu__item"), "m-menu__item--open-always") && o && i) {
                                e.preventDefault();
                                var l = p.options.accordion.slideSpeed;
                                if (!1 === mUtil.hasClass(o, "m-menu__item--open")) {
                                    if (!1 === p.options.accordion.expandAll) {
                                        var r = n.closest(".m-menu__nav, .m-menu__subnav"),
                                            s = mUtil.children(r, ".m-menu__item.m-menu__item--open.m-menu__item--submenu:not(.m-menu__item--expanded):not(.m-menu__item--open-always)");
                                        if (r && s)
                                            for (var d = 0, c = s.length; d < c; d++) {
                                                var m = s[0],
                                                    u = mUtil.child(m, ".m-menu__submenu");
                                                u && mUtil.slideUp(u, l, function() {
                                                    mUtil.removeClass(m, "m-menu__item--open")
                                                })
                                            }
                                    }
                                    mUtil.slideDown(i, l, function() {
                                        f.scrollToItem(n)
                                    }), mUtil.addClass(o, "m-menu__item--open")
                                } else mUtil.slideUp(i, l, function() {
                                    f.scrollToItem(n)
                                }), mUtil.removeClass(o, "m-menu__item--open")
                            }
                        }
                    },
                    scrollToItem: function(e) {
                        mUtil.isInResponsiveRange("desktop") && p.options.accordion.autoScroll && "1" !== d.getAttribute("m-menu-scrollable") && mUtil.scrollToCenter(e, p.options.accordion.autoScrollSpeed)
                    },
                    hideSubmenuDropdown: function(e, t) {
                        t && (mUtil.removeClass(e, "m-menu__item--hover"), mUtil.removeClass(e, "m-menu__item--active-tab")), e.removeAttribute("data-hover"), e.getAttribute("m-menu-dropdown-toggle-class") && mUtil.removeClass(i, e.getAttribute("m-menu-dropdown-toggle-class"));
                        var a = e.getAttribute("data-timeout");
                        e.removeAttribute("data-timeout"), clearTimeout(a)
                    },
                    showSubmenuDropdown: function(e) {
                        var t = d.querySelectorAll(".m-menu__item--submenu.m-menu__item--hover, .m-menu__item--submenu.m-menu__item--active-tab");
                        if (t)
                            for (var a = 0, n = t.length; a < n; a++) {
                                var o = t[a];
                                e !== o && !1 === o.contains(e) && !1 === e.contains(o) && f.hideSubmenuDropdown(o, !0)
                            }
                        f.adjustSubmenuDropdownArrowPos(e), mUtil.addClass(e, "m-menu__item--hover"), e.getAttribute("m-menu-dropdown-toggle-class") && mUtil.addClass(i, e.getAttribute("m-menu-dropdown-toggle-class"))
                    },
                    createSubmenuDropdownClickDropoff: function(t) {
                        var e, a = (e = mUtil.child(t, ".m-menu__submenu") ? mUtil.css(e, "z-index") : 0) - 1,
                            n = document.createElement('<div class="m-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + a + '"></div>');
                        i.appendChild(n), mUtil.addEvent(n, "click", function(e) {
                            e.stopPropagation(), e.preventDefault(), mUtil.remove(this), f.hideSubmenuDropdown(t, !0)
                        })
                    },
                    adjustSubmenuDropdownArrowPos: function(e) {
                        var t = mUtil.child(e, ".m-menu__submenu"),
                            a = mUtil.child(t, ".m-menu__arrow.m-menu__arrow--adjust");
                        mUtil.child(t, ".m-menu__subnav");
                        if (a) {
                            var n = 0;
                            mUtil.child(e, ".m-menu__link");
                            mUtil.hasClass(t, "m-menu__submenu--classic") || mUtil.hasClass(t, "m-menu__submenu--fixed") ? mUtil.hasClass(t, "m-menu__submenu--right") ? (n = mUtil.outerWidth(e) / 2, mUtil.hasClass(t, "m-menu__submenu--pull") && (n += Math.abs(parseFloat(mUtil.css(t, "margin-right")))), n = parseInt(mUtil.css(t, "width")) - n) : mUtil.hasClass(t, "m-menu__submenu--left") && (n = mUtil.outerWidth(e) / 2, mUtil.hasClass(t, "m-menu__submenu--pull") && (n += Math.abs(parseFloat(mUtil.css(t, "margin-left"))))) : (mUtil.hasClass(t, "m-menu__submenu--center") || mUtil.hasClass(t, "m-menu__submenu--full")) && (n = mUtil.offset(e).left - (mUtil.getViewPort().width - parseInt(mUtil.css(t, "width"))) / 2, n += mUtil.outerWidth(e) / 2), mUtil.css(a, "left", n + "px")
                        }
                    },
                    pauseDropdownHover: function(e) {
                        var t = new Date;
                        p.pauseDropdownHoverTime = t.getTime() + e
                    },
                    resumeDropdownHover: function() {
                        return (new Date).getTime() > p.pauseDropdownHoverTime
                    },
                    resetActiveItem: function(e) {
                        for (var t, a, n = 0, o = (t = d.querySelectorAll(".m-menu__item--active")).length; n < o; n++) {
                            var i = t[0];
                            mUtil.removeClass(i, "m-menu__item--active"), mUtil.hide(mUtil.child(i, ".m-menu__submenu"));
                            for (var l = 0, r = (a = mUtil.parents(i, ".m-menu__item--submenu")).length; l < r; l++) {
                                var s = a[n];
                                mUtil.removeClass(s, "m-menu__item--open"), mUtil.hide(mUtil.child(s, ".m-menu__submenu"))
                            }
                        }
                        if (!1 === p.options.accordion.expandAll && (t = d.querySelectorAll(".m-menu__item--open")))
                            for (n = 0, o = t.length; n < o; n++) mUtil.removeClass(a[0], "m-menu__item--open")
                    },
                    setActiveItem: function(e) {
                        f.resetActiveItem(), mUtil.addClass(e, "m-menu__item--active");
                        for (var t = mUtil.parents(e, ".m-menu__item--submenu"), a = 0, n = t.length; a < n; a++) mUtil.addClass(t[a], "m-menu__item--open")
                    },
                    getBreadcrumbs: function(e) {
                        var t, a = [],
                            n = mUtil.child(e, ".m-menu__link");
                        a.push({
                            text: t = mUtil.child(n, ".m-menu__link-text") ? t.innerHTML : "",
                            title: n.getAttribute("title"),
                            href: n.getAttribute("href")
                        });
                        for (var o = mUtil.parents(e, ".m-menu__item--submenu"), i = 0, l = o.length; i < l; i++) {
                            var r = mUtil.child(o[i], ".m-menu__link");
                            a.push({
                                text: t = mUtil.child(r, ".m-menu__link-text") ? t.innerHTML : "",
                                title: r.getAttribute("title"),
                                href: r.getAttribute("href")
                            })
                        }
                        return a.reverse()
                    },
                    getPageTitle: function(e) {
                        var t;
                        return mUtil.child(e, ".m-menu__link-text") ? t.innerHTML : ""
                    },
                    eventTrigger: function(e, t) {
                        for (var a = 0; a < p.events.length; a++) {
                            var n = p.events[a];
                            n.name == e && (1 == n.one ? 0 == n.fired && (p.events[a].fired = !0, n.handler.call(this, p, t)) : n.handler.call(this, p, t))
                        }
                    },
                    addEvent: function(e, t, a) {
                        p.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        })
                    }
                };
            return p.setDefaults = function(e) {
                n = e
            }, p.setActiveItem = function(e) {
                return f.setActiveItem(e)
            }, p.reload = function() {
                return f.reload()
            }, p.getBreadcrumbs = function(e) {
                return f.getBreadcrumbs(e)
            }, p.getPageTitle = function(e) {
                return f.getPageTitle(e)
            }, p.getSubmenuMode = function() {
                return f.getSubmenuMode()
            }, p.hideDropdown = function(e) {
                f.hideSubmenuDropdown(e, !0)
            }, p.pauseDropdownHover = function(e) {
                f.pauseDropdownHover(e)
            }, p.resumeDropdownHover = function() {
                return f.resumeDropdownHover()
            }, p.on = function(e, t) {
                return f.addEvent(e, t)
            }, p.one = function(e, t) {
                return f.addEvent(e, t, !0)
            }, f.construct.apply(p, [t]), mUtil.addResizeHandler(function() {
                a && p.reload()
            }), a = !0, p
        }
    };
document.addEventListener("click", function(e) {
    var t;
    if (t = mUtil.get("body").querySelectorAll('.m-menu__nav .m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'))
        for (var a = 0, n = t.length; a < n; a++) {
            var o = t[a].closest(".m-menu__nav").parentNode;
            if (o) {
                var i, l = mUtil.data(o).get("menu");
                if (!l) break;
                if (!l || "dropdown" !== l.getSubmenuMode()) break;
                if (e.target !== o && !1 === o.contains(e.target))
                    if (i = o.querySelectorAll('.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'))
                        for (var r = 0, s = i.length; r < s; r++) l.hideDropdown(i[r])
            }
        }
});
var mOffcanvas = function(e, t) {
        var l = this,
            a = mUtil.get(e),
            n = mUtil.get("body");
        if (a) {
            var o = {},
                i = {
                    construct: function(e) {
                        return mUtil.data(a).has("offcanvas") ? l = mUtil.data(a).get("offcanvas") : (i.init(e), i.build(), mUtil.data(a).set("offcanvas", l)), l
                    },
                    init: function(e) {
                        l.events = [], l.options = mUtil.deepExtend({}, o, e), l.overlay, l.classBase = l.options.baseClass, l.classShown = l.classBase + "--on", l.classOverlay = l.classBase + "-overlay", l.state = mUtil.hasClass(a, l.classShown) ? "shown" : "hidden"
                    },
                    build: function() {
                        if (l.options.toggleBy)
                            if ("string" == typeof l.options.toggleBy) mUtil.addEvent(l.options.toggleBy, "click", i.toggle);
                            else if (l.options.toggleBy && l.options.toggleBy[0] && l.options.toggleBy[0].target)
                            for (var e in l.options.toggleBy) mUtil.addEvent(l.options.toggleBy[e].target, "click", i.toggle);
                        else l.options.toggleBy && l.options.toggleBy.target && mUtil.addEvent(l.options.toggleBy.target, "click", i.toggle);
                        var t = mUtil.get(l.options.closeBy);
                        t && mUtil.addEvent(t, "click", i.hide)
                    },
                    toggle: function() {
                        i.eventTrigger("toggle"), "shown" == l.state ? i.hide(this) : i.show(this)
                    },
                    show: function(t) {
                        "shown" != l.state && (i.eventTrigger("beforeShow"), i.togglerClass(t, "show"), mUtil.addClass(n, l.classShown), mUtil.addClass(a, l.classShown), l.state = "shown", l.options.overlay && (l.overlay = mUtil.insertAfter(document.createElement("DIV"), a), mUtil.addClass(l.overlay, l.classOverlay), mUtil.addEvent(l.overlay, "click", function(e) {
                            e.stopPropagation(), e.preventDefault(), i.hide(t)
                        })), i.eventTrigger("afterShow"))
                    },
                    hide: function(e) {
                        "hidden" != l.state && (i.eventTrigger("beforeHide"), i.togglerClass(e, "hide"), mUtil.removeClass(n, l.classShown), mUtil.removeClass(a, l.classShown), l.state = "hidden", l.options.overlay && l.overlay && mUtil.remove(l.overlay), i.eventTrigger("afterHide"))
                    },
                    togglerClass: function(e, t) {
                        var a, n = mUtil.attr(e, "id");
                        if (l.options.toggleBy && l.options.toggleBy[0] && l.options.toggleBy[0].target)
                            for (var o in l.options.toggleBy) l.options.toggleBy[o].target === n && (a = l.options.toggleBy[o]);
                        else l.options.toggleBy && l.options.toggleBy.target && (a = l.options.toggleBy);
                        if (a) {
                            var i = mUtil.get(a.target);
                            "show" === t && mUtil.addClass(i, a.state), "hide" === t && mUtil.removeClass(i, a.state)
                        }
                    },
                    eventTrigger: function(e, t) {
                        for (var a = 0; a < l.events.length; a++) {
                            var n = l.events[a];
                            n.name == e && (1 == n.one ? 0 == n.fired && (l.events[a].fired = !0, n.handler.call(this, l, t)) : n.handler.call(this, l, t))
                        }
                    },
                    addEvent: function(e, t, a) {
                        l.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        })
                    }
                };
            return l.setDefaults = function(e) {
                o = e
            }, l.hide = function() {
                return i.hide()
            }, l.show = function() {
                return i.show()
            }, l.on = function(e, t) {
                return i.addEvent(e, t)
            }, l.one = function(e, t) {
                return i.addEvent(e, t, !0)
            }, i.construct.apply(l, [t]), !0, l
        }
    },
    mPortlet = function(e, t) {
        var s = this,
            d = mUtil.get(e),
            c = mUtil.get("body");
        if (d) {
            var a = {
                    bodyToggleSpeed: 400,
                    tooltips: !0,
                    tools: {
                        toggle: {
                            collapse: "Collapse",
                            expand: "Expand"
                        },
                        reload: "Reload",
                        remove: "Remove",
                        fullscreen: {
                            on: "Fullscreen",
                            off: "Exit Fullscreen"
                        }
                    }
                },
                o = {
                    construct: function(e) {
                        return mUtil.data(d).has("portlet") ? s = mUtil.data(d).get("portlet") : (o.init(e), o.build(), mUtil.data(d).set("portlet", s)), s
                    },
                    init: function(e) {
                        s.element = d, s.events = [], s.options = mUtil.deepExtend({}, a, e), s.head = mUtil.child(d, ".m-portlet__head"), mUtil.child(d, ".m-portlet__body") ? s.body = mUtil.child(d, ".m-portlet__body") : 0 !== mUtil.child(d, ".m-form").length && (s.body = mUtil.child(d, ".m-form"))
                    },
                    build: function() {
                        var e = mUtil.find(s.head, "[m-portlet-tool=remove]");
                        e && mUtil.addEvent(e, "click", function(e) {
                            e.preventDefault(), o.remove()
                        });
                        var t = mUtil.find(s.head, "[m-portlet-tool=reload]");
                        t && mUtil.addEvent(t, "click", function(e) {
                            e.preventDefault(), o.reload()
                        });
                        var a = mUtil.find(s.head, "[m-portlet-tool=toggle]");
                        a && mUtil.addEvent(a, "click", function(e) {
                            e.preventDefault(), o.toggle()
                        });
                        var n = mUtil.find(s.head, "[m-portlet-tool=fullscreen]");
                        n && mUtil.addEvent(n, "click", function(e) {
                            e.preventDefault(), o.fullscreen()
                        }), o.setupTooltips()
                    },
                    remove: function() {
                        !1 !== o.eventTrigger("beforeRemove") && (mUtil.hasClass(c, "m-portlet--fullscreen") && mUtil.hasClass(d, "m-portlet--fullscreen") && o.fullscreen("off"), o.removeTooltips(), mUtil.remove(d), o.eventTrigger("afterRemove"))
                    },
                    setContent: function(e) {
                        e && (s.body.innerHTML = e)
                    },
                    getBody: function() {
                        return s.body
                    },
                    getSelf: function() {
                        return d
                    },
                    setupTooltips: function() {
                        if (s.options.tooltips) {
                            var e = mUtil.hasClass(d, "m-portlet--collapse") || mUtil.hasClass(d, "m-portlet--collapsed"),
                                t = mUtil.hasClass(c, "m-portlet--fullscreen") && mUtil.hasClass(d, "m-portlet--fullscreen"),
                                a = mUtil.find(s.head, "[m-portlet-tool=remove]");
                            if (a) {
                                var n = t ? "bottom" : "top",
                                    o = new Tooltip(a, {
                                        title: s.options.tools.remove,
                                        placement: n,
                                        offset: t ? "0,10px,0,0" : "0,5px",
                                        trigger: "hover",
                                        template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + n + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                    });
                                mUtil.data(a).set("tooltip", o)
                            }
                            var i = mUtil.find(s.head, "[m-portlet-tool=reload]");
                            if (i) {
                                n = t ? "bottom" : "top", o = new Tooltip(i, {
                                    title: s.options.tools.reload,
                                    placement: n,
                                    offset: t ? "0,10px,0,0" : "0,5px",
                                    trigger: "hover",
                                    template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + n + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                });
                                mUtil.data(i).set("tooltip", o)
                            }
                            var l = mUtil.find(s.head, "[m-portlet-tool=toggle]");
                            if (l) {
                                n = t ? "bottom" : "top", o = new Tooltip(l, {
                                    title: e ? s.options.tools.toggle.expand : s.options.tools.toggle.collapse,
                                    placement: n,
                                    offset: t ? "0,10px,0,0" : "0,5px",
                                    trigger: "hover",
                                    template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + n + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                });
                                mUtil.data(l).set("tooltip", o)
                            }
                            var r = mUtil.find(s.head, "[m-portlet-tool=fullscreen]");
                            if (r) {
                                n = t ? "bottom" : "top", o = new Tooltip(r, {
                                    title: t ? s.options.tools.fullscreen.off : s.options.tools.fullscreen.on,
                                    placement: n,
                                    offset: t ? "0,10px,0,0" : "0,5px",
                                    trigger: "hover",
                                    template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + n + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                });
                                mUtil.data(r).set("tooltip", o)
                            }
                        }
                    },
                    removeTooltips: function() {
                        if (s.options.tooltips) {
                            var e = mUtil.find(s.head, "[m-portlet-tool=remove]");
                            e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").dispose();
                            var t = mUtil.find(s.head, "[m-portlet-tool=reload]");
                            t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").dispose();
                            var a = mUtil.find(s.head, "[m-portlet-tool=toggle]");
                            a && mUtil.data(a).has("tooltip") && mUtil.data(a).get("tooltip").dispose();
                            var n = mUtil.find(s.head, "[m-portlet-tool=fullscreen]");
                            n && mUtil.data(n).has("tooltip") && mUtil.data(n).get("tooltip").dispose()
                        }
                    },
                    reload: function() {
                        o.eventTrigger("reload")
                    },
                    toggle: function() {
                        mUtil.hasClass(d, "m-portlet--collapse") || mUtil.hasClass(d, "m-portlet--collapsed") ? o.expand() : o.collapse()
                    },
                    collapse: function() {
                        if (!1 !== o.eventTrigger("beforeCollapse")) {
                            mUtil.slideUp(s.body, s.options.bodyToggleSpeed, function() {
                                o.eventTrigger("afterCollapse")
                            }), mUtil.addClass(d, "m-portlet--collapse");
                            var e = mUtil.find(s.head, "[m-portlet-tool=toggle]");
                            e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").updateTitleContent(s.options.tools.toggle.expand)
                        }
                    },
                    expand: function() {
                        if (!1 !== o.eventTrigger("beforeExpand")) {
                            mUtil.slideDown(s.body, s.options.bodyToggleSpeed, function() {
                                o.eventTrigger("afterExpand")
                            }), mUtil.removeClass(d, "m-portlet--collapse"), mUtil.removeClass(d, "m-portlet--collapsed");
                            var e = mUtil.find(s.head, "[m-portlet-tool=toggle]");
                            e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").updateTitleContent(s.options.tools.toggle.collapse)
                        }
                    },
                    fullscreen: function(e) {
                        "off" === e || mUtil.hasClass(c, "m-portlet--fullscreen") && mUtil.hasClass(d, "m-portlet--fullscreen") ? (o.eventTrigger("beforeFullscreenOff"), mUtil.removeClass(c, "m-portlet--fullscreen"), mUtil.removeClass(d, "m-portlet--fullscreen"), o.removeTooltips(), o.setupTooltips(), o.eventTrigger("afterFullscreenOff")) : (o.eventTrigger("beforeFullscreenOn"), mUtil.addClass(d, "m-portlet--fullscreen"), mUtil.addClass(c, "m-portlet--fullscreen"), o.removeTooltips(), o.setupTooltips(), o.eventTrigger("afterFullscreenOn"))
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < s.events.length; i++) {
                            var t = s.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (s.events[i].fired = !0, t.handler.call(this, s)) : t.handler.call(this, s))
                        }
                    },
                    addEvent: function(e, t, a) {
                        return s.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        }), s
                    }
                };
            return s.setDefaults = function(e) {
                a = e
            }, s.remove = function() {
                return o.remove(html)
            }, s.reload = function() {
                return o.reload()
            }, s.setContent = function(e) {
                return o.setContent(e)
            }, s.toggle = function() {
                return o.toggle()
            }, s.collapse = function() {
                return o.collapse()
            }, s.expand = function() {
                return o.expand()
            }, s.fullscreen = function() {
                return o.fullscreen("on")
            }, s.unFullscreen = function() {
                return o.fullscreen("off")
            }, s.getBody = function() {
                return o.getBody()
            }, s.getSelf = function() {
                return o.getSelf()
            }, s.on = function(e, t) {
                return o.addEvent(e, t)
            }, s.one = function(e, t) {
                return o.addEvent(e, t, !0)
            }, o.construct.apply(s, [t]), s
        }
    },
    mQuicksearch = function(e, t) {
        var n = this,
            a = mUtil.get(e),
            o = mUtil.get("body");
        if (a) {
            var l = {
                    mode: "default",
                    minLength: 1,
                    maxHeight: 300,
                    requestTimeout: 200,
                    inputTarget: "m_quicksearch_input",
                    iconCloseTarget: "m_quicksearch_close",
                    iconCancelTarget: "m_quicksearch_cancel",
                    iconSearchTarget: "m_quicksearch_search",
                    spinnerClass: "m-loader m-loader--skin-light m-loader--right",
                    hasResultClass: "m-list-search--has-result",
                    templates: {
                        error: '<div class="m-search-results m-search-results--skin-light"><span class="m-search-result__message">{{message}}</div></div>'
                    }
                },
                r = {
                    construct: function(e) {
                        return mUtil.data(a).has("quicksearch") ? n = mUtil.data(a).get("quicksearch") : (r.init(e), r.build(), mUtil.data(a).set("quicksearch", n)), n
                    },
                    init: function(e) {
                        n.element = a, n.events = [], n.options = mUtil.deepExtend({}, l, e), n.query = "", n.form = mUtil.find(a, "form"), n.input = mUtil.get(n.options.inputTarget), n.iconClose = mUtil.get(n.options.iconCloseTarget), "default" == n.options.mode && (n.iconSearch = mUtil.get(n.options.iconSearchTarget), n.iconCancel = mUtil.get(n.options.iconCancelTarget)), n.dropdown = new mDropdown(a, {
                            mobileOverlay: !1
                        }), n.cancelTimeout, n.processing = !1, n.requestTimeout = !1
                    },
                    build: function() {
                        mUtil.addEvent(n.input, "keyup", r.search), "default" == n.options.mode ? (mUtil.addEvent(n.input, "focus", r.showDropdown), mUtil.addEvent(n.iconCancel, "click", r.handleCancel), mUtil.addEvent(n.iconSearch, "click", function() {
                            mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.addClass(o, "m-header-search--mobile-expanded"), n.input.focus())
                        }), mUtil.addEvent(n.iconClose, "click", function() {
                            mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.removeClass(o, "m-header-search--mobile-expanded"), r.closeDropdown())
                        })) : "dropdown" == n.options.mode && (n.dropdown.on("afterShow", function() {
                            n.input.focus()
                        }), mUtil.addEvent(n.iconClose, "click", r.closeDropdown))
                    },
                    showProgress: function() {
                        return n.processing = !0, mUtil.addClass(n.form, n.options.spinnerClass), r.handleCancelIconVisibility("off"), n
                    },
                    hideProgress: function() {
                        return n.processing = !1, mUtil.removeClass(n.form, n.options.spinnerClass), r.handleCancelIconVisibility("on"), mUtil.addClass(a, n.options.hasResultClass), n
                    },
                    search: function(e) {
                        if (n.query = n.input.value, 0 === n.query.length && (r.handleCancelIconVisibility("on"), mUtil.removeClass(a, n.options.hasResultClass), mUtil.removeClass(n.form, n.options.spinnerClass)), !(n.query.length < n.options.minLength || 1 == n.processing)) return n.requestTimeout && clearTimeout(n.requestTimeout), n.requestTimeout = !1, n.requestTimeout = setTimeout(function() {
                            r.eventTrigger("search")
                        }, n.options.requestTimeout), n
                    },
                    handleCancelIconVisibility: function(e) {
                        "on" == e ? 0 === n.input.value.length ? (n.iconCancel && mUtil.css(n.iconCancel, "visibility", "hidden"), n.iconClose && mUtil.css(n.iconClose, "visibility", "visible")) : (clearTimeout(n.cancelTimeout), n.cancelTimeout = setTimeout(function() {
                            n.iconCancel && mUtil.css(n.iconCancel, "visibility", "visible"), n.iconClose && mUtil.css(n.iconClose, "visibility", "visible")
                        }, 500)) : (n.iconCancel && mUtil.css(n.iconCancel, "visibility", "hidden"), n.iconClose && mUtil.css(n.iconClose, "visibility", "hidden"))
                    },
                    handleCancel: function(e) {
                        n.input.value = "", mUtil.css(n.iconCancel, "visibility", "hidden"), mUtil.removeClass(a, n.options.hasResultClass), r.closeDropdown()
                    },
                    closeDropdown: function() {
                        n.dropdown.hide()
                    },
                    showDropdown: function(e) {
                        0 == n.dropdown.isShown() && n.input.value.length > n.options.minLength && 0 == n.processing && (console.log("show!!!"), n.dropdown.show(), e && (e.preventDefault(), e.stopPropagation()))
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < n.events.length; i++) {
                            var t = n.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (n.events[i].fired = !0, t.handler.call(this, n)) : t.handler.call(this, n))
                        }
                    },
                    addEvent: function(e, t, a) {
                        return n.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        }), n
                    }
                };
            return n.setDefaults = function(e) {
                l = e
            }, n.search = function() {
                return r.handleSearch()
            }, n.showResult = function(e) {
                return n.dropdown.setContent(e), r.showDropdown(), n
            }, n.showError = function(e) {
                var t = n.options.templates.error.replace("{{message}}", e);
                return n.dropdown.setContent(t), r.showDropdown(), n
            }, n.showProgress = function() {
                return r.showProgress()
            }, n.hideProgress = function() {
                return r.hideProgress()
            }, n.search = function() {
                return r.search()
            }, n.on = function(e, t) {
                return r.addEvent(e, t)
            }, n.one = function(e, t) {
                return r.addEvent(e, t, !0)
            }, r.construct.apply(n, [t]), n
        }
    },
    mScrollTop = function(e, t) {
        var o = this,
            a = mUtil.get(e),
            n = mUtil.get("body");
        if (a) {
            var i = {
                    offset: 300,
                    speed: 600
                },
                l = {
                    construct: function(e) {
                        return mUtil.data(a).has("scrolltop") ? o = mUtil.data(a).get("scrolltop") : (l.init(e), l.build(), mUtil.data(a).set("scrolltop", o)), o
                    },
                    init: function(e) {
                        o.events = [], o.options = mUtil.deepExtend({}, i, e)
                    },
                    build: function() {
                        navigator.userAgent.match(/iPhone|iPad|iPod/i) ? (window.addEventListener("touchend", function() {
                            l.handle()
                        }), window.addEventListener("touchcancel", function() {
                            l.handle()
                        }), window.addEventListener("touchleave", function() {
                            l.handle()
                        })) : window.addEventListener("scroll", function() {
                            l.handle()
                        }), mUtil.addEvent(a, "click", l.scroll)
                    },
                    handle: function() {
                        window.pageYOffset > o.options.offset ? mUtil.addClass(n, "m-scroll-top--shown") : mUtil.removeClass(n, "m-scroll-top--shown")
                    },
                    scroll: function(e) {
                        e.preventDefault(), mUtil.scrollTop(o.options.speed)
                    },
                    eventTrigger: function(e, t) {
                        for (var a = 0; a < o.events.length; a++) {
                            var n = o.events[a];
                            n.name == e && (1 == n.one ? 0 == n.fired && (o.events[a].fired = !0, n.handler.call(this, o, t)) : n.handler.call(this, o, t))
                        }
                    },
                    addEvent: function(e, t, a) {
                        o.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        })
                    }
                };
            return o.setDefaults = function(e) {
                i = e
            }, o.on = function(e, t) {
                return l.addEvent(e, t)
            }, o.one = function(e, t) {
                return l.addEvent(e, t, !0)
            }, l.construct.apply(o, [t]), !0, o
        }
    },
    mToggle = function(e, t) {
        var n = this,
            a = mUtil.get(e);
        mUtil.get("body");
        if (a) {
            var o = {
                    togglerState: "",
                    targetState: ""
                },
                l = {
                    construct: function(e) {
                        return mUtil.data(a).has("toggle") ? n = mUtil.data(a).get("toggle") : (l.init(e), l.build(), mUtil.data(a).set("toggle", n)), n
                    },
                    init: function(e) {
                        n.element = a, n.events = [], n.options = mUtil.deepExtend({}, o, e), n.target = mUtil.get(n.options.target), n.targetState = n.options.targetState, n.togglerState = n.options.togglerState, n.state = mUtil.hasClasses(n.target, n.targetState) ? "on" : "off"
                    },
                    build: function() {
                        mUtil.addEvent(a, "mouseup", l.toggle)
                    },
                    toggle: function() {
                        return "off" == n.state ? l.toggleOn() : l.toggleOff(), n
                    },
                    toggleOn: function() {
                        return l.eventTrigger("beforeOn"), mUtil.addClass(n.target, n.targetState), n.togglerState && mUtil.addClass(a, n.togglerState), n.state = "on", l.eventTrigger("afterOn"), l.eventTrigger("toggle"), n
                    },
                    toggleOff: function() {
                        return l.eventTrigger("beforeOff"), mUtil.removeClass(n.target, n.targetState), n.togglerState && mUtil.removeClass(a, n.togglerState), n.state = "off", l.eventTrigger("afterOff"), l.eventTrigger("toggle"), n
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < n.events.length; i++) {
                            var t = n.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (n.events[i].fired = !0, t.handler.call(this, n)) : t.handler.call(this, n))
                        }
                    },
                    addEvent: function(e, t, a) {
                        return n.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        }), n
                    }
                };
            return n.setDefaults = function(e) {
                o = e
            }, n.getState = function() {
                return n.state
            }, n.toggle = function() {
                return l.toggle()
            }, n.toggleOn = function() {
                return l.toggleOn()
            }, n.toggle = function() {
                return l.toggleOff()
            }, n.on = function(e, t) {
                return l.addEvent(e, t)
            }, n.one = function(e, t) {
                return l.addEvent(e, t, !0)
            }, l.construct.apply(n, [t]), n
        }
    },
    mWizard = function(e, t) {
        var l = this,
            o = mUtil.get(e);
        mUtil.get("body");
        if (o) {
            var a = {
                    startStep: 1,
                    manualStepForward: !1
                },
                r = {
                    construct: function(e) {
                        return mUtil.data(o).has("wizard") ? l = mUtil.data(o).get("wizard") : (r.init(e), r.build(), mUtil.data(o).set("wizard", l)), l
                    },
                    init: function(e) {
                        l.element = o, l.events = [], l.options = mUtil.deepExtend({}, a, e), l.steps = mUtil.findAll(o, ".m-wizard__step"), l.progress = mUtil.find(o, ".m-wizard__progress .progress-bar"), l.btnSubmit = mUtil.find(o, '[data-wizard-action="submit"]'), l.btnNext = mUtil.find(o, '[data-wizard-action="next"]'), l.btnPrev = mUtil.find(o, '[data-wizard-action="prev"]'), l.btnLast = mUtil.find(o, '[data-wizard-action="last"]'), l.btnFirst = mUtil.find(o, '[data-wizard-action="first"]'), l.events = [], l.currentStep = 1, l.totalSteps = l.steps.length, 1 < l.options.startStep && r.goTo(l.options.startStep), r.updateUI()
                    },
                    build: function() {
                        mUtil.addEvent(l.btnNext, "click", function(e) {
                            e.preventDefault(), r.goNext()
                        }), mUtil.addEvent(l.btnPrev, "click", function(e) {
                            e.preventDefault(), r.goPrev()
                        }), mUtil.addEvent(l.btnFirst, "click", function(e) {
                            e.preventDefault(), r.goFirst()
                        }), mUtil.addEvent(l.btnLast, "click", function(e) {
                            e.preventDefault(), r.goLast()
                        }), mUtil.on(o, ".m-wizard__step a.m-wizard__step-number", "click", function() {
                            for (var e, t = this.closest(".m-wizard__step"), a = mUtil.parents(this, ".m-wizard__steps"), n = mUtil.findAll(a, ".m-wizard__step"), o = 0, i = n.length; o < i; o++)
                                if (t === n[o]) {
                                    e = o + 1;
                                    break
                                }
                            e && (!1 === l.options.manualStepForward ? e < l.currentStep && r.goTo(e) : r.goTo(e))
                        })
                    },
                    goTo: function(e) {
                        if (e !== l.currentStep) return !1 !== ((e = e ? parseInt(e) : r.getNextStep()) > l.currentStep ? r.eventTrigger("beforeNext") : r.eventTrigger("beforePrev")) && (l.currentStep = e, r.updateUI(), r.eventTrigger("change")), e > l.startStep ? r.eventTrigger("afterNext") : r.eventTrigger("afterPrev"), l
                    },
                    updateUI: function(e) {
                        r.updateProgress(), r.handleTarget(), r.setStepClass();
                        for (var t = 0, a = l.steps.length; t < a; t++) mUtil.removeClass(l.steps[t], "m-wizard__step--current m-wizard__step--done");
                        for (t = 1; t < l.currentStep; t++) mUtil.addClass(l.steps[t - 1], "m-wizard__step--done");
                        mUtil.addClass(l.steps[l.currentStep - 1], "m-wizard__step--current")
                    },
                    isLastStep: function() {
                        return l.currentStep === l.totalSteps
                    },
                    isFirstStep: function() {
                        return 1 === l.currentStep
                    },
                    isBetweenStep: function() {
                        return !1 === r.isLastStep() && !1 === r.isFirstStep()
                    },
                    setStepClass: function() {
                        r.isLastStep() ? mUtil.addClass(o, "m-wizard--step-last") : mUtil.removeClass(o, "m-wizard--step-last"), r.isFirstStep() ? mUtil.addClass(o, "m-wizard--step-first") : mUtil.removeClass(o, "m-wizard--step-first"), r.isBetweenStep() ? mUtil.addClass(o, "m-wizard--step-between") : mUtil.removeClass(o, "m-wizard--step-between")
                    },
                    goNext: function() {
                        return r.goTo(r.getNextStep())
                    },
                    goPrev: function() {
                        return r.goTo(r.getPrevStep())
                    },
                    goLast: function() {
                        return r.goTo(l.totalSteps)
                    },
                    goFirst: function() {
                        return r.goTo(1)
                    },
                    updateProgress: function() {
                        if (l.progress)
                            if (mUtil.hasClass(o, "m-wizard--1")) {
                                var e = l.currentStep / l.totalSteps * 100,
                                    t = mUtil.find(o, ".m-wizard__step-number"),
                                    a = parseInt(mUtil.css(t, "width"));
                                mUtil.css(l.progress, "width", "calc(" + e + "% + " + a / 2 + "px)")
                            } else if (mUtil.hasClass(o, "m-wizard--2")) {
                            l.currentStep;
                            var n = (l.currentStep - 1) * (1 / (l.totalSteps - 1) * 100);
                            mUtil.isInResponsiveRange("minimal-desktop-and-below") ? mUtil.css(l.progress, "height", n + "%") : mUtil.css(l.progress, "width", n + "%")
                        } else {
                            e = l.currentStep / l.totalSteps * 100;
                            mUtil.css(l.progress, "width", e + "%")
                        }
                    },
                    handleTarget: function() {
                        var e = l.steps[l.currentStep - 1],
                            t = mUtil.get(mUtil.attr(e, "m-wizard-target")),
                            a = mUtil.find(o, ".m-wizard__form-step--current");
                        mUtil.removeClass(a, "m-wizard__form-step--current"), mUtil.addClass(t, "m-wizard__form-step--current")
                    },
                    getNextStep: function() {
                        return l.totalSteps >= l.currentStep + 1 ? l.currentStep + 1 : l.totalSteps
                    },
                    getPrevStep: function() {
                        return 1 <= l.currentStep - 1 ? l.currentStep - 1 : 1
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < l.events.length; i++) {
                            var t = l.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (l.events[i].fired = !0, t.handler.call(this, l)) : t.handler.call(this, l))
                        }
                    },
                    addEvent: function(e, t, a) {
                        return l.events.push({
                            name: e,
                            handler: t,
                            one: a,
                            fired: !1
                        }), l
                    }
                };
            return l.setDefaults = function(e) {
                a = e
            }, l.goNext = function() {
                return r.goNext()
            }, l.goPrev = function() {
                return r.goPrev()
            }, l.goLast = function() {
                return r.goLast()
            }, l.goFirst = function() {
                return r.goFirst()
            }, l.goTo = function(e) {
                return r.goTo(e)
            }, l.getStep = function() {
                return l.currentStep
            }, l.isLastStep = function() {
                return r.isLastStep()
            }, l.isFirstStep = function() {
                return r.isFirstStep()
            }, l.on = function(e, t) {
                return r.addEvent(e, t)
            }, l.one = function(e, t) {
                return r.addEvent(e, t, !0)
            }, r.construct.apply(l, [t]), l
        }
    };
! function(l) {
    l.fn.mDatatable = l.fn.mDatatable || {}, l.fn.mDatatable.checkbox = function(n, o) {
        var i = {
            selectedAllRows: !1,
            selectedRows: [],
            unselectedRows: [],
            init: function() {
                i.selectorEnabled() && (o.vars.requestIds && n.setDataSourceParam(o.vars.requestIds, !0), i.selectedAllRows = n.getDataSourceParam(o.vars.selectedAllRows), l(n).on("m-datatable--on-layout-updated", function(e, t) {
                    t.table == l(n.wrap).attr("id") && n.ready(function() {
                        i.initVars(), i.initEvent(), i.initSelect()
                    })
                }))
            },
            initEvent: function() {
                l(n.tableHead).find('.m-checkbox--all > [type="checkbox"]').click(function(e) {
                    if (i.selectedRows = i.unselectedRows = [], n.stateRemove("checkbox"), l(this).is(":checked") ? i.selectedAllRows = !0 : i.selectedAllRows = !1, !o.vars.requestIds) {
                        l(this).is(":checked") && (i.selectedRows = l.makeArray(l(n.tableBody).find('.m-checkbox--single > [type="checkbox"]').map(function(e, t) {
                            return l(t).val()
                        })));
                        var t = {};
                        t.selectedRows = l.unique(i.selectedRows), n.stateKeep("checkbox", t)
                    }
                    n.setDataSourceParam(o.vars.selectedAllRows, i.selectedAllRows), l(n).trigger("m-datatable--on-click-checkbox", [l(this)])
                }), l(n.tableBody).find('.m-checkbox--single > [type="checkbox"]').click(function(e) {
                    var t = l(this).val();
                    l(this).is(":checked") ? (i.selectedRows.push(t), i.unselectedRows = i.remove(i.unselectedRows, t)) : (i.unselectedRows.push(t), i.selectedRows = i.remove(i.selectedRows, t)), !o.vars.requestIds && i.selectedRows.length < 1 && l(n.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !1);
                    var a = {};
                    a.selectedRows = l.unique(i.selectedRows), a.unselectedRows = l.unique(i.unselectedRows), n.stateKeep("checkbox", a), l(n).trigger("m-datatable--on-click-checkbox", [l(this)])
                })
            },
            initSelect: function() {
                i.selectedAllRows && o.vars.requestIds ? (n.hasClass("m-datatable--error") || l(n.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0), n.setActiveAll(!0), i.unselectedRows.forEach(function(e) {
                    n.setInactive(e)
                })) : (i.selectedRows.forEach(function(e) {
                    n.setActive(e)
                }), !n.hasClass("m-datatable--error") && l(n.tableBody).find('.m-checkbox--single > [type="checkbox"]').not(":checked").length < 1 && l(n.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0))
            },
            selectorEnabled: function() {
                return l.grep(n.options.columns, function(e, t) {
                    return e.selector || !1
                })[0]
            },
            initVars: function() {
                var e = n.stateGet("checkbox");
                void 0 !== e && (i.selectedRows = e.selectedRows || [], i.unselectedRows = e.unselectedRows || [])
            },
            getSelectedId: function(e) {
                if (i.initVars(), i.selectedAllRows && o.vars.requestIds) {
                    void 0 === e && (e = o.vars.rowIds);
                    var t = n.getObject(e, n.lastResponse) || [];
                    return 0 < t.length && i.unselectedRows.forEach(function(e) {
                        t = i.remove(t, parseInt(e))
                    }), t
                }
                return i.selectedRows
            },
            remove: function(e, t) {
                return e.filter(function(e) {
                    return e !== t
                })
            }
        };
        return n.checkbox = function() {
            return i
        }, "object" == typeof o && (o = l.extend(!0, {}, l.fn.mDatatable.checkbox.default, o), i.init.apply(this, [o])), n
    }, l.fn.mDatatable.checkbox.default = {
        vars: {
            selectedAllRows: "selectedAllRows",
            requestIds: "requestIds",
            rowIds: "meta.rowIds"
        }
    }
}(jQuery), $.notifyDefaults({
    template: '<div data-notify="container" class="alert alert-{0} m-alert" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"></button><span data-notify="icon"></span><span data-notify="title">{1}</span><span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-animated bg-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
}), swal.setDefaults({
    width: 400,
    padding: "2.5rem",
    buttonsStyling: !1,
    confirmButtonClass: "btn btn-success m-btn m-btn--custom",
    confirmButtonColor: null,
    cancelButtonClass: "btn btn-secondary m-btn m-btn--custom",
    cancelButtonColor: null
}), Chart.elements.Rectangle.prototype.draw = function() {
    var e, t, a, n, o, i, l, r = this._chart.ctx,
        s = this._view,
        d = s.borderWidth,
        c = this._chart.options.barRadius ? this._chart.options.barRadius : 0;
    if (s.horizontal ? (e = s.base, t = s.x, a = s.y - s.height / 2, n = s.y + s.height / 2, o = e < t ? 1 : -1, i = 1, l = s.borderSkipped || "left") : (e = s.x - s.width / 2, t = s.x + s.width / 2, o = 1, i = (a = s.y > 2 * c ? s.y - c : s.y) < (n = s.base) ? 1 : -1, l = s.borderSkipped || "bottom"), d) {
        var m = Math.min(Math.abs(e - t), Math.abs(a - n)),
            u = (d = m < d ? m : d) / 2,
            p = e + ("left" !== l ? u * o : 0),
            f = t + ("right" !== l ? -u * o : 0),
            g = a + ("top" !== l ? u * i : 0),
            h = n + ("bottom" !== l ? -u * i : 0);
        p !== f && (a = g, n = h), g !== h && (e = p, t = f)
    }
    r.beginPath(), r.fillStyle = s.backgroundColor, r.strokeStyle = s.borderColor, r.lineWidth = d;
    var b = [
            [e, n],
            [e, a],
            [t, a],
            [t, n]
        ],
        v = ["bottom", "left", "top", "right"].indexOf(l, 0);

    function _(e) {
        return b[(v + e) % 4]
    } - 1 === v && (v = 0);
    var w = _(0);
    r.moveTo(w[0], w[1]);
    for (var U = 1; U < 4; U++) {
        var C;
        w = _(U), nextCornerId = U + 1, 4 == nextCornerId && (nextCornerId = 0), nextCorner = _(nextCornerId), width = b[2][0] - b[1][0], height = b[0][1] - b[1][1], x = b[1][0], y = b[1][1], (C = c) > height / 2 && (C = height / 2), C > width / 2 && (C = width / 2), r.moveTo(x + C, y), r.lineTo(x + width - C, y), r.quadraticCurveTo(x + width, y, x + width, y + C), r.lineTo(x + width, y + height - C), r.quadraticCurveTo(x + width, y + height, x + width - C, y + height), r.lineTo(x + C, y + height), r.quadraticCurveTo(x, y + height, x, y + height - C), r.lineTo(x, y + C), r.quadraticCurveTo(x, y, x + C, y)
    }
    r.fill(), d && r.stroke()
}, $.fn.markdown.defaults.iconlibrary = "fa", $.fn.timepicker.defaults = $.extend(!0, {}, $.fn.timepicker.defaults, {
    icons: {
        up: "la la-angle-up",
        down: "la la-angle-down"
    }
}), jQuery.validator.setDefaults({
    errorElement: "div",
    errorClass: "form-control-feedback",
    focusInvalid: !1,
    ignore: "",
    errorPlacement: function(e, t) {
        var a = 0 < $(t).closest(".m-form__group-sub").length ? $(t).closest(".m-form__group-sub") : $(t).closest(".m-form__group"),
            n = a.find(".m-form__help");
        0 === a.find(".form-control-feedback").length && (0 < n.length ? n.before(e) : 0 < $(t).closest(".input-group").length ? $(t).closest(".input-group").after(e) : $(t).is(":checkbox") ? $(t).closest(".m-checkbox").find(">span").after(e) : $(t).after(e))
    },
    highlight: function(e) {
        (0 < $(e).closest(".m-form__group-sub").length ? $(e).closest(".m-form__group-sub") : $(e).closest(".m-form__group")).addClass("has-danger")
    },
    unhighlight: function(e) {
        (0 < $(e).closest(".m-form__group-sub").length ? $(e).closest(".m-form__group-sub") : $(e).closest(".m-form__group")).removeClass("has-danger")
    },
    success: function(e, t) {
        var a = 0 < $(e).closest(".m-form__group-sub").length ? $(e).closest(".m-form__group-sub") : $(e).closest(".m-form__group");
        a.removeClass("has-danger"), a.find(".form-control-feedback").remove()
    }
}), jQuery.validator.addMethod("email", function(e, t) {
    return !!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)
}, "Please enter a valid Email.");
var mLayout = function() {
    var n, o, a, i, l;
    return {
        init: function() {
            this.initHeader(), this.initAside()
        },
        initHeader: function() {
            var e, t, a;
            t = mUtil.get("m_header"), a = {
                offset: {},
                minimize: {}
            }, "minimize" == mUtil.attr(t, "m-minimize-mobile") ? (a.minimize.mobile = {}, a.minimize.mobile.on = "m-header--minimize-on", a.minimize.mobile.off = "m-header--minimize-off") : a.minimize.mobile = !1, "minimize" == mUtil.attr(t, "m-minimize") ? (a.minimize.desktop = {}, a.minimize.desktop.on = "m-header--minimize-on", a.minimize.desktop.off = "m-header--minimize-off") : a.minimize.desktop = !1, (e = mUtil.attr(t, "m-minimize-offset")) && (a.offset.desktop = e), (e = mUtil.attr(t, "m-minimize-mobile-offset")) && (a.offset.mobile = e), new mHeader("m_header", a), i = new mOffcanvas("m_header_menu", {
                overlay: !0,
                baseClass: "m-aside-header-menu-mobile",
                closeBy: "m_aside_header_menu_mobile_close_btn",
                toggleBy: {
                    target: "m_aside_header_menu_mobile_toggle",
                    state: "m-brand__toggler--active"
                }
            }), n = new mMenu("m_header_menu", {
                submenu: {
                    desktop: "dropdown",
                    tablet: "accordion",
                    mobile: "accordion"
                },
                accordion: {
                    slideSpeed: 200,
                    autoScroll: !0,
                    expandAll: !1
                }
            }), $("#m_aside_header_topbar_mobile_toggle").click(function() {
                $("body").toggleClass("m-topbar--on")
            }), setInterval(function() {
                $("#m_topbar_notification_icon .m-nav__link-icon").addClass("m-animate-shake"), $("#m_topbar_notification_icon .m-nav__link-badge").addClass("m-animate-blink")
            }, 3e3), setInterval(function() {
                $("#m_topbar_notification_icon .m-nav__link-icon").removeClass("m-animate-shake"), $("#m_topbar_notification_icon .m-nav__link-badge").removeClass("m-animate-blink")
            }, 6e3), 0 !== $("#m_quicksearch").length && new mQuicksearch("m_quicksearch", {
                mode: mUtil.attr("m_quicksearch", "m-quicksearch-mode"),
                minLength: 1
            }).on("search", function(t) {
                t.showProgress(), $.ajax({
                    url: "https://keenthemes.com/metronic/preview/inc/api/quick_search.php",
                    data: {
                        query: t.query
                    },
                    dataType: "html",
                    success: function(e) {
                        t.hideProgress(), t.showResult(e)
                    },
                    error: function(e) {
                        alert(22), t.hideProgress(), t.showError("Connection error. Pleae try again later.")
                    }
                })
            }), new mScrollTop("m_scroll_top", {
                offset: 300,
                speed: 600
            })
        },
        initAside: function() {
            var e, t;
            e = mUtil.get("m_aside_left"), t = mUtil.hasClass(e, "m-aside-left--offcanvas-default") ? "m-aside-left--offcanvas-default" : "m-aside-left", a = new mOffcanvas("m_aside_left", {
                    baseClass: t,
                    overlay: !0,
                    closeBy: "m_aside_left_close_btn",
                    toggleBy: {
                        target: "m_aside_left_offcanvas_toggle",
                        state: "m-brand__toggler--active"
                    }
                }),
                function() {
                    var e = $("#m_ver_menu"),
                        t = "1" === e.data("m-menu-dropdown") ? "dropdown" : "accordion";
                    if (o = new mMenu("m_ver_menu", {
                            submenu: {
                                desktop: {
                                    default: t,
                                    state: {
                                        body: "m-aside-left--minimize",
                                        mode: "dropdown"
                                    }
                                },
                                tablet: "accordion",
                                mobile: "accordion"
                            },
                            accordion: {
                                autoScroll: !0,
                                expandAll: !1
                            }
                        }), "1" === e.data("m-menu-scrollable")) {
                        function a(e) {
                            if (mUtil.isInResponsiveRange("tablet-and-mobile")) mApp.destroyScroller(e);
                            else {
                                var t = mUtil.getViewPort().height - mUtil.css("m_header", "height");
                                mApp.initScroller(e, {
                                    height: t
                                })
                            }
                        }
                        a(e), mUtil.addResizeHandler(function() {
                            a(o)
                        })
                    }
                }(), 0 !== $("#m_aside_left_minimize_toggle").length && (l = new mToggle("m_aside_left_minimize_toggle", {
                    target: "body",
                    targetState: "m-brand--minimize m-aside-left--minimize",
                    togglerState: "m-brand__toggler--active"
                })).on("toggle", function(e) {
                    n.pauseDropdownHover(800), o.pauseDropdownHover(800), Cookies.set("sidebar_toggle_state", e.getState())
                }), this.onLeftSidebarToggle(function(e) {
                    var t = $(".m-datatable");
                    $(t).each(function() {
                        $(this).mDatatable("redraw")
                    })
                })
        },
        getAsideMenu: function() {
            return o
        },
        onLeftSidebarToggle: function(e) {
            l && l.on("toggle", e)
        },
        closeMobileAsideMenuOffcanvas: function() {
            mUtil.isMobileDevice() && a.hide()
        },
        closeMobileHorMenuOffcanvas: function() {
            mUtil.isMobileDevice() && i.hide()
        }
    }
}();
$(document).ready(function() {
    !1 === mUtil.isAngularVersion() && mLayout.init()
});
var mQuickSidebar = function() {
    var n = $("#m_quick_sidebar"),
        o = $("#m_quick_sidebar_tabs"),
        e = n.find(".m-quick-sidebar__content"),
        t = function() {
            ! function() {
                var t = $("#m_quick_sidebar_tabs_messenger");
                if (0 !== t.length) {
                    var a = t.find(".m-messenger__messages"),
                        e = function() {
                            var e = n.outerHeight(!0) - o.outerHeight(!0) - t.find(".m-messenger__form").outerHeight(!0) - 120;
                            a.css("height", e), mApp.initScroller(a, {})
                        };
                    e(), mUtil.addResizeHandler(e)
                }
            }(),
            function() {
                var t = $("#m_quick_sidebar_tabs_settings");
                if (0 !== t.length) {
                    var e = function() {
                        var e = mUtil.getViewPort().height - o.outerHeight(!0) - 60;
                        t.css("height", e), mApp.initScroller(t, {})
                    };
                    e(), mUtil.addResizeHandler(e)
                }
            }(),
            function() {
                var t = $("#m_quick_sidebar_tabs_logs");
                if (0 !== t.length) {
                    var e = function() {
                        var e = mUtil.getViewPort().height - o.outerHeight(!0) - 60;
                        t.css("height", e), mApp.initScroller(t, {})
                    };
                    e(), mUtil.addResizeHandler(e)
                }
            }()
        };
    return {
        init: function() {
            0 !== n.length && new mOffcanvas("m_quick_sidebar", {
                overlay: !0,
                baseClass: "m-quick-sidebar",
                closeBy: "m_quick_sidebar_close",
                toggleBy: "m_quick_sidebar_toggle"
            }).one("afterShow", function() {
                mApp.block(n), setTimeout(function() {
                    mApp.unblock(n), e.removeClass("m--hide"), t()
                }, 1e3)
            })
        }
    }
}();
$(document).ready(function() {
    mQuickSidebar.init()
});