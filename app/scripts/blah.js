

var solarPanel = {
	lineWidth: 3,
	lineJoin: 'round',
	strokeStyle: 'goldenrod',
	fillStyle: 'gold',
	// verices
	v: [
		{x:120,y:180},
		{x:200,y:100},
		{x:500,y:100},
		{x:420,y:180}
	],
	draw: function () {
		var i;
		ctx.lineWidth = this.lineWidth;
		ctx.lineJoin = this.lineJoin;
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;

		// draw rhombus
		ctx.beginPath();
		ctx.moveTo(this.v[3].x, this.v[3].y);
		for (i = 0; i < this.v.length; i += 1) {
			ctx.lineTo(this.v[i].x, this.v[i].y);
		}

		ctx.fill();
		ctx.stroke();

		// draw lines
		for (i = 0; i < this.lines.length; i += 1) {
			ctx.beginPath();
			ctx.moveTo(lines[i][0].x, lines[i][0].y);
			ctx.lineTo(lines[i][1].x, lines[i][1].y);
			ctx.stroke();
		}
	}
};

var pipes = {
	lineWidth: 5,

};

function Arrow(x, y, x_0, y_0, dir, path) {
	// (x,y) value to refernce for translate method
	// the tip of the arrow
	this.x = x
	this.y = y;
	this.init = {
		x: x_0,
		y: y_0
	};
	// direction that the arrow points ('u', 'd', 'l', 'r')
	this.d = dir;
	// tracks the path of the arrow (array of points)
	this.path = path;
	// path index tracker
	this.i = dir.length;
}