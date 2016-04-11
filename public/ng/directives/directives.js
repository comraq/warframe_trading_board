exports.buyList = function() {
  return {
    controller: "buyListController",
    templateUrl: "/ng/directives/buyList/buyListView.html",
  };
};

exports.sellList = function() {
  return {
    controller: "sellListController",
    templateUrl: "/ng/directives/sellList/sellListView.html",
  };
};
