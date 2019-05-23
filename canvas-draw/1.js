function Draw(opt) {
    this.canvas = opt.canvas
    this.ctx = opt.canvas.getContext('2d')
    this.num = opt.num
    this.btn = opt.btn // 按钮
    this._angle = 2 * Math.PI / opt.num // 扇形旋转角度
    this._circle = 2 * Math.PI / opt.num // 扇形角度
    this.init() // 绘制圆形
    this.clickEve()
}

Draw.prototype.init = function () {
    for (let i = 0; i < this.num; i++) {
        this.ctx.save() // 保存当前状态
        this.ctx.beginPath() // 开始绘制路径
        this.ctx.translate(200, 200) // 移动到圆心
        this.ctx.moveTo(0, 0)
        // 旋转扇形
        this.ctx.rotate(i * this._angle) // 圆弧旋转角度
        this.ctx.arc(0, 0, 200, 0, this._circle, false) // 绘制圆弧
        if (i % 2 === 0) {
            this.ctx.fillStyle = 'blue' // 填充颜色
        } else {
            this.ctx.fillStyle = 'yellow' // 填充颜色
        }
        this.ctx.fill() // 填充扇形
        this.ctx.lineWidth = 1 // 边框宽度
        this.ctx.strokeStyle = 'red' // 填充边框颜色
        this.ctx.stroke() // 绘制线条

        // 旋转文字
        this.ctx.save()
        this.ctx.rotate(this._circle / 2) // 文字基线旋转角度
        this.ctx.strokeStyle = "transparent" // 线条颜色
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(200, 0)
        this.ctx.stroke() // 绘制线条

        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = '#fff' // 文字颜色
        this.ctx.font = '16px sans-serif'
        this.ctx.fillText('ceshi', 100, 0) // 填充文字
        this.ctx.restore()
        this.ctx.restore()
    }
}

Draw.prototype.clickEve = function () {
    let self = this;
    this.btn.onclick = function () {
        self.canvas.style.transform = 'rotate(1800deg)';
    }
}
new Draw({
    canvas: document.getElementById('canvas'), // canvas对象
    num: 6, // 份数
    btn: document.querySelector('.btn')
})