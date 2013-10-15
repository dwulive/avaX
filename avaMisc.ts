///<reference path="avaDec.ts" />
declare var qx : any;
declare var webfrontend : any;
/**
 * Created by David on 10/11/13.
 */

var nfTime = null;
var nextFortune = null;
var fortuneCheck = null;
var lastDisplay = new Date();
var ftDisplay = false;
lastDisplay.setTime((new Date()).getTime() + webfrontend.data.ServerTime.getInstance().getServerOffset() - (-new Date().getTimezoneOffset() * 60000) - 300000);

function checkFortuneTime() {
	var tokenStep = player.getFortuneNextFreeTokenStep();
	var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
	var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
	var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
	var localOffset = -new Date().getTimezoneOffset() * 60000;
	fortuneCheck = serverTime.getStepTime(tokenStep);
	fortuneCheck.setTime(fortuneCheck.getTime() + serverOffset - localOffset);
}

function setNextFortuneTime() {
	var tokenStep = player.getFortuneNextFreeTokenStep();
	var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
	var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
	var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
	var localOffset = -new Date().getTimezoneOffset() * 60000;
	nextFortune = serverTime.getStepTime(tokenStep);
	nextFortune.setTime(nextFortune.getTime() + serverOffset - localOffset);
	var h = nextFortune.getHours();
	var m = nextFortune.getMinutes();
	var s = nextFortune.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	nfTime = h + ':' + m + ':' + s;
}



function showFortuneWindow(msgText) {
	var win = new qx.ui.window.Window("Fortune Teller");
	win.setLayout(new qx.ui.layout.VBox(2));
	win.set({
		showMaximize:  false,
		showMinimize:  false,
		allowMaximize: false,
		width:         400,
		height:        80
	});
	win.lbl = new qx.ui.basic.Label(msgText).set({
		rich: true
	});
	win.add(win.lbl);
	var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
	win.add(row);
	var btn = new qx.ui.form.Button("Open FT").set({
		appearance:    "button-text-small",
		width:         80,
		paddingLeft:   5,
		paddingRight:  5,
		paddingTop:    0,
		paddingBottom: 0
	});
	btn.win = win;
	row.add(btn);
	btn.addListener("click", function() {
		(new webfrontend.gui.FortuneTeller.MainWindow()).open();
		this.win.hide();
	});
	var btn2 = new qx.ui.form.Button("Close").set({
		appearance:    "button-text-small",
		width:         80,
		paddingLeft:   5,
		paddingRight:  5,
		paddingTop:    0,
		paddingBottom: 0
	});
	btn2.win = win;
	row.add(btn2);
	btn2.addListener("click", function() {
		var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
		var localOffset = -new Date().getTimezoneOffset() * 60000;
		lastDisplay.setTime((new Date()).getTime() + serverOffset - localOffset);
		ftDisplay = false;
		this.win.hide();
	});
	var btn3 = new qx.ui.form.Button("Ignore").set({
		appearance:    "button-text-small",
		width:         80,
		paddingLeft:   5,
		paddingRight:  5,
		paddingTop:    0,
		paddingBottom: 0
	});
	btn3.win = win;
	row.add(btn3);
	btn3.addListener("click", function() {
		var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
		var localOffset = -new Date().getTimezoneOffset() * 60000;
		lastDisplay.setTime((new Date()).getTime() + serverOffset - localOffset + 7200000);
		ftDisplay = true;
		this.win.hide();
	});
	win.addListener("close", function() {
		var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
		var localOffset = -new Date().getTimezoneOffset() * 60000;
		lastDisplay.setTime((new Date()).getTime() + serverOffset - localOffset);
		ftDisplay = false;
	}, this);

	win.center();
	win.open();
}



function checkFortune() {

}

