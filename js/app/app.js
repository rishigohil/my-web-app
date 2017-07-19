/**
 * Created by Rishi Gohil on 7/19/2017.
 */

//Initializing the beast.
var myapp = angular.module('my-web-app', ['ngRoute', 'ngAnimate', 'ngSanitize']);

//Configuring the beast to do its job.
myapp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'my-controller'
        }).when('/soon', {
            templateUrl: '/views/CS.html',
            controller: 'cs-controller'
        })

    $locationProvider.html5Mode(true).hashPrefix('!');
});

myapp.factory('appData', function ($http) {
    return {
        get: function () {
            return $http.get('/js/app/data.json');
        }
    };
});

myapp.controller('cs-controller', function ($scope) {
    $scope.message = 'Coming Soon';
})

myapp.controller('my-controller', function ($scope, appData) {
    appData.get().then(function (response) {
        let result = response.data[0];

        $scope.name = result.name;
        $scope.designation = result.designation;
        $scope.currentDesignation = result.currentDesignation;
        $scope.bio = result.bio;
        $scope.resumeUrl = result.resumeUrl;
    });
})

myapp.directive('mySocialLinksDirective', function () {
    return {
        templateUrl: '/views/social.html',
        scope: {},
        controller: function ($scope, appData) {
            appData.get().then(function (response) {
                let result = response.data[0];
                $scope.myFacebook = {
                    Url: result.facebook,
                    Name: "Connect with me on Facebook",
                };

                $scope.myTwitter = {
                    Url: result.twitter,
                    Name: "Connect with me on Twitter",
                };

                $scope.myLinkedIn = {
                    Url: result.linkedIn,
                    Name: "Connect with me on LinkedIn",
                };

                $scope.myGitHub = {
                    Url: result.gitHub,
                    Name: "Connect with me on GitHub",
                };

                $scope.mySC = {
                    Url: result.soundCloud,
                    Name: "Connect with me on SoundCloud",
                };

                $scope.myMail = {
                    Url: result.mail,
                    Name: "Email me at this address.",
                };

            });
        }
    };
});