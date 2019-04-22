class Sky extends View {

    constructor() {
        super()

        this.counter = 0
        this.suffix = 0
    }

    registeredImages() {
        let is = {
          'sky-0': 'img/common/sky-0.png',
          'sky-1': 'img/common/sky-1.png',
        }
        return is
    }

    update() {
      if (this.counter == 1000) {
          this.suffix = this.suffix == 0 ? 1 : 0   // 天气变化： 每 10000 帧变化一次图片
          this.counter = 0
      }
      this.counter = this.counter + 1
    }

    draw(ctx) {
        let img = ctx.loaded['sky-' + this.suffix]
        ctx.canvasContext.drawImage(img, 0 , 0, Engine.i().width,Engine.i().height)  // 素材大小不太合适，先这么弄着
    }

}
