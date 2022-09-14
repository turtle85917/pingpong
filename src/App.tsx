import phaserGame from "./PhaserGame";
import GameScene from "./scenes/Game";

function App() {
  const Game = phaserGame.scene.keys.game as GameScene;
  if (Game) {
    Game.createEmitter();
  }

  return (
    <>
      <div className="container" />
    </>
  )
}

export default App; 