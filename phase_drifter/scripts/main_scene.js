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
    scene: [boot_scene, menu_scene, level1_scene, level2_scene, level3_scene, level4_scene, gameOver_scene]
};

var game = new Phaser.Game(config);
var platforms;
var platforms2;
var platforms3;
var fPlatform; // moving/floating platforms
var fPlatform2;
var spikes;
var player;
var cursors;
var monster1;
var monster2;
var key;
var door;
var hasKey;
var lifeText;
var gameOver = false;
var lives = 3;
var enemyMaxX;
var enemyMinX;
var bounds;
var restart;
var menu;
var play;
var score;
var about;
var pointer;
var retry;
var spikeball1;
var spikeball2;
var switch1;
var switchDown; // check if switch is down as boolean
var arrow;
var arrowTouch;
var doorTrigger; // invisible object that will trigger nextLevel() functions on player overlap

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
    //keyText.setText('Key: true');
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

function killMonster(player, monster) {
    if (player.body.velocity.y > 0 || monster.body.blocked.up) {
        const bounce_speed = 100;
        player.body.velocity.y = -bounce_speed;
        monster.destroy();
    } else {
        lives--;
        player.anims.play('jump');
        this.scene.restart();
        console.log(lives);
        if (lives == 0) {
            gameOver = true;
            console.log('game over');
        }
    }
}

// Function to activate switch and play the arrow animation
function activateSwitch(player, switch1) {
    switchDown = false;
    arrow.setVisible(true);
    arrow.anims.play('arrowUp', true);
}

function arrowTrigger(player, arrow) {
    if (switchDown == false) {
        arrowTouch = true;
        arrow.setVisible(false);
    }
}

// Function that takes you to next level
function goLevel2(player, doorTrigger) {
    if (hasKey == true) {
        console.log('pre-start')
        this.scene.switch("level2");
        console.log('post-start');
        // start second level
    }
}

function goLevel3(player, doorTrigger) {
    if (hasKey == true) {
        console.log('pre-start')
        this.scene.switch("level3");
        console.log('post-start');
        // start second level
    }
}

function goLevel4(player, doorTrigger) {
    if(hasKey == true) {
        console.log('pre-start')
        this.scene.switch("level4");
        console.log('post-start');
        // start second level
    }
}