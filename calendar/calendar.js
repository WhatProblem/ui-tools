class Calendar {
    constructor() {
        this.init()
    }

    init() {
        this.generateWeek()
        this.generateDate()
        this.doEvent()
    }

    // 1.判断是平年还是闰年
    static isLeapYear(year) {
        return (year % 4 === 0) || (year % 100 !== 0 && year % 4 === 0)
    }
    // 2.获取每个月日期排列存储在数组
    static getMonthCount(year, month) {
        let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            count = arr[month] || (this.isLeapYear(year) ? 29 : 28)
        return Array.from(new Array(count), (item, index) => ({ day: index + 1, id: `${year}${month.toString().length > 1 ? month : ('0' + month)}${(index + 1).toString().length > 1 ? (index + 1) : ('0' + (index + 1))}` }))
    }
    // 3.获取每月的一号是周几，默认从零开始[日-六]
    static getWeekDay(year, month) {
        return new Date(year, month, 1).getDay()
    }
    // 4.获取上个月的天数
    static getPrevMonthCount(year, month) {
        return (month === 0 ? this.getMonthCount(year - 1, 11) : this.getMonthCount(year, month - 1))
    }
    // 5.获取下个月的天数
    static getNextMonthCount(year, month) {
        return (month === 11 ? this.getMonthCount(year + 1, 0) : this.getMonthCount(year, month + 1))
    }
    // 6.实现日历头部星期*内容
    generateWeek() {
        let weekTitle = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            weekFragment = document.createDocumentFragment(),
            week = document.getElementById('week')
        weekTitle.forEach((item, index) => {
            let oSpan = document.createElement('span')
            oSpan.innerHTML = item
            oSpan.classList.add('weekTitle')
            weekFragment.appendChild(oSpan)
        })
        week.appendChild(weekFragment)
    }
    // 7.实现日期内容部分,每月共42天
    generateDate(year, month, day) {
        if (typeof year === 'undefined' && typeof month === 'undefined' && typeof day === 'undefined') {
            let nowDate = new Date()
            year = nowDate.getFullYear()
            month = nowDate.getMonth()
            day = nowDate.getDate()
        }
        // 更新顶部标题日期
        document.querySelector('.detailDate').innerHTML = `${year}-${month + 1}-${day}`
        let dateList = [],
            curMonth = Calendar.getMonthCount(year, month),
            preMonth = Calendar.getPrevMonthCount(year, month),
            nextMonth = Calendar.getNextMonthCount(year, month),
            weekDay = Calendar.getWeekDay(year, month),
            preArr = weekDay ? preMonth.slice(-1 * weekDay) : [],
            nextArr = nextMonth.slice(0, 42 - curMonth.length - weekDay),
            str = '',
            mon = `${year}${month.toString().length > 1 ? month : ('0' + month)}`,
            curTime = `${year}${month.toString().length > 1 ? month : ('0' + month)}${day.toString().length > 1 ? day : ('0' + day)}`
        dateList = [...preArr, ...curMonth, ...nextArr]
        for (let i = 0; i < 6; i++) {
            str += '<div class="dateLine">'
            for (let k = 0; k < 7; k++) {
                let oDate = dateList.shift()
                str += `<span class="dateDetail ${(Number(mon) > Number((oDate.id).slice(0, -2)) || Number(mon) < Number((oDate.id).slice(0, -2))) ? 'noActive' : ''} ${curTime === oDate.id ? 'activeTime' : ''}">${oDate.day}</span>`
            }
            str += '</div>'
        }
        document.querySelector('.date').innerHTML = str
    }
    doEvent() {
        let left = document.querySelector('.left'),
            right = document.querySelector('.right'),
            date = document.querySelector('.detailDate').textContent.split('-'),
            year = date[0],
            month = date[1] - 1,
            day = date[2]
        left.onclick = function () {
            month--
            if (month === 0) {
                month = 11
                year--
                this.generateDate(year, month, day);
            } else {
                this.generateDate(year, month, day);
            }
        }.bind(this)
        right.onclick = function () {
            month++
            if (month === 11) {
                month = 0
                year++
                this.generateDate(year, month, day);
            } else {
                this.generateDate(year, month, day);
            }
        }.bind(this)
    }
}

const calendar = new Calendar()