/*
 * Note:
 * $scope.newItem = {
 *   user: logged in user id
 * }
 * 
 * $scope.cancel = function passed in from outer scope to cancel/return
 */

module.exports = [ "$scope",
                   "$http",
                    function($scope, $http) {
  var debug = false;

  $scope.ctrl = this;
  this.scope = $scope;

  this.scope.transactions = [
    "Deal",
    "Auction"
  ];

  this.scope.categories = [
    "Mods",
    "Sortie Weapons",
    "Void Parts",
    "Keys",
    "Arcanes"
  ];

  this.scope.datePicker = {
    format: "yyyy-MM-dd",
    options: {
      minDate: new Date(),
      startingDay: 1
    }
  };

  this.submitPost = function submitPost() {
    var category = this.scope.newItem.category["_id"];
    this.scope.newItem.category.parent = null;
    this.scope.newItem.category.ancestors = null;

    if (debug)
      console.log(this.scope);

    $http.post("/api/item/new", this.scope.newItem, {
                 headers: {
                   "Content-Type": "application/json"
                 }
               })
         .then(function successCallback(res) {
           if (debug) {
             console.log("newPostController, submitPost success!");
             console.log(res);
           }
           this.cancelPost();

         }.bind(this), function errorCallback(err) {
           if (debug) {
             console.log("newPostController, submitPost error!");
             console.log(err);
           }
         });
  };

  this.cancelPost = function cancelPost() {
    this.scope.cancel();
  };

  if (!this.scope.newItem.expiry)
    this.scope.newItem.expiry = (new Date())
                                  .setDate((new Date()).getDate() + 3);

  if (!this.scope.newItem.transaction)
    this.scope.newItem.transaction = this.scope.transactions[0];

  if (!this.scope.newItem.category) {
    this.scope.newItem.category = {
      _id: this.scope.categories[0]
    };
  }
}];
