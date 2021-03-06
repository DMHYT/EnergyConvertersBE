class TileEntityEuConsumer
extends TileEntityEnergyConsumer
implements ITiered {

    public getTier(): number {
        return this.tier;
    }

    public getMaxPacketSize(): number {
        return 8 << this.getTier() * 2;
    }

    public energyReceive(type: string, amount: number, voltage: number): number {
        if(this.getEnergyBridge() == null) return 0;
        let toReturn: number = 0;
        if(amount > this.getMaxPacketSize()) toReturn += amount - this.getMaxPacketSize();
        const output = Math.min(amount, this.getMaxPacketSize());
        toReturn += Math.round(this.addEnergyToBridge(output * 4, false) / 4);
        return toReturn;
    }

    constructor(private readonly tier: number) { super() }

}