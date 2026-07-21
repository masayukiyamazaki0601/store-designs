/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// position.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery.event.add(window, "load", function() {
    cimgInit()
});

WIN.resize(function() {
    cimgInit()
});

var ciWrap = $('.ci_wrap')
var cFlg = false;
function cimgInit() {
    ciWrap = $('.ci_wrap')
    if (cFlg == false) {
        ciWrap.css({ "width": "100%", "height": "100%", "overflow": "hidden", "display": "block", "position": "relative" })
        $('img.ci').css({ "width": "100%", "height": "100%", "position": "absolute", "top": "0", "left": "0" })
        cFlg = true;
    }
    ciWrap.each(function() {
        var cimg = $(this).find('img.ci')
        var ci = new Image();
        ci.src = cimg.attr('src')
        var cWrap = $(this)
        ci.onload = function() {
            var ciW = ci.width
            var ciH = ci.height
            var cimgRatio = ciH / ciW
            var cWrapW = cWrap.width()
            var cWrapH = cWrap.height()
            var cWrapRatio = cWrapH / cWrapW
            
            if (cimgRatio >= cWrapRatio) {
                cimg.css({
                    'width': '100%',
                    'height': 'auto'
                })
                var cimgW = cimg.width()
                var cimgH = cimg.height()
                var cDiff = cWrapH - (cimgW * cimgRatio)
                cimg.css({
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': '0%',
                    'top': cDiff / 2
                })
            } else {
                cimg.css({
                    'width': 'auto',
                    'height': '100%'
                })
                var cimgW = cimg.width()
                var cimgH = cimg.height()
                var cDiff = cWrapW - (cimgH / cimgRatio)
                cimg.css({
                    'right': 'auto',
                    'bottom': 'auto',
                    'top': '0%',
                    'left': cDiff / 2
                })
            }
        }
    });
}
