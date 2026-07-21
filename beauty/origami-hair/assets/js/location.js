var ua = navigator.userAgent.toLowerCase();
var ver = navigator.appVersion.toLowerCase();
var isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') == -1);
var isIE6 = isMSIE && (ver.indexOf('msie 6.') > -1);
var isIE7 = isMSIE && (ver.indexOf('msie 7.') > -1);
var isIE8 = isMSIE && (ver.indexOf('msie 8.') > -1);
var isIE9 = isMSIE && (ver.indexOf('msie 9.') > -1);
var isIE10 = isMSIE && (ver.indexOf('msie 10.') > -1);
var isIE11 = (ua.indexOf('trident/7') > -1);
var isIE = isMSIE || isIE11;
var isChrome = (ua.indexOf('chrome') > -1) && (ua.indexOf('edge') == -1);
var isFirefox = (ua.indexOf('firefox') > -1);
var isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') == -1);
var isOpera = (ua.indexOf('opera') > -1);

WIN.resize(function() {
    $('#box-map').css({ 'height': '30rem' })
    $('#map_canvas').css({ 'height': '30rem' })
});
jQuery.event.add(window, "load", function() {
    initialize();
    // ParallaxInit()
    // ParallaxEvent()
});

function initialize() {

    // $('#box-map').css({ 'height': Math.round($('#box-map').width()) + 'px' })
    // $('#map_canvas').css({ 'height': Math.round($('#box-map').width()) + 'px' })
    $('#box-map').css({ 'height': '30rem' })
    $('#map_canvas').css({ 'height': '30rem' })
        //緯度・経度
    var latitude = $('#box-map').data('latitude')
    var longitude = $('#box-map').data('longitude')

    var myLatlng = new google.maps.LatLng(latitude - 0.000000, longitude)
    var myLatlng2 = new google.maps.LatLng(latitude - 0.000000, longitude)

    var myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        panControl: false,
        // zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false
    };

    // // canvas
    // var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // // maker
    // var marker = new google.maps.Marker({
    //     position: myLatlng2,
    //     map: map,
    //     icon: "/img/shisei/pin.png"
    // });

    var centerCoord = new google.maps.LatLng(latitude, longitude);
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(centerCoord);
    });

    if (isIE) {
        var image = {
            url: "/assets/img/map.png",
            // scaledSize: new google.maps.Size(19, 29)
        }
    } else {
        var image = {
                url: "/assets/img/map.png",
                scaledSize: new google.maps.Size(60, 60)
            }
            // if (Career == 'PC') {
            // }
    }

    var marker = new google.maps.Marker({
        position: myLatlng2,
        map: map,
        icon: image
    });


    var styleArray = [{
        "elementType": "labels",
        "stylers": [
            { "visibility": "off" }
        ]
    }, {
        "stylers": [
            { "saturation": -100 },
            { "lightness": 30 }
        ]
    }];

    var styleArray2 = [{
        "elementType": "labels",
        "stylers": [
            { "visibility": "on" }
        ]
    }, {
        "stylers": [
            { "saturation": -100 },
            { "lightness": 30 }
        ]
    }];



    if (Career == "PC") {
        map.setOptions({ styles: styleArray });
        $("#map_canvas").hover(function() {
            map.setOptions({ styles: styleArray2 });
        }, function() {
            map.setOptions({ styles: styleArray });
        });
    } else {
        map.setOptions({ styles: styleArray2 });
        $("#map_canvas").hover(function() {
            map.setOptions({ styles: styleArray2 });
        }, function() {
            map.setOptions({ styles: styleArray2 });
        });
        // $("div.gmap").click(function(){
        //     window.location.href = 'https://www.google.co.jp/maps/place/E.MARINELLA+NAPOLI/@35.6661476,139.728528,17z/data=!3m2!4b1!5s0x60188b78945432c1:0x7acbd95657b55136!4m5!3m4!1s0x60188b7894884a03:0xfea2f29684bde490!8m2!3d35.6661476!4d139.7307167';
        // })
    }



}
