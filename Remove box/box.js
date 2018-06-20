var app = angular.module('myApp', []);

app.controller('appCntrl', function($scope) {
    $scope.rectname = "rect";    
});

app.directive('rectangle', function() {
    function linkFunction(scope, elem, attr) {
        scope.arr = Array(parseInt(attr.count)).fill(attr.count);
                scope.remove =  function(i){
                                    scope.arr.splice(i,1);
                }
    }   
    return {
        template: `
            <div ng-repeat="n in arr track by $index" style="border: 1px solid red; padding: 20px; width: 200px; height: 200px">
            <button ng-click="remove($index)">Remove</button>
            </div>`,
        link: linkFunction
    }

});

    