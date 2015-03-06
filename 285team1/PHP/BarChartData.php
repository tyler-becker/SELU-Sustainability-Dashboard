<?php
	/* Pulls data from Daily_Energy_Total
	 * Data is used in the bar chart on the index page
	 */
	include 'dbConnect.php';

	//This will display an error if connection fails
	if(mysqli_connect_errno()) {
		die( "Database connection failed: " . mysqli_connect_error() . " ( " . mysqli_connect_errno() . ")" );
	}

	$query = "SELECT * FROM Daily_Energy_Total
			  ORDER BY reading_id DESC
			  LIMIT 0,10";
	$result = mysqli_query($connection, $query);

	//Test if there was a query error.
	if(!$result) {
		die("Database query failed.");
	}

	$LastTenEnergyReadings = array();
	$DateRead = array();

	while($row = mysqli_fetch_row($result)) {
		$LastTenEnergyReadings[] = $row[0];
		$DateRead[] = $row[1];
	}

 	mysqli_close($connection);

?>
