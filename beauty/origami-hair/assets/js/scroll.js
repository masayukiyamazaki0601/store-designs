/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Parallax.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////
// var ParallaxImg = $('.lead_box,.text_box,.sara_01,.sara_02')
if(BODY.hasClass('top')){
    var ParallaxImg = $('section.menu li, section.concept div.secwrap,section.saloninfo div.secwrap,section.style,section.newsblog')
} else if(BODY.hasClass('concept')){
    var ParallaxImg = $('section div.txt p, section div.imgwrap, div.dec')
} else if(BODY.hasClass('menu')){
    var ParallaxImg = $('section div.imgwrap')
} else if(BODY.hasClass('style')){
    var ParallaxImg = $('section li, section div.img')
} else if(BODY.hasClass('saloninfo')){
    var ParallaxImg = $('section div.txt, section div.img,section.nav')
} 
// var ParallaxImg = $('section.menu div.body')
ParallaxImg.addClass('Parallax')
ParallaxImg = $('.Parallax')

var ParallaxImg_Len = ParallaxImg.length
var ParallaxImgArry
var borderline = 0.8;
var pallaxflg = false;

jQuery.event.add(window, "load", function() {
    // SCROLL = 0
    ParallaxInit()
    ParallaxEvent()
    pallaxflg = true;
});

WIN.resize(function() {
    ParallaxInit()
    ParallaxEvent()
});


WIN.scroll(function() {
    if(pallaxflg == true){
        ParallaxEvent()
    }
});

function ParallaxInit() {
    if (Career == "PC") {
        borderline = 0.8;
    } else {
        borderline = 0.9;
    }
    $('.Parallax_on').removeClass('Parallax_on')
    ParallaxImgArry = new Array();
    for (var i = 0; i < ParallaxImg_Len; i++) {
        var arry = new Array();
        arry.push(Math.floor(ParallaxImg.eq(i).offset().top));
        arry.push(Math.floor(ParallaxImg.eq(i).offset().left));
        arry.push(parseInt(ParallaxImg.eq(i).css('top')));
        ParallaxImgArry.push(arry)
    }
}

function ParallaxReset() {
    ParallaxImg.removeClass('Parallax_on')
    for (var i = 0; i < ParallaxImg_Len; i++) {
        ParallaxImg.eq(i).css({ 'opacity': 1 })
        ParallaxImg.eq(i).css({ 'top': ParallaxImgArry[i][2] })
    }
    ParallaxImgArry = new Array();
}

function ParallaxEvent() {
    for (var i = 0; i < ParallaxImg_Len; i++) {
        var diff = Math.floor(ParallaxImgArry[i][0] - (SCROLL + (WinH * 0.8)))
        if (diff >= 0 || diff <= -(WinH + ParallaxImg.eq(i).height())) {
            ParallaxImg.eq(i).removeClass('Parallax_on')
        } else {
            ParallaxImg.eq(i).addClass('Parallax_on')
        }

    }
}
