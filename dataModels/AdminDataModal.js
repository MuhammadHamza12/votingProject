const mongoose = require('mongoose');
const AdminDetailsSchema = new mongoose.Schema({
  password: {
    type: String,
    required:true,
  },
  voterDataId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isVotingStart:{
    type:Boolean,
  },
  email:{
    type:String,
    required:true,
  },
  isAdmin:{
    type:String,
    default:true,
  },
  isVotingTimeStart:{
    type:Boolean,
    default:false,
  },
  votingStartTime:{
    type:String,
  },
  votingEndTime:{
    type:String,
  },
  votingStartDate:{
    type:String,
  },
  updatedAt:{
    type:Date,
  },
});
module.exports = mongoose.model('AdminDetails', AdminDetailsSchema);
