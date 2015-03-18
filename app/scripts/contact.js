'use strict';

app.directive('contactPane', function(){
	return {
		restrict: 'A',
		scope: {
			member: '=name'
		},
		templateUrl: 'views/contact_pane.html'
	}
})

.controller('ContactCtrl', function($scope) {
	$scope.seth = { 
		name: 'Seth Champagne',
		role: 'Team Leader',
		email: 'seth.champagne@selu.edu',
		image: 'seth.png'
	};
	$scope.rory = { 
		name: 'Rory Avant',
		role: 'Backend Developer',
		email: 'rory.avant@selu.edu',
		image: 'rory.png'
	};
	$scope.tyler = { 
		name: 'Tyler Becker',
		role: 'Javascript Wizard',
		email: 'tyler.becker@selu.edu',
		image: 'tyler.png'
	};
	$scope.nick = { 
		name: 'Nicholas Moran',
		role: 'MySQL Guru',
		email: 'nicholas.moran@selu.edu',
		image: 'nick.png'
	};
	$scope.derek = { 
		name: 'Derek Boudreaux',
		role: 'SCRUM Master',
		email: 'derek.boudreaux@selu.edu',
		image: 'dikwrek.png'
	};
});