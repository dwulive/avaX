///<reference path="avaDec.ts" />
declare var qx : any;

//
 /**
 * Created by David on 10/8/13.
 */

 function Mod10(i) {
    return i = Math.floor(i/10) * 10;
 }

 function checkTime(i) {
	  if(i < 10) {
		 i = "0" + i;
	 }
	 return i;
 }

function formatIncomingDate(dte) {
	var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
	var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
	var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
	var localOffset = -new Date().getTimezoneOffset() * 60000;

	// Its in minutes

	dte.setTime(dte.getTime() + serverOffset - localOffset);

	var today = new Date(Date.now()).getDate();
	var day = dte.getDate() - today;
	if(day < 0)
		day += 31; // todo - how many days this month?

	var h = dte.getHours();
	var m = dte.getMinutes();
	var s = dte.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	return day + ' ' + h + ':' + m + ':' + s;
}

function FormatTime(timeMs) {
	var hourGain = 60 * 60 * 1000;
	var minGain = 60 * 1000;
	var secGain = 1000;
	var hours = Math.floor(timeMs * (1.0 / hourGain));
	timeMs -= hours * hourGain;
	var mins = Math.floor(timeMs * (1.0 / minGain));
	timeMs -= mins * minGain;
	var sec = Math.floor(timeMs);

	return checkTime(hours) + ":" + checkTime(mins) + ':' + checkTime(sec);
}

function formatReportId(reportId) {
	var retVal = "";
	if(reportId.length == 16) {
		var seg1 = reportId.substring(0, 4);
		var seg2 = reportId.substring(4, 8);
		var seg3 = reportId.substring(8, 12);
		var seg4 = reportId.substring(12);
		retVal = seg1 + "-" + seg2 + "-" + seg3 + "-" + seg4;
	}
	return retVal;
}

var citySort = null;
var sendCnt = 0;
var serverTime = webfrontend.data.ServerTime.getInstance();
var player = webfrontend.data.Player.getInstance();
var aco = webfrontend.data.Alliance.getInstance();
var bw = webfrontend.ui.BrandBoostWrapper.getInstance();
var subIncomingOffImg = null;
var subIncomingImg = null;
var subNames = null;
var _oTech = null;

function checkForSubAttacks(results, thisObj) {
	try {
		var hasAttacks = "";
		var IncomingAttacks;
		if(results != null) {
			if(results.hasOwnProperty("a")) {
				IncomingAttacks = results.a;
			} else {
				if(results[0].hasOwnProperty("a"))
					IncomingAttacks = results[0].a;
			}
			if(IncomingAttacks != null) {
				for(var ii = 0; ii < subNames.length; ++ii) {
					for(var i = 0; i < IncomingAttacks.length; ++i) {
						if(IncomingAttacks[i].tpn.toLowerCase() == subNames[ii]) {
							hasAttacks += (hasAttacks.length > 0 ? ", " : "") + subNames[ii];
							break;
						}
					}
				}
			}
		}
		if(hasAttacks.length > 0) {
			if(subIncomingImg.getToolTipText() != "Incoming for " + hasAttacks) {
				subIncomingImg.setSource('resource/webfrontend/ui/icons/icon_attack_warning.gif');
				subIncomingImg.setToolTipText("Incoming for " + hasAttacks);
			}
		} else {
			if(subIncomingImg.getToolTipText() != "Incoming for " + hasAttacks) {
				subIncomingImg.setSource('resource/webfrontend/ui/icons/icon_alliance_outgoing_attack_warning_inactive.png');
				var sub = subNames.join(',');
				subIncomingImg.setToolTipText("No incomings for " + sub);
			}
		}
		if(subIncomingImg.getVisibility() != "visible") {
			subIncomingImg.setVisibility("visible");
		}
	} catch(ex) {
		paDebug(ex);
	}
	/* (e) {
	 console.debug("Error");
	 console.dir(e);
	 } */
}


