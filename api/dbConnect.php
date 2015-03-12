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

			// get the weather reading from the db
	$query = 'SELECT weather FROM Monitor_Readings';
	$result = mysqli_query($connection, $query) or die("mysql makes me cry " . mysqli_error($connection));

	while ($row = mysqli_fetch_row($result)) 
		$weather = $row[0];