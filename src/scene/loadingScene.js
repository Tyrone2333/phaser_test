export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
                key: 'loadingScene',
                files: [
                    // {type: 'image', key: 'logo', url: 'resource/image/gamelogo.png'},
                ]
            },
        );
    }

    preload() {
        // 这个 scene preload 的资源可以在下一 scene 使用
        // 添加图片
        this.load.image('fire', '../resource/image/fire.png')
        this.load.image('background', '../resource/image/bg_2.jpg')
        this.load.image('gamelogo', '../resource/image/gamelogo.png')

        this.load.image('sky', '../resource/image/sky.png')
        this.load.image('ground', '../resource/image/platform.png')
        this.load.image('star', '../resource/image/star.png')
        this.load.image('bomb', '../resource/image/bomb.png')
        this.load.image('boom_small', '../resource/image/boom_small.png')


        // 添加人物
        this.load.spritesheet('dude',
            '../resource/image/dude.png',
            {frameWidth: 32, frameHeight: 48}
        )
        this.load.spritesheet('link',
            '../resource/image/link.png',
            {frameWidth: 32, frameHeight: 32}
        )

        this.load.image('logo', 'resource/image/gamelogo.png');
        this.load.image('sky', 'resource/image/sky.png');

        // 创建进度条
        this.add.sprite(0, 0, "logo").setOrigin(0, 0)
        let progressBar = this.add.graphics()

        let width = this.cameras.main.width
        let height = this.cameras.main.height
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        })
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        assetText.setOrigin(0.5, 0.5)
        percentText.setOrigin(0.5, 0.5)
        loadingText.setOrigin(0.5, 0.5)

        this.load.on('progress', (value) => {
            // 0 - 1 的完成进度
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(250, 280, 300 * value, 30)
            percentText.setText(parseInt(value * 100) + '%')
        })
        this.load.on('fileprogress', (file) => {
            assetText.setText('正在加载文件: ' + file.src)
        })
        this.load.on('complete', () => {
            // loadingText.destroy()
            // percentText.destroy()
            // assetText.destroy()
        })
        // 创建进度条 END
    }

    create() {
        // this.add.image(0, 0, 'logo').setOrigin(0, 0)
        // log("loadingScene")

        // setTimeout( () => {
        this.scene.start('gameScene', {
            level: 3,
            difficult: "easy",
        })
        // },2000)


    }
}