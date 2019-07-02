function DoDate(option) {
    this.format = option.format || 'yyyy-mm-dd'
    this.limitNext = option.limitNext || false
    this.curDate = option.curDate || new Date()
    this.limitDate = option.limitDate || new Date()
    this.doType = option.doType || 'day'
    this.nextPermit = false // 默认下一个可点击
    this.init() // 初始化时间
    this.date = this.dateTime() // 返回时间
}

DoDate.prototype.init = function () {
    let date = new Date(this.curDate) // 当前时间
    this.year = date.getFullYear() // 当前年
    this.month = date.getMonth() + 1 // 当前月
    this.day = date.getDate() // 当前日
    this.nextPermit = DoDate._greaterToday(this.year, this.month, this.day, this.limitDate)
}

// yyyy-mm-dd
DoDate.prototype.dateTime = function () {
    let year = this.year.toString().length > 1 ? this.year : ('0' + this.year),
        month = this.month.toString().length > 1 ? this.month : ('0' + this.month),
        day = this.day.toString().length > 1 ? this.day : ('0' + this.day),
        formatDate = null
    if (this.format === 'yyyy-mm-dd') {
        formatDate = `${year}-${month}-${day}`
    } else if (this.format === 'yyyy-m-d') {
        formatDate = `${this.year}-${this.month}-${this.day}`
    } else if (this.format === 'yyyy/mm/dd') {
        formatDate = `${year}/${month}/${day}`
    } else if (this.format === 'yyyy/m/d') {
        formatDate = `${this.year}/${this.month}/${this.day}`
    }
    return formatDate
}

DoDate.prototype.prevDay = function () {
    if (this.doType === 'day') {
        this.day--
        this.commonDay()
        this.date = this.dateTime() // 返回时间
    } else if (this.doType === 'month') {
        this.month--;
        this.date = this.setMonth();
    }
}

DoDate.prototype.nextDay = function () {
    if (this.doType === 'day') {
        if (this.limitNext && DoDate._greaterToday(this.year, this.month, this.day, this.limitDate)) {
            return true;
        }
        this.day++;
        this.commonDay();
        this.date = this.dateTime(); // 返回时间
    } else if (this.doType === 'month') {
        if (this.limitNext && DoDate._greaterToday(this.year, this.month, 1, this.limitDate)) {
            return true;
        }
        this.month++;
        this.date = this.setMonth();
    }
}
DoDate.prototype.setMonth = function () { // 设置月份
    if (this.month < 1) {
        --this.year;
        this.month = 12;
    } else if (this.month > 12) {
        ++this.year;
        this.month = 1;
    }
    let month = this.month.toString().length > 1 ? this.month : `0${this.month}`,
        year = this.year.toString().length > 1 ? this.year : `0${this.year}`;
    return `${year}-${month}`;
}
// 是否大于当前日期
DoDate._greaterToday = function (year, month, day = 1, limitDate) {
    let current = new Date(limitDate),
        curYear = current.getFullYear(),
        curMonth = current.getMonth() + 1,
        currDay = current.getDate(),
        curDate = new Date(curYear, curMonth, currDay).getTime(),
        date = new Date(year, month, day).getTime()
    if (date >= curDate) {
        return true
    }
    return false
}

DoDate.prototype.commonDay = function () {
    switch (this.month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            this.setDate(31)
            break;
        case 4: case 6: case 9: case 11:
            this.setDate(30)
            break;
        case 2:
            if (this.year % 400 === 0 || (this.year % 4 === 0 && this.year % 100 !== 0)) {
                this.setDate(29)
            } else {
                this.setDate(28)
            }
            break;
    }
}
DoDate.prototype.setDate = function (days) {
    if (this.day > days) {
        this.day = 1
        ++this.month
        if (this.month > 12) {
            this.month = 1
            ++this.year
        }
    }
    if (this.day < 1) {
        --this.month
        if (this.month < 1) {
            this.month = 12
            --this.year
        }
        this.day = new Date(this.year, this.month, 0).getDate()
    }
}

let date = new DoDate({
    format: 'yyyy-mm-dd', // 传入对应的时间格式控制-可选默认当前格式
    // format: 'yyyy-m-d',
    // format: 'yyyy/mm/dd',
    // format: 'yyyy/m/d',
    limitNext: true, // 限制下一天不可选--默认false可选
    // curDate: '2019-07-01', // 当天日期（可选）
    limitDate: '2019-07', // 限制超过这天不能点击,limitNext选，此项必选
    doType: 'month', // 默认上一天（可选）
});
let myDate = document.getElementById('myDate')
myDate.innerHTML = date.date
function prevDay() {
    date.prevDay()
    // date实例包含返回的具体格式日期
    myDate.innerHTML = date.date
}
function nextDay() {
    date.nextDay()
    myDate.innerHTML = date.date
}