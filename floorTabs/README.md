简单楼层导航

------
    封装核心运动函数，实现楼层导航
```javascript
// 缓动动画--核心函数
animate(obj, target) {
    clearInterval(this.animateTimer)
    this.animateTimer = setInterval(() => {
        let curPos = obj.scrollTop,
            step = curPos < target ? this.step : -this.step
        if (Math.abs(curPos - target) >= Math.abs(this.step)) {
            curPos = curPos + step
            obj.scrollTop = curPos
        } else {
            obj.scrollTop = target
            clearInterval(this.animateTimer)
        }
    }, 15);
}
```
        主要通过使用数组初始化存储每个区域滑块的偏移高度offsetTop
        每次点击对应的将外部容器的scrollTop设置为对应的上述offsetTop即可
        源码比较简单，可以按照自己需求改写