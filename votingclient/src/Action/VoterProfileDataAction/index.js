import Axios from 'axios';
import config from '../../config';

// export default function sentDataToServer(data){
//   return (dispatch) => {
//     return Axios.post(`${config.localHttp}${config.sentVoterDataToServer}`, data)
//       .then((res) => {
//         console.log('response',res); 
//         return res;
//       });
//   };
// }
export default class VoterProfileDataActions {
  static sentDataToServer(data){
    return (dispatch) => {
      return Axios.post(`${config.localHttp}${config.sentVoterDataToServer}`, data)
        .then((res) => {
          console.log('response',res); 
          return res;
        });
    };
  }
}