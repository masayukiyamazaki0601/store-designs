/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// common.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

var WIN = $(window)
var WinW
var WinH
var BODY = $('body')
var Wrap = $('#wrapAll')
var Main = $('#main')
var HEADER = $('header')
var MAIN = $('main')
var TO_TOP = $('.totop')
var TO_TOPSP = $('.totopsp')
var HeaderH
var HeaderW
var TotopH
var MainH
var MainW
var FOOTER = $('footer')
var FooterH
var FooterW
var FooterT
var TB = 980
var SP = 760
var Career = "PC"
var CareerSet = "PC"
var gr = 1.618;
var sr = 1.4;
var Section = $('section')
var MV = $('section.mv')
var MvH
var nav = $("div.subnav ul li a");
var tribox = $("div.triming");
var blogimg = $("body.top section.newsblog div.blog div.img");
var blogtxt = $("body.top section.newsblog div.blog div.txt");
var newstxt = $("body.top section.newsblog div.news div.txt");
var intro = $('div.intro')
var mvscroll = $('div.scroll')
WIN.ready(function() {
    HEADER.width($(window).height());
    TO_TOP.on("click",totop);
    TO_TOPSP.on("click",totop);
    mvscroll.on("click", MvScroll);
    setTimeout(function(){
        intro.addClass('off')
    },8000);
    if(!location.hash){
        $(window).scrollTop(0);
        $('html,body').animate({ scrollTop: 0 }, '1');
    }
});

jQuery.event.add(window, "load", function() {
    CommonInit()
    BODY.addClass('load')
    if(!location.hash){
        $(window).scrollTop(0);
        $('html,body').animate({ scrollTop: 0 }, '1');
    }
});

WIN.resize(function() {
    CommonInit()
});

var SCROLL = 0
var ScrollAfter = 0;
WIN.scroll(function() {
    SCROLL = WIN.scrollTop();
    if (SCROLL > HeaderH) {
        HEADER.addClass('on');
        // TO_TOP.addClass('on');
        MenuBtn.addClass('on');
    } else {
        HEADER.removeClass('on');
        // TO_TOP.removeClass('on');
        MenuBtn.removeClass('on');
    }
    if (NavOpenFlg == true) {
        PopNavClose();
    }
    if (!BODY.hasClass('page-index')) {
        // SubttlCheck();
    }

    TotopChk()
    ScrollAfter = SCROLL;
});

function TotopChk(){
    if ( SCROLL < WinH ){
        TO_TOP.removeClass('on').addClass('scroll');
        TO_TOP.css({ 'bottom': "2rem"});
    } else if ( SCROLL + WinH > FooterT ) {
        TO_TOP.addClass('on').removeClass('scroll');
        if( Career == "PC"){
            TO_TOP.css({ 'bottom': WinH - ( FooterT - SCROLL) - (TotopH / 2) });
        } else if ( Career == "TB" ){
            TO_TOP.css({ 'bottom': WinH - ( FooterT - SCROLL) + (TotopH / 3)});
        }
    } else {
        if ( ScrollAfter > SCROLL ) {
            TO_TOP.addClass('on').removeClass('scroll');
        } else {
            TO_TOP.removeClass('on').removeClass('scroll');
        }
        TO_TOP.css({ 'bottom': "2rem"});
    }
}

function CommonInit() {
    WinW = WIN.width()
    WinH = WIN.height()

    HEADER.width(WinH)
    // Sunbttl.width(WinH)
    HeaderH = HEADER.height()
    HeaderW = HEADER.width()
    FooterH = FOOTER.height()
    FooterW = FOOTER.width()
    
    TotopH = TO_TOP.height();
    CareerCheck()
    Triming()
    Blogimg()
    MvH = MV.height();
    FooterT = FOOTER.offset().top;
    TotopChk()
}

function CareerCheck() {
    if (WinW > TB) {
        Career = "PC"
    } else if (WinW > SP) {
        Career = "TB"
    } else {
        Career = "SP"
    }
    CareerSet = Career
}
function Triming(){
    var triH = tribox.width();
    $("div.triming.t").css({
        "margin-top": triH / ( -2 ) - 1,
        "left": triH / ( -2 ) - 1
    });
    $("div.triming.b").css({
        "margin-bottom": triH / 2  - 1,
        "right": triH / ( -2 ) - 1
    });
}

function totop(){
    smsc(0, 800, "easeInOutCubic");

}
function MvScroll(){
    smsc(WinH, 800, "easeInOutCubic");
}

function Blogimg(){
    var newstxtH = newstxt.height();
    var blogtxtH = blogtxt.height();
    var blogW = blogtxt.width();
    var minblogimg = blogW / 3;
    if (Career == "PC"){
        if ( newstxtH > blogtxtH ){
            if( newstxtH - blogtxtH > minblogimg){
                blogimg.css({'height': newstxtH - blogtxtH });
            } else {
                blogimg.css({'height': minblogimg });
                newstxt.css({'height': blogtxtH + minblogimg })
            }
        } else {
            blogimg.css({'height': minblogimg });
            newstxt.css({'height': blogtxtH + minblogimg })
        }
    } else {
        blogimg.css({'height': minblogimg });
        newstxt.css({'height': 'auto' });
    }
    TotopChk()
}


