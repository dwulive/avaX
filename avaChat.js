function emotifyIcons() {
    return ["", "", 0];
}
var EMOTICON_RE, emoticons = {}, lookup = [];

qx.Class.define("ava.Inception", {
    type: "singleton",
    extend: qx.core.Object,
    construct: function (enabled) {
        this.base(arguments);
        //Serialize(this);
    },
    members: {
        init: function () {
            qx.core.Init.getApplication().chat._outputMsg = this.outputMsgIntercept;
             {
                var args = Array.prototype.slice.call(arguments), base_url = typeof args[0] === 'string' ? args.shift() : '', replace_all = typeof args[0] === 'boolean' ? args.shift() : false, smilies = args[0], e, arr = [], alts, i, regexp_str;
                if (smilies) {
                    if (replace_all) {
                        emoticons = {};
                        lookup = [];
                    }
                    for (e in smilies) {
                        emoticons[e] = smilies[e];
                        emoticons[e][0] = base_url + emoticons[e][0];
                    }

                    for (e in emoticons) {
                        if (emoticons[e].length > 2) {
                            // Generate regexp from smiley and alternates.
                            alts = emoticons[e].slice(2).concat(e);
                            i = alts.length;
                            while (i--) {
                                alts[i] = alts[i].replace(/(\W)/g, '\\$1');
                            }
                            regexp_str = alts.join('|');

                            // Manual regexp, map regexp back to smiley so we can reverse-match.
                            lookup.push({
                                name: e,
                                regexp: new RegExp('^' + regexp_str + '$')
                            });
                        } else {
                            // Generate regexp from smiley.
                            regexp_str = e.replace(/(\W)/g, '\\$1');
                        }
                        arr.push(regexp_str);
                    }
                    EMOTICON_RE = new RegExp('(^|\\s)(' + arr.join('|') + ')(?=(?:$|\\s))', 'g');
                }
                //return emoticons;
            }

            webfrontend.gui.Util._convertBBCode = webfrontend.gui.Util.convertBBCode;
            webfrontend.gui.Util.convertBBCode = this.convertBBCode;
        },
        convertBBCode: function (pq, pr, ps) {
            // place for letious custom BBCodes
            var ar, ig;
            if (!pr) {
                /*
                Including an image
                [img]http://www.bbcode.org/images/lubeck_small.jpg[/img]
                Resizing the image
                [img=100x50]http://www.bbcode.org/images/lubeck_small.jpg[/img]
                Making the image clickable (in this case linking to the original image)
                [url=http://www.bbcode.org/images/lubeck.jpg][img]http://www.bbcode.org/images/lubeck_small.jpg[/img][/url]
                */
                pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '<img title="" alt="" class="image" src="$1">');
                pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '<img width="$1" height="$2" title="" alt="" class="image" src="$3">');
                pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '<a href=# onClick="webfrontend.gui.Util.openLink(\'$1\');">$2</a>');
                pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '<pre>$1</pre>');
            } else {
                pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '[url]$1[/url]');
                pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '[url]$3[/url]');
                pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '[url]$1[/url]');
                pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '$1');
            }
            ar = emotify(pq);

            // fix wrong chat notify for empty string with emoticon
            ig = /^<img src="[^"]*" title="[^"]*" alt="" class="smiley" style="[^"]*"\/>$/gi;
            if (!pr && ig.test(ar)) {
                ar = "&thinsp;" + ar;
            }
            return webfrontend.gui.Util._convertBBCode(ar, pr, ps);
        },
        outputMsgIntercept: function (eY, fa, fb) {
            var t = /!LoU\.[a-zA-Z]*/i, p = '__proto__';
            if (t.test(eY)) {
                // hide custom output from chat
                //return;
            }
            this[p]._outputMsg.call(this, eY, fa, fb);
        }
    }
});
qx.Class.define("ava.Chat", {
    type: "singleton",
    extend: qx.core.Object,
    construct: function (enabled) {
        this.base(arguments);
        //Serialize(this);
    },
    members: {
        init: function () {
            var a = webfrontend.data.Alliance.getInstance();
            this.chat = webfrontend.data.Chat.getInstance();
            this.chat.addListener('newMessage', this.onNewMessage, this);
        },
        chat: null,
        onNewMessage: function (e) {
        },
        addChatMessage: function (message, wantPrefix) {
            console.info(message);

            var prefix = (wantPrefix) ? (ava.Version.PAbuild + " [Ava]: ") : "";
            var eV = webfrontend.config.Config.getInstance().getChat(), eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + prefix + emotify(message) + '</font>', eO, eU;
            if (eV.getTimeStamp()) {
                eO = webfrontend.data.ServerTime.getInstance();
                eU = eO.getServerStep();
                if (eU) {
                    eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
                }
            }
            qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
        }
    }
});

