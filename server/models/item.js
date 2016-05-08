import mongoose from "mongoose";

import ItemCategoryModel from "./itemCategory";

const itemObject = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  details: {
    type: String
    // TODO: Expand here?
  },
  price: { type: Number, required: true },
  transaction: {
    type: String,
    enum: transactionEnum,
    required: true
  },
  bidPrice: {
    start: { type: Number },
    current: { type: Number }
  },
  category: ItemCategoryModel.schema,
  expiry: { type: Date, required: true }
};

const transactionEnum = {
  values: [
    "Deal",
    "Auction"
  ],
  message: "`transaction` Attribute Must Be Either 'Deal' or 'Auction'"
};

const options = {
  timestamps: true
};

const schema = new mongoose.Schema(itemObject, options);
schema.pre("save", function(next) {
  if (this.transaction == "Auction") {
    if (!this.bidPrice || !this.bidPrice.start)
      return next(new Error("Bid Price Not Set for Auction Item!"));
    else
      this.bidPrice.current = this.bidPrice.start;
  }

  next();
});

export default mongoose.model("Item", schema, "items");
