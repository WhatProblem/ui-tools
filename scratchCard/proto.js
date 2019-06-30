function ScratchCard(option) {
    this.el = option.el
    this.ctx = option.el.getContext('2d')
    this.init()
    this.draw()
}

ScratchCard.prototype.init = function () {
    this.ctx.fillStyle = 'gray'
    this.ctx.rect(0, 0, 500, 300)
    this.ctx.fill()
}

ScratchCard.prototype.draw = function () {
    let self = this
    this.el.onmousedown = function(eve) {
        self.el.onmousemove = function (e) {
            // console.log(e)
            // console.log(e.clientX, e.clientY)
            let x = e.clientX,
                y = e.clientY
            self.ctx.clearRect(x, y, 10, 10)
        }
    }
    this.el.onmouseup = function() {
        self.el.onmousemove = null
    }
}

let scratch = new ScratchCard({
    el: document.getElementById('canvas')
})