

//var qx = window.qx;


/*
types that are not explicity registered
*/
declare module qx {

module Bootstrap
{
	
	module util {  }
}

 module locale { }
module core.Environment { var __core_Environment : any; }  //
module bom.client.EcmaScript {}
module lang.normalize.Function {}
module util.OOUtil {}
module lang.normalize.Array {}
module Mixin {}
module core.Aspect {}
module lang.normalize.String {}
module lang.normalize.Object {}
module Interface {}
module lang.normalize.Error {}
module lang.normalize.Date {}
module core.Property {}
module Class {}
module core.ObjectRegistry { var __core_ObjectRegistry :boolean; } //
module util.RingBuffer {}
module dev.StackTrace {}
module lang.Array {}
module lang.Function {}
module log.appender.RingBuffer {}
module lang.Type {}
module log.Logger {}
module dom.Node {}
module bom.Event {}
module event.Manager {}
module event.Registration {}
module core.Object {}
module ui.form.RadioGroup {}
module bom.client.Json {}
module core.Assert {}
module lang.JsonImpl {}
module type.BaseError {}
module core.AssertionError {}
module lang.Json {}
module core.BaseInit {}
module core.GlobalError {}
module event.GlobalError {}
module event.type.Event {}
module event.type.Native {}
module util.ObjectPool {}
module event.Pool {}
module event.handler.Window {}
module event.handler.Application {}
module event.dispatch.Direct {}
module core.Init {}
module application.AbstractGui {}
module application.Standalone {}
//  module Application {}
module ui.window.Manager {}
module ui.core.DecoratorFactory {}
module ui.core.LayoutItem {}
module ui.core.Widget {}
module ui.window.Window {}
//  module ui.CustomWindow {}
//  module gui.Mail.Contacts.MainWindow {}
module ui.basic.Label {}
//  module ui.PlayerLabel {}
module ui.layout.Abstract {}
module ui.layout.Atom {}
module util.TimerManager {}
module ui.toolbar.Part {}
module ui.table.model.Abstract {}
module ui.table.model.Remote {}
//  module data.AllianceResourceDataModel {}
//  module data.ReportHeaderDataModel {}
//  module data.Chat {}
module ui.layout.VBox {}
module bom.Stylesheet {}
module ui.table.cellrenderer.Abstract {}
module bom.client.Css {}
module ui.container.Composite {}
module ui.tabview.Page {}
//  module gui.Overviews.AllianceOverviewsPage {}
//  module gui.Queue {}
//  module gui.BuildingQueue {}
module io.remote.Exchange {}
//  module gui.CityBarWidget {}
module util.StringSplit {}
//  module gui.ShopPlayerSpecialOfferItem {}
module bom.request.Script {}
module ui.table.selection.Manager {}
module ui.treevirtual.SelectionManager {}
module bom.client.Engine {}
module ui.basic.Image {}
module ui.core.DragDropCursor {}
module ui.basic.Atom {}
module ui.form.ToggleButton {}
//  module gui.PlayerInfo.PageBase {}
//  module gui.PopupWindow {}
//  module gui.FortuneTeller.MainWindow {}
//  module data.Substitution {}
module io.part.Part {}
module type.BaseArray {}
module qxWeb {}
module qxmodule.Css {}
module qxmodule.Polyfill {}
module qxmodule.Event {}
module qxmodule.Animation {}
module util.DeferredCallManager {}
module lang.Object {}
module util.DeferredCall {}
module html.Element {}
module html.Label {}
//  module data.Player {}
//  module gui.OverlayWindow {}
//  module gui.ResearchWidget {}
//  module gui.Mail.DistributionLists.ListItem {}
module ui.splitpane.Pane {}
module bom.element.Clip {}
module bom.element.Opacity {}
module bom.Style {}
module bom.client.OperatingSystem {}
module bom.client.Browser {}
module bom.element.Cursor {}
module lang.String {}
module bom.element.BoxSizing {}
module bom.element.Style {}
module ui.decoration.Abstract {}
module ui.decoration.css3.BorderImage {}
module ui.control.ColorSelector {}
//  module gui.AdWindow {}
module io.remote.transport.Abstract {}
module ui.decoration.GridDiv {}
//  module gui.Overviews.Alliance.DefenseHistoryPage {}
//  module gui.ConfirmationWidget {}
module util.placement.AbstractAxis {}
module util.placement.BestFitAxis {}
module ui.form.Slider {}
//  module gui.RetreatUnitsWidget {}
//  module gui.NewsletterWindow {}
module ui.core.EventHandler {}
module ui.core.ColumnData {}
module ui.table.columnmodel.resizebehavior.Abstract {}
module ui.table.columnmodel.resizebehavior.Default {}
//  module gui.Achievement.NearlyCompletedItem {}
module event.type.Dom {}
module ui.table.headerrenderer.Default {}
//  module ui.TableHeaderCellRendererRichTT {}
//  module gui.Guide.SubPage.ResourceProduction.Base {}
//  module gui.Guide.SubPage.ResourceProduction.Stone {}
module bom.client.Html {}
module bom.element.Class {}
module ui.table.cellrenderer.Default {}
module ui.table.cellrenderer.Replace {}
//  module ui.TableCellRendererReplaceCustom {}
//  module data.Server {}
module ui.table.headerrenderer.HeaderCell {}
//  module gui.CityDefenseInfoView {}
module bom.client.Transport {}
//  module res.Challenges {}
module ui.core.selection.Abstract {}
module ui.core.selection.Widget {}
module bom.webfonts.Manager {}
module ui.control.DateChooser {}
module util.ValueManager {}
module ui.splitpane.Blocker {}
//  module ui.ButtonContainer {}
module ui.menu.AbstractButton {}
module core.WindowError {}
//  module ui.CollapseContainer {}
module io.remote.transport.Iframe {}
//  module data.FriendInvitation {}
//  module ui.ShrineLabel {}
module ui.splitpane.VLayout {}
module bom.client.CssAnimation {}
module bom.client.Stylesheet {}
module bom.element.AnimationCss {}
module sharedfrontend.Localization {}
//  module gui.SubstitutionContacts {}
//  module base.Timer {}
module ui.tooltip.Manager {}
module util.ColorUtil {}
module util.AliasManager {}
//  module gui.Guide.MainWindow {}
module util.LibraryManager {}
module event.type.Touch {}
module event.type.Tap {}
module event.type.Swipe {}
module bom.client.Event {}
module event.handler.Orientation {}
module event.handler.TouchCore {}
module event.handler.UserAction {}
module event.handler.Touch {}
module theme.manager.Color {}
//  module vis.Entity {}
//  module vis.CityResField {}
//  module data.ServerTime {}
module event.handler.Input {}
//  module data.Mail {}
//  module gui.CityNotesWidget {}
module ui.tree.core.FolderOpenButton {}
module bom.element.Scroll {}
//  module gui.InfoNavigatorPage {}
//  module gui.Guide.SubPage.Raiding.DungeonRaids.Base {}
//  module gui.Guide.SubPage.Raiding.DungeonRaids.Progress {}
module util.format.NumberFormat {}
module ui.table.cellrenderer.Conditional {}
module theme.manager.Icon {}
module ui.form.Button {}
module ui.form.RadioButton {}
//  module gui.SubstituteItem {}
//  module ui.MgrValueChange {}
module util.placement.DirectAxis {}
module util.placement.KeepAlignAxis {}
//  module gui.OverlayWidget {}
//  module gui.QuestListWidget {}
//  module ui.BrandBoostRedemption {}
module html.Blocker {}
module io.remote.transport.XmlHttp {}
module ui.root.Abstract {}
module bom.client.Plugin {}
module xml.Document {}
//  module draw.Node {}
//  module draw.DivNode {}
//  module draw.ProgressBarNode {}
module ui.table.headerrenderer.Icon {}
//  module gui.Rankings.Challenges {}
module ui.core.queue.Visibility {}
//  module ui.CityLabel {}
module util.DisposeUtil {}
//  module ui.CityCoordLabel {}
module ui.groupbox.GroupBox {}
//  module gui.PlayerInfo.InfoPage {}
module theme.manager.Meta {}
module ui.tabview.TabView {}
//  module data.Enlightenment {}
module bom.client.Scroll {}
module ui.form.AbstractSelectBox {}
//  module ui.SelectBoxImageHeader {}
//  module gui.SelCityGroups {}
module html.Decorator {}
module event.type.Mouse {}
module ui.table.pane.CellEvent {}
//  module gui.Alliance.Forum.TitleLabel {}
module ui.decoration.BoxDiv {}
//  module gui.PatchNotesWidget {}
module ui.popup.Manager {}
//  module gui.Mail.DistributionLists.EditListItem {}
module ui.layout.LineSizeIterator {}
module bom.webfonts.Validator {}
//  module gui.Chat {}
module ui.form.SelectBox {}
//  module math.Vector2 {}
//  module gui.UtilQuickUse {}
module io.remote.Response {}
//  module data.City {}
//  module gui.Guide.Page.Raiding {}
module bom.element.Animation {}
module util.StringEscape {}
//  module gui.ShopSpecialOfferItem {}
module ui.decoration.Grid {}
module ui.decoration.Background {}
module Theme {}
module ui.decoration.AbstractBox {}
module ui.decoration.VBox {}
module ui.decoration.Single {}
module ui.decoration.Beveled {}
module ui.decoration.HBox {}
module ui.decoration.Uniform {}
module ui.root.Application {}
module ui.core.queue.Manager {}
//  module gui.Overviews.Alliance.IncomingAttacksPage {}
//  module draw.CameraImageNode {}
//  module draw.CameraFogNode {}
module type.BaseString {}
//  module gui.FortuneTeller.LargeCardDisplay {}
module ui.core.FocusHandler {}
module io.remote.transport.Script {}
//  module gui.Overviews.Minister.DefensePage {}
//  module res.llcomp {}
module event.type.MouseWheel {}
module ui.core.selection.ScrollArea {}
module util.placement.Placement {}
module ui.form.Spinner {}
//  module ui.SpinnerInt {}
//  module gui.Guide.Page.SecondCity {}
module bom.Range {}
//  module net.CommandManager {}
//  module gui.Achievement.Model {}
//  module gui.Achievement.AchievementModel {}
//  module data.TradeMinister {}
//  module data.DataContract.Contracts {}
//  module gui.ReportAbusePage {}
//  module ui.BrandBoostWrapper {}
//  module gui.Alliance.Forum.PropertiesPage {}
module ui.layout.Util {}
module ui.core.scroll.AbstractScrollArea {}
module ui.container.Scroll {}
module ui.table.Table {}
//  module ui.CustomTable {}
module bom.client.Xml {}
module event.dispatch.AbstractBubbling {}
module event.dispatch.DomBubbling {}
//  module gui.OrderDetail.RaidTimeDisplay {}
//  module gui.Guide.MinisterHint {}
//  module gui.Mail.Contacts.TabBase {}
module ui.tabview.TabButton {}
//  module gui.DetailView {}
//  module gui.MoongateDetailView {}
//  module data.Quest {}
module event.type.Orientation {}
module ui.table.pane.Scroller {}
//  module ui.TablePaneScrollerCustom {}
//  module gui.WorldMapConfig {}
module event.handler.Object {}
module event.util.Keyboard {}
module ui.form.RepeatButton {}
module ui.table.pane.FocusIndicator {}
module ui.toolbar.Separator {}
module event.Timer {}
module event.handler.Mouse {}
module ui.table.cellrenderer.Html {}
module ui.form.MenuButton {}
module ui.menubar.Button {}
module ui.treevirtual.SimpleTreeDataCellRenderer {}
//  module gui.BuildingPlaceDetailView {}
module ui.table.pane.Pane {}
//  module data.AllianceInvitation {}
module ui.menu.Manager {}
module ui.layout.Grow {}
//  module gui.OrderDetail.Header {}
//  module gui.ShopWidget {}
module ui.table.celleditor.AbstractField {}
module ui.table.celleditor.TextField {}
module ui.table.columnmodel.Basic {}
//  module config.Chat {}
//  module gui.Guide.SubPage.ResourceProduction.Gold {}
//  module gui.Mail.ReadMailPage {}
module bom.Viewport {}
//  module gui.CityGroupsWidget {}
//  module gui.EndSubstitutionWidget {}
module ui.core.scroll.ScrollSlider {}
module event.handler.Iframe {}
module bom.Iframe {}
module io.remote.RequestQueue {}
//  module gui.SelBoxContinentFilter {}
//  module Login {}
//  module gui.NewsletterPage {}
//  module net.UpdateManager {}
module ui.treevirtual.SimpleTreeDataModel {}
module ui.core.queue.Appearance {}
//  module gui.Overviews.Alliance.EnlightenedCitiesPage {}
//  module gui.Mail.SendMailWidget {}
module ui.layout.Basic {}
module ui.table.celleditor.SelectBox {}
//  module ui.TableCellEditorSelectBoxCustom {}
//  module gui.Alliance.Forum.MainPage {}
//  module gui.TradeInfoPage {}
//  module base.GameObjects {}
//  module gui.ReportListWidget {}
//  module gui.MinisterInfo.Page.Base {}
//  module gui.MinisterInfo.Page.DefenseOptions {}
//  module gui.Overviews.Minister.ResourcePage {}
//  module gui.Achievement.PageDisplay {}
//  module gui.Alliance.Info.PageBase {}
//  module gui.Alliance.Info.MemberList {}
//  module gui.PlayerInfo.MainWindow {}
//  module gui.ReportPage {}
//  module gui.FortuneTeller.Selection {}
//  module gui.ReportPageArmyCont {}
module ui.menu.Button {}
//  module ui.ContainerButton {}
//  module ui.RewardPreviewButton {}
module bom.Selector {}
//  module vis.CityBuilding {}
module ui.popup.Popup {}
module ui.tooltip.ToolTip {}
module ui.table.pane.Clipper {}
module bom.client.CssTransform {}
module locale.Number {}
module ui.form.CheckBox {}
//  module gui.Trade.OwnOffersPage {}
//  module gui.InfoWidget {}
module ui.table.selection.Model {}
module ui.treevirtual.TreeVirtual {}
module ui.embed.Html {}
module util.PropertyUtil {}
module ui.layout.Flow {}
//  module gui.MinisterInfo.Base {}
module bom.Label {}
module ui.toolbar.ToolBar {}
module bom.element.Transform {}
module lang.Generics {}
//  module gui.Alliance.DiplomacyPage {}
module event.handler.Focus {}
module event.AcceleratingTimer {}
module event.type.Focus {}
//  module gui.Alliance.Info.InfoPage {}
//  module gui.MinisterMerchandiseWidget {}
//  module gui.Guide.SubPage.Raiding.DungeonRaids.Types {}
module io.PartLoader {}
//  module ui.SoundButton {}
//  module ui.DateChooserButton {}
//  module gui.Alliance.VirtuesPage {}
module io.part.ClosurePart {}
//  module gui.Social.InvitationsPage {}
//  module gui.Achievement.InfoWindow {}
module ui.splitpane.Slider {}
//  module gui.ShopNotEnoughFundsPopup {}
//  module gui.ResearchOverviewWidget {}
module bom.element.AnimationJs {}
module bom.Selection {}
//  module gui.Achievement.ChallengeHistoryModel {}
//  module gui.PlayerInfo.CitiesPage {}
//  module gui.Overviews.Alliance.EditEnlightenmentCommentWindow {}
//  module gui.OptionsWidget {}
//  module gui.Overviews.Alliance.OffenseHistoryPage {}
//  module gui.Guide.Page.CityDefense {}
module ui.tree.selection.SelectionManager {}
module ui.tree.Tree {}
//  module data.MailHeaderDataModel {}
module ui.container.Stack {}
//  module gui.ShrineDetailView {}
module event.handler.Appear {}
module ui.table.columnmodel.Resize {}
module ui.core.scroll.ScrollPane {}
//  module data.Events {}
module bom.Font {}
//  module ui.RowRendererCustom {}
//  module vis.Main {}
//  module gui.FortuneTeller.Card {}
//  module data.AllianceForum {}
module html.Input {}
//  module ui.MultirowTabViewWidget {}
//  module city.CityObject {}
module bom.Input {}
//  module gui.Util {}
module ui.table.model.Simple {}
module util.ResourceManager {}
//  module gui.Alliance.MemberStatusPage {}
//  module gui.FoodCityOverviewWidget {}
//  module gui.CityDetailView {}
//  module res.Main {}
module theme.manager.Appearance {}
//  module ui.ScrollContainerCustom {}
//  module data.Report {}
module ui.table.rowrenderer.Default {}
module ui.treevirtual.SimpleTreeDataRowRenderer {}
//  module gui.Alliance.Info.Reward.RewardEditWindow {}
//  module gui.Alliance.Info.AchievementsPage {}
module util.StringBuilder {}
//  module gui.Guide.ConditionVoidResourceBody {}
//  module gui.Alliance.Forum.ThreadLabel {}
//  module gui.Credits {}
//  module gui.Alliance.Forum.ThreadPage {}
//  module gui.CastleCustomization.MainWindow {}
//  module gui.Guide.SubPage.ResourceProduction.Food {}
module ui.core.SingleSelectionManager {}
module locale.LocalizedString {}
//  module draw.BackgroundTextNode {}
//  module gui.Alliance.Forum.PostPage {}
//  module gui.NewPlayerWidget {}
//  module gui.CastleCustomization.Util {}
module ui.table.columnmenu.Button {}
//  module city.CityLayout {}
//  module draw.Widget {}
//  module gui.CityTradeInfoView {}
//  module gui.CityCommandInfoView {}
//  module data.SimpleTreeDataModelCustom {}
//  module gui.SubstituteReqItem {}
//  module gui.Alliance.SupporterRankingsPage {}
//  module ui.DateTimeChooser {}
//  module gui.Guide.SubPage.Raiding.BossRaids.LootAndRestrictions {}
//  module gui.SendArmyWindow {}
//  module gui.Mail.Contacts.TabAlliance {}
//  module gui.FortuneTeller.Util {}
module util.Uri {}
//  module draw.ImageNode {}
//  module vis.CityFortification {}
//  module ui.CustomSelectBox {}
//  module gui.PlayerInfo.LouAchievementsPage {}
module ui.core.queue.Widget {}
//  module gui.Achievement.SpecialsTabView {}
//  module gui.TradeMinisterOptionsPage {}
//  module ui.SoundToggleButton {}
module theme.manager.Font {}
//  module gui.Overviews.Alliance.OutgoingAttacksPage {}
//  module gui.Mail.Contacts.TabFriends {}
module ui.splitpane.HLayout {}
//  module gui.PlayerInfo.AchievementsPage {}
//  module ui.ColorSelectorCustom {}
//  module gui.Alliance.Forum.PostItem {}
//  module vis.CityObject {}
//  module gui.StatisticsWidget {}
module ui.layout.Dock {}
module ui.menu.Layout {}
//  module data.QuickUseItems {}
//  module gui.Alliance.InvitationItem {}
//  module gui.Alliance.OverviewPage {}
//  module data.Inventory {}
//  module vis.CityWallLevel {}
//  module vis.CityBuildingPlace {}
//  module gui.MinisterInfo.Page.WarOptions {}
module ui.splitpane.Splitter {}
//  module data.PlayerListDataModel {}
//  module gui.PlayerInfo.RewardEditWindow {}
module ui.core.scroll.NativeScrollBar {}
//  module gui.Overviews.MinisterOverviewsPage {}
//  module ui.FixedSizeLabel {}
//  module gui.SelCities {}
module html.Image {}
//  module data.ShopCatalog {}
module event.Emitter {}
//  module gui.QuestTrackerWidget {}
//  module gui.Alliance.ShrinePage {}
module ui.form.AbstractField {}
module ui.form.TextArea {}
module ui.form.List {}
//  module gui.OrderDetail.MoongateDisplay {}
//  module gui.Alliance.MemberRightsPage {}
//  module gui.Social.MainWidget {}
module ui.layout.Grid {}
//  module ui.DateChooser {}
//  module gui.layout.Loader {}
//  module gui.QuestWidget {}
module locale.Manager {}
//  module gui.Alliance.Info.NamesPage {}
//  module gui.DebugCommandWindow {}
module bom.element.Attribute {}
//  module gui.Mail.ListWidget {}
//  module gui.MinisterInfo.Trade {}
module event.handler.Keyboard {}
module event.handler.Capture {}
module event.handler.DragDrop {}
module ui.tree.core.AbstractItem {}
module event.type.Data {}
//  module gui.WorldMapHelper {}
module ui.table.cellrenderer.AbstractImage {}
module ui.table.pane.Model {}
//  module data.FriendList {}
module bom.element.Dimension {}
module bom.client.Locale {}
module locale.Date {}
module io.ImageLoader {}
module bom.AnimationFrame {}
//  module gui.Overviews.MainWindow {}
module ui.menu.CheckBox {}
module ui.table.columnmenu.MenuItem {}
module lang.Number {}
module event.handler.Offline {}
module event.type.Drag {}
//  module gui.WndEditPreviewSaveText {}
//  module gui.Guide.SubPage.ResourceProduction.Iron {}
module util.format.DateFormat {}
//  module gui.WelcomeWidget {}
module bom.element.Background {}
//  module ui.MessageBox {}
//  module gui.UnitQueue {}
module bom.Cookie {}
//  module gui.ServerBarWidget {}
module event.type.KeyInput {}
//  module gui.WorldToolTip {}
//  module gui.CastleCustomization.SelectWidget {}
//  module gui.Achievement.OverviewDisplay {}
module ui.indicator.ProgressBar {}
//  module data.TreeDataCellRendererCustom {}
//  module gui.SystemMessageWindow {}
//  module gui.Guide.SubPage.Raiding.DungeonRaids.Loot {}
//  module data.Alliance {}
//  module gui.layout.FileService {}
//  module gui.OrderDetail.UnitDisplay {}
module ui.container.SlideBar {}
module data.Array {}
module ui.form.ListItem {}
//  module gui.MinisterInfo.Page.BuildOptions {}
//  module ui.CellrendererBooleanExtra {}
module ui.core.Blocker {}
module theme.manager.Decoration {}
//  module gui.Guide.ConditionArrow {}
module io.part.Package {}
//  module gui.Rankings.ChallengesDataModel {}
//  module gui.Trade.SendResourcesPage {}
module ui.table.pane.Header {}
module bom.element.AnimationHandle {}
//  module gui.Trade.RequestResourcesPage {}
module event.type.KeySequence {}
//  module ui.QuickUseButton {}
//  module data.IgnoreList {}
module ui.menu.Menu {}
module ui.tree.core.AbstractTreeItem {}
module ui.tree.TreeFile {}
//  module gui.MentorWidget {}
//  module gui.RecrutingWidget {}
//  module gui.DefenseMinisterAutoRecruitTab {}
//  module data.Tech {}
//  module gui.Social.IgnorePage {}
//  module data.SimpleColFormattingDataModel {}
//  module data.DataContract.Translator {}
//  module gui.Guide.Page.ResourceProduction {}
//  module gui.PopupChain {}
//  module draw.EffectNode {}
//  module gui.MinisterInfo.Page.TradeOptions {}
//  module gui.Achievement.RecentlyCompletedItem {}
//  module gui.CityInfoView {}
module ui.table.cellrenderer.Number {}
//  module Util {}
//  module ui.RichHeaderCell {}
module event.handler.Element {}
//  module data.Achievement {}
module bom.Document {}
//  module gui.Overviews.Minister.CommandPage {}
//  module gui.Mail.DistributionLists.EditWindow {}
//  module gui.Achievement.CategorySelection {}
//  module gui.MinisterInfo.AppointMinisterContainer {}
//  module gui.MoveBuildingDetailView {}
//  module vis.Util {}
module ui.decoration.DynamicDecorator {}
module ui.core.queue.Dispose {}
module ui.layout.Canvas {}
//  module gui.DailyRewardWidget {}
//  module gui.Guide.SubPage.Raiding.DungeonRaids.Weakness {}
//  module gui.Alliance.MembersPage {}
module ui.form.HoverButton {}
//  module gui.Guide.Page.Artifacts {}
//  module gui.ReportPageArmyGrid {}
//  module gui.Mail.Contacts.ListItem {}
module data.SingleValueBinding {}
//  module gui.Overviews.Minister.BuildingQueuePage {}
module event.dispatch.MouseCapture {}
//  module quest.Main {}
module ui.control.ColorPopup {}
module ui.menu.Separator {}
module ui.tree.TreeFolder {}
module event.Idle {}
//  module gui.Alliance.MainWidget {}
//  module gui.Overviews.Alliance.Util {}
//  module gui.OrderDetail.LootDisplay {}
module ui.form.TextField {}
//  module gui.Achievement.ServerFirstModel {}
//  module gui.Achievement.TabPageNormal {}
module ui.menu.ButtonLayout {}
module dom.Hierarchy {}
//  module gui.InfoNavigatorWidget {}
//  module gui.OrderDetail.MainPage {}
module ui.core.queue.Layout {}
//  module ui.AllianceRewardElementPopup {}
//  module gui.FortuneTeller.WelcomeScreen {}
module bom.webfonts.WebFont {}
module ui.table.cellrenderer.Boolean {}
//  module gui.MapSelectorBarWidget {}
module ui.core.Spacer {}
//  module ui.ColorPopupCustom {}
//  module gui.MinisterInfo.Defense {}
//  module gui.ItemsWidget {}
//  module gui.Guide.SubPage.Raiding.BossRaids.GeneralAndTypes {}
//  module gui.Guide.SubPage.ResourceProduction.Wood {}
//  module draw.Scene {}
//  module gui.NewCityView {}
//  module gui.SpecialOfferPopupWindow {}
//  module gui.Alliance.Info.MainWindow {}
module bom.element.Location {}
module html.Root {}
//  module gui.Trade.OtherOffersPage {}
module ui.menu.MenuSlideBar {}
//  module gui.FoodWarningsWindow {}
//  module draw.BoxNode {}
//  module gui.RewardsWidget {}
//  module data.AllianceDataModel {}
//  module gui.MinisterInfo.Build {}
module bom.String {}
//  module gui.Achievement.OverviewCategoryProgressItem {}
module Part {}
//  module gui.Trade.MainWidget {}
//  module ui.AllianceLabel {}
//  module gui.AllianceInvitationPopup {}
//  module gui.TreeRowRendererCustom {}
module ui.table.cellrenderer.Image {}
//  module config.Config {}
//  module gui.Guide.ConditionContainer {}
//  module gui.Social.FriendsPage {}
//  module gui.TitleWidget {}
//  module ui.TableHeaderCellRendererIconRichTT {}
//  module gui.Trade.PurifyResourcesPage {}
module bom.Element {}
//  module gui.Achievement.NotificationPopup {}
//  module gui.BuildingDetailView {}
//  module gui.WorldMapLegendWindow {}
//  module gui.CityInfoPage {}
module ui.toolbar.Button {}
module dev.ObjectSummary {}
//  module data.PalaceInfo {}
//  module gui.Achievement.ServerFirstPage {}
//  module gui.EventWindow {}
module bom.element.Decoration {}
//  module gui.DungeonDetailView {}
module dom.Element {}
//  module ui.CellRendererHtmlCustom {}
module ui.form.PasswordField {}
module core.ValidationError {}
module io.remote.Request {}
module ui.layout.HBox {}
//  module gui.MinisterInfo.War {}
module ui.toolbar.PartContainer {}
//  module gui.Achievement.AchievementLayoutItem {}
module ui.treevirtual.DefaultDataCellRenderer {}
module ui.core.scroll.ScrollBar {}

}

