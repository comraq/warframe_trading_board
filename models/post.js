var CategoryModel = require('./category'),
    mongoose = require('mongoose');

var postObject = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: CategoryModel.schema,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }]
};

var schema = new mongoose.Schema(postObject);
module.exports = mongoose.model("Post", schema, "posts");
