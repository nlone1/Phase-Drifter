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
var player;
var cursors;

function preload ()
{
}

function create ()
{
}

function update ()
{

}