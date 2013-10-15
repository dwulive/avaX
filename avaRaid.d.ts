/// <reference path="avaDec.d.ts" />
declare function leftPad(num, minsize, padstring);
declare class dung2 {
    public _type: number;
    public level: number;
    public progress: number;
    public coords: string;
    public distance: number;
    constructor(_type: number, level: number, progress: number, coords: string, distance: number);
    public get_Type: () => any;
    public get_Level: () => any;
    public get_Progress: () => any;
    public get_Coordinates: () => any;
    public get_Distance: () => any;
}
declare class dung {
    public type: number;
    public level: number;
    public progress: number;
    public coords: string;
    public id: number;
    public distance: number;
    constructor(type, lvl, progress, coords, distance);
    public get_Level: () => any;
    public get_Progress: () => any;
    public get_Coordinates: () => any;
    public get_Distance: () => any;
    public get_Id: () => any;
}
declare function RaidingWindowEnumProperties(rw, func): void;
declare function GetStoreName(rw, i: string): string;
declare function RaidingWindowSave(rw): void;
declare function RaidingWindowLoad(rw): void;
declare function CreateCheckBox(_this, member, subContainer, tooltip);
declare function avaInitRaids(): void;
declare var distWantModifier: number;
declare function unitShortName(unitType);
declare function dungShortName(dungType): string;
declare function CreateTree(rw, win): void;
declare function dungName(dungType): string;
declare function dungProgressType(dungType): number;
declare function bossName(bossType): string;
declare function getBossType(bossName): number;
declare function bossUnitType(bossType, bossLevel);
declare function SelectByName(value, list): void;
declare function SelectFromStorage(value, list): void;
declare function SetSelection(sel, value): number;
declare function SetSelectionFromStore(sel, key): number;
