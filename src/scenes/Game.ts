import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  velocityX: number;
  velocityY: number;
  position: { ball: number[]; player: number[]; computer: number[] };

  keyW: Phaser.Input.Keyboard.Key | undefined;
  keyS: Phaser.Input.Keyboard.Key | undefined;

  cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  computer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

  scoreComputer: number;
  scorePlayer: number;

  scoreTextComputer: Phaser.GameObjects.Text | undefined;
  scoreTextPlayer: Phaser.GameObjects.Text | undefined;

  constructor() {
    super("Game");

    this.velocityX = Phaser.Math.Between(-100, 100);
    this.velocityY = 100;
    this.position = {
      ball: [400, 200],
      player: [780, 200],
      computer: [20, 200]
    };

    this.scoreComputer = 0;
    this.scorePlayer = 0;
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("computer", "assets/pc.png");
    this.load.image("ball", "assets/ball.png");
  }

  create() {
    this.createEmitter();

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  update() {
    if (this.player && this.cursor) {
      if (this.cursor.up.isDown) {
        this.player.setVelocityY(-150);
      } else if (this.cursor.down.isDown) {
        this.player.setVelocityY(150);
      } else {
        this.player.setVelocityY(0);
      }
    }

    if (this.computer && this.keyW && this.keyS) {
      if (this.keyW.isDown) {
        this.computer.setVelocityY(-150);
      } else if (this.keyS.isDown) {
        this.computer.setVelocityY(150);
      } else {
        this.computer.setVelocityY(0);
      }
    }
  }

  reset() {
    this.velocityX = Phaser.Math.Between(-100, 100);
    this.velocityY = 100;
    this.position = {
      ball: [400, 200],
      player: [780, 200],
      computer: [20, 200]
    };

    this.ball?.setVelocityX(this.velocityX);
    this.ball?.setVelocityY(this.velocityY);
  }

  createEmitter() {
    this.cursor = this.input.keyboard.createCursorKeys();

    this.ball = this.physics.add.sprite(this.position.ball[0], this.position.ball[1], "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    this.player = this.physics.add.sprite(this.position.player[0], this.position.player[1], "player");
    this.player.setCollideWorldBounds(true);

    this.computer = this.physics.add.sprite(this.position.computer[0], this.position.computer[1], "computer");
    this.computer.setCollideWorldBounds(true);

    this.scoreTextComputer = this.add.text(16, 16, "score: 0", { fontSize: "16px" });
    this.scoreTextPlayer = this.add.text(700, 16, "score: 0", { fontSize: "16px" });

    this.reset();

    const hitBall = (computer: boolean) => {
      if (computer) this.velocityX -= 50;
      else this.velocityX += 50;

      this.velocityX *= -1;

      this.ball?.setVelocityX(this.velocityX);

      if (this.velocityY < 0) {
        this.velocityY *= -1;
        this.ball?.setVelocityY(this.velocityY);
      }
    }

    this.physics.add.collider(this.ball, this.player, () => {
      hitBall(false);
      this.player?.setVelocityX(-1);

      this.scorePlayer += 1;
      this.scoreTextPlayer?.setText(`score: ${this.scorePlayer}`);
    }, undefined, this);

    this.physics.add.collider(this.ball, this.computer, () => {
      hitBall(true);
      this.computer?.setVelocityX(1);

      this.scoreComputer += 1;
      this.scoreTextComputer?.setText(`score: ${this.scoreComputer}`);
    }, undefined, this);
  }
}