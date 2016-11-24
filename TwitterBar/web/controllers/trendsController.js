(function () {
    // Controller when the main page/view loads
    tweetApp.controller("trendsCtrl", ['$scope', 'DataService', 'NgMap', function ($scope, DataService, NgMap) {
            $scope.trends = [];
           // var vm = this;
            NgMap.getMap().then(function (map) {
                $scope.map = map;
//                map.addListener('click', function (e) {
//                    var latlng = e.latLng;
//                    DataService.getTrends("37.781157", "-122.400612831116")
//                               .then(function (response) {
//                        map.showInfoWindow("views/infowindow.html", this);
//                        $scope.trends = response;
//                    });
//                    //  placeInfoWindowTrends(e.latLng, map);
//                });
               
            });
            $scope.placeInfoWindowTrend = function(event){
                  console.log('event', event);
                  $scope.currentPosition = event.latLng;
      
                  DataService.getTrends(event.latLng.lat(), event.latLng.lng())
                               .then(function (response) {
                        $scope.trends = response;
                        $scope.map.showInfoWindow('trend-info');
                  });
                  
                  //console.log("latLng", event.latLng);
                  //$scope.map.setCenter(event.latLng);
                  
            }
        }]);
})();

