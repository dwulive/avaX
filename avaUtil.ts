///<reference path="avaDec.ts" />
declare var qx : any;

var avaDebug : boolean = true;

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

function paDebug(e) {
	if(avaDebug && window.console && typeof console.debug == "function") {
		console.log(e);
		//  addMessage(e);
	}
}

function paError(e) {
	if(window.console && typeof console.error == "function") {
		console.error(e);
		console.assert(0);
	}
}

function dung(type, lvl, progress, coords, distance) {
	this.type = type;
	this.level = lvl;
	this.progress = progress;
	this.coords = coords;
	this.id = coords;
	this.distance = distance;
	this.get_Level = function() {
		return this.level;
	};
	this.get_Progress = function() {
		return this.progress;
	};
	this.get_Coordinates = function() {
		return this.coords;
	};
	this.get_Distance = function() {
		return this.distance;
	};
	this.get_Id = function() {
		return this.id;
	};

}
