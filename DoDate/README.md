#####分别使用原型模式与ES6 class分别实现的无限点击上一天下一天的js小插件，可直接使用
-----
	1.原型模式proto.js可直接通过script方式引入
	```
	// 传入对应的时间格式控制-可选默认当前格式
	// 限制下一天不可选--默认false可选
	var date = new DoDate({
    format: 'yyyy-mm-dd', // 2019-06-29
    // format: 'yyyy-m-d', // 2019-6-29
    // format: 'yyyy/mm/dd', // 2019/06/29
    // format: 'yyyy/m/d', // 2019/6/29
    // limitNext: true, 
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