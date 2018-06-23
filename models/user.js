const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fname:String,
  lname:String,
  username:String,
  email:String,
  gender:String,
  mobile:String,
  password:String,
  dob:Date,
  creation:Date,
})

const User = mongoose.model('users',UserSchema)

module.exports = User;
