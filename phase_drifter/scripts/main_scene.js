var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    parent: "gameWindow",
    scene: [boot_scene, menu_scene, level1_scene, level2_scene]
};

var game = new Phaser.Game(config);
var platforms;
var spikes;
var player;
var cursors;
var key;
var door;
var hasKey;
var keyText;
var gameOver = false;
var lives = 3;

function preload ()
{
}

function create ()
{
}

function update ()
{
}


// Function used to disable key's physics body and make it invisible. 
function collectKey(player, key) {
    key.disableBody(true, true);

    hasKey = true;
    keyText.setText('Key: true');
}

// Function used to kill player on spike hit. Everytime this function is called, it will
// decrement lives (starting from 3). Once lives hits 0, set gameOver to true.
function hitSpike(player, spike) {
    lives--;
    player.anims.play('jump');
    this.scene.restart();
    console.log(lives);
    if (lives == 0) {
        gameOver = true;
        console.log('game over');
    }
}

function nextLevel(player, door) {
     if (hasKey == true) {
         console.log('pre-start')
         this.scene.start("level2");
         console.log('post-start');
         // start second level
     }
}