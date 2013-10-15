var avaDebug = true;

var bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
var dungeonKill = [10, 100, 450, 1500, 3500, 6000, 13000, 20000, 35000, 60000];
var l = qx.locale.Manager.getInstance().getLocale();
if (l != "en" || l != "de" || l != "pl")
    l = "en";
var tr = {
    "en": {
        "weak": "Weakness"
    },
    "de": {
        "weak": "Schwche"
    },
    "pl": {
        "weak": "????????"
    }
};
var a = qx.core.Init.getApplication();
var r = webfrontend.res.Main.getInstance();
var nameC = a.tr("tnf:name:").charAt(0);
var typeC = a.tr("tnf:type:").charAt(0);
var levelT = a.tr("tnf:level:");
var progressP = a.tr("tnf:progress:");
var sHdr = '<table cellspacing="0"><tr><td width="75">';
var sRow = "</td><td>";
var pId = sHdr.length;
var pRow = sRow.length;
var weakT = tr[l]["weak"] + ':' + sRow;
var progressT = 'TS + pct:' + sRow;

// var zergT = r.units["6"].dn + ':' + sRow;
var zergT = 'Unit TS:' + sRow;
var zergT6 = r.units["6"].dn + ':' + sRow;
var zergT7 = r.units["7"].dn + ':' + sRow;
var zergT10 = r.units["10"].dn + ':' + sRow;
var zergT11 = r.units["11"].dn + ':' + sRow;
var zergT12 = r.units["12"].dn + ':' + sRow;
var zergT16 = r.units["16"].dn + ':' + sRow;
var zergT17 = r.units["17"].dn + ':' + sRow;

// "Name" or "Type", Boss or Dungeon
// Desc offset
var pBName = pId + pRow + a.tr("tnf:name:").length;
var pDName = pId + pRow + a.tr("tnf:type:").length;

// Progress offset
// x
// Level offset
var pLevel = pRow + a.tr("tnf:level:").length;

// Forest		Dragon		CAvalry		Wood
// Mountain		Hydra		Infantry	Iron
// Hill			Moloch		Magic		Stone
// Sea			Octopus		Artillery 	Food
var cavT = r.attackTypes["2"].dn;
var infT = r.attackTypes["1"].dn;
var magT = r.attackTypes["4"].dn;
var artT = r.attackTypes["3"].dn;
var dragC = r.dungeons["6"].dn.charAt(0);
var hydrC = r.dungeons["8"].dn.charAt(0);
var moloC = r.dungeons["7"].dn.charAt(0);
var octyC = r.dungeons["12"].dn.charAt(0);
var forstC = r.dungeons["5"].dn.charAt(0);
var mountC = r.dungeons["4"].dn.charAt(0);
var hillC = r.dungeons["3"].dn.charAt(0);
var seaC = r.dungeons["2"].dn.charAt(0);

function getBossWeakness(name) {
    if (name == dragC)
        return cavT;
else if (name == hydrC)
        return infT;
else if (name == moloC)
        return magT;
else if (name == octyC)
        return artT;
else
        return "";
}

function getDungeonWeakness(name) {
    if (name == forstC)
        return cavT;
else if (name == mountC)
        return infT;
else if (name == hillC)
        return magT;
else if (name == seaC)
        return artT;
else
        return "";
}

function paDebug(e) {
    if (avaDebug && window.console && typeof console.debug == "function") {
        console.log(e);
        //  addMessage(e);
    }
}

