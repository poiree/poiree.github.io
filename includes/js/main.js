jQuery(document).ready(function($){
    
    if($(window).scrollTop() == 0) {
		$('.cd-intro-content').css('transition', '1s ease-in');
		if (deviceType() == 'desktop') {
			$('#side-menu').css('visibility', 'hidden');
		}
    }
    else {
    	var winOffset = $(window).scrollTop() / $(window).height() + 1,
    		curSectionId = 'section' + Math.round(winOffset);
    	$('#side-menu').css('visibility', 'visible');
    	$('.menu-list>li div').animate({
			height: '50px',
			width: '50px',
			marginLeft: '5px',
			marginTop: '0'
		});
		if (curSectionId == 'section2') {
			$('.menu-list>li:first-of-type div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (curSectionId == 'section3') {
			$('.menu-list>li:nth-of-type(2) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (curSectionId == 'section4') {
			$('.menu-list>li:nth-of-type(3) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (curSectionId == 'section5') {
			$('.menu-list>li:nth-of-type(5) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (curSectionId == 'section6') {
			$('.menu-list>li:nth-of-type(6) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (curSectionId == 'section7') {
			$('.menu-list>li:nth-of-type(6) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
    }
	
	//variables
	var hijacking= $('body').data('hijacking'),
		animationType = $('body').data('animation'),
		delta = 0,
        scrollThreshold = 5,
        actual = 1,
        animating = false;
    
    //DOM elements
    var sectionsAvailable = $('.cd-section'),
    	verticalNav = $('.cd-arrow'),
    	prevArrow = verticalNav.find('a.cd-prev'),
    	nextArrow = verticalNav.find('a.cd-next');

	
	//check the media query and bind corresponding events
	var MQ = deviceType(),
		bindToggle = false;
	
	bindEvents(MQ, true);
	
	$(window).on('resize', function(){
		MQ = deviceType();
		bindEvents(MQ, bindToggle);
		if( MQ == 'mobile' ) bindToggle = true;
		if( MQ == 'desktop' ) bindToggle = false;
	});

    function bindEvents(MQ, bool) {
    	
    	if( MQ == 'desktop' && bool) {   		
    		//bind the animation to the window scroll event, arrows click and keyboard
			if( hijacking == 'on' ) {
				initHijacking();
				$(window).on('DOMMouseScroll mousewheel', scrollHijacking);
			} else {
				scrollAnimation();
				$(window).on('scroll', scrollAnimation);
				$(window).on('DOMMouseScroll mousewheel', scrollHijacking);
			}
			prevArrow.on('click', prevSection);
    		nextArrow.on('click', nextSection);
    		$('#down').on('click', nextSection);

    		
    		$(document).on('keydown', function(event){
				if( event.which=='40' && !nextArrow.hasClass('inactive') ) {
					event.preventDefault();
					nextSection();
				} else if( event.which=='38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() != sectionsAvailable.eq(0).offset().top) ) ) {
					event.preventDefault();
					prevSection();
				}
			});
			
			//set navigation arrows visibility
			checkNavigation();
		} else if( MQ == 'mobile' ) {
			//reset and unbind
			resetSectionStyle();
			$(window).off('DOMMouseScroll mousewheel', scrollHijacking);
			$(window).off('scroll', scrollAnimation);
			prevArrow.off('click', prevSection);
    		nextArrow.off('click', nextSection);
    		$('#down').off('click', nextSection);
    		$(window).off('mousewheel');
    		$(document).off('keydown');
    		$('#side-menu').addClass('cd-vertical-nav');
    		$(document).on('touchmove', function(e){
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
    }

	function scrollAnimation(){
		//normal scroll - use requestAnimationFrame (if defined) to optimize performance
		(!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);
	}

	function animateSection() {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			windowWidth = $(window).width();
		
		sectionsAvailable.each(function(){
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top;

			//according to animation type and window scroll, define animation parameters
			var animationValues = setSectionAnimation(offset, windowHeight, animationType);
			
			transformSection(actualBlock.children('div'), animationValues[0], animationValues[1], animationValues[2], animationValues[3], animationValues[4]);
			( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('visible') : actualBlock.removeClass('visible');		
		});
		
		checkNavigation();
	}

	function transformSection(element, translateY, scaleValue, rotateXValue, opacityValue, boxShadow) {
		//transform sections - normal scroll
		element.velocity({
			translateY: translateY+'vh',
			scale: scaleValue,
			rotateX: rotateXValue,
			opacity: opacityValue,
			boxShadowBlur: boxShadow+'px',
			translateZ: 0,
		}, 0);
	}

	function initHijacking() {
		// initialize section style - scrollhijacking
		var visibleSection = sectionsAvailable.filter('.visible'),
			topSection = visibleSection.prevAll('.cd-section'),
			bottomSection = visibleSection.nextAll('.cd-section'),
			animationParams = selectAnimation(animationType, false),
			animationVisible = animationParams[0],
			animationTop = animationParams[1],
			animationBottom = animationParams[2];

		visibleSection.children('div').velocity(animationVisible, 1, function(){
			visibleSection.css('opacity', 1);
	    	topSection.css('opacity', 1);
	    	bottomSection.css('opacity', 1);
		});
        topSection.children('div').velocity(animationTop, 0);
        bottomSection.children('div').velocity(animationBottom, 0);
	}

	function scrollHijacking (event) {
		// on mouse scroll - check if animate section
        if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) { 
            delta--;
            ( Math.abs(delta) >= scrollThreshold) && prevSection();
        } else {
            delta++;
            (delta >= scrollThreshold) && nextSection();
        }
        return false;
    }

    function prevSection(event) {
    	//go to previous section
    	typeof event !== 'undefined' && event.preventDefault();
    	
    	if($('.cd-section').filter('.visible').is('#section2')) {
        	$('#side-menu').css('visibility', 'hidden');
        }
        else $('#side-menu').css('visibility', 'visible');
    	
    	var visibleSection = sectionsAvailable.filter('.visible'),
    		middleScroll = ( hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;
    	visibleSection = middleScroll ? visibleSection.next('.cd-section') : visibleSection;

    	var animationParams = selectAnimation(animationType, middleScroll, 'prev');
    	unbindScroll(visibleSection.prev('.cd-section'), animationParams[3]);

        if( !animating && !visibleSection.is(":first-child") ) {
        	animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[2], animationParams[3], animationParams[4])
            .end().prev('.cd-section').addClass('visible').children('div').velocity(animationParams[0] , animationParams[3], animationParams[4], function(){
            	animating = false;
            	if( hijacking == 'off') $(window).on('scroll', scrollAnimation);
            });
            
            actual = actual - 1;
        }

        resetScroll();
		$('.menu-list>li div').animate({
				height: '50px',
				width: '50px',
				marginLeft: '5px',
				marginTop: '0'
			});
		if (visibleSection.is('#section3')) {
			$('.menu-list>li:first-of-type div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section4')) {
			$('.menu-list>li:nth-of-type(2) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section5')) {
			$('.menu-list>li:nth-of-type(3) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section6')) {
			$('.menu-list>li:nth-of-type(5) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section7')) {
			$('.menu-list>li:nth-of-type(6) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
	}

    function nextSection(event) {
    	//go to next section
    	typeof event !== 'undefined' && event.preventDefault();
    	
        $('#side-menu').css('visibility', 'visible');
    	
        var visibleSection = sectionsAvailable.filter('.visible'),
    		middleScroll = ( hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;

    	var animationParams = selectAnimation(animationType, middleScroll, 'next');
    	unbindScroll(visibleSection.next('.cd-section'), animationParams[3]);

        if(!animating && !visibleSection.is(":last-of-type") ) {
            animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[1], animationParams[3], animationParams[4] )
            .end().next('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function(){
            	animating = false;
            	if( hijacking == 'off') $(window).on('scroll', scrollAnimation);
            });

            actual = actual + 1;
        }
        $('.cd-intro-content').css('transition', '');
        resetScroll();
        $('.menu-list>li div').animate({
				height: '50px',
				width: '50px',
				marginLeft: '5px',
				marginTop: '0'
			});
		if (visibleSection.is('#section1')) {
			$('.menu-list>li:first-of-type div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section2')) {
			$('.menu-list>li:nth-of-type(2) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section3')) {
			$('.menu-list>li:nth-of-type(3) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section4')) {
			$('.menu-list>li:nth-of-type(5) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section5')) {
			$('.menu-list>li:nth-of-type(6) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
		else if (visibleSection.is('#section6')) {
			$('.menu-list>li:nth-of-type(6) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
		}
    }

    function unbindScroll(section, time) {
    	//if clicking on navigation - unbind scroll and animate using custom velocity animation
    	if( hijacking == 'off') {
    		$(window).off('scroll', scrollAnimation);
    		( animationType == 'catch') ? $('body, html').scrollTop(section.offset().top) : section.velocity("scroll", { duration: time });
    	}
    }

    function resetScroll() {
        delta = 0;
        checkNavigation();
    }

    function checkNavigation() {
    	//update navigation arrows visibility
		/*( sectionsAvailable.filter('.visible').is(':first-of-type') ) ? prevArrow.addClass('inactive') : prevArrow.removeClass('inactive');
		( sectionsAvailable.filter('.visible').is(':last-of-type')  ) ? nextArrow.addClass('inactive') : nextArrow.removeClass('inactive');*/
		if (sectionsAvailable.filter('.visible').is(':first-of-type')) {
			prevArrow.addClass('inactive');
			$('.cd-arrow a').css('display', 'none');
		}
		else {
			$('.cd-arrow a').css('display', 'block');
			prevArrow.removeClass('inactive');
		}
		( sectionsAvailable.filter('.visible').is(':last-of-type') /*|| sectionsAvailable.filter('.visible').is(':nth-of-type(6)')  */) ? nextArrow.addClass('inactive') : nextArrow.removeClass('inactive');
    }

	function resetSectionStyle() {
		//on mobile - remove style applied with jQuery
		sectionsAvailable.children('div').each(function(){
			$(this).attr('style', '');
		});
	}

	function deviceType() {
		//detect if desktop/mobile
		return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}

	function selectAnimation(animationName, middleScroll, direction) {
		// select section animation - scrollhijacking
		var animationVisible = 'translateNone',
			animationTop = 'translateUp',
			animationBottom = 'translateDown',
			easing = 'ease',
			animDuration = 800;

		switch(animationName) {
		    case 'parallax':
		    	animationTop = 'translateUp.half';
		    	easing = 'easeInCubic';
		        break;
		}

		return [animationVisible, animationTop, animationBottom, animDuration, easing];
	}

	function setSectionAnimation(sectionOffset, windowHeight, animationName ) {
		// select section animation - normal scroll
		var scale = 1,
			translateY = 100,
			rotateX = '0deg',
			opacity = 1,
			boxShadowBlur = 0;
		
		if( sectionOffset >= -windowHeight && sectionOffset <= 0 ) {
			// section entering the viewport
			translateY = (-sectionOffset)*100/windowHeight;

		} else if( sectionOffset > 0 && sectionOffset <= windowHeight ) {
			//section leaving the viewport - still has the '.visible' class
			translateY = (-sectionOffset)*100/windowHeight;
			
			switch(animationName) {
				case 'parallax':
					translateY = (-sectionOffset)*50/windowHeight;
					break;

			}

		} else if( sectionOffset < -windowHeight ) {
			//section not yet visible
			translateY = 100;

		} else {
			//section not visible anymore
			translateY = -100;

			switch(animationName) {
				case 'parallax':
					translateY = -50;
					break;
			}
		}

		return [translateY, scale, rotateX, opacity, boxShadowBlur]; 
	}
	
	//menu navigation-------------------------------------------------------------------------------------------------
	$('#main-menu').on('click', 'a:not(#blog)', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        $('.cd-intro-content').css('transition', '');
		$('#side-menu').css('visibility', 'visible');
		menuUpdate($(this.hash));
    });
    
    $('#side-menu .menu-list').on('click', 'a:not(#blog)', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        menuUpdate($(this.hash));
        verticalNav.toggleClass('open');
    });
    
    function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	1000
        );
	};
	
	function menuUpdate(target) {
		$('.menu-list>li div').animate({
				height: '50px',
				width: '50px',
				marginLeft: '5px',
				marginTop: '0'
			});
			$('.cd-nav-trigger').css('bottom', '10px');
		if (target.is('#section2')) {
			$('.menu-list>li:first-of-type div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
			$('.cd-nav-trigger').css('bottom', '10px');
		}
		else if (target.is('#section3')) {
			$('.menu-list>li:nth-of-type(2) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
			$('.cd-nav-trigger').css('bottom', '10px');
		}
		else if (target.is('#section4')) {
			$('.menu-list>li:nth-of-type(3) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
			$('.cd-nav-trigger').css('bottom', '10vh');
		}
		else if (target.is('#section5')) {
			$('.menu-list>li:nth-of-type(5) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
			$('.cd-nav-trigger').css('bottom', '10px');
		}
		else if (target.is('#section6')) {
			$('.menu-list>li:nth-of-type(6) div').animate({
				height: '70px',
				width: '70px',
				marginLeft: '-5px',
				marginTop: '-10px'
			});
			$('.cd-nav-trigger').css('bottom', '10px');
		}
	}
	
	var verticalNav = $('.cd-vertical-nav'),
		scrolling = false,
		navigationItems = verticalNav.find('a'),
		navTrigger = $('.cd-nav-trigger');
		//scrollArrow = $('.cd-scroll-down');

	// open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNav.toggleClass('open');
    });
    
    $('#side-menu .local').on('click', 'a', function(event){
    	var currentSection = sectionsAvailable.filter('.visible');
    	var sectionId = currentSection.attr('id');
    	if (MQ == 'mobile') {
    		var offset = $(window).scrollTop() / $(window).height() + 1;
    		sectionId = 'section' + Math.round(offset);
    	}
    	if ($('html').attr('lang') == 'en') {
    		$(this).attr('href', 'ua/index.html#' + sectionId);
    	}
    	else {
    		$(this).attr('href', '../index.html#' + sectionId);
    	}
    });
	//end of menu navigation-------------------------------------------------------------------------------------------
	
	$('#section6 address ul:nth-of-type(2)>li:nth-of-type(2)').on('click', 'a', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
	
	// maps------------------------------------------------------------------------------------------------------------
	//set your google maps parameters
	var latitude = 50.441706,
		longitude = 30.538193,
		map_zoom = 17;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	if ($('html').attr('lang') == 'en') {
		var marker_url = ( is_internetExplorer11 ) ? '../includes/img/cd-icon-location.png' : '../includes/img/cd-icon-location.svg';
	}
	else {
		var marker_url = ( is_internetExplorer11 ) ? '../includes/img/cd-icon-location.png' : '../includes/img/cd-icon-location.svg';
	}
		
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;

	//we define here the style of the map
	var style= [
	  {
	    "featureType": "poi",
	    "elementType": "labels",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "road.highway",
	    "elementType": "labels",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "road.local",
	    "elementType": "labels.icon",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "road.arterial",
	    "elementType": "labels.icon",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "road",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "transit",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#2d313f" },
	      { "saturation": -21 },
	      { "lightness": 5 }
	    ]
	  },{
	    "featureType": "poi",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "saturation": -19 },
	      { "lightness": 5 },
	      { "color": "#98a3b0" }
	    ]
	  },{
	    "featureType": "poi.government",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#808080" }
	    ]
	  },{
	    "featureType": "poi.sports_complex",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#979f95" }
	    ]
	  },{
	    "featureType": "poi.attraction",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#bfb1a7" }
	    ]
	  },{
	    "featureType": "poi.business",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#9ea7c1" }
	    ]
	  },{
	    "featureType": "transit",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#b7aea5" }
	    ]
	  },{
	    "featureType": "transit.station",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#b5d3b7" }
	    ]
	  },{
	    "featureType": "landscape.man_made",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#959594" }
	    ]
	  },{
	    "featureType": "road",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#d4ebcd" }
	    ]
	  },{
	    "featureType": "road.highway",
	    "elementType": "geometry.fill",
	    "stylers": [
	      { "visibility": "on" }
	    ]
	  },{
	    "featureType": "landscape.man_made",
	    "elementType": "labels",
	    "stylers": [
	      { "color": "#ffffff" }
	    ]
	  }
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//add a custom marker to the map				
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	 	icon: marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map 
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
	// end of maps--------------------------------------------------------------------------------------------------------
	
	// form---------------------------------------------------------------------------------------------------------------
	if( $('.floating-labels').length > 0 ) floatLabels();

	function floatLabels() {
		var inputFields = $('.floating-labels .cd-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			//check if user is filling one of the form fields 
			checkVal(singleInput);
			singleInput.on('change keyup', function(){
				checkVal(singleInput);	
			});
		});
	}

	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
	}
	// end of form--------------------------------------------------------------------------------------------------------
	
	//industries------------------------------------------------------------------------------------------------------------
	
	$.fn.bgLoaded = function(custom) {
	 	var self = this;

		// Default plugin settings
		var defaults = {
			afterLoaded : function(){
				this.addClass('bg-loaded');
			}
		};

		// Merge default and user settings
		var settings = $.extend({}, defaults, custom);

		// Loop through element
		self.each(function(){
			var $this = $(this),
				bgImgs = $this.css('background-image').split(', ');
			$this.data('loaded-count',0);
			$.each( bgImgs, function(key, value){
				var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
				$('<img/>').attr('src', img).load(function() {
					$(this).remove(); // prevent memory leaks
					$this.data('loaded-count',$this.data('loaded-count')+1);
					if ($this.data('loaded-count') >= bgImgs.length) {
						settings.afterLoaded.call($this);
					}
				});
			});

		});
	};
	
	
	//cache DOM elements
	var projectsContainer = $('.cd-projects-container'),
		projectsPreviewWrapper = projectsContainer.find('.cd-projects-previews'),
		projectPreviews = projectsPreviewWrapper.children('li'),
		projects = projectsContainer.find('.cd-projects'),
		navigationTrigger = $('#section3 .cd-close-menu'),
		//if browser doesn't support CSS transitions...
		transitionsNotSupported = ( $('.no-csstransitions').length > 0);

	var animating = false,
		//will be used to extract random numbers for projects slide up/slide down effect
		numRandoms = projects.find('li').length, 
		uniqueRandoms = [];

	//open project
	projectsPreviewWrapper.on('click', 'a', function(event){
		event.preventDefault();
		if( animating == false ) {
			animating = true;
			navigationTrigger.add(projectsContainer).addClass('project-open');
			$(".cd-arrow").css("visibility", "hidden");
			$("#side-menu").css("visibility", "hidden");
			openProject($(this).parent('li'));
			navigationTrigger.css('visibility', 'visible');
			if(projectsContainer.hasClass('project-open')) {
				projectsContainer.animate({'scrollTop':$(window).height()}, 2000, 'swing'); 
			}
			MQ = deviceType();
			if( MQ == 'mobile' ) {
				$('.cd-nav-trigger').css('display', 'none');
			}
			$('body').on('scroll touchmove mousewheel', function(e){
			  e.preventDefault();
			  e.stopPropagation();
			  return false;
			});
		}
		if (MQ == 'desktop') {
			if ($('.cd-projects>li.selected').is('.cd-projects>li:nth-of-type(2n).selected')) {
				var top = $(window).height() - $('.cd-projects>li.selected .cd-project-info').height();
				$('.cd-projects>li.selected .cd-project-title').css('top', top);
			}
		}
	});

	navigationTrigger.on('click', function(event){
		event.preventDefault();
		
		if( animating == false ) {
			animating = true;
			if( navigationTrigger.hasClass('project-open') ) {
				//close visible project
				navigationTrigger.add(projectsContainer).removeClass('project-open');
				navigationTrigger.css('visibility', 'hidden');
				$(".cd-arrow").css("visibility", "visible");
				closeProject();
				$('body').off('scroll touchmove mousewheel');
				$("#side-menu").css("visibility", "visible");
				MQ = deviceType();
				if( MQ == 'mobile' ) {
					$('.cd-nav-trigger').css('display', 'block');
				}
			}
		}	

		if(transitionsNotSupported) animating = false;
	});

	//scroll down to project info
	/*projectsContainer.on('mouseover', function(){
		if(projectsContainer.hasClass('project-open')) {
			projectsContainer.animate({'scrollTop':$(window).height()}, 2000, 'swing'); 
		}
	});*/

	//check if background-images have been loaded and show project previews
	projectPreviews.children('a').bgLoaded({
	  	afterLoaded : function(){
	   		showPreview(projectPreviews.eq(0));
	  	}
	});

	function showPreview(projectPreview) {
		if(projectPreview.length > 0 ) {
			setTimeout(function(){
				projectPreview.addClass('bg-loaded');
				showPreview(projectPreview.next());
			}, 150);
		}
	}

	function openProject(projectPreview) {
		var projectIndex = projectPreview.index();
		projects.children('li').eq(projectIndex).add(projectPreview).addClass('selected');
		
		if( transitionsNotSupported ) {
			projectPreviews.addClass('slide-out').removeClass('selected');
			projects.children('li').eq(projectIndex).addClass('content-visible');
			animating = false;
		} else { 
			slideToggleProjects(projectPreviews, projectIndex, 0, true);
		}
	}

	function closeProject() {
		projects.find('.selected').removeClass('selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$(this).removeClass('content-visible').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
		});

		//if browser doesn't support CSS transitions...
		if( transitionsNotSupported ) {
			projectPreviews.removeClass('slide-out');
			projects.find('.content-visible').removeClass('content-visible');
			animating = false;
		}
	}

	function slideToggleProjects(projectsPreviewWrapper, projectIndex, index, bool) {
		if(index == 0 ) createArrayRandom();
		if( projectIndex != -1 && index == 0 ) index = 1;

		var randomProjectIndex = makeUniqueRandom();
		if( randomProjectIndex == projectIndex ) randomProjectIndex = makeUniqueRandom();
		
		if( index < numRandoms - 1 ) {
			projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool);
			setTimeout( function(){
				//animate next preview project
				slideToggleProjects(projectsPreviewWrapper, projectIndex, index + 1, bool);
			}, 150);
		} else if ( index == numRandoms - 1 ) {
			//this is the last project preview to be animated 
			projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				if( projectIndex != -1) {
					projects.children('li.selected').addClass('content-visible');
					projectsPreviewWrapper.eq(projectIndex).addClass('slide-out').removeClass('selected');
				} /*else if( navigation.hasClass('nav-visible') && bool ) {
					navigation.addClass('nav-clickable');
				}*/
				projectsPreviewWrapper.eq(randomProjectIndex).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				animating = false;
			});
		}
	}

	//http://stackoverflow.com/questions/19351759/javascript-random-number-out-of-5-no-repeat-until-all-have-been-used
	function makeUniqueRandom() {
	    var index = Math.floor(Math.random() * uniqueRandoms.length);
	    var val = uniqueRandoms[index];
	    // now remove that value from the array
	    uniqueRandoms.splice(index, 1);
	    return val;
	}

	function createArrayRandom() {
		//reset array
		uniqueRandoms.length = 0;
		for (var i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
	}
	// end of industries---------------------------------------------------------------------------------------------------
	
	//coverflow practices--------------------------------------------------------------------------------------------------
	var additional = '',
		quantity = $('#preview-coverflow>div').length,
		cycles = 4,
		n = quantity * cycles / 2;
	for (var i = 0; i < cycles; i++) {
		additional += ($('#preview-coverflow').html());
	}
	$('.cover:last-of-type').after(additional);
	
	
	$('#preview-coverflow').coverflow({
		index:			n,
		density:		2,
		innerOffset:	50,
		innerScale:		.7,
		animateStep:	function(event, cover, offset, isVisible, isMiddle, sin, cos) {
			if (isVisible) {
				if (isMiddle) {
					$(cover).css({
						'filter':			'none',
						'-webkit-filter':	'none'
					});
				} else {
					var brightness	= 0.85 + Math.abs(sin),
						contrast	= 1 - Math.abs(sin),
						filter		= 'contrast('+contrast+') brightness('+brightness+')';
					$(cover).css({
						'filter':			filter,
						'-webkit-filter':	filter
					});
				}
			}
		}
	});
	
	
	var sliderContainers = $('.cd-slider-wrapper');
	if($(window).width() > 767) {
		if ($('html').attr('lang') == 'en') {
			$('.cd-slider .image').append('<h1>PRACTICES</h1>');
		}
		else {
			$('.cd-slider .image').append('<h1>ПРАКТИКИ</h1>');
		}
	}
	
	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
    	slidesToShow: 3,
    	slidesToScroll: 1,
    	asNavFor: '.slider-for',
    	dots: true,
    	centerMode: true,
    	focusOnSelect: true
	});

	if( sliderContainers.length > 0 ) initBlockSlider(sliderContainers);

	function initBlockSlider(sliderContainers) {
		sliderContainers.each(function(){
			var sliderContainer = $(this),
				slides = sliderContainer.children('.cd-slider').children('li');
				//sliderPagination = createSliderPagination(sliderContainer);

			if($(window).width() < 768) {
				//$('.cd-slider-wrapper').css('height', $(window).height() - $('.slider-nav').height());
				$('.slick-slide p').css('margin-top', ($('.slick-slide').height() - $('.slick-slide p').height()) / 2);
				$('.slick-slide p').css('margin-bottom', ($('.slick-slide').height() - $('.slick-slide p').height()) / 2);
				$('.slider-nav div').on('focus', function(event){
					event.preventDefault();
					var selected = $(this),
						index = selected.data('number');
					updateSlider(index, slides);
				});
			}
			else {
				$('.cover').on('click', function(event){
					event.preventDefault();
					var selected = $(this),
						index = selected.data('number');
					updateSlider(index, slides);
				});
			}

			sliderContainer.on('swipeleft', function(){
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if(!visibleSlide.is(':last-child') && bool) {updateSlider(visibleSlideIndex + 1, sliderPagination, slides);}
			});

			sliderContainer.on('swiperight', function(){
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if(!visibleSlide.is(':first-child') && bool) {updateSlider(visibleSlideIndex - 1, sliderPagination, slides);}
			});
		});
	}

	function updateSlider(n, slides) {
		//navigation.removeClass('selected').eq(n).addClass('selected');
		slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

		//fixes a bug on Firefox with ul.cd-slider-navigation z-index
		/*navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$(this).removeClass('slider-animating');
		});*/
	}

	function enableSwipe(container) {
		return ( container.parents('.touch').length > 0 );
	}
	//end of coverflow ptactices------------------------------------------------------------------------
	
	//bio--------------------------------------------------------------------------------------------
	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

	var pad = ($('#section5 .cd-container').width() * 0.31 - $('#section5 img').width()) / 2;
	$('#section5 li').css('padding-left', pad);
	$('#section5 li').css('padding-right', pad);
	
	//open team-member bio
	$('#section5').find('ul a').on('click', function(event){
		event.preventDefault();
		var selected_member = $(this).data('type');
		$('.cd-member-bio.'+selected_member+'').addClass('slide-in');
		$('.cd-member-bio-close').addClass('is-visible');
		MQ = deviceType();
		if( MQ == 'mobile' ) {
			$('.cd-nav-trigger').css('display', 'none');
			/*$('body>*:not(.cd-member-bio)').on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
				e.stopPropagation();
				return false;
			});*/
			$('body').css('overflow-y', 'hidden');
			$('.cd-member-bio').css('overflow-y', 'auto');
		}
		else {
			$('body').on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}

		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( is_firefox ) {
			$('#section5').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
		} else {
			$('#section5').addClass('slide-out');
			$('body').addClass('overflow-hidden');
		}

	});

	//close team-member bio
	$(document).on('click', '.cd-overlay, .cd-member-bio-close', function(event){
		event.preventDefault();
		$('.cd-member-bio').removeClass('slide-in');
		$('.cd-member-bio-close').removeClass('is-visible');
		MQ = deviceType();
		if( MQ == 'mobile' ) {
			$('.cd-nav-trigger').css('display', 'block');
			//$('body>*:not(.cd-member-bio)').off('scroll touchmove mousewheel');
			$('body').css('overflow-y', 'auto');
			//$('.cd-member-bio').css('overflow-y', 'auto');
		}
		else {
			$('body').off('scroll touchmove mousewheel');
		}

		if( is_firefox ) {
			$('#section5').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('#section5').removeClass('slide-out');
			$('body').removeClass('overflow-hidden');
		}
	});
	//end of bio------------------------------------------------------------------------
	
	//send mail------------------------------------------------------------------------
	$('#section7 button').on('click', function(){
		sendMailQuestion();
	});
	
	function sendMailQuestion(){ 
		$.get('http://chajka.com.ua/scripts/sendMail.php', 
		{ 
		'name': document.getElementById('cd-name').value/* + ' ' + document.getElementById('sNameQuestion').value*/, 
		'mail': document.getElementById('cd-email').value, 
		'subject': 'Питання', 
		'text' : document.getElementById('cd-textarea').value + '\r\nНомер телефону' + document.getElementById('cd-phone').value}, function (response) {/* 
		if (response == 0)*$("#sucessMailSend").click();} 
		else{$("#failMailSend").click();} 
		*/}); 
		
		} 
		
	function resetQuestionInputs(){ 
		document.getElementById('cd-name').value = ''; 
		//document.getElementById('sNameQuestion').value = ''; 
		document.getElementById('cd-email').value = ''; 
		document.getElementById('cd-textarea').value = ''; 
		document.getElementById('cd-phone').value = ''; 
	}
	//end of send mail------------------------------------------------------------------------
	
});

/* Custom effects registration - feature available in the Velocity UI pack */
//none
$.Velocity
    .RegisterEffect("translateUp", {
    	defaultDuration: 1,
        calls: [ 
            [ { translateY: '-100%'}, 1]
        ]
    });
$.Velocity
    .RegisterEffect("translateDown", {
    	defaultDuration: 1,
        calls: [ 
            [ { translateY: '100%'}, 1]
        ]
    });
$.Velocity
    .RegisterEffect("translateNone", {
    	defaultDuration: 1,
        calls: [ 
            [ { translateY: '0', opacity: '1', scale: '1', rotateX: '0', boxShadowBlur: '0'}, 1]
        ]
    });
//parallax
$.Velocity
    .RegisterEffect("translateUp.half", {
    	defaultDuration: 1,
        calls: [ 
            [ { translateY: '-50%'}, 0]
        ]
    });
