'use strict';

var app = angular.module('dashboard', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'views/test.html',
        controller: 'HomeCtrl'
    });
  $urlRouterProvider.otherwise('/home');
})

.controller("HomeCtrl", function($scope) {
	$scope.message = 'we made it';
});