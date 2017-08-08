angular.module("appRoutes", ['ngRoute'])
.config(function($routeProvider,  $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl:'app/views/pages/subscribe.html',
    controller:"regCtrl",
    controllerAs: "register"
  })
   .when('/success', {
    templateUrl:'app/views/pages/success.html',
    controller: "emailCtrl",
    controllerAs: "email"
  });

   //gets rid of the '#' fromt he URL
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false });
}); 
