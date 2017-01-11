/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(["application"], function (app) {
    app.controller('listCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
            $scope.columnDefs = ["Date", "Business", "Holiday", "Forecast", "Actual", "Difference", "Pct Diff"];
            $scope.list = [];
            var today = new Date();
            
            var staticValues = 
                {excel:[
                {Date: '2015-11-01',	Business: 'NO',	Holiday: 'NO',	Forecast: 28330, Actual: 25984},
                {Date: '2016-01-11',	Business: 'YES',	Holiday: 'NO',	Forecast: 42929, Actual: 43047},
                {Date: '2016-01-12',	Business: 'YES',	Holiday: 'NO',	Forecast: 45041, Actual: 46086},
                {Date: '2016-01-13',	Business: 'YES',	Holiday: 'NO',	Forecast: 45378, Actual: 47547},
                {Date: '2016-01-14',	Business: 'YES',	Holiday: 'NO',	Forecast: 46641, Actual: 48750},
                {Date: '2016-01-15',	Business: 'YES',	Holiday: 'NO',	Forecast: 47527, Actual: 49723},
                {Date: '2016-01-16',	Business: 'NO',	Holiday: 'NO',	Forecast: 27646, Actual: 27027},
                {Date: '2016-01-17',	Business: 'NO',	Holiday: 'NO',	Forecast: 24167, Actual: 23924},
                {Date: '2016-07-14',	Business: 'YES',	Holiday: 'NO',	Forecast: 55313, Actual: 54977},
                {Date: '2016-07-15',	Business: 'YES',	Holiday: 'NO',	Forecast: 51245, Actual: 55042},
                {Date: '2016-07-16',	Business: 'NO',	Holiday: 'NO',	Forecast: 30807, Actual: 34974},
                {Date: '2016-07-17',	Business: 'NO',	Holiday: 'NO',	Forecast: 26486, Actual: 32221},
                {Date: '2016-07-18',	Business: 'YES',	Holiday: 'NO',	Forecast: 40122, Actual: 48677},
                {Date: '2016-07-19',	Business: 'YES',	Holiday: 'NO',	Forecast: 40354, Actual: 53150},
                {Date: '2016-07-20',	Business: 'YES',	Holiday: 'NO',	Forecast: 41741, Actual: 53657},
                {Date: '2016-07-21',	Business: 'YES',	Holiday: 'NO',	Forecast: 42549, Actual: 54962},
                {Date: '2016-07-22',	Business: 'YES',	Holiday: 'NO',	Forecast: 42606, Actual: 50514},
                {Date: '2016-07-23',	Business: 'NO',	Holiday: 'NO',	Forecast: 31714, Actual: 32214},
                {Date: '2016-07-24',	Business: 'NO',	Holiday: 'NO',	Forecast: 26925, Actual: 30089},
                {Date: '2016-07-25',	Business: 'YES',	Holiday: 'NO',	Forecast: 36782, Actual: 38674},
                {Date: '2016-07-26',	Business: 'YES',	Holiday: 'NO',	Forecast: 38676, Actual: 41071},
                {Date: '2016-07-27',	Business: 'YES',	Holiday: 'NO',	Forecast: 39894, Actual: 41535},
                {Date: '2016-07-28',	Business: 'YES',	Holiday: 'NO',	Forecast: 39757, Actual: 42698},
                {Date: '2016-07-29',	Business: 'YES',	Holiday: 'NO',	Forecast: 42733, Actual: 43711},
                {Date: '2016-07-30',	Business: 'NO',	Holiday: 'NO',	Forecast: 32194, Actual: 31881},
                {Date: '2016-07-31',	Business: 'NO',	Holiday: 'NO',	Forecast: 28514, Actual: 28979},
                {Date: '2016-08-01',	Business: 'YES',	Holiday: 'NO',	Forecast: 42551, Actual: 38029},
                {Date: '2016-08-02',	Business: 'YES',	Holiday: 'NO',	Forecast: 46034, Actual: 40170},
                {Date: '2016-08-03',	Business: 'YES',	Holiday: 'NO',	Forecast: 47691, Actual: 41632},
                {Date: '2016-08-04',	Business: 'YES',	Holiday: 'NO',	Forecast: 49085, Actual: 42488},
                {Date: '2016-08-05',	Business: 'YES',	Holiday: 'NO',	Forecast: 49823, Actual: 43349},
                {Date: '2016-08-06',	Business: 'NO',	Holiday: 'NO',	Forecast: 33625, Actual: 31733},
                {Date: '2016-08-07',	Business: 'NO',	Holiday: 'NO',	Forecast: 29313, Actual: 27678},
                {Date: '2016-08-08',	Business: 'YES',	Holiday: 'NO',	Forecast: 47060, Actual: 45161},
                {Date: '2016-08-09',	Business: 'YES',	Holiday: 'NO',	Forecast: 46049, Actual: 52706},
                {Date: '2016-08-10',	Business: 'YES',	Holiday: 'NO',	Forecast: 49430, Actual: 57938},
                {Date: '2016-08-11',	Business: 'YES',	Holiday: 'NO',	Forecast: 51266, Actual: 53508},
                {Date: '2016-08-12',	Business: 'YES',	Holiday: 'NO',	Forecast: 51699, Actual: 50220},
                {Date: '2016-08-13',	Business: 'NO',	Holiday: 'NO',	Forecast: 33932, Actual: 32409},
                {Date: '2016-08-14',	Business: 'NO',	Holiday: 'NO',	Forecast: 30962, Actual: 28785},
                {Date: '2016-08-15',	Business: 'YES',	Holiday: 'NO',	Forecast: 49654, Actual: 49380},
                {Date: '2016-08-16',	Business: 'YES',	Holiday: 'NO',	Forecast: 51262, Actual: 50023},
                {Date: '2016-11-06',	Business: 'NO',	Holiday: 'NO',	Forecast: 29009, Actual: 29089}
                ]};
            
            for (var i = 0; i < staticValues.excel.length; i++) {
                var object = staticValues.excel[i];
//                var randomNumberBetween0and19 = Math.floor(Math.random() * 20);
//                object[$scope.columnDefs[0]] = today.setDate(today.getDate() + randomNumberBetween0and19);
//                object[$scope.columnDefs[1]] = _.sample(["YES", "NO"]);
//                object[$scope.columnDefs[2]] = _.sample(["YES", "NO"]);
//                object[$scope.columnDefs[3]] = Math.floor(Math.random()*90000) + 10000;
//                object[$scope.columnDefs[4]] = Math.floor(Math.random()*90000) + 10000;
                object[$scope.columnDefs[5]] = object[$scope.columnDefs[4]] - object[$scope.columnDefs[3]];
                object[$scope.columnDefs[6]] = Math.round(object[$scope.columnDefs[5]] / object[$scope.columnDefs[3]]*100)/100;
                object['absPercent'] = Math.abs(object[$scope.columnDefs[6]]);
                object['percentage'] = object[$scope.columnDefs[5]] / object[$scope.columnDefs[3]];
                $scope.list.push(object);       
            }
            $scope.enterNumber = function (object) {
                object[$scope.columnDefs[5]] = object[$scope.columnDefs[3]] - object[$scope.columnDefs[4]];
                object[$scope.columnDefs[6]] = object[$scope.columnDefs[5]] / object[$scope.columnDefs[3]];
                object['absPercent'] = Math.abs(object[$scope.columnDefs[6]]);                
            }            
            
            $scope.getAll = function () {
                
               var v = JSON.stringify(_.filter($scope.list, function(item) {return item.absPercent > 0.15}));
               return v;
            }
            
            //$rootScope.data = $scope.getAll(); 
            
            $scope.goToNext = function() {
                $rootScope.data = $scope.getAll(); 
                console.log($rootScope.data);
                $state.go("process");
            }
        }]);
    })
