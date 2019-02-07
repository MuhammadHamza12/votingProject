import * as actionTypes from '../Action/actionTypes';

import isEmpty from 'lodash/isEmpty';

const defaultState = {
  isAuth: false,
  users: {},
  isAdmin: 'commonUser',
  profileFlag:false,
};

export default function setUserReducer(state = defaultState, action = {}) {
  switch (action.type) {
    
    case actionTypes.SET_CURRENT_USER:
    debugger;  
    return {
        isAuth: !isEmpty(action.payload),
        users: action.payload,
        profileFlag:state.profileFlag,
      };
    
    case actionTypes.UPDATE_CURRENT_USER:
    debugger;  
    return{
        users:{...action.payload,profileFlag:true},
        isAuth: !isEmpty(action.payload),      
      };
    case actionTypes.CHECK_WHEN_DATA_HAS_COLLECT:  
    debugger;  
    return{
        profileFlag:!isEmpty(action.payload)
      };
    default:
      return state;
  }
}