
import 'phaser'

export const animConfig = {
    spriteSheet: {                                      // Spritesheet we're manipulating.
        key: 'link',
        frameWidth: 32,                                 // NOTE: Potential drawback. All frames are the same size.
        frameHeight: 32
    },
    animations: [                                       // Animation data.
        {key: 'walk-down', frameRate: 15, startFrame: 0, endFrame: 9},
        {key: 'walk-left', frameRate: 15, startFrame: 10, endFrame: 19},
        {key: 'walk-up', frameRate: 15, startFrame: 20, endFrame: 29}
    ]
}

export const gameConfig = {
    rotateSpeed : 5,
    throwSpeed : 150,
    minAngle : 10
}
