(function () {
    // Controller when the main page/view loads
    tweetApp.controller("trendsCtrl", ['$scope', 'DataService', 'NgMap', function ($scope, DataService, NgMap) {
            $scope.trends = [];
            NgMap.getMap().then(function (map) {
                map.addListener('click', function (e) {
                    DataService.postTrends({"latitude": "37.781157", "longitude": "-122.400612831116"})
                            .then(function (response) {
                        $scope.trends = response;
                    });
                    //  placeInfoWindowTrends(e.latLng, map);
                });
            });
        }]);
})();

