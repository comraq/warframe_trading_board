module.exports = function($scope, userService) {
  // TODO: Controller Stub
  this.scope = $scope;

  this.scope.user = userService;

  console.log($scope);
  console.log(userService);
};
