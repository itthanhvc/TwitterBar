(function () {
    // Controller when the main page/view loads
    tweetApp.controller("tweetsCtrl", ['$scope', 'DataService', function ($scope, DataService) {
            $scope.tweets = [];
            $scope.topic = 'Documentary';
            getTweetFromServlet('Documentary');
            /*Event handlers*/
            $scope.handle = function (topic) {
                $scope.topic = topic;
                getTweetFromServlet(topic);
            };
            /*Functions*/
            function getTweetFromServlet(topic) {
                DataService.getTweets(topic).then(function (response) {
                    $scope.tweets = response;
                });
            }
        }]);
})();

