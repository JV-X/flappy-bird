class Banner extends View {

    constructor() {
        super()
    }

    registeredImages() {
        let is = {
            'copyright': 'img/title/copyright.png',
            'title': 'img/title/title.png',
        }
        return is
    }

    update() {

    }

    draw(ctx) {
        let screenWidth = Engine.i().width
        let screenHeight = Engine.i().height

        let titleImage = ctx.loaded['title']
        let tx = screenWidth / 2 - titleImage.width / 2
        let ty = screenHeight / 2 - titleImage.height
        ctx.drawImage(titleImage, tx, ty)

        let copyrightImage = ctx.loaded['copyright']
        let cx = screenWidth / 2 - copyrightImage.width / 2
        let cy = screenHeight / 2 + copyrightImage.height / 2
        ctx.drawImage(copyrightImage, cx, cy)

        ctx.font = '13px serif'
        ctx.fillText("power by xiang3 as new year's gift. ", 280, 380)
    }

}
