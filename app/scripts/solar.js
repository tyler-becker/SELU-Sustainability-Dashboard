
app.controller('SolarCtrl', function($scope, Arrow, solarData) {
	var arrows = [],
		d = new Date(),
		solarPanel = {
			lineWidth: 3,
			lineJoin: 'round',
			strokeStyle: 'goldenrod',
			fillStyle: 'gold',
			// verices
			v: [
				{x:120, y:180},
				{x:200, y:100},
				{x:500, y:100},
				{x:420, y:180}
			],
			// decoration
			lines: [
				[{x:180, y:180}, {x:260, y:100}],
				[{x:240, y:180}, {x:320, y:100}],
				[{x:300, y:180}, {x:380, y:100}],
				[{x:360, y:180}, {x:440, y:100}]
			],
			draw: function (ctx) {
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
					ctx.moveTo(this.lines[i][0].x, this.lines[i][0].y);
					ctx.lineTo(this.lines[i][1].x, this.lines[i][1].y);
					ctx.stroke();
				}
			}
		},
		heatExchanger = {
			draw: function (ctx) {	
				ctx.shadowColor = 'white';
				ctx.fillStyle = 'firebrick';
				ctx.fillRect(260, 320, 80, 60);
			}
		},
		buildingOutline = {
			draw: function (ctx) {
				ctx.scale(3/4, 3/4);
				ctx.fillStyle = 'crimson';
				ctx.fillRect(100, 200, 1500, 1500);
				ctx.fillStyle = 'gainsboro';
				ctx.fillRect(150, 250, 1500, 1500);						
			}
		},
		heaters = {
			draw: function (ctx) {
				// Brain Armstrong
				ctx.fillStyle = 'moccasin';
				ctx.strokeStyle = 'dimGray';
				ctx.fillRect(800, 480, 40, 40);
				ctx.strokeRect(800, 480, 40, 40);

				// lochinar armour
				ctx.fillStyle = 'black';
				ctx.fillRect(730, 600, 20, 80);
				ctx.fillRect(770, 600, 20, 80);						
			}
		},
		monitor = {
			draw: function (ctx) {
				// storage tanks
				ctx.fillStyle = 'gray';
				ctx.fillRect(400, 500, 100, 180);
				ctx.fillRect(600, 500, 100, 180);

				ctx.fillStyle = 'moccasin';
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 3;

				ctx.fillRect(240, 420, 40, 60);
				ctx.strokeRect(240, 420, 40, 60);

				ctx.strokeStyle = 'mediumSeaGreen';

				ctx.beginPath();
				ctx.moveTo(280, 440);
				ctx.lineTo(380, 440);
				ctx.lineTo(380, 360);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(280, 460);
				ctx.lineTo(400, 460);
				ctx.lineTo(400, 340);
				ctx.stroke();						
			}
		},
		labels = {
			draw: function (ctx) {
				// http://jsfiddle.net/DKcpS/1/
				var text, w;

				ctx.font = 'bold 14px Lucida Console';
				ctx.textBaseline = 'center'; 
				ctx.fillStyle = 'black';

				ctx.fillText('To Pool--> ', 860, 480);

				text = 'Heat Exchanger';
				w = ctx.measureText(text).width;
				ctx.fillText(text, 300-(w/2), 310);

				text = 'Onicon Monitor';
				w = ctx.measureText(text).width;
				ctx.fillText(text, 270-(w/2), 500);

				text = 'Solar Panels';
				w = ctx.measureText(text).width;
				ctx.fillText(text, 300-(w/2), 90);

				text = '<--Storage Tanks-->';
				w = ctx.measureText(text).width;
				ctx.fillText(text, 550-(w/2), 580);

				text = '<--Water Heaters';
				w = ctx.measureText(text).width;
				ctx.fillText(text, 860-(w/2), 650);

				text = 'Cold Tap Water';
				w = ctx.measureText(text).width;
				ctx.fillText(text, 320-(w/2), 600);
			}
		},
		pipes = {
			draw: function (ctx) {
				// cold water input
				ctx.lineWidth = 5;
				ctx.strokeStyle = 'blue';
				ctx.beginPath();
				ctx.moveTo(280, 800);
				ctx.lineTo(280, 620);
				ctx.lineTo(400, 620);
				ctx.stroke();

				// first input pipe
				ctx.strokeStyle = 'dodgerBlue';
				ctx.beginPath();
				ctx.moveTo(200, 180);
				ctx.lineTo(200, 360);
				ctx.lineTo(420, 360);
				ctx.lineTo(420, 500);
				ctx.stroke();

				//second input pipe
				ctx.beginPath();
				ctx.moveTo(1500, 600);
				ctx.lineTo(820, 600);
				ctx.lineTo(820, 500);
				ctx.stroke();

				// brain armstrong cycle
				ctx.beginPath();
				ctx.moveTo(820, 500);
				ctx.lineTo(780, 500);
				ctx.lineTo(780, 560);
				ctx.lineTo(600, 560);
				ctx.stroke();

				// first output pipe
				ctx.strokeStyle = 'red';
				ctx.beginPath();
				ctx.moveTo(400, 180);
				ctx.lineTo(400, 280);
				ctx.lineTo(220, 280);
				ctx.lineTo(220, 340);
				ctx.lineTo(480, 340);
				ctx.lineTo(480, 500);
				ctx.stroke();

				// second output pipe
				ctx.beginPath();
				ctx.moveTo(480, 460);
				ctx.lineTo(740, 460);
				ctx.lineTo(740, 560);
				ctx.stroke();

				// to pool pipe
				ctx.beginPath();
				ctx.moveTo(660, 500);
				ctx.lineTo(660, 420);
				ctx.lineTo(820, 420);
				ctx.lineTo(820, 500);
				ctx.lineTo(1500, 500);
				ctx.stroke();

				// lochinar armour cycle
				ctx.beginPath();
				ctx.moveTo(740, 560);
				ctx.lineTo(740, 660);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(700, 660);
				ctx.lineTo(780, 660);
				ctx.stroke();						
			}
		};
		
	// cold water pipe
	arrows.push(new Arrow.create(280, 800, ['u', 'r'], [620, 400]));
	// first input pipe
	arrows.push(new Arrow.create(420, 500, ['u', 'l'], [360, 340]));
	// stop at heat exchange
	arrows.push(new Arrow.create(260, 360, ['l', 'u'], [200, 180]));
	// second input pipe
	arrows.push(new Arrow.create(1000, 600, ['l', 'u', 'l', 'd', 'l'], [820, 500, 780, 560, 700]));
	// first output pipe
	arrows.push(new Arrow.create(400, 180, ['d', 'l', 'd', 'r'], [280, 220, 340, 260]));
	// stop at heat exchange
	arrows.push(new Arrow.create(340, 340, ['r', 'd'], [480, 500]));
	// second output pipe
	arrows.push(new Arrow.create(480, 460, ['r', 'd'], [740, 600]));
	// to pool pipe
	arrows.push(new Arrow.create(660, 500, ['u', 'r', 'd', 'r'], [420, 820, 500, 1000]));

	$scope.weather = {
		text: 'Hammond: 72.3°F Mostly Cloudy',
		src: 'http://icons.wxug.com/i/c/k/nt_mostlycloudy.gif'
	};

	// diagram stuff
	$scope.diagramTitle = 'Solar Thermal System';
	$scope.scale = true;
	$scope.arrows = arrows;
	$scope.diagram = [buildingOutline, pipes, solarPanel, heatExchanger, heaters, monitor, labels];

	// chart stuff
	$scope.pie = {
		value: 110,
		unit: 'kWh'
	};
	$scope.chart = {
		title: 'Solar Data',
		toggle: 0,
		data: {
	        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	        datasets: [
	            {
	                label: 'we made it',
	                fillColor: 'rgba(14,112,9,0.5)',
	                strokeColor: 'rgba(14,112,9,0.8)',
	                highlightFill: 'rgba(14,112,9,0.75)',
	                highlightStroke: 'rgba(14,112,9,1)',
	                data: solarData.data
	            }
	        ]
	    }
	};

	if (d.getMonth() > 9) {
		$scope.today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
	} else {
		$scope.today = d.getFullYear() + '-0' + (d.getMonth()+1) + '-' + d.getDate();
	}

	$scope.energy = {
		seleted: 'Choose Unit',
		units: [
			'kWh',
			'bTu'
		]
	};
	$scope.monthly = {
		months: [
			{name:'January', id: 1},
			{name:'February', id: 2},
			{name:'March', id: 3},
			{name:'April', id: 4},
			{name:'May', id: 5},
			{name:'June', id: 6},
			{name:'July', id: 7},
			{name:'August', id: 8},
			{name:'September', id: 9},
			{name:'October', id: 10},
			{name:'November', id: 11},
			{name:'December', id: 12},
	    ],
	    startYear: 2015,
	    endYear: 2015
	}
	$scope.startDate = '2015-03-01';
	$scope.endDate = '2015-03-07';
	$scope.startMonth = 'Select Start Month';
	$scope.endMonth = 'Select End Month';

	$scope.updateChart = function () {
		var newLabels = [],
			newData = [],
			data = solarData.dailyReadings($scope.startDate, $scope.endDate)
			
		data.$promise.then(function (response) {
			response.dailyReadings.forEach(function (row, i, arr) {
				newLabels.push(row.dateRead.split(' ')[0]);
				newData.push(row['kwh']);
			});

			$scope.chart.data.labels = newLabels;
			$scope.chart.data.datasets[0].data = newData;
			$scope.chart.update();
		}, function (response) {
			console.log('API Call failed.');
		});
	};

    $scope.toggle = {
		showDiagram: false,
		content: 'See Diagram',
		swap: function () {
	    	this.showDiagram = !this.showDiagram;
	    	if (this.showDiagram) {
	    		this.content = 'Chart Data';
	    	} else {
	    		this.content = 'See Diagram';
	    	}
	    }
    };
});