var tweetApp = angular.module("tweetApp", ['ui.router', 'ngResource', 'ngMap']);

tweetApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tweets', {
        url: '/tweets',
        templateUrl: 'views/tweets.html',
        controller: 'tweetsCtrl',
        controllerAs: 'vm'
    }).state('trends', {
        url: '/trends',
        templateUrl: 'views/trends.html',
        controller: 'trendsCtrl',
        controllerAs: 'vm'
    });
    $urlRouterProvider.otherwise("/tweets");
});
