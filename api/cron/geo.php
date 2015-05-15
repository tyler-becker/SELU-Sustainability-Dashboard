<?php
	echo "we made it";
	require_once dirname(__FILE__) . '/./Phpmodbus/ModbusMaster.php';

	// Create Modbus object
	$modbus = new ModbusMaster("147.174.11.9", "TCP");

	try {
	    // FC 3
	    $temps = $modbus->readMultipleRegisters(17, 21, 4);

	}
	catch (Exception $e) {
	    // Print error information if any
	    echo $modbus;
	    echo $e;
	    exit;
	}

	// Print status information
	echo "</br>Status:</br>" . $modbus;

	// calculate temp
	$supplyF = $temps[0]*256 + $temps[1];
	$returnF = $temps[2]*256 + $temps[3];
	$supplyC = $temps[4]*256 + $temps[5];
	$returnC = $temps[6]*256 + $temps[7];

	echo "supplyF: " . $supplyF;
	echo "</br>";
	echo "returnF: " . $returnF;
	echo "</br>";
	echo "supplyC: " . $supplyC;
	echo "</br>";
	echo "returnC: " . $returnC;
	echo "</br>";

?>
