/*
* Seth Champagne - Last Edit 11.28.14
* Slide controller for the Diagram
*/

var slide = 0;
var paused = false;
var scaled = false;
var playing = null;
var fadeTimer = null;
var alpha = 1;   // current alpha value
var delta = -0.1; // delta = speed
var tX = 0, tY = 0;

$(function(){
	initDiagram();
	initArrows();
	slides();
	playing = setInterval(forward, 30000);
});

// Pauses the animation
function pause(){
	$('#pauseButton').toggleClass("glyphicon-pause").toggleClass("glyphicon-play");
	if (paused){
		paused = false;
		playing = setInterval(forward, 30000);
	}
	else {
		paused = true;
		clearInterval(playing)		
	}
}

// Increments slide
function forward(){
	clearInterval(fadeTimer);
	if (slide == 3)
		slide = 0;
	else 
		slide++;
	fadeTimer = setInterval(slideTansition, 30);
}

// Decrements slide
function backward(){
	clearInterval(fadeTimer);
	if (slide == 0)
		slide = 3;
	else 
		slide--;
	fadeTimer = setInterval(slideTansition, 30);
}

// Changes the text based on slide number
function slides(){
	if (slide == 0){
		$('#infoText').text('(1 of 4)');
		$('#infoText').append('<br><p>This is a diagram of the Solar Thermal system installed in the Kinesiology building on Southeastern\'s campus. <br>The solar panels are used to heat up water for use in the building, particularly with the swimming pool in order to offset related utility costs.</p>');
		$('#infoText').append('<br><p>This system is part of Southeastern\'s campus wide initiative to create a more eco-friendly, self-sustaining University.</p>');
		$('#infoText').append('<br><a target="_blank" href="http://sunwatersolar.com/solar-thermal/what-is-solar-thermal">Learn more about Solar Thermal Technology</a>');
		if (scaled){
			ctx1.scale(3/4,3/4);
			ctx2.scale(3/4,3/4);	
			scaled = false;		
		}
		tX = 0;
		tY = 0; 
	} else if (slide == 1){
		$('#infoText').text('(2 of 4)');
		$('#infoText').append('<br><p>Solar Thermal technology differs from Solar Photovoltaic in that it generates heat rather than electricity. The energy gathered by the panels from the sun is then used to heat water. <br>Solar Thermal systems are over five times more efficient for hot water systems than Photovoltaic systems.</p>');
		$('#infoText').append('</br><p>Heating water this way is both environmentally and economically beneficial. Utility costs can be cut down by 70% or more. This technology supplements the hot water supply to the building, but does not completely replace it. That means even on cloudy days, the building will still have hot water.</p>');
		if (!scaled){
			ctx1.scale(4/3,4/3);
			ctx2.scale(4/3,4/3);
			scaled = true;
		}	
		tX = 0;
		tY = 0;
	} else if (slide == 2){
		$('#infoText').text('(3 of 4)');
		$('#infoText').append('</br><p>The Onicon Solar Monitor installed in the Kinesiology building gives the University access to crucial system data such as water temperatures and volumes.</br> The data on this website is pulled from live readings from the monitor.</p>');
		$('#infoText').append('</br><p>Storage tanks and pipes funnel the water between the building and the panels. These tanks "pre-feed" the hot water heater, meaning water heated from the panels is passed to the heater rather than cold water from the tap.</p>');
		if (!scaled){
			ctx1.scale(4/3,4/3);
			ctx2.scale(4/3,4/3);
			scaled = true;
		}	
		tX = -160;
		tY = -270;
	} else {
		$('#infoText').text('(4 of 4)');
		$('#infoText').append('</br><p>The Solar Thermal system is connected to the buildings main water heater. The building is still connected to the city power grid, but most energy consumed from hot water heating is offset by the solar panels, meaning huge savings for the University.</p>');
		$('#infoText').append('</br><p>Feel free to see the system in action for yourself! Come visit the Kinesiology building, and maybe go for a swim while you\'re here.</p>');
		$('#infoText').append('</br><a target="_blank" href="http://www.southeastern.edu/admin/rec_sports/pool/index.html">Click here to find out when the Pool is open</a>');
		if (!scaled){
			ctx1.scale(4/3,4/3);
			ctx2.scale(4/3,4/3);
			scaled = true;
		}	
		tX = -400;
		tY = -200;
	}
}

// Cool fade effect for slide transitions
// http://jsfiddle.net/AbdiasSoftware/sndw2/
function slideTansition() {
    alpha += delta;
    if (alpha <= 0) {
    	delta = -delta;
    	slides();
    } else if (alpha >= 1) {
    	clearInterval(fadeTimer);
    	alpha = 1;
		delta = -0.1;
    }

    // clear canvas, set alpha and re-draw image
    ctx1.globalAlpha = alpha;
    ctx2.globalAlpha = alpha;

    redrawDiagram();
    drawArrows();		
}

