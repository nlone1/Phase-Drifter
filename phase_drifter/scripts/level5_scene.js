class level5_scene extends Phaser.Scene {
    constructor() {
        super("level5");
    }

    preload() {
        this.load.image('background5', '../assets/level5/background5.png');
        this.load.image('plat1-5', '../assets/level5/tile1.png');
        this.load.image('plat2-5', '../assets/level5/tile2.png');
        this.load.image('plat3-5', '../assets/level5/tile3.png');
        this.load.image('plat4-5', '../assets/level5/tile4.png');
        this.load.image('plat5-5', '../assets/level5/tile5.png');
        this.load.image('plat6-5', '../assets/level5/tile6.png');
        this.load.image('plat7-5', '../assets/level5/tile7.png');
        this.load.image('plat8-5', '../assets/level5/tile8.png');
        this.load.image('plat9-5', '../assets/level5/tile9.png');
        this.load.image('plat10-5', '../assets/level5/tile10.png');
        this.load.image('door2', '../assets/level4/door2.png');
        this.load.image('doorTrigger', '../assets/doorTrigger.png');
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('bounds', '../assets/worldBound.png');
        this.load.image('spikes1-5', '../assets/level5/spikes1.png');
        this.load.image('spikes2-5', '../assets/level5/spikes2.png');
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

        // add background
        this.add.image(400, 300, 'background5');

        // create bottom world bound
        bounds = this.physics.add.staticGroup();
        bounds.create(400, 598, 'bounds');
        bounds.setVisible(false);

        // add platforms
        platforms = this.physics.add.staticGroup();

        platforms.create(685, 126, 'plat1-5');
        platforms.create(417, 185, 'plat2-5');
        platforms.create(540, 362, 'plat3-5');
        platforms.create(673, 537, 'plat4-5');
        platforms.create(60, 457, 'plat7-5');
        platforms.create(230, 392, 'plat9-5');
        platforms.create(355, 312, 'plat8-5');
        platforms.create(202, 247, 'plat9-5');
        platforms.create(65, 178, 'plat10-5');

        // create door
        door = this.physics.add.staticGroup();
        door.create(56, 108, 'door2');
        doorTrigger = this.physics.add.staticGroup();
        doorTrigger.create(56, 160, 'doorTrigger');
        doorTrigger.setVisible(false);

        // create floating platforms
        fPlatform = this.physics.add.sprite(385, 537, 'plat5-5');
        fPlatform.body.setAllowGravity(false);
        fPlatform.body.immovable = true;
        fPlatform2 = this.physics.add.sprite(200, 537, 'plat6-5');
        fPlatform2.body.setAllowGravity(false);
        fPlatform2.body.immovable = true;

        // create key
        key = this.physics.add.staticGroup();
        key.create(280, 455, 'key');

        // add spikes
        spikes = this.physics.add.staticGroup();
        spikes.create(452, 153, 'spikes2-5');
        spikes.create(467, 329, 'spikes1-5');

        // create player
        player = this.physics.add.sprite(758, 64, 'dude');
        player.setCollideWorldBounds(true);
        player.setSize(22,36);

        // add monsters
        monster1 = this.physics.add.sprite(614, 335, 'monster1');
        monster1.setCollideWorldBounds(true);
        monster1.setSize(34, 24);

        monster2 = this.physics.add.sprite(700, 508, 'monster1');
        monster2.setCollideWorldBounds(true);
        monster2.setSize(34, 24);

        monster3 = this.physics.add.sprite(232, 364, 'monster1');
        monster3.setCollideWorldBounds(true);
        monster3.setSize(34, 24);

        monster4 = this.physics.add.sprite(210, 218, 'monster1');
        monster4.setCollideWorldBounds(true);
        monster4.setSize(34, 24);

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
        highscoreText = this.add.text(604, 16, 'Score: ' + highscore, { fontSize: '32px', fill: '#000' });

        // create cursor which is Phaser's built in keyboard manager (suppliments event listeners)
        cursors = this.input.keyboard.createCursorKeys();

        // check for collision against key and player. If collision detecplatforms3ted, call collectKey() from main_scene.js
        this.physics.add.overlap(player, key, collectKey, null, this);

        // Check for collision against platforms and player
        this.physics.add.collider(player, platforms);

        // initial velocity for monsters
        monster1.setVelocityX(-80);
        monster1.anims.play('monster_left', true);
        monster2.setVelocityX(-80);
        monster2.anims.play('monster_left', true);
        monster3.setVelocityX(-60);
        monster3.anims.play('monster_left', true);
        monster4.setVelocityX(60);
        monster4.anims.play('monster_right', true);

        // inital velocity for platforms
        fPlatform.setVelocityX(70);
        fPlatform.setVelocityY(0);
        fPlatform2.setVelocityX(-70);
        fPlatform2.setVelocityY(0);

        //player and moving platform collision
        this.physics.add.collider(player, fPlatform)
        this.physics.add.collider(player, fPlatform2)

        // check for collision against player and spikes, if found call hitSpike() from main_scene
        this.physics.add.collider(player, spikes, hitSpike, null, this);

        // add collision for monster and platforms. Also add collision for monster and player
        this.physics.add.collider(monster1, platforms);
        this.physics.add.collider(player, monster1, killMonster, null, this);
        this.physics.add.collider(monster2, platforms);
        this.physics.add.collider(player, monster2, killMonster, null, this);
        this.physics.add.collider(monster3, platforms);
        this.physics.add.collider(player, monster3, killMonster, null, this);
        this.physics.add.collider(monster4, platforms);
        this.physics.add.collider(player, monster4, killMonster, null, this);

        // DoorTrigger collision which calls the nextLevel function
        this.physics.add.overlap(player, doorTrigger, goLevel6, null, this);

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

        //fPlatform movement
        if (fPlatform.x >= 471) {
            fPlatform.setVelocityX(-70);
        } else if (fPlatform.x <= 364) {
            fPlatform.setVelocityX(70);
        }

        if (fPlatform2.x >= 215) {
            fPlatform2.setVelocityX(-70);
        } else if (fPlatform2.x <= 108) {
            fPlatform2.setVelocityX(70);
        }

        // Monster controlling 
        if (monster1.x >= 643) {
            monster1.setVelocityX(-90);         
            monster1.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster1.x <= 525) {
            monster1.setVelocityX(90);
            monster1.anims.play('monster_right', true);
        }

        // Monster controlling 
        if (monster2.x >= 753) {
            monster2.setVelocityX(-90);         
            monster2.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster2.x <= 578) {
            monster2.setVelocityX(90);
            monster2.anims.play('monster_right', true);
        }

        // Monster controlling 
        if (monster3.x >= 273) {
            monster3.setVelocityX(-90);         
            monster3.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster3.x <= 176) {
            monster3.setVelocityX(90);
            monster3.anims.play('monster_right', true);
        }

        // Monster controlling 
        if (monster4.x >= 249) {
            monster4.setVelocityX(-90);         
            monster4.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster4.x <= 151) {
            monster4.setVelocityX(90);
            monster4.anims.play('monster_right', true);
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