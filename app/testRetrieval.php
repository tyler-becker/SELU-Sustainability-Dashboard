<?php
	

		$iniArray = parse_ini_file("controls.ini");
		if($iniArray['username'] == $_POST['username'] && $iniArray['password'] == $_POST['password'])
		{
			echo "we made it";
		}
	
			echo "fail";
		
?>