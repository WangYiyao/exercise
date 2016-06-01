<?php

  require('file_exceptions.php');
  
  $tireqty = $_POST['tireqty'];
  $oilqty = $_POST['oilqty'];
  $sparkqty = $_POST['sparkqty'];
  $address = $_POST['address'];
  $date = date('H:i, jS F Y');
  $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];

?>
<html>
<head>
	<title>Bob's Auto Parts</title>
</head>
<body>
	<h1>Bob's Auto Parts</h1>
	<h2>Order Results</h2>
	<?php 

		echo '<p>Order processed At:</p>'.$date;

		$totalqty = 0;
		$totalqty = $tireqty + $oilqty + $sparkqty;
		echo 'Items Ordered'.$totalqty.'<br/>';
		$totalamount = 0.00;

		define('TIREPRICE', 100);
		define('OILPRICE', 10);
		define('SPARKPRICE', 4);

		$totalamount = $tireqty * TIREPRICE + $oilqty * OILPRICE + $sparkqty * SPARKPRICE;
		echo 'Subtotal: $'.number_format($totalamount,2,'.',' ').'<br/>';
		// chapter02
		/*$taxrate = 0.10;
		$totalamount = $totalamount * (1 + $taxrate);
		echo 'Total including tax: $'.number_format($totalamount,2).'<br/>';*/

		// @ $fp = fopen("$DOCUMENT_ROOT../orders/orders.txt",'ab');
		// if(!$fp){
		// 	echo '<p><strong>Your order could not be processed at this time.</strong></p>';
		// 	exit;
		// }
		// flock($fp, LOCK_EX);

		// $outputstring = $date."\t".$tireqty."tires\t".$oilqty."oil\t".$sparkqty."spark plugs\t\$".$totalamount."\t".$address."\r\n";
		// fwrite($fp,$outputstring);
		// flock($fp,LOCK_UN);
		// fclose($fp);

		//chapter07
		echo "<p>Address to ship to is ".$address."</p>";
		$outputstring = $date."\t".$tireqty."tires\t".$oilqty."oil\t".$sparkqty."spark plugs\t\$".$totalamount."\t".$address."\r\n";

		try{
			if(!($fp = fopen("$DOCUMENT_ROOT../orders/orders.txt",'ab'))){
				throw new fileOpenException();
			}
			if(!flock($fp,LOCK_EX)){
				throw new fileLockException();
			}
			if(!fwrite($fp, $outputstring)){
				throw new fileWriteException();
			}
			flock($fp, LOCK_UN);
			fclose($fp);
			echo "<p>Order written.</p>";
		}
		catch(fileOpenException $foe){
			echo "<p><strong>Orders file could not be opened. Please contact our webmaster for help.</strong></p>";
		}
		catch(Exception $e){
			echo "<p><strong>Your order could not be processed at this time. Please try again later.</strong></p>";
		}
	?>
</body>
</html>