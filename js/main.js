jQuery(document).ready(function($){
	
	
	
	var additional = '',
		quantity = $('#preview-coverflow>div').length,
		cycles = 4,
		n = quantity * cycles / 2;
	for (var i = 0; i < cycles; i++) {
		additional += ($('#preview-coverflow').html());
	}
	$('.practice_16').after(additional);
	
	
	
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
					var brightness	= 1 + Math.abs(sin),
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
				$('.cd-slider-wrapper').css('height', $(window).height() - $('.slider-nav').height());
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
  
});