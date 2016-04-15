module.exports = [ "$scope",
                   "$state",
                   "$http",
                   "$uibModal",
                    function($scope, $state, $http, $uibModal) {
  var debug = false;

  $scope.ctrl = this;
  this.scope = $scope;

  if (debug) {
    console.log("scope:")
    console.log(this.scope);
  }

  this.logIn = function logIn() {
    var modalInstance = $uibModal.open({
      template: "<log-in></log-in>"
    });
  };

  this.logOut = function logOut() {
    if (!this.scope.user)
      return;

    $http.get("/api/logOut")
         .success(function(res) {
           if (debug)
             console.log("LogOut Successful!");

           this.scope.user = res.user;
         }.bind(this))
         .error(function(err) {
           if (debug)
             console.log("LogOut Failed!");
         });
  };

  this.notHomeState = function notHomeState() {
    return $state.$current.name != "root.home";
  }
}];
