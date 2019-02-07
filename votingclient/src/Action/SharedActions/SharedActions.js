import * as actionTypes from '../actionTypes';
import config from '../../config';
import axios from 'axios';
export function checkNow(message) {
  return {
    type: actionTypes.CHECK_NOW,
    payload: message,
  };
}

export function isLoginPage(message) {
  return {
    type: actionTypes.IS_LOGIN_PAGE,
    payload: message,
  };
}
export function changePageState(message) {
  return {
    type: actionTypes.CHECK_PAGE_STATE,
    payload: message,
  };
}
export function retainState(getName) {
  return {
    type: actionTypes.RETAIN_PAGE_ACTIVE_LINK,
    payload: getName,
  };
}

function doPostRequest({
  url,
  data
}) {
  return new Promise((resolve) => {
    fetch(`http://localhost:8080${url}`, {
        method: 'POST',
        body: JSON.stringify({
          bodyData: data
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((success) => {
        resolve(success);
      })
      .catch((err) => {
        console.log({
          err
        });
      });
  });
}

function doGetRequest(url) {
  return new Promise((resolve) => {
    fetch(`${config.localHttp}${url}`)
      .then((res) => res.json())
      .then((success) => {
        resolve(success);
      })
      .catch((err) => {
        console.log({
          err
        });
      });
  });
}
// function doGetRequestWithParameter({url,data}) {
//   return new Promise((resolve) => {
//     fetch(`${config.localHttp}${url}`,{
//       method: 'GET',
//       body: JSON.stringify({ bodyData: data }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => res.json())
//       .then((success) => {
//         resolve(success);
//       })
//       .catch((err) => {
//         console.log({ err });
//       });
//   });
// }
function downloadDashboardDataAct() {
  return (dispatch) => {
    doGetRequest('/api/dashboard').then((success) => {
      dispatch({
        // type: StoreActions.downloadDashboardData,
        payload: success.data
      });
    });
  };
}

function saveOrUpdateCategoryAct(category) {
  return (dispatch) => {
    doPostRequest({
      url: '/api/categories',
      data: category
    }).then((success) => {
      dispatch({
        // type: StoreActions.saveOrUpdateCategory,
        payload: success.data
      });
    });
  };
}

// function saveOrUpdateCategoryAct(category) {
//   return (dispatch) => {
//     doPostRequest({ url: '/api/categories', data: category }).then((success) => {
//       dispatch({
//         // type: StoreActions.saveOrUpdateCategory,
//         payload: success.data
//       });
//     });
//   };
// }
// export function downloadAdminDetails({url,data}) {
//   return (dispatch) =>{
//     doPostRequest({url:url,data:data})
//       .then((result)=>{
//         debugger;
//         dispatch({
//           type:actionTypes.SET_ADMIN_DETAILS,
//           payload:result.data,
//         });
//       });
//   };
// }
export function setVotingflag(data) {
  debugger;
  return {
    type: actionTypes.SET_ADMIN_VOTING_TIME,
    payload: data,
  };
}
export function setLoadingFalg(flag) {
  debugger;
  return {
    type: actionTypes.IS_LOADIND_LAODER,
    payload: flag,
  };
}
// export function  setVotingTiming(data) {
//   return (dispatch) =>{
//     doPostRequest({url:'/api/setVoting/Time',data:data})
//       .then((result)=>{
//         debugger;
//         // dispatch({
//         //   type:actionTypes.SET_ADMIN_VOTING_TIME,
//         //   payload:result.data,
//         // });
//       });
//   };
// }
export function downloadAdminDetails(emailId) {
  return (dispatch) => {
    doPostRequest({
        url: '/api/getAdmin/Details',
        data: emailId
      })
      .then((result) => {
        debugger;
        dispatch({
          type: actionTypes.SET_ADMIN_DETAILS,
          payload: result.data,
        });
        // setLoadingFalg(false);
      });
  };
}
export function downloadAllCandidateRequestData() {
  return (dispatch) => {
    return axios.get(`${config.localHttp}/api/getCanReq/Data`)
      .then((result) => {
        debugger;
        console.log(result.data.data);
        dispatch({
          type: actionTypes.GET_CANDIDATE_REQUEST_DATA,
          payload: result.data.data,
        });
        return result.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function downloadAllApprovedCandidate() {
  return (dispatch) => {
    return axios.get(`${config.localHttp}/api/approved/Candidate`)
      .then((result) => {
        debugger;
        console.log(result.data.data);
        dispatch({
          type: actionTypes.GET_APPROVED_DATA,
          payload: result.data.data,
        });
        return result.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function newdownloadAdminDetails(emailId) {
  return (dispatch) => {
    return axios.post(`${config.localHttp}/api/getAdmin/Details`, {
      emailId: emailId
    }).then((res) => {
      console.log(' action creator response: ', res);
      console.log(res.data.data);
      debugger;
      dispatch({
        type: actionTypes.SET_ADMIN_DETAILS,
        payload: res.data.data,
      });
      return res.data.data;
    }).catch((err) => {
      console.log(err);
    });
  };
}
export function downloadUserDetails(emailId) {
  return (dispatch) => {
    doPostRequest({
        url: '/getUserData/api',
        data: emailId
      })
      .then((result) => {
        debugger;
        dispatch({
          type: actionTypes.SET_USER_DETAILS,
          payload: result.data,
        });
      });
  };
}

export function deleteProvidedIdPendCandidateOBJ(OBJID) {
  debugger;
  return (dispatch) => {
    doPostRequest({
      url: '/api/CandidateReq/delete',
      data: OBJID
    }).then(
      (success) => {
        debugger;
        dispatch({
          type: actionTypes.DELETE_PARTICULAR_REQ_DATA,
          payload: OBJID._id
        });
      }
    ).catch((err) => {
      console.log(err);
    });
  };
}
export function setIntoRedux(data){
  return {
    type:actionTypes.GET_COUNT_DATA,
    payload:data,
  };
}
export function GetCountDataForAdmin(url) {
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(setIntoRedux(res.data.data));
    });
  };
}
export function regVoterPutintoRedux(data){
  return{
    type:actionTypes.GET_REGISTERED_VOTERS,
    payload:data,
  };
}
export function GetRegisteredVoters(url){
  return (dispatch) => {
    debugger;
    return axios.get(url).then((res) => {
      debugger;
      console.log('action creator response ', res);
      console.log(res.data.data);
      dispatch(regVoterPutintoRedux(res.data.data));
    });
  };
}
function getAllEnabledCategoriesAct() {
  return (dispatch) => {
    doGetRequest('/api/categories').then((success) => {
      dispatch({
        // type: StoreActions.getAllEnabledCategories,
        payload: success.data
      });
    });
  };
}

function unsetAllEnabledCategoriesAct() {
  // return { type: StoreActions.unsetAllEnabledCategories, payload: [] };
}

function getQuestionnaireForSelectedCategoryAct(categoryID) {
  return (dispatch) => {
    doGetRequest(
      `/api/questionnaire/getQuestionForCategory/${categoryID}`
    ).then((success) => {
      dispatch({
        // type: StoreActions.getQuestionnaireForSelectedCategory,
        payload: success.data
      });
    });
  };
}

function saveOrUpdateQuestionnaireAct(questionObj) {
  return (dispatch) => {
    doPostRequest({
      url: '/api/questionnaire/setQuestionForCategory',
      data: questionObj
    }).then((success) => {
      dispatch({
        // type: StoreActions.saveOrUpdateQuestionnaire,
        payload: success.data
      });
    });
  };
}

export function updateUserImage(payload, ImgURL) {
  return {
    type: actionTypes.CHANGE_USER_IMAGE,
    payload: {
      payload,
      ImgURL
    },
  };
}

function deleteSelectedQuestionAct(questionObj) {
  console.log(questionObj);
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        // type: StoreActions.deleteSelectedQuestion,
        payload: questionObj._id
      });
    }, 500);
  };
}

export default {
  downloadDashboardDataAct,
  saveOrUpdateCategoryAct,
  deleteProvidedIdPendCandidateOBJ,
  getAllEnabledCategoriesAct,
  unsetAllEnabledCategoriesAct,
  getQuestionnaireForSelectedCategoryAct,
  saveOrUpdateQuestionnaireAct,
  deleteSelectedQuestionAct,
  downloadUserDetails,
};