import * as actionTypes from '../../Action/actionTypes';
import axios from 'axios';

function setAllCanReqToRedux(allData) {
  debugger;
  return {
    type: actionTypes.GET_CAN_REQ_DATA,
    payload: allData,
  };
}
//*** actions for settig admin details */
function setAdminDetailsToRedux (allData){
  debugger;
  return {
    type: actionTypes.SET_ADMIN_DETAILS,
    payload: allData,
  };
}
export function getAdminDetailsUsingPost(url,email){
  return (dispatch) => {
    debugger;
    return axios.post(url,{emailId:email}).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAdminDetailsToRedux(res.data.data));
      return res.data.data;
    });
  };
}

//*** */
///** Actions of voting resulta */ 
function setAllVoterRegData(allData) {
  debugger;
  return {
    type: actionTypes.GET_REG_VOTER_DATA,
    payload: allData,
  };
}
export function getAllVoterRegisterdData(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAllVoterRegData(res.data.data));
      return res.data.data;
    });
  };
}


//END **///
//***start allvoteCount DATA */
function setAllVoteCountDataIntoRedux(allData) {
  debugger;
  return {
    type: actionTypes.GET_ALL_VOTE_COUNT_DATA,
    payload: allData,
  };
}
export function getAllVoteCountDataForAdmin(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAllVoteCountDataIntoRedux(res.data.data));
      return res.data.data;
    });
  };
}

//**End of vote count data actions */
///***start of Approved Candidate Data list actions */
function setAllApproveCanData(allData) {
  return {
    type: actionTypes.APPROVE_CAN_DATA,
    payload: allData,
  };
}
export function getAllApproveCanData(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAllApproveCanData(res.data.data));
      return res.data.data;
    });
  };
}
//**** End of approved Candidate Data list actions */
export function getAllCanReqData(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAllCanReqToRedux(res.data.data));
      return res.data.data;
    });
  };
}

function setAllVoteCountToRedux(allData) {
  debugger;
  return {
    type: actionTypes.GET_VOTE_COUNT_DATA,
    payload: allData,
  };
}
export function getAllVoteCount(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAllVoteCountToRedux(res.data.data));
    });
  };
}