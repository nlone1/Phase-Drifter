//var enemyMaxX = 450;
//var enemyMinX = 367;
class level2_scene extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    preload() {
        this.load.image('background2', '../assets/level2/background2.png');
        this.load.image('plat1-2', '../assets/level2/tile1.png'); // center pixel = 62
        this.load.image('plat2-2', '../assets/level2/tile2.png'); // center pixel = 68
        this.load.image('plat3-2', '../assets/level2/tile3.png'); // center pixel = 62
        this.load.image('plat4-2', '../assets/level2/tile4.png'); // center pixel = 33
        this.load.image('plat5-2', '../assets/level2/tile5.png'); // center pixel = 22
        this.load.image('plat6-2', '../assets/level2/tile6.png'); // center pixel = 90
        this.load.image('plat7-2', '../assets/level2/tile7.png'); // center pixel = 7
        this.load.image('plat8-2', '../assets/level2/tile8.png'); // center pixel = 137.5
        this.load.image('plat9-2', '../assets/level2/tile9.png'); // center pixel = 7
        this.load.image('plat10-2', '../assets/level2/tile10.png'); // center pixel = 90
        this.load.image('plat11-2', '../assets/level2/tile11.png'); // center pixel = 108
        this.load.image('spikes-2', '../assets/level2/spikes2.png'); // center pixel = 107
        this.load.image('spikeball', '../assets/level2/spike_ball.png');
        this.load.image('bounds', '../assets/worldBound.png');
        this.load.image('doorTrigger', '../assets/doorTrigger.png');
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('door', '../assets/door.png'); // center pixel = 52
        this.load.spritesheet('monster1', '../assets/monster1.png', {
            frameWidth: 64,
            frameHeight: 24
        });
        this.load.spritesheet('dude', '../assets/dude.png', {
            frameWidth: 32,
            frameHeight: 36
        });
    }

    create() {

        this.cameras.main.fadeIn(1000);

        // Add background
        this.add.image(400, 300, 'background2');

        // create bottom world bound
        bounds = this.physics.add.staticGroup();
        bounds.create(400, 598, 'bounds');
        bounds.setVisible(false);

        // Create a static physics group and assign it to platforms
        platforms2 = this.physics.add.staticGroup();

        // Add platforms to level
        platforms2.create(737, 505, 'plat1-2');
        platforms2.create(513, 475, 'plat2-2');
        platforms2.create(288, 420, 'plat2-2');
        platforms2.create(62, 360, 'plat3-2');
        platforms2.create(32, 265, 'plat4-2');
        platforms2.create(22, 175, 'plat5-2');
        platforms2.create(255, 175, 'plat6-2');
        platforms2.create(337, 220, 'plat7-2');
        platforms2.create(482, 260, 'plat8-2');
        platforms2.create(627, 220, 'plat9-2');
        platforms2.create(710, 175, 'plat10-2');
        platforms2.create(488, 100, 'plat11-2');

        // Create player
        player = this.physics.add.sprite(745, 350, 'dude');
        player.setCollideWorldBounds(true);
        player.setSize(22,36);

        // create key
        key = this.physics.add.staticGroup();
        key.create(590, 215, 'key');

        // create spikes
        spikes = this.physics.add.staticGroup();
        spikes.create(488, 65, 'spikes-2');
        spikes.create(485 ,210, 'spikeball');

        // Create door and add to level
        door = this.physics.add.staticGroup();
        door.create(716, 100, 'door');
        doorTrigger = this.physics.add.staticGroup();
        doorTrigger.create(716, 145, 'doorTrigger');
        doorTrigger.setVisible(false);

        // Create Monster
        monster1 = this.physics.add.sprite(420, 220, 'monster1');
        monster1.setCollideWorldBounds(true);
        monster1.setSize(34, 24);
        enemyMaxX = 450;
        enemyMinX = 367;


        // Animations for dude spritesheet
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
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
            frames: [ { key: 'dude', frame: 11 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'jump_left',
            frames: [ { key: 'dude', frame: 9 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'jump',
            frames: [ { key: 'dude', frame: 10 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });

        // Monster Animations
        this.anims.create({
            key: 'monster_left',
            frames: this.anims.generateFrameNumbers('monster1', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'monster_right',
            frames: this.anims.generateFrameNumbers('monster1', { start: 3, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        // set hasKey to false at beginning of level and set the keyText
        hasKey = false;
        lifeText = this.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' });

        // create cursor which is Phaser's built in keyboard manager (suppliments event listeners)
        cursors = this.input.keyboard.createCursorKeys();

        // check for collision against key and player. If collision detected, call collectKey() from main_scene.js
        this.physics.add.overlap(player, key, collectKey, null, this);

        // Check for collision against platforms and player
        this.physics.add.collider(player, platforms2);

        // These two are set to iniate the monster at the start of the level to the -x direction with the monster_left animation playing. 
        monster1.setVelocityX(-120);
        monster1.anims.play('monster_left', true);

        // add collision for monster and platforms. Also add collision for monster and player
        this.physics.add.collider(monster1, platforms2);
        this.physics.add.collider(player, monster1, killMonster, null, this);

        // check for collision against player and spikes, if found call hitSpike() from main_scene
        this.physics.add.collider(player, spikes, hitSpike, null, this);

        // DoorTrigger collision which calls the nextLevel function
        this.physics.add.overlap(player, doorTrigger, goLevel3, null, this);

        // bounds collision which kills player if they go out of bounds
        this.physics.add.collider(player, bounds, hitSpike, null, this);


    }

    update() {

        // End game if gameOver == true. 
        if(gameOver) {
            lives = 3;
            this.scene.stop();
            this.scene.start('Highscore');
        }

        if (monster1.x >= enemyMaxX) {
            monster1.setVelocityX(-120);         
            monster1.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster1.x <= enemyMinX) {
            monster1.setVelocityX(120);
            monster1.anims.play('monster_right', true);
        }

        // Controller code for player. These conditionals are checking what key is pressed to execute which animation.
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
            if (!player.body.touching.down) {
                player.anims.play('jump');
            }
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-230);
        }
    }
}