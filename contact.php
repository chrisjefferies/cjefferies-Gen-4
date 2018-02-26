<?php

require('config/email.php');

function sanitize($string, $opt) {
	if ($opt) {
		$str = filter_var($string, FILTER_SANITIZE_EMAIL);
	} else {
		$str = filter_var($string, FILTER_SANITIZE_ENCODED);
	}
	$str = str_replace('%20', ' ', $str);
	return $str;
}

if (isset($_POST['name'])) {
	$name = sanitize($_POST['name']);
} else {
	die();
}

$subject = sanitize($_POST['subject']);

$email = sanitize($_POST['email'], true);
$message = sanitize($_POST['message']);
$from = 'contact-form'; 
$to = $my_email;


$body = "
Subject: $subject\n
Name: $name\n
E-Mail: $email\n
Message:\n $message
";

if (mail($to, $subject, $body, $from) ) {
	echo 'success sending: ' . urldecode($subject);
}

?>