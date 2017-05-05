<?php 
	header('Content-Type:json;charset:utf-8');
        include('mysqlCon.php');
	$userName=$_POST['userName'];
	$userPassword=$_POST['userPassword'];
        $con=new connect('localhost','root','zqr3344');
        $sql="SELECT * FROM `logindata` WHERE `user`='$userName'";
        $response=$con->query($sql,'parkingmanager');
        while($row=mysql_fetch_array($response)){
        	if($userPassword===$row['password']){
        		$loginType='correct';
        		$user=$row['user'];
        	}else{
        		$loginType='incorrect';
        	}
        }
        $arr=array(
        	'userExist'=>"",
        	'loginType'=>$loginType,
        	'userName'=>$user
        	);
        $str=json_encode($arr);
        echo $str;
?>
