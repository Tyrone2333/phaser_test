import 'phaser';

import GameScene from './scene/GameScene'
import LoadingScene from "./scene/loadingScene"

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'phaser-example',
    title: 'miao ?',
    width: 800,
    height: 600,
    // width: window.innerWidth,
    // height: window.innerHeight,
    fps: 60,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: true
        }
    },
    scene: [
        LoadingScene,
        GameScene,
    ]
};

const game = new Phaser.Game(config);


// window.onresize = function () {
//     game.renderer.resize(window.innerWidth, window.innerHeight)
// 适配移动端,触发resize
//     game.events.emit('resize')
// }

// const  gameConfig = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     pixelArt: true,
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: {y: 300},
//             debug: false
//         }
//     },
//     scene: {
//         preload: preload,
//         // create: create,
//         // update,
//         // render
//     }
// }
