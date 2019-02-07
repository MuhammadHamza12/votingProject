import { combineReducers } from 'redux';
import sharedReducer from '../SharedReducer';
import authUserReducer from '../AuthUserReducer'; 
import authAdminReducer from '../AuthAdminUserReducer';
import getCanReqData from '../GetDataReducers';
import getCountVoteData from '../GetVoteCountData';
import getAdminCanReqData from '../NewAdminReducer';
import getApproveCanData from '../ApproveCanData';
import getAllVoteCountData from '../GetVoteCount';
import getVoterRegData from '../GetRegVoterData';

const rootReducer = combineReducers({
  sharedReducer , authUserReducer, authAdminReducer, getCanReqData ,getCountVoteData ,getAdminCanReqData , getApproveCanData , getAllVoteCountData ,getVoterRegData
});

export default rootReducer;