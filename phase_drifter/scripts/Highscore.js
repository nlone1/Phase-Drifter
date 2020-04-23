function setCookies(newName, hScore, redirect){
		var d = new Date();
		d.setTime(d.getTime() + (1*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = 'newName=' + newName + ";" + expires + ";path=./htmldocs";
		document.cookie = 'newScore=' + hScore + ";" + expires + ";path=./htmldocs";
		document.cookie = 'showScore=' + redirect + ";" + expires + ";path=./htmldocs";
	}

class Highscore extends Phaser.Scene {
    constructor() {
        super("Highscore");
        this.playerText;
    }
	
	test = highscore;
	
    preload () {
        this.load.image('block', '../assets/highscore/block.png');
        this.load.image('rub', '../assets/highscore/rub.png');
        this.load.image('end', '../assets/highscore/end.png');
        this.load.image('menu', '../assets/menu.png');
        this.load.image('menu2', '../assets/menu2.png');
        this.load.image('retry2', '../assets/retry2.png');
        this.load.image('score1', '../assets/score1.png');
        this.load.image('gameOver', '../assets/gameover.png');
        this.load.image('winner', '../assets/winner.png');
        this.load.image('pointer', '../assets/pointer.png');
        this.load.image('gameover', '../assets/gameover.png');
        this.load.bitmapFont('arcade', '../assets/highscore/arcade.png', '../assets/highscore/arcade.xml');
    }

    create() {

        this.cameras.main.fadeIn(1000);
        if (winGame == true) {
            winGame = this.add.image(400, 80, 'winner');
        } else {
            this.add.image(400, 80, 'gameover');
        }

        //menu = this.add.image(400, 100, 'menu');
        //menu.setInteractive();
        this.add.bitmapText(330, 360, 'arcade', 'NAME').setTint(0xff00ff);

        this.playerText = this.add.bitmapText(345, 395, 'arcade', '').setTint(0xff0000);

        //  Do this, otherwise this Scene will steal all keyboard input
        this.input.keyboard.enabled = false;

        this.scene.launch('InputPanel');

        let panel = this.scene.get('InputPanel');

        //  Listen to events from the Input Panel scene
        panel.events.on('updateName', this.updateName, this);
        panel.events.on('submitName', this.submitName, this);   
    }

    submitName(name) {
        this.scene.stop('InputPanel');
        console.log(name);

        menu = this.add.image(200, 440, 'menu2');
        score = this.add.image(600, 440, 'score1');
        pointer = this.add.image(100, 100, 'pointer');
        pointer.setVisible(false);

        menu.setInteractive();
        score.setInteractive();

        // menu button activity
        menu.on("pointerover", ()=>{
            pointer.setVisible(true);
            pointer.x=110;
            pointer.y=440;
        })

        menu.on("pointerout", ()=>{
            pointer.setVisible(false);
        })

        // Enter PHP here
        menu.on("pointerup", ()=>{
            console.log("play clicked");
            gameOver = false;
            this.scene.stop('InputPanel');
            this.scene.stop('Highscore');
			setCookies(name, highscore, "no");
			window.location.replace("update.php");
        })

        // retry button activity
        score.on("pointerover", ()=>{
            pointer.setVisible(true);
            pointer.x=500;
            pointer.y=440;
        })

        score.on("pointerout", ()=>{
            pointer.setVisible(false);
        })

        // Enter PHP here
        score.on("pointerup", ()=>{
            console.log("score clicked");
            this.scene.stop('InputPanel');
            this.scene.stop('Highscore');
            setCookies(name, highscore, "yes");
			window.location.replace("update.php");
        })
    }

    updateName (name) {
        this.playerText.setText(name);
    }
}