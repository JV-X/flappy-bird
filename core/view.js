class View {

    constructor() {
        this.ctx = null
        this.animationEnd = false
    }

    static new() {
        var i = new this()
        return i
    }

    registeredImages() {

    }

    draw(context) {

    }

    update() {

    }

    onClick(x, y) {

    }

    animationEnded() {
        return this.animationEnd
    }

}
