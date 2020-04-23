class level6_scene extends Phaser.Scene {
    constructor() {
        super("level6");
    }

    preload() {
        this.load.image('background6', '../assets/level6/background6.png');
        this.load.image('plat1-6', '../assets/level6/tile1.png');
        this.load.image('plat2-6', '../assets/level6/tile2.png');
        this.load.image('plat3-6', '../assets/level6/tile3.png');
        this.load.image('plat4-6', '../assets/level6/tile4.png');
        this.load.image('plat5-6', '../assets/level6/tile5.png');
        this.load.image('plat6-6', '../assets/level6/tile6.png');
        this.load.image('plat7-6', '../assets/level6/tile7.png');
        this.load.image('door2', '../assets/level4/door2.png');
        this.load.image('bounds', '../assets/worldBound.png');
        this.load.image('spikeball', '../assets/level2/spike_ball.png');
        this.load.image('doorTrigger', '../assets/doorTrigger.png');
        this.load.image('key', '../assets/level_1/key.png');
        this.load.spritesheet('monster1', '../assets/monster1.png', {
            frameWidth: 64,
            frameHeight: 24
        });
        this.load.spritesheet('dude', '../assets/dude.png', {
            frameWidth: 32,
            frameHeight: 36
        });
        this.load.spritesheet('monster1', '../assets/monster1.png', {
            frameWidth: 64,
            frameHeight: 24
        });
        this.load.spritesheet('cheer', '../assets/level6/cheer2.png', {
            frameWidth: 192,
            frameHeight: 36
        });
    }

    create() {
        this.cameras.main.fadeIn(1000);

        // add background
        this.add.image(400, 300, 'background6');

        // create bottom world bound
        bounds = this.physics.add.staticGroup();
        bounds.create(400, 598, 'bounds');
        bounds.setVisible(false);

        // add platforms
        platforms = this.physics.add.staticGroup();

        platforms.create(134, 530, 'plat1-6');
        platforms.create(62, 385, 'plat2-6');
        platforms.create(170, 300, 'plat3-6');
        platforms.create(36, 218, 'plat4-6');
        platforms.create(169, 147, 'plat5-6');
        platforms.create(412, 147, 'plat6-6');
        platforms.create(682, 530, 'plat7-6');

        // create door
        door = this.physics.add.staticGroup();
        door.create(744, 403, 'door2');
        doorTrigger = this.physics.add.staticGroup();
        doorTrigger.create(757, 441, 'doorTrigger');
        doorTrigger.setVisible(false);

        // add family
        family = this.physics.add.sprite(690, 442, 'cheer');
        family.body.setAllowGravity(false);
        family.body.immovable = true;

        // create key
        key = this.physics.add.staticGroup();
        key.create(169, 70, 'key');

        // create spikeball 1
        spikeball1 = this.physics.add.sprite(122, 340, 'spikeball');
        spikeball1.setCollideWorldBounds(true);
        spikeball1.body.setAllowGravity(false);

        // create spikeball 2
        spikeball2 = this.physics.add.sprite(122, 255, 'spikeball');
        spikeball2.setCollideWorldBounds(true);
        spikeball2.body.setAllowGravity(false);

        // create spikeball 3
        spikeball3 = this.physics.add.sprite(36, 102, 'spikeball');
        spikeball3.setCollideWorldBounds(true);
        spikeball3.body.setAllowGravity(false);

        // create player
        player = this.physics.add.sprite(160, 393, 'dude'); // use this line for testing
        //player = this.physics.add.sprite(30, 416, 'dude');
        player.setCollideWorldBounds(true);
        player.setSize(22,36);

        // Create Monster
        monster1 = this.physics.add.sprite(170, 97, 'monster1');
        monster1.setCollideWorldBounds(true);
        monster1.setSize(34, 24);

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

        // cheering animation
        this.anims.create({
            key: 'cheering',
            frames: this.anims.generateFrameNumbers('cheer', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        family.anims.play('cheering', true);

        // inital spikeball movement
        spikeball3.setVelocityY(150);
        this.physics.add.collider(player, spikeball3, hitSpike, null, this);

        spikeball1.setVelocityX(120);
        this.physics.add.collider(player, spikeball1, hitSpike, null, this);

        spikeball2.setVelocityX(-120);
        this.physics.add.collider(player, spikeball2, hitSpike, null, this);

        // monster collision
        this.physics.add.collider(monster1, platforms);
        this.physics.add.collider(player, monster1, killMonster, null, this);
        monster1.setVelocityX(-80);
        monster1.anims.play('monster_left', true);

        // set hasKey to false at beginning of level and set the keyText
        hasKey = false;
        //hasKey = true; // use this for testing
        lifeText = this.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' });
        highscoreText = this.add.text(604, 16, 'Score: ' + highscore, { fontSize: '32px', fill: '#000' });

        // create cursor which is Phaser's built in keyboard manager (suppliments event listeners)
        cursors = this.input.keyboard.createCursorKeys();

        // check for collision against key and player. If collision detecplatforms3ted, call collectKey() from main_scene.js
        this.physics.add.overlap(player, key, collectKey, null, this);

        // Check for collision against platforms and player
        this.physics.add.collider(player, platforms);

        // bounds collision which kills player if they go out of bounds
        this.physics.add.collider(player, bounds, hitSpike, null, this);

        this.physics.add.overlap(player, doorTrigger, goHighscore, null, this);

    }

    update() {

        // End game if gameOver == true.
        if(gameOver) {
            lives = 3;
            this.scene.stop();
            this.scene.start('Highscore');
        }

        // spikeball 3 bounds
        if( spikeball3.y >= 188) {
            spikeball3.setVelocityY(-100);
        } else if (spikeball3.y <= 25) {
            spikeball3.setVelocityY(300);
        }

        // spikeball 2 bounds
        if( spikeball2.x >= 250) {
            spikeball2.setVelocityX(-120);
        } else if (spikeball2.x <= 25) {
            spikeball2.setVelocityX(120);
        }

        // spikeball 1 bounds
        if( spikeball1.x >= 250) {
            spikeball1.setVelocityX(-100);
        } else if (spikeball1.x <= 25) {
            spikeball1.setVelocityX(100);
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

        // Monster controlling
        if (monster1.x >= 222) {
            monster1.setVelocityX(-90);
            monster1.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster1.x <= 113) {
            monster1.setVelocityX(90);
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
