(function () {
    // Controller when the main page/view loads
    tweetApp.controller("trendsCtrl", ['$scope','DataService', function ($scope, DataService) {
           $scope.trends = [];
         DataService.postTrends({"latitude":"37.781157", "longitude":"-122.400612831116"}).then(function(response) {
            $scope.trends = response;
        }); 
    }]);
})();

