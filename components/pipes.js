class PipePair {

    constructor() {
        this.topPipe = 'pipe-top-0'  // 上管道的素材只找到一种样式的, 先就这样
        this.bottomPipe = randomOne(['pipe-bottom-0', 'pipe-bottom-1'])

        this.nextPairOffset = randomBetween(120, 200)

        this.width = 52
        this.spaceHeight = randomBetween(100, 180)
        // spaceY 是上下两根管道间空隙的 Y 起点， 330是地板的 Y 轴（因为图片有透明边，所以通过图片取到的坐标是错的，故先写死）
        this.spaceY = randomBetween(0, 330 - this.spaceHeight)
        this.x = Engine.i().width
        this.topY = 0
        this.bottomY = this.spaceY + this.spaceHeight
        this.topHeight = this.spaceY
        this.bottomHeight = Engine.i().height - this.topHeight - this.spaceHeight
    }

    static registeredImages() {
        let is = {
            'pipe-top-0': 'img/main/pipe-top-0.png',
            'pipe-bottom-0': 'img/main/pipe-bottom-0.png',
            'pipe-bottom-1': 'img/main/pipe-bottom-1.png',
        }
        return is
    }

    draw(ctx) {
        let loaded = ctx.loaded
        let _ctx = ctx.canvasContext

        _ctx.drawImage(loaded[this.topPipe], this.x, this.topY, this.width, this.topHeight)
        _ctx.drawImage(loaded[this.bottomPipe], this.x, this.bottomY, this.width, this.bottomHeight)
    }

    update() {
        this.x -= 1
    }

    disappeared() {
        return this.x < -this.width
    }

    hit(bird) {
        let t = {}
        let b = {}
        t.x = b.x = this.x
        t.y = this.topY
        b.y = this.bottomY
        t.w = b.w = this.width
        t.h = this.topHeight
        b.h = this.bottomHeight

        let hitTop = rectIntersects(bird, t)
        let hitBottom = rectIntersects(bird, b)

        return hitTop || hitBottom
    }

}

class Pipes extends View {

    constructor() {
        super()

        this.pairs = []
        let firstPipe = new PipePair()
        this.pairs.push(firstPipe)
    }

    registeredImages() {
        return PipePair.registeredImages()
    }

    update(onScore) {
        let ps = this.pairs
        for (let i = 0; i < ps.length; i++) {
            var p = ps[i]
            p.update()

            if (p.disappeared()) {
                onScore()
                ps.shift()
                i -= 1
            }
        }

        let last = ps[ps.length - 1]
        if (last.x < Engine.i().width - last.nextPairOffset) {
            let np = new PipePair()
            ps.push(np)
        }
    }

    hit(bird) {
        let ps = this.pairs
        for (let i = 0; i < ps.length; i++) {
            var p = ps[i]
            if (p.hit(bird)) {
                return true
            }
        }

        return false
    }

    draw(ctx) {
        let ps = this.pairs
        for(let i = 0; i < ps.length; i++) {
            var p = ps[i]
            p.draw(ctx)
        }
    }

}
