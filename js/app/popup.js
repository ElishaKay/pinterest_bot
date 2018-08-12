

var myApp = angular.module("my-app", ['ui.router']);

// configuring our routes 
// =============================================================================
myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html',
            controller: 'PopupCtrl'
        })
                
        .state('home.run-campaign', {
            url: '/run-campaign',
            templateUrl: '../views/run-campaign.html'
        });
       
    $urlRouterProvider.otherwise('/home/run-campaign');
})



myApp.controller("PopupCtrl", ['$scope', '$http', function($scope, $http){
   console.log("Controller Initialized");

    // we will store all of our form data in this object
    $scope.formData = {};

    $scope.getClientData = function(formData) {
        // get creds of client's pinterest users
        $http.get('http://localhost:5000/getcreds/'+formData.client_analytics_code)
             .then(function (response) {
                console.log(response.data);
                if (response.data){
                    $scope.users = response.data;
                }                 
             }, function errorCallback(response) {
            console.log(`error when logging in: ${response}`)
        }); 
    
        // get client's existing campaign search_terms
        $http.get('http://localhost:5000/getcampaigns/'+formData.client.client_analytics_code)
             .then(function (response) {
                console.log(response.data);
                if (response.data){
                    $scope.campaigns = response.data;
                } 
            }, function errorCallback(response) {
            console.log(`error when fetching existing campaigns: ${response}`)
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
