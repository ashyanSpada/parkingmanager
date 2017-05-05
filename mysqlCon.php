<?php 
	class connect{
			protected $servername;
			protected $username;
			protected $password;
			function __construct($servername,$username,$password){
				$this->servername=$servername;
				$this->username=$username;
				$this->password=$password;
			}
			public function query($sql,$dbname){
    		$db=mysql_connect($this->servername,$this->username,$this->password);
    		mysql_query("set names 'utf8'");
    		mysql_selectdb($dbname,$db);
    		$request=mysql_query($sql);
    		return $request;
    		}
		}

?>