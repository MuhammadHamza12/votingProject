const config = require('../config');
const jwt = require('jsonwebtoken');
const VoterProfileDetails = require('../dataModels/VoterProfileDetailsModal');

module.exports = (req, res, next) => {
  console.log(req.body); 
  const { token } = req.body;
  // console.log('real form of token:',token);
  // console.log('token with the string: ',token);
  if (token) {
    console.log('token has came',token);
    jwt.verify(token,'newSecret', (err, decode) => {
      if (err) {
        console.log('error come up with',err);
        console.log('response send token not verfied');
        res.status(401).json({
          error: 'failed token verification!',
          status: false,
        });
      } else {
        VoterProfileDetails.findById(decode.id)
          .then((user) => {
            if (!user) {
              console.log('response no user exist');
              res.status(404).json({
                error: 'No such user',
              });
            }
            req.currentUser = user;
            next();
          });
      }
    });
  } else {
    res.status(403).json({
      error: 'no token provided',
    });
  }
};