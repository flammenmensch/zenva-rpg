import JsonLevelState from '../states/JsonLevelState';

export default class Prefab extends Phaser.Sprite {
  protected __state:JsonLevelState = null;
  protected __name:string = null;

  constructor(state:JsonLevelState, name:string, position:Phaser.Point, properties:any) {
    super(state.game, position.x, position.y, properties.texture);
    this.__name = name;

    this.__state = state;
    this.__state.groups[properties.group].add(this);

    this.frame = properties.frame;

    if (properties.scale) {
      this.scale.setTo(properties.scale.x, properties.scale.y);
    }

    this.__state.prefabs[name] = this;
  }
}
