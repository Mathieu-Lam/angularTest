'use strict';

angular.module('myApp.viewTriggerContent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewTriggerContent/:selectedTrigger', {
    templateUrl: 'viewTriggerContent/viewTriggerContent.html',
    controller: 'ViewTriggerContentCtrl'
  });
}])

.controller('ViewTriggerContentCtrl', ['$scope', '$routeParams', 'triggerContentAPIService', function($scope, $routeParams, triggerContentAPIService) {
	$scope.selectedTrigger = $routeParams.selectedTrigger;
	$scope.triggerDetail = [];
	
	triggerContentAPIService.getTriggerDetail($scope.selectedTrigger).success(function (response) {
        //Dig into the response to get the relevant data
		$scope.triggerDetail = response;
    });
	
	triggerContentAPIService.getTriggerDetail($scope.selectedTrigger).error(function (response) {
		console.log(response)
    });
}])

.factory('triggerContentAPIService', function($http) {

    var triggerContentAPI = {};
    
    triggerContentAPI.getTriggerDetail = function(selectedTrigger) {
        return $http({
          method: 'GET', 
          url: 'http://seidenz.nerdzcore.com/rest/irc/chatbot/' + selectedTrigger
          
        });
      }

    return triggerContentAPI;
  });