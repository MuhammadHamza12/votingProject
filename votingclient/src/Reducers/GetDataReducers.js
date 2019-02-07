import * as actionTypes from '../Action/actionTypes';

export default function GetCandidateData(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {

    case actionTypes.SET_CRIME_REPORTS:
      return action.payload;

    case actionTypes.GET_CAN_DATA:
      debugger;
      return action.payload;

    default:
      return newState;
      // console.log('unknown case')
  }
  return newState;

}