<?php
require 'dbConnect.php';
require 'Slim/Slim.php'

\Slim\SLim::registerAutoLoader();

$app = new Slim();


//If the url matchs a certain word itll go to the function specified
$app-> get('/readings','getReadings');

//Invokes that said function I believe
$app->run();


function getReadings()
{
	$sql = 'SELECT * tables blah blahhh';
	$db = getDb();
	$stmt = $db -> query($sql);

	$readings = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	echo '{"Readings": ' . json_encode($readings) . '}';
} 
	catch(PDOException $e) 
	{
	//error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
	echo '{"error":{"text":'. $e->getMessage() .'}}';
	}





}





?>