let gameConfig = {
    rotateSpeed: 5,
    throwSpeed: 150,
    minAngle: 10
}

export default class throwKnifeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'throwKnifeScene'
        })

    }

    init(data) {
        // data 是从this.scene.start('gameScene',{})传过来的
        this.level = data.level
    }

    preload() {
        this.load.image('knife', '../resource/image/knife.png')
        this.load.image('target', '../resource/image/target.png')
    }


    create() {

        // 天空背景
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // 扔飞镖
        this.target = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 5 * 2, "target").setScale(0.5, 0.5)
        this.target.depth = 1
        this.knife = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 5 * 4, "knife").setScale(0.5, 0.5)
        this.knifeGroup = this.add.group()

        this.canThrow = true
        this.input.on("pointerdown", this.throwKnife, this)
        // 扔飞镖 END

    }

    update() {

        // 扔飞镖
        this.target.angle += gameConfig.rotateSpeed
        let children = this.knifeGroup.getChildren()
        for (var i = 0; i < children.length; i++) {
            let child = children[i]
            child.angle += gameConfig.rotateSpeed
            let ang = Phaser.Math.DegToRad(child.angle)
            child.x = this.target.x - Math.sin(ang) * this.target.width / 4
            child.y = this.target.y + Math.cos(ang) * this.target.width / 4
        }
        // 扔飞镖 END
    }

    // 扔飞镖
    throwKnife() {
        if (!this.canThrow) {
            return
        }
        this.canThrow = false
        this.tweens.add({
            targets: [this.knife],
            y: this.target.y + this.knife.height / 8 * 3,
            duration: gameConfig.throwSpeed,
            callbackScope: this,
            onComplete: function (tween) {
                let isLegal = true
                let children = this.knifeGroup.getChildren()
                for (var i = 0; i < children.length; i++) {
                    let child = children[i]
                    if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, child.impactAngle)) < gameConfig.minAngle) {
                        isLegal = false
                        break
                    }
                }
                if (isLegal) {
                    this.canThrow = true
                    let newKnife = this.add.image(this.target.x, this.target.y + this.knife.height / 8 * 3, "knife").setScale(0.5, 0.5)
                    newKnife.impactAngle = this.target.angle
                    this.knifeGroup.add(newKnife)
                    this.knife.y = this.sys.game.config.height / 5 * 4
                }
                else {
                    this.tweens.add({
                        targets: [this.knife],
                        y: this.sys.game.config.height + this.knife.height,
                        rotation: 5,
                        duration: gameConfig.throwSpeed * 4,
                        callbackScope: this,
                        onComplete(tween) {
                            // this.scene.start("playGame")
                        }
                    })
                }
            },
        })
    }

}

