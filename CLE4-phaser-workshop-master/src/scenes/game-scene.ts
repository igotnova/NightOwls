import { Player } from "../objects/player"
import { Bomb } from "../objects/bomb"
import { Grunt } from "../objects/Grunt"
import { UI } from "../objects/UI"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { EndScene } from "./end-scene";


export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
   // private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private grunts: Phaser.GameObjects.Group
    private scoreField:number;
    private interface:Phaser.GameObjects.Text
    private graphics
    private score = 0
    public scoretext
    private civhitted : number


    
    constructor() {
        super({ key: "GameScene" })
        
        
    }

    init(): void {
        console.log("this is a game")
        this.civhitted = 1
        console.log(this.civhitted)
        this.physics.world.bounds.width = 800
        this.physics.world.bounds.height = 600
    }

    create(): void {
        
        this.score = 0;
        
        // this.registry.values.score = this.score
        //console.log(this.registry)
        this.add.image(0, 0, 'road').setOrigin(0, 0).setScale(16)
        this.graphics = this.add.graphics({ fillStyle: { color: 0x00AA00 } })  
        //this.add.text(400, 300,"score:" + this.registry.values.score , { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
        // // 11 STARS
        // this.stars = this.physics.add.group({
        //     key: 'star',
        //     repeat: 11,
        //     setXY: { x: 12, y: 30, stepX: 70 },
        // })
        let scoreText = 'Score: ' + this.registry.values.score
        this.bombs = this.add.group()
    
        
        for (let i = 0; i < 12; i++) {
            this.bombs.add(new Bomb(this,Phaser.Math.Between(0, 800),-20),true)
        }

        //enemies
        this.grunts = this.add.group()
    
        
        for (let i = 0; i < 5; i++) {
            this.grunts.add(new Grunt(this,Phaser.Math.Between(0, 800),-20),true)
        }
        


        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            //new Platform(this, 800, 574, "ground"),
            //new Platform(this, 600,250,"ice"),
            //new Platform(this, 300, 500, "platform"),
            //new MovingPlatform(this,600, 400, "platform")
        ], true)
        // define collisions for bouncing, and overlaps for pickups
        //this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.bombs, this.player, this.civhit)
        this.physics.add.collider(this.grunts, this.platforms)

      

        //this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.grunts, this.hitGrunt, null, this)

        this.cameras.main.setSize(800,600)
        //this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, 600, 600)
    }

    private hitGrunt(player : Player , grunt) : void {
        console.log(this.score)
        
        this.graphics.clear()
        this.graphics.fillRectShape(new Phaser.Geom.Rectangle(20, 20, this.score/10, 20))
        this.scene.start('EndScene')

     }
     
     private civhit(player : Player , bomb) : void {
        
        console.log("you hit a civillian ")
        


        if (this.civhitted==3) {
            this.civhitted = 0
            this.spawnmob()
        }

     }
     

     private spawnmob() {
        console.log("spawned grunt")
        this.grunts.add(new Grunt(this,Phaser.Math.Between(0, 800),-20),true)
        this.civhitted = 0
    }
    
     



    update(){
        this.player.update()
        
        for(let update of this.bombs.children.entries){
            update.update()
        }
        for(let update of this.grunts.children.entries){
            update.update()
        }
        // this.score++
        // this.registry.values.score = this.score
        // console.log(this.registry.values.score)
        this.score++
        this.graphics.clear()
        this.graphics.fillRectShape(new Phaser.Geom.Rectangle(20, 20, this.score/10, 20))
       
        this.registry.values.score = this.score
        
    }
    
}
