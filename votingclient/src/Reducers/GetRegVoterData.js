import * as actionTypes from '../Action/actionTypes';

export default function GetRegVoterData(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {

    case actionTypes.GET_REG_VOTER_DATA:
      debugger;
      return action.payload;

    default:
      return newState;
      // console.log('unknown case')
  }
  return newState;

}