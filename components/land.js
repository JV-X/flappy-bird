class Land extends View {

    constructor() {
        super()

        this.x = 0
    }

    registeredImages() {
        let is = {
          'land': 'img/common/land.png',
        }
        return is
    }

    update() {
        this.x = (this.x == -24 ? 0 : this.x - 1)
    }

    draw(ctx) {
        let landImage = ctx.loaded['land']
        let img2X = landImage.width + this.x
        this.y = Engine.i().height - landImage.height + 30

        ctx.drawImage(landImage, this.x, this.y)
        ctx.drawImage(landImage, img2X, this.y)
    }

}
