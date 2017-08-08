var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true},
  location:{type:String, lowercase:true, required:true}
});

module.exports = mongoose.model('User', UserSchema);
