import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene2 extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private score = 0

    constructor() {
        super({ key: "GameScene2" })
        
    }

    init(): void {
        console.log("this is a game")

        this.physics.world.bounds.width = 1000
        this.physics.world.bounds.height = 600

    }

    create(): void {
        this.score = 0;
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 574, "ground"),
            new Platform(this, 600,250,"ice"),
            new MovingPlatform(this,600, 400, "platform"),
            new MovingPlatform(this,200, 300, "platform")
        ], true)
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
    
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
 

        this.cameras.main.setSize(800,600)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, 1000, 600)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        
        // TO DO check if we have all the stars, then go to the end scene

        this.score++

        console.log("you have",this.score,"stars")
        if (this.score == 12){
            console.log("you win")
            this.scene.start('EndScene')
        }

    }

    update(){
        this.player.update()
    }

}
