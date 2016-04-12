var CategoryModel = require('./category'),
    mongoose = require('mongoose');

var postObject = {
  user: { type: String, required: true },
  category: CategoryModel.schema,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }]
};

var schema = new mongoose.Schema(postObject);
module.exports = mongoose.model("Post", schema, "posts");
