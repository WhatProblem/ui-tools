class TouchTools {
	MIN_DISTANCE = 10 // 滑动距离
	THRESHOLD = 0.15 // 滑动比例
	supportsPassive = false
	// 滑动范围限制
	range(num, min, max) {
		return Math.min(Math.max(num, min), max);
	}

	// 公共滑动方法
	touchStart(event) {
		this.resetTouchStatus()
		this.startX = event.touches[0].clientX
		this.startY = event.touches[0].clientY
	}

	touchMove(event) {
		const touch = event.touches[0]
		this.deltaX = touch.clientX - this.startX
		this.deltaY = touch.clientY - this.startY
		this.offsetX = Math.abs(this.deltaX)
		this.offsetY = Math.abs(this.deltaY)
		this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY)
	}

	resetTouchStatus() {
		this.direction = ''
		this.deltaX = 0
		this.deltaY = 0
		this.offsetX = 0
		this.offsetY = 0
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

	preventDefault = (event, isStopPropagation) => {
		if (typeof event.cancelable !== 'boolean' || event.cancelable) {
			event.preventDefault();
		}

		if (isStopPropagation) {
			this.stopPropagation(event);
		}
	}

	// 阻止事件冒泡
	stopPropagation(event) {
		event.stopPropagation();
	}

	on = (target, event, handler, passive = false) => {
		target.addEventListener(
			event,
			handler,
			this.supportsPassive ? { capture: false, passive } : false
		)
	}
}

class SwiperCell extends TouchTools {

	constructor(option = {}) {
		super()
		this.userVariable(option)
		this._variable()
		this.computedStyle()
		this.onMounted()
	}

	// 用户变量
	userVariable(option) {
		this.disabled = option.disabled || false
		this.leftWidth = option.leftWidth || 0
		this.rightWidth = option.rightWidth || 0
		// 关闭函数回调
		this.beforeClose = option.beforeClose || false
		this.onClose = option.onClose || false
	}

	// 私有变量
	_variable() {
		this.startOffset = 0 // 私有变量
		this.offset = 0 // 滑动距离
		this.dragging = false // 滑动状态默认false
		this.opened = false // 私有变量 打开状态--false
		this.lockClick = false // 私有变量 滑动中--false 不允许点击
		this.stopPropagationBool = true // 阻止事件冒泡
		this.$el = document.querySelector('.swiper-cell') // 容器
		this.$wrapper = document.querySelector('.swiper-wrapper')
		this.$left = document.querySelector('.swiper-wrapper-left') // 左侧滑块
		this.$right = document.querySelector('.swiper-cell-right') // 右侧滑块
	}

	// 动态计算属性--主要是滑动样式、距离
	computedStyle() {
		this.setWrapperStyle()
		// 左侧滑块宽
		this.computedLeftWidth = this.leftWidth || this.getWidthByRef(this.$left)
		// 右侧滑块宽
		this.computedRightWidth = this.rightWidth || this.getWidthByRef(this.$right)
	}

	// 设置滑块轨道距离
	setWrapperStyle() {
		const wrapperStyle = {
			transform: `translate3d(${this.offset}px, 0, 0)`,
			transitionDuration: this.dragging ? "0s" : ".6s",
		}
		this.$wrapper.style.transform = wrapperStyle.transform
		this.$wrapper.style.transitionDuration = wrapperStyle.transitionDuration
	}

	// 计算各个滑块距离
	getWidthByRef(ref) {
		if (ref) {
			const rect = ref.getBoundingClientRect()
			return rect.width
		}

		return 0
	}

	onMounted() {
		this.bindTouchEvent(this.$el)
		this.bindClick(this.$el, 'cell')
		this.bindClick(this.$left, 'left', true)
		this.bindClick(this.$right, 'right', true)
		this.bindClick(document, 'outside', true)
	}

	bindClick(el, position = 'outside', bool) {
		const { onClick } = this

		this.on(el, 'touchstart', (event) => {
			this.stopPropagation(event)
			onClick(position, bool)
		})
	}

	bindTouchEvent(el) {
		const { onTouchStart, onTouchMove, onTouchEnd } = this

		this.on(el, 'touchstart', onTouchStart)
		this.on(el, 'touchmove', onTouchMove)

		if (onTouchEnd) {
			this.on(el, 'touchend', onTouchEnd)
			this.on(el, 'touchcancel', onTouchEnd)
		}
	}

	onTouchStart = (event) => {
		if (this.disabled) {
			return
		}

		this.startOffset = this.offset
		this.touchStart(event)
	}

	onTouchMove = (event) => {
		if (this.disabled) {
			return
		}

		this.touchMove(event)

		if (this.direction === "horizontal") {
			this.dragging = true
			this.lockClick = true

			const isPrevent = !this.opened || this.deltaX * this.startOffset < 0

			if (isPrevent) {
				this.preventDefault(event, this.stopPropagationBool)
			}

			this.offset = this.range(
				this.deltaX + this.startOffset,
				-this.computedRightWidth,
				this.computedLeftWidth
			)
			this.setWrapperStyle()
		}
	}

	onTouchEnd = () => {
		if (this.disabled) {
			return
		}

		if (this.dragging) {
			this.toggle(this.offset > 0 ? "left" : "right")
			this.dragging = false

			this.setWrapperStyle()

			setTimeout(() => {
				this.lockClick = false
			}, 0)
		}
	}

	toggle(direction) {
		const offset = Math.abs(this.offset)
		const threshold = this.opened ? 1 - this.THRESHOLD : this.THRESHOLD
		const { computedLeftWidth, computedRightWidth } = this

		if (
			computedRightWidth &&
			direction === "right" &&
			offset > computedRightWidth * threshold
		) {
			this.open("right")
		} else if (
			computedLeftWidth &&
			direction === "left" &&
			offset > computedLeftWidth * threshold
		) {
			this.open("left")
		} else {
			this.close()
		}
	}

	close(position) {
		this.offset = 0

		if (this.opened) {
			this.opened = false
			console.log('点击关闭位置', position)
		}
	}

	open(position) {
		const offset =
			position === "left" ? this.computedLeftWidth : -this.computedRightWidth

		this.opened = true
		this.offset = offset

		console.log('点击打开位置', position)
	}

	// 点击关闭
	onClick = (position = 'outside') => {
		console.log('点击位置', position)
		if (this.opened && !this.lockClick) {
			if (this.beforeClose) {
				this.beforeClose({ position, instance: this })
			} else if (this.onClose) {
				console.log(this.onClose, '自定义关闭函数')
				this.onClose({ position, instance: this })
			} else {
				this.close(position)
			}
			this.setWrapperStyle()
		}
	}
}

new SwiperCell({
	onClose: function ({ position, instance }) {
		// 关闭回调
		console.log(position, instance)
		instance.close()
	},
	beforeClose: function ({ position, instance }) {
		// 关闭前回调
		console.log(position, instance)
		instance.close()
	}
})