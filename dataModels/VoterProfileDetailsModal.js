const mongoose = require('mongoose');
const voterProfileDetails = new mongoose.Schema({
  lastname: {
    type: String,
  },
  nationality: {
    type: String,
  },
  DateOfBirth: {
    type: String,
  },
  ApplyAsCandidate: {
    type: Boolean,
  },
  name: {
    type: String,
    required: true,
  },
  isVoteCasted: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: null,
  },
  voterProfileDataId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  voterProfession: {
    type: String,
    default: 'not set',
  },
  isVotingTimeStart: {
    type: Boolean,
    default: false,
  },
  votingStartTime: {
    type: String,
  },
  votingEndTime: {
    type: String,
  },
  votingStartDate: {
    type: String,
  },
  updatedAt: {
    type: Date,
  },
});
module.exports = mongoose.model('voterProfileDetails', voterProfileDetails);