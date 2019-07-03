class Slider3D {
    constructor(option) {
        this.el = option.el
        this.inner = option.el.children[0]
        this.leftBtn = option.el.children[1]['children'][0]
        this.rightBtn = option.el.children[1]['children'][1]
        this.json = option.json
        this.timer = null

        this.addStyle()
        this.autoPlay()
        this.doEvent()
    }

    autoPlay() {
        this.timer = setInterval(() => {
            this.json.push(this.json.shift())
            this.addStyle()
        }, 1000);
    }

    doEvent() {
        this.el.onmouseover = function () {
            clearInterval(this.timer)
            this.timer = null
        }.bind(this)
        this.el.onmouseout = function () {
            this.autoPlay()
        }.bind(this)
        this.rightBtn.onclick = function () {
            this.json.push(this.json.shift())
            this.addStyle()
        }.bind(this)
        this.leftBtn.onclick = function () {
            this.json.unshift(this.json.pop())
            this.addStyle()
        }.bind(this)
    }
    addStyle() {
        for (let i = 0, len = this.inner.children.length; i < len; i++) {
            this.inner.children[i].style.cssText = ((JSON.stringify(this.json[i])).replace(/{|}|"|'/g, '')).replace(/,/g, ';');
            this.inner.children[i].style.transition = 'all 0.5s';
        }
    }
}

let slider = new Slider3D({
    el: document.getElementById('slider'),
    json: [
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
})