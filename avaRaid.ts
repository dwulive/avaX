/**
 * Created by David on 10/8/13.
 */
///<reference path="avaDec.ts" />
declare var qx : any;
declare var webfrontend : any;

function AvaInit() {
	try {
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
							var zergs6 = webfrontend.gui.Util.formatNumbers((bossKill[(level) - 1] / bonus6));
							if(weak == "Infantry")
								zergs6 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus6) * 0.67));
							var zergs7 = webfrontend.gui.Util.formatNumbers((bossKill[(level) - 1] / bonus7) * 0.72);
							if(weak == "Magic")
								zergs7 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus7) * 0.67 * 0.72));
							var zergs10 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus10) * 0.83));
							if(weak == "Cavalry")
								zergs10 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus10) * 0.67 * 0.83));
							var zergs11 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus11) * 0.55));
							if(weak == "Cavalry")
								zergs11 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus11) * 0.67 * 0.55));
							var zergs12 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus12) * 0.42));
							if(weak == "Magic")
								zergs12 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus12) * 0.67 * 0.42));
							if(weak == "Artillery") {
								var zergs16 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus16) * 0.03));
								var zergs17 = webfrontend.gui.Util.formatNumbers(((bossKill[(level) - 1] / bonus17) * 0.003));
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
							progress = webfrontend.gui.Util.formatNumbers(((progress * 0.0175 + 1.0875) * dungeonKill[(level) - 1]));
							zergs6 = webfrontend.gui.Util.formatNumbers(dungeonKill[(level) - 1]);
							var sb = new qx.util.StringBuilder(20);
							sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs6, "</td></tr><tr><td>", progressT, progress, "</td></tr></table>");
							tip.setLabel(sb.get());
						}

					}
				}
			} catch(e) {
				console.assert(false);
				console.assert(false);
			}
		}

		a.worldViewToolTip.addListener("appear", toolTipAppear, this);
	} catch(e) {
		console.assert(false);
		console.assert(false);
	}
}

qx.Class.define("ava.ui.RaidReporter", {
	type:    "singleton",
	extend:  qx.core.Object,
	statics: {
		dungeonLoot: {
			"Giant Spider":       25,
			"Thief":              33,
			"Centaur":            70,
			"Troll":              290,
			"Skeleton":           25,
			"Ghoul":              33,
			"Gargoyle":           135,
			"Daemon":             340,
			"Orc":                30,
			"Troglodyte":         40,
			"Ettin":              120,
			"Minotaur":           250,
			"Pirate Dhow":        75,
			"Pirate Sloop":       250,
			"Pirate Frigate":     650,
			"Pirate War Galleon": 1400
		},
		cityIds:     null
	},
	members: {
		interceptOnReport: function(r, fm, fn) {
			var app = qx.core.Init.getApplication();
			var rep = app.getReportPage();
			rep.origOnReport(r, fm, fn);
			if(fm == null)
				return;
			var children = rep.reportBody.getChildren();
			for(var i = 0; i < children.length; i++) {
				if(children[i] instanceof qx.ui.core.Spacer) {
					var fA = fm.h.t.substr(0, 5);
					var fv = fA.charAt(1);
					var fs = fA.charAt(4);
					var kp = webfrontend.res.Main.getInstance();

					if(fm.hasOwnProperty("r") && fm.r != null && fm.hasOwnProperty("a") && fm.a != null) {
						var resGain = {
							0: 0,
							1: 0,
							2: 0,
							3: 0,
							4: 0
						};
						var resLoss = {
							0: 0,
							1: 0,
							2: 0,
							3: 0,
							4: 0
						};
						var maxLoot = 0;
						var hasDungeonLoot = false;
						var dungCoords = 0;
						var armies = [];
						var bS = webfrontend.res.Main.getInstance();
						var itemImg = null;
						var itemCount = 0;
						if(fm.hasOwnProperty("r") && fm.r != null) {
							for(var rindex = 0; rindex < fm.r.length; rindex++) {
								if(fm.r[rindex].t >= 0) {
									resGain[fm.r[rindex].t] = fm.r[rindex].v;
								} else {
									var iType = Math.abs(fm.r[rindex].t);
									itemCount = fm.r[rindex].v;
									var imgIx = bS.items[iType].i;
									itemImg = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[imgIx]);
									itemImg.itemId = String(iType);
									itemImg.set({
										padding:     2,
										toolTipText: bS.items[iType].dn + "<br/>" + bS.items[iType].sds
									});
									itemImg.setWidth(30);
									itemImg.setHeight(30);
									itemImg.setScale(true);
								}
							}
						}
						if(fm.hasOwnProperty("a") && fm.a != null) {
							for(var armyIndex = 0; armyIndex < fm.a.length; armyIndex++) {
								var ku = 0;
								var ko = fm.a[armyIndex];
								if(ko.r == webfrontend.base.GameObjects.eArmyRole.Attacker) {
									if(ko.u != null)
										for(var unitIndex = 0; unitIndex < ko.u.length; unitIndex++) {
											var unitType = ko.u[unitIndex].t;
											if(!kp.units.hasOwnProperty(unitType))
												continue;
											var unitData = kp.units[unitType];
											var unitCount = ko.u[unitIndex].o - ko.u[unitIndex].l;
											for(var resIndex in unitData.res) {
												resLoss[resIndex] += unitData.res[resIndex] * unitCount;
											}
											resLoss[0] += unitData.g * unitCount;
										}
								} else {
									if(ko.u != null) {
										for(var unitIndex = 0; unitIndex < ko.u.length; unitIndex++) {
											var unitType = ko.u[unitIndex].t;
											if(!kp.units.hasOwnProperty(unitType))
												continue;
											var unitData = kp.units[unitType];
											if(ava.ui.RaidReporter.dungeonLoot.hasOwnProperty(unitData.dn)) {
												maxLoot += ava.ui.RaidReporter.dungeonLoot[unitData.dn] * ko.u[unitIndex].o;
												armies[unitIndex] = {};
												armies[unitIndex].armytype = unitData.dn;
												armies[unitIndex].armysize = ko.u[unitIndex].o;
												hasDungeonLoot = true;
											}
										}
										if(hasDungeonLoot) {
											dungCoords = ko.c[0].i;
										}
									}
								}
							}
						}
						var totalGain = resGain[0] + resGain[1] + resGain[2] + resGain[3] + resGain[4];
						var totalLoss = resLoss[0] + resLoss[1] + resLoss[2] + resLoss[3] + resLoss[4];
						var resOutput = new qx.ui.container.Composite();
						resOutput.setLayout(new qx.ui.layout.HBox(5));
						if(itemImg) {
							var rText = new qx.ui.basic.Label();
							rText.setAlignY("middle");
							rText.setRich(true);
							rText.setFont("bold");
							rText.setValue("+" + itemCount);
							rText.setTextColor("green");
							resOutput.add(itemImg);
							resOutput.add(rText);
							resOutput.add(new qx.ui.core.Spacer().set({
								width: 5
							}));
						}
						for(rindex = 1; rindex <= 5; rindex++) {
							var actualIndex = rindex == 5 ? 0 : rindex;
							var net = resGain[actualIndex] - resLoss[actualIndex];
							var rText = new qx.ui.basic.Label();
							rText.setAlignY("middle");
							rText.setRich(true);
							rText.setFont("bold");
							if(net == 0) {
								rText.setValue("+0");
							} else if(net >= 0) {
								rText.setValue("+" + webfrontend.gui.Util.formatNumbers(net).toString());
								rText.setTextColor("green");
							} else {
								rText.setValue(webfrontend.gui.Util.formatNumbers(net).toString());
								rText.setTextColor("red");
							}
							var img;
							if(rindex == 5) {
								img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath("ui/icons_ressource_gold.png"));
							} else {
								var fileInfo = kp.getFileInfo(kp.resources[rindex].i);
								img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fileInfo.url));
							}
							img.setWidth(30);
							img.setHeight(30);
							img.setScale(true);
							resOutput.add(img);
							resOutput.add(rText);
							resOutput.add(new qx.ui.core.Spacer().set({
								width: 5
							}));
						}
						var rrHeader = new qx.ui.basic.Label("Report Summary:");
						rrHeader.setRich(true);
						rrHeader.setAppearance("textheader_main1_serif");
						app.getReportPage().reportBody.addAt(rrHeader, i++);
						app.getReportPage().reportBody.addAt(resOutput, i++);
						var yellowColor = "#AF7817";
						if(hasDungeonLoot) {
							var str = "";
							var showText = true;
							if(fm.rcc < maxLoot) {
								var percent = (totalGain - resGain[0]) / maxLoot * 100.0;
								var col = "green";
								if(percent < 60)
									col = "red";
								else if(percent < 80)
									col = yellowColor;
								else if(percent > 100)
									showText = false;
								str = "<b style=\"color:" + col + "\">" + percent+ "%  Underkill:</b>  Gained " + percent.toFixed(2) + "% of " + webfrontend.gui.Util.formatNumbers(maxLoot).toString();
							} else {
								var percent = maxLoot / fm.rcc * 100.0;
								var col = "green";
								if(percent < 75)
									col = "red";
								else if(percent < 90)
									col = yellowColor;
								else if(percent > 100)
									showText = false;
								str = "<b style=\"color:" + col + "\">" + (percent) + "%  Overkill:</b>  Only " + percent.toFixed(2) + "% of troops needed for max loot (" + webfrontend.gui.Util.formatNumbers(maxLoot).toString() + ")";
							}
							if(showText) {
								var txt = new qx.ui.basic.Label();
								txt.setRich(true);
								txt.setAllowGrowX(true);
								txt.setValue(str);
								rep.reportBody.addAt(txt, i++);
							}
						}
						rep.reportBody.addAt(new qx.ui.core.Spacer().set({
							height: 5
						}), i++);
						rep.reportBody.addAt(new qx.ui.core.Widget().set({
							backgroundColor: "#c4a77b",
							height:          2,
							allowGrowX:      true,
							marginTop:       6
						}), i++);
						if(hasDungeonLoot) {
							var rw = ava.ui.RaidingWindow.getInstance();
							if(rw.curDungeon != null && rw.curDungeon.get_Coordinates() == dungCoords) {
								if(rw.dungeonLootInfo.hasOwnProperty(dungCoords)) {
									var info = rw.dungeonLootInfo[dungCoords];
									var n = info.n;
									var l = (info.l / (n + 1)) * n + maxLoot / (n + 1);
									info.n = n + 1;
									info.l = Math.floor(l);
									if(maxLoot > info.mx)
										info.mx = maxLoot;
									if(maxLoot < info.mn)
										info.mn = maxLoot;
								} else {
									var info : any;
									info.n = 1;
									info.l = maxLoot;
									info.mx = maxLoot;
									info.mn = maxLoot;
									rw.dungeonLootInfo[dungCoords] = info;
								}
								rw.updateDungeonRaidInfo(dungCoords);
							}
						}
					}
					break;
				}
			}
		}
	}
});
qx.Class.define("ava.ui.LastLogin", {
	type:      "singleton",
	extend:    qx.ui.window.Window,
	construct: function() {
		this.base(arguments, 'Alliance Info');
		this.buildUI();
	},
	members:   {
		donations:      null,
		mDataArray:     null,
		mDataRank:      null,
		buildUI:        function() {
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
			this.setWidth(930);
			webfrontend.gui.Util.formatWinClose(this);
			var wcLabel = new qx.ui.basic.Label("Alliance Members Info");
			wcLabel.set({
				font: "bold"
			});
			this.add(wcLabel);
			var tableModel = new qx.ui.table.model.Simple();
			var columnNames = ["id", "", "", "status", "name", "title", "score", "cities", "role", "lastLogin", "Donations", "Donations Rank", "World Rank"];
			tableModel.setColumns(columnNames);
			tableModel.setCaseSensitiveSorting(false);
			tableModel.sortByColumn(1, true);
			this.loginTable = new qx.ui.table.Table(tableModel);
			this.loginTable.onCellClick = function(event) {
				var spl = this.getTableModel().getValue(event.getColumn(), event.getRow());
				switch(event.getColumn()) {
					case 4:
					{
						var rf = qx.core.Init.getApplication();
						rf.showInfoPage(rf.getPlayerInfoPage(), {
							name: spl
						});
					}
						break;
				}
			};
			this.loginTable.addListener("cellClick", this.loginTable.onCellClick, this.loginTable);
			var columnModel = this.loginTable.getTableColumnModel();
			columnModel.setColumnVisible(0, false);
			columnModel.setColumnWidth(1, 60);
			columnModel.setColumnVisible(1, false);
			columnModel.setColumnVisible(2, false);
			columnModel.setColumnWidth(3, 64);
			columnModel.setColumnWidth(4, 120);
			columnModel.setColumnWidth(5, 64);
			columnModel.setColumnWidth(6, 80);
			columnModel.setColumnWidth(7, 44);
			columnModel.setColumnWidth(8, 100);
			columnModel.setColumnWidth(9, 110);
			columnModel.setColumnWidth(10, 90);
			columnModel.setColumnWidth(11, 90);
			columnModel.setColumnWidth(12, 70);
			var linkStyle = new qx.ui.table.cellrenderer.Default();
			linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue;cursor:pointer");
			columnModel.setDataCellRenderer(4, linkStyle);
			this.add(this.loginTable, {
				flex: 1
			});
			this.addListener("appear", this.onOpen, this);
		},
		onOpen:         function() {
			var m = this.loginTable.getTableModel();
			m.removeRows(0, m.getRowCount());
			m.addRows([
				[0, "Loading..."]
			]);
			var ai = webfrontend.data.Alliance.getInstance();
			var md = ai.getMemberData();
			this.mDataArray = new Array();
			webfrontend.net.CommandManager.getInstance().sendCommand("AllianceResourceStatistic", {
				sortColumnIndex: -1,
				ascending:       true,
				start:           0,
				end:             500
			}, this, this.gotDonations);
		},
		gotDonations:   function(ok, response) {
			this.donations = [];
			if(ok && response != null) {
				var items = response;
				for(var ii = 0; ii < items.length; ++ii) {
					var item = items[ii];
					this.donations[item.pn] = [item.r, item.ra];
				}
			}
			webfrontend.net.CommandManager.getInstance().sendCommand("AllianceGetMemberInfos", {}, this, this.fillLoginTable);
		},
		fillLoginTable: function(isOk, result) {
			var m = this.loginTable.getTableModel();
			if(isOk == false || result == null) {
				if(rowData.length == 0) {
					m.setData([
						["No data."]
					]);
				}
				return;
			}
			var rowData = [];
			var ai = webfrontend.data.Alliance.getInstance();
			var md = ai.getMemberData();
			var roles = webfrontend.data.Alliance.getInstance().getRoles();
			var statuses = ["offline", "online", "afk", "hidden"];
			var dateFormat = new qx.util.format.DateFormat("yyyy.MM.dd HH:mm");
			var titles = webfrontend.res.Main.getInstance().playerTitles;
			for(var i = 0; i < result.length; i++) {
				var item = result[i];
				var loginDate = new Date(item.l);
				loginDate.setHours(loginDate.getHours() + (webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60));
				rowData.push([
					item.i,
					"",
					"", (statuses.hasOwnProperty(item.o) ? statuses[item.o] : item.o),
					item.n,
					titles[item.t].dn,
					item.p,
					item.c, (roles != null ? roles[item.r].Name : item.r),
					dateFormat.format(loginDate), (this.donations.hasOwnProperty(item.n) ? this.donations[item.n][0] : ""), (this.donations.hasOwnProperty(item.n) ? this.donations[item.n][1] : ""),
					item.ra
				]);
			}
			if(rowData.length == 0) {
				m.setData([
					["No data."]
				]);
			} else {
				m.setData(rowData);
				m.sortByColumn(4, true);
			}
		}
	}
});

qx.Class.define("ava.ui.FillWithResourcesWindow", {
	type:      "singleton",
	extend:    qx.ui.window.Window,
	construct: function() {
		this.base(arguments, 'Fill With Resources');
		this.setLayout(new qx.ui.layout.Dock());

		this.set({
			width:             500,
			minWidth:          200,
			maxWidth:          600,
			height:            350,
			minHeight:         200,
			maxHeight:         600,
			allowMaximize:     false,
			allowMinimize:     false,
			showMaximize:      false,
			showMinimize:      false,
			showStatusbar:     false,
			showClose:         false,
			caption:           ("Fill With Resoruces"),
			resizeSensitivity: 7,
			contentPadding:    0
		});

		var container = new qx.ui.container.Composite();
		container.setLayout(new qx.ui.layout.VBox(5));

		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		container.add(scroll, {
			flex: true
		});

		scroll.add(this.createForm());

		container.add(this.createFooter());

		this.add(container);

		webfrontend.gui.Util.formatWinClose(this);

		this.moveTo(400, 200);

		var app = qx.core.Init.getApplication();
		var cv = (app.cityDetailView || app.getCityDetailView());
		if(!cv.hasOwnProperty("originalSetCity1")) {
			cv.originalSetCity1 = cv.setCity;
			cv.fill = this;
			cv.setCity = this.interceptSetCity;
		}
	},
	members:   {
		WOOD:                         1,
		STONE:                        2,
		IRON:                         3,
		FOOD:                         4,
		toX:                          null,
		toY:                          null,
		sbResType:                    null,
		maxResourcesInput:            null,
		maxTravelTimeInput:           null,
		cbAllowSameContinent:         null,
		cbAllowOtherContinent:        null,
		cbPalaceSupport:              null,
		lblTarget:                    null,
		cityInfos:                    {},
		progressLabel:                null,
		timer:                        null,
		activateOverlay:              function(activated) {
		},
		createFooter:                 function() {
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnAdd = new qx.ui.form.Button("Request Resources");
			btnAdd.setWidth(160);
			container.add(btnAdd);
			btnAdd.addListener("click", this.searchTarget, this);

			this.progressLabel = new qx.ui.basic.Label("");
			container.add(this.progressLabel);

			return container;
		},
		interceptSetCity:             function(bT) {
			var app = qx.core.Init.getApplication();
			var cv = (app.cityDetailView || app.getCityDetailView());
			if(cv.hasOwnProperty("originalSetCity1")) {
				cv.originalSetCity1(bT);
			}
			var coords = convertIdToCoordinatesObject(bT.get_Coordinates());
			cv.fill.toX.setValue("" + coords.xPos);
			cv.fill.toY.setValue("" + coords.yPos);
		},
		fillResources:                function() {
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			if(toX == 0 && toY == 0) {
				showMsgWindow("Fill with Resoruces", "Invalid destination");
				return;
			}

			var cityId = convertCoordinatesToId(toX, toY);
			if(this.cityInfos[cityId] == undefined || this.cityInfos[cityId] == null) {
				showMsgWindow("Fill with Resoruces", "Invalid destination");
				return;
			}
			var targetCityInfo = this.cityInfos[cityId];

			var req = {
				maxResourcesToBeSent: parseInt(this.maxResourcesInput.getValue()),
				cityId:               cityId,
				maxTravelTime:        parseInt(this.maxTravelTimeInput.getValue()),
				targetPlayer:         targetCityInfo.pn,
				palaceSupport:        this.cbPalaceSupport.getValue(),
				resType:              parseInt(this.sbResType.getSelection()[0].getModel()),
				allowSameContinent:   this.cbAllowSameContinent.getValue(),
				allowOtherContinent:  this.cbAllowOtherContinent.getValue()
			};
			this.populateCityWithResources(req);
		},
		populateCityWithResources:    function(request) {
			webfrontend.net.CommandManager.getInstance().sendCommand("TradeSearchResources", {
				cityid:      request.cityId,
				resType:     request.resType,
				minResource: 10000,
				maxTime:     request.maxTravelTime * webfrontend.data.ServerTime.getInstance().getStepsPerHour()
			}, this, this._processTradeSearchResources, request);
		},
		_processTradeSearchResources: function(result, n, request) {
			if(result == false || n == null)
				return;
			this.progressLabel.setValue("Sent resources: 0");
			var cities = new Array();
			var transports = new Array();
			var destCoords = convertIdToCoordinatesObject(request.cityId);

			for(var i = 0; i < n.length; i++) {
				var city = n[i];
				var srcCoords = convertIdToCoordinatesObject(city.i);

				if(city.i == request.cityId || city.sg) {
					continue;
				}
				if(destCoords.cont == srcCoords.cont && !request.allowSameContinent) {
					continue;
				} else if(destCoords.cont != srcCoords.cont && !request.allowOtherContinent) {
					continue;
				}

				cities.push(city);

				if(city.lt > 0) {
					transports.push({
						cityIndex:  cities.length - 1,
						capacity:   city.la,
						travelTime: city.lt,
						land:       true
					});
				}
				if(city.st > 0) {
					transports.push({
						cityIndex:  cities.length - 1,
						capacity:   city.sa,
						travelTime: city.st,
						land:       false
					});
				}
			}

			transports.sort(function(a, b) {
				if(a.travelTime > b.travelTime) {
					return 1;
				} else if(a.travelTime < b.travelTime) {
					return -1;
				} else {
					return 0;
				}
			});

			var toBeSent = request.maxResourcesToBeSent;
			var totalRes = 0;
			for(var i = 0, count = transports.length; i < count; i++) {
				var transport = transports[i];
				var city = cities[transport.cityIndex];
				var srcCoords = convertIdToCoordinatesObject(city.i);

				if(toBeSent <= 0) {
					break;
				}

				var resCount = Math.min(city.rc, transport.capacity, toBeSent);
				if(resCount <= 0) {
					continue;
				}

				var trade = {
					cityid:             city.i,
					tradeTransportType: transport.land ? 1 : 2,
					targetPlayer:       request.targetPlayer,
					targetCity:         destCoords.xPos + ":" + destCoords.yPos,
					palaceSupport:      request.palaceSupport,
					res:                new Array()
				};

				trade.res.push({
					t: request.resType,
					c: resCount
				});
				totalRes += resCount;
				city.rc -= resCount;
				toBeSent -= resCount;
				this.progressLabel.setValue("Sent resources: " + totalRes);
				webfrontend.net.CommandManager.getInstance().sendCommand("TradeDirect", trade, this, this._onTradeDirectSendDone, trade);
			}
		},
		_onTradeDirectSendDone:       function(isOk, result, param) {
		},
		createForm:                   function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());

			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));

			box.add(container);

			var selectWidth = 320;
			var row = 0;

			container.add(new qx.ui.basic.Label("Resource Type"), {
				row:    row,
				column: 0
			});
			this.sbResType = new qx.ui.form.SelectBox().set({
				width:  selectWidth,
				height: 28
			});
			this.sbResType.add(new qx.ui.form.ListItem("Wood", null, this.WOOD));
			this.sbResType.add(new qx.ui.form.ListItem("Stone", null, this.STONE));
			this.sbResType.add(new qx.ui.form.ListItem("Iron", null, this.IRON));
			this.sbResType.add(new qx.ui.form.ListItem("Food", null, this.FOOD));
			container.add(this.sbResType, {
				row:    row,
				column: 1
			});
			row++;

			container.add(new qx.ui.basic.Label("to"), {
				row:    row,
				column: 0
			});
			var containerXY = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

			this.toX = new qx.ui.form.TextField("");
			this.toX.setWidth(40);
			containerXY.add(this.toX);
			this.toY = new qx.ui.form.TextField("");
			this.toY.setWidth(40);
			containerXY.add(this.toY);

			var btnCurrentCity = new qx.ui.form.Button("Current City");
			btnCurrentCity.setWidth(120);
			container.add(btnCurrentCity);
			btnCurrentCity.addListener("click", this.setCurrentCityAsTarget, this);
			containerXY.add(btnCurrentCity);

			container.add(containerXY, {
				row:    row,
				column: 1
			});
			row++;

			container.add(new qx.ui.basic.Label("Max Resources to Send"), {
				row:    row,
				column: 0
			});

			var resContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this.maxResourcesInput = new webfrontend.ui.SpinnerInt(0, 0, 100000000);
			this.maxResourcesInput.setWidth(100);
			resContainer.add(this.maxResourcesInput);

			resContainer.add(this._createIncreaseAmountBtn("500k", 500000));
			resContainer.add(this._createIncreaseAmountBtn("1M", 1000000));
			resContainer.add(this._createIncreaseAmountBtn("5M", 5000000));
			resContainer.add(this._createIncreaseAmountBtn("10M", 10000000));

			container.add(resContainer, {
				row:    row,
				column: 1
			});
			row++;

			container.add(new qx.ui.basic.Label("Max Travel Time"), {
				row:    row,
				column: 0
			});
			var timeContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this.maxTravelTimeInput = new webfrontend.ui.SpinnerInt(24, 1, 96);
			this.maxTravelTimeInput.setWidth(100);
			timeContainer.add(this.maxTravelTimeInput);

			timeContainer.add(this._createMaxTravelTimeBtn("24h", 24));
			timeContainer.add(this._createMaxTravelTimeBtn("48h", 48));
			timeContainer.add(this._createMaxTravelTimeBtn("96h", 96));

			container.add(timeContainer, {
				row:    row,
				column: 1
			});
			row++;

			this.cbAllowSameContinent = new qx.ui.form.CheckBox("Include cities from the same continent as target");
			this.cbAllowSameContinent.setToolTipText("Include cities from the same continent as target");
			this.cbAllowSameContinent.setValue(true);
			container.add(this.cbAllowSameContinent, {
				row:    row,
				column: 1
			});
			row++;

			this.cbAllowOtherContinent = new qx.ui.form.CheckBox("Include cities from other continents than target");
			this.cbAllowOtherContinent.setToolTipText("Include cities from other continents than target");
			this.cbAllowOtherContinent.setValue(true);
			container.add(this.cbAllowOtherContinent, {
				row:    row,
				column: 1
			});
			row++;

			this.cbPalaceSupport = new qx.ui.form.CheckBox("Palace delivery");
			this.cbPalaceSupport.setToolTipText("Sends resources as palace deliver (wood and stone only)");
			this.cbPalaceSupport.setValue(false);
			container.add(this.cbPalaceSupport, {
				row:    row,
				column: 1
			});
			row++;

			return box;
		},
		_createMaxTravelTimeBtn:      function(label, amount) {
			var btn = new qx.ui.form.Button(label).set({
				appearance: "button-recruiting",
				font:       "bold",
				width:      50
			});

			btn.addListener("click", function(event) {
				this.maxTravelTimeInput.setValue(amount);
			}, this);
			return btn;
		},
		_createIncreaseAmountBtn:     function(label, amount) {
			var btn = new qx.ui.form.Button(label).set({
				appearance: "button-recruiting",
				font:       "bold",
				width:      50
			});

			btn.addListener("click", function(event) {
				this.maxResourcesInput.setValue(this.maxResourcesInput.getValue() + amount);
			}, this);
			return btn;
		},
		searchTarget:                 function() {
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);

			var cityId = convertCoordinatesToId(toX, toY);
			webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
				id: cityId
			}, this, this._onCityInfo, cityId);
		},
		_onCityInfo:                  function(isOk, result, cityId) {
			if(isOk && result != null) {
				this.cityInfos[cityId] = result;
				this.fillResources();
			}
		},
		setCurrentCityAsTarget:       function() {
			var city = webfrontend.data.City.getInstance();
			var coords = convertIdToCoordinatesObject(city.getId());
			this.toX.setValue("" + coords.xPos);
			this.toY.setValue("" + coords.yPos);
		},
		_updateSendingProgress:       function() {
		}
	}
});

