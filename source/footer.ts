Item.addCreativeGroup("energyConverters", Translation.translate("itemGroup.energy_converters"), GROUP);

const addShaped = (id: number, count: number, data: number, mask: string[], keys: (string | number)[]) => Recipes.addShaped({id: id, count: count, data: data}, mask, keys);
const addShapeless = (id: number, count: number, data: number, iddataarr: [number, number][]) => {
    const ingredients: {id: number, data: number}[] = [];
    for(let i in iddataarr) ingredients.push({ id: iddataarr[i][0], data: iddataarr[i][1] });
    Recipes.addShapeless({id: id, count: count, data: data}, ingredients);
}
Callback.addCallback("PostLoaded", () => {
    addShaped(BlockID.energyBridge, 1, 0, ["ibi", "beb", "ibi"], ['i', 265, -1, 'b', 101, -1, 'e', 381, -1]);
    ((args: string[]) => {
        for(let i in args) {
            addShapeless(BlockID[`energy_consumer_${args[i]}`], 1, 0, [[BlockID[`energy_producer_${args[i]}`], -1]]);
            addShapeless(BlockID[`energy_producer_${args[i]}`], 1, 0, [[BlockID[`energy_consumer_${args[i]}`], -1]]);
        }
    })(["fe", "rf", "mj", "tesla", "eu1", "eu2", "eu3", "eu4", "eu5"]);
    addShaped(BlockID.energy_producer_fe, 1, 0, ["sis", "frg", "sbs"], ['s', 1, -1, 'i', 265, -1, 'f', 61, -1, 'r', 152, -1, 'g', 266, -1, 'b', 101, -1]);
    addShaped(BlockID.energy_producer_rf, 1, 0, ["sis", "fbg", "sas"], ['s', 1, -1, 'i', 265, -1, 'f', 61, -1, 'b', 42, -1, 'g', 266, -1, 'r', 101, -1]);
    addShaped(BlockID.energy_producer_tesla, 1, 0, ["sqs", "fbg", "srs"], ['s', 1, -1, 'q', 406, -1, 'f', 61, -1, 'b', 42, -1, 'g', 266, -1, 'r', 101, -1]);
});
Callback.addCallback("ModsLoaded", () => {
    ItemID.gear_iron && BlockID.pipe_item_wood && BlockID.engine_wooden &&
    addShaped(BlockID.energy_producer_mj, 1, 0, ["sis", "epg", "sis"], ['s', 1, -1, 'i', ItemID.gear_iron, -1, 'e', BlockID.engine_wooden, -1, 'p', BlockID.pipe_item_wood, -1, 'g', 266, -1]);
});
ModAPI.addAPICallback("ICore", () => {
    ((args: string[]) => {
        for(let i in args) {
            const transformerID = `transformer${args[i]}`;
            const producerID = `energy_producer_eu${parseInt(i) + 1}`;
            addShaped(BlockID[producerID], 1, 0, ["sws", "tmg", "scs"], ['s', 1, -1, 'w', BlockID.cableCopper0, -1, 't', BlockID[transformerID], -1, 'm', BlockID.machineBlockBasic, -1, 'g', 266, -1, 'c', ItemID.coil, -1]);
        }
    })(["LV", "MV", "HV", "EV"]);
    addShaped(BlockID.energy_producer_eu5, 1, 0, ["sws", "tmt", "scs"], ['s', 1, -1, 'w', BlockID.cableCopper0, -1, 't', BlockID.transformerEV, -1, 'm', BlockID.machineBlockBasic, -1, 'c', ItemID.coil, -1]);
});