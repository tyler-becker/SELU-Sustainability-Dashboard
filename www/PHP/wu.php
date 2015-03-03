<?php
$json_string = file_get_contents("http://api.wunderground.com/api/af46457a3c3fef33/geolookup/conditions/q/LA/Hammond.json");
  	$parsed_json = json_decode($json_string);
  	$weather = $parsed_json->{'current_observation'}->{'weather'};
  	$temp = $parsed_json->{'current_observation'}->{'temp_f'};
?>