/*
* Contribute  http://benalman.com/projects/jAvascript-emotify/
* Spezial thanks to Ben Alman, http://benalman.com/about/license/
*/
function emotify(txt, callback) {
    if (typeof callback === "undefined") { callback = null; }
    callback = callback || function (img, title, smiley, text) {
        title = (title + ', ' + smiley).replace(/"/g, '&quot;').replace(/</g, '&lt;');
        return '<img src="' + img + '" title="' + title + '" alt="" class="smiley" style="vertical-align: -20%;"/>';
    };
    return txt.replace(EMOTICON_RE, function (a, b, text) {
        var i = 0, smiley = text, e = emoticons[text];

        if (!e) {
            while (i < lookup.length && !lookup[i].regexp.test(text)) {
                while (i < lookup.length && !lookup[i].regexp.test(text)) {
                    i = i + 1;
                }
                smiley = lookup[i].name;
                e = emoticons[smiley];
            }

            // If the smiley was found, return HTML, otherwise the original search string
            return e ? (b + callback(e[0], e[1], smiley, text)) : a;
        }
    });
}

qx.Class.define("ava.alerts", {
    type: "singleton",
    extend: qx.core.Object,
    construct: function (enabled) {
        this.base(arguments);
    },
    members: {
        _outputMsg: null,
        _msgWin: null,
        playerName: null,
        cMain: null,
        init: function () {
            var a = webfrontend.data.Alliance.getInstance();
            this._outputMsg = qx.core.Init.getApplication().chat._outputMsg;
            qx.core.Init.getApplication().chat._outputMsg = this.outputMsgIntercept;
            this.chat = webfrontend.data.Chat.getInstance();
            this.chat.addListener('newMessage', this.onNewMessage, this);
            this.playerName = webfrontend.data.Player.getInstance().getName().toLowerCase();
            this.playerNameOrig = webfrontend.data.Player.getInstance().getName();
            this.cMain = ava.Main.getInstance();
        },
        chat: null,
        removeBBcode: function (str) {
            return str.replace(/\[\/?\w+\]/g, "");
        },
        onNewMessage: function (e) {
            var eu = e.getData(), commandParts, pq;
            if (eu.c != 'privateout') {
                if (this.cMain.options.showWhisperAlert || this.cMain.options.showChatAlert || this.cMain.options.showChatAlertPhrases) {
                    var eO = webfrontend.data.ServerTime.getInstance();
                    var eU = eO.getServerStep();
                    if (eU) {
                        var oldPhrases = "";
                        var newPhrases = "";
                        var send = false;
                        var eN = this.removeBBcode(eu.m);
                        if (this.cMain.options.showChatAlert && eu.m.toLowerCase().indexOf(this.playerName) >= 0) {
                            oldPhrases += this.playerName;
                            newPhrases += this.playerNameOrig;
                            send = true;
                        }
                        if (eu.c == 'privatein' && this.cMain.options.showWhisperAlert) {
                            send = true;
                        }
                        if (this.cMain.options.showChatAlertPhrases) {
                            var phrases = this.cMain.options.chatAlertPhrases.split(',');
                            for (var ii = 0; ii < phrases.length; ++ii) {
                                var phrase = phrases[ii].toLowerCase().trim();
                                var phraseOrig = phrases[ii].trim();
                                if (phrase.length > 0 && (eN.toLowerCase().indexOf(phrase) >= 0 || eN.toLowerCase().indexOf(phraseOrig) >= 0)) {
                                    oldPhrases += (oldPhrases.length > 0 ? "|" : "") + phrase;
                                    newPhrases += (newPhrases.length > 0 ? "|" : "") + phraseOrig;
                                    send = true;
                                }
                            }
                        }
                        if (send) {
                            var re = new RegExp(oldPhrases, 'g');
                            var oldStr = oldPhrases.split('|');
                            var newStr = newPhrases.split('|');
                            eN = eN.replace(re, function (w) {
                                for (var ii = 0; ii < oldStr.length; ++ii) {
                                    if (oldStr[ii].toLowerCase() == w.toLowerCase()) {
                                        return "<span style='font-weight: bold;'>" + newStr[ii] + "</span>";
                                    }
                                }
                            });
                            if (eu.c == 'privatein') {
                                eN = "[" + eu.s + "] whispers to you: " + eN;
                            } else if (eu.c == "_a") {
                                eN = "[Alliance][" + eu.s + "]: " + eN;
                            } else {
                                eN = "[Continent][" + eu.s + "]: " + eN;
                            }
                            var ts = webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
                            this.addChatAlertMessage(ts);
                        }
                    }
                }
            }
        },
        removeBBcode: function (str) {
            return str.replace(/\[\/?\w+\]/g, "");
        },
        outputMsgIntercept: function (eY, fa, fb) {
            var p = '__proto__';
            this[p]._outputMsg.call(this, eY, fa, fb);
        },
        clearMessages: function () {
            if (this._msgWin) {
                this._msgWin.lbl.setValue("");
            }
        },
        showMessageWindow: function (title) {
            if (this._msgWin == null) {
                var win = new qx.ui.window.Window((!title || title.length == 0) ? "Ava Messages" : title);
                win.setLayout(new qx.ui.layout.Grow());
                win.set({
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    width: 300,
                    height: 200
                });
                var container = new qx.ui.container.Scroll();
                win.lbl = new qx.ui.basic.Label("").set({
                    rich: true
                });
                container.add(win.lbl);
                win.add(container);

                /*
                var btn = new qx.ui.form.Button("Clear").set( {paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0} );
                win.add( btn);
                btn.addListener( "click", function() { this.clearMessages(); }, win);
                */
                var _this = this;
                win.addListener("close", function () {
                    _this._msgWin = null;
                }, this);
                win.open();
                var w = qx.bom.Viewport.getWidth(window);
                var h = qx.bom.Viewport.getHeight(window);
                win.moveTo(w - 320, h - 225);
                this._msgWin = win;
            }
        },
        addMessage: function (msg) {
            this.showMessageWindow();
            this._msgWin.lbl.setValue(this._msgWin.lbl.getValue() + msg + "<br>");
        },
        addChatAlertMessage: function (msg) {
            this.showMessageWindow("Chat Alert");
            this._msgWin.lbl.setValue(this._msgWin.lbl.getValue() + msg + "<br>");
        },
        addChatMessage: function (message) {
            var eV = webfrontend.config.Config.getInstance().getChat(), eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + message + '</font>', eO, eU;
            if (eV.getTimeStamp()) {
                eO = webfrontend.data.ServerTime.getInstance();
                eU = eO.getServerStep();
                if (eU) {
                    eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
                }
            }
            qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
        }
    }
});
