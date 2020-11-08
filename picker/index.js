const DEMO_DATA = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']

class Picker {
	DEFAULT_DURATION = 200;
	MIN_DISTANCE = 10;

	// 惯性滑动思路:
	// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
	// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
	MOMENTUM_LIMIT_TIME = 100;
	MOMENTUM_LIMIT_DISTANCE = 15;
	supportsPassive = false;

	constructor(options = {}) {
		this.initValue(options)
		this._initValue(options)
		this.resetTouchStatus()
		this.initComputed(options)
		this.setEleStyle()

		this.onMounted()
	}

	// 私有变量
	_initValue(options) {
		this.offset = 0
		this.duration = 0
		this.options = this.initOptions
		this.direction = options.direction || 'vertical'
		this.deltaX = 0
		this.deltaY = 0
		this.offsetX = 0
		this.offsetY = 0

		this.startX = 0
		this.startY = 0

		this.moving = false
		this.startOffset = 0

		this.transitionEndTrigger = null // 滚动函数
		this.touchStartTime = 0 // 记录开始滑动时间
		this.momentumOffset = 0 // 记录开始滑动位置

		this.currentIndex = this.defaultIndex
	}

	// 初始化--用户变量
	initValue(options) {
		this.visibleItemCount = Number(options.visibleItemCount || 6) || 6
		this.itemPxHeight = Number(this.itemPxHeight) || 44
		this.initOptions = options.initOptions || DEMO_DATA
		this.readonly = options.readonly || false
		this.defaultIndex = Number(options.defaultIndex) || 0
	}

	// 根据传入变量--获取计算属性
	initComputed(options) {
		// 外层容器高度
		this.wrapHeight = this.itemPxHeight * this.visibleItemCount
		this.maskStyle = { backgroundSize: `100% ${(this.wrapHeight - this.itemPxHeight) / 2}px` }
		this.frameStyle = { height: `${this.itemPxHeight}px` }

		this.count = this.options.length
		this.baseOffset = (this.itemPxHeight * (this.visibleItemCount - 1)) / 2
		// 内层元素高度计算
		this.wrapperStyle = {
			transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
			transitionDuration: `${this.duration}ms`,
			transitionProperty: this.duration ? 'all' : 'none',
		}
	}

	// 设置外部容器的样式及遮罩层
	setEleStyle() {
		let mask = document.querySelector('.mask')
		let coverBorder = document.querySelector('.cover-border')
		let columnItem = document.querySelectorAll('.column-item')
		mask.style.backgroundSize = this.maskStyle.backgroundSize
		coverBorder.style.height = this.frameStyle.height

		this.setUlStyle()

		this.setColumnHeight(columnItem)
	}

	setUlStyle() {
		let wrapperContainer = document.querySelector('.wrapper-container')
		wrapperContainer.style.transform = this.wrapperStyle.transform
		wrapperContainer.style.transitionDuration = this.wrapperStyle.transitionDuration
		wrapperContainer.style.transitionProperty = this.wrapperStyle.transitionProperty
	}

	setUlTransform() {
		this.initComputed()
		this.setUlStyle()
	}

	setColumnHeight(columnItem) {
		columnItem.forEach((item, index) => {
			item.style.height = `${this.itemPxHeight}px`
			item.tabindex = index
			item.onclick = () => {
				this.onClickItem(index)
				this.setUlTransform()
			}
		})
	}

	onClickItem(index) {
		if (this.moving || this.readonly) {
			return;
		}

		this.transitionEndTrigger = null;
		this.duration = this.DEFAULT_DURATION;
		this.setIndex(index, true);
	}

	onMounted() {
		let el = document.querySelector('.picker-column')
		this.bindTouchEvent(el)
	}

	bindTouchEvent(el) {
		const { onTouchStart, onTouchMove, onTouchEnd, onTransitionEnd } = this
		let wrapper = document.querySelector('.wrapper-container')

		this.on(el, 'touchstart', onTouchStart);
		this.on(el, 'touchmove', onTouchMove);
		this.on(wrapper, 'transitionend', onTransitionEnd)

		if (onTouchEnd) {
			this.on(el, 'touchend', onTouchEnd);
			this.on(el, 'touchcancel', onTouchEnd);
		}
	}

	on(target, event, handler, passive = false) {
		target.addEventListener(
			event,
			handler,
			this.supportsPassive ? { capture: false, passive } : false
		);
	}

	onTransitionEnd = () => {
		this.stopMomentum();
	}

	stopMomentum() {
		this.moving = false;
		this.duration = 0;

		if (this.transitionEndTrigger) {
			this.transitionEndTrigger();
			this.transitionEndTrigger = null;
		}
	}

