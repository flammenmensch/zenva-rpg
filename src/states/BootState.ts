export default class BootState extends Phaser.State {
  private __levelFile:string = null;
  private __nextState:string = null;

  init(levelFile:string, nextState:string):void {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.__levelFile = levelFile;
    this.__nextState = nextState;
  }
  preload():void {
    this.load.json('level_file', this.__levelFile);
  }
  create():void {
    const levelData = this.game.cache.getJSON('level_file');
    this.game.state.start('Loading', true, false, levelData, this.__nextState);
  }
}
