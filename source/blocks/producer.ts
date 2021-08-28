const createProducer = (id: string, type: EnergyType, tile: TileEntityEnergyProducer, translationKey?: string) => {
    IDRegistry.genBlockID(id);
    Block.createBlock(id, [{name: translationKey || `tile.${id}.name`, texture: [[id, 0]], inCreative: true}], {base: 42, destroytime: 5, sound: 'metal'});
    ToolAPI.registerBlockMaterial(BlockID[id], "stone", 2, false);
    TileEntity.registerPrototype(BlockID[id], tile);
    EnergyTileRegistry.addEnergyTypeForId(BlockID[id], type);
    GROUP.push(BlockID[id]);
}

createProducer("energy_producer_fe", FE, new TileEntityEnergyProducer());
createProducer("energy_producer_rf", RF, new TileEntityEnergyProducer());
createProducer("energy_producer_mj", MJ, new TileEntityEnergyProducer());
createProducer("energy_producer_tesla", TESLA, new TileEntityEnergyProducer());
createProducer("energy_producer_eu1", EU, new TileEntityEuProducer(1), "tile.energy_producer_eu.lv.name");
createProducer("energy_producer_eu2", EU, new TileEntityEuProducer(2), "tile.energy_producer_eu.mv.name");
createProducer("energy_producer_eu3", EU, new TileEntityEuProducer(3), "tile.energy_producer_eu.hv.name");
createProducer("energy_producer_eu4", EU, new TileEntityEuProducer(4), "tile.energy_producer_eu.ev.name");
createProducer("energy_producer_eu5", EU, new TileEntityEuProducer(5), "tile.energy_producer_eu.iv.name");