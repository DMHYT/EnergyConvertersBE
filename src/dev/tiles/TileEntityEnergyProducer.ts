class TileEntityEnergyProducer 
extends TileEntityConverterBase 
implements IEnergyBridgeOutputAccessProvider, EnergyTile {

    public readonly energyNode: EnergyTileNode;
    public energyReceive() { return 0 }
    public isConductor() { return false }
    public canReceiveEnergy() { return false }
    public canExtractEnergy() { return true }

    public energyTick(type: string, node: EnergyTileNode): void {
        const ratio = EnergyTypeRegistry.getValueRatio("RF", type);
        const o = this.getBridgeEnergyStored();
        const v = Math.round(node.add(o * ratio) / ratio);
        this.retrieveEnergyFromBridge(o - v, false);
    }

    public retrieveEnergyFromBridge(maxAmount: number, simulate: boolean): number {
        const energyBridge = this.getEnergyBridge();
        if(energyBridge == null) return 0;
        return energyBridge.getEnergy(maxAmount, simulate);
    }

    constructor() { super() }

}