
function Curve(options) {
  this.el = document.querySelector(options.el);
  this.el.setAttribute('width', options.elWidth);
  this.el.setAttribute('height', options.elHeight)
  this.elArrow = document.querySelector(options.elArrow);
  this.elWidth = options.elWidth;
  this.elHeight = options.elHeight;
  this.textSpace = options.textSpace;
  this.xColor = options.xColor;
  this.xWid = options.xWid;
  this.xaliasLong = options.xaliasLong;
  this.xaliasWid = options.xaliasWid;
  this.yColor = options.yColor;
  this.yWid = options.yWid;
  this.arrowWid = options.arrowWid;
  this.arrowHei = options.arrowHei;
  this.arrowWidth = options.arrowWidth;
  this.arrowHeight = options.arrowHeight;
  this.arrowColor = options.arrowColor;
  this.textColor = options.textColor;
  this.textSize = options.textSize;
  this.oText = options.oText;
  this.xText = options.xText;
  this.yText = options.yText;
  this.xTextDis = options.xTextDis;
  this.yTextDis = options.yTextDis;

  this.drawArrow();
  this.drawLineAlias();
  this.drawLine();
  this.drawText();
}

// 绘制坐标轴
Curve.prototype.drawLineAlias = function () {
  // X轴
  let lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineX.setAttribute('style', `stroke:${this.xColor};stroke-width:${this.xWid};`);
  lineX.setAttribute('x1', `${this.textSpace}`);
  lineX.setAttribute('y1', `${this.elHeight - this.textSpace}`);
  lineX.setAttribute('x2', `${this.elWidth}`);
  lineX.setAttribute('y2', `${this.elHeight - this.textSpace}`);
  this.el.appendChild(lineX);
  // X轴箭头
  let tangleX = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  tangleX.setAttribute('points', `${this.elWidth},${this.elHeight - this.textSpace} ${this.elWidth - this.xaliasLong},${this.elHeight - this.textSpace + this.xaliasWid} ${this.elWidth - this.xaliasLong},${this.elHeight - this.textSpace - this.xaliasWid}`);
  tangleX.setAttribute('style', `fill:${this.xColor};`);
  this.el.appendChild(tangleX);
  // Y轴
  let lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineY.setAttribute('style', `stroke:${this.yColor};stroke-width:${this.yWid};`);
  lineY.setAttribute('x1', `${this.textSpace}`);
  lineY.setAttribute('y1', `${this.elHeight - this.textSpace}`);
  lineY.setAttribute('x2', `${this.textSpace}`);
  lineY.setAttribute('y2', `0`);
  this.el.appendChild(lineY);
  // Y轴箭头
  let tangleY = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  tangleY.setAttribute('points', `${this.textSpace},0 ${this.textSpace - this.xaliasWid},${this.xaliasLong} ${this.textSpace + this.xaliasWid},${this.xaliasLong}`);
  tangleY.setAttribute('style', `fill:${this.yColor};`);
  this.el.appendChild(tangleY);
}

// 箭头绘制
Curve.prototype.drawArrow = function () {
  this.elArrow.setAttribute('markerWidth', `${this.arrowWid}`);
  this.elArrow.setAttribute('markerHeight', `${this.arrowHei}`);
  // this.elArrow.setAttribute('style', `refx:0;refy:2;`);

  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M 0,0 L0,${this.arrowWidth} L${this.arrowHeight},${this.arrowWidth / 2} L0,0`);
  path.setAttribute('style', `fill:${this.arrowColor}`);
  this.elArrow.appendChild(path);
}

// 绘制曲线
Curve.prototype.drawLine = function () {
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M${this.textSpace},${this.elHeight - this.textSpace} C${this.textSpace},${this.elHeight - this.textSpace} 200,350 300,100`);
  path.setAttribute('style', `stroke:black;stroke-width:4;fill:none;marker-end:url(#myArrow)`);
  this.el.appendChild(path);

  let pathTwo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathTwo.setAttribute('d', `M${this.textSpace},${this.elHeight - this.textSpace} C${this.textSpace},${this.elHeight - this.textSpace} 200,360 300,200`);
  pathTwo.setAttribute('style', `stroke:#909090;stroke-width:4;fill:none;marker-end:url(#myArrow)`);
  this.el.appendChild(pathTwo);
}

// 绘制文字
Curve.prototype.drawText = function () {
  // 文字0
  let textOne = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textOne.setAttribute('style', `fill: ${this.textColor}; font-size: ${this.textSize}`);
  textOne.setAttribute('x', `${this.textSpace}`);
  console.log(this.elHeight - this.textSpace + this.textSize)
  textOne.setAttribute('y', `${this.elHeight - this.textSpace + this.textSize}`);
  let textNodeOne = document.createTextNode(this.oText);
  textOne.appendChild(textNodeOne);
  this.el.appendChild(textOne);

  // 文字100岁
  let textTwo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textTwo.setAttribute('style', `fill: ${this.textColor}; font-size: ${this.textSize}`);
  textTwo.setAttribute('x', `${this.xTextDis}`);
  textTwo.setAttribute('y', `${this.elHeight - this.textSpace + this.textSize}`);
  textTwo.setAttribute('text-anchor', 'end');
  let textNodeTwo = document.createTextNode(this.xText);
  textTwo.appendChild(textNodeTwo);
  this.el.appendChild(textTwo);

  // 文字100%
  let textThree = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textThree.setAttribute('style', `fill:${this.textColor}; font-size: ${this.textSize}`);
  textThree.setAttribute('x', `${this.textSpace}`);
  textThree.setAttribute('y', `${this.yTextDis}`);
  textThree.setAttribute('text-anchor', 'end');
  let textNodeThree = document.createTextNode(this.yText);
  textThree.appendChild(textNodeThree);
  this.el.appendChild(textThree);
}

let elWid = 400;
new Curve({
  el: '#curveSvg', // svg元素
  elArrow: '#myArrow', // 自定义箭头元素
  elWidth: elWid, // svg元素宽
  elHeight: elWid, // svg元素高
  textSpace: 40, // 边框与坐标轴之间的距离
  xColor: 'purple', // x-坐标轴的颜色
  xWid: 2, // x-轴的宽度
  xaliasLong: 10, // 箭头长度
  xaliasWid: 5, // 箭头宽度的一半 
  yColor: 'blue', // y-轴的颜色
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
  xTextDis: 260, // x-方向文字位置（范围0---elWidth）
  yTextDis: 50, // y-方向文字位置（0---elHeight）
  basicData:[[0,0],[]], // 基础数据
  searchData:[], // 查询数据
});