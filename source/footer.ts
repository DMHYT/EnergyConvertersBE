Item.addCreativeGroup("energyConverters", Translation.translate("itemGroup.energy_converters"), GROUP);

const addShaped = (id: number, count: number, data: number, mask: string[], keys: (string | number)[]) => Recipes.addShaped({id: id, count: count, data: data}, mask, keys);
Callback.addCallback("PostLoaded", () => {
    addShaped(BlockID.energyBridge, 1, 0, ["ibi", "beb", "ibi"], ['i', VanillaItemID.iron_ingot, -1, 'b', VanillaBlockID.iron_bars, -1, 'e', VanillaItemID.ender_eye, -1]);
});