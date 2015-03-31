'use strict';

app.directive('arrows', function() {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
			var ctx = element[0].getContext('2d'),
				speed = 3;

			function drawArrow(a) {
				if (a.d[a.i] === 'u'){
					drawBuffer(a.x-8, a.y, 0, 20, 10, 0, 20, 20);
				} else if (a.d[a.i] === 'd'){
					drawBuffer(a.x-8, a.y-20,  0, 0, 10, 20, 20, 0);
				} else if (a.d[a.i] === 'l'){
					drawBuffer(a.x, a.y-8, 20, 0, 0, 10, 20, 20);
				} else if (a.d[a.i] === 'r'){
					drawBuffer(a.x-20, a.y-8, 0, 0, 20, 10, 0, 20);
				} else {
					ctx.strokeText("You don goof'd", 50, 50);
				}
			}

			// Uses translate to draw relative to (0,0)
			function drawBuffer(ax, ay, x1, y1, x2, y2, x3, y3) {
				ctx.save();
				ctx.translate(ax, ay);
				ctx.lineWidth = 4;
				ctx.strokeStyle = "midnightBlue";
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				ctx.stroke();
				ctx.restore();
			}

			// Moves the x and y values of the arrows based on the path
			function update() {
				var i, a;
				for (i = 0; i < scope.arrows.length; i += 1) {
					a = scope.arrows[i];

					if (a.d[a.i] === 'u') {
						if (a.y > a.path[a.i]) {
							a.y -= speed;
						} else {
							a.i += 1;
						}
					} else if (a.d[a.i] === 'd') {
						if (a.y < a.path[a.i]) {
							a.y += speed;
						} else {
							a.i += 1;
						}
					} else if (a.d[a.i] === 'l') {
						if (a.x > a.path[a.i]) {
							a.x -= speed;
						} else {
							a.i += 1;
						}
					} else if (a.d[a.i] === 'r') {
						if (a.x < a.path[a.i]) {
							a.x += speed;
						} else {
							a.i += 1;
						}
					} else {
						// Reset to the begining
						a.i = 0;
						a.x = a.init.x;
						a.y = a.init.y;
					}
				}
			}

			// Draws all the arrows
			function draw() {
				ctx.clearRect(0, 0, ctx.canvas.width * 4/3, ctx.canvas.width * 4/3);

				for (var i = 0; i < scope.arrows.length; i += 1) {
					if (scope.arrows[i].i !== scope.arrows[i].d.length)
						drawArrow(scope.arrows[i]);
				}
			}

			// scale canvas to correct size for page
			if (scope.scale) ctx.scale(3/4, 3/4);
			draw();
			setInterval(function () {
				update();
				draw();	
			}, 30);

		}
	};
});