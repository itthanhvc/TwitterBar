(function () {
    tweetApp.factory('StorageService', function ($http, $q) {
        function StorageService() {
        }

        StorageService.prototype.constructor = StorageService;

        StorageService.prototype.setStorage = function (key, value) {
            var json;
            json = value === void 0 ? null : value;
            return localStorage.setItem(key, json);
        };

        StorageService.prototype.getStorage = function (key) {
            return localStorage.getItem(key);
        };

        StorageService.prototype.clear = function () {
            var key, results;
            results = [];
            for (key in localStorage) {
                results.push(this.setStorage(key, null));
            }
            return results;
        };

        return new StorageService();
    });
})();