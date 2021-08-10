class TileEntityEnergyProducer 
extends TileEntityConverterBase<EnergyType> 
implements IEnergyBridgeOutputAccessProvider, EnergyTile {

    public readonly energyNode: EnergyTileNode;
    public energyReceive() { return 0 }
    public isConductor() { return false }
    public canReceiveEnergy() { return false }
    public canExtractEnergy() { return false }

    public energyTick(type: string, node: EnergyTileNode): void {
        const ratio = EnergyTypeRegistry.getValueRatio("RF", type);
        const o = this.getBridgeEnergyStored();
        const amount = Math.round(o * ratio);
        const v = Math.round(node.add(amount) / ratio);
        this.retrieveEnergyFromBridge(v, false);
    }

    public retrieveEnergyFromBridge(maxAmount: number, simulate: boolean) {
        const energyBridge = this.getEnergyBridge();
        if(energyBridge == null) return 0;
        return energyBridge.getEnergy(maxAmount, simulate);
    }

    constructor() { super() }

}