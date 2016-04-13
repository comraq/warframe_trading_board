module.exports = function($scope, userService) {
  this.scope = $scope;

  this.scope.user = userService;
};
