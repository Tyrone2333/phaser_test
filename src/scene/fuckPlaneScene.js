let gameConfig = {
    rotateSpeed: 5,
    moveSpeed: 5,
    minAngle: 10,

}
export default class fuckPlaneScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'fuckPlaneScene'
        })

    }

    init(data) {
        // data 是从this.scene.start('gameScene',{})传过来的
        this.level = data.level
    }

    preload() {
        this.load.image('background2', '../resource/image/bg_2.jpg')
        this.load.image('enemy_small', '../resource/image/enemy_small.png')

        // 这是飞机
        this.load.spritesheet('player',
            '../resource/image/plane_1.png',
            {frameWidth: 122, frameHeight: 95}
        )
    }


    create() {

        // 天空背景
        this.add.image(0, 0, 'background2').setOrigin(0, 0).setScale(0.8)

        this.player = this.physics.add.sprite(this.sys.game.config.width / 2 - 100, this.sys.game.config.height/2, 'player')
            .setScale(0.5)
            .setCollideWorldBounds(true) // 世界碰撞
        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA), // ",键"
        }

        this.enemies = this.physics.add.group()
        let x = Phaser.Math.Between(400, 800)
        let enemySmall = this.enemies.create(x, 16, 'enemy_small')
        enemySmall.setBounce(1)

        enemySmall.setVelocity(Phaser.Math.Between(-200, 200), 20)
        enemySmall.allowGravity = false


        this.physics.add.collider(this.player, this.enemies, this.hitBomb, null, this)


    }

    update() {
        // 控制移动
        if (this.keys.left.isDown) {
            this.player.x -= gameConfig.moveSpeed
        } else if (this.keys.right.isDown) {
            this.player.x += gameConfig.moveSpeed
        } else if (this.keys.up.isDown) {
            this.player.y -= gameConfig.moveSpeed
        } else if (this.keys.down.isDown) {
            this.player.y += gameConfig.moveSpeed
        }


    }

    render() {

    }


}
