class FloorTabs {
    constructor(option) {
        this.el = option.el // 外部大容器
        this.step = option.step // 每次滚动步数
        this.tabs = option.el.children[0] // 可点击tabs
        this.floors = option.el.children[1] // 滚动容器
        this.offsetTopArr = [] // 存储每个区域的具体偏移量

        this.animateTimer = null // 运动函数定时器
        this.init()
        this.doEvent()

    }

    init() {
        for (let i = 0, len = this.floors.children.length; i < len; i++) {
            this.offsetTopArr.push(this.floors.children[i].offsetTop)
        }
        this.tabs.children[0]['classList'].add('active')
    }

    doEvent() {
        for (let i = 0, len = this.tabs.children.length; i < len; i++) {
            this.tabs.children[i].onclick = function () {
                for (let j = 0, leng = this.tabs.children.length; j < leng; j++) {
                    this.tabs.children[j]['classList'].remove('active')
                }
                this.tabs.children[i]['classList'].add('active')
                this.animate(this.floors, this.offsetTopArr[i])
            }.bind(this)
        }

        this.floors.addEventListener('scroll', e => {
            for (let i = 0, len = this.offsetTopArr.length; i < len; i++) {
                if (this.floors.scrollTop >= this.offsetTopArr[i]) {
                    for (let j = 0, leng = this.tabs.children.length; j < leng; j++) {
                        this.tabs.children[j]['classList'].remove('active')
                    }
                    this.tabs.children[i]['classList'].add('active')
                }
            }
        })
    }

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
}
let floorTabs = new FloorTabs({
    el: document.querySelector('.wrap'),
    step: 50
})