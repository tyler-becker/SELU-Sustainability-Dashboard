/* 
* Seth Champagne - Last Update 11.28.14
* Animated arrow canvas for the diagram
* Call the initArrows() method to being the animation
* Comes with pause feature
*/

var canvas2 = null;
var ctx2 =  null;
var bCanvas = null;
var bCtx = null;
var speed = 3;
var arrowArray = [];

// Begin the animation
function initArrows(){
	canvas2 = document.getElementById('canvas2');
	ctx2 = canvas2.getContext("2d");

	bCanvas = document.createElement("canvas");
	bCtx = bCanvas.getContext("2d");
	bCtx.canvas.width = ctx2.canvas.width;
	bCtx.canvas.height = ctx2.canvas.height;

	// scale canvas to correct size for page
	ctx2.canvas.width = 725;
	ctx2.canvas.height = 525;
	ctx2.scale(3/4,3/4);
	
	// draw arrows first time
	createArrowArray();
	drawArrows();

	// set intervals for the arrows
	setInterval(animate, 30);
}

// Declaration for Arrow objects
function Arrow(){
	// (x,y) value to refernce for translate method
	// the tip of the arrow
	this.x = 0;
	this.y = 0;
	this.x_0 = 0;
	this.y_0 = 0;
	// direction that the arrow points ('u', 'd', 'l', 'r')
	this.d = [];
	// tracks the path of the arrow (array of points)
	this.path = [];
	// path index tracker
	this.i = 0;
}

// Create the arrows based on three points
// Uses translate to draw relative to (0,0)
function drawBuffer(ax, ay, x1, y1, x2, y2, x3, y3){
	bCtx.save();
	bCtx.translate(ax, ay);
	bCtx.lineWidth = 4;
	bCtx.strokeStyle = "midnightBlue";
	bCtx.beginPath();
	bCtx.moveTo(x1, y1);
	bCtx.lineTo(x2, y2);
	bCtx.lineTo(x3, y3);
	bCtx.stroke();
	bCtx.restore();
}

// Draws an arrow based on the direction
function renderArrow(a){
	if (a.d[a.i] == 'u'){
		drawBuffer(a.x-8, a.y, 0, 20, 10, 0, 20, 20);
	} else if (a.d[a.i] == 'd'){
		drawBuffer(a.x-8, a.y-20,  0, 0, 10, 20, 20, 0);
	} else if (a.d[a.i] == 'l'){
		drawBuffer(a.x, a.y-8, 20, 0, 0, 10, 20, 20);
	} else if (a.d[a.i] == 'r'){
		drawBuffer(a.x-20, a.y-8, 0, 0, 20, 10, 0, 20);
	} else {
		ctx2.strokeText("You don goof'd", 50, 50);
	}
}

// Manually set paths of the arrows
function createArrowArray(){
	var n = 0;

	// cold water pipe
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 280;
	arrowArray[n].y_0 = 800;
	arrowArray[n].d = ['u', 'r'];
	arrowArray[n].path = [620, 400];
	arrowArray[n].i = 2;

	// first input pipe
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 420;
	arrowArray[n].y_0 = 500;
	arrowArray[n].d = ['u', 'l'];
	arrowArray[n].path = [360, 340];
	arrowArray[n].i = 2;
	// stop at heat exchange
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 260;
	arrowArray[n].y_0 = 360;
	arrowArray[n].d = ['l', 'u'];
	arrowArray[n].path = [200, 180];
	arrowArray[n].i = 2;

	// second input pipe
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 1000;
	arrowArray[n].y_0 = 600;
	arrowArray[n].d = ['l', 'u', 'l', 'd', 'l'];
	arrowArray[n].path = [820, 500, 780, 560, 700];
	arrowArray[n].i = 5;

	// first output pipe
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 400;
	arrowArray[n].y_0 = 180;
	arrowArray[n].d = ['d', 'l', 'd', 'r'];
	arrowArray[n].path = [280, 220, 340, 260];
	arrowArray[n].i = 4;
	// stop at heat exchange
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 340;
	arrowArray[n].y_0 = 340;
	arrowArray[n].d = ['r', 'd'];
	arrowArray[n].path = [480, 500];
	arrowArray[n].i = 2;

	// second output pipe
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 480;
	arrowArray[n].y_0 = 460;
	arrowArray[n].d = ['r', 'd'];
	arrowArray[n].path = [740, 600];
	arrowArray[n].i = 3;

	// to pool pipe
	n++;
	arrowArray[n] = new Arrow();
	arrowArray[n].x_0 = 660;
	arrowArray[n].y_0 = 500;
	arrowArray[n].d = ['u', 'r', 'd', 'r'];
	arrowArray[n].path = [420, 820, 500, 1000];
	arrowArray[n].i = 4;
}

// Clears the canvases
function blank(){
	bCtx.clearRect(0, 0, bCtx.canvas.width, bCtx.canvas.height);
	ctx2.clearRect(0, 0, 1000, 1000);
}

// Updates and Draws
function animate(){
	if (!paused){
		updateArrows();
		drawArrows();		
	}
}

// Moves the x and y values of the arrows based on the path
function updateArrows(){
	for (var i = 0; i < arrowArray.length; i++) {
		var a = arrowArray[i];

		if (a.d[a.i] == 'u'){
			if (a.y > a.path[a.i])
				a.y -= speed;
			else a.i++;
		} else if (a.d[a.i] == 'd'){
			if (a.y < a.path[a.i])
				a.y += speed;
			else a.i++;
		} else if (a.d[a.i] == 'l'){
			if (a.x > a.path[a.i])
				a.x -= speed;
			else a.i++;
		} else if (a.d[a.i] == 'r'){
			if (a.x < a.path[a.i])
				a.x += speed;
			else a.i++;
		} else {
			// Reset to the begining
			a.i = 0;
			a.x = a.x_0;
			a.y = a.y_0;
		}
	}
}

// Draws all the arrows in arrowArray
function drawArrows(){
	ctx2.save();
	blank();

	ctx2.translate(tX, tY);

	for (var i = 0; i < arrowArray.length; i++) {
		if (arrowArray[i].i != arrowArray[i].d.length)
			renderArrow(arrowArray[i]);
	}

	// copy the canvas2 to the screen
	ctx2.drawImage(bCanvas, 0, 0, bCanvas.width, bCanvas.height);

	ctx2.restore();
}

