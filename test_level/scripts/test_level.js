var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var floor;
var floor2;
var floor3;
var outline;
var stairs;
var box1;
var box2;
var base;
var base2;

// Game object
var game = new Phaser.Game(config);

function preload()
{
    this.load.image('sky', './assets/background.png');
    this.load.image('base', '../assets/base.png');
    this.load.image('base2', '../assets/base2.png');
    this.load.image('box1', '../assets/box1.png');
    this.load.image('box2', '../assets/box2.png');
    this.load.image('floor', '../assets/floor.png');
    this.load.image('floor2', '../assets/floor2.png');
    this.load.image('floor3', '../assets/floor3.png');
    this.load.image('outline', '../assets/outline.png');
    this.load.image('outline2', '../assets/outline2.png');
    this.load.image('stairs', '../assets/stairs.png');
    this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 44, frameHeight: 40 });
    /* this.load.spritesheet('dude', 'assets/test_dude.png', {
        frameWidth: 40, frameHeight: 40 }); */
}

function create()
{
    // Add sky
    this.add.image(400, 300, 'sky');

    // Add platforms
    floor = this.physics.add.staticGroup();
    floor.create(400, 568, 'floor');

    // Add border
    outline1 = this.physics.add.staticGroup();
    outline2 = this.physics.add.staticGroup();
    outline2.create(2, 300, 'outline2');
    outline2.create(798, 300, 'outline2');
    outline1.create(400, 597, 'outline');
    outline1.create(400, 2, 'outline');


    // Character sprite creation
    player = this.physics.add.sprite(100, 450, 'dude');
    //player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravity(75);
    player.setSize(22, 34);
    player.setOffset(10, 7);

    // Add box1
    box1 = this.physics.add.staticGroup();
    box1.create(250, 538, 'box1');
    box1.create(760, 365, 'box1');

    // Add box2
    box2 = this.physics.add.staticGroup();
    box2.create(370, 490, 'box2');
    box2.create(470, 490, 'box2');

    // add floor2
    floor2 = this.physics.add.staticGroup();
    floor2.create(650, 400, 'floor2');

    // add floor3
    floor3 = this.physics.add.staticGroup();
    floor3.create(360, 290, 'floor3');

    // add stairs
    stairs = this.physics.add.staticGroup();
    stairs.create(360, 240, 'stairs');

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'jump_right',
        frames: [ { key: 'dude', frame: 7 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'jump_left',
        frames: [ { key: 'dude', frame: 3 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 7}),
        frameRate: 5,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, floor);
    this.physics.add.collider(player, box1);
    this.physics.add.collider(player, box2);
    this.physics.add.collider(player, floor2);
    this.physics.add.collider(player, floor3);
    this.physics.add.collider(player, stairs);


}

function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        if (!player.body.touching.down)
        {
            player.anims.play('jump_left');
        }
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
        if (!player.body.touching.down)
        {
            player.anims.play('jump_right');
        }
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-230);
        player.anims.play('jump', true);
    }
}
