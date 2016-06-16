jQuery(document).ready(function($){
	//open menu
	$('.cd-menu-trigger').on('click', function(event){
		event.preventDefault();
		$('#cd-main-content').addClass('move-out');
		$('#main-nav').addClass('is-visible');
		$('.cd-shadow-layer').addClass('is-visible');
	});
	//close menu
	/*$('.cd-close-menu').on('click', function(event){
		event.preventDefault();
		$('#cd-main-content').removeClass('move-out');
		$('#main-nav').removeClass('is-visible');
		$('.cd-shadow-layer').removeClass('is-visible');
	});*/

	//clipped image - blur effect
	set_clip_property();
	$(window).on('resize', function(){
		set_clip_property();
	});

	function set_clip_property() {
		var $header_height = $('.cd-header').height(),
			$window_height = $(window).height(),
			$header_top = $window_height - $header_height,
			$window_width = $(window).width();
		$('.cd-blurred-bg').css('clip', 'rect('+$header_top+'px, '+$window_width+'px, '+$window_height+'px, 0px)');
	}
	
	$('li:first-of-type').on('click', function(event) {
		event.preventDefault();
		$('#main-nav').addClass('move-out');
		$('#first').addClass('is-visible');
		$('.cd-close-menu').addClass('inner');
		$('.cd-shadow-layer').addClass('is-visible');
	});
	$('li:nth-of-type(2)').on('click', function(event) {
		event.preventDefault();
		$('#main-nav').addClass('move-out');
		$('#second').addClass('is-visible');
		$('.cd-close-menu').addClass('inner');
		$('.cd-shadow-layer').addClass('is-visible');
	});
	$('li:nth-of-type(3)').on('click', function(event) {
		event.preventDefault();
		$('#main-nav').addClass('move-out');
		$('#third').addClass('is-visible');
		$('.cd-close-menu').addClass('inner');
		$('.cd-shadow-layer').addClass('is-visible');
	});
	$('li:nth-of-type(4)').on('click', function(event) {
		event.preventDefault();
		$('#main-nav').addClass('move-out');
		$('#forth').addClass('is-visible');
		$('.cd-close-menu').addClass('inner');
		$('.cd-shadow-layer').addClass('is-visible');
	});
	
	
	$('.cd-close-menu').on('click', function(event){
		event.preventDefault();
		if ($('.cd-close-menu').hasClass('inner')) {
			$('#main-nav').removeClass('move-out');
			$('.industry').removeClass('is-visible');
			$('.cd-close-menu').removeClass('inner');
			$('.cd-shadow-layer').removeClass('is-visible');
		}
		else {
			$('#cd-main-content').removeClass('move-out');
			$('#main-nav').removeClass('is-visible');
			$('.cd-shadow-layer').removeClass('is-visible');
		}
	});
});