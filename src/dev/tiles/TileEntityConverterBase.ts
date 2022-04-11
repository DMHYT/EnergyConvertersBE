abstract class TileEntityConverterBase
extends TileEntityImplementation<{}> 
implements IEnergyBridge {

    constructor() {
        super({});
    }

    public getEnergyBridge(): Nullable<TileEntityEnergyBridge> {
        for(let direction = 0; direction < 6; direction++) {
            const pos = BlockPosUtils.offset({ x: this.x, y: this.y, z: this.z }, direction);
            const block = this.blockSource.getBlockId(pos.x, pos.y, pos.z);
            if(block != BlockID.energyBridge) continue;
            const te = TileEntity.getTileEntity(pos.x, pos.y, pos.z, this.blockSource);
            if(te == null || !te.__energy_bridge__) continue;
            return te as TileEntityEnergyBridge;
        }
        return null;
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