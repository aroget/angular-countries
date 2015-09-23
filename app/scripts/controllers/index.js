'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('IndexCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

      var one = $q.defer();

      var all = $q.all([
        $http.get("https://restcountries.eu/rest/v1/all", { cache: true}),
      ]);

      all.then(function(response){
        var countries = response[0].data;
        var data = [];

        angular.forEach(countries, function(country, index) {
          var image = function(country){
            return $http.get('https://api.500px.com/v1/photos/search?term='+  country+'&tag=landscape&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H', { cache: true}).then(function(response) {

              $scope.countries[index].image = response.data.photos[0].image_url;
            });
          }

          data.push({
            name : country.name,
            capital : country.capital,
            region : country.region,
            image : 'https://drscdn.500px.org/photo/80599269/m%3D900_k%3D1_a%3D1/9a459a51c54f39cf673078938175c8c4'
          });
        });

        $scope.countries = data;
        // console.log($scope);
      })

  }]);
