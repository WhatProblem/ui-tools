/**
* 滑动构造函数
* @param {json, el, childEl} option 数组对象，父节点，子节点
*/
function MySwiper(option) {
  this.json = option.json;
  this.interval = option.interval;
  this.el = document.querySelector(option.el);
  this.childEl = document.querySelectorAll(option.childEl);
  this.startPoint = 0;
  this.endPoint = 0;
  this.ctrlFlag = true;

  this.el.addEventListener('touchstart', (e) => {
    this.startPoint = e.changedTouches[0]['pageY'];
  })

  this.el.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });

  this.el.addEventListener('touchend', e => {
    this.endPoint = e.changedTouches[0]['pageY'];
    let dis = this.endPoint - this.startPoint;
    if (dis < 0) {
      if (this.ctrlFlag) {
        this.ctrlFlag = false;
        this.json.unshift(this.json.pop());
        this.initFactory();
      }
    } else if (dis > 0) {
      if (this.ctrlFlag) {
        this.ctrlFlag = false;
        this.json.push(this.json.shift());
        this.initFactory();
      }
    }
  })
  this.initFactory();
}

/**
* 动画控制
*/
MySwiper.prototype.initFactory = function () {
  let json = this.json;
  let el = this.el;
  let childEl = this.childEl;

  for (let i in json) {
    childEl.forEach((item, index) => {
      if (index == i) {
        this.addStyle(item, json[i]);
      }
    })
  }
}

MySwiper.prototype.addStyle = function (item, json) {
  item.style.cssText = ((JSON.stringify(json)).replace(/{|}|"|'/g, '')).replace(/,/g, ';');
  item.style.transition = 'all ' + this.interval;
  item.style.zIndex = json['zIndex'];
  this.ctrlFlag = true;
}

let options = {
  json: [
    {//图1
      top: '0rem',
      left: '0rem',
      width: '20rem',
      height: '12rem',
      zIndex: 6,
      opacity: 1,
      background: '#f00'
    },
    {//图2
      top: '8rem',
      left: '2rem',
      width: '20rem',
      height: '12rem',
      zIndex: 5,
      opacity: 1,
      background: '#ff0'
    },
    {//图3
      top: '16rem',
      left: '4rem',
      width: '20rem',
      height: '12rem',
      zIndex: 4,
      opacity: 1,
      background: '#f0f'
    },
    {//图4
      top: '24rem',
      left: '6rem',
      width: '20rem',
      height: '12rem',
      zIndex: 3,
      opacity: 1,
      background: '#00f'
    },
    {//图5
      top: '32rem',
      left: '8rem',
      width: '20rem',
      height: '12rem',
      zIndex: 2,
      opacity: 1,
      background: '#0f0'
    },
    {//图6
      top: '32rem',
      left: '8rem',
      width: '20rem',
      height: '12rem',
      zIndex: 1,
      opacity: 1,
      background: '#0f0'
    },
    {//图7
      top: '32rem',
      left: '8rem',
      width: '20rem',
      height: '12rem',
      zIndex: 1,
      opacity: 1,
      background: '#0f0'
    },
    {//图8
      top: '32rem',
      left: '8rem',
      width: '20rem',
      height: '12rem',
      zIndex: 1,
      opacity: 1,
      background: '#0f0'
    }
  ],
  el: '#container',
  childEl: '.content',
  interval: '1s' // 自定义时间
};

new MySwiper(options);