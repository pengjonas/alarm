/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(["application"], function (app) {
    app.controller('processCtrl', ['$scope', '$stateParams', '$rootScope', '$http', function($scope, $stateParams, $rootScope, $http) {
            $scope.processAll = function() {
                if ($rootScope.data) {
                    //alert($rootScope.contextPath);
                    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                    $http.post("api/process", $.param({data: $rootScope.data})).then($http.processResponse).then(
                            function(data){
                                alert('Email sent to ' + data.email)
                            });
                }
            } 
            
        }]);
    })
