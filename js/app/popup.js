

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
    $scope.selectedObj = {};

    $scope.getClientData = function(formData) {
        $scope.client_analytics_code = formData.client_analytics_code;
        // get creds of client's pinterest users
        $http.get('http://localhost:5000/getcreds/'+$scope.client_analytics_code)
             .then(function (response) {
                console.log(response.data);
                if (response.data){
                    $scope.users = response.data;
                    logIn();
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
                    logIn();
                } 
            }, function errorCallback(response) {
            console.log(`error when fetching existing campaigns: ${response}`)
        }); 

        let logIn = function(){
           $state.go('home.run-campaign');
        }
        

    };

    $scope.startScraping = function(user, campaign){
        console.log('here is the search_term:', campaign.search_term);
        console.log('here is the campaign_id:', campaign.campaign_id);
        console.log('ran startScraping function with this user', user);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
             chrome.tabs.sendMessage(tabs[0].id, {type:"userCreds", creds: user, campaign: {campaign_id: campaign.campaign_id, search: campaign.search_term}}, function(response){
                // console.log('this is the response from content page',response)        
            });
        });    
    }

    // handling the images and descriptions sent back from content.js
    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
                case "imageData":
                    console.log('got image Data from content.js: ', message)
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        }
    );

  }
]);


