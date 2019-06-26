import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { GameScene2 } from "./scenes/game-scene-2"
import { EndScene } from "./scenes/end-scene"



const config: GameConfig = {
    width: 1000,
    height: 600,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, GameScene,GameScene2, EndScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 0 }
        }
    },
    render: { pixelArt: true }
};
export class Game extends Phaser.Game {
    public arcade:Arcade
    constructor(config: GameConfig) {
        super(config)
        this.arcade = new Arcade(this)
    }
}
    

window.addEventListener("load", () => new Phaser.Game(config))

