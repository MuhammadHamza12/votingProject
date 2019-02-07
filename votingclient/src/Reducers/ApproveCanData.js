import * as actionTypes from '../Action/actionTypes';

export default function GetApproveCanData(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {

    case actionTypes.APPROVE_CAN_DATA:
      debugger;
      return action.payload;

    default:
      return newState;
      // console.log('unknown case')
  }
  return newState;

}