let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d')

// 绘制实心矩形，设置颜色
// ctx.fillStyle = '#f00' // 填充颜色
// ctx.fillRect(0, 0, 200, 200) // 会只是心巨星

// 绘制空心矩形，设置边界填充颜色
// ctx.strokeStyle = '#f00' // 填充颜色
// ctx.strokeRect(0, 0, 200, 200) // 绘制空心矩形

// shadowBlur,shadowColor,shadowOffsetX,shadowOffsetY: 添加shadow，设置shadow位置
// ctx.shadowBlur = 20
// ctx.shadowColor = 'black'
// ctx.shadowOffsetX = 20
// ctx.shadowOffsetY = 20
// ctx.fillStyle = 'blue'
// ctx.fillRect(20, 20, 200, 200)
// // 空心添加shadow无效果
// ctx.strokeStyle = 'blue'
// ctx.strokeRect(20, 20, 200, 200)

// createLinearGradient: 添加线性渐变
// let grd = ctx.createLinearGradient(0, 0, 200, 200)
// grd.addColorStop(0, 'red')
// grd.addColorStop(0.4, 'green')
// grd.addColorStop(1, 'blue')
// ctx.fillStyle = grd
// ctx.fillRect(0, 0, 200, 200)
// // 环形渐变
// // ctx.strokeStyle = grd
// // ctx.strokeRect(0, 0, 200, 200)

// createRadialGradient: 环形渐变
// let grd = ctx.createRadialGradient(100, 100, 50, 100, 100, 100)
// grd.addColorStop(0, 'red')
// grd.addColorStop(0.4, 'green')
// grd.addColorStop(1, 'blue')
// ctx.fillStyle = grd
// ctx.fillRect(0, 0, 200, 200)

// createPattern: 设置指定方向的重复元素
// let img = document.getElementById('lamp')
// let pat = ctx.createPattern(img, 'repeat')
// ctx.fillStyle = pat
// ctx.rect(0, 0, 200, 200)
// ctx.fill()

// lineCap: (round,butt,square)设置或返回线条的结束端点样式
// lineWidth: 设置线宽
// ctx.beginPath()
// // ctx.lineCap = 'round' // 圆形
// // ctx.lineCap='butt' // 平
// ctx.lineCap = 'square' // 线尾添加正方形线帽
// ctx.lineWidth = '10'
// ctx.moveTo(20, 20)
// ctx.lineTo(400, 20)
// ctx.lineTo(400, 400)
// // ctx.lineTo(20, 20)
// ctx.stroke()
// // ctx.fill()

// lineJoin：(bevel,round,miter)两条线交汇处设置圆角/尖角
// ctx.beginPath()
// ctx.lineWidth = '10'
// // ctx.lineJoin = 'round' // 圆角
// // ctx.lineJoin = 'bevel' // 斜角
// ctx.lineJoin = 'miter' // 尖角
// ctx.moveTo(20, 20)
// ctx.lineTo(100, 50)
// ctx.lineTo(20, 100)
// ctx.stroke()

// miterLimit: 设置或返回最大斜接长度
// ctx.beginPath()
// ctx.lineWidth = 10
// ctx.lineJoin = 'miter'
// ctx.miterLimit = 4
// ctx.moveTo(20, 20)
// ctx.lineTo(50, 27)
// ctx.lineTo(20, 34)
// ctx.stroke()
// // ctx.fill()

// rect(): 创建矩形
// ctx.beginPath()
// ctx.lineWidth = 10
// ctx.lineJoin = 'round'
// ctx.rect(20, 20, 150, 100)
// ctx.stroke()
// // ctx.fill()

// fillRect(): 创建被填充矩形
// ctx.beginPath()
// ctx.fillRect(20, 20, 180, 180)

// clearRect(): 给定矩形内清除指定元素
// ctx.beginPath()
// ctx.fillStyle = 'red'
// ctx.fillRect(20, 20, 180, 180)
// ctx.clearRect(40, 40, 80, 80)

