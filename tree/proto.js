function CreateTree(data, el) {
    this.data = data
    this.el = el
    this.init()
}

CreateTree.prototype.init = function () {
    let html = CreateTree.iterate(this.data, this.el)
    this.el.innerHTML = html
}

CreateTree.iterate = function (data) {
    let str = '<ul>'
    for (let i = 0, len = data.length; i < len; i++) {
        str += data[i]['child'] && data[i]['child']['length'] ? `<li navTitle showmenu="hide" onclick="showMenu(this)"><div><span>+</span>${data[i]['name']}</div>` : `<li menuactive="unactive" onclick="clickli(this)">${data[i]['name']}`
        if (data[i]['child'] && data[i]['child']['length']) {
            str += CreateTree.iterate(data[i]['child'])
        }
        str += '</li>'
    }
    str += '</ul>'
    return str
}


let treeData = tree
let myTree = new CreateTree(treeData, document.getElementById('tree'))

function showMenu(e) {
    let showmenu = e.getAttribute('showmenu')
    let event = window.event || e.event
    if (showmenu === 'hide') {
        e.setAttribute('showmenu', 'show')
        e.querySelectorAll('span')[0]['innerHTML'] = '-'
    } else {
        e.setAttribute('showmenu', 'hide')
        e.querySelectorAll('span')[0]['innerHTML'] = '+'
    }
    event.stopPropagation(); // 阻止冒泡
    event.cancelBubble = true // IE阻止冒泡
}

function clickli(e) {
    let menuactive = e.getAttribute('menuactive')
    let a = myTree.el.querySelectorAll('li[menuactive]')
    if (menuactive === 'unactive') {
        a.forEach((item)=>{
            item.setAttribute('menuactive', 'unactive')
        })
        e.setAttribute('menuactive', 'active')
    } else {
        a.forEach((item)=>{
            item.setAttribute('menuactive', 'active')
        })
        e.setAttribute('menuactive', 'unactive')
    }
    let event = window.event || e.event
    event.stopPropagation(); // 阻止冒泡
    event.cancelBubble = true // IE阻止冒泡
}