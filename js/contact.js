$(document).ready(function() {
	$('#submit').click(function() {
		var data = {
			name: $('#name').val(),
			email: $('#email').val(),
			subject: $('#subject').val(),
			message: $('#message').val()
		}
		$.ajax({
			url: 'contact.php',
			type: 'POST',
			data: data,
			success: function(msg) {
				console.log(msg);
				$('#contact input, #contact textarea, #submit').each(function() {
					$(this).fadeOut(400);
				});
				$('#contact p').fadeOut(200).delay(500).text('Thanks for reaching out! I\'ll be in touch shortly.').fadeIn(500);
			},
			error: function(msg) {
				console.log('ERROR');
				console.log(msg);
			}
		});
	});
});
















