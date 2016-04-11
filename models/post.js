var Category = require('./category'),
    mongoose = require('mongoose');

var postSchema = {
  user: { type: String, required: true },
  category: Category.categorySchema,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }]
};

module.exports = new mongoose.Schema(postSchema);
module.exports.postSchema = postSchema;
