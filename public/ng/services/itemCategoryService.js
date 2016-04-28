module.exports = [ "$http", "$q", function($http, $q) {
  var cache = {};

  return {
    getCategory: function getCategory(path) {
      if (cache[path] && cache[path].category !== undefined)
        return cache[path].category;

      return $http.get("/api/category" + path)
        .then(function success(res) {
          // API returns ItemCategory Object
          if (!cache[path])
            cache[path] = {};

          cache[path].category = res.data.category;
          return res.data.category;
  
        }, function error(err) {
          // Promise rejected, return null
          return null;
        });
    },

    getChildren: function getChildren(path) {
      if (cache[path] && cache[path].children !== undefined)
        return cache[path].children;

      return $http.get("/api/category/children" + path)
        .then(function success(res) {
          if (!cache[path])
            cache[path] = {};

          if (!res.data.children || res.data.children.length == 0) {
            cache[path].children = null;
            return null;
          }
  
          // API returns array of children category names
          cache[path].children = res.data.children.map(function(e) {
            return e.name;
          });
          return cache[path].children;
  
        }, function error(err) {
          // Promise rejected, return null
          return null;
        });
    }
  };

}];
