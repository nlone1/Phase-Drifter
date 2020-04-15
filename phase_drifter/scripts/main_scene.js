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
    scene: [boot_scene, menu_scene, level1_scene]
};

var game = new Phaser.Game(config);
var platforms;
var spikes;
var player;
var cursors;
var key;
var hasKey;
var keyText;
var gameOver = false;

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

function hitSpike(player, spike) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('jump');
    gameOver = true;
}