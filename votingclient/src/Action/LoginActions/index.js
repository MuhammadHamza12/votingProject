import * as actionTypes from '../actionTypes';
import Axios from 'axios';
import config from '../../config';

import setAuthorizationToken from '../../config/setAuthToken';
import jwt from 'jsonwebtoken';

export function updateCurrentUser(userDetails) {
  return{
    type:actionTypes.UPDATE_CURRENT_USER,
    payload:userDetails,
  };
}
export function UpdateUserAtServer(userId){
  return (dispatch) =>{
    return Axios.put(`${config.localHttp}/userUpdate:${userId}`).then((result)=>{
      console.log('response',result);
    })
      .catch((err)=>{
        console.log('error',err);
      });
  };
}

export default class LoginActions {

  static Login(data) {
    return (dispatch) => {
      return Axios.post(`${config.localHttp}${config.authenticationApi}`, data).then((res) => {
        console.log('response',res);
        const token = res.data.token;
        console.log(token);
        localStorage.setItem('jwtToken',token);
        setAuthorizationToken(token);
        dispatch(this.setCurrentUser(jwt.decode(token)));
      });
    };
  }
  
  static setCurrentUser(userDetails) {
    return {
      type: actionTypes.SET_CURRENT_USER,
      payload: userDetails
    };
  }

  static setProfileUser(collectedDetails){
    debugger;
    return {
      type: actionTypes.CHECK_WHEN_DATA_HAS_COLLECT,
      payload: collectedDetails,
    };
  } 

  static logout(){
    return (dispatch) => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(this.setCurrentUser({}));
    };
  }
}
 