/**
 * Copyright (c) 2016 The Hyve B.V.
 * This code is licensed under the GNU General Public License,
 * version 3, or (at your option) any later version.
 */

angular.module('ts.my-module', [])
    .component('myComponent',{
            templateUrl: 'src/my-module.html'
    });

angular.module('ts.my-module').run(['$templateCache', function($templateCache) {$templateCache.put('src/my-module.html','<h1>MY COMPONENT</h1>\n');}]);