function MySwiper(option) {
    this.init(option)
    this.generateTabs()

    this.animateTimer = null
    this.step = 30
    this.rightBtn.onclick = function () {
        this.animate(this.bannerList, -600)
    }.bind(this)
}

MySwiper.prototype.init = function (option) {
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

MySwiper.prototype.generateTabs = function () {
    for (let i = 0, len = this.bannerList.children.length - 1; i < len; i++) {
        let tab = document.createElement('span')
        tab.indexTab = i
        tab.innerHTML = tab.indexTab + 1
        tab.className = !tab.indexTab ? 'activeTab' : ''
        this.tabs.appendChild(tab)
    }
}

MySwiper.prototype.animate = function (obj, target) {
    clearInterval(this.animateTimer)
    let self = this
    this.animateTimer = setInterval(() => {
        let bannerPos = obj.offsetLeft
        step = bannerPos < target ? this.step : -this.step
        if (Math.abs(bannerPos - target) >= Math.abs(this.step)) {
            bannerPos = bannerPos + step
            obj.style.left = bannerPos + 'px'
        } else {
            obj.style.left = target + 'px'
            clearInterval(this.animateTimer)
        }
    }, 15);
}

let swiper = new MySwiper({
    el: document.getElementById('swiper')
})