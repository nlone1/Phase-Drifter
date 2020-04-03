var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    parent: "gameWindow",
    scene: [boot_scene, menu_scene, level1_scene]
};

var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
}

function update ()
{

}