var distWantModifier = 0.675;

qx.Class.define("ava.ui.RaidingWindow", {
	type:      "singleton",
	extend:    qx.ui.window.Window,
	construct: function() {
		this.base(arguments, 'Raiding');
		this.buildUI();
	},
	members:   {
		_wcText:             null,
		_lists:              null,
		_continents:         null,
		_count:              0,
		wcLabel:             null,
		curDungeon:          null,
		bossUnitLabel:       null,
		bossTable:           null,
		bossUnitImage:       null,
		bossRaider:          null,
		pvpTable:            null,
		worldData:           null,
		objData:             "none",
		playerData:          "none",
		allianceData:        "none",
		dungeonLootInfo:     {},
		ratioMode:           "count",
		raidMode:            0,
		AvaRaidMode:         1,
		raidErrorWin:        null,
		tabview:             null,
		dungeonProgressData: [
			[
				[
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1]
				],
				[
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[1243, 1243],
					[-1, -1],
					[-1, -1]
				],
				[
					[2400, 2400],
					[2448, 2443],
					[2492, 2485],
					[2538, 2528],
					[2584, 2572],
					[2637, 2614],
					[2686, 2658],
					[2736, 2702],
					[2785, 2746],
					[2833, 2789],
					[2882, 2833],
					[2930, 2876],
					[2978, 2920],
					[3027, 2964],
					[3076, 3008],
					[3124, 3051],
					[3073, 3004],
					[2999, 2938],
					[2910, 2857],
					[3213, 3130],
					[3303, 3212],
					[3389, 3289],
					[3335, 3242],
					[3249, 3166],
					[3140, 3070],
					[3486, 3378],
					[3583, 3465],
					[3675, 3547],
					[3740, 3606],
					[3797, 3656],
					[3847, 3702],
					[3899, 3748],
					[3948, 3792],
					[3997, 3836],
					[4045, 3880],
					[4094, 3924],
					[4142, 3967],
					[4191, 4011],
					[4239, 4054],
					[4288, 4098],
					[4336, 4142],
					[4313, 4137],
					[4274, 4122],
					[4224, 4099],
					[4455, 4266],
					[4533, 4329],
					[4608, 4391],
					[4666, 4441],
					[4720, 4488],
					[4670, 4459],
					[4595, 4413],
					[4504, 4355],
					[4811, 4588],
					[4902, 4662],
					[4988, 4733],
					[5050, 4787],
					[5106, 4836],
					[5157, 4881],
					[5208, 4926],
					[5257, 4970],
					[5306, 5014],
					[5355, 5058],
					[5403, 5102],
					[5452, 5146],
					[5500, 5189],
					[5548, 5233],
					[5597, 5277],
					[5645, 5320],
					[5693, 5363],
					[5742, 5407],
					[5791, 5451],
					[5839, 5494],
					[5888, 5538],
					[5936, 5582],
					[5985, 5626],
					[6033, 5669],
					[6082, 5713],
					[6130, 5756],
					[6179, 5800],
					[6227, 5844],
					[6276, 5888],
					[6324, 5931],
					[6372, 5974],
					[6421, 6018],
					[6470, 6062],
					[6518, 6105],
					[6567, 6149],
					[6615, 6193],
					[6664, 6237],
					[6712, 6280],
					[6761, 6324],
					[6809, 6367],
					[6858, 6411],
					[6906, 6455],
					[6955, 6499],
					[7003, 6542],
					[7056, 6590],
					[7111, 6640],
					[7199, 6719],
					[7199, 6719]
				],
				[
					[8450, 7651],
					[8550, 8075],
					[8568, 8073],
					[8869, 8344],
					[8742, 8395],
					[8581, 8135],
					[8333, 8012],
					[8704, 8264],
					[8924, 8444],
					[8857, 8530],
					[9423, 8953],
					[9561, 9165],
					[9819, 9252],
					[9845, 9335],
					[9721, 9375],
					[10088, 9616],
					[9852, 9535],
					[9834, 9425],
					[9178, 8989],
					[9341, 9118],
					[9290, 9090],
					[9961, 9615],
					[10695, 10349],
					[11270, 10662],
					[11570, 10905],
					[11791, 11086],
					[11697, 11059],
					[11406, 10942],
					[11035, 10781],
					[11699, 11351],
					[12250, 11663],
					[12536, 11888],
					[12564, 11957],
					[12328, 11883],
					[12004, 11759],
					[12384, 12044],
					[12974, 12419],
					[13159, 12563],
					[13275, 12667],
					[13362, 12773],
					[13193, 12685],
					[12962, 12553],
					[13741, 13210],
					[13861, 13391],
					[13944, 13552],
					[14326, 13806],
					[14408, 13946],
					[14457, 14071],
					[14567, 14054],
					[14378, 13922],
					[14130, 13749],
					[15072, 14491],
					[15185, 14643],
					[15245, 14765],
					[15042, 14728],
					[15418, 15002],
					[15410, 15066],
					[15862, 15296],
					[15787, 15245],
					[15644, 15149],
					[15936, 15622],
					[15984, 15645],
					[15696, 15515],
					[15471, 15252],
					[16083, 15732],
					[15978, 15665],
					[17038, 16510],
					[17128, 16603],
					[16752, 16320],
					[16162, 15867],
					[16373, 16054],
					[17466, 17020],
					[17821, 17481],
					[18111, 17918],
					[18725, 18509],
					[18537, 18137],
					[18573, 18137],
					[18960, 18200],
					[19259, 18576],
					[19552, 18819],
					[19460, 18825],
					[19563, 18946],
					[19668, 19067],
					[19895, 19265],
					[20141, 19535],
					[20403, 19829],
					[20261, 19873],
					[20382, 19848],
					[20250, 19769],
					[20092, 19672],
					[19898, 19563],
					[20630, 20132],
					[20863, 20339],
					[21026, 20542],
					[21023, 20670],
					[20974, 20780],
					[21154, 20888],
					[21585, 21138],
					[21970, 21422],
					[21970, 21422]
				],
				[
					[26425, 23718],
					[24475, 24074],
					[26081, 24752],
					[27174, 25026],
					[27689, 25290],
					[28020, 25494],
					[28245, 25683],
					[28496, 26159],
					[28171, 26180],
					[27026, 25731],
					[28204, 26555],
					[27736, 26427],
					[29604, 27505],
					[29600, 27543],
					[28501, 26969],
					[27627, 27057],
					[28953, 28535],
					[29508, 28818],
					[31141, 29995],
					[32095, 30627],
					[31648, 30335],
					[32880, 30678],
					[33908, 31392],
					[34848, 32595],
					[34145, 32495],
					[32879, 32261],
					[33475, 33154],
					[34460, 34062],
					[34033, 33395],
					[35182, 33937],
					[35483, 34562],
					[36239, 35037],
					[35249, 34595],
					[36758, 35624],
					[38750, 37001],
					[38586, 37217],
					[37996, 37214],
					[39942, 39049],
					[40913, 39495],
					[40756, 39641],
					[41860, 40054],
					[41905, 40127],
					[43310, 41309],
					[42836, 41351],
					[41776, 40941],
					[41899, 40728],
					[43620, 41629],
					[44363, 42467],
					[44652, 42896],
					[44322, 42889],
					[46417, 44515],
					[46017, 44603],
					[44167, 43642],
					[43214, 42940],
					[43180, 43061],
					[45818, 45761],
					[46624, 46324],
					[47792, 47171],
					[47605, 46293],
					[45317, 44319],
					[45482, 44158],
					[45552, 45148],
					[47361, 47124],
					[48671, 48302],
					[49295, 48645],
					[50885, 49887],
					[50605, 50041],
					[53388, 52465],
					[54605, 53120],
					[55249, 53878],
					[55194, 53666],
					[56697, 55034],
					[57585, 55931],
					[57308, 55362],
					[58346, 55507],
					[57030, 55385],
					[55809, 55128],
					[56799, 56158],
					[57862, 56765],
					[59721, 57957],
					[59761, 58192],
					[60228, 58555],
					[60907, 58367],
					[60898, 58079],
					[59842, 58149],
					[61610, 59614],
					[61710, 60035],
					[61961, 60846],
					[63901, 62428],
					[64853, 63625],
					[64940, 62951],
					[65350, 63221],
					[66020, 64035],
					[66783, 65075],
					[66647, 65533],
					[65295, 63669],
					[64473, 62896],
					[67432, 64880],
					[68705, 66410],
					[68705, 66410]
				],
				[
					[60325, 53311],
					[57625, 52897],
					[59896, 53827],
					[60113, 54285],
					[59386, 54478],
					[56899, 53738],
					[58966, 55425],
					[61035, 57252],
					[61641, 57482],
					[61805, 57709],
					[61600, 58122],
					[60395, 57145],
					[58150, 56433],
					[58953, 57957],
					[61248, 60204],
					[62326, 60973],
					[63237, 62087],
					[63714, 62598],
					[65162, 63029],
					[67214, 65231],
					[68937, 66182],
					[70317, 68691],
					[74460, 71410],
					[79956, 74332],
					[81224, 75100],
					[81700, 75409],
					[80526, 74643],
					[81748, 76102],
					[78960, 75074],
					[77921, 75508],
					[78064, 76453],
					[78068, 76477],
					[78911, 78378],
					[79487, 78673],
					[78121, 76844],
					[81534, 78933],
					[79768, 77704],
					[81343, 78580],
					[81523, 79875],
					[88205, 85117],
					[94305, 88608],
					[96055, 89614],
					[96772, 89873],
					[98012, 91730],
					[94423, 89840],
					[87763, 86047],
					[88674, 87783],
					[89979, 88780],
					[93633, 91647],
					[99793, 96788],
					[100009, 98308],
					[101700, 99364],
					[101311, 97604],
					[95496, 93287],
					[97960, 94751],
					[99497, 96485],
					[105470, 100733],
					[108520, 103506],
					[107499, 102581],
					[108628, 102502],
					[105969, 100637],
					[103928, 101243],
					[109553, 106598],
					[118404, 114735],
					[121895, 120367],
					[123503, 122089],
					[122767, 120569],
					[125002, 120772],
					[127561, 123220],
					[128752, 122983],
					[131508, 125865],
					[135333, 128021],
					[134730, 128674],
					[135445, 129409],
					[133276, 129589],
					[133041, 129228],
					[127452, 123963],
					[129063, 124296],
					[125655, 121714],
					[131219, 125077],
					[131455, 126535],
					[135428, 130203],
					[135500, 131522],
					[135811, 131850],
					[140492, 135007],
					[140755, 136598],
					[140522, 138154],
					[139643, 136151],
					[144381, 138636],
					[145835, 140081],
					[145014, 140461],
					[143759, 139706],
					[141819, 138737],
					[148234, 143747],
					[149920, 146062],
					[152180, 145788],
					[153629, 146738],
					[154959, 147672],
					[156845, 149270],
					[156845, 149270]
				],
				[
					[119725, 106135],
					[120400, 107908],
					[118692, 108203],
					[117708, 108522],
					[120897, 110849],
					[123364, 111833],
					[126952, 115481],
					[124362, 115237],
					[120809, 115010],
					[117723, 113784],
					[119276, 115977],
					[116497, 115000],
					[120876, 119523],
					[125664, 124218],
					[128836, 126845],
					[131641, 127535],
					[139649, 133028],
					[135692, 132370],
					[134035, 132160],
					[136333, 134744],
					[146006, 142716],
					[148683, 144477],
					[149760, 143386],
					[145840, 141674],
					[150070, 144953],
					[157435, 150394],
					[155051, 151567],
					[157195, 155538],
					[158476, 156268],
					[164305, 161026],
					[166920, 160512],
					[166470, 161624],
					[164737, 158362],
					[156089, 154134],
					[161367, 159668],
					[169428, 166477],
					[173573, 167250],
					[183049, 174271],
					[184183, 176225],
					[186785, 180501],
					[191202, 184320],
					[196806, 185373],
					[197399, 186421],
					[195841, 186052],
					[191657, 184553],
					[194389, 184093],
					[193871, 183717],
					[192208, 180363],
					[188311, 179196],
					[182718, 176525],
					[184195, 178925],
					[194236, 186284],
					[200102, 192011],
					[207703, 196269],
					[200720, 190301],
					[198782, 190500],
					[198898, 193863],
					[219143, 210685],
					[237390, 222537],
					[239788, 223743],
					[237941, 224797],
					[235994, 225107],
					[235203, 226683],
					[242247, 228928],
					[245085, 231573],
					[247363, 235026],
					[241417, 236014],
					[247551, 242375],
					[252199, 246483],
					[259882, 252857],
					[256820, 249972],
					[253406, 251104],
					[240149, 238622],
					[245492, 244388],
					[255081, 253904],
					[260865, 258926],
					[270290, 266619],
					[269315, 263619],
					[271029, 266967],
					[266497, 259837],
					[271776, 260251],
					[268983, 260906],
					[268061, 258517],
					[267422, 260565],
					[272058, 261134],
					[287217, 271292],
					[297591, 278011],
					[300762, 282777],
					[304505, 286510],
					[309152, 289465],
					[305890, 286262],
					[305822, 286998],
					[305942, 290944],
					[304503, 292470],
					[296983, 292643],
					[292206, 289126],
					[298783, 294490],
					[308447, 300110],
					[311285, 297177],
					[311285, 297177]
				],
				[
					[214600, 188677],
					[210350, 187532],
					[213989, 193938],
					[213678, 197545],
					[208667, 196387],
					[208774, 200690],
					[210035, 200085],
					[222282, 205427],
					[225307, 207035],
					[219390, 205087],
					[219114, 208357],
					[230733, 218774],
					[235094, 221640],
					[234872, 222614],
					[240009, 227025],
					[243968, 234245],
					[248972, 238593],
					[252105, 237630],
					[250975, 241057],
					[249392, 242858],
					[261766, 251597],
					[263697, 248206],
					[261168, 247105],
					[262526, 251248],
					[279536, 263502],
					[279064, 267268],
					[286516, 273050],
					[289616, 279172],
					[291980, 282013],
					[292235, 277335],
					[301909, 286236],
					[306524, 290818],
					[318699, 297947],
					[323709, 300829],
					[324025, 302468],
					[318792, 303167],
					[328013, 309482],
					[328128, 312539],
					[327428, 306690],
					[321942, 302962],
					[326563, 306768],
					[327482, 311218],
					[335657, 317790],
					[321350, 311363],
					[310249, 303670],
					[317315, 309778],
					[339426, 329464],
					[346855, 341763],
					[356011, 345844],
					[371122, 351070],
					[397642, 369708],
					[401348, 379462],
					[390145, 373207],
					[395353, 378739],
					[400054, 386160],
					[415417, 397031],
					[410333, 394683],
					[409960, 392268],
					[432765, 403468],
					[443905, 414245],
					[443907, 414696],
					[445569, 417628],
					[440139, 413290],
					[444953, 423487],
					[441043, 428832],
					[446479, 441380],
					[442953, 438109],
					[454278, 445409],
					[461067, 443285],
					[458076, 434010],
					[468776, 438302],
					[476285, 442196],
					[466020, 437097],
					[470461, 441010],
					[488601, 459229],
					[503580, 478719],
					[500125, 490263],
					[484976, 477876],
					[502477, 496584],
					[512534, 510436],
					[514702, 510356],
					[504183, 496535],
					[506140, 488789],
					[512735, 497040],
					[531464, 509119],
					[532259, 519954],
					[543662, 527701],
					[536457, 517434],
					[518192, 508932],
					[509838, 497151],
					[528825, 506445],
					[541619, 519720],
					[558726, 532109],
					[563297, 544992],
					[567209, 542141],
					[554545, 539156],
					[543496, 521533],
					[541984, 520795],
					[557960, 528295],
					[557960, 528295]
				],
				[
					[351275, 310377],
					[353850, 312821],
					[355088, 317854],
					[356676, 320891],
					[360136, 323300],
					[368405, 328848],
					[370835, 331360],
					[372010, 332020],
					[371437, 333860],
					[373974, 336908],
					[381069, 344963],
					[387967, 352314],
					[391665, 354810],
					[397105, 358944],
					[406921, 366454],
					[413098, 373575],
					[417360, 380402],
					[424532, 387390],
					[434959, 396558],
					[440951, 403991],
					[450837, 410235],
					[449602, 412004],
					[452875, 419292],
					[462177, 428585],
					[471659, 435342],
					[486755, 444364],
					[492018, 449555],
					[494584, 450120],
					[494268, 454576],
					[495171, 460950],
					[511896, 471241],
					[516800, 474072],
					[521359, 478717],
					[526164, 484187],
					[519501, 481391],
					[520231, 483644],
					[518179, 483987],
					[530459, 496708],
					[546729, 511765],
					[554205, 524826],
					[562118, 529576],
					[563357, 522583],
					[571363, 528361],
					[590014, 540300],
					[624051, 568512],
					[632124, 588953],
					[646459, 597011],
					[663948, 611415],
					[664308, 614261],
					[663110, 610832],
					[677746, 619594],
					[677783, 619257],
					[690587, 632090],
					[694112, 642214],
					[709386, 658254],
					[717058, 660285],
					[724952, 666644],
					[734108, 667010],
					[732081, 670985],
					[723460, 668484],
					[716065, 667785],
					[722308, 672433],
					[729443, 674154],
					[753039, 688017],
					[756728, 696539],
					[752781, 699307],
					[745449, 698046],
					[762199, 713551],
					[782422, 730105],
					[782952, 743706],
					[774170, 755296],
					[787387, 762704],
					[823343, 793007],
					[822009, 770486],
					[815586, 772000],
					[835279, 788218],
					[834038, 792621],
					[832800, 795280],
					[846530, 797824],
					[845206, 800196],
					[846243, 811858],
					[872765, 836361],
					[890370, 833943],
					[888712, 836606],
					[874064, 827794],
					[872199, 837342],
					[894056, 871463],
					[909069, 883898],
					[903262, 865000],
					[904306, 853327],
					[884190, 837446],
					[880659, 836541],
					[872744, 833578],
					[878847, 847103],
					[909584, 872769],
					[910073, 888862],
					[903893, 873202],
					[911034, 870815],
					[913314, 869055],
					[913314, 869055]
				],
				[
					[533250, 477043],
					[514100, 486999],
					[539791, 489432],
					[536191, 492700],
					[525671, 493011],
					[528443, 501279],
					[546175, 514271],
					[559729, 527934],
					[550622, 534312],
					[565133, 545332],
					[579856, 556449],
					[610050, 568271],
					[622076, 577182],
					[640042, 588456],
					[645989, 598753],
					[641769, 607081],
					[633953, 614861],
					[635174, 612180],
					[651623, 620732],
					[637434, 620131],
					[656285, 642897],
					[662812, 643813],
					[698678, 667919],
					[707025, 686521],
					[715402, 698554],
					[723926, 717386],
					[727783, 717350],
					[738136, 721392],
					[739619, 710459],
					[734107, 707591],
					[777006, 731533],
					[784927, 735743],
					[790454, 738545],
					[791563, 738843],
					[818404, 764728],
					[830237, 776296],
					[835137, 787078],
					[836829, 796096],
					[837037, 804635],
					[862390, 814655],
					[875555, 831362],
					[898429, 865325],
					[922106, 903864],
					[936950, 917269],
					[916715, 886427],
					[916572, 889773],
					[931402, 892281],
					[942671, 907187],
					[954812, 924754],
					[951939, 911609],
					[952557, 916516],
					[952285, 922023],
					[975551, 929292],
					[986434, 937301],
					[1009440, 963827],
					[1033765, 994553],
					[1059728, 1028267],
					[1037178, 990485],
					[1040796, 991617],
					[1044839, 993452],
					[1051885, 999768],
					[1059646, 1007158],
					[1072335, 1021525],
					[1086197, 1037561],
					[1100868, 1054743],
					[1098108, 1047405],
					[1105824, 1060246],
					[1113929, 1074846],
					[1132315, 1106923],
					[1149217, 1115960],
					[1169790, 1142158],
					[1154899, 1110236],
					[1159621, 1111835],
					[1164762, 1114426],
					[1172175, 1120962],
					[1199140, 1153257],
					[1230703, 1191716],
					[1265459, 1234406],
					[1223272, 1183102],
					[1221347, 1185701],
					[1219819, 1189833],
					[1231486, 1186403],
					[1239654, 1191881],
					[1248511, 1198500],
					[1257133, 1206363],
					[1265778, 1214627],
					[1274402, 1223119],
					[1285120, 1232290],
					[1296300, 1241637],
					[1307815, 1251098],
					[1311077, 1258273],
					[1318828, 1266702],
					[1326657, 1275153],
					[1335005, 1283751],
					[1343475, 1292383],
					[1352030, 1301039],
					[1361575, 1310667],
					[1371351, 1320515],
					[1386450, 1335720],
					[1386450, 1335720]
				]
			],
			[
				[
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1],
					[-1, -1]
				],
				[
					[690, 690],
					[703, 702],
					[715, 712],
					[729, 725],
					[742, 737],
					[755, 749],
					[769, 761],
					[783, 774],
					[797, 787],
					[811, 799],
					[825, 812],
					[839, 824],
					[853, 837],
					[867, 849],
					[881, 862],
					[895, 875],
					[908, 887],
					[922, 899],
					[936, 912],
					[950, 924],
					[964, 937],
					[978, 950],
					[992, 962],
					[1006, 975],
					[1020, 987],
					[1034, 1000],
					[1048, 1012],
					[1062, 1025],
					[1076, 1038],
					[1090, 1050],
					[1104, 1063],
					[1118, 1075],
					[1132, 1088],
					[1145, 1100],
					[1159, 1113],
					[1173, 1125],
					[1187, 1137],
					[1201, 1150],
					[1215, 1163],
					[1229, 1175],
					[1243, 1188],
					[1257, 1200],
					[1271, 1213],
					[1285, 1226],
					[1299, 1238],
					[1313, 1251],
					[1327, 1263],
					[1341, 1276],
					[1355, 1289],
					[1368, 1301],
					[1358, 1297],
					[1341, 1288],
					[1322, 1278],
					[1400, 1334],
					[1396, 1334],
					[1386, 1330],
					[1363, 1317],
					[1450, 1380],
					[1476, 1401],
					[1501, 1421],
					[1519, 1436],
					[1536, 1451],
					[1550, 1464],
					[1564, 1476],
					[1578, 1489],
					[1592, 1502],
					[1605, 1514],
					[1619, 1527],
					[1633, 1539],
					[1647, 1552],
					[1661, 1564],
					[1675, 1577],
					[1689, 1589],
					[1703, 1602],
					[1717, 1615],
					[1731, 1627],
					[1745, 1640],
					[1759, 1652],
					[1773, 1665],
					[1787, 1677],
					[1801, 1690],
					[1815, 1703],
					[1828, 1715],
					[1842, 1727],
					[1798, 1695],
					[1741, 1652],
					[1674, 1602],
					[1770, 1677],
					[1728, 1644],
					[1671, 1600],
					[1863, 1754],
					[1909, 1791],
					[1950, 1825],
					[1974, 1846],
					[1976, 1860],
					[1972, 1873],
					[1966, 1885],
					[2025, 1904],
					[2070, 1931],
					[2070, 1931]
				],
				[
					[2970, 2835],
					[3060, 3060],
					[2988, 2917],
					[2971, 2915],
					[3051, 2964],
					[3031, 2953],
					[2922, 2870],
					[3058, 2989],
					[2945, 2900],
					[3109, 3046],
					[3078, 3027],
					[3381, 3300],
					[3476, 3393],
					[3563, 3477],
					[3626, 3541],
					[3681, 3599],
					[3732, 3654],
					[3782, 3707],
					[3831, 3759],
					[3802, 3741],
					[3757, 3707],
					[3699, 3662],
					[3942, 3892],
					[4022, 3973],
					[4099, 4051],
					[4157, 4112],
					[4210, 4167],
					[4261, 4221],
					[4310, 4274],
					[4359, 4326],
					[4407, 4378],
					[4348, 4324],
					[4266, 4248],
					[4165, 4154],
					[4487, 4474],
					[4578, 4569],
					[4666, 4659],
					[4729, 4725],
					[4787, 4783],
					[4844, 4839],
					[4900, 4892],
					[4955, 4944],
					[5010, 4996],
					[5065, 5048],
					[5096, 5078],
					[5072, 5058],
					[5033, 5024],
					[5083, 5068],
					[5274, 5244],
					[5359, 5323],
					[5435, 5394],
					[5422, 5382],
					[5341, 5311],
					[5235, 5217],
					[5428, 5400],
					[5630, 5580],
					[5734, 5675],
					[5816, 5750],
					[5881, 5811],
					[5942, 5868],
					[5999, 5922],
					[6056, 5975],
					[6112, 6027],
					[6167, 6078],
					[6222, 6130],
					[6277, 6182],
					[6333, 6233],
					[6388, 6285],
					[6443, 6336],
					[6498, 6388],
					[6553, 6439],
					[6608, 6491],
					[6663, 6542],
					[6588, 6453],
					[6484, 6331],
					[6188, 6033],
					[6370, 6257],
					[6244, 6153],
					[6782, 6653],
					[6925, 6787],
					[7053, 6907],
					[7134, 6983],
					[7131, 6993],
					[7104, 6984],
					[7062, 6964],
					[7302, 7155],
					[7313, 7174],
					[7305, 7180],
					[7267, 7163],
					[7518, 7359],
					[7607, 7434],
					[7690, 7507],
					[7755, 7566],
					[7815, 7621],
					[7873, 7675],
					[7930, 7727],
					[7990, 7784],
					[8054, 7843],
					[8154, 7937],
					[8154, 7937]
				],
				[
					[9990, 9378],
					[9840, 9840],
					[9864, 9600],
					[10078, 9697],
					[9976, 9608],
					[9660, 9370],
					[10299, 9865],
					[10347, 9915],
					[11035, 10534],
					[11300, 10791],
					[11543, 11030],
					[11734, 11226],
					[11911, 11410],
					[12079, 11586],
					[12244, 11759],
					[12406, 11930],
					[12569, 12102],
					[12731, 12273],
					[12893, 12444],
					[13053, 12614],
					[13215, 12785],
					[13106, 12729],
					[12936, 12622],
					[12722, 12479],
					[13442, 13124],
					[13551, 13259],
					[13627, 13369],
					[14169, 13838],
					[14406, 14068],
					[14627, 14286],
					[14542, 14241],
					[14310, 14095],
					[14012, 13897],
					[14435, 14318],
					[14168, 14028],
					[13595, 13520],
					[14149, 14025],
					[15367, 15150],
					[15807, 15570],
					[16064, 15845],
					[16193, 16009],
					[16273, 16132],
					[16450, 16272],
					[16236, 16107],
					[15947, 15877],
					[16456, 16361],
					[17032, 16896],
					[16965, 16862],
					[16761, 16705],
					[16767, 16690],
					[17700, 17574],
					[18015, 17882],
					[18297, 18163],
					[18502, 18373],
					[18687, 18565],
					[18857, 18744],
					[19023, 18919],
					[19187, 19091],
					[19349, 19262],
					[19512, 19434],
					[19674, 19605],
					[19835, 19775],
					[19997, 19946],
					[20158, 20117],
					[20320, 20288],
					[20287, 20265],
					[20212, 20198],
					[19643, 19637],
					[19743, 19736],
					[19356, 19346],
					[20796, 20774],
					[20950, 20924],
					[21020, 20991],
					[20928, 20898],
					[21766, 21713],
					[22062, 21998],
					[22161, 22096],
					[22156, 22095],
					[21892, 21849],
					[22276, 22211],
					[22237, 22176],
					[23035, 22929],
					[23328, 23206],
					[23601, 23465],
					[23888, 23760],
					[24227, 24131],
					[24574, 24374],
					[24244, 23860],
					[23788, 23164],
					[23401, 23150],
					[24195, 23956],
					[23921, 23769],
					[23611, 23550],
					[24545, 24487],
					[25464, 25360],
					[25419, 25250],
					[25390, 25224],
					[25259, 25108],
					[26542, 26258],
					[26542, 26258]
				],
				[
					[31410, 28396],
					[32790, 29411],
					[31479, 29157],
					[30828, 29045],
					[32639, 30205],
					[32826, 30438],
					[32424, 30434],
					[31712, 30274],
					[33379, 31452],
					[34298, 32125],
					[34022, 32113],
					[34466, 32427],
					[33808, 32622],
					[33767, 32753],
					[33132, 31828],
					[34956, 32975],
					[34952, 33408],
					[33097, 32271],
					[34084, 33205],
					[35102, 34028],
					[34618, 34281],
					[35075, 34850],
					[37385, 36924],
					[38544, 37702],
					[40497, 39323],
					[40073, 39719],
					[39941, 39732],
					[40784, 40698],
					[40168, 39966],
					[42031, 41656],
					[41844, 40781],
					[43110, 41879],
					[43852, 42031],
					[43318, 42475],
					[45235, 44106],
					[46359, 44538],
					[45835, 44296],
					[47395, 45816],
					[46485, 45522],
					[46840, 45707],
					[46582, 45724],
					[46088, 45771],
					[46791, 46332],
					[48698, 47657],
					[50963, 49166],
					[50469, 48873],
					[50842, 50036],
					[49292, 48556],
					[50109, 49855],
					[50205, 50067],
					[51380, 51321],
					[52582, 52263],
					[53680, 52738],
					[54120, 52437],
					[55695, 53946],
					[54966, 53548],
					[55847, 53547],
					[56011, 54237],
					[56189, 53579],
					[56632, 55055],
					[57935, 56276],
					[56673, 55849],
					[56050, 55646],
					[57917, 57390],
					[56646, 55829],
					[58919, 57861],
					[57540, 56945],
					[60484, 59427],
					[64009, 62095],
					[65459, 63309],
					[66512, 64219],
					[66837, 64758],
					[67177, 65364],
					[67442, 65945],
					[69045, 67085],
					[68834, 67182],
					[69029, 67662],
					[70209, 68161],
					[70832, 68669],
					[70289, 68288],
					[69422, 67707],
					[68634, 66832],
					[71353, 68620],
					[71258, 68390],
					[69383, 68280],
					[71958, 70818],
					[71524, 70158],
					[71541, 70357],
					[70023, 69360],
					[72996, 72220],
					[76730, 75143],
					[79122, 77246],
					[80453, 77582],
					[78052, 76469],
					[76033, 75200],
					[73655, 72399],
					[76354, 74114],
					[79211, 76141],
					[81666, 79508],
					[81666, 79508]
				],
				[
					[72150, 62745],
					[71580, 65594],
					[70122, 64150],
					[72488, 65902],
					[72167, 66872],
					[70873, 66606],
					[70106, 67454],
					[69416, 67732],
					[71800, 69316],
					[73346, 69597],
					[76113, 72200],
					[76934, 73490],
					[77509, 72721],
					[73898, 71076],
					[76393, 72836],
					[77642, 73777],
					[77912, 74597],
					[83166, 78625],
					[82859, 79247],
					[85301, 81830],
					[86659, 80960],
					[90887, 84468],
					[90823, 85467],
					[91590, 87462],
					[93798, 87831],
					[92049, 88028],
					[95764, 90854],
					[94373, 91709],
					[96679, 93288],
					[101653, 96358],
					[100838, 97552],
					[100406, 95351],
					[101545, 96640],
					[106456, 98636],
					[105942, 98736],
					[102908, 97908],
					[103275, 99703],
					[103416, 100912],
					[107339, 104077],
					[110891, 106425],
					[107986, 106630],
					[105802, 103839],
					[108601, 105683],
					[112300, 107937],
					[110532, 108064],
					[114671, 110225],
					[118901, 111920],
					[118299, 111505],
					[119796, 113283],
					[123921, 115090],
					[123867, 117468],
					[122182, 118270],
					[123869, 119430],
					[124628, 119337],
					[121497, 118048],
					[122644, 118018],
					[127180, 120955],
					[124289, 119359],
					[130969, 122961],
					[128399, 121491],
					[132604, 124865],
					[132888, 127860],
					[138820, 132968],
					[139812, 136682],
					[144251, 139759],
					[147168, 139315],
					[149721, 141320],
					[152735, 146297],
					[155812, 152206],
					[155320, 151321],
					[156127, 149867],
					[157662, 152083],
					[157518, 148024],
					[158980, 148610],
					[161105, 149546],
					[159759, 148800],
					[158245, 148925],
					[155110, 151035],
					[159515, 155125],
					[163217, 159250],
					[160026, 154362],
					[157858, 155185],
					[161650, 158509],
					[166125, 162931],
					[166437, 161438],
					[170273, 164241],
					[171249, 167922],
					[171083, 167527],
					[167712, 165255],
					[168288, 163865],
					[172980, 164756],
					[174049, 165158],
					[178031, 167312],
					[179813, 168597],
					[181430, 169882],
					[182763, 171071],
					[184147, 172365],
					[185509, 173672],
					[187590, 175685],
					[187590, 175685]
				],
				[
					[145710, 127730],
					[140070, 126769],
					[144371, 130483],
					[144207, 130695],
					[146255, 132804],
					[146665, 134693],
					[146795, 137116],
					[143822, 136576],
					[148042, 138368],
					[148800, 141032],
					[150498, 141711],
					[149642, 141583],
					[150211, 144438],
					[156875, 149117],
					[157527, 152442],
					[156813, 152040],
					[159172, 156134],
					[165871, 161840],
					[170659, 163448],
					[169844, 164317],
					[167378, 160132],
					[164127, 161902],
					[170705, 168108],
					[178973, 173999],
					[180128, 169853],
					[187498, 174142],
					[193295, 179362],
					[196368, 183399],
					[195268, 184526],
					[207634, 193285],
					[210539, 197725],
					[209742, 200356],
					[210523, 199238],
					[201932, 196230],
					[200750, 198229],
					[195568, 194057],
					[207282, 203569],
					[218282, 209060],
					[228606, 212521],
					[230939, 214089],
					[227960, 213556],
					[230049, 216383],
					[225688, 216744],
					[236271, 226305],
					[233449, 230240],
					[231414, 229433],
					[230423, 227134],
					[235372, 227421],
					[246151, 233154],
					[245367, 232888],
					[241152, 230529],
					[256080, 239515],
					[258987, 241433],
					[267397, 248504],
					[271160, 251838],
					[271990, 252690],
					[271654, 252576],
					[271994, 255361],
					[283687, 268426],
					[287394, 276595],
					[288272, 273521],
					[285192, 275009],
					[297038, 282194],
					[291670, 279609],
					[296385, 280902],
					[296706, 283534],
					[299131, 291097],
					[303994, 292761],
					[315149, 305951],
					[309924, 297918],
					[299318, 293641],
					[294709, 286389],
					[310548, 296340],
					[315072, 301206],
					[318195, 306689],
					[320608, 314137],
					[324046, 314351],
					[326545, 309898],
					[328210, 311049],
					[329587, 312929],
					[332009, 319492],
					[336885, 323083],
					[337278, 328224],
					[334005, 322438],
					[331121, 322983],
					[340180, 329089],
					[346011, 335715],
					[346311, 342791],
					[343086, 340190],
					[335322, 330022],
					[344729, 333338],
					[354913, 337817],
					[359791, 340729],
					[364843, 344581],
					[369343, 348469],
					[372247, 353324],
					[369932, 354017],
					[370078, 357371],
					[378846, 357643],
					[378846, 357643]
				],
				[
					[258540, 227156],
					[249240, 230153],
					[261488, 236793],
					[260876, 238118],
					[260779, 238515],
					[264906, 243864],
					[268628, 246620],
					[273111, 250992],
					[275097, 252534],
					[273836, 253411],
					[269533, 255038],
					[275436, 260915],
					[279053, 261725],
					[279384, 264317],
					[274154, 265831],
					[283966, 270899],
					[301940, 281602],
					[316956, 295582],
					[316548, 300568],
					[311680, 294320],
					[306369, 291714],
					[315489, 295940],
					[323445, 302232],
					[331389, 309774],
					[340846, 320402],
					[341632, 324343],
					[347007, 336355],
					[349151, 340812],
					[347876, 341738],
					[354072, 344913],
					[364209, 349982],
					[366434, 345181],
					[375584, 351389],
					[377136, 351528],
					[369629, 351840],
					[385742, 365158],
					[386872, 370706],
					[389352, 375787],
					[391922, 375606],
					[403010, 386323],
					[417986, 390789],
					[419262, 392446],
					[416741, 393905],
					[417678, 393727],
					[429614, 404720],
					[428090, 405554],
					[423179, 405864],
					[436625, 410361],
					[439079, 412515],
					[440200, 413374],
					[451790, 430293],
					[471884, 449564],
					[487167, 470323],
					[484845, 465768],
					[516205, 483151],
					[522808, 488230],
					[533592, 496995],
					[531086, 504807],
					[529870, 503512],
					[536445, 510052],
					[544713, 508752],
					[539450, 507386],
					[531600, 501479],
					[534760, 506015],
					[543376, 512706],
					[543131, 519624],
					[532167, 519846],
					[532948, 520257],
					[522783, 511311],
					[545611, 525305],
					[548746, 524354],
					[549672, 525353],
					[539701, 520255],
					[553100, 530676],
					[551982, 541695],
					[556419, 539853],
					[574787, 550703],
					[582987, 554501],
					[575104, 554528],
					[589189, 562223],
					[593549, 570852],
					[586992, 568597],
					[586402, 562258],
					[579435, 557618],
					[575985, 560483],
					[597593, 577412],
					[612490, 588463],
					[625331, 597910],
					[636646, 595656],
					[625469, 592591],
					[619053, 592009],
					[603071, 587103],
					[617444, 602726],
					[609112, 597369],
					[627426, 611200],
					[621712, 600676],
					[646196, 608305],
					[666435, 624376],
					[672204, 636036],
					[672204, 636036]
				],
				[
					[428430, 370853],
					[419670, 373273],
					[426662, 381635],
					[431352, 384942],
					[431378, 385825],
					[432531, 389181],
					[433143, 393249],
					[439538, 398137],
					[448237, 402754],
					[457258, 407415],
					[459156, 410786],
					[460132, 416257],
					[471887, 428306],
					[487026, 437487],
					[497560, 446644],
					[506570, 454565],
					[509542, 462047],
					[511843, 467453],
					[515373, 470645],
					[517025, 474310],
					[531752, 485823],
					[551939, 498533],
					[564951, 511734],
					[564948, 520289],
					[567245, 520761],
					[570058, 522621],
					[581542, 531409],
					[598736, 542385],
					[600545, 548790],
					[605240, 556574],
					[607854, 557672],
					[618284, 566943],
					[628603, 570867],
					[628852, 575625],
					[624468, 580764],
					[617939, 578101],
					[617410, 578831],
					[623700, 585206],
					[654577, 602115],
					[665006, 611523],
					[673682, 615225],
					[672685, 621843],
					[685634, 634440],
					[718296, 664528],
					[759770, 689841],
					[775566, 711870],
					[782975, 718029],
					[793308, 725070],
					[796268, 738206],
					[807724, 754367],
					[833366, 776146],
					[851929, 775989],
					[860615, 778039],
					[857288, 774788],
					[846961, 776490],
					[838022, 775328],
					[852692, 787752],
					[868791, 800842],
					[861979, 803808],
					[862188, 800473],
					[843629, 801044],
					[854989, 810280],
					[846878, 807305],
					[865805, 817357],
					[887740, 827375],
					[914472, 835929],
					[923173, 842036],
					[926047, 853638],
					[914561, 859298],
					[920235, 857584],
					[903520, 850133],
					[923978, 860354],
					[931475, 867511],
					[925158, 867772],
					[932749, 883989],
					[950076, 908216],
					[943870, 907505],
					[931448, 894375],
					[964690, 905548],
					[977741, 922290],
					[994629, 949955],
					[1003301, 968944],
					[993584, 947871],
					[985230, 933555],
					[988968, 940311],
					[977098, 944041],
					[1005972, 960242],
					[1017161, 965089],
					[1019684, 975408],
					[1009552, 969064],
					[1011257, 977525],
					[1015073, 983210],
					[1047988, 996586],
					[1052590, 1005194],
					[1041338, 990914],
					[1052111, 1005714],
					[1096654, 1022537],
					[1102263, 1025920],
					[1113918, 1038388],
					[1113918, 1038388]
				],
				[
					[656160, 582434],
					[579390, 535504],
					[615839, 576340],
					[631357, 588023],
					[657902, 609625],
					[651402, 613625],
					[657924, 619713],
					[653784, 607233],
					[662378, 616073],
					[708418, 649532],
					[711964, 653876],
					[729296, 670121],
					[702157, 659912],
					[691110, 666931],
					[719991, 693491],
					[781600, 740155],
					[796464, 765542],
					[802766, 761966],
					[796893, 769165],
					[813642, 786468],
					[828058, 794264],
					[815045, 804123],
					[809163, 793965],
					[864091, 833627],
					[893752, 835898],
					[913516, 847869],
					[917386, 854920],
					[916624, 861956],
					[902521, 866137],
					[928490, 881368],
					[922390, 888120],
					[943581, 899461],
					[935636, 903967],
					[951560, 914874],
					[997940, 936774],
					[1017085, 949911],
					[1033562, 962324],
					[1046421, 973602],
					[1059191, 984732],
					[1071537, 995702],
					[1085381, 1016484],
					[1092072, 1043556],
					[1110070, 1091633],
					[1135305, 1115720],
					[1181790, 1146925],
					[1197503, 1140750],
					[1190137, 1140576],
					[1209994, 1167859],
					[1194087, 1126266],
					[1211389, 1143635],
					[1221512, 1164146],
					[1181985, 1161709],
					[1164626, 1145465],
					[1189317, 1157961],
					[1217612, 1158822],
					[1233713, 1167461],
					[1247505, 1176536],
					[1242971, 1178405],
					[1236148, 1187848],
					[1226778, 1198172],
					[1282417, 1242204],
					[1294695, 1232817],
					[1310675, 1242683],
					[1307169, 1243701],
					[1299744, 1244891],
					[1289284, 1245137],
					[1345154, 1279194],
					[1368953, 1299083],
					[1392995, 1319581],
					[1391623, 1317703],
					[1401059, 1326622],
					[1410073, 1335455],
					[1420194, 1345470],
					[1410758, 1344295],
					[1397098, 1340765],
					[1380327, 1335469],
					[1441424, 1375284],
					[1467426, 1391542],
					[1494282, 1407577],
					[1517429, 1420947],
					[1510967, 1429941],
					[1500381, 1430022],
					[1466536, 1416915],
					[1427064, 1399887],
					[1452494, 1424276],
					[1511552, 1468928],
					[1525621, 1487703],
					[1557653, 1502204],
					[1555453, 1512999],
					[1557712, 1533775],
					[1555642, 1520577],
					[1604274, 1543761],
					[1621920, 1554506],
					[1638316, 1566530],
					[1650989, 1577455],
					[1662698, 1588280],
					[1674955, 1600135],
					[1687228, 1612209],
					[1706015, 1630814],
					[1706015, 1630814]
				]
			]
		],
		buildUI:             function() {
			console.log("build ui raiding 0");
			var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
			for(var key in worldDataRoot) {
				if(worldDataRoot[key] instanceof Object) {
					if(worldDataRoot[key].hasOwnProperty("d") && worldDataRoot[key].hasOwnProperty("c")) {
						this.worldData = worldDataRoot[key];
						break;
					}
				}
			}
			var CI = webfrontend.data.City.getInstance();
			var app = qx.core.Init.getApplication();
			this.setLayout(new qx.ui.layout.VBox(2));
			var w = qx.bom.Viewport.getWidth(window);
			var h = qx.bom.Viewport.getHeight(window);
			var wh = Math.floor(h * 0.45);
			this.set({
				allowMaximize:  false,
				allowMinimize:  false,
				showMaximize:   false,
				showMinimize:   false,
				showStatusbar:  false,
				showClose:      false,
				contentPadding: 5,
				useMoveFrame:   true,
				useResizeFrame: false,
				resizable:      true,
				width:          500,
				height:         500
			});
			console.log("build ui raiding 1");

			this.setMaxHeight(500);
			webfrontend.gui.Util.formatWinClose(this);
			console.log("build ui raiding 2");
			this.setCaption(CI.getName() + "  " + webfrontend.gui.Util.formatCityCoordsFromId(CI.getId(), true));
			this.tabview = new qx.ui.tabview.TabView();
			this.tabview.add(this.createDungeonPage());
			this.tabview.add(this.createBossPage());
			this.tabview.add(this.createIdleUnitsPage());
			console.log("build ui raiding 3");
			this.tabview.add(this.createPvpPage());
			this.tabview.setHeight(500 - 39);
			this.add(this.tabview);
			console.log("build ui raiding 4");
			this.stat = new qx.ui.basic.Image();
			this.stat.setVisibility("hidden");
			this.add(this.stat);
			var app = qx.core.Init.getApplication();
			var dv = (app.dungeonDetailView || app.getDungeonDetailView());
			if(!dv.hasOwnProperty("originalSetDungeon")) {
				dv.originalSetDungeon = dv.setDungeon;
				dv.AvaRaid = this;
				dv.setDungeon = this.interceptSetDungeon;
			}
			var cv = (app.cityDetailView || app.getCityDetailView());
			if(!cv.hasOwnProperty("originalSetCity")) {
				cv.originalSetCity = cv.setCity;
				cv.AvaRaid = this;
				cv.setCity = this.interceptSetCity;
			}
			console.log("starting part 2");
			var _this = this;

			window.setTimeout(function() {
				console.log("in part 2");
				_this.updateAvailableUnits();
				_this.updateBossRaidCity();
				webfrontend.data.City.getInstance().addListener("changeVersion", _this.updateAvailableUnits, _this);


				webfrontend.data.City.getInstance().addListener("changeCity", _this.onCityChange, _this);
				_this.addListener("appear", _this.onOpen, _this);
				_this.addListener("disappear", _this.onClose, _this);
			}, 1.0); // wait for 1 second so that it doesn't recurse
			//this.addListener("resize", this.onResize, this);

		},
		onResize:            function(e) {
			var h = e.getData().height;
			//this.tabview.setHeight(h-40);
		},
		onOpen:              function() {
			ava.ui.IdleRaidUnitsTable.getInstance().refresh();
		},
		onClose:             function() {
			var rw = ava.ui.IdleRaidUnitsTable.getInstance();
			removeConsumer("COMO", rw.DispatchResultsRw, rw);

		},
		interceptSetDungeon: function(bn, bo) {
			var app = qx.core.Init.getApplication();
			var dv = (app.dungeonDetailView || app.getDungeonDetailView());
			dv.originalSetDungeon(bn, bo);
			dv.AvaRaid.curDungeon = bn;
			dv.AvaRaid.addDungeonToRaid(bn);
		},
		interceptSetCity:    function(bT) {
			var app = qx.core.Init.getApplication();
			var cv = (app.cityDetailView || app.getCityDetailView());
			if(cv.hasOwnProperty("originalSetCity")) {
				cv.originalSetCity(bT);
			}
			cv.AvaRaid.curCity = bT;
			cv.AvaRaid.addCityToRaid(bT);
		},
		getSpeed:            function(unitType) {
			var retVal = 0;
			var CI = webfrontend.data.City.getInstance();
			var resMain = webfrontend.res.Main.getInstance();
			var tech = webfrontend.data.Tech.getInstance();
			for(var unitType in CI.units) {
				var u = CI.units[unitType];
				if(u.count > 0 && resMain.units[unitType].c > 0 && resMain.units[unitType].ls) {
					retVal = Math.max(0, resMain.units[unitType].s / (1 + tech.getBonus("unitSpeed", webfrontend.data.Tech.research, parseInt(unitType)) / 100 + tech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, parseInt(unitType)) / 100));
					break;
				}
			}
			return retVal;
		},
		addCityToRaid:       function(c) {
			var CI = webfrontend.data.City.getInstance();
			var ocid = CI.getId();
			var cid = c.get_Coordinates();
			var playerName = webfrontend.data.Player.getInstance().getName();
			var pn = c.get_PlayerName();
			var x = cid & 0xFFFF;
			var y = cid >> 16;
			var cx = ocid & 0xFFFF;
			var cy = ocid >> 16;
			var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
			var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");

			var pid = c.get_PlayerId();
			var an = c.get_AllianceName();
			//var nid=c.get_AllianceId();
			var cn = c.get_Name();
			var row = ["0", cn, cstr, pn, an, "ref", dist.toString(), "max", ocid, pid, "webfrontend/ui/icons/icon_close_btn_small.png"];
			/*
			 var pvpColumnNames = [
			 "x",
			 "City",
			 "Coords",
			 "Player",
			 "Alliance",
			 "ref",
			 "Dist",
			 "TS",
			 "cid",
			 "pid",
			 "Remove"
			 ];
			 */

			//console.dir(m);
			var m = this.pvpTable.getTableModel();
			var rowCount = m.getRowCount();
			for(var ii = 0; ii < rowCount; ++ii) {
				console.log(m.getValue(9, ii));
				if(m.getValue(9, ii) == cid) {
					m.removeRows(ii, 1);
					break;
				}
			}

			console.dir(row);
			if(rowCount >= 15) {
				for(var i = 0; i < 6; ++i) {
					var id = rowCount - 1 - i;
					console.log(m.getValue(0, id));

					if(m.getValue(0, id) != "0") // not locked?
					{
						console.log("Remove: " + id);

						m.removeRows(id, 1);
					}
				}
			}

			console.log("Rows Pre: " + m.getRowCount());
			m.addRows([row], 0);
			console.log("Rows Post: " + m.getRowCount());

		},
		addDungeonToRaid:    function(d, retBtn) {

			var retVal = null;
			if(webfrontend.res.Main.getInstance().dungeons[d.type].b == 0) {
				var bv = d.get_Coordinates();
				var dungX = bv & 0xFFFF;
				var dungY = bv >> 16;
				var cstr = leftPad(dungX, 3, "0") + ":" + leftPad(dungY, 3, "0");
				var found = false;
				var children = this.targetContainer.getChildren();
				for(var i = 0; i < children.length; i++) {
					var coords = children[i].getChildren()[3];
					if(coords.getValue() == cstr) {
						if(retBtn) {
							retVal = children[i].getChildren()[0];
						}
						found = true;
					}
				}
				if(!found) {
					var CI = webfrontend.data.City.getInstance();
					var cId = CI.getId();
					var cx = cId & 0xFFFF;
					var cy = cId >> 16;
					var dist = Math.sqrt((dungX - cx) * (dungX - cx) + (dungY - cy) * (dungY - cy)).toFixed(2);

					//debug( "GETTING MAX/AVG" );
					var dpt = this.dungProgressType(d.type);
					var dpl = d.get_Level() - 1;
					var dpp = d.get_Progress();
					var max = this.dungeonProgressData[dpt][dpl][dpp][0].toString();
					var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
					var subcontainer = new qx.ui.container.Composite();
					subcontainer.setLayout(new qx.ui.layout.Basic());
					btn = new qx.ui.form.Button("Add").set({
						paddingLeft:   5,
						paddingRight:  5,
						paddingTop:    0,
						paddingBottom: 0
					});
					subcontainer.add(btn, {
						top:  0,
						left: 0
					});
					btn.raidcontainer = new qx.ui.container.Composite();
					btn.raidcontainer.setLayout(new qx.ui.layout.VBox());
					//  btn.rw = this;
					btn.d = d;
					btn.addListener("click", function() {
						this.onAddRaidButton(btn);
					});

					retVal = btn;
					var raidcontainer = btn.raidcontainer;
					btn.maxLoot = parseInt(max);
					btn = new qx.ui.basic.Label("L" + d.get_Level() + " " + dungShortName(d.type)).set({
						rich:      true,
						textColor: "blue"
					});
					btn.d = d;
					btn.AvaWin = this;
					if(d.hasOwnProperty("get_StartStep")) {
						paDebug("getStartStep");
						btn.addListener("click", function() {
							this.AvaWin.curDungeon = this.d;
							webfrontend.gui.Util.openDungeonProfile(this.d);
						});
					} else {
						btn.addListener("click", function() {
							this.AvaWin.curDungeon = this.d;
							var app = qx.core.Init.getApplication();
							app.showInfoPage(app.getCityInfoPage(), {
								"id": bv
							});
						});
					}
					subcontainer.add(btn, {
						top:  4,
						left: 50 * 1 + 30
					});
					subcontainer.add(new qx.ui.basic.Label(d.get_Progress() + "%"), {
						top:  4,
						left: 50 * 2 + 30
					});
					btn = new qx.ui.basic.Label(cstr).set({
						rich:      true,
						textColor: "blue"
					});
					btn.dungX = dungX;
					btn.dungY = dungY;
					btn.addListener("click", function() {
						webfrontend.gui.Util.showMapModeViewPos('r', 0, this.dungX, this.dungY);
					});
					subcontainer.add(btn, {
						top:  4,
						left: 50 * 3 + 30
					});
					subcontainer.add(new qx.ui.basic.Label(dist), {
						top:  4,
						left: 50 * 4 + 30
					});
					btn = new qx.ui.basic.Label(max);
					btn.AvaWin = this;
					btn.addListener("click", function() {
						if(Number(this.getValue()) > 0)
							this.AvaWin.addRaid(this.getLayoutParent().getChildren()[0], this.getValue());
					});
					subcontainer.add(btn, {
						top:  4,
						left: 50 * 5 + 30
					});
					btn = new qx.ui.basic.Label(avg);
					subcontainer.add(btn, {
						top:  4,
						left: 50 * 6 + 30
					});
					btn = new qx.ui.form.Button("X").set({
						paddingLeft:   5,
						paddingRight:  5,
						paddingTop:    0,
						paddingBottom: 0
					});
					//   btn.rw = this;
					btn.addListener("click", function() {
						// todo: should I add/remove from COMO?
						this.getLayoutParent().destroy();
						this.updateAvailableUnits();
					});
					subcontainer.add(btn, {
						top:  0,
						left: 50 * 8
					});
					subcontainer.add(raidcontainer, {
						top:  24,
						left: 16
					});
					this.targetContainer.add(subcontainer);
					this.updateDungeonRaidInfo(d.get_Coordinates());
				}
			}
			return retVal;
		},
		dungProgressType:    function(dungType) {
			switch(dungType) {
				case 4:
					return 1;
			}
			return 0;
			// use the forest progress
		},
		getMinBossLevel:     function() {
			var retVal = 1;
			var title = webfrontend.data.Player.getInstance().getTitle();
			var resMain = webfrontend.res.Main.getInstance();
			for(var i = 6; i >= 1; i--) {
				if(resMain.dungeonLevels[i].t < title - 1) {
					retVal = title > 5 ? (i + 1) : i;
					break;
				}
			}
			return retVal;
		},
		pickBossRaider:      function() {
			var retVal = {
				t: -1,
				s: 0
			};
			var CI = webfrontend.data.City.getInstance();
			var resMain = webfrontend.res.Main.getInstance();
			var tech = webfrontend.data.Tech.getInstance();
			for(var unitType in CI.units) {
				if(unitType == 3 || unitType == 6 || unitType == 7 || unitType == 9 || unitType == 10 || unitType == 11 || unitType == 12 || unitType == 13 || unitType == 17) {
					var u = CI.units[unitType];
					if(u.count > 0 && resMain.units[unitType].c > 0 && (resMain.units[unitType].ls || unitType == 17)) {
						var uspeed = Math.max(0, resMain.units[unitType].s / (1 + tech.getBonus("unitSpeed", webfrontend.data.Tech.research, parseInt(unitType)) / 100 + tech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, parseInt(unitType)) / 100));
						retVal = {
							t: parseInt(unitType),
							s: uspeed
						};
						break;
					}
				}
			}
			return retVal;
		},
		formatNumber:        function(str) {
			var num = String(str).replace(/\,/g, '');
			var pos = num.indexOf('.');
			if(pos >= 0) {
				num = num.substring(0, pos);
			}
			;
			if(num.length == 0 || isNaN(num)) {
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
		updateBossRaidCity:  function() {
			this.bossRaider = this.pickBossRaider();
			this.bossTable.bossRaider = this.bossRaider;
			var vis = "hidden";
			var t = this.bossRaider.t;
			if(t != -1) {
				var CI = webfrontend.data.City.getInstance();
				var bS = webfrontend.res.Main.getInstance();
				this.bossUnitImage.setSource("webfrontend/" + bS.imageFiles[bS.units[t].mimg]);
				var uinfo = CI.getUnitTypeInfo(t);
				this.bossUnitLabel.setValue(this.formatNumber(uinfo.count));
				vis = "visible";
			}
			this.bossUnitImage.setVisibility(vis);
			this.bossUnitLabel.setVisibility(vis);
		},
		getObfuscatedNames:  function() {
			if(!this.worldData) {
				var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
				for(var key in worldDataRoot) {
					if(worldDataRoot[key] instanceof Object) {
						if(worldDataRoot[key].hasOwnProperty("d") && worldDataRoot[key].hasOwnProperty("c")) {
							this.worldData = worldDataRoot[key];
							break;
						}
					}
				}
			}
			if(this.objData == "none" && this.worldData) {
				for(var cluster in this.worldData.d) {
					for(var key in this.worldData.d[cluster]) {
						var d = this.worldData.d[cluster][key];
						if(d.hasOwnProperty("d")) {
							for(var dkey in d.d) {
								if(d.d[dkey].hasOwnProperty("Type"))
									this.objData = key;
								else if(d.d[dkey].hasOwnProperty("Alliance"))
									this.playerData = key;
								else
									this.allianceData = key;
								break;
							}
						}
						if(this.objData != "none" && this.playerData != "none" && this.allianceData != "none")
							break;
					}
					break;
				}
			}
		},
		safeGetProperty:     function(obj, prop) {
			if(obj && obj.hasOwnProperty(prop))
				return obj[prop];
			return null;
		},
		coordsFromCluster:   function(clusterID, coordRef) {
			var clusterY = Math.floor(clusterID / 32);
			var clusterX = clusterID - (clusterY * 32);
			var x = clusterX * 32 + (coordRef & 0xffff);
			var y = clusterY * 32 + (coordRef >> 16);
			return x | (y << 16);
		},
		getAttackType:       function(unitType) {
			switch(unitType) {
				case 17:

				case 16:

				case 15:

				case 14:

				case 13:

				case 2:
					//ballista
					return 3;

				case 12:

				case 7:
					// mage
					return 4;

				case 11:

				case 8:

				case 9:

				case 10:
					// pal
					return 2;

				case 3:

				case 4:

				case 5:

				case 6:
					// zerk
					return 1;
			}
			return 3;
		},
		getUnitsToKill:      function(unitType, boss) {
			var tech = webfrontend.data.Tech.getInstance();
			var resMain = webfrontend.res.Main.getInstance();
			var bossUnit = bossUnitType(boss.BossType, boss.BossLevel);
			var attack = resMain.units[unitType].av;
			var attackType = this.getAttackType(unitType);
			var bonus = tech.getBonus("unitDamage", webfrontend.data.Tech.research, parseInt(unitType)) + tech.getBonus("unitDamage", webfrontend.data.Tech.shrine, parseInt(unitType));
			var def = resMain.units[bossUnit].def[attackType] * 4;
			var units = Math.ceil(def / attack);
			units = Math.ceil(units / (1.0 + (bonus / 100)));
			return units;
		},
		fillBossList:        function() {
			var tech = webfrontend.data.Tech.getInstance();
			var CI = webfrontend.data.City.getInstance();
			var resMain = webfrontend.res.Main.getInstance();
			var bv = CI.getId();
			var cx = bv & 0xFFFF;
			var cy = bv >> 16;
			var raider = this.bossRaider;
			var moveSpeed = raider.s;
			var minLevel = this.getMinBossLevel();
			var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
			var m = this.bossTable.getTableModel();
			if(moveSpeed == 0) {
				m.setData([
					["No units"]
				]);
				return;
			}
			m.setData([]);
			this.getObfuscatedNames();
			if(this.worldData && this.worldData.hasOwnProperty("d")) {
				for(var cluster in this.worldData.d) {
					var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
					if(objectData) {
						for(var obj in objectData) {
							var coord = this.coordsFromCluster(cluster, obj);
							var x = coord & 0xffff;
							var y = coord >> 16;
							var bossCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
							if(bossCont == cont || raider.t == 17) {
								var o = objectData[obj];
								switch(o.Type) {
									case 3:
										if(o.State && o.BossType != 12 && raider.t != 17 && o.BossLevel >= minLevel) {
											/*
											 var tmp = "";
											 for( var key in o ){
											 tmp += ":" + key;
											 }
											 alert(tmp);
											 */
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
											m.addRows([
												[bossName(o.BossType), o.BossLevel, x + ":" + y, dist.toFixed(2), webfrontend.Util.getTimespanString(dist * moveSpeed), this.getUnitsToKill(raider.t, o)]
											]);
										} else if(o.State && o.BossType == 12 && raider.t == 17 && o.BossLevel >= minLevel) {
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
											m.addRows([
												[bossName(o.BossType), o.BossLevel, x + ":" + y, dist.toFixed(2), webfrontend.Util.getTimespanString(dist * moveSpeed), this.getUnitsToKill(raider.t, o)]
											]);
										}
										break;
								}
							}
						}
					}
				}
			}
			m.sortByColumn(4, true);
		},

		createIdleUnitsPage:    function() {
			var idleUnitsPage = new qx.ui.tabview.Page("Lazy Troops");
			idleUnitsPage.setLayout(new qx.ui.layout.VBox(2));
			var container = new qx.ui.container.Composite();
			container.setLayout(new qx.ui.layout.HBox());
			this.cityGroups = new qx.ui.form.SelectBox().set({
				width:    50,
				alignY:   "middle",
				tabIndex: 1
			});
			var li = new qx.ui.form.ListItem("All cities", null, 0);
			li.cids = [];
			this.cityGroups.add(li);
			var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_citybar_groups_hilighted.png");
			img.setAlignY("middle");
			this.cityGroups._addAt(img, 0);
			var player = webfrontend.data.Player.getInstance();
			for(var ii = 0; ii < player.citygroups.length; ++ii) {
				li = new qx.ui.form.ListItem(player.citygroups[ii].n + " [" + player.citygroups[ii].c.length + "]", null, player.citygroups[ii].i);
				li.cids = player.citygroups[ii].c;
				this.cityGroups.add(li);
			}
			container.add(this.cityGroups);
			var btn = new qx.ui.form.Button("Refresh");
			btn.addListener("click", function() {
				this.targetTable.refresh();
			});
			container.add(btn);
			var value = localStorage.getItem("mt__autoUpdateCB");
			this.autoUpdate = new qx.ui.form.CheckBox("Rfrsh").set({
				marginLeft: 2
			});
			;
			this.autoUpdate.setToolTipText("If unchecked, the data won't refresh until you click the refresh button.<br/>May solve some performance issues with flashing screen.");
			container.add(this.autoUpdate);
			this.autoUpdate.setValue(value == null || value.toLowerCase() == "true");
			this.autoUpdate.addListener("changeValue", function(e) {
				var val = this.autoUpdate.getValue();
				localStorage.setItem("mt__autoUpdateCB", val);
			}, this);
			value = localStorage.getItem("mt__excludeShipsCB");
			this.excludeShips = new qx.ui.form.CheckBox("No ships").set({
				marginLeft: 3
			});
			;
			this.excludeShips.setToolTipText("Won't list ships when checked");
			container.add(this.excludeShips);
			this.excludeShips.setValue(value != null && value.toLowerCase() == "true");
			this.excludeShips.addListener("changeValue", function(e) {
				var val = this.excludeShips.getValue();
				localStorage.setItem("mt__excludeShipsCB", val);
			}, this);
			container.add(new qx.ui.core.Spacer(), {
				flex: 1
			});
			var excludeLabel = new qx.ui.basic.Label().set({
				alignY:      "middle",
				marginRight: 4,
				marginLeft:  4
			});
			excludeLabel.setValue("Min ts");
			container.add(excludeLabel);
			value = localStorage.getItem("mt__excludeTsLt");
			this.excludeTs = new qx.ui.form.TextField();
			this.excludeTs.setWidth(40);
			this.excludeTs.addListener("input", function(e) {
				var value = this.getValue();
				var clean = value.match(/\d+/g);
				clean = clean ? clean.join("") : "";
				if(value != clean) {
					this.setValue(null);
					this.setValue(clean);
				}
			}, this.excludeTs);
			this.excludeTs.set({
				toolTipText: "Exclude cities where the idle ts less than this value."
			});
			var app = qx.core.Init.getApplication();
			app.setElementModalInput(this.excludeTs);
			this.excludeTs.setValue(value && value.length > 0 ? value : "");
			container.add(this.excludeTs);
			this.excludeTs.addListener("changeValue", function(e) {
				var val = this.excludeTs.getValue();
				localStorage.setItem("mt__excludeTsLt", val);
			}, this);
			var excludeLabel = new qx.ui.basic.Label().set({
				alignY:      "middle",
				marginRight: 4,
				marginLeft:  4
			});
			excludeLabel.setValue("Exclude ref");
			container.add(excludeLabel);
			value = localStorage.getItem("mt__excludeIdleRefs");
			this.excludeIf = new qx.ui.form.TextField();
			this.excludeIf.set({
				toolTipText: "Exclude cities where the city reference contains this text. (comma separated list)"
			});
			this.excludeIf.setWidth(80);
			var app = qx.core.Init.getApplication();
			app.setElementModalInput(this.excludeIf);
			this.excludeIf.setValue(value && value.length > 0 ? value : "");
			container.add(this.excludeIf);
			this.excludeIf.addListener("changeValue", function(e) {
				var val = this.excludeIf.getValue();
				localStorage.setItem("mt__excludeIdleRefs", val);
			}, this);
			idleUnitsPage.add(container);
			idleUnitsPage.add(ava.ui.IdleRaidUnitsTable.getInstance(), {
				flex: 1
			});

			//ava.ui.IdleRaidUnitsTable.getInstance().setHeight(300);
			btn.targetTable = ava.ui.IdleRaidUnitsTable.getInstance();
			btn.autoUpdate = this.autoUpdate;
			return idleUnitsPage;
		},
		cityGroupSelected:      function(e) {
			paDebug("Execute button: " + this.getLabel());
		},
		createBossPage:         function() {
			var bossPage = new qx.ui.tabview.Page("Boss Raiding");
			bossPage.setLayout(new qx.ui.layout.VBox(2));
			var container = new qx.ui.container.Composite();
			container.setLayout(new qx.ui.layout.HBox());
			var btn = new qx.ui.form.Button("World");
			btn.addListener("click", function() {
				var bv = webfrontend.data.City.getInstance().getId();
				var cx = bv & 0xFFFF;
				var cy = bv >> 16;
				var app = qx.core.Init.getApplication();
				webfrontend.gui.Util.showMapModeViewPos('r', 0, cx, cy);
				var server = webfrontend.data.Server.getInstance();
				var cont = server.getContinentFromCoords(cx, cy);
				var cent = server.getContinentCentrePoint(cont);
				webfrontend.gui.Util.showMapModeViewPos('w', 0, cent.x, cent.y);
			});
			container.add(btn);
			btn = new qx.ui.form.Button("Find Bosses");
			btn.addListener("click", this.fillBossList, this);
			container.add(btn);
			container.add(new qx.ui.core.Spacer(), {
				flex: 1
			});
			var lbl = new qx.ui.basic.Label();
			lbl.setRich(true);
			lbl.setAlignY("middle");
			this.bossUnitLabel = lbl;
			container.add(lbl);
			container.add(new qx.ui.core.Spacer().set({
				width: 10
			}));
			var img = new qx.ui.basic.Image();
			img.setWidth(24);
			img.setHeight(24);
			img.setScale(true);
			img.setAlignY("middle");
			this.bossUnitImage = img;
			container.add(img);
			bossPage.add(container);
			var tableModel = new qx.ui.table.model.Simple();
			var columnNames = ["Type", "Level", "Pos", "Dist", "Travel", "Units"];
			tableModel.setColumns(columnNames);
			tableModel.setSortMethods(4, function(row1, row2) {
				return Number(row1[3]) - Number(row2[3]);
			});
			var custom = {
				tableColumnModel: function(obj) {
					return new qx.ui.table.columnmodel.Resize(obj);
				}
			};
			this.bossTable = new qx.ui.table.Table(tableModel, custom);

			//this.bossTable.setHeight(300);
			this.bossTable.onCellClick = function(event) {
				switch(event.getColumn()) {
					case 2:
						// coords
						var spl = this.getTableModel().getValue(event.getColumn(), event.getRow()).split(":");
						var x = Number(spl[0]);
						var y = Number(spl[1]);
						var app = qx.core.Init.getApplication();
						app.showSendArmy(x, y, false, webfrontend.gui.SendArmyWindow.pages.raid);
						webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
						if(this.bossRaider && this.bossRaider.t != -1) {
							var saw = app.sendArmyWidget;
							var units = null;

							for(var key in saw) {
								if(saw[key] && saw[key].hasOwnProperty("1")) {
									if(saw[key]["1"] && saw[key]["1"].hasOwnProperty("cityinfo") && saw[key]["1"].hasOwnProperty("ui")) {
										//debug( "Found it! at " + key );
										units = saw[key];
										units[this.bossRaider.t].ui.input.setValue(this.getTableModel().getValue(5, event.getRow()));
										break;
									}
								}
							}
						}
						break;
					case 6:
						break;
				}
			};
			this.bossTable.addListener("cellClick", this.bossTable.onCellClick, this.bossTable);
			var columnModel = this.bossTable.getTableColumnModel();
			columnModel.setColumnVisible(3, false);
			var linkStyle = new qx.ui.table.cellrenderer.Default();
			linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
			columnModel.setDataCellRenderer(2, linkStyle);
			bossPage.add(this.bossTable, {
				flex: 1
			});
			return bossPage;
		},
		createPvpPage:          function() {

			var pvpPage = new qx.ui.tabview.Page("Cache/Pvp");
			pvpPage.setLayout(new qx.ui.layout.VBox(2));
			var tableModel = new qx.ui.table.model.Simple();

			//						var columnNames = ["x", "City", "Coords", "Player", "ref", "Dist", "TS", "Alliance","cid", "Remove"];
			var pvpColumnNames = [
				"X",
				"City",
				"Coords",
				"Player",
				"Alliance",
				"ref",
				"Dist",
				"TS",
				"cid",
				"pid",
				"XX"
			];

			tableModel.setColumns(pvpColumnNames);
			/* tableModel.setSortMethods(5,function(row1,row2) {
			 return Number(row1[5])-Number(row2[5]);
			 });*/
			var custom = {
				tableColumnModel: function(obj) {
					return new qx.ui.table.columnmodel.Resize(obj);
				}
			};
			this.pvpTable = new qx.ui.table.Table(tableModel, custom);

			//this.bossTable.setHeight(300);
			this.pvpTable.onDataEdited = function(e) {
				var m = this.getTableModel();

				var data = e.getData();
				/* switch (data.col) {
				 case 6:
				 if (data.value != "max")
				 m.setValue(7, data.row, "1");
				 break;
				 case 7:
				 if (data.value != "1")
				 m.setValue(6, data.row, "max");
				 break;
				 }*/
			};
			this.pvpTable.onCellClick = function(event) {
				var col = event.getColumn();
				var row = event.getRow();
				console.log(col);
				var colName = this.getTableModel().getValue(0, row);
				console.log(colName);
				var currentData = this.getTableModel().getValue(col, row);
				console.log(col + " " + row + " " + currentData);
				var rf = qx.core.Init.getApplication();

				switch(col) {
					case 0:
					{
						if(currentData != "0")
							m.setValue(0, row, "0");
						else
							m.setValue(0, row, "1");
					}
						break;
					case 3:
					{
						rf.showInfoPage(rf.getPlayerInfoPage(), {
							name: currentData
						});
					}
						break;
					case 4:
					{
						rf.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, {
							name: currentData
						});
					}
						break;
					case 1:
					{
						var spl = currentData.split(":");
						if(spl.length > 1) {
							webfrontend.gui.Util.openCityProfile(parseInt(spl[0], 10), parseInt(spl[1], 10));
						}
					}
						break;
					case 2:
					{
						var spl = currentData.split(":");
						var x = Number(spl[0]);
						var y = Number(spl[1]);
						rf.showSendArmy(x, y, false, webfrontend.gui.SendArmyWindow.pages.pvp);
						webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
					}
						break;
					case 10:
					{
						this.setShowCellFocusIndicator(false);
						this.getTableModel().removeRows(event.getRow(), 1);
					}
						break;
				}
			};
			this.pvpTable.setShowCellFocusIndicator(false);
			this.pvpTable.addListener("cellClick", this.pvpTable.onCellClick, this.pvpTable);
			this.pvpTable.addListener("dataEdited", this.pvpTable.onDataEdited, this.pvpTable);
			var columnModel = this.pvpTable.getTableColumnModel();
			columnModel.setColumnVisible(3, false);
			var imgStyle = new qx.ui.table.cellrenderer.Image();
			var linkStyle = new qx.ui.table.cellrenderer.Default();
			linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");

			///       var pvpColumnNames = [0 "x",1 "City",2 "Coords",3 "Player",
			///							/* 4 */ "Alliance",/* 5 */ "ref",/* 6 */ "Dist",
			///                          /* 7 */ "TS",/* 8 */"cid",/* 9 */ "pid",/*10*/ "Remove"];
			tableModel.setColumnEditable(0, true);
			columnModel.setDataCellRenderer(1, linkStyle);
			columnModel.setDataCellRenderer(2, linkStyle);
			columnModel.setDataCellRenderer(3, linkStyle);
			columnModel.setDataCellRenderer(4, linkStyle);

			tableModel.setColumnEditable(5, true);
			tableModel.setColumnEditable(6, true);
			tableModel.setColumnEditable(7, true);
			tableModel.setColumnEditable(8, true);
			tableModel.setColumnEditable(9, true);
			//  tableModel.setColumnEditable(10,true);
			columnModel.setColumnVisible(5, false);
			columnModel.setColumnVisible(6, false);
			columnModel.setColumnVisible(7, false);
			columnModel.setColumnVisible(8, false);
			columnModel.setColumnVisible(9, false);

			// columnModel.setDataCellRenderer(4, linkStyle);
			columnModel.setDataCellRenderer(10, imgStyle);
			// columnModel.setColumnWidth(8, 20, false);

			pvpPage.add(new qx.ui.basic.Label("Stores a cache of all cities that you have clicked.  I.e. click the first on to go back to the most recently click city "));
			var row = new qx.ui.container.Composite();
			row.setLayout(new qx.ui.layout.HBox());

			row.add(new qx.ui.basic.Label("Expected Losses:").set({
				alignY: "middle"
			}));
			var sel = new qx.ui.form.SelectBox().set({
				width:         55,
				alignY:        "middle",
				paddingLeft:   4,
				paddingRight:  4,
				paddingTop:    0,
				paddingBottom: 0,
				marginRight:   8,
				toolTipText:   "Amount of troops to remove from subsequent plunders to account for losses from each plunder."
			});
			sel.add(new qx.ui.form.ListItem("None"));
			sel.add(new qx.ui.form.ListItem("5%"));
			sel.add(new qx.ui.form.ListItem("10%"));
			sel.add(new qx.ui.form.ListItem("15%"));
			sel.add(new qx.ui.form.ListItem("20%"));
			sel.add(new qx.ui.form.ListItem("25%"));
			sel.setSelection([sel.getChildren()[0]]);
			sel.pvp = this;
			this.lossPercent = 0;
			sel.addListener("changeSelection", function(e) {
				this.pvp.lossPercent = e.getData()[0].getLabel() == "None" ? 0 : parseInt(e.getData()[0].getLabel());
			});
			row.add(sel);

			row.add(new qx.ui.basic.Label("Max TS:").set({
				alignY: "middle"
			}));
			sel = new qx.ui.form.SelectBox().set({
				width:         60,
				alignY:        "middle",
				paddingLeft:   4,
				paddingRight:  4,
				paddingTop:    0,
				paddingBottom: 0,
				marginRight:   8,
				toolTipText:   "Allows you to reserve some troops to account for losses rather than only assume % loss."
			});
			sel.add(new qx.ui.form.ListItem("100%"));
			sel.add(new qx.ui.form.ListItem("95%"));
			sel.add(new qx.ui.form.ListItem("90%"));
			sel.setSelection([sel.getChildren()[1]]);
			sel.pvp = this;
			this.startingPercent = 95;
			sel.addListener("changeSelection", function(e) {
				this.pvp.startingPercent = parseInt(e.getData()[0].getLabel());
			});
			row.add(sel);
			var btn = new qx.ui.form.Button("Plunder").set({
				marginLeft:    10,
				paddingLeft:   8,
				paddingRight:  8,
				paddingTop:    2,
				paddingBottom: 2,
				alignY:        "center",
				enabled:       true
			});
			btn.pvp = this;
			btn.addListener("click", function() {
				// this.pvp.clearRaidErrorWindow();
				this.pvp.pvpTable.stopEditing();
				var sendTime = this.pvp.getDelay5sOffsetTime();
				var startingPctMultiplier = (this.pvp.startingPercent / 100);
				var lossDivisor = (this.pvp.lossPercent / 100) + 1;
				var CI = webfrontend.data.City.getInstance();
				var cid = CI.getId();
				var x = cid & 0xFFFF;
				var y = cid >> 16;
				var m = this.pvp.pvpTable.getTableModel();
				var data = m.getData();
				var numRows = m.getRowCount();
				var sendMode = 2;
				var availUnits = ava.CombatTools.getAvailableUnits(CI, false);
				var speed = 0;
				var units = [];
				for(var ii = 0; ii < availUnits.land.length; ++ii) {
					if(!ava.CombatTools.DO_NOT_PLUNDER_UNITS[availUnits.land[ii].type]) {
						var tmpCount = Math.floor(availUnits.land[ii].count * startingPctMultiplier);
						if(tmpCount > 0) {
							speed = Math.max(speed, this.pvp.getSpeed(availUnits.land[ii].type));
							units.push({
								ts: availUnits.land[ii].unitTS,
								t:  availUnits.land[ii].type,
								c:  tmpCount
							});
						}
					}
				}
				var sendTime = this.pvp.getDelay5sOffsetTime();
				var commandManager = webfrontend.net.CommandManager.getInstance();
				var secs = 0;
				for(var ii = 0; ii < numRows; ++ii) {
					if(data[ii][6] == "max") {
						var rpt = parseInt(data[ii][7]);
						for(b = rpt; b > 0; --b) {
							var sndUnits = [];
							for(var a = 0; a < units.length; ++a) {
								if(units[a].c > 0) {
									sndUnits.push({
										t: units[a].t,
										c: units[a].c
									});
									var amt = Math.floor(units[a].c / lossDivisor);
									units[a].c = Math.max(0, amt);
								}
							}
							var request = {
								cityid:                     cid,
								units:                      sndUnits,
								targetPlayer:               data[ii][0],
								targetCity:                 data[ii][4],
								order:                      2,
								transport:                  1,
								createCity:                 "",
								timeReferenceType:          sendMode,
								referenceTimeUTCMillis:     sendTime + 1000,
								raidTimeReferenceType:      0,
								raidReferenceTimeUTCMillis: 0,
								iUnitOrderOptions:          0,
								iOrderCountRaid:            0
							};
							commandManager.sendCommand("OrderUnits", request, null, function() {
							});
							var tcid = Number(String(data[ii][3]).replace(',', ''));
							var cx = tcid & 0xFFFF;
							var cy = tcid >> 16;
							var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
							secs += Math.ceil(5 + (speed * 2 * dist));
							var hours = Math.floor(secs / (60 * 60));
							var divisor_for_minutes = secs % (60 * 60);
							var minutes = Math.floor(divisor_for_minutes / 60);
							var divisor_for_seconds = divisor_for_minutes % 60;
							var seconds = Math.ceil(divisor_for_seconds);
							sendTime = this.pvp.getDelayWithOffsetTime(hours, minutes, seconds);
						}
					}
				}
				var remainingTs = 0;
				for(var a = 0; a < units.length; ++a) {
					if(units[a].c > 0) {
						remainingTs += units[a].c * units[a].ts;
					}
				}
				var totalTs = remainingTs;
				var tsSent = 0;
				var dist = 0;
				for(var ii = 0; ii < numRows; ++ii) {
					if(data[ii][6] != "max") {
						var tsSpecified = parseInt(data[ii][6]);
						if(tsSpecified > 0) {
							if(tsSpecified > remainingTs) {
								remainingTs = 0;
								for(var a = 0; a < units.length; ++a) {
									var amt = Math.floor(units[a].c / lossDivisor);
									units[a].c = Math.max(0, amt);
									if(amt > 0) {
										remainingTs += amt * units[a].ts;
									}
								}
								totalTs = remainingTs;
								secs += Math.ceil(5 + (speed * 2 * dist));
								var hours = Math.floor(secs / (60 * 60));
								var divisor_for_minutes = secs % (60 * 60);
								var minutes = Math.floor(divisor_for_minutes / 60);
								var divisor_for_seconds = divisor_for_minutes % 60;
								var seconds = Math.ceil(divisor_for_seconds);
								sendTime = this.pvp.getDelayWithOffsetTime(hours, minutes, seconds);
								dist = 0;
							}
							if(remainingTs > 0 && tsSpecified < remainingTs) {
								var sendMultiplier = tsSpecified / totalTs;
								var sndUnits = [];
								for(var a = 0; a < units.length; ++a) {
									var amt = Math.floor(units[a].c * sendMultiplier);
									if(amt > 0) {
										remainingTs -= amt * units[a].ts;
										sndUnits.push({
											t: units[a].t,
											c: amt
										});
									}
								}
								var request = {
									cityid:                     cid,
									units:                      sndUnits,
									targetPlayer:               data[ii][0],
									targetCity:                 data[ii][4],
									order:                      2,
									transport:                  1,
									createCity:                 "",
									timeReferenceType:          sendMode,
									referenceTimeUTCMillis:     sendTime + 1000,
									raidTimeReferenceType:      0,
									raidReferenceTimeUTCMillis: 0,
									iUnitOrderOptions:          0,
									iOrderCountRaid:            0
								};
								commandManager.sendCommand("OrderUnits", request, null, function() {
								});
								var tcid = Number(String(data[ii][3]).replace(',', ''));
								var cx = tcid & 0xFFFF;
								var cy = tcid >> 16;
								dist = Math.max(dist, Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)));
							}
						}
					}
				}
				m.removeRows(0, m.getRowCount());
			});
			row.add(btn);
			btn = new qx.ui.form.Button("Clear").set({
				marginLeft:    8,
				paddingLeft:   8,
				paddingRight:  8,
				paddingTop:    2,
				paddingBottom: 2,
				alignY:        "center",
				enabled:       true
			});
			btn.pvp = this;
			btn.addListener("click", function() {
				var tm = this.pvp.pvpTable.getTableModel();
				tm.removeRows(0, tm.getRowCount());
			});
			row.add(btn);
			pvpPage.add(row);
			pvpPage.add(this.pvpTable, {
				flex: 1
			});
			this.pvpTroopContainer = new qx.ui.container.Composite();
			this.pvpTroopContainer.setLayout(new qx.ui.layout.HBox().set({
				spacing: 4
			}));
			pvpPage.add(this.pvpTroopContainer);
			return pvpPage;
		},
		GetDungeonModifier:     function(dungeonType) {
			var rv = 1;
			if(this.wantWood.getValue() && dungeonType == 5)
				rv *= distWantModifier;

			if(this.wantStone.getValue() && dungeonType == 3)
				rv *= distWantModifier;

			return rv;
		},
		createDungeonPage:      function() {
			var dungeonPage = new qx.ui.tabview.Page("Dungeons");
			dungeonPage.setLayout(new qx.ui.layout.Dock());

			var layoutContainer = new qx.ui.container.Composite();
			layoutContainer.setLayout(new qx.ui.layout.VBox());

			layoutContainer.add(new qx.ui.basic.Label("Targets"));

			var container = new qx.ui.container.Composite();
			container.setLayout(new qx.ui.layout.Basic());
			container.add(new qx.ui.basic.Label("Type").set({
				alignY: "middle"
			}), {
				top:  0,
				left: 80
			});
			container.add(new qx.ui.basic.Label("Prog").set({
				alignY: "middle"
			}), {
				top:  0,
				left: 130
			});
			container.add(new qx.ui.basic.Label("Coords").set({
				alignY: "middle"
			}), {
				top:  0,
				left: 180
			});
			container.add(new qx.ui.basic.Label("Dist").set({
				alignY: "middle"
			}), {
				top:  0,
				left: 230
			});
			container.add(new qx.ui.basic.Label("Max").set({
				alignY: "middle"
			}), {
				top:  0,
				left: 280
			});
			container.add(new qx.ui.basic.Label("Avg").set({
				alignY: "middle"
			}), {
				top:  0,
				left: 330
			});
			var sel = new qx.ui.form.SelectBox().set({
				width:         77,
				alignY:        "middle",
				paddingLeft:   4,
				paddingRight:  4,
				paddingTop:    0,
				paddingBottom: 0
			});
			sel.add(new qx.ui.form.ListItem("Max+90%"));
			sel.add(new qx.ui.form.ListItem("Max+60%"));
			sel.add(new qx.ui.form.ListItem("Max+30%"));
			sel.add(new qx.ui.form.ListItem("Max+15%"));
			sel.add(new qx.ui.form.ListItem("Max"));

			//sel.add( new qx.ui.form.ListItem( "Mavg" ) );
			//sel.add( new qx.ui.form.ListItem( "Avg" ) );
			//sel.add( new qx.ui.form.ListItem( "Split" ) );
			sel.setSelection([sel.getChildren()[3]]);
			this.raidAddType = sel;
			container.add(sel, {
				top:  0,
				left: 0
			});
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__addType", e.getData()[0].getLabel());
			});
			SelectFromStorage("mm__addType", sel);

			//container.add( new qx.ui.basic.Label("Min"),    {top: 0, left: 350} );
			this.targetContainer = new qx.ui.container.Composite();
			this.targetContainer.setLayout(new qx.ui.layout.VBox().set({
				spacing: 3
			}));
			var scrollContainer = new qx.ui.container.Scroll();
			scrollContainer.add(this.targetContainer);
			scrollContainer.setMaxHeight(250);
			var btn = new qx.ui.form.Button("X").set({
				paddingLeft:   5,
				paddingRight:  5,
				paddingTop:    0,
				paddingBottom: 0
			});
			btn.targetContainer = this.targetContainer;
			btn.addListener("click", function() {
				this.targetContainer.removeAll();
			});
			container.add(btn, {
				top:  0,
				left: 460
			});
			layoutContainer.add(container);
			layoutContainer.add(new qx.ui.core.Widget().set({
				backgroundColor: "#c4a77b",
				height:          2,
				allowGrowX:      true,
				marginTop:       4,
				marginBottom:    2
			}));
			dungeonPage.add(layoutContainer, {
				edge: "north"
			});
			dungeonPage.add(scrollContainer, {
				edge:  "center",
				width: "100%"
			});
			container = new qx.ui.container.Composite();
			container.setLayout(new qx.ui.layout.VBox());
			container.add(new qx.ui.core.Widget().set({
				backgroundColor: "#c4a77b",
				height:          2,
				allowGrowX:      true,
				marginTop:       4,
				marginBottom:    4
			}));
			var subContainer = new qx.ui.container.Composite();
			subContainer.setLayout(new qx.ui.layout.HBox().set({
				spacing: 4
			}));
			subContainer.add(new qx.ui.basic.Label("Troops").set({
				alignY: "middle"
			}));
			this.split = new qx.ui.form.CheckBox("Split").set({
				marginLeft: 5
			});
			this.split.setToolTipText("If checked, adds as many groups as possible at around the level indicated.");
			this.split.initValue(false);
			subContainer.add(this.split);
			this.wantWood = new qx.ui.form.CheckBox("wantWood").set({
				marginLeft: 5
			});
			this.wantWood.setToolTipText("If checked, forests are favoured when dungeontype is flexible.\nCan be used with wantStone.\nExample:  If a the best mountain is up to 5 away and the best forest is 7 away, it will choose the forest.\nIf the mountain is closer or the forest farther, it will choose the mountain.\nThe setting will have no effect if there a many close forest dungeons.");
			this.wantWood.initValue(localStorage.getItem("mm__wantWood"));
			subContainer.add(this.wantWood);
			this.wantStone = new qx.ui.form.CheckBox("wantStone").set({
				marginLeft: 5
			});
			this.wantStone.setToolTipText("See 'getWood'.\n");
			this.wantStone.initValue(localStorage.getItem("mm__wantStone") ? true : false);
			subContainer.add(this.wantStone);

			subContainer.add(new qx.ui.core.Spacer(), {
				flex: 1
			});

			subContainer.add(new qx.ui.basic.Label("Raid:").set({
				alignY: "middle"
			}));
			sel = new qx.ui.form.SelectBox().set({
				width:  80,
				alignY: "middle"
			});

			sel.add(new qx.ui.form.ListItem("Manual"));
			sel.add(new qx.ui.form.ListItem("AvaRaid"));
			sel.add(new qx.ui.form.ListItem("null"));
			sel.add(new qx.ui.form.ListItem("really null")); // don't use this
			sel.add(new qx.ui.form.ListItem("undefined"));
			sel.add(new qx.ui.form.ListItem("NaN"));
			sel.add(new qx.ui.form.ListItem("404"));
			sel.add(new qx.ui.form.ListItem("+0.0"));

			sel.setSelection([sel.getChildren()[0]]);

			//	sel.setToolTipText("Send to the dungeons you have selected.");
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__raidMode", e.getData()[0].getLabel());

				if(e.getData()[0].getLabel() == "NaN") {
					// polite

					this.AvaRaidMode = 3;
				} else if(e.getData()[0].getLabel() == "AvaRaid") {
					sel.setToolTipText("Selects dungeons and raids to send");

					this.AvaRaidMode = 1;
				} else if(e.getData()[0].getLabel() == "+0.0") {

					this.AvaRaidMode = 2;
				} else {
					// default
					sel.setToolTipText("Manual, tedius mode.");
					this.AvaRaidMode = 0;
				}
			}, this);

			// set the initial raid mode

			subContainer.add(sel);
			this.raidModeSel = sel;
			SetSelectionFromStore(sel, "mm__raidMode");
			subContainer.add(new qx.ui.basic.Label("Ratio:").set({
				alignY: "middle"
			}));
			sel = new qx.ui.form.SelectBox().set({
				width:  80,
				alignY: "middle"
			});
			sel.add(new qx.ui.form.ListItem("Available"));
			sel.add(new qx.ui.form.ListItem("Total"));
			sel.add(new qx.ui.form.ListItem("None"));
			if(this.ratioMode == "total")
				sel.setSelection([sel.getChildren()[1]]);
			else if(this.ratioMode == "none")
				sel.setSelection([sel.getChildren()[2]]);

			subContainer.add(sel);
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__ratioOpts", e.getData()[0].getLabel());
				var readOnly = false;
				if(e.getData()[0].getLabel() == "Available")
					this.ratioMode = "count";
				else if(e.getData()[0].getLabel() == "Total")
					this.ratioMode = "total";
				else {
					this.ratioMode = "none";
					readOnly = true;
				}
				this.setTotalsReadOnly(readOnly);
			});
			container.add(subContainer);
			SetSelectionFromStore(sel, "mm__ratioOpts");

			this.troopContainer = new qx.ui.container.Composite();
			this.troopContainer.setLayout(new qx.ui.layout.HBox().set({
				spacing: 4
			}));
			container.add(this.troopContainer);
			container.add(new qx.ui.core.Widget().set({
				backgroundColor: "#c4a77b",
				height:          2,
				allowGrowX:      true,
				marginTop:       4,
				marginBottom:    4
			}));
			this.commandContainer = new qx.ui.container.Composite();
			this.commandContainer.setLayout(new qx.ui.layout.VBox().set({
				spacing: 2
			}));
			var defVis = "hidden";
			subContainer = new qx.ui.container.Composite();
			subContainer.setLayout(new qx.ui.layout.HBox().set({
				spacing: 2
			}));
			sel = new qx.ui.form.SelectBox().set({
				width:    80,
				alignY:   "middle",
				tabIndex: 1
			});
			var _sendTime = sel;
			sel.add(new qx.ui.form.ListItem("Arrive", null, webfrontend.gui.SendArmyWindow.timings.arrive));
			sel.add(new qx.ui.form.ListItem("Depart", null, webfrontend.gui.SendArmyWindow.timings.depart));
			sel.add(new qx.ui.form.ListItem("Delay 5s", null, 100));
			sel.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
			sel.setSelection([sel.getChildren()[3]]);
			//   sel.rw = this;
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__timingOpts", e.getData()[0].getLabel());
				var ch = this.getLayoutParent().getChildren();
				var vis = "visible";
				if(e.getData()[0].getLabel() == "Now" || e.getData()[0].getLabel() == "Delay 5s")
					vis = "hidden";
				for(var i = 1; i <= 6; i++)
					ch[i].setVisibility(vis);
				this.updateAvailableUnits();
			});
			subContainer.add(sel);
			subContainer.add(this.createHMSTextField(defVis, 2));
			subContainer.add(new qx.ui.basic.Label(":").set({
				visibility: defVis,
				alignY:     "middle"
			}));
			subContainer.add(this.createHMSTextField(defVis, 3));
			subContainer.add(new qx.ui.basic.Label(":").set({
				visibility: defVis,
				alignY:     "middle"
			}));
			subContainer.add(this.createHMSTextField(defVis, 4));
			sel = new qx.ui.form.SelectBox().set({
				width:      100,
				visibility: defVis,
				alignY:     "middle",
				tabIndex:   5
			});
			var _sendDay = sel;
			sel.add(new qx.ui.form.ListItem("7 days", null, 7));
			sel.add(new qx.ui.form.ListItem("6 days", null, 6));
			sel.add(new qx.ui.form.ListItem("5 days", null, 5));
			sel.add(new qx.ui.form.ListItem("4 days", null, 4));
			sel.add(new qx.ui.form.ListItem("3 days", null, 3));
			sel.add(new qx.ui.form.ListItem("2 days", null, 2));
			sel.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
			sel.add(new qx.ui.form.ListItem("Today", null, 0));
			sel.setSelection([sel.getChildren()[7]]);
			subContainer.add(sel);
			subContainer.add(new qx.ui.core.Spacer(), {
				flex: 1
			});
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__delayDayOpts", e.getData()[0].getLabel());
			});
			SetSelectionFromStore(sel, "mm__delayDayOpts");
			if(value != null) {
				var opts = sel.getChildren();
				for(var ii = 0; ii < opts.length; ++ii) {
					if(opts[ii].getLabel() == value) {
						sel.setSelection([opts[ii]]);
						break;
					}
				}
			}

			this.departOptions = new qx.ui.form.SelectBox().set({
				width:    88,
				alignY:   "middle",
				tabIndex: 6
			});
			this.departOptions.add(new qx.ui.form.ListItem("Stagger opt", null, 0));
			this.departOptions.add(new qx.ui.form.ListItem("1 min", null, 1));
			this.departOptions.add(new qx.ui.form.ListItem("2 min", null, 2));
			this.departOptions.add(new qx.ui.form.ListItem("5 min", null, 5));
			this.departOptions.add(new qx.ui.form.ListItem("10 min", null, 10));
			this.departOptions.add(new qx.ui.form.ListItem("20 min", null, 20));
			this.departOptions.add(new qx.ui.form.ListItem("30 min", null, 30));
			this.departOptions.add(new qx.ui.form.ListItem("45 min", null, 45));
			this.departOptions.add(new qx.ui.form.ListItem("60 min", null, 60));
			subContainer.add(this.departOptions);
			value = localStorage.getItem("mm__departOpts");
			if(value != null) {
				var opts = this.departOptions.getChildren();
				for(var ii = 0; ii < opts.length; ++ii) {
					if(opts[ii].getLabel() == value) {
						this.departOptions.setSelection([opts[ii]]);
						break;
					}
				}
			}
			this.departOptions.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__departOpts", e.getData()[0].getLabel());
			});
			this.nextIdleCityButton = new webfrontend.ui.SoundButton(null, "webfrontend/theme/scrollbar/scrollbar-right.png").set({
				paddingLeft:   8,
				paddingRight:  8,
				paddingTop:    2,
				paddingBottom: 2,
				marginLeft:    15,
				marginRight:   15,
				alignY:        "center",
				enabled:       false,
				toolTipText:   "Next idle city"
			});
			this.nextIdleCityButton.addListener("click", this.nextIdleRaidCity);
			subContainer.add(this.nextIdleCityButton);

			btn = new qx.ui.form.Button("GO").set({
				paddingLeft:   4,
				paddingRight:  4,
				paddingTop:    2,
				paddingBottom: 2,
				alignY:        "center",
				enabled:       true
			});
			this.autoRaidButton = btn;
			this.goButton = btn;
			btn.setToolTipText("AvaRaid yay!");
			btn.addListener("execute", this.autoRaidPleaseToggle, this);
			subContainer.add(btn);
			this.commandContainer.add(subContainer);

			// detect when user is idle
			window.addEventListener('mousemove', function() {
				ava.ui.RaidingWindow.getInstance().lastMouseMoveTime = webfrontend.Util.getCurrentTime().getTime();
			}, false);

			subContainer = new qx.ui.container.Composite();
			subContainer.setLayout(new qx.ui.layout.HBox().set({
				spacing: 2
			}));
			sel = new qx.ui.form.SelectBox().set({
				width:    80,
				alignY:   "middle",
				tabIndex: 6
			});
			sel.add(new qx.ui.form.ListItem("Once", null, webfrontend.gui.SendArmyWindow.timings.once - webfrontend.gui.SendArmyWindow.timings.once));
			sel.add(new qx.ui.form.ListItem("Return", null, webfrontend.gui.SendArmyWindow.timings.latest - webfrontend.gui.SendArmyWindow.timings.once));
			sel.add(new qx.ui.form.ListItem("Complete", null, webfrontend.gui.SendArmyWindow.timings.completed - webfrontend.gui.SendArmyWindow.timings.once));
			sel.add(new qx.ui.form.ListItem("24 Hours", null, 8));
			sel.add(new qx.ui.form.ListItem("72 Hours", null, 7));
			sel.setSelection([sel.getChildren()[2]]);
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__retOpts", e.getData()[0].getLabel());
				var ch = this.getLayoutParent().getChildren();
				var vis = "hidden";
				if(e.getData()[0].getLabel() == "Return")
					vis = "visible";
				for(var i = 1; i <= 6; i++)
					ch[i].setVisibility(vis);
			});
			sel.addListenerOnce("appear", function() {
				SetSelectionFromStore(sel, "mm__retOpts");
			}, sel);
			subContainer.add(sel);
			var tf = this.createHMSTextField(defVis, 7);
			tf.addListenerOnce("appear", function() {
				var value = localStorage.getItem("mm__retHr");
				this.setValue(value != null ? value : "0");
				if(this.getValue().length == 0) {
					this.setValue("0");
				}
			}, tf);

			console.warn("1");
			tf.addListener("input", function() {
				localStorage.setItem("mm__retHr", this.getValue());
			}, tf);
			subContainer.add(tf);
			subContainer.add(new qx.ui.basic.Label(":").set({
				visibility: defVis,
				alignY:     "middle"
			}));
			console.warn("2");
			var tf = this.createHMSTextField(defVis, 8);
			tf.addListenerOnce("appear", function() {
				var value = localStorage.getItem("mm__retMin");
				this.setValue(value != null ? value : "0");
				if(this.getValue().length == 0) {
					this.setValue("0");
				}
			}, tf);
			tf.addListener("input", function() {
				localStorage.setItem("mm__retMin", this.getValue());
			}, tf);
			subContainer.add(tf);
			subContainer.add(new qx.ui.basic.Label(":").set({
				visibility: defVis,
				alignY:     "middle"
			}));
			console.warn("3");

			var tf = this.createHMSTextField(defVis, 9);
			tf.addListenerOnce("appear", function() {
				var value = localStorage.getItem("mm__retSec");
				this.setValue(value != null ? value : "0");
				if(this.getValue().length == 0) {
					this.setValue("0");
				}
			}, tf);
			tf.addListener("input", function() {
				localStorage.setItem("mm__retSec", this.getValue());
			}, tf);
			subContainer.add(tf);
			sel = new qx.ui.form.SelectBox().set({
				width:      100,
				visibility: defVis,
				alignY:     "middle",
				tabIndex:   10
			});
			sel.add(new qx.ui.form.ListItem("7 days", null, 7));
			sel.add(new qx.ui.form.ListItem("6 days", null, 6));
			sel.add(new qx.ui.form.ListItem("5 days", null, 5));
			sel.add(new qx.ui.form.ListItem("4 days", null, 4));
			sel.add(new qx.ui.form.ListItem("3 days", null, 3));
			sel.add(new qx.ui.form.ListItem("2 days", null, 2));
			sel.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
			sel.add(new qx.ui.form.ListItem("Today", null, 0));
			sel.setSelection([sel.getChildren()[7]]);
			subContainer.add(sel);
			sel.addListener("changeSelection", function(e) {
				localStorage.setItem("mm__retDayOpts", e.getData()[0].getLabel());
			});
			SetSelectionFromStore(sel, "mm__retDayOpts");
			var btn = new qx.ui.form.Button("Refresh").set({
				paddingLeft:   5,
				paddingRight:  5,
				paddingTop:    0,
				paddingBottom: 0
			});
			btn.addListener("click", this.findDungeons, this);

			subContainer.add(btn);
			var btn = new qx.ui.form.Button("Refresh All Types").set({
				paddingLeft:   5,
				paddingRight:  5,
				paddingTop:    0,
				paddingBottom: 0
			});
			btn.rw = this;
			btn.addListener("click", ava.ui.RaidingWindow.findAllDungeons);
			subContainer.add(btn);
			this.commandContainer.add(subContainer);
			container.add(this.commandContainer);
			dungeonPage.add(container, {
				edge: "south"
			});
			return dungeonPage;
		},
		GetRaidGain:            function() {
			var atype = this.raidAddType.getSelection()[0].getLabel();
			var mul = 1;
			if(this.ratioMode == "none")
				return 1;
			if(atype == "Max+90%") {
				mul = 1.9;
			} else if(atype == "Max+60%") {
				mul = 1.6;
			} else if(atype == "Max+30%") {
				mul = 1.3;
			} else if(atype == "Max+15%") {
				mul = 1.15;
			} else if(atype == "Max") {
				mul = 1;
			}
			return mul;
		},
		getTotalCarry:          function(dType) {
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var totalCarry = 0;
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders > 0) {
				var delayedOrders = new Object();
				for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
					if(CI.unitOrders[ii].isDelayed == true) {
						for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
							if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
								delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
							}
							delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
						}
					}
				}
				for(var key in CI.units) {
					var carry = bS.units[key].c;
					if(carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
						var uinfo = CI.getUnitTypeInfo(key);
						var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
						if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(key)) {
							cnt -= delayedOrders[parseInt(key)];
						}
						totalCarry = totalCarry + cnt * carry;
					}
				}
			}
			return totalCarry;
		},
		getTotalDefenseCarry:   function(dType) {
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var totalCarry = 0;
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders > 0) {
				var delayedOrders = new Object();
				for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
					if(CI.unitOrders[ii].isDelayed == true) {
						for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
							if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
								delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
							}
							delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
						}
					}
				}
				for(var key in CI.units) {
					if(this.isUnitDefense(key) && key != "4") {
						var carry = bS.units[key].c;
						if(carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
							var uinfo = CI.getUnitTypeInfo(key);
							var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
							if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(key)) {
								cnt -= delayedOrders[parseInt(key)];
							}
							totalCarry = totalCarry + cnt * carry;
						}
					}
				}
			}
			return totalCarry;
		},
		isUnitDefense:          function(type) {
			var retVal = true;
			switch(type) {
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "8":
				case "9":
				case "10":
				case "13":
				case "14":
				case "15":
				case "16":
				case "19":
				case "77":
					break;
				default:
					retVal = false;
					break;
			}
			return retVal;
		},
		isDefense:              function() {
			var retVal = true;
			for(var key in CI.units) {
				switch(key) {
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "8":
					case "9":
					case "10":
					case "13":
					case "14":
					case "15":
					case "16":
					case "19":
					case "77":
						break;
					default:
						retVal = false;
						break;
				}
			}
			return retVal;
		},
		getUnitBonus:           function(unitType) {
			var research = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, Number(unitType));
			var shrine = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, Number(unitType));
			return (research + shrine) / 100;
		},
		getRemainingTs:         function(dType) {
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var ts = 0;
			var delayedOrders = new Object();
			for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
				if(CI.unitOrders[ii].isDelayed == true) {
					for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
						if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
							delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
						}
						delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					}
				}
			}
			for(var key in CI.units) {
				var carry = bS.units[key].c;
				if(carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
					var uinfo = CI.getUnitTypeInfo(key);
					var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
					if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(key)) {
						cnt -= delayedOrders[parseInt(key)];
					}
					ts = ts + cnt;
				}
			}
			return ts;
		},
		hasMtnOnly:             function(useResearch, zerkMtnOnly) {
			var retVal = false;
			var hasZerk = false;
			var zerkResearch = 0;
			var hasTemplar = false;
			var hasRanger = false;
			var hasGuardian = false;
			var CI = webfrontend.data.City.getInstance();
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			var seaOnly = this.hasSeaOnly();
			if(AvailOrders > 0 && !seaOnly) {
				retVal = true;
				for(var key in CI.units) {
					switch(key) {
						case "1":
							break;
						case "5":
							// temp
							hasTemplar = true;
							break;
						case "6":
							// berserker
							hasZerk = true;
							zerkResearch = this.getUnitBonus(key);
							break;
						case "3":
							// ranger
							hasRanger = true;

							break;
						case "4":
							// guardian
							hasGuardian = true;
							break;
						case "19":
							break;
						case "15":
						case "16":
						case "17":
							break;
						default:
							retVal = false;
							break;
					}
				}
			}
			if(hasGuardian || hasRanger || hasTemplar) {
				retVal = true;
			} else if(hasZerk) {
				retVal = false;
			}
			return retVal;
		},
		hasForestOnly:          function(useResearch) {
			var retVal = false;
			var CI = webfrontend.data.City.getInstance();
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			var seaOnly = this.hasSeaOnly();
			if(AvailOrders > 0 && !seaOnly) {
				for(var key in CI.units) {
					switch(key) {
						case "1":

						case "8":
							break;
						case "9":
							// xbow
							retVal = true;
							break;
						case "10":
							// paladin
							retVal = true;
							break;
						case "19":
							break;
						case "15":
						case "16":
						case "17":
							break;
						default:
							break;
					}
				}
			}
			return retVal;
		},
		hasCav:                 function() {
			var CI = webfrontend.data.City.getInstance();
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders > 0) {
				for(var key in CI.units) {
					switch(key) {
						case "9":

						case "10":

						case "11":
							// Knight
							return true;
							break;
						default:
							break;
					}
				}
			}
			return false;
		},
		hasSeaOnly:             function() {
			var retVal = false;
			var CI = webfrontend.data.City.getInstance();
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders > 0) {
				retVal = true;
				for(var key in CI.units) {
					switch(key) {
						case "1":
						case "19":
						case "15":
						case "16":
						case "17":
							break;
						default:
							retVal = false;
							break;
					}
				}
			}
			return retVal;
		},
		hasSeaOffense:          function() {
			var retVal = false;
			var CI = webfrontend.data.City.getInstance();
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders > 0) {
				retVal = true;
				for(var key in CI.units) {
					switch(key) {
						case "17":
							retVal |= true;
							break;
						default:
							retVal |= false;
							break;
					}
				}
			}
			return retVal;
		},
		getDungeonArray:        function(filterBadTypes) {
			var bS = webfrontend.res.Main.getInstance();
			paDebug("Get Dungeon Array");
			var rw = ava.ui.RaidingWindow.getInstance();
			rw.getObfuscatedNames();
			var dArray = new Array();
			var CI = webfrontend.data.City.getInstance();
			var bv = CI.getId();
			var cx = bv & 0xFFFF;
			var cy = bv >> 16;
			var mul = rw.GetRaidGain();
			var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
			var mtnOnly = filterBadTypes && rw.hasMtnOnly(false);
			var forestOnly = filterBadTypes && rw.hasForestOnly(false);
			var seaOnly = rw.hasSeaOnly();
			var maxDist = seaOnly ? 70 : (rw.hasCav() ? 30 : 15);
			console.log("mtnonly " + mtnOnly + " foestOnly " + forestOnly + "SeaOnly " + seaOnly);
			var st = webfrontend.data.ServerTime.getInstance().getServerStep() - (21 * 3600);
			for(var cluster in rw.worldData.d) {
				var objectData = rw.safeGetProperty(rw.worldData.d[cluster][rw.objData], "d");
				if(objectData) {
					//  console.log("objdata ");  console.dir(objectData);
					for(var obj in objectData) {
						var o = objectData[obj];
						//console.log("o: "); console.dir(o);
						if(o.Type == 2) {
							//console.log("Dungeon!!!");
							var startStep = o.StartStep;
							var coord = rw.coordsFromCluster(cluster, obj);
							var x = coord & 0xffff;
							var y = coord >> 16;
							var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
							var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
							var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));

							// bias for wood / stone
							dist *= rw.GetDungeonModifier(o.DungeonType);

							var totalCarry = rw.getTotalCarry(o.DungeonType);
							var dpt = rw.dungProgressType(o.DungeonType);
							var dpl = o.DungeonLevel - 1;
							var dpp = o.Progress;

							//  var avg=rw.dungeonProgressData[dpt][dpl][dpp][1].toString();
							var max = rw.dungeonProgressData[dpt][dpl][dpp][0]; //.toString();
							// console.log("test " + startStep + " " + st +" " + dist +" " + maxDist +" " + totalCarry +" " + mul +" " + max );
							if(o.State && (o.Progress > 0 || startStep >= st) && (dist < maxDist) && o.Progress < 80 && max > 0 && (totalCarry / (mul * max) > 0.75)) {
								//  console.log("Good!");

								if(mtnOnly) {
									if(o.DungeonType == 4) {
										dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord]);
									}
								} else if(forestOnly) {
									if(o.DungeonType == 5) {
										dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord]);
									}
								} else if(seaOnly) {
									if(o.DungeonType == 2) {
										dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord]);
									}
								} else {
									dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord]);
								}
							}
							// break;
						}
					}
				}
			}
			// sort dungeons by distance
			if(dArray.length > 0) {
				dArray.sort(function(a, b) {
					return Number(a[4]) - Number(b[4]);
				});
			}
			console.log(dArray);
			return dArray;
		},
		findDungeonsI:          function(filterBadTypes) {
			var rw = ava.ui.RaidingWindow.getInstance();
			rw.targetContainer.removeAll();
			rw.updateAvailableUnits();
			// first pass, enumerate and sort
			console.log(rw);
			var dArray = rw.getDungeonArray(filterBadTypes);
			console.log(dArray);
			for(var ii = 0; ii < 16 && ii < dArray.length; ++ii) {
				var found = false;
				var cstr = leftPad(dArray[ii][5], 3, "0") + ":" + leftPad(dArray[ii][6], 3, "0");
				var children = rw.targetContainer.getChildren();
				for(var i = 0; i < children.length; i++) {
					var coords = children[i].getChildren()[3];
					if(coords.getValue() == cstr)
						found = true;
				}
				if(!found) {
					var d = new dung(dArray[ii][0], dArray[ii][1], dArray[ii][2], dArray[ii][7], dArray[ii][4]);
					;
					rw.addDungeonToRaid(d);
				}
			}
		},
		findDungeons:           function() {
			this.findDungeonsI(true);
		},
		findAllDungeons:        function() {
			this.findDungeonsI(false);
		},
		nextIdleRaidCityI:      function(moveView) {
			var table = ava.ui.IdleRaidUnitsTable.getInstance();

			var tm = table.getTableModel();

			if(tm.getRowCount() > table.curRow && tm.getColumnCount() > 0) {
				if(tm.getValue(0, table.curRow) == table.curId) {
					++table.curRow;
					if(tm.getRowCount() <= table.curRow) {
						table.curRow = 0;
					}
				}
				table.curId = tm.getValue(0, table.curRow);
			}
			var x = table.curId & 0xffff;
			var y = table.curId >> 16;
			webfrontend.data.City.getInstance().setRequestId(table.curId);
			if(moveView)
				webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
		},
		nextIdleRaidCity:       function() {
			this.nextIdleRaidCityI(true);
		},
		nextIdleRaidCityNoMove: function() {
			this.nextIdleRaidCityI(false);
		},
		setTotalsReadOnly:      function(readOnly) {
			var targets = this.targetContainer.getChildren();
			for(var target = 0; target < targets.length; target++) {
				var raids = targets[target].getChildren()[0].raidcontainer.getChildren();
				for(var raid = 0; raid < raids.length; raid++) {
					var thisRaid = raids[raid];
					var ch = thisRaid.getChildren();
					for(var i = 0; i < ch.length; i++) {
						if(ch[i] instanceof qx.ui.form.TextField) {
							if(ch[i].unitType == null) {
								ch[i].setReadOnly(readOnly);
								ch[i].setEnabled(!readOnly);
							}
						}
					}
				}
			}
		},
		onRaidCountInput:       function(textField) {
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var unitType = textField.unitType;
			var delayedOrders = new Object();
			for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
				if(CI.unitOrders[ii].isDelayed == true) {
					for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
						if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
							delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
						}
						delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					}
				}
			}
			if(unitType == null) {
				if(this.ratioMode != "none") {
					// figure out how many units are needed to bring this much loot
					var lootToCarry = Number(textField.getValue());
					var totalCarry = 0;
					var hch = textField.getLayoutParent().getChildren();
					for(var k = 0; k < hch.length; k++) {
						if(hch[k] instanceof qx.ui.form.TextField) {
							if(hch[k].unitType != null) {
								var uinfo = CI.getUnitTypeInfo(hch[k].unitType);
								var cnt = uinfo[this.ratioMode];
								if(this.ratioMode != "total" && delayedOrders.hasOwnProperty(hch[k].unitType)) {
									cnt -= delayedOrders[parseInt(hch[k].unitType)];
								}
								totalCarry = totalCarry + (cnt * bS.units[hch[k].unitType].c);
							}
						}
					}
					for(var k = 0; k < hch.length; k++) {
						if(hch[k] instanceof qx.ui.form.TextField) {
							if(hch[k].unitType != null) {
								var uinfo = CI.getUnitTypeInfo(hch[k].unitType);
								var tcnt = uinfo[this.ratioMode];
								if(this.ratioMode != "total" && delayedOrders.hasOwnProperty(hch[k].unitType)) {
									tcnt -= delayedOrders[parseInt(hch[k].unitType)];
								}
								var cnt = Math.floor((lootToCarry / totalCarry) * tcnt);
								hch[k].setValue(cnt.toString());
							}
						}
					}
				}
			} else {
				// set the other unit types to the same percentage, and then set the total loot field
				var uinfo = CI.getUnitTypeInfo(unitType);
				var cnt = Number(textField.getValue());
				var tcnt = uinfo[this.ratioMode];
				if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(unitType)) {
					tcnt -= delayedOrders[parseInt(unitType)];
				}
				var pct = cnt == 0 ? 0 : cnt / tcnt;
				var lootTotal = cnt * bS.units[unitType].c;
				var hch = textField.getLayoutParent().getChildren();
				for(var k = 0; k < hch.length; k++) {
					if(hch[k] instanceof qx.ui.form.TextField) {
						if(hch[k] != textField) {
							if(hch[k].unitType == null) {
								// set the total
								hch[k].setValue(lootTotal.toString());
							} else {
								uinfo = CI.getUnitTypeInfo(hch[k].unitType);
								if(this.ratioMode == "none") {
									cnt = Number(hch[k].getValue());
								} else {
									cnt = Math.floor(pct * tcnt);
									hch[k].setValue(cnt.toString());
								}
								lootTotal = lootTotal + cnt * bS.units[hch[k].unitType].c;
							}
						}
					}
				}
			}
			this.updateAvailableUnits();
		},

		onAddMaxRaids:         function(addButton) {
			var c = addButton.getLayoutParent();
			var max = Number(c.getChildren()[5].getValue());
			var avg = Number(c.getChildren()[6].getValue());
			var val = 0;
			var mul = this.GetRaidGain();
			val = Math.floor(max * mul);

			return this.addMaxRaids(addButton, max, avg, val, mul);
		},
		onAddMaxRaid:          function(addButton, maxOrders, allowMin, keepAlive) {
			var atype = this.raidAddType.getSelection()[0].getLabel();
			var c = addButton.getLayoutParent();
			var max = Number(c.getChildren()[5].getValue());
			var avg = Number(c.getChildren()[6].getValue());
			var val = 0;
			var mul = 1;
			if(this.ratioMode != "none") {
				if(atype == "Max+90%") {
					mul = 1.9;
				} else if(atype == "Max+60%") {
					mul = 1.6;
				} else if(atype == "Max+30%") {
					mul = 1.3;
				} else if(atype == "Max+15%") {
					mul = 1.15;
				} else if(atype == "Max") {
					mul = 1;
				}
			}
			val = keepAlive ? 30 : Math.floor(max * mul);
			return this.addConserveRaids(addButton, max, avg, val, mul, maxOrders, allowMin);
		},
		onAddRaidButton:       function(addButton) {
			var atype = this.raidAddType.getSelection()[0].getLabel();
			var c = addButton.getLayoutParent();
			var max = Number(c.getChildren()[5].getValue());
			var avg = Number(c.getChildren()[6].getValue());
			var val = 0;
			var mul = 1;
			if(this.ratioMode != "none") {
				if(atype == "Max+90%") {
					mul = 1.9;
				} else if(atype == "Max+60%") {
					mul = 1.6;
				} else if(atype == "Max+30%") {
					mul = 1.3;
				} else if(atype == "Max+15%") {
					mul = 1.15;
				} else if(atype == "Max") {
					mul = 1;
				}
				/*
				 else if( atype == "Mavg" )
				 val = (max + avg)/2;
				 else if( atype == "Avg" )
				 val = avg;
				 */
			}
			val = Math.floor(max * mul);
			if(this.split.getValue()) {
				this.addSplit(addButton, max, avg, val, mul);
			} else {
				this.addRaid(addButton, Math.floor(val));
			}
		},
		addSplit:              function(addButton, max, avg, val, mul) {
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var totalCarry = 0;
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders == 0)
				return;
			var dType = addButton.d.type;
			var delayedOrders = new Object();
			for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
				if(CI.unitOrders[ii].isDelayed == true) {
					for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
						if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
							delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
						}
						delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					}
				}
			}
			for(var key in CI.units) {
				var carry = bS.units[key].c;
				if(carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
					var uinfo = CI.getUnitTypeInfo(key);
					var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
					if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(key)) {
						cnt -= delayedOrders[parseInt(key)];
					}
					totalCarry = totalCarry + cnt * carry;
				}
			}
			var min = Math.floor(max * (mul - 0.1));
			var orders = totalCarry / val;
			if(orders < 1)
				orders = 1;
			else {
				var iOrders = Math.floor(orders);
				var carryPerOrder = totalCarry / iOrders;
				if(carryPerOrder / val > 1.1 && totalCarry / (iOrders + 1) > min && iOrders + 1 <= AvailOrders)
					orders = iOrders + 1;
				else
					orders = iOrders;
			}
			if(orders > AvailOrders)
				orders = AvailOrders;
			var c = Math.floor(totalCarry / orders);
			for(var i = 0; i < orders; i++)
				this.addRaid(addButton, c);
		},
		addMaxRaids:           function(addButton, max, avg, val, mul) {
			var retVal = 0;
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var totalCarry = 0;
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders == 0)
				return 0;
			var dType = addButton.d.type;
			var delayedOrders = new Object();
			for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
				if(CI.unitOrders[ii].isDelayed == true) {
					for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
						if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
							delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
						}
						delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					}
				}
			}
			for(var key in CI.units) {
				var carry = bS.units[key].c;
				if(carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
					var uinfo = CI.getUnitTypeInfo(key);
					var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
					if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(key)) {
						cnt -= delayedOrders[parseInt(key)];
					}
					totalCarry = totalCarry + cnt * carry;
				}
			}
			var min = Math.floor(max * (mul - 0.1));
			var orders = totalCarry / val;
			if(orders >= 0.75) {
				if(orders < 1)
					orders = 1;
				var iOrders = Math.floor(orders);
				var carryPerOrder = totalCarry / iOrders;
				var minCarry = totalCarry / (iOrders + 1);
				if(carryPerOrder / val > 1.1 && minCarry > min && iOrders + 1 <= AvailOrders)
					orders = iOrders + 1;
				else {
					orders = iOrders;
				}
			}
			if(orders > 0 && orders <= AvailOrders) {
				var c = Math.floor(totalCarry / orders);
				c = (c / val > 1.1) ? val : c;
				for(var i = 0; i < orders; i++) {
					++retVal;
					this.addRaid(addButton, c);
				}
			}
			return retVal;
		},
		addConserveRaids:      function(addButton, max, avg, val, mul, maxOrders, allowMin) {
			var retVal = 0;
			var CI = webfrontend.data.City.getInstance();
			var bS = webfrontend.res.Main.getInstance();
			var totalCarry = 0;
			var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
			if(AvailOrders == 0)
				return 0;
			if(maxOrders > AvailOrders) {
				maxOrders = AvailOrders;
			}
			var dType = addButton.d.type;
			var delayedOrders = new Object();
			for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
				if(CI.unitOrders[ii].isDelayed == true) {
					for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
						if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
							delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
						}
						delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					}
				}
			}
			for(var key in CI.units) {
				var carry = bS.units[key].c;
				if(carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
					var uinfo = CI.getUnitTypeInfo(key);
					var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
					if((this.ratioMode != "total") && delayedOrders.hasOwnProperty(key)) {
						cnt -= delayedOrders[parseInt(key)];
					}
					totalCarry = totalCarry + cnt * carry;
				}
			}
			var orders = Math.floor(totalCarry / val);
			if(orders < 1 && allowMin) {
				orders = 1;
			}
			if(orders > maxOrders) {
				orders = maxOrders;
			}
			if((orders >= 1) && (orders <= AvailOrders)) {
				var c = Math.floor(totalCarry / orders);
				c = (c >= val) ? val : ((allowMin && c >= Math.floor(val * 0.6)) ? c : 0);
				if(c > 50000) {
					for(var i = 0; i < orders; i++) {
						++retVal;
						this.addRaid(addButton, c);
					}
				}
			}
			return retVal;
		},
		addRaid:               function(addButton, value) {
			var rc = addButton.raidcontainer;
			var bS = webfrontend.res.Main.getInstance();
			var CI = webfrontend.data.City.getInstance();
			var uk = [];
			var dType = addButton.d.type;
			for(var key in CI.units) {
				if(bS.units[key].c > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
					uk[uk.length] = key;
				}
			}
			if(uk.length == 0)
				return;
			var c = new qx.ui.container.Composite();
			c.setLayout(new qx.ui.layout.HBox().set({
				spacing: 5
			}));
			console.log("Sory by unuts");

			uk.sort(function(a, b) {
				return bS.units[a].y - bS.units[b].y;
			});
			for(var i = 0; i < uk.length; i++) {
				var key = uk[i];
				var img = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.units[key].simg]);
				img.setAlignY("middle");
				c.add(img);
				var tf = new qx.ui.form.TextField("").set({
					paddingTop:    0,
					paddingBottom: 0
				});
				tf.setWidth(50);
				tf.unitType = key;
				tf.setAlignY("middle");
				tf.setTextAlign("right");
				tf.rw = this;
				tf.addListener("input", function() {
					this.rw.onRaidCountInput(this);
				});
				tf.addListener("click", function() {
					this.selectAllText();
				});
				c.add(tf);
				c.add(new qx.ui.core.Spacer().set({
					width: 10
				}));
			}
			c.add(new qx.ui.core.Spacer().set({
				width: 30
			}));
			var tf = new qx.ui.form.TextField(value.toString()).set({
				paddingTop:    0,
				paddingBottom: 0
			});
			tf.setWidth(60);
			tf.unitType = null;
			tf.setAlignY("middle");
			tf.setTextAlign("right");
			tf.rw = this;
			tf.addListener("input", function() {
				this.onRaidCountInput();
			});
			tf.addListener("click", function() {
				this.selectAllText();
			});
			if(this.ratioMode == "none") {
				tf.setReadOnly(true);
				tf.setEnabled(false);
			}
			c.add(tf);
			var btn = new qx.ui.form.Button("X").set({
				paddingLeft:   5,
				paddingRight:  5,
				paddingTop:    0,
				paddingBottom: 0,
				alignY:        "middle"
			});
			btn.rw = this;
			btn.addListener("click", function() {
				this.getLayoutParent().destroy();
				this.rw.updateAvailableUnits();
			});
			c.add(btn);
			rc.add(c);
			this.onRaidCountInput(tf);
		},
		updateDungeonRaidInfo: function(dcoord) {
			var x = dcoord & 0xFFFF;
			var y = dcoord >> 16;
			var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
			var children = this.targetContainer.getChildren();
			for(var i = 0; i < children.length; i++) {
				var coords = children[i].getChildren()[3];
				if(coords.getValue() == cstr) {
					if(this.dungeonLootInfo.hasOwnProperty(dcoord)) {
						var di = this.dungeonLootInfo[dcoord];
						children = children[i].getChildren();
						children[5].setValue(di.mx);
						children[6].setValue(di.l);
					}
					break;
				}
			}
		},
		/*
		 */
		createHMSTextField:    function(visibility, tabIndex) {
			var tf = new qx.ui.form.TextField("0").set({
				width:      25,
				visibility: visibility,
				alignY:     "middle",
				tabIndex:   tabIndex
			});
			tf.addListener("click", function() {
				this.selectAllText();
			});
			return tf;
		},
		getAllocatedUnits:     function(unitType) {
			var c = this.targetContainer;
			var ch = c.getChildren();
			var total = 0;
			for(var i = 0; i < ch.length; i++) {
				var addButton = ch[i].getChildren()[0];
				var rch = addButton.raidcontainer.getChildren();
				for(var j = 0; j < rch.length; j++) {
					var hch = rch[j].getChildren();
					for(var k = 0; k < hch.length; k++) {
						if(hch[k] instanceof qx.ui.form.TextField) {
							if(hch[k].unitType == unitType) {
								total += Number(hch[k].getValue());
							}
						}
					}
				}
			}
			return total;
		},
		getAllocatedOrders:    function() {
			var c = this.targetContainer;
			var ch = c.getChildren();
			var total = 0;
			for(var i = 0; i < ch.length; i++) {
				var addButton = ch[i].getChildren()[0];
				var rch = addButton.raidcontainer.getChildren();
				for(var j = 0; j < rch.length; j++) {
					var hch = rch[j].getChildren();
					for(var k = 0; k < hch.length; k++) {
						if(hch[k] instanceof qx.ui.form.TextField) {
							if(Number(hch[k].getValue()) > 0) {
								total++;
								break;
							}
						}
					}
				}
			}
			var CI = webfrontend.data.City.getInstance();
			if(CI.getUnitOrders())
				total += CI.getUnitOrders().length;
			return total;
		},
		pickAndSendRaids:      function() {
			var raidMode = this.raidMode;
			if(raidMode == 0) {
				this.sendRaids(); // manual
			} else {
				//  raidMode == 1, AvaRaid
				this.targetContainer.removeAll();
				var CI = webfrontend.data.City.getInstance();
				var AvailOrders = CI.getOrderLimit() - this.getAllocatedOrders();
				var dArray = this.getDungeonArray(true);
				var cnt = 0;
				var numRaids = 0;
				while(dArray.length > 0 && AvailOrders > 0) {
					cnt = 0;
					for(ii = 0; ii < dArray.length && cnt == 0; ++ii) {

						var d = new dung(dArray[ii][0], dArray[ii][1], dArray[ii][2], dArray[ii][7], dArray[ii][4]);
						;
						var btn = this.addDungeonToRaid(d);
						if(btn != null) {
							cnt += this.onAddMaxRaids(btn);
							AvailOrders -= cnt;
							numRaids += cnt;
							if(this.AvaRaidMode > 1)
								this.addRaidError("Raid [reps:" + cnt + "; ");
							console.dir(d);
						}
					}
					if(cnt <= 0 || AvailOrders <= 0)
						break;
					dArray = this.getDungeonArray(true);
				}
				if(numRaids > 0) {
					this.sendRaids();
				}
			}
		},

		autoRaidPleaseToggle:   function() {
			// manual mode
			if(this.AvaRaidMode == 0) {
				this.pickAndSendRaids();
				return;
			}

			// save settings here in cast we crash or browser closes
			localStorage.setItem("mm__wantStone", this.wantStone.getValue());
			localStorage.setItem("mm__wantWood", this.wantWood.getValue());

			var isAutoRaid = this.AvaRaidMode > 1;
			if(!isAutoRaid) {
				this.raidMode = true; // thurn it on
			} else {
				this.raidMode = !this.raidMode;

				console.log("AutoRaid " + this.raidMode + "--" + this.AvaRaidMode + "--");
			}

			if((this.raidMode == 1) || (!isAutoRaid)) {
				if(isAutoRaid) {
					this.autoRaidButton.setTextColor("Green");

					this.lastMouseMoveTime = webfrontend.Util.getCurrentTime().getTime();

					this.addRaidError("Please do not leave your computer unattended.  Do not get coffee.  Do not go to the bathroom.  You must sit throught this or you are cheating.\n");
				}
				this.autoRaidPlease();
			} else {
				// request stop
				// we enabled again once the stop has actually executed.
				// this.autoRaidButton.setEnabled(false);
				this.autoRaidButton.setTextColor("red");

				this.addRaidError(" Waiting for the raid threads to exit.\n\nWhen done you can turn AvaRaid back on for more raiding goodness. :) ");
			}
		},
		// this gets called every coupld of seconds when AvaRaid is on and permiscuous more is on
		autoRaidPlease:         function() {
			var AvaRaidMode = this.AvaRaidMode;
			var raidMode = this.raidMode;
			var isAutoRaid = AvaRaidMode > 1;

			if(raidMode == 1) {
				var now = webfrontend.Util.getCurrentTime().getTime();
				var lastTime = this.lastMouseMoveTime;

				var timeTillAvaRaidUpdate = (AvaRaidMode == 2) ? 1 * 3 * 1000 : ((AvaRaidMode == 3) ? 5 * 60 * 1000 : -1);
				var timeElapsed = now - lastTime;
				var timeLeft = (timeTillAvaRaidUpdate - timeElapsed) / 1000.0;
				var sTimeLeft = timeLeft;

				if((timeLeft < 0) || (!isAutoRaid)) {
					if(isAutoRaid) {
						this.addRaidError("Player seems to be sleeping.\nTime to send the troops out to play.");
					}
					this.pickAndSendRaids();
					this.nextIdleRaidCity();
				} else {
					this.addRaidError("Player has been idle for long.  Waiting " + sTimeLeft + "more seconds");
					// addRaidError("Idle .. " + sTimeLeft  );
				}
			}

			var timeTillMoveCheck = (AvaRaidMode == 2) ? 5 * 1000 : 60 * 1000;

			if(isAutoRaid && raidMode)
				window.setTimeout(this.autoRaidPlease.bind(this), timeTillMoveCheck);
			else
				this.raidMode = 0;

			if(this.raidMode != 1) {
				// This means that we have recieved a request to terminate
				this.autoRaidButton.setTextColor("Yellow");
				this.autoRaidButton.setEnabled(true);
				return;
			}
		},
		sendRaids:              function() {
			// clearRaidErrorWindow();
			console.log("Sending raids");
			var rw = ava.ui.RaidingWindow.getInstance();
			var CI = webfrontend.data.City.getInstance();
			var sendTime = 0;
			var sendContainer = rw.commandContainer.getChildren()[0];
			var sendMode = sendContainer.getChildren()[0].getSelection()[0].getModel();
			var staggerMin = rw.departOptions.getSelection()[0].getModel();
			if(sendMode != webfrontend.gui.SendArmyWindow.timings.now) {
				if(sendMode == 100) {
					sendMode = webfrontend.gui.SendArmyWindow.timings.depart;
					sendTime = rw.getDelay5sOffsetTime();
				} else {
					sendTime = rw.getOffsetTime(sendContainer.getChildren()[6].getSelection()[0].getModel(), Number(sendContainer.getChildren()[1].getValue()), Number(sendContainer.getChildren()[3].getValue()), Number(sendContainer.getChildren()[5].getValue()));
				}
			}
			if(staggerMin > 0 && sendMode == webfrontend.gui.SendArmyWindow.timings.now) {
				sendMode = webfrontend.gui.SendArmyWindow.timings.depart;
				sendTime = rw.getDelay5sOffsetTime();
			}

			//sendTime = ava.CombatTools.convertGameTimeToUtc(sendTime);
			var returnTime = 0;
			var returnContainer = rw.commandContainer.getChildren()[1];
			var returnMode = returnContainer.getChildren()[0].getSelection()[0].getModel();
			if(returnMode == 7 || returnMode == 8 || (returnMode + webfrontend.gui.SendArmyWindow.timings.once) == webfrontend.gui.SendArmyWindow.timings.latest) {
				if(returnMode == 7) {
					returnMode = webfrontend.gui.SendArmyWindow.timings.latest - webfrontend.gui.SendArmyWindow.timings.once;
					returnTime = rw.getDelay72HrOffsetTime();
				} else if(returnMode == 8) {
					returnMode = webfrontend.gui.SendArmyWindow.timings.latest - webfrontend.gui.SendArmyWindow.timings.once;
					returnTime = rw.getDelay24HrOffsetTime();
				} else {
					returnTime = rw.getOffsetTime(returnContainer.getChildren()[6].getSelection()[0].getModel(), Number(returnContainer.getChildren()[1].getValue()), Number(returnContainer.getChildren()[3].getValue()), Number(returnContainer.getChildren()[5].getValue()));
				}
			}

			var targets = rw.targetContainer.getChildren();
			console.log(targets);
			var tmpSendTime = sendTime;
			for(var target = 0; target < targets.length; target++) {
				var raids = targets[target].getChildren()[0].raidcontainer.getChildren();
				for(var raid = 0; raid < raids.length; raid++) {
					var units = [];
					var thisRaid = raids[raid];
					var ch = thisRaid.getChildren();
					for(var i = 0; i < ch.length; i++) {
						if(ch[i] instanceof qx.ui.form.TextField) {
							if(ch[i].unitType && Number(ch[i].getValue()) > 0) {
								units.push({
									t: ch[i].unitType,
									c: Number(ch[i].getValue())
								});
							}
						}
					}

					var updateManager = webfrontend.net.UpdateManager.getInstance();
					sendTime = tmpSendTime + (raid * staggerMin * 60000);
					var data = {
						cityid:                     CI.getId(),
						units:                      units,
						targetPlayer:               "",
						targetCity:                 targets[target].getChildren()[3].getValue(),
						order:                      8,
						transport:                  1,
						createCity:                 "",
						timeReferenceType:          sendMode,
						referenceTimeUTCMillis:     sendTime,
						raidTimeReferenceType:      returnMode,
						raidReferenceTimeUTCMillis: returnTime,
						iUnitOrderOptions:          0,
						iOrderCountRaid:            1
					};

					//rw.OrderData = data;
					webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", data, rw, rw.onRaidSent, thisRaid);
				}
			}
		},
		clearRaidErrorWindow:   function() {
			if(ava.ui.RaidingWindow.getInstance().raidErrorWin) {
				ava.ui.RaidingWindow.getInstance().raidErrorWin.lbl.setValue("");
			}
		},
		showRaidErrorWindow:    function() {
			if(ava.ui.RaidingWindow.getInstance().raidErrorWin == null || ava.ui.RaidingWindow.getInstance().raidErrorWin.lbl == null) {
				var win = new qx.ui.window.Window("Raid Status");
				win.setLayout(new qx.ui.layout.Grow());
				win.set({
					showMaximize:  false,
					showMinimize:  false,
					allowMaximize: false,
					width:         300,
					height:        200
				});

				var container = new qx.ui.container.Scroll();

				win.lbl = new qx.ui.basic.Label("").set({
					rich: true
				});

				container.add(win.lbl);
				win.add(container);

				win.addListener("close", function() {
					ava.ui.RaidingWindow.getInstance().raidErrorWin = null;
				}, this);

				//this.a.desktop.add( win );
				win.center();
				win.open();
				ava.ui.RaidingWindow.getInstance().raidErrorWin = win;
			}
		},
		addRaidError:           function(msg) {
			ava.ui.RaidingWindow.getInstance().showRaidErrorWindow();
			if(ava.ui.RaidingWindow.getInstance().raidErrorWin)
				ava.ui.RaidingWindow.getInstance().raidErrorWin.lbl.setValue(msg + "<br><br>" + ava.ui.RaidingWindow.getInstance().raidErrorWin.lbl.getValue());
		},
		onRaidSent:             function(comm, result, v) {
			if(!comm || result == null) {
				this.addRaidError("Comm failed");
			} else if(result.r0 == 0 && result.r1 == 0) {
				v.destroy();
			} else {
				switch(result.r0) {
					case 0:
						logEntry = "Successful raid sent";
						break;
					case (1 << 2):
						logEntry = "Not enough units.";
						break;
					case (1 << 6):
						logEntry = "Not enough command slots.";
						break;
					case (1 << 22):
						logEntry = "Delayed order in the past";
						break;
					case 2097152:
						logEntry = "War minister is not appointed.";
						break;
					default:
						logEntry = "Unknown Error: " + result.r0;
						break;
				}
				this.addRaidError(logEntry);
			}
		},
		getOffsetTime:          function(dayOffset, hours, mins, secs) {
			var curTime = webfrontend.Util.getCurrentTime();
			var hourOffset = 0;
			if(webfrontend.config.Config.getInstance().getTimeZone() > 0) {
				//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
				hourOffset += curTime.getTimezoneOffset() / 60;
				if(webfrontend.config.Config.getInstance().getTimeZone() == 1)
					hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
				else if(webfrontend.config.Config.getInstance().getTimeZone() == 2)
					hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
			}
			var hI = new Date(curTime.getTime());
			hI.setDate(hI.getDate() + dayOffset);
			hI.setHours(hours - hourOffset);
			hI.setMinutes(mins);
			hI.setSeconds(secs);
			hI.setMilliseconds(500);
			if(webfrontend.config.Config.getInstance().getTimeZone() == 0)
				hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
			return hI.getTime();
		},
		getDelay72HrOffsetTime: function() {
			var curTime = webfrontend.Util.getCurrentTime();
			var hourOffset = 0;
			if(webfrontend.config.Config.getInstance().getTimeZone() > 0) {
				//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
				hourOffset += curTime.getTimezoneOffset() / 60;
				if(webfrontend.config.Config.getInstance().getTimeZone() == 1)
					hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
				else if(webfrontend.config.Config.getInstance().getTimeZone() == 2)
					hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
			}
			var hI = new Date(curTime.getTime());
			hI.setDate(hI.getDate() + 3);
			hI.setHours(hI.getHours() - hourOffset);
			hI.setSeconds(hI.getSeconds());
			hI.setMilliseconds(500);
			if(webfrontend.config.Config.getInstance().getTimeZone() == 0)
				hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
			return hI.getTime();
		},
		getDelay24HrOffsetTime: function() {
			// FIXME, merge with getDelay72HrOffsetTime
			var curTime = webfrontend.Util.getCurrentTime();
			var hourOffset = 0;
			if(webfrontend.config.Config.getInstance().getTimeZone() > 0) {
				hourOffset += curTime.getTimezoneOffset() / 60;
				if(webfrontend.config.Config.getInstance().getTimeZone() == 1)
					hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
				else if(webfrontend.config.Config.getInstance().getTimeZone() == 2)
					hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
			}
			var hI = new Date(curTime.getTime());
			hI.setDate(hI.getDate() + 1);
			hI.setHours(hI.getHours() - hourOffset);
			hI.setSeconds(hI.getSeconds());
			hI.setMilliseconds(500);
			if(webfrontend.config.Config.getInstance().getTimeZone() == 0)
				hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
			return hI.getTime();
		},
		getDelayWithOffsetTime: function(hours, minutes, seconds) {
			var curTime = webfrontend.Util.getCurrentTime();
			var hourOffset = 0;
			if(webfrontend.config.Config.getInstance().getTimeZone() > 0) {
				//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
				hourOffset += curTime.getTimezoneOffset() / 60;
				if(webfrontend.config.Config.getInstance().getTimeZone() == 1)
					hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
				else if(webfrontend.config.Config.getInstance().getTimeZone() == 2)
					hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
			}
			var hI = new Date(curTime.getTime());
			hI.setDate(hI.getDate());
			hI.setHours(hI.getHours() + hours - hourOffset);
			hI.setMinutes(hI.getMinutes() + minutes);
			hI.setSeconds(hI.getSeconds() + seconds + 5);
			hI.setMilliseconds(500);
			if(webfrontend.config.Config.getInstance().getTimeZone() == 0)
				hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
			return hI.getTime();
		},
		getDelay5sOffsetTime:   function() {
			var curTime = webfrontend.Util.getCurrentTime();
			var hourOffset = 0;
			if(webfrontend.config.Config.getInstance().getTimeZone() > 0) {
				//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
				hourOffset += curTime.getTimezoneOffset() / 60;
				if(webfrontend.config.Config.getInstance().getTimeZone() == 1)
					hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
				else if(webfrontend.config.Config.getInstance().getTimeZone() == 2)
					hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
			}
			var hI = new Date(curTime.getTime());
			hI.setDate(hI.getDate());
			hI.setHours(hI.getHours() - hourOffset);
			hI.setSeconds(hI.getSeconds() + 5);
			hI.setMilliseconds(500);
			if(webfrontend.config.Config.getInstance().getTimeZone() == 0)
				hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
			return hI.getTime();
		},
		getDelay8sOffsetTime:   function() {
			var curTime = webfrontend.Util.getCurrentTime();
			var hourOffset = 0;
			if(webfrontend.config.Config.getInstance().getTimeZone() > 0) {
				//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
				hourOffset += curTime.getTimezoneOffset() / 60;
				if(webfrontend.config.Config.getInstance().getTimeZone() == 1)
					hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
				else if(webfrontend.config.Config.getInstance().getTimeZone() == 2)
					hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
			}
			var hI = new Date(curTime.getTime());
			hI.setDate(hI.getDate());
			hI.setHours(hI.getHours() - hourOffset);
			hI.setSeconds(hI.getSeconds() + 8);
			hI.setMilliseconds(500);
			if(webfrontend.config.Config.getInstance().getTimeZone() == 0)
				hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
			return hI.getTime();
		},
		updateAvailableUnits:   function() {
			console.log("here1");
			;
			var rw = ava.ui.RaidingWindow.getInstance();
			console.log("here2");
			;
			var departNow = (rw.commandContainer.getChildren()[0].getChildren()[0].getSelection()[0].getLabel() == "Now");
			var okToSend = true;
			var haveOrders = false;
			var CI = webfrontend.data.City.getInstance();
			var delayedOrders = new Object();
			for(var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
				if(CI.unitOrders[ii].isDelayed == true) {
					for(var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
						if(!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
							delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
						}
						delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					}
				}
			}
			var pvpContainer = rw.pvpTroopContainer;
			console.log("here2");
			pvpContainer.removeAll();
			var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_command_slots.png");
			img.setWidth(16);
			img.setHeight(16);
			img.setScale(true);
			img.setAlignY("middle");
			pvpContainer.add(img);
			var orders = rw.getAllocatedOrders();
			if(orders > 0)
				haveOrders = true;
			var lbl = new qx.ui.basic.Label((CI.getOrderLimit() - orders).toString() + "/" + CI.getOrderLimit());
			lbl.setRich(true);
			lbl.setAlignY("middle");
			if(orders > CI.getOrderLimit()) {
				lbl.setTextColor("red");
				okToSend = false;
			}
			pvpContainer.add(lbl);
			pvpContainer.add(new qx.ui.core.Spacer().set({
				width: 10
			}));
			var bS = webfrontend.res.Main.getInstance();
			var uk = [];
			var totalTS = 0;
			for(var key in CI.units) {
				if(bS.units[key].c > 0) {
					uk[uk.length] = key;
				}
			}
			console.log("helllo sort");

			uk.sort(function(a, b) {
				return bS.units[a].y - bS.units[b].y;
			});
			for(var i = 0; i < uk.length; i++) {
				var key = uk[i];
				var img = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.units[key].mimg]);
				img.setWidth(24);
				img.setHeight(24);
				img.setScale(true);
				img.setAlignY("middle");
				pvpContainer.add(img);
				var uinfo = CI.getUnitTypeInfo(key);
				var cnt = uinfo.count - rw.getAllocatedUnits(key);
				if(delayedOrders.hasOwnProperty(key)) {
					cnt -= delayedOrders[parseInt(key)];
				}
				var lbl = new qx.ui.basic.Label(cnt + " / " + uinfo.total);
				lbl.setRich(true);
				lbl.setAlignY("middle");
				if(cnt < 0) {
					lbl.setTextColor("red");
					if(departNow)
						okToSend = false;
				}
				totalTS += cnt * bS.units[key].uc;
				pvpContainer.add(lbl);
			}
			console.log(uk.length);

			if(uk.length == 0) {
				var lbl = new qx.ui.basic.Label("No Available Units");
				lbl.setRich(true);
				lbl.setAppearance("textheader_sub1");
				pvpContainer.add(lbl);
			}
			var container = rw.troopContainer;
			container.removeAll();
			var CI = webfrontend.data.City.getInstance();
			var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_command_slots.png");
			img.setWidth(16);
			img.setHeight(16);
			img.setScale(true);
			img.setAlignY("middle");
			container.add(img);
			var orders = rw.getAllocatedOrders();
			if(orders > 0)
				haveOrders = true;
			var lbl = new qx.ui.basic.Label((CI.getOrderLimit() - orders).toString() + "/" + CI.getOrderLimit());
			lbl.setRich(true);
			lbl.setAlignY("middle");
			if(orders > CI.getOrderLimit()) {
				lbl.setTextColor("red");
				okToSend = false;
			}
			container.add(lbl);
			container.add(new qx.ui.core.Spacer().set({
				width: 10
			}));
			var bS = webfrontend.res.Main.getInstance();
			var uk = [];
			var totalTS = 0;
			for(var key in CI.units) {
				if(bS.units[key].c > 0) {
					uk[uk.length] = key;
				}
			}
			console.log("helllo by unuts");

			uk.sort(function(a, b) {
				return bS.units[a].y - bS.units[b].y;
			});
			for(var i = 0; i < uk.length; i++) {
				var key = uk[i];
				var img = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.units[key].mimg]);
				img.setWidth(24);
				img.setHeight(24);
				img.setScale(true);
				img.setAlignY("middle");
				container.add(img);
				var uinfo = CI.getUnitTypeInfo(key);
				var cnt = uinfo.count - rw.getAllocatedUnits(key);
				if(delayedOrders.hasOwnProperty(key)) {
					cnt -= delayedOrders[parseInt(key)];
				}
				var lbl = new qx.ui.basic.Label(cnt + " / " + uinfo.total);
				lbl.setRich(true);
				lbl.setAlignY("middle");
				if(cnt < 0) {
					lbl.setTextColor("red");
					if(departNow)
						okToSend = false;
				}
				totalTS += cnt * bS.units[key].uc;
				container.add(lbl);
			}
			if(uk.length == 0) {
				var lbl = new qx.ui.basic.Label("No Available Units");
				lbl.setRich(true);
				lbl.setAppearance("textheader_sub1");
				container.add(lbl);
			}
			console.log("done!");

			var btn = this.commandContainer.getChildren()[0].getChildren()[10];
		},
		updateDungeonRaidCity:  function() {
			var CI = webfrontend.data.City.getInstance();
			var bv = CI.getId();
			var cx = bv & 0xFFFF;
			var cy = bv >> 16;
			this.setCaption(CI.getName() + "  " + webfrontend.gui.Util.formatCityCoordsFromId(CI.getId(), true));
			this.targetContainer.removeAll();
			this.updateAvailableUnits();
		},
		clearPvpCities:         function() {
			var tm = this.pvpTable.getTableModel();
			tm.removeRows(0, tm.getRowCount());
		},
		onCityChange:           function() {
			this.updateDungeonRaidCity();
			this.updateBossRaidCity();

			//this.clearPvpCities();
			this.fillBossList();
			this.findDungeons();
		}
	}
});
;
