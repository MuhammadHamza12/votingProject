const VoterProfileDetails = require('../../dataModels/VoterProfileDetailsModal');
const VoterDetailsCollections = require('../../dataModels/VoterDetailsModal');
const jwt = require('jsonwebtoken');
const PendingCandidateSchema = require('../../dataModels/PendingCandidateModal');
const config = require('../../config');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const passwordGenerator = require('password-generator');

function getProfileData(req, res) {
  console.log('file ka path', req.file.path);
  console.log(req.body);
  const Details = {
    name: req.body.name,
    gender: req.body.gender,
    voterProfession: req.body.profession,
    profileImg: req.file.path,
    voterProfileDataId: req.body.voterProfileDataId,
  };
  const VoterProfileData = new VoterProfileDetails(Details);
  VoterProfileData
    .save()
    .then((success) => {
      if (success !== null) {
        console.log('success', success);
        const token = jwt.sign({
          id: success._id,
          name: success.name,
          profession: success.voterProfession,
          gender: success.gender,
          profileImg: success.profileImg,
          voterProfileDataId: success.voterProfileDataId,
        }, config.jwtSecret, {
          expiresIn: '1d',
        });
        res.json({
          token,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: 'uploading Failed'
      });
    });
}

function AddVoter(req, res) {
  console.log(req.body);
  const {
    email
  } = req.body;
  console.log('cehck shai ha', email);
  const generateId = shortid.generate();
  const generatePassword = passwordGenerator(15, false);
  console.log('generate ID and Password : ', generateId, generatePassword);

  const decryptedPass = bcrypt.hashSync(generatePassword, 10);
  const SaveOBJ = {
    email: email,
    voterId: generateId,
    password: decryptedPass,
    username: generatePassword,
  };

  const VoterDetails = new VoterDetailsCollections(SaveOBJ);
  VoterDetails
    .save()
    .then((success) => {
      console.log(success);
      res.json({
        status: true,
        message: 'voter has been successfully added',
      });
    }).catch((error) => {
      console.log(error);
      res.json({
        error: error,
      });
    });
}

function CandidateRequest(req, res) {
  console.log(req.body);
  const {
    email,
    gender,
    profession,
    DataeOfBirth,
    nationality,
    lastname,
    name
  } = req.body;
  console.log('ok hai', email);
  const SaveOBJ = {
    email: email,
    gender: gender,
    voterProfession: profession,
    ApplyAsCandidate: true,
    DateOfBirth: DataeOfBirth,
    nationality: nationality,
    lastname: lastname,
    firstname: name,
  };
  const pendingCandidateRequest = new PendingCandidateSchema(SaveOBJ);
  pendingCandidateRequest
    .save()
    .then((success) => {
      console.log(success);
      res.json({
        status: true,
        message: 'Request approved by the admin',
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: false,
        error: error,
      });
    });
}

function getApprovedCandidate(req, res) {
  VoterProfileDetails.find({
    ApplyAsCandidate: true
  })
    .then((success) => {
      res.json({
        status: true,
        data: success
      });
    }).catch((error) => {
      res.json({
        status: false,
        error: error
      });
    });
}

function getCandidateRequestData(req, res) {

  PendingCandidateSchema.find().then((success) => {
    if (success !== null) {
      console.log('all missing reports are: ', success);
      res.send({
        status: true,
        data: success,
      });
    } else {
      console.log('ran in than, but with null success', success);
    }
  }).catch((err) => {
    console.log('error occur in sending data toward client!', err);
    res.send({
      status: false,
      data: err,
    });
  });

}


module.exports = {
  getProfileData,
  AddVoter,
  CandidateRequest,
  getCandidateRequestData,
  getApprovedCandidate,
  

};