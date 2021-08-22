ModAPI.registerAPI("EnergyConvertersAPI", {
    createConsumer: createConsumer,
    createProducer: createProducer,
    requireGlobal: (command: string) => eval(command)
});
Logger.Log("EnergyConverters shared ModAPI shared with name \'EnergyConvertersAPI\'.", "EnergyConverters DEBUG");