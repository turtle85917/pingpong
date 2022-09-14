import Phaser from "phaser";

import GameScene from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "container",
  backgroundColor: "#16a086",
  width: 800,
  height: 400,
  physics: {
    default: "arcade"
  },
  scene: [GameScene],
}

export default new Phaser.Game(config);