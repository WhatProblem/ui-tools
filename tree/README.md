自动生成无线循环树形菜单

----------
    1.原型模式proto.js可直接通过script方式引入
    2.ES6模块导入时需要先修改源码
```javascript
// 生成菜单的关键函数
iterate(data, el) {
    let str = '<ul>'
    for(let i=0,len=data.length;i<len;i++) {
        // 判断是标题还是子菜单列表
        str += data[i]['child'] && data[i]['child']['length'] ? `<li navTitle showmenu="hide" onclick="showMenu(this)"><div><span>+</span>${data[i]['name']}</div>` : `<li menuactive="unactive" onclick="clickli(this)">${data[i]['name']}`
        if (data[i]['child'] && data[i]['child']['length']) {
            str += CreateTree.iterate(data[i]['child'])
        }
        str += '</li>'
    }
    str += '</ul>'
    return str
}

// 使用点击事件时要规避冒泡事件
let event = window.event || e.event
event.stopPropagation(); // 阻止冒泡
event.cancelBubble = true // IE阻止冒泡
```

    效果如下：
- 前端<br>
    - javascript<br>
            - ES6进阶<br>
            - React框架<br>
            - Vue框架<br>
            - Angular框架<br>
    - HTML<br>
            - H5新特性<br>
    - CSS<br>
            - CSS3新特性<br>
            - animate.css框架<br>
- PHP<br>
    - ThinkPHP框架<br>
    - Laraval框架<br>
    - Yii框架<br>
    - Slim3框架<br>
