export class EndScene extends Phaser.Scene {
    private score : number

    constructor() {
        super({key: "EndScene"})
        this.score = 0
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image

        this.add.image(0, 0, 'sky').setOrigin(0, 0)
        console.log("you lost " + this.registry.values.score)

        // add text here

        this.add.text(400, 300, 'You lose', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.image(100,500, 'mybutton')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
        this.scene.start('GameScene')
        
      }
    }
}
