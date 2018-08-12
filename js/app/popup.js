

var myApp = angular.module("my-app", ['ui.router']);

// configuring our routes 
// =============================================================================
myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html'
        })
        
        .state('home.insert-code', {
            url: '/insert-code',
            templateUrl: '../views/insert-code.html'
        })

        .state('home.run-campaign', {
            url: '/run-campaign',
            templateUrl: '../views/run-campaign.html'
        });
       
    $urlRouterProvider.otherwise('/home/insert-code');
})



myApp.controller("PopupCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Controller Initialized");

    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.client_analytics_code = '';

    $scope.getClientData = function(formData) {
        $scope.client_analytics_code = formData.client_analytics_code;
        // get creds of client's pinterest users
        $http.get('http://localhost:5000/getcreds/'+$scope.client_analytics_code)
             .then(function (response) {
                console.log(response.data);
                if (response.data){
                    $scope.users = response.data;
                }                 
             }, function errorCallback(response) {
            console.log(`error when logging in: ${response}`)
        }); 
    
        // get client's existing campaign search_terms
        $http.get('http://localhost:5000/getcampaigns/'+$scope.client_analytics_code)
             .then(function (response) {
                console.log(response.data);
                if (response.data){
                    $scope.campaigns = response.data;
                } 
            }, function errorCallback(response) {
            console.log(`error when fetching existing campaigns: ${response}`)
        }); 

        if($scope.campaigns || $scope.users){
           $state.go('home.run-campaign');
        } 

    };

    $scope.startScraping = function(user, search_term){
        console.log('ran startScraping function with this user', user);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
             chrome.tabs.sendMessage(tabs[0].id, {type:"userCreds", creds: user, campaign: search_term}, function(response){
                // console.log('this is the response from content page',response)        
            });
        });    
    }

  }
]);
