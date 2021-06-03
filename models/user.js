const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  registrated_at: {
    type: Date,
    required: true,
  },
  profile_image: Object,
  provider: String,
});

module.exports = mongoose.model("user", userSchema);
