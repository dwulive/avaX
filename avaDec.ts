/**
 * Created by David on 10/11/13.
 */
///<reference path="qx/qxEa.d.ts" />

// include me please
declare function paDebug ( str  );
declare function paError( str  ) ;
declare function getBossWeakness(name);
declare function getDungeonWeakness(name);
declare function dung(type, lvl, progress, coords, distance);
declare function convertIdToCoordinatesObject(id);
declare function showMsgWindow(title, msgText);
declare function removeConsumer(msg, func, _this) ;
declare function addConsumer(msg, func, thisObj, paramStr);
declare function convertCoordinatesToId(x, y);
declare var webfrontend : any;
declare var ava : any;
