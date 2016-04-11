var Category = require('./category'),
    mongoose = require('mongoose');

module.exports = function(db) {
  var itemSchema = {
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
    category: Category.categorySchema
  };

  var schema = new mongoose.Schema(itemSchema);
  schema.pre("save", function(next) {
    if (this.category["_id"] == "AuctionItem" && !this.bidPrice)
      return next(new Error("Bid Price Not Set for Auction Item!"));
 
    next();
  });

  return db.model('Item', schema, 'items');
};
