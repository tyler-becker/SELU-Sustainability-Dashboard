
app.directive('diagram', function() {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
			var ctx = element[0].getContext('2d'),
				i;

			for (i = 0; i < scope.diagram.length; i += 1) {
				scope.diagram[i].draw(ctx);
			}
		}
	};
})

.directive('barChart', function () {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs, data) {
			var ctx = element[0].getContext('2d'),
				data = scope.dailyReadings(),
				options = {
				    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				    scaleBeginAtZero : true,

				    //Boolean - Whether grid lines are shown across the chart
				    scaleShowGridLines : true,

				    //String - Colour of the grid lines
				    scaleGridLineColor : "rgba(0,0,0,.05)",

				    //Number - Width of the grid lines
				    scaleGridLineWidth : 1,

				    //Boolean - Whether to show horizontal lines (except X axis)
				    scaleShowHorizontalLines: true,

				    //Boolean - Whether to show vertical lines (except Y axis)
				    scaleShowVerticalLines: false,

				    //Boolean - If there is a stroke on each bar
				    barShowStroke : true,

				    //Number - Pixel width of the bar stroke
				    barStrokeWidth : 2,

				    //Number - Spacing between each of the X value sets
				    barValueSpacing : 2,

				    //Number - Spacing between data sets within X values
				    barDatasetSpacing : 1,

				    //String - A legend template
				    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				},
				myBarChart = new Chart(ctx).Bar(data, options);

			$('#chart-area, #side-bar, #diagram')
				.height($('#chart-area').height() + $('.chart').height());
		}
	}
})

.directive('doughnutChart', function () {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs, data) {
			var ctx = element[0].getContext('2d'),
				data = [
				    {
				        value: 300,
				        color:"#F7464A",
				        highlight: "#FF5A5E",
				        label: "Red"
				    },
				    {
				        value: 50,
				        color: "#46BFBD",
				        highlight: "#5AD3D1",
				        label: "Green"
				    },
				    {
				        value: 100,
				        color: "#FDB45C",
				        highlight: "#FFC870",
				        label: "Yellow"
				    }
				],
				options = {
				    //Boolean - Whether we should show a stroke on each segment
				    segmentShowStroke : true,

				    //String - The colour of each segment stroke
				    segmentStrokeColor : "#fff",

				    //Number - The width of each segment stroke
				    segmentStrokeWidth : 2,

				    //Number - The percentage of the chart that we cut out of the middle
				    percentageInnerCutout : 50, // This is 0 for Pie charts

				    //Number - Amount of animation steps
				    animationSteps : 100,

				    //String - Animation easing effect
				    animationEasing : "easeOutBounce",

				    //Boolean - Whether we animate the rotation of the Doughnut
				    animateRotate : true,

				    //Boolean - Whether we animate scaling the Doughnut from the centre
				    animateScale : false,

				    //String - A legend template
				    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
				},
				myDoughnutChart = new Chart(ctx).Doughnut(data,options);

		}
	}
})

.directive('arrows', function() {
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
})

.directive('datePicker', function () {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs, data) {
			$(element[0]).datepicker();
		}
	}
});
