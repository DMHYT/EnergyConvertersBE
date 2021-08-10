IDRegistry.genBlockID("energyBridge");
Block.createBlock("energyBridge", [{name: "tile.energy_bridge.name", texture: [["energy_bridge_casing", 0]], inCreative: true}], {base: 42, translucency: 0.5, destroytime: 5, sound: 'metal'});
ToolAPI.registerBlockMaterial(BlockID.energyBridge, "stone", 2, false);

(() => {
    const render = new ICRender.Model();
    const model = new BlockRenderer.Model();
    model.addBox(0, 0, 0, 1, 1, 1, [["energy_bridge_casing", 0]]);
    model.addBox(1/16, 1/16, 1/16, 15/16, 15/16, 15/16, [["energy_bridge_core", 0]]);
    render.addEntry(model);
    BlockRenderer.setStaticICRender(BlockID.energyBridge, -1, render);
    ItemModel.getFor(BlockID.energyBridge, -1).setModel(render);
})();

class TileEntityEnergyBridge 
extends TileEntityImplementation<{ energyStored: number }> {

    public readonly __energy_bridge__ = true;

    constructor() {
        super({ energyStored: 0 });
    }

    public addEnergy(amountIn: number, simulate: boolean): number {
        const lossRate = 1.0 - (conversionLoss / 100.0);
        let amount = amountIn * lossRate;
        if(amount + this.data.energyStored > bridgeEnergyBuffer)
            amount = bridgeEnergyBuffer - this.data.energyStored;
        if(!simulate) this.data.energyStored += amount;
        return amount / lossRate;
    }

    public getEnergy(maxAmount: number, simulate: boolean): number {
        let amount = maxAmount;
        if(this.data.energyStored - amount < 0)
            amount = this.data.energyStored;
        if(!simulate) this.data.energyStored -= amount;
        return amount;
    }

    public getStoredEnergy(): number {
        return this.data.energyStored;
    }

    public getStoredEnergyMax(): number {
        return bridgeEnergyBuffer;
    }

}

TileEntity.registerPrototype(BlockID.energyBridge, new TileEntityEnergyBridge());