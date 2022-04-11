ModAPI.registerAPI("EnergyConvertersAPI", {
    createConsumer, createProducer,
    requireGlobal: (command: string) => eval(command)
});
Logger.Log("EnergyConverters shared ModAPI shared with name \'EnergyConvertersAPI\'.", "EnergyConverters DEBUG");