<?php
	echo "we made it";
	require_once dirname(__FILE__) . '/./Phpmodbus/ModbusMaster.php';

	// Create Modbus object
	$modbus = new ModbusMaster("147.174.11.8", "TCP");

	try {
	    // FC 3
	    $test = $modbus->readMultipleRegisters(1, 4164, 1);
	    $PTs = $modbus->readMultipleRegisters(1, 4101, 3);
	    $CTs = $modbus->readMultipleRegisters(1, 4104, 2);
	    $recData = $modbus->readMultipleRegisters(1, 16384, 20);
	    $power = $modbus->readMultipleRegisters(1, 16418, 2);
	    $energy = $modbus->readMultipleRegisters(1, 16456, 18);
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

	echo "test: ";
	print_r($test);
	echo "</br>";

	// calculate PTs
	$PT1 = $PTs[0]*16777216 + $PTs[1]*65536 + $PTs[2]*256 + $PTs[3];
	$PT2 = $PTs[4]*256 + $PTs[5];

	// calculate CTs
	$CT1 = $CTs[0]*256 + $CTs[1];
	$CT2 = $CTs[2]*256 + $CTs[3];

	// calculate registers
	$regs = array();
	$j = 0;
	for ($i = 0; $i < 10; $i += 1) {
		$regs[$i] = $recData[$j]*16777216 + $recData[$j+1]*65536 + $recData[$j+2]*256 + $recData[$j+3];
		echo "register " . $i . ": ";
		print_r(unpack('f', pack('i', $regs[$i])));
		echo "</br>";
		$j += 4;
	}

	// frequency test
	$freq = $recData[0]*16777216 + $recData[1]*65536 + $recData[2]*256 + $recData[3];
	echo "freq: " . $freq;
	echo "</br>";
	echo decbin($freq);
	echo "</br>";
	print_r(unpack('f', pack('i', $freq)));
	echo "</br>";

	$volt = $recData[4]*16777216 + $recData[5]*65536 + $recData[6]*256 + $recData[7];
	$volt = unpack('f', pack('i', $volt))[1];
	$U = $volt*($PT1/$PT2);
	echo "U: " . $U;
	echo "</br>";

	echo "</br>Energy:</br>";
	print_r($energy);
	echo "</br>";
	$j = 0;
	for ($i = 0; $i < 9; $i += 1) {
		$temp = $energy[$j]*16777216 + $energy[$j+1]*65536 + $energy[$j+2]*256 + $energy[$j+3];
		echo "register " . $i . ": " . $temp;
		echo "</br>";
		$j += 4;
	}

	$power = $power[0]*16777216 + $power[1]*65536 + $power[2]*256 + $power[3];
	echo "no one man should have all that<br/>power: ";
	print_r(unpack('f', pack('i', $power)));
	echo "</br>";

?>
