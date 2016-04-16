var httpStatus = require("http-status");

module.exports = [ "$http", "$q", function($http, $q) {
  this.getUserSession = function getUserSession() {
    var session = $q.defer();
    $http.get("/api/me")
       .then(function successCallback(res) {
         // API returns valid user data!
         session.resolve(res.data.user);

       }, function errorCallback(err) {
         // Still resolve promise, with user as null
         session.resolve(null);
       });

    return session.promise;
  }
}];
