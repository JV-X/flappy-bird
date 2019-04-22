class SceneTitle extends View {

    constructor() {
        super()

        this.background = Background.new()
        this.bird = TitleBird.new()
        this.banner = Banner.new()
    }

    registeredImages() {
        let is = {
            ...this.background.registeredImages(),
            ...this.bird.registeredImages(),
            ...this.banner.registeredImages(),
        }
        return is
    }

    draw() {
        this.background.draw(this.ctx)
        this.banner.draw(this.ctx)
        this.bird.draw(this.ctx)
    }

    update() {
        this.background.update()
        this.bird.update()
        this.banner.update()
    }

    onClick(x, y) {
        var title = SceneGame.new()
        Engine.i().startScene(title)
    }

}
