import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';

export default function (ComposeComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.state={
        Vdetails:{},
      };
      if (this.props.auth && this.props.location.pathname === '/') {
        this.props.history.push('/dashboard');
      }else if(!this.props.isAdmin && this.props.location.pathname === '/Adashboard'){
        this.props.history.push('/Admin');
      }
      else if(this.props.auth &&  this.props.location.pathname === '/login'){
        this.props.history.push('/dashboard');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard'){
        this.props.history.push('/login');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard/candidateList'){
        this.props.history.push('/login');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard/Profile'){
        this.props.history.push('/login');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard/candidatePage'){
        this.props.history.push('/login');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard/votingResults'){
        this.props.history.push('/login');
      }
      else if(!this.props.auth && this.props.location.pathname === '/dashboard/vProfile'){
        this.props.history.push('/login');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard/castVote'){
        this.props.history.push('/login');
      }else if(!this.props.auth && this.props.location.pathname === '/dashboard/votingResults'){
        this.props.history.push('/login');
      }else if(!this.props.isAdmin && !this.props.auth && this.props.location.pathname === '/Adashboard'){
        this.props.history.push('/Admin');
      }else if(this.props.isAdmin && this.props.location.pathname === '/Admin'){
        this.props.history.push('/Adashboard');
      }else if(this.props.isAdmin && this.props.location.pathname === '/login'){
        this.props.history.push('/Adashboard');
      }else if(!this.props.auth && this.props.isAdmin && this.props.location.pathname === '/dashboard' ){
        this.props.history.push('/Adashboard');
      }else if(this.props.isAdmin && this.props.location.pathname === '/'){
        this.props.history.push('/Adashboard');
      }
      else if(this.props.getAdminSetDetails.AdminDetails && this.props.getAdminSetDetails.AdminDetails.AdminDetails && this.props.getAdminSetDetails.AdminDetails.AdminDetails.isVotingTimeStart &&  this.props.location.pathname === '/Adashboard/VotingSession'){
        debugger;
        this.props.history.push('/Adashboard/VotingStatus');
      }
      else if(this.props.getAdminSetDetails.AdminDetails && this.props.getAdminSetDetails.AdminDetails.AdminDetails && !this.props.getAdminSetDetails.AdminDetails.AdminDetails.isVotingTimeStart &&  this.props.location.pathname === '/Adashboard/VotingStatus'){
        debugger;
        this.props.history.push('/Adashboard/VotingSession');
      }
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //   debugger;
    //   if (prevState.Vdetails !== nextProps.getAdminSetDetails.AdminDetails.AdminDetails) {
    //     debugger;
    //     return {
    //       Vdetails:nextProps.getAdminSetDetails.AdminDetails.AdminDetails,
    //     };
    //   }
    //   return null;
    // }
    render(){
      return(
        <ComposeComponent { ...this.props}/>
      );
    }
  }

  function mapStateToProps(state) {
    debugger;
    return {
      auth: state.authUserReducer.isAuth,
      authSecond: state.authUserReducer.users.profileFlag,
      isAdmin:state.authAdminReducer.isAdminAuth, 
      getAdminSetDetails:state.sharedReducer,
      getAdminCanReqData:state.getAdminCanReqData,
    };
  }

  return connect(mapStateToProps, null)(Authenticate);
}