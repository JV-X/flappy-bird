class SceneGame extends View {

    constructor() {
        super()

        this.tutorial = Tutorial.new()
        this.background = Background.new()
        this.bird = GameBird.new()
        this.scoreBorad = ScoreBoard.new()
        this.pipes = Pipes.new()
        this.control = Control.new()

        this.score = 0
    }

    registeredImages() {
        let is = {
            ...this.background.registeredImages(),
            ...this.tutorial.registeredImages(),
            ...this.pipes.registeredImages(),
            ...this.scoreBorad.registeredImages(),
            ...this.control.registeredImages(),
        }
        return is
    }

    draw() {
        this.background.draw(this.ctx)

        if (this._tutorailEnd()) {
            this._drawGame()
        } else {
            this.tutorial.draw(this.ctx)
        }
        this.control.draw(this.ctx)
    }

    update() {
        if (this.control.pause) {
            return
        }

        if (this._tutorailEnd()) {
            this._updateGame()
        } else {
            this.tutorial.update()
            this.background.update()
        }
    }

    onClick(x, y) {
        let p = {x: x, y: y, w: 1, h: 1}
        let control = this.control.rect()
        let rePlay = this.scoreBorad.replayButtomRect()

        if (rectIntersects(p, control)) {
            this.control.pause = !this.control.pause
        } else if (rectIntersects(p, rePlay)) {
            var title = SceneGame.new()
            Engine.i().startScene(title)
        } else {
            this.bird.onClick(x, y)
        }
    }

    _updateGame() {
        if (this._gameOver()) {
            this._saveScore()
            this.scoreBorad.update()
        } else {
          this.background.update()
          this.bird.update()

          let self = this
          function onScore() {
              self.score++
          }
          this.pipes.update(onScore)
        }
    }

    _saveScore() {
        let e = Engine.i()
        e.bestScore = e.bestScore === undefined ? 0 : e.bestScore
        e.bestScore = e.bestScore > this.score ? e.bestScore : this.score

        this.scoreBorad.score = this.score
        this.scoreBorad.bestScore = e.bestScore
    }


    _drawGame() {
        this.pipes.draw(this.ctx)
        this.bird.draw(this.ctx)

        if (this._gameOver()) {
            this.scoreBorad.draw(this.ctx)
        }
    }

    _gameOver() {
        let b = this.bird.rect()
        let landed = (b.y + b.h > this.background.land.y)
        let hitPipes = this.pipes.hit(b)

        return landed || hitPipes
    }

    _tutorailEnd() {
        return this.tutorial.animationEnded() && this.bird.clicked !== undefined
    }

}
