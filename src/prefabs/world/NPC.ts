import Prefab from '../Prefab';
import JsonLevelState from '../../states/JsonLevelState';
import Player from './Player';

export default class NPC extends Prefab {
  private __message:string = null;

  constructor(state:JsonLevelState, name:string, position:Phaser.Point, properties:any={}) {
    super(state, name, position, properties);

    this.anchor.setTo(0.5, 0.5);

    this.__message = this.__state.game.cache.getText(properties.message);

    this.__state.game.physics.arcade.enable(this);

    this.body.immovable = true;
  }

  update():void {
    this.__state.game.physics.arcade.collide(this, this.__state.groups.players, this.__talk, null, this);
  }

  private __talk(npc:NPC, player:Player):void {
    player.stop();
    console.log(this.__message);
  }
}
