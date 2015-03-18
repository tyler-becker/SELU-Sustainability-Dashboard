'use strict';

var app = angular.module('dashboard', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'views/test.html',
        controller: 'HomeCtrl'
    })
    .state('solar', {
        url: '/solar',
        templateUrl: 'views/solar.html',
        controller: 'SolarCtrl'
    })
    .state('photo', {
        url: '/photo',
        templateUrl: 'views/photo.html',
        controller: 'PhotoCtrl'
    })
    .state('geo', {
        url: '/geo',
        templateUrl: 'views/geo.html',
        controller: 'GeoCtrl'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html'
    });;
  $urlRouterProvider.otherwise('/home');
})

.controller("HomeCtrl", function($scope) {
	$scope.message = 'we made it';
});