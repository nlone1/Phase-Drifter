class menu_scene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload ()
    {
        this.load.image('sky', '../assets/title_background.png');
        this.load.image('play', '../assets/start.png');
        this.load.image('logo', '../assets/final_logo.jpg');
        this.load.image('score', '../assets/highscore.png');
        this.load.image('about', '../assets/about.png');
        this.load.image('pointer', '../assets/pointer.png');
    }

    create ()
    {
        
        this.cameras.main.fadeIn(1000);
        
        this.add.image(400, 300, 'sky');
        this.add.image(400, 100, 'logo');
        play = this.add.image(400, 300, 'play');
        score = this.add.image(400, 400, 'score');
        about = this.add.image(400, 500, 'about');
        pointer = this.add.image(100, 100, 'pointer');
        pointer.setVisible(false);

        // set images as interactive
        play.setInteractive();
        score.setInteractive();
        about.setInteractive();

        // Start button activity
        play.on("pointerover", ()=>{
            pointer.setVisible(true);
            pointer.x=290;
            pointer.y=300;
        })

        play.on("pointerout", ()=>{
            pointer.setVisible(false);
        })

        play.on("pointerup", ()=>{
            console.log("play clicked");
            gameOver = false;
            this.scene.stop();
            this.scene.start("level6");
        })

        // Highscore button activity
        score.on("pointerover", ()=>{
            pointer.setVisible(true);
            pointer.x=250;
            pointer.y=400;
        })

        score.on("pointerout", ()=>{
            pointer.setVisible(false);
        })

        score.on("pointerup", ()=>{
            console.log("score clicked");
            this.scene.stop();
            this.scene.start('Highscore');
        })

        // About button activity
        about.on("pointerover", ()=>{
            pointer.setVisible(true);
            pointer.x=290;
            pointer.y=500;
        })

        about.on("pointerout", ()=>{
            pointer.setVisible(false);
            pointer.x=290;
            pointer.y=500;
        })

        about.on("pointerup", ()=>{
            console.log("about clicked");
            window.location.replace("../htmldocs/about.php");
        })
    }

    update ()
    {
    }
}