'use strict';

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
});