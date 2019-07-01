class MySwiper {
    constructor(option) {
        this.init(option)
        this.generateTabs()

        this.animateTimer = null // 滑动动画定时器
        this.activeIndex = 0 // 当前展示图片的下标
        this.step = 30
        this.autoTimer = null
        this.autoPlay()
        this.doEvent()
    }

    init(option) {
        this.el = option.el
        this.bannerList = this.el.children[0]
        this.cloneOne = this.bannerList.children[0].cloneNode(true)
        this.bannerList.appendChild(this.cloneOne)
        this.child = this.bannerList.children[0]
        this.childLen = this.bannerList.children.length
        this.tabs = this.el.children[1]
        this.leftBtn = this.el.children[2].children[0]
        this.rightBtn = this.el.children[2].children[1]
        this.wid = this.child.offsetWidth
        this.high = this.child.offsetHeight
        this.bannerList.style.width = this.wid * this.childLen + 'px'
    }

    generateTabs() {
        for (let i = 0, len = this.bannerList.children.length - 1; i < len; i++) {
            let tab = document.createElement('span')
            tab.indexTab = i
            tab.innerHTML = tab.indexTab + 1
            tab.className = !tab.indexTab ? 'activeTab' : ''
            this.tabs.appendChild(tab)
        }
    }

    autoPlay() {
        this.autoTimer = setInterval(() => {
            if (this.activeIndex >= this.childLen - 1) {
                this.activeIndex = 0
                this.bannerList.style.left = 0 + 'px'
            }
            this.activeIndex++
            this.animate(this.bannerList, -this.wid * this.activeIndex)
            this.ctrlTabs()
        }, 1000);
    }

    doEvent() {
        let self = this
        this.rightBtn.onclick = function () {
            clearInterval(self.animateTimer)
            if (self.activeIndex >= self.childLen - 1) {
                self.activeIndex = 0
                self.bannerList.style.left = 0 + 'px'
            }
            self.activeIndex++
            self.animate(self.bannerList, -self.wid * self.activeIndex)
            self.ctrlTabs()
        }
        this.leftBtn.onclick = function () {
            clearInterval(self.animateTimer)
            if (self.activeIndex <= 0) {
                self.bannerList.style.left = -self.wid * (self.childLen - 1) + 'px'
                self.activeIndex = self.childLen - 1
            }
            self.activeIndex--
            self.animate(self.bannerList, -self.wid * self.activeIndex)
            self.ctrlTabs()
        }
        this.el.onmouseover = function () {
            clearInterval(self.autoTimer)
            self.autoTimer = null
        }

        this.el.onmouseout = function () {
            self.autoPlay()
        }

        for (let i = 0, len = this.tabs.children.length; i < len; i++) {
            this.tabs.children[i].onclick = function () {
                clearInterval(self.animateTimer)
                for (let i = 0, len = self.tabs.children.length; i < len; i++) {
                    self.tabs.children[i]['className'] = ''
                }
                this.className = 'activeTab'
                self.activeIndex = this.indexTab
                self.animate(self.bannerList, -self.wid * self.activeIndex)
            }
        }
    }
    ctrlTabs() {
        for (let i = 0, len = this.tabs.children.length; i < len; i++) {
            this.tabs.children[i]['className'] = ''
        }
        for (let i = 0, len = this.tabs.children.length; i < len; i++) {
            if (this.activeIndex === this.tabs.children[i]['indexTab']) {
                this.tabs.children[i]['className'] = 'activeTab'
            }
            if (this.activeIndex === this.childLen - 1) {
                this.tabs.children[0]['className'] = 'activeTab'
            }
        }
    }
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
}

let swiper = new MySwiper({
    el: document.getElementById('swiper')
})