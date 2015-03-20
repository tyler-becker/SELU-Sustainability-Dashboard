<?php
require 'dbConnect.php';
require 'Slim/Slim.php'

\Slim\SLim::registerAutoLoader();

$app = new Slim();


//If the url matchs a certain word itll go to the function specified
$app-> get('/dailyReadings','getDailyReadings');
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

//this function will return the daily readings as a JSON object...Needs to have query written for it
function getDailyReadings()
{

	$query = '';
	$typeOfReading = '{"dailyReadings": ';

	buildApiResponse($query, $typeOfReading);


}

function getWeatherReadings($sql, $typeOfReading)
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