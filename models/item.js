var CategoryModel = require('./category'),
    mongoose = require('mongoose');

var itemObject = {
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  bidPrice: {
    start: { type: Number, required: true },
    current: {
      type: Number,
      default: function() {
        return this.bidPrice.start;
      }
    }
  },
  category: CategoryModel.schema
};

var schema = new mongoose.Schema(itemObject);
schema.pre("save", function(next) {
  if (this.category["_id"] == "AuctionItem" && !this.bidPrice)
    return next(new Error("Bid Price Not Set for Auction Item!"));
 
  next();
});

module.exports = mongoose.model("Item", schema, "items");
