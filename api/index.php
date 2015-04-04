<?php 
// require 'Slim/Slim.php'
// slim\Slim::registerAutoLoader();
// $app = new Slim();

require 'dbConnect.php';
require 'vendor/autoload.php';

$app = new \Slim\Slim();

//If the url matchs a certain word itll go to the function specified
$app-> get('/getTest','getTest');
$app-> get('/dailyReadings', 'getDailyReadings');
$app-> get('/weatherReadings','getWeatherReadings');
$app-> get('/energyReadings','getEnergyReadings');
$app-> get('/weeklyReadings','getWeeklyReadings');
$app-> get('/currentProductionReadings','getCurrentProductionReadings');

//Invokes that said function I believe
$app->run();

function buildApiResponse($sql, $typeOfReading)
{
	try 
	{
		$db = getDb();
		$stmt = $db -> query($sql);

		$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo $typeOfReading . json_encode($readings) . '}';
	}
	catch(PDOException $e) 
	{
		//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getTest () {
	echo '{"woo":' . json_encode('we made it') . '}';
}

//this function will return the daily readings as a JSON object...Needs to have query written for it
function getDailyReadings()
{
	// get params from query string
	$app = \Slim\Slim::getInstance();
	$start = $app->request()->params('start');
	$end = $app->request()->params('end');

	$query = 'SELECT * FROM dailyReadings 
		 	  WHERE (dateRead BETWEEN "'.$start.'" AND "'.$end.'")';
	$typeOfReading = '{"dailyReadings": ';

	buildApiResponse($query, $typeOfReading);
}

function getWeatherReadings()
{
	$query = '';
	$typeOfReading = '{"Weather Readings": ';

	buildApiResponse($query, $typeOfReading);
}

function getEnergyReadings()
{
	$query = '';
	$typeOfReading = '{"Energy Readings": ';

	buildApiResponse($query, $typeOfReading);
}

function getWeeklyReadings()
{
	$query = '';
	$typeOfReading = '{"Weekly Readings": ';

	buildApiResponse($query, $typeOfReading);
}

function getCurrentProductionReadings()
{
	$query = '';
	$typeOfReading = '{"Current Production Readings": ';

	buildApiResponse($query, $typeOfReading);
}

?>