import Prefab from '../Prefab';
import JsonLevelState from '../../states/JsonLevelState';

export default class Door extends Prefab {
  private __nextLevel:string = null;

  constructor(state:JsonLevelState, name:string, position:Phaser.Point, properties:any={}) {
    super(state, name, position, properties);

    this.anchor.setTo(0.5, 0.5);

    this.__nextLevel = properties.next_level;

    this.__state.game.physics.arcade.enable(this);

    this.body.immovable = true;
  }

  update():void {
    this.__state.game.physics.arcade.collide(this, this.__state.groups.players, this.__enter, null, this);
  }

  private __enter():void {
    this.__state.game.state.start('Boot', true, false, this.__nextLevel, 'World');
  }
}
