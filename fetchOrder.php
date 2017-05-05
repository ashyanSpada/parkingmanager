<?php 
header('Content-Type:json;charset:utf-8');
include('mysqlCon.php');
$customer=$_POST['customer'] ? $_POST['customer'] : $_GET['customer'];
$con=new connect('localhost','root','zqr3344');
$sql="SELECT * FROM `orderdata` WHERE `customer`='$customer'";
$response=$con->query($sql,'parkingmanager');
$i=0;
$arr=[];
while($row=mysql_fetch_array($response,MYSQL_ASSOC)){
	$arr[$i]=$row;
	$i++;
}
$result=json_encode($arr);
echo $result;
?>