

var myApp = angular.module("my-app", ['ui.router']);

// configuring our routes 
// =============================================================================
myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: '../views/form.html',
            controller: 'PopupCtrl'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: '../views/form-profile.html'
        })
        
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: '../views/form-interests.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: '../views/form-payment.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/profile');
})



myApp.controller("PopupCtrl", ['$scope', '$http', function($scope, $http){
   console.log("Controller Initialized");

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.getCreds = function(formData) {
        $http.get('http://localhost:5000/getcreds/'+formData.client_analytics_code)
             .then(function (response) {
                   console.log(response.data);
                   $scope.users = response.data; 
             }, function errorCallback(response) {
            console.log(`error when logging in: ${response}`)
       }); 
    };

    $scope.startScraping = function(user){
        console.log('ran startScraping function with this user', user);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
             chrome.tabs.sendMessage(tabs[0].id, {type:"userCreds", creds: user}, function(response){
                console.log('this is the response from content page',response)        
            });
        });    
    }

    

  }
]);
