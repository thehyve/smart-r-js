/**
 * Copyright (c) 2016 The Hyve B.V.
 * This code is licensed under the GNU General Public License,
 * version 3, or (at your option) any later version.
 */
describe('my component', function () {
    beforeEach(module('ts.my-module', function ($provide) {
        $provide.factory('ts.my-module', function () {
            return {
                templateUrl: 'src/my-module.html'
            };
        });
    }));
    it('should render MY COMPONENT', angular.mock.inject(function ($rootScope, $compile) {
        var element = $compile('<my-component></my-component>')($rootScope);
        $rootScope.$digest();
        var h1 = element.find('h1');
        expect(h1.html()).toEqual('MY COMPONENT');
    }));
});
