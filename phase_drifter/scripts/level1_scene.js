class level1_scene extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('background', '../assets/level_1/background.png');
        this.load.image('plat1', '../assets/level_1/tile1.png'); // center pixel = 155
        this.load.image('plat2', '../assets/level_1/tile2.png'); // center pixel = 52
        this.load.image('plat3', '../assets/level_1/tile3.png'); // center pixel = 235
        this.load.image('plat4', '../assets/level_1/tile4.png'); // center pixel = 12
        this.load.image('plat5', '../assets/level_1/tile5.png'); // center pixel = 80
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('spikes', '../assets/level_1/spikes.png'); // center pixe; = 47
        this.load.spritesheet('dude', '../assets/dude.png', {
            frameWidth: 32,
            frameHeight: 36
        });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

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
        
        // Create spikes as static grouop and add them to level
        spikes = this.physics.add.staticGroup();
        spikes.create(367, 183, 'spikes');
        spikes.create(587, 183, 'spikes');
        
        // Create key amd add to level
        key = this.physics.add.staticGroup();
        key.create(475, 275, 'key');

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
        
        // set hasKey to false at beginning of level and set the keyText
        hasKey = false;
        keyText = this.add.text(16, 16, 'Key: false', { fontSize: '32px', fill: '#000' });

        // create cursor which is Phaser's built in keyboard manager (suppliments event listeners)
        cursors = this.input.keyboard.createCursorKeys();

        // check for collision against key and player. If collision detected, call collectKey() from main_scene.js
        this.physics.add.overlap(player, key, collectKey, null, this);

        // Check for collision against platforms and player
        this.physics.add.collider(player, platforms);
        
        // check for collision against player and spikes, if found call hitSpike() from main_scene
        this.physics.add.collider(player, spikes, hitSpike, null, this);
    }

    update() {
        
        if(gameOver) {
            return;
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