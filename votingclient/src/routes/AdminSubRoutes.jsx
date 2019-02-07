import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CandidateRequest from './../components/container/Admin/CandidateRequests.jsx';
import AddVoter from './../components/container/Admin/AddVoter.jsx';
import VotingSession from './../components/container/Admin/VotingSession.jsx';
import VotingStatus from './../components/container/Admin/VotingStatus.jsx';
import requireAuthCommon from '../components/secureRoutesMiddleware/requireAuthCommon';
import showLoaderMiddleWare from '../components/secureRoutesMiddleware/showLoaderMiddleware';
import ApprovedCandidate from '../components/container/Admin/ApprovedCandidate.jsx';
import VoteCountData from '../components/container/Admin/VoteCountData.jsx';
import RegisteredCandidate from  '../components/container/Admin/RegisteredCandidate.jsx';
import ResultStatus from '../components/container/Admin/ResultStatus.jsx';
class AdminSubRoutes extends Component {
  render() {
    return (
      <div>
        <Route path='/Adashboard/CandidateReq'component={requireAuthCommon((props)=> <CandidateRequest {...props} getCanData={this.props.getCanData}  CandidateReqData={this.props.CandidateReqData}  />)} />
        <Route path='/Adashboard/AddVoter' component={AddVoter} />
        <Route path='/Adashboard/VotingSession' component={requireAuthCommon(VotingSession)} />
        <Route path='/Adashboard/VotingStatus' component={requireAuthCommon(VotingStatus)} />
        <Route path='/Adashboard/ApprovedCandidate' component={requireAuthCommon((props)=> <ApprovedCandidate {...props} getAppCanData={this.props.getAppCanData}  />)} />
        <Route path='/Adashboard/CandidateVotes' component={requireAuthCommon((props)=> <VoteCountData getVoteCountData ={this.props.getVoteCountData } {...props} getAppCanData={this.props.getAppCanData}  />)} />
        <Route path='/Adashboard/RegisteredVoters' component={requireAuthCommon((props)=> <RegisteredCandidate getAllVoterRegData ={this.props.getAllVoterRegData } {...props} getAppCanData={this.props.getAppCanData}  />)} />
        <Route path='/Adashboard/Results' component={requireAuthCommon((props)=> <ResultStatus getVoteCountData ={this.props.getVoteCountData} getAdminVotingDetails={this.props.getAdminVotingDetails}  getCanData={this.props.getCanData}    {...props}   />)} />

      </div>
    );
  }
}

export default AdminSubRoutes;