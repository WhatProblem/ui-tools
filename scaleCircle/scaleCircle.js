function ScaleCircle(options) {
  this.el = document.querySelector(options.el); //定义svg元素
  this.el.setAttribute('width', options.bWidth); // 设置svg宽
  this.el.setAttribute('height', options.bWidth); // 设置svg高
  this.bWidth = options.bWidth / 2; // 背景画布的一半
  this.rCircle = options.rCircle; // 大圆环的半径
  this.rCover = options.rCover; // 覆盖层--小白圆的半径
  this.basicNum = options.basicNum; // 基础总统计数据
  this.scaleNum = options.scaleNum; // 配置输入的占比数据
  this.rColors = options.rColors; // 环形颜色
  this.rOpacity = options.rOpacity; // 环的透明度
  this.scaleColors = options.scaleColors; // 遮罩颜色
  this.scaleOpacity = options.scaleOpacity; // 遮罩区域透明度
  this.divideAngle = options.divideAngle; // 分割点角度
  this.rPointOne = options.rPointOne; // 引导球心距离圆环中心距离
  this.rPointTwo = options.rPointTwo; // 折线中间点距离环心距离
  this.rPoint = options.rPoint; // 引导球半径
  this.lineColor = options.lineColor; // 引导线颜色
  this.twoPointAngle = options.twoPointAngle; // 折线中间点的角度
  this.disLine = options.disLine; // 引导线中间点距离引导线左端点距离
  this.textTip = options.textTip; // 提示文字
  this.textColor = options.textColor; // 文字颜色
  this.textSize = options.textSize; // 文字大小


  this.drawCircle();
  this.drawCover();
  this.drawGuideLine();
}

// 圆环
ScaleCircle.prototype.drawCircle = function () {
  // 绘制底层圆环
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('style', `cx:${this.bWidth};cy:${this.bWidth};r:${this.rCircle}; fill:${this.rColors};opacity:${this.rOpacity}`);
  // 遮盖--圆环
  let coverCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  coverCircle.setAttribute('style', `cx:${this.bWidth};cy:${this.bWidth};r:${this.rCover}; fill:white;`);
  this.el.appendChild(circle);
  this.el.appendChild(coverCircle);
}

// 扇形
ScaleCircle.prototype.drawCover = function () {
  let cover = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // 占比--弧度
  let scaleAngle = (this.scaleNum / this.basicNum) * Math.PI * 2;
  console.log(scaleAngle);
  let X = this.bWidth + this.rCircle * Math.cos(scaleAngle);
  let Y = this.bWidth + this.rCircle * Math.sin(scaleAngle);
  if (scaleAngle <= Math.PI) {
    cover.setAttribute('d', `M${this.bWidth + this.rCircle} ${this.bWidth} A${this.rCircle} ${this.rCircle}, 0, 0, 1,${X} ${Y} L${this.bWidth} ${this.bWidth} Z`);
  } else if (scaleAngle > Math.PI) {
    cover.setAttribute('d', `M${this.bWidth + this.rCircle} ${this.bWidth} A${this.rCircle} ${this.rCircle}, 0, 1, 1,${X} ${Y} L${this.bWidth} ${this.bWidth} Z`);
  }
  let angles = this.divideAngle - 90 * scaleAngle / Math.PI;
  console.log(angles);
  cover.setAttribute('style', `stroke:white;stroke-width:1;fill:${this.scaleColors};opacity: ${this.scaleOpacity};transform-origin:${this.bWidth}px ${this.bWidth}px;transform:rotate(${angles}deg)`);
  this.el.appendChild(cover);
}

// 绘制直线
ScaleCircle.prototype.drawGuideLine = function () {
  // 第一个球形点
  const rPointOne = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const X = this.bWidth + this.rPointOne * Math.cos(this.divideAngle * Math.PI / 180);
  const Y = this.bWidth + this.rPointOne * Math.sin(this.divideAngle * Math.PI / 180);
  rPointOne.setAttribute('style', `cx:${X};cy:${Y};r:${this.rPoint}; fill:${this.lineColor};`);
  // 第二个点--折点
  const X1 = this.bWidth + this.rPointTwo * Math.cos(this.twoPointAngle * Math.PI / 180);
  const Y1 = this.bWidth + this.rPointTwo * Math.sin(this.twoPointAngle * Math.PI / 180);
  // 第三个点
  const X2 = X1 - this.disLine;
  const Y2 = Y1;
  // 绘制折线
  const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  linePath.setAttribute('d', `M${X} ${Y} L${X1} ${Y1} L${X2} ${Y2}`);
  linePath.setAttribute('style', `fill: transparent;stroke:${this.lineColor};stroke-width:2`);
  this.el.appendChild(rPointOne);
  this.el.appendChild(linePath);
  // 绘制文字
  let guideText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  guideText.setAttribute('style', `fill: ${this.textColor}; font-size: ${this.textSize}`);
  guideText.setAttribute('x', X2);
  guideText.setAttribute('y', Y2 - 5);
  let textNode = document.createTextNode(this.textTip);
  guideText.appendChild(textNode);
  this.el.appendChild(guideText);
}

// new ScaleCircle({
// el: '#scaleCircle', // svg元素
// bWidth: 500, // 背景正方形宽高
// rCircle: 150, // 底层大环半径--也是遮盖曾半径
// rCover: 75, // 内部遮盖小白圆
// basicNum: 100000, // 基数
// scaleNum: 30000, // 占比数量
// rColors: '#909090', // 环形颜色
// rOpacity: '0.7', // 环形透明度
// scaleColors: '#C8C8C8', // 遮罩颜色
// scaleOpacity: '0.8', // 不透明度

// divideAngle: 135, // 引导线角度--平分遮盖层
// rPointOne: 100, // 引导线圆球起点位置--以大圆为中心的半径
// rPoint: 10, // 引导球半径
// lineColor: 'black', // 引导线颜色
// rPointTwo: 175, // 引导线第二点位置--以大圆为中心的半径
// twoPointAngle: 135, // 第二个折点的角度
// disLine: 50, // 左边线端点距离折点距离

// textTip:'5490人', // 文字部分
// textColor: '#909090', // 文字颜色
// textSize: 14, // 文字大小
// });