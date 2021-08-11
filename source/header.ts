/*
              ███████╗███╗  ██╗███████╗██████╗  ██████╗ ██╗   ██╗
              ██╔════╝████╗ ██║██╔════╝██╔══██╗██╔════╝ ╚██╗ ██╔╝
              █████╗  ██╔██╗██║█████╗  ██████╔╝██║  ██╗  ╚████╔╝ 
              ██╔══╝  ██║╚████║██╔══╝  ██╔══██╗██║  ╚██╗  ╚██╔╝  
              ███████╗██║ ╚███║███████╗██║  ██║╚██████╔╝   ██║   
              ╚══════╝╚═╝  ╚══╝╚══════╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   
  █████╗  █████╗ ███╗  ██╗██╗   ██╗███████╗██████╗ ████████╗███████╗██████╗  ██████╗
 ██╔══██╗██╔══██╗████╗ ██║██║   ██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔════╝
 ██║  ╚═╝██║  ██║██╔██╗██║╚██╗ ██╔╝█████╗  ██████╔╝   ██║   █████╗  ██████╔╝╚█████╗ 
 ██║  ██╗██║  ██║██║╚████║ ╚████╔╝ ██╔══╝  ██╔══██╗   ██║   ██╔══╝  ██╔══██╗ ╚═══██╗
 ╚█████╔╝╚█████╔╝██║ ╚███║  ╚██╔╝  ███████╗██║  ██║   ██║   ███████╗██║  ██║██████╔╝
  ╚════╝  ╚════╝ ╚═╝  ╚══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═════╝ 
*/

// Unofficial port of the Energy Converters 
// mod for Minecraft Forge 1.12.2

// © vsdum 2021
// YouTube DMH (Russian) - https://www.youtube.com/channel/UCdQKuakM3rnuGV_1VA6XUKQ
// YouTube vstannumdum (English) - https://www.youtube.com/channel/UCXHpQ_SQ8VPigIvbbzHWWdA
// My VK - https://www.vk.com/vstannumdum
// Report bugs in VK Public - https://www.vk.com/dmhmods

// Original Forge 1.12.2 mod by xalcon
// https://www.curseforge.com/minecraft/mc-mods/energy-converters
// https://www.curseforge.com/members/xalcon/projects

declare const ic2loaded: boolean;

const JavaString = java.lang.String;
const IllegalArgumentException = java.lang.IllegalArgumentException;

IMPORT("EnergyNet");

const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const FE = EnergyTypeRegistry.assureEnergyType("FE", 0.25);
// Maybe some day...
const MJ = EnergyTypeRegistry.assureEnergyType("MJ", 3.75);
const TESLA = EnergyTypeRegistry.assureEnergyType("Tesla", 0.25);

const bridgeEnergyBuffer = Math.max(Math.min(__config__.getNumber("bridgeEnergyBuffer").intValue(), 1e12), 1);
const conversionLoss = __config__.getNumber("conversionLoss").intValue();

const GROUP: number[] = [];