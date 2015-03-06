<?php
	require 'vendor/autoload.php';

	$app = new \Slim\Slim();
	$app->response->headers->set('Content-Type', 'application/json');

	// handle GET requests for /readings
	$app->get('/readings', function () { 
	  // query database for all readings
	  // return JSON-encoded response body with query results
	  echo json_encode("we made it");
	});

	// run
	$app->run();
?>