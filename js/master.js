function loopDemo() {
	window.loopDemoOnce =! 0,
	$(".demo-menu, .demo-mask, .demo-btn").toggleClass("active"),
	setTimeout(function() {
		$(".offer").toggleClass("active")
	},800),
	setTimeout(function() {
		$(".demo-menu, .demo-mask, .demo-btn, .offer").toggleClass("active")
	},2500)
}

function endDemo() {
	$(".newt-demo .screen").html('<p style="text-align:center"><br>Tired of looking at this nav screen bounce around?<br><br>Yeah, me too.</p><div class="gif"></div>').css("background","#fff")
}

$(document).ready(function() {
	$(".skill").hover(function() {
		$(window).width() > 1080 && ($(this).next(".skill").find(":first-child").addClass("adjacent"),
			$(this).prev(".skill").find(":first-child").addClass("adjacent"),
			$(this).find(":nth-child(2)").animate({opacity:1},300))
	},function() {
		$(window).width() > 1080 && ($(this).next(".skill").find(":first-child").removeClass("adjacent"),
			$(this).prev(".skill").find(":first-child").removeClass("adjacent"),
			$(this).find(":nth-child(2)").delay(200).animate({opacity:.1},300))
	}),

	$(".hockey-project").hide(),
	$("#view-hockey-ps").click(function() {
		$(".ps-like-a-pro .content").animate({opacity:0},500),
		$(".hockey-project").slideDown(800);
		var a = $(".ps-like-a-pro").offset();
		$("body, html").animate({scrollTop:a.top + $(".ps-like-a-pro").height()},500)
	}),

	$("#show-newt-code").click(function() {
		$(".newt-code").slideDown(500),
		$("body, html").animate({scrollTop:offset.top+$(".newt-demo").height()},500)
	}),

	$(".newt-demo .screen").click(function() {
		$(".newt-demo .screen").html('<p style="text-align:center"><br>o. o no. you broke it.</p><div class="gif"></div>').css("background","#fff")
	}),
	
	$(".sites-tmp").hover(function() {
		$(".hoverstate").css("top","-105%"),
		$(".defaultstate").css("top","-100%")
	},function() {
		$(".hoverstate").css("top","-5%"),
		$(".defaultstate").css("top",0)
	});

	var a = ".newt-",
	b = 9999;

	$(window).width() < b && $(a + "logo-area img").css("margin-left",(
		$(window).width()-$(a+"logo-area img").width())/2),$(window).resize(function(){var c=$(window).width();b>c&&($(a+"logo-area img").css("margin-left",(c-$(a+"logo-area img").width())/2),$(a+"search input").is(":visible")&&$(a+"search").css("width",c-50))}),$(a+"menu, .newt-mask").click(function(){var b,c=$(a+"menu").is(":visible"),d=$(window).width();b=c?0:500,$(a+"menu").delay(b).fadeToggle(200),768>d?$(a+"mask, nav").animate({width:"toggle"},500):($("nav").animate({width:"toggle"},500),$(a+"mask").fadeToggle(500)),$("nav ul li p, nav .cart-link p").delay(300-b).fadeToggle(200)}),$(a+"search").click(function(){var c=$(window).width();!$(a+"search input").is(":visible")&&$(window).width()<b&&($(a+"logo-area img").fadeOut(100),$(a+"search .newt-mag").delay(150).fadeOut(300),$(a+"search").animate({width:c-50},400,function(){$(a+"search input").css("opacity",0).delay(100).animate({width:"toggle",opacity:1},400,function(){$(this).focus()})}))}),$(window).scroll(function(){$(a+"search input").is(":visible")&&!$(a+"search input").is(":focus")&&$(window).width()<b&&($(a+"search input").hide(),$(a+"search").animate({width:50},400),$(a+"search .newt-mag").delay(400).fadeIn(200),$(a+"logo-area img").delay(500).fadeIn(200))})});











