type BlockPos = Vector;
namespace BlockPosUtils {

    export function offset(pos: BlockPos, face: number): BlockPos {
        switch(face) {
            case EBlockSide.NORTH: pos.z -= 1; break;
            case EBlockSide.SOUTH: pos.z += 1; break;
            case EBlockSide.EAST: pos.x += 1; break;
            case EBlockSide.WEST: pos.x -= 1; break;
            case EBlockSide.UP: pos.y += 1; break;
            case EBlockSide.DOWN: pos.y -= 1; break;
            default: throw new IllegalArgumentException(`Illegal block face id ${face}`);
        }
        return pos;
    }

    export function oppositeFace(face: number): number {
        switch(face) {
            case EBlockSide.NORTH: return EBlockSide.SOUTH;
            case EBlockSide.SOUTH: return EBlockSide.NORTH;
            case EBlockSide.EAST: return EBlockSide.WEST;
            case EBlockSide.WEST: return EBlockSide.EAST;
            case EBlockSide.UP: return EBlockSide.DOWN;
            case EBlockSide.DOWN: return EBlockSide.UP;
            default: throw new IllegalArgumentException(`Illegal block face id ${face}`);
        }
    }

}