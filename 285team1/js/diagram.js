/*
* Seth Champagne - Last Edit 11.28.14
* Canvas functions for drawing the diagram
*/

var canvas1 = null;
var ctx1 = null;

function initDiagram(){
	canvas1 = document.getElementById('canvas1');
	ctx1 = canvas1.getContext("2d");

	// scale canvas to correct size for page
	ctx1.canvas.width = 725;
	ctx1.canvas.height = 525;
	ctx1.scale(3/4,3/4);

	drawDiagram();
}

function drawDiagram(){
	if (canvas1 && canvas1.getContext){
		if (ctx1){
			// building outline
			ctx1.fillStyle = "crimson";
			ctx1.fillRect(100, 200, 1500, 1500);
			ctx1.fillStyle = "gainsboro";
			ctx1.fillRect(150, 250, 1500, 1500);

			drawPipes();
			drawPanel();
			drawMonitor();
			drawHeater();
			drawLabels();			
		}
	}
}

function drawLabels(){
	// http://jsfiddle.net/DKcpS/1/
	var text = null;
	var w = null;

	ctx1.font = "bold 14px Lucida Console";
	ctx1.textBaseline = "center"; 
	ctx1.fillStyle = "black";

	ctx1.fillText("To Pool--> ", 860, 480);

	text = "Heat Exchanger";
	w = ctx1.measureText(text).width;
	ctx1.fillText(text, 300-(w/2), 310);

	text = "Onicon Monitor";
	w = ctx1.measureText(text).width;
	ctx1.fillText(text, 270-(w/2), 500);

	text = "Solar Panels";
	w = ctx1.measureText(text).width;
	ctx1.fillText(text, 300-(w/2), 90);

	text = "<--Storage Tanks-->";
	w = ctx1.measureText(text).width;
	ctx1.fillText(text, 550-(w/2), 580);

	text = "<--Water Heaters";
	w = ctx1.measureText(text).width;
	ctx1.fillText(text, 860-(w/2), 650);

	text = "Cold Tap Water";
	w = ctx1.measureText(text).width;
	ctx1.fillText(text, 320-(w/2), 600);
}

function drawPanel(){
	// Solar Panel
	ctx1.lineWidth = 3;
	ctx1.LineJoin = "round";
	ctx1.strokeStyle = "goldenrod";
	ctx1.fillStyle = "gold";

	ctx1.beginPath();
	ctx1.moveTo(120, 180);
	ctx1.lineTo(200, 100);
	ctx1.lineTo(500, 100);
	ctx1.lineTo(420, 180);
	ctx1.lineTo(120, 180);
	ctx1.fill();
	ctx1.stroke();

	ctx1.beginPath();
	ctx1.moveTo(180, 180);
	ctx1.lineTo(260, 100);
	ctx1.stroke();

	ctx1.beginPath();
	ctx1.moveTo(240, 180);
	ctx1.lineTo(320, 100);
	ctx1.stroke();

	ctx1.beginPath();
	ctx1.moveTo(300, 180);
	ctx1.lineTo(380, 100);
	ctx1.stroke();

	ctx1.beginPath();
	ctx1.moveTo(360, 180);
	ctx1.lineTo(440, 100);
	ctx1.stroke();

	// heat exchanger
	ctx1.shadowColor = "white";
	ctx1.fillStyle = "firebrick";
	ctx1.fillRect(260, 320, 80, 60);
}
	
function drawPipes(){
	// cold water input
	ctx1.lineWidth = 5;
	ctx1.strokeStyle = "blue";
	ctx1.beginPath();
	ctx1.moveTo(280, 800);
	ctx1.lineTo(280, 620);
	ctx1.lineTo(400, 620);
	ctx1.stroke();

	// first input pipe
	ctx1.strokeStyle = "dodgerBlue";
	ctx1.beginPath();
	ctx1.moveTo(200, 180);
	ctx1.lineTo(200, 360);
	ctx1.lineTo(420, 360);
	ctx1.lineTo(420, 500);
	ctx1.stroke();

	//second input pipe
	ctx1.beginPath();
	ctx1.moveTo(1500, 600);
	ctx1.lineTo(820, 600);
	ctx1.lineTo(820, 500);
	ctx1.stroke();

	// brain armstrong cycle
	ctx1.beginPath();
	ctx1.moveTo(820, 500);
	ctx1.lineTo(780, 500);
	ctx1.lineTo(780, 560);
	ctx1.lineTo(600, 560);
	ctx1.stroke();

	// first output pipe
	ctx1.strokeStyle = "red";
	ctx1.beginPath();
	ctx1.moveTo(400, 180);
	ctx1.lineTo(400, 280);
	ctx1.lineTo(220, 280);
	ctx1.lineTo(220, 340);
	ctx1.lineTo(480, 340);
	ctx1.lineTo(480, 500);
	ctx1.stroke();

	// second output pipe
	ctx1.beginPath();
	ctx1.moveTo(480, 460);
	ctx1.lineTo(740, 460);
	ctx1.lineTo(740, 560);
	ctx1.stroke();

	// to pool pipe
	ctx1.beginPath();
	ctx1.moveTo(660, 500);
	ctx1.lineTo(660, 420);
	ctx1.lineTo(820, 420);
	ctx1.lineTo(820, 500);
	ctx1.lineTo(1500, 500);
	ctx1.stroke();

	// lochinar armour cycle
	ctx1.beginPath();
	ctx1.moveTo(740, 560);
	ctx1.lineTo(740, 660);
	ctx1.stroke();
	ctx1.beginPath();
	ctx1.moveTo(700, 660);
	ctx1.lineTo(780, 660);
	ctx1.stroke();
}

function drawMonitor(){
	// storage tanks
	ctx1.fillStyle = "gray";
	ctx1.fillRect(400, 500, 100, 180);
	ctx1.fillRect(600, 500, 100, 180);

	ctx1.fillStyle = "moccasin";
	ctx1.strokeStyle = "black";
	ctx1.lineWidth = 3;

	ctx1.fillRect(240, 420, 40, 60);
	ctx1.strokeRect(240, 420, 40, 60);

	ctx1.strokeStyle = "mediumSeaGreen";

	ctx1.beginPath();
	ctx1.moveTo(280, 440);
	ctx1.lineTo(380, 440);
	ctx1.lineTo(380, 360);
	ctx1.stroke();

	ctx1.beginPath();
	ctx1.moveTo(280, 460);
	ctx1.lineTo(400, 460);
	ctx1.lineTo(400, 340);
	ctx1.stroke();
}

function drawHeater(){
	// Brain Armstrong
	ctx1.fillStyle = "moccasin";
	ctx1.strokeStyle = "dimGray";
	ctx1.fillRect(800, 480, 40, 40);
	ctx1.strokeRect(800, 480, 40, 40);

	// lochinar armour
	ctx1.fillStyle = "black";
	ctx1.fillRect(730, 600, 20, 80);
	ctx1.fillRect(770, 600, 20, 80);
}

// Called by forward/backward functions in slides.js
function redrawDiagram(){
	ctx1.save();

	ctx1.clearRect(0, 0, 1000, 1000);

	ctx1.translate(tX, tY);

	drawDiagram();

	if (slide != 0){
		ctx1.shadowBlur = 10;
		ctx1.shadowColor = "yellow";		
	}

	// highlight parts of the diagram
	if (slide == 1)
		drawPanel();
	else if (slide == 2)
		drawMonitor();
	else if (slide == 3)
		drawHeater();

	ctx1.shadowColor = "white";
	drawLabels();

	ctx1.restore();
}