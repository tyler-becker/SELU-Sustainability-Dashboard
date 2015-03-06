<?php

	require_once dirname(__FILE__) . '/./Phpmodbus/ModbusMaster.php';

	// Create Modbus object
	$modbus = new ModbusMaster("147.174.49.12", "TCP");

	try {
	    // FC 3
	    $energyRate = $modbus->readMultipleRegisters(45, 5, 1);
	    $recData = $modbus->readMultipleRegisters(45, 35, 3);
	}
	catch (Exception $e) {
	    // Print error information if any
	    echo $modbus;
	    echo $e;
	    exit;
	}

	// Print status information
	echo "</br>Status:</br>" . $modbus;

	// Print read data
	echo "</br>Data:</br>";
	print_r($recData);
	echo "</br>";

	$kWh = $recData[0]*256 + $recData[1];
	$MWh = $recData[2]*256 + $recData[3];
	$GWh = $recData[4]*256 + $recData[5];

	echo "Register 36: kWh = " . $kWh;
	echo "</br>";
	echo "Register 37: MWh = " . $MWh;
	echo "</br>";
	echo "Register 38: GWh = " . $GWh;
	echo "</br>";

	$total = ($GWh*1000000)+($MWh*1000)+($kWh);
	echo "Total Energy = " . $total . " kWh";
	echo "</br>";

	$kW = $energyRate[0]*256 + $energyRate[1];
	echo "kW = " . $kW;
	echo "</br>";

	$output = array ( $kW, $kWh, $MWh, $GWh );

?>