qx.Class.define("ava.CityBuildings", {
	extend:    qx.core.Object,
	construct: function() {
		this.bldgsCont = new qx.ui.container.Composite(new qx.ui.layout.VBox(4));
		this.row = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
		this.row.setWidth(338);
		this.bldgsCont.add(this.row);
		this.row2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
		this.row2.setWidth(338);
		this.bldgsCont.add(this.row2);
		this.row3 = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
		this.row3.setWidth(338);
		this.bldgsCont.add(this.row3);
		this.row4 = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
		this.row4.setWidth(338);
		this.bldgsCont.add(this.row4);
	},
	members:   {
		bldgsCont:           null,
		bldgsContBgr:        null,
		lastId:              "",
		prevCount:           0,
		row:                 null,
		row2:                null,
		row3:                null,
		row4:                null,
		cMain:               null,
		bS:                  null,
		app:                 null,
		updateCityBuildings: function() {
			var city = webfrontend.data.City.getInstance();
			if(this.app == null)
				this.app = qx.core.Init.getApplication();
			if(this.bS == null)
				this.bS = webfrontend.res.Main.getInstance();
			if(this.cMain == null)
				this.cMain = ava.Main.getInstance();
			if(!this.bS || !city || !this.cMain)
				return;
			if(this.cMain.options.showCityBuildings == 0 || (this.cMain.options.showCityBuildings == 2 && (this.app.visMain.mapmode != "c"))) {
				this.bldgsCont.setVisibility("excluded");
				return;
			}
			this.bldgsCont.setVisibility("visible");
			var bCount = city.getBuildingCount();
			if(bCount == this.prevCount && this.lastId == city.getId()) {
				return;
			}
			this.prevCount = bCount;
			this.lastId = city.getId();
			this.row.removeAll();
			this.row2.removeAll();
			this.row3.removeAll();
			this.row4.removeAll();
			this.row2.setVisibility("excluded");
			this.row3.setVisibility("excluded");
			this.row4.setVisibility("excluded");
			var i = 0;
			for(var a in this.bS.buildings) {
				var cnt = city.getBuildingCountByType(a);
				if(cnt > 0 && this.bS.buildings[a].t != 5) {
					var lbl = new qx.ui.basic.Label(" ");
					lbl.setRich(true);
					var title = this.bS.buildings[a].dn;
					lbl.setValue('<img alt="' + title + '" title="' + title + '" src="resource/webfrontend/' + this.bS.getFileInfo(this.bS.buildings[Number(a)].mimg).url + '" style="align:absmiddle;-moz-transform: scaleX(1); width: 28px; height: 28px; padding-left:4px;" /><br/><span style="margin-left: ' + (cnt > 10 ? 10 : 15) + 'px;">' + cnt + '</span>');
					++i;
					if(i <= 8) {
						this.row.add(lbl);
					} else if(i <= 16) {
						this.row2.add(lbl);
						this.row2.setVisibility("visible");
					} else if(i <= 24) {
						this.row3.add(lbl);
						this.row3.setVisibility("visible");
					} else {
						this.row4.add(lbl);
						this.row4.setVisibility("visible");
					}
				}
			}
			this.bldgsCont.setVisibility("visible");
		}
	}
});
function AvaInitLegacy() {
	try {
	paDebug("Ava init legacy");
		var bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
		var dungeonKill = [10, 100, 450, 1500, 3500, 6000, 13000, 20000, 35000, 60000];
		var l = qx.locale.Manager.getInstance().getLocale();
		if(l != "en" || l != "de" || l != "pl") {
			l = "en";
		}
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
			if(name == dragC)
				return cavT;
			else if(name == hydrC)
				return infT;
			else if(name == moloC)
				return magT;
			else if(name == octyC)
				return artT;
			else
				return "";
		}

		function getDungeonWeakness(name) {
			if(name == forstC)
				return cavT;
			else if(name == mountC)
				return infT;
			else if(name == hillC)
				return magT;
			else if(name == seaC)
				return artT;
			else
				return "";
		}

		function toolTipAppear() {
			try {
				var tip = a.worldViewToolTip;
				var mode = tip.getMode();
				if(mode == 'c' || mode == 'd') {
					// if(tip.contextObject)
				} else {
					var text = tip.getLabel();
					if(text != null || text.length > pId) {
						var type = text.charAt(pId);
						if(type == nameC) {
							//Boss
							var weak = getBossWeakness(text.charAt(pBName));
							var lPos = text.indexOf(levelT, pBName) + pLevel;
							var level = text.charAt(lPos);
							if(level == '1') {
								if(text.charAt(lPos + 1) == '0')
									level = '10';
							}
							var zergs = webfrontend.gui.Util.formatNumbers(bossKill[parseInt(level) - 1]);
							var sb = new qx.util.StringBuilder(20);
							var research6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
							var shrine6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
							var bonus6 = ((shrine6 + research6) / 100) + 1;
							var research7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
							var shrine7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
							var bonus7 = ((shrine7 + research7) / 100) + 1;
							var research10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 10);
							var shrine10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 10);
							var bonus10 = ((shrine10 + research10) / 100) + 1;
							var research11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 11);
							var shrine11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 11);
							var bonus11 = ((shrine11 + research11) / 100) + 1;
							var research12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 12);
							var shrine12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 12);
							var bonus12 = ((shrine12 + research12) / 100) + 1;
							var research16 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 16);
							var shrine16 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 16);
							var bonus16 = ((shrine16 + research16) / 100) + 1;
							var research17 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 17);
							var shrine17 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 17);
							var bonus17 = ((shrine17 + research17) / 100) + 1;
							var zergs6 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[parseInt(level) - 1] / bonus6));
							if(weak == "Infantry")
								zergs6 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus6) * 0.67));
							var zergs7 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[parseInt(level) - 1] / bonus7) * 0.72);
							if(weak == "Magic")
								zergs7 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus7) * 0.67 * 0.72));
							var zergs10 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus10) * 0.83));
							if(weak == "Cavalry")
								zergs10 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus10) * 0.67 * 0.83));
							var zergs11 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus11) * 0.55));
							if(weak == "Cavalry")
								zergs11 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus11) * 0.67 * 0.55));
							var zergs12 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus12) * 0.42));
							if(weak == "Magic")
								zergs12 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus12) * 0.67 * 0.42));
							if(weak == "Artillery") {
								var zergs16 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus16) * 0.03));
								var zergs17 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus17) * 0.003));
								sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT16, zergs16, "</td></tr><tr><td>", zergT17, zergs17, "</td></tr></table>");
							} else {
								sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT6, zergs6, "</td></tr></td></tr><tr><td>", zergT10, zergs10, "</td></tr></td></tr><tr><td>", zergT11, zergs11, "</td></tr><tr><td>", zergT12, zergs12, "</td></tr><tr><td>", zergT7, zergs7, "</td></tr></table>");
							}
							tip.setLabel(sb.get());
						} else if(type == typeC) {
							//Dungeon
							var weak = getDungeonWeakness(text.charAt(pDName));
							var lPos = text.indexOf(levelT, pDName) + pLevel;
							var level = text.charAt(lPos);
							if(level == '1') {
								if(text.charAt(lPos + 1) == '0')
									level = '10';
							}
							var progress = text.substr(text.indexOf("Progress") + 18, 2);
							if(progress.substr(1, 1) == '%') {
								progress = progress.substr(0, 1);
							}
							progress = webfrontend.gui.Util.formatNumbers(parseInt((progress * 0.0175 + 1.0875) * dungeonKill[parseInt(level) - 1]));
							zergs6 = webfrontend.gui.Util.formatNumbers(dungeonKill[parseInt(level) - 1]);
							var sb = new qx.util.StringBuilder(20);
							sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs6, "</td></tr><tr><td>", progressT, progress, "</td></tr></table>");
							tip.setLabel(sb.get());
						}

					}
				}
			} catch(e) {
				paError(e);
			}
		}

		a.worldViewToolTip.addListener("appear", toolTipAppear, this);
	} catch(e) {
		paError(e);
	}
}
; // avainitLegacy





	var cityStatusText;
	var cityStatusRow;

	function clearCityStatusText() {
		if(cityStatusText && cityStatusRow) {
			cityStatusRow.setMaxHeight(0);
			cityStatusText.setMaxHeight(0);
			cityStatusRow.setVisibility("hidden");
			cityStatusText.setValue("");
		}
	}

	function findTextNode(text) {
		var retVal;
		var n,
			walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
		n = walk.nextNode();
		while(n) {
			if(n.data == text) {
				retVal = n;
			}
		}
		return retVal;
	}

	function safeGetProperty(obj, prop) {
		if(obj && obj.hasOwnProperty(prop))
			return obj[prop];
		return null;
	}

	function addApplyAllButtons() {
		var app = qx.core.Init.getApplication();
		var orderPage = app.getOrderDetailPage();
		var buttonLayout = new qx.ui.layout.HBox(3);
		var btnRow = new qx.ui.container.Composite(buttonLayout);
		btnRow.add(orderPage.applyAllBtn);
		btnRow.add(orderPage.applyAllThisDungeonBtn);
		for(var p in app.getOrderDetailPage()) {
			if(app.getOrderDetailPage()[p] instanceof webfrontend.gui.OrderDetail.RaidTimeDisplay) {
				var rtd = app.getOrderDetailPage()[p];
				var children = rtd.getLayoutParent().getLayoutChildren();
				var item;
				for(var ii = 0; ii < children.length; ++ii) {
					if(children[ii] == rtd) {
						item = children[ii + 2];
						break;
					}
				}
				if(item) {
					item = item.getLayoutChildren()[1];
					item.getLayoutParent().addAfter(btnRow, item);
				}
			}
		}
	}





	function refreshItems() {
		var dialog = ava.PalaceItemsWindow.getInstance();
		dialog.fillItemRow();
	}

	function waitForItem() {
		window.setTimeout(refreshItems, 1500);
	}

	qx.Class.define("ava.PalaceItemsWindow", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function() {
			console.debug("Palace Construct");
			this.base(arguments, 'Use Palace Items');


			// Refresh info every time
			this.addListener("appear", this.fillItemRow, this);
		},
		members:   {
			_returnTime:            null,
			palaceItemMessageLabel: null,
			palaceItemRow:          null,
			buildUI:                function() {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.VBox(2));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      false
				});
				this.setWidth(350);
				webfrontend.gui.Util.formatWinClose(this);
				var wcLabel = new qx.ui.basic.Label("Select the city then click the item to apply");
				wcLabel.set({
					font: "bold"
				});
				this.add(wcLabel);
				this.palaceItemRow = new qx.ui.container.Composite();
				this.palaceItemRow.setLayout(new qx.ui.layout.HBox());
				this.add(this.palaceItemRow);
				var row = new qx.ui.container.Composite();
				row.setLayout(new qx.ui.layout.HBox());
				this.palaceItemMessageLabel = new qx.ui.basic.Label("");
				this.palaceItemMessageLabel.set({
					minWidth:    30,
					allowGrowX:  true,
					font:        "bold",
					textColor:   "red",
					toolTipText: " "
				});
				row.add(this.palaceItemMessageLabel);
				this.add(row);
				var row = new qx.ui.container.Composite();
				row.setLayout(new qx.ui.layout.HBox());

				// Close button
				var closeButton = new qx.ui.form.Button("Close");
				closeButton.addListener("execute", this.hide, this);
				row.add(closeButton);
				this.add(row);
			},
			fillItemRow:            function() {
				this.palaceItemRow.removeAll();
				this.palaceItemMessageLabel.setValue("");
				var i = webfrontend.data.Inventory.getInstance();
				var bS = webfrontend.res.Main.getInstance();
				var itemCount = 0;
				var title = webfrontend.data.Player.getInstance().getTitle();
				for(var ii = 178; ii < 188; ++ii) {
					var itemUseable = false;
					switch(ii) {
						case 178:
						case 183:
							itemUseable = title >= 10;
							break;
						case 179:
						case 184:
							itemUseable = title >= 9;
							break;
						case 180:
						case 185:
							itemUseable = title >= 8;
							break;
						case 181:
						case 186:
							itemUseable = title >= 7;
							break;
						case 182:
						case 187:
							itemUseable = title >= 6;
							break;
					}
					if(i.hasItem(ii) && itemUseable) {
						++itemCount;
						var inv = i.getInventorySorted();
						var num = 0;
						for(var ix = 0; ix < inv.length; ++ix) {
							if(inv[ix].id == ii) {
								num = inv[ix].count;
								break;
							}
						}
						var itemImg = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.items[ii].i]);
						itemImg.itemId = String(ii);
						itemImg.thisObj = this;
						itemImg.set({
							padding:     5,
							toolTipText: "You own " + String(num) + " artifact" + (num > 1 ? "s" : "") + " <br/>" + bS.items[ii].dn + "<br/>" + bS.items[ii].sds
						});
						itemImg.setWidth(40);
						itemImg.setHeight(40);
						itemImg.setScale(true);
						this.palaceItemRow.add(itemImg);
						itemImg.addListener("click", this.useItem, this);
					}
				}
				if(itemCount == 0) {
					this.palaceItemMessageLabel.setValue("No useable palace items found");
				}
				/*
				 178 - Valorite Arch
				 179 - Verite Arch
				 180 - Platinum Arch
				 181 - Golden Arch
				 182 - Silver Arch
				 183 - Valorite Pillar
				 184 - Verite Pillar
				 185 - Platinum Pillar
				 186 - Golden Pillar
				 187 - Silver Pillar
				 */
			},
			useItem:                function(e) {
				var currentTarget = e.getCurrentTarget();
				var itemId = currentTarget.itemId;
				var app = qx.core.Init.getApplication();
				var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
				var myAllianceName = webfrontend.data.Alliance.getInstance().getName().toLowerCase();
				if(!selectedCity || !selectedCity.get_IsEnlighted()) {
					this.palaceItemMessageLabel.setValue("Select an enlightened city");
					return;
				}
				if(selectedCity.get_AllianceName().iCompare(myAllianceName)) {
					this.palaceItemMessageLabel.setValue("Enlightend city must belong to " + myAllianceName);
					return;
				}
				var i = webfrontend.data.Inventory.getInstance();
				if(!i.hasItem(itemId)) {
					this.palaceItemMessageLabel.setValue("You do not own the item selected");
					return;
				}
				var bS = webfrontend.res.Main.getInstance();
				var coords = selectedCity.get_Coordinates();
				this.palaceItemMessageLabel.setValue("Please wait, using 1 " + bS.items[itemId].dn);
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("UseItem", {
					"itemid": itemId,
					"amount": 1,
					"target": [
						{
							"t": bS.items[itemId].tt,
							"i": coords
						}
					]
				}, currentTarget.thisObj, waitForItem);
			}
		}
	});
	qx.Class.define("ava.AllianceMailingListWindow", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function(cityAllianceName, cityAllianceID) {
			this.base(arguments, 'Mailing Lists');
			this.buildUI();

			// Refresh info every time
			this.addListener("appear", this.getAllianceMailingLists, this);
		},
		members:   {
			_wcText:                 null,
			_lists:                  null,
			_continents:             null,
			_count:                  0,
			buildUI:                 function() {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.VBox(10));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      true
				});
				this.setWidth(400);
				webfrontend.gui.Util.formatWinClose(this);
				var wcLabel = new qx.ui.basic.Label("Alliance Mailing Lists").set({
					font: "bold"
				});
				this.add(wcLabel);
				this._wcText = new qx.ui.form.TextArea();
				this._wcText.set({
					readOnly:   true,
					allowGrowY: false,
					autoSize:   false,
					tabIndex:   303,
					height:     280
				});
				app.setElementModalInput(this._wcText);
				this._wcText.setValue("Loading...");
				this.add(this._wcText);

				// Close button
				var closeButton = new qx.ui.form.Button("Close");
				closeButton.addListener("execute", this.hide, this);
				this.add(closeButton);
			},
			getAllianceMailingLists: function() {
				var allianceID = webfrontend.data.Alliance.getInstance().getId();
				this._count = 0;

				// Send command
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("GetPublicAllianceMemberList", {
					id: allianceID
				}, this, this.gotAlliancePlayers);
			},
			gotAlliancePlayers:      function(ok, response) {
				if(ok) {
					this._lists = new Array();
					this._continents = new Array();
					var commandManager = webfrontend.net.CommandManager.getInstance();
					this._count = response.length;
					for(var ii = 0; ii < response.length; ++ii) {
						commandManager.sendCommand("GetPublicPlayerInfo", {
							id: response[ii].i
						}, this, this.gotPlayerInfo);
					}
				}
			},
			gotPlayerInfo:           function(ok, response) {
				--this._count;
				if(ok) {
					var server = webfrontend.data.Server.getInstance();
					var str = this._wcText.getValue();
					var cities = response.c;
					for(var ii = 0; ii < cities.length; ++ii) {
						var continent = server.getContinentFromCoords(cities[ii].x, cities[ii].y);
						var found = false;
						for(var a = 0; a < this._continents.length; ++a) {
							if(this._continents[a] == continent) {
								found = true;
								break;
							}
						}
						if(!found) {
							this._continents[this._continents.length] = continent;
						}
						if(!this._lists[continent]) {
							this._lists[continent] = "";
						}
						if(this._lists[continent].indexOf(response.n) < 0) {
							this._lists[continent] += (this._lists[continent].length > 0 ? ";" : "") + response.n;
						}
					}
					if(this._count == 0) {
						var str = "";
						this._wcText.setValue(str);
						for(var ii = 0; ii < this._continents.length; ++ii) {
							this._wcText.setValue(this._wcText.getValue() + "Continent " + this._continents[ii] + "\r\n" + this._lists[this._continents[ii]] + "\r\n\r\n");
						}
					}
				}
			}
		}
	});
	qx.Class.define("ava.ReturnByWindow", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function() {
			this.base(arguments, 'Return raids by');
			this.buildUI();
			// Refresh info every time
			//this.addListener("appear", this.returnRaidsBy, this);
		},
		members:   {
			_returnTime:         null,
			buildUI:             function() {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.VBox(2));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      false
				});
				this.setWidth(200);
				webfrontend.gui.Util.formatWinClose(this);
				var wcLabel = new qx.ui.basic.Label("Return all raids by:").set({
					font: "bold"
				});
				this.add(wcLabel);
				this._returnTime = new ava.TimePicker("Return time:");
				this.add(this._returnTime);
				var firstRow = new qx.ui.container.Composite();
				firstRow.setLayout(new qx.ui.layout.HBox());
				this.add(firstRow);

				// Apply button
				var applyButton = new qx.ui.form.Button("Apply");
				applyButton.addListener("execute", this.returnRaidsBy, this);
				firstRow.add(applyButton);

				// Apply button
				var applyAllButton = new qx.ui.form.Button("Apply to all");
				applyAllButton.set({
					marginLeft:  5,
					marginRight: 5,
					toolTipText: "Apply all raids in current city group."
				});
				var _this = this;
				applyAllButton.addListener("execute", (function() {
					addConsumer("COMO", _this.returnAllRaidsBy, _this, "a");
				}), this);
				firstRow.add(applyAllButton);

				// Close button
				var closeButton = new qx.ui.form.Button("Close");
				closeButton.addListener("execute", this.hide, this);
				firstRow.add(closeButton);
			},
			sendReturnOrder:     function(request) {
				// Send command
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("UnitOrderSetRecurringOptions", request, null, function(unknown, ok) {
				});
			},
			returnOrder:         function(request, delay) {
				var _this = this;
				setTimeout(function() {

					_this.sendReturnOrder(request);

				}, delay);
			},
			hasCity:             function(cityList, cityId) {
				var retVal = false;
				for(var elem in cityList) {
					if(cityId == elem) {
						retVal = true;
						break;
					}
				}
				return retVal;
			},
			showContinueMessage: function(msgText, sendingMsgText, requestArray, thisObj) {
				var win = new qx.ui.window.Window("Continue?");
				win.setLayout(new qx.ui.layout.VBox(2));
				win.set({
					showMaximize:  false,
					showMinimize:  false,
					allowMaximize: false,
					width:         400,
					height:        80
				});

				win.lbl = new qx.ui.basic.Label(msgText).set({
					rich: true
				});

				win.add(win.lbl);
				var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				win.add(row);
				var btn = new qx.ui.form.Button("Yes").set({
					appearance:    "button-text-small",
					width:         80,
					paddingLeft:   5,
					paddingRight:  5,
					paddingTop:    0,
					paddingBottom: 0
				});
				btn.win = win;
				btn.requestArray = requestArray;
				row.add(btn);
				btn.addListener("click", function() {
					ava.Chat.getInstance().addChatMessage(sendingMsgText, false);
					var requests = this.requestArray;
					var delay = 500;
					for(var i = 0; i < requests.length; i++) {
						thisObj.returnOrder(JSON.parse(requests[i]), delay);
						delay += 1000;
					}
					this.win.hide();
				});
				var btn2 = new qx.ui.form.Button("No").set({
					appearance:    "button-text-small",
					width:         80,
					paddingLeft:   5,
					paddingRight:  5,
					paddingTop:    0,
					paddingBottom: 0
				});
				btn2.win = win;
				row.add(btn2);
				btn2.addListener("click", function() {
					this.win.hide();
				});
				win.addListener("close", function() {
				}, this);
				win.center();
				win.open();
			},
			returnAllRaidsBy:    function(results, thisObj) {
				if(results == null)
					return;
				removeConsumer("COMO", thisObj.returnAllRaidsBy, thisObj);
				var combatTools = ava.CombatTools;
				var returnBy = thisObj._returnTime.getValue().getTime();
				var rb = new Date(returnBy);
				var app = qx.core.Init.getApplication();
				returnBy = rb.getTime();
				var st = webfrontend.data.ServerTime.getInstance();
				var serverStep = st.getServerStep();
				var gn = webfrontend.Util.getCurrentTime();
				var gameNow = gn.getTime();
				var delta = Math.floor((returnBy - gameNow) / 1000) + 1;
				returnBy = serverStep + delta;
				var player = webfrontend.data.Player.getInstance();
				var cityList = player.cities;
				var cids;
				var groupId = app.cityBar.citiesSelect.getSelectedGroupId();
				for(var ii = 0; ii < player.citygroups.length; ++ii) {
					if(player.citygroups[ii].i == groupId) {
						cids = player.citygroups[ii].c;
						break;
					}
				}
				if(!cids) {
					cids = new Array();
					for(var elem in cityList) {
						cids.push(Number(elem));
					}
				}
				var count = 0;
				var requestArray = new Array();
				for(var i = 0; i < results.length; i++) {
					var result = results[i];
					if(result.hasOwnProperty("c") && cids.indexOf(result.i) >= 0 && (cityList.length == 0 || thisObj.hasCity(cityList, result.i))) {
						for(var j = 0; j < result.c.length; j++) {
							var order = result.c[j];
							if(order.t == ava.CombatTools.RAID_ORDER_ID) {
								++count;
								var request = '{"cityid":' + result.i + ', "id":' + order.i + ', "isDelayed":' + (order.s == 0) + ', "recurringType": 2, "recurringEndStep": ' + (returnBy) + '}';
								requestArray.push(request);
							}
						}
					}
				}
				if(count > 0) {
					var steps = count;
					var hr = steps / 3600;
					var remHr = Math.floor(hr);
					var min = (steps - (remHr * 3600)) / 60;
					var remMin = Math.floor(min);
					var sec = (steps - (remHr * 3600) - (remMin * 60));
					var remSec = Math.floor(sec);
					var remainingTime = checkTime(remHr) + ":" + checkTime(remMin) + ":" + checkTime(remSec);
					thisObj.showContinueMessage('Are you sure? ' + count + ' orders will be sent.  This will take approximately ' + remainingTime + '.', ' Sending ' + count + ' orders.  This will take approximately ' + remainingTime + '.', requestArray, thisObj);
				} else {
					ava.Chat.getInstance().addChatMessage(' No raids found.', false);
				}
				thisObj.hide();
			},
			returnRaidsBy:       function() {
				var combatTools = ava.CombatTools;
				var returnBy = this._returnTime.getValue().getTime();
				var rb = new Date(returnBy);
				var app = qx.core.Init.getApplication();
				var groupId = app.cityBar.citiesSelect.getSelectedGroupId();
				returnBy = rb.getTime();
				var st = webfrontend.data.ServerTime.getInstance();
				var serverStep = st.getServerStep();
				var gn = webfrontend.Util.getCurrentTime();
				var gameNow = gn.getTime();
				var delta = Math.floor((returnBy - gameNow) / 1000) + 1;
				returnBy = serverStep + delta;
				var currRecurrType = 2;
				var orders = webfrontend.data.City.getInstance().unitOrders;
				for(var i in orders) {
					if(orders[i].type == ava.CombatTools.RAID_ORDER_ID) {
						webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
							cityid:           webfrontend.data.City.getInstance().getId(),
							id:               orders[i].id,
							isDelayed:        orders[i].isDelayed,
							recurringType:    currRecurrType,
							recurringEndStep: (returnBy)
						}, null, function() {
						});
					}
				}
				this.hide();
			}
		}
	});



	var shrineNames = ["Inactive", "Compassion", "Honesty", "Honor", "Humility", "Justice", "Sacrifice", "Spirituality", "Valor"];

	function convertIdToCoordinates(id) {
		var o = convertIdToCoordinatesObject(id);
		return o.xPos + ":" + o.yPos;
	}

	var playerIds = null;
	var cityIds = null;
	var cityArray = null;
	var reportIds = null;
	var playerIx = 0;
	var cityIx = 0;
	var reportIx = 0;
	var wcTextBox = null;
	var wcTextBox1 = null;
	var wcpTextBox = null;
	var numDays = null;
	var myAllianceName = null;
	var commandManager = null;
	var server = null;
	var dNow = new Date();

	function gotOwnPlayerReportHeader(ok, response) {
		if(ok) {
			for(var ii = 0; ii < response.length; ++ii) {
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;
				var rDate = new Date();
				rDate.setTime(Number(response[ii].d) + serverOffset - localOffset);
				var dif = (rDate.getTime() - dNow.getTime()) / 1000;
				if(dif > 0) {
					var rId = response[ii].i;
					reportIds[reportIds.length] = String(rId);
				}
			}
		}
		sendOwnReportCommands();
	}

	function getPlayerOwnReports() {
		var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
		var localOffset = -new Date().getTimezoneOffset() * 60000;
		dNow.setTime((new Date()).getTime() + serverOffset - localOffset);
		dNow.setHours(0);
		dNow.setMinutes(0);
		dNow.setSeconds(0);
		dNow.setDate(dNow.getDate() - Number(numDays));
		wcpTextBox.setValue('scan own reports');
		commandManager.sendCommand("ReportGetHeader", {
			sPlayerName: webfrontend.data.Player.getInstance().getName(),
			folder:      0,
			city:        -1,
			start:       0,
			end:         100,
			sort:        1,
			ascending:   false,
			mask:        200703
		}, this, gotOwnPlayerReportHeader);
	}

	function getPlayerOwnReportCities() {
		if(cityIds.length > cityIx) {
			wcpTextBox.setValue('retrieve cityId[' + cityIds[cityIx] + ']');
			commandManager.sendCommand("GetPublicCityInfo", {
				id: cityIds[cityIx++]
			}, this, gotPlayerOwnCityInfo);
			window.setTimeout(getPlayerOwnReportCities, 1000);
		} else {
			wcpTextBox.setValue('Done.');
		}
	}

	function gotPlayerOwnCityInfo(ok, response) {
		if(ok) {
			var w = new RegExp("##" + convertCoordinatesToId(response.x, response.y) + "ll##", "g");
			var s = new RegExp("##" + convertCoordinatesToId(response.x, response.y) + "hc##", "g");
			wcTextBox.setValue(wcTextBox.getValue().replace(w, (response.w == "0" ? "true" : "false")));
			wcTextBox.setValue(wcTextBox.getValue().replace(s, (response.s == "0" ? "false" : "true")));
			wcTextBox1.setValue(wcTextBox1.getValue().replace(w, (response.w == "0" ? "onWater" : "landlocked")));
			wcTextBox1.setValue(wcTextBox1.getValue().replace(s, (response.s == "0" ? "noCastle" : "hasCastle")));
			w = new RegExp("##0ll##", "g");
			s = new RegExp("##0hc##", "g");
			wcTextBox.setValue(wcTextBox.getValue().replace(w, "MISSING CITY"));
			wcTextBox.setValue(wcTextBox.getValue().replace(s, "MISSING CITY"));
			wcTextBox1.setValue(wcTextBox1.getValue().replace(w, "MISSING CITY"));
			wcTextBox1.setValue(wcTextBox1.getValue().replace(s, "MISSING CITY"));
		}
	}

	function sendOwnReportCommands() {
		if(reportIds.length > reportIx) {
			wcpTextBox.setValue('retrieve reportId[' + reportIds[reportIx] + ']');
			commandManager.sendCommand("GetReport", {
				id: reportIds[reportIx++]
			}, this, gotOwnPlayerReport);
			window.setTimeout(sendOwnReportCommands, 1000);
		} else {
			getPlayerOwnReportCities();
		}
	}

	function gotOwnPlayerReport(ok, response) {
		if(ok && response.s) {
			wcpTextBox.setValue('got report [' + formatDate(response.h.d) + '] ');
			var str = wcTextBox.getValue();
			var str1 = wcTextBox1.getValue();
			if(response.a[1] && response.a[1].c) {
				cityIds[cityIds.length] = String(response.a[1].c[0].i);
				var troops = "";
				var fortifications = "";
				var buildings = " ";
				for(var ii = 0; ii < response.s.length; ++ii) {
					switch(String(response.s[ii].t)) {
						case "15":
							if(!buildings.indexOf(" CG ") >= 0) {
								buildings += "CG ";
							}
							break;
						case "16":
							if(!buildings.indexOf(" TG ") >= 0) {
								buildings += "TG ";
							}
							break;
						case "17":
							if(!buildings.indexOf(" ST ") >= 0) {
								buildings += "ST ";
							}
							break;
						case "18":
							if(!buildings.indexOf(" WS ") >= 0) {
								buildings += "WS ";
							}
							break;
						case "19":
							if(!buildings.indexOf(" SY ") >= 0) {
								buildings += "SY ";
							}
							break;
						case "36":
							if(!buildings.indexOf(" MT ") >= 0) {
								buildings += "MT ";
							}
							break;
						case "37":
							if(!buildings.indexOf(" TT ") >= 0) {
								buildings += "TT ";
							}
							break;
						case "38":
							if(!fortifications.indexOf(" L ") >= 0) {
								fortifications += "L ";
							}
							break;
						case "39":
							if(!fortifications.indexOf(" BT ") >= 0) {
								fortifications += "BT ";
							}
							break;
						case "40":
							if(!fortifications.indexOf(" GT ") >= 0) {
								fortifications += "GT ";
							}
							break;
						case "41":
							if(!fortifications.indexOf(" RT ") >= 0) {
								fortifications += "RT ";
							}
							break;
						case "42":
							if(!fortifications.indexOf(" TP ") >= 0) {
								fortifications += "TP ";
							}
							break;
						case "43":
							if(!fortifications.indexOf(" PF ") >= 0) {
								fortifications += "PF ";
							}
							break;
						case "44":
							if(!buildings.indexOf(" BR ") >= 0) {
								buildings += "BR ";
							}
							break;
						case "45":
							if(!fortifications.indexOf(" AT ") >= 0) {
								fortifications += "AT ";
							}
							break;
						case "46":
							if(!fortifications.indexOf(" CT ") >= 0) {
								fortifications += "CT ";
							}
							break;
						default:
							break;
					}
				}
				for(var ii = 0; ii < response.a[1].u.length; ++ii) {
					switch(String(response.a[1].u[ii].t)) {
						case "1":
							troops += "CG ";
							break;
						case "2":
							troops += "BL ";
							break;
						case "3":
							troops += "RG ";
							break;
						case "4":
							troops += "GD ";
							break;
						case "5":
							troops += "TP ";
							break;
						case "6":
							troops += "ZK ";
							break;
						case "7":
							troops += "MG ";
							break;
						case "8":
							troops += "SC ";
							break;
						case "9":
							troops += "XB ";
							break;
						case "10":
							troops += "PL ";
							break;
						case "11":
							troops += "KN ";
							break;
						case "12":
							troops += "WL ";
							break;
						case "13":
							troops += "RM ";
							break;
						case "14":
							troops += "CT ";
							break;
						case "15":
							troops += "FR ";
							break;
						case "16":
							troops += "SL ";
							break;
						case "17":
							troops += "WG ";
							break;
						case "19":
							troops += "BA ";
							break;
						default:
							break;
					}
				}
				var tmpStr = formatDate(response.h.d) + "," + convertIdToCoordinates(response.a[1].c[0].i) + "," + buildings + "," + fortifications + "," + troops + "," + formatReportId(response.sid);
				wcTextBox.setValue(str.substring(0, str.length - 1) + (str.length > 2 ? "," : "") + "{\"cityId\":" + response.a[1].c[0].i + ",\"name\":\"" + response.a[1].c[0].n + "\",\"isLandlocked\":" + ("##" + response.a[1].c[0].i + "ll##") + ",\"hasCastle\":" + ("##" + response.a[1].c[0].i + "hc##") + ",\"owner\":\"" + response.a[1].pn + "\",\"description\":\"" + tmpStr + "\",\"lastModified\":" + response.h.d + ",\"modifiedBy\":\"Serpent Isle\"}]");
				wcTextBox1.setValue(str1 + "\r\n" + tmpStr.replace(/,/g, "\t") + "\t" + ("##" + response.a[1].c[0].i + "ll##") + "\t" + ("##" + response.a[1].c[0].i + "hc##"));
			}
		}
	}

	qx.Class.define("ava.PlayerReporstWindow", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function() {
			this.base(arguments, 'Scouting Reports');
			this.buildUI();
		},
		members:   {
			_wcpText:         null,
			_wcText:          null,
			_wcText1:         null,
			cityArray:        null,
			buildUI:          function() {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.VBox(10));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      true
				});
				this.setWidth(400);
				webfrontend.gui.Util.formatWinClose(this);
				var wcLabel = new qx.ui.basic.Label("Scouting Reports").set({
					font: "bold"
				});
				this.add(wcLabel);
				this._wcpText = new qx.ui.form.TextArea();
				this._wcpText.set({
					readOnly:   true,
					allowGrowY: false,
					autoSize:   false,
					tabIndex:   302,
					height:     30
				});
				app.setElementModalInput(this._wcpText);
				this._wcpText.setValue("");
				this.add(this._wcpText);
				wcpTextBox = this._wcpText;
				wcLabel = new qx.ui.basic.Label("BOS Tools Intelligence Format").set({
					font: "bold"
				});
				this.add(wcLabel);
				this._wcText = new qx.ui.form.TextArea();
				this._wcText.set({
					readOnly:   true,
					allowGrowY: false,
					autoSize:   false,
					tabIndex:   303,
					height:     150
				});
				app.setElementModalInput(this._wcText);
				this._wcText.setValue("");
				this.add(this._wcText);
				wcTextBox = this._wcText;
				wcLabel = new qx.ui.basic.Label("Ava Format").set({
					font: "bold"
				});
				this.add(wcLabel);
				this._wcText1 = new qx.ui.form.TextArea();
				this._wcText1.set({
					readOnly:   true,
					allowGrowY: false,
					autoSize:   false,
					tabIndex:   303,
					height:     150
				});
				app.setElementModalInput(this._wcText1);
				this._wcText1.setValue("");
				this.add(this._wcText1);
				wcTextBox1 = this._wcText1;
				var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				var label = new qx.ui.basic.Label("Number of days to get");
				label.set({
					font: "bold"
				});
				row.add(label, {
					left: 13,
					top:  8
				});
				this._numDays = new qx.ui.form.TextField();
				this._numDays.set({
					toolTipText: "Number of days to get"
				});
				app.setElementModalInput(this._numDays);
				this._numDays.setValue("1");
				row.add(this._numDays);
				numDays = "1";
				this._numDays.addListener("changeValue", this.setNumDays, this);

				// go button
				var goButton = new qx.ui.form.Button("Go");
				goButton.addListener("execute", this.getplayerReports, this);
				row.add(goButton);

				// Close button
				var closeButton = new qx.ui.form.Button("Close");
				closeButton.addListener("execute", this.hide, this);
				row.add(closeButton);
				this.add(row);
				myAllianceName = webfrontend.data.Alliance.getInstance().getName().toLowerCase();
			},
			setNumDays:       function(e) {
				numDays = this._numDays.getValue();
			},
			getplayerReports: function() {
				playerGetRange = new Array();
				this.cityArray = new Array();
				server = webfrontend.data.Server.getInstance();
				playerIds = new Array();
				cityIds = new Array();
				cities = new Array();
				cityArray = new Array();
				reportIds = new Array();
				playerIx = 0;
				reportIx = 0;
				cityIx = 0;
				reportIx = 0;
				reportIds = new Array();
				commandManager = webfrontend.net.CommandManager.getInstance();
				this._wcText.setValue("[]");
				this._wcText1.setValue("");
				getPlayerOwnReports();
			}
		}
	});
	qx.Class.define("ava.CombatTools", {
		type:    "static",
		statics: {
			DO_NOT_ATTACK_UNITS:     {
				"1": true
			},
			DO_NOT_PLUNDER_UNITS:    {
				"77": true,
				"13": true,
				"14": true,
				"2":  true
			},

			NOW_TIMING_ID:           1,
			DEPATATURE_TIMING_ID:    2,
			ARRIVAL_TIMING_ID:       3,
			ORDER_CANCEL_PERIOD_S:   600,
			DEFAULT_MIN_TS:          3000,
			/**
			 * Units in format {type,name,ts,kind,transport,off,forceSiege}, where
			 *
			 * ts - space one unit takes
			 * kind - l=land, s=siege, t=transport, w=ship, c=scout, b=baron
			 * off - attack type - i=infantry, c=cAvalry, m=magic, s=siege, d=demolish
			 * forceSiege - this unit is always supposed to siege (never assault or plunder)
			 */
			UNITS:                   {
				CITY_GUARD: {
					type:      "1",
					name:      "City Guard",
					ts:        0,
					kind:      "g",
					defensive: true
				},
				BALLISTA:   {
					type:      "2",
					name:      "Ballista",
					ts:        10,
					kind:      "s",
					defensive: true
				},
				RANGER:     {
					type:      "3",
					name:      "Ranger",
					ts:        1,
					kind:      "l",
					off:       "i",
					defensive: true
				},
				GUARDIAN:   {
					type:      "4",
					name:      "Guardian",
					ts:        1,
					kind:      "l",
					off:       "i",
					defensive: true
				},
				TEMPLAR:    {
					type:      "5",
					name:      "Templar",
					ts:        1,
					kind:      "l",
					off:       "i",
					defensive: true
				},
				BERSEKER:   {
					type:      "6",
					name:      "Berseker",
					ts:        1,
					kind:      "l",
					off:       "i",
					defensive: false
				},
				MAGE:       {
					type:      "7",
					name:      "Mage",
					ts:        1,
					kind:      "l",
					off:       "m",
					defensive: false
				},
				SCOUT:      {
					type:      "8",
					name:      "Scout",
					ts:        2,
					kind:      "c",
					off:       "c",
					defensive: false
				},
				XBOW:       {
					type:      "9",
					name:      "Crossbow",
					ts:        2,
					kind:      "l",
					off:       "c",
					defensive: true
				},
				PALADIN:    {
					type:      "10",
					name:      "Paladin",
					ts:        2,
					kind:      "l",
					off:       "c",
					defensive: true
				},
				KNIGHT:     {
					type:      "11",
					name:      "Knight",
					ts:        2,
					kind:      "l",
					off:       "c",
					defensive: false
				},
				WARLOCK:    {
					type:      "12",
					name:      "Warlock",
					ts:        2,
					kind:      "l",
					off:       "m",
					defensive: false
				},
				RAM:        {
					type:       "13",
					name:       "Ram",
					ts:         10,
					kind:       "s",
					off:        "s",
					forceSiege: true,
					defensive:  false
				},
				CATAPULT:   {
					type:       "14",
					name:       "Catapult",
					ts:         10,
					kind:       "s",
					off:        "d",
					forceSiege: true,
					defensive:  false
				},
				FRIGATE:    {
					type:      "15",
					name:      "Frigate",
					ts:        100,
					kind:      "t",
					transport: 500,
					off:       "s",
					defensive: false
				},
				SLOOP:      {
					type:      "16",
					name:      "Sloop",
					ts:        100,
					kind:      "w",
					off:       "s",
					defensive: true
				},
				GALLEON:    {
					type:       "17",
					name:       "War Galleon",
					ts:         400,
					kind:       "w",
					off:        "d",
					forceSiege: true,
					defensive:  false
				},
				BARON:      {
					type:       "19",
					name:       "Baron",
					ts:         1,
					kind:       "b",
					off:        "d",
					forceSiege: true,
					defensive:  false
				},
				DRAGON:     {
					type:       "77",
					name:       "dragon",
					ts:         10000,
					kind:       "l",
					off:        "c",
					forceSiege: false,
					defensive:  false
				}
			},
			_unitsByType:            null,
			/**
			 * Regex to remove all BB code tags from text.
			 *
			 * @param str String to clean.
			 */
			removeBBcode:            function(str) {
				return str.replace(/\[\/?\w+\]/g, "");
			},
			/**
			 * Normalizes format of coordinations to xxx:yyy form.
			 *
			 * @param value Coords in x:y format, may be wrapped in BB code.
			 * @return String in xxx:yyy format.
			 */
			normalizeCoords:         function(value) {
				if(value == null)
					return null;

				// Remove potential BB code
				value = this.removeBBcode(value).trim();

				// Parse value
				var m = value.match(/^(\d{1,3}):(\d{1,3})$/);
				if(m == null)
					return null;

				// Pad zeroes
				var x = m[1],
					y = m[2];
				return qx.lang.String.pad(x, 3, "0") + ":" + qx.lang.String.pad(y, 3, "0");
			},
			/**
			 * Parses the coordinates in format xxx:yyy.
			 *
			 * @param value Coordinates in string.
			 * @return [x, y]
			 */
			parseCoords:             function(value) {
				var m = value.match(/^0*(\d{1,3}):0*(\d{1,3})$/);
				if(m == null)
					return null;
				return [parseInt(m[1]), parseInt(m[2])];
			},
			/**
			 * Converts city ID to coordinates.
			 *
			 * @param id City ID.
			 * @return [x, y]
			 */
			cityIdToCoords:          function(id) {
				var x = id & 0xFFFF;
				var y = (id >> 16) & 0xFFFF;
				return [x, y];
			},
			cityIdToCont:            function(id) {
				var sourceCoords = this.cityIdToCoords(id);
				return webfrontend.data.Server.getInstance().getContinentFromCoords(sourceCoords[0], sourceCoords[1]);
			},
			/**
			 * Returns unit details by its type.
			 *
			 * @param type Unit type (number).
			 * @return Unit details or null.
			 */
			getUnitByType:           function(type) {
				if(this._unitsByType == null) {
					var map = {};

					// Initialize
					qx.lang.Object.getValues(this.UNITS).forEach(function(u) {
						map[u.type] = u;
					});
					this._unitsByType = map;
				}

				// Return value
				return this._unitsByType[type];
			},
			/**
			 * Gets Available units for attack. Includes all scheduled orders, except raids.
			 * Raids are supposed to be cancelled manually.
			 *
			 * @param city {Object} Source city object.
			 * @param includeActive {Boolean} if true, active orders will be included as Available.
			 * @param excludeDefense {Boolean} if true, only offensive units will be used.
			 * @param excludeNavy {Boolean} If true, only land units will be used.
			 * @return {Object} Unit lists in format {all, land, siege, ships, transport}.
			 */
			getAvailableUnits:       function(city, includeActive, excludeDefense, excludeNavy) {
				var units = city.getUnits();
				var unitOrders = city.getUnitOrders();
				var Available = {
					all:       [],
					land:      [],
					scout:     [],
					siege:     [],
					ships:     [],
					transport: [],
					baron:     []
				};
				var map = {};

				if(units == null) {
					return Available;
				}

				// First fill in total counts
				qx.lang.Object.getKeys(units).forEach(function(type) {
					if(type == this.UNITS.CITY_GUARD.type)
						return;
					var u = units[type];
					if(u.total > 0) {
						// Add to info to the list
						var info = this.getUnitByType(type);

						if(excludeDefense && info.defensive) {
							return;
						}

						if(excludeNavy && (info.kind == "w" || info.kind == "t")) {
							return;
						}
						var unit = {
							type:         type,
							name:         info.name,
							count:        u.total,
							unitTS:       info.ts,
							kind:         info.kind,
							unitCapacity: info.transport,
							off:          info.off,
							forceSiege:   info.forceSiege,
							defensive:    info.defensive
						};
						Available.all.push(unit);
						map[unit.type] = unit;

						switch(info.kind) {
							case "l":
								Available.land.push(unit);
								break;
							case "c":
								Available.scout.push(unit);
								break;
							case "s":
								Available.siege.push(unit);
								break;
							case "t":
								Available.transport.push(unit);
								break;
							case "w":
								Available.ships.push(unit);
								break;
							case "b":
								Available.baron.push(unit);
								break;
						}
					}
				}, this);

				if(unitOrders != null) {
					unitOrders.forEach(function(order) {
						if(includeActive && order.state != 0) {
							return;
						}

						// Iterate thru units
						order.units.forEach(function(u) {
							var unit = map[u.type];

							if(unit != undefined) {
								unit.count -= u.count;
							}
						});
					}, this);
				}
				return Available;
			},
			/**
			 * Send troops to specified target.
			 *
			 * @param units Unit array, in format {"type":"11","count":555}
			 * @param target Target city coordinates, string in format "xxx:yyy"
			 * @param attackType Id of the attack type
			 * @param timingType Type of attack schedule (now/deparature/arrival)
			 * @param timeMillis Time of attack execution, in milliseconds, UTC based
			 * @param callback Function to call after command issueincom
			 */
			orderUnits:              function(units, target, attackType, timingType, timeMillis, callback) {
				// Inspired by LoUDefiant extension
				var _this = this;
				var activeCity = webfrontend.data.City.getInstance();

				// Validate target format
				target = this.removeBBcode(target).trim();
				if(!target.match(/^\d{3}:\d{3}$/)) {
					throw new Error("Invalid target format '" + target + "'");
				}

				// Validate and prepare final list
				var unitList = [];
				var isNAval = false;
				units.forEach(function(u) {
					if(u.count < 1)
						return;
					isNAval = isNAval || (u.type >= 15 && u.type <= 17);

					if(_this.DO_NOT_ATTACK_UNITS[u.type])
						throw new Error("Invalid unit ordered to attack");
					if(attackType == _this.PLUNDER_ORDER_ID && _this.DO_NOT_PLUNDER_UNITS[u.type])
						throw new Error("Invalid unit ordered to plunder");

					// Convert to order format {t,c}
					unitList.push({
						t: u.type,
						c: u.count
					});
				});
				if(unitList.length < 1) {
					throw new Error("No units selected");
				}

				// Prepare request
				var request = {
					cityid:                     activeCity.getId(),
					units:                      unitList,
					targetCity:                 target,
					order:                      attackType,
					transport:                  isNAval ? 2 : 1,
					timeReferenceType:          timingType,
					referenceTimeUTCMillis:     timeMillis + 1000,
					raidTimeReferenceType:      0,
					raidReferenceTimeUTCMillis: 0
				};

				// Send command
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("OrderUnits", request, null, callback);
			},
			getOrder:                function(city, orderId) {
				var unitOrders = city.getUnitOrders();
				if(unitOrders != null) {
					for(var i = 0; i < unitOrders.length; i++) {
						if(unitOrders[i].id == orderId) {
							return unitOrders[i];
						}
					}
				}
				return null;
			},
			canOrderBeCancelled:     function(order) {
				var serverTime = webfrontend.data.ServerTime.getInstance();
				return (order.state != 2) && (order.start > serverTime.getServerStep() - this.ORDER_CANCEL_PERIOD_S);
			},
			/**
			 * Cancels the given order, if exists in the current city.
			 *
			 * @param orderId Attack order ID.
			 * @param callback Callback function, when order has been processed, signature "void function(error)". Mandatory.
			 * @param self Callback context.
			 */
			cancelUnitOrder:         function(orderId, callback, self) {
				var activeCity = webfrontend.data.City.getInstance();
				var order = this.getOrder(activeCity, orderId);

				if(order == null) {
					throw new Error("Order not found");
				}

				if(!this.canOrderBeCancelled(order)) {
					throw new Error("Order cannot be cancelled");
				}

				// Prepare request
				var command = "CancelUnitOrder";
				var request = {
					cityid:    activeCity.getId(),
					id:        orderId,
					isDelayed: order.state == 0
				};

				// Send command
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand(command, request, null, function(unknown, ok) {
					callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
				});
			},
			/**
			 * Cancels the given order, if exists in the current city.
			 *
			 * @param orderId Attack order ID.
			 * @param callback Callback function, when order has been processed, signature "void function(error)". Mandatory.
			 * @param self Callback context.
			 */
			cancelRaidOrder:         function(orderId, callback, self) {
				var activeCity = webfrontend.data.City.getInstance();
				var order = this.getOrder(activeCity, orderId);

				if(order == null) {
					throw new Error("Order not found");
				}
				if(order.type != this.RAID_ORDER_ID) {
					throw new Error("Order is not a raid");
				}

				// Prepare request
				var command = "UnitOrderSetRecurringOptions";
				var request = {
					cityid:        activeCity.getId(),
					id:            orderId,
					isDelayed:     order.state == 0,
					recurringType: 0
				};

				// Send command
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand(command, request, null, function(unknown, ok) {
					callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
				});
			},
			cancelOrder:             function(orderId, callback, self) {
				var activeCity = webfrontend.data.City.getInstance();
				var order = this.getOrder(activeCity, orderId);

				if(order == null) {
					throw new Error("Order not found");
				}

				if(this.canOrderBeCancelled(order)) {
					// Cancel order
					this.cancelUnitOrder(orderId, callback, self);
				} else if(order.type == this.RAID_ORDER_ID) {
					// Reschedule order
					this.cancelRaidOrder(orderId, callback, self);
				} else {
					throw new Error("Order cannot be cancelled");
				}
			},
			/**
			 * Cancelles all orders from the list.
			 *
			 * @param orderIdList List of order IDs.
			 * @param callback Callback function, when order has been processed, signature "void function(error)". Mandatory.
			 * @param self Callback context.
			 */
			cancelOrders:            function(orderIdList, callback, self) {
				var _this = this;

				// Create local copy of the list
				var listCopy = [].concat(orderIdList);
				var delay = 0;

				// Prepare callback
				var cancelFunc;
				cancelFunc = function(error) {
					if(error) {
						callback.call(self, error);
						return;
					}

					// Get next order
					var orderId = listCopy.pop();
					if(orderId) {
						// Issue next order - delay it, so we dont spam server
						paDebug("Next cancelOrder in " + delay);
						setTimeout(function() {
							delay = 500;
							{
								_this.cancelOrder(orderId, cancelFunc);
							}
							/* (ex) {
							 callback.call(self,ex);
							 } */
						}, delay);
					} else {
						// Success
						callback.call(self, null);
					}
				};

				// Initiate sequence
				cancelFunc(null);
			},
			/**
			 * Makes a list of troops for real attack, according to parameters.
			 *
			 * @param AvailUnits Units in format from #getAvailableUnits().
			 * @param nAval true for nAval attack.
			 * @param siege allow demolishen of the target - cats and wgs.
			 * @param baron true for baron siege.
			 * @param scouts true to include Available scouts in the attack
			 * @param limitToTransport send only what ships can carry.
			 * @return Order details in format {totalTS,units}.
			 */
			prepareRealAttackUnits:  function(AvailUnits, nAval, siege, baron, scouts, limitToTransport, minTS) {
				// Send all we can
				var activeCity = webfrontend.data.City.getInstance();
				var order = {
					totalTS: 0,
					units:   []
				};
				if(minTS == undefined || minTS == null) {
					minTS = this.getMinAttackStrength(activeCity.getUnitLimit());
				}

				// Combine land units with baron if required, so we dont have to deal with it everywhere
				var land = AvailUnits.land;
				if(baron) {
					land = AvailUnits.baron.concat(AvailUnits.land);
					// Put baron first, so we never exclude him
				}
				if(nAval) {
					if(AvailUnits.siege.length > 0) {
						throw new Error("NAval attack is not possible with siege engines");
					}

					// Calculate required transport capacity
					var requiredCapacity = 0;
					land.forEach(function(u) {
						requiredCapacity += u.count * u.unitTS;
					});

					// Calculate transport capacity
					var transportCapacity = 0;
					AvailUnits.transport.forEach(function(u) {
						transportCapacity += u.count * u.unitCapacity;
					});

					if(!limitToTransport && transportCapacity < requiredCapacity) {
						throw new Error("Not enough ships to carry your troops");
					}

					// Add ships
					var AvailableCapacity = transportCapacity;
					order.units = AvailUnits.transport.concat(AvailUnits.ships);
					order.isPartial = false;

					if(scouts) {
						// Note: By adding scouts last, they will be included only when they fit
						land = land.concat(AvailUnits.scout);
					}

					// Add only units that fit
					land.forEach(function(u) {
						if(AvailableCapacity > u.unitTS) {
							// Copy unit with Available count
							var unitOrder = qx.lang.Object.clone(u);
							unitOrder.count = Math.min(unitOrder.count, Math.floor(AvailableCapacity / u.unitTS));
							order.isPartial = order.isPartial || (unitOrder.count < u.count);
							order.units.push(unitOrder);
							AvailableCapacity -= unitOrder.count * unitOrder.unitTS;
						}
					});
				} else {
					// Ignore ships, no other validation needed
					order.units = land.concat(AvailUnits.siege);

					if(scouts) {
						order.units = order.units.concat(AvailUnits.scout);
					}
				}

				if(!siege) {
					console.log("!seige");
					// Iterate over copy of the array
					[].concat(order.units).forEach(function(u) {
						if(u.kind != "b" && u.off == "d") {
							order.units.splice(order.units.indexOf(u), 1);
						}
					});
				}

				if(order.units.length < 1) {
					throw new Error("No troops Available");
				}

				// Calculate total TS
				order.units.forEach(function(u) {
					order.totalTS += (u.count * u.unitTS);
				});
				if(order.totalTS < minTS) {
					throw new Error("Not enough troops Available");
				}
				return order;
			},
			prepareFakeAttackUnits:  function(AvailUnits, nAval, minTS, baron) {
				var activeCity = webfrontend.data.City.getInstance();
				var sorted,
					fake,
					neededCount,
					unitOrder;
				if(minTS == undefined || minTS == null) {
					minTS = this.getMinAttackStrength(activeCity.getUnitLimit());
				}

				// Return value
				var order = {
					totalTS: 0,
					units:   []
				};

				// Helper function
				var sortFunc = function(a, b) {
					return (b.count * b.unitTS) - (a.count * a.unitTS);
				};

				// Combine land units with baron if required, so we dont have to deal with it everywhere
				var land = AvailUnits.land;
				if(nAval) {
					// Sort units from largest bunch to smallest
					sorted = land.concat(AvailUnits.ships).sort(sortFunc);
					if(sorted.length < 1) {
						throw new Error("No troops Available");
					}
					fake = sorted[0];

					if(fake.kind != "w") {
						if(AvailUnits.transport.length < 1) {
							throw new Error("No ships Available");
						}
						var transport = AvailUnits.transport[0];
						var shipCount = Math.ceil(minTS / (transport.unitTS + transport.unitCapacity));
						var landTS = minTS - (shipCount * transport.unitTS);
						var landCount = Math.ceil(landTS / fake.unitTS);

						if(fake.count < landCount) {
							throw new Error("Not enough troops Available");
						}

						if(transport.count < shipCount) {
							throw new Error("Not enough ships to carry your troops");
						}

						// Clone, set count and return
						unitOrder = qx.lang.Object.clone(fake);
						unitOrder.count = landCount;
						var shipOrder = qx.lang.Object.clone(transport);
						shipOrder.count = shipCount;
						order.units = [unitOrder, shipOrder];
					} else {
						neededCount = Math.ceil(minTS / fake.unitTS);

						if(fake.count < neededCount) {
							throw new Error("Not enough troops Available");
						}

						// Clone, set count and return
						unitOrder = qx.lang.Object.clone(fake);
						unitOrder.count = neededCount;
						order.units = [unitOrder];
					}
				} else {
					sorted = land.concat(AvailUnits.siege).sort(sortFunc);
					if(sorted.length < 1) {
						throw new Error("No troops Available");
					}
					fake = sorted[0];
					neededCount = Math.ceil(minTS / fake.unitTS);
					for(var x = 0; x < sorted.length; ++x) {
						if(sorted[x].type == "13") {
							fake = sorted[x];
							neededCount = Math.ceil(minTS / fake.unitTS);
							if(sorted[x].count < neededCount) {
								fake = sorted[0];
								neededCount = Math.ceil(minTS / fake.unitTS);
							}
							break;
						}
					}

					if(fake.count < neededCount) {
						throw new Error("Not enough troops Available");
					}

					// Clone, set count and return
					unitOrder = qx.lang.Object.clone(fake);
					unitOrder.count = neededCount;
					if(baron) {
						var baronOrder = {
							"type":       "19",
							"name":       "Baron",
							"count":      1,
							"unitTS":     1,
							"kind":       "b",
							"off":        "d",
							"forceSiege": true,
							"defensive":  false
						};
						order.units = [unitOrder, baronOrder];
					} else {
						order.units = [unitOrder];
					}
				}

				// Calculate total TS
				order.units.forEach(function(u) {
					order.totalTS += u.count * u.unitTS;
				});
				return order;
			},
			prepareScoutAttackUnits: function(AvailUnits, nAval, minimal, limitToTransport, minTS) {
				var activeCity = webfrontend.data.City.getInstance();
				if(minTS == undefined || minTS == null) {
					minTS = this.getMinAttackStrength(activeCity.getUnitLimit());
				}

				// Return value
				var order = {
					totalTS: 0,
					units:   []
				};

				if(AvailUnits.scout.length < 1) {
					throw new Error("No scouts Available");
				}
				var scout = qx.lang.Object.clone(AvailUnits.scout[0]);
				if(scout.count * scout.unitTS < minTS) {
					throw new Error("Not enough troops Available");
				}

				if(minimal) {
					scout.count = Math.ceil(minTS / scout.unitTS);
				}

				if(nAval) {
					if(AvailUnits.transport.length < 1) {
						throw new Error("No ships Available");
					}
					var transport = qx.lang.Object.clone(AvailUnits.transport[0]);
					var AvailableCapacity = transport.count * transport.unitCapacity;

					if(AvailableCapacity < minTS) {
						throw new Error("Not enough ships to carry your troops");
					}

					if(!limitToTransport) {
						// Validate
						var scoutTS = scout.count * scout.unitTS;
						var shipCount = Math.ceil(scoutTS / transport.unitCapacity);
						if(transport.count < shipCount) {
							throw new Error("Not enough ships to carry your troops");
						}

						// Set ship needed count
						transport.count = shipCount;
					} else {
						// Decrease count (adjustment of transport should not be nescessary)
						scout.count = Math.floor(AvailableCapacity / scout.unitTS);
					}
					order.units.push(transport);
				}
				order.units.push(scout);

				// Calculate total TS
				order.units.forEach(function(u) {
					order.totalTS += u.count * u.unitTS;
				});
				return order;
			},
			getUnitBonus:            function(unitType) {
				var research = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, Number(unitType));
				var shrine = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, Number(unitType));
				return (research + shrine) / 100;
			},
			getUnitBaseDamage:       function(unitType) {
				return webfrontend.res.Main.getInstance().units[unitType].av;
			},
			getUnitDamage:           function(unitType) {
				var base = this.getUnitBaseDamage(unitType);
				var bonus = this.getUnitBonus(unitType);
				return Math.floor(base * (1 + bonus));
			},
			getMinAttackStrength:    function(maxTS) {
				var retVal = 3000;
				if(maxTS <= 20000)
					retVal = 1;
				else if(maxTS <= 40000)
					retVal = 200;
				else if(maxTS <= 60000)
					retVal = 500;
				else if(maxTS <= 80000)
					retVal = 800;
				else if(maxTS <= 100000)
					retVal = 1000;
				else if(maxTS <= 120000)
					retVal = 1200;
				else if(maxTS <= 160000)
					retVal = 1600;
				else if(maxTS <= 200000)
					retVal = 2000;
				else if(maxTS <= 240000)
					retVal = 2500;
				else
					retVal = 3000;
				var oPlayer = webfrontend.data.Player.getInstance();
				var numCities = oPlayer.getNumCities();
				if(numCities >= 100)
					retVal = Math.max(1600, retVal);
				else if(numCities >= 50)
					retVal = Math.max(1200, retVal);
				else if(numCities >= 20)
					retVal = Math.max(800, retVal);
				else if(numCities >= 10)
					retVal = Math.max(500, retVal);
				else if(numCities >= 5)
					retVal = Math.max(200, retVal);
				else if(numCities >= 2)
					retVal = Math.max(20, retVal);
				return retVal;
			},
			/**
			 *
			 * @param units Array of units.
			 * @return
			 */
			getMajorAttackType:      function(units) {
				var i;

				for(i = 0; i < units.length; i++) {
					if(units[i].forceSiege) {
						return "d";
					}
				}

				// Clone and sort list
				var sorted = [].concat(units).sort(function(a, b) {
					return (b.count * b.unitTS) - (a.count * a.unitTS);
				});

				for(i = 0; i < sorted.length; i++) {
					if("lswc".indexOf(sorted[i].kind) > -1) {
						return sorted[i].off;
					}
				}

				throw new Error("Unable to determine attack type");
			},
			/**
			 * Converts the given game time to the UTC time.
			 *
			 * @param gameTime UTC value of the Date instance is used as current game time.
			 *                 Local time of the instance is nonsense.
			 * @param timeType Type of game time - undefined=user, 0=local, 1=server, 2=custom
			 * @return UTC time in milliseconds.
			 */
			convertGameTimeToUtc:    function(gameTime, timeType) {
				if(!(gameTime instanceof Date)) {
					return null;
				}
				timeType = timeType != null ? timeType : webfrontend.config.Config.getInstance().getTimeZone();
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;

				// Its in minutes
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
				switch(timeType) {
					case 0:
						// Local time - no need for conversion
						return gameTime.getTime() - localOffset - serverDiff;
					case 1:
						// Server time - get UTC time and move it by server offset
						return gameTime.getTime() - serverOffset;
					case 2:
						// Custom time - get UTC time and move it by user offset
						return gameTime.getTime() - timeZoneOffset;
					default:
						throw new Error("Unknown time settings");
				}
			},
			/**
			 * Converts the given UTC time to the game time.
			 *
			 * @param utcTime UTC time in milliseconds.
			 * @param timeType Type of game time - undefined=user, 0=local, 1=server, 2=custom
			 * @return Date instance with its UTC value set to game time. Local time of the instance is nonsense.
			 */
			convertUtcToGameTime:    function(utcTime, timeType) {
				if(isNaN(utcTime)) {
					return null;
				}
				timeType = timeType != null ? timeType : webfrontend.config.Config.getInstance().getTimeZone();
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;

				// Its in minutes
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
				switch(timeType) {
					case 0:
						// Local time - to get local time in UTC value (as required by game), add local offset
						return new Date(utcTime + localOffset + serverDiff);
					case 1:
						// Server time - add server offset
						return new Date(utcTime + serverOffset);
					case 2:
						// Custom time - add user offset
						return new Date(utcTime + timeZoneOffset);
					default:
						throw new Error("Unknown time settings");
				}
			},
			getErrorMessage:         function(code) {
				if(code == 0) {
					return "Success";
				} else if(code & 0x400000) {
					return "The chosen time is in the past";
				} else if(code & 0x1) {
					return "No target or unreachable by moongate";
				} else if(code & 0x2) {
					return "Not enough units";
				} else if(code & 0x4) {
					return "Not enough moonstones";
				} else if(code & 0x10) {
					return "Target city has no castle";
				} else if(code & 0x80000) {
					return "Target is not reachable on water";
				} else if(code & 0x400) {
					return "Dungeons can only be raided";
				} else {
					return "Unknown error " + code;
				}
			}
		}
	});
	qx.Class.define("ava.CoordUtils", {
		type:    "singleton",
		extend:  qx.core.Object,
		statics: {
			convertCoordinatesToId:       function(x, y) {
				var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
				return id;
			},
			convertIdToCoodrinates:       function(id) {
				var o = this.convertIdToCoordinatesObject(id);
				return o.xPos + ":" + o.yPos;
			},
			convertIdToCoordinatesObject: function(id) {
				var x = (id & 0xFFFF);
				var y = (id >> 16);

				return {
					xPos: x,
					yPos: y,
					cont: webfrontend.data.Server.getInstance().getContinentFromCoords(x, y)
				};
			}
		}
	});
	qx.Class.define("ava.BossUtils", {
		type:      "static",
		extend:    qx.lang.Object,
		construct: function() {
			this.base(arguments);
		},
		statics:   {
			BOSS_DEFENSE_STRONG: [2500, 15000, 100000, 200000, 500000, 750000, 1000000, 1500000, 2250000, 3000000],
			BOSS_DEFENSE_WEAK:   [1700, 10000, 68000, 132000, 332000, 500000, 680000, 1000000, 1500000, 2000000],
			requestBossInfo:     function(x, y, callback) {
				var _this = this;
				var activeCity = webfrontend.data.City.getInstance();
				var request = {
					cityid: activeCity.getId(),
					x:      x,
					y:      y
				};
				var commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("GetOrderTargetInfo", request, null, function(ok, data) {
					var info = _this.getBossInfo(data);
					if(info) {
						info.name = info.cn;
						info.coords = ava.CombatTools.normalizeCoords(x + ":" + y);
						callback(info);
					} else {
						paDebug("Unable to get target info");
					}
				});
			},
			getBossInfo:         function(data) {
				// Get level
				var m = data.cn.match(/^([^:]+):(\d+)$/);
				if(m == null) {
					return null;
				}
				var lvl = Number(m[2]);

				switch(data.t) {
					case 6:
						// Boss Forest
						return {
							weakness: "c",
							level:    lvl,
							water:    false
						};
					case 7:
						// Boss Mountain
						return {
							weakness: "i",
							level:    lvl,
							water:    false
						};
					case 8:
						// Boss Hill
						return {
							weakness: "i",
							level:    lvl,
							water:    false
						};
					case 12:
						// Boss Sea
						// Note: we need both siege and demo attacks here
						return {
							weakness: "sd",
							level:    lvl,
							water:    true
						};
					default:
						return null;
				}
			},
			prepareAttack:       function(bossInfo) {
				// Get Available units
				var city = webfrontend.data.City.getInstance();
				var AvailUnits = ava.CombatTools.getAvailableUnits(city, false);

				// Which group to use?
				var units = [].concat(bossInfo.water ? AvailUnits.ships : AvailUnits.land);

				// Enrich unit list by strength
				units.forEach(function(u) {
					var dmg = ava.CombatTools.getUnitDamage(u.type);
					if(dmg > 0) {
						u.dmg = dmg;
					}
				});

				// Sort units by total dmg
				units.sort(function(a, b) {
					return (b.count * b.dmg) - (a.count * a.dmg);
				});

				// Go thru units and try to issue an order
				var order;
				for(var i = 0; i < units.length; i++) {
					order = this.getOrder(bossInfo, units[i]);
					if(order != null) {
						break;
					}
				}

				if(order == null) {
					throw new Error("No unit to attack with");
				}
				return order;
			},
			getOrder:            function(bossInfo, unit) {
				// Boss strength
				var str;
				if(bossInfo.weakness.indexOf(unit.off) > -1) {
					str = ava.BossUtils.BOSS_DEFENSE_WEAK[bossInfo.level - 1];
				} else {
					str = ava.BossUtils.BOSS_DEFENSE_STRONG[bossInfo.level - 1];
				}

				// How many units we need?
				var reqCount = Math.ceil(str / unit.dmg);

				if(unit.count < reqCount) {
					return null;
				}

				// Return order
				var unitOrder = qx.lang.Object.clone(unit);
				unitOrder.count = reqCount;
				return [unitOrder];
			},
			sendAttack:          function(x, y, callback) {
				var _this = this;
				this.requestBossInfo(x, y, function(bossInfo) {
					{
						var units = _this.prepareAttack(bossInfo);
						ava.CombatTools.orderUnits(units, bossInfo.coords, 8, 1, 0, function(ok, errorCode) {
							var error = ava.CombatTools.getErrorMessage(errorCode);
							paDebug("Hunt result=" + error);
							if(callback) {
								callback(ok, errorCode, error);
							}
						});
					}
					/* (e) {
					 console.log("Error");
					 console.dir(e);
					 } */
				});
			}
		}
	});
	qx.Class.define("ava.AttackOrder", {
		extend:    qx.ui.container.Composite,
		construct: function() {
			this.base(arguments);
			var combatTools = ava.CombatTools;
			var PLUNDER = {
				label: "Plunder",
				type:  combatTools.PLUNDER_ORDER_ID
			};
			var SIEGE = {
				label: "Siege",
				type:  combatTools.SIEGE_ORDER_ID
			};
			var ASSAULT = {
				label: "Assault",
				type:  ATTACK_ORDER_ID
			};
			var SCOUT = {
				label: "Scout",
				type:  combatTools.SCOUT_ORDER_ID
			};
			this.ATTACK_ACTIONS = [];
			this.ATTACK_ACTIONS.push({
				name:    "fake",
				label:   "Fake",
				allowed: [SIEGE, ASSAULT, PLUNDER, SCOUT],
				tooltip: "Minimal troop count will be sent."
			});
			this.ATTACK_ACTIONS.push({
				name:    "capture",
				label:   "Capture",
				allowed: [SIEGE, ASSAULT],
				tooltip: "Barons will be included in the attack, if Available. No Catapults or Galleons will be sent, only Rams."
			});
			this.ATTACK_ACTIONS.push({
				name:    "fakecap",
				label:   "Fake Cap",
				allowed: [SIEGE, PLUNDER],
				tooltip: "Minimal troop count will be sent. One barons will be included in the attack, if Available."
			});
			this.ATTACK_ACTIONS.push({
				name:    "demo",
				label:   "Demolish",
				allowed: [SIEGE, ASSAULT],
				tooltip: "Catapults and Galleons will be included in the attack."
			});
			this.ATTACK_ACTIONS.push({
				name:    "attack",
				label:   "Attack",
				allowed: [SIEGE, PLUNDER, ASSAULT],
				tooltip: "Simple attack, no Catapults, Galleons or Barons will be included. Rams will be used, if Available."
			});
			this.ATTACK_ACTIONS.push({
				name:    "scout",
				label:   "Scout",
				allowed: [SCOUT],
				tooltip: "Only scouts will be sent."
			});
			this.buildUI();
			this.selectAction(this.ATTACK_ACTIONS[0]);
		},
		events:    {
			attack:      "qx.event.type.Data",
			changeValue: "qx.event.type.Event"
		},
		members:   {
			ATTACK_ACTIONS:     null,
			_attackButton:      null,
			_actionButton:      null,
			_coordsText:        null,
			_toggleButton:      null,
			_noteText:          null,
			_counterLabel:      null,
			_selectedAction:    null,
			_selectedTypeIndex: -1,
			_applyingValue:     false,
			buildUI:            function() {
				var _this = this;
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.HBox(5));

				// Attack button
				var actionMenu = new qx.ui.menu.Menu();
				this.ATTACK_ACTIONS.forEach(function(action) {
					var menuButton = new qx.ui.menu.Button(action.label);
					menuButton.addListener("execute", function() {
						_this.selectAction(action);
					});
					actionMenu.add(menuButton);
				});
				this._attackButton = new qx.ui.form.Button("[Select]");
				this._attackButton.set({
					appearance: "button-text-small",
					width:      80
				});
				this._attackButton.addListener("execute", this.fireAttack, this);
				this._actionButton = new qx.ui.form.MenuButton("?", null, actionMenu);
				this._actionButton.set({
					appearance: "button-text-small",
					width:      20
				});
				var attackControl = new qx.ui.container.Composite();
				attackControl.setLayout(new qx.ui.layout.HBox(1));
				attackControl.add(this._attackButton);
				attackControl.add(this._actionButton);

				// Toggle button
				this._toggleButton = new qx.ui.form.Button("[Select]");
				this._toggleButton.set({
					appearance:  "button-text-small",
					width:       60,
					toolTipText: "Siege Engines and Baron will always siege the target, regardless the option."
				});
				this._toggleButton.addListener("execute", this.onModeToggle, this);

				// Coords
				this._coordsText = new qx.ui.form.TextField();
				this._coordsText.set({
					width:       60,
					marginTop:   1,
					maxLength:   40,
					toolTipText: "Coordinates in xxx:yyy format."
				});
				app.setElementModalInput(this._coordsText);
				this._coordsText.addListener("changeValue", this.onNormalizeCoords, this);
				this._coordsText.addListener("changeValue", this.fireChangeValue, this);
				this.centerImage = new qx.ui.basic.Image("webfrontend/ui/icons/icon_buildings_centerview.png");
				this.centerImage.setWidth(18);
				this.centerImage.setHeight(12);
				this.centerImage.setScale(true);
				this.centerImage.setAlignY("middle");
				this.centerViewBtn = new qx.ui.form.Button();
				this.centerViewBtn.set({
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Go to city"
				});
				this.centerViewBtn.addListener("click", this.findCity, this);
				this.centerViewBtn._add(this.centerImage);

				// Note
				this._noteText = new qx.ui.form.TextField();
				this._noteText.set({
					width:       210,
					toolTipText: "Just a note."
				});
				this._noteText.addListener("changeValue", this.fireChangeValue, this);
				app.setElementModalInput(this._noteText);
				this._counterLabel = new qx.ui.basic.Label();
				this._counterLabel.set({
					minWidth:    30,
					allowGrowX:  true,
					toolTipText: "Indicative count of attacks you have sent to this target. DblClick to remove last entry. I=Infrantry, C=CAvalry, M=Magic, D=Siege Engines"
				});
				this._counterLabel.addListener("dblclick", this.removeLastCount, this);

				// Add to page
				this.add(attackControl);
				this.add(this._coordsText);
				this.add(this._toggleButton);
				this.add(this.centerViewBtn);
				this.add(this._noteText);
				this.add(this._counterLabel);
			},
			findCity:           function() {
				var coords = String(this._noteText.getValue() || "");
				var coordPat = /[0-9][0-9][0-9]:[0-9][0-9][0-9]/i;
				var coordPat1 = /[0-9][0-9][0-9]:[0-9][0-9]/i;
				var coordPat2 = /[0-9][0-9]:[0-9][0-9][0-9]/i;
				var coordPat3 = /[0-9][0-9]:[0-9][0-9]/i;
				coords = coords.match(coordPat) || coords.match(coordPat1) || coords.match(coordPat2) || coords.match(coordPat3);
				if(coords) {
					coords = coords[0].split(":");
					var x = Number(coords[0]);
					var y = Number(coords[1]);
					var cityID = convertCoordinatesToId(x, y);
					var player = webfrontend.data.Player.getInstance();
					var cityList = player.getCities();
					if(cityList && cityList.hasOwnProperty(cityID)) {
						webfrontend.data.City.getInstance().setRequestId(cityID);
					}
					webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
				}
			},
			selectAction:       function(action) {
				this._selectedAction = action;
				this._attackButton.setLabel(action.label.toUpperCase());
				this._attackButton.setToolTipText(action.tooltip);

				// Update mode
				this._selectedTypeIndex = -1;
				this.onModeToggle();
				// Note: Change event is fired in onModeToggle
			},
			onModeToggle:       function() {
				var allowed = this._selectedAction.allowed;
				this._selectedTypeIndex++;
				if(this._selectedTypeIndex >= allowed.length) {
					this._selectedTypeIndex = 0;
				}

				// Set label
				this._toggleButton.setLabel(allowed[this._selectedTypeIndex].label);

				// Fire change event
				this.fireChangeValue();
			},
			onNormalizeCoords:  function(e) {
				var str = ava.CombatTools.normalizeCoords(e.getData());
				if(str != null && str != e.getData()) {
					e.stopPropagation();
					this._coordsText.setValue(str);
				}
			},
			fireAttack:         function() {
				var value = this.getValue();
				if(value != null) {
					// Fire the event
					this.fireDataEvent("attack", value);
				}
			},
			fireChangeValue:    function() {
				if(!this._applyingValue) {
					this.fireEvent("changeValue");
				}
			},
			setAttackEnabled:   function(value) {
				attackButton.setEnabled(value);
			},
			getValue:           function() {
				// Get target
				var coords = ava.CombatTools.normalizeCoords(this._coordsText.getValue());
				var type = this._selectedAction.allowed[this._selectedTypeIndex];
				var note = (this._noteText.getValue() || "").trim();
				if(coords == null || type == null) {
					return null;
				}

				// Return attack detail
				return {
					attack: this._selectedAction.name,
					type:   type.type,
					target: coords,
					note:   note
				};
			},
			setValue:           function(data) {
				if(data == null) {
					// Defaults
					data = {
						fake: true
					};
				}
				{
					this._applyingValue = true;

					// Action
					var action = this._actionByName(data.attack);
					this.selectAction(action);

					// Type (TODO do it better)
					var allowed = this._selectedAction.allowed;
					this._selectedTypeIndex = 0;
					for(var i = 0; i < allowed.length; i++) {
						if(allowed[i].type == data.type) {
							this._selectedTypeIndex = i;
							break;
						}
					}
					this._toggleButton.setLabel(allowed[this._selectedTypeIndex].label);

					// Coords
					var coords = ava.CombatTools.normalizeCoords(data.target);
					this._coordsText.setValue(coords);

					// Note
					this._noteText.setValue(data.note || "");
				}
				/* {
				 this._applyingValue=false;
				 }*/

				// Fire change event
				this.fireChangeValue();
			},
			setActionEnabled:   function(value) {
				this._attackButton.setEnabled(value);
			},
			getActionEnabled:   function() {
				return this._attackButton.getEnabled();
			},
			addCount:           function(type) {
				var old = this._counterLabel.getValue() || "";
				this._counterLabel.setValue(old + type);
			},
			removeLastCount:    function() {
				var old = this._counterLabel.getValue() || "";
				if(old.length > 0) {
					this._counterLabel.setValue(old.substr(0, old.length - 1));
				}
			},
			resetCount:         function() {
				this._counterLabel.resetValue();
			},
			_actionByName:      function(name) {
				for(var i = 0; i < this.ATTACK_ACTIONS.length; i++) {
					if(this.ATTACK_ACTIONS[i].name == name) {
						return this.ATTACK_ACTIONS[i];
					}
				}

				// Return fake as default
				return this.ATTACK_ACTIONS[0];
			}
		}
	});
	qx.Class.define("ava.LeftPanel", {
		extend:    qx.ui.container.Composite,
		construct: function(label) {
			this.base(arguments);
			this.buildPanelUI(label);
		},
		members:   {
			content:          null,
			closeAvaToolsBtn: null,
			titleRow:         null,
			buildPanelUI:     function(labelText) {
				this.setLayout(new qx.ui.layout.Canvas());
				this.set({
					marginTop:    3,
					marginBottom: 3
				});
				var background = new qx.ui.basic.Image('resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png');
				background.set({
					width:      338,
					scale:      true,
					allowGrowY: true
				});
				this.add(background, {
					left:   0,
					top:    27,
					bottom: 34
				});
				background = new qx.ui.basic.Image('resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
				background.set({
					width:  338,
					height: 35
				});
				this.add(background, {
					left:   0,
					bottom: 0
				});
				background = new qx.ui.basic.Image("resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
				background.set({
					width:  338,
					height: 32
				});
				this.add(background, {
					left: 0,
					top:  0
				});
				this.titleRow = new qx.ui.container.Composite();
				this.titleRow.setLayout(new qx.ui.layout.HBox(0));
				this.titleRow.set({
					width: 325
				});
				this.add(this.titleRow, {
					left: 8,
					top:  6
				});
				var label = new qx.ui.basic.Label(labelText);
				label.set({
					font:       "bold",
					textColor:  "#ffCC82",
					paddingTop: 2
				});
				this.titleRow.add(label);
				this.content = new qx.ui.container.Composite();
				this.content.setLayout(new qx.ui.layout.VBox(5));
				this.content.set({
					width:        322,
					marginBottom: 8
				});
				this.add(this.content, {
					top:  35,
					left: 8
				});
				this.aboutAvaToolsBtn = new qx.ui.form.Button("?");
				this.aboutAvaToolsBtn.set({
					appearance:  "button-text-small",
					toolTipText: "About Ava Tools"
				});
				this.aboutAvaToolsBtn.addListener("execute", this.showHelp, this);
				this.titleRow.add(this.aboutAvaToolsBtn);
				this.AvaToolsOptionsBtn = new qx.ui.form.Button("O");
				this.AvaToolsOptionsBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Options"
				});
				this.AvaToolsOptionsBtn.addListener("execute", this.showOptionsPage, this);
				this.titleRow.add(this.AvaToolsOptionsBtn);
				this.showIncomingAttacksBtn = new qx.ui.form.Button("I");
				this.showIncomingAttacksBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Incoming Attacks Window"
				});
				this.showIncomingAttacksBtn.addListener("execute", this.showIncomingAttacks, this);
				this.titleRow.add(this.showIncomingAttacksBtn);
				this.showCombatButtonBtn = new qx.ui.form.Button("C");
				this.showCombatButtonBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Combat/PvP Attack Setup Window"
				});
				this.showCombatButtonBtn.addListener("execute", this.showCombatWindow, this);
				this.titleRow.add(this.showCombatButtonBtn);
				this.showRaidButtonBtn = new qx.ui.form.Button("R");
				this.showRaidButtonBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Raiding Tools Window"
				});
				this.showRaidButtonBtn.addListener("execute", this.showRaidingWindow, this);
				this.titleRow.add(this.showRaidButtonBtn);
				this.showAllianceInfoBtn = new qx.ui.form.Button("A");
				this.showAllianceInfoBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Alliance Info"
				});
				this.showAllianceInfoBtn.addListener("execute", this.showAllianceInfo, this);
				this.titleRow.add(this.showAllianceInfoBtn);
				this.showMailingListBtn = new qx.ui.form.Button("M");
				this.showMailingListBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Mailing Lists Window"
				});
				this.showMailingListBtn.addListener("execute", this.showMailingLists, this);
				this.titleRow.add(this.showMailingListBtn);
				this.showPalaceItemsBtn = new qx.ui.form.Button("P");
				this.showPalaceItemsBtn.set({
					visibility:  "hidden",
					width:       20,
					appearance:  "button-text-small",
					toolTipText: "Palace Items Window"
				});
				this.showPalaceItemsBtn.addListener("execute", this.showPalaceItems, this);
				this.titleRow.add(this.showPalaceItemsBtn);
				subIncomingImg = new qx.ui.basic.Image('resource/webfrontend/ui/icons/icon_attack_warning.gif');
				subIncomingImg.setScale(true);
				subIncomingImg.setVisibility("hidden");
				subIncomingImg.setMaxWidth(17);
				subIncomingImg.setMaxHeight(20);
				this.titleRow.add(subIncomingImg);
				fortuneAvailImg = new qx.ui.basic.Image('resource/webfrontend/ui/icons/icon_alliance_red_17.png');
				fortuneAvailImg.setVisibility("hidden");
				fortuneAvailImg.addListener("click", setNextFortuneTime);
				this.titleRow.add(fortuneAvailImg);

				this.closeImage = new qx.ui.basic.Image("webfrontend/ui/icons/icon_chat_resize_smaller.png");
				this.closeImage.setWidth(16);
				this.closeImage.setHeight(16);
				this.closeImage.setScale(true);
				this.closeImage.setAlignY("middle");
				this.closeAvaToolsBtn = new qx.ui.form.Button();
				this.closeAvaToolsBtn.set({
					width:       15,
					appearance:  "button-text-small",
					toolTipText: "Hide Ava Tools"
				});
				this.closeAvaToolsBtn.addListener("click", this.toggleAvaTools, this);
				this.closeAvaToolsBtn._add(this.closeImage);
				this.titleRow.add(this.closeAvaToolsBtn);
				var options = ava.Main.getInstance().options;
				if(options.hideAvaTools) {
					this.addListenerOnce("appear", function() {
						ava.Main.getInstance().panel.toggleAvaTools();
					});
				}
			},
			getContent:       function() {
				return this.content;
			},
			toggleAvaTools:   function() {
				var barButtonsVisibility = "hidden";
				if(this.getMaxHeight() != 84) {
					barButtonsVisibility = "visible";
					this.closeImage.setSource("webfrontend/ui/icons/icon_chat_resize.png");
					this.closeAvaToolsBtn.setToolTipText("Show Ava Tools");
					this.setMaxHeight(84);
				} else {
					this.closeImage.setSource("webfrontend/ui/icons/icon_chat_resize_smaller.png");
					this.setMaxHeight(242);
					this.closeAvaToolsBtn.setToolTipText("Hide Ava Tools");
				}
				this.showCombatButtonBtn.setVisibility(barButtonsVisibility);
				this.showRaidButtonBtn.setVisibility(barButtonsVisibility);
				this.showIncomingAttacksBtn.setVisibility(barButtonsVisibility);
				this.AvaToolsOptionsBtn.setVisibility(barButtonsVisibility);
				this.showAllianceInfoBtn.setVisibility(barButtonsVisibility);
				this.showMailingListBtn.setVisibility(barButtonsVisibility);
				this.showPalaceItemsBtn.setVisibility(barButtonsVisibility);
			},
			addContent:       function(widget, args) {
				this.content.add(widget, args);
			}
		}
	});
	qx.Class.define("ava.TimePicker", {
		extend:     qx.ui.container.Composite,
		construct:  function(caption) {
			this.base(arguments);
			this.buildUI(caption);
		},
		properties: {
			value: {
				check: "Date",
				init:  new Date(0),
				apply: "_applyValue"
			}
		},
		events:     {
			changeValue: "qx.event.type.Data"
		},
		members:    {
			_dateSelect:       null,
			_hourText:         null,
			_minuteText:       null,
			_secondText:       null,
			_applyingValue:    false,
			_updatingValue:    false,
			buildUI:           function(caption) {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.HBox(5));

				if(caption != null) {
					var captionLabel = new qx.ui.basic.Label(caption);
					captionLabel.set({
						width:      60,
						allowGrowX: false
					});
					this.add(captionLabel);
				}
				this._hourText = new qx.ui.form.TextField("0");
				this._hourText.set({
					width:     26,
					maxLength: 2
				});
				this._hourText.addListener("changeValue", this._onValidateHour, this._hourText);
				app.setElementModalInput(this._hourText);
				this.add(this._hourText);
				this._minuteText = new qx.ui.form.TextField("0");
				this._minuteText.set({
					width:     26,
					maxLength: 2
				});
				this._minuteText.addListener("changeValue", this._onValidateMinute, this._minuteText);
				app.setElementModalInput(this._minuteText);
				this.add(this._minuteText);
				this._secondText = new qx.ui.form.TextField("0");
				this._secondText.set({
					width:     26,
					maxLength: 2
				});
				this._secondText.addListener("changeValue", this._onValidateMinute, this._secondText);
				app.setElementModalInput(this._secondText);
				this.add(this._secondText);
				this._dateSelect = new qx.ui.form.SelectBox();
				this._dateSelect.set({
					width: 90
				});
				this._dateSelect.add(new qx.ui.form.ListItem("Today", null, 0));
				this._dateSelect.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
				this._dateSelect.add(new qx.ui.form.ListItem("2 Days", null, 2));
				this._dateSelect.add(new qx.ui.form.ListItem("3 Days", null, 3));
				this._dateSelect.add(new qx.ui.form.ListItem("4 Days", null, 4));
				this._dateSelect.add(new qx.ui.form.ListItem("5 Days", null, 5));
				this._dateSelect.add(new qx.ui.form.ListItem("6 Days", null, 6));
				this._dateSelect.add(new qx.ui.form.ListItem("7 Days", null, 7));
				this.add(this._dateSelect);

				// changeValue listeners
				this._hourText.addListener("changeValue", this._updateValue, this);
				this._minuteText.addListener("changeValue", this._updateValue, this);
				this._secondText.addListener("changeValue", this._updateValue, this);
				this._dateSelect.addListener("changeSelection", this._updateValue, this);
			},
			fireChangeValue:   function() {
				this.fireDataEvent("changeValue", this.getValue());
			},
			_applyValue:       function(value) {
				if(this._updatingValue) {
					return;
				}

				// We need to get date difference
				var st = webfrontend.data.ServerTime.getInstance();
				var serverStep = st.getServerStep();
				var gameNow = webfrontend.Util.getCurrentTime().getTime();
				{
					//gameNow.setTime(gameNow.getTime() + serverOffset);// - localOffset);
					var tmp1 = new Date(gameNow);
					var tmp2 = new Date(value.getTime());
					tmp1.setHours(0);
					tmp1.setMinutes(0);
					tmp1.setSeconds(0);
					tmp1.setMilliseconds(0);
					tmp2.setHours(0);
					tmp2.setMinutes(0);
					tmp2.setSeconds(0);
					tmp2.setMilliseconds(0);
					var totalDaysNow = Math.floor(tmp1.getTime() / (24 * 3600 * 1000));
					var totalDaysValue = Math.floor(tmp2.getTime() / (24 * 3600 * 1000));
					var daysOffset = totalDaysValue - totalDaysNow;
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */

				{
					this._applyingValue = true;
					this._hourText.setValue(String(value.getHours()));
					this._minuteText.setValue(String(value.getMinutes()));
					this._secondText.setValue(String(value.getSeconds()));
					this._dateSelect.setModelSelection([daysOffset]);
				}
				/* {
				 this._applyingValue=false;
				 }*/
				this.fireChangeValue();
			},
			_updateValue:      function() {
				if(this._applyingValue) {
					return;
				}

				// Parse fields
				var hours = Number(this._hourText.getValue());
				var minutes = Number(this._minuteText.getValue());
				var seconds = Number(this._secondText.getValue());
				var dayValue = this._dateSelect.getSelection()[0].getModel();
				var dateOffset = Number(dayValue);

				// This function is a bit wierd, returned instance UTC value
				// corresponds to visible time to user.
				var st = webfrontend.data.ServerTime.getInstance();
				var serverStep = st.getServerStep();
				var gameNow = webfrontend.Util.getCurrentTime().getTime();
				gameNow += (dateOffset * 24 * 3600 * 1000);

				//gameNow += serverStep + (dateOffset * 24 * 3600 * 1000);
				// Prepare return date object
				var date = new Date(gameNow);
				date.setHours(hours);
				date.setMinutes(minutes);
				date.setSeconds(seconds);
				date.setMilliseconds(0);
				{
					this._updatingValue = true;
					this.setValue(date);
				}
				/* {
				 this._updatingValue=false;
				 }*/
				this.fireChangeValue();
			},
			_onValidateHour:   function(e) {
				var num = Math.floor(Number(e.getData()));
				if(num > 23) {
					e.stopPropagation();
					this.setValue("23");
				} else if(num < 0 || isNaN(num)) {
					e.stopPropagation();
					this.setValue("0");
				} else if(String(num) != e.getData()) {
					e.stopPropagation();
					this.setValue(String(num));
				}
			},
			_onValidateMinute: function(e) {
				var num = Math.floor(Number(e.getData()));
				if(num > 59) {
					e.stopPropagation();
					this.setValue("59");
				} else if(num < 0 || isNaN(num)) {
					e.stopPropagation();
					this.setValue("0");
				} else if(String(num) != e.getData()) {
					e.stopPropagation();
					this.setValue(String(num));
				}
			}
		}
	});
	qx.Class.define("ava.AboutWindow", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function() {
			this.base(arguments, 'AvaTools v' + ava.Version.PAversion);
			this.buildUI();
		},
		members:   {
			buildUI: function() {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.VBox(10));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      true
				});
				this.setWidth(400);
				webfrontend.gui.Util.formatWinClose(this);

				// Licensing
				var licenseLabel = new qx.ui.basic.Label("License").set({
					font: "bold"
				});
				this.add(licenseLabel);
				var license = "AvaSuite  - Not (c) Not (tm)\n";
				license += "\n\ntodo";
				var licenseText = new qx.ui.form.TextArea();
				licenseText.set({
					readOnly:  true,
					wrap:      true,
					autoSize:  true,
					tabIndex:  303,
					minHeight: 280
				});
				licenseText.setValue(license);
				this.add(licenseText);

				// Close button
				var closeButton = new qx.ui.form.Button("Close");
				closeButton.addListener("execute", this.hide, this);
				this.add(closeButton);
			}
		}
	});
	qx.Class.define("ava.CancelOrderPanel", {
		extend:    qx.ui.container.Composite,
		construct: function() {
			this.base(arguments);
			this.buildUI();
		},
		statics:   {
			/**
			 * Returns list of order IDs, filtered by provided function.
			 *
			 * @param filterFunc Filter function, with signature "boolean function(order)". Return true to include the order.
			 * @return Array of order IDs.
			 */
			getOrderList:   function(filterFunc) {
				var activeCity = webfrontend.data.City.getInstance();
				var unitOrders = activeCity.getUnitOrders();
				var idList = [];
				if(unitOrders != null) {
					unitOrders.forEach(function(order) {
						if(filterFunc(order)) {
							idList.push(order.id);
						}
					});
				}
				return idList;
			},
			cancelAll:      function(callback, self) {
				// Get list
				var orderList = this.getOrderList(function(order) {
					return ava.CombatTools.canOrderBeCancelled(order) || (order.type == ava.CombatTools.RAID_ORDER_ID && order.recurringType != 0);
				});

				// Issue order
				paDebug("Orders to cancel: " + orderList.length);
				ava.CombatTools.cancelOrders(orderList, callback, self);
			},
			cancelAllRaids: function(callback, self) {
				// Get list
				var orderList = this.getOrderList(function(order) {
					return order.type == ava.CombatTools.RAID_ORDER_ID && (order.recurringType != 0 || ava.CombatTools.canOrderBeCancelled(order));
				});

				// Issue order
				paDebug("Orders to cancel: " + orderList.length);
				ava.CombatTools.cancelOrders(orderList, callback, self);
			}
		},
		members:   {
			//_cancelAllButton:null,
			_cancelRaidsButton:  null,
			_cancelRaidsSelect:  null,
			buildUI:             function() {
				this.setLayout(new qx.ui.layout.VBox(5));
				var firstRow = new qx.ui.container.Composite();
				firstRow.setLayout(new qx.ui.layout.HBox(2));
				firstRow.set({
					width: 118
				});

				/*
				 var secondRow = new qx.ui.container.Composite();
				 secondRow.setLayout(new qx.ui.layout.HBox(2));
				 secondRow.set({width:100})
				 // Return By
				 this._returnByButton = new qx.ui.form.Button("Rtn");
				 this._returnByButton.set({width:30, maxWidth:30, appearance:"button-text-small", toolTipText:"All raids return by XX:XX:XX"});
				 this._returnByButton.addListener("execute", this.returnBy, this);
				 // Cancel All
				 this._cancelAllButton = new qx.ui.form.Button("C All");
				 this._cancelAllButton.set({width:50, maxWidth:50, appearance:"button-text-small", toolTipText:"Cancel all orders. Careful!"});
				 this._cancelAllButton.addListener("execute", this.cancelAll, this);
				 */
				// Cancel Raids
				this._cancelRaidsSelect = new qx.ui.form.SelectBox().set({
					width:         80,
					maxWidth:      80,
					toolTipText:   "Cancel all raid orders or alter to return in the specified number of hours.",
					paddingTop:    0,
					paddingBottom: 0
				});
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("C Raids", null, 0));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("C All", null, 1));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("C all city group raids", null, 110));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Complete", null, 100));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Set rtn time", null, 2));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 6h", null, 6));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 12h", null, 12));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 18h", null, 18));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 24h", null, 24));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 36h", null, 36));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 48h", null, 48));
				this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 72h", null, 72));
				this._cancelRaidsSelect.setMaxListHeight(500);

				//this._cancelRaidsSelect.setSelection( [this._cancelRaidsSelect.getChildren()[0]] );
				this._cancelRaidsButton = new qx.ui.form.Button("Go");
				this._cancelRaidsButton.set({
					width:       23,
					maxWidth:    23,
					appearance:  "button-text-small",
					toolTipText: "Apply to raid orders."
				});
				this._cancelRaidsButton.addListener("execute", this.cancelAllRaids, this);

				// Add to layout
				firstRow.add(this._cancelRaidsSelect);
				firstRow.add(this._cancelRaidsButton);

				//secondRow.add(this._returnByButton);
				//secondRow.add(this._cancelAllButton);
				this.add(firstRow);

				//this.add(secondRow);
				var secondRow = new qx.ui.container.Composite();
				secondRow.setLayout(new qx.ui.layout.HBox(2));
				secondRow.set({
					width: 100
				});

				//secondRow.add(this._applyToAll);
				this.add(secondRow);
			},
			_setButtonsEnabled:  function(value) {
				//this._cancelAllButton.setEnabled(value);
				this._cancelRaidsButton.setEnabled(value);
				//this._returnByButton.setEnabled(value);
			},
			returnBy:            function() {
				var dialog = ava.ReturnByWindow.getInstance();
				dialog.center();
				dialog.show();
				this._setButtonsEnabled(true);
			},
			cancelAll:           function() {
				if(!confirm("Do you want to cancel all orders?")) {
					this._setButtonsEnabled(true);
					return;
				}
				this._setButtonsEnabled(false);
				this.self(arguments).cancelAll(function(error) {
					this._setButtonsEnabled(true);
					if(error) {
						paDebug(error);
					}
				}, this);
			},
			cancelAllRaids:      function() {
				this._setButtonsEnabled(false);
				var opt = this._cancelRaidsSelect.getSelection()[0].getModel();
				if(opt == 0) {
					this.self(arguments).cancelAllRaids(function(error) {
						this._setButtonsEnabled(true);
						if(error) {
							paDebug(error);
						}
					}, this);
				} else if(opt == 1) {
					this.cancelAll();
				} else if(opt == 2) {
					this.returnBy();
				} else if(opt == 100) {
					var orders = webfrontend.data.City.getInstance().unitOrders;
					var commandManager = webfrontend.net.CommandManager.getInstance();
					for(var i in orders) {
						if(orders[i].type == ava.CombatTools.RAID_ORDER_ID) {
							commandManager.sendCommand("UnitOrderSetRecurringOptions", {
								cityid:           webfrontend.data.City.getInstance().getId(),
								id:               orders[i].id,
								isDelayed:        orders[i].isDelayed,
								recurringType:    1,
								recurringEndStep: webfrontend.Util.getCurrentTime().getTime()
							}, this, function(error) {
								if(error) {
									paDebug(error);
								}
							});
						}
					}
					this._setButtonsEnabled(true);
				} else if(opt == 110) {
					addConsumer("COMO", this.cancelRaids, this, "a");
				} else {
					var combatTools = ava.CombatTools;
					var st = webfrontend.data.ServerTime.getInstance();
					var curTime = webfrontend.Util.getCurrentTime();
					curTime.setHours(curTime.getHours() + parseInt(opt));
					var returnBy = curTime.getTime();
					var serverStep = st.getServerStep();
					var gameNow = webfrontend.Util.getCurrentTime().getTime();
					var delta = Math.floor((returnBy - gameNow) / 1000) + 1;
					returnBy = serverStep + delta;
					var currRecurrType = 2;
					var orders = webfrontend.data.City.getInstance().unitOrders;
					var commandManager = webfrontend.net.CommandManager.getInstance();
					for(var i in orders) {
						if(orders[i].type == ava.CombatTools.RAID_ORDER_ID) {
							commandManager.sendCommand("UnitOrderSetRecurringOptions", {
								cityid:           webfrontend.data.City.getInstance().getId(),
								id:               orders[i].id,
								isDelayed:        orders[i].isDelayed,
								recurringType:    currRecurrType,
								recurringEndStep: returnBy
							}, this, function(error) {
								if(error) {
									paDebug(error);
								}
							});
						}
					}
					this._setButtonsEnabled(true);
				}
			},
			sendCancelOrder:     function(request) {
				// Send command
				webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", request, null, function(unknown, ok) {
					//if (!ok) ava.Chat.getInstance().addChatMessage(' Error cancelling order ' + count + ' cancel orders.', true);
				});
			},
			cancelOrder:         function(request, delay) {
				var _this = this;
				setTimeout(function() {
					{
						_this.sendCancelOrder(request);
					}
					/* (e) {
					 console.log("Error");
					 console.dir(e);
					 } */
				}, delay);
			},
			hasCity:             function(cityList, cityId) {
				var retVal = false;
				for(elem in cityList) {
					if(cityId == elem) {
						retVal = true;
						break;
					}
				}
				return retVal;
			},
			showContinueMessage: function(msgText, sendingMsgText, requestArray, thisObj) {
				var win = new qx.ui.window.Window("Continue?");
				win.setLayout(new qx.ui.layout.VBox(2));
				win.set({
					showMaximize:  false,
					showMinimize:  false,
					allowMaximize: false,
					width:         400,
					height:        80
				});

				win.lbl = new qx.ui.basic.Label(msgText).set({
					rich: true
				});

				win.add(win.lbl);
				var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				win.add(row);
				var btn = new qx.ui.form.Button("Yes").set({
					appearance:    "button-text-small",
					width:         80,
					paddingLeft:   5,
					paddingRight:  5,
					paddingTop:    0,
					paddingBottom: 0
				});
				btn.win = win;
				btn.requestArray = requestArray;
				row.add(btn);
				btn.addListener("click", function() {
					ava.Chat.getInstance().addChatMessage(sendingMsgText, false);
					var requests = this.requestArray;
					var delay = 500;
					for(var i = 0; i < requests.length; i++) {
						thisObj.cancelOrder(JSON.parse(requests[i]), delay);
						delay += 1000;
					}
					this.win.hide();
				});
				var btn2 = new qx.ui.form.Button("No").set({
					appearance:    "button-text-small",
					width:         80,
					paddingLeft:   5,
					paddingRight:  5,
					paddingTop:    0,
					paddingBottom: 0
				});
				btn2.win = win;
				row.add(btn2);
				btn2.addListener("click", function() {
					this.win.hide();
				});
				win.addListener("close", function() {
				}, this);
				win.center();
				win.open();
			},
			cancelRaids:         function(results, thisObj) {
				if(results == null) {
					thisObj._setButtonsEnabled(true);
					return;
				}
				removeConsumer("COMO", thisObj.cancelRaids, thisObj);
				var serverTime = webfrontend.data.ServerTime.getInstance();
				var cityList = webfrontend.data.Player.getInstance().cities;
				var orderList = new Array();
				var delay = 500;
				var data = new qx.util.StringBuilder(2048);
				var count = 0;
				var app = qx.core.Init.getApplication();
				var player = webfrontend.data.Player.getInstance();
				var cids;
				var groupId = app.cityBar.citiesSelect.getSelectedGroupId();
				for(var ii = 0; ii < player.citygroups.length; ++ii) {
					if(player.citygroups[ii].i == groupId) {
						cids = player.citygroups[ii].c;
						break;
					}
				}
				if(!cids) {
					cids = new Array();
					for(elem in cityList) {
						cids.push(Number(elem));
					}
				}

				var requestArray = new Array();
				for(var i = 0; i < results.length; i++) {
					var result = results[i];
					if(result.hasOwnProperty("c") && cids.indexOf(result.i) >= 0 && (cityList.length == 0 || thisObj.hasCity(cityList, result.i))) {
						for(var j = 0; j < result.c.length; j++) {
							var order = result.c[j];
							if(order.t == ava.CombatTools.RAID_ORDER_ID && (order.r != 0 || ((order.s != 2) && (order.es > serverTime.getServerStep() - 600)))) {
								++count;
								var request = '{"cityid":' + result.i + ', "id":' + order.i + ', "isDelayed":' + (order.s == 0) + ', "recurringType": 0}';
								requestArray.push(request);
							}
						}
					}
				}
				if(count > 0) {
					var resObj = new Object();
					var steps = count;
					var hr = steps / 3600;
					var remHr = parseInt(hr);
					var min = (steps - (remHr * 3600)) / 60;
					var remMin = parseInt(min);
					var sec = (steps - (remHr * 3600) - (remMin * 60));
					var remSec = parseInt(sec);
					var remainingTime = checkTime(remHr) + ":" + checkTime(remMin) + ":" + checkTime(remSec);
					thisObj.showContinueMessage('Are you sure? ' + count + ' orders will be sent.  This will take approximately ' + remainingTime + '.', ' Sending ' + count + ' cancel orders.  This will take approximately ' + remainingTime + '.', requestArray, thisObj);
				} else {
					ava.Chat.getInstance().addChatMessage(' No raids found to be cancelled.', false);
				}
				thisObj._setButtonsEnabled(true);
			}
		}
	});
	qx.Class.define("ava.CombatWindow", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function() {
			this.base(arguments, "Combat Tool");

			// Build UI
			this._rows = [];
			this.buildUI();

			// Load prev config
			this.loadData();

			// Listeners
			this._listener_cityChanged = webfrontend.data.City.getInstance().addListener("changeVersion", function() {
				if(!this.isVisible()) {
					return;
				}
				this.refresh();
				this._setActionEnabled(true);
				this._lock_safeguard = null;
			}, this);
			this.addListener("appear", function() {
				this.refresh();
				this.resetMessage();
			}, this);
			this.addListener("changeActive", function(e) {
				if(!e.getData()) {
					this.storeData();
				}
			}, this);
		},
		destruct:  function() {
			var city = webfrontend.data.City.getInstance();
			if(this._listener_cityChanged)
				city.removeListenerById(this._listener_cityChanged);
		},
		members:   {
			_addButton:            null,
			_resetButton:          null,
			_messageLabel:         null,
			_AvailableLabel:       null,
			_includeActive:        null,
			_allowPartial:         null,
			_useScouts:            null,
			_useSmallestForFakes:  null,
			_excludeDefenseCheck:  null,
			_forceMsCheck:         null,
			_travelModeGroup:      null,
			_rows:                 null,
			_magicTime:            null,
			_infTime:              null,
			_cavTime:              null,
			_siegeTime:            null,
			_copyButton:           null,
			_listener_cityChanged: null,
			_lock_safeguard:       null,
			buildUI:               function() {
				this.setLayout(new qx.ui.layout.VBox(5));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      false,
					minWidth:       545
				});
				webfrontend.gui.Util.formatWinClose(this);

				// Message
				this._messageLabel = new qx.ui.basic.Label();
				this._messageLabel.set({
					textColor: "#D10600",
					wrap:      true
				});
				this.add(this._messageLabel);

				// Times
				this._magicTime = new ava.TimePicker("Magic");
				this._cavTime = new ava.TimePicker("CAvalry");
				this._infTime = new ava.TimePicker("Infantry");
				this._siegeTime = new ava.TimePicker("Siege");
				this._copyButton = new qx.ui.form.Button("Copy");
				this._copyButton.set({
					appearance: "button-text-small"
				});
				this._copyButton.addListener("execute", this.copyTimes, this);
				var firstTimeRow = new qx.ui.container.Composite();
				firstTimeRow.setLayout(new qx.ui.layout.HBox(5));
				firstTimeRow.add(this._magicTime);
				firstTimeRow.add(this._copyButton);

				// Put it in standalone box
				var timesBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
				timesBox.add(firstTimeRow);
				timesBox.add(this._cavTime);
				timesBox.add(this._infTime);
				timesBox.add(this._siegeTime);

				// Import/Export button
				var importButton = new qx.ui.form.Button("Import/Export");
				importButton.set({
					appearance:  "button-text-small",
					allowGrowX:  false,
					toolTipText: "Import or export attacks configuration."
				});
				importButton.addListener("execute", function() {
					var win = ava.CombatWindowExport.getInstance();
					win.center();
					win.open();
				}, this);

				// Reset button
				this._resetButton = new qx.ui.form.Button("Reset");
				this._resetButton.set({
					appearance:  "button-text-small",
					allowGrowX:  false,
					toolTipText: "Resets all values in the dialog."
				});
				this._resetButton.addListener("execute", function() {
					if(confirm("Are you sure you want to throw away all your plans?")) {
						this.reset();
					}
				}, this);
				var buttonsRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				buttonsRow.add(importButton);
				buttonsRow.add(this._resetButton);

				// Include check
				this._includeActive = new qx.ui.form.CheckBox("Include units out of the city");
				this._includeActive.setToolTipText("If checked, units currently out of the city (raiding/plundering etc) will be included into commands. You are supposed to get them home in time by yourself.");
				this._includeActive.initValue(true);
				this._includeActive.addListener("changeValue", this.refresh, this);

				// Allow partial check
				this._allowPartial = new qx.ui.form.CheckBox("Allow partial nAval attack");
				this._allowPartial.setToolTipText("When there are not enough Frigates to carry your troops, it allows to send only part of the army that will fit on the ships. Has no effect on land attacks.");

				// Use scouts
				this._useScouts = new qx.ui.form.CheckBox("Include scouts in the attacks");
				this._useScouts.setToolTipText("All Available scouts will be sent along other units. If there will be enough scouts, they will be also used for fakes.");
				this._useScouts.setValue(true);
				this._useScouts.addListener("changeValue", this.refresh, this);

				// Use smallest for fakes
				this._useSmallestForFakes = new qx.ui.form.CheckBox("Prefer smallest stack for fakes instead of largest");
				this._useSmallestForFakes.setToolTipText("By default, unit you have the most of is used for fakes. This changes the order.");
				this._useSmallestForFakes.setEnabled(false);
				this._useSmallestForFakes.exclude();

				// Hidden for now
				// Force 3000 min score
				this._forceMsCheck = new qx.ui.form.CheckBox("Always use 3000 min TS");
				this._forceMsCheck.set({
					toolTipText: "Always use 3000 min TS."
				});
				this._forceMsCheck.setValue(true);

				// Exclude Defense
				this._excludeDefenseCheck = new qx.ui.form.CheckBox("Exclude Defense");
				this._excludeDefenseCheck.set({
					toolTipText: "Don't use defensive troops."
				});
				this._excludeDefenseCheck.setValue(true);
				this._excludeDefenseCheck.addListener("changeValue", this.refresh, this);

				// Travel mode
				var travelModeLabel = new qx.ui.basic.Label("Travel mode");
				var autoMode = new qx.ui.form.RadioButton("Auto");
				autoMode.set({
					model:       "auto",
					toolTipText: "Units will be sent on foot if the target is on the same continent. Otherwise ships will be used."
				});
				var navyMode = new qx.ui.form.RadioButton("Navy");
				navyMode.set({
					model:       "navy",
					toolTipText: "Units will be send on Frigates even to the target on the same continent. Does not affect ships."
				});
				var landMode = new qx.ui.form.RadioButton("Land (Moongate)");
				landMode.set({
					model:       "land",
					toolTipText: "Units will be sent on foot even if the target is on different continent. Does not use ships at all."
				});
				var travelModeContainer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 2));
				travelModeContainer.add(travelModeLabel, {
					row:    0,
					column: 0
				});
				travelModeContainer.add(autoMode, {
					row:    0,
					column: 1
				});
				travelModeContainer.add(navyMode, {
					row:    1,
					column: 1
				});
				travelModeContainer.add(landMode, {
					row:    2,
					column: 1
				});
				this._travelModeGroup = new qx.ui.form.RadioGroup(autoMode, navyMode, landMode);
				this._travelModeGroup.addListener("changeSelection", this.refresh, this);

				// Layout
				var optionsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
				optionsBox.add(buttonsRow);
				optionsBox.add(this._includeActive);
				optionsBox.add(this._allowPartial);
				optionsBox.add(this._useScouts);
				optionsBox.add(this._useSmallestForFakes);
				optionsBox.add(this._forceMsCheck);
				optionsBox.add(this._excludeDefenseCheck);
				optionsBox.add(travelModeContainer);
				var outerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(40));
				outerBox.add(timesBox);
				outerBox.add(optionsBox);
				this.add(outerBox);

				// Units
				var AvailableLabel = this._AvailableLabel = new qx.ui.basic.Label();
				AvailableLabel.set({
					width: 250,
					wrap:  true
				});
				var refreshButton = new qx.ui.form.Button("Refresh");
				refreshButton.set({
					appearance: "button-text-small"
				});
				refreshButton.addListener("execute", this.refresh, this);
				var resetCounterButton = new qx.ui.form.Button("RC");
				resetCounterButton.set({
					appearance:  "button-text-small",
					toolTipText: "Reset the indicative counter."
				});
				resetCounterButton.addListener("execute", this.resetCounter, this);
				var AvailControl = new qx.ui.container.Composite();
				AvailControl.setLayout(new qx.ui.layout.HBox(5));
				AvailControl.add(AvailableLabel);
				AvailControl.add(refreshButton);
				AvailControl.add(new qx.ui.core.Widget().set({
					height: 1
				}), {
					flex: 1
				});
				AvailControl.add(resetCounterButton);
				this.add(AvailControl);
				this.scrollContainer = new qx.ui.container.Scroll().set({
					width:  550,
					height: 20
				});
				this.scrollContainer.setMaxHeight(300);
				this.scrollContainer.setMinHeight(20);
				this.insideScrollContainer = new qx.ui.container.Composite();
				this.scrollArea = new qx.ui.layout.VBox();
				this.insideScrollContainer.setLayout(this.scrollArea);
				this.scrollContainer.add(this.insideScrollContainer);
				this.add(this.scrollContainer);

				// Add button
				var addButton = this._addButton = new qx.ui.form.Button("Add");
				addButton.set({
					appearance:  "button-text-small",
					allowGrowX:  false,
					toolTipText: "Adds new target field."
				});
				addButton.addListener("execute", this.addRow, this);
				this.add(addButton);

				// Note
				var noteLabel = new qx.ui.basic.Label("<em>Note: Send fake before real attacks.</em>");
				noteLabel.setRich(true);
				this.add(noteLabel);

				// First data row
				this.addRow();
			},
			addRow:                function() {
				var row = new ava.AttackOrder();
				row.addListener("attack", this.onAttack, this);
				this.scrollContainer.setHeight(this.scrollContainer.getHeight() + 23);
				this.insideScrollContainer.add(row);
				this._rows.push(row);
				if(this._rows.length > 15) {
					this._addButton.setEnabled(false);
				}
				return row;
			},
			_removeRow:            function(row) {
				// Remove from window
				this.insideScrollContainer.remove(row);
				this.scrollContainer.setHeight(this.scrollContainer.getHeight() - 23);

				// Dispose it
				row.dispose();
			},
			_setActionEnabled:     function(value) {
				this._rows.forEach(function(row) {
					row.setActionEnabled(value);
				});
			},
			reset:                 function() {
				// Delete rows
				this._rows.forEach(this._removeRow, this);
				this._rows = [];

				// We need at least one row
				this.addRow();
				this._addButton.setEnabled(true);

				// Reset times
				this._magicTime.resetValue();
				this._cavTime.resetValue();
				this._infTime.resetValue();
				this._siegeTime.resetValue();

				// Options
				this._includeActive.setValue(false);
				this._allowPartial.setValue(false);
				this._useScouts.setValue(true);
				this._useSmallestForFakes.setValue(false);
				this._forceMsCheck.setValue(true);
				this._excludeDefenseCheck.setValue(true);
				this._travelModeGroup.resetSelection();
			},
			resetCounter:          function() {
				this._rows.forEach(function(row) {
					row.resetCount();
				}, this);
			},
			refresh:               function() {
				{
					var city = webfrontend.data.City.getInstance();

					// Parameters
					var combatTools = ava.CombatTools;
					var includeActive = this._includeActive.getValue();
					var excludeDefense = this._excludeDefenseCheck.getValue();
					var travelMode = this.getTravelMode();
					var excludeNavy = (travelMode == "land");

					// Get units
					var AvailUnits = combatTools.getAvailableUnits(city, includeActive, excludeDefense, excludeNavy);

					// Format it
					var text = "";
					AvailUnits.all.forEach(function(u) {
						if(u.count > 0) {
							if(text.length > 0)
								text += ", ";
							text += u.count + " " + u.name;
						}
					});
					if(text.length == 0) {
						text = "No troops Available";
					}
					this._AvailableLabel.setValue(text);
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 this.setMessage(e);
				 } */
			},
			onAttack:              function(e) {
				var _this = this;
				{
					// Assemble attack info
					var data = e.getData();
					var target = e.getTarget();
					var attack = this.getAttackDetails(data.target, data.type, data.attack);

					// Validate TS
					var minTS = this.getMinAttackTS();
					if(minTS > 0 && data.attack != "fake" && data.attack != "fakecap" && attack.attackTS < minTS) {
						throw new Error("Minimal troop count for the attack not met");
					}

					// Disable buttons - they will be enabled automatically on city update
					_this._setActionEnabled(false);
					var lockId = _this._lock_safeguard = Math.random();
					paDebug("Attack lock = " + lockId);
					setTimeout(function() {
						paDebug("Attack lock timeout: _this._lock_safeguard=" + _this._lock_safeguard + " lockId=" + lockId);
						if(_this._lock_safeguard == lockId) {
							_this._setActionEnabled(true);
						}
					}, 10000);

					// Send attack order
					ava.CombatTools.orderUnits(attack.units, attack.target, attack.type, attack.timingType, attack.time, function(ok, errorCode) {
						if(errorCode.r0 == 0) {
							// Nice message
							var msg = attack.isPartial ? "Partial attack sent" : "Attack sent";
							msg += " (" + attack.attackTS + " TS)";
							_this.setMessage(msg);

							// Simple counter
							target.addCount((attack.attackType || "").toUpperCase());
						} else {
							paDebug(errorCode.r0 + ":" + errorCode.r1);
							var error = ava.CombatTools.getErrorMessage(errorCode.r0);
							_this.setMessage("Unable to dispatch troops: " + error);
							_this._setActionEnabled(true);
							_this._lock_safeguard = null;
						}
					});
				}
				/* (ex) {
				 this.setMessage(ex);
				 } */

				// Store data
				this.storeData();
			},
			getTravelMode:         function() {
				var sel = this._travelModeGroup.getSelection()[0];
				return sel ? sel.getModel() : null;
			},
			getAttackTimes:        function() {
				var combatTools = ava.CombatTools;
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;
				var siege = new Date(this._siegeTime.getValue().getTime() - serverOffset + localOffset).getTime();
				return {
					i: new Date(this._infTime.getValue().getTime() - serverOffset + localOffset).getTime(),
					m: new Date(this._magicTime.getValue().getTime() - serverOffset + localOffset).getTime(),
					c: new Date(this._cavTime.getValue().getTime() - serverOffset + localOffset).getTime(),
					s: siege,
					d: siege
				};
				/*
				 var siege = combatTools.convertGameTimeToUtc(this._siegeTime.getValue());
				 return {
				 i : combatTools.convertGameTimeToUtc(this._infTime.getValue()),
				 m : combatTools.convertGameTimeToUtc(this._magicTime.getValue()),
				 c : combatTools.convertGameTimeToUtc(this._cavTime.getValue()),
				 s : siege,
				 d : siege
				 };
				 */
			},
			getAttackDetails:      function(target, type, attack) {
				var city = webfrontend.data.City.getInstance();
				var server = webfrontend.data.Server.getInstance();
				var combatTools = ava.CombatTools;

				// Parameters
				var includeActive = this._includeActive.getValue();
				var useScouts = this._useScouts.getValue();
				var excludeDefense = this._excludeDefenseCheck.getValue();
				var allowPartial = this._allowPartial.getValue();
				var travelMode = this.getTravelMode();
				var minTS = this._forceMsCheck.getValue() ? ava.CombatTools.DEFAULT_MIN_TS : null;

				// Get Available units
				var AvailUnits = combatTools.getAvailableUnits(city, includeActive, excludeDefense, travelMode == "land");

				// Determine, whether we need nAval attack
				var nAval = (travelMode == "navy" || AvailUnits.ships.length > 0);
				if(!nAval && travelMode != "land") {
					var targetCoords = combatTools.parseCoords(target);
					var targetCont = server.getContinentFromCoords(targetCoords[0], targetCoords[1]);
					var sourceCoords = combatTools.cityIdToCoords(city.getId());
					var sourceCont = server.getContinentFromCoords(sourceCoords[0], sourceCoords[1]);
					nAval = (targetCont != sourceCont);
				}

				if(nAval) {
					if(!city.getOnWater()) {
						throw new Error("Unable to launch nAval attack from land-locked castle");
					}
				}

				// Get units for attack
				var attackUnits = null;
				if(attack == "fake" || attack == "fakecap") {
					if(useScouts) {
						{
							attackUnits = combatTools.prepareScoutAttackUnits(AvailUnits, nAval, true, false, minTS);
							type = combatTools.SCOUT_ORDER_ID;
						}
						/* (ignored) {
						 } */
					}

					if(attackUnits == null) {
						attackUnits = combatTools.prepareFakeAttackUnits(AvailUnits, nAval, minTS, attack == "fakecap");
					}
				} else if(attack == "scout") {
					attackUnits = combatTools.prepareScoutAttackUnits(AvailUnits, nAval, false, allowPartial, minTS);
				} else {
					attackUnits = combatTools.prepareRealAttackUnits(AvailUnits, nAval, attack == "demo", attack == "capture", useScouts, allowPartial, minTS);
				}

				// Determine attack time
				var attackType = combatTools.getMajorAttackType(attackUnits.units);
				var times = this.getAttackTimes();
				var attackTime = times[attackType];
				if(attackTime == null) {
					throw new Error("Unknown time of the attack");
				}

				if(attackType == "d") {
					type = combatTools.SIEGE_ORDER_ID;
				}

				// Put it all together
				return {
					target:     target,
					type:       type,
					units:      attackUnits.units,
					attackTS:   attackUnits.totalTS,
					timingType: combatTools.ARRIVAL_TIMING_ID,
					time:       attackTime,
					isPartial:  attackUnits.isPartial,
					attackType: attackType
				};
			},
			copyTimes:             function() {
				var value = this._magicTime.getValue();
				this._cavTime.setValue(value);
				this._infTime.setValue(value);
				this._siegeTime.setValue(value);
			},
			getMinAttackTS:        function() {
				return 1;
			},
			resetMessage:          function() {
				this._messageLabel.setValue("");
			},
			setMessage:            function(text) {
				this._messageLabel.setValue(text || "");
			},
			getData:               function() {
				var combatTools = ava.CombatTools;
				var data = {};

				// Get times
				data.times = {
					magic: combatTools.convertGameTimeToUtc(this._magicTime.getValue()),
					inf:   combatTools.convertGameTimeToUtc(this._infTime.getValue()),
					cav:   combatTools.convertGameTimeToUtc(this._cavTime.getValue()),
					siege: combatTools.convertGameTimeToUtc(this._siegeTime.getValue())
				};

				// Targets
				data.targets = [];
				this._rows.forEach(function(row) {
					var value = row.getValue();
					if(value != null) {
						data.targets.push(value);
					}
				});

				// Options
				data.includeActive = this._includeActive.getValue();
				data.allowPartial = this._allowPartial.getValue();
				data.useScouts = this._useScouts.getValue();
				data.useSmallestForFakes = this._useSmallestForFakes.getValue();
				data.excludeDefense = this._excludeDefenseCheck.getValue();
				data.forceMs = this._forceMsCheck.getValue();
				data.travelMode = this.getTravelMode();
				return data;
			},
			setData:               function(data) {
				var _this = this;
				var combatTools = ava.CombatTools;

				// Reset
				this.reset();

				if(data.times) {
					var now = new Date().getTime();
					if(data.times.magic && data.times.magic > now)
						this._magicTime.setValue(combatTools.convertUtcToGameTime(data.times.magic));
					if(data.times.inf && data.times.inf > now)
						this._infTime.setValue(combatTools.convertUtcToGameTime(data.times.inf));
					if(data.times.cav && data.times.cav > now)
						this._cavTime.setValue(combatTools.convertUtcToGameTime(data.times.cav));
					if(data.times.siege && data.times.siege > now)
						this._siegeTime.setValue(combatTools.convertUtcToGameTime(data.times.siege));
				}

				if(data.targets && data.targets.length > 0) {
					// Delete rows
					this._rows.forEach(this._removeRow, this);
					this._rows = [];

					// Add new
					data.targets.forEach(function(rowData) {
						var row = _this.addRow();
						row.setValue(rowData);
					});
				}

				// Include active
				this._includeActive.setValue(data.includeActive != null ? data.includeActive : true);
				this._allowPartial.setValue(!!data.allowPartial);
				this._useScouts.setValue(data.useScouts != null ? data.useScouts : true);
				this._useSmallestForFakes.setValue(!!data.useSmallestForFakes);
				this._excludeDefenseCheck.setValue(!!data.excludeDefense);
				this._forceMsCheck.setValue(!!data.forceMs);
				this._travelModeGroup.setModelSelection([data.travelMode || "auto"]);
			},
			getStoragePath:        function() {
				return "ava.CombatWindow." + webfrontend.data.Player.getInstance().getId();
			},
			storeData:             function() {
				{
					var path = this.getStoragePath();
					var data = this.getData();
					localStorage.setItem(path, JSON.stringify(data));
					paDebug("CombatWindow data stored");
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
			},
			loadData:              function() {
				{
					var path = this.getStoragePath();
					var data = JSON.parse(localStorage.getItem(path));
					if(data != null) {
						this.setData(data);
						paDebug("CombatWindow data loaded");
					} else {
						this.reset();
						paDebug("CombatWindow data had no data to load");
					}
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
			}
		}
	});
	qx.Class.define("ava.CombatWindowExport", {
		type:      "singleton",
		extend:    qx.ui.window.Window,
		construct: function() {
			this.base(arguments, "Commands Import/Export");
			this.buildUI();
		},
		statics:   {
			ORDER_TYPES:  {
				"1": "scout",
				"2": "plunder",
				"3": "assault",
				"4": "support",
				"5": "siege"
			},
			_formatTime:  function(utcTime) {
				// Get time in server time
				var gameTime = ava.CombatTools.convertUtcToGameTime(utcTime, 1);
				var text = qx.lang.String.pad(String(gameTime.getFullYear()), 4, "0") + "/";
				text += qx.lang.String.pad(String(gameTime.getMonth() + 1), 2, "0") + "/";
				text += qx.lang.String.pad(String(gameTime.getDate()), 2, "0") + " ";
				text += qx.lang.String.pad(String(gameTime.getHours()), 2, "0") + ":";
				text += qx.lang.String.pad(String(gameTime.getMinutes()), 2, "0") + ":";
				text += qx.lang.String.pad(String(gameTime.getSeconds()), 2, "0");
				return text;
			},
			_parseTime:   function(text) {
				var m = text.match(/^\s*(\d{4})\/?(\d{1,2})\/?(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})\s*$/);
				if(!m) {
					return null;
				}
				var date = new Date(m[1], m[2] - 1, m[3], m[4], m[5], m[6], 0);
				if(!isNaN(date)) {
					// Note: Times are always in server time
					return ava.CombatTools.convertGameTimeToUtc(new Date(date), 1);
				} else {
					return null;
				}
			},
			dataToString: function(data, separator) {
				var segments = [];

				// Name
				var name = webfrontend.data.Server.getInstance().getName();
				segments.push(name.replace(/\s*\(.*\)\s*/, ""));

				if(data.times) {
					var now = new Date().getTime();
					if(data.times.magic && data.times.magic > now)
						segments.push("Magic " + this._formatTime(data.times.magic));
					if(data.times.cav && data.times.cav > now)
						segments.push("Cavalry " + this._formatTime(data.times.cav));
					if(data.times.inf && data.times.inf > now)
						segments.push("Infantry " + this._formatTime(data.times.inf));
					if(data.times.siege && data.times.siege > now)
						segments.push("Siege " + this._formatTime(data.times.siege));
				}

				if(data.targets && data.targets.length > 0) {
					data.targets.forEach(function(target) {
						var typeText = ava.CombatWindowExport.ORDER_TYPES[target.type] || target.type;
						var noteText = (target.note && target.note.length > 0) ? " - " + target.note : "";
						segments.push(qx.lang.String.capitalize(target.target + " " + target.attack + " " + typeText) + noteText);
					});
				}

				// Join
				return segments.join(separator);
			},
			parseData:    function(text, separator) {
				var segments = text.split(separator);
				var data = {
					times:   {},
					targets: []
				};

				// Go thru lines and parse them
				segments.forEach(function(segment) {
					segment = ava.CombatTools.removeBBcode(segment).trim();
					var time, m;

					if(m = segment.match(/^magic\s+(.*)$/i)) {
						time = ava.CombatWindowExport._parseTime(m[1]);
						if(time != null) {
							data.times.magic = time;
						}
						return;
					} else if(m = segment.match(/^infantry\s+(.*)$/i)) {
						time = ava.CombatWindowExport._parseTime(m[1]);
						if(time != null) {
							data.times.inf = time;
						}
						return;
					} else if(m = segment.match(/^cavalry\s+(.*)$/i)) {
						time = ava.CombatWindowExport._parseTime(m[1]);
						if(time != null) {
							data.times.cav = time;
						}
						return;
					} else if(m = segment.match(/^siege\s+(.*)$/i)) {
						time = ava.CombatWindowExport._parseTime(m[1]);
						if(time != null) {
							data.times.siege = time;
						}
						return;
					}

					// Target
					var targetMatch = segment.match(/^(\d{1,3}:\d{1,3})\s+(fake|capture|demo|attack|scout)\s+(plunder|siege|assault|scout)\b\s*(.*)$/i);
					if(targetMatch) {
						var type = qx.lang.Object.getKeyFromValue(ava.CombatWindowExport.ORDER_TYPES, targetMatch[3].toLowerCase());
						data.targets.push({
							target: targetMatch[1],
							attack: targetMatch[2].toLowerCase(),
							type:   type,
							note:   (targetMatch[4] || "").replace(/^\s*-\s*/, "")
						});
					}
				});

				if(qx.lang.Object.getValues(data.times).length < 1) {
					delete data.times;
				}
				if(data.targets.length < 1) {
					delete data.targets;
				}
				return data;
			}
		},
		members:   {
			_compactCheck: null,
			_contentText:  null,
			_importButton: null,
			_exportButton: null,
			_closeButton:  null,
			buildUI:       function() {
				var app = qx.core.Init.getApplication();
				this.setLayout(new qx.ui.layout.VBox(5));
				this.set({
					allowMaximize:  false,
					allowMinimize:  false,
					showMaximize:   false,
					showMinimize:   false,
					showStatusbar:  false,
					showClose:      false,
					contentPadding: 5,
					useMoveFrame:   true,
					resizable:      true
				});
				this.set({
					width:  250,
					height: 300
				});
				webfrontend.gui.Util.formatWinClose(this);

				// Note
				var note = new qx.ui.basic.Label("<em>Note: Time is always in Server Time</em>");
				note.setRich(true);
				this.add(note, {
					flex: 0
				});

				// Text area
				var contentText = this._contentText = new qx.ui.form.TextArea("");

				//this._contentText.set({});
				app.setElementModalInput(contentText);
				this.add(contentText, {
					flex: 1
				});

				// Compact
				var compactCheck = this._compactCheck = new qx.ui.form.CheckBox("Compact");
				compactCheck.set({
					toolTipText: "Use single-line format."
				});
				compactCheck.addListener("changeValue", this.exportData, this);
				this.add(compactCheck, {
					flex: 0
				});

				// Buttons
				var exportButton = this._exportButton = new qx.ui.form.Button("Refresh");
				exportButton.set({
					width:       80,
					toolTipText: "Generate text from the Advanced Commands window."
				});
				exportButton.addListener("execute", this.exportData, this);
				var importButton = this._importButton = new qx.ui.form.Button("Import!");
				importButton.set({
					width:       80,
					toolTipText: "Import data into the dialog."
				});
				importButton.addListener("execute", this.importData, this);
				var closeButton = this._closeButton = new qx.ui.form.Button("Close");
				closeButton.set({
					width:       80,
					toolTipText: "Closes the dialog."
				});
				closeButton.addListener("execute", this.hide, this);
				var buttonsRow = new qx.ui.container.Composite();
				buttonsRow.setLayout(new qx.ui.layout.HBox(5));
				buttonsRow.set({
					alignX: "right"
				});
				buttonsRow.add(exportButton);
				buttonsRow.add(importButton);
				buttonsRow.add(closeButton);
				this.add(buttonsRow, {
					flex: 0
				});
			},
			exportData:    function() {
				this._contentText.setValue("");
				var sep = this._compactCheck.getValue() ? "|" : "\n";
				var data = ava.CombatWindow.getInstance().getData();
				var text = ava.CombatWindowExport.dataToString(data, sep);
				this._contentText.setValue(text);
				this._contentText.selectAllText();
				this._contentText.focus();
			},
			importData:    function() {
				var text = this._contentText.getValue();
				var data = ava.CombatWindowExport.parseData(text, /[\n|]/);
				var cw = ava.CombatWindow.getInstance();
				cw.setData(data);
				cw._forceMsCheck.setValue(true);
			}
		}
	});

	var citySort = null;
	String.prototype.iCompare = function(str) {
		var str1 = this.toLowerCase();
		var str2 = str.toLowerCase();
		return (str1 < str2) ? -1 : (str1 == str2 ? 0 : 1);
	};

	function stricmp(str1, str2) {
		return str1.iCompare(str2);
	};
	var curCity;
	qx.Class.define("ava.optionsPage", {
		extend:    webfrontend.gui.OverlayWidget,
		type:      "singleton",
		construct: function() {
			webfrontend.gui.OverlayWidget.call(this);
			var _this = this; // ensure this doesn't get overridden in a sub func
			var app = qx.core.Init.getApplication();
			var cMain = ava.Main.getInstance();
			this.clientArea.setLayout(new qx.ui.layout.Canvas());
			this.setTitle("Ava Tools Options");
			this.tabView = new qx.ui.tabview.TabView().set({
				contentPaddingLeft:   15,
				contentPaddingRight:  10,
				contentPaddingTop:    10,
				contentPaddingBottom: 10
			});
			this.tabPages = [
				{
					name: "General",
					page: null,
					vbox: null
				}
			];
			for(i = 0; i < this.tabPages.length; i++) {
				page = new qx.ui.tabview.Page(this.tabPages[i].name);
				page.setLayout(new qx.ui.layout.Canvas());
				vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
				scroll = new qx.ui.container.Scroll(vbox);
				page.add(scroll, {
					top:    0,
					left:   0,
					right:  0,
					bottom: 0
				});
				this.tabPages[i].vbox = vbox;
				this.tabPages[i].page = page;
			}

			// ----- Page 1
			// ----- Show city buildings window
			var cb = new qx.ui.form.CheckBox("Hide Ava Tools panel at load");
			cb.cMain = cMain;
			if(cMain.options.hideAvaTools)
				cb.setValue(true);
			cb.addListener("click", function() {
				_this.cMain.options.hideAvaTools = _this.getValue() ? true : false;
			}, cb);
			this.tabPages[0].vbox.add(cb);

			// ----- Sort by reference
			cb = new qx.ui.form.CheckBox("Sort by reference at start");
			cb.cMain = cMain;
			if(cMain.options.sortByReference)
				cb.setValue(true);
			cb.addListener("click", function() {
				_this.cMain.options.sortByReference = _this.getValue() ? true : false;
			}, cb);
			_this.tabPages[0].vbox.add(cb);

			// ----- Trade Minister
			cb = new qx.ui.form.CheckBox("Enable closest hub button");
			cb.cMain = cMain;
			if(cMain.options.enableClosestHub)
				cb.setValue(true);
			cb.addListener("click", function() {
				_this.cMain.options.enableClosestHub = _this.getValue() ? true : false;
				if(ava.Main.getInstance().panel.useClosestHubButton != null) {
					ava.Main.getInstance().panel.useClosestHubButton.setVisibility(_this.cMain.options.enableClosestHub ? "visible" : "excluded");
				}
			}, cb);
			this.tabPages[0].vbox.add(cb);
			var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
			var lab = new qx.ui.basic.Label("Name");
			lab.setAlignY("middle");
			row.add(lab);
			_this.nameTxt = new qx.ui.form.TextField();
			_this.nameTxt.set({
				toolTipText: "Name of the preset"
			});
			_this.nameTxt.setAlignY("middle");
			app.setElementModalInput(_this.nameTxt);
			_this.nameTxt.setValue("");
			row.add(_this.nameTxt);
			lab = new qx.ui.basic.Label("Wood");
			lab.setAlignY("middle");
			row.add(lab);
			_this.woodTxt = new qx.ui.form.TextField();
			_this.woodTxt.set({
				width:       60,
				toolTipText: "Amount of wood to set"
			});
			_this.woodTxt.setAlignY("middle");
			app.setElementModalInput(_this.woodTxt);
			_this.woodTxt.setValue("0");
			row.add(_this.woodTxt);
			lab = new qx.ui.basic.Label("Stone");
			lab.setAlignY("middle");
			row.add(lab);
			_this.stoneTxt = new qx.ui.form.TextField();
			_this.stoneTxt.set({
				width:       60,
				toolTipText: "Amount of stone to set"
			});
			app.setElementModalInput(_this.stoneTxt);
			_this.stoneTxt.setAlignY("middle");
			_this.stoneTxt.setValue("0");
			row.add(_this.stoneTxt);
			lab = new qx.ui.basic.Label("Iron");
			lab.setAlignY("middle");
			row.add(lab);
			_this.ironTxt = new qx.ui.form.TextField();
			_this.ironTxt.set({
				width:       60,
				toolTipText: "Amount of iron to set"
			});
			app.setElementModalInput(_this.ironTxt);
			_this.ironTxt.setAlignY("middle");
			_this.ironTxt.setValue("0");
			row.add(_this.ironTxt);
			lab = new qx.ui.basic.Label("Food");
			lab.setAlignY("middle");
			row.add(lab);
			_this.foodTxt = new qx.ui.form.TextField();
			_this.foodTxt.set({
				width:       60,
				toolTipText: "Amount of food to set"
			});
			app.setElementModalInput(_this.foodTxt);
			_this.foodTxt.setAlignY("middle");
			_this.foodTxt.setValue("0");
			row.add(_this.foodTxt);
			_this.tabPages[0].vbox.add(row);
			row = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
			_this.selBox = new qx.ui.form.SelectBox().set({
				alignY:   "middle",
				tabIndex: 1,
				width:    200
			});
			var li = new qx.ui.form.ListItem("New Item", null, -1);
			li.entry = {
				name:  "Add New Item",
				wood:  0,
				stone: 0,
				iron:  0,
				food:  0
			};
			_this.selBox.add(li);
			var templates = cMain.options.hubTemplates;
			for(var x = 0; x < templates.length; ++x) {
				var item = templates[x];
				lbl = item.name;
				li = new qx.ui.form.ListItem(lbl, null, x);
				li.entry = item;
				_this.selBox.add(li);
			}
			_this.selBox.setAlignY("middle");
			row.add(_this.selBox);
			_this.selBox.addListener("changeSelection", function(e) {
				if(e != null && e.getData().length > 0) {
					var item = e.getData()[0].entry;
					_this.nameTxt.setValue(item.name == "Add New Item" ? "" : item.name);
					_this.woodTxt.setValue(item.wood.toString());
					_this.stoneTxt.setValue(item.stone.toString());
					_this.ironTxt.setValue(item.iron.toString());
					_this.foodTxt.setValue(item.food.toString());
				}
			}, _this);
			var btn = new qx.ui.form.Button("Save");
			btn.setToolTipText("Save amounts for later use.");
			btn.selBox = _this.selBox;
			btn.addListener("execute", function() {
				var cMain = ava.Main.getInstance();
				var name = _this.nameTxt.getValue();
				var wood = _this.woodTxt.getValue();
				var stone = _this.stoneTxt.getValue();
				var iron = _this.ironTxt.getValue();
				var food = _this.foodTxt.getValue();
				var templates = cMain.options.hubTemplates;
				var found = false;
				for(var x = 0; x < templates.length; ++x) {
					var item = templates[x];
					if(item.name == name) {
						found = true;
						item.wood = isNaN(wood) ? 0 : parseInt(wood);
						item.stone = isNaN(stone) ? 0 : parseInt(stone);
						item.iron = isNaN(iron) ? 0 : parseInt(iron);
						item.food = isNaN(food) ? 0 : parseInt(food);
					}
				}
				if(!found) {
					cMain.options.hubTemplates[cMain.options.hubTemplates.length] = {
						"name":  name.trim(),
						"wood":  isNaN(wood) ? 0 : parseInt(wood),
						"stone": isNaN(stone) ? 0 : parseInt(stone),
						"iron":  isNaN(iron) ? 0 : parseInt(iron),
						"food":  isNaN(food) ? 0 : parseInt(food)
					};
				}
				_this.selBox.removeAll();
				li = new qx.ui.form.ListItem("Add New Item", null, -1);
				li.entry = {
					name:  "Add New Item",
					wood:  0,
					stone: 0,
					iron:  0,
					food:  0
				};
				_this.selBox.add(li);
				templates = cMain.options.hubTemplates;
				for(var x = 0; x < templates.length; ++x) {
					var item = templates[x];
					var lbl = item.name;
					li = new qx.ui.form.ListItem(lbl, null, x);
					li.entry = item;
					_this.selBox.add(li);
				}
				if(cMain.hubSelBox != null) {
					cMain.hubSelBox.removeAll();
					for(var x = 0; x < templates.length; ++x) {
						var item = templates[x];
						var lbl = item.name;
						li = new qx.ui.form.ListItem(lbl, null, x);
						li.entry = item;
						cMain.hubSelBox.add(li);
					}
				}
			}, _this);
			row.add(btn);
			console.debug("erere1");
			btn = new qx.ui.form.Button("Remove");
			btn.setToolTipText("Remove the selected entry.");
			btn.selBox = _this.selBox;
			btn.addListener("execute", function() {
				var cMain = ava.Main.getInstance();
				if(_this.getSelection()[0].getModel() != -1) {
					var selItem = _this.getSelection()[0].entry;
					templates = cMain.options.hubTemplates;
					for(var x = 0; x < templates.length; ++x) {
						var item = templates[x];
						if(item.name == selItem.name) {
							templates.splice(x, 1);
							break;
						}
					}

					_this.removeAll();
					li = new qx.ui.form.ListItem("Add New Item", null, -1);
					li.entry = {
						name:  "Add New Item",
						wood:  0,
						stone: 0,
						iron:  0,
						food:  0
					};
					_this.add(li);
					templates = cMain.options.hubTemplates;
					for(var x = 0; x < templates.length; ++x) {
						var item = templates[x];
						var lbl = item.name;
						li = new qx.ui.form.ListItem(lbl, null, x);
						li.entry = item;
						_this.add(li);
					}
				}
			}, _this.selBox);
			row.add(btn);
			_this.tabPages[0].vbox.add(row);
			console.debug("33");
			// ----- Show city buildings window
			var cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			cont.add(new qx.ui.core.Spacer(20));
			lab = new qx.ui.basic.Label("Show city buildings window");
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(10));

			rg = new qx.ui.form.RadioGroup();
			rg.cMain = cMain;
			rbs = ["Disabled", "Always on", "On in city view"];
			for(i = 0; i < rbs.length; i++) {
				rb = new qx.ui.form.RadioButton(rbs[i]);
				rb.setUserData("id", i);
				rb.setGroup(rg);
				cont.add(rb);
				cont.add(new qx.ui.core.Spacer(10));
			}

			rg.cMain = cMain;
			rg.setSelection([rg.getChildren()[cMain.options.showCityBuildings]]);
			rg.addListener("changeSelection", function() {
				_this.cMain.options.showCityBuildings = _this.getSelection()[0].getUserData("id");
				var app = qx.core.Init.getApplication();
				_this.cMain.cityBuildings.bldgsCont.setVisibility((_this.cMain.options.showCityBuildings == 1 || (_this.cMain.options.showCityBuildings == 2 && (app.visMain.mapmode == "c"))) ? "visible" : "excluded");
				_this.cMain.cityBuildings.updateCityBuildings();
			}, rg);
			_this.tabPages[0].vbox.add(cont);

			// ----- Alert me if my name is mentioned in chat
			cb = new qx.ui.form.CheckBox("Alert if name mentioned in chat");
			cb.cMain = cMain;
			if(cMain.options.showChatAlert)
				cb.setValue(true);
			cb.addListener("click", function() {
				_this.cMain.options.showChatAlert = _this.getValue() ? true : false;
			}, cb);
			_this.tabPages[0].vbox.add(cb);

			// ----- Alert me if my name is mentioned in chat
			cb = new qx.ui.form.CheckBox("Alert if someone whispers");
			cb.cMain = cMain;
			if(cMain.options.showWhisperAlert)
				cb.setValue(true);
			cb.addListener("click", function() {
				_this.cMain.options.showWhisperAlert = _this.getValue() ? true : false;
			}, cb);
			_this.tabPages[0].vbox.add(cb);

			// ----- Alert me if a word is mentioned in chat
			cb = new qx.ui.form.CheckBox("Alert if one of these phrases is mentioned in chat");
			cb.cMain = cMain;
			if(cMain.options.showChatAlertPhrases)
				cb.setValue(true);
			cb.addListener("click", function() {
				_this.cMain.options.showChatAlertPhrases = _this.getValue() ? true : false;
			}, cb);
			_this.tabPages[0].vbox.add(cb);
			tf = new qx.ui.form.TextField();
			tf.cMain = cMain;
			tf.setMaxWidth(300);
			tf.set({
				toolTipText: "Notify me if any of these phrases are mentioned in chat. (comma or semicolon separated list)"
			});
			tf.setValue(cMain.options.chatAlertPhrases);
			tf.addListener("changeValue", function() {
				_this.cMain.options.chatAlertPhrases = _this.getValue();
			}, tf);
			_this.tabPages[0].vbox.add(tf);
			_this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));

			// ----- Save Button
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			btn = new qx.ui.form.Button("Save").set({
				width:      90,
				marginLeft: 30
			});
			btn.addListener("click", _this.saveOptions, _this);
			cont.add(btn);
			_this.expImpWin = _this.createExpImpWindow();

			// ----- Export button
			btn = new qx.ui.form.Button("Export").set({
				appearance: "button-text-small",
				marginLeft: 280
			});
			btn.addListener("click", function() {
				var options = ava.Main.getInstance().options;
				_this.expImpWin.setCaption("Export");
				_this.expImpWin.setUserData("id", 2);
				_this.expImpWin.getUserData("lab").setValue("You can save _this string in a text file and import it later when needed.");
				_this.expImpWin.getUserData("ta").setValue(JSON.stringify(options));
				_this.expImpWin.open();
			}, _this);
			cont.add(btn);

			// ----- Import button
			btn = new qx.ui.form.Button("Import").set({
				appearance: "button-text-small"
			});
			btn.addListener("click", function() {
				_this.expImpWin.setCaption("Import");
				_this.expImpWin.setUserData("id", 1);
				_this.expImpWin.getUserData("lab").setValue("Insert saved Options into text field and press OK.");
				_this.expImpWin.getUserData("ta").setValue("");
				_this.expImpWin.open();
			}, _this);
			cont.add(btn);

			for(i = 0; i < _this.tabPages.length; i++) {
				_this.tabView.add(_this.tabPages[i].page);
			}
			_this.clientArea.add(_this.tabView, {
				top:    0,
				right:  3,
				bottom: 30,
				left:   3
			});
			_this.clientArea.add(cont, {
				right:  3,
				bottom: 3,
				left:   3
			});
			_this.tabView.setSelection([_this.tabView.getChildren()[0]]);
		},
		members:   {
			tabView:            null,
			tabPages:           null,
			clrSel:             null,
			expImpWin:          null,
			woodTxt:            null,
			stoneTxt:           null,
			ironTxt:            null,
			foodTxt:            null,
			nameTxt:            null,
			selBox:             null,
			createExpImpWindow: function() {
				var _this = this;
				win = new qx.ui.window.Window("");
				win.setLayout(new qx.ui.layout.VBox(10));
				win.set({
					showMaximize:  false,
					showMinimize:  false,
					allowMaximize: false
				});
				win.setWidth(450);
				win.setHeight(200);

				//win.open();
				var app = qx.core.Init.getApplication();
				app.getRoot().add(win, {
					left: 250,
					top:  200
				});
				lab = new qx.ui.basic.Label("");
				win.add(lab);
				win.setUserData("lab", lab);

				var options = ava.Main.getInstance().options;
				ta = new qx.ui.form.TextArea(JSON.stringify(options));
				ta.addListener("click", function() {
					_this.selectAllText();
				});
				win.add(ta, {
					height: 65
				});
				win.setUserData("ta", ta);
				btn = new qx.ui.form.Button("OK").set({
					maxWidth: 50,
					alignX:   "center"
				});
				btn.addListener("click", function() {
					id = _this.getUserData("id");
					if(id == 1) {
						txt = _this.getUserData("ta").getValue();
						{
							obj = JSON.parse(txt);
						}
						/* (e) {
						 obj="error";
						 } */
						if(typeof obj == "object" && obj != null) {
							ava.Main.getInstance().options = JSON.parse(txt);
							paDebug(":AvaLoad Options");
							paDebug(txt);
							localStorage.setItem("Ava_options", txt);
							_this.close();
						} else {
							console.error("Inserted string is invalid");
						}
					} else if(id == 2) {
						_this.close();
					}
				}, win);
				win.add(btn);
				return win;
			},
			saveOptions:        function() {
				var options = ava.Main.getInstance().options;
				str = JSON.stringify(options);
				localStorage.setItem("Ava_options", str);

				paDebug(str);

				qx.core.Init.getApplication().switchOverlay(null);
				var cMain = ava.Main.getInstance();
				if(cMain.hubSelBox != null) {
					templates = cMain.options.hubTemplates;
					cMain.hubSelBox.removeAll();
					for(var x = 0; x < templates.length; ++x) {
						var item = templates[x];
						var lbl = item.name;
						li = new qx.ui.form.ListItem(lbl, null, x);
						li.entry = item;
						cMain.hubSelBox.add(li);
					}
				}
			}
		}
	});
	/// globals


