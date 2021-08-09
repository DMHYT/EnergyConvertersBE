abstract class TileEntityConverterBase<T> 
extends TileEntityImplementation<{ cachedEnergyBridge: java.lang.ref.WeakReference<TileEntityEnergyBridge> }> 
implements IEnergyBridge {

    constructor() {
        super({ cachedEnergyBridge: new WeakReference<TileEntityEnergyBridge>(null) });
    }

    public getEnergyBridge(): TileEntityEnergyBridge {
        let energyBridge: TileEntityEnergyBridge = this.data.cachedEnergyBridge.get();
        if(energyBridge == null) {
            energyBridge = null;
            for(let direction = 0; direction < 6; direction++) {
                const pos = BlockPosUtils.offset({ x: this.x, y: this.y, z: this.z }, direction);
                const block = this.blockSource.getBlockId(pos.x, pos.y, pos.z);
                if(block != BlockID.energyBridge) continue;
                const te = TileEntity.getTileEntity(pos.x, pos.y, pos.z, this.blockSource);
                if(te == null || te.__energy_bridge__) {
                    Logger.Log(`Expected TileEntityEnergyBridge [x=${pos.x}, y=${pos.y}, z=${pos.z}] but found ${te}. Try replacing the affected block`, "EnergyConverters ERROR");
                    continue;
                }
                energyBridge = te as TileEntityEnergyBridge;
                this.data.cachedEnergyBridge = new WeakReference<TileEntityEnergyBridge>(energyBridge);
            }
        }
        return energyBridge;
    }

    public getBridgeEnergyStored(): number {
        const energyBridge = this.getEnergyBridge();
        if(energyBridge == null) return 0;
        return energyBridge.getStoredEnergy();
    }

    public getBridgeEnergyStoredMax(): number {
        const energyBridge = this.getEnergyBridge();
        if(energyBridge == null) return 0;
        return energyBridge.getStoredEnergyMax();
    }
    
}