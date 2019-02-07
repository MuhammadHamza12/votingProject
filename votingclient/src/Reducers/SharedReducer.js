import * as actionTypes from '../Action/actionTypes';

import isEmpty from 'lodash/isEmpty';
const defaultState = {
  checknow: false,
  isLoginPage: false,
  activeItem: '',
  pageState: 'block',
  UserDetails: {},
  AdminDetails: {},
  isVotingTimeSet: false,
  isLoading: true,
  getCandidateReqData: [],
  getApprovedCanData: [],
  getCountData: null,
  getRegisterdVoters: [],
};

export default function CheckReducer(state = defaultState, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {

    case actionTypes.CHECK_NOW:
      return { ...state,
        checknow: !state.checknow
      };

    case actionTypes.IS_LOGIN_PAGE:
      return { ...state,
        isLoginPage: action.payload.isLoginPage
      };

    case actionTypes.RETAIN_PAGE_ACTIVE_LINK:
      return { ...state,
        activeItem: action.payload
      };
    case actionTypes.CHECK_PAGE_STATE:
      return { ...state,
        pageState: action.payload.pageState
      };
    case actionTypes.SET_USER_DETAILS:
      return { ...state,
        UserDetails: action.payload
      };
    case actionTypes.CHANGE_USER_IMAGE:
      return {
        UserDetails: { ...action.payload.payload,
          profileImg: action.payload.ImgURL
        }
      };
    case actionTypes.SET_ADMIN_DETAILS:
    debugger;  
    return {
        AdminDetails: { ...state,
          AdminDetails: action.payload
        },
      };
    case actionTypes.SET_ADMIN_VOTING_TIME:
      return {
        isVotingTimeSet: !isEmpty(action.payload),
      };
    case actionTypes.IS_LOADIND_LAODER:
      return { ...state,
        isLoading: action.payload,
      };
    case actionTypes.GET_CANDIDATE_REQUEST_DATA:
      debugger;
      return { ...state,
        getCandidateReqData: [...action.payload]
      };
    case actionTypes.GET_APPROVED_DATA:
      debugger;
      return {
        ...state,
        getApprovedCanData: [...action.payload]
      };

    case actionTypes.DELETE_CANDIDATE_REQUEST:
      let filterCandidateReqList = state.AdminDetails.getCandidateReqData.filter((filterOBJ) => filterOBJ._id !== action.payload)
      
      debugger;
       return {
        ...state,
        getCandidateReqData: filterCandidateReqList,
      };
    case actionTypes.GET_REGISTERED_VOTERS:
      debugger;
      return {
        ...state,
        getRegisterdVoters: [...action.payload]
      };
    case actionTypes.GET_COUNT_DATA:
      debugger;
      return {
        ...state,
        getCountData: action.payload,
      }

    default:
      return newState;
      // console.log('unknown case')
  }

}