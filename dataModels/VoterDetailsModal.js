const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const voterdetailsSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required:true,
    unique:true,
  },
  username:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
  voterDataId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  voteCasted: {
    type: Boolean,
    default: false,
  },
  votingTime:{
    type:Date,
    default:null,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  voterProfession:{
    type:String,
    default:'not set',
  },
  emailVerified:{
    type:Boolean,
    default:false,
  },
  updatedAt:{
    type:Date,
  },
  profileflag:{
    type:Boolean,
    default:false,
  },
});
voterdetailsSchema.plugin(uniqueValidator);
module.exports = mongoose.model('voterDetails', voterdetailsSchema);