// closePath(): 创建从当前点回到起点的路径
// ctx.beginPath()
// ctx.moveTo(20, 20)
// ctx.lineTo(100, 20)
// ctx.lineTo(100, 100)
// ctx.closePath()
// // ctx.stroke()
// ctx.fill()

// clip(): 裁剪区域
// ctx.beginPath()
// ctx.fillStyle = 'red'
// ctx.rect(20, 20, 200, 200)
// ctx.fill()
// ctx.clip()
// ctx.fillStyle = 'green'
// ctx.fillRect(50, 50, 50, 50)

// quadraticCurveTo(cx,cy,x,y): 二次贝塞尔曲线
// ctx.beginPath()
// ctx.moveTo(20, 20)
// ctx.quadraticCurveTo(20, 100, 200, 20)
// // ctx.fill()
// ctx.stroke()

// bezierCurveTo(cx1,cy1,cx2,cy2,x,y): 三次贝塞尔曲线
// ctx.beginPath()
// ctx.moveTo(20, 20)
// ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
// // ctx.fill()
// ctx.stroke()

// arc(x,y,r,start,end,bool): 绘制圆弧
// ctx.beginPath()
// ctx.arc(100, 100, 50, 0, 1.5 * Math.PI, true)
// // ctx.fill()
// ctx.stroke()

// // arcTo(x1,y1,x2,y2,r): 创建两条切线之间的弧线
// ctx.beginPath()
// ctx.moveTo(20, 20)
// ctx.lineTo(100, 20)
// ctx.arcTo(150, 20, 150, 70, 50)
// ctx.lineTo(150, 120)
// // ctx.fill()
// ctx.stroke()

// isPointInPath(x,y): 如果指定的点位于当前路径中返回true
// ctx.beginPath()
// ctx.rect(20, 20, 200, 200)
// ctx.stroke()
// // ctx.fill()
// if (ctx.isPointInPath(20, 50)) {
// console.log(true)
// } else {
// console.log(false)
// }

// scale: 缩放当前绘图
// ctx.strokeRect(20, 20, 60, 60)
// ctx.scale(2, 2)
// ctx.strokeRect(10, 10, 60, 60)
// ctx.arc(100, 100, 50, 0, 2 * Math.PI)
// ctx.stroke()
// ctx.beginPath()
// ctx.scale(2, 2)
// ctx.arc(100, 100, 50, 0, 2 * Math.PI)
// ctx.stroke()

// rotate(): 旋转当前图形
// ctx.strokeRect(20, 20, 100, 50)
// ctx.rotate(30 * Math.PI / 180)
// ctx.strokeRect(20, 20, 100, 50)

// translate(): 重新映射画布的(0,0)位置
// ctx.fillRect(20,20,100,100)
// ctx.translate(120,120)
// ctx.fillRect(0,0,100,100)
// ctx.fillRect(20,20,100,100)

// transform(): 允许您缩放、旋转、移动并倾斜当前的环境
// ctx.fillStyle = 'yellow'
// ctx.fillRect(0, 0, 250, 100)
// ctx.transform(1, 0.5, -0.5, 1, 30, 10)
// ctx.fillStyle = 'red'
// ctx.fillRect(0, 0, 250, 100)
// ctx.transform(1, 0.5, -0.5, 1, 30, 10)
// ctx.fillStyle = 'blue'
// ctx.fillRect(0, 0, 250, 100)

// setTransform(): 重置前一个变换矩阵然后构建新的矩阵
// ctx.fillStyle = 'yellow'
// ctx.fillRect(0, 0, 250, 100)
// ctx.setTransform(1, 0.5, -0.5, 1, 30, 10)
// ctx.fillStyle = 'red'
// ctx.fillRect(0, 0, 250, 100)
// ctx.setTransform(1, 0.5, -0.5, 1, 30, 10)
// ctx.fillStyle = 'blue'
// ctx.fillRect(0, 0, 250, 100)

// font: 绘制文字
// ctx.font = 'italic small-caps bold 30px arial'
// ctx.fillText('hello world', 100, 50)

