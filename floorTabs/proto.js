function FloorTabs(options) {
    this.options = options;
    this.elTabs = document.querySelector(this.options.elTabs);
    this.elFloor = document.querySelector(this.options.elFloor)
    this.offsetTopArr = []; // 存放每个内容的偏移底层高度
    this.canClick = true; // 可以点击
    this.timer = null; // 定时器

    this.getOffsetTop();
    this.addActive();
    this.elFloor.addEventListener('scroll', e => {
        this.addActive();
    });
    this.bindClick();
}

FloorTabs.prototype.addActive = function () {
    for (let i = 0; i < this.offsetTopArr.length; i++) {
        if (this.elFloor.scrollTop >= this.offsetTopArr[i]) {
            for (let j = 0; j < this.elTabs.children.length; j++) {
                this.elTabs.children[j].classList.remove("active");
            }
            this.elTabs.children[i].classList.add("active");
        }
    }
    console.log(this.offsetTopArr);
}

FloorTabs.prototype.bindClick = function () {
    for (let i = 0; i < this.elTabs.children.length; i++) {
        this.elTabs.children[i].addEventListener('click', e => {
            for (let j = 0; j < this.elTabs.children.length; j++) {
                this.elTabs.children[j].classList.remove('active');
            }
            this.elTabs.children[i].classList.add('active');
            let curScrollTop = this.elFloor.scrollTop;
            if (this.canClick) {
                this.scrollAnimate(curScrollTop, this.offsetTopArr[i]);
            }
        });
    }
}

FloorTabs.prototype.scrollAnimate = function (curTop, goalTop) {
    this.canClick = false;
    this.timer = setTimeout(() => {
        if (goalTop > curTop) {
            curTop += this.options.slideDistance;
            this.elFloor.scrollTop = curTop;
            this.scrollAnimate(curTop, goalTop);
        } else if (goalTop < curTop) {
            curTop -= this.options.slideDistance;
            this.elFloor.scrollTop = curTop;
            this.scrollAnimate(curTop, goalTop);
        } else {
            this.elFloor.scrollTop = goalTop;
            this.canClick = true;
            this.timer = null;
            return;
        }
    }, 1);
}

FloorTabs.prototype.getOffsetTop = function () {
    for (let i = 0; i < this.elFloor.children.length; i++) {
        this.offsetTopArr.push(this.elFloor.children[i]['offsetTop']);
    }
}

new FloorTabs({
    elTabs: '.tabs',
    elFloor: '.content',
    slideDistance: 10, // 每次滑动距离
});