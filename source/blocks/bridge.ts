IDRegistry.genBlockID("energyBridge");
Block.createBlock("energyBridge", [{name: "tile.energy_bridge.name", texture: [["energy_bridge_casing", 0]], inCreative: true}], {base: 42, translucency: 0.5, destroytime: 5, sound: 'metal'});
ToolAPI.registerBlockMaterial(BlockID.energyBridge, "stone", 2, false);
GROUP.push(BlockID.energyBridge);

(() => {
    const render = new ICRender.Model();
    const model = new BlockRenderer.Model();
    model.addBox(0, 0, 0, 1, 1, 1, [["energy_bridge_casing", 0]]);
    model.addBox(1/16, 1/16, 1/16, 15/16, 15/16, 15/16, [["energy_bridge_core", 0]]);
    render.addEntry(model);
    BlockRenderer.setStaticICRender(BlockID.energyBridge, -1, render);
    ItemModel.getFor(BlockID.energyBridge, -1).setModel(render);
})();

const SAVED_DESTROYED_BRIDGES: {[key: string]: number} = {};

Block.registerDropFunction(BlockID.energyBridge, (coords, id, data, level, enchant, item, region) => {
    const key = `${coords.x}:${coords.y}:${coords.z}:${region.getDimension()}`;
    const energyStored = SAVED_DESTROYED_BRIDGES[key];
    const extra = new ItemExtraData();
    if(typeof energyStored !== "undefined") {
        extra.putInt("bridgeEnergyBuffer", energyStored);
        delete SAVED_DESTROYED_BRIDGES[key];
    }
    return [[id, 1, data, energyStored ? extra : null]];
});
Block.registerPlaceFunction(BlockID.energyBridge, (coords, item, block, player, region) => {
    const r = coords.relative;
    region.setBlock(r.x, r.y, r.z, BlockID.energyBridge, 0);
    const te = TileEntity.addTileEntity(r.x, r.y, r.z, region) as TileEntityEnergyBridge;
    item.extra != null && item.extra.getInt("bridgeEnergyBuffer", -1) != -1 &&
    (te.data.energyStored += item.extra.getInt("bridgeEnergyBuffer"));
});
Item.registerNameOverrideFunction(BlockID.energyBridge, (item, name) => {
    if(item.extra == null || item.extra.getInt("bridgeEnergyBuffer", -1) != -1) return name;
    const localized = Translation.translate("energyconverters.energybridge.stored");
    const stored = new JavaString((Math.round(item.extra.getInt("bridgeEnergyBuffer"))).toString());
    const formatted = JavaString.format(localized, [stored]);
    return `${name}\n§7${formatted}`;
});

class TileEntityEnergyBridge 
extends TileEntityImplementation<{ energyStored: number }> {

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

    public destroy(): boolean {
        const key = `${this.x}:${this.y}:${this.z}:${this.dimension}`;
        SAVED_DESTROYED_BRIDGES[key] = this.data.energyStored;
        return false;
    }

    public click(id: number): void {
        id == 280 && Game.message(this.data.energyStored.toString());
    }

}

TileEntity.registerPrototype(BlockID.energyBridge, new TileEntityEnergyBridge());