import Prefab from '../Prefab';
import WorldState from '../../states/WorldState';

interface IMoving {
  left:boolean;
  right:boolean;
  up:boolean;
  down:boolean;
}

export default class Player extends Prefab {
  private __walkingSpeed:number;
  private __cursors:Phaser.CursorKeys;
  private __stoppedFrames:number[];
  private __moving:IMoving = {
    up: false,
    left: false,
    down: false,
    right: false,
  };

  constructor(state:WorldState, name:string, position:Phaser.Point, properties:any={}) {
    super(state, name, position, properties);

    this.anchor.setTo(0.5, 0.5);

    this.__walkingSpeed = properties.walking_speed;

    this.__state.game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;

    this.animations.add('walking_down', [0, 4, 8, 12], 6, true);
    this.animations.add('walking_up', [1, 5, 9, 13], 6, true);
    this.animations.add('walking_left', [2, 6, 10, 14], 6, true);
    this.animations.add('walking_right', [3, 7, 11, 15], 6, true);

    this.__stoppedFrames = [0, 2, 3, 1];


    // this.__cursors = this.__state.game.input.keyboard.createCursorKeys();
  }

  update():void {
    this.__state.game.physics.arcade.collide(this, (this.__state as WorldState).layers.buildings);

    if (this.__moving.left && this.body.velocity.x <= 0) {
      this.body.velocity.x = -this.__walkingSpeed;
      if (this.body.velocity.y === 0) {
        this.animations.play('walking_left');
      }
    } else if (this.__moving.right && this.body.velocity.x >= 0) {
      this.body.velocity.x = this.__walkingSpeed;
      if (this.body.velocity.y === 0) {
        this.animations.play('walking_right');
      }
    } else {
      this.body.velocity.x = 0;
    }

    if (this.__moving.up && this.body.velocity.y <= 0) {
      this.body.velocity.y = -this.__walkingSpeed;
      if (this.body.velocity.x === 0) {
        this.animations.play('walking_up');
      }
    } else if (this.__moving.down && this.body.velocity.y >= 0) {
      this.body.velocity.y = this.__walkingSpeed;
      if (this.body.velocity.x === 0) {
        this.animations.play('walking_down');
      }
    } else {
      this.body.velocity.y = 0;
    }

    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.animations.stop();
      this.frame = this.__stoppedFrames[this.body.facing];
    }
  }

  changeMovement(direction:string, move:boolean):void {
    this.__moving[direction] = move;
  }

  stop():void {
    this.__moving.down = false;
    this.__moving.up = false;
    this.__moving.left = false;
    this.__moving.right = false;
  }
}
