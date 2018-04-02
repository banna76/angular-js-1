var myNinjaApp = angular.module('myNinjaApp',['ngRoute','ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){

$locationProvider.html5Mode(true);

  $routeProvider
  .when('/home', {
    templateUrl:'views/home.html',
    controller:'myNinjaController'
  })
  .when('/contact', {
    templateUrl:'views/contact.html',
    controller:'myContactController'
  })
  .when('/contact-success', {
    templateUrl:'views/contact-success.html',
    controller:'myContactController'
  })
  .when('/directory', {
    templateUrl:'views/directory.html',
    controller:'myNinjaController'
  })
  .otherwise({
    redirectTo:'/home'
  });

}]);

myNinjaApp.directive('randomNinja', [function(){

 return{
   restrict: 'E',
   scope:{
     ninjas: '=',
     title: '='
   },
   templateUrl: 'views/random.html',
   transclude: true,
   replace:true,
   controller: function($scope){
     $scope.random = Math.floor(Math.random() * 4)
   }
 };

}]);

myNinjaApp.controller('myNinjaController', ['$scope','$http', function($scope,$http){

$scope.message = 'Simple Message!';

$scope.removeNinja = function(ninja){
  var removedNinja = $scope.ninjas.indexOf(ninja);
  $scope.ninjas.splice(removedNinja, 1);
};

$scope.addNinja = function(){
  $scope.ninjas.push({
    name:$scope.newninja.name,
    belt:$scope.newninja.belt,
    rate: parseInt($scope.newninja.rate),
    thumb:"content/img/no_avatar.jpg",
    available:true
  });
  $scope.newninja.name ="";
  $scope.newninja.belt ="";
  $scope.newninja.rate ="";
};

$scope.removeAll = function(){
  $scope.ninjas = [];
};

$http({
    method: "GET",
    url: "./data/ninjas.json"
}).then(function successCallback(response) {
      /* this callback will be called asynchronously when the response is available */
        $scope.ninjas = response.data;
      }, function errorCallback(response) {
        /* called asynchronously if an error occurs or server returns response with an error status. */
        console.log("Error " + response.status + ": " + response.data)
});

//console.log(angular.toJson($scope.ninjas));
}]);

myNinjaApp.controller('myContactController', ['$scope','$location', function($scope,$location){

$scope.sendMessage = function(){
  $location.path('/contact-success');
}
}]);
