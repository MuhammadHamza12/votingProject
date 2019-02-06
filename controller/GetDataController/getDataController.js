const VoterProfileDetails = require('../../dataModels/VoterProfileDetailsModal');
const AdminDetailModal = require('../../dataModels/AdminDataModal');

function getUserDetails(req, res) {
  console.log(req.body);

  const {
    bodyData
  } = req.body;
  const SearchOBJ = {
    email: bodyData,
  };
  VoterProfileDetails.findOne(SearchOBJ)
    .then((success) => {
      if (success !== null) {
        console.log('userDetails', success);
        res.send({
          status: true,
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log('error', err);
      res.send({
        status: false,
        error: err
      });
    });
}

function updateUserProfile(req, res) {
  console.log('file ka path', req.file.path);
  const filePath = (req.file.path).toString();
  const newPath = filePath.replace(/\\/g, '/');
  console.log('new updated path', newPath);
  console.log('updated', filePath);
  console.log(req.body);
  const {
    email
  } = req.body;
  const SearchOBJ = {
    email: email,
  };

  VoterProfileDetails.findOneAndUpdate(SearchOBJ, {
    $set: {
      profileImg: newPath,
    },
  }, {
    new: true
  }).then((success) => {
    if (success !== null) {
      console.log('success object', success);
      res.json({
        data: success.profileImg
      });
    }
  }).catch((err) => {
    console.log('error', err);
    res.json({
      error: err
    });
  });
}

function SetVotingTime(req, res) {
  console.log(req.body);
  const {
    time,
    time2,
    date
  } = req.body;
  console.log('required data', time, time2, date);

  const Adminmail = 'muhammadhamzahaneef@gmail.com';
  const SearchOBJ = {
    email: Adminmail,
  };
  AdminDetailModal.updateOne(SearchOBJ, {
    $set: {
      votingStartTime: time,
      votingEndTime: time2,
      votingStartDate: date,
      isVotingTimeStart: true,
    }
  }).then((result) => {
    console.log('result', result);
    // setTime in all voters documents
    VoterProfileDetails.updateMany({}, {
      $set: {
        votingStartTime: time,
        votingEndTime: time2,
        votingStartDate: date,
        isVotingTimeStart: true,
      }
    }).then((result) => {
      console.log('all updated with voting time', result);
    }).catch((error) => {
      console.log('error aya : ', error);
    });
    res.json({
      status: 200,
      timeSet: true,
    });
  }).catch((error) => {
    console.log(error);
    res.json({
      value: 'no boss'
    });
  });
}

function setEndVotingFlag(req, res) {
  console.log(req.body);
  const Adminmail = 'muhammadhamzahaneef@gmail.com';
  const SearchOBJ = {
    email: Adminmail,
  };
  AdminDetailModal.updateOne(SearchOBJ, {
    $set: {
      isVotingTimeStart: false,
    }
  }).then((result) => {
    console.log('result', result);
    res.json({
      status: 200,
      timeSet: true,
    });
  }).catch((error) => {
    console.log(error);
    res.json({
      value: 'no boss'
    });
  });
}
module.exports = {
  getUserDetails,
  updateUserProfile,
  SetVotingTime,
  setEndVotingFlag
};