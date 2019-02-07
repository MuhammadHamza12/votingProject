import * as actionTypes from '../actionTypes';
import Axios from 'axios';
import config from '../../config';
import setAuthorizationToken from '../../config/setAuthToken';
import jwt from 'jsonwebtoken';

export function Login(data){
  return (dispatch) => {
    return Axios.post(`${config.localHttp}${config.adminLoginApi}`,data).then((res) => {
      console.log('response',res);
      const token = res.data.token;
      console.log(token);
      localStorage.setItem('jwtToken1',token);
      setAuthorizationToken(token);
      dispatch(setAdminUser(jwt.decode(token)));
    });
  };
}
  
export function setAdminUser(userDetails) {
  return {
    type: actionTypes.SET_ADMIN_USER,
    payload: userDetails
  };
}

  
export function logout(){
  return (dispatch) => {
    localStorage.removeItem('jwtToken1');
    setAuthorizationToken(false);
    dispatch(setAdminUser({}));
  };
}

 