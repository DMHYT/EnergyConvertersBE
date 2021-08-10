interface IEnergyBridge {
    getBridgeEnergyStored(): number;
    getBridgeEnergyStoredMax(): number;
}

interface IEnergyBridgeInputAccessProvider 
extends IEnergyBridge {
    addEnergyToBridge(amount: number, simulate: boolean): number;
}

interface IEnergyBridgeOutputAccessProvider 
extends IEnergyBridge {
    retrieveEnergyFromBridge(maxAmount: number, simulate: boolean): number;
}

interface ITiered {
    getTier(): number;
    getMaxPacketSize(): number;
}