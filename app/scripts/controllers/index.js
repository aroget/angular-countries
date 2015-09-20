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

      // $http.get('https://restcountries.eu/rest/v1/all')
      //   .success(function(data){
      //     console.log(data);
      //     $scope.countries = data;
      //
      //   })
      //   .error(function(error){
      //     console.log(error);
      //   });

      var one = $q.defer();

      var all = $q.all([
        $http.get("https://restcountries.eu/rest/v1/all", { cache: true}),
      ]);

      all.then(function(response){
        var countries = response[0].data;
        var data = [];

        angular.forEach(countries, function(country) {

          var image = function(country){
            return $http.get('https://api.500px.com/v1/photos/search?term='+  country+'&tag=landscape&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H', { cache: true}).then(function(response) {

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
