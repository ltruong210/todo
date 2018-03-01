var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model("Todo", todoSchema);
