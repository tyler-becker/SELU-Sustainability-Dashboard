<?php
	//1. Create a database connection
	$dbhost = "localhost";
	$dbuser = "team1";
	$dbpass = "67yuhjnm^&YUHJNM";
	$dbname = "solarDB";
	$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

	//This will display an error if connection fails
	if(mysqli_connect_errno()) {
		die("Database connection failed: " . 
		mysqli_connect_error() . " ( " . mysqli_connect_errno() . ")"
		);
	}

?>