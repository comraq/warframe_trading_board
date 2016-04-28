module.exports = [ "$http", "$q", function($http, $q) {
  this.getCategory = function getCategory(path) {
    return $http.get("/api/category" + path)
      .then(function success(res) {
        // API returns ItemCategory Object
        return res.data.category;

      }, function error(err) {
        // Promise rejected, return null
        return null;
      });
  };

  this.getChildren = function getChildren(path) {
    return $http.get("/api/category/children" + path)
      .then(function success(res) {
        if (!res.data.children || res.data.children.length == 0)
          return null;

        // API returns array of children category names
        return res.data.children.map(function(e, i, arr) {
          return e.name;
        });

      }, function error(err) {
        // Promise rejected, return null
        return null;
      });
  };
}];
