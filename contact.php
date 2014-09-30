
<?php
    $subject = $_POST['subject'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'contact-form'; 
    $to = 'chris@cjefferies.com';
    $human = $_POST['human'];
			
    
    //$body = "From: $name\n E-Mail: $email\n Message:\n $message";
    $body = "
Subject: $subject\n
First: $firstname\n
Last: $lastname\n
E-Mail: $email\n
Message:\n $message
";
				
	if ($_POST['submit'] && $human == '4') 
		{
			if (mail ($to, $subject, $body, $from)) 
				{
					echo '
						<div id="contact">
							<div id="download-link-contact">
								<h2>
									Thanks!
								</h2>
								<h2>
									Redirecting to <a href="portfolio.html">Portfolio</a>...
								</h2>
							</div>
						</div>
						';
				} 
			else { 
					echo '
							<div id="contact"><h2>Something went wrong.</h2></div>	
							'; 
				} 
		} 
	else if ($_POST['submit'] && $human != '4') 
		{
			if (mail ($to, $subject, $body, $from)) 
				{
					echo '
						<div id="contact">
							<div id="download-link-contact">
								<h2>
									Thanks!
								</h2>
								<h2>
									Redirecting to <a href="portfolio.html">Portfolio</a>...
								</h2>
							</div>
						</div>
						';
				} 
			else { 
					echo '<div id="contact"><h2>Something went wrong.</h2></div>'; 
				} 
		}
       
?>





<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="initial-scale=1">
  <title>Graphic Design by Chris Jefferies</title>
  <meta name="description" content="Corporate Identity, Web Design & Illustration">
  			
  			<!-- .less .css -->
  <link rel="stylesheet" type="text/css" href="css/nav.css">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  			 
  			
  			<!-- .less style links for DEVELOPMENT COMMENT OUT AFTER COMPILE, BEFORE COMMIT 
  <link rel="stylesheet/less" type="text/css" href="less/nav.less" />
  <link rel="stylesheet/less" type="text/css" href="less/style.less" />
  			-->
  			
  			<!-- js for uncompiled .less 
  <script src="js/less-1.6.1.js" type="text/javascript"></script>
			-->


  		<!-- Google Web Fonts -->
  <link href='http://fonts.googleapis.com/css?family=Ubuntu:400,700,300' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Sintony:400,700' rel='stylesheet' type='text/css'>  
  
  
  
  		<!-- Google Analytics -->
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-43651845-2', 'cjefferies.com');
  ga('send', 'pageview');
  
  </script>
  
  <meta http-equiv="refresh" content="3;URL='portfolio.html'" />
  
</head>

<body>
	
	<div id="footer">
		<img src="images/mi.png" alt="Michigan">
		<p>Born & Raised.</p>
		<p>© 2014 | this website is 100%, lovingly hand-coded by Chris Jefferies</p>
		
	</div>
	
</body>
</html>	












