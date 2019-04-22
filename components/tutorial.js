class Tutorial extends View {

    constructor() {
        super()

        this.bird = TutorialBird.new()
    }

    registeredImages() {
        let is = {
            ...this.bird.registeredImages(),
            'tutorial': 'img/main/tutorial.png',
            'ready': 'img/main/ready.png',
        }
        return is
    }

    update() {
        this.bird.update()
    }

    draw(ctx) {
        this.bird.draw(ctx)

        let r = ctx.loaded['ready']
        let x = Engine.i().width / 2 - r.width / 2
        let y = Engine.i().height / 5
        ctx.drawImage(r, x, y)

        let t = ctx.loaded['tutorial']
        x = Engine.i().width / 2 - t.width / 2
        y = Engine.i().height / 5 * 2
        ctx.drawImage(t, x, y)
    }

    animationEnded() {
        return this.bird.animationEnded()
    }

}
