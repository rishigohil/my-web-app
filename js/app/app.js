/**
 * Created by Rishi Gohil on 7/19/2017.
 */

//Initializing the beast.
var myapp = angular.module('my-web-app', ['ngRoute', 'ngAnimate', 'ngSanitize']);

//Let’s pave the way for the beast.
myapp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'my-controller'
        }).otherwise({
            templateUrl: '/views/404.html',
            controller: 'not-found-controller'
        });

    $locationProvider.html5Mode(true).hashPrefix('!');
});

//Providing the weapons to the beast.
myapp.factory('appData', function ($http) {
    return {
        get: function () {
            return $http.get('/js/app/data.json');
        }
    };
});

myapp.controller('my-controller', function ($scope, appData) {
    appData.get().then(function (response) {
        let result = response.data[0];

        $scope.name = result.name;
        $scope.designation = result.designation;
        $scope.currentDesignation = result.currentDesignation;
        $scope.bio = result.bio;
        $scope.resumeUrl = result.resumeUrl;
    });
});

myapp.directive('mySocialLinksDirective', function () {
    return {
        templateUrl: '/views/social.html',
        scope: {},
        controller: function ($scope, appData) {
            appData.get().then(function (response) {
                let result = response.data[0].socialLinks;
                $scope.socialData = result;
            });
        }
    };
});

myapp.controller('not-found-controller', function ($scope, $location) {
    $scope.path = $location.path();
    $scope.back = function () {
        history.back();
    };
});