import TitleScene from 'TitleScene.js';

let titelScene = new TitleScene();

let config = {
  type: Phase.AUTO,
  width: 800,
  height: 600,
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.start('TitleScene');
