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

2.后续持续更新其他~~~