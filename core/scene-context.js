class SceneContext {

    constructor(canvasContext, registeredImages) {
        this.images = registeredImages
        this.loaded = {}

        this.canvasContext = canvasContext
        this.font = ""
    }

    drawImage(img, x, y) {
        this.canvasContext.drawImage(img, x, y)
    }

    fillText(text, x, y) {
        this.canvasContext.font = this.font
        this.canvasContext.fillText(text, x, y)
        this.font = ""
    }
}
