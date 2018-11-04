(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      //   alert(clientWidth);
      /*if(clientWidth>=640){
          docEl.style.fontSize = '10px';
      }else{
          docEl.style.fontSize = 10 * (clientWidth / 640) + 'px';
      }*/
      docEl.style.fontSize = 10 * (clientWidth / 750) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);