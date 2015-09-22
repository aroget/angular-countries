'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CountryCtrl
 * @description
 * # CountryCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountryCtrl', ['$scope', '$http', '$routeParams', '$q', function ($scope, $http, $routeParams, $q) {

    var country = $routeParams.name;
    var formattedCountry = country.replace(/-/g, ' ');

    $q.all([

      // Country Data
      $http.get('https://restcountries.eu/rest/v1/name/'+formattedCountry+'?fullText=true', { cache: true}).then(function(response) {
        $scope.countries = response.data;
      }),

      // Images
      $http.get('https://api.500px.com/v1/photos/search?term='+country+'&tag=landscape&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H', { cache: true}).then(function(response) {
        console.log(response);
        $scope.image = response.data.photos[0].images[0].url;
      }),

    ]).then(function() {
      // console.log('all')
    });

  }]);
