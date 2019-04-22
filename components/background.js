class Background extends View {

    constructor() {
        super()

        this.sky = Sky.new()
        this.land = Land.new()
    }

    registeredImages() {
        let is = {
            ...this.land.registeredImages(),
            ...this.sky.registeredImages(),
        }
        return is
    }

    update() {
        this.sky.update()
        this.land.update()
    }

    draw(ctx) {
        this.sky.draw(ctx)
        this.land.draw(ctx)
    }

}
