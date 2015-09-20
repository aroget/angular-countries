'use strict';

describe('Filter: formatedname', function () {

  // load the filter's module
  beforeEach(module('angularCountriesApp'));

  // initialize a new instance of the filter before each test
  var formatedname;
  beforeEach(inject(function ($filter) {
    formatedname = $filter('formatedname');
  }));

  it('should return the input prefixed with "formatedname filter:"', function () {
    var text = 'angularjs';
    expect(formatedname(text)).toBe('formatedname filter: ' + text);
  });

});
