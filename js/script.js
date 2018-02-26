var debug = false;

// This is how you activate DEBUG MODE
// Logs are short-circuited for cleaner readability.
if (window.location.href.indexOf('debug') > -1) {
	debug = true;
}

function log(on_off, msg) {
	if (on_off) {
		console.log(msg);
	}
}

$(document).ready(function() {
	
	var env;
	$(window).width > 768 ? env = 'sm' : env = 'lg';

	log(debug, 'Document Ready. Debug mode activated.');

	setTimeout(function() {
		log(debug, 'Attaching listener to scroll for exit modal');
		if (env == 'lg') {
			$(window).mousemove(function(e) {
				if (e.clientY < 10 && $('#console-modal').attr('data-expired') == 'false' ) {
					log(debug, 'Imminent exit detected. Showing modal.');
					$('#console-modal').attr('data-expired', 'false').fadeIn(200);
				}
			});
		}
	},10000);

	// Dropdown content Utility
	$('[data-target]').each(function() {
		if (!$('html').hasClass('ready')) {
			log(debug, 'Identifying targets of toggle utilities. Registering computed CSS height. Hiding.');
			var target = $(this).attr('data-target');
			$(target).attr('data-height', $(target).height()).hide();
		}
	});

	// Hidden content Controller
	$('[data-target]').click(function() {
		log(debug, 'Button with external target clicked. Identifying content block to show.');
		var target = $(this).attr('data-target');
		$(target).slideDown('slow');
		$('body, html').animate({
			scrollTop: $(target).offset().top - 100
		}, 500);
	});

	// Toggle button utility
	$('[toggle-target]').click(function() {
		log(debug, 'Toggle controller activated.');
		var target = $(this).attr('toggle-target');
		var manipulate = $(this).attr('toggle-class');
		$(this).parents(target).toggleClass(manipulate);
		$(this).find('span').toggleClass('active');
	});

	// Temporary fix while markup is restructered to rely on CSS and z-index.
	$(window).scroll(function(e) {
		log(debug, 'SCROLL LOG');
		$('.arrow').css('top', $(window).scrollTop() - $('#newt').offset().top + 6 );
	});

	// Init Modal
	$('[init-modal]').click(function() {
		log(debug, 'Modal initiation clicked. Showing modal.');
		if (env == 'lg' && $( $(this).attr('init-modal') ).attr('data-expired') == 'false' ) {
			$( $(this).attr('init-modal') ).attr('data-expired', true).delay(1500).fadeIn(500);
		}
	});

	// Close utility
	$('[data-dismiss]').click(function() {
		log(debug, 'Dismiss button clicked. Dismissing specified target.');
		$(this).parents('[data-dismiss="target"]').attr('data-expired', true).fadeOut(300);
	});

	$('[data-console]').click(function() {
		log(debug, 'Opening console via [data-console] and providing default data.');
		// Feed console new information
		getFile( $(this).attr('data-console') );
	});

	$('[toggle-console]').click(function() {
		log(debug, 'Toggle console activated. Initiating detection measures.');
		toggle_console();
	})

	if (window.location.href.indexOf('console') > -1) {
		log(debug, 'Override command for console detected. Automatically initiating.');
		toggle_console();
	}

	$('html').addClass('ready');

});





// ------------------------------- //
// * These all run this console! * //
// ------------------------------- //

// Woah, man, this is so meta.

// LESS SYNTAX HIGHLIGHT MAIN
function parseLess(str) {

	log(debug, 'Parsing Less code for syntax highlighting. Begining Loop.');

	var less_lines = str.split(/\r\n|\r|\n/);
	for (var i = 0 ; i < less_lines.length ; i++) {

		var rule = 'nothing';
		var modifier = false;
		var sel_char = '#';

		// Handle Quotes for Strings.
		if (less_lines[i].indexOf('\"') > -1) {
			less_lines[i] = less_lines[i].replace(/"/, '<span class="less-quot">"');
			less_lines[i] = less_lines[i].replace(/";/, '"</span>;');
			less_lines[i] = less_lines[i].replace(/"\);/, '"</span>\);');
		}

		// Define Rule for Less Syntax Handler
		if (less_lines[i].charAt(0) == '/') {
			rule = 'comment';
		} else if (less_lines[i].charAt(0) == '#' || less_lines[i].charAt(0) == '.') {
			rule = 'sel';
		} else if (less_lines[i].indexOf('{') > -1) {
			if (less_lines[i].indexOf('#') > -1 || less_lines[i].indexOf('.') > -1) {
				rule = 'el';
				modifier = true;
			} else {
				rule = 'el';
			}
		} else if (less_lines[i].indexOf(':') > -1) {
			rule = 'declaration';
		} else if (less_lines[i].charAt(0) == '@') {
			rule = 'variable';
		}

		// Handle Less Syntax
		switch(rule) {
			case 'sel':
			case 'el':
				sel_split = less_lines[i].split('{');
				if (modifier) {
					if (sel_split[0].indexOf('#') > -1) {
						sub_split = sel_split[0].split('#');
					} else {
						sub_split = sel_split[0].split('.');
						sel_char = '.';
					}
					sel_split[0] = sub_split[0] + '<span class="less-sel">' + sel_char + sub_split[1] + '</span>'; 
				}
				less_lines[i] = '<span class="less-' + rule + '">' + sel_split[0] + '</span> {\n' ;
				break;
			case 'declaration':
				dec_split = less_lines[i].split(':');
				less_lines[i] = '<span class="less-prop">' + dec_split[0] + '</span>:' ;
				less_lines[i] += '<span class="less-val">' + dec_split[1] + '</span>\n';
				break;
			case 'variable': 
				less_lines[i] = '<span class="less-var">' + less_lines[i] + '</span>';
			case 'comment':
			default:
				// No fix, just reapply the new line character.
				var content = less_lines[i] + '\n';
				less_lines[i] = content;
				break;
		}

		// Handle semi-colons. 
		if (less_lines[i].indexOf(';') > -1) {
			less_lines[i] = less_lines[i].replace(/;/, '<span class="less-semi">;</span>');
		}
	}
	log(debug, 'Loop complete. Returning HTML structured code block.');
	return less_lines;
}

function toggle_console() {
	log(debug, 'Toggle console activated. Detecting console state to change.');

	if ($('html').hasClass('console')) {
		$('html').removeClass('console').animate({width: '100%', marginLeft: 0}, 500);
	} else {
		$('html').addClass('console').animate({width: '75%', marginLeft: '25%'}, 500);
		// Default starting data
		getFile('less');
	}
	
	$('#console').animate({width: 'toggle'}, 500);
}

function getFile(file) {
	log(debug, 'Data transport utility, here. Fetching data: ' + file);

	var locat;

	(file == 'less')?locat = 'less/style.less':null;
	(file == 'js')?locat = 'js/script.js':null;
	
	$.get(locat, function(resp) {
		log(debug, 'Got something!');
		if (file == 'less') {
			$('#console code').html(parseLess(resp));
		} 
		if (file == 'js') {
			$('#console code').html(resp);
			$('#console code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
		}
	}, 'text');
}







