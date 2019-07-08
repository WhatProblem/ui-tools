function Parabola(option) {
    this.btn = option.btn
    this.cart = option.cart
    this.step = option.step
    this.startX = option.btn.getBoundingClientRect().right
    this.startY = option.btn.getBoundingClientRect().bottom
    this.endX = option.cart.offsetLeft
    this.endY = option.cart.offsetTop
    this.curve = null // 曲率a,y=aX^2
    this.pointer = null // 小球

    this.animateTimer = null

    this.init()
    this.doEvent()
}

Parabola.prototype.init = function () {
    let pointer = document.createElement('div')
    pointer.classList.add('pointer')
    this.pointer = pointer
}

Parabola.prototype.doEvent = function () {
    this.btn.onclick = (e) => {
        let xAxis = this.endX - this.startX,
            yAxis = this.endY - this.startY,
            curve = yAxis / (xAxis ^ 2)
        this.curve = curve
        this.pointer.style.left = this.startX + 'px'
        this.pointer.style.top = this.startY + 'px'
        document.body.appendChild(this.pointer)
        this.animate(this.pointer, xAxis)

    }
}

Parabola.prototype.animate = function (obj, target) {
    clearInterval(this.animateTimer)
    this.animateTimer = setInterval(() => {
        let pointerX = obj.offsetLeft,
            pointerY = obj.offsetTop,
            step = pointerX < target ? this.step : -this.step
        if (Math.abs(pointerX - target) >= Math.abs(this.step)) {
            pointerX = (pointerX - this.startX) + step
            pointerY = this.curve * (pointerX ^ 2)
            obj.style.left = this.startX + pointerX + 'px'
            obj.style.top = this.startY + pointerY + 'px'
        } else {
            obj.style.left = this.endX + 'px'
            obj.style.top = this.endY + 'px'
            clearInterval(this.animateTimer)
            document.body.removeChild(this.pointer)
        }
    }, 15);
}

let parabola = new Parabola({
    btn: document.querySelector('.btn'),
    cart: document.querySelector('.cart'),
    step: 30,
})