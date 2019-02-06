const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PendingCandidateSchema = new mongoose.Schema({
  gender:{
    type:String,
    required:true,
  },
  firstname: {
    type: String,
    required:true,
  },
  lastname:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required:true,
    unique:true,
  },
  voterDataId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  nationality: {
    type: String,
    required:true,
  },
  DateOfBirth:{
    type:String,
    required:true,
  },
  voterProfession:{
    type:String,
    default:'not set',
  },
  ApplyAsCandidate:{
    type:Boolean,
    default:true,
  },
  updatedAt:{
    type:Date,
  },
});
PendingCandidateSchema.plugin(uniqueValidator);
module.exports = mongoose.model('PendingCandidateModal', PendingCandidateSchema);
