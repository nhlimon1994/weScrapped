var EF = function() {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function i(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e
    }

    function t(e) {
        return (t = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function o(e, t) {
        return (o = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function s(e, t) {
        return !t || "object" != typeof t && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }
    var a = "undefined" != typeof globalThis && globalThis || "undefined" != typeof self && self || void 0 !== a && a,
        c = "URLSearchParams" in a,
        f = "Symbol" in a && "iterator" in Symbol,
        u = "FileReader" in a && "Blob" in a && function() {
            try {
                return new Blob, !0
            } catch (e) {
                return !1
            }
        }(),
        d = "FormData" in a,
        h = "ArrayBuffer" in a;
    if (h) var l = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        _ = ArrayBuffer.isView || function(e) {
            return e && -1 < l.indexOf(Object.prototype.toString.call(e))
        };

    function p(e) {
        if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e) throw new TypeError('Invalid character in header field name: "' + e + '"');
        return e.toLowerCase()
    }

    function y(e) {
        return "string" != typeof e && (e = String(e)), e
    }

    function e(t) {
        var e = {
            next: function() {
                var e = t.shift();
                return {
                    done: void 0 === e,
                    value: e
                }
            }
        };
        return f && (e[Symbol.iterator] = function() {
            return e
        }), e
    }

    function v(t) {
        this.map = {}, t instanceof v ? t.forEach(function(e, t) {
            this.append(t, e)
        }, this) : Array.isArray(t) ? t.forEach(function(e) {
            this.append(e[0], e[1])
        }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
            this.append(e, t[e])
        }, this)
    }

    function b(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
    }

    function m(n) {
        return new Promise(function(e, t) {
            n.onload = function() {
                e(n.result)
            }, n.onerror = function() {
                t(n.error)
            }
        })
    }

    function w(e) {
        var t = new FileReader,
            n = m(t);
        return t.readAsArrayBuffer(e), n
    }

    function g(e) {
        if (e.slice) return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer
    }

    function E() {
        return this.bodyUsed = !1, this._initBody = function(e) {
            var t;
            this.bodyUsed = this.bodyUsed, (this._bodyInit = e) ? "string" == typeof e ? this._bodyText = e : u && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : d && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : c && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : h && u && ((t = e) && DataView.prototype.isPrototypeOf(t)) ? (this._bodyArrayBuffer = g(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : h && (ArrayBuffer.prototype.isPrototypeOf(e) || _(e)) ? this._bodyArrayBuffer = g(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : c && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
        }, u && (this.blob = function() {
            var e = b(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]))
        }, this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
                var e = b(this);
                return e ? e : ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer)
            }
            return this.blob().then(w)
        }), this.text = function() {
            var e, t, n, r = b(this);
            if (r) return r;
            if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, n = m(t), t.readAsText(e), n;
            if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
                for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
                return n.join("")
            }(this._bodyArrayBuffer));
            if (this._bodyFormData) throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText)
        }, d && (this.formData = function() {
            return this.text().then(T)
        }), this.json = function() {
            return this.text().then(JSON.parse)
        }, this
    }
    v.prototype.append = function(e, t) {
        e = p(e), t = y(t);
        var n = this.map[e];
        this.map[e] = n ? n + ", " + t : t
    }, v.prototype.delete = function(e) {
        delete this.map[p(e)]
    }, v.prototype.get = function(e) {
        return e = p(e), this.has(e) ? this.map[e] : null
    }, v.prototype.has = function(e) {
        return this.map.hasOwnProperty(p(e))
    }, v.prototype.set = function(e, t) {
        this.map[p(e)] = y(t)
    }, v.prototype.forEach = function(e, t) {
        for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
    }, v.prototype.keys = function() {
        var n = [];
        return this.forEach(function(e, t) {
            n.push(t)
        }), e(n)
    }, v.prototype.values = function() {
        var t = [];
        return this.forEach(function(e) {
            t.push(e)
        }), e(t)
    }, v.prototype.entries = function() {
        var n = [];
        return this.forEach(function(e, t) {
            n.push([t, e])
        }), e(n)
    }, f && (v.prototype[Symbol.iterator] = v.prototype.entries);
    var P = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

    function D(e, t) {
        if (!(this instanceof D)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        var n, r, i = (t = t || {}).body;
        if (e instanceof D) {
            if (e.bodyUsed) throw new TypeError("Already read");
            this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new v(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new v(t.headers)), this.method = (n = t.method || this.method || "GET", r = n.toUpperCase(), -1 < P.indexOf(r) ? r : n), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(i), !("GET" !== this.method && "HEAD" !== this.method || "no-store" !== t.cache && "no-cache" !== t.cache)) {
            var o = /([?&])_=[^&]*/;
            if (o.test(this.url)) this.url = this.url.replace(o, "$1_=" + (new Date).getTime());
            else {
                this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (new Date).getTime()
            }
        }
    }

    function T(e) {
        var i = new FormData;
        return e.trim().split("&").forEach(function(e) {
            if (e) {
                var t = e.split("="),
                    n = t.shift().replace(/\+/g, " "),
                    r = t.join("=").replace(/\+/g, " ");
                i.append(decodeURIComponent(n), decodeURIComponent(r))
            }
        }), i
    }

    function j(e, t) {
        if (!(this instanceof j)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        t = t || {}, this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = void 0 === t.statusText ? "" : "" + t.statusText, this.headers = new v(t.headers), this.url = t.url || "", this._initBody(e)
    }
    D.prototype.clone = function() {
        return new D(this, {
            body: this._bodyInit
        })
    }, E.call(D.prototype), E.call(j.prototype), j.prototype.clone = function() {
        return new j(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new v(this.headers),
            url: this.url
        })
    }, j.error = function() {
        var e = new j(null, {
            status: 0,
            statusText: ""
        });
        return e.type = "error", e
    };
    var O = [301, 302, 303, 307, 308];
    j.redirect = function(e, t) {
        if (-1 === O.indexOf(t)) throw new RangeError("Invalid status code");
        return new j(null, {
            status: t,
            headers: {
                location: e
            }
        })
    };
    var S = a.DOMException;
    try {
        new S
    } catch (e) {
        (S = function(e, t) {
            this.message = e, this.name = t;
            var n = Error(e);
            this.stack = n.stack
        }).prototype = Object.create(Error.prototype), S.prototype.constructor = S
    }

    function U(i, s) {
        return new Promise(function(r, e) {
            var t = new D(i, s);
            if (t.signal && t.signal.aborted) return e(new S("Aborted", "AbortError"));
            var o = new XMLHttpRequest;

            function n() {
                o.abort()
            }
            o.onload = function() {
                var e, i, t = {
                    status: o.status,
                    statusText: o.statusText,
                    headers: (e = o.getAllResponseHeaders() || "", i = new v, e.replace(/\r?\n[\t ]+/g, " ").split("\r").map(function(e) {
                        return 0 === e.indexOf("\n") ? e.substr(1, e.length) : e
                    }).forEach(function(e) {
                        var t = e.split(":"),
                            n = t.shift().trim();
                        if (n) {
                            var r = t.join(":").trim();
                            i.append(n, r)
                        }
                    }), i)
                };
                t.url = "responseURL" in o ? o.responseURL : t.headers.get("X-Request-URL");
                var n = "response" in o ? o.response : o.responseText;
                setTimeout(function() {
                    r(new j(n, t))
                }, 0)
            }, o.onerror = function() {
                setTimeout(function() {
                    e(new TypeError("Network request failed"))
                }, 0)
            }, o.ontimeout = function() {
                setTimeout(function() {
                    e(new TypeError("Network request failed"))
                }, 0)
            }, o.onabort = function() {
                setTimeout(function() {
                    e(new S("Aborted", "AbortError"))
                }, 0)
            }, o.open(t.method, function(t) {
                try {
                    return "" === t && a.location.href ? a.location.href : t
                } catch (e) {
                    return t
                }
            }(t.url), !0), "include" === t.credentials ? o.withCredentials = !0 : "omit" === t.credentials && (o.withCredentials = !1), "responseType" in o && (u ? o.responseType = "blob" : h && t.headers.get("Content-Type") && -1 !== t.headers.get("Content-Type").indexOf("application/octet-stream") && (o.responseType = "arraybuffer")), !s || "object" != typeof s.headers || s.headers instanceof v ? t.headers.forEach(function(e, t) {
                o.setRequestHeader(t, e)
            }) : Object.getOwnPropertyNames(s.headers).forEach(function(e) {
                o.setRequestHeader(e, y(s.headers[e]))
            }), t.signal && (t.signal.addEventListener("abort", n), o.onreadystatechange = function() {
                4 === o.readyState && t.signal.removeEventListener("abort", n)
            }), o.send(void 0 === t._bodyInit ? null : t._bodyInit)
        })
    }
    U.polyfill = !0, a.fetch || (a.fetch = U, a.Headers = v, a.Request = D, a.Response = j);
    var A = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function R(t) {
        var n = this.constructor;
        return this.then(function(e) {
            return n.resolve(t()).then(function() {
                return e
            })
        }, function(e) {
            return n.resolve(t()).then(function() {
                return n.reject(e)
            })
        })
    }

    function k(n) {
        return new this(function(r, e) {
            if (!n || void 0 === n.length) return e(new TypeError(typeof n + " " + n + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var i = Array.prototype.slice.call(n);
            if (0 === i.length) return r([]);
            var o = i.length;

            function s(t, e) {
                if (e && ("object" == typeof e || "function" == typeof e)) {
                    var n = e.then;
                    if ("function" == typeof n) return void n.call(e, function(e) {
                        s(t, e)
                    }, function(e) {
                        i[t] = {
                            status: "rejected",
                            reason: e
                        }, 0 == --o && r(i)
                    })
                }
                i[t] = {
                    status: "fulfilled",
                    value: e
                }, 0 == --o && r(i)
            }
            for (var t = 0; t < i.length; t++) s(t, i[t])
        })
    }! function(t) {
        function e(t) {
            var e = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return i && (e[Symbol.iterator] = function() {
                return e
            }), e
        }

        function r(e) {
            return encodeURIComponent(e).replace(/%20/g, "+")
        }

        function o(e) {
            return decodeURIComponent(String(e).replace(/\+/g, " "))
        }
        var s, n, i = function() {
            try {
                return !!Symbol.iterator
            } catch (e) {
                return !1
            }
        }();
        ! function() {
            try {
                var e = t.URLSearchParams;
                return "a=1" === new e("?a=1").toString() && "function" == typeof e.prototype.set && "function" == typeof e.prototype.entries
            } catch (e) {
                return !1
            }
        }() && ((n = (s = function(e) {
            Object.defineProperty(this, "_entries", {
                writable: !0,
                value: {}
            });
            var t = typeof e;
            if ("undefined" != t)
                if ("string" == t) "" !== e && this._fromString(e);
                else if (e instanceof s) {
                var n = this;
                e.forEach(function(e, t) {
                    n.append(t, e)
                })
            } else {
                if (null === e || "object" != t) throw new TypeError("Unsupported input's type for URLSearchParams");
                if ("[object Array]" === Object.prototype.toString.call(e))
                    for (var r = 0; r < e.length; r++) {
                        var i = e[r];
                        if ("[object Array]" !== Object.prototype.toString.call(i) && 2 === i.length) throw new TypeError("Expected [string, any] as entry at index " + r + " of URLSearchParams's input");
                        this.append(i[0], i[1])
                    } else
                        for (var o in e) e.hasOwnProperty(o) && this.append(o, e[o])
            }
        }).prototype).append = function(e, t) {
            e in this._entries ? this._entries[e].push(String(t)) : this._entries[e] = [String(t)]
        }, n.delete = function(e) {
            delete this._entries[e]
        }, n.get = function(e) {
            return e in this._entries ? this._entries[e][0] : null
        }, n.getAll = function(e) {
            return e in this._entries ? this._entries[e].slice(0) : []
        }, n.has = function(e) {
            return e in this._entries
        }, n.set = function(e, t) {
            this._entries[e] = [String(t)]
        }, n.forEach = function(e, t) {
            var n;
            for (var r in this._entries)
                if (this._entries.hasOwnProperty(r)) {
                    n = this._entries[r];
                    for (var i = 0; i < n.length; i++) e.call(t, n[i], r, this)
                }
        }, n.keys = function() {
            var n = [];
            return this.forEach(function(e, t) {
                n.push(t)
            }), e(n)
        }, n.values = function() {
            var t = [];
            return this.forEach(function(e) {
                t.push(e)
            }), e(t)
        }, n.entries = function() {
            var n = [];
            return this.forEach(function(e, t) {
                n.push([t, e])
            }), e(n)
        }, i && (n[Symbol.iterator] = n.entries), n.toString = function() {
            var n = [];
            return this.forEach(function(e, t) {
                n.push(r(t) + "=" + r(e))
            }), n.join("&")
        }, t.URLSearchParams = s);
        var a = t.URLSearchParams.prototype;
        "function" != typeof a.sort && (a.sort = function() {
            var n = this,
                r = [];
            this.forEach(function(e, t) {
                r.push([t, e]), n._entries || n.delete(t)
            }), r.sort(function(e, t) {
                return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0
            }), n._entries && (n._entries = {});
            for (var e = 0; e < r.length; e++) this.append(r[e][0], r[e][1])
        }), "function" != typeof a._fromString && Object.defineProperty(a, "_fromString", {
            enumerable: !1,
            configurable: !1,
            writable: !1,
            value: function(e) {
                if (this._entries) this._entries = {};
                else {
                    var n = [];
                    this.forEach(function(e, t) {
                        n.push(t)
                    });
                    for (var t = 0; t < n.length; t++) this.delete(n[t])
                }
                var r, i = (e = e.replace(/^\?/, "")).split("&");
                for (t = 0; t < i.length; t++) r = i[t].split("="), this.append(o(r[0]), 1 < r.length ? o(r[1]) : "")
            }
        })
    }(void 0 !== A ? A : "undefined" != typeof window ? window : "undefined" != typeof self ? self : A),
    function(d) {
        var t, n;

        function e(e, t) {
            "string" != typeof e && (e = String(e)), t && "string" != typeof t && (t = String(t));
            var n, r = document;
            if (t && (void 0 === d.location || t !== d.location.href)) {
                t = t.toLowerCase(), (n = (r = document.implementation.createHTMLDocument("")).createElement("base")).href = t, r.head.appendChild(n);
                try {
                    if (0 !== n.href.indexOf(t)) throw new Error(n.href)
                } catch (e) {
                    throw new Error("URL unable to set base " + t + " due to " + e)
                }
            }
            var i = r.createElement("a");
            i.href = e, n && (r.body.appendChild(i), i.href = i.href);
            var o = r.createElement("input");
            if (o.type = "url", o.value = e, ":" === i.protocol || !/:/.test(i.href) || !o.checkValidity() && !t) throw new TypeError("Invalid URL");
            Object.defineProperty(this, "_anchorElement", {
                value: i
            });
            var s = new d.URLSearchParams(this.search),
                a = !0,
                c = !0,
                f = this;
            ["append", "delete", "set"].forEach(function(e) {
                var t = s[e];
                s[e] = function() {
                    t.apply(s, arguments), a && (c = !1, f.search = s.toString(), c = !0)
                }
            }), Object.defineProperty(this, "searchParams", {
                value: s,
                enumerable: !0
            });
            var u = void 0;
            Object.defineProperty(this, "_updateSearchParams", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function() {
                    this.search !== u && (u = this.search, c && (a = !1, this.searchParams._fromString(this.search), a = !0))
                }
            })
        }
        if (! function() {
                try {
                    var e = new d.URL("b", "../../../../http/a_4849673.html");
                    return e.pathname = "c d", "http://a/c%20d" === e.href && e.searchParams
                } catch (e) {
                    return !1
                }
            }() && (t = d.URL, n = e.prototype, ["hash", "host", "hostname", "port", "protocol"].forEach(function(e) {
                var t;
                t = e, Object.defineProperty(n, t, {
                    get: function() {
                        return this._anchorElement[t]
                    },
                    set: function(e) {
                        this._anchorElement[t] = e
                    },
                    enumerable: !0
                })
            }), Object.defineProperty(n, "search", {
                get: function() {
                    return this._anchorElement.search
                },
                set: function(e) {
                    this._anchorElement.search = e, this._updateSearchParams()
                },
                enumerable: !0
            }), Object.defineProperties(n, {
                toString: {
                    get: function() {
                        var e = this;
                        return function() {
                            return e.href
                        }
                    }
                },
                href: {
                    get: function() {
                        return this._anchorElement.href.replace(/\?$/, "")
                    },
                    set: function(e) {
                        this._anchorElement.href = e, this._updateSearchParams()
                    },
                    enumerable: !0
                },
                pathname: {
                    get: function() {
                        return this._anchorElement.pathname.replace(/(^\/?)/, "/")
                    },
                    set: function(e) {
                        this._anchorElement.pathname = e
                    },
                    enumerable: !0
                },
                origin: {
                    get: function() {
                        var e = {
                                "http:": 80,
                                "https:": 443,
                                "ftp:": 21
                            } [this._anchorElement.protocol],
                            t = this._anchorElement.port != e && "" !== this._anchorElement.port;
                        return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "")
                    },
                    enumerable: !0
                },
                password: {
                    get: function() {
                        return ""
                    },
                    set: function(e) {},
                    enumerable: !0
                },
                username: {
                    get: function() {
                        return ""
                    },
                    set: function(e) {},
                    enumerable: !0
                }
            }), e.createObjectURL = function(e) {
                return t.createObjectURL.apply(t, arguments)
            }, e.revokeObjectURL = function(e) {
                return t.revokeObjectURL.apply(t, arguments)
            }, d.URL = e), void 0 !== d.location && !("origin" in d.location)) {
            var r = function() {
                return d.location.protocol + "//" + d.location.hostname + (d.location.port ? ":" + d.location.port : "")
            };
            try {
                Object.defineProperty(d.location, "origin", {
                    get: r,
                    enumerable: !0
                })
            } catch (e) {
                setInterval(function() {
                    d.location.origin = r()
                }, 100)
            }
        }
    }(void 0 !== A ? A : "undefined" != typeof window ? window : "undefined" != typeof self ? self : A);
    var B = setTimeout;

    function L(e) {
        return Boolean(e && void 0 !== e.length)
    }

    function x() {}

    function F(e) {
        if (!(this instanceof F)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], N(e, this)
    }

    function I(n, r) {
        for (; 3 === n._state;) n = n._value;
        0 !== n._state ? (n._handled = !0, F._immediateFn(function() {
            var e = 1 === n._state ? r.onFulfilled : r.onRejected;
            if (null !== e) {
                var t;
                try {
                    t = e(n._value)
                } catch (e) {
                    return void H(r.promise, e)
                }
                C(r.promise, t)
            } else(1 === n._state ? C : H)(r.promise, n._value)
        })) : n._deferreds.push(r)
    }

    function C(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var n = e.then;
                if (e instanceof F) return t._state = 3, t._value = e, void q(t);
                if ("function" == typeof n) return void N((r = n, i = e, function() {
                    r.apply(i, arguments)
                }), t)
            }
            t._state = 1, t._value = e, q(t)
        } catch (e) {
            H(t, e)
        }
        var r, i
    }

    function H(e, t) {
        e._state = 2, e._value = t, q(e)
    }

    function q(e) {
        2 === e._state && 0 === e._deferreds.length && F._immediateFn(function() {
            e._handled || F._unhandledRejectionFn(e._value)
        });
        for (var t = 0, n = e._deferreds.length; t < n; t++) I(e, e._deferreds[t]);
        e._deferreds = null
    }

    function G(e, t, n) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
    }

    function N(e, t) {
        var n = !1;
        try {
            e(function(e) {
                n || (n = !0, C(t, e))
            }, function(e) {
                n || (n = !0, H(t, e))
            })
        } catch (e) {
            if (n) return;
            n = !0, H(t, e)
        }
    }
    F.prototype.catch = function(e) {
        return this.then(null, e)
    }, F.prototype.then = function(e, t) {
        var n = new this.constructor(x);
        return I(this, new G(e, t, n)), n
    }, F.prototype.finally = R, F.all = function(t) {
        return new F(function(r, i) {
            if (!L(t)) return i(new TypeError("Promise.all accepts an array"));
            var o = Array.prototype.slice.call(t);
            if (0 === o.length) return r([]);
            var s = o.length;

            function a(t, e) {
                try {
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var n = e.then;
                        if ("function" == typeof n) return void n.call(e, function(e) {
                            a(t, e)
                        }, i)
                    }
                    o[t] = e, 0 == --s && r(o)
                } catch (e) {
                    i(e)
                }
            }
            for (var e = 0; e < o.length; e++) a(e, o[e])
        })
    }, F.allSettled = k, F.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === F ? t : new F(function(e) {
            e(t)
        })
    }, F.reject = function(n) {
        return new F(function(e, t) {
            t(n)
        })
    }, F.race = function(i) {
        return new F(function(e, t) {
            if (!L(i)) return t(new TypeError("Promise.race accepts an array"));
            for (var n = 0, r = i.length; n < r; n++) F.resolve(i[n]).then(e, t)
        })
    }, F._immediateFn = "function" == typeof setImmediate ? function(e) {
        setImmediate(e)
    } : function(e) {
        B(e, 0)
    }, F._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };
    var M = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("unable to locate global object")
    }();
    "function" != typeof M.Promise ? M.Promise = F : M.Promise.prototype.finally ? M.Promise.allSettled || (M.Promise.allSettled = k) : M.Promise.prototype.finally = R;
    var V = function() {
        function t(e) {
            if (n(this, t), this.constructor === t) throw new TypeError("Can not construct abstract class.");
            if (this._persist === t.prototype._persist) throw new TypeError("Please implement abstract method _persist.");
            if (this._fetch === t.prototype._fetch) throw new TypeError("Please implement abstract method _fetch.");
            this.customParamProvider = e, this._trackingDomain = "../../../www.pmd3trk.com_4718632.html"
        }
        return i(t, [{
            key: "configure",
            value: function(e) {
                this._trackingDomain = e.tracking_domain
            }
        }, {
            key: "getAdvertiserTransactionId",
            value: function(e) {
                var t = this._fetch("ef_tid_c_a_".concat(e)).split("|");
                return t = t ? t[t.length - 1] : this._fetch("ef_tid_i_a_".concat(e))
            }
        }, {
            key: "getTransactionId",
            value: function(e) {
                var t = this._fetch("ef_tid_c_o_".concat(e)).split("|");
                return t = (t = t ? t[t.length - 1] : this._fetch("ef_tid_i_o_".concat(e))) || this._fetch("ef_tid_".concat(e))
            }
        }, {
            key: "impression",
            value: function(o) {
                var s = this;
                return o.offer_id ? !0 === o.do_not_track ? Promise.resolve("") : new Promise(function(i, e) {
                    s.customParamProvider.then(function(e) {
                        var t = new URL("".concat(s._trackingDomain, "../../sdk/impression_2424839.html")),
                            n = new URLSearchParams(t.search);
                        for (var r in e) e.hasOwnProperty(r) && n.set(r, e[r]);
                        n.set("oid", o.offer_id), n.set("affid", o.affiliate_id || ""), n.set("async", "json"), s._isDefined(o.sub1) && n.set("sub1", o.sub1), s._isDefined(o.sub2) && n.set("sub2", o.sub2), s._isDefined(o.sub3) && n.set("sub3", o.sub3), s._isDefined(o.sub4) && n.set("sub4", o.sub4), s._isDefined(o.sub5) && n.set("sub5", o.sub5), s._isDefined(o.adv1) && n.set("adv1", o.adv1), s._isDefined(o.adv2) && n.set("adv2", o.adv2), s._isDefined(o.adv3) && n.set("adv3", o.adv3), s._isDefined(o.adv4) && n.set("adv4", o.adv4), s._isDefined(o.adv5) && n.set("adv5", o.adv5), s._isDefined(o.source_id) && n.set("source_id", o.source_id), s._isDefined(o.creative_id) && n.set("creative_id", o.creative_id), s._isDefined(o.fbclid) ? n.set("fbclid", o.fbclid) : s._setDefaultFromURL(n, "fbclid"), !0 === o.disable_fingerprinting && n.delete("effp"), t.search = n.toString(), fetch(t.toString(), {
                            method: "GET",
                            credentials: "include"
                        }).then(function(e) {
                            return e.json()
                        }, function(e) {
                            console.error(e), i("")
                        }).then(function(e) {
                            e.transaction_id && 0 < e.transaction_id.length && (s._persist("ef_tid_i_o_".concat(e.oid || o.offer_id), e.transaction_id), s._persist("ef_tid_i_a_".concat(e.aid), e.transaction_id), i(e.transaction_id))
                        })
                    })
                }) : (console.warn('Unable to track. Missing "offer_id" parameter.'), Promise.resolve(""))
            }
        }, {
            key: "click",
            value: function(o) {
                var s = this;
                return o.offer_id || o.transaction_id || o.coupon_code ? !0 === o.do_not_track ? Promise.resolve("") : new Promise(function(i, e) {
                    s.customParamProvider.then(function(e) {
                        var t = new URL("".concat(s._trackingDomain, "../../sdk/click_4849677.html")),
                            n = new URLSearchParams(t.search);
                        for (var r in e) e.hasOwnProperty(r) && n.set(r, e[r]);
                        n.set("_ef_transaction_id", o.transaction_id || ""), n.set("oid", o.offer_id || ""), n.set("affid", o.affiliate_id || ""), n.set("__cc", o.coupon_code || ""), n.set("async", "json"), s._isDefined(o.uid) && n.set("uid", o.uid), s._isDefined(o.sub1) && n.set("sub1", o.sub1), s._isDefined(o.sub2) && n.set("sub2", o.sub2), s._isDefined(o.sub3) && n.set("sub3", o.sub3), s._isDefined(o.sub4) && n.set("sub4", o.sub4), s._isDefined(o.sub5) && n.set("sub5", o.sub5), s._isDefined(o.adv1) && n.set("adv1", o.adv1), s._isDefined(o.adv2) && n.set("adv2", o.adv2), s._isDefined(o.adv3) && n.set("adv3", o.adv3), s._isDefined(o.adv4) && n.set("adv4", o.adv4), s._isDefined(o.adv5) && n.set("adv5", o.adv5), s._isDefined(o.source_id) && n.set("source_id", o.source_id), s._isDefined(o.creative_id) && n.set("creative_id", o.creative_id), s._isDefined(o.fbclid) ? n.set("fbclid", o.fbclid) : s._setDefaultFromURL(n, "fbclid"), s._isDefined(o.gclid) ? n.set("gclid", o.gclid) : s._setDefaultFromURL(n, "gclid"), !0 === o.disable_fingerprinting && n.delete("effp"), t.search = n.toString(), fetch(t.toString(), {
                            method: "GET",
                            credentials: "include"
                        }).then(function(e) {
                            return e.json()
                        }, function(e) {
                            console.error(e), i("")
                        }).then(function(e) {
                            if (e.transaction_id && 0 < e.transaction_id.length) {
                                var t = s._fetch("ef_tid_c_o_".concat(e.oid || o.offer_id));
                                s._persist("ef_tid_c_o_".concat(e.oid || o.offer_id), t && 0 < t.length ? "".concat(t, "|").concat(e.transaction_id) : e.transaction_id);
                                var n = s._fetch("ef_tid_c_a_".concat(e.aid));
                                s._persist("ef_tid_c_a_".concat(e.aid), n && 0 < n.length ? "".concat(n, "|").concat(e.transaction_id) : e.transaction_id), i(e.transaction_id)
                            }
                        })
                    })
                }) : (console.warn('Unable to track. Missing "offer_id" or "transaction_id" parameter.'), Promise.resolve(""))
            }
        }, {
            key: "conversion",
            value: function(o) {
                var s = this;
                if (!o.transaction_id)
                    if (this._isDefined(o.offer_id)) o.transaction_id = this._fetch("ef_tid_c_o_".concat(o.offer_id)), o.transaction_id || (o.transaction_id = this._fetch("ef_tid_i_o_".concat(o.offer_id))), o.transaction_id || (o.transaction_id = this._fetch("ef_tid_".concat(o.offer_id)));
                    else if (this._isDefined(o.advertiser_id) || this._isDefined(o.aid)) {
                    var e = o.advertiser_id || o.aid;
                    o.transaction_id = this._fetch("ef_tid_c_a_".concat(e)), o.transaction_id || (o.transaction_id = this._fetch("ef_tid_i_a_".concat(e))), o.transaction_id || (o.transaction_id = this._fetch("ef_tid_".concat(o.offer_id)))
                }
                return o.transaction_id && 332 < o.transaction_id.length && (o.transaction_id = o.transaction_id.substring(0, 33) + o.transaction_id.substring(o.transaction_id.length - 297, o.transaction_id.length)), new Promise(function(i, e) {
                    s.customParamProvider.then(function(e) {
                        var t = new URL("".concat(s._trackingDomain, "../../sdk/conversion_3211264.html")),
                            n = new URLSearchParams(t.search);
                        for (var r in e) e.hasOwnProperty(r) && n.set(r, e[r]);
                        n.set("transaction_id", o.transaction_id || ""), n.set("event_id", o.event_id || 0), s._isDefined(o.offer_id) && n.set("oid", o.offer_id), s._isDefined(o.affiliate_id) && n.set("affid", o.affiliate_id), s._isDefined(o.advertiser_id) && n.set("advid", o.advertiser_id), s._isDefined(o.aid) && n.set("aid", o.aid), s._isDefined(o.adv_event_id) && (n.set("adv_event_id", o.adv_event_id), n.delete("event_id")), s._isDefined(o.coupon_code) && n.set("coupon_code", o.coupon_code), s._isDefined(o.amount) && n.set("amount", o.amount), s._isDefined(o.adv1) && n.set("adv1", o.adv1), s._isDefined(o.adv2) && n.set("adv2", o.adv2), s._isDefined(o.adv3) && n.set("adv3", o.adv3), s._isDefined(o.adv4) && n.set("adv4", o.adv4), s._isDefined(o.adv5) && n.set("adv5", o.adv5), s._isDefined(o.sub1) && n.set("sub1", o.sub1), s._isDefined(o.sub2) && n.set("sub2", o.sub2), s._isDefined(o.sub3) && n.set("sub3", o.sub3), s._isDefined(o.sub4) && n.set("sub4", o.sub4), s._isDefined(o.sub5) && n.set("sub5", o.sub5), s._isDefined(o.order_id) && n.set("order_id", o.order_id), s._isDefined(o.verification_token) && n.set("verification_token", o.verification_token), s._isDefined(o.email) && n.set("email", o.email), s._isDefined(o.order) && n.set("order", JSON.stringify(o.order)), !0 === o.disable_fingerprinting && n.delete("effp"), s._isDefined(o.parameters) && Object.keys(o.parameters).forEach(function(e) {
                            return n.set(e, o.parameters[e])
                        }), n.set("event_source_url", window.location.hostname), t.search = n.toString(), fetch(t.toString(), {
                            method: "GET",
                            headers: {
                                Accept: "application/json"
                            },
                            credentials: "include"
                        }).then(function(e) {
                            return 200 === e.status ? e.json() : {
                                conversion_id: "",
                                transaction_id: "",
                                html_pixel: ""
                            }
                        }).then(function(e) {
                            if ("" != e.html_pixel) {
                                var t = document.createElement("iframe");
                                t.width = 1, t.height = 1, t.frameBorder = 0, document.getElementsByTagName("body")[0].appendChild(t), t.contentWindow.document.open(), t.contentWindow.document.write(e.html_pixel), t.contentWindow.document.close()
                            }
                            i({
                                transaction_id: e.transaction_id,
                                conversion_id: e.conversion_id
                            })
                        }).catch(function(e) {
                            console.log(e), i({
                                conversion_id: "",
                                transaction_id: "",
                                html_pixel: ""
                            })
                        })
                    })
                })
            }
        }, {
            key: "_fetch",
            value: function() {
                throw new TypeError("Do not call abstract method _fetch")
            }
        }, {
            key: "_persist",
            value: function() {
                throw new TypeError("Do not call abstract method _persist")
            }
        }, {
            key: "_isDefined",
            value: function(e) {
                return void 0 !== e && null != e
            }
        }, {
            key: "_setDefaultFromURL",
            value: function(e, t) {
                var n = this.urlParameter(t);
                this._isDefined(n) && e.set(t, n)
            }
        }, {
            key: "urlParameter",
            value: function(e) {
                return new URL(window.location.href).searchParams.get(e)
            }
        }]), t
    }();
    return new(function() {
        function e() {
            return n(this, e), s(this, t(e).call(this, Promise.resolve({})))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && o(e, t)
        }(e, V), i(e, [{
            key: "_fetch",
            value: function(e) {
                for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), r = 0; r < n.length; r++) {
                    for (var i = n[r];
                        " " == i.charAt(0);) i = i.substring(1);
                    if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
                }
                return ""
            }
        }, {
            key: "_persist",
            value: function(e, t, n) {
                var r = 2 < arguments.length && void 0 !== n ? n : 30,
                    i = new Date;
                i.setTime(i.getTime() + 24 * r * 60 * 60 * 1e3), document.cookie = "".concat(e, "=").concat(t, ";expires=").concat(i.toUTCString(), ";path=/")
            }
        }]), e
    }())
}();