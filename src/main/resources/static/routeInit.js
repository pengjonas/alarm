/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['application', 'static/list', 'static/process'], function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('list', {
                        url: '/list',
                        controller: 'listCtrl',
                        templateUrl: 'list.html'
                    })
                    .state('process', {
                        url: '/process',
                        controller: 'processCtrl',
                        templateUrl: 'process.html'
                    })                    
            $urlRouterProvider.otherwise('/list');
        }]);

    app.controller('routeInit', ['$scope', '$state', function ($scope, $state) {
        }]);
});



