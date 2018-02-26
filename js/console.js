function countTabs(line_of_code) {
	if (line_of_code.charAt(0) == '	') {
		var tab_correct = line_of_code.split('	');
		var a_tab = '    ';
		return a_tab.repeat((tab_correct.length - 1));
	} else {
		return '';
	}
}

function eatTabs(line_of_code) {
	if (line_of_code.charAt(0) == '	') {
		var tab_correct = line_of_code.split('	');
		return tab_correct[tab_correct.length - 1];
	} else {
		return line_of_code;
	}
}

function parseLess(str) {

	debug_mode && log('Parsing Less code for syntax highlighting. Begining Loop.');

	var less_lines = str.split(/\r\n|\r|\n/);
	for (var i = 0 ; i < less_lines.length ; i++) {

		var tabs = countTabs(less_lines[i]);
		less_lines[i] = eatTabs(less_lines[i]);

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
				less_lines[i] = tabs;
				less_lines[i] += '<span class="less-' + rule + '">' + sel_split[0] + '</span> {\n' ;
				break;
			case 'declaration':
				dec_split = less_lines[i].split(':');
				less_lines[i] = tabs + '<span class="less-prop">' + dec_split[0] + '</span>:' ;
				less_lines[i] += '<span class="less-val">' + dec_split[1] + '</span>\n';
				break;
			case 'variable': 
				less_lines[i] = '<span class="less-var">' + less_lines[i] + '</span>';
			case 'comment':
			default:
				// No fix, just reapply the new line character.
				var content = tabs + less_lines[i] + '\n';
				less_lines[i] = content;
				break;
		}

		// Handle semi-colons. 
		if (less_lines[i].indexOf(';') > -1) {
			less_lines[i] = less_lines[i].replace(/;/, '<span class="less-semi">;</span>');
		}
	}
	debug_mode && log('Loop complete. Returning HTML structured code block.');
	return less_lines;
}

function toggle_console() {
	// $('html').toggleClass('console');
	debug_mode && log('Toggle console activate. Detecting console state to change.');
	if ($('#console').is(':visible')) {
		$('html').removeClass('console').animate({width: '100%', marginLeft: 0},500);
	} else {
		$('html').addClass('console').animate({width: '75%', marginLeft: '25%'},500);
	}
	
	$('#console').animate({width: 'toggle'},500);

	// Default starting data
	getFile('less');
}

function getFile(file) {

	debug_mode && log('Data transport utility, here. Fetching data: ' + file);

	var locat;

	(file == 'less')?locat = 'less/style.less':null;
	(file == 'js')?locat = 'js/script.js':null;
	(file == 'console')?locat = 'js/console.js':null;
	
	$.get(locat, function(resp) {
		debug_mode && log('Got something!');
		if (file == 'less') {
			$('#console code').html(parseLess(resp));
		} 
		if (file == 'js') {
			$('#console code').html(resp);
			// $('#console code').each(function(i, block) {
			// 	hljs.highlightBlock(block);
			// });
		}
	});
}

$(document).ready(function() {
	$('[data-console]').click(function() {
		debug_mode && log('Opening console via [data-console] and providing default data.');
		// Feed console new information
		getFile( $(this).attr('data-console') );
	});

	$('[toggle-console]').click(function() {
		debug_mode && log('Toggle console activated. Initiating detection measures.');
		toggle_console();
	})

	if (window.location.href.indexOf('console') > -1) {
		debug_mode && log('Override command for console detected. Automatically initiating.');
		toggle_console();
	}

	// $('[id]').click(function() {
	// 	console.log('looking for: ' + $(this).attr('id'));
	// 	for (i = 0 ; i < code_string.length ; i++) {
	// 		if (code_string[i].indexOf($(this).attr('id')) > -1) {
	// 			console.log('found at line: ' + i);
	// 			console.log('set margin: ' + (-i * line_size));
	// 			$('#console code').css('margin-top', -(i * line_size));
	// 			exit;
	// 		}
	// 	}
	// });
});
























