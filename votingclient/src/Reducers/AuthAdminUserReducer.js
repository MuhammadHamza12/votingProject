import * as actionTypes from '../Action/actionTypes';
import isEmpty from 'lodash/isEmpty';

const defaultState = {
  isAdminAuth: false,
  users: {},
};

export default function setUserReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.SET_ADMIN_USER:
    return {
        isAdminAuth: !isEmpty(action.payload),
        users: action.payload,
      };
    

    default:
      return state;
  }
}