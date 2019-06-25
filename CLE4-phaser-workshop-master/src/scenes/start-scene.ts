import { Arcade } from "../arcade/arcade";
import { Joystick } from "../arcade/input/joystick";

export class StartScene extends Phaser.Scene {
    //Nodig voor joystick 
    arcade: Arcade
    joystick: Joystick
    listener: EventListener

    constructor() {
        super({key: "StartScene"})
        //nodig voor joystick
        this.arcade = new Arcade(this)
        this.listener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated", this.listener)
    }
    //nodig voor joystick
    initJoystick(e:CustomEvent){
        this.joystick = this.arcade.Joysticks[e.detail]
        document.addEventListener("joystickcreated", this.listener)
        //bij knop indrukken 0 tm 5
        document.addEventListener(this.joystick.ButtonEvents[0], this.playerOneFire)
    }

    private playerOneFire(){
        console.log("player one fired!")
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // add another image here

        // add text here

        this.add.text(400, 300, 'Run Lucha Libre', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.image(100,500, 'mybutton')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
        this.scene.start('GameScene')
   
   
    })
    }
    update(){
        if(this.joystick) this.joystick.update()
        //Controleer of joystick bestaat met if(this.joystick)
        //controleer beweging met this.joystick.Left (Right Up Down)
        if(this.joystick && this.joystick.Left) console.log('left')
        
    }
}
