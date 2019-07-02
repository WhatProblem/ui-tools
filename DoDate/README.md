分别使用原型模式与ES6 class分别实现的无限点击上一天(月)下一天(月)的js小插件，可直接使用

-----
	1.原型模式proto.js可直接通过script方式引入
```javascript
// 传入对应的时间格式控制-可选默认当前格式
// 限制下一天不可选--默认false可选
var date = new DoDate({
    format: 'yyyy-mm-dd', // 传入对应的时间格式控制-可选默认当前格式
    // format: 'yyyy-m-d',
    // format: 'yyyy/mm/dd',
    // format: 'yyyy/m/d',
    limitNext: true, // 限制下一天不可选--默认false可选
    // curDate: '2019-07-01', // 当天日期（可选）
    limitDate: '2019-07', // 限制超过这天不能点击,limitNext选，此项必选
    doType: 'month', // 默认上一天（可选）
});
var myDate = document.getElementById('myDate')
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
```
	
	2.ES6的class方式可以在需要使用的文件中对应引入

```
// 将对应文件引用
import DoDate from 'class.js'
// 使用方法同上
```
