angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth, $localStorage, $state)
{
  $scope.$on('$ionicView.enter', function(e) 
  {
   if(!$localStorage.resultToken === false) {
     $state.go('app.userprofile');
   }
    //cancel hamburger menu
     $scope.toggleMenu = true;
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() 
  {
    console.log("im here");
   $cordovaOauth.facebook("552207594985486", ["email"]).then(function(result) 
   {
    console.log("Response Object -> " + JSON.stringify(result));
    $localStorage.resultToken = result.access_token;
    if(result!=null){
      console.log('Let me navigate');
    $state.go("app.userprofile");
    }
   }, function(error) {
    console.log("Error -> " + error);
   });
   if($localStorage.resultToken!=null){
     $state.go("app.userprofile");
   }
  };
})

.controller('ProfileCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth, $localStorage, $location, $http, $state)
{
  $scope.toggleMenu = false;
  console.log('m in profile');
$scope.init = function (){
  console.log('init called');
  $http.get("https://graph.facebook.com/v2.8/me?access_token=" + $localStorage.resultToken).then(function(results){
    $scope.profileData = results.data;
    // $localStorage.resultToken;
  },
  function (error){
    alert("Error user profile");
  });
};
$scope.init();
  $scope.startLogout = function(){
    delete $localStorage.resultToken;
    $state.go("app.login");
  }
});


