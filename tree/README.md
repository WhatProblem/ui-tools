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
前端
    javascript
        ES6进阶
        React框架
        Vue框架
        Angular框架
    HTML
        H5新特性
    CSS
        CSS3新特性
        animate.css框架
PHP
    ThinkPHP框架
    Laraval框架
    Yii框架
    Slim3框架