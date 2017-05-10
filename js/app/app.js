/**
 * Created by Rishi Gohil on 5/9/2017.
 */
//Initializing the beast in the room.
var myapp = angular.module('my-web-app', ['ngRoute', 'ngAnimate']);

//Configuring the beast to do its job.
myapp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/views/home.html',
            controller  : 'my-controller'
        })

     $locationProvider.html5Mode(true).hashPrefix('!');
});

// Giving beast the weapon to perform some hot actions.
//Part 2 of the beast is coming soon. ;)
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
        templateUrl: '/views/social.html'
    };
});
