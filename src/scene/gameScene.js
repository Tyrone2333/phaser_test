import {gameConfig,} from "../config/index"

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameScene'
        })
        this.player = {}
        this.score = 0
        this.scoreText = ""
        this.gameOver = false
        this.stars = {}
        this.bombs = {}
    }

    init(data) {
        // data 是从this.scene.start('gameScene',{})传过来的
        this.level = data.level
    }

    preload() {

        // 这是飞机
        // this.load.spritesheet('player',
        //     '../resource/image/plane_1.png',
        //     { frameWidth: 122, frameHeight: 95 }
        // )

    }


    create() {
        log("gameScene create")
//      因为在Phaser 3中，默认情况下所有游戏对象都基于其中心定位。
//      背景图像的大小为512 x 768像素，因此如果我们以0 x 0为中心显示它，只能看到它的右下角。
//      如果我们以256, 384显示它，你会看到整个事物。
//     this.add.image(256, 384, 'background')

        // 天空背景
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // 添加文本对象
        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: 'gold'})
        this.timeText = this.add.text(
            16, /* x：游戏对象的x坐标 */
            52, /* y：游戏对象的y坐标 */
            new Date().toLocaleString(), /* text：文本内容 */
            {fill: 'gold'}       /* style：文本样式 */)

        // 静态组
        let platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')
        platforms.create(300, 520, 'star')
        // 动态组
        this.bombs = this.physics.add.group()
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,// 重复11次,得到12个
            setXY: {x: 12, y: 0, stepX: 70}
        })

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })


        // this.player = this.physics.add.sprite(100, 300, 'dude')
        this.player = this.physics.add.sprite(500, 300, 'link')

        this.player.setBounce(0.2)  // 反弹系数
        this.player.setCollideWorldBounds(true) // 世界碰撞
        this.player.body.setGravityY(1)    //重力
        this.player.doubleJump = true
        this.player.doubleJumpCount = 0

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("link", {start: 10, end: 19}),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("link", {start: 20, end: 29}),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "turn",
            frames: this.anims.generateFrameNumbers("link", {start: 0, end: 9}),
            frameRate: 15,
            repeat: -1
        })

        // 添加碰撞检测
        this.physics.add.collider(this.bombs, platforms)
        this.physics.add.collider(this.player, platforms)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)
        this.physics.add.collider(this.stars, platforms)

        this.input.on("pointerdown",this.flyToMouse,this)

    }

    update() {
        if (this.gameOver) {
            return
        }


        let cursors = this.input.keyboard.createCursorKeys()
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160)
            this.player.flipX = false
            this.player.anims.play('left', true)
        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(160)
            // 翻转 X ,动画执行 left
            this.player.flipX = true
            this.player.anims.play('left', true)
        }
        else {
            this.player.setVelocityX(0)
            this.player.flipX = false
            this.player.anims.play('turn')
        }

        // 触地才允许跳跃
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }
        // if (cursors.up.isDown && this.player.doubleJumpCount) {
        //     this.player.setVelocityY(-330)
        // }

    }

    render() {
        console.log(" render " + this)
    }

    collectStar(player, star) {
        star.disableBody(true, true)

        this.score += 10
        this.scoreText.setText('Score: ' + this.score)

        // if (this.stars.countActive(true) === 0) {
        if (1) {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true)
            })

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

            var bomb = this.bombs.create(x, 16, 'bomb')
            bomb.setBounce(1)
            bomb.setCollideWorldBounds(true)
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
            bomb.allowGravity = false

        }
    }

    hitBomb(player, bomb) {

        this.physics.pause()
        player.setTint(0xff0000)
        // player.anims.play('turn')

        // 镜头摇晃
        this.cameras.main.shake(500);

        this.gameOver = true

    }

    flyToMouse(){

        this.tweens.add({
            targets: [this.player],
            x: this.input.x ,
            y: this.input.y ,
            callbackScope: this,
            duration:1000,
            onComplete: function (tween) {

            },
        })


    }

}

export default GameScene