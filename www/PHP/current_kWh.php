<?php
	/* Gets the current kWh produced for the day
	 * Stores the value into $kWh for use with the gauge
	 */
	include 'dbConnect.php';

	//echo 'we made it <br>';

	// get the reading from midnight
	$query = 'SELECT energytotal FROM Monitor_Readings 
			  WHERE DATE(dateread) = DATE(NOW())
			  AND HOUR(dateread) = 0';
	$result = mysqli_query($connection, $query) or die("mysql makes me cry " . mysqli_error($connection));

	while ($row = mysqli_fetch_row($result)) 
		$midnight = $row[0];

	// get the current reading
	$query = 'SELECT energytotal FROM Monitor_Readings 
			  WHERE DATE(dateread) = DATE(NOW())
			  AND HOUR(dateread) = HOUR(NOW())';
	$result = mysqli_query($connection, $query) or die("mysql makes me really cry " . mysqli_error($connection));

	while ($row = mysqli_fetch_row($result)) 
		$curr = $row[0];

	$kWh = $curr - $midnight;

	//echo json_encode($kWh);

	mysqli_close($connection);
?>