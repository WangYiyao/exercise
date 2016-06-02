<html>
<head>
	<title>Book-O-Rama Book Entry Result</title>
</head>
<body>
<h1>Book-O-Rama Book ENtry Result</h1>
<?php
$isbn = $_POST['isbn'];
$author = $_POST['author'];
$title = $_POST['title'];
$price = $_POST['price'];

if(!$isbn || !$author || !$title || !$price){
	echo "you have not entered all information.<br/>Please try again.";
	exit;
}

if(!get_magic_quotes_gpc()){
	$isbn = addslashes($isbn);
	$author = addslashes($author);
	$title = addslashes($title);
	$price = addslashes($price);
}

@ $db = new mysqli('localhost','root','373737','books');
if(mysqli_connect_errno()){
	echo "Error: Could not connect to database.
	Please try again later.";
	exit;
}

$query = "insert into books values ('".$isbn."','".$author."','".$title."','".$price."')";
$result = $db->query($query);
if($result){
	echo $db->affected_rows." book inserted into database.";
}
else{
	echo "An error has occured. The item was not added.";
}
$db->close();
?>
</body>
</html>