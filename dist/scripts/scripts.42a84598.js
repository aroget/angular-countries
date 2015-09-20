"use strict";angular.module("angularCountriesApp",["ngCookies","ngResource","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/index.html",controller:"IndexCtrl",controllerAs:"index"}).when("/region/:name",{templateUrl:"views/region.html",controller:"RegionCtrl",controllerAs:"region"}).when("/country/:name",{templateUrl:"views/country.html",controller:"CountryCtrl",controllerAs:"country"}).when("/city/:name",{templateUrl:"views/city.html",controller:"CityCtrl",controllerAs:"city"}).otherwise({redirectTo:"/"})}]),angular.module("angularCountriesApp").controller("IndexCtrl",["$scope","$http","$q",function(a,b,c){var d=(c.defer(),c.all([b.get("https://restcountries.eu/rest/v1/all",{cache:!0})]));d.then(function(c){var d=c[0].data,e=[];d.length;angular.forEach(d,function(a){var c=function(a){return b.get("https://api.500px.com/v1/photos/search?term="+a+"&tag=landscape&&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H",{cache:!0}).then(function(a){return a.data.photos[0].image_url?a.data.photos[0].image_url:"default.png"})};e.push({name:a.name,capital:a.capital,region:a.region,image:c(a.name)})}),a.countries=e})}]),angular.module("angularCountriesApp").filter("formatedname",[function(){return function(a){return angular.isString(a)?a.replace(/[\s]/g,"-"):a}}]),angular.module("angularCountriesApp").controller("RegionCtrl",["$scope","$http","$routeParams","$q",function(a,b,c,d){var e=c.name,f=(d.defer(),d.all([b.get("https://restcountries.eu/rest/v1/region/"+e,{cache:!0})]));f.then(function(c){var d=c[0].data,e=[];d.length;angular.forEach(d,function(a){var c=function(a){return b.get("https://api.500px.com/v1/photos/search?term="+a+"&tag=landscape&&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H",{cache:!0}).then(function(a){return a.data.photos[0].image_url?a.data.photos[0].image_url:"default.png"})};e.push({name:a.name,capital:a.capital,region:a.region,image:c(a.name)})}),a.countries=e})}]),angular.module("angularCountriesApp").controller("CountryCtrl",["$scope","$http","$routeParams","$q",function(a,b,c,d){var e=c.name,f=e.replace(/-/g," ");d.all([b.get("https://restcountries.eu/rest/v1/name/"+f+"?fullText=true",{cache:!0}).then(function(b){a.countries=b.data}),b.get("https://api.500px.com/v1/photos/search?term="+e+"&tag=landscape&&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H",{cache:!0}).then(function(b){a.image=b.data.photos[0].images[0].url})]).then(function(){console.log("all")})}]),angular.module("angularCountriesApp").controller("CityCtrl",["$scope","$http","$routeParams","$q",function(a,b,c,d){var e=c.name,f=e.replace(/-/g," ");d.all([b.get("https://restcountries.eu/rest/v1/capital/"+f,{cache:!0}).then(function(b){a.countries=b.data}),b.get("https://api.500px.com/v1/photos/search?term="+e+"&tag=landscape&&image_size=4&rpp=1&consumer_key=pxJyGsnSyQnwfT2xzDUie8L9lzym7FdVYLWGCA3H",{cache:!0}).then(function(b){a.image=b.data.photos[0].images[0].url})]).then(function(){console.log("all")})}]),angular.module("angularCountriesApp").run(["$templateCache",function(a){a.put("views/city.html",'<ul class="city"> <li ng-repeat="country in countries | filter: query"> <div class="hero" style="background-image:url(\'{{ image }}\')"> <h1>{{ country.capital }}</h1> </div> <div class="meta-data"> <p>Country: <span class="capital"> <a href="#/city/{{ country.name | lowercase | formatedname }}">{{ country.name }}</a> </span> </p> <p>Region: <span class="region"> <a href="#/region/{{ country.region | lowercase | formatedname }}">{{ country.region }}</a> </span> </p> <p>Population: <span class="population"> {{ country.population | number }} </span> </p> <p>Currency: <span class="currency"> {{ country.currencies[0] }} </span> </p> </div> </li> </ul>'),a.put("views/country.html",'<ul class="country"> <li ng-repeat="country in countries | filter: query"> <div class="hero" style="background-image:url(\'{{ image }}\')"> <h1>{{ country.name }}</h1> </div> <div class="meta-data"> <p>Capital: <span class="capital"> <a href="#/city/{{ country.capital | lowercase | formatedname }}">{{ country.capital }}</a> </span> </p> <p>Region: <span class="region"> <a href="#/region/{{ country.region | lowercase | formatedname }}">{{ country.region }}</a> </span> </p> <p>Population: <span class="population"> {{ country.population | number }} </span> </p> <p>Currency: <span class="currency"> {{ country.currencies[0] }} </span> </p> </div> </li> </ul>'),a.put("views/index.html",'<ul class="index"> <div class="row"> <li ng-repeat="country in countries | filter: query" class="col-sm-6 col-xs-12 col-md-6 {{ country.region | lowercase | formatedname }}" style="background-image:url(\'{{country.image.$$state.value}}\')"> <h2> <a href="#/country/{{ country.name | lowercase | formatedname }}"> {{ country.name }} </a> </h2> <div class="meta-data"> <p>Capital: <span class="capital"> <a href="#/city/{{ country.capital | lowercase | formatedname }}">{{ country.capital }}</a> </span> </p> <p>Region: <span class="region"> <a href="#/region/{{ country.region | lowercase | formatedname }}">{{ country.region }}</a> </span> </p> </div> </li> </div> </ul>'),a.put("views/region.html",'<ul class="region"> <div class="row"> <li ng-repeat="country in countries | filter: query" class="col-sm-6 col-xs-12 col-md-6 {{ country.region | lowercase | formatedname }}" style="background-image:url(\'{{country.image.$$state.value}}\')"> <h2> <a href="#/country/{{ country.name | lowercase | formatedname }}"> {{ country.name }} </a> </h2> <div class="meta-data"> <p>Capital: <span class="capital"> <a href="#/city/{{ country.capital | lowercase | formatedname }}">{{ country.capital }}</a> </span> </p> <p>Region: <span class="region"> <a href="#/region/{{ country.region | lowercase | formatedname }}">{{ country.region }}</a> </span> </p> </div> </li> </div> </ul>')}]);