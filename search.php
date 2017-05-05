<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<?php
	include('mysqlCon.php');
	$date='1970-01-01 ';
	$timeStart=strtotime($date.$_GET['timeStart']) ;
	$timeEnd=strtotime($date.$_GET['timeEnd']);
	$payment=$_GET['payment'];
	$orderTypeText=$_GET['orderTypeText'];
	$con=new connect('localhost','root','zqr3344');
	if(!$_GET['timeStart']&&$_GET['timeEnd']&&$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `payment` <= '$payment'  AND `timeend` >= '$timeEnd'";
	}else if($_GET['timeStart']&&!$_GET['timeEnd']&&$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `payment` <= '$payment' AND `timestart` <= '$timeStart'";
	}else if($_GET['timeStart']&&$_GET['timeEnd']&&!$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `timestart` <= '$timeStart' AND `timeend` >= '$timeEnd'";
	}else if(!$_GET['timeStart']&&!$_GET['timeEnd']&&$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `payment` <= '$payment'";
	}else if(!$_GET['timeStart']&&$_GET['timeEnd']&&!$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `timeend` >= '$timeEnd'";
	}else if($_GET['timeStart']&&!$_GET['timeEnd']&&!$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `timestart` <= '$timeStart'";
	}else if($_GET['timeStart']&&$_GET['timeEnd']&&$_GET['payment']){
		$sql="SELECT * FROM `userdata` WHERE `payment` <= '$payment' AND `timestart` <= '$timeStart' AND `timeend` >= '$timeEnd'";
	}else{
		$sql="";
	}
	$sqlEdit=$sql."ORDER BY `userdata`.`payment` $orderTypeText";
	$response=$con->query($sqlEdit,'parkingmanager');
	while($row=mysql_fetch_array($response)){
		echo '<name>'.$row['name'].'</name>';
		echo '<payment>'.$row['payment'].'</payment>';
		echo '<timeStart>'.date('H:i',$row['timestart']).'</timeStart>';
		echo '<timeEnd>'.date('H:i',$row['timeend']).'</timeEnd>';
		echo '<telephone>'.$row['telephone'].'</telephone>';
		echo '<type>'.$row['type'].'</type>';
		echo '<address>'.$row['address'].'</address>';
		echo '<locationDetail>'.$row['locationDetail'].'</locationDetail>';
		$renter=$row['name'];
		$sqL="SELECT * FROM `orderdata` WHERE `renter`='$renter'";
		$res=$con->query($sqL,'parkingmanager');
		$rate=0;
		$i=0;
		while($roW=mysql_fetch_array($res)){
			$rate=$rate+($roW['describlerate']+$roW['lotrate'])/2;
			$i++;
		}
		if($i!==0){
			echo '<rate>'.$rate/$i.'</rate>';
		}else{
			echo '<rate>'.'还未评价'.'</rate>';
		}
	}
?>	
</body>
</html>
