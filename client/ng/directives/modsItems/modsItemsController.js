const modsItemsController = [
                              "$scope",
                              "$stateParams",
                              function($scope,
                                       $stateParams) {
  $scope.ctrl = this;
  this.scope = $scope;

  let debug = false;

  this.scope.tempListItems = [];
  for (let i = 0; i < 5; ++i)
    this.scope.tempListItems.push("tempListItem" + (i + 1));
}];

export default modsItemsController;
