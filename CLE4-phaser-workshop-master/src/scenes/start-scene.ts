import { Arcade } from "../arcade/arcade";
import { Joystick } from "../arcade/input/joystick";

export class StartScene extends Phaser.Scene {
    //Nodig voor joystick 
    arcade: Arcade
    joystick: Joystick
    listener: EventListener
    private graphics
    

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
        console.log(this.joystick);
        
        document.addEventListener("joystickcreated", this.listener)
        //bij knop indrukken 0 tm 5
        document.addEventListener(this.joystick.ButtonEvents[5], () => this.playerOneFire())
    }

    private playerOneFire(){
        console.log('clicked');
        
        this.scene.start('GameScene')
        

        
    }    init(): void {        
    }
        preload(): void {
    }

    create(): void {
        this.graphics = this.add.graphics({ fillStyle: { color: 0x00AA00 } })  
        this.add.image(0, 0, 'road').setOrigin(0, 0)
        
        
                // add another image here
        
                // add text here
        
                this.add.text(400, 300, 'Run Lucha Libre', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
                // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.image(400,500, 'bmo').setScale(3)
        btn1.setInteractive()
        btn1.on("click", (e:Event) => this.scene.start('GameScene'))
        btn1.on('pointerdown', (pointer)=> {
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
