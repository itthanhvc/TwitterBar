(function () {
    // Controller when the main page/view loads
    tweetApp.controller("tweetsCtrl", ['$scope','DataService', function ($scope, DataService) {
        DataService.getTweets("").then(function(){
            
        });
    }]);
})();

