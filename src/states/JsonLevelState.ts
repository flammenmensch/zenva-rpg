import UserInput from '../plugins/UserInput';
import * as prefabClasses from '../constants/prefabClasses';

interface ILevelData {
  assets?:any;
  prefabs?:any;
  groups?:string[];
  user_input?:any;
  initial_user_input?:any;
  map?:any;
  npc_messages?:any;
  level_file?:string;
  enemy_encounters?:any;
}

export default class JsonLevelState extends Phaser.State {
  protected __levelData:ILevelData = null;
  protected __groups:any = {};
  protected __prefabs:any = {};
  protected __userInput:any = {};

  get prefabs():any {
    return this.__prefabs;
  }

  get groups():any {
    return this.__groups;
  }

  init(levelData:ILevelData):void {
    this.__levelData = levelData;
  }

  create():void {
    this.__levelData.groups.forEach((group:string):void => {
      this.__groups[group] = this.game.add.group();
    });

    Object.keys(this.__levelData.prefabs || {}).forEach((key:string):void => {
      const data = this.__levelData.prefabs[key];
      new prefabClasses[data.type](
        this,
        data.name,
        data.position,
        data.properties
      );
    });

    this.__userInput = this.game.plugins.add(UserInput, this);
    this.__userInput.setInput(this.game.cache.getJSON('user_input'));
  }
}
