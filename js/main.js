jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;
	var currentNav = $('nav ul li').filter('.current'),
	passedNav = $('nav ul li').filter('.passed:last-child'),
	nextNav = currentNav.next();

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);
	
	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); 
			hideBlocks(timelineBlocks, offset);
			
			});
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			/*if ($('.cd-timeline-block:nth-of-type(5) .cd-timeline-content').hasClass('bounce-in')) {
				$('nav ul li:nth-of-type(5)').removeClass('current');
				$('nav ul li:nth-of-type(5)').addClass('passed');
				/*$('.cd-timeline-block:nth-of-type(5) .cd-timeline-img').css('visibility', 'hidden');*/
				/*$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').css('visibility', 'visible');*/
				/*$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').addClass('bounce-in');
			}
			else if ($('.cd-timeline-block:nth-of-type(4) .cd-timeline-content').hasClass('bounce-in')) {
				$('nav ul li:nth-of-type(4)').removeClass('current');
				$('nav ul li:nth-of-type(4)').addClass('passed');
				/*$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').css('visibility', 'hidden');*/
				/*$('.cd-timeline-block:nth-of-type(3) .cd-timeline-img').addClass('bounce-in');
			}
			else if ($('.cd-timeline-block:nth-of-type(3) .cd-timeline-content').hasClass('bounce-in')) {
				$('nav ul li:nth-of-type(3)').removeClass('current');
				$('nav ul li:nth-of-type(3)').addClass('passed');
				/*$('.cd-timeline-block:nth-of-type(3) .cd-timeline-img').css('visibility', 'hidden');*/
				/*$('.cd-timeline-block:nth-of-type(2) .cd-timeline-img').addClass('bounce-in');
			}
			else if ($('.cd-timeline-block:nth-of-type(2) .cd-timeline-content').hasClass('bounce-in')) {
				$('nav ul li:nth-of-type(2)').removeClass('current');
				$('nav ul li:nth-of-type(2)').addClass('passed');
				/*$('.cd-timeline-block:nth-of-type(2) .cd-timeline-img').css('visibility', 'hidden');*/
				/*$('.cd-timeline-block:first-of-type .cd-timeline-img').addClass('bounce-in');
			}
			else if ($('.cd-timeline-block:first-of-type .cd-timeline-content').hasClass('bounce-in')) {
				$('nav ul li:first-of-type').removeClass('current');
				$('nav ul li:first-of-type').addClass('passed');
				/*$('.cd-timeline-block:first-of-type .cd-timeline-img').css('visibility', 'hidden');*/
			//}
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			if ($('.cd-timeline-block:nth-of-type(2) .cd-timeline-content').hasClass('is-hidden')) {
				$('nav ul li:first-of-type').addClass('current');
			}
			else if ($('.cd-timeline-block:nth-of-type(3) .cd-timeline-content').hasClass('is-hidden')){
				$('.cd-timeline-block:first-of-type .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(3) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(5) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(2) .cd-timeline-img').css('visibility', 'visible');
				$('nav ul li:first-of-type').removeClass('current');
				$('nav ul li:first-of-type').addClass('passed');
				$('nav ul li:nth-of-type(2)').addClass('current');
			}
			else if ($('.cd-timeline-block:nth-of-type(4) .cd-timeline-content').hasClass('is-hidden')){
				$('.cd-timeline-block:nth-of-type(2) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(5) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:first-of-type .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(3) .cd-timeline-img').css('visibility', 'visible');
				$('nav ul li:nth-of-type(2)').removeClass('current');
				$('nav ul li:nth-of-type(2)').addClass('passed');
				$('nav ul li:nth-of-type(3)').addClass('current');
			}
			else if ($('.cd-timeline-block:nth-of-type(5) .cd-timeline-content').hasClass('is-hidden')){
				$('.cd-timeline-block:nth-of-type(3) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(5) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(2) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:first-of-type .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').css('visibility', 'visible');
				$('nav ul li:nth-of-type(3)').removeClass('current');
				$('nav ul li:nth-of-type(3)').addClass('passed');
				$('nav ul li:nth-of-type(4)').addClass('current');
			}
			else {
				$('.cd-timeline-block:nth-of-type(4) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(2) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(3) .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:first-of-type .cd-timeline-img').css('visibility', 'hidden');
				$('.cd-timeline-block:nth-of-type(5) .cd-timeline-img').css('visibility', 'visible');
				$('nav ul li:nth-of-type(4)').removeClass('current');
				$('nav ul li:nth-of-type(4)').addClass('passed');
				$('nav ul li:nth-of-type(5)').addClass('current');
			}
		});
	}
	
	// maps------------------------------------------------------------------------------------------------------------
	//set your google maps parameters
	var latitude = 50.44959704,
		longitude = 30.5094637,
		map_zoom = 17;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';
		
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;

	//we define here the style of the map
	var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		//style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
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
    };
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
		    map.setZoom(map.getZoom()+1);
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1);
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
	// end of maps--------------------------------------------------------------------------------------------------------
	
	// forms--------------------------------------------------------------------------------------------------------------
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
	// end of forms--------------------------------------------------------------------------------------------------------
});