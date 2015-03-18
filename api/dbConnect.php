<?php

function getDb()
{
	$dbhost = "localhost";
	$dbuser = "team1";
	$dbpass = "67yuhjnm^&YUHJNM";
	$dbname = "solarDB";
	
	$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass); 
	
	$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		return $dbConnection;
}




	?>