class BaseBird extends View {

    constructor() {
        super()

        this.counter = 0
        this.currentKey = "bird0"

        this.x = 0
        this.y = 0

    }

    rect() {
      // 素材有透明的边, 这里手动处理一下, 避免检测到碰撞时 UI 上看起来没有碰撞
        let r = {
          x: this.x + 13,
          y: this.y + 13,
          w: 25,
          h: 25,
        }

        return r
    }

    registeredImages() {
        let is = {
          'bird0': 'img/common/bird-0.png',
          'bird1': 'img/common/bird-1.png',
          'bird2': 'img/common/bird-2.png',
        }
        return is
    }

    update() {
        if (this.counter == 10) {
            this._fan()   // 扇动效果： 每 10 帧变化一次图片
            this.counter = 0
        }
        this.counter = this.counter + 1
    }

    draw(ctx) {
        let birdImage = ctx.loaded[this.currentKey]
        ctx.drawImage(birdImage, this.x, this.y)
    }

    onClick(x, y) {
        log("not  implements")
    }

    _fan() {
        let k = this.currentKey
        let index = k[k.length - 1]
        let newIndex = parseInt(index) + 1
        if (newIndex == 3) {
            newIndex = 0
        }
        this.currentKey = k.replace(index, newIndex)
    }

}

class TitleBird extends BaseBird {

    constructor() {
        super()
        this.x = Engine.i().width / 2 + 75
        this.y = Engine.i().height / 2 - 60
    }

}

class TutorialBird extends BaseBird {

    constructor() {
        super()
        this.x = Engine.i().width / 2 + 75
        this.y = Engine.i().height / 2 - 60
    }

    update() {
        super.update()

        let x = Engine.i().width / 6
        if (this.x > x) {
            this.x -= 3
        } else {
            this.animationEnd = true
        }
    }
}

class JumpAbleBird extends BaseBird {

    constructor() {
        super()

        this.gravity = 0
        this.offset = 0
        this.rotation = 45
    }

    update() {
        super.update()

        if (this.clicked === undefined) {
            return
        }

        this.y = this.y + this.gravity / 3
        if (this.rect().y < 0) {
          this.y = -10
        }

        this.gravity += this.offset / 15
        this.rotation = this.rotation > 45 ? 45 : this.rotation + 2

        if (this.offset < 25) {
            this.offset++
        } else {
            this.clicked = false
        }
    }

    draw(ctx) {
        let _ctx = ctx.canvasContext
        _ctx.save()

        let r = this.rect()
        let w2 = r.w / 2
        let h2 = r.h / 2

        _ctx.translate(r.x + w2, r.y + h2)
        _ctx.rotate(this.rotation * Math.PI / 180)
        _ctx.translate(- w2 - r.x, - h2 - r.y)
        super.draw(ctx)

        _ctx.restore()
    }

    onClick(x, y) {
        this.clicked = true
        this.offset = 0
        this.gravity = -10
        this.rotation = -45
    }
}

class GameBird extends JumpAbleBird {

    constructor() {
        super()
        this.x = Engine.i().width / 6
        this.y = Engine.i().height / 2 - 60
    }

}
