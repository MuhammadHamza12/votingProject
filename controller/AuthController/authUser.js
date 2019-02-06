const VoterDetailsModal = require('../../dataModels/VoterDetailsModal');
const bycrypt = require('bcrypt');
const conifg = require('../../config');
const jwt = require('jsonwebtoken');
function userAuth(req,res) {
  console.log('here we have req body: ',req.body);
  const { voterId , password , email  } = req.body;
  let findOBJ;
  if(email){
    findOBJ = {
      email,
    };   
  }else {
    findOBJ = {
      voterId
    };
  }
  
  try {
    VoterDetailsModal.findOne(findOBJ)
      .then((success) => {
        console.log('response data: ', success);
        // console.log('password is',success.password);
        if (success !== null) {
          console.log('not null data',success.profileflag);
          try {
            if (bycrypt.compareSync(password, success.password)) {
              const token = jwt.sign({
                id: success._id,
                email: success.email,
                voteCasted: success.voteCasted,
                votingTime:success.votingTime,
                profileFlag:success.profileflag,
              },conifg.jwtSecret, {
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
function updateUserDetails(req,res) {
  console.log(req.params.id);
  
  res.json({ok:'boss'});
  // const {userId,profileflag} = req.body;
  // const findOBJ = {
  //   userId,
  // };
  // VoterDetailsModal.findByIdAndUpdate(findOBJ,{
  //   $set:{
  //     profileflag:profileflag,
  //   },
  // },{new:true}).then((success)=>{
  //   if (success !== null) {
  //     console.log('successfully updated',success);
  //     res.status(200).json({
  //       message: 'updated Object Successfully',
  //     });
  //   }
  // });
}
module.exports = {
  userAuth,
  updateUserDetails
};