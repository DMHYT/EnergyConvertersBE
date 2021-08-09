var EnergyRegistry,__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var i in r=arguments[t])Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);return e}).apply(this,arguments)},__extends=this&&this.__extends||function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])})(r,t)};return function(r,t){function n(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();LIBRARY({name:"EnergyNet",version:8,shared:!0,api:"CoreEngine"}),Translation.addTranslation("Energy",{ru:"Энергия",zh:"能量"}),function(e){function r(r,t){e.energyTypes[r]&&(alert("WARNING: duplicate energy types for name: "+r+"!"),Logger.Log("duplicate energy types for name: "+r+"!","ERROR"));var n=new EnergyType(r,t);return e.energyTypes[r]=n,n}function t(r){return e.energyTypes[r]}function n(r){return e.wireData[r]}e.energyTypes={},e.wireData={},e.createEnergyType=r,e.assureEnergyType=function(e,n){return t(e)?t(e):r(e,n)},e.getEnergyType=t,e.getValueRatio=function(e,r){var n=t(e),i=t(r);return n&&i?n.value/i.value:(Logger.Log("get energy value ratio failed: some of this 2 energy types is not defiled: "+[e,r],"ERROR"),-1)},e.getWireData=n,e.registerWire=function(r,t,n,i){void 0===i&&(i=EnergyGrid),e.wireData[r]={type:t,maxValue:n,class:i}},e.isWire=function(e,r){var t=n(e);return!(!t||r&&t.type.name!=r)}}(EnergyRegistry||(EnergyRegistry={}));var EnergyTileRegistry,EnergyGridBuilder,EnergyNet,EnergyType=function(){function e(e,r){void 0===r&&(r=1),this.name=e,this.value=r}return e.prototype.registerWire=function(e,r,t){EnergyRegistry.registerWire(e,this,r,t),Block.registerPlaceFunction(e,function(e,r,t,n){var i=BlockSource.getDefaultForActor(n),o=e.relative;0==i.getBlockId(o.x,o.y,o.z)&&(i.setBlock(o.x,o.y,o.z,r.id,r.data),Game.isItemSpendingAllowed(n)&&Entity.setCarriedItem(n,r.id,r.count-1,r.data),EnergyGridBuilder.onWirePlaced(i,o.x,o.y,o.z))})},e}(),EnergyPacket=function(){function e(e,r,t){this.nodeList={},this.energyName=e,this.size=r,this.source=t,this.setNodePassed(t.id)}return e.prototype.validateNode=function(e){return!this.nodeList[e]&&(this.setNodePassed(e),!0)},e.prototype.setNodePassed=function(e){this.nodeList[e]=!0},e}(),GLOBAL_NODE_ID=0,EnergyNode=function(){function e(e,r){this.energyTypes={},this.maxValue=2e9,this.initialized=!1,this.removed=!1,this.blocksMap={},this.entries=[],this.receivers=[],this.energyIn=0,this.currentIn=0,this.energyOut=0,this.currentOut=0,this.energyPower=0,this.currentPower=0,this.id=GLOBAL_NODE_ID++,this.baseEnergy=e.name,this.addEnergyType(e),this.dimension=r}return e.prototype.addEnergyType=function(e){this.energyTypes[e.name]=e},e.prototype.addCoords=function(e,r,t){this.blocksMap[e+":"+r+":"+t]=!0},e.prototype.removeCoords=function(e,r,t){delete this.blocksMap[e+":"+r+":"+t]},e.prototype.addEntry=function(e){-1==this.entries.indexOf(e)&&this.entries.push(e)},e.prototype.removeEntry=function(e){var r=this.entries.indexOf(e);-1!=r&&this.entries.splice(r,1)},e.prototype.addReceiver=function(e){return-1==this.receivers.indexOf(e)&&(this.receivers.push(e),!0)},e.prototype.removeReceiver=function(e){var r=this.receivers.indexOf(e);return-1!=r&&(this.receivers.splice(r,1),!0)},e.prototype.addConnection=function(e){this.addReceiver(e)&&e.addEntry(this)},e.prototype.removeConnection=function(e){this.removeReceiver(e)&&e.removeEntry(this)},e.prototype.resetConnections=function(){for(var e=0,r=this.entries;e<r.length;e++){r[e].removeReceiver(this)}this.entries=[];for(var t=0,n=this.receivers;t<n.length;t++){n[t].removeEntry(this)}this.receivers=[]},e.prototype.receiveEnergy=function(e,r){var t=this.transferEnergy(e,r);return t>0&&(this.currentPower=Math.max(this.currentPower,r.size),this.currentIn+=t),t},e.prototype.add=function(e,r){return 0==e?0:e-this.addPacket(this.baseEnergy,e,r)},e.prototype.addPacket=function(e,r,t){void 0===t&&(t=r);var n=new EnergyPacket(e,t,this);return this.transferEnergy(r,n)},e.prototype.transferEnergy=function(e,r){if(0==this.receivers.length)return 0;var t=e;r.size>this.maxValue&&(e=Math.min(e,r.size),this.onOverload(r.size));for(var n=__assign({},r.nodeList),i=this.receivers.length,o=0;o<i;o++){var s=this.receivers[o];if(e<=0)break;r.validateNode(s.id)&&(e-=s.receiveEnergy(Math.ceil(e/(i-o)),r))}r.nodeList=n;for(var y=0,c=this.receivers;y<c.length;y++){s=c[y];if(e<=0)break;r.validateNode(s.id)&&(e-=s.receiveEnergy(e,r))}var a=t-e;return a>0&&(this.currentPower=Math.max(this.currentPower,r.size),this.currentOut+=a),a},e.prototype.addAll=function(e,r){void 0===r&&(r=e),this.add(e,r)},e.prototype.onOverload=function(e){},e.prototype.isConductor=function(e){return!0},e.prototype.canReceiveEnergy=function(e,r){return!0},e.prototype.canExtractEnergy=function(e,r){return!0},e.prototype.canConductEnergy=function(e,r,t){return!0},e.prototype.isCompatible=function(e){for(var r in this.energyTypes)if(e.energyTypes[r])return!0;return!1},e.prototype.init=function(){},e.prototype.tick=function(){this.energyIn=this.currentIn,this.currentIn=0,this.energyOut=this.currentOut,this.currentOut=0,this.energyPower=this.currentPower,this.currentPower=0},e.prototype.destroy=function(){this.removed=!0,this.resetConnections(),EnergyNet.removeEnergyNode(this)},e.prototype.toString=function(){return"[EnergyNode id="+this.id+", type="+this.baseEnergy+", entries="+this.entries.length+", receivers="+this.receivers.length+", energyIn="+this.energyIn+", energyOut="+this.energyOut+", power="+this.energyPower+"]"},e}(),EnergyGrid=function(e){function r(r,t,n,i){var o=e.call(this,r,i.getDimension())||this;return o.maxValue=t,o.blockID=n,o.region=i,o}return __extends(r,e),r.prototype.isCompatible=function(e){for(var r in this.energyTypes)if(e.energyTypes[r])return!0;return!1},r.prototype.mergeGrid=function(e){for(var r in e.blocksMap)this.blocksMap[r]=!0;for(var t=0,n=e.entries;t<n.length;t++){(s=n[t]).addConnection(this)}for(var i=0,o=e.receivers;i<o.length;i++){var s=o[i];this.addConnection(s)}return e.destroy(),this},r.prototype.rebuildRecursive=function(e,r,t,n){if(!this.removed){var i=e+":"+r+":"+t;if(!this.blocksMap[i]){var o=EnergyNet.getNodeOnCoords(this.region,e,r,t);if(!o||this.isCompatible(o))if(o instanceof EnergyTileNode)o.canReceiveEnergy(n,this.baseEnergy)&&this.addConnection(o),o.canExtractEnergy(n,this.baseEnergy)&&o.addConnection(this);else{var s=this.region.getBlockId(e,r,t);this.blockID==s?o?this.mergeGrid(o):(this.blocksMap[i]=!0,this.rebuildFor6Sides(e,r,t)):o?EnergyGridBuilder.connectNodes(this,o):EnergyRegistry.isWire(s,this.baseEnergy)&&EnergyGridBuilder.buildWireGrid(this.region,e,r,t)}}}},r.prototype.rebuildFor6Sides=function(e,r,t){for(var n={x:e,y:r,z:t},i=0;i<6;i++){var o=World.getRelativeCoords(e,r,t,i);this.canConductEnergy(n,o,i)&&this.rebuildRecursive(o.x,o.y,o.z,1^i)}},r}(EnergyNode),EnergyTileNode=function(e){function r(r,t){var n=e.call(this,r,t.dimension)||this;return n.tileEntity=t,n}return __extends(r,e),r.prototype.getParent=function(){return this.tileEntity},r.prototype.receiveEnergy=function(e,r){var t=this.tileEntity.energyReceive(r.energyName,e,r.size);return t<e&&this.isConductor(r.energyName)&&(t+=this.transferEnergy(e-t,r)),t>0&&(this.currentPower=Math.max(this.currentPower,r.size),this.currentIn+=t),t},r.prototype.isConductor=function(e){return this.tileEntity.isConductor(e)},r.prototype.canReceiveEnergy=function(e,r){return this.tileEntity.canReceiveEnergy(e,r)},r.prototype.canExtractEnergy=function(e,r){return this.tileEntity.canExtractEnergy(e,r)},r.prototype.init=function(){EnergyGridBuilder.buildGridForTile(this.tileEntity),this.initialized=!0},r.prototype.tick=function(){this.tileEntity.__initialized&&this.tileEntity.isLoaded&&(this.initialized||this.init(),this.tileEntity.energyTick(this.baseEnergy,this),e.prototype.tick.call(this))},r}(EnergyNode);!function(e){function r(e,r){e.isEnergyTile||t(e),e.energyTypes[r.name]=r}function t(e){e.isEnergyTile=!0,e.energyTypes={},e.energyTick=e.energyTick||function(){},e.energyReceive=e.energyReceive||function(){return 0},e.isConductor=e.isConductor||function(){return!1},e.canReceiveEnergy=e.canReceiveEnergy||function(){return!0},e.canExtractEnergy=e.canExtractEnergy||function(){return!0}}e.addEnergyType=r,e.addEnergyTypeForId=function(e,t){var n=TileEntity.getPrototype(e);n?r(n,t):Logger.Log("cannot add energy type no prototype defined for id "+e,"ERROR")},e.setupAsEnergyTile=t,e.machineIDs={},e.isMachine=function(r){return!!e.machineIDs[r]}}(EnergyTileRegistry||(EnergyTileRegistry={})),Callback.addCallback("TileEntityAdded",function(e){if(e.isEnergyTile){var r=void 0;for(var t in e.energyTypes){var n=e.energyTypes[t];r?r.addEnergyType(n):r=new EnergyTileNode(n,e)}e.energyNode=r,EnergyNet.addEnergyNode(r)}}),Callback.addCallback("TileEntityRemoved",function(e){e.energyNode&&e.energyNode.destroy()}),function(e){function r(e,r,t,n){var i=e.getBlockId(r,t,n),o=EnergyRegistry.getWireData(i);if(o){var s=new o.class(o.type,o.value,i,e);return EnergyNet.addEnergyNode(s),s.rebuildRecursive(r,t,n),s}return null}function t(r,t,n,i,o){var s=EnergyNet.getNodeOnCoords(r,t,n,i);s&&(s.destroy(),e.rebuildForWire(r,t-1,n,i,o),e.rebuildForWire(r,t+1,n,i,o),e.rebuildForWire(r,t,n-1,i,o),e.rebuildForWire(r,t,n+1,i,o),e.rebuildForWire(r,t,n,i-1,o),e.rebuildForWire(r,t,n,i+1,o))}e.connectNodes=function(e,r){e.addConnection(r),r.addConnection(e)},e.buildGridForTile=function(e){for(var t=e.energyNode,n=0;n<6;n++){var i=World.getRelativeCoords(e.x,e.y,e.z,n),o=EnergyNet.getNodeOnCoords(e.blockSource,i.x,i.y,i.z);if(o&&t.isCompatible(o)){var s=o.baseEnergy;t.canExtractEnergy(n,s)&&o.canReceiveEnergy(1^n,s)&&t.addConnection(o),t.canReceiveEnergy(n,s)&&o.canExtractEnergy(1^n,s)&&o.addConnection(t)}else r(e.blockSource,i.x,i.y,i.z)}},e.buildWireGrid=r,e.rebuildWireGrid=function(r,t,n,i){var o=EnergyNet.getNodeOnCoords(r,t,n,i);o&&(o.destroy(),e.buildWireGrid(r,t,n,i))},e.rebuildForWire=function(e,t,n,i,o){return e.getBlockId(t,n,i)==o?r(e,t,n,i):null},e.onWirePlaced=function(r,t,n,i){for(var o=r.getBlockId(t,n,i),s={x:t,y:n,z:i},y=0;y<6;y++){var c=World.getRelativeCoords(t,n,i,y);if(r.getBlockId(c.x,c.y,c.z)==o){var a=EnergyNet.getNodeOnCoords(r,c.x,c.y,c.z);if(a&&a instanceof EnergyGrid&&a.canConductEnergy(c,s,1^y))return void a.rebuildRecursive(t,n,i,1^y)}}e.buildWireGrid(r,t,n,i)},e.onWireDestroyed=t,Callback.addCallback("DestroyBlock",function(e,r,n){EnergyRegistry.isWire(r.id)&&t(BlockSource.getDefaultForActor(n),e.x,e.y,e.z,r.id)})}(EnergyGridBuilder||(EnergyGridBuilder={})),function(e){var r={};function t(e){return r[e]=r[e]||[]}e.getNodesByDimension=t,e.addEnergyNode=function(e){t(e.dimension).push(e)},e.removeEnergyNode=function(e){var r=t(e.dimension),n=r.indexOf(e);-1!=n&&r.splice(n,1)},e.getNodeOnCoords=function(e,r,n,i){var o=TileEntity.getTileEntity(r,n,i,e);if(o&&o.__initialized&&o.energyNode)return o.energyNode;for(var s=r+":"+n+":"+i,y=0,c=t(e.getDimension());y<c.length;y++){var a=c[y];if(a.blocksMap[s])return a}return null},Callback.addCallback("LevelLeft",function(){r={},GLOBAL_NODE_ID=0}),Callback.addCallback("tick",function(){!function(){for(var e in r)for(var t=0,n=r[e];t<n.length;t++)n[t].tick()}()})}(EnergyNet||(EnergyNet={})),EXPORT("EnergyTypeRegistry",EnergyRegistry),EXPORT("EnergyTileRegistry",EnergyTileRegistry),EXPORT("EnergyNode",EnergyNode),EXPORT("EnergyGrid",EnergyGrid),EXPORT("EnergyGridBuilder",EnergyGridBuilder),EXPORT("EnergyNet",EnergyNet);