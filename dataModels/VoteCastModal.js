const mongoose = require('mongoose');

const VotingDataSchema = new mongoose.Schema({
  voterEmail:{
    type:String,
    required:true,
  },
  candidateEmail: {
    type: String,
    required:true,
  },
  updatedAt:{
    type:Date,
  },
});
module.exports = mongoose.model('VotingDataSchema', VotingDataSchema);