qx.Class.define("ava.IncomingAttacksWindow", {
	type:      "singleton",
	//       extend : qx.ui.table.simple.Simple,
	extend:    qx.ui.window.Window,
	construct: function() {
		this.base(arguments, 'Alliance Incoming Attacks');
		this.buildUI();
		this.addListener("appear", this.onOpen, this);
		this.addListener("disappear", this.onClose, this);
	},
	members:   {
		worldData:            null,
		objData:              "none",
		playerData:           "none",
		allianceData:         "none",
		_wcText:              null,
		_subText:             null,
		_table:               null,
		_contSelect:          null,
		_incomingAttacks:     new Array(),
		_outgoingAttacks:     new Array(),
		_filterOwn:           null,
		_allianceBonuses:     new Object(),
		onClose:              function() {
			removeConsumer("ALL_AT", this.dispatchResults, this);
		},
		checkForShipAttack:   function(sourceCid, targetX, targetY, sec, isOwn, aid) {
			var commandManager = webfrontend.net.CommandManager.getInstance();
			commandManager.sendCommand("GetOrderTargetInfo", {
				cityid: sourceCid,
				"x":    targetX,
				"y":    targetY
			}, null, function(ok, res) {
				if(ok && res != null) {
					console.log("getorderTarget");
					var dist = Number(res.dw);
					sec -= 3600;
					sec = sec == 0 ? 1 : sec;
					dist = (dist == 0 ? 1 : dist);
					var diffMs = ((sec * 1000) / dist);
					var diffSec = Math.ceil(diffMs / 1000);
					var ship = Math.round((Math.round((5 / (diffSec / 60) - 1) * 100) * 10) / 10);
					var iaw = ava.IncomingAttacksWindow.getInstance();
					if(iaw._allianceBonuses.hasOwnProperty(aid)) {
						ship -= (iaw._allianceBonuses[aid].sse);
					}
					var strShip;
					if((ship == 0) || (ship == 1) || (ship == 3) || (ship == 6) || (ship > 6 && ship <= 50 && ((ship % 5) == 0))) {
						strShip = "Ships possible if attacking player has " + ship + "% travel speed research.";
					} else {
						strShip = "Not ships, player would need " + ship + "% travel speed research.";
					}
					var win = new qx.ui.window.Window("Check ship attack");
					win.setLayout(new qx.ui.layout.VBox(2));
					win.set({
						showMaximize:  false,
						showMinimize:  false,
						allowMaximize: false,
						width:         400,
						height:        80
					});

					win.lbl = new qx.ui.basic.Label(strShip).set({
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
						win.hide();
					});

					win.addListener("close", function() {
					}, this);
					win.center();
					win.open();
				}
			});
		},
		getAllianceBonuses:   function() {
			webfrontend.net.CommandManager.getInstance().sendCommand("AllianceGetRange", {
				"start":     0,
				"end":       1000,
				"continent": -1,
				"sort":      7,
				"ascending": true,
				"type":      2
			}, this, function(ok, response) {
				if(ok && response != null) {
					var count = response.length;
					for(var ii = 0; ii < count; ++ii) {
						{
							var item = response[ii];
							var aid = response[ii].i.toString();
							var num = Number(item.cp) / 2;
							this._allianceBonuses[aid] = new Object();
							this._allianceBonuses[aid].ics = Math.min(num, 50);
							var num = Number(item.op) / 2;
							this._allianceBonuses[aid].sse = Math.min(num, 50);
							var num = Number(item.sp) / 2;
							this._allianceBonuses[aid].b = Math.min(num, 50);
							this._allianceBonuses[aid].n = item.n;
							this._allianceBonuses[aid].at = item.at;
						}
						/* (e) {
						 console.log("Error");
						 console.dir(e);
						 } */
					}
				}
			});
		},
		onOpen:               function() {
			this.getAllianceBonuses();
			console.debug("dispatch for riading?");
			addConsumer("ALL_AT", this.dispatchResults, this, "a");
		},
		buildUI:              function() {
			this.getAllianceBonuses();
			var app = qx.core.Init.getApplication();
			this.serverTime = webfrontend.data.ServerTime.getInstance();
			var _mtPn = player.getName();
			this.pName = _mtPn;
			this.setLayout(new qx.ui.layout.VBox(10));
			this.set({
				allowMaximize:  true,
				allowMinimize:  true,
				showMaximize:   false,
				showMinimize:   false,
				showStatusbar:  false,
				showClose:      false,
				contentPadding: 5,
				useMoveFrame:   true,
				resizable:      true
			});
			console.log("incoming build ui");
			//this.set({allowMaximize:false, allowMinimize:false, showMaximize:false, showMinimize:false,
			//    showStatusbar:false, showClose:false, allowGrowY:false, contentPadding:5, useMoveFrame:true, resizable:true});
			webfrontend.gui.Util.formatWinClose(this);
			var tabView = new qx.ui.tabview.TabView();
			var page1 = new qx.ui.tabview.Page("Incoming Grid", "");
			page1.setLayout(new qx.ui.layout.VBox());
			var firstRow = new qx.ui.container.Composite();
			firstRow.setLayout(new qx.ui.layout.HBox(5));
			firstRow.set({
				width: 1200
			});
			console.log("add " + firstRow);

			page1.add(firstRow);
			this._filterOwn = new qx.ui.form.CheckBox("Show only my cities");
			this._filterOwn.setToolTipText("Show only my cities");
			this._filterOwn.initValue(false);
			console.log("add1 " + this._filterOwn);

			firstRow.add(this._filterOwn);
			this._filterOwn.addListener("changeValue", this.redrawGrid, this);
			this._contSelect = new qx.ui.form.SelectBox();
			this._contSelect.setMaxWidth(100);
			console.log("add2 " + this._contselect);

			firstRow.add(this._contSelect);

			// sub notification
			var value = localStorage.getItem("mt__subValues");
			this._subText = new qx.ui.form.TextField();
			this._contSelect.setMaxWidth(300);
			this._subText.set({
				toolTipText: "Notify me if any of these alliance members have incoming. (comma separated list)"
			});
			app.setElementModalInput(this._subText);
			if(value != null && value.length > 0) {
				this._subText.setValue(value);
				this.setSub();
			} else {
				this._subText.setValue("");
			}
			firstRow.add(this._subText);
			this._subText.addListener("changeValue", this.setSub, this);

			//var lbl = new qx.ui.basic.Label("If the target city needs more towers the attack may be incorrectly reported as ship. Click ship cell to verify ship incoming with enough towers.");
			//lbl.setAlignY("middle");
			//firstRow.add(lbl);
			this._contSelect.addListener("changeSelection", this.redrawGrid, this);
			this._table = new qx.ui.table.model.Simple();
			var columnNames = ["MG", "Internal", "Player", "Target", "Cont", "Coords", "Time", "Attacker", "Alliance", "Source", "AttCoords", "Spotted", "Baron", "Siege", "Infantry", "Cav", "Scout", "Ship", "allianceId", "Travel Time"];
			var columnIDs = columnNames;
			this._table.setColumnIds(columnIDs);
			this._table.setColumns(columnNames);
			this._table.setCaseSensitiveSorting(false);
			this._table.sortByColumn(6, true);
			var table = new qx.ui.table.Table(this._table).set({
				height: 400
			});
			var columnModel = table.getTableColumnModel();

			//columnModel.setColu"mnVisible( 3, false );
			var shipRenderer = new qx.ui.table.cellrenderer.Conditional();
			shipRenderer.addRegex("^[\\?]", "center", "blue", "text-decoration:underline", "normal", null);
			var mgStyle = new qx.ui.table.cellrenderer.Image();
			var linkStyle = new qx.ui.table.cellrenderer.Default();
			linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
			columnModel.setDataCellRenderer(0, mgStyle);
			columnModel.setDataCellRenderer(2, linkStyle);
			columnModel.setDataCellRenderer(3, linkStyle);
			columnModel.setDataCellRenderer(5, linkStyle);
			columnModel.setDataCellRenderer(7, linkStyle);
			columnModel.setDataCellRenderer(8, linkStyle);
			columnModel.setDataCellRenderer(9, linkStyle);
			columnModel.setDataCellRenderer(10, linkStyle);
			columnModel.setDataCellRenderer(17, shipRenderer);
			columnModel.setColumnWidth(0, 30);
			columnModel.setColumnWidth(1, 50);
			columnModel.setColumnWidth(2, 70);
			columnModel.setColumnWidth(3, 70);
			columnModel.setColumnWidth(4, 40);
			columnModel.setColumnWidth(5, 60);
			columnModel.setColumnWidth(6, 120);
			// columnModel.setColumnVisible(6,false);

			columnModel.setColumnWidth(7, 70);
			columnModel.setColumnWidth(8, 70);
			columnModel.setColumnWidth(9, 70);
			columnModel.setColumnWidth(10, 60);
			columnModel.setColumnWidth(11, 120);
			columnModel.setColumnVisible(11, false);

			columnModel.setColumnWidth(12, 50);
			columnModel.setColumnWidth(13, 50);
			columnModel.setColumnWidth(14, 50);
			columnModel.setColumnWidth(15, 50);
			columnModel.setColumnWidth(16, 50);
			columnModel.setColumnWidth(17, 50);
			columnModel.setColumnVisible(18, false);
			columnModel.setColumnWidth(18, 50);
			columnModel.setColumnWidth(19, 50);
			table.onCellClick = function(event) {
				var spl = this.getTableModel().getValue(event.getColumn(), event.getRow());
				switch(event.getColumn()) {
					case 2:
					case 7:
					{
						var rf = qx.core.Init.getApplication();
						rf.showInfoPage(rf.getPlayerInfoPage(), {
							name: spl
						});
					}
						break;
					case 8:
					{
						var rM = qx.core.Init.getApplication();
						rM.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, {
							name: spl
						});
					}
						break;
					case 3:
					{
						spl = this.getTableModel().getValue(5, event.getRow());
						spl = spl.split(":");
						if(spl.length > 1) {
							webfrontend.gui.Util.openCityProfile(parseInt(spl[0], 10), parseInt(spl[1], 10));
						}
					}
						break;
					case 9:
					{
						spl = this.getTableModel().getValue(10, event.getRow());
						spl = spl.split(":");
						if(spl.length > 1) {
							spl = convertCoordinatesToId(spl[0], spl[1]);
							var rf = qx.core.Init.getApplication();
							rf.showInfoPage(rf.getCityInfoPage(), {
								id:           spl,
								onlyCity:     true,
								showLocation: true
							});
						}
					}
						break;
					case 5:

					case 10:
					{
						spl = spl.split(":");
						if(spl.length > 1) {
							var _x = Number(spl[0]);
							var _y = Number(spl[1]);
							var app = qx.core.Init.getApplication();
							webfrontend.gui.Util.showMapModeViewPos('r', 0, _x, _y);
						}
					}
						break;
					case 17:
					{
						if(spl == "?") {
							var aid = this.getTableModel().getValue(18, event.getRow());
							var targetPlayer = this.getTableModel().getValue(2, event.getRow());
							var isOwn = (targetPlayer == _mtPn);
							var sourceCoords = this.getTableModel().getValue(10, event.getRow());
							var targetCoords = this.getTableModel().getValue(5, event.getRow());
							var coords = targetCoords.split(":");
							var targetX = coords[0];
							var targetY = coords[1];
							var targetCid = convertCoordinatesToId(targetX, targetY);
							coords = sourceCoords.split(":");
							var x = coords[0];
							var y = coords[1];
							var sourceCid = convertCoordinatesToId(x, y);
							var arrivalTime = new Date(this.getTableModel().getValue(6, event.getRow()));
							var dispatchTime = new Date(this.getTableModel().getValue(11, event.getRow()));
							var ms = arrivalTime.getTime() - dispatchTime.getTime();
							var sec = Math.ceil(ms / 1000);
							if(Number(targetX) != 0 && Number(targetY) != 0) {
								this.checkForShipAttack(sourceCid, targetX, targetY, sec, isOwn, aid);
							}
						}
					}
						break;
				}
			};
			table.checkForShipAttack = this.checkForShipAttack;
			table.addListener("cellClick", table.onCellClick, table);
			page1.add(table);
			tabView.add(page1);
			var page2 = new qx.ui.tabview.Page("Incoming Export", "");
			page2.setLayout(new qx.ui.layout.VBox());
			this._wcText = new qx.ui.form.TextArea();
			this._wcText.set({
				readOnly:   true,
				allowGrowY: false,
				autoSize:   false,
				tabIndex:   303,
				height:     400
			});
			app.setElementModalInput(this._wcText);
			this._wcText.setValue("");
			page2.add(this._wcText);
			tabView.add(page2);

			this.add(tabView);
			var w = qx.bom.Viewport.getWidth(window);
			var h = qx.bom.Viewport.getHeight(window);
			var wh = Math.floor(h * 0.45);
			this.set({
				width:  1200,
				height: wh
			});
		},
		setSub:               function() {
			var hasNames = false;
			var sub = this._subText.getValue();
			localStorage.setItem("mt__subValues", sub);
			var subnNames= {};
			if(sub.length > 0) {
				//noinspection ReuseOfLocalVariableJS
				subNames = sub.split(/[,;]/g);
				for(var ii = 0; ii < subNames.length; ++ii) {
					subNames[ii] = subNames[ii].trim().toLowerCase();
					if(subNames[ii].length > 0) {
						hasNames = true;
					} else {
						subNames[ii] = "";
					}
				}
			}
			if(hasNames) {
				console.debug("me for attacking");

				addConsumer("ALL_AT", checkForSubAttacks, this, "a");
			} else {
				removeConsumer("ALL_AT", checkForSubAttacks, this);
				subIncomingImg.setVisibility("hidden");
				subIncomingImg.setToolTipText("");
			}
		},
		refresh:              function() {
			//this.attacksContainer.removeAll();
		},
		getRequestDetails:    function(details) {
			return "a";
		},
		/*
		 case webfrontend.gui.Overviews.Alliance.IncomingAttacksPage.mode.player:
		 this.__yr = [];
		 var cf = webfrontend.data.Player.getInstance().getIncomingUnitOrders();
		 var playerId = ca.getId();
		 var bY = ca.getName();

		 var ce = cf.length;
		 for (var i = 0; i < ce; i++) {
		 var cd = false;
		 var bX = ca.getCity(cf[i].targetCity);
		 if (bX != null) {
		 var cc = bX.type;
		 cd = webfrontend.gui.Util.cityHaveCastle(cc);
		 };
		 this.__yr[i] = {
		 tp: playerId,
		 tpn: bY,
		 t: cf[i].type,
		 s: cf[i].state,
		 tcn: cf[i].targetCityName,
		 tc: cf[i].targetCity,
		 es: cf[i].end,
		 pn: cf[i].playerName,
		 cn: cf[i].cityName,
		 an: cf[i].allianceName,
		 a: cf[i].alliance,
		 ds: cf[i].detectionStep,
		 ta: cf[i].ts_attacker,
		 cp: cf[i].claimPower,
		 b: cf[i].hasBaron,
		 td: cf[i].ts_defender,
		 p: cf[i].player,
		 c: cf[i].city,
		 i: cf[i].id,
		 thc: cd,
		 m: cf[i].isMoongate,
		 ms: cf[i].stepMoongate,
		 command: cf[i]
		 };
		 };
		 };
		 this.__yJ();
		 break;
		 };
		 */
		redrawGrid:           function(e) {
			try {
				var rowData = [];
				var sortIx = this._table.getSortColumnIndex();
				var dir = this._table.isSortAscending();
				var mAid = aco.getId();

				if(this._incomingAttacks != null) {
					var selection = this._contSelect.getSelection();
					var continent = ((selection && selection.length > 0) ? selection[0].getModel() : "-1");
					cont = parseInt(cont);
					var filterOwn = this._filterOwn.getValue();
					for(var i = 0; i < this._incomingAttacks.length; i++) {
						try {

							var incomingStr = ["", "", "", "", "", ""];
							var travelDurationMs = 0;
							var item = this._incomingAttacks[i];
							var cont = ava.CombatTools.cityIdToCont(item.tc);
							var cont2 = ava.CombatTools.cityIdToCont(item.c);
							if((continent == "-1" || cont == continent) && (!filterOwn || item.tpn == this.pName)) {
								var distance = 0;
								var cCoords = ava.CoordUtils.convertIdToCoodrinates(item.c).split(":");
								var tcCoords = ava.CoordUtils.convertIdToCoodrinates(item.tc).split(":");
								if(item.m) {
									distance = tcCoords.length > 1 ? this.findMoongateDistance(tcCoords[0], tcCoords[1]) : 0;
								} else {
									distance = (tcCoords.length > 1 && cCoords.length > 1) ? Math.sqrt(Math.pow((tcCoords[0] - cCoords[0]), 2) + Math.pow((tcCoords[1] - cCoords[1]), 2)) : 0;
								}
								// note that if it is an integer multiplier of an hour then it is suspicious

								travelDurationMs = this.serverTime.getStepTime(item.es) - this.serverTime.getStepTime(item.ds);
								var diffMs = travelDurationMs / distance;
								distance = (distance == 0 ? 1 : distance);
								var diffSec = (diffMs / 1000.0);
								var besieged = (item.ta != 0);
								var typeCount = 5;
								var IncomingShip = "?";
								if(besieged) {
									for(var i = 0; i < typeCount; ++i)
										incomingStr[i] = "Siege";
								} else {
									try {
										var gains = [8, 10, 20, 30, 40];
										var bias = [0, 0, 0, 0, 0];
										var aid = item.a.toString();
										if(this._allianceBonuses.hasOwnProperty(aid)) {
											bias[0] = (this._allianceBonuses[aid].ics);
											bias[1] = (this._allianceBonuses[aid].ics);
											bias[2] = (this._allianceBonuses[aid].ics);
											bias[3] = (this._allianceBonuses[aid].sse);
											bias[4] = (this._allianceBonuses[aid].b);

										}

										var bestError = 5;
										var foundType = false;
										for(var ii = 0; ii < typeCount; ++ii) {
											var tt = (gains[ii] * 60.0 - 1) * 100.0 / diffSec - bias[ii];

											incomingStr[ii] = Math.abs(tt).toString() + "%";
											if(tt < 55 && tt > -5) {
												var rr = tt - Math.floor(tt / 5.0 + 0.375) * 5.0;
												if(rr < 0)
													rr = -rr * 4.0;
												if(Math.abs(rr) < bestError) {
													bestError = Math.abs(rr);
													foundType = true;
													incomingStr[ii] = rr.toString() + "%!!";
												}
											}

										}

										IncomingShip = (cont != cont2) ? "*" : "?";

										if(!foundType) {
											IncomingShip = (item.es - item.ds) <= 3600 ? "-" : "?";
										}
									} catch(err) {
										paError(err);
									}
								}
								if((this.cities[item.tc] == 0) || (this.cities[item.c] == 0)) {
									IncomingShip = "-";
								}
								if(ava.CoordUtils.convertIdToCoodrinates(item.tc) == "0:0") {
									for(var i = 0; i < typeCount; ++i)
										incomingStr[i] = "?";
								}
								var isInternal = (mAid == item.a);
								rowData.push([(item.m ? "webfrontend/world/icon_wm_city_moongate.png" : ""), (isInternal ? "Internal " : ""), item.tpn, item.tcn, cont, ava.CoordUtils.convertIdToCoodrinates(item.tc), formatIncomingDate(this.serverTime.getStepTime(item.es)), item.pn, item.an, item.cn, ava.CoordUtils.convertIdToCoodrinates(item.c), formatIncomingDate(this.serverTime.getStepTime(item.ds)), incomingStr[4], incomingStr[3], incomingStr[2], incomingStr[1], incomingStr[0], IncomingShip, item.a.toString(), FormatTime(travelDurationMs)]);


							}
						} catch(ex) {
							paError(ex);
						}
						this._table.setData(rowData);
						if(sortIx >= 0) {
							this._table.sortByColumn(sortIx, dir);
						}
					}
				}
			} catch(ex1) {
				paError(ex1);
			}
		},
		safeGetProperty:      function(obj, prop) {
			if(obj && obj.hasOwnProperty(prop))
				return obj[prop];
			return null;
		},
		coordsFromCluster:    function(clusterID, coordRef) {
			var clusterY = Math.floor(clusterID / 32);
			var clusterX = clusterID - (clusterY * 32);
			var x = clusterX * 32 + (coordRef & 0xffff);
			var y = clusterY * 32 + (coordRef >> 16);
			return x | (y << 16);
		},
		getObfuscatedNames:   function() {
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
			console.log("WorldData");
			console.log(this.playerData);
			console.log(this.allianceData);
			console.log(this.objData);
			console.log(this.worldData);

		},
		findMoongateDistance: function(cx, cy) {
			var distance = 0;
			this.getObfuscatedNames();
			var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
			for(var cluster in this.worldData.d) {
				var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
				if(objectData) {
					for(var obj in objectData) {
						var o = objectData[obj];
						if(o.Type == 4) {
							if(o.eMoongateState > 1) {
								try {
									var mCoord = this.coordsFromCluster(cluster, obj);
									var x = mCoord & 0xffff;
									var y = mCoord >> 16;
									var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
									if(cordCont == cityCont) {
										distance = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));
										break;
									}
								} catch(err) {
									paError(err);
								}
								/* (e) {
								 console.log("Error");
								 console.dir(e);
								 } */
							}
						}
					}
				}
				if(distance != 0) {
					break;
				}
			}
			return distance;
		},
		isOnWater:            function(cityId, thisObj) {
			webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
					id: cityId
				}, thisObj, function(ok, response) {
					if(ok && response != null) {
						var cityId = convertCoordinatesToId(response.x, response.y);
						this.cities[cityId] = response.w;
					}
				}
			);
		},
		checkCont:            function(i) {
			i = parseInt(i);
			if(i < 10) {
				i = "0" + i;
			}
			return i;
		},
		cities:               null,
		dispatchResults:      function(results, thisObj) {
			if(results == null)
				return;
			var output = new qx.util.StringBuilder(2048);
			try {
				if(thisObj.cities == null) {
					thisObj.cities = new Object();
				}
				var mAid = aco.getId();
				output.add("'Moongate'	");
				output.add("'Internal'	");
				output.add("'Player'	");
				output.add("'Target'	");
				output.add("'Cont'	");
				output.add("'Coords'	");
				output.add("'Time'	");
				output.add("'Attacker'	");
				output.add("'Alliance'	");
				output.add("'Source'	");
				output.add("'AttCoords'	");
				output.add("'Spotted'	");
				output.add("'Baron'	");
				output.add("'Siege'	");
				output.add("'Infantry'	");
				output.add("'Cav'	");
				output.add("'Scout'	");
				output.add("'Ship/Not enough towers'	");
				output.add("\n");
				var resArray = [];
				var IncomingAttacks;
				if(results.hasOwnProperty("a")) {
					IncomingAttacks = results.a;
				} else {
					if(results[0].hasOwnProperty("a"))
						IncomingAttacks = results[0].a;
				}
				thisObj._incomingAttacks = IncomingAttacks.slice(0);
				var continents = "";
				var hasChildren = thisObj._contSelect.hasChildren();
				var children = thisObj._contSelect.getChildren();
				var sel = thisObj._contSelect.getSelection();
				var ix = 0;
				for(var i = 0; i < IncomingAttacks.length; ++i) {
					var cont = String(thisObj.checkCont(ava.CombatTools.cityIdToCont(IncomingAttacks[i].tc)));
					if((cont.length > 0) && (continents.indexOf(":" + cont) < 0)) {
						continents += ":" + cont;
					}
				}
				var cArr = continents.split(':');
				cArr.sort();
				if(!hasChildren) {
					thisObj._contSelect.addAt(new qx.ui.form.ListItem("World", null, -1), 0);
				} else {
					children[0].setLabel("World");
					children[0].setModel(-1);
				}
				children = thisObj._contSelect.getChildren();
				for(var i = 1; i < cArr.length; ++i) {
					var cont = cArr[i];
					if(children.length > i) {
						children[i].setLabel(cont);
						children[i].setModel(cont);
					} else {
						thisObj._contSelect.add(new qx.ui.form.ListItem(cont, null, cont));
						children = thisObj._contSelect.getChildren();
					}
					if(sel && sel.length > 0 && String(cont) == sel[0].$$user_label) {
						ix = i;
					}
				}
				if(children.length > cArr.length) {
					thisObj._contSelect.removeAt(cArr.length - 1);
				}
				thisObj._contSelect.setSelection([children[ix]]);
				var rowData = [];
				var delay = 500;
				for(var i = 0; i < IncomingAttacks.length; i++) {
					try {
						var item = IncomingAttacks[i];
						window.setTimeout(thisObj.isOnWater.bind(thisObj, item.tc, thisObj), delay);
						delay += 1000;
						window.setTimeout(thisObj.isOnWater.bind(thisObj, item.c, thisObj), delay);
						delay += 1000;
						var cont1 = ava.CombatTools.cityIdToCont(item.tc);
						var cont2 = ava.CombatTools.cityIdToCont(item.c);
						var tcCoords = ava.CoordUtils.convertIdToCoodrinates(item.tc).split(":");
						var cCoords = ava.CoordUtils.convertIdToCoodrinates(item.c).split(":");
						var distance = (tcCoords.length > 1 && cCoords.length > 1) ? Math.sqrt(Math.pow((tcCoords[0] - cCoords[0]), 2) + Math.pow((tcCoords[1] - cCoords[1]), 2)) : 0;
						if(item.m) {
							distance = tcCoords.length > 1 ? thisObj.findMoongateDistance(tcCoords[0], tcCoords[1]) : 0;
						} else {
							distance = (tcCoords.length > 1 && cCoords.length > 1) ? Math.sqrt(Math.pow((tcCoords[0] - cCoords[0]), 2) + Math.pow((tcCoords[1] - cCoords[1]), 2)) : 0;
						}
						distance = (distance == 0 ? 1 : distance);
						var diffMs = ((thisObj.serverTime.getStepTime(item.es) - thisObj.serverTime.getStepTime(item.ds)) / distance);
						var diffSec = Math.ceil(diffMs / 1000);
						var besieged = (item.ta != 0);
						var IncomingShip = "?";

						try {
							var IncomingScout : any = Math.round((Math.round((8 / (diffSec / 60) - 1) * 100) * 10) / 10);
							var IncomingCav: any = Math.round((Math.round((10 / (diffSec / 60) - 1) * 100) * 10) / 10);
							var IncomingInf: any = Math.round((Math.round((20 / (diffSec / 60) - 1) * 100) * 10) / 10);
							var IncomingSiege: any = Math.round((Math.round((30 / (diffSec / 60) - 1) * 100) * 10) / 10);
							var IncomingBaron: any = Math.round((Math.round((40 / (diffSec / 60) - 1) * 100) * 10) / 10);
							 IncomingShip = (cont1 != cont2) ? "*" : "?";
							var foundType = false;
							var aid = item.a.toString();
							if(thisObj._allianceBonuses.hasOwnProperty(aid)) {
								IncomingScout -= (thisObj._allianceBonuses[aid].ics);
								IncomingCav -= (thisObj._allianceBonuses[aid].ics);
								IncomingInf -= (thisObj._allianceBonuses[aid].ics);
								IncomingSiege -= (thisObj._allianceBonuses[aid].sse);
								IncomingBaron -= (thisObj._allianceBonuses[aid].b);
							}
							if((IncomingScout == 0) || (IncomingScout == 1) || (IncomingScout == 3) || (IncomingScout == 6) || (IncomingScout > 6 && IncomingScout <= 50 && ((IncomingScout % 5) == 0))) {
								foundType = true;
								IncomingScout = "*" + IncomingScout + "%";
							}
							else {
								IncomingScout = IncomingScout + "%";
							}
							if((IncomingCav == 0) || (IncomingCav == 1) || (IncomingCav == 3) || (IncomingCav == 6) || (IncomingCav > 6 && IncomingCav <= 50 && ((IncomingCav % 5) == 0))) {
								foundType = true;
								IncomingCav = "*" + IncomingCav + "%";
							}
							else {
								IncomingCav = IncomingCav + "%";
							}
							if((IncomingInf == 0) || (IncomingInf == 1) || (IncomingInf == 3) || (IncomingInf == 6) || (IncomingInf > 6 && IncomingInf <= 50 && ((IncomingInf % 5) == 0))) {
								foundType = true;
								IncomingInf = "*" + IncomingInf + "%";
							}
							else {
								IncomingInf = IncomingInf + "%";
							}
							if((IncomingSiege == 0) || (IncomingSiege == 1) || (IncomingSiege == 3) || (IncomingSiege == 6) || (IncomingSiege > 6 && IncomingSiege <= 50 && ((IncomingSiege % 5) == 0))) {
								foundType = true;
								IncomingSiege = "*" + IncomingSiege + "%";
							}
							else {
								IncomingSiege = IncomingSiege + "%";
							}
							if((IncomingBaron == 0) || (IncomingBaron == 1) || (IncomingBaron == 3) || (IncomingBaron == 6) || (IncomingBaron > 6 && IncomingBaron <= 50 && ((IncomingBaron % 5) == 0))) {
								foundType = true;
								IncomingBaron = "*" + IncomingBaron + "%";
							}
							else {
								IncomingBaron = IncomingBaron + "%";
							}
							if(!foundType) {
								IncomingShip = (item.es - item.ds) <= 3600 ? "-" : "?";
							}
						} catch(err) {
							paError(err);
						}

						if(ava.CoordUtils.convertIdToCoodrinates(item.tc) == "0:0") {
							IncomingBaron = "?";
							IncomingSiege = "?";
							IncomingInf = "?";
							IncomingCav = "?";
							IncomingScout = "?";
							IncomingShip = "?";
						}
						if((thisObj.cities[item.tc] == 0) || (thisObj.cities[item.c] == 0)) {
							IncomingShip = "?";
						}
						var isInternal = (mAid == item.a);
						rowData.push([(item.m ? "moongate" : ""), ( isInternal ? "Internal " : ""), item.tpn, item.tcn, cont, ava.CoordUtils.convertIdToCoodrinates(item.tc),
							formatIncomingDate(thisObj.serverTime.getStepTime(item.es)), item.pn, item.an, item.cn, ava.CoordUtils.convertIdToCoodrinates(item.c),
							formatIncomingDate(thisObj.serverTime.getStepTime(item.ds)), IncomingBaron, IncomingSiege,
							IncomingInf, IncomingCav, IncomingScout, IncomingShip]);
						//rowData.push([item.tpn, item.tcn, cont, ava.CoordUtils.convertIdToCoodrinates(item.tc), formatIncomingDate(thisObj.serverTime.getStepTime(item.es)), item.pn, item.an, item.cn, ava.CoordUtils.convertIdToCoodrinates(item.c), formatIncomingDate(thisObj.serverTime.getStepTime(item.ds)), IncomingBaron + '%', IncomingSiege + '%', IncomingInf + '%', IncomingCav + '%', IncomingScout + '%']);
						output.add('"' + (item.m ? "moongate" : "") + '"	');
						output.add('"' + ( isInternal ? "Internal " : "") + '"	');
						output.add('"' + item.tpn + '"	');
						output.add('"' + item.tcn + '"	');
						output.add('"' + cont + '"	');
						output.add('"' + ava.CoordUtils.convertIdToCoodrinates(item.tc) + '"	');
						output.add('"' + formatIncomingDate(thisObj.serverTime.getStepTime(item.es)) + '"	');
						output.add('"' + item.pn + '"	');
						output.add('"' + item.an + '"	');
						output.add('"' + item.cn + '"	');
						output.add('"' + ava.CoordUtils.convertIdToCoodrinates(item.c) + '"	');
						output.add('"' + formatIncomingDate(thisObj.serverTime.getStepTime(item.ds)) + '"	');
						output.add('"' + IncomingBaron + '"	');
						output.add('"' + IncomingSiege + '"	');
						output.add('"' + IncomingInf + '"	');
						output.add('"' + IncomingCav + '"	');
						output.add('"' + IncomingScout + '"	');
						output.add('"' + IncomingShip + '"	');
						output.add("\n");
					} catch(ex1) {
						paError(ex1);
					}
				}
				thisObj._wcText.setValue(output.get());

				//thisObj._table.setData(rowData);
				thisObj.redrawGrid();
			} catch(ex) {
				paError(ex);
			}
			/* (e) {
			 console.log("Error");
			 console.dir(e);
			 } */
		}
	}
});
