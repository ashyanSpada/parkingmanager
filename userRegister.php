<?php
	include('mysqlCon.php');
	$user=$_POST['user'];
	$password=$_POST['password'];
	$con=new connect('localhost','root','zqr3344');
	$sql="INSERT INTO `logindata`(`user`,`password`) VALUES ('$user','$password')";
	$con->query($sql,'parkingmanager');
	echo "<script>alert('提交成功即将返回');history.go(-1);</script>";
?>