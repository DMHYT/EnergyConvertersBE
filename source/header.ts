const JavaString = java.lang.String;
const IllegalArgumentException = java.lang.IllegalArgumentException;
const WeakReference = java.lang.ref.WeakReference;

IMPORT("EnergyNet");

const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const FE = EnergyTypeRegistry.assureEnergyType("FE", 0.25);
// Maybe some day...
const MJ = EnergyTypeRegistry.assureEnergyType("MJ", 3.75);
const TESLA = EnergyTypeRegistry.assureEnergyType("Tesla", 0.25);

const bridgeEnergyBuffer = __config__.getNumber("bridgeEnergyBuffer").intValue();
const conversionLoss = __config__.getNumber("conversionLoss").intValue();

const GROUP: number[] = [];