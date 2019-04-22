class Control extends View {

    constructor() {
        super()
        this.pause = false
    }

    registeredImages() {
        let is = {
            'start': 'img/main/start.png',
            'pause': 'img/main/pause.png',
        }
        return is
    }

    draw(ctx) {
        let img = this.pause ? ctx.loaded['start']: ctx.loaded['pause']
        ctx.drawImage(img, 10, 10)
    }

    rect() {
        let r = {
            x: 10,
            y: 10,
            w: 30,
            h: 30,
        }
        return r
    }

}
