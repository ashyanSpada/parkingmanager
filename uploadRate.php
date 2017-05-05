<?php 
	include('mysqlCon.php');
	$orderNo=$_POST['orderNo'];
	$describlerate=$_POST['describlerate'];
	$lotrate=$_POST['lotrate'];
    $con=new connect('localhost','root','zqr3344');
    $sql="UPDATE `orderdata` SET `describlerate`='$describlerate',`lotrate`='$lotrate' WHERE `orderNo`='$orderNo'";
    $con->query($sql,'parkingmanager');
?>