<?php
	include 'dbConnect.php';
	include 'wu.php';
	include 'modbus.php';

	$energyRate = $output[0];
	$energyTotal = ($output[3]*100000) + ($output[2]*1000) + ($output[1]);
	$kwh = ($output[2]*1000);


	$query = "INSERT INTO monitorReadings (btuTotal, kwh, literRate, ) VALUES({$btuTotal},{$kwh}, {$lPh}, );";

	$result = mysqli_query($connection, $query) or die("mysql makes me cry");

	if($result) {
		echo "Success!";
	} else {
		die("Database query failed. " . mysqli_error($connection));
	}

	//5. Close database connection
	mysqli_close($connection);
?>
