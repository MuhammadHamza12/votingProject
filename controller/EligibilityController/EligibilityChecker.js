const voterDetails = require('../../dataModels/VoterDetailsModal');
const VoterProfileDetails = require('../../dataModels/VoterProfileDetailsModal');
const PendingCandidateReq = require('../../dataModels/PendingCandidateModal');
const VoteCastModal = require('../../dataModels/VoteCastModal');
const nodemailer = require('nodemailer');
const config = require('../../config');
const jwt = require('jsonwebtoken');

function EmailFunctionality(accountID, accountpass, SenderName, Email, VoterId, Password) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: accountID, // generated ethereal user
      pass: accountpass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },

  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: `${SenderName} <test@voting.com>`, // sender address
    to: Email, // list of receivers
    subject: 'Credentials For Voting', // Subject line
    text: 'SMART VOTING SYSTEM', // plain text body
    html: `<b>Credentails For Voting: </b> <br/> VOTER_ID: ${VoterId} <br/> VOTER_PASSWORD: ${Password} `, // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

function EmailFunctionalityDecline(accountID, accountpass, subject, SenderName, Email, Reason) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: accountID, // generated ethereal user
      pass: accountpass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: `${SenderName} <Smart@voting.com>`, // sender address
    to: Email, // list of receivers
    subject: `${subject}`, // Subject line
    text: 'SMART VOTING SYSTEM', // plain text body
    html: `<b>Reason: </b> <br/> ${Reason} `, // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

function EmailFunctionalityForVote(accountID, accountpass, subject, SenderName, Email, Link) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: accountID, // generated ethereal user
      pass: accountpass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: `${SenderName} <Smart@voting.com>`, // sender address
    to: Email, // list of receivers
    subject: `${subject}`, // Subject line
    text: 'SMART VOTING SYSTEM', // plain text body
    html: `<b>Cast Vote Link : </b> <br/> ${Link} `, // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