// fillText(),strokeText(): 绘制文本
// ctx.font = "20px Georgia"
// // ctx.fillText('hello world', 10, 50)
// ctx.strokeText('hello world', 10, 50)
// ctx.font = '30px Verdana'
// let grd = ctx.createLinearGradient(0, 0, canvas.width, 0)
// grd.addColorStop(0, 'yellow')
// grd.addColorStop(0.5, 'blue')
// grd.addColorStop(1, 'red')
// // ctx.fillStyle = grd
// // ctx.fillText('w3school.com.con', 10, 90)
// ctx.strokeStyle = grd
// ctx.strokeText('w3school.com.con', 10, 90)

// measureText(): 返回包含指定文本宽度的对象
// ctx.font = '30px Arial'
// let txt = 'hello world'
// ctx.fillText('width:' + ctx.measureText(txt).width, 10, 50)
// ctx.fillText(txt, 10, 100)
// ctx.strokeText(txt, 50, 150)

// textAlign: 根据锚点返回文本位置
// ctx.strokeStyle = 'blue'
// ctx.moveTo(200, 20)
// ctx.lineTo(200, 200)
// ctx.stroke()
// ctx.font = '15px Arial'
// ctx.textAlign = 'start'
// ctx.fillText('textAlign=start', 200, 60)
// ctx.textAlign = 'end'
// ctx.fillText('textAlign=end', 200, 90)
// ctx.textAlign = 'center'
// ctx.fillText('textAlign=center', 200, 120)
// ctx.textAlign = 'left'
// ctx.fillText('textAlign=left', 200, 150)
// ctx.textAlign = 'right'
// ctx.fillText('textAlign=right', 200, 180)

// textBaseline: 设置当前绘制文本时的文本基线
// ctx.strokeStyle = 'blue'
// ctx.moveTo(20, 100)
// ctx.lineTo(500, 100)
// ctx.stroke()
// ctx.font = '20px Arial'
// ctx.textBaseline = 'top'
// ctx.fillText('top', 50, 100)
// ctx.textBaseline = 'middle'
// ctx.fillText('middle', 80, 100)
// ctx.textBaseline = 'bottom'
// ctx.fillText('bottom', 180, 100)
// ctx.textBaseline = 'alphabetic'
// ctx.fillText('Alphabetic', 240, 100)
// ctx.textBaseline = 'hanging'
// ctx.fillText('hanging', 320, 100)

// drawImage(): 向画布上绘制图像
// let img = document.getElementById('drawImg')
// img.onload = function () {
// // ctx.drawImage(img, 20, 20, 300, 300, 10, 10, 240, 200)
// ctx.drawImage(img, 10, 10, 240, 200)
// }

// imageData: 返回image信息数据width/height
// let imageData = ctx.createImageData(100,100)
// ctx.putImageData(imageData,10,10);

// ctx.save(): 保存画布当前状态
// ctx.fillStyle='#f00';
// ctx.fillRect(0,0,30,30);
// ctx.fillStyle='#0F0';
// ctx.fillRect(35,0,30,30);
// ctx.fillStyle='#00f';
// ctx.fillRect(75,0,30,30);

// ctx.fillStyle='#f00';
// ctx.fillRect(0,0,30,30);
// //这里重新把30,30定为坐标系原点
// ctx.translate(30,30)
// ctx.fillStyle='#0F0';
// ctx.fillRect(35,0,30,30);
// ctx.fillStyle='#00f';
// ctx.fillRect(75,0,30,30);

ctx.fillStyle='#f00';
ctx.fillRect(0,0,30,30);
//变换坐标系之前先保存画布状态
ctx.save();
//这里重新把30,30定为坐标系原点
ctx.translate(30,30)
ctx.fillStyle='#0F0';
ctx.fillRect(35,0,30,30);
//恢复画布之前状态再画
ctx.restore();
ctx.fillStyle='#00f';
ctx.fillRect(75,0,30,30)