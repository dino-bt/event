const mongoose = require("mongoose");
//This is our schema model before it goes into the database.

let EventDisplaySchema = mongoose.Schema({
  headerText: {
    type: String,
    required: true,
  },
  bodyText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("EventDisplay", EventDisplaySchema);