function checkingVotingEligibility(req, res) {
  console.log('request data', req.body);
  const {
    email,
    gender,
    profession,
    name
  } = req.body;
  const SaveOBJ = {
    email: email,
    gender: gender,
    voterProfession: profession,
    name: name,
  };
  console.log('email is : ', email);
  const SearchOBJ = {
    email,
  };
  try {
    voterDetails.findOne(SearchOBJ)
      .then((success) => {
        if (success !== null) {
          console.log(success);
          console.log('verified email', success.emailVerified);
          if (success.emailVerified) {
            console.log('email is verified');
            res.status(200).json({
              status: 'voter exist with email verified status true',
              type: 'emailVerified'
            });
          } else {
            EmailFunctionality(config.accountID, config.accountPass, 'Admin', email, success.voterId, success.username);

            const VoterDetails = new VoterProfileDetails(SaveOBJ);
            VoterDetails
              .save()
              .then((success) => {
                if (success !== null) {
                  voterDetails.findOneAndUpdate(SearchOBJ, {
                    $set: {
                      emailVerified: true,
                    },
                  }, {
                    new: true,
                  }).then((result) => {
                    console.log(result);
                  }).catch((error) => {
                    console.log(error);
                  });
                  console.log('object success', success);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            res.status(200).json({
              status: 'voter exist with no verification of email',
              type: 'emailNotVerified'
            });
          }
        } else {
          res.status(401).json({
            status: 'voter not exist',
            type: 'invalidEmail'
          });
        }
      })
      .catch((error) => {
        console.log('object error', error);
        res.status(500).json({
          status: 'internal server error'
        });
      });
  } catch (error) {
    console.log('network error', error);
    // res.status(500).json({status:'network'});
  }
}

function DeleteCandidateFromPendingList(req, res) {
  console.log(req.body);
  const {
    _id,
    email,
    emailText
  } = req.body.bodyData;
  console.log('check information:', email, _id, emailText);
  const DeleteOBJID = {
    _id: _id,
  };
  PendingCandidateReq.deleteOne(DeleteOBJID)
    .then((success) => {
      console.log(success);
      res.json({
        status: true,
        message: 'delete Successfully'
      });
      EmailFunctionalityDecline(config.accountID, config.accountPass, 'Candidate Request Decline', 'ADMIN', 'muhammadhamzahaneef@gmail.com', emailText);
    }).catch((error) => {
      console.log(error);
      res.json({
        status: false,
        error: error,
      });
    });
}

function AddCandidateIntoVoterList(req, res) {
  console.log(req.body);
  const {
    email,
    voterProfession,
    ApplyAsCandidate,
    gender,
    firstname,
  } = req.body.data;
  const SearchOBJ = {
    email: email,
  };
  const SaveOBJ = {
    email: email,
    gender: gender,
    voterProfession: voterProfession,
    name: firstname,
    ApplyAsCandidate: ApplyAsCandidate,
  };
  voterDetails.findOne(SearchOBJ).then((success) => {
    if (success !== null) {
      console.log('success obj', success);
      if (success.emailVerified) {
        VoterProfileDetails.findOneAndUpdate(SearchOBJ, {
          $set: {
            ApplyAsCandidate: true,
          },
        }, {
          new: true,
        }).then((result) => {
          if (result !== null) {
            console.log('verified udated ', result);
            res.json({
              status: true,
              message: 'user exist , its just updated'
            });
          }
        }).catch((error) => {
          console.log('error in verfied updataed ', error);
          res.json({
            status: false,
            error: error,
          });
        });
      } else if (!success.emailVerified) {
        EmailFunctionality(config.accountID, config.accountPass, 'Admin', email, success.voterId, success.username);
        const VoterProfileD = new VoterProfileDetails(SaveOBJ);
        VoterProfileD
          .save()
          .then((success) => {
            if (success !== null) {
              voterDetails.findOneAndUpdate(SearchOBJ, {
                $set: {
                  emailVerified: true,
                },
              }, {
                new: true,
              }).then((result) => {
                console.log(result);
                res.json({
                  status: true,
                  message: 'user not exist so sent email with credential marks as verfied email'
                });
              }).catch((error) => {
                console.log(error);
                res.json({
                  status: false,
                  error: error,
                });
              });

              console.log('object success', success);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

    } else {
      console.log('else part workiing');
      res.status(401).json({
        errors: {
          status: false,
          message: 'Outsiders cannot be apply as a candidate',
        },
      });
    }
  }).catch((error) => {
    console.log('success obj', error);
    console.log(error);
    res.json({
      status: false,
      error: error,
    });
  });
}

function CastVoteLink(req, res) {
  console.log(req.body);
  const {
    email
  } =
  req.body;
  VoterProfileDetails.findOne({
      email: email
    })
    .then((success) => {
      if (success !== null) {
        console.log('found:  ', success);
        if (!success.isVoteCasted) {
          console.log('all data', success._id, success.email, success.isVoteCasted);
          const Data = {
            id: success._id,
          };
          const token = jwt.sign(Data, 'newSecret', {
            expiresIn: '50m',
          });
          console.log(token);
          EmailFunctionalityForVote(config.accountID, config.accountPass, 'Secure Vote Link Valid for 10 mints', 'Admin', email, `http://localhost:3000/dashboard/CastVoteNow?token=${token}`);
          res.json({
            status: true,
            message: 'email has been sent!'
          });
        }
      }
    }).catch((error) => {
      console.log('not found error:', error);
    });
}

function isTokenExpire(req, res) {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);
  console.log('token zinda hai');
  res.status(200).json({
    status: true,
    message: 'token zinda hai',
  });
}

function VoteCastNow(req, res) {
  console.log(req.body);
  const {
    voterEmail,
    candidateEmail
  } = req.body;
  const SaveOBJ = {
    voterEmail: voterEmail,
    candidateEmail: candidateEmail,
  };
  const UpdateOBJ = {
    email: voterEmail,
  };
  const voterCastModal = new VoteCastModal(SaveOBJ);
  voterCastModal
    .save()
    .then((success) => {
      if (success !== null) {
        console.log('data has been inserted: ', success);
        VoterProfileDetails.findOneAndUpdate(UpdateOBJ, {
          $set: {
            isVoteCasted: true,
          },
        }, {
          new: true,
        }).then((success1) => {
          console.log('voter has been successfully updated', success1);
          res.json({
            status: true,
            message: 'vote has been successfully casted!'
          });
        }).catch((error) => {
          res.json({
            status: false,
            error: error
          });
          console.log('error in updation:', error);
        });
      }
    }).catch((error) => {
      res.json({
        status: false,
        error: error
      });
      console.log('error in inserting', error);
    });
}

function getCountVote(req, res) {

  VoteCastModal.aggregate([{
      $group: {
        _id: '$candidateEmail',
        Vote_Count: {
          $sum: 1
        }
      }
    }])
    .then((success) => {
      console.log(success);
      res.json({
        data: success
      });
    }).catch((error) => {
      console.log(error);
      res.json({
        value: error
      });
    });
}

function getRegVoter(req, res) {
  VoterProfileDetails.find({})
    .then((success) => {
      if (success !== null) {
        console.log(' reports are: ', success);
        res.send({
          status: true,
          data: success,
        });
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
  checkingVotingEligibility,
  DeleteCandidateFromPendingList,
  AddCandidateIntoVoterList,
  CastVoteLink,
  isTokenExpire,
  VoteCastNow,
  getCountVote,
  getRegVoter

};