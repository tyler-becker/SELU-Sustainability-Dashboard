
app.factory('solarData', function ($resource) {
    var dailyReadings = function (start, end) {
            var apiCall = $resource('../api/index.php/dailyReadings?start=:startDate&end=:endDate', 
                {startDate: start, endDate: end})
            return apiCall.get();
        };
	return {
		data: [12, 13, 14, 15, 20, 50, 60],
        test: $resource('../api/index.php/getTest').get(),
        dailyReadings: dailyReadings
	};
})

.factory('Arrow', function () {
    return {
        // arrow constructor
        create: function (x, y, dir, path) {
            // (x,y) value to refernce for translate method
            // the tip of the arrow
            this.x = x
            this.y = y;
            this.init = {
                x: x,
                y: y
            };
            // direction that the arrow points ('u', 'd', 'l', 'r')
            this.d = dir;
            // tracks the path of the arrow (array of points)
            this.path = path;
            // path index tracker
            this.i = dir.length;
        }
    };
});
