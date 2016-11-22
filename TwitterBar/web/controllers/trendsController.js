(function () {
    // Controller when the main page/view loads
    tweetApp.controller("trendsCtrl", ['$scope','DataService', function ($scope, DataService) {
           $scope.trends = [];
         DataService.postTrends({"woeid":2295414}).then(function(response) {
            $scope.trends = response;
        }); 
    }]);
})();

