<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>楼层导航</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        a {
            text-decoration: none;
            color: #FFF;
        }

        .navwrap {
            display: none;
            position: fixed;
            left: 50%;
            top: 50%;
            width: 40px;
            margin-left: -700px;
            transform: translateY(-50%);
            font-size: 14px;
        }

        .navwrap a {
            display: inline-block;
            width: 40px;
            height: 40px;
            border-bottom: 1px solid #FFF;
            line-height: 40px;
            background: red;
            text-align: center;
        }

        .navwrap a:hover,
        .navwrap a.active {
            background: #000;
        }

        .conwrap {
            width: 1200px;
            margin: 0 auto;
        }

        .conwrap h2 {
            width: 98%;
            height: 60px;
            padding: 0 1%;
            line-height: 60px;
            color: #FFF;
            font-size: 20px;
        }

        .content {
            width: 100%;
            height: 600px;
            box-sizing: border-box;
        }

        .banner {
            width: 100%;
            height: 800px;
            background: #CCC;
            line-height: 800px;
            color: #FFF;
            text-align: center;
            font-size: 150px;
        }
    </style>
</head>
<body>
    <div class="navwrap" id="navWrap">
        <a href="javascript:;">1F</a><a href="javascript:;">2F</a><a href="javascript:;">3F</a><a href="javascript:;">4F</a><a
            href="javascript:;">5F</a><a href="javascript:;">6F</a><a href="javascript:;">7F</a><a href="javascript:;">8F</a><a
            href="javascript:;">顶部</a>
    </div>
    <div class="conwrap" id="conWrap">
        <div class="banner">banner</div>
        <h2>品质</h2>
        <div class="content"></div>
        <h2>服装</h2>
        <div class="content"></div>
        <h2>爱吃</h2>
        <div class="content"></div>
        <h2>家具</h2>
        <div class="content"></div>
        <h2>图书</h2>
        <div class="content"></div>
        <h2>游戏</h2>
        <div class="content"></div>
        <h2>电脑</h2>
        <div class="content"></div>
        <h2>再逛</h2>
        <div class="content"></div>
    </div>
    <script type="text/javascript">
        var navWrap = document.getElementById("navWrap");
        var oHs = document.querySelectorAll("#conWrap h2");
        var cont = document.querySelectorAll("#conWrap .content");
        var oAs = document.querySelectorAll("#navWrap a");
        var colorAry = ["254,254,0", "254,0,0", "254,254,0", "254,0,254", "0,254,0", "254,254,0", "0,0,254", "0,254,254"];
        var txtAry = ["品质", "服装", "爱吃", "家具", "图书", "游戏", "电脑", "再逛"];
        var floorAry = ["1F", "2F", "3F", "4F", "5F", "6F", "7F", "8F"];
        var topAry = [];
        function getOffset() {
            for (var i = 0; i < oHs.length; i++) {
                var txtTop = offset(oHs[i]).top;
                topAry.push(txtTop);
            }
        }
        window.onscroll = function () {
            var curTop = document.body.scrollTop || document.documentElement.scrollTop;
            var aTop = offset(oHs[0]).top;
            navWrap.style.display = curTop > aTop ? "block" : "none";
            getOffset();
            for (var i = 0; i < oHs.length; i++) {
                if (curTop >= topAry[i]) {
                    for (var j = 0; j < oAs.length - 1; j++) {
                        oAs[j].classList.remove("active");
                        oAs[j].innerHTML = floorAry[j];
                    }
                    oAs[i].classList.add("active");
                    oAs[i].innerHTML = txtAry[i];
                }
            }
        };
        function addCol() {
            for (var i = 0; i < oHs.length; i++) {
                oHs[i].style.backgroundColor = "rgb(" + colorAry[i] + ")";
                cont[i].style.borderLeft = "1px solid rgb(" + colorAry[i] + ")";
                cont[i].style.borderRight = "1px solid rgb(" + colorAry[i] + ")";
            }
        }
        addCol();
        function clickH(ap) {
            if (ap < oHs.length) {
                var nowTop = document.body.scrollTop || document.documentElement.scrollTop;
                var theTop = offset(oHs[ap]).top;
                if (nowTop !== theTop) {
                    document.body.scrollTop = theTop;
                    document.documentElement.scrollTop = theTop;
                }
            } else {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
        for (var j = 0; j < oAs.length; j++) {
            ~function (a) {
                oAs[j].onclick = function () {
                    clickH(a);
                }
            }(j);
        }
        function offset(curEle) {
            var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
            while (par) {
                if (navigator.userAgent.indexOf("MSIE 8") === -1) {//不是标准的IE8浏览器，我们才累加边框
                    disLeft += par.clientLeft;
                    disTop += par.clientTop;
                }
                disLeft += par.offsetLeft;
                disTop += par.offsetTop;
                par = par.offsetParent;
            }
            return { left: disLeft, top: disTop };
        }
    </script>
</body>
</html>
