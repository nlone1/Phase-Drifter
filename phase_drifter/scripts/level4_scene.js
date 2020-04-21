class level4_scene extends Phaser.Scene {
    constructor() {
        super("level4");
    }

    preload() {
        this.load.image('background4', '../assets/level4/background4.png');
        this.load.image('plat1-4', '../assets/level4/tile1.png'); // 205
        this.load.image('plat2-4', '../assets/level4/tile2.png'); // 122, 42
        this.load.image('plat3-4', '../assets/level4/tile3.png'); 
        this.load.image('plat4-4', '../assets/level4/tile4.png');
        this.load.image('plat5-4', '../assets/level4/tile5.png'); // 105, 7
        this.load.image('plat6-4', '../assets/level4/tile6.png');
        this.load.image('plat7-4', '../assets/level4/tile7.png'); // 85, 10
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('bounds', '../assets/worldBound.png');
        this.load.image('bits', '../assets/level4/blitz.png');
        this.load.image('door2', '../assets/level4/door2.png');
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
        // Add background
        this.add.image(400, 300, 'background4');
        this.add.image(482, 523, 'bits');

        // create bottom world bound
        bounds = this.physics.add.staticGroup();
        bounds.create(400, 598, 'bounds');
        bounds.setVisible(false);

        // create static platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(205, 557, 'plat1-4');
        platforms.create(677, 557, 'plat2-4');
        platforms.create(717, 445, 'plat3-4');
        platforms.create(105, 327, 'plat5-4');
        platforms.create(715, 165, 'plat7-4');

        // create door
        door = this.physics.add.staticGroup();
        door.create(717, 92, 'door2');

        // create key
        key = this.physics.add.staticGroup();
        key.create(32, 285, 'key');

        // create floating platforms
        fPlatform = this.physics.add.sprite(458, 386, 'plat4-4');
        fPlatform.body.setAllowGravity(false);
        fPlatform.body.immovable = true;

        fPlatform2 = this.physics.add.sprite(350, 241, 'plat6-4');
        fPlatform2.body.setAllowGravity(false);
        fPlatform2.body.immovable = true;

        // create player
        player = this.physics.add.sprite(74, 466, 'dude');
        player.setCollideWorldBounds(true);
        player.setSize(22,36);

        // create monster
        monster1 = this.physics.add.sprite(720, 420, 'monster1');
        monster1.setCollideWorldBounds(true);
        monster1.setSize(34, 24);

        // create monster2
        monster2 = this.physics.add.sprite(82, 298, 'monster1');
        monster2.setCollideWorldBounds(true);
        monster2.setSize(34, 24);

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

        // check for collision against key and player. If collision detecplatforms3ted, call collectKey() from main_scene.js
        this.physics.add.overlap(player, key, collectKey, null, this);

        // Check for collision against platforms and player
        this.physics.add.collider(player, platforms);

        // initial velocity for monsters
        monster1.setVelocityX(-80);
        monster1.anims.play('monster_left', true);

        monster2.setVelocityX(80);
        monster2.anims.play('monster_right', true);

        // inital velocity for platforms
        fPlatform.setVelocityX(70);
        fPlatform.setVelocityY(0);
        fPlatform2.setVelocityX(-70);
        fPlatform2.setVelocityY(0);

        //player and moving platform collision
        this.physics.add.collider(player, fPlatform)
        this.physics.add.collider(player, fPlatform2)

        // add collision for monster and platforms. Also add collision for monster and player
        this.physics.add.collider(monster1, platforms);
        this.physics.add.collider(player, monster1, killMonster, null, this);
        this.physics.add.collider(monster2, platforms);
        this.physics.add.collider(player, monster2, killMonster, null, this);

        // Door collision which calls the nextLevel function
        this.physics.add.overlap(player, door, goLevel3, null, this);
        
        // Door collision which calls the nextLevel function
        this.physics.add.overlap(player, door, goLevel3, null, this);

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

        //fPlatform movement
        if (fPlatform.x >= 575) {
            fPlatform.setVelocityX(-70);
        } else if (fPlatform.x <= 270) {
            fPlatform.setVelocityX(70);
        }

        if (fPlatform2.x >= 544) {
            fPlatform2.setVelocityX(-70);
        } else if (fPlatform2.x <= 285) {
            fPlatform2.setVelocityX(70);
        }


        // Monster controlling 
        if (monster1.x >= 778) {
            monster1.setVelocityX(-90);         
            monster1.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster1.x <= 656) {
            monster1.setVelocityX(90);
            monster1.anims.play('monster_right', true);
        }

        // Monster controlling 
        if (monster2.x >= 185) {
            monster2.setVelocityX(-90);         
            monster2.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster2.x <= 24) {
            monster2.setVelocityX(90);
            monster2.anims.play('monster_right', true);
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