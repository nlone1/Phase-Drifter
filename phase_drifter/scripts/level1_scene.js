class level1_scene extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('background', '../assets/level_1/background.png');
        this.load.image('plat1', '../assets/level_1/platform1.png');
        this.load.image('plat2', '../assets/level_1/platform2.png');
        this.load.image('plat3', '../assets/level_1/platform3.png');
        this.load.image('plat4', '../assets/level_1/platform4.png');
        this.load.image('key', '../assets/level_1/key.png');
        this.load.image('spike_ball', '../assets/level_1/spike_ball.png');
        this.load.image('spikes', '../assets/level_1/spikes.png');
        this.load.image('steps', '../assets/level_1/steps.png');
        this.load.image('base', '../assets/level_1/teleporter_base.png');
        this.load.image('top', '../assets/level_1/teleporter_top.png');
        this.load.spritesheet('dude', '../assets/dude.png', {
            frameWidth: 16,
            frameHeight: 36
        });
    }

    create() {
        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'plat4');
    }

    update() {

    }
}