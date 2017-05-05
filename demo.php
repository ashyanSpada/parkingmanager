<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>demo</title>
</head>
<body>
	<?php 
		include('mysqlCon.php');
		$con=new connect('localhost','root','zqr3344');
		$sql="INSERT INTO `orderdata`(`orderNo`, `customer`, `renter`, `payment`, `timeorder`, `timestart`, `timeend`) VALUES ('1','1','1','1','1','1','1')";
		$con->query($sql,'parkingmanager');
	?>
</body>
</html>