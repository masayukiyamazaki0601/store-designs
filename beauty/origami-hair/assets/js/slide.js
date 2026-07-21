/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// slide.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////
var Slide = $("#slide");
var SlidePic = $("#slide .slide_wrap li");
var SlidePicImg = $("#slide .slide_wrap li img.pic");
var SlideH = "full"; //"full" or "auto"  or "num"
var SlideLen = SlidePic.length;
var StarNum = 0;
var SlideIndex = 0;
var SlideTimer;

///AUTOSLIDE
var AUTOSLIDE = true; //true or false
var SlideInterval = 8000;
var LoadInterval = false;
///SLIDECTRL
var CTRL = false; //true or false
var CtrlBtn;

///SLIDEARR
var SLIDEARR = false; //true or false
var slideArr, slideArrNext, slideArrPrev

jQuery.event.add(window, "load", function() {
    if (CTRL == true) {
        CtrlInit();
    }

    if (SLIDEARR == true) {
        ArrInit();
    }
    SlideInit();
    SlideIndex = StarNum;
    SlideSet();
});

WIN.resize(function() {
    SlideInit();
    
});

function SlideInit() {
    if (SlideH == "full") {
        Slide.height(WinH);
    } else if (SlideH == "auto") {
        var si = new Image();
        si.src = SlidePicImg.eq(0).attr('src');
        var siW = si.width;
        var siH = si.height;
        var simgRatio = siH / siW;
        Slide.height(WinW * simgRatio);
    } else {
        Slide.height(SlideH);
    }
    // cimgInit();
}

function CtrlInit() {
    var CtrlHTML = "<ul class='ctrl'>"
    for (var i = 0; i < SlideLen; i++) {
        CtrlHTML += "<li><a href='javascript:void(0)'></a></li>";
    }
    CtrlHTML += "</ul>"
    Slide.append(CtrlHTML)
    CtrlBtn = $('ul.ctrl li a')

    CtrlBtn.click(function() {
        clearTimeout(SlideTimer)
        var ctrlIndex = CtrlBtn.index(this)
        SlideIndex = ctrlIndex;
        SlideSet()
    })
}

function ArrInit() {
    Slide.append("<a href='javascript:void(0)' class='slide_arr slide_prev'></a><a href='javascript:void(0)' class='slide_arr slide_next'></a>")
    slideArr = $('.slide_arr');
    slideArrPrev = $('.slide_prev');
    slideArrNext = $('.slide_next');

    slideArrNext.click(function() {
        SlideNext();
    });
    slideArrPrev.click(function() {
        SlidePrev();
    });
}

function SlideSet() {
    SlidePic.removeClass('on');
    SlidePic.eq(SlideIndex).addClass('on');
    if (CTRL == true) {
        CtrlBtn.removeClass('on');
        CtrlBtn.eq(SlideIndex).addClass('on');
    }

    if (AUTOSLIDE == true) {
        SlideTimer = setTimeout(function() {
            if (SlideIndex < SlideLen - 1) {
                SlideIndex++;
            } else {
                SlideIndex = 0;
            }
            SlideSet()
        }, SlideInterval);
        if (LoadInterval == false) {
            SlideInterval = 6000;
            LoadInterval = true;
        }
    }
}

function SlideNext() {
    clearTimeout(SlideTimer)
    if (SlideIndex < SlideLen - 1) {
        SlideIndex++;
    } else {
        SlideIndex = 0;
    }
    SlideSet()
}

function SlidePrev() {
    clearTimeout(SlideTimer)
    if (SlideIndex > 0) {
        SlideIndex--;
    } else {
        SlideIndex = SlideLen - 1;
    }
    SlideSet()
}



////// Flick
var startX;
var startY;
var diffX;
var diffY;
var THRESHOLD = 20;
var winpoint
// Slide.on("touchstart touchmove touchend", touchHandler);
// function touchHandler(e) {
//   var touch = e.originalEvent.touches[0];
//       if (e.type == "touchstart") {        
//         startX = touch.pageX;
//         startY = touch.pageY;
//       } else if (e.type == "touchmove") {
//         diffX =  touch.pageX - startX ;
//         diffY =  touch.pageY - startY ;
//          if(diffX > 10 || -diffX > 10 ){
//             e.preventDefault();
//          }
        
//       } else if (e.type == "touchend") {
//         if(diffX > THRESHOLD || -diffX > THRESHOLD ){
//           if (diffX > THRESHOLD) {
//             // PREV処理
//             SlidePrev()
//           } else if (diffX < -THRESHOLD) {
//             // NEXT処理
//             SlideNext()
//           }
//         }
//         diffX = 0;
//         diffY = 0;
//         diffTime = 0
//       }
// }
