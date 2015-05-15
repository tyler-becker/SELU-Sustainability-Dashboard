<?php
	echo "we made it";
	require_once dirname(__FILE__) . '/./Phpmodbus/ModbusMaster.php';

	// Create Modbus object
	$modbus = new ModbusMaster("147.174.11.8", "TCP");

	try {
	    // FC 3
	    $freq = $modbus->readMultipleRegisters(1, 16384, 2);
	    $energyTotal = $modbus->readMultipleRegisters(1, 16464, 2);
	    $power = $modbus->readMultipleRegisters(1, 16418, 2);
	}
	catch (Exception $e) {
	    // Print error information if any
	    echo $modbus;
	    echo $e;
	    exit;
	}

	// Print status information
	echo "</br>Status:</br>" . $modbus;

	$temp = $freq[0]*16777216 + $freq[1]*65536 + $freq[2]*256 + $freq[3];
	$hz = unpack('f', pack('i', $temp))[1];
	echo "freq: " . $hz;
	echo "</br>";

	$kWh = $energyTotal[0]*16777216 + $energyTotal[1]*65536 + $energyTotal[2]*256 + $energyTotal[3];
	echo "energy total: " . $kWh;
	echo "</br>";

	$temp = $power[0]*16777216 + $power[1]*65536 + $power[2]*256 + $power[3];
	$W = unpack('f', pack('i', $temp ))[1];
	echo "no one man should have all that<br/>power: " . $W;
	echo "</br>";

?>