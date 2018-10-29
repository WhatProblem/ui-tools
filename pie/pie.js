// 构造函数
function Circle(options) {
  this.el = document.querySelector(options.el);
  this.rSvg = options.rSvg / 2; // 注意此处是宽的一半
  this.r = options.r;
  this.guideLine = options.guideLine;
  this.guideWidth = options.guideWidth;
  this.guideR = options.guideR;
  this.rCover = options.rCover;
  this.rDeparture = options.rDeparture;
  this.ids = options.ids;
  this.textDis = options.textDis;
  this.colors = options.colors;
  this.percent = options.percent;
  this.texts = options.texts;

  this.drawCircle();
}

/**
* NOTE: 默认定义svg宽度是600
*/
Circle.prototype.drawCircle = function () {
  let startX = this.rSvg + this.r;
  let startY = this.rSvg;
  startAngle = 0;
  for (let i = 0; i < this.percent.length; i++) {
    // 绘制底层扇形
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('style', `fill:${this.colors[i]};stroke:white;stroke-width:2`);
    startAngle = startAngle + this.percent[i] * 2 * Math.PI;
    let X = this.rSvg + this.r * Math.cos(startAngle);
    let Y = this.rSvg + this.r * Math.sin(startAngle);
    path.setAttribute('d', `M${startX} ${startY} A${this.r} ${this.r}, 0, 0, 1,${X} ${Y} L${this.rSvg} ${this.rSvg} Z`);
    path.setAttribute('data-ids', this.ids[i]);
    path.addEventListener('click', (evt) => {
      console.log(evt.target.dataset.ids);
      window.location.href = "http://www.baidu.com";
    })
    this.el.appendChild(path);

    // 绘制直线
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // line.setAttribute('style', `x1:300;y1:300;x2:${startX}+10;y2:${startY}+10;stroke:black;stroke-width:2`);
    line.setAttribute('x1', this.rSvg);
    line.setAttribute('y1', this.rSvg);
    line.setAttribute('style', `stroke:${this.colors[i]};stroke-width:${this.guideWidth}`);
    let X1 = this.rSvg + (this.r + this.guideLine) * Math.cos(startAngle - this.rDeparture);
    let Y1 = this.rSvg + (this.r + this.guideLine) * Math.sin(startAngle - this.rDeparture);
    line.setAttribute('x2', X1);
    line.setAttribute('y2', Y1);
    this.el.appendChild(line);

    // 绘制引导线圆圈
    let guideCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    guideCircle.setAttribute('style', `cx:${X1};cy:${Y1};r:${this.guideR};fill:${this.colors[i]};`);// 控制文字颜色
    this.el.appendChild(guideCircle);

    // 绘制文字
    let guideText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    let X2 = this.rSvg + (this.r + this.guideLine + this.textDis) * Math.cos(startAngle - this.rDeparture);
    let Y2 = this.rSvg + (this.r + this.guideLine + this.textDis) * Math.sin(startAngle - this.rDeparture);
    guideText.setAttribute('style', `fill: ${this.colors[i]}; font - size: 14`);
    guideText.setAttribute('x', X2);
    guideText.setAttribute('y', Y2);
    if ((startAngle >= 0 && startAngle < Math.PI / 2) || (startAngle >= Math.PI * 3 / 2 && startAngle < Math.PI * 2)) {
      guideText.setAttribute('text-anchor', 'start');
    } else if (startAngle >= Math.PI / 2 && startAngle < Math.PI * 3 / 2) {
      guideText.setAttribute('text-anchor', 'end');
    }
    guideText.setAttribute('id', this.ids[i]);

    let textNode = document.createTextNode(this.texts[i]);
    guideText.appendChild(textNode);
    this.el.appendChild(guideText);

    // 重定位起始坐标
    startX = X;
    startY = Y;
  }

  // 白色圆形遮罩层
  let coverCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  coverCircle.setAttribute('style', `cx: ${this.rSvg}; cy: ${this.rSvg}; r: ${this.rCover}; fill: white; `);
  this.el.appendChild(coverCircle);
}

window.onload = function () {
  let setWidth = document.documentElement.clientWidth;
  let mySvg = document.querySelector('#svg');
  mySvg.setAttribute('width', setWidth);
  mySvg.setAttribute('height', 0.8 * setWidth);

  new Circle({
    el: '#svg', // svg元素
    rSvg: setWidth, // 默认定义svg的宽高--默认为正方形
    r: 0.15 * setWidth, // 圆环的半径
    guideLine: 10, // 引导线长
    guideWidth: 2, // 引导线宽
    guideR: 5, // 引导线球体半径
    textDis: 25, // 文字距离引导球心距离
    rCover: 0.08 * setWidth, // 内部遮罩圆的半径
    rDeparture: 0.04, // 偏离分割白线的程度
    colors: ['red', 'green', 'blue', 'purple', 'yellow', 'orange', 'darkblue', 'pink', 'darkred'], // 饼图及其颜色
    ids: ['idOne', 'idTwo', 'idThree', 'idFour', 'idFive', 'idSix', 'idSeven', 'idEight', 'idNine'], // 为每个区域配置id--用于点击
    percent: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], // 占比
    texts: ['text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8', 'text9'] // 指示文字
  });
}
