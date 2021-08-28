class TileEntityEuProducer
extends TileEntityEnergyProducer
implements ITiered {

    public getTier(): number {
        return this.tier;
    }

    public getMaxPacketSize(): number {
        return 8 << this.getTier() * 2;
    }

    public energyTick(type: string, node: EnergyTileNode): void {
        const o = this.getBridgeEnergyStored();
        const amount = Math.min(Math.round(o * .25), this.getMaxPacketSize());
        const v = Math.round(node.add(amount) / .25);
        this.retrieveEnergyFromBridge(o - v, false);
    }

    constructor(private readonly tier: number) { super() }

}