class TitleScene extends Phaser.Scene {
  constructor() {
    super({key: 'TitleScene'});
  }

  preload () {
    this.load.image('background_image', '../assets/title_background.png');
  }

  create () {
    let background = this.add.sprite(0, 0, 'background_image');
    background.setOrigin(0, 0);

    let title_text = this.add.text(100, 100, 'Phase Drifter');
  }
}

export default TitleScene;
