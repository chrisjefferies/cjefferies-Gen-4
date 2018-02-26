$(document).ready(function() {
	if (window.location.href.indexOf('minify') > -1) {
		// parse through for images to minify and send them to ec2 via ajax. 
		$('img, .img-bck').each(function() {
			var img_url = $(this).attr('src');
			$.ajax({
				type: POST,
				url: aws,
				data: img_url,
				success: function(msg) {
					console.log(msg);
				},
				error: function(msg) {
					console.log('ERROR: ');
					console.log(msg);
				}
			})
		})
	}
})