function paError(e) {
    if (window.console && typeof console.error == "function") {
        console.error(e);
        console.trace();
        console.assert(false);
    }
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function formatDate(tme) {
    var serverTime = webfrontend.data.ServerTime.getInstance();
    var dte = new Date();
    dte.setTime(tme);
    var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
    var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
    var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
    var localOffset = -new Date().getTimezoneOffset() * 60000;

    // Its in minutes
    dte.setTime(dte.getTime() + serverOffset - localOffset);
    var h = dte.getHours();
    var m = dte.getMinutes();
    var s = dte.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    return dte.getFullYear() + '/' + (dte.getMonth() + 1) + '/' + dte.getDate() + ' ' + h + ':' + m + ':' + s;
}
function showMsgWindow(title, msgText) {
    var win = new qx.ui.window.Window(title);
    win.setLayout(new qx.ui.layout.VBox(2));
    win.set({
        showMaximize: false,
        showMinimize: false,
        allowMaximize: false,
        width: 400,
        height: 80
    });
    win.lbl = new qx.ui.basic.Label(msgText).set({
        rich: true
    });
    win.add(win.lbl);
    var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
    win.add(row);
    var btn2 = new qx.ui.form.Button("Close").set({
        appearance: "button-text-small",
        width: 80,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0
    });
    btn2.win = win;
    row.add(btn2);
    btn2.addListener("click", function () {
        this.win.hide();
    });
    win.addListener("close", function () {
    }, this);
    win.center();
    win.open();
}
function convertCoordinatesToId(x, y) {
    var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
    return id;
}

function convertIdToCoordinatesObject(id) {
    var x = (id & 0xFFFF);
    var y = (id >> 16);

    return {
        xPos: x,
        yPos: y,
        cont: webfrontend.data.Server.getInstance().getContinentFromCoords(x, y)
    };
}
var consumerMessages = new Array();
var messageParam = new Array();
var messageVersion = new Array();
var messageThisObj = new Array();
var started = false;
function checkMsgs() {
    var sb = new qx.util.StringBuilder(2048);
    for (var i in consumerMessages) {
        if (consumerMessages[i] != null && (typeof consumerMessages[i] == "object")) {
            sb.add(i, ":", messageParam[i][0], "\f");
        }
    }
    if (sb.size() > 0) {
        pollMessages(sb.get());
    } else {
        started = false;
    }
}

var updateManager = webfrontend.net.UpdateManager.getInstance();

function pollMessages(requests) {
    var data = new qx.util.StringBuilder(2048);
    data.add('{"session":"', updateManager.getInstanceGuid(), '","requestid":"', updateManager.requestCounter, '","requests":', JSON.stringify(requests), "}");
    updateManager.requestCounter++;
    var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/Poll", "POST", "application/json");
    req.setProhibitCaching(false);
    req.setRequestHeader("Content-Type", "application/json");
    req.setData(data.get());
    req.setTimeout(10000);
    req.addListener("completed", pollCompleted);
    req.addListener("failed", pollFailed);
    req.addListener("timeout", pollTimeout);
    req.send();
}

function pollFailed(e) {
    window.setTimeout(checkMsgs, 2000);
}

function pollTimeout(e) {
    window.setTimeout(checkMsgs, 2000);
}

function pollCompleted(e) {
    try  {
        var content = (e == null) ? null : e.getContent();
        if ((e == null) || (content == null))
            return;
        for (var i = 0; i < content.length; i++) {
            try  {
                var item = content[i];
                if (item.hasOwnProperty("C")) {
                    var type = item.C;
                    if (consumerMessages[type]) {
                        var msgs = consumerMessages[type];
                        for (var ii = 0; ii < msgs.length; ++ii) {
                            var mVer = messageVersion[type];
                            var prevVer = mVer[ii];
                            if (item.D && item.D.hasOwnProperty("v")) {
                                if (item.D.v == mVer[ii]) {
                                    continue;
                                }
                                mVer[ii] = item.D.v;
                            } else if (item.hasOwnProperty("v")) {
                                if (item.v == mVer[ii]) {
                                    continue;
                                }
                                mVer[ii] = item.v;
                            }
                            try  {
                                var mThisObj = messageThisObj[type];
                                window.setTimeout(msgs[ii].bind(0, item.D, mThisObj[ii]), 1);
                                //delayFunc(msgs[ii], item.D, mThisObj[ii], 1);
                            } catch (ex) {
                                paDebug(type + ": " + ex);
                            }
                        }
                    }
                }
            } catch (ex) {
                paDebug(ex);
            }
        }
    } catch (ex) {
        paDebug(ex);
    } finally {
        window.setTimeout(checkMsgs, 3000);
    }
}
function addConsumer(msg, func, thisObj, paramStr) {
    console.assert(msg);
    console.assert(func);
    console.log("add consumer " + msg);
    if (!consumerMessages[msg]) {
        consumerMessages[msg] = new Array();
        messageVersion[msg] = new Array();
        messageThisObj[msg] = new Array();
        messageParam[msg] = new Array();
    } else {
        var m = consumerMessages[msg];
        var mv = messageVersion[msg];
        var mto = messageThisObj[msg];
        var mp = messageParam[msg];
        for (var ii = 0; m != null && ii < m.length; ++ii) {
            if (m[ii] == func) {
                m.splice(ii, 1);
                mv.splice(ii, 1);
                mto.splice(ii, 1);
                mp.splice(ii, 1);
            }
        }
    }
    var __msg = consumerMessages[msg];
    var l = __msg.length;

    __msg[l] = func;
    messageVersion[msg][l] = "";
    messageThisObj[msg][l] = thisObj;
    messageParam[msg][l] = paramStr;
    if (!started) {
        checkMsgs();
        started = true;
    }
}

function removeConsumer(msg, func, _this) {
    if (consumerMessages[msg]) {
        var m = consumerMessages[msg];
        var mv = messageVersion[msg];
        var mto = messageThisObj[msg];
        var mp = messageParam[msg];
        for (; ;) {
            var done = true;
            for (var ii = 0; m != null && ii < m.length; ++ii) {
                if (m[ii] == func) {
                    console.assert(mto[ii] == _this);
                    m.splice(ii, 1);
                    mv.splice(ii, 1);
                    mto.splice(ii, 1);
                    mp.splice(ii, 1);
                    if (m.length == 0) {
                        consumerMessages[msg] = null;
                        messageVersion[msg] = null;
                        messageThisObj[msg] = null;
                        messageParam[msg] = null;
                    }
                    done = false;
                    break;
                }
            }

            if (done)
                break;
        }
    }
}
