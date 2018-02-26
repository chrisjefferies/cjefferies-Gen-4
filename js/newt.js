//
// ********** NEWT ***********
//
// include(jquery.2.1.4.min.js);

$(document).ready(function() {

	// Specify screen size where Newt activates. Hide desktop nav in css
	var breakPoint = 768; 

	// ## Error handling.
	// Reset to default state on screen flip. Prevents wonky layout on iOS.
	$(window).resize(function() {
		var w = $(window).width()
		if (w < breakPoint) {
			$('.newt-logo-area img').css('margin-left', ((w - $('.newt-logo-area img').width()) / 2) );
			if ( $('.newt-search input').is(':visible') ) {
				$('.newt-search').css('width', (w - 50) );
			}
		}
	});

	// ## Primary function
	// Respond to user interaction and toggle menu on/off
	$('.newt-menu, .newt-mask').click(function() {
		// Query State, set variables accordingly
		var x = $('.newt-menu').is(':visible'), w = $(window).width(), y;
		x? y=0: y=300;
		$('.newt-menu').delay(y).fadeToggle(200);
		if (w < breakPoint) {
			$('.newt-mask, nav').animate({ width: 'toggle' }, 300);
		} else {
			$('nav').animate({ width: 'toggle' }, 300);
			$('.newt-mask').fadeToggle(300);
		}
		$('nav ul li p, nav .cart-link p').delay(300 - y).fadeToggle(200);
	});

	// ## Secondary function
	// Replace logo/header area with search
	$('.newt-search').click(function() {
		var w = $(window).width();
		if ( !($('.newt-search input').is(':visible')) && w < breakPoint ) {
			$('.newt-logo-area img').fadeOut(100);
			$('.newt-search .newt-mag').delay(150).fadeOut(300);
			$('.newt-search').animate({ width: (w - 50) }, 400, function() {
				$('.newt-search input').css('opacity', 0).delay(100).animate({width: 'toggle', opacity: 1}, 400, function() {
					$(this).focus();
				});
			});
		}
	});

	// ## Secondary function
	// Return logo/header/search to default state if abandoned.
	$(window).scroll(function() {
		var w = $(window).width();
		if ( $('.newt-search input').is(':visible') && !($('.newt-search input').is(':focus')) && w < breakPoint ) {          
			$('.newt-search input').hide();
			$('.newt-search').animate({ width: 50 }, 400);
			$('.newt-search .newt-mag').delay(400).fadeIn(200);
			$('.newt-logo-area img').delay(500).fadeIn(200);
		}
	});
});












