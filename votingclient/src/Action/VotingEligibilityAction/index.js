import * as actionTypes from '../actionTypes';
import Axios from 'axios';
import config from '../../config';

export default class VotingEligiblity {

  static checkEmailForVoting(email){
    return (dispatch) => {
      return Axios.post(`${config.localHttp}${config.checkVoterEligibility}`, email).then((res) => {
        console.log('response',res); 
        return res;
      });
    };
  }
  static ValidEmail(data){
    return{
      // type:actionTypes.EMAIL_VALID_SEND_MESSAGE , payload:data,
    };
  }
  static InvalidEmail(data){
    return{
      type:actionTypes.INVALID_EMAIL_ERROR_APPEAR , payload:data,
    };
  }


}