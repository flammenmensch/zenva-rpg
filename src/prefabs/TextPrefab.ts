import JsonLevelState from '../states/JsonLevelState';

export default class TextPrefab extends Phaser.Text {
  private __state:JsonLevelState = null;
  private __name:string = null;

  constructor(state:JsonLevelState, name:string, position:Phaser.Point, properties:any) {
    super(state.game, position.x, position.y, properties.text, properties.style);
    this.__name = name;

    this.__state = state;
    this.__state.groups[properties.group].add(this);

    if (properties.scale) {
      this.scale.setTo(properties.scale.x, properties.scale.y);
    }

    if (properties.anchor) {
      this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }

    this.__state.prefabs[name] = this;
  }
}
