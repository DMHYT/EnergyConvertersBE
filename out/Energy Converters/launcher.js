ConfigureMultiplayer({
    name: "Energy Converters",
    version: "1.0",
    description: "A mod to freely convert between different energy systems like IC2, RF and Tesla",
    isClientOnly: false
});
var IC2LOADED = false;
ModAPI.addAPICallback("ICore", function(api) { IC2LOADED = true });
Launch({ ic2loaded: IC2LOADED });