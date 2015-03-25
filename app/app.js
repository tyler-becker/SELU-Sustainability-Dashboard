'use strict';

var app = angular.module('dashboard', ['ui.router', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    })
    .state('solar', {
        url: '/solar',
        templateUrl: 'views/tech.html',
        controller: 'SolarCtrl'
    })
    .state('photo', {
        url: '/photo',
        templateUrl: 'views/tech.html',
        controller: 'PhotoCtrl'
    })
    .state('geo', {
        url: '/geo',
        templateUrl: 'views/tech.html',
        controller: 'GeoCtrl'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
    });;
  $urlRouterProvider.otherwise('/home');
})

.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout'
})

.constant('USER_ROLES', {
    admin: 'admin'
})

.factory('chartService',function(){
	return {
		dailyReadings: [12, 13, 14, 15, 20, 50, 60]
		//$resource('solar-dashboard/api/index.php/dailyReadings');
	};
})

.factory('AuthService', function($http, Session) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
        .post('/login', credentials)
        .then(function (res){
            Session.create(res.data.id, res.data.user.id,
                            res.data.user.role);
            return res.data.user;
        });
    };
})

.controller('HomeCtrl', function($scope, chartService) {
	$scope.message = 'we made it';
	$scope.dailyReadings = function() {
        return{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(14,112,9,0.5)",
                        strokeColor: "rgba(14,112,9,0.8)",
                        highlightFill: "rgba(14,112,9,0.75)",
                        highlightStroke: "rgba(14,112,9,1)",
                        data: chartService.dailyReadings
                    }
                ]
            }
        }   
})

.controller('SolarCtrl', function($scope) {
    $scope.message='Ayyy lmao';
})

.controller('NavCtrl', function($scope, $location){
    $scope.isActive = function (viewLocation){
        return viewLocation === $location.path();
    };
})

.controller('LoginCtrl', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
        username:'',
        password:''
    }

    $scope.login = function(credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
        }, function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
});