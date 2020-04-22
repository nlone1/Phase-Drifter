class level3_scene extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    preload() {
        this.load.image('background3', '../assets/level3/background3.png');
        this.load.image('plat1-3', '../assets/level3/tile1.png');
        this.load.image('plat2-3', '../assets/level3/tile2.png');
        this.load.image('plat3-3', '../assets/level3/tile3.png');
        this.load.image('plat4-3', '../assets/level3/tile4.png'); // 160
        this.load.image('plat5-3', '../assets/level3/tile5.png'); // floating platform
        this.load.image('plat6-3', '../assets/level2/tile2.png'); // center pixel = 67
        this.load.image('spikeball', '../assets/level2/spike_ball.png');
        this.load.image('bounds', '../assets/worldBound.png');
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('doorTrigger', '../assets/doorTrigger.png');
        this.load.image('door', '../assets/door.png'); // center pixel = 52
        this.load.spritesheet('switch', '../assets/level3/switch.png', {
            frameWidth: 80,
            frameHeight: 130
        });
        this.load.spritesheet('arrow', '../assets/level3/arrow.png', {
            frameWidth: 60,
            frameHeight: 55
        });
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
        this.add.image(400, 300, 'background3');

        // create bottom world bound
        bounds = this.physics.add.staticGroup();
        bounds.create(400, 598, 'bounds');
        bounds.setVisible(false);

        // Create a static physics group and assign it to platforms
        platforms3 = this.physics.add.staticGroup();
        platforms3.create(515, 132, 'plat1-3');
        platforms3.create(382, 57, 'plat2-3');
        platforms3.create(582, 296, 'plat3-3');
        platforms3.create(160, 530, 'plat4-3');
        platforms3.create(482, 450, 'plat6-3');
        platforms3.create(707, 524, 'plat6-3');
        platforms3.create(72, 132, 'plat6-3');

        // create switch for platform
        switch1 = this.physics.add.sprite(707, 463, 'switch');
        switch1.body.setAllowGravity(false);
        switch1.body.immovable = true;
        switchDown = true;

        // create moving platform
        fPlatform = this.physics.add.sprite(210, 505, 'plat5-3');
        fPlatform.body.setAllowGravity(false);
        fPlatform.body.immovable = true; // keeps the player from moving the platform

        // Create player
        player = this.physics.add.sprite(436, 60, 'dude');
        //player = this.physics.add.sprite (62, 448, 'dude'); // testing purposes only
        player.setCollideWorldBounds(true);
        player.setSize(22,36);

        // create key
        key = this.physics.add.staticGroup();
        key.create(72, 90, 'key');

        // create arrow
        arrow = this.physics.add.staticSprite(206, 480, 'arrow');
        arrow.setVisible(false);
        arrowTouch = false;

        // Create door and add to level
        door = this.physics.add.staticGroup();
        door.create(62, 448, 'door');
        doorTrigger = this.physics.add.staticGroup();
        doorTrigger.create(62, 493, 'doorTrigger');
        doorTrigger.setVisible(false);

        // create spikeball 1
        spikeball1 = this.physics.add.sprite(572, 55, 'spikeball');
        spikeball1.setCollideWorldBounds(true);
        spikeball1.body.setAllowGravity(false);

        // create spikeball 2
        spikeball2 = this.physics.add.sprite(550, 215, 'spikeball');
        spikeball2.setCollideWorldBounds(true);
        spikeball2.body.setAllowGravity(false);

        // Create Monster
        monster1 = this.physics.add.sprite(522, 415, 'monster1');
        monster1.setCollideWorldBounds(true);
        monster1.setSize(34, 24);
        enemyMaxX = 547;
        enemyMinX = 417;

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

        // switch spritesheet
        this.anims.create({
            key: 'switch_down',
            frames: this.anims.generateFrameNumbers('switch', {start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'switch_up',
            frames: this.anims.generateFrameNumbers('switch', {start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        });

        // arrow spritesheet
        this.anims.create({
            key: 'arrowUp',
            frames: this.anims.generateFrameNumbers('arrow', {start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // start off level with switch playing down animation
        switch1.anims.play('switch_down', true);

        // set hasKey to false at beginning of level and set the keyText
        hasKey = false;
        lifeText = this.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#000' });

        // create cursor which is Phaser's built in keyboard manager (suppliments event listeners)
        cursors = this.input.keyboard.createCursorKeys();

        // check for collision against key and player. If collision detecplatforms3ted, call collectKey() from main_scene.js
        this.physics.add.overlap(player, key, collectKey, null, this);

        // Check for collision against platforms and player
        this.physics.add.collider(player, platforms3);

        // These two are set to iniate the monster at the start of the level to the -x direction with the monster_left animation playing. 
        monster1.setVelocityX(-80);
        monster1.anims.play('monster_left', true);

        // moving platform physics properties
        this.physics.add.collider(fPlatform, platforms3);
        this.physics.add.collider(player, fPlatform)

        // Spikeball 1 physics properties
        spikeball1.setVelocityY(100);
        this.physics.add.collider(spikeball1, platforms3);
        this.physics.add.collider(player, spikeball1, hitSpike, null, this);

        // Spikeball 2 physics properties
        spikeball2.setVelocityY(130);
        this.physics.add.collider(spikeball2, platforms3);
        this.physics.add.collider(player, spikeball2, hitSpike, null, this);

        // add collision for monster and platforms. Also add collision for monster and player
        this.physics.add.collider(monster1, platforms3);
        this.physics.add.collider(player, monster1, killMonster, null, this);

        // check for collision against player and spikes, if found call hitSpike() from main_scene
        this.physics.add.collider(player, spikes, hitSpike, null, this);

        // DoorTrigger collision which calls the nextLevel function
        this.physics.add.overlap(player, doorTrigger, goLevel4, null, this);

        // bounds collision which kills player if they go out of bounds
        this.physics.add.collider(player, bounds, hitSpike, null, this);

        // Collision with player and switch. if player touches switch, call Activate Switch
        this.physics.add.overlap(player, switch1, activateSwitch, null, this);

        // Collision with player and arrow which will trigger the platform movement
        this.physics.add.overlap(player, arrow, arrowTrigger, null, this); 

    }

    update() {

        // End game if gameOver == true. 
        if(gameOver) {
            lives = 3;
            this.scene.stop();
            this.scene.start('gameOver');
        }

        //  change switch animation to upwards arrow
        if (switchDown == false) {
            switch1.anims.play('switch_up', true);
        }

        // Code to activate moving paltform and stop it once it's Y coordinate is 133
        if (arrowTouch == true) {
            fPlatform.setVelocityY(-80);
            if (fPlatform.y <= 133) {
                fPlatform.setVelocityY(0);
            }
        }

        // spikeball 1 bounds
        if( spikeball1.y >= 93) {
            spikeball1.setVelocityY(-100);
        } else if (spikeball1.y <= 29) {
            spikeball1.setVelocityY(100);
        }

        // spikeball 2 bounds
        if( spikeball2.y >= 257) {
            spikeball2.setVelocityY(-130);
        } else if (spikeball2.y <= 170) {
            spikeball2.setVelocityY(130);
        }

        // Monster controlling 
        if (monster1.x >= enemyMaxX) {
            monster1.setVelocityX(-90);         
            monster1.anims.play('monster_left', true);
            // enemyMinX = 325 which is the left end of the platform
        } else if (monster1.x <= enemyMinX) {
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