import JsonLevelState from '../states/JsonLevelState';

interface IInput {
  callback:string;
  args?:string[];
}

export default class UserInput extends Phaser.Plugin {
  private __state:JsonLevelState;
  private __enabled:boolean;
  private __userInputs:any = {
    keydown: {},
    keyup: {}
  };

  init(state:JsonLevelState):void {
    this.__state = state;
    this.__enabled = false;
    this.game.input.keyboard.addCallbacks(this, this.__processInput, this.__processInput, null);
  }

  setInput(data:any):void {
    Object.keys(data).forEach((inputType:string):void => {
      Object.keys(data[inputType]).forEach((key:string):void => {
        const keyCode:number = Phaser.Keyboard[key];
        this.__userInputs[inputType][keyCode] = data[inputType][key];
      });
    });
    this.__enabled = true;
  }

  private __processInput(event:KeyboardEvent):void {
    if (this.__enabled) {
      const input:IInput = this.__userInputs[event.type][event.keyCode];
      if (input) {
        const callbackData = input.callback.split('.');
        const context:any = (callbackData[0] === 'game_state') ? this.__state : this.__state.prefabs[callbackData[0]];
        context[callbackData[1]].apply(context, input.args);
      }
    }
  }
}