var MenuBtn = $('#menubtn')
var PopupNav = $('#popupnav')
var PopupNavBase = $('#popupnav .base')
var NavOpenFlg = false;


MenuBtn.click(function() {
    if ($(this).hasClass('active')) {
        PopNavClose();
    } else {
        PopNavOpen();
    }
})

PopupNavBase.click(function() {
    PopNavClose();
})

function PopNavOpen() {
    MenuBtn.addClass('active');
    PopupNav.addClass('active');
    NavOpenFlg = true;
}

function PopNavClose() {
    MenuBtn.removeClass('active');
    PopupNav.removeClass('active');
    NavOpenFlg = false;
}

var ModalGallery = $('#modal_gallery #modal');
var ModalGalleryIn = $('#modal_gallery .pic');
var ModalGalleryImg = $('#modal_gallery .pic img');
var ModalGalleryTxtField = $('#modal_gallery .pic p.modaltxt span');

var ModalGalleryThum = $('#modal_gallery ul li');
var ModalGalleryThumLen = ModalGalleryThum.length;
var ModalGalleryIndex
var ModalGallerySrc
var ModalGalleryTxt

var ModalGalleryBase = $('#modal .base');
var ModalGalleryCloaseBtn = $('#modal .modal_close');
var ModalGalleryPrevBtn = $('#modal .modal_prev');
var ModalGalleryNextBtn = $('#modal .modal_next');



ModalGalleryThum.click(function() {

    if (Career != "SP") {
        ModalGalleryIndex = ModalGalleryThum.index(this);
        ModalGallery.stop(false, false).fadeIn(800);

        ModalGallerySrc = $(this).find('img').data('img');
        ModalGalleryTxt = $(this).find('img').attr('alt');
        ModalGalleryImg.attr('src', ModalGallerySrc)
        ModalGalleryTxtField.html(ModalGalleryTxt)

        var mi = new Image();
        mi.src = ModalGallerySrc

        mi.onload = function() {
            var mw = ModalGalleryIn.width();
            var mh = ModalGalleryIn.height();
            ModalGalleryIn.css({
                'top': '50%',
                'left': '50%',
                'margin-top': -(mh / 2),
                'margin-left': -(mw / 2)
            })

            ModalGalleryIn.stop(false, false).animate({ 'opacity': 1 }, 800);
        };
    }
});

ModalGalleryNextBtn.click(function() {
    ModalGalleryNext()
})

ModalGalleryPrevBtn.click(function() {
    ModalGalleryPrev()
})

function ModalGalleryNext() {
    if (ModalGalleryIndex < ModalGalleryThumLen - 1) {
        ModalGalleryIndex++;
    } else {
        ModalGalleryIndex = 0;
    }
    ModalGalleryMove()
}

function ModalGalleryPrev() {
    if (ModalGalleryIndex > 0) {
        ModalGalleryIndex--;
    } else {
        ModalGalleryIndex = ModalGalleryThumLen - 1;
    }
    ModalGalleryMove()
}

function ModalGalleryMove() {

    ModalGalleryIn.stop(false, false).animate({ 'opacity': 0 }, 800, function() {
        ModalGallerySrc = ModalGalleryThum.eq(ModalGalleryIndex).find('img').data('img');
        ModalGalleryTxt = ModalGalleryThum.eq(ModalGalleryIndex).find('img').attr('alt');
        ModalGalleryImg.attr('src', ModalGallerySrc)
        ModalGalleryTxtField.html(ModalGalleryTxt)
        var mi = new Image();
        mi.src = ModalGallerySrc
        mi.onload = function() {
            var mw = ModalGalleryIn.width();
            var mh = ModalGalleryIn.height();
            ModalGalleryIn.css({
                'top': '50%',
                'left': '50%',
                'margin-top': -(mh / 2),
                'margin-left': -(mw / 2)
            })
            ModalGalleryIn.stop(false, false).animate({ 'opacity': 1 }, 800);
        };
    });
}


ModalGalleryBase.click(function() {
    ModalGalleryClose()
})

ModalGalleryCloaseBtn.click(function() {
    ModalGalleryClose()
})


function ModalGalleryClose() {
    ModalGallery.stop(false, false).fadeOut(800, function() {
        ModalGalleryIn.css({ 'opacity': 1 });
    });
}



nav.on('click', toSchroll);

function toSchroll() {
    var t_class = $(this).attr('href');
    var _t = $('section' + t_class);
    console.log(_t);
    var t = _t.offset().top;
    smsc(t, 800, "easeInOutCubic");
}

function smsc(pos, speed, easing) {
    $('body,html').animate({ scrollTop: pos }, speed, easing);
    return false;
}