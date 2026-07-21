//*************************************************
//	Window Setting
//*************************************************
	var Vh = $(window).height(),
		Vw = $(window).width(),
		ua = navigator.userAgent,
		PosArray = Array();


// PC/Tablet/mobile Check
		var windowCheck = function() {
			if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
				return false;
			} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
				return true;
			} else {
				return true;
			}
		}

$(function() {
//**********************************************************
//  to Top Scroll Control
//**********************************************************
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop();
		if(fromTop > 200){
			$('.toTop').show();
		}else{
			$('.toTop').hide();
		}
	});
	$('a[href="#toTop"]').on('click',function() {
			$('html,body').animate({scrollTop: 0}, 400);
	});

//**********************************************************
//  Key Visual  Control
//**********************************************************
	if($("#kv.index")[0]){
		$("#kv.index").slick({
	  		slidesToShow: 1,
			slidesToScroll: 1,
			autoplay:true,
			fade:true,
			dots: true,
		});
	}

//*************************************************
//	Effect Setting
//*************************************************
// set Active
	var setActive = function(scl, Target) {
		var pos = $(Target).offset().top;
		if($(Target).hasClass('active')) {
			if(pos > scl ) {
				$(Target).removeClass('active')
			}
		}else{
			if(scl > pos) {
				$(Target).addClass('active')
			}
		}
	}

	$(window).on('load scroll resize',function(){
	// move object setting
		var scl= $(this).scrollTop(); 
		var scl2= $(this).scrollTop() + Vh - Vh/2; 
		var scl5= $(this).scrollTop() + Vh - Vh/5;
		// Rotate Effect
		$('.deg').each(function() {
			setActive(scl5, $(this))
		});
		// ScrollUp Effect
		$('.scroll').each(function() {
			setActive(scl5, $(this))
		});
	})

//*************************************************
//	Header Menu Control
//*************************************************
	if ($('header')) {
		// Site Top Page
		
		$(window).on('load resize',function() {
			// Reget
			Vh = $(window).height();
			Vw = $(window).width();
			Hh = $('header').height();
			
			if(windowCheck() && Vw >= 768) {
				// for PC or Tablet
				$('header .navigation').css({'height':Vh});
			}else{
				// for Smart Phone
				$('header .navigation').css({'height':Hh});
			}
		})
	}
//*************************************************
//	SP Header Control
//*************************************************
	var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

	var hamburgers = document.querySelectorAll(".hamburger");
	if (hamburgers.length > 0) {
	  forEach(hamburgers, function(hamburger) {
		hamburger.addEventListener("click", function() {
		  this.classList.toggle("is-active");
		}, false);
	  });
	}

	$('#toggle').click(function() {
		$(this).toggleClass('open');
		if($('nav.menu').hasClass("active")){
			$('nav.menu').removeClass("active");
			$('#logo').fadeIn();
		}else{
			$('nav.menu').addClass("active");
			$('#logo').fadeOut();
		}
		//myScroll.refresh();
	});
/***********************************************************
	Google Map Setting
************************************************************/
	if($('#map')[0]){
		function initialize() {
			var latlng = new google.maps.LatLng(43.057181, 141.348698);
			var myOptions = {
					zoom: 17,
					center: latlng,
					scrollwheel: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					panControl: false,
					streetViewControl: false,
					zoomControl: false,
					mapTypeControl: false,
					scaleControl: false,
					overviewMapControl: false,
					draggable: false,
					disableDoubleClickZoom: true,
				};
			var map = new google.maps.Map(document.getElementById('map'),myOptions);
			var markers = [] ;
			markers[0] = new google.maps.Marker({
				map: map ,
				position: new google.maps.LatLng(43.057181, 141.348698),
			}) ;
		}
		initialize();
	}
});
