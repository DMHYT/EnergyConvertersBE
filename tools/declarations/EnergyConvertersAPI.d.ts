/// <reference path="core-engine.d.ts" />
/// <reference path="energy-net.d.ts" />

interface BlockPosUtils {
    offset(pos: Vector, face: number): Vector;
    oppositeFace(face: number): number;
}

declare interface EnergyConvertersAPI {
    createConsumer(id: string, type: EnergyType, tile: TileEntity, translationKey?: string): void;
    createProducer(id: string, type: EnergyType, tile: TileEntity, translationKey?: string): void;
    requireGlobal(name: "ic2loaded"): boolean;
    requireGlobal(name: "JavaString"): typeof java.lang.String;
    requireGlobal(name: "IllegalArgumentException"): typeof java.lang.IllegalArgumentException;
    requireGlobal(name: "EU" | "RF" | "FE" | "MJ" | "TESLA"): EnergyType;
    requireGlobal(name: "bridgeEnergyBuffer"): number;
    requireGlobal(name: "conversionLoss"): number;
    requireGlobal(name: "GROUP"): number[];
    requireGlobal(name: "addShaped"): (id: number, count: number, data: number, mask: string[], keys: (string | number)[]) => void;
    requireGlobal(name: "addShapeless"): (id: number, count: number, data: number, iddataarr: [number, number][]) => void;
    requireGlobal(name: "TileEntityConverterBase" | "TileEntityEnergyConsumer" | "TileEntityEnergyProducer" | "TileEntityEuConsumer" | "TileEntityEuProducer" | "TileEntityEnergyBridge" | "TileEntityImplementation"): any;
    requireGlobal(name: "BlockPosUtils"): BlockPosUtils;
    requireGlobal(name: "SAVED_DESTROYED_BRIDGES"): {[key: string]: number};
    requireGlobal(name: "createConsumer" | "createProducer"): (id: string, type: EnergyType, tile: TileEntity, translationKey?: string) => void;
}

declare namespace ModAPI {
    function addAPICallback(apiName: "EnergyConvertersAPI", func: (api: EnergyConvertersAPI) => void): void;
}