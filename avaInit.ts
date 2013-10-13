/**
 * Created by David on 10/11/13.
calls ctors and such
 */
///<reference path="avaDec.ts" />
declare var qx : any;
declare var window : any;
declare function AvaInit();


var SCOUT_ORDER_ID = 1;
var 	PLUNDER_ORDER_ID = 2;
var 	ATTACK_ORDER_ID = 3;
var 	SUPPORT_ORDER_ID = 4;
var 	SIEGE_ORDER_ID = 5;
var 	RAID_ORDER_ID = 8;
var 	SETTLE_ORDER_ID = 9;
var 	ORDER_STATE_OUTGOING = 1;
var 	ORDER_STATE_RETURNING = 2;


	// globals
	qx.Class.define("ava.Main", {
		type:    "singleton",
		extend:  qx.core.Object,
				members: {
			civ_cont : {} ,
			options:                    null,
			SEND_WOOD:                  1,
			SEND_STONE:                 2,
			SEND_BOTH:                  3,
			DO_NOT_ATTACK_UNITS:        {
				"1":  true,
				"19": true
			},
			DO_NOT_PLUNDER_UNITS:       {
				"13": true,
				"14": true,
				"2":  true
			},
			_city:                      null,
			reportExtraInfo:            null,
			coord:                      null,
			worldContext:               null,
			copyMenu:                   null,
			infoMenu:                   null,
			selectCityBtn:              null,
			LOC_CONTAINER_INDEX:        4,
			ORIG_CHILD_COUNT:           6,
			RETURN_TIME_INDEX:          3,
			CMD_LIST_INDEX:             1,
			cityBuildings:              null,

			onAddChildWidget:           function(e) {
				var widget = e.getData();
				var optionsPanel = widget.getChildren()[4].getChildren()[1].getChildren()[2];
				if(!optionsPanel || optionsPanel.getChildren().length < 2)
					return;
				if(optionsPanel.getChildren()[1].classname == "webfrontend.ui.QuickUseButton") {
					var child = optionsPanel.getChildren()[1];
					child.setMaxHeight(24);
					child.setMaxWidth(24);
					optionsPanel.remove(child);
					widget.add(child, {
						top:  3,
						left: 165
					});
				}
			},
			loadOptions:                function() {
				var _str = localStorage.getItem("Ava_options");
				paDebug(_str);
				if(_str)
					this.options = JSON.parse(_str);
				else {
					this.options = {
						"hideAvaTools":         false,
						"sortByReference":      false,
						"showChatAlert":        true,
						"showWhisperAlert":     true,
						"showChatAlertPhrases": true,
						"chatAlertPhrases":     "",
						"showCityBuildings":    1,
						"enableClosestHub":     true,
						"hubTemplates":         [
							{
								name: "Castle",
								res:  {
									wood:  100000,
									stone: 200000,
									iron:  300000,
									food:  1000000
								}
							},
							{
								name: "Res City",
								res:  {
									wood:  100000,
									stone: 100000,
									iron:  0,
									food:  0
								}
							},
							{
								name: "Hub",
								res:  {
									wood:  1000000,
									stone: 1000000,
									iron:  1000000,
									food:  1000000
								}
							},
							{
								name: "Finished Res",
								res:  {
									wood:  0,
									stone: 0,
									iron:  0,
									food:  0
								}
							}
						],
						"AvaToolsVersion":      ava.Version.PAversion
					};
				}
				if(!this.options.hasOwnProperty("showWhisperAlert"))
					this.options.showWhisperAlert = true;
				if(!this.options.hasOwnProperty("showChatAlert"))
					this.options.showChatAlert = true;
				if(!this.options.hasOwnProperty("showChatAlertPhrases"))
					this.options.showChatAlertPhrases = true;
				if(!this.options.hasOwnProperty("chatAlertPhrases"))
					this.options.chatAlertPhrases = "";
				if(!this.options.hasOwnProperty("hideAvaTools"))
					this.options.hideAvaTools = false;
				if(!this.options.hasOwnProperty("sortByReference"))
					this.options.sortByReference = false;
				if(!this.options.hasOwnProperty("enableClosestHub"))
					this.options.enableClosestHub = true;
				if(!this.options.hasOwnProperty("showCityBuildings"))
					this.options.showCityBuildings = 2;
				if(this.options.showCityBuildings == true)
					this.options.showCityBuildings = 2;
				if(!this.options.hasOwnProperty("hubTemplates")) {
					this.options.hubTemplates = [
						{
							name: "Castle",
							res:  {
								wood:  100000,
								stone: 200000,
								iron:  300000,
								food:  1000000
							}
						},
						{
							name: "Res City",
							res:  {
								wood:  100000,
								stone: 100000,
								iron:  0,
								food:  0
							}
						},
						{
							name: "Hub",
							res:  {
								wood:  1000000,
								stone: 1000000,
								iron:  1000000,
								food:  1000000
							}
						},
						{
							name: "Finished Res",
							res:  {
								wood:  0,
								stone: 0,
								iron:  0,
								food:  0
							}
						}
					];
				}
				this.options.AvaToolsVersion = ava.Version.PAversion;
				this.app.setUserData("Ava_options", this.options);
				var str = JSON.stringify(this.options);
				localStorage.setItem("Ava_options", str);
				console.log("loaded");
			},
					initialize : function() {
						paDebug("ava initialize");
						this.app = qx.core.Init.getApplication();
						this.cInfoView = this.app.getCityInfoView();
						this.chat = this.app.chat;
						this.bQc = this.cInfoView.buildingQueue;
						this.bQh = this.bQc.header;
						this.playerName = webfrontend.data.Player.getInstance().getName();
						civ_cont = this.cInfoView.container.getChildren();
						this.loadOptions();

						for(var i = 0; i < civ_cont.length; i++) {
							if(civ_cont[i].basename == "CityCommandInfoView") {
								this.cCmdInfoView = civ_cont[i];
								break;
							}
						}
						var commands = this.cCmdInfoView.commands;
						commands.addListener("addChildWidget", this.onAddChildWidget, this);
						var children = commands.getChildren();
						for(var i = 0; i < children.length; i++) {
							var e = new qx.event.type.Data();
							e.init(children[i], null, false);
							this.onAddChildWidget(e);
						}



				// Create a toolbar in the main area on the left below existing forms.
				this.panel = new ava.ExtraTools("- 343i  " + ava.Version.PAversion);
				this.addPanel(this.panel);
				this._city = this.panel.city;

				// Cancel Orders
				this.cancelOrders = new ava.CancelOrderPanel();
				console.log("TweakPA1");
				this.cCmdInfoView.commandHeaderData.header.add(this.cancelOrders, {
					left: 155,
					top:  7
				});
				var app = qx.core.Init.getApplication();
				this.app = app;
				this.chat = this.app.chat;
				var cityStatusRow;
				var cityStatusText;
				ava.alerts.getInstance().init();

				try {
					/*



					 var targetContainer = (app.cityDetailView || this.app.getCityDetailView()).actionArea;
					 // Ask BotX
					 var row = new qx.ui.container.Composite();
					 row.setLayout(new qx.ui.layout.HBox(2));
					 targetContainer.add(row);

					 var askBotxHistoryBtn = new qx.ui.form.Button("BotX 3day player history");
					 askBotxHistoryBtn.setToolTipText("Get player history from BotX");
					 row.add(askBotxHistoryBtn, {flex:1});
					 askBotxHistoryBtn.addListener("execute", function () {
					 var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
					 var cityPlayerName = selectedCity.get_PlayerName();
					 webfrontend.data.Chat.getInstance().addMsg("/whisper Avatar343i !history " + cityPlayerName);
					 });
					 var askBotxCityBtn = new qx.ui.form.Button("BotX city coords history");
					 askBotxCityBtn.setToolTipText("Get city history from BotX");
					 row.add(askBotxCityBtn, {flex:1});
					 askBotxCityBtn.addListener("execute", function () {
					 var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
					 var citycoords = ava.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
					 webfrontend.data.Chat.getInstance().addMsg("/whisper Avatar343i !city " + citycoords[0] + ":" + citycoords[1]);
					 });
					 */
					var targetContainer = (app.cityDetailView || app.getCityDetailView()).actionArea;
					var row = new qx.ui.container.Composite();
					row.setLayout(new qx.ui.layout.HBox(4));
					targetContainer.add(row);
					var assaultButton = new qx.ui.form.Button("Attack");
					assaultButton.orderId = ATTACK_ORDER_ID;
					assaultButton.setToolTipText("Assault selected city with all Available units");
					assaultButton.addListener("execute", this.sendTroops, this);
					var plunderButton = new qx.ui.form.Button("Plunder");
					plunderButton.orderId = PLUNDER_ORDER_ID;
					plunderButton.setToolTipText("Plunder selected city with all Available units");
					plunderButton.addListener("execute", this.sendTroops, this);
					var siegeButton = new qx.ui.form.Button("Siege");
					siegeButton.orderId = SIEGE_ORDER_ID;
					siegeButton.setToolTipText("Siege selected city with all Available units");
					siegeButton.addListener("execute", this.sendTroops, this);
					var supportButton = new qx.ui.form.Button("Support");
					supportButton.orderId = SUPPORT_ORDER_ID;
					supportButton.setToolTipText("Support selected city with all Available units");
					supportButton.addListener("execute", this.sendTroops, this);

					// add elements
					row.add(assaultButton, {
						flex: 1
					});
					row.add(plunderButton, {
						flex: 1
					});
					row.add(siegeButton, {
						flex: 1
					});
					row.add(supportButton, {
						flex: 1
					});
					cityStatusRow = new qx.ui.container.Composite();
					cityStatusRow.setLayout(new qx.ui.layout.HBox());
					cityStatusText = new qx.ui.basic.Label();
					cityStatusText.setAlignY("middle");
					cityStatusText.setRich(true);
					cityStatusText.setFont("bold");
					cityStatusRow.setMaxHeight(0);
					cityStatusText.setMaxHeight(0);
					cityStatusRow.setVisibility("hidden");
					cityStatusRow.add(cityStatusText);
					targetContainer.add(cityStatusRow);
					// mkReq();  // @@@
				} catch(e) {
					paError(e);

				}
				try {
					this.reportExtraInfo = ava.RaidReporter.getInstance();
					var rep = app.getReportPage();
					rep.origOnReport = rep._onReport;
					rep._onReport = this.reportExtraInfo.interceptOnReport;
				} catch(e) {
					paError(false);
				}
				try {
					this.cInfoView = this.app.getCityInfoView();
					civ_cont = this.cInfoView.container.getChildren();

					for(var i = 0; i < civ_cont.length; i++) {
						if(civ_cont[i].basename == "CityCommandInfoView") {
							this.cCmdInfoView = civ_cont[i];
							break;
						}
					}
					webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);

					// Calculate for existing raids in initial city
					this.calcReturnTimes();
					var buttonLayout = new qx.ui.layout.HBox(3);
					var btnRow = new qx.ui.container.Composite(buttonLayout);
					this.app.getForumPostPage().getChildren()[0].add(btnRow, {
						top:  45,
						left: 400
					});

					// Add Scroll To Top button
					var scrollTBtn = new qx.ui.form.Button('Scroll To Top');
					scrollTBtn.set({
						width:       90,
						appearance:  "button-text-small",
						toolTipText: "Scroll to top of thread"
					});
					scrollTBtn.addListener("click", this.scrollToTop, false);
					btnRow.add(scrollTBtn);

					// Add Scroll To Bottom button
					var scrollBtn = new qx.ui.form.Button('Scroll To Bottom');
					scrollBtn.set({
						width:       90,
						appearance:  "button-text-small",
						toolTipText: "Scroll to bottom of thread"
					});
					scrollBtn.addListener("click", this.scrollToBottom, false);
					btnRow.add(scrollBtn);
				} catch(e) {
					paError(e);
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
				this.createWorldViewEnhancments();
				this.createRaidApplyToAll();
				this.createContextMenu();
				ava.Inception.getInstance().init();
				ava.Chat.getInstance().init();
				emotifyIcons();
				ava.Chat.getInstance().addChatMessage(" is not broken :) - good times for all", true);
				this.panel.showOptionsPage();
				qx.core.Init.getApplication().switchOverlay(null);

				// City Buildings
				this.cityBuildings = new ava.CityBuildings();
				this.panel.getLayoutParent().addBefore(this.cityBuildings.bldgsCont, this.panel);
				webfrontend.data.City.getInstance().addListener("changeVersion", this.cityBuildings.updateCityBuildings, this.cityBuildings);
				this.app.visMain.addListener("changeMapLoaded", function() {
					if(ava.Main.getInstance().options.showCityBuildings == 2)
						this.cityBuildings.updateCityBuildings();
				}, this);
				this.cityBuildings.updateCityBuildings();
				console.log("TweakPA Endt");
			},
			updateCity:                 function() {
				// Clear return time from all command windows
				var commands = this.cCmdInfoView.getChildren()[this.CMD_LIST_INDEX].getChildren();
				if(commands) {
					for(var i = 0; i < commands.length; i++) {
						//var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX];
						var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX].getChildren()[1].getChildren()[0];
						if(localContainer.getChildren().length > this.ORIG_CHILD_COUNT) {
							localContainer.removeAt(this.RETURN_TIME_INDEX);
						}
					}
				}

				// Recalc return times where appropriate
				this.calcReturnTimes();
			},
			calcReturnTimes:            function() {
				if(!this.cCmdInfoView) {
					for(var i = 0; i < civ_cont.length; i++) {
						if(civ_cont[i].basename == "CityCommandInfoView") {
							this.cCmdInfoView = civ_cont[i];
							break;
						}
					}
				}
				var commands = this.cCmdInfoView.getChildren()[this.CMD_LIST_INDEX].getChildren();
				var orders = webfrontend.data.City.getInstance().getUnitOrders();

				if(!orders)
					return;
				for(var i = 0; i < orders.length; i++) {
					var order = orders[i];
					if(order.type == SETTLE_ORDER_ID)
						continue;

					if(order.type == SUPPORT_ORDER_ID)
						continue;

					if(order.type == SIEGE_ORDER_ID)
						continue;

					if(order.state != ORDER_STATE_OUTGOING)
						continue;

					// Only process outgoing attacks
					// Calculate return time
					var diff = order.end - order.start;
					var returnTime = webfrontend.Util.getDateTimeString(webfrontend.data.ServerTime.getInstance().getStepTime(order.end + diff));

					//
					var container = new qx.ui.container.Composite();
					container.setLayout(new qx.ui.layout.Canvas());
					var returnLabel = new qx.ui.basic.Label("Returns:");
					returnLabel.setTextColor("text-darkbrown");
					var spacr2 = new qx.ui.core.Spacer();
					spacr2.setWidth(7);
					var returnVal = new qx.ui.basic.Label(returnTime);
					returnVal.setTextColor("text-deepdarkbrown");
					returnVal.set({
						font: "bold"
					});
					container.add(returnLabel);
					container.add(spacr2);
					container.add(returnVal, {
						left: 70
					});

					// remove existing
					var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX].getChildren()[1].getChildren()[0];
					if(localContainer.getChildren().length > this.ORIG_CHILD_COUNT) {
						localContainer.removeAt(this.RETURN_TIME_INDEX);
					}

					// add new
					localContainer.addAt(container, this.RETURN_TIME_INDEX);
				}
			},
			scrollToTop:                function() {
				try {
					var mypage = qx.core.Init.getApplication().getForumPostPage();
					var lastChildIndex = mypage.getChildren().length - 1;
					var myscroll = mypage.getChildren()[lastChildIndex].getChildren()[1];
					myscroll.scrollToY(0);
				} catch(err) {
					paDebug(err);
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
			},
			scrollToBottom:             function() {
				try {
					var mypage = qx.core.Init.getApplication().getForumPostPage();
					var lastChildIndex = mypage.getChildren().length - 1;
					var myscroll = mypage.getChildren()[lastChildIndex].getChildren()[1];
					myscroll.scrollToY(99999);
				} catch(err) {
					paDebug(err);
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
			},
			createContextMenu:          function() {
				this.worldContext = new qx.ui.menu.Menu();
				this.worldContext.setIconColumnWidth(0);
				this.copyMenu = new qx.ui.menu.Menu();
				this.copyMenu.setIconColumnWidth(0);
				this.infoMenu = new qx.ui.menu.Menu();
				this.infoMenu.setIconColumnWidth(0);
				this.selectCityBtn = new qx.ui.menu.Button("Switch to City");
				this.viewReportsBtn = new qx.ui.menu.Button("View Reports");
				this.killBossBtn = new qx.ui.menu.Button("Kill Boss");
				this.raidDungeonBtn = new qx.ui.menu.Button("Raid");

				//this.raidDungeon1Btn = new qx.ui.menu.Button("Raid 1");
				//this.raidDungeonAllBtn = new qx.ui.menu.Button("Raid all");
				this.sendArmyBtn = new qx.ui.menu.Button("Send Army");
				this.plunderBtn = new qx.ui.menu.Button("Plunder With All");
				this.scoutBtn = new qx.ui.menu.Button("Scout With All");
				this.supportBtn = new qx.ui.menu.Button("Support With All");
				this.copyBtn = new qx.ui.menu.Button("Copy to Chat");
				this.copyBtnSub = new qx.ui.menu.Button("Copy to Chat", null, null, this.copyMenu);
				this.copyCoordBtn = new qx.ui.menu.Button("Coordinates");
				this.copyPlayerBtn = new qx.ui.menu.Button("Player");
				this.copyAllianceBtn = new qx.ui.menu.Button("Alliance");
				this.sendResBtn = new qx.ui.menu.Button("Send Resources");

				//this.infoBtn = new qx.ui.menu.Button("Info", null, null, this.infoMenu);
				this.infoPlayerBtn = new qx.ui.menu.Button("Player Info");
				this.worldContext.add(this.infoPlayerBtn);

				//this.infoAllianceBtn = new qx.ui.menu.Button("Alliance");
				this.whisperBtn = new qx.ui.menu.Button("Whisper");
				this.worldContext.add(this.selectCityBtn);
				this.worldContext.add(this.viewReportsBtn);
				this.worldContext.add(this.killBossBtn);
				this.worldContext.add(this.raidDungeonBtn);

				//this.worldContext.add(this.raidDungeon1Btn);
				//this.worldContext.add(this.raidDungeonAllBtn);
				this.worldContext.add(this.sendArmyBtn);
				this.worldContext.add(this.plunderBtn);
				this.worldContext.add(this.scoutBtn);
				this.worldContext.add(this.supportBtn);
				this.worldContext.add(this.sendResBtn);

				//this.worldContext.add(this.infoBtn);
				this.worldContext.add(this.whisperBtn);
				this.worldContext.add(this.copyBtnSub);
				this.copyMenu.add(this.copyCoordBtn);
				this.copyMenu.add(this.copyPlayerBtn);
				this.copyMenu.add(this.copyAllianceBtn);

				//this.infoMenu.add(this.infoPlayerBtn);
				//this.infoMenu.add(this.infoAllianceBtn);
				qx.core.Init.getApplication().worldView.setContextMenu(this.worldContext);
				qx.core.Init.getApplication().worldView.addListener("beforeContextmenuOpen", function(e) {
					this.updateWorldViewContext();
				}, this);
				this.plunderBtn.orderId = PLUNDER_ORDER_ID;
				this.plunderBtn.addListener("execute", this.sendTroops, this);
				this.scoutBtn.orderId = SCOUT_ORDER_ID;
				this.scoutBtn.addListener("execute", this.sendTroops, this);
				this.supportBtn.orderId = SUPPORT_ORDER_ID;
				this.supportBtn.addListener("execute", this.sendTroops, this);
				this.sendArmyBtn.addListener("execute", function(e) {
					if(this.coord) {
						this.app.showSendArmy(this.coord.xPos, this.coord.yPos);
					}
				}, this);
				this.killBossBtn.addListener("execute", function(e) {
					var rw = ava.RaidingWindow.getInstance();
					var rt = rw.pickBossRaider().t;
					var o = new Object();
					o.BossType = getBossType(this.coord.playerName);
					o.BossLevel = this.coord.level;
					var utk = rw.getUnitsToKill(rt, o);
					var CI = webfrontend.data.City.getInstance();
					var uinfo = CI.getUnitTypeInfo(rt);
					if(utk <= uinfo.count) {
						var unitsToSend = new Array();
						unitsToSend.push({
							t: rt,
							c: Math.floor(utk)
						});
						webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
							cityid:                     webfrontend.data.City.getInstance().getId(),
							units:                      unitsToSend,
							targetPlayer:               "",
							targetCity:                 this.coord.xPos + ":" + this.coord.yPos,
							order:                      8,
							transport:                  1,
							timeReferenceType:          1,
							referenceTimeUTCMillis:     0,
							raidTimeReferenceType:      0,
							raidReferenceTimeUTCMillis: 0
						});
					}
				}, this);
				this.sendResBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.city) {
						this.app.showTrade(this.coord.xPos, this.coord.yPos);
					}
				}, this);
				this.selectCityBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.city && this.coord.playerName == this.playerName) {
						var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
						cityList.setSelectedCityId(this.coord.id);
					}
				}, this);
				this.viewReportsBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.type) {
						this.app.showInfoPage(this.app.getCityInfoPage(), {
							"id": this.coord.id
						});
					}
				}, this);
				this.raidDungeonBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.dungeon) {
						var dialog = ava.RaidingWindow.getInstance();
						var w = qx.bom.Viewport.getWidth(window);
						var h = qx.bom.Viewport.getHeight(window);
						var wh = Math.floor(h * 0.45);
						dialog.setWidth(500);
						dialog.setHeight(500);
						dialog.show();
						dialog.moveTo(w - 500, h - 525);
					}
				}, this);
				this.infoPlayerBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.type) {
						this.app.showInfoPage(this.app.getPlayerInfoPage(), {
							"name": this.coord.playerName
						});
					}
				}, this);
				this.copyBtnSub.addListener("execute", function(e) {
					if(this.coord) {
						this.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(this.coord.xPos, this.coord.yPos) + "[/city]");
					}
				}, this);
				this.copyCoordBtn.addListener("execute", function(e) {
					if(this.coord) {
						this.sendToChat("[coords]" + webfrontend.gui.Util.formatCoordinates(this.coord.xPos, this.coord.yPos) + "[/coords]");
					}
				}, this);
				this.copyPlayerBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.city) {
						this.sendToChat("[player]" + this.coord.playerName + "[/player]");
					}
				}, this);
				this.copyAllianceBtn.addListener("execute", function(e) {
					if(this.coord && this.coord.city) {
						this.sendToChat("[alliance]" + this.coord.allianceName + "[/alliance]");
					}
				}, this);
			},
			sendToChat:                 function(msg, overWrite) {
				var str = "";
				if(!overWrite && this.chat && this.chat.chatLine.getValue()) {
					str = this.chat.chatLine.getValue();
					str = str.substr(0, this.chat.chatLine.getTextSelectionStart()) + msg + str.substr(this.chat.chatLine.getTextSelectionEnd());
					msg = "";
				}
				this.chat.chatLine.setValue(str + msg);
			},
			updateWorldViewContext:     function() {
				this.selectCityBtn.setVisibility("excluded");
				this.infoPlayerBtn.setVisibility("excluded");
				this.viewReportsBtn.setVisibility("excluded");
				this.killBossBtn.setVisibility("excluded");
				this.raidDungeonBtn.setVisibility("excluded");

				//this.raidDungeon1Btn.setVisibility("excluded");
				//this.raidDungeonAllBtn.setVisibility("excluded");
				this.sendArmyBtn.setVisibility("excluded");
				this.plunderBtn.setVisibility("excluded");
				this.scoutBtn.setVisibility("excluded");
				this.sendResBtn.setVisibility("excluded");
				this.copyBtn.setVisibility("excluded");
				this.copyBtnSub.setVisibility("excluded");
				this.supportBtn.setVisibility("excluded");

				//this.infoBtn.setVisibility("excluded");
				this.whisperBtn.setVisibility("excluded");
				if(this.app.visMain.mapmode == "r" || this.app.visMain.mapmode == "w") {
					this.coord = this.updateWorldViewCoord();
					this.sendArmyBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
					this.plunderBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
					this.scoutBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
					this.supportBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) ? "visible" : "excluded");
					this.sendArmyBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
					this.viewReportsBtn.setVisibility(this.coord.attackable ? "visible" : "excluded");
					this.selectCityBtn.setVisibility(this.coord.city && this.coord.playerName == this.playerName ? "visible" : "excluded");
					this.infoPlayerBtn.setVisibility(this.coord.city && this.coord.playerName ? "visible" : "excluded");
					this.sendResBtn.setVisibility(this.coord.city && this.coord.playerName ? "visible" : "excluded");
					this.killBossBtn.setVisibility(this.coord.boss ? "visible" : "excluded");
					this.raidDungeonBtn.setVisibility(this.coord.dungeon ? "visible" : "excluded");
					this.copyBtn.setVisibility(this.coord ? "visible" : "excluded");
					this.copyBtnSub.setVisibility(this.coord ? "visible" : "excluded");
					this.copyPlayerBtn.setVisibility(this.coord && this.coord.city && this.coord.playerName ? "visible" : "excluded");
					this.copyAllianceBtn.setVisibility(this.coord && this.coord.allianceName ? "visible" : "excluded");
				}
			},
			updateWorldViewCoord:       function() {
				if(this.worldViewCoord == null) {
					this.worldViewCoord = new Object();
				}
				var worldViewToolTip = this.app.worldViewToolTip;
				var id = 0;
				var playerName = null;
				var allianceName = "";
				var type = null;
				var xPos = worldViewToolTip.x - worldViewToolTip.getWorldView().getContentLocation().left;
				var yPos = worldViewToolTip.y - worldViewToolTip.getWorldView().getContentLocation().top;
				var xCoord = worldViewToolTip.getVisMain().GetXCoordFromViewPosition(xPos);
				var yCoord = worldViewToolTip.getVisMain().GetYCoordFromViewPosition(yPos);
				var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);
				var level = 0;
				var progress = 0;
				if(tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
					playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
					if(tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
						allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
					}
					type = "City";
				} else if(tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/)) {
					type = "LawlessCity";
				} else if(tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/)) {
					type = "Dungeon";
					if(tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
						level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
					}
					if(tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
						progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
					}
				} else if(tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/)) {
					type = "Boss";
					if(tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
						level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
					}
					if(tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)) {
						playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
					}
				} else {
					type = "FreeSlot";
				}
				this.worldViewCoord.id = (yCoord << 0x10) | xCoord;
				this.worldViewCoord.xPos = xCoord;
				this.worldViewCoord.yPos = yCoord;
				this.worldViewCoord.playerName = playerName;
				this.worldViewCoord.allianceName = allianceName;
				this.worldViewCoord.type = type;
				this.worldViewCoord.level = level;
				this.worldViewCoord.progress = progress;
				this.worldViewCoord.city = type == "City";
				this.worldViewCoord.lawless = type == "LawlessCity";
				this.worldViewCoord.boss = type == "Boss";
				this.worldViewCoord.dungeon = type == "Dungeon";
				this.worldViewCoord.attackable = (type == "City" || type == "Boss" || type == "Dungeon" || type == "LawlessCity");
				return this.worldViewCoord;
			},
			sendTroops:                 function(event) {
				try {
					try {
						var clicked = event.getCurrentTarget();
						var activeCity = webfrontend.data.City.getInstance();
						var app = qx.core.Init.getApplication();
						var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
						var units = activeCity.units;
						var unitsOrdered = [];
						for(var u in units) {

							if(this.DO_NOT_ATTACK_UNITS[u])
								continue;
							if(clicked.orderId == this.PLUNDER_ORDER_ID && this.DO_NOT_PLUNDER_UNITS[u])
								continue;
							if(units[u].count > 0)
								unitsOrdered.push({
									t: u,
									c: units[u].count
								});
						}
						var coords = ava.CombatTools.cityIdToCoords(selectedCity ? selectedCity.get_Coordinates() : this.worldViewCoord.id);
						var request = {
							cityid:                     activeCity.getId(),
							units:                      unitsOrdered,
							targetPlayer:               selectedCity ? selectedCity.get_PlayerName() : this.worldViewCoord.playerName,
							targetCity:                 coords[0] + ":" + coords[1],
							order:                      clicked.orderId,
							transport:                  1,
							timeReferenceType:          1,
							referenceTimeUTCMillis:     0,
							raidTimeReferenceType:      0,
							raidReferenceTimeUTCMillis: 0
						};
						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand("OrderUnits", request, this, this.sentTroops);
					} catch(err) {
						paError(err);
					}
				} catch(e) {
					paError(e);
				}

			},
			sentTroops:                 function(ok, errorCode) {
				try {
					if(errorCode.r0 != 0) {
						if(cityStatusText) {
							cityStatusRow.setMaxHeight(20);
							cityStatusText.setMaxHeight(20);
							cityStatusRow.setVisibility("visible");
							cityStatusText.setValue("Troops won't go.");
							window.setTimeout(clearCityStatusText, 2000);
						}
						paDebug("Troops won't go");
					} else {
						if(cityStatusText) {
							cityStatusRow.setMaxHeight(20);
							cityStatusText.setMaxHeight(20);
							cityStatusRow.setVisibility("visible");
							cityStatusText.setValue("Troops Sent.");
							window.setTimeout(clearCityStatusText, 2000);
						}
					}
				} catch(e) {
					paError(e);

				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
			},
			createRaidApplyToAll:       function() {
				try {
					var orderPage = this.app.getOrderDetailPage();
					orderPage.applyAllBtn = new webfrontend.ui.SoundButton("Apply to all");
					orderPage.applyAllBtn.set({
						marginRight: 4,
						marginLeft:  9
					});
					orderPage.applyAllThisDungeonBtn = new webfrontend.ui.SoundButton("Apply to all this dungeon");
					orderPage.applyAllBtn.onTroopsSent = this.onTroopsSent;
					orderPage.applyAllBtn.addListener("execute", function(e) {
						var rtd = this.findObject(qx.core.Init.getApplication().getOrderDetailPage(), webfrontend.gui.OrderDetail.RaidTimeDisplay);
						var currRecurrType = rtd.getRaidMode();
						var endStep = rtd.getStepTime();
						var orders = webfrontend.data.City.getInstance().unitOrders;
						for(var i in orders) {
							if(orders[i].type == 8) {
								webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
									cityid:           webfrontend.data.City.getInstance().getId(),
									id:               orders[i].id,
									isDelayed:        orders[i].isDelayed,
									recurringType:    currRecurrType,
									recurringEndStep: endStep
								}, this, this.onTroopsSent);
							}
						}
					}, this);
					orderPage.applyAllThisDungeonBtn.onTroopsSent = this.onTroopsSent;
					orderPage.applyAllThisDungeonBtn.addListener("execute", function(e) {
						var rtd = this.findObject(qx.core.Init.getApplication().getOrderDetailPage(), webfrontend.gui.OrderDetail.RaidTimeDisplay);
						var currRecurrType = rtd.getRaidMode();
						var endStep = rtd.getStepTime();
						var orderId = orderPage.getOrderId();
						var city = 0;
						var orders = webfrontend.data.City.getInstance().unitOrders;
						for(var i in orders) {
							if(orders[i].id == orderId) {
								city = orders[i].city;
							}
						}
						for(var i in orders) {
							if(orders[i].type == 8 && orders[i].city == city) {
								webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
									cityid:           webfrontend.data.City.getInstance().getId(),
									id:               orders[i].id,
									isDelayed:        orders[i].isDelayed,
									recurringType:    currRecurrType,
									recurringEndStep: endStep
								}, this, this.onTroopsSent);
							}
						}
					}, this);
					orderPage.addListenerOnce("appear", addApplyAllButtons);
					//window.setTimeout(addApplyAllButtons, 1000);
				} catch(e) {
					paDebug("apply options buttons error: " + e)
				}
				/* (e) {
				 paDebug("apply options buttons error: "+e);
				 } */
			},
			safeGetProperty:            function(obj, prop) {
				if(obj && obj.hasOwnProperty(prop))
					return obj[prop];
				return null;
			},
			findObject:                 function(parent, component, recursive) {
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
			onTroopsSent:               function(ok, errorCode) {
				try {
					if(!ok) {
						if(errorCode != 0) {
							paDebug("Troops won't go");
						}
					}
				} catch(e) {
					paDebug("onTroopsSent: " + e);
				}
				/* (e) {
				 console.log("Error");
				 console.dir(e);
				 } */
			},
			createWorldViewEnhancments: function() {
				this.worldViewMinBtn = new webfrontend.ui.SoundButton("").set({
					icon:     "webfrontend/ui/icons/icon_chat_resize_smaller.png",
					padding:  4,
					minWidth: 10,
					width:    29
				});
				this.worldViewMinBtn.setLayoutProperties({
					top:   3,
					right: 9
				});
				this.worldViewMinBtn.addListener("execute", function(e) {
					if(this.app.worldMapConfig.getLayoutProperties().top > 0) {
						this.app.worldMapConfig.setLayoutProperties({
							top:    null,
							height: 4
						});
						this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
					} else {
						this.app.worldMapConfig.setLayoutProperties({
							top:    187,
							height: null
						});
						this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
					}
				}, this);
				this.worldViewMinBtn.addListener("appear", function(e) {
					if(this.app.worldMapConfig.getLayoutProperties().top > 0) {
						this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
					} else {
						this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
					}
				}, this);
				if(this.app.worldMapConfig == null) {
					this.app.worldMapConfig = new webfrontend.gui.WorldMapConfig().set({
						width: 400
					});
					this.app.worldMapConfig.setLayoutProperties({
						top:    187,
						left:   0,
						bottom: 0
					});
				}
				this.app.worldMapConfig.setMinHeight(0);
				this.app.worldMapConfig.add(this.worldViewMinBtn);
			},
			addPanel:                   function(panel) {
				this.bQc.getLayoutParent().addBefore(panel, this.bQc);
			}


		}
	});
AvaInitLegacy();
avaInitRaids();

ava.Main.getInstance().initialize();