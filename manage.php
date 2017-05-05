<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>manage</title>
	<script src="https://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
    <script src="https://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
    <script src="https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js"></script>
	<style>
		*{
			margin:0;
			padding:0;
		}
		#userName{
			display:none;
		}
	</style>
</head>
<body>
	<?php
	include('mysqlCon.php'); 
		$name=$_GET['userName'];
		echo '<div id="userName">'.$name.'</div>';
	?>
    <div id='example'></div>
    <script type='text/babel'  src='manage.js'/>
</body>
</html>