// Country Data
// https://restcountries.eu/rest/v1/region/' + region
// Images
// $http.get('https://api.500px.com/v1/photos/search?term='+  $scope.countries +'&tag=landscape&&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H
// wikisherpa
// https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=berlin&callback=?
'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:RegionCtrl
 * @description
 * # RegionCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('RegionCtrl', ['$scope', '$http', '$routeParams', '$q', function ($scope, $http, $routeParams, $q) {
    var region = $routeParams.name;

    var one = $q.defer();

    var all = $q.all([
      $http.get("https://restcountries.eu/rest/v1/region/" + region, { cache: true}),
    ]);

    all.then(function(response){
      var countries = response[0].data;
      var data = [];
      var max = countries.length;

      angular.forEach(countries, function(country) {

        var image = function(country){
          return $http.get('https://api.500px.com/v1/photos/search?term='+  country+'&tag=landscape&&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H', {cache:true}).then(function(response) {

            if (response.data.photos[0].image_url){
              return response.data.photos[0].image_url;
            }
            else{
              return 'default.png';
            }
          });
        }

        data.push({
          name : country.name,
          capital : country.capital,
          region : country.region,
          image : image(country.name)
        });
      });

      $scope.countries = data;
    })
  }]);
