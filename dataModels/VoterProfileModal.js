const mongoose = require('mongoose');
const voterProfileDetails = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  gender: {
    type: String,
    required:true,
  },
  profileImg: {
    type:String,
    default:null,
  },
  voterProfileDataId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  voterProfession:{
    type:String,
    default:'not set',
  },
  updatedAt:{
    type:Date,
  },
});
module.exports = mongoose.model('voterProfileDetails', voterProfileDetails);
