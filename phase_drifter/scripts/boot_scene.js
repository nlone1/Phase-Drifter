class boot_scene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    
    create() {
        this.add.text(20, 20, "loading game...");
        this.scene.start("playGame");
    }
}
