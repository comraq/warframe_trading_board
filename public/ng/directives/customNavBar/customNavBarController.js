module.exports = [ "$scope",
                   "$state",
                   "$http",
                   "$uibModal",
                    function($scope, $state, $http, $uibModal) {
  var debug = true;

  $scope.ctrl = this;
  this.scope = $scope;

  if (debug) {
    console.log("scope:")
    console.log(this.scope);
  }

  /*
   * Item within controller scope, so new post modal
   * retains previous fields upon re-open
   */
  var item = {};

  this.newPost = function newPost() {
    item.user = this.scope.user["_id"];

    var modalInstance = $uibModal.open({
      template: "<new-post item='item' modal='modalInstance'></new-post>",
      controller: [ "$scope", function($scope) {
        $scope.item = item;
        $scope.modalInstance = modalInstance;
      }],
      // So user cannot accidentally close modal by clicking outside
      backdrop: "static"
    });
  };

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
