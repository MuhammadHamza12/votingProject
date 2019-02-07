import * as actionTypes from '../Action/actionTypes';

export default function GetAdminData(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {

    case actionTypes.SET_CRIME_REPORTS:
      return action.payload;

    case actionTypes.GET_CAN_REQ_DATA:
      debugger;
      return action.payload;
    case actionTypes.DELETE_PARTICULAR_REQ_DATA:
      let filterCandidateReqList = state.filter((filterOBJ) => filterOBJ._id !== action.payload)
      debugger;
      return filterCandidateReqList;

    default:
      return newState;
      // console.log('unknown case')
  }
  return newState;

}