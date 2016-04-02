!function e(t, n, r) {
    function o(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l)
                    return l(a, !0);
                if (i)
                    return i(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND",
                u
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return o(n ? n : e)
            }, c, c.exports, e, t, n, r)
        }
        return n[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < r.length; a++)
        o(r[a]);
    return o
}({
    1: [function(e, t) {
        t.exports = function() {
            $(function() {
                $("a[href='" + location.pathname + "']").addClass("active")
            })
        }
    }
    , {}],
    2: [function(e, t) {
        var n = e("../templates/team-package.hbs")
          , r = function(e) {
            return "string" == typeof e && (e = {
                name: e,
                permissions: "write"
            }),
            n({
                pkgname: e.name || "",
                canWrite: "write" === e.permissions
            })
        }
          , o = function(e, t) {
            var n = "/org/" + e + "/team/" + t + "/package"
              , r = {
                method: "GET",
                url: n,
                json: !0,
                data: {}
            };
            return window && window.crumb && (r.data.crumb = window.crumb,
            r.headers = {
                "x-csrf-token": window.crumb
            }),
            $.ajax(r)
        }
          , i = function(e, t) {
            var n = "/org/" + e + "/package"
              , r = {
                method: "GET",
                url: n,
                json: !0,
                data: {
                    name: t
                }
            };
            return window && window.crumb && (r.data.crumb = window.crumb,
            r.headers = {
                "x-csrf-token": window.crumb
            }),
            $.ajax(r)
        }
          , a = function(e) {
            this.$el = e,
            this.teamSelect = this.$el.find("[name=teams]"),
            this.personalSelect = this.$el.find("[name=personal]"),
            this.pkgsList = $(".packages-list"),
            this.packageCount = 0;
            var t = this.$el.attr("action")
              , n = t.split("/");
            this.orgScope = n[2],
            5 === n.length && (this.teamName = n[4])
        }
        ;
        a.prototype.removePackage = function(e) {
            $('[data-name="' + e + '"]').remove(),
            this.packageCount--,
            this.updatePackageCount()
        }
        ,
        a.prototype.removeAll = function() {
            this.pkgsList.empty(),
            this.packageCount = 0,
            this.updatePackageCount()
        }
        ,
        a.prototype.updatePackageCount = function() {
            $(".add-count .add-number").text(this.packageCount),
            1 === this.packageCount ? $(".add-count .unit").text("Package") : $(".add-count .unit").text("Packages")
        }
        ,
        a.prototype.addPackages = function(e) {
            var t = e.items || e
              , n = t.map(function(e) {
                return r(e)
            }).join("");
            this.pkgsList.append(n),
            this.packageCount = t.length,
            this.updatePackageCount()
        }
        ,
        a.prototype.addPackage = function(e) {
            var t = r(e);
            this.pkgsList.append(t),
            this.packageCount += 1,
            this.updatePackageCount()
        }
        ,
        a.prototype.notify = function(e) {
            $(".notice").remove();
            var t = "<div class='notice'>" + e + "</div>";
            $(".container.content").prepend(t)
        }
        ,
        t.exports = function() {
            $(function() {
                var e = $("[data-form-function=add-package-to-team]");
                if (e.length) {
                    var t = new a(e)
                      , n = $("#add-package-to-list");
                    n.on("click", function() {
                        var e = $(this).closest("fieldset")
                          , n = e.find("[name=package]").val();
                        if (n) {
                            t.addPackages([{
                                name: n
                            }]),
                            e.find("[name=pkg]").val("");
                            var r = "";
                            return i(t.orgScope, n).fail(function(e) {
                                return r = 404 === e.status ? "User " + n + " is not a pkg of this Org, please add them" : e.status < 500 ? e.responseJSON && e.responseJSON.error : "An internal error occurred",
                                t.notify(r),
                                t.removePackage(n)
                            })
                        }
                    }),
                    t.teamSelect.on("change", function() {
                        var e = this.options[this.selectedIndex].value;
                        if ("_none_" !== e)
                            return o(t.orgScope, e).done(function(e) {
                                return t.removeAll(),
                                t.addPackages(e)
                            }).fail(function() {
                                t.notify("An error occurred while populating the list")
                            })
                    }),
                    t.personalSelect.on("change", function() {
                        var e = this.options[this.selectedIndex].value;
                        if ("_none_" !== e)
                            return t.addPackage(e)
                    }),
                    t.$el.find("[type=submit]").on("click", function(e) {
                        e.preventDefault(),
                        e.stopPropagation(),
                        $("#add-pkg-input").val("").attr("disabled", "disabled"),
                        t.$el.submit()
                    }),
                    t.$el.on("click", ".delete-package", function(e) {
                        var n = $(e.target).closest("[data-name]").data("name");
                        t.removePackage(n)
                    }),
                    t.$el.on("click", ".remove-all-pkgs", function() {
                        t.removeAll()
                    })
                }
            })
        }
    }
    , {
        "../templates/team-package.hbs": 37
    }],
    3: [function(e, t) {
        var n = function(e) {
            "string" == typeof e && (e = {
                name: e
            });
            var t = e.name || ""
              , n = e.role || "";
            return "<li data-name='" + t + "'><span class='name'><a href='/~" + t + "'>" + t + "</a></span><span class='role'>" + n + "</span><span class='delete-user-wrapper'><button type='button' class='delete-user icon-x'></span><span class='a11y-only'>Remove User " + t + "</span></button><input type='hidden' name='member' value='" + t + "' />"
        }
          , r = function(e, t) {
            var n = "/org/" + e + "/team/" + t + "/user"
              , r = {
                method: "GET",
                url: n,
                json: !0,
                data: {}
            };
            return window && window.crumb && (r.data.crumb = window.crumb,
            r.headers = {
                "x-csrf-token": window.crumb
            }),
            $.ajax(r)
        }
          , o = function(e, t) {
            var n = "/org/" + e + "/user"
              , r = {
                method: "GET",
                url: n,
                json: !0,
                data: {
                    member: t
                }
            };
            return window && window.crumb && (r.data.crumb = window.crumb,
            r.headers = {
                "x-csrf-token": window.crumb
            }),
            $.ajax(r)
        }
          , i = function(e) {
            this.$el = e,
            this.selectMenu = this.$el.find("[name=teams]"),
            this.membersList = $(".members-list"),
            this.memberCount = 0;
            var t = this.$el.attr("action")
              , n = t.split("/");
            this.orgScope = n[2],
            5 === n.length && (this.teamName = n[4])
        }
        ;
        i.prototype.removeUser = function(e) {
            $("[data-name=" + e + "]").remove(),
            this.memberCount--,
            this.updateMemberCount()
        }
        ,
        i.prototype.removeAll = function() {
            this.membersList.empty(),
            this.memberCount = 0,
            this.updateMemberCount()
        }
        ,
        i.prototype.updateMemberCount = function() {
            $(".add-count .add-number").text(this.memberCount),
            1 === this.memberCount ? $(".add-count .unit").text("User") : $(".add-count .unit").text("Users")
        }
        ,
        i.prototype.addUsers = function(e) {
            var t = e.map(function(e) {
                return n(e)
            }).join("");
            this.membersList.append(t),
            this.memberCount = e.length,
            this.updateMemberCount()
        }
        ,
        i.prototype.notify = function(e) {
            $(".notice").remove();
            var t = "<div class='notice'>" + e + "</div>";
            $(".container.content").prepend(t)
        }
        ,
        t.exports = function() {
            $(function() {
                var e = $("[data-form-function=add-user-to-team]");
                if (e.length) {
                    var t = new i(e)
                      , n = $("#add-member-to-list");
                    n.on("click", function() {
                        var e = $(this).closest("fieldset")
                          , n = e.find("[name=member]").val();
                        if (n) {
                            t.addUsers([{
                                name: n
                            }]),
                            e.find("[name=member]").val("");
                            var r = "";
                            return o(t.orgScope, n).fail(function(e) {
                                return r = 404 === e.status ? "User " + n + " is not a member of this Organization, <a href='/org/" + t.orgScope + "/members'>please add them</a>" : e.status < 500 ? e.responseJSON && e.responseJSON.error : "An internal error occurred",
                                t.notify(r),
                                t.removeUser(n)
                            })
                        }
                    }),
                    $(window).keydown(function(e) {
                        return 13 === e.keyCode ? (e.preventDefault(),
                        n.triggerHandler("click")) : void 0
                    }),
                    t.selectMenu.on("change", function() {
                        var e = this.options[this.selectedIndex].value;
                        if ("_none_" !== e)
                            return r(t.orgScope, e).done(function(e) {
                                return t.removeAll(),
                                t.addUsers(e)
                            }).fail(function() {
                                t.notify("An error occurred while populating the list")
                            })
                    }),
                    t.$el.find("[type=submit]").on("click", function(e) {
                        e.preventDefault(),
                        e.stopPropagation(),
                        $("#add-member-input").val("").attr("disabled", "disabled"),
                        t.$el.submit()
                    }),
                    t.$el.on("click", ".delete-user", function(e) {
                        var n = $(e.target).closest("[data-name]").data("name");
                        t.removeUser(n)
                    }),
                    t.$el.on("click", ".remove-all-users", function() {
                        t.removeAll()
                    })
                }
            })
        }
    }
    , {}],
    4: [function(e, t) {
        t.exports = function() {
            $(function() {
                $(".autoselect-wrapper input").on("click", function() {
                    $(this).select()
                })
            })
        }
    }
    , {}],
    5: [function(e, t) {
        t.exports = function() {
            $(function() {
                $(document).on("click", "#cancel-subscription-toggler", function() {
                    return $("#cancel-subscription").toggle(),
                    $("#payment-form").hide(),
                    !1
                }),
                $(document).on("click", "#update-subscription-toggler", function() {
                    return $("#cancel-subscription").hide(),
                    $("#payment-form").toggle(),
                    !1
                })
            })
        }
    }
    , {}],
    6: [function(e, t) {
        var n;
        t.exports = function() {
            $(o)
        }
        ;
        var r = function() {
            console.error("No element found with data-stripe-public-key attribute")
        }
          , o = function() {
            if ("undefined" != typeof Stripe) {
                $("#enable-private-modules").click(function(e) {
                    e.preventDefault(),
                    $("#info-private-modules").toggle()
                }),
                $("#enable-orgs").click(function(e) {
                    e.preventDefault(),
                    $("#info-orgs").toggle()
                }),
                $("#add-billing-info").click(function(e) {
                    e.preventDefault(),
                    $("#payment-form").toggle()
                });
                try {
                    n = $("#payment-form").data("stripePublicKey")
                } catch (e) {
                    return r()
                }
                if (!n)
                    return r();
                Stripe.setPublishableKey(n),
                $("#payment-form").submit(i)
            }
        }
          , i = function() {
            var e = $("#payment-form");
            if (!e.find("#card-number").length)
                return !0;
            var t = {
                number: $("#card-number").val(),
                cvc: $("#card-cvc").val(),
                exp_month: $("#card-exp-month").val(),
                exp_year: $("#card-exp-year").val()
            };
            return e.find("input[type=submit]").prop("disabled", !0),
            Stripe.card.createToken(t, a),
            !1
        }
          , a = function(e, t) {
            var n = $("#payment-form");
            return t.error ? ($(".billing-error").text(t.error.message).show(),
            n.find("input[type=submit]").prop("disabled", !1),
            void 0) : (n.append($('<input type="hidden" name="stripeToken" />').val(t.id)),
            n.get(0).submit(),
            void 0)
        }
    }
    , {}],
    7: [function(e, t) {
        t.exports = function() {
            $(function() {
                if ("undefined" != typeof StripeCheckout) {
                    var e, t, n, r = StripeCheckout.configure({
                        key: $("input[type=hidden][data-stripe-key]").data("stripe-key"),
                        image: "/static/images/n-64.png",
                        email: $("#billing-email").val(),
                        token: function(r) {
                            r.amount = e,
                            r.subType = t,
                            r.quantity = n,
                            r.customerId = $("#customer-id").val(),
                            r.crumb = $('input[name="crumb"]').val(),
                            $.ajax({
                                url: "/enterprise/buy-license",
                                beforeSend: function(e) {
                                    e.setRequestHeader("X-CSRF-Token", $('input[name="crumb"]').val())
                                },
                                data: r,
                                type: "POST",
                                headers: {
                                    "x-csrf-token": $('input[name="crumb"]').val()
                                }
                            }).done(function() {
                                document.location = "/enterprise/license-paid?amount=" + Math.floor(e / 100)
                            }).error(function() {
                                document.location = "/enterprise/license-error"
                            })
                        }
                    });
                    $("#buy-multi-seat").click(function(o) {
                        t = 3;
                        var i = $("#multi-seat-count").val();
                        n = parseInt(i),
                        e = 1600 * n,
                        r.open({
                            name: "npm, Inc.",
                            description: "Buy " + n + " seat license, billed monthly",
                            amount: e
                        }),
                        o.preventDefault()
                    })
                }
            })
        }
    }
    , {}],
    8: [function(e, t) {
        t.exports = function() {
            $(function() {
                try {
                    window.crumb = $("[data-crumb]").data().crumb
                } catch (e) {
                    return console.error("unable to find a CSRF token in the DOM")
                }
            })
        }
    }
    , {}],
    9: [function(e, t) {
        var n = e("prettydate").strftime
          , r = e("relative-date");
        t.exports = function() {
            $(o),
            setInterval(o, 1e4)
        }
        ;
        var o = function() {
            $("[data-date]").each(function() {
                var e = new Date($(this).data().date);
                if (!e.getYear())
                    return console.error("Invalid date", e);
                var t = $(this).data().dateFormat || "%Y-%m-%d"
                  , o = "relative" === t ? r(e) : n(e, t);
                $(this).text(o)
            })
        }
    }
    , {
        prettydate: 79,
        "relative-date": 81
    }],
    10: [function(e, t) {
        var n = e("hashchange");
        t.exports = function() {
            $(r)
        }
        ;
        var r = function() {
            n.update(function(e) {
                var t = "user-content-";
                if (0 === e.indexOf(t))
                    n.updateHash(e.replace(t, ""));
                else {
                    var r = $("#" + t + e);
                    r.length && $(document).scrollTop(r.offset().top)
                }
            }),
            $(document).ready(function() {
                n.update()
            })
        }
    }
    , {
        hashchange: 68
    }],
    11: [function(e, t) {
        $ = e("jquery");
        var n = function(e) {
            this.menu = e,
            this.id = this.menu.attr("id"),
            this.menuToggle = $('a[href="#' + this.id + '"]'),
            this.menuOverlay = $("<div class='drop-down-menu-overlay' data-drop-down-menu='" + this.id + "'/>").appendTo("body")
        }
        ;
        n.prototype.close = function(e) {
            e && history.pushState({}, "", window.location.pathname),
            this.menu.addClass("hidden").removeClass("show"),
            this.menuToggle.addClass("toggle-is-closed").removeClass("toggle-is-open").trigger("blur"),
            this.menuOverlay.removeClass("show"),
            this.menu.trigger("closed:dropDownMenu", [this.id])
        }
        ,
        n.prototype.open = function() {
            history.pushState({}, "", window.location.pathname + this.menuToggle.attr("href")),
            this.menu.addClass("show").removeClass("hidden"),
            this.menuToggle.addClass("toggle-is-open").removeClass("toggle-is-closed"),
            this.menuOverlay.addClass("show"),
            this.menu.trigger("opened:dropDownMenu", [this.id])
        }
        ,
        n.prototype.addListeners = function() {
            var e = this;
            this.menu.on("close", function(t) {
                e.close(t.noPathChange)
            }),
            this.menu.on("open", $.proxy(this.open, this)),
            this.menuToggle.on("click", function(t) {
                t.preventDefault(),
                e.menu.is(":visible") ? e.close() : e.open()
            }),
            this.menuOverlay.on("click", $.proxy(this.close, this))
        }
        ,
        t.exports = function() {
            $(function() {
                var e = $(".drop-down-menu");
                $.each(e, function(e, t) {
                    var r = new n($(t));
                    r.addListeners(),
                    window.location.hash === "#" + r.id && r.open(),
                    $(window).on("hashchange", function() {
                        "" === window.location.hash && r.close(),
                        window.location.hash === "#" + r.id && r.open()
                    })
                }),
                $("body").on("opened:dropDownMenu", function(t, n) {
                    $.each(e, function(e, t) {
                        t.id !== n && $(t).trigger("close", {
                            noPathChange: !0
                        })
                    })
                })
            })
        }
    }
    , {
        jquery: 72
    }],
    12: [function(e, t) {
        t.exports = function() {
            window._elqQ = window._elqQ || [],
            window._elqQ.push(["elqSetSiteId", "2030806319"]),
            window._elqQ.push(["elqTrackPageView"])
        }
    }
    , {}],
    13: [function(e, t) {
        e("util").format;
        t.exports = function() {
            $(function() {
                var e = $("[data-email]");
                if (e.length) {
                    var t = e.data("email").split("%").slice(1).map(function(e) {
                        return String.fromCharCode(parseInt(e, 16))
                    }).join("");
                    e.attr("href", "mailto:" + t),
                    e.text(t)
                }
            })
        }
    }
    , {
        util: 47
    }],
    14: [function(e, t) {
        var n = e("../templates/profile-package.hbs");
        t.exports = function() {
            $(function() {
                var e = $(".collaborated-packages > .fetch-more-packages")
                  , t = 1;
                $(".fetch-more-packages").click(function(r) {
                    r.preventDefault();
                    var o = $(".fetch-more-packages").text();
                    $(".fetch-more-packages").text("loading...");
                    var i = $("h1").text();
                    $.getJSON("/profile/" + i + "/packages?offset=" + t).done(function(r) {
                        var i = n({
                            packages: r
                        });
                        e.before(i),
                        r.hasMore ? (t += 1,
                        $(".fetch-more-packages").text(o)) : $(".fetch-more-packages").remove()
                    }).fail(function(e, t, n) {
                        console.error("Could not fetch package data", n)
                    })
                })
            })
        }
    }
    , {
        "../templates/profile-package.hbs": 36
    }],
    15: [function(e, t) {
        var n = e("steeltoe");
        t.exports = function(e) {
            var t = {
                method: e.attr("method"),
                url: e.attr("action"),
                json: !0,
                data: {}
            };
            return e.serializeArray().forEach(function(e) {
                n(t.data).set(e.name, e.value)
            }),
            window && window.crumb && (t.data.crumb = window.crumb,
            t.headers = {
                "x-csrf-token": window.crumb
            }),
            t
        }
    }
    , {
        steeltoe: 82
    }],
    16: [function(e, t) {
        var n = e("parse-link-header")
          , r = t.exports = function() {
            return $(r.init),
            r
        }
        ;
        r.init = function() {
            r.issues = {
                element: $("#issues")
            },
            r.pull_requests = {
                element: $("#pull_requests")
            },
            r.issues.element.length && r.issues.element.data() && r.issues.element.data().ghapi && (r.issues.api_url = r.issues.element.data().ghapi + "/issues?per_page=1",
            r.pull_requests.api_url = r.issues.element.data().ghapi + "/pulls?per_page=1",
            r.getPullRequests())
        }
        ,
        r.getPullRequests = function() {
            $.getJSON(r.pull_requests.api_url).done(function(e, t, o) {
                try {
                    r.pull_requests.count = Number(n(o.getResponseHeader("Link")).last.page)
                } catch (i) {
                    r.pull_requests.count = e.length
                }
                r.getIssues()
            })
        }
        ,
        r.getIssues = function() {
            $.getJSON(r.issues.api_url).done(function(e, t, o) {
                try {
                    r.issues.count = Number(n(o.getResponseHeader("Link")).last.page) - r.pull_requests.count
                } catch (i) {
                    r.issues.count = e.length - r.pull_requests.count
                }
                r.render()
            })
        }
        ,
        r.render = function() {
            var e;
            switch (r.issues.count) {
            case void 0:
            case null :
            case !1:
            case "":
                return;
            case 0:
                e = "No open issues";
                break;
            case 1:
                e = "One open issue";
                break;
            default:
                e = r.issues.count + " open issues"
            }
            switch (r.issues.element.find(".original").hide(),
            r.issues.element.find("a").text(e),
            r.issues.element.find(".enhanced").show(),
            r.pull_requests.count) {
            case void 0:
            case null :
            case !1:
            case "":
                return;
            case 0:
                e = "No open pull requests";
                break;
            case 1:
                e = "One open pull request";
                break;
            default:
                e = r.pull_requests.count + " open pull requests"
            }
            r.pull_requests.element.find("a").text(e),
            r.pull_requests.element.show()
        }
    }
    , {
        "parse-link-header": 77
    }],
    17: [function(e) {
        var t = e("chunk")
          , n = {
            sidebar: e("../templates/hiring-sidebar.hbs"),
            full: e("../templates/hiring-full.hbs"),
            vanilla: e("../templates/hiring-vanilla.hbs")
        }
          , r = function() {
            var e = $(".hiring-container");
            if (e.length) {
                if (!e.data() || !e.data().template)
                    return console.error("container must specify a template");
                var r = n[e.data().template];
                $.getJSON("https://partners.npmjs.com/hiring").done(function(n) {
                    "full" === e.data().template && (n = t(n, 3)),
                    window.companies = n,
                    e.html(r({
                        companies: n
                    }))
                }).fail(function(e, t, n) {
                    console.error("Could not fetch hiring data", n)
                })
            }
        }
        ;
        $(r)
    }
    , {
        "../templates/hiring-full.hbs": 33,
        "../templates/hiring-sidebar.hbs": 34,
        "../templates/hiring-vanilla.hbs": 35,
        chunk: 48
    }],
    18: [function(e, t, n) {
        (function(r) {
            !function(e) {
                "object" == typeof n ? t.exports = e() : "function" == typeof define && define.amd ? define(e) : "undefined" != typeof window ? window.IconicJS = e() : "undefined" != typeof r ? r.IconicJS = e() : "undefined" != typeof self && (self.IconicJS = e())
            }(function() {
                var t;
                return function n(t, r, o) {
                    function i(s, l) {
                        if (!r[s]) {
                            if (!t[s]) {
                                var u = "function" == typeof e && e;
                                if (!l && u)
                                    return u(s, !0);
                                if (a)
                                    return a(s, !0);
                                throw new Error("Cannot find module '" + s + "'")
                            }
                            var c = r[s] = {
                                exports: {}
                            };
                            t[s][0].call(c.exports, function(e) {
                                var n = t[s][1][e];
                                return i(n ? n : e)
                            }, c, c.exports, n, t, r, o)
                        }
                        return r[s].exports
                    }
                    for (var a = "function" == typeof e && e, s = 0; s < o.length; s++)
                        i(o[s]);
                    return i
                }({
                    1: [function(e, t) {
                        var n = (e("./modules/polyfills"),
                        e("./modules/svg-injector"))
                          , r = e("./modules/extend")
                          , o = e("./modules/responsive")
                          , i = e("./modules/position")
                          , a = e("./modules/container")
                          , s = e("./modules/log")
                          , l = {}
                          , u = window.iconicSmartIconApis = {}
                          , c = ("file:" === window.location.protocol,
                        0)
                          , f = function(e, t, o) {
                            t = r({}, l, t || {});
                            var i = {
                                evalScripts: t.evalScripts,
                                pngFallback: t.pngFallback
                            };
                            i.each = function(e) {
                                if (e)
                                    if ("string" == typeof e)
                                        s.debug(e);
                                    else if (e instanceof SVGSVGElement) {
                                        var n = e.getAttribute("data-icon");
                                        if (n && u[n]) {
                                            var r = u[n](e);
                                            for (var o in r)
                                                e[o] = r[o]
                                        }
                                        var i = /iconic-bg-/;
                                        i.test(e.getAttribute("class")) && a.addBackground(e),
                                        p(e),
                                        c++,
                                        t && t.each && "function" == typeof t.each && t.each(e)
                                    }
                            }
                            ,
                            "string" == typeof e && (e = document.querySelectorAll(e)),
                            n(e, i, o)
                        }
                          , p = function(e) {
                            var t = [];
                            e ? "string" == typeof e ? t = document.querySelectorAll(e) : void 0 !== e.length ? t = e : "object" == typeof e && t.push(e) : t = document.querySelectorAll("svg.iconic"),
                            Array.prototype.forEach.call(t, function(e) {
                                e instanceof SVGSVGElement && (e.update && e.update(),
                                o.refresh(e),
                                i.refresh(e))
                            })
                        }
                          , d = function() {
                            l.debug && console.time && console.time("autoInjectSelector - " + l.autoInjectSelector);
                            var e = c;
                            f(l.autoInjectSelector, {}, function() {
                                if (l.debug && console.timeEnd && console.timeEnd("autoInjectSelector - " + l.autoInjectSelector),
                                s.debug("AutoInjected: " + (c - e)),
                                o.refreshAll(),
                                l.autoInjectDone && "function" == typeof l.autoInjectDone) {
                                    var t = c - e;
                                    l.autoInjectDone(t)
                                }
                            })
                        }
                          , h = function(e) {
                            e && "" !== e && "complete" !== document.readyState ? document.addEventListener("DOMContentLoaded", d) : document.removeEventListener("DOMContentLoaded", d)
                        }
                          , m = function(e) {
                            return e = e || {},
                            r(l, e),
                            h(l.autoInjectSelector),
                            s.enableDebug(l.debug),
                            window._Iconic ? window._Iconic : {
                                inject: f,
                                update: p,
                                smartIconApis: u,
                                svgInjectedCount: c
                            }
                        }
                        ;
                        t.exports = m,
                        window._Iconic = new m({
                            autoInjectSelector: "img.iconic",
                            evalScripts: "once",
                            pngFallback: !1,
                            each: null ,
                            autoInjectDone: null ,
                            debug: !1
                        })
                    }
                    , {
                        "./modules/container": 2,
                        "./modules/extend": 3,
                        "./modules/log": 4,
                        "./modules/polyfills": 5,
                        "./modules/position": 6,
                        "./modules/responsive": 7,
                        "./modules/svg-injector": 8
                    }],
                    2: [function(e, t) {
                        var n = function(e) {
                            var t = e.getAttribute("class").split(" ")
                              , n = -1 !== t.indexOf("iconic-fluid")
                              , r = []
                              , o = ["iconic-bg"];
                            Array.prototype.forEach.call(t, function(e) {
                                switch (e) {
                                case "iconic-sm":
                                case "iconic-md":
                                case "iconic-lg":
                                    r.push(e),
                                    n || o.push(e.replace(/-/, "-bg-"));
                                    break;
                                case "iconic-fluid":
                                    r.push(e),
                                    o.push(e.replace(/-/, "-bg-"));
                                    break;
                                case "iconic-bg-circle":
                                case "iconic-bg-rounded-rect":
                                case "iconic-bg-badge":
                                    o.push(e);
                                    break;
                                default:
                                    r.push(e)
                                }
                            }),
                            e.setAttribute("class", r.join(" "));
                            var i = e.parentNode
                              , a = Array.prototype.indexOf.call(i.childNodes, e)
                              , s = document.createElement("span");
                            s.setAttribute("class", o.join(" ")),
                            s.appendChild(e),
                            i.insertBefore(s, i.childNodes[a])
                        }
                        ;
                        t.exports = {
                            addBackground: n
                        }
                    }
                    , {}],
                    3: [function(e, t) {
                        t.exports = function(e) {
                            return Array.prototype.forEach.call(Array.prototype.slice.call(arguments, 1), function(t) {
                                if (t)
                                    for (var n in t)
                                        t.hasOwnProperty(n) && (e[n] = t[n])
                            }),
                            e
                        }
                    }
                    , {}],
                    4: [function(e, t) {
                        var n = !1
                          , r = function(e) {
                            console && console.log && console.log(e)
                        }
                          , o = function(e) {
                            r("Iconic INFO: " + e)
                        }
                          , i = function(e) {
                            r("Iconic WARNING: " + e)
                        }
                          , a = function(e) {
                            n && r("Iconic DEBUG: " + e)
                        }
                          , s = function(e) {
                            n = e
                        }
                        ;
                        t.exports = {
                            info: o,
                            warn: i,
                            debug: a,
                            enableDebug: s
                        }
                    }
                    , {}],
                    5: [function() {
                        Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
                            "use strict";
                            if (void 0 === this || null  === this || "function" != typeof e)
                                throw new TypeError;
                            var n, r = this.length >>> 0;
                            for (n = 0; r > n; ++n)
                                n in this && e.call(t, this[n], n, this)
                        }
                        ),
                        function() {
                            if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
                                this.returnValue = !1
                            }
                            ),
                            Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
                                this.cancelBubble = !0
                            }
                            ),
                            !Element.prototype.addEventListener) {
                                var e = []
                                  , t = function(t, n) {
                                    var r = this
                                      , o = function(e) {
                                        e.target = e.srcElement,
                                        e.currentTarget = r,
                                        n.handleEvent ? n.handleEvent(e) : n.call(r, e)
                                    }
                                    ;
                                    if ("DOMContentLoaded" == t) {
                                        var i = function(e) {
                                            "complete" == document.readyState && o(e)
                                        }
                                        ;
                                        if (document.attachEvent("onreadystatechange", i),
                                        e.push({
                                            object: this,
                                            type: t,
                                            listener: n,
                                            wrapper: i
                                        }),
                                        "complete" == document.readyState) {
                                            var a = new Event;
                                            a.srcElement = window,
                                            i(a)
                                        }
                                    } else
                                        this.attachEvent("on" + t, o),
                                        e.push({
                                            object: this,
                                            type: t,
                                            listener: n,
                                            wrapper: o
                                        })
                                }
                                  , n = function(t, n) {
                                    for (var r = 0; r < e.length; ) {
                                        var o = e[r];
                                        if (o.object == this && o.type == t && o.listener == n) {
                                            "DOMContentLoaded" == t ? this.detachEvent("onreadystatechange", o.wrapper) : this.detachEvent("on" + t, o.wrapper);
                                            break
                                        }
                                        ++r
                                    }
                                }
                                ;
                                Element.prototype.addEventListener = t,
                                Element.prototype.removeEventListener = n,
                                HTMLDocument && (HTMLDocument.prototype.addEventListener = t,
                                HTMLDocument.prototype.removeEventListener = n),
                                Window && (Window.prototype.addEventListener = t,
                                Window.prototype.removeEventListener = n)
                            }
                        }()
                    }
                    , {}],
                    6: [function(e, t) {
                        var n = function(e) {
                            var t = e.getAttribute("data-position");
                            if (t && "" !== t) {
                                var n, r, o, i, a, s, l, u = e.getAttribute("width"), c = e.getAttribute("height"), f = t.split("-"), p = e.querySelectorAll("g.iconic-container");
                                Array.prototype.forEach.call(p, function(e) {
                                    if (n = e.getAttribute("data-width"),
                                    r = e.getAttribute("data-height"),
                                    n !== u || r !== c) {
                                        if (o = e.getAttribute("transform"),
                                        i = 1,
                                        o) {
                                            var t = o.match(/scale\((\d)/);
                                            i = t && t[1] ? t[1] : 1
                                        }
                                        a = Math.floor((u / i - n) / 2),
                                        s = Math.floor((c / i - r) / 2),
                                        Array.prototype.forEach.call(f, function(e) {
                                            switch (e) {
                                            case "top":
                                                s = 0;
                                                break;
                                            case "bottom":
                                                s = c / i - r;
                                                break;
                                            case "left":
                                                a = 0;
                                                break;
                                            case "right":
                                                a = u / i - n;
                                                break;
                                            case "center":
                                                break;
                                            default:
                                                console && console.log && console.log("Unknown position: " + e)
                                            }
                                        }),
                                        l = 0 === s ? a : a + " " + s,
                                        l = "translate(" + l + ")",
                                        o ? /translate/.test(o) ? o = o.replace(/translate\(.*?\)/, l) : o += " " + l : o = l,
                                        e.setAttribute("transform", o)
                                    }
                                })
                            }
                        }
                        ;
                        t.exports = {
                            refresh: n
                        }
                    }
                    , {}],
                    7: [function(e, t) {
                        var n = /(iconic-sm\b|iconic-md\b|iconic-lg\b)/
                          , r = function(e, t) {
                            var n = "undefined" != typeof window.getComputedStyle && window.getComputedStyle(e, null ).getPropertyValue(t);
                            return !n && e.currentStyle && (n = e.currentStyle[t.replace(/([a-z])\-([a-z])/, function(e, t, n) {
                                return t + n.toUpperCase()
                            })] || e.currentStyle[t]),
                            n
                        }
                          , o = function(e) {
                            var t = e.style.display;
                            e.style.display = "block";
                            var n = parseFloat(r(e, "width").slice(0, -2))
                              , o = parseFloat(r(e, "height").slice(0, -2));
                            return e.style.display = t,
                            {
                                width: n,
                                height: o
                            }
                        }
                          , i = function() {
                            var e = "/* Iconic Responsive Support Styles */\n.iconic-property-fill, .iconic-property-text {stroke: none !important;}\n.iconic-property-stroke {fill: none !important;}\nsvg.iconic.iconic-fluid {height:100% !important;width:100% !important;}\nsvg.iconic.iconic-sm:not(.iconic-size-md):not(.iconic-size-lg), svg.iconic.iconic-size-sm{width:16px;height:16px;}\nsvg.iconic.iconic-md:not(.iconic-size-sm):not(.iconic-size-lg), svg.iconic.iconic-size-md{width:32px;height:32px;}\nsvg.iconic.iconic-lg:not(.iconic-size-sm):not(.iconic-size-md), svg.iconic.iconic-size-lg{width:128px;height:128px;}\nsvg.iconic-sm > g.iconic-md, svg.iconic-sm > g.iconic-lg, svg.iconic-md > g.iconic-sm, svg.iconic-md > g.iconic-lg, svg.iconic-lg > g.iconic-sm, svg.iconic-lg > g.iconic-md {display: none;}\nsvg.iconic.iconic-icon-sm > g.iconic-lg, svg.iconic.iconic-icon-md > g.iconic-lg {display:none;}\nsvg.iconic-sm:not(.iconic-icon-md):not(.iconic-icon-lg) > g.iconic-sm, svg.iconic-md.iconic-icon-sm > g.iconic-sm, svg.iconic-lg.iconic-icon-sm > g.iconic-sm {display:inline;}\nsvg.iconic-md:not(.iconic-icon-sm):not(.iconic-icon-lg) > g.iconic-md, svg.iconic-sm.iconic-icon-md > g.iconic-md, svg.iconic-lg.iconic-icon-md > g.iconic-md {display:inline;}\nsvg.iconic-lg:not(.iconic-icon-sm):not(.iconic-icon-md) > g.iconic-lg, svg.iconic-sm.iconic-icon-lg > g.iconic-lg, svg.iconic-md.iconic-icon-lg > g.iconic-lg {display:inline;}";
                            navigator && navigator.userAgent && /MSIE 10\.0/.test(navigator.userAgent) && (e += "svg.iconic{zoom:1.0001;}");
                            var t = document.createElement("style");
                            t.id = "iconic-responsive-css",
                            t.type = "text/css",
                            t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)),
                            (document.head || document.getElementsByTagName("head")[0]).appendChild(t)
                        }
                          , a = function(e) {
                            if (/iconic-fluid/.test(e.getAttribute("class"))) {
                                var t, r = o(e), i = e.viewBox.baseVal.width / e.viewBox.baseVal.height;
                                t = 1 === i ? Math.min(r.width, r.height) : 1 > i ? r.width : r.height;
                                var a;
                                a = 32 > t ? "iconic-sm" : t >= 32 && 128 > t ? "iconic-md" : "iconic-lg";
                                var s = e.getAttribute("class")
                                  , l = n.test(s) ? s.replace(n, a) : s + " " + a;
                                e.setAttribute("class", l)
                            }
                        }
                          , s = function() {
                            var e = document.querySelectorAll(".injected-svg.iconic-fluid");
                            Array.prototype.forEach.call(e, function(e) {
                                a(e)
                            })
                        }
                        ;
                        document.addEventListener("DOMContentLoaded", function() {
                            i()
                        }),
                        window.addEventListener("resize", function() {
                            s()
                        }),
                        t.exports = {
                            refresh: a,
                            refreshAll: s
                        }
                    }
                    , {}],
                    8: [function(e, n, r) {
                        !function(e, o) {
                            "use strict";
                            function i(e) {
                                e = e.split(" ");
                                for (var t = {}, n = e.length, r = []; n--; )
                                    t.hasOwnProperty(e[n]) || (t[e[n]] = 1,
                                    r.unshift(e[n]));
                                return r.join(" ")
                            }
                            var a = "file:" === e.location.protocol
                              , s = o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
                              , l = Array.prototype.forEach || function(e, t) {
                                if (void 0 === this || null  === this || "function" != typeof e)
                                    throw new TypeError;
                                var n, r = this.length >>> 0;
                                for (n = 0; r > n; ++n)
                                    n in this && e.call(t, this[n], n, this)
                            }
                              , u = {}
                              , c = 0
                              , f = []
                              , p = []
                              , d = {}
                              , h = function(e) {
                                return e.cloneNode(!0)
                            }
                              , m = function(e, t) {
                                p[e] = p[e] || [],
                                p[e].push(t)
                            }
                              , g = function(e) {
                                for (var t = 0, n = p[e].length; n > t; t++)
                                    !function(t) {
                                        setTimeout(function() {
                                            p[e][t](h(u[e]))
                                        }, 0)
                                    }(t)
                            }
                              , v = function(t, n) {
                                if (void 0 !== u[t])
                                    u[t] instanceof SVGSVGElement ? n(h(u[t])) : m(t, n);
                                else {
                                    if (!e.XMLHttpRequest)
                                        return n("Browser does not support XMLHttpRequest"),
                                        !1;
                                    u[t] = {},
                                    m(t, n);
                                    var r = new XMLHttpRequest;
                                    r.onreadystatechange = function() {
                                        if (4 === r.readyState) {
                                            if (404 === r.status || null  === r.responseXML)
                                                return n("Unable to load SVG file: " + t),
                                                a && n("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),
                                                n(),
                                                !1;
                                            if (!(200 === r.status || a && 0 === r.status))
                                                return n("There was a problem injecting the SVG: " + r.status + " " + r.statusText),
                                                !1;
                                            if (r.responseXML instanceof Document)
                                                u[t] = r.responseXML.documentElement;
                                            else if (DOMParser && DOMParser instanceof Function) {
                                                var e;
                                                try {
                                                    var o = new DOMParser;
                                                    e = o.parseFromString(r.responseText, "text/xml")
                                                } catch (i) {
                                                    e = void 0
                                                }
                                                if (!e || e.getElementsByTagName("parsererror").length)
                                                    return n("Unable to parse SVG file: " + t),
                                                    !1;
                                                u[t] = e.documentElement
                                            }
                                            g(t)
                                        }
                                    }
                                    ,
                                    r.open("GET", t),
                                    r.overrideMimeType && r.overrideMimeType("text/xml"),
                                    r.send()
                                }
                            }
                              , y = function(t, n, r, o) {
                                var a = t.getAttribute("data-src") || t.getAttribute("src");
                                if (!/\.svg/i.test(a))
                                    return o("Attempted to inject a file with a non-svg extension: " + a),
                                    void 0;
                                if (!s) {
                                    var u = t.getAttribute("data-fallback") || t.getAttribute("data-png");
                                    return u ? (t.setAttribute("src", u),
                                    o(null )) : r ? (t.setAttribute("src", r + "/" + a.split("/").pop().replace(".svg", ".png")),
                                    o(null )) : o("This browser does not support SVG and no PNG fallback was defined."),
                                    void 0
                                }
                                -1 === f.indexOf(t) && (f.push(t),
                                t.setAttribute("src", ""),
                                v(a, function(r) {
                                    if ("undefined" == typeof r || "string" == typeof r)
                                        return o(r),
                                        !1;
                                    var s = t.getAttribute("id");
                                    s && r.setAttribute("id", s);
                                    var u = t.getAttribute("title");
                                    u && r.setAttribute("title", u);
                                    var p = [].concat(r.getAttribute("class") || [], "injected-svg", t.getAttribute("class") || []).join(" ");
                                    r.setAttribute("class", i(p));
                                    var h = t.getAttribute("style");
                                    h && r.setAttribute("style", h);
                                    var m = [].filter.call(t.attributes, function(e) {
                                        return /^data-\w[\w\-]*$/.test(e.name)
                                    });
                                    l.call(m, function(e) {
                                        e.name && e.value && r.setAttribute(e.name, e.value)
                                    });
                                    var g, v, y, b, w, N = {
                                        clipPath: ["clip-path"],
                                        "color-profile": ["color-profile"],
                                        cursor: ["cursor"],
                                        filter: ["filter"],
                                        linearGradient: ["fill", "stroke"],
                                        marker: ["marker", "marker-start", "marker-mid", "marker-end"],
                                        mask: ["mask"],
                                        pattern: ["fill", "stroke"],
                                        radialGradient: ["fill", "stroke"]
                                    };
                                    Object.keys(N).forEach(function(e) {
                                        g = e,
                                        y = N[e],
                                        v = r.querySelectorAll("defs " + g + "[id]");
                                        for (var t = 0, n = v.length; n > t; t++) {
                                            b = v[t].id,
                                            w = b + "-" + c;
                                            var o;
                                            l.call(y, function(e) {
                                                o = r.querySelectorAll("[" + e + '*="' + b + '"]');
                                                for (var t = 0, n = o.length; n > t; t++)
                                                    o[t].setAttribute(e, "url(#" + w + ")")
                                            }),
                                            v[t].id = w
                                        }
                                    }),
                                    r.removeAttribute("xmlns:a");
                                    for (var x, M, P = r.querySelectorAll("script"), k = [], C = 0, T = P.length; T > C; C++)
                                        M = P[C].getAttribute("type"),
                                        M && "application/ecmascript" !== M && "application/javascript" !== M || (x = P[C].innerText || P[C].textContent,
                                        k.push(x),
                                        r.removeChild(P[C]));
                                    if (k.length > 0 && ("always" === n || "once" === n && !d[a])) {
                                        for (var S = 0, j = k.length; j > S; S++)
                                            new Function(k[S])(e);
                                        d[a] = !0
                                    }
                                    var $ = r.querySelectorAll("style");
                                    l.call($, function(e) {
                                        e.textContent += ""
                                    }),
                                    t.parentNode.replaceChild(r, t),
                                    delete f[f.indexOf(t)],
                                    t = null ,
                                    c++,
                                    o(r)
                                }))
                            }
                              , b = function(e, t, n) {
                                t = t || {};
                                var r = t.evalScripts || "always"
                                  , o = t.pngFallback || !1
                                  , i = t.each;
                                if (void 0 !== e.length) {
                                    var a = 0;
                                    l.call(e, function(t) {
                                        y(t, r, o, function(t) {
                                            i && "function" == typeof i && i(t),
                                            n && e.length === ++a && n(a)
                                        })
                                    })
                                } else
                                    e ? y(e, r, o, function(t) {
                                        i && "function" == typeof i && i(t),
                                        n && n(1),
                                        e = null 
                                    }) : n && n(0)
                            }
                            ;
                            "object" == typeof n && "object" == typeof n.exports ? n.exports = r = b : "function" == typeof t && t.amd ? t(function() {
                                return b
                            }) : "object" == typeof e && (e.SVGInjector = b)
                        }(window, document)
                    }
                    , {}]
                }, {}, [1])(1)
            })
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    19: [function(e) {
        window.$ = window.jQuery = e("jquery"),
        e("./js-check")(),
        e("./crumb")(),
        e("./hiring"),
        e("./npm-expansions"),
        e("./email-obfuscate")(),
        e("./pretty-numbers")(),
        e("./private-npm-beta")(),
        e("./deep-links")(),
        e("./tooltips")(),
        e("./what-npm-is-for")(),
        e("./billing")(),
        e("./billing-cancel")(),
        e("./date-formatting")(),
        e("./keyboard-shortcuts")(),
        e("./add-active-class-to-links")(),
        e("./autoselect-inputs")(),
        e("./package-access")(),
        e("./buy-enterprise-license")(),
        e("./twitter-tracking")(),
        e("./fetch-packages")(),
        e("./tabs")(),
        e("./switch-submission")(),
        e("./validator")(),
        e("./eloqua-integration")(),
        e("./add-users-to-teams")(),
        e("./add-packages-to-teams")(),
        e("./iconic")(),
        e("./drop-down-menu")(),
        window.github = e("./github")(),
        window.star = e("./star")()
    }
    , {
        "./add-active-class-to-links": 1,
        "./add-packages-to-teams": 2,
        "./add-users-to-teams": 3,
        "./autoselect-inputs": 4,
        "./billing": 6,
        "./billing-cancel": 5,
        "./buy-enterprise-license": 7,
        "./crumb": 8,
        "./date-formatting": 9,
        "./deep-links": 10,
        "./drop-down-menu": 11,
        "./eloqua-integration": 12,
        "./email-obfuscate": 13,
        "./fetch-packages": 14,
        "./github": 16,
        "./hiring": 17,
        "./iconic": 18,
        "./js-check": 20,
        "./keyboard-shortcuts": 21,
        "./npm-expansions": 22,
        "./package-access": 23,
        "./pretty-numbers": 24,
        "./private-npm-beta": 25,
        "./star": 26,
        "./switch-submission": 27,
        "./tabs": 28,
        "./tooltips": 29,
        "./twitter-tracking": 30,
        "./validator": 31,
        "./what-npm-is-for": 32,
        jquery: 72
    }],
    20: [function(e, t) {
        t.exports = function() {
            document.documentElement.className += " js"
        }
    }
    , {}],
    21: [function(e, t) {
        window.mousetrap = e("mousetrap"),
        t.exports = function() {
            $(function() {
                mousetrap.bind(["command+i", "ctrl+i"], function() {
                    $(".package-name-redundant, .package-description-redundant").toggle()
                }),
                mousetrap.bind(["/", "-"], function(e) {
                    $("#site-search").focus(),
                    e.preventDefault()
                })
            })
        }
    }
    , {
        mousetrap: 74
    }],
    22: [function(e) {
        var t = e("npm-expansions")
          , n = -1
          , r = function(e) {
            if (e && e.preventDefault(),
            ++n > 10)
                return window.location = "https://github.com/npm/npm-expansions";
            var r = t[Math.floor(Math.random() * t.length)];
            $("#npm-expansions").text(r)
        }
        ;
        $(function() {
            r(),
            $("#npm-expansions").on("click", r)
        })
    }
    , {
        "npm-expansions": 75
    }],
    23: [function(e, t) {
        var n = e("../../templates/partials/collaborator.hbs")
          , r = e("./form-to-request-object");
        t.exports = function() {
            $(o)
        }
        ;
        var o = function() {
            $("#add-collaborator").unbind("submit", i).bind("submit", i),
            $(".update-collaborator input").unbind("change", a).bind("change", a),
            $(".remove-collaborator").unbind("submit", s).bind("submit", s),
            $("#package-access-toggle").unbind("change", l).bind("change", l),
            $("input[type=radio][name='collaborator.permissions']").attr("disabled", !$("#collaborators").data("enablePermissionTogglers")),
            $("#collaborators").data("enableDeletion") && $("form.remove-collaborator").css({
                visibility: "visible"
            }),
            1 === $(".collaborator").length && ($("form.remove-collaborator").css({
                visibility: "hidden"
            }),
            $("input[type=radio][name='collaborator.permissions']").attr("disabled", !0));
            var e = $("#package-access-toggle").prop("checked");
            $("#add-collaborator input[name='collaborator.permissions']").val(e ? "read" : "write"),
            $("#add-collaborator input[name='collaborator.name']").val("")
        }
          , i = function(e) {
            e.preventDefault(),
            $.ajax(r($(this))).done(function(e) {
                e.collaborator && ($("tr.collaborator:last").after(n(e.collaborator)),
                o())
            }).fail(u)
        }
          , a = function(e) {
            e.preventDefault();
            var t = $(this).parents("form")
              , n = r(t);
            if ("read" === n.data.collaborator.permissions && n.data.collaborator.name === $("[data-user-name]").data("userName")) {
                var i = "Are you sure you want to set your own access level to read-only?";
                if (!confirm(i))
                    return t.find("input[value='write']").prop("checked", !0),
                    !1
            }
            $.ajax(n).done(o).fail(u)
        }
          , s = function(e) {
            e.preventDefault();
            var t = $(this)
              , n = $("[data-user-name]").data("userName") === t.data("collaboratorName")
              , i = "Are you sure you want to remove yourself from this package?";
            return n && !confirm(i) ? !1 : (t.parents(".collaborator").remove(),
            $.ajax(r(t)).done(function() {
                return n ? (window.location = t.data("packageUrl") + "?removed-self-from-collaborators",
                void 0) : (o(),
                void 0)
            }).fail(u),
            void 0)
        }
          , l = function(e) {
            e.preventDefault();
            var t = $(this)
              , n = t.parents("form")
              , i = t.prop("checked");
            if (!i) {
                var a = "This will make your package world-readable"
                  , s = $("[type=radio][name='collaborator.permissions'][value='read']:checked");
                if (s.length && (a += " and will remove the read-only collaborators"),
                a += ". Are you sure?",
                !confirm(a))
                    return t.prop("checked", !0),
                    !1;
                s.parents(".collaborator").remove()
            }
            var l = r(n);
            l.data.package = {
                "private": i
            },
            $("#collaborators").data("enablePermissionTogglers", i),
            o(),
            $.ajax(l).done(o).fail(u)
        }
          , u = function(e, t, n) {
            console.error(e, t, n),
            $("p.error").text(e.responseJSON.message || n).show()
        }
    }
    , {
        "../../templates/partials/collaborator.hbs": 84,
        "./form-to-request-object": 15
    }],
    24: [function(e, t) {
        var n = function(t) {
            try {
                return Number(t).toLocaleString()
            } catch (n) {
                return e("number-grouper")(t, {
                    sep: " ",
                    radix: "."
                })
            }
        }
        ;
        t.exports = function() {
            $(function() {
                $(".pretty-number").each(function() {
                    $(this).text(n($(this).text()))
                })
            })
        }
    }
    , {
        "number-grouper": 76
    }],
    25: [function(e, t) {
        t.exports = function() {
            $(function() {
                "undefined" != typeof hbspt && hbspt.forms.create({
                    portalId: "419727",
                    formId: "d9ba17d5-606e-456d-a703-733c67f5e708",
                    target: "#private-module-signup-form",
                    submitButtonClass: "primary large"
                })
            })
        }
    }
    , {}],
    26: [function(e, t) {
        var n = t.exports = function() {
            return $(n.init),
            n
        }
        ;
        n.init = function() {
            n.form = $("form.star"),
            n.form && (n.form.checkbox = n.form.find("input[type=checkbox]"),
            n.form.checkbox.on("change", n.onChange),
            String(document.referrer).match("/login") && String(location.hash).match("#star") && n.form.checkbox.prop("checked", !0))
        }
        ,
        n.onChange = function() {
            var e = {};
            n.form.serializeArray().forEach(function(t) {
                e[t.name] = t.value
            }),
            e.isStarred = Boolean(e.isStarred),
            $.ajax({
                url: "/star",
                data: e,
                type: "POST",
                headers: {
                    "x-csrf-token": e.crumb
                }
            }).done(n.onDone).error(n.onError)
        }
        ,
        n.onDone = function() {}
        ,
        n.onError = function(e) {
            return e && e.status && 403 === Number(e.status) ? (window.location = "/login?done=" + location.pathname + "#star",
            void 0) : void 0
        }
    }
    , {}],
    27: [function(e, t) {
        var n = e("./form-to-request-object");
        t.exports = function() {
            $(function() {
                var e = $(".org-edit-user-table, .org-edit-packages-table");
                e.on("click", "input[type=checkbox].switch", function() {
                    var e = $(this)
                      , t = e.prop("checked")
                      , r = e.closest("form");
                    e.addClass("inactive"),
                    $.ajax(n(r)).done(function() {}).fail(function() {
                        t ? e.removeAttr("checked") : e.attr("checked", "checked")
                    }).always(function() {
                        e.removeClass("inactive")
                    })
                })
            })
        }
    }
    , {
        "./form-to-request-object": 15
    }],
    28: [function(e, t) {
        t.exports = function() {
            if ("querySelectorAll" in document) {
                var e = ".tab"
                  , t = function(t, n) {
                    n = n || {},
                    this.element = t,
                    this.$element = $(t),
                    this.tabNav = $(".tabs [href='#" + t.id + "']"),
                    this.isOpen = !1,
                    this.siblings = $(e).not(this.$element),
                    this.$element.data("tab", this),
                    this.init()
                }
                ;
                t.prototype.init = function() {
                    this.tabNav.closest("li").hasClass("current") ? this.open() : this.close()
                }
                ,
                t.prototype.open = function() {
                    this.$element.removeClass("hidden"),
                    this.$element.addClass("visible"),
                    this.isOpen = !0,
                    $(".tabs .current").removeClass("current"),
                    this.tabNav.closest("li").addClass("current"),
                    $.each(this.siblings, function(e, t) {
                        var n = $(t).data("tab");
                        n && n.close()
                    })
                }
                ,
                t.prototype.close = function() {
                    this.$element.removeClass("visible"),
                    this.$element.addClass("hidden"),
                    this.isOpen = !1
                }
                ,
                t.prototype.toggle = function() {
                    this.isOpen ? this.close() : this.open()
                }
                ;
                var n = function() {
                    if ($(".tabs .current").attr("href") !== location.hash) {
                        var e = $(location.hash).data("tab");
                        e && e.open()
                    }
                }
                  , r = document.createElement("a")
                  , o = function() {
                    for (var e = document.querySelectorAll("form"), t = 0, n = e.length; n > t; t++) {
                        var o = e[t];
                        r.href = o.action,
                        r.host || (o.action = r.pathname + location.hash)
                    }
                }
                ;
                $(function() {
                    $(window)[0].scrollTo(0, 0);
                    var r = $(e);
                    $.each(r, function(e, n) {
                        var r = new t(n);
                        r.tabNav.on("click", function(e) {
                            e.preventDefault(),
                            r.open(),
                            location.hash = $(this).attr("href"),
                            $(window)[0].scrollTo(0, 0)
                        })
                    }),
                    n(),
                    o(),
                    $(window).on("hashchange", function() {
                        n(),
                        o()
                    })
                })
            }
        }
    }
    , {}],
    29: [function(e, t) {
        t.exports = function() {
            $(function() {
                e("tipsy-browserify")($),
                $("[rel=tipsy]").tipsy({
                    fade: !1,
                    gravity: "s",
                    opacity: 1
                })
            })
        }
    }
    , {
        "tipsy-browserify": 83
    }],
    30: [function(e, t) {
        t.exports = function() {
            $(function() {
                if ("object" == typeof twttr && twttr.conversion && twttr.conversion.trackPid) {
                    var e = $("[data-twitter-pid]").data("twitterPid");
                    e ? (console.log("tracking twitter conversion: " + e),
                    twttr.conversion.trackPid(e)) : console.log("twttr is ready, but there's no pid", $("[data-twitter-pid]").data("twitterPid"))
                }
            })
        }
    }
    , {}],
    31: [function(e, t) {
        t.exports = function() {
            $.fn.setupValidation = function() {
                var e = $("[data-user-name]").data("user-name")
                  , t = $(".error-state .org-submit-btn");
                t.data("inUseError") && t.attr("disabled", "disabled"),
                $.each(this, function() {
                    var n = $(this);
                    "org-scope" === n.data("validate") && $(this).on("keyup", function() {
                        $(this).val() !== e ? t.removeAttr("disabled") : t.attr("disabled", "disabled")
                    })
                })
            }
            ,
            $(function() {
                $("[data-validate]").setupValidation()
            })
        }
    }
    , {}],
    32: [function(e, t) {
        window.malarkey = e("malarkey"),
        t.exports = function() {
            $(n)
        }
        ;
        var n = function() {
            var e = document.querySelector("#what-npm-is-for");
            if (e) {
                var t = e.textContent
                  , n = 800
                  , r = {
                    speed: 40,
                    loop: !1,
                    postfix: ""
                }
                  , o = malarkey(e, r);
                o.pause(2400).delete(t.length).type("browsers").pause(n).delete(8).type("io.js").pause(n).delete(5).type("mobile").pause(n).delete(6).type("angular").pause(n).delete(7).type("react").pause(n).delete(5).type("bower").pause(n).delete(5).type("jquery").pause(n).delete(6).type("nodebots").pause(n).delete(8).type("gulp").pause(n).delete(4).type("browserify").pause(n).delete(10).type("grunt").pause(n).delete(5).type("cordova").pause(n).delete(7).type("docpad").pause(n).delete(6).type("tessel").pause(n).delete(6).type("javascript.").pause(1200).call(function() {
                    $(e).addClass("disabled")
                })
            }
        }
    }
    , {
        malarkey: 73
    }],
    33: [function(e, t) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            1: function(e, t, n, r, o) {
                var i;
                return '  <ul class="columnar">\n' + (null  != (i = n.each.call(null  != t ? t : {}, t, {
                    name: "each",
                    hash: {},
                    fn: e.program(2, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + "  </ul>\n"
            },
            2: function(e, t, n, r, o) {
                var i, a, s = null  != t ? t : {}, l = n.helperMissing, u = "function", c = e.escapeExpression;
                return '      <li>\n        <div class="hiring-widget" data-id="' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">\n          <a href="' + c((a = null  != (a = n.url || (null  != t ? t.url : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "url",
                    hash: {},
                    data: o
                }) : a)) + '" class="hiring-widget-logo"><img src="' + c((a = null  != (a = n.logo_url || (null  != t ? t.logo_url : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "logo_url",
                    hash: {},
                    data: o
                }) : a)) + '"></a>\n          <p data-id="' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">' + (null  != (a = null  != (a = n.description || (null  != t ? t.description : t)) ? a : l,
                i = typeof a === u ? a.call(s, {
                    name: "description",
                    hash: {},
                    data: o
                }) : a) ? i : "") + "</p>\n        </div>\n      </li>\n"
            },
            compiler: [7, ">= 4.0.0"],
            main: function(e, t, n, r, o) {
                var i;
                return null  != (i = n.each.call(null  != t ? t : {}, null  != t ? t.companies : t, {
                    name: "each",
                    hash: {},
                    fn: e.program(1, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : ""
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 71
    }],
    34: [function(e, t) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            compiler: [7, ">= 4.0.0"],
            main: function(e, t) {
                var n, r = e.lambda, o = e.escapeExpression;
                return '<div class="ad">\n  <p>\n    <a href="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["0"] : n) ? n.url : n, t)) + '" title="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["0"] : n) ? n.name : n, t)) + '">' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["0"] : n) ? n.name : n, t)) + '</a> is hiring.\n    <a class="quiet" href="/whoshiring">View more&hellip;</a>\n  </p>\n</div>'
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 71
    }],
    35: [function(e, t) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            compiler: [7, ">= 4.0.0"],
            main: function(e, t) {
                var n, r = e.lambda, o = e.escapeExpression;
                return '<div class="ad discreet">\n  <p>\n    <a href="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["0"] : n) ? n.url : n, t)) + '" title="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["0"] : n) ? n.name : n, t)) + '">' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["0"] : n) ? n.name : n, t)) + '</a>,\n    <a href="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["1"] : n) ? n.url : n, t)) + '" title="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["1"] : n) ? n.name : n, t)) + '">' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["1"] : n) ? n.name : n, t)) + '</a>,\n    <a href="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["2"] : n) ? n.url : n, t)) + '" title="' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["2"] : n) ? n.name : n, t)) + '">' + o(r(null  != (n = null  != (n = null  != t ? t.companies : t) ? n["2"] : n) ? n.name : n, t)) + '</a>\n     and lots of other companies are hiring javascript developers.\n    <a class="quiet" href="/whoshiring">View all ' + o(r(null  != (n = null  != t ? t.companies : t) ? n.length : n, t)) + "&hellip;</a>\n  </p>\n</div>\n"
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 71
    }],
    36: [function(e, t) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            1: function(e, t, n, r, o) {
                var i, a, s = null  != t ? t : {}, l = n.helperMissing, u = "function", c = e.escapeExpression;
                return "  <li>\n    " + (null  != (i = n["if"].call(s, null  != t ? t.isPrivate : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(2, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + '\n    <a href="/package/' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + "</a>\n    " + (null  != (i = n["if"].call(s, null  != t ? t.version : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(4, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + "\n    " + (null  != (i = n["if"].call(s, null  != t ? t.description : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(6, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + "\n  </li>\n"
            },
            2: function() {
                return '<i class="icon-lock"></i>'
            },
            4: function(e, t, n, r, o) {
                var i;
                return "- <strong>v" + e.escapeExpression((i = null  != (i = n.version || (null  != t ? t.version : t)) ? i : n.helperMissing,
                "function" == typeof i ? i.call(null  != t ? t : {}, {
                    name: "version",
                    hash: {},
                    data: o
                }) : i)) + "</strong>"
            },
            6: function(e, t, n, r, o) {
                var i;
                return "- " + e.escapeExpression((i = null  != (i = n.description || (null  != t ? t.description : t)) ? i : n.helperMissing,
                "function" == typeof i ? i.call(null  != t ? t : {}, {
                    name: "description",
                    hash: {},
                    data: o
                }) : i))
            },
            compiler: [7, ">= 4.0.0"],
            main: function(e, t, n, r, o) {
                var i;
                return null  != (i = n.each.call(null  != t ? t : {}, null  != (i = null  != t ? t.packages : t) ? i.items : i, {
                    name: "each",
                    hash: {},
                    fn: e.program(1, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : ""
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 71
    }],
    37: [function(e, t) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            1: function() {
                return 'checked="checked"'
            },
            compiler: [7, ">= 4.0.0"],
            main: function(e, t, n, r, o) {
                var i, a, s = null  != t ? t : {}, l = n.helperMissing, u = "function", c = e.escapeExpression;
                return '<li data-name="' + c((a = null  != (a = n.pkgname || (null  != t ? t.pkgname : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "pkgname",
                    hash: {},
                    data: o
                }) : a)) + "\">\n  <span class='name'>\n    <a href='/package/" + c((a = null  != (a = n.pkgname || (null  != t ? t.pkgname : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "pkgname",
                    hash: {},
                    data: o
                }) : a)) + '\' target="_blank">' + c((a = null  != (a = n.pkgname || (null  != t ? t.pkgname : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "pkgname",
                    hash: {},
                    data: o
                }) : a)) + '</a>\n  </span>\n  <div class="switch-container">\n    <label><span class="a11y-only">Write Permission</span>\n      <input class="switch" ' + (null  != (i = n["if"].call(s, null  != t ? t.canWrite : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(1, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + ' type="checkbox" name="writePermissions[' + c((a = null  != (a = n.pkgname || (null  != t ? t.pkgname : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "pkgname",
                    hash: {},
                    data: o
                }) : a)) + ']">\n      <div class="switch"></div>\n      <span class="switch-label unchecked-text" aria-hidden="true">Read-Only</span>\n      <span class="switch-label checked-text" aria-hidden="true">Read/Write</span>\n    </label>\n  </div>\n  <button type=\'button\' class=\'delete-package icon-x\'>\n    <span class=\'a11y-only\'>Remove Package ' + c((a = null  != (a = n.pkgname || (null  != t ? t.pkgname : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "pkgname",
                    hash: {},
                    data: o
                }) : a)) + "</span>\n  </button>\n  <input type='hidden' name='names' value='" + c((a = null  != (a = n.pkgname || (null  != t ? t.pkgname : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "pkgname",
                    hash: {},
                    data: o
                }) : a)) + "' />\n</li>\n"
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 71
    }],
    38: [function(e, t) {
        t.exports = "function" == typeof Object.create ? function(e, t) {
            e.super_ = t,
            e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        }
         : function(e, t) {
            e.super_ = t;
            var n = function() {}
            ;
            n.prototype = t.prototype,
            e.prototype = new n,
            e.prototype.constructor = e
        }
    }
    , {}],
    39: [function(e, t) {
        function n() {
            u = !1,
            a.length ? l = a.concat(l) : c = -1,
            l.length && r()
        }
        function r() {
            if (!u) {
                var e = setTimeout(n);
                u = !0;
                for (var t = l.length; t; ) {
                    for (a = l,
                    l = []; ++c < t; )
                        a && a[c].run();
                    c = -1,
                    t = l.length
                }
                a = null ,
                u = !1,
                clearTimeout(e)
            }
        }
        function o(e, t) {
            this.fun = e,
            this.array = t
        }
        function i() {}
        var a, s = t.exports = {}, l = [], u = !1, c = -1;
        s.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            l.push(new o(e,t)),
            1 !== l.length || u || setTimeout(r, 0)
        }
        ,
        o.prototype.run = function() {
            this.fun.apply(null , this.array)
        }
        ,
        s.title = "browser",
        s.browser = !0,
        s.env = {},
        s.argv = [],
        s.version = "",
        s.versions = {},
        s.on = i,
        s.addListener = i,
        s.once = i,
        s.off = i,
        s.removeListener = i,
        s.removeAllListeners = i,
        s.emit = i,
        s.binding = function() {
            throw new Error("process.binding is not supported")
        }
        ,
        s.cwd = function() {
            return "/"
        }
        ,
        s.chdir = function() {
            throw new Error("process.chdir is not supported")
        }
        ,
        s.umask = function() {
            return 0
        }
    }
    , {}],
    40: [function(e, t, n) {
        (function(e) {
            !function(r) {
                function o(e) {
                    throw new RangeError(D[e])
                }
                function i(e, t) {
                    for (var n = e.length, r = []; n--; )
                        r[n] = t(e[n]);
                    return r
                }
                function a(e, t) {
                    var n = e.split("@")
                      , r = "";
                    n.length > 1 && (r = n[0] + "@",
                    e = n[1]),
                    e = e.replace(A, ".");
                    var o = e.split(".")
                      , a = i(o, t).join(".");
                    return r + a
                }
                function s(e) {
                    for (var t, n, r = [], o = 0, i = e.length; i > o; )
                        t = e.charCodeAt(o++),
                        t >= 55296 && 56319 >= t && i > o ? (n = e.charCodeAt(o++),
                        56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t),
                        o--)) : r.push(t);
                    return r
                }
                function l(e) {
                    return i(e, function(e) {
                        var t = "";
                        return e > 65535 && (e -= 65536,
                        t += L(e >>> 10 & 1023 | 55296),
                        e = 56320 | 1023 & e),
                        t += L(e)
                    }).join("")
                }
                function u(e) {
                    return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : x
                }
                function c(e, t) {
                    return e + 22 + 75 * (26 > e) - ((0 != t) << 5)
                }
                function f(e, t, n) {
                    var r = 0;
                    for (e = n ? q(e / C) : e >> 1,
                    e += q(e / t); e > O * P >> 1; r += x)
                        e = q(e / O);
                    return q(r + (O + 1) * e / (e + k))
                }
                function p(e) {
                    var t, n, r, i, a, s, c, p, d, h, m = [], g = e.length, v = 0, y = S, b = T;
                    for (n = e.lastIndexOf(j),
                    0 > n && (n = 0),
                    r = 0; n > r; ++r)
                        e.charCodeAt(r) >= 128 && o("not-basic"),
                        m.push(e.charCodeAt(r));
                    for (i = n > 0 ? n + 1 : 0; g > i; ) {
                        for (a = v,
                        s = 1,
                        c = x; i >= g && o("invalid-input"),
                        p = u(e.charCodeAt(i++)),
                        (p >= x || p > q((N - v) / s)) && o("overflow"),
                        v += p * s,
                        d = b >= c ? M : c >= b + P ? P : c - b,
                        !(d > p); c += x)
                            h = x - d,
                            s > q(N / h) && o("overflow"),
                            s *= h;
                        t = m.length + 1,
                        b = f(v - a, t, 0 == a),
                        q(v / t) > N - y && o("overflow"),
                        y += q(v / t),
                        v %= t,
                        m.splice(v++, 0, y)
                    }
                    return l(m)
                }
                function d(e) {
                    var t, n, r, i, a, l, u, p, d, h, m, g, v, y, b, w = [];
                    for (e = s(e),
                    g = e.length,
                    t = S,
                    n = 0,
                    a = T,
                    l = 0; g > l; ++l)
                        m = e[l],
                        128 > m && w.push(L(m));
                    for (r = i = w.length,
                    i && w.push(j); g > r; ) {
                        for (u = N,
                        l = 0; g > l; ++l)
                            m = e[l],
                            m >= t && u > m && (u = m);
                        for (v = r + 1,
                        u - t > q((N - n) / v) && o("overflow"),
                        n += (u - t) * v,
                        t = u,
                        l = 0; g > l; ++l)
                            if (m = e[l],
                            t > m && ++n > N && o("overflow"),
                            m == t) {
                                for (p = n,
                                d = x; h = a >= d ? M : d >= a + P ? P : d - a,
                                !(h > p); d += x)
                                    b = p - h,
                                    y = x - h,
                                    w.push(L(c(h + b % y, 0))),
                                    p = q(b / y);
                                w.push(L(c(p, 0))),
                                a = f(n, v, r == i),
                                n = 0,
                                ++r
                            }
                        ++n,
                        ++t
                    }
                    return w.join("")
                }
                function h(e) {
                    return a(e, function(e) {
                        return $.test(e) ? p(e.slice(4).toLowerCase()) : e
                    })
                }
                function m(e) {
                    return a(e, function(e) {
                        return E.test(e) ? "xn--" + d(e) : e
                    })
                }
                var g = "object" == typeof n && n && !n.nodeType && n
                  , v = "object" == typeof t && t && !t.nodeType && t
                  , y = "object" == typeof e && e;
                (y.global === y || y.window === y || y.self === y) && (r = y);
                var b, w, N = 2147483647, x = 36, M = 1, P = 26, k = 38, C = 700, T = 72, S = 128, j = "-", $ = /^xn--/, E = /[^\x20-\x7E]/, A = /[\x2E\u3002\uFF0E\uFF61]/g, D = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, O = x - M, q = Math.floor, L = String.fromCharCode;
                if (b = {
                    version: "1.4.1",
                    ucs2: {
                        decode: s,
                        encode: l
                    },
                    decode: p,
                    encode: d,
                    toASCII: m,
                    toUnicode: h
                },
                "function" == typeof define && "object" == typeof define.amd && define.amd)
                    define("punycode", function() {
                        return b
                    });
                else if (g && v)
                    if (t.exports == g)
                        v.exports = b;
                    else
                        for (w in b)
                            b.hasOwnProperty(w) && (g[w] = b[w]);
                else
                    r.punycode = b
            }(this)
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    41: [function(e, t) {
        "use strict";
        function n(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.exports = function(e, t, o, i) {
            t = t || "&",
            o = o || "=";
            var a = {};
            if ("string" != typeof e || 0 === e.length)
                return a;
            var s = /\+/g;
            e = e.split(t);
            var l = 1e3;
            i && "number" == typeof i.maxKeys && (l = i.maxKeys);
            var u = e.length;
            l > 0 && u > l && (u = l);
            for (var c = 0; u > c; ++c) {
                var f, p, d, h, m = e[c].replace(s, "%20"), g = m.indexOf(o);
                g >= 0 ? (f = m.substr(0, g),
                p = m.substr(g + 1)) : (f = m,
                p = ""),
                d = decodeURIComponent(f),
                h = decodeURIComponent(p),
                n(a, d) ? r(a[d]) ? a[d].push(h) : a[d] = [a[d], h] : a[d] = h
            }
            return a
        }
        ;
        var r = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    }
    , {}],
    42: [function(e, t) {
        "use strict";
        function n(e, t) {
            if (e.map)
                return e.map(t);
            for (var n = [], r = 0; r < e.length; r++)
                n.push(t(e[r], r));
            return n
        }
        var r = function(e) {
            switch (typeof e) {
            case "string":
                return e;
            case "boolean":
                return e ? "true" : "false";
            case "number":
                return isFinite(e) ? e : "";
            default:
                return ""
            }
        }
        ;
        t.exports = function(e, t, a, s) {
            return t = t || "&",
            a = a || "=",
            null  === e && (e = void 0),
            "object" == typeof e ? n(i(e), function(i) {
                var s = encodeURIComponent(r(i)) + a;
                return o(e[i]) ? n(e[i], function(e) {
                    return s + encodeURIComponent(r(e))
                }).join(t) : s + encodeURIComponent(r(e[i]))
            }).join(t) : s ? encodeURIComponent(r(s)) + a + encodeURIComponent(r(e)) : ""
        }
        ;
        var o = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
          , i = Object.keys || function(e) {
            var t = [];
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return t
        }
    }
    , {}],
    43: [function(e, t, n) {
        "use strict";
        n.decode = n.parse = e("./decode"),
        n.encode = n.stringify = e("./encode")
    }
    , {
        "./decode": 41,
        "./encode": 42
    }],
    44: [function(e, t, n) {
        "use strict";
        function r() {
            this.protocol = null ,
            this.slashes = null ,
            this.auth = null ,
            this.host = null ,
            this.port = null ,
            this.hostname = null ,
            this.hash = null ,
            this.search = null ,
            this.query = null ,
            this.pathname = null ,
            this.path = null ,
            this.href = null 
        }
        function o(e, t, n) {
            if (e && u.isObject(e) && e instanceof r)
                return e;
            var o = new r;
            return o.parse(e, t, n),
            o
        }
        function i(e) {
            return u.isString(e) && (e = o(e)),
            e instanceof r ? e.format() : r.prototype.format.call(e)
        }
        function a(e, t) {
            return o(e, !1, !0).resolve(t)
        }
        function s(e, t) {
            return e ? o(e, !1, !0).resolveObject(t) : t
        }
        var l = e("punycode")
          , u = e("./util");
        n.parse = o,
        n.resolve = a,
        n.resolveObject = s,
        n.format = i,
        n.Url = r;
        var c = /^([a-z0-9.+-]+:)/i
          , f = /:[0-9]*$/
          , p = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
          , d = ["<", ">", '"', "`", " ", "\r", "\n", "	"]
          , h = ["{", "}", "|", "\\", "^", "`"].concat(d)
          , m = ["'"].concat(h)
          , g = ["%", "/", "?", ";", "#"].concat(m)
          , v = ["/", "?", "#"]
          , y = 255
          , b = /^[+a-z0-9A-Z_-]{0,63}$/
          , w = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
          , N = {
            javascript: !0,
            "javascript:": !0
        }
          , x = {
            javascript: !0,
            "javascript:": !0
        }
          , M = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        }
          , P = e("querystring");
        r.prototype.parse = function(e, t, n) {
            if (!u.isString(e))
                throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
            var r = e.indexOf("?")
              , o = -1 !== r && r < e.indexOf("#") ? "?" : "#"
              , i = e.split(o)
              , a = /\\/g;
            i[0] = i[0].replace(a, "/"),
            e = i.join(o);
            var s = e;
            if (s = s.trim(),
            !n && 1 === e.split("#").length) {
                var f = p.exec(s);
                if (f)
                    return this.path = s,
                    this.href = s,
                    this.pathname = f[1],
                    f[2] ? (this.search = f[2],
                    this.query = t ? P.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                    this.query = {}),
                    this
            }
            var d = c.exec(s);
            if (d) {
                d = d[0];
                var h = d.toLowerCase();
                this.protocol = h,
                s = s.substr(d.length)
            }
            if (n || d || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var k = "//" === s.substr(0, 2);
                !k || d && x[d] || (s = s.substr(2),
                this.slashes = !0)
            }
            if (!x[d] && (k || d && !M[d])) {
                for (var C = -1, T = 0; T < v.length; T++) {
                    var S = s.indexOf(v[T]);
                    -1 !== S && (-1 === C || C > S) && (C = S)
                }
                var j, $;
                $ = -1 === C ? s.lastIndexOf("@") : s.lastIndexOf("@", C),
                -1 !== $ && (j = s.slice(0, $),
                s = s.slice($ + 1),
                this.auth = decodeURIComponent(j)),
                C = -1;
                for (var T = 0; T < g.length; T++) {
                    var S = s.indexOf(g[T]);
                    -1 !== S && (-1 === C || C > S) && (C = S)
                }
                -1 === C && (C = s.length),
                this.host = s.slice(0, C),
                s = s.slice(C),
                this.parseHost(),
                this.hostname = this.hostname || "";
                var E = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                if (!E)
                    for (var A = this.hostname.split(/\./), T = 0, D = A.length; D > T; T++) {
                        var O = A[T];
                        if (O && !O.match(b)) {
                            for (var q = "", L = 0, H = O.length; H > L; L++)
                                q += O.charCodeAt(L) > 127 ? "x" : O[L];
                            if (!q.match(b)) {
                                var I = A.slice(0, T)
                                  , _ = A.slice(T + 1)
                                  , F = O.match(w);
                                F && (I.push(F[1]),
                                _.unshift(F[2])),
                                _.length && (s = "/" + _.join(".") + s),
                                this.hostname = I.join(".");
                                break
                            }
                        }
                    }
                this.hostname = this.hostname.length > y ? "" : this.hostname.toLowerCase(),
                E || (this.hostname = l.toASCII(this.hostname));
                var R = this.port ? ":" + this.port : ""
                  , z = this.hostname || "";
                this.host = z + R,
                this.href += this.host,
                E && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
                "/" !== s[0] && (s = "/" + s))
            }
            if (!N[h])
                for (var T = 0, D = m.length; D > T; T++) {
                    var B = m[T];
                    if (-1 !== s.indexOf(B)) {
                        var W = encodeURIComponent(B);
                        W === B && (W = escape(B)),
                        s = s.split(B).join(W)
                    }
                }
            var U = s.indexOf("#");
            -1 !== U && (this.hash = s.substr(U),
            s = s.slice(0, U));
            var V = s.indexOf("?");
            if (-1 !== V ? (this.search = s.substr(V),
            this.query = s.substr(V + 1),
            t && (this.query = P.parse(this.query)),
            s = s.slice(0, V)) : t && (this.search = "",
            this.query = {}),
            s && (this.pathname = s),
            M[h] && this.hostname && !this.pathname && (this.pathname = "/"),
            this.pathname || this.search) {
                var R = this.pathname || ""
                  , G = this.search || "";
                this.path = R + G
            }
            return this.href = this.format(),
            this
        }
        ,
        r.prototype.format = function() {
            var e = this.auth || "";
            e && (e = encodeURIComponent(e),
            e = e.replace(/%3A/i, ":"),
            e += "@");
            var t = this.protocol || ""
              , n = this.pathname || ""
              , r = this.hash || ""
              , o = !1
              , i = "";
            this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
            this.port && (o += ":" + this.port)),
            this.query && u.isObject(this.query) && Object.keys(this.query).length && (i = P.stringify(this.query));
            var a = this.search || i && "?" + i || "";
            return t && ":" !== t.substr(-1) && (t += ":"),
            this.slashes || (!t || M[t]) && o !== !1 ? (o = "//" + (o || ""),
            n && "/" !== n.charAt(0) && (n = "/" + n)) : o || (o = ""),
            r && "#" !== r.charAt(0) && (r = "#" + r),
            a && "?" !== a.charAt(0) && (a = "?" + a),
            n = n.replace(/[?#]/g, function(e) {
                return encodeURIComponent(e)
            }),
            a = a.replace("#", "%23"),
            t + o + n + a + r
        }
        ,
        r.prototype.resolve = function(e) {
            return this.resolveObject(o(e, !1, !0)).format()
        }
        ,
        r.prototype.resolveObject = function(e) {
            if (u.isString(e)) {
                var t = new r;
                t.parse(e, !1, !0),
                e = t
            }
            for (var n = new r, o = Object.keys(this), i = 0; i < o.length; i++) {
                var a = o[i];
                n[a] = this[a]
            }
            if (n.hash = e.hash,
            "" === e.href)
                return n.href = n.format(),
                n;
            if (e.slashes && !e.protocol) {
                for (var s = Object.keys(e), l = 0; l < s.length; l++) {
                    var c = s[l];
                    "protocol" !== c && (n[c] = e[c])
                }
                return M[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
                n.href = n.format(),
                n
            }
            if (e.protocol && e.protocol !== n.protocol) {
                if (!M[e.protocol]) {
                    for (var f = Object.keys(e), p = 0; p < f.length; p++) {
                        var d = f[p];
                        n[d] = e[d]
                    }
                    return n.href = n.format(),
                    n
                }
                if (n.protocol = e.protocol,
                e.host || x[e.protocol])
                    n.pathname = e.pathname;
                else {
                    for (var h = (e.pathname || "").split("/"); h.length && !(e.host = h.shift()); )
                        ;
                    e.host || (e.host = ""),
                    e.hostname || (e.hostname = ""),
                    "" !== h[0] && h.unshift(""),
                    h.length < 2 && h.unshift(""),
                    n.pathname = h.join("/")
                }
                if (n.search = e.search,
                n.query = e.query,
                n.host = e.host || "",
                n.auth = e.auth,
                n.hostname = e.hostname || e.host,
                n.port = e.port,
                n.pathname || n.search) {
                    var m = n.pathname || ""
                      , g = n.search || "";
                    n.path = m + g
                }
                return n.slashes = n.slashes || e.slashes,
                n.href = n.format(),
                n
            }
            var v = n.pathname && "/" === n.pathname.charAt(0)
              , y = e.host || e.pathname && "/" === e.pathname.charAt(0)
              , b = y || v || n.host && e.pathname
              , w = b
              , N = n.pathname && n.pathname.split("/") || []
              , h = e.pathname && e.pathname.split("/") || []
              , P = n.protocol && !M[n.protocol];
            if (P && (n.hostname = "",
            n.port = null ,
            n.host && ("" === N[0] ? N[0] = n.host : N.unshift(n.host)),
            n.host = "",
            e.protocol && (e.hostname = null ,
            e.port = null ,
            e.host && ("" === h[0] ? h[0] = e.host : h.unshift(e.host)),
            e.host = null ),
            b = b && ("" === h[0] || "" === N[0])),
            y)
                n.host = e.host || "" === e.host ? e.host : n.host,
                n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
                n.search = e.search,
                n.query = e.query,
                N = h;
            else if (h.length)
                N || (N = []),
                N.pop(),
                N = N.concat(h),
                n.search = e.search,
                n.query = e.query;
            else if (!u.isNullOrUndefined(e.search)) {
                if (P) {
                    n.hostname = n.host = N.shift();
                    var k = n.host && n.host.indexOf("@") > 0 ? n.host.split("@") : !1;
                    k && (n.auth = k.shift(),
                    n.host = n.hostname = k.shift())
                }
                return n.search = e.search,
                n.query = e.query,
                u.isNull(n.pathname) && u.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
                n.href = n.format(),
                n
            }
            if (!N.length)
                return n.pathname = null ,
                n.path = n.search ? "/" + n.search : null ,
                n.href = n.format(),
                n;
            for (var C = N.slice(-1)[0], T = (n.host || e.host || N.length > 1) && ("." === C || ".." === C) || "" === C, S = 0, j = N.length; j >= 0; j--)
                C = N[j],
                "." === C ? N.splice(j, 1) : ".." === C ? (N.splice(j, 1),
                S++) : S && (N.splice(j, 1),
                S--);
            if (!b && !w)
                for (; S--; S)
                    N.unshift("..");
            !b || "" === N[0] || N[0] && "/" === N[0].charAt(0) || N.unshift(""),
            T && "/" !== N.join("/").substr(-1) && N.push("");
            var $ = "" === N[0] || N[0] && "/" === N[0].charAt(0);
            if (P) {
                n.hostname = n.host = $ ? "" : N.length ? N.shift() : "";
                var k = n.host && n.host.indexOf("@") > 0 ? n.host.split("@") : !1;
                k && (n.auth = k.shift(),
                n.host = n.hostname = k.shift())
            }
            return b = b || n.host && N.length,
            b && !$ && N.unshift(""),
            N.length ? n.pathname = N.join("/") : (n.pathname = null ,
            n.path = null ),
            u.isNull(n.pathname) && u.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
            n.auth = e.auth || n.auth,
            n.slashes = n.slashes || e.slashes,
            n.href = n.format(),
            n
        }
        ,
        r.prototype.parseHost = function() {
            var e = this.host
              , t = f.exec(e);
            t && (t = t[0],
            ":" !== t && (this.port = t.substr(1)),
            e = e.substr(0, e.length - t.length)),
            e && (this.hostname = e)
        }
    }
    , {
        "./util": 45,
        punycode: 40,
        querystring: 43
    }],
    45: [function(e, t) {
        "use strict";
        t.exports = {
            isString: function(e) {
                return "string" == typeof e
            },
            isObject: function(e) {
                return "object" == typeof e && null  !== e
            },
            isNull: function(e) {
                return null  === e
            },
            isNullOrUndefined: function(e) {
                return null  == e
            }
        }
    }
    , {}],
    46: [function(e, t) {
        t.exports = function(e) {
            return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
        }
    }
    , {}],
    47: [function(e, t, n) {
        (function(t, r) {
            function o(e, t) {
                var r = {
                    seen: [],
                    stylize: a
                };
                return arguments.length >= 3 && (r.depth = arguments[2]),
                arguments.length >= 4 && (r.colors = arguments[3]),
                m(t) ? r.showHidden = t : t && n._extend(r, t),
                N(r.showHidden) && (r.showHidden = !1),
                N(r.depth) && (r.depth = 2),
                N(r.colors) && (r.colors = !1),
                N(r.customInspect) && (r.customInspect = !0),
                r.colors && (r.stylize = i),
                l(r, e, r.depth)
            }
            function i(e, t) {
                var n = o.styles[t];
                return n ? "[" + o.colors[n][0] + "m" + e + "[" + o.colors[n][1] + "m" : e
            }
            function a(e) {
                return e
            }
            function s(e) {
                var t = {};
                return e.forEach(function(e) {
                    t[e] = !0
                }),
                t
            }
            function l(e, t, r) {
                if (e.customInspect && t && C(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                    var o = t.inspect(r, e);
                    return b(o) || (o = l(e, o, r)),
                    o
                }
                var i = u(e, t);
                if (i)
                    return i;
                var a = Object.keys(t)
                  , m = s(a);
                if (e.showHidden && (a = Object.getOwnPropertyNames(t)),
                k(t) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0))
                    return c(t);
                if (0 === a.length) {
                    if (C(t)) {
                        var g = t.name ? ": " + t.name : "";
                        return e.stylize("[Function" + g + "]", "special")
                    }
                    if (x(t))
                        return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                    if (P(t))
                        return e.stylize(Date.prototype.toString.call(t), "date");
                    if (k(t))
                        return c(t)
                }
                var v = ""
                  , y = !1
                  , w = ["{", "}"];
                if (h(t) && (y = !0,
                w = ["[", "]"]),
                C(t)) {
                    var N = t.name ? ": " + t.name : "";
                    v = " [Function" + N + "]"
                }
                if (x(t) && (v = " " + RegExp.prototype.toString.call(t)),
                P(t) && (v = " " + Date.prototype.toUTCString.call(t)),
                k(t) && (v = " " + c(t)),
                0 === a.length && (!y || 0 == t.length))
                    return w[0] + v + w[1];
                if (0 > r)
                    return x(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
                e.seen.push(t);
                var M;
                return M = y ? f(e, t, r, m, a) : a.map(function(n) {
                    return p(e, t, r, m, n, y)
                }),
                e.seen.pop(),
                d(M, v, w)
            }
            function u(e, t) {
                if (N(t))
                    return e.stylize("undefined", "undefined");
                if (b(t)) {
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string")
                }
                return y(t) ? e.stylize("" + t, "number") : m(t) ? e.stylize("" + t, "boolean") : g(t) ? e.stylize("null", "null") : void 0
            }
            function c(e) {
                return "[" + Error.prototype.toString.call(e) + "]"
            }
            function f(e, t, n, r, o) {
                for (var i = [], a = 0, s = t.length; s > a; ++a)
                    E(t, String(a)) ? i.push(p(e, t, n, r, String(a), !0)) : i.push("");
                return o.forEach(function(o) {
                    o.match(/^\d+$/) || i.push(p(e, t, n, r, o, !0))
                }),
                i
            }
            function p(e, t, n, r, o, i) {
                var a, s, u;
                if (u = Object.getOwnPropertyDescriptor(t, o) || {
                    value: t[o]
                },
                u.get ? s = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (s = e.stylize("[Setter]", "special")),
                E(r, o) || (a = "[" + o + "]"),
                s || (e.seen.indexOf(u.value) < 0 ? (s = g(n) ? l(e, u.value, null ) : l(e, u.value, n - 1),
                s.indexOf("\n") > -1 && (s = i ? s.split("\n").map(function(e) {
                    return "  " + e
                }).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) {
                    return "   " + e
                }).join("\n"))) : s = e.stylize("[Circular]", "special")),
                N(a)) {
                    if (i && o.match(/^\d+$/))
                        return s;
                    a = JSON.stringify("" + o),
                    a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2),
                    a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
                    a = e.stylize(a, "string"))
                }
                return a + ": " + s
            }
            function d(e, t, n) {
                var r = 0
                  , o = e.reduce(function(e, t) {
                    return r++,
                    t.indexOf("\n") >= 0 && r++,
                    e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0);
                return o > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
            }
            function h(e) {
                return Array.isArray(e)
            }
            function m(e) {
                return "boolean" == typeof e
            }
            function g(e) {
                return null  === e
            }
            function v(e) {
                return null  == e
            }
            function y(e) {
                return "number" == typeof e
            }
            function b(e) {
                return "string" == typeof e
            }
            function w(e) {
                return "symbol" == typeof e
            }
            function N(e) {
                return void 0 === e
            }
            function x(e) {
                return M(e) && "[object RegExp]" === S(e)
            }
            function M(e) {
                return "object" == typeof e && null  !== e
            }
            function P(e) {
                return M(e) && "[object Date]" === S(e)
            }
            function k(e) {
                return M(e) && ("[object Error]" === S(e) || e instanceof Error)
            }
            function C(e) {
                return "function" == typeof e
            }
            function T(e) {
                return null  === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
            }
            function S(e) {
                return Object.prototype.toString.call(e)
            }
            function j(e) {
                return 10 > e ? "0" + e.toString(10) : e.toString(10)
            }
            function $() {
                var e = new Date
                  , t = [j(e.getHours()), j(e.getMinutes()), j(e.getSeconds())].join(":");
                return [e.getDate(), q[e.getMonth()], t].join(" ")
            }
            function E(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            var A = /%[sdj%]/g;
            n.format = function(e) {
                if (!b(e)) {
                    for (var t = [], n = 0; n < arguments.length; n++)
                        t.push(o(arguments[n]));
                    return t.join(" ")
                }
                for (var n = 1, r = arguments, i = r.length, a = String(e).replace(A, function(e) {
                    if ("%%" === e)
                        return "%";
                    if (n >= i)
                        return e;
                    switch (e) {
                    case "%s":
                        return String(r[n++]);
                    case "%d":
                        return Number(r[n++]);
                    case "%j":
                        try {
                            return JSON.stringify(r[n++])
                        } catch (t) {
                            return "[Circular]"
                        }
                    default:
                        return e
                    }
                }), s = r[n]; i > n; s = r[++n])
                    a += g(s) || !M(s) ? " " + s : " " + o(s);
                return a
            }
            ,
            n.deprecate = function(e, o) {
                function i() {
                    if (!a) {
                        if (t.throwDeprecation)
                            throw new Error(o);
                        t.traceDeprecation ? console.trace(o) : console.error(o),
                        a = !0
                    }
                    return e.apply(this, arguments)
                }
                if (N(r.process))
                    return function() {
                        return n.deprecate(e, o).apply(this, arguments)
                    }
                    ;
                if (t.noDeprecation === !0)
                    return e;
                var a = !1;
                return i
            }
            ;
            var D, O = {};
            n.debuglog = function(e) {
                if (N(D) && (D = t.env.NODE_DEBUG || ""),
                e = e.toUpperCase(),
                !O[e])
                    if (new RegExp("\\b" + e + "\\b","i").test(D)) {
                        var r = t.pid;
                        O[e] = function() {
                            var t = n.format.apply(n, arguments);
                            console.error("%s %d: %s", e, r, t)
                        }
                    } else
                        O[e] = function() {}
                        ;
                return O[e]
            }
            ,
            n.inspect = o,
            o.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            },
            o.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            },
            n.isArray = h,
            n.isBoolean = m,
            n.isNull = g,
            n.isNullOrUndefined = v,
            n.isNumber = y,
            n.isString = b,
            n.isSymbol = w,
            n.isUndefined = N,
            n.isRegExp = x,
            n.isObject = M,
            n.isDate = P,
            n.isError = k,
            n.isFunction = C,
            n.isPrimitive = T,
            n.isBuffer = e("./support/isBuffer");
            var q = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            n.log = function() {
                console.log("%s - %s", $(), n.format.apply(n, arguments))
            }
            ,
            n.inherits = e("inherits"),
            n._extend = function(e, t) {
                if (!t || !M(t))
                    return e;
                for (var n = Object.keys(t), r = n.length; r--; )
                    e[n[r]] = t[n[r]];
                return e
            }
        }
        ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "./support/isBuffer": 46,
        _process: 39,
        inherits: 38
    }],
    48: [function(e, t, n) {
        "use strict";
        (function() {
            function e(e, t) {
                var n = [];
                t = parseInt(t) || 2;
                for (var r = 0; r < Math.ceil(e.length / t); r++) {
                    var o = r * t
                      , i = o + t;
                    n.push(e.slice(o, i))
                }
                return n
            }
            "undefined" != typeof n ? ("undefined" != typeof t && t.exports && (n = t.exports = e),
            n.chunk = e) : this.chunk = e
        }
        ).call(this)
    }
    , {}],
    49: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null  != e)
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t["default"] = e,
            t
        }
        function i() {
            var e = new s.HandlebarsEnvironment;
            return d.extend(e, s),
            e.SafeString = u["default"],
            e.Exception = f["default"],
            e.Utils = d,
            e.escapeExpression = d.escapeExpression,
            e.VM = m,
            e.template = function(t) {
                return m.template(t, e)
            }
            ,
            e
        }
        n.__esModule = !0;
        var a = e("./handlebars/base")
          , s = o(a)
          , l = e("./handlebars/safe-string")
          , u = r(l)
          , c = e("./handlebars/exception")
          , f = r(c)
          , p = e("./handlebars/utils")
          , d = o(p)
          , h = e("./handlebars/runtime")
          , m = o(h)
          , g = e("./handlebars/no-conflict")
          , v = r(g)
          , y = i();
        y.create = i,
        v["default"](y),
        y["default"] = y,
        n["default"] = y,
        t.exports = n["default"]
    }
    , {
        "./handlebars/base": 50,
        "./handlebars/exception": 53,
        "./handlebars/no-conflict": 63,
        "./handlebars/runtime": 64,
        "./handlebars/safe-string": 65,
        "./handlebars/utils": 66
    }],
    50: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e, t, n) {
            this.helpers = e || {},
            this.partials = t || {},
            this.decorators = n || {},
            l.registerDefaultHelpers(this),
            u.registerDefaultDecorators(this)
        }
        n.__esModule = !0,
        n.HandlebarsEnvironment = o;
        var i = e("./utils")
          , a = e("./exception")
          , s = r(a)
          , l = e("./helpers")
          , u = e("./decorators")
          , c = e("./logger")
          , f = r(c)
          , p = "4.0.5";
        n.VERSION = p;
        var d = 7;
        n.COMPILER_REVISION = d;
        var h = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        n.REVISION_CHANGES = h;
        var m = "[object Object]";
        o.prototype = {
            constructor: o,
            logger: f["default"],
            log: f["default"].log,
            registerHelper: function(e, t) {
                if (i.toString.call(e) === m) {
                    if (t)
                        throw new s["default"]("Arg not supported with multiple helpers");
                    i.extend(this.helpers, e)
                } else
                    this.helpers[e] = t
            },
            unregisterHelper: function(e) {
                delete this.helpers[e]
            },
            registerPartial: function(e, t) {
                if (i.toString.call(e) === m)
                    i.extend(this.partials, e);
                else {
                    if ("undefined" == typeof t)
                        throw new s["default"]('Attempting to register a partial called "' + e + '" as undefined');
                    this.partials[e] = t
                }
            },
            unregisterPartial: function(e) {
                delete this.partials[e]
            },
            registerDecorator: function(e, t) {
                if (i.toString.call(e) === m) {
                    if (t)
                        throw new s["default"]("Arg not supported with multiple decorators");
                    i.extend(this.decorators, e)
                } else
                    this.decorators[e] = t
            },
            unregisterDecorator: function(e) {
                delete this.decorators[e]
            }
        };
        var g = f["default"].log;
        n.log = g,
        n.createFrame = i.createFrame,
        n.logger = f["default"]
    }
    , {
        "./decorators": 51,
        "./exception": 53,
        "./helpers": 54,
        "./logger": 62,
        "./utils": 66
    }],
    51: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e) {
            a["default"](e)
        }
        n.__esModule = !0,
        n.registerDefaultDecorators = o;
        var i = e("./decorators/inline")
          , a = r(i)
    }
    , {
        "./decorators/inline": 52
    }],
    52: [function(e, t, n) {
        "use strict";
        n.__esModule = !0;
        var r = e("../utils");
        n["default"] = function(e) {
            e.registerDecorator("inline", function(e, t, n, o) {
                var i = e;
                return t.partials || (t.partials = {},
                i = function(o, i) {
                    var a = n.partials;
                    n.partials = r.extend({}, a, t.partials);
                    var s = e(o, i);
                    return n.partials = a,
                    s
                }
                ),
                t.partials[o.args[0]] = o.fn,
                i
            })
        }
        ,
        t.exports = n["default"]
    }
    , {
        "../utils": 66
    }],
    53: [function(e, t, n) {
        "use strict";
        function r(e, t) {
            var n = t && t.loc
              , i = void 0
              , a = void 0;
            n && (i = n.start.line,
            a = n.start.column,
            e += " - " + i + ":" + a);
            for (var s = Error.prototype.constructor.call(this, e), l = 0; l < o.length; l++)
                this[o[l]] = s[o[l]];
            Error.captureStackTrace && Error.captureStackTrace(this, r),
            n && (this.lineNumber = i,
            this.column = a)
        }
        n.__esModule = !0;
        var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        r.prototype = new Error,
        n["default"] = r,
        t.exports = n["default"]
    }
    , {}],
    54: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e) {
            a["default"](e),
            l["default"](e),
            c["default"](e),
            p["default"](e),
            h["default"](e),
            g["default"](e),
            y["default"](e)
        }
        n.__esModule = !0,
        n.registerDefaultHelpers = o;
        var i = e("./helpers/block-helper-missing")
          , a = r(i)
          , s = e("./helpers/each")
          , l = r(s)
          , u = e("./helpers/helper-missing")
          , c = r(u)
          , f = e("./helpers/if")
          , p = r(f)
          , d = e("./helpers/log")
          , h = r(d)
          , m = e("./helpers/lookup")
          , g = r(m)
          , v = e("./helpers/with")
          , y = r(v)
    }
    , {
        "./helpers/block-helper-missing": 55,
        "./helpers/each": 56,
        "./helpers/helper-missing": 57,
        "./helpers/if": 58,
        "./helpers/log": 59,
        "./helpers/lookup": 60,
        "./helpers/with": 61
    }],
    55: [function(e, t, n) {
        "use strict";
        n.__esModule = !0;
        var r = e("../utils");
        n["default"] = function(e) {
            e.registerHelper("blockHelperMissing", function(t, n) {
                var o = n.inverse
                  , i = n.fn;
                if (t === !0)
                    return i(this);
                if (t === !1 || null  == t)
                    return o(this);
                if (r.isArray(t))
                    return t.length > 0 ? (n.ids && (n.ids = [n.name]),
                    e.helpers.each(t, n)) : o(this);
                if (n.data && n.ids) {
                    var a = r.createFrame(n.data);
                    a.contextPath = r.appendContextPath(n.data.contextPath, n.name),
                    n = {
                        data: a
                    }
                }
                return i(t, n)
            })
        }
        ,
        t.exports = n["default"]
    }
    , {
        "../utils": 66
    }],
    56: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        n.__esModule = !0;
        var o = e("../utils")
          , i = e("../exception")
          , a = r(i);
        n["default"] = function(e) {
            e.registerHelper("each", function(e, t) {
                function n(t, n, i) {
                    u && (u.key = t,
                    u.index = n,
                    u.first = 0 === n,
                    u.last = !!i,
                    c && (u.contextPath = c + t)),
                    l += r(e[t], {
                        data: u,
                        blockParams: o.blockParams([e[t], t], [c + t, null ])
                    })
                }
                if (!t)
                    throw new a["default"]("Must pass iterator to #each");
                var r = t.fn
                  , i = t.inverse
                  , s = 0
                  , l = ""
                  , u = void 0
                  , c = void 0;
                if (t.data && t.ids && (c = o.appendContextPath(t.data.contextPath, t.ids[0]) + "."),
                o.isFunction(e) && (e = e.call(this)),
                t.data && (u = o.createFrame(t.data)),
                e && "object" == typeof e)
                    if (o.isArray(e))
                        for (var f = e.length; f > s; s++)
                            s in e && n(s, s, s === e.length - 1);
                    else {
                        var p = void 0;
                        for (var d in e)
                            e.hasOwnProperty(d) && (void 0 !== p && n(p, s - 1),
                            p = d,
                            s++);
                        void 0 !== p && n(p, s - 1, !0)
                    }
                return 0 === s && (l = i(this)),
                l
            })
        }
        ,
        t.exports = n["default"]
    }
    , {
        "../exception": 53,
        "../utils": 66
    }],
    57: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        n.__esModule = !0;
        var o = e("../exception")
          , i = r(o);
        n["default"] = function(e) {
            e.registerHelper("helperMissing", function() {
                if (1 === arguments.length)
                    return void 0;
                throw new i["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            })
        }
        ,
        t.exports = n["default"]
    }
    , {
        "../exception": 53
    }],
    58: [function(e, t, n) {
        "use strict";
        n.__esModule = !0;
        var r = e("../utils");
        n["default"] = function(e) {
            e.registerHelper("if", function(e, t) {
                return r.isFunction(e) && (e = e.call(this)),
                !t.hash.includeZero && !e || r.isEmpty(e) ? t.inverse(this) : t.fn(this)
            }),
            e.registerHelper("unless", function(t, n) {
                return e.helpers["if"].call(this, t, {
                    fn: n.inverse,
                    inverse: n.fn,
                    hash: n.hash
                })
            })
        }
        ,
        t.exports = n["default"]
    }
    , {
        "../utils": 66
    }],
    59: [function(e, t, n) {
        "use strict";
        n.__esModule = !0,
        n["default"] = function(e) {
            e.registerHelper("log", function() {
                for (var t = [void 0], n = arguments[arguments.length - 1], r = 0; r < arguments.length - 1; r++)
                    t.push(arguments[r]);
                var o = 1;
                null  != n.hash.level ? o = n.hash.level : n.data && null  != n.data.level && (o = n.data.level),
                t[0] = o,
                e.log.apply(e, t)
            })
        }
        ,
        t.exports = n["default"]
    }
    , {}],
    60: [function(e, t, n) {
        "use strict";
        n.__esModule = !0,
        n["default"] = function(e) {
            e.registerHelper("lookup", function(e, t) {
                return e && e[t]
            })
        }
        ,
        t.exports = n["default"]
    }
    , {}],
    61: [function(e, t, n) {
        "use strict";
        n.__esModule = !0;
        var r = e("../utils");
        n["default"] = function(e) {
            e.registerHelper("with", function(e, t) {
                r.isFunction(e) && (e = e.call(this));
                var n = t.fn;
                if (r.isEmpty(e))
                    return t.inverse(this);
                var o = t.data;
                return t.data && t.ids && (o = r.createFrame(t.data),
                o.contextPath = r.appendContextPath(t.data.contextPath, t.ids[0])),
                n(e, {
                    data: o,
                    blockParams: r.blockParams([e], [o && o.contextPath])
                })
            })
        }
        ,
        t.exports = n["default"]
    }
    , {
        "../utils": 66
    }],
    62: [function(e, t, n) {
        "use strict";
        n.__esModule = !0;
        var r = e("./utils")
          , o = {
            methodMap: ["debug", "info", "warn", "error"],
            level: "info",
            lookupLevel: function(e) {
                if ("string" == typeof e) {
                    var t = r.indexOf(o.methodMap, e.toLowerCase());
                    e = t >= 0 ? t : parseInt(e, 10)
                }
                return e
            },
            log: function(e) {
                if (e = o.lookupLevel(e),
                "undefined" != typeof console && o.lookupLevel(o.level) <= e) {
                    var t = o.methodMap[e];
                    console[t] || (t = "log");
                    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; n > i; i++)
                        r[i - 1] = arguments[i];
                    console[t].apply(console, r)
                }
            }
        };
        n["default"] = o,
        t.exports = n["default"]
    }
    , {
        "./utils": 66
    }],
    63: [function(e, t, n) {
        (function(e) {
            "use strict";
            n.__esModule = !0,
            n["default"] = function(t) {
                var n = "undefined" != typeof e ? e : window
                  , r = n.Handlebars;
                t.noConflict = function() {
                    return n.Handlebars === t && (n.Handlebars = r),
                    t
                }
            }
            ,
            t.exports = n["default"]
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    64: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function o(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null  != e)
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t["default"] = e,
            t
        }
        function i(e) {
            var t = e && e[0] || 1
              , n = v.COMPILER_REVISION;
            if (t !== n) {
                if (n > t) {
                    var r = v.REVISION_CHANGES[n]
                      , o = v.REVISION_CHANGES[t];
                    throw new g["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + o + ").")
                }
                throw new g["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
            }
        }
        function a(e, t) {
            function n(n, r, o) {
                o.hash && (r = h.extend({}, r, o.hash),
                o.ids && (o.ids[0] = !0)),
                n = t.VM.resolvePartial.call(this, n, r, o);
                var i = t.VM.invokePartial.call(this, n, r, o);
                if (null  == i && t.compile && (o.partials[o.name] = t.compile(n, e.compilerOptions, t),
                i = o.partials[o.name](r, o)),
                null  != i) {
                    if (o.indent) {
                        for (var a = i.split("\n"), s = 0, l = a.length; l > s && (a[s] || s + 1 !== l); s++)
                            a[s] = o.indent + a[s];
                        i = a.join("\n")
                    }
                    return i
                }
                throw new g["default"]("The partial " + o.name + " could not be compiled when running in runtime-only mode")
            }
            function r(t) {
                function n(t) {
                    return "" + e.main(o, t, o.helpers, o.partials, a, l, s)
                }
                var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                  , a = i.data;
                r._setup(i),
                !i.partial && e.useData && (a = f(t, a));
                var s = void 0
                  , l = e.useBlockParams ? [] : void 0;
                return e.useDepths && (s = i.depths ? t !== i.depths[0] ? [t].concat(i.depths) : i.depths : [t]),
                n = p(e.main, n, o, i.depths || [], a, l),
                n(t, i)
            }
            if (!t)
                throw new g["default"]("No environment passed to template");
            if (!e || !e.main)
                throw new g["default"]("Unknown template object: " + typeof e);
            e.main.decorator = e.main_d,
            t.VM.checkRevision(e.compiler);
            var o = {
                strict: function(e, t) {
                    if (!(t in e))
                        throw new g["default"]('"' + t + '" not defined in ' + e);
                    return e[t]
                },
                lookup: function(e, t) {
                    for (var n = e.length, r = 0; n > r; r++)
                        if (e[r] && null  != e[r][t])
                            return e[r][t]
                },
                lambda: function(e, t) {
                    return "function" == typeof e ? e.call(t) : e
                },
                escapeExpression: h.escapeExpression,
                invokePartial: n,
                fn: function(t) {
                    var n = e[t];
                    return n.decorator = e[t + "_d"],
                    n
                },
                programs: [],
                program: function(e, t, n, r, o) {
                    var i = this.programs[e]
                      , a = this.fn(e);
                    return t || o || r || n ? i = s(this, e, a, t, n, r, o) : i || (i = this.programs[e] = s(this, e, a)),
                    i
                },
                data: function(e, t) {
                    for (; e && t--; )
                        e = e._parent;
                    return e
                },
                merge: function(e, t) {
                    var n = e || t;
                    return e && t && e !== t && (n = h.extend({}, t, e)),
                    n
                },
                noop: t.VM.noop,
                compilerInfo: e.compiler
            };
            return r.isTop = !0,
            r._setup = function(n) {
                n.partial ? (o.helpers = n.helpers,
                o.partials = n.partials,
                o.decorators = n.decorators) : (o.helpers = o.merge(n.helpers, t.helpers),
                e.usePartial && (o.partials = o.merge(n.partials, t.partials)),
                (e.usePartial || e.useDecorators) && (o.decorators = o.merge(n.decorators, t.decorators)))
            }
            ,
            r._child = function(t, n, r, i) {
                if (e.useBlockParams && !r)
                    throw new g["default"]("must pass block params");
                if (e.useDepths && !i)
                    throw new g["default"]("must pass parent depths");
                return s(o, t, e[t], n, 0, r, i)
            }
            ,
            r
        }
        function s(e, t, n, r, o, i, a) {
            function s(t) {
                var o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                  , s = a;
                return a && t !== a[0] && (s = [t].concat(a)),
                n(e, t, e.helpers, e.partials, o.data || r, i && [o.blockParams].concat(i), s)
            }
            return s = p(n, s, e, a, r, i),
            s.program = t,
            s.depth = a ? a.length : 0,
            s.blockParams = o || 0,
            s
        }
        function l(e, t, n) {
            return e ? e.call || n.name || (n.name = e,
            e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name],
            e
        }
        function u(e, t, n) {
            n.partial = !0,
            n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
            var r = void 0;
            if (n.fn && n.fn !== c && (n.data = v.createFrame(n.data),
            r = n.data["partial-block"] = n.fn,
            r.partials && (n.partials = h.extend({}, n.partials, r.partials))),
            void 0 === e && r && (e = r),
            void 0 === e)
                throw new g["default"]("The partial " + n.name + " could not be found");
            return e instanceof Function ? e(t, n) : void 0
        }
        function c() {
            return ""
        }
        function f(e, t) {
            return t && "root" in t || (t = t ? v.createFrame(t) : {},
            t.root = e),
            t
        }
        function p(e, t, n, r, o, i) {
            if (e.decorator) {
                var a = {};
                t = e.decorator(t, a, n, r && r[0], o, i, r),
                h.extend(t, a)
            }
            return t
        }
        n.__esModule = !0,
        n.checkRevision = i,
        n.template = a,
        n.wrapProgram = s,
        n.resolvePartial = l,
        n.invokePartial = u,
        n.noop = c;
        var d = e("./utils")
          , h = o(d)
          , m = e("./exception")
          , g = r(m)
          , v = e("./base")
    }
    , {
        "./base": 50,
        "./exception": 53,
        "./utils": 66
    }],
    65: [function(e, t, n) {
        "use strict";
        function r(e) {
            this.string = e
        }
        n.__esModule = !0,
        r.prototype.toString = r.prototype.toHTML = function() {
            return "" + this.string
        }
        ,
        n["default"] = r,
        t.exports = n["default"]
    }
    , {}],
    66: [function(e, t, n) {
        "use strict";
        function r(e) {
            return f[e]
        }
        function o(e) {
            for (var t = 1; t < arguments.length; t++)
                for (var n in arguments[t])
                    Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
            return e
        }
        function i(e, t) {
            for (var n = 0, r = e.length; r > n; n++)
                if (e[n] === t)
                    return n;
            return -1
        }
        function a(e) {
            if ("string" != typeof e) {
                if (e && e.toHTML)
                    return e.toHTML();
                if (null  == e)
                    return "";
                if (!e)
                    return e + "";
                e = "" + e
            }
            return d.test(e) ? e.replace(p, r) : e
        }
        function s(e) {
            return e || 0 === e ? g(e) && 0 === e.length ? !0 : !1 : !0
        }
        function l(e) {
            var t = o({}, e);
            return t._parent = e,
            t
        }
        function u(e, t) {
            return e.path = t,
            e
        }
        function c(e, t) {
            return (e ? e + "." : "") + t
        }
        n.__esModule = !0,
        n.extend = o,
        n.indexOf = i,
        n.escapeExpression = a,
        n.isEmpty = s,
        n.createFrame = l,
        n.blockParams = u,
        n.appendContextPath = c;
        var f = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        }
          , p = /[&<>"'`=]/g
          , d = /[&<>"'`=]/
          , h = Object.prototype.toString;
        n.toString = h;
        var m = function(e) {
            return "function" == typeof e
        }
        ;
        m(/x/) && (n.isFunction = m = function(e) {
            return "function" == typeof e && "[object Function]" === h.call(e)
        }
        ),
        n.isFunction = m;
        var g = Array.isArray || function(e) {
            return e && "object" == typeof e ? "[object Array]" === h.call(e) : !1
        }
        ;
        n.isArray = g
    }
    , {}],
    67: [function(e, t) {
        t.exports = e("./dist/cjs/handlebars.runtime")["default"]
    }
    , {
        "./dist/cjs/handlebars.runtime": 49
    }],
    68: [function(e, t) {
        var n = e("each")
          , r = e("indexof")
          , o = function(e) {
            var e = e || window.location.href;
            return e.replace(/^[^#]*#?(.*)$/, "$1")
        }
          , i = function() {
            var e = this;
            return this.onChangeCallbacks = [],
            window.addEventListener("hashchange", function(t) {
                e.hashChanged(o(t.newURL))
            }, !1),
            this
        }
        ;
        i.prototype = {
            update: function(e) {
                return e ? (this.onChangeCallbacks.push(e),
                this) : (this.hashChanged(o()),
                void 0)
            },
            unbind: function(e) {
                var t = r(this.onChangeCallbacks, e);
                return -1 !== t && this.onChangeCallbacks.splice(t - 1, 1),
                this
            },
            updateHash: function(e) {
                this.currentHash = e,
                window.location.href = window.location.href.replace(/#.*/, "") + "#" + e
            },
            hashChanged: function(e) {
                return this.onChangeCallbacks.length && n(this.onChangeCallbacks, function(t) {
                    return t(e),
                    !0
                }),
                this
            }
        },
        hashChange = new i,
        t.exports = hashChange
    }
    , {
        each: 70,
        indexof: 69
    }],
    69: [function(e, t) {
        t.exports = function(e, t) {
            if (e.indexOf)
                return e.indexOf(t);
            for (var n = 0; n < e.length; ++n)
                if (e[n] === t)
                    return n;
            return -1
        }
    }
    , {}],
    70: [function(e, t) {
        var n = Object.prototype.hasOwnProperty
          , r = Object.prototype.toString;
        t.exports = function(e, t, o) {
            if ("[object Function]" !== r.call(t))
                throw new TypeError("iterator must be a function");
            var i = e.length;
            if (i === +i)
                for (var a = 0; i > a; a++)
                    t.call(o, e[a], a, e);
            else
                for (var s in e)
                    n.call(e, s) && t.call(o, e[s], s, e)
        }
    }
    , {}],
    71: [function(e, t) {
        t.exports = e("handlebars/runtime")["default"]
    }
    , {
        "handlebars/runtime": 67
    }],
    72: [function(e, t) {
        !function(e, n) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function(e) {
                if (!e.document)
                    throw new Error("jQuery requires a window with a document");
                return n(e)
            }
             : n(e)
        }("undefined" != typeof window ? window : this, function(e, t) {
            function n(e) {
                var t = !!e && "length" in e && e.length
                  , n = it.type(e);
                return "function" === n || it.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }
            function r(e, t, n) {
                if (it.isFunction(t))
                    return it.grep(e, function(e, r) {
                        return !!t.call(e, r, e) !== n
                    });
                if (t.nodeType)
                    return it.grep(e, function(e) {
                        return e === t !== n
                    });
                if ("string" == typeof t) {
                    if (mt.test(t))
                        return it.filter(t, e, n);
                    t = it.filter(t, e)
                }
                return it.grep(e, function(e) {
                    return Q.call(t, e) > -1 !== n
                })
            }
            function o(e, t) {
                for (; (e = e[t]) && 1 !== e.nodeType; )
                    ;
                return e
            }
            function i(e) {
                var t = {};
                return it.each(e.match(Nt) || [], function(e, n) {
                    t[n] = !0
                }),
                t
            }
            function a() {
                J.removeEventListener("DOMContentLoaded", a),
                e.removeEventListener("load", a),
                it.ready()
            }
            function s() {
                this.expando = it.expando + s.uid++
            }
            function l(e, t, n) {
                var r;
                if (void 0 === n && 1 === e.nodeType)
                    if (r = "data-" + t.replace(St, "-$&").toLowerCase(),
                    n = e.getAttribute(r),
                    "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null  : +n + "" === n ? +n : Tt.test(n) ? it.parseJSON(n) : n
                        } catch (o) {}
                        Ct.set(e, t, n)
                    } else
                        n = void 0;
                return n
            }
            function u(e, t, n, r) {
                var o, i = 1, a = 20, s = r ? function() {
                    return r.cur()
                }
                 : function() {
                    return it.css(e, t, "")
                }
                , l = s(), u = n && n[3] || (it.cssNumber[t] ? "" : "px"), c = (it.cssNumber[t] || "px" !== u && +l) && $t.exec(it.css(e, t));
                if (c && c[3] !== u) {
                    u = u || c[3],
                    n = n || [],
                    c = +l || 1;
                    do
                        i = i || ".5",
                        c /= i,
                        it.style(e, t, c + u);
                    while (i !== (i = s() / l) && 1 !== i && --a)
                }
                return n && (c = +c || +l || 0,
                o = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
                r && (r.unit = u,
                r.start = c,
                r.end = o)),
                o
            }
            function c(e, t) {
                var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                return void 0 === t || t && it.nodeName(e, t) ? it.merge([e], n) : n
            }
            function f(e, t) {
                for (var n = 0, r = e.length; r > n; n++)
                    kt.set(e[n], "globalEval", !t || kt.get(t[n], "globalEval"))
            }
            function p(e, t, n, r, o) {
                for (var i, a, s, l, u, p, d = t.createDocumentFragment(), h = [], m = 0, g = e.length; g > m; m++)
                    if (i = e[m],
                    i || 0 === i)
                        if ("object" === it.type(i))
                            it.merge(h, i.nodeType ? [i] : i);
                        else if (Ht.test(i)) {
                            for (a = a || d.appendChild(t.createElement("div")),
                            s = (Ot.exec(i) || ["", ""])[1].toLowerCase(),
                            l = Lt[s] || Lt._default,
                            a.innerHTML = l[1] + it.htmlPrefilter(i) + l[2],
                            p = l[0]; p--; )
                                a = a.lastChild;
                            it.merge(h, a.childNodes),
                            a = d.firstChild,
                            a.textContent = ""
                        } else
                            h.push(t.createTextNode(i));
                for (d.textContent = "",
                m = 0; i = h[m++]; )
                    if (r && it.inArray(i, r) > -1)
                        o && o.push(i);
                    else if (u = it.contains(i.ownerDocument, i),
                    a = c(d.appendChild(i), "script"),
                    u && f(a),
                    n)
                        for (p = 0; i = a[p++]; )
                            qt.test(i.type || "") && n.push(i);
                return d
            }
            function d() {
                return !0
            }
            function h() {
                return !1
            }
            function m() {
                try {
                    return J.activeElement
                } catch (e) {}
            }
            function g(e, t, n, r, o, i) {
                var a, s;
                if ("object" == typeof t) {
                    "string" != typeof n && (r = r || n,
                    n = void 0);
                    for (s in t)
                        g(e, s, n, r, t[s], i);
                    return e
                }
                if (null  == r && null  == o ? (o = n,
                r = n = void 0) : null  == o && ("string" == typeof n ? (o = r,
                r = void 0) : (o = r,
                r = n,
                n = void 0)),
                o === !1)
                    o = h;
                else if (!o)
                    return e;
                return 1 === i && (a = o,
                o = function(e) {
                    return it().off(e),
                    a.apply(this, arguments)
                }
                ,
                o.guid = a.guid || (a.guid = it.guid++)),
                e.each(function() {
                    it.event.add(this, t, o, r, n)
                })
            }
            function v(e, t) {
                return it.nodeName(e, "table") && it.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }
            function y(e) {
                return e.type = (null  !== e.getAttribute("type")) + "/" + e.type,
                e
            }
            function b(e) {
                var t = Wt.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"),
                e
            }
            function w(e, t) {
                var n, r, o, i, a, s, l, u;
                if (1 === t.nodeType) {
                    if (kt.hasData(e) && (i = kt.access(e),
                    a = kt.set(t, i),
                    u = i.events)) {
                        delete a.handle,
                        a.events = {};
                        for (o in u)
                            for (n = 0,
                            r = u[o].length; r > n; n++)
                                it.event.add(t, o, u[o][n])
                    }
                    Ct.hasData(e) && (s = Ct.access(e),
                    l = it.extend({}, s),
                    Ct.set(t, l))
                }
            }
            function N(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && Dt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
            function x(e, t, n, r) {
                t = Z.apply([], t);
                var o, i, a, s, l, u, f = 0, d = e.length, h = d - 1, m = t[0], g = it.isFunction(m);
                if (g || d > 1 && "string" == typeof m && !rt.checkClone && Bt.test(m))
                    return e.each(function(o) {
                        var i = e.eq(o);
                        g && (t[0] = m.call(this, o, i.html())),
                        x(i, t, n, r)
                    });
                if (d && (o = p(t, e[0].ownerDocument, !1, e, r),
                i = o.firstChild,
                1 === o.childNodes.length && (o = i),
                i || r)) {
                    for (a = it.map(c(o, "script"), y),
                    s = a.length; d > f; f++)
                        l = o,
                        f !== h && (l = it.clone(l, !0, !0),
                        s && it.merge(a, c(l, "script"))),
                        n.call(e[f], l, f);
                    if (s)
                        for (u = a[a.length - 1].ownerDocument,
                        it.map(a, b),
                        f = 0; s > f; f++)
                            l = a[f],
                            qt.test(l.type || "") && !kt.access(l, "globalEval") && it.contains(u, l) && (l.src ? it._evalUrl && it._evalUrl(l.src) : it.globalEval(l.textContent.replace(Ut, "")))
                }
                return e
            }
            function M(e, t, n) {
                for (var r, o = t ? it.filter(t, e) : e, i = 0; null  != (r = o[i]); i++)
                    n || 1 !== r.nodeType || it.cleanData(c(r)),
                    r.parentNode && (n && it.contains(r.ownerDocument, r) && f(c(r, "script")),
                    r.parentNode.removeChild(r));
                return e
            }
            function P(e, t) {
                var n = it(t.createElement(e)).appendTo(t.body)
                  , r = it.css(n[0], "display");
                return n.detach(),
                r
            }
            function k(e) {
                var t = J
                  , n = Gt[e];
                return n || (n = P(e, t),
                "none" !== n && n || (Vt = (Vt || it("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
                t = Vt[0].contentDocument,
                t.write(),
                t.close(),
                n = P(e, t),
                Vt.detach()),
                Gt[e] = n),
                n
            }
            function C(e, t, n) {
                var r, o, i, a, s = e.style;
                return n = n || Yt(e),
                a = n ? n.getPropertyValue(t) || n[t] : void 0,
                "" !== a && void 0 !== a || it.contains(e.ownerDocument, e) || (a = it.style(e, t)),
                n && !rt.pixelMarginRight() && Jt.test(a) && Xt.test(t) && (r = s.width,
                o = s.minWidth,
                i = s.maxWidth,
                s.minWidth = s.maxWidth = s.width = a,
                a = n.width,
                s.width = r,
                s.minWidth = o,
                s.maxWidth = i),
                void 0 !== a ? a + "" : a
            }
            function T(e, t) {
                return {
                    get: function() {
                        return e() ? (delete this.get,
                        void 0) : (this.get = t).apply(this, arguments)
                    }
                }
            }
            function S(e) {
                if (e in rn)
                    return e;
                for (var t = e[0].toUpperCase() + e.slice(1), n = nn.length; n--; )
                    if (e = nn[n] + t,
                    e in rn)
                        return e
            }
            function j(e, t, n) {
                var r = $t.exec(t);
                return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
            }
            function $(e, t, n, r, o) {
                for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > i; i += 2)
                    "margin" === n && (a += it.css(e, n + Et[i], !0, o)),
                    r ? ("content" === n && (a -= it.css(e, "padding" + Et[i], !0, o)),
                    "margin" !== n && (a -= it.css(e, "border" + Et[i] + "Width", !0, o))) : (a += it.css(e, "padding" + Et[i], !0, o),
                    "padding" !== n && (a += it.css(e, "border" + Et[i] + "Width", !0, o)));
                return a
            }
            function E(t, n, r) {
                var o = !0
                  , i = "width" === n ? t.offsetWidth : t.offsetHeight
                  , a = Yt(t)
                  , s = "border-box" === it.css(t, "boxSizing", !1, a);
                if (J.msFullscreenElement && e.top !== e && t.getClientRects().length && (i = Math.round(100 * t.getBoundingClientRect()[n])),
                0 >= i || null  == i) {
                    if (i = C(t, n, a),
                    (0 > i || null  == i) && (i = t.style[n]),
                    Jt.test(i))
                        return i;
                    o = s && (rt.boxSizingReliable() || i === t.style[n]),
                    i = parseFloat(i) || 0
                }
                return i + $(t, n, r || (s ? "border" : "content"), o, a) + "px"
            }
            function A(e, t) {
                for (var n, r, o, i = [], a = 0, s = e.length; s > a; a++)
                    r = e[a],
                    r.style && (i[a] = kt.get(r, "olddisplay"),
                    n = r.style.display,
                    t ? (i[a] || "none" !== n || (r.style.display = ""),
                    "" === r.style.display && At(r) && (i[a] = kt.access(r, "olddisplay", k(r.nodeName)))) : (o = At(r),
                    "none" === n && o || kt.set(r, "olddisplay", o ? n : it.css(r, "display"))));
                for (a = 0; s > a; a++)
                    r = e[a],
                    r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? i[a] || "" : "none"));
                return e
            }
            function D(e, t, n, r, o) {
                return new D.prototype.init(e,t,n,r,o)
            }
            function O() {
                return e.setTimeout(function() {
                    on = void 0
                }),
                on = it.now()
            }
            function q(e, t) {
                var n, r = 0, o = {
                    height: e
                };
                for (t = t ? 1 : 0; 4 > r; r += 2 - t)
                    n = Et[r],
                    o["margin" + n] = o["padding" + n] = e;
                return t && (o.opacity = o.width = e),
                o
            }
            function L(e, t, n) {
                for (var r, o = (_.tweeners[t] || []).concat(_.tweeners["*"]), i = 0, a = o.length; a > i; i++)
                    if (r = o[i].call(n, t, e))
                        return r
            }
            function H(e, t, n) {
                var r, o, i, a, s, l, u, c, f = this, p = {}, d = e.style, h = e.nodeType && At(e), m = kt.get(e, "fxshow");
                n.queue || (s = it._queueHooks(e, "fx"),
                null  == s.unqueued && (s.unqueued = 0,
                l = s.empty.fire,
                s.empty.fire = function() {
                    s.unqueued || l()
                }
                ),
                s.unqueued++,
                f.always(function() {
                    f.always(function() {
                        s.unqueued--,
                        it.queue(e, "fx").length || s.empty.fire()
                    })
                })),
                1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY],
                u = it.css(e, "display"),
                c = "none" === u ? kt.get(e, "olddisplay") || k(e.nodeName) : u,
                "inline" === c && "none" === it.css(e, "float") && (d.display = "inline-block")),
                n.overflow && (d.overflow = "hidden",
                f.always(function() {
                    d.overflow = n.overflow[0],
                    d.overflowX = n.overflow[1],
                    d.overflowY = n.overflow[2]
                }));
                for (r in t)
                    if (o = t[r],
                    sn.exec(o)) {
                        if (delete t[r],
                        i = i || "toggle" === o,
                        o === (h ? "hide" : "show")) {
                            if ("show" !== o || !m || void 0 === m[r])
                                continue;h = !0
                        }
                        p[r] = m && m[r] || it.style(e, r)
                    } else
                        u = void 0;
                if (it.isEmptyObject(p))
                    "inline" === ("none" === u ? k(e.nodeName) : u) && (d.display = u);
                else {
                    m ? "hidden" in m && (h = m.hidden) : m = kt.access(e, "fxshow", {}),
                    i && (m.hidden = !h),
                    h ? it(e).show() : f.done(function() {
                        it(e).hide()
                    }),
                    f.done(function() {
                        var t;
                        kt.remove(e, "fxshow");
                        for (t in p)
                            it.style(e, t, p[t])
                    });
                    for (r in p)
                        a = L(h ? m[r] : 0, r, f),
                        r in m || (m[r] = a.start,
                        h && (a.end = a.start,
                        a.start = "width" === r || "height" === r ? 1 : 0))
                }
            }
            function I(e, t) {
                var n, r, o, i, a;
                for (n in e)
                    if (r = it.camelCase(n),
                    o = t[r],
                    i = e[n],
                    it.isArray(i) && (o = i[1],
                    i = e[n] = i[0]),
                    n !== r && (e[r] = i,
                    delete e[n]),
                    a = it.cssHooks[r],
                    a && "expand" in a) {
                        i = a.expand(i),
                        delete e[r];
                        for (n in i)
                            n in e || (e[n] = i[n],
                            t[n] = o)
                    } else
                        t[r] = o
            }
            function _(e, t, n) {
                var r, o, i = 0, a = _.prefilters.length, s = it.Deferred().always(function() {
                    delete l.elem
                }), l = function() {
                    if (o)
                        return !1;
                    for (var t = on || O(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, i = 1 - r, a = 0, l = u.tweens.length; l > a; a++)
                        u.tweens[a].run(i);
                    return s.notifyWith(e, [u, i, n]),
                    1 > i && l ? n : (s.resolveWith(e, [u]),
                    !1)
                }
                , u = s.promise({
                    elem: e,
                    props: it.extend({}, t),
                    opts: it.extend(!0, {
                        specialEasing: {},
                        easing: it.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: on || O(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var r = it.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(r),
                        r
                    },
                    stop: function(t) {
                        var n = 0
                          , r = t ? u.tweens.length : 0;
                        if (o)
                            return this;
                        for (o = !0; r > n; n++)
                            u.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [u, 1, 0]),
                        s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]),
                        this
                    }
                }), c = u.props;
                for (I(c, u.opts.specialEasing); a > i; i++)
                    if (r = _.prefilters[i].call(u, e, c, u.opts))
                        return it.isFunction(r.stop) && (it._queueHooks(u.elem, u.opts.queue).stop = it.proxy(r.stop, r)),
                        r;
                return it.map(c, L, u),
                it.isFunction(u.opts.start) && u.opts.start.call(e, u),
                it.fx.timer(it.extend(l, {
                    elem: e,
                    anim: u,
                    queue: u.opts.queue
                })),
                u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            }
            function F(e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }
            function R(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t,
                    t = "*");
                    var r, o = 0, i = t.toLowerCase().match(Nt) || [];
                    if (it.isFunction(n))
                        for (; r = i[o++]; )
                            "+" === r[0] ? (r = r.slice(1) || "*",
                            (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }
            function z(e, t, n, r) {
                function o(s) {
                    var l;
                    return i[s] = !0,
                    it.each(e[s] || [], function(e, s) {
                        var u = s(t, n, r);
                        return "string" != typeof u || a || i[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u),
                        o(u),
                        !1)
                    }),
                    l
                }
                var i = {}
                  , a = e === Cn;
                return o(t.dataTypes[0]) || !i["*"] && o("*")
            }
            function B(e, t) {
                var n, r, o = it.ajaxSettings.flatOptions || {};
                for (n in t)
                    void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
                return r && it.extend(!0, e, r),
                e
            }
            function W(e, t, n) {
                for (var r, o, i, a, s = e.contents, l = e.dataTypes; "*" === l[0]; )
                    l.shift(),
                    void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                    for (o in s)
                        if (s[o] && s[o].test(r)) {
                            l.unshift(o);
                            break
                        }
                if (l[0] in n)
                    i = l[0];
                else {
                    for (o in n) {
                        if (!l[0] || e.converters[o + " " + l[0]]) {
                            i = o;
                            break
                        }
                        a || (a = o)
                    }
                    i = i || a
                }
                return i ? (i !== l[0] && l.unshift(i),
                n[i]) : void 0
            }
            function U(e, t, n, r) {
                var o, i, a, s, l, u = {}, c = e.dataTypes.slice();
                if (c[1])
                    for (a in e.converters)
                        u[a.toLowerCase()] = e.converters[a];
                for (i = c.shift(); i; )
                    if (e.responseFields[i] && (n[e.responseFields[i]] = t),
                    !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                    l = i,
                    i = c.shift())
                        if ("*" === i)
                            i = l;
                        else if ("*" !== l && l !== i) {
                            if (a = u[l + " " + i] || u["* " + i],
                            !a)
                                for (o in u)
                                    if (s = o.split(" "),
                                    s[1] === i && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                        a === !0 ? a = u[o] : u[o] !== !0 && (i = s[0],
                                        c.unshift(s[1]));
                                        break
                                    }
                            if (a !== !0)
                                if (a && e.throws)
                                    t = a(t);
                                else
                                    try {
                                        t = a(t)
                                    } catch (f) {
                                        return {
                                            state: "parsererror",
                                            error: a ? f : "No conversion from " + l + " to " + i
                                        }
                                    }
                        }
                return {
                    state: "success",
                    data: t
                }
            }
            function V(e, t, n, r) {
                var o;
                if (it.isArray(t))
                    it.each(t, function(t, o) {
                        n || $n.test(e) ? r(e, o) : V(e + "[" + ("object" == typeof o && null  != o ? t : "") + "]", o, n, r)
                    });
                else if (n || "object" !== it.type(t))
                    r(e, t);
                else
                    for (o in t)
                        V(e + "[" + o + "]", t[o], n, r)
            }
            function G(e) {
                return it.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
            }
            var X = []
              , J = e.document
              , Y = X.slice
              , Z = X.concat
              , K = X.push
              , Q = X.indexOf
              , et = {}
              , tt = et.toString
              , nt = et.hasOwnProperty
              , rt = {}
              , ot = "2.2.1"
              , it = function(e, t) {
                return new it.fn.init(e,t)
            }
              , at = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
              , st = /^-ms-/
              , lt = /-([\da-z])/gi
              , ut = function(e, t) {
                return t.toUpperCase()
            }
            ;
            it.fn = it.prototype = {
                jquery: ot,
                constructor: it,
                selector: "",
                length: 0,
                toArray: function() {
                    return Y.call(this)
                },
                get: function(e) {
                    return null  != e ? 0 > e ? this[e + this.length] : this[e] : Y.call(this)
                },
                pushStack: function(e) {
                    var t = it.merge(this.constructor(), e);
                    return t.prevObject = this,
                    t.context = this.context,
                    t
                },
                each: function(e) {
                    return it.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(it.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(Y.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length
                      , n = +e + (0 > e ? t : 0);
                    return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: K,
                sort: X.sort,
                splice: X.splice
            },
            it.extend = it.fn.extend = function() {
                var e, t, n, r, o, i, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
                for ("boolean" == typeof a && (u = a,
                a = arguments[s] || {},
                s++),
                "object" == typeof a || it.isFunction(a) || (a = {}),
                s === l && (a = this,
                s--); l > s; s++)
                    if (null  != (e = arguments[s]))
                        for (t in e)
                            n = a[t],
                            r = e[t],
                            a !== r && (u && r && (it.isPlainObject(r) || (o = it.isArray(r))) ? (o ? (o = !1,
                            i = n && it.isArray(n) ? n : []) : i = n && it.isPlainObject(n) ? n : {},
                            a[t] = it.extend(u, i, r)) : void 0 !== r && (a[t] = r));
                return a
            }
            ,
            it.extend({
                expando: "jQuery" + (ot + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === it.type(e)
                },
                isArray: Array.isArray,
                isWindow: function(e) {
                    return null  != e && e === e.window
                },
                isNumeric: function(e) {
                    var t = e && e.toString();
                    return !it.isArray(e) && t - parseFloat(t) + 1 >= 0
                },
                isPlainObject: function(e) {
                    return "object" !== it.type(e) || e.nodeType || it.isWindow(e) ? !1 : e.constructor && !nt.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e)
                        return !1;
                    return !0
                },
                type: function(e) {
                    return null  == e ? e + "" : "object" == typeof e || "function" == typeof e ? et[tt.call(e)] || "object" : typeof e
                },
                globalEval: function(e) {
                    var t, n = eval;
                    e = it.trim(e),
                    e && (1 === e.indexOf("use strict") ? (t = J.createElement("script"),
                    t.text = e,
                    J.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                },
                camelCase: function(e) {
                    return e.replace(st, "ms-").replace(lt, ut)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t) {
                    var r, o = 0;
                    if (n(e))
                        for (r = e.length; r > o && t.call(e[o], o, e[o]) !== !1; o++)
                            ;
                    else
                        for (o in e)
                            if (t.call(e[o], o, e[o]) === !1)
                                break;
                    return e
                },
                trim: function(e) {
                    return null  == e ? "" : (e + "").replace(at, "")
                },
                makeArray: function(e, t) {
                    var r = t || [];
                    return null  != e && (n(Object(e)) ? it.merge(r, "string" == typeof e ? [e] : e) : K.call(r, e)),
                    r
                },
                inArray: function(e, t, n) {
                    return null  == t ? -1 : Q.call(t, e, n)
                },
                merge: function(e, t) {
                    for (var n = +t.length, r = 0, o = e.length; n > r; r++)
                        e[o++] = t[r];
                    return e.length = o,
                    e
                },
                grep: function(e, t, n) {
                    for (var r, o = [], i = 0, a = e.length, s = !n; a > i; i++)
                        r = !t(e[i], i),
                        r !== s && o.push(e[i]);
                    return o
                },
                map: function(e, t, r) {
                    var o, i, a = 0, s = [];
                    if (n(e))
                        for (o = e.length; o > a; a++)
                            i = t(e[a], a, r),
                            null  != i && s.push(i);
                    else
                        for (a in e)
                            i = t(e[a], a, r),
                            null  != i && s.push(i);
                    return Z.apply([], s)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, r, o;
                    return "string" == typeof t && (n = e[t],
                    t = e,
                    e = n),
                    it.isFunction(e) ? (r = Y.call(arguments, 2),
                    o = function() {
                        return e.apply(t || this, r.concat(Y.call(arguments)))
                    }
                    ,
                    o.guid = e.guid = e.guid || it.guid++,
                    o) : void 0
                },
                now: Date.now,
                support: rt
            }),
            "function" == typeof Symbol && (it.fn[Symbol.iterator] = X[Symbol.iterator]),
            it.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                et["[object " + t + "]"] = t.toLowerCase()
            });
            var ct = function(e) {
                function t(e, t, n, r) {
                    var o, i, a, s, l, u, f, d, h = t && t.ownerDocument, m = t ? t.nodeType : 9;
                    if (n = n || [],
                    "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m)
                        return n;
                    if (!r && ((t ? t.ownerDocument || t : F) !== A && E(t),
                    t = t || A,
                    O)) {
                        if (11 !== m && (u = vt.exec(e)))
                            if (o = u[1]) {
                                if (9 === m) {
                                    if (!(a = t.getElementById(o)))
                                        return n;
                                    if (a.id === o)
                                        return n.push(a),
                                        n
                                } else if (h && (a = h.getElementById(o)) && I(t, a) && a.id === o)
                                    return n.push(a),
                                    n
                            } else {
                                if (u[2])
                                    return K.apply(n, t.getElementsByTagName(e)),
                                    n;
                                if ((o = u[3]) && N.getElementsByClassName && t.getElementsByClassName)
                                    return K.apply(n, t.getElementsByClassName(o)),
                                    n
                            }
                        if (!(!N.qsa || U[e + " "] || q && q.test(e))) {
                            if (1 !== m)
                                h = t,
                                d = e;
                            else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((s = t.getAttribute("id")) ? s = s.replace(bt, "\\$&") : t.setAttribute("id", s = _),
                                f = k(e),
                                i = f.length,
                                l = pt.test(s) ? "#" + s : "[id='" + s + "']"; i--; )
                                    f[i] = l + " " + p(f[i]);
                                d = f.join(","),
                                h = yt.test(e) && c(t.parentNode) || t
                            }
                            if (d)
                                try {
                                    return K.apply(n, h.querySelectorAll(d)),
                                    n
                                } catch (g) {} finally {
                                    s === _ && t.removeAttribute("id")
                                }
                        }
                    }
                    return T(e.replace(st, "$1"), t, n, r)
                }
                function n() {
                    function e(n, r) {
                        return t.push(n + " ") > x.cacheLength && delete e[t.shift()],
                        e[n + " "] = r
                    }
                    var t = [];
                    return e
                }
                function r(e) {
                    return e[_] = !0,
                    e
                }
                function o(e) {
                    var t = A.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null 
                    }
                }
                function i(e, t) {
                    for (var n = e.split("|"), r = n.length; r--; )
                        x.attrHandle[n[r]] = t
                }
                function a(e, t) {
                    var n = t && e
                      , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
                    if (r)
                        return r;
                    if (n)
                        for (; n = n.nextSibling; )
                            if (n === t)
                                return -1;
                    return e ? 1 : -1
                }
                function s(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }
                function l(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }
                function u(e) {
                    return r(function(t) {
                        return t = +t,
                        r(function(n, r) {
                            for (var o, i = e([], n.length, t), a = i.length; a--; )
                                n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                        })
                    })
                }
                function c(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }
                function f() {}
                function p(e) {
                    for (var t = 0, n = e.length, r = ""; n > t; t++)
                        r += e[t].value;
                    return r
                }
                function d(e, t, n) {
                    var r = t.dir
                      , o = n && "parentNode" === r
                      , i = z++;
                    return t.first ? function(t, n, i) {
                        for (; t = t[r]; )
                            if (1 === t.nodeType || o)
                                return e(t, n, i)
                    }
                     : function(t, n, a) {
                        var s, l, u, c = [R, i];
                        if (a) {
                            for (; t = t[r]; )
                                if ((1 === t.nodeType || o) && e(t, n, a))
                                    return !0
                        } else
                            for (; t = t[r]; )
                                if (1 === t.nodeType || o) {
                                    if (u = t[_] || (t[_] = {}),
                                    l = u[t.uniqueID] || (u[t.uniqueID] = {}),
                                    (s = l[r]) && s[0] === R && s[1] === i)
                                        return c[2] = s[2];
                                    if (l[r] = c,
                                    c[2] = e(t, n, a))
                                        return !0
                                }
                    }
                }
                function h(e) {
                    return e.length > 1 ? function(t, n, r) {
                        for (var o = e.length; o--; )
                            if (!e[o](t, n, r))
                                return !1;
                        return !0
                    }
                     : e[0]
                }
                function m(e, n, r) {
                    for (var o = 0, i = n.length; i > o; o++)
                        t(e, n[o], r);
                    return r
                }
                function g(e, t, n, r, o) {
                    for (var i, a = [], s = 0, l = e.length, u = null  != t; l > s; s++)
                        (i = e[s]) && (!n || n(i, r, o)) && (a.push(i),
                        u && t.push(s));
                    return a
                }
                function v(e, t, n, o, i, a) {
                    return o && !o[_] && (o = v(o)),
                    i && !i[_] && (i = v(i, a)),
                    r(function(r, a, s, l) {
                        var u, c, f, p = [], d = [], h = a.length, v = r || m(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : g(v, p, e, s, l), b = n ? i || (r ? e : h || o) ? [] : a : y;
                        if (n && n(y, b, s, l),
                        o)
                            for (u = g(b, d),
                            o(u, [], s, l),
                            c = u.length; c--; )
                                (f = u[c]) && (b[d[c]] = !(y[d[c]] = f));
                        if (r) {
                            if (i || e) {
                                if (i) {
                                    for (u = [],
                                    c = b.length; c--; )
                                        (f = b[c]) && u.push(y[c] = f);
                                    i(null , b = [], u, l)
                                }
                                for (c = b.length; c--; )
                                    (f = b[c]) && (u = i ? et(r, f) : p[c]) > -1 && (r[u] = !(a[u] = f))
                            }
                        } else
                            b = g(b === a ? b.splice(h, b.length) : b),
                            i ? i(null , a, b, l) : K.apply(a, b)
                    })
                }
                function y(e) {
                    for (var t, n, r, o = e.length, i = x.relative[e[0].type], a = i || x.relative[" "], s = i ? 1 : 0, l = d(function(e) {
                        return e === t
                    }, a, !0), u = d(function(e) {
                        return et(t, e) > -1
                    }, a, !0), c = [function(e, n, r) {
                        var o = !i && (r || n !== S) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r));
                        return t = null ,
                        o
                    }
                    ]; o > s; s++)
                        if (n = x.relative[e[s].type])
                            c = [d(h(c), n)];
                        else {
                            if (n = x.filter[e[s].type].apply(null , e[s].matches),
                            n[_]) {
                                for (r = ++s; o > r && !x.relative[e[r].type]; r++)
                                    ;
                                return v(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1).concat({
                                    value: " " === e[s - 2].type ? "*" : ""
                                })).replace(st, "$1"), n, r > s && y(e.slice(s, r)), o > r && y(e = e.slice(r)), o > r && p(e))
                            }
                            c.push(n)
                        }
                    return h(c)
                }
                function b(e, n) {
                    var o = n.length > 0
                      , i = e.length > 0
                      , a = function(r, a, s, l, u) {
                        var c, f, p, d = 0, h = "0", m = r && [], v = [], y = S, b = r || i && x.find.TAG("*", u), w = R += null  == y ? 1 : Math.random() || .1, N = b.length;
                        for (u && (S = a === A || a || u); h !== N && null  != (c = b[h]); h++) {
                            if (i && c) {
                                for (f = 0,
                                a || c.ownerDocument === A || (E(c),
                                s = !O); p = e[f++]; )
                                    if (p(c, a || A, s)) {
                                        l.push(c);
                                        break
                                    }
                                u && (R = w)
                            }
                            o && ((c = !p && c) && d--,
                            r && m.push(c))
                        }
                        if (d += h,
                        o && h !== d) {
                            for (f = 0; p = n[f++]; )
                                p(m, v, a, s);
                            if (r) {
                                if (d > 0)
                                    for (; h--; )
                                        m[h] || v[h] || (v[h] = Y.call(l));
                                v = g(v)
                            }
                            K.apply(l, v),
                            u && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(l)
                        }
                        return u && (R = w,
                        S = y),
                        m
                    }
                    ;
                    return o ? r(a) : a
                }
                var w, N, x, M, P, k, C, T, S, j, $, E, A, D, O, q, L, H, I, _ = "sizzle" + 1 * new Date, F = e.document, R = 0, z = 0, B = n(), W = n(), U = n(), V = function(e, t) {
                    return e === t && ($ = !0),
                    0
                }
                , G = 1 << 31, X = {}.hasOwnProperty, J = [], Y = J.pop, Z = J.push, K = J.push, Q = J.slice, et = function(e, t) {
                    for (var n = 0, r = e.length; r > n; n++)
                        if (e[n] === t)
                            return n;
                    return -1
                }
                , tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", nt = "[\\x20\\t\\r\\n\\f]", rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + rt + "))|)" + nt + "*\\]", it = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)", at = new RegExp(nt + "+","g"), st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$","g"), lt = new RegExp("^" + nt + "*," + nt + "*"), ut = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"), ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]","g"), ft = new RegExp(it), pt = new RegExp("^" + rt + "$"), dt = {
                    ID: new RegExp("^#(" + rt + ")"),
                    CLASS: new RegExp("^\\.(" + rt + ")"),
                    TAG: new RegExp("^(" + rt + "|[*])"),
                    ATTR: new RegExp("^" + ot),
                    PSEUDO: new RegExp("^" + it),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)","i"),
                    bool: new RegExp("^(?:" + tt + ")$","i"),
                    needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)","i")
                }, ht = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, gt = /^[^{]+\{\s*\[native \w/, vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, yt = /[+~]/, bt = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)","ig"), Nt = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                }
                , xt = function() {
                    E()
                }
                ;
                try {
                    K.apply(J = Q.call(F.childNodes), F.childNodes),
                    J[F.childNodes.length].nodeType
                } catch (Mt) {
                    K = {
                        apply: J.length ? function(e, t) {
                            Z.apply(e, Q.call(t))
                        }
                         : function(e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++]; )
                                ;
                            e.length = n - 1
                        }
                    }
                }
                N = t.support = {},
                P = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }
                ,
                E = t.setDocument = function(e) {
                    var t, n, r = e ? e.ownerDocument || e : F;
                    return r !== A && 9 === r.nodeType && r.documentElement ? (A = r,
                    D = A.documentElement,
                    O = !P(A),
                    (n = A.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xt, !1) : n.attachEvent && n.attachEvent("onunload", xt)),
                    N.attributes = o(function(e) {
                        return e.className = "i",
                        !e.getAttribute("className")
                    }),
                    N.getElementsByTagName = o(function(e) {
                        return e.appendChild(A.createComment("")),
                        !e.getElementsByTagName("*").length
                    }),
                    N.getElementsByClassName = gt.test(A.getElementsByClassName),
                    N.getById = o(function(e) {
                        return D.appendChild(e).id = _,
                        !A.getElementsByName || !A.getElementsByName(_).length
                    }),
                    N.getById ? (x.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && O) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }
                    ,
                    x.filter.ID = function(e) {
                        var t = e.replace(wt, Nt);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }
                    ) : (delete x.find.ID,
                    x.filter.ID = function(e) {
                        var t = e.replace(wt, Nt);
                        return function(e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }
                    ),
                    x.find.TAG = N.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : N.qsa ? t.querySelectorAll(e) : void 0
                    }
                     : function(e, t) {
                        var n, r = [], o = 0, i = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = i[o++]; )
                                1 === n.nodeType && r.push(n);
                            return r
                        }
                        return i
                    }
                    ,
                    x.find.CLASS = N.getElementsByClassName && function(e, t) {
                        return "undefined" != typeof t.getElementsByClassName && O ? t.getElementsByClassName(e) : void 0
                    }
                    ,
                    L = [],
                    q = [],
                    (N.qsa = gt.test(A.querySelectorAll)) && (o(function(e) {
                        D.appendChild(e).innerHTML = "<a id='" + _ + "'></a><select id='" + _ + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                        e.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + nt + "*(?:''|\"\")"),
                        e.querySelectorAll("[selected]").length || q.push("\\[" + nt + "*(?:value|" + tt + ")"),
                        e.querySelectorAll("[id~=" + _ + "-]").length || q.push("~="),
                        e.querySelectorAll(":checked").length || q.push(":checked"),
                        e.querySelectorAll("a#" + _ + "+*").length || q.push(".#.+[+~]")
                    }),
                    o(function(e) {
                        var t = A.createElement("input");
                        t.setAttribute("type", "hidden"),
                        e.appendChild(t).setAttribute("name", "D"),
                        e.querySelectorAll("[name=d]").length && q.push("name" + nt + "*[*^$|!~]?="),
                        e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"),
                        e.querySelectorAll("*,:x"),
                        q.push(",.*:")
                    })),
                    (N.matchesSelector = gt.test(H = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && o(function(e) {
                        N.disconnectedMatch = H.call(e, "div"),
                        H.call(e, "[s!='']:x"),
                        L.push("!=", it)
                    }),
                    q = q.length && new RegExp(q.join("|")),
                    L = L.length && new RegExp(L.join("|")),
                    t = gt.test(D.compareDocumentPosition),
                    I = t || gt.test(D.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e
                          , r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    }
                     : function(e, t) {
                        if (t)
                            for (; t = t.parentNode; )
                                if (t === e)
                                    return !0;
                        return !1
                    }
                    ,
                    V = t ? function(e, t) {
                        if (e === t)
                            return $ = !0,
                            0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                        1 & n || !N.sortDetached && t.compareDocumentPosition(e) === n ? e === A || e.ownerDocument === F && I(F, e) ? -1 : t === A || t.ownerDocument === F && I(F, t) ? 1 : j ? et(j, e) - et(j, t) : 0 : 4 & n ? -1 : 1)
                    }
                     : function(e, t) {
                        if (e === t)
                            return $ = !0,
                            0;
                        var n, r = 0, o = e.parentNode, i = t.parentNode, s = [e], l = [t];
                        if (!o || !i)
                            return e === A ? -1 : t === A ? 1 : o ? -1 : i ? 1 : j ? et(j, e) - et(j, t) : 0;
                        if (o === i)
                            return a(e, t);
                        for (n = e; n = n.parentNode; )
                            s.unshift(n);
                        for (n = t; n = n.parentNode; )
                            l.unshift(n);
                        for (; s[r] === l[r]; )
                            r++;
                        return r ? a(s[r], l[r]) : s[r] === F ? -1 : l[r] === F ? 1 : 0
                    }
                    ,
                    A) : A
                }
                ,
                t.matches = function(e, n) {
                    return t(e, null , null , n)
                }
                ,
                t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== A && E(e),
                    n = n.replace(ct, "='$1']"),
                    !(!N.matchesSelector || !O || U[n + " "] || L && L.test(n) || q && q.test(n)))
                        try {
                            var r = H.call(e, n);
                            if (r || N.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                                return r
                        } catch (o) {}
                    return t(n, A, null , [e]).length > 0
                }
                ,
                t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== A && E(e),
                    I(e, t)
                }
                ,
                t.attr = function(e, t) {
                    (e.ownerDocument || e) !== A && E(e);
                    var n = x.attrHandle[t.toLowerCase()]
                      , r = n && X.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
                    return void 0 !== r ? r : N.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null 
                }
                ,
                t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }
                ,
                t.uniqueSort = function(e) {
                    var t, n = [], r = 0, o = 0;
                    if ($ = !N.detectDuplicates,
                    j = !N.sortStable && e.slice(0),
                    e.sort(V),
                    $) {
                        for (; t = e[o++]; )
                            t === e[o] && (r = n.push(o));
                        for (; r--; )
                            e.splice(n[r], 1)
                    }
                    return j = null ,
                    e
                }
                ,
                M = t.getText = function(e) {
                    var t, n = "", r = 0, o = e.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof e.textContent)
                                return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)
                                n += M(e)
                        } else if (3 === o || 4 === o)
                            return e.nodeValue
                    } else
                        for (; t = e[r++]; )
                            n += M(t);
                    return n
                }
                ,
                x = t.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: dt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(wt, Nt),
                            e[3] = (e[3] || e[4] || e[5] || "").replace(wt, Nt),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                            e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                            e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                            e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                            e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return dt.CHILD.test(e[0]) ? null  : (e[3] ? e[2] = e[4] || e[5] || "" : n && ft.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                            e[2] = n.slice(0, t)),
                            e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(wt, Nt).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            }
                             : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = B[e + " "];
                            return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && B(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, r) {
                            return function(o) {
                                var i = t.attr(o, e);
                                return null  == i ? "!=" === n : n ? (i += "",
                                "=" === n ? i === r : "!=" === n ? i !== r : "^=" === n ? r && 0 === i.indexOf(r) : "*=" === n ? r && i.indexOf(r) > -1 : "$=" === n ? r && i.slice(-r.length) === r : "~=" === n ? (" " + i.replace(at, " ") + " ").indexOf(r) > -1 : "|=" === n ? i === r || i.slice(0, r.length + 1) === r + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, r, o) {
                            var i = "nth" !== e.slice(0, 3)
                              , a = "last" !== e.slice(-4)
                              , s = "of-type" === t;
                            return 1 === r && 0 === o ? function(e) {
                                return !!e.parentNode
                            }
                             : function(t, n, l) {
                                var u, c, f, p, d, h, m = i !== a ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s, b = !1;
                                if (g) {
                                    if (i) {
                                        for (; m; ) {
                                            for (p = t; p = p[m]; )
                                                if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)
                                                    return !1;
                                            h = m = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? g.firstChild : g.lastChild],
                                    a && y) {
                                        for (p = g,
                                        f = p[_] || (p[_] = {}),
                                        c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                        u = c[e] || [],
                                        d = u[0] === R && u[1],
                                        b = d && u[2],
                                        p = d && g.childNodes[d]; p = ++d && p && p[m] || (b = d = 0) || h.pop(); )
                                            if (1 === p.nodeType && ++b && p === t) {
                                                c[e] = [R, d, b];
                                                break
                                            }
                                    } else if (y && (p = t,
                                    f = p[_] || (p[_] = {}),
                                    c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                    u = c[e] || [],
                                    d = u[0] === R && u[1],
                                    b = d),
                                    b === !1)
                                        for (; (p = ++d && p && p[m] || (b = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && (f = p[_] || (p[_] = {}),
                                        c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                        c[e] = [R, b]),
                                        p !== t)); )
                                            ;
                                    return b -= o,
                                    b === r || b % r === 0 && b / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var o, i = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return i[_] ? i(n) : i.length > 1 ? (o = [e, e, "", n],
                            x.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                                for (var r, o = i(e, n), a = o.length; a--; )
                                    r = et(e, o[a]),
                                    e[r] = !(t[r] = o[a])
                            }) : function(e) {
                                return i(e, 0, o)
                            }
                            ) : i
                        }
                    },
                    pseudos: {
                        not: r(function(e) {
                            var t = []
                              , n = []
                              , o = C(e.replace(st, "$1"));
                            return o[_] ? r(function(e, t, n, r) {
                                for (var i, a = o(e, null , r, []), s = e.length; s--; )
                                    (i = a[s]) && (e[s] = !(t[s] = i))
                            }) : function(e, r, i) {
                                return t[0] = e,
                                o(t, null , i, n),
                                t[0] = null ,
                                !n.pop()
                            }
                        }),
                        has: r(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: r(function(e) {
                            return e = e.replace(wt, Nt),
                            function(t) {
                                return (t.textContent || t.innerText || M(t)).indexOf(e) > -1
                            }
                        }),
                        lang: r(function(e) {
                            return pt.test(e || "") || t.error("unsupported lang: " + e),
                            e = e.replace(wt, Nt).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                        return n = n.toLowerCase(),
                                        n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);return !1
                            }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === D
                        },
                        focus: function(e) {
                            return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex,
                            e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6)
                                    return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !x.pseudos.empty(e)
                        },
                        header: function(e) {
                            return mt.test(e.nodeName)
                        },
                        input: function(e) {
                            return ht.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null  == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(e, t) {
                            return [t - 1]
                        }),
                        eq: u(function(e, t, n) {
                            return [0 > n ? n + t : n]
                        }),
                        even: u(function(e, t) {
                            for (var n = 0; t > n; n += 2)
                                e.push(n);
                            return e
                        }),
                        odd: u(function(e, t) {
                            for (var n = 1; t > n; n += 2)
                                e.push(n);
                            return e
                        }),
                        lt: u(function(e, t, n) {
                            for (var r = 0 > n ? n + t : n; --r >= 0; )
                                e.push(r);
                            return e
                        }),
                        gt: u(function(e, t, n) {
                            for (var r = 0 > n ? n + t : n; ++r < t; )
                                e.push(r);
                            return e
                        })
                    }
                },
                x.pseudos.nth = x.pseudos.eq;
                for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    x.pseudos[w] = s(w);
                for (w in {
                    submit: !0,
                    reset: !0
                })
                    x.pseudos[w] = l(w);
                return f.prototype = x.filters = x.pseudos,
                x.setFilters = new f,
                k = t.tokenize = function(e, n) {
                    var r, o, i, a, s, l, u, c = W[e + " "];
                    if (c)
                        return n ? 0 : c.slice(0);
                    for (s = e,
                    l = [],
                    u = x.preFilter; s; ) {
                        (!r || (o = lt.exec(s))) && (o && (s = s.slice(o[0].length) || s),
                        l.push(i = [])),
                        r = !1,
                        (o = ut.exec(s)) && (r = o.shift(),
                        i.push({
                            value: r,
                            type: o[0].replace(st, " ")
                        }),
                        s = s.slice(r.length));
                        for (a in x.filter)
                            !(o = dt[a].exec(s)) || u[a] && !(o = u[a](o)) || (r = o.shift(),
                            i.push({
                                value: r,
                                type: a,
                                matches: o
                            }),
                            s = s.slice(r.length));
                        if (!r)
                            break
                    }
                    return n ? s.length : s ? t.error(e) : W(e, l).slice(0)
                }
                ,
                C = t.compile = function(e, t) {
                    var n, r = [], o = [], i = U[e + " "];
                    if (!i) {
                        for (t || (t = k(e)),
                        n = t.length; n--; )
                            i = y(t[n]),
                            i[_] ? r.push(i) : o.push(i);
                        i = U(e, b(o, r)),
                        i.selector = e
                    }
                    return i
                }
                ,
                T = t.select = function(e, t, n, r) {
                    var o, i, a, s, l, u = "function" == typeof e && e, f = !r && k(e = u.selector || e);
                    if (n = n || [],
                    1 === f.length) {
                        if (i = f[0] = f[0].slice(0),
                        i.length > 2 && "ID" === (a = i[0]).type && N.getById && 9 === t.nodeType && O && x.relative[i[1].type]) {
                            if (t = (x.find.ID(a.matches[0].replace(wt, Nt), t) || [])[0],
                            !t)
                                return n;
                            u && (t = t.parentNode),
                            e = e.slice(i.shift().value.length)
                        }
                        for (o = dt.needsContext.test(e) ? 0 : i.length; o-- && (a = i[o],
                        !x.relative[s = a.type]); )
                            if ((l = x.find[s]) && (r = l(a.matches[0].replace(wt, Nt), yt.test(i[0].type) && c(t.parentNode) || t))) {
                                if (i.splice(o, 1),
                                e = r.length && p(i),
                                !e)
                                    return K.apply(n, r),
                                    n;
                                break
                            }
                    }
                    return (u || C(e, f))(r, t, !O, n, !t || yt.test(e) && c(t.parentNode) || t),
                    n
                }
                ,
                N.sortStable = _.split("").sort(V).join("") === _,
                N.detectDuplicates = !!$,
                E(),
                N.sortDetached = o(function(e) {
                    return 1 & e.compareDocumentPosition(A.createElement("div"))
                }),
                o(function(e) {
                    return e.innerHTML = "<a href='#'></a>",
                    "#" === e.firstChild.getAttribute("href")
                }) || i("type|href|height|width", function(e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }),
                N.attributes && o(function(e) {
                    return e.innerHTML = "<input/>",
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
                }) || i("value", function(e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                }),
                o(function(e) {
                    return null  == e.getAttribute("disabled")
                }) || i(tt, function(e, t, n) {
                    var r;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null 
                }),
                t
            }(e);
            it.find = ct,
            it.expr = ct.selectors,
            it.expr[":"] = it.expr.pseudos,
            it.uniqueSort = it.unique = ct.uniqueSort,
            it.text = ct.getText,
            it.isXMLDoc = ct.isXML,
            it.contains = ct.contains;
            var ft = function(e, t, n) {
                for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                    if (1 === e.nodeType) {
                        if (o && it(e).is(n))
                            break;
                        r.push(e)
                    }
                return r
            }
              , pt = function(e, t) {
                for (var n = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && n.push(e);
                return n
            }
              , dt = it.expr.match.needsContext
              , ht = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
              , mt = /^.[^:#\[\.,]*$/;
            it.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"),
                1 === t.length && 1 === r.nodeType ? it.find.matchesSelector(r, e) ? [r] : [] : it.find.matches(e, it.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }
            ,
            it.fn.extend({
                find: function(e) {
                    var t, n = this.length, r = [], o = this;
                    if ("string" != typeof e)
                        return this.pushStack(it(e).filter(function() {
                            for (t = 0; n > t; t++)
                                if (it.contains(o[t], this))
                                    return !0
                        }));
                    for (t = 0; n > t; t++)
                        it.find(e, o[t], r);
                    return r = this.pushStack(n > 1 ? it.unique(r) : r),
                    r.selector = this.selector ? this.selector + " " + e : e,
                    r
                },
                filter: function(e) {
                    return this.pushStack(r(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(r(this, e || [], !0))
                },
                is: function(e) {
                    return !!r(this, "string" == typeof e && dt.test(e) ? it(e) : e || [], !1).length
                }
            });
            var gt, vt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, yt = it.fn.init = function(e, t, n) {
                var r, o;
                if (!e)
                    return this;
                if (n = n || gt,
                "string" == typeof e) {
                    if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null , e, null ] : vt.exec(e),
                    !r || !r[1] && t)
                        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (t = t instanceof it ? t[0] : t,
                        it.merge(this, it.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : J, !0)),
                        ht.test(r[1]) && it.isPlainObject(t))
                            for (r in t)
                                it.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    return o = J.getElementById(r[2]),
                    o && o.parentNode && (this.length = 1,
                    this[0] = o),
                    this.context = J,
                    this.selector = e,
                    this
                }
                return e.nodeType ? (this.context = this[0] = e,
                this.length = 1,
                this) : it.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(it) : (void 0 !== e.selector && (this.selector = e.selector,
                this.context = e.context),
                it.makeArray(e, this))
            }
            ;
            yt.prototype = it.fn,
            gt = it(J);
            var bt = /^(?:parents|prev(?:Until|All))/
              , wt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            it.fn.extend({
                has: function(e) {
                    var t = it(e, this)
                      , n = t.length;
                    return this.filter(function() {
                        for (var e = 0; n > e; e++)
                            if (it.contains(this, t[e]))
                                return !0
                    })
                },
                closest: function(e, t) {
                    for (var n, r = 0, o = this.length, i = [], a = dt.test(e) || "string" != typeof e ? it(e, t || this.context) : 0; o > r; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && it.find.matchesSelector(n, e))) {
                                i.push(n);
                                break
                            }
                    return this.pushStack(i.length > 1 ? it.uniqueSort(i) : i)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? Q.call(it(e), this[0]) : Q.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(it.uniqueSort(it.merge(this.get(), it(e, t))))
                },
                addBack: function(e) {
                    return this.add(null  == e ? this.prevObject : this.prevObject.filter(e))
                }
            }),
            it.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null 
                },
                parents: function(e) {
                    return ft(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return ft(e, "parentNode", n)
                },
                next: function(e) {
                    return o(e, "nextSibling")
                },
                prev: function(e) {
                    return o(e, "previousSibling")
                },
                nextAll: function(e) {
                    return ft(e, "nextSibling")
                },
                prevAll: function(e) {
                    return ft(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return ft(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return ft(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return pt((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return pt(e.firstChild)
                },
                contents: function(e) {
                    return e.contentDocument || it.merge([], e.childNodes)
                }
            }, function(e, t) {
                it.fn[e] = function(n, r) {
                    var o = it.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n),
                    r && "string" == typeof r && (o = it.filter(r, o)),
                    this.length > 1 && (wt[e] || it.uniqueSort(o),
                    bt.test(e) && o.reverse()),
                    this.pushStack(o)
                }
            });
            var Nt = /\S+/g;
            it.Callbacks = function(e) {
                e = "string" == typeof e ? i(e) : it.extend({}, e);
                var t, n, r, o, a = [], s = [], l = -1, u = function() {
                    for (o = e.once,
                    r = t = !0; s.length; l = -1)
                        for (n = s.shift(); ++l < a.length; )
                            a[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = a.length,
                            n = !1);
                    e.memory || (n = !1),
                    t = !1,
                    o && (a = n ? [] : "")
                }
                , c = {
                    add: function() {
                        return a && (n && !t && (l = a.length - 1,
                        s.push(n)),
                        function r(t) {
                            it.each(t, function(t, n) {
                                it.isFunction(n) ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== it.type(n) && r(n)
                            })
                        }(arguments),
                        n && !t && u()),
                        this
                    },
                    remove: function() {
                        return it.each(arguments, function(e, t) {
                            for (var n; (n = it.inArray(t, a, n)) > -1; )
                                a.splice(n, 1),
                                l >= n && l--
                        }),
                        this
                    },
                    has: function(e) {
                        return e ? it.inArray(e, a) > -1 : a.length > 0
                    },
                    empty: function() {
                        return a && (a = []),
                        this
                    },
                    disable: function() {
                        return o = s = [],
                        a = n = "",
                        this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return o = s = [],
                        n || (a = n = ""),
                        this
                    },
                    locked: function() {
                        return !!o
                    },
                    fireWith: function(e, n) {
                        return o || (n = n || [],
                        n = [e, n.slice ? n.slice() : n],
                        s.push(n),
                        t || u()),
                        this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments),
                        this
                    },
                    fired: function() {
                        return !!r
                    }
                };
                return c
            }
            ,
            it.extend({
                Deferred: function(e) {
                    var t = [["resolve", "done", it.Callbacks("once memory"), "resolved"], ["reject", "fail", it.Callbacks("once memory"), "rejected"], ["notify", "progress", it.Callbacks("memory")]]
                      , n = "pending"
                      , r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments),
                            this
                        },
                        then: function() {
                            var e = arguments;
                            return it.Deferred(function(n) {
                                it.each(t, function(t, i) {
                                    var a = it.isFunction(e[t]) && e[t];
                                    o[i[1]](function() {
                                        var e = a && a.apply(this, arguments);
                                        e && it.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[i[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                    })
                                }),
                                e = null 
                            }).promise()
                        },
                        promise: function(e) {
                            return null  != e ? it.extend(e, r) : r
                        }
                    }
                      , o = {};
                    return r.pipe = r.then,
                    it.each(t, function(e, i) {
                        var a = i[2]
                          , s = i[3];
                        r[i[1]] = a.add,
                        s && a.add(function() {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock),
                        o[i[0]] = function() {
                            return o[i[0] + "With"](this === o ? r : this, arguments),
                            this
                        }
                        ,
                        o[i[0] + "With"] = a.fireWith
                    }),
                    r.promise(o),
                    e && e.call(o, o),
                    o
                },
                when: function(e) {
                    var t, n, r, o = 0, i = Y.call(arguments), a = i.length, s = 1 !== a || e && it.isFunction(e.promise) ? a : 0, l = 1 === s ? e : it.Deferred(), u = function(e, n, r) {
                        return function(o) {
                            n[e] = this,
                            r[e] = arguments.length > 1 ? Y.call(arguments) : o,
                            r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                        }
                    }
                    ;
                    if (a > 1)
                        for (t = new Array(a),
                        n = new Array(a),
                        r = new Array(a); a > o; o++)
                            i[o] && it.isFunction(i[o].promise) ? i[o].promise().progress(u(o, n, t)).done(u(o, r, i)).fail(l.reject) : --s;
                    return s || l.resolveWith(r, i),
                    l.promise()
                }
            });
            var xt;
            it.fn.ready = function(e) {
                return it.ready.promise().done(e),
                this
            }
            ,
            it.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? it.readyWait++ : it.ready(!0)
                },
                ready: function(e) {
                    (e === !0 ? --it.readyWait : it.isReady) || (it.isReady = !0,
                    e !== !0 && --it.readyWait > 0 || (xt.resolveWith(J, [it]),
                    it.fn.triggerHandler && (it(J).triggerHandler("ready"),
                    it(J).off("ready"))))
                }
            }),
            it.ready.promise = function(t) {
                return xt || (xt = it.Deferred(),
                "complete" === J.readyState || "loading" !== J.readyState && !J.documentElement.doScroll ? e.setTimeout(it.ready) : (J.addEventListener("DOMContentLoaded", a),
                e.addEventListener("load", a))),
                xt.promise(t)
            }
            ,
            it.ready.promise();
            var Mt = function(e, t, n, r, o, i, a) {
                var s = 0
                  , l = e.length
                  , u = null  == n;
                if ("object" === it.type(n)) {
                    o = !0;
                    for (s in n)
                        Mt(e, t, s, n[s], !0, i, a)
                } else if (void 0 !== r && (o = !0,
                it.isFunction(r) || (a = !0),
                u && (a ? (t.call(e, r),
                t = null ) : (u = t,
                t = function(e, t, n) {
                    return u.call(it(e), n)
                }
                )),
                t))
                    for (; l > s; s++)
                        t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                return o ? e : u ? t.call(e) : l ? t(e[0], n) : i
            }
              , Pt = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            }
            ;
            s.uid = 1,
            s.prototype = {
                register: function(e, t) {
                    var n = t || {};
                    return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                        value: n,
                        writable: !0,
                        configurable: !0
                    }),
                    e[this.expando]
                },
                cache: function(e) {
                    if (!Pt(e))
                        return {};
                    var t = e[this.expando];
                    return t || (t = {},
                    Pt(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))),
                    t
                },
                set: function(e, t, n) {
                    var r, o = this.cache(e);
                    if ("string" == typeof t)
                        o[t] = n;
                    else
                        for (r in t)
                            o[r] = t[r];
                    return o
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
                },
                access: function(e, t, n) {
                    var r;
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t),
                    void 0 !== r ? r : this.get(e, it.camelCase(t))) : (this.set(e, t, n),
                    void 0 !== n ? n : t)
                },
                remove: function(e, t) {
                    var n, r, o, i = e[this.expando];
                    if (void 0 !== i) {
                        if (void 0 === t)
                            this.register(e);
                        else {
                            it.isArray(t) ? r = t.concat(t.map(it.camelCase)) : (o = it.camelCase(t),
                            t in i ? r = [t, o] : (r = o,
                            r = r in i ? [r] : r.match(Nt) || [])),
                            n = r.length;
                            for (; n--; )
                                delete i[r[n]]
                        }
                        (void 0 === t || it.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !it.isEmptyObject(t)
                }
            };
            var kt = new s
              , Ct = new s
              , Tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
              , St = /[A-Z]/g;
            it.extend({
                hasData: function(e) {
                    return Ct.hasData(e) || kt.hasData(e)
                },
                data: function(e, t, n) {
                    return Ct.access(e, t, n)
                },
                removeData: function(e, t) {
                    Ct.remove(e, t)
                },
                _data: function(e, t, n) {
                    return kt.access(e, t, n)
                },
                _removeData: function(e, t) {
                    kt.remove(e, t)
                }
            }),
            it.fn.extend({
                data: function(e, t) {
                    var n, r, o, i = this[0], a = i && i.attributes;
                    if (void 0 === e) {
                        if (this.length && (o = Ct.get(i),
                        1 === i.nodeType && !kt.get(i, "hasDataAttrs"))) {
                            for (n = a.length; n--; )
                                a[n] && (r = a[n].name,
                                0 === r.indexOf("data-") && (r = it.camelCase(r.slice(5)),
                                l(i, r, o[r])));
                            kt.set(i, "hasDataAttrs", !0)
                        }
                        return o
                    }
                    return "object" == typeof e ? this.each(function() {
                        Ct.set(this, e)
                    }) : Mt(this, function(t) {
                        var n, r;
                        if (i && void 0 === t) {
                            if (n = Ct.get(i, e) || Ct.get(i, e.replace(St, "-$&").toLowerCase()),
                            void 0 !== n)
                                return n;
                            if (r = it.camelCase(e),
                            n = Ct.get(i, r),
                            void 0 !== n)
                                return n;
                            if (n = l(i, r, void 0),
                            void 0 !== n)
                                return n
                        } else
                            r = it.camelCase(e),
                            this.each(function() {
                                var n = Ct.get(this, r);
                                Ct.set(this, r, t),
                                e.indexOf("-") > -1 && void 0 !== n && Ct.set(this, e, t)
                            })
                    }, null , t, arguments.length > 1, null , !0)
                },
                removeData: function(e) {
                    return this.each(function() {
                        Ct.remove(this, e)
                    })
                }
            }),
            it.extend({
                queue: function(e, t, n) {
                    var r;
                    return e ? (t = (t || "fx") + "queue",
                    r = kt.get(e, t),
                    n && (!r || it.isArray(n) ? r = kt.access(e, t, it.makeArray(n)) : r.push(n)),
                    r || []) : void 0
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = it.queue(e, t)
                      , r = n.length
                      , o = n.shift()
                      , i = it._queueHooks(e, t)
                      , a = function() {
                        it.dequeue(e, t)
                    }
                    ;
                    "inprogress" === o && (o = n.shift(),
                    r--),
                    o && ("fx" === t && n.unshift("inprogress"),
                    delete i.stop,
                    o.call(e, a, i)),
                    !r && i && i.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return kt.get(e, n) || kt.access(e, n, {
                        empty: it.Callbacks("once memory").add(function() {
                            kt.remove(e, [t + "queue", n])
                        })
                    })
                }
            }),
            it.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e,
                    e = "fx",
                    n--),
                    arguments.length < n ? it.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                        var n = it.queue(this, e, t);
                        it._queueHooks(this, e),
                        "fx" === e && "inprogress" !== n[0] && it.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        it.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n, r = 1, o = it.Deferred(), i = this, a = this.length, s = function() {
                        --r || o.resolveWith(i, [i])
                    }
                    ;
                    for ("string" != typeof e && (t = e,
                    e = void 0),
                    e = e || "fx"; a--; )
                        n = kt.get(i[a], e + "queueHooks"),
                        n && n.empty && (r++,
                        n.empty.add(s));
                    return s(),
                    o.promise(t)
                }
            });
            var jt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
              , $t = new RegExp("^(?:([+-])=|)(" + jt + ")([a-z%]*)$","i")
              , Et = ["Top", "Right", "Bottom", "Left"]
              , At = function(e, t) {
                return e = t || e,
                "none" === it.css(e, "display") || !it.contains(e.ownerDocument, e)
            }
              , Dt = /^(?:checkbox|radio)$/i
              , Ot = /<([\w:-]+)/
              , qt = /^$|\/(?:java|ecma)script/i
              , Lt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
            Lt.optgroup = Lt.option,
            Lt.tbody = Lt.tfoot = Lt.colgroup = Lt.caption = Lt.thead,
            Lt.th = Lt.td;
            var Ht = /<|&#?\w+;/;
            !function() {
                var e = J.createDocumentFragment()
                  , t = e.appendChild(J.createElement("div"))
                  , n = J.createElement("input");
                n.setAttribute("type", "radio"),
                n.setAttribute("checked", "checked"),
                n.setAttribute("name", "t"),
                t.appendChild(n),
                rt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
                t.innerHTML = "<textarea>x</textarea>",
                rt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
            }();
            var It = /^key/
              , _t = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
              , Ft = /^([^.]*)(?:\.(.+)|)/;
            it.event = {
                global: {},
                add: function(e, t, n, r, o) {
                    var i, a, s, l, u, c, f, p, d, h, m, g = kt.get(e);
                    if (g)
                        for (n.handler && (i = n,
                        n = i.handler,
                        o = i.selector),
                        n.guid || (n.guid = it.guid++),
                        (l = g.events) || (l = g.events = {}),
                        (a = g.handle) || (a = g.handle = function(t) {
                            return "undefined" != typeof it && it.event.triggered !== t.type ? it.event.dispatch.apply(e, arguments) : void 0
                        }
                        ),
                        t = (t || "").match(Nt) || [""],
                        u = t.length; u--; )
                            s = Ft.exec(t[u]) || [],
                            d = m = s[1],
                            h = (s[2] || "").split(".").sort(),
                            d && (f = it.event.special[d] || {},
                            d = (o ? f.delegateType : f.bindType) || d,
                            f = it.event.special[d] || {},
                            c = it.extend({
                                type: d,
                                origType: m,
                                data: r,
                                handler: n,
                                guid: n.guid,
                                selector: o,
                                needsContext: o && it.expr.match.needsContext.test(o),
                                namespace: h.join(".")
                            }, i),
                            (p = l[d]) || (p = l[d] = [],
                            p.delegateCount = 0,
                            f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(d, a)),
                            f.add && (f.add.call(e, c),
                            c.handler.guid || (c.handler.guid = n.guid)),
                            o ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                            it.event.global[d] = !0)
                },
                remove: function(e, t, n, r, o) {
                    var i, a, s, l, u, c, f, p, d, h, m, g = kt.hasData(e) && kt.get(e);
                    if (g && (l = g.events)) {
                        for (t = (t || "").match(Nt) || [""],
                        u = t.length; u--; )
                            if (s = Ft.exec(t[u]) || [],
                            d = m = s[1],
                            h = (s[2] || "").split(".").sort(),
                            d) {
                                for (f = it.event.special[d] || {},
                                d = (r ? f.delegateType : f.bindType) || d,
                                p = l[d] || [],
                                s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                a = i = p.length; i--; )
                                    c = p[i],
                                    !o && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(i, 1),
                                    c.selector && p.delegateCount--,
                                    f.remove && f.remove.call(e, c));
                                a && !p.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || it.removeEvent(e, d, g.handle),
                                delete l[d])
                            } else
                                for (d in l)
                                    it.event.remove(e, d + t[u], n, r, !0);
                        it.isEmptyObject(l) && kt.remove(e, "handle events")
                    }
                },
                dispatch: function(e) {
                    e = it.event.fix(e);
                    var t, n, r, o, i, a = [], s = Y.call(arguments), l = (kt.get(this, "events") || {})[e.type] || [], u = it.event.special[e.type] || {};
                    if (s[0] = e,
                    e.delegateTarget = this,
                    !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                        for (a = it.event.handlers.call(this, e, l),
                        t = 0; (o = a[t++]) && !e.isPropagationStopped(); )
                            for (e.currentTarget = o.elem,
                            n = 0; (i = o.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                                (!e.rnamespace || e.rnamespace.test(i.namespace)) && (e.handleObj = i,
                                e.data = i.data,
                                r = ((it.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, s),
                                void 0 !== r && (e.result = r) === !1 && (e.preventDefault(),
                                e.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, e),
                        e.result
                    }
                },
                handlers: function(e, t) {
                    var n, r, o, i, a = [], s = t.delegateCount, l = e.target;
                    if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                        for (; l !== this; l = l.parentNode || this)
                            if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                                for (r = [],
                                n = 0; s > n; n++)
                                    i = t[n],
                                    o = i.selector + " ",
                                    void 0 === r[o] && (r[o] = i.needsContext ? it(o, this).index(l) > -1 : it.find(o, this, null , [l]).length),
                                    r[o] && r.push(i);
                                r.length && a.push({
                                    elem: l,
                                    handlers: r
                                })
                            }
                    return s < t.length && a.push({
                        elem: this,
                        handlers: t.slice(s)
                    }),
                    a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null  == e.which && (e.which = null  != t.charCode ? t.charCode : t.keyCode),
                        e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, r, o, i = t.button;
                        return null  == e.pageX && null  != t.clientX && (n = e.target.ownerDocument || J,
                        r = n.documentElement,
                        o = n.body,
                        e.pageX = t.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0),
                        e.pageY = t.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)),
                        e.which || void 0 === i || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0),
                        e
                    }
                },
                fix: function(e) {
                    if (e[it.expando])
                        return e;
                    var t, n, r, o = e.type, i = e, a = this.fixHooks[o];
                    for (a || (this.fixHooks[o] = a = _t.test(o) ? this.mouseHooks : It.test(o) ? this.keyHooks : {}),
                    r = a.props ? this.props.concat(a.props) : this.props,
                    e = new it.Event(i),
                    t = r.length; t--; )
                        n = r[t],
                        e[n] = i[n];
                    return e.target || (e.target = J),
                    3 === e.target.nodeType && (e.target = e.target.parentNode),
                    a.filter ? a.filter(e, i) : e
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            return this !== m() && this.focus ? (this.focus(),
                            !1) : void 0
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === m() && this.blur ? (this.blur(),
                            !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return "checkbox" === this.type && this.click && it.nodeName(this, "input") ? (this.click(),
                            !1) : void 0
                        },
                        _default: function(e) {
                            return it.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                }
            },
            it.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            }
            ,
            it.Event = function(e, t) {
                return this instanceof it.Event ? (e && e.type ? (this.originalEvent = e,
                this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? d : h) : this.type = e,
                t && it.extend(this, t),
                this.timeStamp = e && e.timeStamp || it.now(),
                this[it.expando] = !0,
                void 0) : new it.Event(e,t)
            }
            ,
            it.Event.prototype = {
                constructor: it.Event,
                isDefaultPrevented: h,
                isPropagationStopped: h,
                isImmediatePropagationStopped: h,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = d,
                    e && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = d,
                    e && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = d,
                    e && e.stopImmediatePropagation(),
                    this.stopPropagation()
                }
            },
            it.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                it.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, r = this, o = e.relatedTarget, i = e.handleObj;
                        return (!o || o !== r && !it.contains(r, o)) && (e.type = i.origType,
                        n = i.handler.apply(this, arguments),
                        e.type = t),
                        n
                    }
                }
            }),
            it.fn.extend({
                on: function(e, t, n, r) {
                    return g(this, e, t, n, r)
                },
                one: function(e, t, n, r) {
                    return g(this, e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r, o;
                    if (e && e.preventDefault && e.handleObj)
                        return r = e.handleObj,
                        it(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                        this;
                    if ("object" == typeof e) {
                        for (o in e)
                            this.off(o, t, e[o]);
                        return this
                    }
                    return (t === !1 || "function" == typeof t) && (n = t,
                    t = void 0),
                    n === !1 && (n = h),
                    this.each(function() {
                        it.event.remove(this, e, n, t)
                    })
                }
            });
            var Rt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
              , zt = /<script|<style|<link/i
              , Bt = /checked\s*(?:[^=]|=\s*.checked.)/i
              , Wt = /^true\/(.*)/
              , Ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            it.extend({
                htmlPrefilter: function(e) {
                    return e.replace(Rt, "<$1></$2>")
                },
                clone: function(e, t, n) {
                    var r, o, i, a, s = e.cloneNode(!0), l = it.contains(e.ownerDocument, e);
                    if (!(rt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || it.isXMLDoc(e)))
                        for (a = c(s),
                        i = c(e),
                        r = 0,
                        o = i.length; o > r; r++)
                            N(i[r], a[r]);
                    if (t)
                        if (n)
                            for (i = i || c(e),
                            a = a || c(s),
                            r = 0,
                            o = i.length; o > r; r++)
                                w(i[r], a[r]);
                        else
                            w(e, s);
                    return a = c(s, "script"),
                    a.length > 0 && f(a, !l && c(e, "script")),
                    s
                },
                cleanData: function(e) {
                    for (var t, n, r, o = it.event.special, i = 0; void 0 !== (n = e[i]); i++)
                        if (Pt(n)) {
                            if (t = n[kt.expando]) {
                                if (t.events)
                                    for (r in t.events)
                                        o[r] ? it.event.remove(n, r) : it.removeEvent(n, r, t.handle);
                                n[kt.expando] = void 0
                            }
                            n[Ct.expando] && (n[Ct.expando] = void 0)
                        }
                }
            }),
            it.fn.extend({
                domManip: x,
                detach: function(e) {
                    return M(this, e, !0)
                },
                remove: function(e) {
                    return M(this, e)
                },
                text: function(e) {
                    return Mt(this, function(e) {
                        return void 0 === e ? it.text(this) : this.empty().each(function() {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                        })
                    }, null , e, arguments.length)
                },
                append: function() {
                    return x(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = v(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return x(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = v(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return x(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return x(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null  != (e = this[t]); t++)
                        1 === e.nodeType && (it.cleanData(c(e, !1)),
                        e.textContent = "");
                    return this
                },
                clone: function(e, t) {
                    return e = null  == e ? !1 : e,
                    t = null  == t ? e : t,
                    this.map(function() {
                        return it.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return Mt(this, function(e) {
                        var t = this[0] || {}
                          , n = 0
                          , r = this.length;
                        if (void 0 === e && 1 === t.nodeType)
                            return t.innerHTML;
                        if ("string" == typeof e && !zt.test(e) && !Lt[(Ot.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = it.htmlPrefilter(e);
                            try {
                                for (; r > n; n++)
                                    t = this[n] || {},
                                    1 === t.nodeType && (it.cleanData(c(t, !1)),
                                    t.innerHTML = e);
                                t = 0
                            } catch (o) {}
                        }
                        t && this.empty().append(e)
                    }, null , e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return x(this, arguments, function(t) {
                        var n = this.parentNode;
                        it.inArray(this, e) < 0 && (it.cleanData(c(this)),
                        n && n.replaceChild(t, this))
                    }, e)
                }
            }),
            it.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                it.fn[e] = function(e) {
                    for (var n, r = [], o = it(e), i = o.length - 1, a = 0; i >= a; a++)
                        n = a === i ? this : this.clone(!0),
                        it(o[a])[t](n),
                        K.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var Vt, Gt = {
                HTML: "block",
                BODY: "block"
            }, Xt = /^margin/, Jt = new RegExp("^(" + jt + ")(?!px)[a-z%]+$","i"), Yt = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e),
                n.getComputedStyle(t)
            }
            , Zt = function(e, t, n, r) {
                var o, i, a = {};
                for (i in t)
                    a[i] = e.style[i],
                    e.style[i] = t[i];
                o = n.apply(e, r || []);
                for (i in t)
                    e.style[i] = a[i];
                return o
            }
            , Kt = J.documentElement;
            !function() {
                function t() {
                    s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                    s.innerHTML = "",
                    Kt.appendChild(a);
                    var t = e.getComputedStyle(s);
                    n = "1%" !== t.top,
                    i = "2px" === t.marginLeft,
                    r = "4px" === t.width,
                    s.style.marginRight = "50%",
                    o = "4px" === t.marginRight,
                    Kt.removeChild(a)
                }
                var n, r, o, i, a = J.createElement("div"), s = J.createElement("div");
                s.style && (s.style.backgroundClip = "content-box",
                s.cloneNode(!0).style.backgroundClip = "",
                rt.clearCloneStyle = "content-box" === s.style.backgroundClip,
                a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
                a.appendChild(s),
                it.extend(rt, {
                    pixelPosition: function() {
                        return t(),
                        n
                    },
                    boxSizingReliable: function() {
                        return null  == r && t(),
                        r
                    },
                    pixelMarginRight: function() {
                        return null  == r && t(),
                        o
                    },
                    reliableMarginLeft: function() {
                        return null  == r && t(),
                        i
                    },
                    reliableMarginRight: function() {
                        var t, n = s.appendChild(J.createElement("div"));
                        return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                        n.style.marginRight = n.style.width = "0",
                        s.style.width = "1px",
                        Kt.appendChild(a),
                        t = !parseFloat(e.getComputedStyle(n).marginRight),
                        Kt.removeChild(a),
                        s.removeChild(n),
                        t
                    }
                }))
            }();
            var Qt = /^(none|table(?!-c[ea]).+)/
              , en = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }
              , tn = {
                letterSpacing: "0",
                fontWeight: "400"
            }
              , nn = ["Webkit", "O", "Moz", "ms"]
              , rn = J.createElement("div").style;
            it.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = C(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": "cssFloat"
                },
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var o, i, a, s = it.camelCase(t), l = e.style;
                        return t = it.cssProps[s] || (it.cssProps[s] = S(s) || s),
                        a = it.cssHooks[t] || it.cssHooks[s],
                        void 0 === n ? a && "get" in a && void 0 !== (o = a.get(e, !1, r)) ? o : l[t] : (i = typeof n,
                        "string" === i && (o = $t.exec(n)) && o[1] && (n = u(e, t, o),
                        i = "number"),
                        null  != n && n === n && ("number" === i && (n += o && o[3] || (it.cssNumber[s] ? "" : "px")),
                        rt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                        a && "set" in a && void 0 === (n = a.set(e, n, r)) || (l[t] = n)),
                        void 0)
                    }
                },
                css: function(e, t, n, r) {
                    var o, i, a, s = it.camelCase(t);
                    return t = it.cssProps[s] || (it.cssProps[s] = S(s) || s),
                    a = it.cssHooks[t] || it.cssHooks[s],
                    a && "get" in a && (o = a.get(e, !0, n)),
                    void 0 === o && (o = C(e, t, r)),
                    "normal" === o && t in tn && (o = tn[t]),
                    "" === n || n ? (i = parseFloat(o),
                    n === !0 || isFinite(i) ? i || 0 : o) : o
                }
            }),
            it.each(["height", "width"], function(e, t) {
                it.cssHooks[t] = {
                    get: function(e, n, r) {
                        return n ? Qt.test(it.css(e, "display")) && 0 === e.offsetWidth ? Zt(e, en, function() {
                            return E(e, t, r)
                        }) : E(e, t, r) : void 0
                    },
                    set: function(e, n, r) {
                        var o, i = r && Yt(e), a = r && $(e, t, r, "border-box" === it.css(e, "boxSizing", !1, i), i);
                        return a && (o = $t.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n,
                        n = it.css(e, t)),
                        j(e, n, a)
                    }
                }
            }),
            it.cssHooks.marginLeft = T(rt.reliableMarginLeft, function(e, t) {
                return t ? (parseFloat(C(e, "marginLeft")) || e.getBoundingClientRect().left - Zt(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px" : void 0
            }),
            it.cssHooks.marginRight = T(rt.reliableMarginRight, function(e, t) {
                return t ? Zt(e, {
                    display: "inline-block"
                }, C, [e, "marginRight"]) : void 0
            }),
            it.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                it.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)
                            o[e + Et[r] + t] = i[r] || i[r - 2] || i[0];
                        return o
                    }
                },
                Xt.test(e) || (it.cssHooks[e + t].set = j)
            }),
            it.fn.extend({
                css: function(e, t) {
                    return Mt(this, function(e, t, n) {
                        var r, o, i = {}, a = 0;
                        if (it.isArray(t)) {
                            for (r = Yt(e),
                            o = t.length; o > a; a++)
                                i[t[a]] = it.css(e, t[a], !1, r);
                            return i
                        }
                        return void 0 !== n ? it.style(e, t, n) : it.css(e, t)
                    }, e, t, arguments.length > 1)
                },
                show: function() {
                    return A(this, !0)
                },
                hide: function() {
                    return A(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        At(this) ? it(this).show() : it(this).hide()
                    })
                }
            }),
            it.Tween = D,
            D.prototype = {
                constructor: D,
                init: function(e, t, n, r, o, i) {
                    this.elem = e,
                    this.prop = n,
                    this.easing = o || it.easing._default,
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = i || (it.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = D.propHooks[this.prop];
                    return e && e.get ? e.get(this) : D.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = D.propHooks[this.prop];
                    return this.pos = t = this.options.duration ? it.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : D.propHooks._default.set(this),
                    this
                }
            },
            D.prototype.init.prototype = D.prototype,
            D.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null  != e.elem[e.prop] && null  == e.elem.style[e.prop] ? e.elem[e.prop] : (t = it.css(e.elem, e.prop, ""),
                        t && "auto" !== t ? t : 0)
                    },
                    set: function(e) {
                        it.fx.step[e.prop] ? it.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null  == e.elem.style[it.cssProps[e.prop]] && !it.cssHooks[e.prop] ? e.elem[e.prop] = e.now : it.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            },
            D.propHooks.scrollTop = D.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            },
            it.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            },
            it.fx = D.prototype.init,
            it.fx.step = {};
            var on, an, sn = /^(?:toggle|show|hide)$/, ln = /queueHooks$/;
            it.Animation = it.extend(_, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return u(n.elem, e, $t.exec(t), n),
                        n
                    }
                    ]
                },
                tweener: function(e, t) {
                    it.isFunction(e) ? (t = e,
                    e = ["*"]) : e = e.match(Nt);
                    for (var n, r = 0, o = e.length; o > r; r++)
                        n = e[r],
                        _.tweeners[n] = _.tweeners[n] || [],
                        _.tweeners[n].unshift(t)
                },
                prefilters: [H],
                prefilter: function(e, t) {
                    t ? _.prefilters.unshift(e) : _.prefilters.push(e)
                }
            }),
            it.speed = function(e, t, n) {
                var r = e && "object" == typeof e ? it.extend({}, e) : {
                    complete: n || !n && t || it.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !it.isFunction(t) && t
                };
                return r.duration = it.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in it.fx.speeds ? it.fx.speeds[r.duration] : it.fx.speeds._default,
                (null  == r.queue || r.queue === !0) && (r.queue = "fx"),
                r.old = r.complete,
                r.complete = function() {
                    it.isFunction(r.old) && r.old.call(this),
                    r.queue && it.dequeue(this, r.queue)
                }
                ,
                r
            }
            ,
            it.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(At).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var o = it.isEmptyObject(e)
                      , i = it.speed(t, n, r)
                      , a = function() {
                        var t = _(this, it.extend({}, e), i);
                        (o || kt.get(this, "finish")) && t.stop(!0)
                    }
                    ;
                    return a.finish = a,
                    o || i.queue === !1 ? this.each(a) : this.queue(i.queue, a)
                },
                stop: function(e, t, n) {
                    var r = function(e) {
                        var t = e.stop;
                        delete e.stop,
                        t(n)
                    }
                    ;
                    return "string" != typeof e && (n = t,
                    t = e,
                    e = void 0),
                    t && e !== !1 && this.queue(e || "fx", []),
                    this.each(function() {
                        var t = !0
                          , o = null  != e && e + "queueHooks"
                          , i = it.timers
                          , a = kt.get(this);
                        if (o)
                            a[o] && a[o].stop && r(a[o]);
                        else
                            for (o in a)
                                a[o] && a[o].stop && ln.test(o) && r(a[o]);
                        for (o = i.length; o--; )
                            i[o].elem !== this || null  != e && i[o].queue !== e || (i[o].anim.stop(n),
                            t = !1,
                            i.splice(o, 1));
                        (t || !n) && it.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"),
                    this.each(function() {
                        var t, n = kt.get(this), r = n[e + "queue"], o = n[e + "queueHooks"], i = it.timers, a = r ? r.length : 0;
                        for (n.finish = !0,
                        it.queue(this, e, []),
                        o && o.stop && o.stop.call(this, !0),
                        t = i.length; t--; )
                            i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0),
                            i.splice(t, 1));
                        for (t = 0; a > t; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }),
            it.each(["toggle", "show", "hide"], function(e, t) {
                var n = it.fn[t];
                it.fn[t] = function(e, r, o) {
                    return null  == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, r, o)
                }
            }),
            it.each({
                slideDown: q("show"),
                slideUp: q("hide"),
                slideToggle: q("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                it.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }),
            it.timers = [],
            it.fx.tick = function() {
                var e, t = 0, n = it.timers;
                for (on = it.now(); t < n.length; t++)
                    e = n[t],
                    e() || n[t] !== e || n.splice(t--, 1);
                n.length || it.fx.stop(),
                on = void 0
            }
            ,
            it.fx.timer = function(e) {
                it.timers.push(e),
                e() ? it.fx.start() : it.timers.pop()
            }
            ,
            it.fx.interval = 13,
            it.fx.start = function() {
                an || (an = e.setInterval(it.fx.tick, it.fx.interval))
            }
            ,
            it.fx.stop = function() {
                e.clearInterval(an),
                an = null 
            }
            ,
            it.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            it.fn.delay = function(t, n) {
                return t = it.fx ? it.fx.speeds[t] || t : t,
                n = n || "fx",
                this.queue(n, function(n, r) {
                    var o = e.setTimeout(n, t);
                    r.stop = function() {
                        e.clearTimeout(o)
                    }
                })
            }
            ,
            function() {
                var e = J.createElement("input")
                  , t = J.createElement("select")
                  , n = t.appendChild(J.createElement("option"));
                e.type = "checkbox",
                rt.checkOn = "" !== e.value,
                rt.optSelected = n.selected,
                t.disabled = !0,
                rt.optDisabled = !n.disabled,
                e = J.createElement("input"),
                e.value = "t",
                e.type = "radio",
                rt.radioValue = "t" === e.value
            }();
            var un, cn = it.expr.attrHandle;
            it.fn.extend({
                attr: function(e, t) {
                    return Mt(this, it.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        it.removeAttr(this, e)
                    })
                }
            }),
            it.extend({
                attr: function(e, t, n) {
                    var r, o, i = e.nodeType;
                    if (3 !== i && 8 !== i && 2 !== i)
                        return "undefined" == typeof e.getAttribute ? it.prop(e, t, n) : (1 === i && it.isXMLDoc(e) || (t = t.toLowerCase(),
                        o = it.attrHooks[t] || (it.expr.match.bool.test(t) ? un : void 0)),
                        void 0 !== n ? null  === n ? (it.removeAttr(e, t),
                        void 0) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                        n) : o && "get" in o && null  !== (r = o.get(e, t)) ? r : (r = it.find.attr(e, t),
                        null  == r ? void 0 : r))
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!rt.radioValue && "radio" === t && it.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, r, o = 0, i = t && t.match(Nt);
                    if (i && 1 === e.nodeType)
                        for (; n = i[o++]; )
                            r = it.propFix[n] || n,
                            it.expr.match.bool.test(n) && (e[r] = !1),
                            e.removeAttribute(n)
                }
            }),
            un = {
                set: function(e, t, n) {
                    return t === !1 ? it.removeAttr(e, n) : e.setAttribute(n, n),
                    n
                }
            },
            it.each(it.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = cn[t] || it.find.attr;
                cn[t] = function(e, t, r) {
                    var o, i;
                    return r || (i = cn[t],
                    cn[t] = o,
                    o = null  != n(e, t, r) ? t.toLowerCase() : null ,
                    cn[t] = i),
                    o
                }
            });
            var fn = /^(?:input|select|textarea|button)$/i
              , pn = /^(?:a|area)$/i;
            it.fn.extend({
                prop: function(e, t) {
                    return Mt(this, it.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[it.propFix[e] || e]
                    })
                }
            }),
            it.extend({
                prop: function(e, t, n) {
                    var r, o, i = e.nodeType;
                    if (3 !== i && 8 !== i && 2 !== i)
                        return 1 === i && it.isXMLDoc(e) || (t = it.propFix[t] || t,
                        o = it.propHooks[t]),
                        void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null  !== (r = o.get(e, t)) ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = it.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : fn.test(e.nodeName) || pn.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                }
            }),
            rt.optSelected || (it.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex,
                    null 
                }
            }),
            it.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                it.propFix[this.toLowerCase()] = this
            });
            var dn = /[\t\r\n\f]/g;
            it.fn.extend({
                addClass: function(e) {
                    var t, n, r, o, i, a, s, l = 0;
                    if (it.isFunction(e))
                        return this.each(function(t) {
                            it(this).addClass(e.call(this, t, F(this)))
                        });
                    if ("string" == typeof e && e)
                        for (t = e.match(Nt) || []; n = this[l++]; )
                            if (o = F(n),
                            r = 1 === n.nodeType && (" " + o + " ").replace(dn, " ")) {
                                for (a = 0; i = t[a++]; )
                                    r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                s = it.trim(r),
                                o !== s && n.setAttribute("class", s)
                            }
                    return this
                },
                removeClass: function(e) {
                    var t, n, r, o, i, a, s, l = 0;
                    if (it.isFunction(e))
                        return this.each(function(t) {
                            it(this).removeClass(e.call(this, t, F(this)))
                        });
                    if (!arguments.length)
                        return this.attr("class", "");
                    if ("string" == typeof e && e)
                        for (t = e.match(Nt) || []; n = this[l++]; )
                            if (o = F(n),
                            r = 1 === n.nodeType && (" " + o + " ").replace(dn, " ")) {
                                for (a = 0; i = t[a++]; )
                                    for (; r.indexOf(" " + i + " ") > -1; )
                                        r = r.replace(" " + i + " ", " ");
                                s = it.trim(r),
                                o !== s && n.setAttribute("class", s)
                            }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : it.isFunction(e) ? this.each(function(n) {
                        it(this).toggleClass(e.call(this, n, F(this), t), t)
                    }) : this.each(function() {
                        var t, r, o, i;
                        if ("string" === n)
                            for (r = 0,
                            o = it(this),
                            i = e.match(Nt) || []; t = i[r++]; )
                                o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                        else
                            (void 0 === e || "boolean" === n) && (t = F(this),
                            t && kt.set(this, "__className__", t),
                            this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : kt.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t, n, r = 0;
                    for (t = " " + e + " "; n = this[r++]; )
                        if (1 === n.nodeType && (" " + F(n) + " ").replace(dn, " ").indexOf(t) > -1)
                            return !0;
                    return !1
                }
            });
            var hn = /\r/g;
            it.fn.extend({
                val: function(e) {
                    var t, n, r, o = this[0];
                    {
                        if (arguments.length)
                            return r = it.isFunction(e),
                            this.each(function(n) {
                                var o;
                                1 === this.nodeType && (o = r ? e.call(this, n, it(this).val()) : e,
                                null  == o ? o = "" : "number" == typeof o ? o += "" : it.isArray(o) && (o = it.map(o, function(e) {
                                    return null  == e ? "" : e + ""
                                })),
                                t = it.valHooks[this.type] || it.valHooks[this.nodeName.toLowerCase()],
                                t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                            });
                        if (o)
                            return t = it.valHooks[o.type] || it.valHooks[o.nodeName.toLowerCase()],
                            t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value,
                            "string" == typeof n ? n.replace(hn, "") : null  == n ? "" : n)
                    }
                }
            }),
            it.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            return it.trim(e.value)
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, n, r = e.options, o = e.selectedIndex, i = "select-one" === e.type || 0 > o, a = i ? null  : [], s = i ? o + 1 : r.length, l = 0 > o ? s : i ? o : 0; s > l; l++)
                                if (n = r[l],
                                !(!n.selected && l !== o || (rt.optDisabled ? n.disabled : null  !== n.getAttribute("disabled")) || n.parentNode.disabled && it.nodeName(n.parentNode, "optgroup"))) {
                                    if (t = it(n).val(),
                                    i)
                                        return t;
                                    a.push(t)
                                }
                            return a
                        },
                        set: function(e, t) {
                            for (var n, r, o = e.options, i = it.makeArray(t), a = o.length; a--; )
                                r = o[a],
                                (r.selected = it.inArray(it.valHooks.option.get(r), i) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1),
                            i
                        }
                    }
                }
            }),
            it.each(["radio", "checkbox"], function() {
                it.valHooks[this] = {
                    set: function(e, t) {
                        return it.isArray(t) ? e.checked = it.inArray(it(e).val(), t) > -1 : void 0
                    }
                },
                rt.checkOn || (it.valHooks[this].get = function(e) {
                    return null  === e.getAttribute("value") ? "on" : e.value
                }
                )
            });
            var mn = /^(?:focusinfocus|focusoutblur)$/;
            it.extend(it.event, {
                trigger: function(t, n, r, o) {
                    var i, a, s, l, u, c, f, p = [r || J], d = nt.call(t, "type") ? t.type : t, h = nt.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (a = s = r = r || J,
                    3 !== r.nodeType && 8 !== r.nodeType && !mn.test(d + it.event.triggered) && (d.indexOf(".") > -1 && (h = d.split("."),
                    d = h.shift(),
                    h.sort()),
                    u = d.indexOf(":") < 0 && "on" + d,
                    t = t[it.expando] ? t : new it.Event(d,"object" == typeof t && t),
                    t.isTrigger = o ? 2 : 3,
                    t.namespace = h.join("."),
                    t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
                    t.result = void 0,
                    t.target || (t.target = r),
                    n = null  == n ? [t] : it.makeArray(n, [t]),
                    f = it.event.special[d] || {},
                    o || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                        if (!o && !f.noBubble && !it.isWindow(r)) {
                            for (l = f.delegateType || d,
                            mn.test(l + d) || (a = a.parentNode); a; a = a.parentNode)
                                p.push(a),
                                s = a;
                            s === (r.ownerDocument || J) && p.push(s.defaultView || s.parentWindow || e)
                        }
                        for (i = 0; (a = p[i++]) && !t.isPropagationStopped(); )
                            t.type = i > 1 ? l : f.bindType || d,
                            c = (kt.get(a, "events") || {})[t.type] && kt.get(a, "handle"),
                            c && c.apply(a, n),
                            c = u && a[u],
                            c && c.apply && Pt(a) && (t.result = c.apply(a, n),
                            t.result === !1 && t.preventDefault());
                        return t.type = d,
                        o || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !Pt(r) || u && it.isFunction(r[d]) && !it.isWindow(r) && (s = r[u],
                        s && (r[u] = null ),
                        it.event.triggered = d,
                        r[d](),
                        it.event.triggered = void 0,
                        s && (r[u] = s)),
                        t.result
                    }
                },
                simulate: function(e, t, n) {
                    var r = it.extend(new it.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    it.event.trigger(r, null , t),
                    r.isDefaultPrevented() && n.preventDefault()
                }
            }),
            it.fn.extend({
                trigger: function(e, t) {
                    return this.each(function() {
                        it.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    return n ? it.event.trigger(e, t, n, !0) : void 0
                }
            }),
            it.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                it.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null , e, n) : this.trigger(t)
                }
            }),
            it.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }),
            rt.focusin = "onfocusin" in e,
            rt.focusin || it.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    it.event.simulate(t, e.target, it.event.fix(e))
                }
                ;
                it.event.special[t] = {
                    setup: function() {
                        var r = this.ownerDocument || this
                          , o = kt.access(r, t);
                        o || r.addEventListener(e, n, !0),
                        kt.access(r, t, (o || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this
                          , o = kt.access(r, t) - 1;
                        o ? kt.access(r, t, o) : (r.removeEventListener(e, n, !0),
                        kt.remove(r, t))
                    }
                }
            });
            var gn = e.location
              , vn = it.now()
              , yn = /\?/;
            it.parseJSON = function(e) {
                return JSON.parse(e + "")
            }
            ,
            it.parseXML = function(t) {
                var n;
                if (!t || "string" != typeof t)
                    return null ;
                try {
                    n = (new e.DOMParser).parseFromString(t, "text/xml")
                } catch (r) {
                    n = void 0
                }
                return (!n || n.getElementsByTagName("parsererror").length) && it.error("Invalid XML: " + t),
                n
            }
            ;
            var bn = /#.*$/
              , wn = /([?&])_=[^&]*/
              , Nn = /^(.*?):[ \t]*([^\r\n]*)$/gm
              , xn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
              , Mn = /^(?:GET|HEAD)$/
              , Pn = /^\/\//
              , kn = {}
              , Cn = {}
              , Tn = "*/".concat("*")
              , Sn = J.createElement("a");
            Sn.href = gn.href,
            it.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: gn.href,
                    type: "GET",
                    isLocal: xn.test(gn.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Tn,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": it.parseJSON,
                        "text xml": it.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? B(B(e, it.ajaxSettings), t) : B(it.ajaxSettings, e)
                },
                ajaxPrefilter: R(kn),
                ajaxTransport: R(Cn),
                ajax: function(t, n) {
                    function r(t, n, r, s) {
                        var u, f, y, b, N, M = n;
                        2 !== w && (w = 2,
                        l && e.clearTimeout(l),
                        o = void 0,
                        a = s || "",
                        x.readyState = t > 0 ? 4 : 0,
                        u = t >= 200 && 300 > t || 304 === t,
                        r && (b = W(p, x, r)),
                        b = U(p, b, x, u),
                        u ? (p.ifModified && (N = x.getResponseHeader("Last-Modified"),
                        N && (it.lastModified[i] = N),
                        N = x.getResponseHeader("etag"),
                        N && (it.etag[i] = N)),
                        204 === t || "HEAD" === p.type ? M = "nocontent" : 304 === t ? M = "notmodified" : (M = b.state,
                        f = b.data,
                        y = b.error,
                        u = !y)) : (y = M,
                        (t || !M) && (M = "error",
                        0 > t && (t = 0))),
                        x.status = t,
                        x.statusText = (n || M) + "",
                        u ? m.resolveWith(d, [f, M, x]) : m.rejectWith(d, [x, M, y]),
                        x.statusCode(v),
                        v = void 0,
                        c && h.trigger(u ? "ajaxSuccess" : "ajaxError", [x, p, u ? f : y]),
                        g.fireWith(d, [x, M]),
                        c && (h.trigger("ajaxComplete", [x, p]),
                        --it.active || it.event.trigger("ajaxStop")))
                    }
                    "object" == typeof t && (n = t,
                    t = void 0),
                    n = n || {};
                    var o, i, a, s, l, u, c, f, p = it.ajaxSetup({}, n), d = p.context || p, h = p.context && (d.nodeType || d.jquery) ? it(d) : it.event, m = it.Deferred(), g = it.Callbacks("once memory"), v = p.statusCode || {}, y = {}, b = {}, w = 0, N = "canceled", x = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === w) {
                                if (!s)
                                    for (s = {}; t = Nn.exec(a); )
                                        s[t[1].toLowerCase()] = t[2];
                                t = s[e.toLowerCase()]
                            }
                            return null  == t ? null  : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === w ? a : null 
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return w || (e = b[n] = b[n] || e,
                            y[e] = t),
                            this
                        },
                        overrideMimeType: function(e) {
                            return w || (p.mimeType = e),
                            this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > w)
                                    for (t in e)
                                        v[t] = [v[t], e[t]];
                                else
                                    x.always(e[x.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || N;
                            return o && o.abort(t),
                            r(0, t),
                            this
                        }
                    };
                    if (m.promise(x).complete = g.add,
                    x.success = x.done,
                    x.error = x.fail,
                    p.url = ((t || p.url || gn.href) + "").replace(bn, "").replace(Pn, gn.protocol + "//"),
                    p.type = n.method || n.type || p.method || p.type,
                    p.dataTypes = it.trim(p.dataType || "*").toLowerCase().match(Nt) || [""],
                    null  == p.crossDomain) {
                        u = J.createElement("a");
                        try {
                            u.href = p.url,
                            u.href = u.href,
                            p.crossDomain = Sn.protocol + "//" + Sn.host != u.protocol + "//" + u.host
                        } catch (M) {
                            p.crossDomain = !0
                        }
                    }
                    if (p.data && p.processData && "string" != typeof p.data && (p.data = it.param(p.data, p.traditional)),
                    z(kn, p, n, x),
                    2 === w)
                        return x;
                    c = it.event && p.global,
                    c && 0 === it.active++ && it.event.trigger("ajaxStart"),
                    p.type = p.type.toUpperCase(),
                    p.hasContent = !Mn.test(p.type),
                    i = p.url,
                    p.hasContent || (p.data && (i = p.url += (yn.test(i) ? "&" : "?") + p.data,
                    delete p.data),
                    p.cache === !1 && (p.url = wn.test(i) ? i.replace(wn, "$1_=" + vn++) : i + (yn.test(i) ? "&" : "?") + "_=" + vn++)),
                    p.ifModified && (it.lastModified[i] && x.setRequestHeader("If-Modified-Since", it.lastModified[i]),
                    it.etag[i] && x.setRequestHeader("If-None-Match", it.etag[i])),
                    (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", p.contentType),
                    x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Tn + "; q=0.01" : "") : p.accepts["*"]);
                    for (f in p.headers)
                        x.setRequestHeader(f, p.headers[f]);
                    if (p.beforeSend && (p.beforeSend.call(d, x, p) === !1 || 2 === w))
                        return x.abort();
                    N = "abort";
                    for (f in {
                        success: 1,
                        error: 1,
                        complete: 1
                    })
                        x[f](p[f]);
                    if (o = z(Cn, p, n, x)) {
                        if (x.readyState = 1,
                        c && h.trigger("ajaxSend", [x, p]),
                        2 === w)
                            return x;
                        p.async && p.timeout > 0 && (l = e.setTimeout(function() {
                            x.abort("timeout")
                        }, p.timeout));
                        try {
                            w = 1,
                            o.send(y, r)
                        } catch (M) {
                            if (!(2 > w))
                                throw M;
                            r(-1, M)
                        }
                    } else
                        r(-1, "No Transport");
                    return x
                },
                getJSON: function(e, t, n) {
                    return it.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return it.get(e, void 0, t, "script")
                }
            }),
            it.each(["get", "post"], function(e, t) {
                it[t] = function(e, n, r, o) {
                    return it.isFunction(n) && (o = o || r,
                    r = n,
                    n = void 0),
                    it.ajax(it.extend({
                        url: e,
                        type: t,
                        dataType: o,
                        data: n,
                        success: r
                    }, it.isPlainObject(e) && e))
                }
            }),
            it._evalUrl = function(e) {
                return it.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }
            ,
            it.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return it.isFunction(e) ? this.each(function(t) {
                        it(this).wrapAll(e.call(this, t))
                    }) : (this[0] && (t = it(e, this[0].ownerDocument).eq(0).clone(!0),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t.map(function() {
                        for (var e = this; e.firstElementChild; )
                            e = e.firstElementChild;
                        return e
                    }).append(this)),
                    this)
                },
                wrapInner: function(e) {
                    return it.isFunction(e) ? this.each(function(t) {
                        it(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = it(this)
                          , n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = it.isFunction(e);
                    return this.each(function(n) {
                        it(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        it.nodeName(this, "body") || it(this).replaceWith(this.childNodes)
                    }).end()
                }
            }),
            it.expr.filters.hidden = function(e) {
                return !it.expr.filters.visible(e)
            }
            ,
            it.expr.filters.visible = function(e) {
                return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
            }
            ;
            var jn = /%20/g
              , $n = /\[\]$/
              , En = /\r?\n/g
              , An = /^(?:submit|button|image|reset|file)$/i
              , Dn = /^(?:input|select|textarea|keygen)/i;
            it.param = function(e, t) {
                var n, r = [], o = function(e, t) {
                    t = it.isFunction(t) ? t() : null  == t ? "" : t,
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                }
                ;
                if (void 0 === t && (t = it.ajaxSettings && it.ajaxSettings.traditional),
                it.isArray(e) || e.jquery && !it.isPlainObject(e))
                    it.each(e, function() {
                        o(this.name, this.value)
                    });
                else
                    for (n in e)
                        V(n, e[n], t, o);
                return r.join("&").replace(jn, "+")
            }
            ,
            it.fn.extend({
                serialize: function() {
                    return it.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = it.prop(this, "elements");
                        return e ? it.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !it(this).is(":disabled") && Dn.test(this.nodeName) && !An.test(e) && (this.checked || !Dt.test(e))
                    }).map(function(e, t) {
                        var n = it(this).val();
                        return null  == n ? null  : it.isArray(n) ? it.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(En, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(En, "\r\n")
                        }
                    }).get()
                }
            }),
            it.ajaxSettings.xhr = function() {
                try {
                    return new e.XMLHttpRequest
                } catch (t) {}
            }
            ;
            var On = {
                0: 200,
                1223: 204
            }
              , qn = it.ajaxSettings.xhr();
            rt.cors = !!qn && "withCredentials" in qn,
            rt.ajax = qn = !!qn,
            it.ajaxTransport(function(t) {
                var n, r;
                return rt.cors || qn && !t.crossDomain ? {
                    send: function(o, i) {
                        var a, s = t.xhr();
                        if (s.open(t.type, t.url, t.async, t.username, t.password),
                        t.xhrFields)
                            for (a in t.xhrFields)
                                s[a] = t.xhrFields[a];
                        t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                        t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                        for (a in o)
                            s.setRequestHeader(a, o[a]);
                        n = function(e) {
                            return function() {
                                n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null ,
                                "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(On[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                    binary: s.response
                                } : {
                                    text: s.responseText
                                }, s.getAllResponseHeaders()))
                            }
                        }
                        ,
                        s.onload = n(),
                        r = s.onerror = n("error"),
                        void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                            4 === s.readyState && e.setTimeout(function() {
                                n && r()
                            })
                        }
                        ,
                        n = n("abort");
                        try {
                            s.send(t.hasContent && t.data || null )
                        } catch (l) {
                            if (n)
                                throw l
                        }
                    },
                    abort: function() {
                        n && n()
                    }
                } : void 0
            }),
            it.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return it.globalEval(e),
                        e
                    }
                }
            }),
            it.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET")
            }),
            it.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function(r, o) {
                            t = it("<script>").prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function(e) {
                                t.remove(),
                                n = null ,
                                e && o("error" === e.type ? 404 : 200, e.type)
                            }
                            ),
                            J.head.appendChild(t[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
                }
            });
            var Ln = []
              , Hn = /(=)\?(?=&|$)|\?\?/;
            it.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = Ln.pop() || it.expando + "_" + vn++;
                    return this[e] = !0,
                    e
                }
            }),
            it.ajaxPrefilter("json jsonp", function(t, n, r) {
                var o, i, a, s = t.jsonp !== !1 && (Hn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Hn.test(t.data) && "data");
                return s || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = it.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                s ? t[s] = t[s].replace(Hn, "$1" + o) : t.jsonp !== !1 && (t.url += (yn.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
                t.converters["script json"] = function() {
                    return a || it.error(o + " was not called"),
                    a[0]
                }
                ,
                t.dataTypes[0] = "json",
                i = e[o],
                e[o] = function() {
                    a = arguments
                }
                ,
                r.always(function() {
                    void 0 === i ? it(e).removeProp(o) : e[o] = i,
                    t[o] && (t.jsonpCallback = n.jsonpCallback,
                    Ln.push(o)),
                    a && it.isFunction(i) && i(a[0]),
                    a = i = void 0
                }),
                "script") : void 0
            }),
            rt.createHTMLDocument = function() {
                var e = J.implementation.createHTMLDocument("").body;
                return e.innerHTML = "<form></form><form></form>",
                2 === e.childNodes.length
            }(),
            it.parseHTML = function(e, t, n) {
                if (!e || "string" != typeof e)
                    return null ;
                "boolean" == typeof t && (n = t,
                t = !1),
                t = t || (rt.createHTMLDocument ? J.implementation.createHTMLDocument("") : J);
                var r = ht.exec(e)
                  , o = !n && [];
                return r ? [t.createElement(r[1])] : (r = p([e], t, o),
                o && o.length && it(o).remove(),
                it.merge([], r.childNodes))
            }
            ;
            var In = it.fn.load;
            it.fn.load = function(e, t, n) {
                if ("string" != typeof e && In)
                    return In.apply(this, arguments);
                var r, o, i, a = this, s = e.indexOf(" ");
                return s > -1 && (r = it.trim(e.slice(s)),
                e = e.slice(0, s)),
                it.isFunction(t) ? (n = t,
                t = void 0) : t && "object" == typeof t && (o = "POST"),
                a.length > 0 && it.ajax({
                    url: e,
                    type: o || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    i = arguments,
                    a.html(r ? it("<div>").append(it.parseHTML(e)).find(r) : e)
                }).always(n && function(e, t) {
                    a.each(function() {
                        n.apply(a, i || [e.responseText, t, e])
                    })
                }
                ),
                this
            }
            ,
            it.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                it.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }),
            it.expr.filters.animated = function(e) {
                return it.grep(it.timers, function(t) {
                    return e === t.elem
                }).length
            }
            ,
            it.offset = {
                setOffset: function(e, t, n) {
                    var r, o, i, a, s, l, u, c = it.css(e, "position"), f = it(e), p = {};
                    "static" === c && (e.style.position = "relative"),
                    s = f.offset(),
                    i = it.css(e, "top"),
                    l = it.css(e, "left"),
                    u = ("absolute" === c || "fixed" === c) && (i + l).indexOf("auto") > -1,
                    u ? (r = f.position(),
                    a = r.top,
                    o = r.left) : (a = parseFloat(i) || 0,
                    o = parseFloat(l) || 0),
                    it.isFunction(t) && (t = t.call(e, n, it.extend({}, s))),
                    null  != t.top && (p.top = t.top - s.top + a),
                    null  != t.left && (p.left = t.left - s.left + o),
                    "using" in t ? t.using.call(e, p) : f.css(p)
                }
            },
            it.fn.extend({
                offset: function(e) {
                    if (arguments.length)
                        return void 0 === e ? this : this.each(function(t) {
                            it.offset.setOffset(this, e, t)
                        });
                    var t, n, r = this[0], o = {
                        top: 0,
                        left: 0
                    }, i = r && r.ownerDocument;
                    if (i)
                        return t = i.documentElement,
                        it.contains(t, r) ? (o = r.getBoundingClientRect(),
                        n = G(i),
                        {
                            top: o.top + n.pageYOffset - t.clientTop,
                            left: o.left + n.pageXOffset - t.clientLeft
                        }) : o
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = this[0], r = {
                            top: 0,
                            left: 0
                        };
                        return "fixed" === it.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(),
                        t = this.offset(),
                        it.nodeName(e[0], "html") || (r = e.offset()),
                        r.top += it.css(e[0], "borderTopWidth", !0),
                        r.left += it.css(e[0], "borderLeftWidth", !0)),
                        {
                            top: t.top - r.top - it.css(n, "marginTop", !0),
                            left: t.left - r.left - it.css(n, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && "static" === it.css(e, "position"); )
                            e = e.offsetParent;
                        return e || Kt
                    })
                }
            }),
            it.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = "pageYOffset" === t;
                it.fn[e] = function(r) {
                    return Mt(this, function(e, r, o) {
                        var i = G(e);
                        return void 0 === o ? i ? i[t] : e[r] : (i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : e[r] = o,
                        void 0)
                    }, e, r, arguments.length)
                }
            }),
            it.each(["top", "left"], function(e, t) {
                it.cssHooks[t] = T(rt.pixelPosition, function(e, n) {
                    return n ? (n = C(e, t),
                    Jt.test(n) ? it(e).position()[t] + "px" : n) : void 0
                })
            }),
            it.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                it.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, r) {
                    it.fn[r] = function(r, o) {
                        var i = arguments.length && (n || "boolean" != typeof r)
                          , a = n || (r === !0 || o === !0 ? "margin" : "border");
                        return Mt(this, function(t, n, r) {
                            var o;
                            return it.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement,
                            Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? it.css(t, n, a) : it.style(t, n, r, a)
                        }, t, i ? r : void 0, i, null )
                    }
                })
            }),
            it.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null , t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null , t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                },
                size: function() {
                    return this.length
                }
            }),
            it.fn.andSelf = it.fn.addBack,
            "function" == typeof define && define.amd && define("jquery", [], function() {
                return it
            });
            var _n = e.jQuery
              , Fn = e.$;
            return it.noConflict = function(t) {
                return e.$ === it && (e.$ = Fn),
                t && e.jQuery === it && (e.jQuery = _n),
                it
            }
            ,
            t || (e.jQuery = e.$ = it),
            it
        })
    }
    , {}],
    73: [function(e, t) {
        !function(e) {
            "use strict";
            function n(e, t) {
                return -1 !== e.indexOf(t, e.length - t.length)
            }
            function r() {}
            function o(e, t) {
                function l(e, t) {
                    return x.push(e),
                    M.push(t),
                    k != s && (k = s,
                    setTimeout(function() {
                        u()
                    }, 0)),
                    h
                }
                function u() {
                    if (k != s)
                        return k = i,
                        C(e),
                        C = r,
                        void 0;
                    if (++P == x.length) {
                        if (!m)
                            return P = x.length - 1,
                            k = i,
                            void 0;
                        P = 0
                    }
                    x[P].apply(null , [].concat(u, M[P]))
                }
                function c(t, n, r) {
                    var o = n.length;
                    return o ? (function i(a) {
                        setTimeout(function() {
                            N(e, w(e) + n[a]),
                            a += 1,
                            o > a ? i(a) : t()
                        }, r)
                    }(0),
                    void 0) : t()
                }
                function f(t, r, o) {
                    var i = w(e)
                      , a = i.length;
                    return null  != r && ("string" == typeof r ? a = n(i, r + b) ? r.length + b.length : 0 : r > -1 && (a = Math.min(r, a))),
                    a ? (function s(n) {
                        setTimeout(function() {
                            var r = w(e);
                            n ? (N(e, r.substring(0, r.length - 1)),
                            s(n - 1)) : t()
                        }, o)
                    }(a),
                    void 0) : t()
                }
                function p(t) {
                    N(e, ""),
                    t()
                }
                function d(t, n) {
                    n.call(t, e)
                }
                var h = this;
                if (!(h instanceof o))
                    return new o(e,t);
                t = t || {};
                var m = t.loop
                  , g = t.speed || t.typeSpeed || 50
                  , v = t.speed || t.deleteSpeed || 50
                  , y = t.delay || t.pauseDelay || 2e3
                  , b = t.postfix || ""
                  , w = t.getter || function(e) {
                    return e.innerHTML
                }
                  , N = t.setter || function(e, t) {
                    e.innerHTML = t
                }
                  , x = []
                  , M = []
                  , P = -1
                  , k = i
                  , C = r;
                h.type = function(e, t) {
                    return l(c, [e + b, t || g])
                }
                ,
                h.delete = function(e, t) {
                    return l(f, [e, t || v])
                }
                ,
                h.clear = function() {
                    return l(p)
                }
                ,
                h.pause = function(e) {
                    return l(setTimeout, [e || y])
                }
                ,
                h.call = function(e) {
                    return l(d, [e])
                }
                ,
                h.triggerPause = function(e) {
                    return k = a,
                    C = e || r,
                    h
                }
                ,
                h.triggerResume = function() {
                    if (k != s) {
                        var e = k;
                        k = s,
                        e == i && u()
                    }
                    return h
                }
                ,
                h.isRunning = function() {
                    return k != i
                }
            }
            var i = 0
              , a = 1
              , s = 2;
            "object" == typeof t ? t.exports = o : e.malarkey = o
        }(this)
    }
    , {}],
    74: [function(e, t) {
        function n(e, t, n) {
            return e.addEventListener ? e.addEventListener(t, n, !1) : (e.attachEvent("on" + t, n),
            void 0)
        }
        function r(e) {
            return "keypress" == e.type ? String.fromCharCode(e.which) : N[e.which] ? N[e.which] : x[e.which] ? x[e.which] : String.fromCharCode(e.which).toLowerCase()
        }
        function o(e) {
            var t = e.target || e.srcElement
              , n = t.tagName;
            return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == n || "SELECT" == n || "TEXTAREA" == n || t.contentEditable && "true" == t.contentEditable
        }
        function i(e, t) {
            return e.sort().join(",") === t.sort().join(",")
        }
        function a(e) {
            e = e || {};
            var t, n = !1;
            for (t in T)
                e[t] ? n = !0 : T[t] = 0;
            n || (j = !1)
        }
        function s(e, t, n, r, o) {
            var a, s, l = [];
            if (!k[e])
                return [];
            for ("keyup" == n && p(e) && (t = [e]),
            a = 0; a < k[e].length; ++a)
                s = k[e][a],
                s.seq && T[s.seq] != s.level || n == s.action && ("keypress" == n || i(t, s.modifiers)) && (r && s.combo == o && k[e].splice(a, 1),
                l.push(s));
            return l
        }
        function l(e) {
            var t = [];
            return e.shiftKey && t.push("shift"),
            e.altKey && t.push("alt"),
            e.ctrlKey && t.push("ctrl"),
            e.metaKey && t.push("meta"),
            t
        }
        function u(e, t) {
            e(t) === !1 && (t.preventDefault && t.preventDefault(),
            t.stopPropagation && t.stopPropagation(),
            t.returnValue = !1,
            t.cancelBubble = !0)
        }
        function c(e, t) {
            if (!o(t)) {
                var n, r = s(e, l(t), t.type), i = {}, c = !1;
                for (n = 0; n < r.length; ++n)
                    r[n].seq ? (c = !0,
                    i[r[n].seq] = 1,
                    u(r[n].callback, t)) : c || j || u(r[n].callback, t);
                t.type != j || p(e) || a(i)
            }
        }
        function f(e) {
            e.which = "number" == typeof e.which ? e.which : e.keyCode;
            var t = r(e);
            if (t)
                return "keyup" == e.type && S == t ? (S = !1,
                void 0) : (c(t, e),
                void 0)
        }
        function p(e) {
            return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e
        }
        function d() {
            clearTimeout(w),
            w = setTimeout(a, 1e3)
        }
        function h() {
            if (!b) {
                b = {};
                for (var e in N)
                    e > 95 && 112 > e || N.hasOwnProperty(e) && (b[N[e]] = e)
            }
            return b
        }
        function m(e, t, n) {
            return n || (n = h()[e] ? "keydown" : "keypress"),
            "keypress" == n && t.length && (n = "keydown"),
            n
        }
        function g(e, t, n, o) {
            T[e] = 0,
            o || (o = m(t[0], []));
            var i, s = function() {
                j = o,
                ++T[e],
                d()
            }
            , l = function(e) {
                u(n, e),
                "keyup" !== o && (S = r(e)),
                setTimeout(a, 10)
            }
            ;
            for (i = 0; i < t.length; ++i)
                v(t[i], i < t.length - 1 ? s : l, o, e, i)
        }
        function v(e, t, n, r, o) {
            e = e.replace(/\s+/g, " ");
            var i, a, l, u = e.split(" "), c = [];
            if (u.length > 1)
                return g(e, u, t, n);
            for (l = "+" === e ? ["+"] : e.split("+"),
            i = 0; i < l.length; ++i)
                a = l[i],
                P[a] && (a = P[a]),
                n && "keypress" != n && M[a] && (a = M[a],
                c.push("shift")),
                p(a) && c.push(a);
            n = m(a, c, n),
            k[a] || (k[a] = []),
            s(a, c, n, !r, e),
            k[a][r ? "unshift" : "push"]({
                callback: t,
                modifiers: c,
                action: n,
                seq: r,
                level: o,
                combo: e
            })
        }
        function y(e, t, n) {
            for (var r = 0; r < e.length; ++r)
                v(e[r], t, n)
        }
        for (var b, w, N = {
            8: "backspace",
            9: "tab",
            13: "enter",
            16: "shift",
            17: "ctrl",
            18: "alt",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "ins",
            46: "del",
            91: "meta",
            93: "meta",
            224: "meta"
        }, x = {
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        }, M = {
            "~": "`",
            "!": "1",
            "@": "2",
            "#": "3",
            $: "4",
            "%": "5",
            "^": "6",
            "&": "7",
            "*": "8",
            "(": "9",
            ")": "0",
            _: "-",
            "+": "=",
            ":": ";",
            '"': "'",
            "<": ",",
            ">": ".",
            "?": "/",
            "|": "\\"
        }, P = {
            option: "alt",
            command: "meta",
            "return": "enter",
            escape: "esc"
        }, k = {}, C = {}, T = {}, S = !1, j = !1, $ = 1; 20 > $; ++$)
            N[111 + $] = "f" + $;
        for ($ = 0; 9 >= $; ++$)
            N[$ + 96] = $;
        n(document, "keypress", f),
        n(document, "keydown", f),
        n(document, "keyup", f);
        var E = {
            bind: function(e, t, n) {
                return y(e instanceof Array ? e : [e], t, n),
                C[e + ":" + n] = t,
                this
            },
            unbind: function(e, t) {
                return C[e + ":" + t] && (delete C[e + ":" + t],
                this.bind(e, function() {}, t)),
                this
            },
            trigger: function(e, t) {
                return C[e + ":" + t](),
                this
            },
            reset: function() {
                return k = {},
                C = {},
                this
            }
        };
        t.exports = E
    }
    , {}],
    75: [function(e, t) {
        t.exports = ["N00b Pwn M3", "N00b's Programming Machine", "Naan and Paneer Makhani", "Naboo's Podracing Misadventure", "Nacho Pace Maker", "Nacho Pizza Marinade", "Nacho Portion Monitor", "Nacho Portmanteau Meltdown", "Nacho Printing Machine", "Nachos Pillage Milwaukee", "Nagging Penguin Matriarchs", "Nail Polish Makeover", "Nail Polishing Minions", "Naive Puppets Marching", "Naivete Precedes Misrepresentation", "Naked Panda Meditations", "Namby Pamby Magicians", "Name Picker Malfunction", "Named Pipe Mechanism", "Nameless Package Manager", "Namely, Pickled Meatballs", "Namespace Pollution Mechanism", "Namespace, Primitive, Method", "Namibian Pyjama Merchant", "Naming Prosecution Mitigator", "NaN Producing Misery", "Nana Plays Minesweeper", "Nanananananananana.. Pat Man!", "Nancy's Preferred Machete", "Nanobots Producing Megastructures", "Nanometer Process Machine", "Nanoprogrammed Penultimate Musicianship", "Nanoscale Parts Manufacturing", "Nanotech Parading Mars", "Nanotechnology Promises Much", "Nap Power: Maximum", "Napolean Paced Mischeviously", "Napoleonic Panda Machine", "Napping Panda Missionaries", "Napping Peanut Monsters", "Naps Per Month", "Narcissistic Passion Minified", "Narcissistic Piano Mover", "Narcissistic Pickle Meister", "Narcissistic, Perfectly Modest", "Narcoleptic Pasta Manufacturer", "Narcoleptic Pony Machine", "Narcoleptic Possum Mob", "Narcoleptic Programmers' Medicine", "Narcoleptic's Patch Mangler", "Narnia Protect Me", "Narnia's Poofy Meatcleaver", "Narrating Prophetic Monks", "Narwhal Parade Maestro", "Narwhals Playing Mahjong", "Narwhals Poke Mammals", "Nary a Package Missing", "NASA Proceeds to Mars", "NASA: Pluto Matters!", "Nasal Pathway Melodrama", "Nascent Personality Manifestation", "Nascent Plasticine Materialist", "Nascent Prototype Metaverse", "Nashville Plays Music", "Nasty Polka Music", "Nasty Popsicle Machine", "National Palace Museum", "National Park of Minnesota", "National Party Month", "National Patience Month", "National Pest Management", "National Poetry Month", "National Public Mania", "Nationwide Polygamous Matrimony", "Native Package Manager", "Native Papuan Masks", "Natively Pronounced Mandarin", "Nattily Primped Monster", "Natural Pacifist Manatees", "Natural Performance Manager", "Natural Pleistocene Monsters", "Natural Polyglot Machine", "Natural Potato Magnet", "Natural Preference for Minification", "Natural Push Machine", "Naturally Pacifist Marsupials", "Naturally Produced Modules", "Nature Preceded Machines", "Naughty Panda Manga", "Naughty Pinching Mannequins", "Naughty Platypus Memorabilia", "Naughty Praying Mantis", "Naughty Program Manipulator", "Naughty Programmer's Madness", "Naughty Pterodactyl Maid", "Naughty Push Message", "Nauseating Packaged Meat", "Nautical Pea Maker", "Nautical Pirate Moustache", "Nautical Poseidon Mythology", "Nautilus: Pelagic Mollusc", "Naval Pilgrim's Mayflower", "Navel Piercing Madness", "Navy Penguin Mariachi", "Naysayers Promote Misery", "Ne Pas Manger!", "Neanderthals Paint Mammals", "Neanderthals Programming Machines", "Neapolitan Pasta Maker", "Near Perfect Mood", "Nearly Past Midnight", "Nearly Perfect Mediocracy", "Nearly Picked Makefiles", "Nearly Pooped Myself", "Nearly-Pickled Module", "Nearsighted Paramecium Multiverse", "Neat Paraskavedekatriaphobia's Meaning", "Neat! Pickled Muskrat!", "Neatly Packaged Magic", "Neatly Packaged Modules", "Neatly Placed Mail", "Neatly Positioned Magazines", "Neatly Prepared Mustache", "Neatly Punctuated Musings", "Neato Polyester Material", "Nebulae Populate M83", "Nebulous Program Mechanic", "Nebulous Puffy Marshmallows", "Necessitates Proper Modularity", "Neckbeard Party Materials", "Necromancers Playing MTG", "Necrotizing Pineapple Music", "Nectar of the Programming Masses", "Need Package Maintenance", "Need Pray More", "Need Private Modules", "Need Prize Money", "Needle-Pinpointing Machine", "Needless Pachouli Manufacture", "Needlessly Postulating Minds", "Needlessly Promiscuous, Modularize!", "Needlessly Provoking Marsupials", "Needs Perl Modules", "Needs Puma Managers", "Needy Poetic Mothers", "Nefarious Planetary Meddling", "Nefarious Punk Monk", "Nefariously Programmed Mecha", "Negatively Proportional Model", "Negatory. Postpone Mission.", "Neglected Parking Meter", "Neglected Pulse Machine", "Negligent Pachinko Machine", "Negligible Participation Metric", "Negotiable Paleobotanist Missions", "Neigh Purr Moo", "Neighbor's Preppy Maltese", "Neighborly Package Megalodon", "Neighbourhood Party Manager", "Neil Patrick's Mansion", "Nemo's Parental Misguidance", "Neo's Personal Matrix", "Neoanthropic Preternatural Murmurings", "Neoclassical Piano Montage", "Neoclassical Programming Multitude", "Neocon Propaganda Machine", "Neodymium Plated Magnet", "Neolithic Programming Machine", "Neologistic Paraphasic Mumbling", "Neon Papier Mâché", "Neophobe Plebeian Mumpsimus", "Neopolitan Pizza Maker", "Neoteric Plumbing Mishap", "Neovictorian Paisley Menswear", "Nepotistic Pontifex Maximus", "Neptune's Personal Maid", "Neptunium, Promethium, Manganese", "Nerd Party Madness", "Nerd Play Mate", "Nerdiest Political Manifesto", "Nerdiest Precious Modules", "Nerds Pledge Magnanimously", "Nerds Produce Money", "Nerds Publishing Monstrosities", "Nerdy People Matriculate", "Nerdy Programmers Mingling", "Nerdy Pun Mavens", "Nerfing Powerful Megalomaniacs", "Nero Punished Miscreants", "Nervous Parrot Muttering", "Nestable Processes Mutate", "Nested Parenthetical Madness", "Nested Public Modules", "Net Possibility Multiplier", "Neti Pot Manufacturer", "Nettle Pie Market", "Network Pipe Manufacturer", "Network Printer Manager", "Neural Prediction Model", "Neural Processing Mechanisms", "Neurological Phenomenon Multiplexer", "Neurophysiologically Pseudoscientific Manatee", "Neurotic Pantaloon Maker", "Neurotic Pink Mongooses", "Neurotoxin Powered Marketing", "Neutered Paranoid Meerkat", "Neutral Point Measurement", "Neutral Pork Motel", "Neutralize Pesky Miscreants", "Neutrino Packing Machine", "Neutron Polarization Manipulator", "Never Paint Mohawks", "Never Panic Much", "Never Pay your Mortgage", "Never Perfectly Managed", "Never Pet Marmots", "Never Pet Mermaids", "Never Play Matchmaker", "Never Poke Monkeys", "Never Post Memes", "Never Prank Me", "Never Print Magazines", "Never Program Mad", "Never Propel Marmalade", "Never Publish Malarkey", "Never Pummel Muskoxen", "Never Punch Manticores", "Never Push Mistakes", "Never Push to Master", "Neverending Package Mountain", "Neverending Perpetual Motion", "Neverending Plethora of Modules", "Neverending Programming Mistakes", "Neverending Prototype Mode", "Neverending Pun Machine", "Nevertheless Published Mine", "New Package Monster", "New Patch, Merge?", "New Personal Mail", "New Phone Models", "New Power Management", "New Power Manual", "New Powerful Machines", "New Prague, Minnesota", "New Pretend Meaning", "New Priority Mail", "New Programs Makers", "New Project, Monday", "New Purple Moon", "Newbie Paintball Master", "Newbies Pass Muster", "Newfangled Package Modernizer", "Newline Pending Merge", "Newline Proliferating Maniac", "Newly Paranoid Maintainers", "Newly Potted Mandrakes", "Newly Practicing Mortician", "Newly Pregnant Mom", "Newly Purchased Memories", "Newlywed Party Monsters", "Newton's Programmatic Measurements", "Newtonian Particle Motion", "Newts Parading Majestically", "Newts Prefer MS-DOS", "Next Perpendicular Moonlanding", "Next Phenomenal Microbrewery", "Next Popular Module", "Next Prince Montage", "next() Packaged Middleware", "Nibble Plum Meringue", "Nicaragua's Pet Mice", "Nice Package, Mate", "Nice Paintings, Mondrian", "Nice Pants, Man", "Nice Parakeet Marriage", "Nice People Matter", "Nice Philanthropist Metalhead", "Nice Pithy Motto", "Nice Poodle, Mister", "Nice Pottery Mug", "Nicely Packaged Make", "Nicely Pointed Mandibles", "Nicely Presented Misnomer", "Nicer Package Manager", "Nicer Perusal Method", "Niche Portobello Mushroom", "Nickel Palladium Manganese", "Nickel Plated Moose", "Nickelback Plays Music", "Nietzsche's Preposterous Moustache", "Nifty Pony Merchandise", "Nifty Poutine Meal", "Nifty Procrastination Machine", "Nifty Pun Master", "Nifty Purring Manticore", "Nigerian Prince Meme", "Niggling Pant Monkey", "Nightclub Party Music", "Nightingale Posing Mischievously", "Nightly Panic Munchies", "Nightly Patch Machine", "Nightly Perpetrated Mischief", "Nightly Piano Man", "Nightly Punk Masters", "Nights Pay More", "Nighttime Peanut Migrations", "Nighttime Possum Meandering", "Nihilist Pocket Monsters", "Nihilist Postmodern Mistake", "Nil Packet Minimizer", "Nimble Package Maestros", "Nimble Pirate Monitor", "Nimble Pixie Merchant", "Nimble Polyglot Microcosm", "Nimoy Prospers Mystically", "Nincompoops Producing Methane", "Nine Parsecs from Milwaukee", "Nine Pedestrians Mesmerized", "Nine Percent Milk", "Nine Point Mulligan", "Nine Pomeranian Monsters", "Nine Post Meridiem", "Nine Putrid Mangos", "Nineteen Poor Moths", "Nineties Party Mix", "Ninety Percent Muffin", "Ninja Parading Musically", "Ninja Pokémon Master", "Ninja Programmers Mindmeld", "Ninja Pumpkin Mutants", "Ninjas Practicing Multidimensionality", "Nirvana Playing Madonna", "Nitrate Processed Mincemeat", "Nitrogen Poisonous Monoxide", "Nitrogenous Polymorphic Molecule", "Nixon's Pants Missing", "No Package Mishaps", "No Packages Misplaced", "No Packages, Mate", "No Padding Margin", "No Painful Merges", "No Pants Monkey", "No Pants, Mom", "No Particular Method", "No Partying Mariachis", "No Password Management", "No Plugins; Monolithic", "No Points Made", "No Possible Meaning", "No Potty Mouths", "No Prejudice Makers", "No Princess, Mario", "No Prize Money", "No Problem Man", "No Problem Mate", "No Problem, Meatbag", "No Problemo Muchacho", "No Proscribed Meaning", "No Punches Made", "No Puns Monday", "No Purchase Made", "No! Primate Mutation!", "No, Pay Me", "Noah's Pairwise Manifest", "Nobel Prize Magnet", "Noble Programming Mantra", "Nobody Packages More", "Nobody Pays (for) Magazines", "Nobody Peels Mangoes", "Nobody Picked Me", "Nobody Prefers Margarine", "Nobody Preheats Microwaves", "Nobody Publish Monsters", "Nobody's Perfect, Man", "Noctiflorous Pansy Mulch", "Nocturnal Parakeet Monitor", "Nocturnal Practitioners of Magic", "Nocturnal Programmer's Machine", "Nocturnally Psychologizing Millipede", "Node Package Maid", "Node Package Manager", "Node Package Master", "Node Packaged Masterfully", "Node Packaged Modules", "Node Parcel Merchant", "Node People Magic", "Node Pizza Maker", "Node Pleases Me", "Node Plus Me", "Node Popular Man", "Node Promiscuous Modules", "Node's Package Magician", "Node's Perpetuum Mobile", "Node's Personal Monk", "Node's Play Mate", "Node's Pocket Monsters", "Node's Power Meal", "Nodes Per Minute", "Nodeschool Public Materials", "Noiseless Party Machine", "Noiseless Peaceful Morning", "Noisy Pillaging Monster", "Noisy Pneumatic Mnemonic", "Noisy Pop Music", "nom, please more", "Nomad Packaging Mechanism", "Nomenclature Processing Machine", "Nominal Pizza Masticator", "Nominally Patriotic Meathead", "Nomming Peanut M&M's", "Nomnom Pumpernickle Muffins", "Non Polar Magnetism", "Non Productive Monday", "Non Programming Manager", "Non-Permeable Membrane", "Non-Polite Mother", "Non-Polynomial Mantissa", "Non-Potable Macchiato", "Non-Printable Material", "Nonagons Please Me", "Nonchalantly Performs Magic", "Noncollinear Perpendicular Microcrystalline", "Noncommital Premarital Mischief", "Nonconformist Propaganda Machine", "Nondeterministic Palindrome Machine", "Nondeterministic Polynomial Munchies", "Nondeterministic Postrequisite Metaprotocol", "Nondeterministic Programming Methodology", "Nondigestible Purple Mayonnaise", "Nonflavored Prescription Medicine", "Nonlinear Performance Magnification", "Nonlinear Programming Methods", "Nonsense Placement Mandatory", "Nonsense Poetry Manager", "Nonstop Pajama Models", "Nonstop Pet Mewing", "Nonstop Progressive Marxism", "Nonviolent Pigeon Manifestation", "Nonvoluntary Professional Mangling", "Noodle Printing Machine", "Noodly Pasta Maker", "noop(); pop(); map();", "Noosphere Possibilities Maximized", "Normal People, MMM!", "Normal Programming Mistake", "Normally Palatable Mango", "Normally Pleasant Mixture", "Norse Polytheistic Mythology", "North Pittsburgh Meatpackers", "North Pole Merriment", "Northern Pileated Marmoset", "Norvell's Public Machinations", "Norvell, Please Merge", "Norwegian Parcel Mail", "Norwegian Peat Moss", "Norwegian Polka Music", "Norwegian Pony Master", "Nose Picker's Maven", "Nosey Party Murderer", "Nostalgic Perogi Monogramming", "Nostalgic Piano Music", "Nostalgic Pickled Mango", "Nostalgic Pizza Manager", "Nostalgic Primordial Monster", "Nostradamus Predicting Maelstroms", "Nosy Pinocchio Manners", "Not a Package Manager", "Not a Penny More", "Not a Propaganda Machine", "Not Pancake Mix", "Not Parents' Money", "Not Particularly Meaningful", "Not Pictured: Mangoes", "Not Preposterously Macho", "Not Providing Milkshakes", "Notable Pastry Maker", "Notable Peru Mariachis", "Notable Pottery Manufacturer", "Notable Pseudocode Mashups", "Notably Polite Mariner", "Notary Public Mystifier", "Note: Purchase Milk", "Notebook Page Margin", "Noteworthy Programming Masterpiece", "Noteworthy Programs Map", "Nothing Pleases Me", "Nothing Plus Modules", "Nothing Prevents Misery", "Nothing's plumb meaningless", "Noticeably Playful Monkeys", "Notify President Madagascar", "Notorious Penguin Magicians", "Notorious Public Menace", "Notorious Pug Mafia", "Nougat Predominant Middleware", "Noun/Pronoun Mix-up", "Nourished Personal Mucus", "Nouveau Papier Mâché", "Nouveau Print Maker", "Novel Personal Mantras", "Novel Planetary Movement", "Novelty Palliates Malaise", "Novelty Plastic Moustache", "Novelty Polygonal Mathematics", "November Perfect Moustache", "November's Paddleball Marathon", "Novice Prime Minister", "Novice, Paragon, Master", "Novices Performing Miracles", "Now Package More", "Now Packing Magic", "Now Particularly Misnamed", "Now Playing Mario", "Now Playing Mathcore", "Now Printing Money", "Now, Please Meander", "Now, Publish Me", "Now, Push Me", "Noxious Plant Miasma", "npm packaged modules", "npm pretty much", "npm private modules", "npm promotes metadefinitions", "npm promulgates marsupials", "npm provides modules", "npm's pretty magical", "npm: package manager", "npm: possibly marvellous", "NTFS Path Mockery", "Nth Permutation Mathematics", "Nth Phonetic Mnemonic", "Nth Power Matrix", "Nu Pop Metal", "Nuanced Pterodactyl Monk", "Nuclear Pizza Machine", "Nuclear Planning Manual", "Nuclear Power Manager", "Nuclear Powered Macros", "Nuclear Powered Mushroom", "Nuclear Pumpkin Mocha", "Nuclearly Potent Moonshine", "Nucleophosmin", "NuGet Package Manager", "Nukem's Possible Manifestation", "Null Pointer Micromanagement", "Null Pointer Missing", "Nullifying Precipitation Machine", "Numbers Prefer Multiplication", "Numeric Production Mechanism", "Numerous Packages Multiply", "Numerous Problems Multiplied", "Numerous Pulls Merged", "Numerous Pulsating Martians", "Nuns Playing Monopoly", "Nupital Pomp Mesmerises", "Nuptial Predicament Mediation", "Nurturing Palpable Magnificence", "Nurturing Pluto's Martians", "Nutella Peanut-Butter Marshmallow", "Nutella Per Minute", "Nutmeg Plundering Muse", "Nutrias Punching Marmots", "Nutrient Packed Morsels", "Nutritious Pomegranate Muffins", "Nutritious Pumpkin Meal", "Nutty Penguin Music", "Nutty Professor Movie", "Nutty Programming Men", "nuǝɯ pǝɥsᴉꞁod mǝu", "Nybble Processing Mainframe", "Nü Metal Provocateur"]
    }
    , {}],
    76: [function(e, t) {
        t.exports = function(e, t) {
            t || (t = {});
            var n = t.radix || "."
              , r = t.sep || ","
              , o = String(e).split(".")
              , i = o[0].replace(/(\d)(?=(\d{3})+$)/g, "$1" + r);
            return void 0 === o[1] ? i : i + n + o[1]
        }
    }
    , {}],
    77: [function(e, t) {
        "use strict";
        function n(e) {
            return e && e.rel
        }
        function r(e, t) {
            function n(n) {
                e[n] = l(t, {
                    rel: n
                })
            }
            return t.rel.split(/\s+/).forEach(n),
            e
        }
        function o(e, t) {
            var n = t.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
            return n && (e[n[1]] = n[2]),
            e
        }
        function i(e) {
            try {
                var t = e.split(";")
                  , n = t.shift().replace(/[<>]/g, "")
                  , r = s.parse(n)
                  , i = a.parse(r.query)
                  , u = t.reduce(o, {});
                return u = l(i, u),
                u.url = n,
                u
            } catch (c) {
                return null 
            }
        }
        var a = e("querystring")
          , s = e("url")
          , l = e("xtend");
        t.exports = function(e) {
            return e ? e.split(/,\s*</).map(i).filter(n).reduce(r, {}) : null 
        }
    }
    , {
        querystring: 43,
        url: 44,
        xtend: 78
    }],
    78: [function(e, t) {
        function n() {
            for (var e = {}, t = 0; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n)
                    r.call(n, o) && (e[o] = n[o])
            }
            return e
        }
        t.exports = n;
        var r = Object.prototype.hasOwnProperty
    }
    , {}],
    79: [function(e, t, n) {
        n.strftime = strftime = e("./strftime")
    }
    , {
        "./strftime": 80
    }],
    80: [function(e, t) {
        function n(e, t, n) {
            for ("undefined" == typeof n && (n = 10),
            t = t.toString(); parseInt(e, 10) < n && n > 1; n /= 10)
                e = t + e;
            return e.toString()
        }
        function r(e, t, r) {
            var o;
            if (!e)
                return "";
            if (t || (t = ""),
            r || (r = "en-US"),
            r = r.replace(/_/g, "-"),
            !s[r]) {
                console.warn("selected locale " + r + " not found, trying alternatives");
                var l = r.replace(/-[a-zA-Z]+$/, "");
                r = l in s ? l : "en",
                console.info("falling back to " + r)
            }
            o = s[r];
            var u = function(e, t) {
                var n = a[t];
                return "locale" === n ? o[t] : n
            }
              , c = function(r, a) {
                var s = i[a];
                return "string" == typeof s ? e[s]() : "function" == typeof s ? s.call(e, e, o) : s instanceof Array && "string" == typeof s[0] ? n(e[s[0]](), s[1]) : (console.warn("unrecognised replacement type, please file a bug (format: " + t + ")"),
                a)
            }
            ;
            for (t = t.replace(/%%/g, "%\b"); t.match(/%[cDFhnrRtTxX]/); )
                t = t.replace(/%([cDFhnrRtTxX])/g, u);
            var f = t.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ])/g, c);
            return f = f.replace("%\b", "%%"),
            u = c = void 0,
            f
        }
        function o(e, t, n) {
            n || (n = "en"),
            s[e] = t;
            for (k in s[n])
                k in t || (s[e][k] = s[n][k])
        }
        var i = {
            a: function(e, t) {
                return t.a[e.getDay()]
            },
            A: function(e, t) {
                return t.A[e.getDay()]
            },
            b: function(e, t) {
                return t.b[e.getMonth()]
            },
            B: function(e, t) {
                return t.B[e.getMonth()]
            },
            C: function(e) {
                return n(parseInt(e.getFullYear() / 100, 10), 0)
            },
            d: ["getDate", "0"],
            e: ["getDate", " "],
            g: function(e) {
                return n(parseInt(i.G(e) % 100, 10), 0)
            },
            G: function(e) {
                var t = e.getFullYear()
                  , n = parseInt(i.V(e), 10)
                  , r = parseInt(i.W(e), 10);
                return r > n ? t++ : 0 === r && n >= 52 && t--,
                t
            },
            H: ["getHours", "0"],
            I: function(e) {
                var t = e.getHours() % 12;
                return n(0 === t ? 12 : t, 0)
            },
            j: function(e) {
                var t = new Date("" + e.getFullYear() + "/1/1 GMT")
                  , r = new Date("" + e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() + " GMT")
                  , o = r - t
                  , i = parseInt(o / 6e4 / 60 / 24, 10) + 1;
                return n(i, 0, 100)
            },
            k: ["getHours", " "],
            l: function(e) {
                var t = e.getHours() % 12;
                return n(0 === t ? 12 : t, " ")
            },
            m: function(e) {
                return n(e.getMonth() + 1, 0)
            },
            M: ["getMinutes", "0"],
            p: function(e, t) {
                return t.p[e.getHours() >= 12 ? 1 : 0]
            },
            P: function(e, t) {
                return t.P[e.getHours() >= 12 ? 1 : 0]
            },
            s: function(e) {
                return parseInt(e.getTime() / 1e3, 10)
            },
            S: ["getSeconds", "0"],
            u: function(e) {
                var t = e.getDay();
                return 0 === t ? 7 : t
            },
            U: function(e) {
                var t = parseInt(i.j(e), 10)
                  , r = 6 - e.getDay()
                  , o = parseInt((t + r) / 7, 10);
                return n(o, 0)
            },
            V: function(e) {
                var t = parseInt(i.W(e), 10)
                  , r = new Date("" + e.getFullYear() + "/1/1").getDay()
                  , o = t + (r > 4 || 1 >= r ? 0 : 1);
                return 53 === o && new Date("" + e.getFullYear() + "/12/31").getDay() < 4 ? o = 1 : 0 === o && (o = i.V(new Date("" + (e.getFullYear() - 1) + "/12/31"))),
                n(o, 0)
            },
            w: "getDay",
            W: function(e) {
                var t = parseInt(i.j(e), 10)
                  , r = 7 - i.u(e)
                  , o = parseInt((t + r) / 7, 10);
                return n(o, 0, 10)
            },
            y: function(e) {
                return n(e.getFullYear() % 100, 0)
            },
            Y: "getFullYear",
            z: function(e) {
                var t = e.getTimezoneOffset()
                  , r = n(parseInt(Math.abs(t / 60), 10), 0)
                  , o = n(Math.abs(t % 60), 0);
                return (t > 0 ? "-" : "+") + r + o
            },
            Z: function(e) {
                var t = e.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2").replace(/[a-z ]/g, "");
                return t.length > 4 && (t = i.z(e)),
                t
            },
            "%": function() {
                return "%"
            }
        }
          , a = {
            c: "locale",
            D: "%m/%d/%y",
            F: "%Y-%m-%d",
            h: "%b",
            n: "\n",
            r: "%I:%M:%S %p",
            R: "%H:%M",
            t: "	",
            T: "%H:%M:%S",
            x: "locale",
            X: "locale"
        }
          , s = {};
        s.en = {
            a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            A: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            B: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            c: "%a %d %b %Y %T %Z",
            p: ["AM", "PM"],
            P: ["am", "pm"],
            r: "%I:%M:%S %p",
            x: "%d/%m/%y",
            X: "%T"
        },
        o("en-US", {
            c: "%a %d %b %Y %I:%M:%S %p %Z",
            x: "%m/%d/%Y",
            X: "%I:%M:%S %p"
        }),
        o("en-GB", {
            r: "%l:%M:%S %P %Z"
        }),
        o("en-AU", {}),
        r.addLocale = o,
        t.exports = r
    }
    , {}],
    81: [function(e, t) {
        var n = function(e) {
            function t(t, n) {
                !n && (n = (new Date).getTime()),
                n instanceof Date && (n = n.getTime()),
                t instanceof Date && (t = t.getTime());
                var r, o, i, a = n - t;
                for (o = -1,
                i = u.length; ++o < i; )
                    if (r = u[o],
                    a < r[0])
                        return r[2] == e ? r[1] : Math.round(a / r[2]) + " " + r[1]
            }
            var n = 1e3
              , r = 60 * n
              , o = 60 * r
              , i = 24 * o
              , a = 7 * i
              , s = 365 * i
              , l = s / 12
              , u = [[.7 * r, "just now"], [1.5 * r, "a minute ago"], [60 * r, "minutes ago", r], [1.5 * o, "an hour ago"], [i, "hours ago", o], [2 * i, "yesterday"], [7 * i, "days ago", i], [1.5 * a, "a week ago"], [l, "weeks ago", a], [1.5 * l, "a month ago"], [s, "months ago", l], [1.5 * s, "a year ago"], [Number.MAX_VALUE, "years ago", s]];
            return t
        }();
        "undefined" != typeof t && t.exports && (t.exports = n)
    }
    , {}],
    82: [function(e, t) {
        function n(e) {
            function t(t) {
                return e && t ? n(e[t]) : t ? n() : e
            }
            return t.set = function(e, n) {
                for (var r = e.split("."), o = t, i = 0; i < r.length; i++)
                    o()[r[i]] || (o()[r[i]] = {}),
                    i == r.length - 1 && (o()[r[i]] = n),
                    o = o(r[i]);
                return n
            }
            ,
            t.get = function(e) {
                if (e) {
                    var n, r = e.split("."), o = t;
                    for (n = 0; n < r.length; n += 1)
                        o = o(r[n]);
                    return o()
                }
                return t()
            }
            ,
            t
        }
        t.exports = n
    }
    , {}],
    83: [function(e, t) {
        t.exports = function(e) {
            !function(e) {
                function t(e, t) {
                    return "function" == typeof e ? e.call(t) : e
                }
                function n(t, n) {
                    this.$element = e(t),
                    this.options = n,
                    this.enabled = !0,
                    this.fixTitle()
                }
                n.prototype = {
                    show: function() {
                        var n = this.getTitle();
                        if (n && this.enabled) {
                            var r = this.tip();
                            r.find(".tipsy-inner")[this.options.html ? "html" : "text"](n),
                            r[0].className = "tipsy",
                            r.remove().css({
                                top: 0,
                                left: 0,
                                visibility: "hidden",
                                display: "block"
                            }).prependTo(document.body);
                            var o, i = e.extend({}, this.$element.offset(), {
                                width: this.$element[0].offsetWidth,
                                height: this.$element[0].offsetHeight
                            }), a = r[0].offsetWidth, s = r[0].offsetHeight, l = t(this.options.gravity, this.$element[0]);
                            switch (l.charAt(0)) {
                            case "n":
                                o = {
                                    top: i.top + i.height + this.options.offset,
                                    left: i.left + i.width / 2 - a / 2
                                };
                                break;
                            case "s":
                                o = {
                                    top: i.top - s - this.options.offset,
                                    left: i.left + i.width / 2 - a / 2
                                };
                                break;
                            case "e":
                                o = {
                                    top: i.top + i.height / 2 - s / 2,
                                    left: i.left - a - this.options.offset
                                };
                                break;
                            case "w":
                                o = {
                                    top: i.top + i.height / 2 - s / 2,
                                    left: i.left + i.width + this.options.offset
                                }
                            }
                            2 == l.length && (o.left = "w" == l.charAt(1) ? i.left + i.width / 2 - 15 : i.left + i.width / 2 - a + 15),
                            r.css(o).addClass("tipsy-" + l),
                            r.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + l.charAt(0),
                            this.options.className && r.addClass(t(this.options.className, this.$element[0])),
                            this.options.fade ? r.stop().css({
                                opacity: 0,
                                display: "block",
                                visibility: "visible"
                            }).animate({
                                opacity: this.options.opacity
                            }) : r.css({
                                visibility: "visible",
                                opacity: this.options.opacity
                            })
                        }
                    },
                    hide: function() {
                        this.options.fade ? this.tip().stop().fadeOut(function() {
                            e(this).remove()
                        }) : this.tip().remove()
                    },
                    fixTitle: function() {
                        var e = this.$element;
                        (e.attr("title") || "string" != typeof e.attr("original-title")) && e.attr("original-title", e.attr("title") || "").removeAttr("title")
                    },
                    getTitle: function() {
                        var e, t = this.$element, n = this.options;
                        this.fixTitle();
                        var e, n = this.options;
                        return "string" == typeof n.title ? e = t.attr("title" == n.title ? "original-title" : n.title) : "function" == typeof n.title && (e = n.title.call(t[0])),
                        e = ("" + e).replace(/(^\s*|\s*$)/, ""),
                        e || n.fallback
                    },
                    tip: function() {
                        return this.$tip || (this.$tip = e('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>')),
                        this.$tip
                    },
                    validate: function() {
                        this.$element[0].parentNode || (this.hide(),
                        this.$element = null ,
                        this.options = null )
                    },
                    enable: function() {
                        this.enabled = !0
                    },
                    disable: function() {
                        this.enabled = !1
                    },
                    toggleEnabled: function() {
                        this.enabled = !this.enabled
                    }
                },
                e.fn.tipsy = function(t) {
                    function r(r) {
                        var o = e.data(r, "tipsy");
                        return o || (o = new n(r,e.fn.tipsy.elementOptions(r, t)),
                        e.data(r, "tipsy", o)),
                        o
                    }
                    function o() {
                        var e = r(this);
                        e.hoverState = "in",
                        0 == t.delayIn ? e.show() : (e.fixTitle(),
                        setTimeout(function() {
                            "in" == e.hoverState && e.show()
                        }, t.delayIn))
                    }
                    function i() {
                        var e = r(this);
                        e.hoverState = "out",
                        0 == t.delayOut ? e.hide() : setTimeout(function() {
                            "out" == e.hoverState && e.hide()
                        }, t.delayOut)
                    }
                    if (t === !0)
                        return this.data("tipsy");
                    if ("string" == typeof t) {
                        var a = this.data("tipsy");
                        return a && a[t](),
                        this
                    }
                    if (t = e.extend({}, e.fn.tipsy.defaults, t),
                    t.live || this.each(function() {
                        r(this)
                    }),
                    "manual" != t.trigger) {
                        var s = t.live ? "live" : "bind"
                          , l = "hover" == t.trigger ? "mouseenter" : "focus"
                          , u = "hover" == t.trigger ? "mouseleave" : "blur";
                        this[s](l, o)[s](u, i)
                    }
                    return this
                }
                ,
                e.fn.tipsy.defaults = {
                    className: null ,
                    delayIn: 0,
                    delayOut: 0,
                    fade: !1,
                    fallback: "",
                    gravity: "n",
                    html: !1,
                    live: !1,
                    offset: 0,
                    opacity: .8,
                    title: "title",
                    trigger: "hover"
                },
                e.fn.tipsy.elementOptions = function(t, n) {
                    return e.metadata ? e.extend({}, n, e(t).metadata()) : n
                }
                ,
                e.fn.tipsy.autoNS = function() {
                    return e(this).offset().top > e(document).scrollTop() + e(window).height() / 2 ? "s" : "n"
                }
                ,
                e.fn.tipsy.autoWE = function() {
                    return e(this).offset().left > e(document).scrollLeft() + e(window).width() / 2 ? "e" : "w"
                }
                ,
                e.fn.tipsy.autoBounds = function(t, n) {
                    return function() {
                        var r = {
                            ns: n[0],
                            ew: n.length > 1 ? n[1] : !1
                        }
                          , o = e(document).scrollTop() + t
                          , i = e(document).scrollLeft() + t
                          , a = e(this);
                        return a.offset().top < o && (r.ns = "n"),
                        a.offset().left < i && (r.ew = "w"),
                        e(window).width() + e(document).scrollLeft() - a.offset().left < t && (r.ew = "e"),
                        e(window).height() + e(document).scrollTop() - a.offset().top < t && (r.ns = "s"),
                        r.ns + (r.ew ? r.ew : "")
                    }
                }
            }(e)
        }
    }
    , {}],
    84: [function(e, t) {
        var n = e("hbsfy/runtime");
        t.exports = n.template({
            1: function() {
                return 'checked="checked"'
            },
            compiler: [7, ">= 4.0.0"],
            main: function(e, t, n, r, o) {
                var i, a, s = null  != t ? t : {}, l = n.helperMissing, u = "function", c = e.escapeExpression;
                return '<tr class="collaborator" id="collaborator-' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">\n\n  <td class="avatar">\n    <a href="/~' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">\n      <img src="' + c(e.lambda(null  != (i = null  != t ? t.avatar : t) ? i.small : i, t)) + '" alt="' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '" />\n    </a>\n  </td>\n\n  <td class="name">\n    <a href="/~' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '</a>\n  </td>\n\n  <td class="access">\n    <form\n      class="update-collaborator"\n      action="/package/' + c((a = null  != (a = n.packageName || (null  != t ? t.packageName : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "packageName",
                    hash: {},
                    data: o
                }) : a)) + "/collaborators/" + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '"\n      method="POST">\n\n      <input type="hidden" name="collaborator.name" value="' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '">\n\n      <label class="wrapping-hidden-radio">\n        <input\n          type="radio"\n          name="collaborator.permissions"\n          value="read"\n          ' + (null  != (i = n.unless.call(s, null  != t ? t.write : t, {
                    name: "unless",
                    hash: {},
                    fn: e.program(1, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + '\n          disabled="disabled">\n        <span>read-only</span>\n      </label>\n\n      <label class="wrapping-hidden-radio">\n        <input\n          type="radio"\n          name="collaborator.permissions"\n          value="write"\n          ' + (null  != (i = n["if"].call(s, null  != t ? t.write : t, {
                    name: "if",
                    hash: {},
                    fn: e.program(1, o, 0),
                    inverse: e.noop,
                    data: o
                })) ? i : "") + '\n          disabled="disabled">\n        <span>read-write</span>\n      </label>\n    </form>\n  </td>\n\n  <td>\n    <form\n      id="remove-collaborator-' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '"\n      data-collaborator-name="' + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '"\n      data-package-url="/package/' + c((a = null  != (a = n.packageName || (null  != t ? t.packageName : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "packageName",
                    hash: {},
                    data: o
                }) : a)) + '"\n      class="remove-collaborator"\n      method="DELETE"\n      action="/package/' + c((a = null  != (a = n.packageName || (null  != t ? t.packageName : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "packageName",
                    hash: {},
                    data: o
                }) : a)) + "/collaborators/" + c((a = null  != (a = n.name || (null  != t ? t.name : t)) ? a : l,
                typeof a === u ? a.call(s, {
                    name: "name",
                    hash: {},
                    data: o
                }) : a)) + '"\n      style="visibility:hidden;">\n      <input type="submit" value="✖">\n    </form>\n  </td>\n\n</tr>\n'
            },
            useData: !0
        })
    }
    , {
        "hbsfy/runtime": 71
    }]
}, {}, [19]);
