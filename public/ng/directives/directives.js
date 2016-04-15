exports.home = function() {
  return {
    restrict: "AE",
    controller: "homeController",
    templateUrl: "/ng/directives/home/homeView.html",
    scope: {
      user: "=user"
    }
  };
};

exports.buyList = function() {
  return {
    restrict: "AE",
    controller: "buyListController",
    templateUrl: "/ng/directives/buyList/buyListView.html",
    scope: {
      user: "=user"
    }
  };
};

exports.sellList = function() {
  return {
    restrict: "AE",
    controller: "sellListController",
    templateUrl: "/ng/directives/sellList/sellListView.html",
    scope: {
      user: "=user"
    }
  };
};

exports.customNavBar = function() {
  return {
    restrict: "AE",
    controller: "customNavBarController",
    templateUrl: "/ng/directives/customNavBar/customNavBarView.html",
    scope: {
      user: "=user"
    }
  };
};
