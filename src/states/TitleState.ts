import JsonLevelState from './JsonLevelState';

export default class TitleState extends JsonLevelState {
  startGame() {
    this.game.state.start('Boot', true, false, 'assets/levels/town.json', 'World');
  }
}
