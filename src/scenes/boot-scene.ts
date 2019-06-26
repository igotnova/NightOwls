export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('sky', require('../assets/flag.png'))
        this.load.image('road', require('../assets/road.jpeg'))
        this.load.image('star', require('../assets/star.png'))
        this.load.image('bomb', require('../assets/civ1.png'))
        this.load.image('bmo', require('../assets/player.gif'))
        this.load.image('mafia', require('../assets/spritesmaffianobg.png'))
        this.load.image('civ', require('../assets/civi.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('ground', require('../assets/platform_ground.png'))

        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene
            this.scene.start("StartScene")
        })
    }
}