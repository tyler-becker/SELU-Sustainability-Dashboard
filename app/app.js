'use strict';

var app = angular.module('dashboard', ['ui.router'])

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

.controller('HomeCtrl', function($scope) {
	$scope.message = 'we made it';
});