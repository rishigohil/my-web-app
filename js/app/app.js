/**
 * Created by rgohil2016 on 5/9/2017.
 */
var myapp = angular.module('my-web-app', ['ngRoute', 'ngAnimate']);

myapp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'my-controller'
        })
});

// create the controller and inject Angular's $scope
myapp.controller('my-controller', function($scope) {
    // create a message to display in our view
    $scope.message = 'Coming Soon';
    $scope.myFacebook = {
        Url: 'https://www.facebook.com/rishig10',
        Name: "Connect with me on Facebook",
    };

    $scope.myTwitter = {
        Url: 'https://twitter.com/rishi_gohil10',
        Name: "Connect with me on Twitter",
    };

    $scope.myLinkedIn = {
        Url: 'https://www.linkedin.com/in/rishigohil',
        Name: "Connect with me on LinkedIn",
    };

    $scope.myGitHub = {
        Url: 'https://github.com/rishigohil',
        Name: "Connect with me on GitHub",
    };

    $scope.mySC = {
        Url: 'https://soundcloud.com/rishi_gohil',
        Name: "Connect with me on SoundCloud",
    };
}).directive('mySocialLinksDirective', function() {
    return {
        templateUrl: 'views/social.html'
    };
});
