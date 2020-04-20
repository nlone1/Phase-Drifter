// This scene is for the game over screen
class gameOver_scene extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    preload() {
        this.load.image('sky', '../assets/title_background.png');
        this.load.image('gameover', '../assets/gameover.png');
        this.load.image('retry', '../assets/retry.png');
        this.load.image('pointer', '../assets/pointer.png');
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 150, 'gameover');
        retry = this.add.image(400, 400, 'retry');
        pointer = this.add.image(100, 100, 'pointer');
        pointer.setVisible(false);

        retry.setInteractive();

        // Highscore button activity
        retry.on("pointerover", ()=>{
            pointer.setVisible(true);
            pointer.x=250;
            pointer.y=400;
        })

        retry.on("pointerout", ()=>{
            pointer.setVisible(false);
        })

        retry.on("pointerup", ()=>{
            this.scene.start('playGame');
        })
    }

    update() {

    }
}