// CreateAvaTweak
var fortuneAvailImg = null;


qx.Class.define("ava.ExtraTools", {
	extend:    ava.LeftPanel,
//	extend:  qx.ui.container.Composite,
	construct: function(title) {
		this.base(arguments, title);
		this.buildUI();
		paDebug("Ava init leg panel");
	},
	members:   {
		cityInfoImg:             null,
		city:                    null,
		optionsPage:             null,
		options:                 null,
		deleteFoodCityResButton: null,
		deleteResButton:         null,
		BaronRow:                null,
		MissingResourcesRow:     null,
		reportsButton:           null,
		closestHubButton:        null,
		templatesSelBox:         null,
		buildUI:                 function() {
			var app = qx.core.Init.getApplication();
			var cInfoView = app.getCityInfoView();
			var bQc = cInfoView.buildingQueue;
			var bQh = bQc.header;
			var fillQueueButton = new qx.ui.form.Button("+");
			fillQueueButton.set({
				width:       22,
				appearance:  "button-text-small",
				toolTipText: "Click to Fill build queue"
			});
			fillQueueButton.addListener("execute", this.fillBuildingQueue, this);
			bQh.add(fillQueueButton, {
				left: 5,
				top:  33
			});
			var payQueueButton = new qx.ui.form.Button("#");
			payQueueButton.set({
				width:       22,
				appearance:  "button-text-small",
				toolTipText: "Click to Convert all builds"
			});
			payQueueButton.addListener("execute", this.payBuildingQueue, this);
			bQh.add(payQueueButton, {
				left: 28,
				top:  33
			});
			var deleteCottageButton = new qx.ui.form.Button("-");
			deleteCottageButton.set({
				width:       22,
				appearance:  "button-text-small",
				toolTipText: "Click to remove a cottage"
			});
			deleteCottageButton.addListener("execute", this.removeCottage, this);
			bQh.add(deleteCottageButton, {
				left: 49,
				top:  33
			});
			this.deleteResButton = new qx.ui.form.Button();
			this.deleteResButton.set({
				width:       22,
				appearance:  "button-text-small",
				toolTipText: "Click to remove res nodes from the center"
			});
			this.deleteResButton.addListener("execute", this.removeCenterRes, this);
			var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_playerinfo_townicon_castle_land.png");
			img.setWidth(18);
			img.setHeight(15);
			img.setScale(true);
			img.setAlignY("middle");
			this.deleteResButton._add(img);
			bQh.add(this.deleteResButton, {
				left: 72,
				top:  33
			});
			this.deleteFoodCityResButton = new qx.ui.form.Button();

			//var deleteFoodCityResButton = new qx.ui.form.Button("cf");
			this.deleteFoodCityResButton.set({
				width:       22,
				appearance:  "button-text-small",
				toolTipText: "Click to remove res nodes for a food city"
			});
			this.deleteFoodCityResButton.addListener("execute", this.removeResNode, this);
			var img = new qx.ui.basic.Image("webfrontend/ui/icons_ressource_voidFood_16.png");
			img.setWidth(16);
			img.setHeight(15);
			img.setScale(true);
			img.setAlignY("middle");
			this.deleteFoodCityResButton._add(img);
			bQh.add(this.deleteFoodCityResButton, {
				left: 250,
				top:  33
			});

			// Queue buttons (Thank you MousePak!)
			var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
			this.optionsPage = new ava.optionsPage();
			this.addContent(row);
			var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

			// ***** Options button ***** //
			var optionsBtn = new qx.ui.form.Button("Options");
			optionsBtn.set({
				width:       50,
				appearance:  "button-text-small",
				toolTipText: "Ava Tools Options"
			});
			optionsBtn.addListener("click", this.showOptionsPage, this);
			row.add(optionsBtn);
			var IncomingAttacksButton = new qx.ui.form.Button("i");
			IncomingAttacksButton.set({
				width:       20,
				appearance:  "button-text-small",
				toolTipText: "Experimental incoming attack info"
			});
			IncomingAttacksButton.addListener("execute", this.showIncomingAttacks, this);
			row.add(IncomingAttacksButton);
			var dialog = ava.IncomingAttacksWindow.getInstance();
			var tmWidget = new webfrontend.gui.MinisterInfo.Trade();
			app.ministerInfoWidget = new Object();
			app.ministerInfoWidget[webfrontend.base.GameObjects.eMinisterId.TradeMinister] = tmWidget;
			tmWidget.addListenerOnce("appear", function() {
				var app = qx.core.Init.getApplication();
				if(app.hasOwnProperty("ministerInfoWidget")) {
					var tmWidget = app.ministerInfoWidget[webfrontend.base.GameObjects.eMinisterId.TradeMinister];
					var children = tmWidget._tabView.getChildren();
					if(children.length > 2) {
						children = children[2].getChildren();
						if(children.length > 1) {
							var br = children[1].getChildren()[1];
							var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));
							var btn = new qx.ui.form.Button("Set hub");
							btn.setToolTipText("Sets trade settings to use the closest city by land in a City Group containing 'hub' in its name with resource amounts selected.");
							row.add(btn);
							var btn2 = new qx.ui.form.Button("Set res");
							btn2.setToolTipText("Sets trade settings to use the amounts selected.");
							row.add(btn2);
							var selBox = new qx.ui.form.SelectBox().set({
								alignY:   "middle",
								tabIndex: 1,
								width:    200
							});
							var cMain = ava.Main.getInstance();
							cMain.hubSelBox = selBox;
							var templates = cMain.options.hubTemplates;
							for(var x = 0; x < templates.length; ++x) {
								var item = templates[x];
								var lbl = item.name;
								var li = new qx.ui.form.ListItem(lbl, null, x);
								li.entry = item;
								selBox.add(li);
							}
							selBox.setAlignY("middle");
							row.add(selBox);
							ava.Main.getInstance().selBox = selBox;
							btn.addListener("execute", function() {
								ava.Main.getInstance().panel.findClosestHub();
							}, selBox);
							btn2.addListener("execute", function() {
								ava.Main.getInstance().panel.setHubAmounts();
							}, selBox);
							br.addAfter(row, br.getChildren()[0]);
							ava.Main.getInstance().panel.useClosestHubButton = row;
							if(!cMain.options.enableClosestHub) {
								row.setVisibility("excluded");
							}
						}
					}
				}
			}, tmWidget);

			// Combat command window, written by Mikee
			var combatButton = new qx.ui.form.Button("Combat");
			combatButton.set({
				width:       50,
				appearance:  "button-text-small",
				toolTipText: "Shows Advanced Commands window."
			});
			combatButton.addListener("execute", this.showCombatWindow, this);
			row.add(combatButton);
			var raidButton = new qx.ui.form.Button("Raiding");
			raidButton.set({
				width:       50,
				appearance:  "button-text-small",
				toolTipText: "Raiding"
			});
			raidButton.addListener("execute", this.showRaidingWindow, this);
			row.add(raidButton);
			dialog = ava.RaidingWindow.getInstance();

			// Spacer
			row.add(new qx.ui.core.Widget().set({
				height: 0
			}), {
				flex: 1
			});
			this.addContent(row);
			row = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
			this.reportsButton = new qx.ui.form.Button("Alliance");
			this.reportsButton.set({
				width:       50,
				appearance:  "button-text-small",
				toolTipText: "Alliance Info"
			});
			this.reportsButton.addListener("execute", this.showAllianceInfo, this);
			row.add(this.reportsButton);
			var mailListButton = new qx.ui.form.Button("Mail Lists");
			mailListButton.set({
				width:       60,
				appearance:  "button-text-small",
				toolTipText: "Get alliance mailing lists"
			});
			mailListButton.addListener("execute", this.showMailingLists, this);
			row.add(mailListButton);
			var resButton = new qx.ui.form.Button("Send Res");
			resButton.set({
				width:       55,
				appearance:  "button-text-small",
				toolTipText: "Send Resources"
			});
			resButton.addListener("execute", this.showFillWithResources, this);
			row.add(resButton);
			var itemsButton = new qx.ui.form.Button("Palace");
			itemsButton.set({
				width:       50,
				appearance:  "button-text-small",
				toolTipText: "Use palace items below your level."
			});
			itemsButton.addListener("execute", this.showPalaceItems, this);
			row.add(itemsButton);
			this.addContent(row);
			try {
				this.BaronRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));
				var ToolTip = "Total / Current / Recruiting / Available";
				this.BaronLabel = new qx.ui.basic.Label(" ");
				this.BaronLabel.setRich(true);
				this.BaronLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/theme/tree/open.png);background-repeat:no-repeat;width:16px;height:16px;font-weight:bold;padding-left:15px;"><img src="resource/webfrontend/ui/icons/units/icon_units_baron.png"  style="align:absmiddle;-moz-transform: scaleX(1); width: 16px; height: 16px; padding-left:4px;" /></div>');
				this.BaronLabel.setToolTipText(ToolTip);
				this.BaronLabel.addListener("click", this.toggleTable);
				this.BaronRow.add(this.BaronLabel);
				this.BaronValue = new qx.ui.basic.Label("");
				this.BaronValue.setRich(true);
				this.BaronValue.setValue("<div style='margin-left: 10px;'>0/0/0/0</div>");
				this.BaronValue.setToolTipText(ToolTip);
				this.BaronRow.add(this.BaronValue);
				var cToolTip = "Current/Needed";
				this.CastleLabel = new qx.ui.basic.Label(" ");
				this.CastleLabel.setRich(true);
				this.CastleLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/ui/icons/icon_playerinfo_townicon_castle_land.png);background-repeat:no-repeat;;width:21px;height:16px;font-weight:bold;margin-left:10px;"></div>');
				this.CastleLabel.setToolTipText(cToolTip);
				this.BaronRow.add(this.CastleLabel);
				this.CastleValue = new qx.ui.basic.Label("");
				this.CastleValue.setRich(true);
				if(_oTech == null) {
					_oTech = webfrontend.data.Tech.getInstance();
				}
				var ix = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) + 3;
				var numCastlesNeeded = Math.floor((ix - 3) / 4) + 1;
				this.CastleValue.setValue("<div style='margin-left: 4px;'>" + player.getNumCastles() + "/" + numCastlesNeeded + "</div>");
				this.CastleValue.setToolTipText(cToolTip);
				this.BaronRow.add(this.CastleValue);
				var numOutgoing = webfrontend.data.Alliance.getInstance().getNumOutgoingAttacks();
				this.outgoing = new qx.ui.basic.Label("");
				this.outgoing.setRich(true);
				this.outgoing.setValue("<div style='margin-left: 4px;'>Outgoing Attacks: " + numOutgoing + "</div>");
				this.BaronRow.add(this.outgoing);
				this.addContent(this.BaronRow);
				var oPlayer = webfrontend.data.Player.getInstance();
				if(oPlayer.getTitle() >= 3) {
					this.MissingResourcesRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));
					this.MissingResourcesValue = new qx.ui.basic.Label(" ");
					this.MissingResourcesValue.setRich(true);
					this.MissingResourcesRow.add(this.MissingResourcesValue);
					this.addContent(this.MissingResourcesRow);
				}
			} catch(e) {
				paDebug(e);
			}
			/* (e) {
			 console.debug("Error");
			 console.dir(e);
			 } */
			row = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));
			var cs = qx.core.Init.getApplication().cityBar.citiesSelect;
			cs.prevSort = cs.getSortedPlayerCities;
			var cMain = ava.Main.getInstance();
			citySort = new qx.ui.form.CheckBox("Sort cities by reference");
			citySort.setToolTipText("Sort cities by reference when checked");
			citySort.initValue(cMain.options.sortByReference);
			citySort.addListener("click", this.toggleCityControls);
			row.add(citySort);
			this.addContent(row);
			if(cMain.options.sortByReference) {
				citySort.setValue(true);
				this.toggleCityControls();
			}
			webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateCurBarons, this);
			var oPlayer = webfrontend.data.Player.getInstance();
			if(oPlayer.getTitle() >= 3) {
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateNeededResources, this);
			}
			window.setTimeout(checkFortune, 60000);
		},
		showOptionsPage:         function() {
			var currentOverlay = qx.core.Init.getApplication().getCurrentOverlay();
			var curOverlayName = currentOverlay != null ? currentOverlay.basename : "";
			qx.core.Init.getApplication().switchOverlay((curOverlayName == "optionsPage") ? null : this.optionsPage);
		},
		setHubAmounts:           function() {
			var commandManager = webfrontend.net.CommandManager.getInstance();
			var player = webfrontend.data.Player.getInstance();
			var entry = ava.Main.getInstance().selBox.getSelection()[0].entry;
			var data = webfrontend.net.UpdateManager.getInstance().requester["MAT"].obj;
			var cts = data.getCitiesTradeStates();
			var cid = webfrontend.data.City.getInstance().getId();
			var ro = data.getResourceOptions();
			var dst = data.getBDeliverSameTarget();
			var dir = data.getBDisableIncomingTradeRequest();
			var rst = data.getBRequestSameTarget();
			var dor = data.getBDisableOutgoingTradeRequest();
			var ptr = data.getBProtectResourcesFromRequests();
			var rcr = data.getCartTransportReserveCapacity();
			var rsr = data.getShipTransportReserveCapacity();
			commandManager.sendCommand("CityAutoTradeParamsSet", {
				"cityid":          cid,
				"autoTradeParams": {
					"dst": dst,
					"rst": rst,
					"dir": dir,
					"dor": dor,
					"r":   [
						{
							"t": 1,
							"r": ro['1'].requestCityId,
							"s": ro['1'].surplusMode,
							"d": ro['1'].deliverCityId,
							"p": entry.wood
						},
						{
							"t": 2,
							"r": ro['2'].requestCityId,
							"s": ro['2'].surplusMode,
							"d": ro['2'].deliverCityId,
							"p": entry.stone
						},
						{
							"t": 3,
							"r": ro['3'].requestCityId,
							"s": ro['3'].surplusMode,
							"d": ro['3'].deliverCityId,
							"p": entry.iron
						},
						{
							"t": 4,
							"r": ro['4'].requestCityId,
							"s": ro['4'].surplusMode,
							"d": ro['4'].deliverCityId,
							"p": entry.food
						}
					],
					"ptr": ptr,
					"rcr": rcr,
					"rsr": rsr
				}
			}, null, function(ok, res) {
			});
		},
		findClosestHub:          function() {
			var commandManager = webfrontend.net.CommandManager.getInstance();
			var player = webfrontend.data.Player.getInstance();
			var hubGroupId;
			var cids;
			var nameDistance = new Array();
			for(var ii = 0; ii < player.citygroups.length; ++ii) {
				if(player.citygroups[ii].n.toLowerCase().indexOf('hub') >= 0 && player.citygroups[ii].c.length > 0) {
					hubGroupId = player.citygroups[ii].i;
					cids = player.citygroups[ii].c;
					break;
				}
			}
			commandManager.sendCommand("GetDistance", {
				target: webfrontend.data.City.getInstance().getId()
			}, this, function(ok, res) {
				var minCid = 0;
				var minDistance = 99999;
				for(var x = 0; x < cids.length; ++x) {
					for(var ii = 0; ii < res.length; ++ii) {
						if(res[ii].s == cids[x] && res[ii].l > 0) {
							nameDistance[cids[x]] = res[ii].l;
							if(res[ii].l < minDistance) {
								minDistance = res[ii].l;
								minCid = cids[x];
							}
						}
					}
				}
				if(minCid != 0) {
					var cityList = player.getCities();
					var hubX = cityList[minCid].xPos;
					var hubY = cityList[minCid].yPos;
					var entry = ava.Main.getInstance().hubSelBox.getSelection()[0].entry;
					var data = webfrontend.net.UpdateManager.getInstance().requester["MAT"].obj;
					var ro = data.getResourceOptions();
					var dst = data.getBDeliverSameTarget();
					var dir = data.getBDisableIncomingTradeRequest();
					var rst = data.getBRequestSameTarget();
					var dor = data.getBDisableOutgoingTradeRequest();
					var ptr = data.getBProtectResourcesFromRequests();
					var rcr = data.getCartTransportReserveCapacity();
					var rsr = data.getShipTransportReserveCapacity();
					commandManager.sendCommand("CityAutoTradeParamsSet", {
						"cityid":          webfrontend.data.City.getInstance().getId(),
						"autoTradeParams": {
							"dst": dst,
							"rst": rst,
							"dir": dir,
							"dor": dor,
							"r":   [
								{
									"t": 1,
									"r": minCid,
									"s": 2,
									"d": minCid,
									"p": (entry.wood)
								},
								{
									"t": 2,
									"r": (rst ? 0 : minCid),
									"s": ro['2'].surplusMode,
									"d": (dst ? 0 : minCid),
									"p": (entry.stone)
								},
								{
									"t": 3,
									"r": (rst ? 0 : minCid),
									"s": ro['3'].surplusMode,
									"d": (dst ? 0 : minCid),
									"p": (entry.iron)
								},
								{
									"t": 4,
									"r": (rst ? 0 : minCid),
									"s": ro['4'].surplusMode,
									"d": (dst ? 0 : minCid),
									"p": (entry.food)
								}
							],
							"ptr": ptr,
							"rcr": rcr,
							"rsr": rsr
						}
					}, null, function(ok, res) {
					});
				} else {
					var win = new qx.ui.window.Window("Set hub");
					win.setLayout(new qx.ui.layout.VBox(2));
					win.set({
						showMaximize:  false,
						showMinimize:  false,
						allowMaximize: false,
						width:         150,
						height:        80
					});

					win.lbl = new qx.ui.basic.Label("No hub found").set({
						rich: true
					});

					win.add(win.lbl);
					var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					win.add(row);
					var btn = new qx.ui.form.Button("Close").set({
						appearance:    "button-text-small",
						width:         80,
						paddingLeft:   5,
						paddingRight:  5,
						paddingTop:    0,
						paddingBottom: 0
					});
					btn.win = win;
					row.add(btn);
					btn.addListener("click", function() {
						this.win.hide();
					});
					win.addListener("close", function() {
					}, this);
					win.center();
					win.open();
				}
			});
		},
		removeResNode:           function() {
			this.getCity();
			var bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
			var bqcur = webfrontend.data.City.getInstance().buildQueue;
			var bqcur = (bqcur != null) ? bqcur.length : 0;
			var freeSlots = bqmax - bqcur;
			var ordersSent = 0;
			var delay = 500;
			this.deleteFoodCityResButton.setEnabled(false);
			for(var k = 0; k < this.city.length && ordersSent < freeSlots; k++) {
				if(this.city[k] && this.city[k][2] >= 900 && this.city[k][2] != 903 && this.city[k][1] == 0) {
					var type = this.city[k][2] == 902 ? 27 : (this.city[k][2] == 901 ? 29 : (this.city[k][2] == 903 ? 30 : 28));
					var buildingId = this.city[k][0];
					this.doInsertInBuildQueue(type, buildingId, delay);
					delay += 1000;
					++ordersSent;
				}
			}
			window.setTimeout(function() {
				this.deleteFoodCityResButton.setEnabled(true);
			}.bind(this), delay);
		},
		insertInBuildQueue:      function(type, bldngId) {
			webfrontend.net.CommandManager.getInstance().sendCommand("UpgradeBuilding", {
				cityid:       webfrontend.data.City.getInstance().getId(),
				buildingid:   bldngId,
				buildingtype: type,
				isPaid:       true
			}, null, function() {
			});
		},
		doInsertInBuildQueue:    function(type, id, delay) {
			var _this = this;
			setTimeout(function() {
				try {
					_this.insertInBuildQueue(type, id);
				} catch(ex) {
					paDebug(ex);
				}
				/* (e) {
				 console.debug("Error");
				 console.dir(e);
				 } */
			}, delay);
		},
		removeCenterRes:         function() {
			this.getCityCenter();
			var bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
			var bqcur = webfrontend.data.City.getInstance().buildQueue;
			var bqcur = (bqcur != null) ? bqcur.length : 0;
			var freeSlots = bqmax - bqcur;
			var ordersSent = 0;
			var delay = 500;
			this.deleteResButton.setEnabled(false);
			for(var k = 0; k < this.city.length && ordersSent < freeSlots; k++) {
				if(this.city[k] && this.city[k][2] >= 900 && this.city[k][1] == 0) {
					var type = this.city[k][2] == 902 ? 27 : (this.city[k][2] == 901 ? 29 : (this.city[k][2] == 903 ? 30 : 28));
					var buildingId = this.city[k][0];
					this.doInsertInBuildQueue(type, buildingId, delay);
					delay += 1000;
					++ordersSent;
				}
			}
			window.setTimeout(function() {
				this.deleteResButton.setEnabled(true);
			}.bind(this), delay);
		},
		removeCottage:           function() {
			this.getCity();
			var _arr = new Array();
			var _wallIn = false;
			for(var k = 0; k < this.city.length; k++) {
				if(this.city[k] && this.city[k][2] == 4 && this.city[k][1] <= 10 && this.city[k][1] > -1) {
					if(!_wallIn)
						_arr.push(this.city[k]);
					if(this.city[k][2] == 23)
						_wallIn = true;
				}
			}
			if(_arr.length > 0) {
				_arr.sort(function(a, b) {
					return a[1] - b[1];
				});
				webfrontend.net.CommandManager.getInstance().sendCommand("DemolishBuilding", {
					cityid:     webfrontend.data.City.getInstance().getId(),
					buildingid: _arr[0][0]
				}, this, this.sentCommand);
			} else {
				showMsgWindow("Remove Cottage", "No cottages Available to remove.");
			}
		},
		sentCommand:             function(ok, errorCode) {
			if(!errorCode) {
				showMsgWindow("Remove", "No building queue slots Available.");
			}
		},
		getCity:                 function() {
			var app = qx.core.Init.getApplication();
			if(app.visMain.mapmode != "c")
				return;
			var _cells = app.visMain.cells;
			if(!_cells[0]) {
				window.setTimeout(function() {
					ava.Main.getInstance().panel.getCity();
				}, 1000);
				return;
			}
			var _cgi = webfrontend.data.City.getInstance();
			var waterCity = _cgi.getOnWater();
			var _se = new Array();
			for(var _c in _cells) {
				var _cell = _cells[_c].entities;
				for(var d in _cell) {
					if(_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
						if(_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
							if(_cell[d].selectNode.getY() < 880) {
								_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX() + 1, _cell[d].visId]);
							} else {
								_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX() + 1, _cell[d].visId]);
							}
							_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
							_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
							_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX(), _cell[d].visId]);
							_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX(), _cell[d].visId]);
						} else {
							if(_cell[d].getType) {
								if(_cell[d].getType() > 51 && _cell[d].getType() < 60) {
									_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
									_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
								}
							}
							_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
						}
					}
				}
			}
			_se.sort(function(a, b) {
				return a[1] - b[1];
			});
			console.debug("helllo");
			this.city = new Array(441);
			var _empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
			var _water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];
			for(var i = 0; i < this.city.length; i++)
				this.city[i] = null;
			for(var i = 0; i < _empty.length; i++)
				this.city[_empty[i]] = [-1, -1, -1];

			if(waterCity) {
				for(var i = 0; i < _water.length; i++)
					this.city[_water[i]] = [-1, -1, -2];
			}
			try {
				for(var i = 0,c = 0; i < _se.length; i++) {
					while(this.city[c] != null)
						c++;
					if(_se[i][0].getResType != undefined)
						this.city[c] = [_se[i][0].getId(), this.checkBuilding(_se[i][0].getId()), _se[i][0].getResType() + 900];
					else if(_se[i][0].getType != undefined) {
						if(_se[i][0].getLevel != undefined)
							this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel() + this.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
						else
							this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel() + this.checkBuilding("wall"), _se[i][0].getType()];
						// wall
					} else if(_se[i][0].getPlaceId != undefined) {
						if(_se[i][0].drawNode != null) {
							if(_se[i][0].drawNode.image != undefined) {
								if(_se[i][0].drawNode.image.indexOf("tower") != -1) {
									this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
									// tower place
								} else {
									this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
									// empty, can be corn field
								}
							} else if(_se[i][0].drawNode.basename == "EffectNode") {
								this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
								// ??? bottom left tower in water city
							}
						} else {
							if(waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
								this.city[c] = [_se[i][0].getPlaceId(), 0, 97];
								// water building place
							} else {
								this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
								// empty
							}
						}
					}
				}
				for(i = 0; i < this.city.length; i++) {
					if(this.city[i] == null) {
						this.city = new Array(441);
						window.setTimeout(function() {
							ava.Main.getInstance().panel.getCity()
						}, 1000);
						return;
					}
				}
				this.cityId = _cgi.getId();
			} catch(e) {
				paDebug(e);
			}
			/* (e) {
			 console.debug("Error");
			 console.dir(e);
			 } */
		},
		getCityCenter:           function() {
			var app = qx.core.Init.getApplication();
			if(app.visMain.mapmode != "c")
				return;
			var _cells = app.visMain.cells;
			if(!_cells[0]) {
				window.setTimeout(function() {
					ava.Main.getInstance().panel.getCity();
				}, 1000);
				return;
			}
			var _cgi = webfrontend.data.City.getInstance();
			var waterCity = _cgi.getOnWater();
			var _se = new Array();
			for(var _c in _cells) {
				var _cell = _cells[_c].entities;
				for(var d in _cell) {
					if(_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
						if(_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
							if(_cell[d].selectNode.getY() < 880) {
								_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX() + 1, _cell[d].visId]);
							} else {
								_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX() + 1, _cell[d].visId]);
							}
							_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
							_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
							_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX(), _cell[d].visId]);
							_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX(), _cell[d].visId]);
						} else {
							if(_cell[d].getType) {
								if(_cell[d].getType() > 51 && _cell[d].getType() < 60) {
									_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
									_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
									_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
								}
							}
							_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
						}
					}
				}
			}
			_se.sort(function(a, b) {
				return a[1] - b[1];
			});
			this.city = new Array(441);
			var _empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
			var _water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];
			for(var i = 0; i < this.city.length; i++)
				this.city[i] = null;
			for(var i = 0; i < _empty.length; i++)
				this.city[_empty[i]] = [-1, -1, -1];

			if(waterCity) {
				for(var i = 0; i < _water.length; i++)
					this.city[_water[i]] = [-1, -1, -2];
			}
			try {
				for(var i = 0, c = 0; i < _se.length; i++) {
					while(this.city[c] != null)
						c++;
					if(_se[i][0].getResType != undefined) {
						var cx = _se[i][0].selectNode.getX();
						var cy = _se[i][0].selectNode.getY();
						if(cy > 480 && cy < 1280 && cx > 768 && cx < 2048) {
							this.city[c] = [_se[i][0].getId(), this.checkBuilding(_se[i][0].getId()), _se[i][0].getResType() + 900];
							// resource node
						} else {
							this.city[c] = [_se[i][0].getId(), 0, 0];
							// resource node but not center
						}
					} else if(_se[i][0].getType != undefined) {
						if(_se[i][0].getLevel != undefined)
							this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel() + this.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
						else
							this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel() + this.checkBuilding("wall"), _se[i][0].getType()];
						// wall
					} else if(_se[i][0].getPlaceId != undefined) {
						if(_se[i][0].drawNode != null) {
							if(_se[i][0].drawNode.image != undefined) {
								if(_se[i][0].drawNode.image.indexOf("tower") != -1) {
									this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
									// tower place
								} else {
									this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
									// empty, can be corn field
								}
							} else if(_se[i][0].drawNode.basename == "EffectNode") {
								this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
								// ??? bottom left tower in water city
							}
						} else {
							if(waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
								this.city[c] = [_se[i][0].getPlaceId(), 0, 97];
								// water building place
							} else {
								this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
								// empty
							}
						}
					}
				}
				for(i = 0; i < this.city.length; i++) {
					if(this.city[i] == null) {
						this.city = new Array(441);
						window.setTimeout(function() {
							ava.Main.getInstance().panel.getCityCenter();
						}, 1000);
						return;
					}
				}
			} catch(e) {
				paDebug(e);
			}
			/* (e) {
			 console.debug("Error");
			 console.dir(e);
			 } */
		},
		checkBuilding:           function(_buildingId) {
			try {
				var cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
				var d = 0;
				if(cBuildQueue != null) {
					for(var j = 0; j < cBuildQueue.length; j++) {
						if(cBuildQueue[j].building == _buildingId && (cBuildQueue[j].state == 2 || cBuildQueue[j].state == 5))
							return -11;

						if(cBuildQueue[j].building == _buildingId)
							d++;
						if(cBuildQueue[j].type == 23 && _buildingId == "wall")
							d++;
						// is city wall on queue?
					}
				}
			} catch(e) {
				paDebug(e);
			}
			/* (e) {
			 console.debug("Error");
			 console.dir(e);
			 } */
			return d;
		},
		update:                  function(widget, args) {
			this.updateContent(widget, args);
		},
		findObject:              function(parent, component, recursive) {
			recursive = recursive || false;
			for(var key in parent) {
				if(parent[key] instanceof component) {
					return parent[key];
				} else if(recursive && typeof parent[key] == "object") {
					var ret = this.findObject(parent[key], component, recursive);
					if(ret != null)
						return ret;
				}
			}
			return null;
		},
		toggleCityControls:      function() {
			if(citySort.getValue()) {
				qx.core.Init.getApplication().cityBar.citiesSelect.getSortedPlayerCities =
					(function() {
						var cp = this.prevSort();
						cp.sort(
							function(a, b) {
								if(a.city.reference != b.city.reference) {
									return a.city.reference.toUpperCase() < b.city.reference.toUpperCase() ? -1 : 1;
								}
								;
								return a.iId < b.iId ? -1 : 1;
							}
						);
						return cp;
					});
			} else {
				qx.core.Init.getApplication().cityBar.citiesSelect.getSortedPlayerCities =
					(function() {
						return this.prevSort();
					});
			}
			var cityBar = qx.core.Init.getApplication().cityBar;
			cityBar.citiesSelect.fillCityItems();
		},
		toggleTable:             function() {
			var panel = ava.Main.getInstance().panel;
			var oPlayer = webfrontend.data.Player.getInstance();
			var title = oPlayer.getTitle();
			if(title >= 3) {
				var mr = panel.MissingResourcesValue.getValue();
				if(panel.BaronLabel.getValue().indexOf('open') >= 0) {
					panel.BaronLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/theme/tree/closed.png);background-repeat:no-repeat;width:16px;height:16px;font-weight:bold;padding-left:15px;"><img src="resource/webfrontend/ui/icons/units/icon_units_baron.png"  style="align:absmiddle;-moz-transform: scaleX(1); width: 16px; height: 16px; padding-left:4px;" /></div>');
					panel.MissingResourcesValue.setValue(mr.replace("margin-left: 5px", "display:none;margin-left: 5px"));
				} else {
					panel.BaronLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/theme/tree/open.png);background-repeat:no-repeat;width:16px;height:16px;font-weight:bold;padding-left:15px;"><img src="resource/webfrontend/ui/icons/units/icon_units_baron.png"  style="align:absmiddle;-moz-transform: scaleX(1); width: 16px; height: 16px; padding-left:4px;" /></div>');
					panel.MissingResourcesValue.setValue(mr.replace("display:none;margin-left: 5px", "margin-left: 5px"));
				}
			}
		},
		updateCurBarons:         function() {
			var panel = ava.Main.getInstance().panel;
			var oPlayer = webfrontend.data.Player.getInstance();
			if(_oTech == null) {
				_oTech = webfrontend.data.Tech.getInstance();
			}
			var TotalBarons = oPlayer.getBarons();
			var IdleBarons = oPlayer.getBaronsIdle();
			var QueuedBarons = oPlayer.getBaronsQueue();
			var AvailableBarons = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) - ((oPlayer.getNumCities() - 1) + IdleBarons + QueuedBarons);
			panel.BaronValue.setValue("<div style='margin-left: 10px;'>" + TotalBarons + "/" + IdleBarons + "/" + QueuedBarons + "/" + AvailableBarons + "</div>");
			var ix = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) + 3;
			var numCastlesNeeded = Math.floor((ix - 3) / 4) + 1;
			panel.CastleValue.setValue("<div style='margin-left: 4px;'>" + player.getNumCastles() + "/" + numCastlesNeeded + "</div>");
			var numOutgoing = webfrontend.data.Alliance.getInstance().getNumOutgoingAttacks();
			panel.outgoing.setValue("<div style='margin-left: 4px;'>Outgoing Attacks: " + numOutgoing + "</div>");
		},
		formatNumber:            function(str) {
			var num = String(str).replace(/\,/g, '');
			var pos = num.indexOf('.');
			if(pos >= 0) {
				num = num.substring(0, pos)
			}
			;
			if(num.length == 0 ) {
				return "";
			}
			var val = "";
			for(var i = 0, numLen = num.length; i < numLen; ++i) {
				if(val.length > 0 && (((num.length - i) % 3) == 0)) {
					val = val + ",";
				}
				val += num.substring(i, i + 1);
			}
			return val;
		},
		updateNeededResources:   function() {
			var panel = ava.Main.getInstance().panel;
			var oPlayer = webfrontend.data.Player.getInstance();
			var title = oPlayer.getTitle();
			var _oTech;
			if(_oTech == null) {
				_oTech = webfrontend.data.Tech.getInstance();
			}
			var ix = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) + 3;
			if(title >= 3) {
				var pr = oPlayer.getVoidResources();
				if(pr) {
					var curGold = oPlayer.getGold();
					var woodImg = '<img src="resource/webfrontend/ui/icons_ressource_voidWood_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
					var stoneImg = '<img src="resource/webfrontend/ui/icons_ressource_voidStone_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
					var ironImg = '<img src="resource/webfrontend/ui/icons_ressource_voidIron_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
					var foodImg = '<img src="resource/webfrontend/ui/icons_ressource_voidFood_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
					var goldImg = '<img src="resource/webfrontend/ui/icons_ressource_gold.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
					var numBarons = _oTech.getBonus("baronCount", webfrontend.data.Tech.research);
					var bW = oPlayer.getTechTree();
					for(var i = 0; i < bW.length; i++) {
						var bT = _oTech.getTreeInfoByStepId(bW[i]);
						if(bT.tree == 40) {
							bT.level += 2;
							var bU = _oTech.getStepInfoByTreeId(40, bT.level);
							var goldNeeded = bU.data.g;
							var resNeeded = bU.data.r[5];
						}
					}
					var numCastlesNeeded = Math.floor((ix - 3) / 4) + 1;
					var playerCastles = oPlayer.getNumCastles();
					var sb = new qx.util.StringBuilder(200);
					var mr = this.MissingResourcesValue.getValue();
					var totalNeeded = (resNeeded * 4) + (goldNeeded / 1000);
					var totalOnHand = Math.min(resNeeded, pr[3][1]) + Math.min(resNeeded, pr[2][1]) + Math.min(resNeeded, pr[1][1]) + Math.min(resNeeded, pr[0][1]) + Math.min((goldNeeded / 1000), (curGold / 1000));
					var pct = Math.floor(Math.min(100, (totalOnHand / totalNeeded) * 100) * 100) / 100;
					var curWood = pr[3][1];
					var curStone = pr[2][1];
					var curIron = pr[1][1];
					var curFood = pr[0][1];
					var woodNeeded = Math.max(0, resNeeded - curWood);
					var stoneNeeded = Math.max(0, resNeeded - curStone);
					var ironNeeded = Math.max(0, resNeeded - curIron);
					var foodNeeded = Math.max(0, resNeeded - curFood);
					var goldNeeded = Math.max(0, goldNeeded - curGold);
					if((ix - 5) % 4 == 0) {
						if(playerCastles >= numCastlesNeeded) {
							sb.add("<span style='v-align: middle'>Free</span>");
						} else {
							sb.add(String(numCastlesNeeded - playerCastles), " more castles or ");
							if(mr.indexOf("display:none") > 0) {
								sb.add('<table style="display:none;margin-left: 5px; max-width: 322px; border:1px dotted  #8B693E;" cellspacing="0">');
							} else {
								sb.add('<table style="margin-left: 5px;max-width: 322px; border:1px dotted  #8B693E;" cellspacing="0">');
							}
							sb.add('<tbody><tr alt="PR needed for TA (' + pct + '%)" title="PR needed for TA (' + pct + '%)">');
							sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + woodImg + this.formatNumber(woodNeeded) + "</td>");
							sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + stoneImg + this.formatNumber(stoneNeeded) + "</td>");
							sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + ironImg + this.formatNumber(ironNeeded) + "</td>");
							sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + foodImg + this.formatNumber(foodNeeded) + "</td>");
							sb.add("<td style='padding: 3px;border-bottom:1px dotted #8B693E;'>" + goldImg + this.formatNumber(goldNeeded) + "</td>");
							sb.add('</tr><tr>');
							sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curWood) + "' title='" + this.formatNumber(curWood) + "'>" + woodImg + (curWood > 1000000 ? "> 1 mio." : this.formatNumber(curWood)) + "</td>");
							sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curStone) + "' title='" + this.formatNumber(curStone) + "'>" + stoneImg + (curStone > 1000000 ? "> 1 mio." : this.formatNumber(curStone)) + "</td>");
							sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curIron) + "' title='" + this.formatNumber(curIron) + "''>" + ironImg + (curIron > 1000000 ? "> 1 mio." : this.formatNumber(curIron)) + "</td>");
							sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curFood) + "' title='" + this.formatNumber(curFood) + "''>" + foodImg + (curFood > 1000000 ? "> 1 mio." : this.formatNumber(curFood)) + "</td>");
							sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curGold) + "' title='" + this.formatNumber(curGold) + "''>" + goldImg + (curGold > 1000000000 ? "> 1 bio." : this.formatNumber(curGold)) + "</td>");
							sb.add('</tr></tbody></table>');
						}
					} else {
						if(mr.indexOf("display:none") > 0) {
							sb.add('<table style="display:none;margin-left: 5px;border:1px dotted #8B693E;" cellspacing="0">');
						} else {
							sb.add('<table style="margin-left: 5px;max-width: 322px; border:1px dotted #8B693E;" cellspacing="0">');
						}
						sb.add('<tbody><tr alt="PR needed for TA (' + pct + '%)" title="PR needed for TA (' + pct + '%)">');
						sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + woodImg + this.formatNumber(woodNeeded) + "</td>");
						sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + stoneImg + this.formatNumber(stoneNeeded) + "</td>");
						sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + ironImg + this.formatNumber(ironNeeded) + "</td>");
						sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + foodImg + this.formatNumber(foodNeeded) + "</td>");
						sb.add("<td style='padding: 3px;border-bottom:1px dotted #8B693E;'>" + goldImg + this.formatNumber(goldNeeded) + "</td>");
						sb.add('</tr><tr>');
						sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curWood) + "' title='" + this.formatNumber(curWood) + "'>" + woodImg + (curWood > 1000000 ? "> 1 mio." : this.formatNumber(curWood)) + "</td>");
						sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curStone) + "' title='" + this.formatNumber(curStone) + "'>" + stoneImg + (curStone > 1000000 ? "> 1 mio." : this.formatNumber(curStone)) + "</td>");
						sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curIron) + "' title='" + this.formatNumber(curIron) + "''>" + ironImg + (curIron > 1000000 ? "> 1 mio." : this.formatNumber(curIron)) + "</td>");
						sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curFood) + "' title='" + this.formatNumber(curFood) + "''>" + foodImg + (curFood > 1000000 ? "> 1 mio." : this.formatNumber(curFood)) + "</td>");
						sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curGold) + "' title='" + this.formatNumber(curGold) + "''>" + goldImg + (curGold > 1000000000 ? "> 1 bio." : this.formatNumber(curGold)) + "</td>");
						sb.add('</tr></tbody></table>');
					}
					panel.MissingResourcesValue.setValue(sb.get());
				}
			}
		},
		showIncomingAttacks:     function() {
			var dialog = ava.IncomingAttacksWindow.getInstance();
			// dialog.center();
			dialog.show();
		},
		fillBuildingQueue:       function() {
			var activeCity = webfrontend.data.City.getInstance();
			webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill", {
				cityid: activeCity.getId()
			}, null, function(e) { //ava.Chat.getInstance().addChatMessage(' fill error:' + e.r, true);
			});
		},
		payBuildingQueue:        function() {
			var activeCity = webfrontend.data.City.getInstance();
			webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll", {
				cityid: activeCity.getId()
			}, null, function() {
			});
		},
		showCombatWindow:        function() {
			var dialog = ava.CombatWindow.getInstance();
			dialog.center();
			dialog.open();
		},
		showHelp:                function() {
			var dialog = ava.AboutWindow.getInstance();
			dialog.center();
			dialog.show();
		},
		showFillWithResources:   function() {
			var dialog = ava.FillWithResourcesWindow.getInstance();
			dialog.center();
			dialog.show();
		},
		showAllianceInfo:        function() {
			var dialog = ava.LastLogin.getInstance();
			dialog.center();
			dialog.show();
		},
		showReports:             function() {
			var dialog = ava.PlayerReporstWindow.getInstance();
			dialog.center();
			dialog.show();
		},
		showPalaceItems:         function() {
			var dialog = ava.PalaceItemsWindow.getInstance();
			dialog.show();
			dialog.moveTo(500, 200);
		},
		showMailingLists:        function() {
			var dialog = ava.AllianceMailingListWindow.getInstance();
			dialog.center();
			dialog.show();
		},
		showRaidingWindow:       function() {
			var dialog = ava.RaidingWindow.getInstance();
			var w = qx.bom.Viewport.getWidth(window);
			var h = qx.bom.Viewport.getHeight(window);
			var wh = Math.floor(h * 0.45);
			dialog.setWidth(500);
			dialog.setHeight(500);
			dialog.show();
			dialog.moveTo(w - 520, h - 525);
		}
	}
});

