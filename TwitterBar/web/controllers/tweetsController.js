(function () {
    // Controller when the main page/view loads
    tweetApp.controller("tweetsCtrl", ['$scope','DataService', function ($scope, DataService) {
            $scope.tweets = [];

        DataService.getTweets("action").then(function(response){
            $scope.tweets = response;
        });
        
    }]);
})();

