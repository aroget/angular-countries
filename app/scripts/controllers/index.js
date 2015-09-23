'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('IndexCtrl', ['$scope', '$http', function ($scope, $http) {

    function getCountries() {
      return $http.get("https://restcountries.eu/rest/v1/all", { cache: true});
    }

    function getImages(country){
      return $http.get("https://api.500px.com/v1/photos/search?term="+  country+"&tag=landscape&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H", { cache: true});
    }


    var coutriesPromise = getCountries();

    coutriesPromise.then(function(countries) {
      var countriesList = [];
      // console.log(countries);
      angular.forEach(countries.data, function(country){

        var name    = country.name;
        var capital = country.capital;
        var region  = country.region;

        var imagesPromise = getImages(country.name);

        imagesPromise.then(function(images){


          var image = images.data.photos[0].image_url;
          countriesList.push({
            'name' : name,
            'capital' : capital,
            'region' : region,
            'image' : image
          });
          $scope.countries = countriesList;

        });
      })

    }, function(reason) {
      console.log(reason);
    });


  }]);
