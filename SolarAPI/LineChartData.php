<?php
	/* Pulls data from Monitor_Readings
	 * Data is used in the line chart on the index page
	 */
	include 'dbConnect.php';

	//This will display an error if connection fails
	if(mysqli_connect_errno()) {
		die( "Database connection failed: " . mysqli_connect_error() . " ( " . mysqli_connect_errno() . ")" );
	}

	$query = "SELECT * FROM Monitor_Readings 
			  ORDER BY reading_id DESC 
			  LIMIT 0,24";	 
	$result = mysqli_query($connection, $query);
		
	//Test if there was a query error.	
	if(!$result) {
		die("Database query failed.");
	}

	$hourlyEnergyRate = array();
	$weather = array();
	$time  = array();
	$temp  = array();

	while($row = mysqli_fetch_row($result)) {
		$hourlyEnergyRate[] = $row[2];
		$weather[] = $row[4];
		$time[] = $row[1];
		$temp[] = $row[5];
	}

	mysqli_close($connection);

?>