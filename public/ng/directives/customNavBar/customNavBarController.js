module.exports = [ "$scope",
                   "$state",
                   "$http",
                    function($scope, $state, $http) {
  var debug = false;

  $scope.ctrl = this;
  this.scope = $scope;

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
           this.scope.user = res.user;
           $state.go("navbar.buy");
         }.bind(this))
         .error(function(err) {
           if (debug)
             console.log("SignOut Failed!");
         });
  };
}];
