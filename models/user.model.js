const mongoose = require("mongoose");
//model for user authorisation we set isAdmin to faulse for normal users
//then in the database I have manually change one of the normal users to Admin by creating it to true.

let UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
