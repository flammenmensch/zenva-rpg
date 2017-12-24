import 'pixi';
import 'p2';
import 'phaser';

import TitleState from './states/TitleState';
import BootState from './states/BootState';
import LoadingState from './states/LoadingState';
import WorldState from './states/WorldState';

class RPG extends Phaser.Game {
  constructor(config:Phaser.IGameConfig) {
    super(config);

    this.state.add('Boot', BootState);
    this.state.add('World', WorldState);
    this.state.add('Title', TitleState);
    this.state.add('Loading', LoadingState);
    this.state.start('Boot', true, false, 'assets/levels/title_screen.json', 'Title');
  }
}

const config:Phaser.IGameConfig = {
  width: 640,
  height: 480,
  renderer: Phaser.AUTO,
  parent: 'game',
  resolution: 1
};

new RPG(config);
