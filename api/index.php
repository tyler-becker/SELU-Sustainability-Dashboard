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


//this function will return the daily readings as a JSON object...Needs to have query written for it
function getDailyReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"dailyReadings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}




//This function returns weather readings as a JSON Object...Needs query written for it
function getWeatherReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"Weather Readings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}




//This function returns energy readings as a JSON Object...Needs query written for it
function getEnergyReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"Energy Readings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}



//This function returns weekly readings as a JSON Object...Needs query written for it
function getWeeklyReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"Weekly Readings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}



//This function returns monthly readings as a JSON Object...Needs query written for it
function getMonthlyReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"Monthly Readings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}



//This function returns current production readings as a JSON Object...Needs query written for it
	function getCurrentProductionReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"Monthly Readings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}









?>