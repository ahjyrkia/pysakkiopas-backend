// const connection = require("./db_connection");
// const mongoose = require('mongoose');
const mongoose = require("./db_connection");

const Schema = mongoose.Schema;

const StopSchema = new Schema({
  created: { type: Date, default: Date.now },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dist: { type: Number, required: true},
  codeShort: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = {
  Stop: mongoose.model("Stop", StopSchema),
};
