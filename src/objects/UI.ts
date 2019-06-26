export class UI extends Phaser.GameObjects.Text{

    private graphics
    private score : number

    constructor() {
        super(Phaser.Scene,0,0,this.registry.score,Phaser.Types.GameObjects.Text.TextSyle)
    }

    create(){
        this.add.text(400, 350, "your score is " + this.registry.values.score, { fontFamily: 'Arial Black', fontSize: 10, color: '#2ac9be' })
        
    }

    update(){

    }
}