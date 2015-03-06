/*
	Testing the slim framework with a simple ajax call
 */
'use strict';

$(function(){
	$.ajax({
		url: "http://localhost/SolarAPI/testGet.php/readings",
		datatype: "json"
	})
	.done(function(data){
		$("#weMadeIt").text(data);
	})
	.fail(function(){
		alert("dangit");
	});
});