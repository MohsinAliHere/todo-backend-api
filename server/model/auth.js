const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthSchema = Schema({
  username: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 30,
    lowercase: true,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    minlength: 8, 
  },
});

module.exports = mongoose.model("Auth", AuthSchema);
