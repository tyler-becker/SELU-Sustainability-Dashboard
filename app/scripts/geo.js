
app.controller('GeoCtrl', function($scope, Arrow, geoData) {
	var arrows = [],
		d = new Date();

	$scope.weather = {
		text: 'Hammond: 72.3°F Mostly Cloudy',
		src: 'http://icons.wxug.com/i/c/k/nt_mostlycloudy.gif'
	};

	// diagram stuff
	$scope.diagramTitle = 'Geothermal System';
	$scope.scale = false;
	$scope.arrows = arrows;
	$scope.diagram = [];

	// chart stuff
	$scope.pie = {
		value: 110,
		unit: 'kWh'
	};
	$scope.chart = {
		title: 'Geothermal Data',
		showDaily: true,
		input: 'Current Readings',
		swap: function () {
			this.showDaily = !this.showDaily;
	    	if (this.showDaily) {
	    		this.input = 'Daily Readings';
	    	} else {
	    		this.input = 'Current Readings';
	    	}
		},
		data: {
	        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	        datasets: [
	            {
	                label: 'we made it',
	                fillColor: 'rgba(14,112,9,0.5)',
	                strokeColor: 'rgba(14,112,9,0.8)',
	                highlightFill: 'rgba(14,112,9,0.75)',
	                highlightStroke: 'rgba(14,112,9,1)',
	                data: geoData.data
	            }
	        ]
	    }
	};

	if (d.getMonth() > 9) {
		$scope.today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
	} else {
		$scope.today = d.getFullYear() + '-0' + (d.getMonth()+1) + '-' + d.getDate();
	}

	$scope.startDate = '2015-03-01';
	$scope.endDate = '2015-03-07';
	$scope.updateChart = function () {};

    $scope.toggle = {
		showDiagram: false,
		content: 'See Diagram',
		swap: function () {
	    	this.showDiagram = !this.showDiagram;
	    	if (this.showDiagram) {
	    		this.content = 'See Data';
	    	} else {
	    		this.content = 'See Diagram';
	    	}
	    }
    };
});