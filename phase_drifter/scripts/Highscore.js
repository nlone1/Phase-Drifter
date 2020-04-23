class Highscore extends Phaser.Scene {
    constructor() {
        super("Highscore");
        this.playerText;
    }

    preload () {
        this.load.image('block', '../assets/highscore/block.png');
        this.load.image('rub', '../assets/highscore/rub.png');
        this.load.image('end', '../assets/highscore/end.png');
        this.load.image('menu', '../assets/menu.png');

        this.load.bitmapFont('arcade', '../assets/highscore/arcade.png', '../assets/highscore/arcade.xml');
    }

    create() {
        
        this.cameras.main.fadeIn(1000);
        menu = this.add.image(400, 100, 'menu');
        menu.setInteractive();
        this.add.bitmapText(100, 460, 'arcade', 'NAME').setTint(0xff00ff);

        this.playerText = this.add.bitmapText(100, 510, 'arcade', '').setTint(0xff0000);

        //  Do this, otherwise this Scene will steal all keyboard input
        this.input.keyboard.enabled = false;

        this.scene.launch('InputPanel');
        

        let panel = this.scene.get('InputPanel');

        //  Listen to events from the Input Panel scene
        panel.events.on('updateName', this.updateName, this);
        panel.events.on('submitName', this.submitName, this);   
        
        menu.on("pointerup", ()=>{
            this.scene.stop('InputPanel');
            this.scene.stop('Highscore');
            this.scene.start('playGame');
        })
    }

    submitName() {
        this.scene.stop('InputPanel');

    }

    updateName (name) {
        this.playerText.setText(name);
    }
}