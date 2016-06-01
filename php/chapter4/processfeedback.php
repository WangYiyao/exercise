<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$feedback = $_POST['feedback'];

	require('a.php');
	

	$toaddress = "viana37@sina.com";
	$subject = "Feedback from web site";
	$mainlcontent = "Customer's name:".$name."\n".
					"Customer's email:".$email."\n".
					"Customer's comments:".$feedback."\n";

	$fromaddress = 'From: webserver@example.com';
	mail($toaddress, $subject, $mainlcontent,$fromaddress);
?>

<html>
<head>
	<title>Bob's Auto Parts-Feedback</title>
</head>
<body>
	<h1>Feedback Submitted</h1>
	<p>your feedback has been send.</p>
	<?php
		echo '<p>'.$a.'</p>';
	?>
</body>
</html>