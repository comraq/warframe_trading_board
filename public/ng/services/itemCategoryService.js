module.exports = [ "$http", "$q", function($http, $q) {
  this.getCategoryHierarchy = function getCategoryHierarchy() {
    var session = $q.defer();
    $http.get("/api/item/category")
       .then(function successCallback(res) {
         // API returns ItemCategory Object
         session.resolve(res.data);

       }, function errorCallback(err) {
         // Still resolve promise, with user as null
         session.resolve(null);
       });

    return session.promise;
  }
}];
