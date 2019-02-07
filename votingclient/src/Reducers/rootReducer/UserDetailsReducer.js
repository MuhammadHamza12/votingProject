import * as actionTypes from '../../Action/actionTypes';

import isEmpty from 'lodash/isEmpty';

const defaultState = {
  usersDetails: {
    email:'',
    name:'',
    profession:'',
    file:null,
    isLoading:false,
    errors:{}, 
  },
};

export default function setUserReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_USER_FORM_DATA:  
    debugger;  
    return { ...state ,  usersDetails:action.payload};

    default:
      return state;
  }
}