declare module webfrontEnd
{
	module data { }
	module Application {}
	module ui.CustomWindow {}
	module gui.Mail.Contacts.MainWindow {}
	module ui.PlayerLabel {}
	module data.AllianceResourceDataModel {}
	module data.ReportHeaderDataModel {}
	module data.Chat {}
	module gui.Overviews.AllianceOverviewsPage {var __AllianceOverviewsPage : any;}
	module gui.Queue {}
	module gui.BuildingQueue {}
	module gui.CityBarWidget {}
	module gui.ShopPlayerSpecialOfferItem { var __ShopPlayerSpecialOfferItem : any; }
	module gui.PlayerInfo.PageBase {}
	module gui.PopupWindow {}
	module gui.FortuneTeller.MainWindow {}
	module data.Substitution {}
	module data.Player {}
	module gui.OverlayWindow {}
	module gui.ResearchWidget {}
	module gui.Mail.DistributionLists.ListItem {}
	module gui.AdWindow {}
	module gui.Overviews.Alliance.DefenseHistoryPage {}
	module gui.ConfirmationWidget {}
//   module qx.util.placement.AbstractAxis {}
//   module qx.util.placement.BestFitAxis {}
//   module qx.ui.form.Slider {}
	module gui.RetreatUnitsWidget {}
	module gui.NewsletterWindow {}
//   module qx.ui.core.EventHandler {}
//   module qx.ui.core.ColumnData {}
//   module qx.ui.table.columnmodel.resizebehavior.Abstract {}
//   module qx.ui.table.columnmodel.resizebehavior.Default {}
	module gui.Achievement.NearlyCompletedItem {}
//   module qx.event.type.Dom {}
//   module qx.ui.table.headerrenderer.Default {}
	module ui.TableHeaderCellRendererRichTT {}
	module gui.Guide.SubPage.ResourceProduction.Base {}
	module gui.Guide.SubPage.ResourceProduction.Stone {}
//   module qx.bom.client.Html {}
//   module qx.bom.element.Class {}
//   module qx.ui.table.cellrenderer.Default {}
//   module qx.ui.table.cellrenderer.Replace {}
	module ui.TableCellRendererReplaceCustom {}
	module data.Server {}
//   module qx.ui.table.headerrenderer.HeaderCell {}
	module gui.CityDefenseInfoView {}
//   module qx.bom.client.Transport {}
	module res.Challenges {}
//   module qx.ui.core.selection.Abstract {}
//   module qx.ui.core.selection.Widget {}
//   module qx.bom.webfonts.Manager {}
//   module qx.ui.control.DateChooser {}
//   module qx.util.ValueManager {}
//   module qx.ui.splitpane.Blocker {}
	module ui.ButtonContainer {}
//   module qx.ui.menu.AbstractButton {}
//   module qx.core.WindowError {}
	module ui.CollapseContainer {}
//   module qx.io.remote.transport.Iframe {}
	module data.FriendInvitation {}
	module ui.ShrineLabel {}
//   module qx.ui.splitpane.VLayout {}
//   module qx.bom.client.CssAnimation {}
//   module qx.bom.client.Stylesheet {}
//   module qx.bom.element.AnimationCss {}
	module sharedfrontend.Localization {}
	module gui.SubstitutionContacts {}
	module base.Timer {}
//   module qx.ui.tooltip.Manager {}
//   module qx.util.ColorUtil {}
//   module qx.util.AliasManager {}
	module gui.Guide.MainWindow {}
//   module qx.util.LibraryManager {}
//   module qx.event.type.Touch {}
//   module qx.event.type.Tap {}
//   module qx.event.type.Swipe {}
//   module qx.bom.client.Event {}
//   module qx.event.handler.Orientation {}
//   module qx.event.handler.TouchCore {}
//   module qx.event.handler.UserAction {}
//   module qx.event.handler.Touch {}
//   module qx.theme.manager.Color {}
	module vis.Entity {}
	module vis.CityResField {}
	module data.ServerTime {}
//   module qx.event.handler.Input {}
	module data.Mail {}
	module gui.CityNotesWidget {}
//   module qx.ui.tree.core.FolderOpenButton {}
//   module qx.bom.element.Scroll {}
	module gui.InfoNavigatorPage {}
	module gui.Guide.SubPage.Raiding.DungeonRaids.Base {}
	module gui.Guide.SubPage.Raiding.DungeonRaids.Progress {}
//   module qx.util.format.NumberFormat {}
//   module qx.ui.table.cellrenderer.Conditional {}
//   module qx.theme.manager.Icon {}
//   module qx.ui.form.Button {}
//   module qx.ui.form.RadioButton {}
	module gui.SubstituteItem {}
	module ui.MgrValueChange {}
//   module qx.util.placement.DirectAxis {}
//   module qx.util.placement.KeepAlignAxis {}
	module gui.OverlayWidget {}
	module gui.QuestListWidget {}
	module ui.BrandBoostRedemption {}
//   module qx.html.Blocker {}
//   module qx.io.remote.transport.XmlHttp {}
//   module qx.ui.root.Abstract {}
//   module qx.bom.client.Plugin {}
//   module qx.xml.Document {}
	module draw.Node {}
	module draw.DivNode {}
	module draw.ProgressBarNode {}
//   module qx.ui.table.headerrenderer.Icon {}
	module gui.Rankings.Challenges {}
//   module qx.ui.core.queue.Visibility {}
	module ui.CityLabel {}
//   module qx.util.DisposeUtil {}
	module ui.CityCoordLabel {}
//   module qx.ui.groupbox.GroupBox {}
	module gui.PlayerInfo.InfoPage {}
//   module qx.theme.manager.Meta {}
//   module qx.ui.tabview.TabView {}
	module data.Enlightenment {}
//   module qx.bom.client.Scroll {}
//   module qx.ui.form.AbstractSelectBox {}
	module ui.SelectBoxImageHeader {}
	module gui.SelCityGroups {}
//   module qx.html.Decorator {}
//   module qx.event.type.Mouse {}
//   module qx.ui.table.pane.CellEvent {}
	module gui.Alliance.Forum.TitleLabel {}
//   module qx.ui.decoration.BoxDiv {}
	module gui.PatchNotesWidget {}
//   module qx.ui.popup.Manager {}
	module gui.Mail.DistributionLists.EditListItem {}
//   module qx.ui.layout.LineSizeIterator {}
//   module qx.bom.webfonts.Validator {}
	module gui.Chat {}
//   module qx.ui.form.SelectBox {}
	module math.Vector2 {}
	module gui.UtilQuickUse {}
//   module qx.io.remote.Response {}
	module data.City {}
	module gui.Guide.Page.Raiding {}
//   module qx.bom.element.Animation {}
//   module qx.util.StringEscape {}
	module gui.ShopSpecialOfferItem {}
//   module qx.ui.decoration.Grid {}
//   module qx.ui.decoration.Background {}
//   module qx.Theme {}
//   module qx.ui.decoration.AbstractBox {}
//   module qx.ui.decoration.VBox {}
//   module qx.ui.decoration.Single {}
//   module qx.ui.decoration.Beveled {}
//   module qx.ui.decoration.HBox {}
//   module qx.ui.decoration.Uniform {}
//   module qx.ui.root.Application {}
//   module qx.ui.core.queue.Manager {}
	module gui.Overviews.Alliance.IncomingAttacksPage {}
	module draw.CameraImageNode {}
	module draw.CameraFogNode {}
//   module qx.type.BaseString {}
	module gui.FortuneTeller.LargeCardDisplay {}
//   module qx.ui.core.FocusHandler {}
//   module qx.io.remote.transport.Script {}
	module gui.Overviews.Minister.DefensePage {}
	module res.llcomp {}
//   module qx.event.type.MouseWheel {}
//   module qx.ui.core.selection.ScrollArea {}
//   module qx.util.placement.Placement {}
//   module qx.ui.form.Spinner {}
	module ui.SpinnerInt {}
	module gui.Guide.Page.SecondCity {}
//   module qx.bom.Range {}
	module net.CommandManager {}
	module gui.Achievement.Model {}
	module gui.Achievement.AchievementModel {}
	module data.TradeMinister {}
	module data.DataContract.Contracts {}
	module gui.ReportAbusePage {}
	module ui.BrandBoostWrapper {}
	module gui.Alliance.Forum.PropertiesPage {}
//   module qx.ui.layout.Util {}
//   module qx.ui.core.scroll.AbstractScrollArea {}
//   module qx.ui.container.Scroll {}
//   module qx.ui.table.Table {}
	module ui.CustomTable {}
//   module qx.bom.client.Xml {}
//   module qx.event.dispatch.AbstractBubbling {}
//   module qx.event.dispatch.DomBubbling {}
	module gui.OrderDetail.RaidTimeDisplay {}
	module gui.Guide.MinisterHint {}
	module gui.Mail.Contacts.TabBase {}
//   module qx.ui.tabview.TabButton {}
	module gui.DetailView {}
	module gui.MoongateDetailView {}
	module data.Quest {}
//   module qx.event.type.Orientation {}
//   module qx.ui.table.pane.Scroller {}
	module ui.TablePaneScrollerCustom {}
	module gui.WorldMapConfig {}
//   module qx.event.handler.Object {}
//   module qx.event.util.Keyboard {}
//   module qx.ui.form.RepeatButton {}
//   module qx.ui.table.pane.FocusIndicator {}
//   module qx.ui.toolbar.Separator {}
//   module qx.event.Timer {}
//   module qx.event.handler.Mouse {}
//   module qx.ui.table.cellrenderer.Html {}
//   module qx.ui.form.MenuButton {}
//   module qx.ui.menubar.Button {}
//   module qx.ui.treevirtual.SimpleTreeDataCellRenderer {}
	module gui.BuildingPlaceDetailView {}
//   module qx.ui.table.pane.Pane {}
	module data.AllianceInvitation {}
//   module qx.ui.menu.Manager {}
//   module qx.ui.layout.Grow {}
	module gui.OrderDetail.Header {}
	module gui.ShopWidget {}
//   module qx.ui.table.celleditor.AbstractField {}
//   module qx.ui.table.celleditor.TextField {}
//   module qx.ui.table.columnmodel.Basic {}
	module config.Chat {}
	module gui.Guide.SubPage.ResourceProduction.Gold {}
	module gui.Mail.ReadMailPage {}
//   module qx.bom.Viewport {}
	module gui.CityGroupsWidget {}
	module gui.EndSubstitutionWidget {}
//   module qx.ui.core.scroll.ScrollSlider {}
//   module qx.event.handler.Iframe {}
//   module qx.bom.Iframe {}
//   module qx.io.remote.RequestQueue {}
	module gui.SelBoxContinentFilter {}
	module Login {}
	module gui.NewsletterPage {}
	module net.UpdateManager {}
//   module qx.ui.treevirtual.SimpleTreeDataModel {}
//   module qx.ui.core.queue.Appearance {}
	module gui.Overviews.Alliance.EnlightenedCitiesPage {}
	module gui.Mail.SendMailWidget {}
//   module qx.ui.layout.Basic {}
//   module qx.ui.table.celleditor.SelectBox {}
	module ui.TableCellEditorSelectBoxCustom {}
	module gui.Alliance.Forum.MainPage {}
	module gui.TradeInfoPage {}
	module base.GameObjects {}
	module gui.ReportListWidget {}
	module gui.MinisterInfo.Page.Base {}
	module gui.MinisterInfo.Page.DefenseOptions {}
	module gui.Overviews.Minister.ResourcePage {}
	module gui.Achievement.PageDisplay {}
	module gui.Alliance.Info.PageBase {}
	module gui.Alliance.Info.MemberList {}
	module gui.PlayerInfo.MainWindow {}
	module gui.ReportPage {}
	module gui.FortuneTeller.Selection {}
	module gui.ReportPageArmyCont {}
//   module qx.ui.menu.Button {}
	module ui.ContainerButton {}
	module ui.RewardPreviewButton {}
//   module qx.bom.Selector {}
	module vis.CityBuilding {}
//   module qx.ui.popup.Popup {}
//   module qx.ui.tooltip.ToolTip {}
//   module qx.ui.table.pane.Clipper {}
//   module qx.bom.client.CssTransform {}
//   module qx.locale.Number {}
//   module qx.ui.form.CheckBox {}
	module gui.Trade.OwnOffersPage {}
	module gui.InfoWidget {}
//   module qx.ui.table.selection.Model {}
//   module qx.ui.treevirtual.TreeVirtual {}
//   module qx.ui.embed.Html {}
//   module qx.util.PropertyUtil {}
//   module qx.ui.layout.Flow {}
	module gui.MinisterInfo.Base {}
//   module qx.bom.Label {}
//   module qx.ui.toolbar.ToolBar {}
//   module qx.bom.element.Transform {}
//   module qx.lang.Generics {}
	module gui.Alliance.DiplomacyPage {}
//   module qx.event.handler.Focus {}
//   module qx.event.AcceleratingTimer {}
//   module qx.event.type.Focus {}
	module gui.Alliance.Info.InfoPage {}
	module gui.MinisterMerchandiseWidget {}
	module gui.Guide.SubPage.Raiding.DungeonRaids.Types {}
//   module qx.io.PartLoader {}
	module ui.SoundButton {}
	module ui.DateChooserButton {}
	module gui.Alliance.VirtuesPage {}
//   module qx.io.part.ClosurePart {}
	module gui.Social.InvitationsPage {}
	module gui.Achievement.InfoWindow {}
//   module qx.ui.splitpane.Slider {}
	module gui.ShopNotEnoughFundsPopup {}
	module gui.ResearchOverviewWidget {}
//   module qx.bom.element.AnimationJs {}
//   module qx.bom.Selection {}
	module gui.Achievement.ChallengeHistoryModel {}
	module gui.PlayerInfo.CitiesPage {}
	module gui.Overviews.Alliance.EditEnlightenmentCommentWindow {}
	module gui.OptionsWidget {}
	module gui.Overviews.Alliance.OffenseHistoryPage {}
	module gui.Guide.Page.CityDefense {}
//   module qx.ui.tree.selection.SelectionManager {}
//   module qx.ui.tree.Tree {}
	module data.MailHeaderDataModel {}
//   module qx.ui.container.Stack {}
	module gui.ShrineDetailView {}
//   module qx.event.handler.Appear {}
//   module qx.ui.table.columnmodel.Resize {}
//   module qx.ui.core.scroll.ScrollPane {}
	module data.Events {}
//   module qx.bom.Font {}
	module ui.RowRendererCustom {}
	module vis.Main {}
	module gui.FortuneTeller.Card {}
	module data.AllianceForum {}
//   module qx.html.Input {}
	module ui.MultirowTabViewWidget {}
	module city.CityObject {}
//   module qx.bom.Input {}
	module gui.Util {}
//   module qx.ui.table.model.Simple {}
//   module qx.util.ResourceManager {}
	module gui.Alliance.MemberStatusPage {}
	module gui.FoodCityOverviewWidget {}
	module gui.CityDetailView {}
	module res.Main {}
//   module qx.theme.manager.Appearance {}
	module ui.ScrollContainerCustom {}
	module data.Report {}
//   module qx.ui.table.rowrenderer.Default {}
//   module qx.ui.treevirtual.SimpleTreeDataRowRenderer {}
	module gui.Alliance.Info.Reward.RewardEditWindow {}
	module gui.Alliance.Info.AchievementsPage {}
//   module qx.util.StringBuilder {}
	module gui.Guide.ConditionVoidResourceBody {}
	module gui.Alliance.Forum.ThreadLabel {}
	module gui.Credits {}
	module gui.Alliance.Forum.ThreadPage {}
	module gui.CastleCustomization.MainWindow {}
	module gui.Guide.SubPage.ResourceProduction.Food {}
//   module qx.ui.core.SingleSelectionManager {}
//   module qx.locale.LocalizedString {}
	module draw.BackgroundTextNode {}
	module gui.Alliance.Forum.PostPage {}
	module gui.NewPlayerWidget {}
	module gui.CastleCustomization.Util {}
//   module qx.ui.table.columnmenu.Button {}
	module city.CityLayout {}
	module draw.Widget {}
	module gui.CityTradeInfoView {}
	module gui.CityCommandInfoView {}
	module data.SimpleTreeDataModelCustom {}
	module gui.SubstituteReqItem {}
	module gui.Alliance.SupporterRankingsPage {}
	module ui.DateTimeChooser {}
	module gui.Guide.SubPage.Raiding.BossRaids.LootAndRestrictions {}
	module gui.SendArmyWindow {}
	module gui.Mail.Contacts.TabAlliance {}
	module gui.FortuneTeller.Util {}
//   module qx.util.Uri {}
	module draw.ImageNode {}
	module vis.CityFortification {}
	module ui.CustomSelectBox {}
	module gui.PlayerInfo.LouAchievementsPage {}
//   module qx.ui.core.queue.Widget {}
	module gui.Achievement.SpecialsTabView {}
	module gui.TradeMinisterOptionsPage {}
	module ui.SoundToggleButton {}
//   module qx.theme.manager.Font {}
	module gui.Overviews.Alliance.OutgoingAttacksPage {}
	module gui.Mail.Contacts.TabFriends {}
//   module qx.ui.splitpane.HLayout {}
	module gui.PlayerInfo.AchievementsPage {}
	module ui.ColorSelectorCustom {}
	module gui.Alliance.Forum.PostItem {}
	module vis.CityObject {}
	module gui.StatisticsWidget {}
//   module qx.ui.layout.Dock {}
//   module qx.ui.menu.Layout {}
	module data.QuickUseItems {}
	module gui.Alliance.InvitationItem {}
	module gui.Alliance.OverviewPage {}
	module data.Inventory {}
	module vis.CityWallLevel {}
	module vis.CityBuildingPlace {}
	module gui.MinisterInfo.Page.WarOptions {}
//   module qx.ui.splitpane.Splitter {}
	module data.PlayerListDataModel {}
	module gui.PlayerInfo.RewardEditWindow {}
//   module qx.ui.core.scroll.NativeScrollBar {}
	module gui.Overviews.MinisterOverviewsPage {}
	module ui.FixedSizeLabel {}
	module gui.SelCities {}
//   module qx.html.Image {}
	module data.ShopCatalog {}
//   module qx.event.Emitter {}
	module gui.QuestTrackerWidget {}
	module gui.Alliance.ShrinePage {}
//   module qx.ui.form.AbstractField {}
//   module qx.ui.form.TextArea {}
//   module qx.ui.form.List {}
	module gui.OrderDetail.MoongateDisplay {}
	module gui.Alliance.MemberRightsPage {}
	module gui.Social.MainWidget {}
//   module qx.ui.layout.Grid {}
	module ui.DateChooser {}
	module gui.layout.Loader {}
	module gui.QuestWidget {}
//   module qx.locale.Manager {}
	module gui.Alliance.Info.NamesPage {}
	module gui.DebugCommandWindow {}
//   module qx.bom.element.Attribute {}
	module gui.Mail.ListWidget {}
	module gui.MinisterInfo.Trade {}
//   module qx.event.handler.Keyboard {}
//   module qx.event.handler.Capture {}
//   module qx.event.handler.DragDrop {}
//   module qx.ui.tree.core.AbstractItem {}
//   module qx.event.type.Data {}
	module gui.WorldMapHelper {}
//   module qx.ui.table.cellrenderer.AbstractImage {}
//   module qx.ui.table.pane.Model {}
	module data.FriendList {}
//   module qx.bom.element.Dimension {}
//   module qx.bom.client.Locale {}
//   module qx.locale.Date {}
//   module qx.io.ImageLoader {}
//   module qx.bom.AnimationFrame {}
	module gui.Overviews.MainWindow {}
//   module qx.ui.menu.CheckBox {}
//   module qx.ui.table.columnmenu.MenuItem {}
//   module qx.lang.Number {}
//   module qx.event.handler.Offline {}
//   module qx.event.type.Drag {}
	module gui.WndEditPreviewSaveText {}
	module gui.Guide.SubPage.ResourceProduction.Iron {}
//   module qx.util.format.DateFormat {}
	module gui.WelcomeWidget {}
//   module qx.bom.element.Background {}
	module ui.MessageBox {}
	module gui.UnitQueue {}
//   module qx.bom.Cookie {}
	module gui.ServerBarWidget {}
//   module qx.event.type.KeyInput {}
	module gui.WorldToolTip {}
	module gui.CastleCustomization.SelectWidget {}
	module gui.Achievement.OverviewDisplay {}
//   module qx.ui.indicator.ProgressBar {}
	module data.TreeDataCellRendererCustom {}
	module gui.SystemMessageWindow {}
	module gui.Guide.SubPage.Raiding.DungeonRaids.Loot {}
	module data.Alliance {}
	module gui.layout.FileService {}
	module gui.OrderDetail.UnitDisplay {}
//   module qx.ui.container.SlideBar {}
//   module qx.data.Array {}
//   module qx.ui.form.ListItem {}
	module gui.MinisterInfo.Page.BuildOptions {}
	module ui.CellrendererBooleanExtra {}
//   module qx.ui.core.Blocker {}
//   module qx.theme.manager.Decoration {}
	module gui.Guide.ConditionArrow {}
//   module qx.io.part.Package {}
	module gui.Rankings.ChallengesDataModel {}
	module gui.Trade.SendResourcesPage {}
//   module qx.ui.table.pane.Header {}
//   module qx.bom.element.AnimationHandle {}
	module gui.Trade.RequestResourcesPage {}
//   module qx.event.type.KeySequence {}
	module ui.QuickUseButton {}
	module data.IgnoreList {}
//   module qx.ui.menu.Menu {}
//   module qx.ui.tree.core.AbstractTreeItem {}
//   module qx.ui.tree.TreeFile {}
	module gui.MentorWidget {}
	module gui.RecrutingWidget {}
	module gui.DefenseMinisterAutoRecruitTab {}
	module data.Tech {}
	module gui.Social.IgnorePage {}
	module data.SimpleColFormattingDataModel {}
	module data.DataContract.Translator {}
	module gui.Guide.Page.ResourceProduction {}
	module gui.PopupChain {}
	module draw.EffectNode {}
	module gui.MinisterInfo.Page.TradeOptions {}
	module gui.Achievement.RecentlyCompletedItem {}
	module gui.CityInfoView {}
//   module qx.ui.table.cellrenderer.Number {}
	module Util {}
	module ui.RichHeaderCell {}
//   module qx.event.handler.Element {}
	module data.Achievement {}
//   module qx.bom.Document {}
	module gui.Overviews.Minister.CommandPage {}
	module gui.Mail.DistributionLists.EditWindow {}
	module gui.Achievement.CategorySelection {}
	module gui.MinisterInfo.AppointMinisterContainer {}
	module gui.MoveBuildingDetailView {}
	module vis.Util {}
//   module qx.ui.decoration.DynamicDecorator {}
//   module qx.ui.core.queue.Dispose {}
//   module qx.ui.layout.Canvas {}
	module gui.DailyRewardWidget {}
	module gui.Guide.SubPage.Raiding.DungeonRaids.Weakness {}
	module gui.Alliance.MembersPage {}
//   module qx.ui.form.HoverButton {}
	module gui.Guide.Page.Artifacts {}
	module gui.ReportPageArmyGrid {}
	module gui.Mail.Contacts.ListItem {}
//   module qx.data.SingleValueBinding {}
	module gui.Overviews.Minister.BuildingQueuePage {}
//   module qx.event.dispatch.MouseCapture {}
	module quest.Main {}
//   module qx.ui.control.ColorPopup {}
//   module qx.ui.menu.Separator {}
//   module qx.ui.tree.TreeFolder {}
//   module qx.event.Idle {}
	module gui.Alliance.MainWidget {}
	module gui.Overviews.Alliance.Util {}
	module gui.OrderDetail.LootDisplay {}
//   module qx.ui.form.TextField {}
	module gui.Achievement.ServerFirstModel {}
	module gui.Achievement.TabPageNormal {}
//   module qx.ui.menu.ButtonLayout {}
//   module qx.dom.Hierarchy {}
	module gui.InfoNavigatorWidget {}
	module gui.OrderDetail.MainPage {}
//   module qx.ui.core.queue.Layout {}
	module ui.AllianceRewardElementPopup {}
	module gui.FortuneTeller.WelcomeScreen {}
//   module qx.bom.webfonts.WebFont {}
//   module qx.ui.table.cellrenderer.Boolean {}
	module gui.MapSelectorBarWidget {}
//   module qx.ui.core.Spacer {}
	module ui.ColorPopupCustom {}
	module gui.MinisterInfo.Defense {}
	module gui.ItemsWidget {}
	module gui.Guide.SubPage.Raiding.BossRaids.GeneralAndTypes {}
	module gui.Guide.SubPage.ResourceProduction.Wood {}
	module draw.Scene {}
	module gui.NewCityView {}
	module gui.SpecialOfferPopupWindow {}
	module gui.Alliance.Info.MainWindow {}
//   module qx.bom.element.Location {}
//   module qx.html.Root {}
	module gui.Trade.OtherOffersPage {}
//   module qx.ui.menu.MenuSlideBar {}
	module gui.FoodWarningsWindow {}
	module draw.BoxNode {}
	module gui.RewardsWidget {}
	module data.AllianceDataModel {}
	module gui.MinisterInfo.Build {}
//   module qx.bom.String {}
	module gui.Achievement.OverviewCategoryProgressItem {}
//   module qx.Part {}
	module gui.Trade.MainWidget {}
	module ui.AllianceLabel {}
	module gui.AllianceInvitationPopup {}
	module gui.TreeRowRendererCustom {}
//   module qx.ui.table.cellrenderer.Image {}
	module config.Config {}
	module gui.Guide.ConditionContainer {}
	module gui.Social.FriendsPage {}
	module gui.TitleWidget {}
	module ui.TableHeaderCellRendererIconRichTT {}
	module gui.Trade.PurifyResourcesPage {}
//   module qx.bom.Element {}
	module gui.Achievement.NotificationPopup {}
	module gui.BuildingDetailView {}
	module gui.WorldMapLegendWindow {}
	module gui.CityInfoPage {}
//   module qx.ui.toolbar.Button {}
//   module qx.dev.ObjectSummary {}
	module data.PalaceInfo {}
	module gui.Achievement.ServerFirstPage {}
	module gui.EventWindow {}
//   module qx.bom.element.Decoration {}
	module gui.DungeonDetailView {}
//   module qx.dom.Element {}
	module ui.CellRendererHtmlCustom {}
	module gui.MinisterInfo.War {}
//   module qx.ui.toolbar.PartContainer {}
	module gui.Achievement.AchievementLayoutItem {}
}
