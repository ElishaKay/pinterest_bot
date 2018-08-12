

var myApp = angular.module("my-app", []);

myApp.controller("PopupCtrl", ['$scope', '$http', function($scope, $http){
   console.log("Controller Initialized");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"userCreds", creds:{name: "Elisha", password: "gym"}}, function(response){
            alert('this is the response',response)
            
        });
    });

   // Get Background Page to get selectedText from it's scope
   let bgPage = chrome.extension.getBackgroundPage();
   let selectedText = bgPage.selectedText;
   
   
  }
]);
