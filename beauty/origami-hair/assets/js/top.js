/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// top.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

WIN.ready(function(){});
jQuery.event.add(window,"load",function(){
    IndexInit()
});

WIN.resize(function(){
    IndexInit()
});

var SCROLL = 0
WIN.scroll(function(){
    SCROLL = WIN.scrollTop();
  if (SCROLL > WinH) {
      HEADER.addClass('on');
  } else {
      HEADER.removeClass('on');
  }
});

function IndexInit(){
};



