'use strict';

app.factory('chartService', function () {
	return {
		dailyReadings: [12, 13, 14, 15, 20, 50, 60]
		//$resource('solar-dashboard/api/index.php/dailyReadings');
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
