

'use strict';

/**
 * @ngdoc filter
 * @name angularCountriesApp.filter:formatedname
 * @function
 * @description
 * # formatedname
 * Filter in the angularCountriesApp.
 */
angular.module('angularCountriesApp')
  .filter('formatedname', [function () {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '-');
    };
  }]);
