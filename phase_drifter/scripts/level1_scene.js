// These two variables represent the monster's boundaries which are the start and end of the platform
//var enemyMaxX = 720;
//var enemyMinX = 380;
class level1_scene extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('end_screen', '../assets/restart_menu.png');
        this.load.image('restart', '../assets/restart.png');
        this.load.image('menu1', '../assets/menu.png');
        this.load.image('background', '../assets/level_1/background.png');
        this.load.image('plat1', '../assets/level_1/tile1.png'); // center pixel = 155
        this.load.image('plat2', '../assets/level_1/tile2.png'); // center pixel = 52
        this.load.image('plat3', '../assets/level_1/tile3.png'); // center pixel = 235
        this.load.image('plat4', '../assets/level_1/tile4.png'); // center pixel = 12
        this.load.image('plat5', '../assets/level_1/tile5.png'); // center pixel = 80
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('spikes', '../assets/level_1/spikes.png'); // center pixel; = 47
        this.load.image('door', '../assets/door.png'); // center pixel = 52
        this.load.image('bounds', '../assets/worldBound.png');
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
        this.add.image(400, 300, 'background');

        // create bottom world bound
        bounds = this.physics.add.staticGroup();
        bounds.create(400, 598, 'bounds');
        bounds.setVisible(false);

        // Create a static physics group and assign it to platforms
        platforms = this.physics.add.staticGroup();

        // Add platforms to level
        platforms.create(155, 150, 'plat1');
        platforms.create(367,220, 'plat2');
        platforms.create(477,150, 'plat2');
        platforms.create(587,220, 'plat2');
        platforms.create(698,150, 'plat2');
        platforms.create(748,325, 'plat2');
        platforms.create(565,410, 'plat3');
        platforms.create(477,325, 'plat2');
        platforms.create(307,440, 'plat4');
        platforms.create(272,470, 'plat4');
        platforms.create(237,505, 'plat4');
        platforms.create(202,540, 'plat4');
        platforms.create(80,540, 'plat5');

        // Create spikes as static group and add them to level
        spikes = this.physics.add.staticGroup();
        spikes.create(367, 183, 'spikes');
        spikes.create(587, 183, 'spikes');

        // Create key and add to level
        key = this.physics.add.staticGroup();
        key.create(475, 275, 'key');

        // Create door and add to level
        door = this.physics.add.staticGroup();
        door.create(82, 460, 'door');

        // Create Monster
        monster1 = this.physics.add.sprite(625, 370, 'monster1');
        monster1.setCollideWorldBounds(true);
        monster1.setSize(34, 24);
        enemyMaxX = 720;
        enemyMinX = 380;

        // Create player
        player = this.physics.add.sprite(176, 80, 'dude');
        player.setCollideWorldBounds(true);
        player.setSize(22,36);


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
        this.physics.add.collider(player, platforms);

        // These two are set to iniate the monster at the start of the level to the -x direction with the monster_left animation playing. 
        monster1.setVelocityX(-120);
        monster1.anims.play('monster_left', true);

        // add collision for monster and platforms. Also add collision for monster and player
        this.physics.add.collider(monster1, platforms);
        this.physics.add.collider(player, monster1, killMonster, null, this);

        // check for collision against player and spikes, if found call hitSpike() from main_scene
        this.physics.add.collider(player, spikes, hitSpike, null, this);

        // Door collision which triggers nextLevel() function
        this.physics.add.overlap(player, door, nextLevel, null, this);

        // bounds collision which kills player if they go out of bounds
        this.physics.add.collider(player, bounds, hitSpike, null, this);
    }

    update() {

        // End game if gameOver == true. 
        if(gameOver) {
            this.scene.restart();
            lives = 3;
            this.scene.switch('gameOver');
        }

        // These two conditions are for moving the monster left to right once it hits the platforms left and right
        // bounds which are stored in the enemyMaxX and enemyMaxY variables. 
        // enemyMaxX = 720 which is the right end of the platform 
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
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
            if (!player.body.touching.down)
            {
                player.anims.play('jump_right');
            }
        } else {
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