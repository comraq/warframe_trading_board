exports.buyList = function() {
  return {
    restrict: "AE",
    controller: "buyListController",
    templateUrl: "/ng/directives/buyList/buyListView.html",
  };
};

exports.sellList = function() {
  return {
    restrict: "AE",
    controller: "sellListController",
    templateUrl: "/ng/directives/sellList/sellListView.html",
  };
};

exports.customNavBar = function() {
  return {
    restrict: "AE",
    controller: "customNavBarController",
    templateUrl: "/ng/directives/customNavBar/customNavBarView.html",
  };
};
