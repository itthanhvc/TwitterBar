(function () {
    tweetApp.factory('DataService', function ($http, $q) {
       return {
            getTweets: function (topic) {
               var ds = new DataService("GetTweetsServlet", $q, $http);
               return ds.get(topic);
            }, 
             postTweets: function (topic) {
               var ds = new DataService("GetTweetsServlet", $q, $http);
               return ds.post(topic);
            },
            postTrends: function(woeid) {
                var ds = new DataService("GetTrendServlet", $q, $http);
                return ds.post(woeid)
            }
            
        };
    });
    function DataService(controllerName, $q, $http) {
        this.controllerName = controllerName;
        this.$q = $q;
        this.$http = $http;
        //this function is binding to ajax event to show up loading icon when getting data from server
        $(document).bind("ajaxSend", function () {
            $.blockUI({message: "<div id='spinner' class='spinner'>\n\
                                 <img id='img-spinner' src='../Images/ajax-loader.gif' alt='Loading' /></div>"});
        }).bind("ajaxStop", function (event, xhr, settings) {
            $.unblockUI();
        }).bind("ajaxError", function (event, jqXHR, ajaxSettings, errorThrown) {
            $.unblockUI();
            DataService.showFriendlyError();
        });
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

    DataService.showFriendlyError = function () {
        var errorMessage = "An error occurred while running application. \nPlease see logs for details";
        alert(errorMessage);
    };
})()