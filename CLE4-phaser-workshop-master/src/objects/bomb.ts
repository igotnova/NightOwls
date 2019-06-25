export class Bomb extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "civ")

        this.scene.physics.add.existing(this)
        this.setScale(2.5)
        this.setBounce(5)
        this.setCollideWorldBounds(false)

        this.setVelocity(0, Phaser.Math.Between(80, 120));
        //this.setAngularVelocity(30);


      
    }
    public resetPosition() {
        this.y = Phaser.Math.Between(0, 0)
        this.x = Phaser.Math.Between(0, 800)
        this.setVelocity(0, Phaser.Math.Between(80, 120));
    }

    public update() : void {
        if (this.x < -300 || this.x > innerWidth || this.y < -300 || this.y > 600){
            this.resetPosition()
        }
    }

}
