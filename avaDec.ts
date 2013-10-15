/**
 * Created by David on 10/11/13.
 */
///<reference path="qx/qxEa.d.ts" />

// include me please
declare function paDebug ( str  );
declare function paError( str  ) ;
declare function getBossWeakness(name);
declare function getDungeonWeakness(name);
declare function formatDate(tme);
declare function convertIdToCoordinatesObject(id);
declare function showMsgWindow(title, msgText);
declare function removeConsumer(msg, func, _this) ;
declare function addConsumer(msg, func, thisObj, paramStr);
declare function convertCoordinatesToId(x, y);
declare function checkTime(i);
declare function formatIncomingDate(dte): string;
declare function FormatTime(timeMs): string;
declare function formatReportId(reportId): string;
declare var citySort;
declare var aco;
declare var bw;
declare var subIncomingOffImg;
declare var subIncomingImg;
declare var subNames;
declare var _oTech;
declare function checkForSubAttacks(results, thisObj): void;


declare var webfrontend : any;
declare var qx :any;
declare var  ava : any;
declare var player;
declare var serverTime;
declare function Mod10(  num : number );
declare var citySort;
declare var _oTech;
declare var SCOUT_ORDER_ID ; // 2,
declare var PLUNDER_ORDER_ID ; // 2,
declare var ATTACK_ORDER_ID ; // 3,
declare var SUPPORT_ORDER_ID ; // 4,
declare var SIEGE_ORDER_ID ; // 5,
declare var RAID_ORDER_ID ; // 8,
declare var SETTLE_ORDER_ID ; // 9,
declare var ORDER_STATE_OUTGOING ; // 1,
declare var ORDER_STATE_RETURNING ; // 2
