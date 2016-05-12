const customNavBarController = [ "$scope",
                                 "$http",
                                 "$uibModal",
                                  function($scope, $http, $uibModal) {
  let debug = false;

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
  let item = {};

  this.newPost = () => {
    item.user = this.scope.user["_id"];

    let modalInstance = $uibModal.open({
      template: "<new-post" + " item='item'"
                            + " cancel='cancel'"
                            + "></new-post>",
      controller: [ "$scope", $scope => {
        $scope.item = item;
        $scope.cancel = modalInstance.dismiss;
      }],
      // So user cannot accidentally close modal by clicking outside
      backdrop: "static"
    });
  };

  this.logIn = () => {
    let modalInstance = $uibModal.open({
      template: "<log-in></log-in>"
    });
  };

  this.logOut = () => {
    if (!this.scope.user)
      return;

    $http.get("/api/logOut")
         .success(res => {
           if (debug)
             console.log("LogOut Successful!");

           this.scope.user = res.user;
         })
         .error(err => {
           if (debug)
             console.log("LogOut Failed!");
         });
  };
}];

export default customNavBarController;
