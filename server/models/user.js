import mongoose from "mongoose";

const userObject = {
  profile: {
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true,
      match: /^https?:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true }
  }
};

const schema = new mongoose.Schema(userObject);
export default mongoose.model("User", schema, "users");
