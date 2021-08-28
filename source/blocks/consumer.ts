const createConsumer = (id: string, type: EnergyType, tile: TileEntityEnergyConsumer, translationKey?: string) => {
    IDRegistry.genBlockID(id);
    Block.createBlock(id, [{name: translationKey || `tile.${id}.name`, texture: [[id, 0]], inCreative: true}], {base: 42, destroytime: 5, sound: 'metal'});
    ToolAPI.registerBlockMaterial(BlockID[id], "stone", 2, false);
    TileEntity.registerPrototype(BlockID[id], tile);
    EnergyTileRegistry.addEnergyTypeForId(BlockID[id], type);
    GROUP.push(BlockID[id]);
}

createConsumer("energy_consumer_fe", FE, new TileEntityEnergyConsumer());
createConsumer("energy_consumer_rf", RF, new TileEntityEnergyConsumer());
createConsumer("energy_consumer_mj", MJ, new TileEntityEnergyConsumer());
createConsumer("energy_consumer_tesla", TESLA, new TileEntityEnergyConsumer());
createConsumer("energy_consumer_eu1", EU, new TileEntityEuConsumer(1), "tile.energy_consumer_eu.lv.name");
createConsumer("energy_consumer_eu2", EU, new TileEntityEuConsumer(2), "tile.energy_consumer_eu.mv.name");
createConsumer("energy_consumer_eu3", EU, new TileEntityEuConsumer(3), "tile.energy_consumer_eu.hv.name");
createConsumer("energy_consumer_eu4", EU, new TileEntityEuConsumer(4), "tile.energy_consumer_eu.ev.name");
createConsumer("energy_consumer_eu5", EU, new TileEntityEuConsumer(5), "tile.energy_consumer_eu.iv.name");