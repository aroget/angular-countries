'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CityCtrl
 * @description
 * # CityCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CityCtrl', ['$scope', '$http', '$routeParams', '$q', function ($scope, $http, $routeParams, $q) {

    var city = $routeParams.name;
    var formattedCity = city.replace(/-/g, ' ');

      $q.all([

        // Country Data
        $http.get('https://restcountries.eu/rest/v1/capital/'+ formattedCity, { cache: true}).then(function(response) {
          $scope.countries = response.data;
        }),

        // Images
        $http.get('https://api.500px.com/v1/photos/search?term='+  city +'&tag=landscape&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H', { cache: true}).then(function(response) {
          $scope.image = response.data.photos[0].images[0].url;
        }),

        // $http.get('http://www.wikisherpa.com/api/1/page/en/' + country + '?callback=JSON_CALLBACK').then(function(response){
        //   $scope.details = response.data;
        //   console.log(response.data);
        // }),

        // wikisherpa
        // https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=berlin&callback=?


      ]).then(function() {
        console.log('all')
      })

  }]);
