/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
requirejs.config({
    //baseUrl: "/alarm",
    paths: {
        "static": "./" 
    },    
    shim: {
        "angular":  ["jquery"],
        "angular-ui-router": ["angular"],
        "angular-dynamic-number": ["angular"]
    }
});
    
define("common", [
    "jquery",
    "angular",
    "angular-ui-router",    
    "bootstrap",
    "underscore",
    "angular-dynamic-number"
]);
    
// Start loading the main app file. Put all of
// your application logic in there.

requirejs(['common'], function () {
    var app = angular.module("alarmApp", ['ui.router', 'dynamicNumber']);
    app.run(['$http', '$rootScope', function ($http, $rootScope) {
            $rootScope.contextPath = trimap.context.path;  
            $http.processResponse = function (r) {
                return r.data;
            };
            console.log("b");
            $('#loadMask').fadeOut(300);
        }])    
    app.filter('percentage', ['$filter', function ($filter) {
            return function (input, decimals) {
                return $filter('number')(input * 100, decimals) + '%';
            };
        }]);
    define("application", [], function () {
        return app;
    });
    requirejs(['static/routeInit'], function () {
//        trimap.loadMask = new trimap.LoadMask("#loadMask");
//        trimap.loadMask.show();  
        console.log("a");
        $('#loadMask').show();
        angular.bootstrap(document, ['alarmApp']);
    })
})

