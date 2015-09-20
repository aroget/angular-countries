'use strict';

/**
 * @ngdoc overview
 * @name angularCountriesApp
 * @description
 * # angularCountriesApp
 *
 * Main module of the application.
 */
angular
  .module('angularCountriesApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl',
        controllerAs: 'index'
      })
      .when('/region/:name', {
        templateUrl: 'views/region.html',
        controller: 'RegionCtrl',
        controllerAs: 'region'
      })
      .when('/country/:name', {
        templateUrl: 'views/country.html',
        controller: 'CountryCtrl',
        controllerAs: 'country'
      })
      .when('/city/:name', {
        templateUrl: 'views/city.html',
        controller: 'CityCtrl',
        controllerAs: 'city'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
