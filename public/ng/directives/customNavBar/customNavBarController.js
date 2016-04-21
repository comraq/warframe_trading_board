module.exports = [ "$scope",
                   "$http",
                   "$uibModal",
                    function($scope, $http, $uibModal) {
  var debug = false;

  $scope.ctrl = this;
  this.scope = $scope;

  if (debug) {
    console.log("scope:")
    console.log(this.scope);
  }

  /*
   * Item within controller scope, so new post modal
   * retains previous fields upon re-open/close
   */
  var item = {};

  this.newPost = function newPost() {
    item.user = this.scope.user["_id"];

    var modalInstance = $uibModal.open({
      template: "<new-post" + " item='item'"
                            + " cancel='cancel'"
                            + " catmodel='catmodel'"
                            + "></new-post>",
      controller: [ "$scope", function($scope) {
        $scope.item = item;
        $scope.catmodel = this.scope.catModel;
        $scope.cancel = modalInstance.dismiss;
      }.bind(this)],
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
}];
