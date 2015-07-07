'use strict';

angular.module('myApp.viewTriggerList', ['ngRoute'])

// Define routes
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewTriggerList', {
    templateUrl: 'viewTriggerList/viewTriggerList.html',
    controller: 'ViewTriggerListCtrl'
  });
}])

// Define controller
.controller('ViewTriggerListCtrl', ['$scope', 'triggerListAPIService', function($scope, triggerListAPIService) {
	$scope.triggersList = [];
	
	$scope.triggerNameFilter = function (trigger) {
	    var keyword = new RegExp($scope.triggerFilter, 'i');
	    return !$scope.triggerFilter || keyword.test(trigger.triggerName);
	};
	
	triggerListAPIService.getTriggers().success(function (response) {
        //Dig into the response to get the relevant data
		$scope.triggersList = response;
    });
	
	triggerListAPIService.getTriggers().error(function (response) {
		console.log(response);
    });
}])

// Define service
.factory('triggerListAPIService', function($http) {

    var triggerListAPI = {};

    triggerListAPI.getTriggers = function() {
      return $http({
        method: 'GET', 
        url: 'http://seidenz.nerdzcore.com/rest/irc/chatbot/ALL'
      });
    }

    return triggerListAPI;
  });