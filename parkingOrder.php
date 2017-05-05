<?php 
	include('mysqlCon.php');
	$date=date('Y-m-d h:i:s');
	$timeorder=strtotime($date);
	$orderNo=$timeorder.mt_rand(10,99);
	$customer=$_POST['customer'];
	$renter =$_POST['username'];
	$timeStart=$_POST['timeStart'];
	$timeEnd=$_POST['timeEnd'];
	$payment=$_POST['payment'];
	echo $orderNo.$timeorder.$timeStart.$timeEnd.$customer.$renter;
	$con=new connect('localhost','root','zqr3344');
	$sql="INSERT INTO `orderdata`(`orderNo`, `customer`, `renter`, `payment`, `timeorder`, `timestart`, `timeend`) VALUES ('$orderNo','$customer','$renter','$payment','$timeorder','$timeStart','$timeEnd')";
	echo $sql;
	$con->query($sql,'parkingmanager');
?>