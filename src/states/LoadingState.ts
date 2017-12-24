import * as assetTypes from '../constants/assetTypes';

export default class LoadingState extends Phaser.State {
  private __levelData:any = null;
  private __nextState:string = null;

  init(levelData:any, nextState:string):void {
    this.__levelData = levelData;
    this.__nextState = nextState;

    const message = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Loading',
      {
        font: '48px Kells',
        fill: '#ffffff'
      }
    );
    message.anchor.setTo(.5, .5);
  }
  preload():void {
    const {assets} = this.__levelData;
    Object.keys(assets).forEach((key:string):void => {
      const asset:any = assets[key];
      switch (asset.type) {
        case assetTypes.IMAGE:
          this.load.image(key, asset.source);
          break;
        case assetTypes.SPRITESHEET:
          this.load.spritesheet(key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
          break;
        case assetTypes.TILEMAP:
          this.load.tilemap(key, asset.source, null, Phaser.Tilemap.TILED_JSON);
          break;
      }
    });
    const initialUserInputName:string = this.__levelData.initial_user_input;
    const inputJson:any = this.__levelData.user_input[initialUserInputName];
    this.load.json('user_input', inputJson);
  }
  create():void {
    this.game.state.start(this.__nextState, true, false, this.__levelData);
  }
}
