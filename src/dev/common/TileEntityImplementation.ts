// from https://gist.github.com/DMHYT/f44e69c45b53012b778c636cd315f6cf

interface RedstoneSignalParams { power: number, signal: number, onLoad: boolean }

class TileEntityImplementation<T> implements TileEntity, TileEntity.TileEntityPrototype {

    public readonly useNetworkItemContainer = true;
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;
    public readonly dimension: number;
    public readonly blockID: number;
    public readonly data: T;
    public readonly container: ItemContainer;
    public readonly liquidStorage: LiquidRegistry.Storage;
    public readonly isLoaded: boolean;
    public readonly remove: boolean;
    public selfDestroy(): void {}
    public sendPacket(name: string, data: any): void {}
    public readonly blockSource: BlockSource;
    public readonly networkData: SyncedNetworkData;
    public readonly networkEntity: NetworkEntity;
    public sendResponse(packetName: string, data: any): void {}
    public created(): void {}
    public events: {[packetName: string]: (data: any, extra: any) => void};
    public containerEvents: {[eventName: string]: (container: ItemContainer, window: Nullable<UI.IWindow>, windowContent: Nullable<UI.WindowContent>, eventData: any) => void};
    public init(): void {}
    public tick(): void {}
    public click(id: number, count: number, data: number, coords: Callback.ItemUseCoordinates, player: number, extra: Nullable<ItemExtraData>): boolean | void {}
    public destroyBlock(coords: Callback.ItemUseCoordinates, player: number): void {}
    public redstone(params: RedstoneSignalParams): void {}
    public projectileHit(coords: Callback.ItemUseCoordinates, target: Callback.ProjectileHitTarget): void {}
    public destroy(): boolean | void {}
    /** @deprecated */
    public getGuiScreen(): UI.IWindow { return }
    public getScreenName(player: number, coords: Vector): string { return }
    public getScreenByName(screenName?: string): UI.IWindow { return }
    public requireMoreLiquid(liquid: string, amount: number): void {}
    constructor(public readonly defaultValues: T) {}
    
}