//***************All neccesary module imports 

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const CORS = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./uploads/'); 
  },
  filename:function(req,file,cb){
    cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
const fileFilter = (req,file,cb) =>{
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  } else {
    cb('Not an image',false); 
  }
};

const upload = multer({storage:storage,
  limits:{
    fileSize: 1024 * 1024 * 5
  },
  fileFilter:fileFilter,
});
//************end of All imports

//******database connection */

require('./dbConnection');

//******end of db connection */

//*****************All neccessary controllers module

const authUser = require('./controller/AuthController/authUser');
const eligibilityChecker = require('./controller/EligibilityController/EligibilityChecker');
const getPData = require('./controller/ProfileDataController/ProfileDataController.js');
const getUData = require('./controller/GetDataController/getDataController');
const adminLoginController = require('./controller/AdminLoginController/AdminLoginController.js');
const castVoteMiddleware = require('./middlewares/castVoteMiddleware');
const app = express();
const PORT = process.env.PORT || 8080;

//****************end of controllers

//*****************using module 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/static')));
// app.use('/uploads/',express.static('uploads'));
app.use(CORS('*'));

//************All end-points-request/terminals are *********************/

app.post(`${config.authenticationApi}`,authUser.userAuth);
app.post(`${config.checkVoterEligibility}`,eligibilityChecker.checkingVotingEligibility);
app.post(`${config.getProfileDataApi}`,getPData.getProfileData);
app.put(`${config.updateUserDetailsApi}`,authUser.updateUserDetails);
app.post(`${config.getUserDetailsApi}`,getUData.getUserDetails);
app.post(`${config.adminLoginapi}`,adminLoginController.adminLogin);
app.put(`${config.getUserDetailsUpdate}`,upload.single('profileimage'),getUData.updateUserProfile);
app.post('/api/setVoting/Time',getUData.SetVotingTime);
app.post('/api/getAdmin/Details',adminLoginController.getAdminDetails);
app.post('/sendConfirmation/api',getUData.setEndVotingFlag);
app.post('/addvoter/api',getPData.AddVoter);
app.put('/listenCan/Req/api',getPData.CandidateRequest);
app.get('/api/getCanReq/Data',getPData.getCandidateRequestData);
app.post('/api/CandidateReq/delete',eligibilityChecker.DeleteCandidateFromPendingList);
app.post('/api/CandidateReqAccept/data',eligibilityChecker.AddCandidateIntoVoterList);
app.get('/api/approved/Candidate',getPData.getApprovedCandidate);
app.post('/api/castVote/Voter',eligibilityChecker.CastVoteLink);
app.post('/api/CheckToken',castVoteMiddleware,eligibilityChecker.isTokenExpire);
app.post('/api/VoteCastNow',eligibilityChecker.VoteCastNow);
app.get('/api/getCountVote',eligibilityChecker.getCountVote);
app.get('/api/getReg/voter',eligibilityChecker.getRegVoter);
// app.post('/api/Add/Candidate',)
//************ END *********************/


//*********************end of module

//**********************checking request \

//***************************end of checking request

app.listen(PORT, () => {
  console.log(`Server started on port ${ chalk.green(PORT)}`);
});