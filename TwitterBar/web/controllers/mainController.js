(function () {
    // Controller when the main page/view loads
    tweetApp.controller("mainCtrl", ['$scope', function ($scope) {
            $scope.activeClass = "";
            $scope.menu=""
            $scope.collapse = function () {
                $scope.activeClass = $scope.activeClass === "collapse in" ? "" : "collapse in";
            };
        }]);
})();