	// 开始滑动
	onTouchStart = (event) => {
		// 控制只读
		if (this.readonly) return
		let wrapper = document.querySelector('.wrapper-container')
		this.touchStart(event)

		if (this.moving) {
			const translateY = this.getElementTranslateY(wrapper);
			this.offset = Math.min(0, translateY - this.baseOffset);
			this.startOffset = this.offset;
		} else {
			this.startOffset = this.offset;
		}

		this.duration = 0;
		this.transitionEndTrigger = null;
		this.touchStartTime = Date.now();
		this.momentumOffset = this.startOffset;

		// 设置滑动
		this.setUlTransform()
	}

	touchStart(event) {
		this.resetTouchStatus();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	resetTouchStatus() {
		this.direction = '';
		this.deltaX = 0;
		this.deltaY = 0;
		this.offsetX = 0;
		this.offsetY = 0;
	}

	getElementTranslateY(element) {
		const style = window.getComputedStyle(element);
		const transform = style.transform || style.webkitTransform;
		const translateY = transform.slice(7, transform.length - 1).split(', ')[5];
		return Number(translateY);
	}

	onTouchMove = (event) => {
		if (this.readonly) return

		this.touchMove(event)

		if (this.direction === 'vertical') {
			this.moving = true;
			this.preventDefault(event, true);
		}

		this.offset = this.range(this.startOffset + this.deltaY, -(this.count * this.itemPxHeight), this.itemPxHeight);

		const now = Date.now()
		if (now - this.touchStartTime > this.MOMENTUM_LIMIT_TIME) {
			this.touchStartTime = now;
			this.momentumOffset = this.offset;
		}

		// 滑动中
		this.setUlTransform()
	}

	onTouchEnd = (event) => {
		if (this.readonly) return

		const distance = this.offset - this.momentumOffset;
		const duration = Date.now() - this.touchStartTime;
		const allowMomentum = duration < this.MOMENTUM_LIMIT_TIME && Math.abs(distance) > this.MOMENTUM_LIMIT_DISTANCE

		if (allowMomentum) {
			this.momentum(distance, duration);
			return;
		}

		const index = this.getIndexByOffset(this.offset);
		this.duration = this.DEFAULT_DURATION;
		this.setIndex(index, true)

		// 滑动结束
		this.setUlTransform()

		// compatible with desktop scenario
		// use setTimeout to skip the click event triggered after touchstart
		setTimeout(() => {
			this.moving = false

		}, 0);

	}

	momentum(distance, duration) {
		const speed = Math.abs(distance / duration);

		distance = this.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);

		const index = this.getIndexByOffset(distance);

		this.duration = +this.swipeDuration;
		this.setIndex(index, true);
	}

	setIndex(index, emitChange) {
		index = this.adjustIndex(index) || 0;

		const offset = -index * this.itemPxHeight;

		const trigger = () => {
			if (index !== this.currentIndex) {
				this.currentIndex = index;

				if (emitChange) {
					// this.$emit('change', index);
					console.log(index)
				}
			}
		};

		// trigger the change event after transitionend when moving
		if (this.moving && offset !== this.offset) {
			this.transitionEndTrigger = trigger;
		} else {
			trigger();
		}

		this.offset = offset;
	}

	getValue() {
		return this.options[this.currentIndex];
	}

	adjustIndex(index) {
		index = this.range(index, 0, this.count);

		for (let i = index; i < this.count; i++) {
			if (!this.isOptionDisabled(this.options[i])) return i;
		}

		for (let i = index - 1; i >= 0; i--) {
			if (!this.isOptionDisabled(this.options[i])) return i;
		}
	}

	isOptionDisabled(option) {
		return this.isObject(option) && option.disabled;
	}

	isObject(val) {
		return val !== null && typeof val === 'object';
	}

	getIndexByOffset(offset) {
		return this.range(Math.round(-offset / this.itemPxHeight), 0, this.count - 1);
	}

	preventDefault(event, isStopPropagation) {
		/* istanbul ignore else */
		if (typeof event.cancelable !== 'boolean' || event.cancelable) {
			event.preventDefault();
		}

		if (isStopPropagation) {
			this.stopPropagation(event);
		}
	}

	stopPropagation(event) {
		event.stopPropagation();
	}

	touchMove(event) {
		const touch = event.touches[0];
		this.deltaX = touch.clientX - this.startX;
		this.deltaY = touch.clientY - this.startY;
		this.offsetX = Math.abs(this.deltaX);
		this.offsetY = Math.abs(this.deltaY);
		this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
	}

	getDirection(x, y) {
		if (x > y && x > this.MIN_DISTANCE) {
			return 'horizontal';
		}

		if (y > x && y > this.MIN_DISTANCE) {
			return 'vertical';
		}

		return '';
	}

	range(num, min, max) {
		return Math.min(Math.max(num, min), max);
	}
}

new Picker()