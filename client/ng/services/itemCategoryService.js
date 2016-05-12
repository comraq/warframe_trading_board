const itemCategoryService = [ "$http", "$q", ($http, $q) => {
  const cache = {};

  return {
    getCategory: path => {
      if (cache[path] && cache[path].category !== undefined)
        return cache[path].category;

      return $http.get("/api/category" + path)
        .then(res => {
          // API returns ItemCategory Object
          if (!cache[path])
            cache[path] = {};

          cache[path].category = res.data.category;
          return res.data.category;
  
        }, err => null);// Promise rejected, return null
    },

    getChildren: path => {
      if (cache[path] && cache[path].children !== undefined)
        return cache[path].children;

      return $http.get("/api/category/children" + path)
        .then(res => {
          if (!cache[path])
            cache[path] = {};

          if (!res.data.children || res.data.children.length == 0) {
            cache[path].children = null;
            return null;
          }
  
          // API returns array of children category names
          cache[path].children = res.data.children.map(e => e.name);
          return cache[path].children;
  
        }, err => null); // Promise rejected, return null
    }
  };
}];

export default itemCategoryService;
