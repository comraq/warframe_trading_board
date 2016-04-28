module.exports = [ "$http", "$q", function($http, $q) {
  return {
    getUserSession: function getUserSession() {
      return $http.get("/api/me")
        .then(function success(res) {
          // API returns valid user data!
          return res.data.user;

        }, function error(err) {
           // Still resolve promise, with user as null
          return null;
        });
    }
  };
}];
