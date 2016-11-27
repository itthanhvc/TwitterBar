(function () {
    tweetApp.factory('DataService', function ($http, $q) {
        return {
            getTweets: function (topic) {
                var ds = new DataService("GetTweetsServlet", $q, $http);
                return ds.get("?topic=" + topic);
            },
            getTrends: function (latitude, longitude) {
                var ds = new DataService("GetTrendServlet", $q, $http);
                return ds.get("?latitude=" + latitude + "&longitude=" + longitude)
            },

        };
    });
    function DataService(controllerName, $q, $http) {
        this.controllerName = controllerName;
        this.$q = $q;
        this.$http = $http;
    }

    DataService.prototype.get = function (query) {
        var url = this.controllerName;
        if (query != undefined && query !== "")
            url += query;

        var defer = this.$q.defer();
        this.$http.get(url)
                .success(function (data) {
                    defer.resolve(data);
                }).error(function (response) {
            defer.reject(response);
        });

        return defer.promise;
    };

    DataService.prototype.post = function (data) {
        var url = this.controllerName;
        var defer = this.$q.defer();
        this.$http.post(url, JSON.stringify(data))
                .success(function (response) {
                    defer.resolve(response);
                }).error(function (response) {
            defer.reject(response);
        });

        return defer.promise;
    };
})();