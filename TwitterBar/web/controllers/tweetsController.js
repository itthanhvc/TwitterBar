(function () {
    // Controller when the main page/view loads
    tweetApp.controller("tweetsCtrl", ['$scope', 'DataService', 'StorageService', function ($scope, DataService, StorageService) {
            // get topic from session
            $scope.topic = StorageService.getStorage("topic");
            $scope.tweets = [];
            if ($scope.topic === null) {
                $scope.topic = 'Documentary';
            }

            getTweetFromServlet($scope.topic);
            /*Event handlers*/
            $scope.handle = function (topic) {
                $scope.topic = topic;
                getTweetFromServlet(topic);
            };
            $scope.$watch("topic", function (newValue, oldValue) {
                StorageService.setStorage("topic", newValue);
            });
            /*Functions*/
            function getTweetFromServlet(topic) {
                DataService.getTweets(topic).then(function (response) {
                    $scope.tweets = response;
                });
            }
        }]);
})();

