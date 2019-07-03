1.简单滚动轮播图

-----
	通过封装运动函数，实现简单轮播图
```javascript
// 运动函数封装
animate(obj, target) {
    clearInterval(this.animateTimer)
    this.animateTimer = setInterval(() => {
        let bannerPos = obj.offsetLeft,
            step = bannerPos < target ? this.step : -this.step
        if (Math.abs(bannerPos - target) >= Math.abs(step)) {
            bannerPos = bannerPos + step
            obj.style.left = bannerPos + 'px'
        } else {
            obj.style.left = target + 'px'
            clearInterval(this.animateTimer)
        }
    }, 15);
}
```

2.3D旋转木马轮播图
```
    主要思路：利用数组的pop(),push(),shift(),unshift()方法，通过改变数组元素顺序，配合CSS3过渡实现轮播效果
```
```javascript
// 关键函数
addStyle() {
    for (let i = 0, len = this.inner.children.length; i < len; i++) {
        this.inner.children[i].style.cssText = ((JSON.stringify(this.json[i])).replace(/{|}|"|'/g, '')).replace(/,/g, ';');
        this.inner.children[i].style.transition = 'all 0.5s';
    }
}

// 数组结构
[
    { // 图1
        width: '500px',
        height: '260px',
        top: '70px',
        left: '150px',
        'z-index': 5,
        opacity: 1,
    },
    { // 图2
        width: '370px',
        height: '200px',
        top: '50px',
        left: '20px',
        'z-index': 4,
        opacity: 0.8,
    },
    { // 图3
        width: '270px',
        height: '150px',
        top: '20px',
        left: '50px',
        'z-index': 3,
        opacity: 0.4,
    },
    { // 图4
        width: '270px',
        height: '150px',
        top: '20px',
        right: '50px',
        'z-index': 1,
        opacity: 0.4,
    },
    { // 图5
        width: '370px',
        height: '200px',
        top: '50px',
        right: '20px',
        'z-index': 2,
        opacity: 0.8,
    },
]
```

后续持续更新其他~~~