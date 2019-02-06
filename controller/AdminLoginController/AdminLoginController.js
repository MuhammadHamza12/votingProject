const AdminDetailModal = require('../../dataModels/AdminDataModal');
const config = require('../../config');
const jwt = require('jsonwebtoken');


function adminLogin(req, res) {
  console.log(req.body);
  const {
    email,
    password
  } = req.body;
  // new code 

  try {
    AdminDetailModal.findOne({
        email
      })
      .then((success) => {
        console.log('response data: ', success);
        // console.log('password is',success.password);
        if (success !== null) {
          console.log('not null data', success.profileflag);
          try {
            if (success.password == password) {
              const token = jwt.sign({
                id: success._id,
                email: success.email,
                isAdmin: success.isAdmin,
              }, config.jwtSecret, {
                expiresIn: '1d',
              });
              res.json({
                token,
              });
            } else {
              res.status(401).json({
                errors: {
                  form: 'Invalid Credentials',
                },
              });
            }
          } catch (e) {
            res.status(401).json({
              errors: {
                form: 'Invalid Credentials',
              },
            });
          }
        } else {
          console.log('else part workiing');
          res.status(401).json({
            errors: {
              form: 'Invalid Credentials',
            },
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  } catch (e) {
    console.log('network problem');
  }
}

function getAdminDetails(req, res) {
  console.log(req.body);
  const {
    emailId
  } = req.body;
  const SearchOBJ = {
    email: emailId,
  };
  console.log('email agaya hai:',emailId);
  AdminDetailModal.findOne(SearchOBJ)
    .then((success) => {
      console.log(success);
      const DetailOBJ = {
        votingStartTime:success.votingStartTime,
        votingEndTime:success.votingEndTime,
        votingStartDate:success.votingStartDate,
        isVotingTimeStart:success.isVotingTimeStart,
      };
      res.json({
        status: true,
        data: DetailOBJ,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = {
  adminLogin,
  getAdminDetails
};