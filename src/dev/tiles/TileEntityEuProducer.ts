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
        const amount = Math.min(Math.round(o / 4), this.getMaxPacketSize());
        const v = Math.round(node.add(amount) * 4);
        this.retrieveEnergyFromBridge(amount * 4 - v, false);
    }

    constructor(private readonly tier: number) { super() }

}