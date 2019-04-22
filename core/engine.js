class Engine {

    constructor() {
        this._initCanvas()
        this._initProps()
    }

    static i() {
        this.ins = this.ins || new this()
        return this.ins
    }

    startScene(scene) {
        this.newScene = scene
        this._initSceneContext(scene)

        if (this._uiWorking === undefined) {
            log("start ui work")
            this._uiWorking = setTimeout(this._uiWork,  1000 / Engine.i().fps)
        }
    }

    _initSceneContext(scene) {
        let images = scene.registeredImages()
        let sc = new SceneContext(this.context, images)
        scene.ctx = sc

        let keys  = Object.keys(images)
        for (var i = 0; i < keys.length; i++) {
            let k = keys[i]
            var v = images[k]

            let img = new Image()
            img.src = v
            img.onload = function() {
                sc.loaded[k] = img

                let imagesLength = keys.length
                let loadedLength = Object.keys(sc.loaded).length
                if (imagesLength == loadedLength) {
                    Engine.i()._switchScene(scene)
                }
            }
        }
    }

    _switchScene(scene) {
        log("switch scene")
        this.currentScene = scene
        this.newScene = null
    }

    _initProps() {
        this.currentScene = null
        this.newScene = null

        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight

        this.fps = 60
    }

    _uiWork() {
        Engine.i()._onFrame();
        setTimeout(Engine.i()._uiWork, 1000 / Engine.i().fps);
    }

    _initCanvas() {
        this.canvas = element("#id-canvas")
        this.context = this.canvas.getContext("2d")

        this.canvas.addEventListener('mousedown', e => {
            let scene = Engine.i().currentScene
            if(scene == null) {
                return
            }
            scene.onClick(e.clientX, e.clientY)
        })
    }

    _onFrame() {
        if(this.currentScene == null) {
            return
        }

        this.currentScene.update()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.currentScene.draw()
    }

}
