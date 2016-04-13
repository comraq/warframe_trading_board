module.exports = function($scope, $state, $http, userSessionService) {
  var debug = false;

  $scope.ctrl = this;
  this.scope = $scope;
  this.scope.user = userSessionService;

  if (debug) {
    console.log("scope:")
    console.log(this.scope);
  }

  this.signOut = function signOut() {
    if (!this.scope.user)
      return;

    $http.get("/api/signOut")
         .success(function(res) {
           if (debug)
             console.log("SignOut Successful!");

           // Session Cleared but not redirected due to 
           this.scope.user.user = res.user;
           $state.go("buy");
         }.bind(this))
         .error(function(err) {
           if (debug)
             console.log("SignOut Failed!");
         });
  };
};
