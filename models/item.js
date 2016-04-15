var ItemCategoryModel = require('./itemCategory'),
    mongoose = require('mongoose');

var itemObject = {
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  transaction: {
    type: String,
    enum: transactionEnum,
    required: true
  },
  bidPrice: {
    start: { type: Number, required: true },
    current: {
      type: Number,
      default: function() {
        return this.bidPrice.start;
      }
    }
  },
  category: ItemCategoryModel.schema
};

var transactionEnum = {
  values: [
    "Deal",
    "Auction"
  ],
  message: "`transaction` Attribute Must Be Either 'Deal' or 'Auction'"
};

var schema = new mongoose.Schema(itemObject);
schema.pre("save", function(next) {
  if (this.transaction == "Auction" && !this.bidPrice)
    return next(new Error("Bid Price Not Set for Auction Item!"));
 
  next();
});

module.exports = mongoose.model("Item", schema, "items");
