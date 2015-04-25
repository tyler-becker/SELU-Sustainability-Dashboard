<?php

	require_once dirname(__FILE__) . '/./Phpmodbus/ModbusMaster.php';

	// Create Modbus object
	$modbus = new ModbusMaster("147.174.49.12", "TCP");

	try {
	    // FC 3
	    $energyRate = $modbus->readMultipleRegisters(45, 5, 1);
	    $recData = $modbus->readMultipleRegisters(45, 35, 3);
	    $btuData = $modbus->readMultipleRegisters(45, 26, 3);
	    $volumeRate = $modbus->readMultipleRegisters(45, 16, 1);
	    $supplyTempData = $modbus->readMultipleRegisters(45, 22, 1);
	    $returnTempData = $modbus->readMultipleRegisters(45, 23, 1);
	    $volumeTotalData = $modbus->readMultipleRegisters(45, 48, 3); 


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

	//This is where the BTUs are calculated
	$kBtu = $btuData[0]*256 + $btuData[1];
	$mBtu = $btuData[2]*256 + $btuData[3];
	$gBtu = $btuData[4]*256 + $btuData[5];

	//This is where the Liters/Hour is added up
	$lPh = $volumeRate[0]*256 + $volumeRate[1];

	//This is where the supply temp is calculated
	$supplyTemp = $supplyTempData[0]*256 + $supplyTempData[1];

	//This is where the return temp is calculated
	$returnTemp = $returnTempData[0]*256 + $returnTempData[1];


	//This is where Watt values are calculated for the KW total
	$kWh = $recData[0]*256 + $recData[1];
	$MWh = $recData[2]*256 + $recData[3];
	$GWh = $recData[4]*256 + $recData[5];

	//This is where the Liter values are calculated for the Liter total
	$kLiters = $volumeTotalData[0]*256 + $volumeTotalData[1];
	$mLiters = $volumeTotalData[2]*256 + $volumeTotalData[3];
	$gLiters = $volumeTotalData[4]*256 + $volumeTotalData[5];

	echo "Register 36: kWh = " . $kWh;
	echo "</br>";
	echo "Register 37: MWh = " . $MWh;
	echo "</br>";
	echo "Register 38: GWh = " . $GWh;
	echo "</br>";

	//BTU total is added up
	$btuTotal =  ($gBtu*1000000)+($mBtu*1000)+($kBtu);

	//Volume total is added up
	$volumeTotal = ($gLiters*1000000)+($mLiters*1000)+($kLiters);
	
	//energy total is added up
	$total = ($GWh*1000000)+($MWh*1000)+($kWh);
	echo "Total Energy = " . $total . " kWh";
	echo "</br>";




	$output = array ( $kW, $kWh, $MWh, $GWh );
	//$btuOutput = array( $btuTotal, $btuWh, $btuMWh, $btuGWh );

?>
