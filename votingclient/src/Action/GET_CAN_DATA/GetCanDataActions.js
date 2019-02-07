import * as actionTypes from '../../Action/actionTypes';
import axios from 'axios';

function setAllCanReqToRedux(allData) {
  debugger;
  return {
    type: actionTypes.GET_CAN_DATA,
    payload: allData,
  };
}
export function getAllCanReqData(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setAllCanReqToRedux(res.data.data));
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