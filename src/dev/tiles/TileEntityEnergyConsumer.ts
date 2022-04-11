class TileEntityEnergyConsumer 
extends TileEntityConverterBase
implements IEnergyBridgeInputAccessProvider, EnergyTile {

    public readonly energyNode: EnergyTileNode;
    public energyTick() {}
    public isConductor() { return false }
    public canReceiveEnergy() { return true }
    public canExtractEnergy() { return false }

    public energyReceive(type: string, amount: number, voltage: number): number {
        if(this.getEnergyBridge() == null) return 0;
        const ratio = EnergyTypeRegistry.getValueRatio(type, "RF");
        return Math.round(this.addEnergyToBridge(amount * ratio, false) / ratio);
    }

    public addEnergyToBridge(amount: number, simulate: boolean): number {
        const energyBridge = this.getEnergyBridge();
        if(energyBridge == null) return 0;
        return energyBridge.addEnergy(amount, simulate);
    }

    constructor() { super() }

}