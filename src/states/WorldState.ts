import JsonLevelState from './JsonLevelState';
import * as prefabClasses from '../constants/prefabClasses';

export default class WorldState extends JsonLevelState {
  private __map:Phaser.Tilemap = null;
  private __layers:any = {};

  get layers():any {
    return this.__layers;
  }

  init(levelData:any):void {
    super.init(levelData);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
  }

  preload():void {
    Object.keys(this.__levelData.npc_messages).forEach((key:string):void => {
      this.load.text(key, this.__levelData.npc_messages[key]);
    });
  }

  create():void {
    this.__map = this.game.add.tilemap(this.__levelData.map.key);
    this.__map.tilesets.forEach((tileset:Phaser.Tileset, index:number):void => {
      this.__map.addTilesetImage(tileset.name, this.__levelData.map.tilesets[index]);
    });

    this.__map.layers.forEach((layer:any):void => {
      this.__layers[layer.name] = this.__map.createLayer(layer.name);
      if (layer.properties.collision) {
        this.__map.setCollisionByExclusion([-1], true, layer.name);
      }
    });
    this.__layers[this.__map.layers[0].name].resizeWorld();

    super.create();

    Object.keys(this.__map.objects).forEach((key:string):void => {
      this.__map.objects[key].forEach(this.__createObject, this);
    });
  }

  protected __createObject(object:any):void {
    const position:any = {
      x: object.x + (object.width * 0.5),
      y: object.y + (object.height * 0.5)
    };
    new prefabClasses[object.type](this, object.name, position, object.properties);
  }
}
