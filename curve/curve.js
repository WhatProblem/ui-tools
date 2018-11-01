function Curve(options) {
  this.el = document.querySelector(options.el);
  this.el.setAttribute('width', options.option.elWidth);
  this.el.setAttribute('height', options.option.elHeight);
  this.elArrow = document.querySelector(options.elArrow);
  this.option = options.option;

  this.drawBg();
  this.drawArrow();
  this.drawLineAlias();
  this.drawLine();
  this.drawText();
}

// 绘制刻度背景
Curve.prototype.drawBg = function () {
  let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('style', `x:${this.option.textSpace};y:${this.option.elHeight - this.option.textSpace - this.option.scaleMark.scaleHei};width:${this.option.scaleMark.scaleWid};height:${this.option.scaleMark.scaleHei};fill:${this.option.scaleMark.scaleColor};`);
  this.el.appendChild(rect);

  // scale--刻度线条
  for (let i = 0; i < this.option.scaleMark.scaleNum; i++) {
    let scaleLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    scaleLine.setAttribute('style', `stroke:${this.option.scaleMark.scaleLineColor};stroke-width:${this.option.scaleMark.scaleLineWid};`);
    scaleLine.setAttribute('x1', `${this.option.textSpace}`);
    scaleLine.setAttribute('y1', `${this.option.elHeight - this.option.textSpace - i * this.option.scaleMark.scaleHei / this.option.scaleMark.scaleNum}`);
    scaleLine.setAttribute('x2', `${this.option.textSpace + this.option.scaleMark.scaleWid}`);
    scaleLine.setAttribute('y2', `${this.option.elHeight - this.option.textSpace - i * this.option.scaleMark.scaleHei / this.option.scaleMark.scaleNum}`);
    this.el.appendChild(scaleLine);
  }
}
// 绘制坐标轴
Curve.prototype.drawLineAlias = function () {
  // X轴
  let lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineX.setAttribute('style', `stroke:${this.option.xColor};stroke-width:${this.option.xWid};`);
  lineX.setAttribute('x1', `${this.option.textSpace}`);
  lineX.setAttribute('y1', `${this.option.elHeight - this.option.textSpace}`);
  lineX.setAttribute('x2', `${this.option.elWidth - this.option.wordDeparture}`);
  lineX.setAttribute('y2', `${this.option.elHeight - this.option.textSpace}`);
  this.el.appendChild(lineX);
  // X轴箭头
  let tangleX = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  tangleX.setAttribute('points', `${this.option.elWidth - this.option.wordDeparture},${this.option.elHeight - this.option.textSpace} ${this.option.elWidth - this.option.wordDeparture - this.option.xaliasLong},${this.option.elHeight - this.option.textSpace + this.option.xaliasWid} ${this.option.elWidth - this.option.wordDeparture - this.option.xaliasLong},${this.option.elHeight - this.option.textSpace - this.option.xaliasWid}`);
  tangleX.setAttribute('style', `fill:${this.option.xColor};`);
  this.el.appendChild(tangleX);
  // Y轴
  let lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineY.setAttribute('style', `stroke:${this.option.yColor};stroke-width:${this.option.yWid};`);
  lineY.setAttribute('x1', `${this.option.textSpace}`);
  lineY.setAttribute('y1', `${this.option.elHeight - this.option.textSpace}`);
  lineY.setAttribute('x2', `${this.option.textSpace}`);
  lineY.setAttribute('y2', `0`);
  this.el.appendChild(lineY);
  // Y轴箭头
  let tangleY = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  tangleY.setAttribute('points', `${this.option.textSpace},0 ${this.option.textSpace - this.option.xaliasWid},${this.option.xaliasLong} ${this.option.textSpace + this.option.xaliasWid},${this.option.xaliasLong}`);
  tangleY.setAttribute('style', `fill:${this.option.yColor};`);
  this.el.appendChild(tangleY);
}
// 箭头绘制
Curve.prototype.drawArrow = function () {
  this.elArrow.setAttribute('markerWidth', `${this.option.arrowWid}`);
  this.elArrow.setAttribute('markerHeight', `${this.option.arrowHei}`);
  // this.elArrow.setAttribute('style', `refx:0;refy:2;`);

  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M 0,0 L0,${this.option.arrowWidth} L${this.option.arrowHeight},${this.option.arrowWidth / 2} L0,0`);
  path.setAttribute('style', `fill:${this.option.arrowColor}`);
  this.elArrow.appendChild(path);
}
// 绘制曲线
Curve.prototype.drawLine = function () {
  // 数据处理
  let self = this;
  function deal(data) {
    let startPath = '';
    let startC = '';
    if (data.length % 3 === 0) {
      for (let i = 0; i < data.length / 3; i++) {
        data.slice(3 * i, (i + 1) * 3).forEach((item, index) => {
          startPath += ` ${self.option.textSpace + item[0]}, ${self.option.elHeight - self.option.textSpace - item[1]}`;
        })
        startC += ` C${startPath}`;
        startPath = '';
      }
    } else if (data.length % 3 === 1) {
      for (let i = 0; i < Math.floor(data.length / 3); i++) {
        data.slice(3 * i, (i + 1) * 3).forEach((item, index) => {
          startPath += ` ${self.option.textSpace + item[0]}, ${self.option.elHeight - self.option.textSpace - item[1]}`;
        })
        startC += ` C${startPath}`;
        startPath = '';
      }
      startC += ` L${self.option.textSpace + data[data.length - 1][0]},${self.option.elHeight - self.option.textSpace - data[data.length - 1][1]}`;
    } else if (data.length % 3 === 2) {
      for (let i = 0; i < Math.floor(data.length / 3); i++) {
        data.slice(3 * i, (i + 1) * 3).forEach((item, index) => {
          startPath += ` ${self.option.textSpace + item[0]}, ${self.option.elHeight - self.option.textSpace - item[1]}`;
        })
        startC += ` C${startPath}`;
        startPath = '';
      }
      startC += ` Q${self.option.textSpace + data[data.length - 2][0]},${self.option.elHeight - self.option.textSpace - data[data.length - 2][1]} ${self.option.textSpace + data[data.length - 1][0]},${self.option.elHeight - self.option.textSpace - data[data.length - 1][1]}`;
    }
    console.log(startC);
    return startC;
  }
  if (this.option.basicData.length) {
    let curvePath = '';
    let startPoint = '';
    for (let i = 0; i < this.option.basicData.length; i++) {
      if (this.option.basicData[i]['valueData']['length']) {
        curvePath = deal(this.option.basicData[i]['valueData']);

        startPoint = `${this.option.textSpace + this.option.basicData[i]['valueData'][0][0]},${this.option.elHeight - this.option.textSpace - this.option.basicData[i]['valueData'][0][1]}`;
        // this.option.basicData[i]['valueData'].forEach((item, index) => {
        // curvePath += ` ${this.option.textSpace + item[0]},${this.option.elHeight - this.option.textSpace - item[1]}`;
        // });


        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${startPoint} ${curvePath}`);
        path.setAttribute('style', `stroke:${this.option.basicData[i]['lineColor']};stroke-width:${this.option.basicData[i]['lineWidth']};fill:none;marker-end:url(#myArrow)`);
        this.el.appendChild(path);

        // 右边留白方块
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('style', `x:${this.option.elWidth - this.option.wordDeparture};y:${this.option.wordY + i * (this.option.rectSize + this.option.rectDis)};width:${this.option.rectSize};height:${this.option.rectSize};fill:${this.option.basicData[i]['lineColor']};`);
        this.el.appendChild(rect);

        // 右边留白文字
        let rectWord = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rectWord.setAttribute('style', `fill:${this.option.basicData[i]['lineColor']}; font-size: ${this.option.rectWordSize}`);
        rectWord.setAttribute('x', `${this.option.elWidth - this.option.wordDeparture + this.option.rectSize + 5}`);
        rectWord.setAttribute('y', `${this.option.wordY + i * (this.option.rectSize + this.option.rectDis) + this.option.rectSize * 0.75}`);
        let textRectOne = document.createTextNode(this.option.basicData[i]['title']);
        rectWord.appendChild(textRectOne);
        this.el.appendChild(rectWord);
        curvePath = '';
        startPoint = '';
      }
    }
  }
}
// 绘制文字
Curve.prototype.drawText = function () {
  // 文字0
  let textOne = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textOne.setAttribute('style', `fill: ${this.option.textColor}; font-size: ${this.option.textSize}`);
  textOne.setAttribute('x', `${this.option.textSpace}`);
  textOne.setAttribute('y', `${this.option.elHeight - this.option.textSpace + this.option.textSize}`);
  let textNodeOne = document.createTextNode(this.option.oText);
  textOne.appendChild(textNodeOne);
  this.el.appendChild(textOne);

  // 文字100岁
  let textTwo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textTwo.setAttribute('style', `fill: ${this.option.textColor}; font-size: ${this.option.textSize}`);
  textTwo.setAttribute('x', `${this.option.xTextDis}`);
  textTwo.setAttribute('y', `${this.option.elHeight - this.option.textSpace + this.option.textSize}`);
  textTwo.setAttribute('text-anchor', 'end');
  let textNodeTwo = document.createTextNode(this.option.xText);
  textTwo.appendChild(textNodeTwo);
  this.el.appendChild(textTwo);

  // 文字100%
  let textThree = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textThree.setAttribute('style', `fill:${this.option.textColor}; font-size: ${this.option.textSize}`);
  textThree.setAttribute('x', `${this.option.textSpace}`);
  textThree.setAttribute('y', `${this.option.yTextDis}`);
  textThree.setAttribute('text-anchor', 'end');
  let textNodeThree = document.createTextNode(this.option.yText);
  textThree.appendChild(textNodeThree);
  this.el.appendChild(textThree);
}
let wid = document.documentElement.clientWidth;
let elWid = wid;
new Curve({
  el: '#curveSvg', // svg元素
  elArrow: '#myArrow', // 自定义箭头元素
  option: {
    elWidth: elWid, // svg元素宽
    elHeight: elWid * 0.8, // svg元素高
    textSpace: 40, // 边框与坐标轴之间的距离
    xColor: '#929292', // x-坐标轴的颜色
    xWid: 2, // x-轴的宽度
    xaliasLong: 10, // 箭头长度
    xaliasWid: 5, // 箭头宽度的一半 
    yColor: '#929292', // y-轴的颜色
    yWid: 2, // y轴的宽度
    arrowWid: 10, // 曲线箭头宽--可视区域
    arrowHei: 10, // 曲线箭头高--可视区域
    arrowWidth: 4, // 曲线箭头宽度
    arrowHeight: 8, // 曲线箭头高度
    arrowColor: 'red', // 曲线箭头颜色
    textColor: '#000', // 文字颜色
    textSize: 14, // 文字大小
    oText: '0', // 文字“0”
    xText: '100岁', // x-坐标文字
    yText: '100%', // y-坐标文字
    xTextDis: elWid * 0.8 * 0.8, // x-方向文字位置（范围0---elWidth）
    yTextDis: elWid * 0.8 * 0.2, // y-方向文字位置（0---elHeight）
    wordDeparture: elWid * 0.2, // 右边文字留白宽度
    wordY: elWid * 0.8 * 0.3, // 留白文字距离顶端距离
    rectSize: 15, // 提示矩形的宽高
    rectDis: 5, // 方块间距
    rectWordSize: 14, // 矩形旁边文字大小
    scaleMark: { // 刻度线背景配置
      scaleNum: 10, // 刻度线数量
      scaleWid: elWid * 0.8 * 0.8, // 刻度背景宽度
      scaleHei: elWid * 0.6 * 0.8, // 刻度背景高度
      scaleColor: '#f0f0f0', // 刻度背景颜色
      scaleLineColor: '#fff', // 刻度线条颜色
      scaleLineWid: 2, // 刻度线条宽度
    },
    basicData: [ // 坐标数据
      {
        title: '正常值',
        lineColor: 'purple',
        lineWidth: 4,
        valueData: [[0, 0], [20, 3], [50, 10], [80, 25], [120, 40], [200, 156]]
      },
      {
        title: '比较值',
        lineColor: 'orange',
        lineWidth: 4,
        valueData: [[0, 0], [20, 2], [50, 20], [200, 180]]
      },
      {
        title: '测试值',
        lineColor: 'darkblue',
        lineWidth: 4,
        valueData: [[0, 0], [20, 10], [50, 35], [120, 90], [200, 210]]
      }
    ]
  }
});