<?php
	include 'dbConnect.php';

	//QUery that reads todays midnight reading
	//$query = 'SELECT * FROM Monitor_Readings WHERE dateread >= CURDATE() + " 00:00:00" AND dateread <= CURDATE() + " 00:01:00"';
	$query = 'SELECT * FROM Monitor_Readings 
			  WHERE DATE(dateread) = DATE(NOW())
			  AND HOUR(dateread) = 0';
	$result = mysqli_query($connection, $query) or die("mysql makes me cry");

	//These are just checks for the query
	if($result) 
	{
		echo "Success!<br>";
	} 
	else 
	{
		die("Database query failed. " . mysqli_error($connection));
	}

	if (mysqli_num_rows($result) > 0) 
	{
		//Used a if statement to check if there is anything to read
		while ($row = mysqli_fetch_array($result)) 
		{	  
			$todyEnergyTotal = $row[3];
		}
	}

	echo 'tody = ' . $todyEnergyTotal . '<br>';

	//This is the query for the sYesterday Energy total thingy
	//$query = 'SELECT * FROM Monitor_Readings WHERE dateread >= DATE_SUB(CURDATE(),INTERVAL 1 DAY) + " 00:00:00" AND dateread <= DATE_SUB(CURDATE(),INTERVAL 1 DAY) + " 00:01:00"';
	$query = 'SELECT * FROM Monitor_Readings 
			  WHERE DATE(dateread) = DATE(NOW())-1
			  AND HOUR(dateread) = 0';
	$result = mysqli_query($connection, $query) or die("mysql makes me cry");

	//Again just query checks.....nothing to see here move along....
	if($result) 
	{
		echo "Success!<br>";
	} 
	else 
	{
		die("Database query failed. " . mysqli_error($connection));
	}

	if (mysqli_num_rows($result) > 0) 
	{
		//Used a if statement to check if there is anything to read
		while ($row = mysqli_fetch_array($result)) 
		{	  
			$yesterdyEnergyTotal = $row[3];
		}
	}

	echo 'yesterdy = ' . $yesterdyEnergyTotal . '<br>';

	//Here is where the magic happens and the Kilowatts is generated
	$KWHr = $todyEnergyTotal - $yesterdyEnergyTotal;

	echo 'kWh = ' . $KWHr . '<br>';

	//Here the KiloWatts are inserted into the database
	$query = "INSERT INTO Daily_Energy_Total (KWHr) VALUES ({$KWHr})";
		  
	$result = mysqli_query($connection, $query);

	if($result) 
	{
		echo "Success!<br>";
	} 
	else 
	{
		die("Database query failed. " . mysqli_error($connection));
	}

	echo 'we made it <br>';

	//Babooom tis done brotha

	//Close the door :3 or it will get chilly inside
	mysqli_close($connection);


?>