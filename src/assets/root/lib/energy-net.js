var EnergyRegistry,__assign=this&&this.__assign||function(){return __assign=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var i in r=arguments[t],r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);return e},__assign.apply(this,arguments)},__extends=this&&this.__extends||function(){var e=function(r,t){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])},e(r,t)};return function(r,t){function n(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();LIBRARY({name:"EnergyNet",version:9,shared:!0,api:"CoreEngine"}),Translation.addTranslation("Energy",{ru:"Энергия",zh:"能量"}),function(e){function r(r,t){e.energyTypes[r]&&(alert("WARNING: duplicate energy types for name: "+r+"!"),Logger.Log("duplicate energy types for name: "+r+"!","ERROR"));var n=new EnergyType(r,t);return e.energyTypes[r]=n,n}function t(e,t){return n(e)?n(e):r(e,t)}function n(r){return e.energyTypes[r]}function i(e,r){var t=n(e),i=n(r);return t&&i?t.value/i.value:(Logger.Log("get energy value ratio failed: some of this 2 energy types is not defined: "+[e,r],"ERROR"),-1)}function o(r,t,n,i){void 0===i&&(i=EnergyGrid),e.wireData[r]={type:t,maxValue:n,class:i}}function s(r){return e.wireData[r]}function y(e,r){var t=s(e);return!(!t||r&&t.type.name!=r)}e.energyTypes={},e.wireData={},e.createEnergyType=r,e.assureEnergyType=t,e.getEnergyType=n,e.getValueRatio=i,e.registerWire=o,e.getWireData=s,e.isWire=y}(EnergyRegistry||(EnergyRegistry={}));var EnergyTileRegistry,EnergyGridBuilder,EnergyNet,EnergyType=function(){function e(e,r){void 0===r&&(r=1),this.name=e,this.value=r}return e.prototype.registerWire=function(e,r,t){EnergyRegistry.registerWire(e,this,r,t),Block.registerPlaceFunction(e,function(e,r,t,n){var i=BlockSource.getDefaultForActor(n),o=e.relative;0==i.getBlockId(o.x,o.y,o.z)&&(i.setBlock(o.x,o.y,o.z,r.id,r.data),Game.isItemSpendingAllowed(n)&&Entity.setCarriedItem(n,r.id,r.count-1,r.data),EnergyGridBuilder.onWirePlaced(i,o.x,o.y,o.z))})},e}(),EnergyPacket=function(){function e(e,r,t){this.nodeList={},this.energyName=e,this.size=r,this.source=t,this.setNodePassed(t.id)}return e.prototype.validateNode=function(e){return!this.nodeList[e]&&(this.setNodePassed(e),!0)},e.prototype.setNodePassed=function(e){this.nodeList[e]=!0},e}(),GLOBAL_NODE_ID=0,EnergyNode=function(){function e(e,r){this.energyTypes={},this.maxValue=2e9,this.removed=!1,this.blocksMap={},this.entries=[],this.receivers=[],this.energyIn=0,this.currentIn=0,this.energyOut=0,this.currentOut=0,this.energyPower=0,this.currentPower=0,this.id=GLOBAL_NODE_ID++,this.baseEnergy=e.name,this.addEnergyType(e),this.dimension=r}return e.prototype.addEnergyType=function(e){this.energyTypes[e.name]=e},e.prototype.addCoords=function(e,r,t){this.blocksMap[e+":"+r+":"+t]=!0},e.prototype.removeCoords=function(e,r,t){this.blocksMap[e+":"+r+":"+t]=!1},e.prototype.addEntry=function(e){-1==this.entries.indexOf(e)&&this.entries.push(e)},e.prototype.removeEntry=function(e){var r=this.entries.indexOf(e);-1!=r&&this.entries.splice(r,1)},e.prototype.addReceiver=function(e){return-1==this.receivers.indexOf(e)&&(this.receivers.push(e),!0)},e.prototype.removeReceiver=function(e){var r=this.receivers.indexOf(e);return-1!=r&&(this.receivers.splice(r,1),!0)},e.prototype.addConnection=function(e){this.addReceiver(e)&&e.addEntry(this)},e.prototype.removeConnection=function(e){this.removeReceiver(e)&&e.removeEntry(this)},e.prototype.resetConnections=function(){for(var e=0,r=this.entries;e<r.length;e++){var t=r[e];t.removeReceiver(this)}this.entries=[];for(var n=0,i=this.receivers;n<i.length;n++){t=i[n];t.removeEntry(this)}this.receivers=[]},e.prototype.receiveEnergy=function(e,r){var t=this.transferEnergy(e,r);return t>0&&(this.currentPower=Math.max(this.currentPower,r.size),this.currentIn+=t),t},e.prototype.add=function(e,r){if(0==e)return 0;var t=this.addPacket(this.baseEnergy,e,r);return e-t},e.prototype.addPacket=function(e,r,t){void 0===t&&(t=r);var n=new EnergyPacket(e,t,this);return this.transferEnergy(r,n)},e.prototype.transferEnergy=function(e,r){if(0==this.receivers.length)return 0;var t=e;r.size>this.maxValue&&(e=Math.min(e,r.size),this.onOverload(r.size));for(var n=__assign({},r.nodeList),i=this.receivers.length,o=0,s=0;s<this.receivers.length&&!(e<=0);s++){var y=this.receivers[s];r.validateNode(y.id)&&(e-=y.receiveEnergy(Math.ceil(e/(i-o)),r),y.removed&&s--),o++}r.nodeList=n;for(var c=0,a=this.receivers;c<a.length;c++){y=a[c];if(e<=0)break;r.validateNode(y.id)&&(e-=y.receiveEnergy(e,r))}var d=t-e;return d>0&&(this.currentPower=Math.max(this.currentPower,r.size),this.currentOut+=d),d},e.prototype.addAll=function(e,r){void 0===r&&(r=e),this.add(e,r)},e.prototype.onOverload=function(e){},e.prototype.isConductor=function(e){return!0},e.prototype.canReceiveEnergy=function(e,r){return!0},e.prototype.canExtractEnergy=function(e,r){return!0},e.prototype.canConductEnergy=function(e,r,t){return!0},e.prototype.isCompatible=function(e){for(var r in this.energyTypes)if(e.energyTypes[r])return!0;return!1},e.prototype.tick=function(){this.energyIn=this.currentIn,this.currentIn=0,this.energyOut=this.currentOut,this.currentOut=0,this.energyPower=this.currentPower,this.currentPower=0},e.prototype.destroy=function(){this.removed=!0,this.resetConnections(),EnergyNet.removeEnergyNode(this)},e.prototype.toString=function(){return"[EnergyNode id="+this.id+", type="+this.baseEnergy+", entries="+this.entries.length+", receivers="+this.receivers.length+", energyIn="+this.energyIn+", energyOut="+this.energyOut+", power="+this.energyPower+"]"},e}(),EnergyGrid=function(e){function r(r,t,n,i){var o=e.call(this,r,i.getDimension())||this;return o.rebuild=!1,o.maxValue=t,o.blockID=n,o.region=i,o}return __extends(r,e),r.prototype.isCompatible=function(e){for(var r in this.energyTypes)if(e.energyTypes[r])return!0;return!1},r.prototype.mergeGrid=function(e){for(var r in e.blocksMap)this.blocksMap[r]=!0;for(var t=0,n=e.entries;t<n.length;t++){var i=n[t];i.addConnection(this)}for(var o=0,s=e.receivers;o<s.length;o++){i=s[o];this.addConnection(i)}return e.destroy(),this},r.prototype.rebuildGrid=function(){for(var e in this.destroy(),this.blocksMap)if(!this.blocksMap[e]){var r=e.split(":"),t=parseInt(r[0]),n=parseInt(r[1]),i=parseInt(r[2]);EnergyGridBuilder.onWireDestroyed(this.region,t,n,i,this.blockID)}},r.prototype.rebuildRecursive=function(e,r,t,n){if(!this.removed){var i=e+":"+r+":"+t;if(!this.blocksMap[i]){var o=EnergyNet.getNodeOnCoords(this.region,e,r,t);if(!o||this.isCompatible(o))if(o instanceof EnergyTileNode)o.canReceiveEnergy(n,this.baseEnergy)&&this.addConnection(o),o.canExtractEnergy(n,this.baseEnergy)&&o.addConnection(this);else{var s=this.region.getBlockId(e,r,t);this.blockID==s?o?this.mergeGrid(o):(this.blocksMap[i]=!0,this.rebuildFor6Sides(e,r,t)):o?EnergyGridBuilder.connectNodes(this,o):EnergyRegistry.isWire(s,this.baseEnergy)&&EnergyGridBuilder.buildWireGrid(this.region,e,r,t)}}}},r.prototype.rebuildFor6Sides=function(e,r,t){for(var n={x:e,y:r,z:t},i=0;i<6;i++){var o=World.getRelativeCoords(e,r,t,i);this.canConductEnergy(n,o,i)&&this.rebuildRecursive(o.x,o.y,o.z,1^i)}},r.prototype.tick=function(){this.rebuild?this.rebuildGrid():e.prototype.tick.call(this)},r}(EnergyNode),EnergyTileNode=function(e){function r(r,t){var n=e.call(this,r,t.dimension)||this;return n.initialized=!1,n.tileEntity=t,n}return __extends(r,e),r.prototype.getParent=function(){return this.tileEntity},r.prototype.receiveEnergy=function(e,r){var t=this.tileEntity.energyReceive(r.energyName,e,r.size);return t<e&&this.isConductor(r.energyName)&&(t+=this.transferEnergy(e-t,r)),t>0&&(this.currentPower=Math.max(this.currentPower,r.size),this.currentIn+=t),t},r.prototype.isConductor=function(e){return this.tileEntity.isConductor(e)},r.prototype.canReceiveEnergy=function(e,r){return this.tileEntity.canReceiveEnergy(e,r)},r.prototype.canExtractEnergy=function(e,r){return this.tileEntity.canExtractEnergy(e,r)},r.prototype.init=function(){EnergyGridBuilder.buildGridForTile(this.tileEntity),this.initialized=!0},r.prototype.tick=function(){this.tileEntity.__initialized&&this.tileEntity.isLoaded&&(this.initialized||this.init(),this.tileEntity.energyTick(this.baseEnergy,this),e.prototype.tick.call(this))},r}(EnergyNode);(function(e){function r(e,r){e.isEnergyTile||n(e),e.energyTypes[r.name]=r}function t(e,t){var n=TileEntity.getPrototype(e);n?r(n,t):Logger.Log("cannot add energy type no prototype defined for id "+e,"ERROR")}function n(e){e.isEnergyTile=!0,e.energyTypes={},e.energyTick=e.energyTick||function(){},e.energyReceive=e.energyReceive||function(){return 0},e.isConductor=e.isConductor||function(){return!1},e.canReceiveEnergy=e.canReceiveEnergy||function(){return!0},e.canExtractEnergy=e.canExtractEnergy||function(){return!0}}function i(r){return!!e.machineIDs[r]}e.addEnergyType=r,e.addEnergyTypeForId=t,e.setupAsEnergyTile=n,e.machineIDs={},e.isMachine=i})(EnergyTileRegistry||(EnergyTileRegistry={})),Callback.addCallback("TileEntityAdded",function(e){if(e.isEnergyTile){var r=void 0;for(var t in e.energyTypes){var n=e.energyTypes[t];r?r.addEnergyType(n):r=new EnergyTileNode(n,e)}e.energyNode=r,EnergyNet.addEnergyNode(r)}}),Callback.addCallback("TileEntityRemoved",function(e){e.energyNode&&e.energyNode.destroy()}),function(e){function r(e,r){e.addConnection(r),r.addConnection(e)}function t(e){for(var r=e.energyNode,t=0;t<6;t++){var i=World.getRelativeCoords(e.x,e.y,e.z,t),o=EnergyNet.getNodeOnCoords(e.blockSource,i.x,i.y,i.z);if(o&&r.isCompatible(o)){var s=o.baseEnergy;r.canExtractEnergy(t,s)&&o.canReceiveEnergy(1^t,s)&&r.addConnection(o),r.canReceiveEnergy(t,s)&&o.canExtractEnergy(1^t,s)&&o.addConnection(r)}else n(e.blockSource,i.x,i.y,i.z)}}function n(e,r,t,n){var i=e.getBlockId(r,t,n),o=EnergyRegistry.getWireData(i);if(o){var s=new o.class(o.type,o.maxValue,i,e);return EnergyNet.addEnergyNode(s),s.rebuildRecursive(r,t,n),s}return null}function i(r,t,n,i){var o=EnergyNet.getNodeOnCoords(r,t,n,i);o&&(o.destroy(),e.buildWireGrid(r,t,n,i))}function o(e,r,t,i,o){return e.getBlockId(r,t,i)!=o||EnergyNet.getNodeOnCoords(e,r,t,i)?null:n(e,r,t,i)}function s(r,t,n,i){for(var o=r.getBlockId(t,n,i),s={x:t,y:n,z:i},y=0;y<6;y++){var c=World.getRelativeCoords(t,n,i,y);if(r.getBlockId(c.x,c.y,c.z)==o){var a=EnergyNet.getNodeOnCoords(r,c.x,c.y,c.z);if(a&&a instanceof EnergyGrid&&a.canConductEnergy(c,s,1^y))return void a.rebuildRecursive(t,n,i,1^y)}}e.buildWireGrid(r,t,n,i)}function y(r,t,n,i,o){e.rebuildForWire(r,t-1,n,i,o),e.rebuildForWire(r,t+1,n,i,o),e.rebuildForWire(r,t,n-1,i,o),e.rebuildForWire(r,t,n+1,i,o),e.rebuildForWire(r,t,n,i-1,o),e.rebuildForWire(r,t,n,i+1,o)}e.connectNodes=r,e.buildGridForTile=t,e.buildWireGrid=n,e.rebuildWireGrid=i,e.rebuildForWire=o,e.onWirePlaced=s,e.onWireDestroyed=y,Callback.addCallback("DestroyBlock",function(e,r,t){if(EnergyRegistry.isWire(r.id)){var n=BlockSource.getDefaultForActor(t),i=EnergyNet.getNodeOnCoords(n,e.x,e.y,e.z);i&&(i.destroy(),y(n,e.x,e.y,e.z,r.id))}}),Callback.addCallback("PopBlockResources",function(e,r,t,n,i){if(EnergyRegistry.isWire(r.id)){var o=EnergyNet.getNodeOnCoords(i,e.x,e.y,e.z);o&&(o.removeCoords(e.x,e.y,e.z),o.rebuild=!0)}})}(EnergyGridBuilder||(EnergyGridBuilder={})),function(e){function r(e){return s[e]=s[e]||[]}function t(e){r(e.dimension).push(e)}function n(e){var t=r(e.dimension),n=t.indexOf(e);-1!=n&&t.splice(n,1)}function i(e,t,n,i){var o=TileEntity.getTileEntity(t,n,i,e);if(o&&o.__initialized&&o.energyNode)return o.energyNode;for(var s=r(e.getDimension()),y=t+":"+n+":"+i,c=0,a=s;c<a.length;c++){var d=a[c];if(d.blocksMap[y])return d}return null}function o(){for(var e in s)for(var r=0,t=s[e];r<t.length;r++){var n=t[r];n.tick()}}var s={};e.getNodesByDimension=r,e.addEnergyNode=t,e.removeEnergyNode=n,e.getNodeOnCoords=i,Callback.addCallback("LevelLeft",function(){s={},GLOBAL_NODE_ID=0}),Callback.addCallback("tick",function(){o()})}(EnergyNet||(EnergyNet={})),EXPORT("EnergyTypeRegistry",EnergyRegistry),EXPORT("EnergyTileRegistry",EnergyTileRegistry),EXPORT("EnergyNode",EnergyNode),EXPORT("EnergyGrid",EnergyGrid),EXPORT("EnergyGridBuilder",EnergyGridBuilder),EXPORT("EnergyNet",EnergyNet);