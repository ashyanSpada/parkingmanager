<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>提交</title>
</head>
<body>
	<?php
		include('mysqlCon.php');
		$name=$_POST['name'];
		$payment=$_POST['payment'];
		$date='1970-01-01 ';
		$timeStart=strtotime($date.$_POST['timeStart']);
		$timeEnd=strtotime($date.$_POST['timeEnd']);
		$location=$_POST['location'];
		$locationDetail=$_POST['locationDetail'];
		$con=new connect('localhost','root','zqr3344');
		$sql="INSERT INTO `userdata`(`name`,`payment`,`timestart`,`timeend`,`address`,`locationDetail`) VALUES ('$name','$payment','$timeStart','$timeEnd','$location','$locationDetail')";
		$con->query($sql,'parkingmanager');
		echo "<script>alert('提交成功，你即将返回初始界面');history.go(-1);</script>"; 
	?>
</body>
</html>