class ScoreBoard extends View {

    constructor() {
        super()

        this.baseY = -250
        this.baseX = Engine.i().width / 2 - 120

        this.bestScore = 0
        this.score = 0
        this.medal = null

        this.overX = this.baseX + 20
        this.boardX = this.baseX
        this.medalX = this.baseX + 30
        this.playX = this.baseX

        this.textSize = 20
    }

    registeredImages() {
        let is = {
            'medal-0': 'img/end/medal-0.png',
            'medal-1': 'img/end/medal-1.png',
            'medal-2': 'img/end/medal-2.png',
            'medal-3': 'img/end/medal-3.png',
            'over': 'img/end/over.png',
            'play': 'img/end/play.png',
            'board': 'img/end/board.png',
        }
        return is
    }

    update() {
        if (this.baseY > Engine.i().height / 2 - 150) {
            return
        }

        this.baseY += 4

        this.overY = this.baseY
        this.boardY = this.baseY + 50
        this.playY = this.boardY + 130
        this.medalY = this.boardY + 45
        this.scoreY = this.boardY + 50
        this.bestScoreY = this.scoreY + 50

        let textBaseX = this.boardX + 200
        this.scoreX = textBaseX - this._sizeOf(this.score)
        this.bestScoreX = textBaseX - this._sizeOf(this.bestScore)
    }

    draw(ctx) {
      ctx.drawImage(ctx.loaded['over'], this.overX, this.overY)
      ctx.drawImage(ctx.loaded['board'], this.boardX, this.boardY)
      ctx.drawImage(ctx.loaded['play'], this.playX, this.playY)
      ctx.drawImage(ctx.loaded[this._evalMedalKey()], this.medalX, this.medalY)

      ctx.font = this.textSize + 'px serif';
      ctx.fillText(this.score, this.scoreX, this.scoreY);
      ctx.fillText(this.bestScore, this.bestScoreX, this.bestScoreY);
    }

    _sizeOf(n) {
        let digitsCount = 0
        while (n >= 10) {
            n = parseInt(n / 10)
            digitsCount += 1
        }

        return digitsCount * 9
    }

    _evalMedalKey() {
        let prefix = "medal-"
        let last = Math.round(this.score / 10)
        last = last > 3 ? 3 : last

        return prefix + last
    }

    replayButtomRect() {
        let r = {
            x: this.playX,
            y: this.playY,
            w: 116,
            h: 70,
        }
        return r
    }

}
