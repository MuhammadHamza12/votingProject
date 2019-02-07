import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import VoterProfile from '../components/container/dashboard/VoterProfile.jsx';
import CandidateList from '../components/container/dashboard/CandidateList.jsx';
import CastVote from '../components/container/dashboard/CastVote.jsx';
import VotingResult from '../components/container/dashboard/VotingResult.jsx';
import requireAuthCommon from '../components/secureRoutesMiddleware/requireAuthCommon';
import SystemDetails from '../components/container/dashboard/SystemDetails.jsx';
import CandidatePage from '../components/container/dashboard/CandidatePage.jsx';
import CastVoteNow from '../components/container/dashboard/CastVoteNow.jsx';
import SpecialMiddleWare from '../components/secureRoutesMiddleware/CastingVoteMiddleWare.jsx';
export default class MainRoutes extends Component {
  render() {
    return (
      <div>
        {/* <Route path='/dashboard' component={requireAuthCommon((props)=> <UserDetails profileFlag={this.props.profileFlag} {...props} />)} />     */}
        <Route path='/dashboard' component={requireAuthCommon((props)=> <SystemDetails {...props}  changePageState={this.props.changePageState}  />)}/>
        <Route path='/dashboard/vProfile' component={requireAuthCommon((props)=> <VoterProfile getAvatarName={this.props.getAvatarName} userData={this.props.userData}  {...props} />)}  />
        <Route path='/dashboard/candidateList' component={requireAuthCommon((props)=> <CandidateList {...props} getApproveReq={this.props.getApproveReq} changePageState={this.props.changePageState}  />)} />
        <Route path='/dashboard/castVote' component={requireAuthCommon((props)=> <CastVote {...props} userData={this.props.userData} changePageState={this.props.changePageState} />)} />
        <Route path='/dashboard/votingResults' component={requireAuthCommon((props)=> <VotingResult {...props} getVoteCountData={this.props.getVoteCountData} getApproveReq={this.props.getApproveReq} userData={this.props.userData} changePageState={this.props.changePageState} />) } />      
        <Route path='/dashboard/candidatePage' component={requireAuthCommon((props)=> <CandidatePage {...props} getVoteCountData={this.props.getVoteCountData}  getApproveReq={this.props.getApproveReq} userData={this.props.userData} />)} />
        <Route path='/dashboard/CastVoteNow' component={SpecialMiddleWare((props)=> <CastVoteNow {...props} getApproveReq={this.props.getApproveReq} userData={this.props.userData}  changePageState={this.props.changePageState}  />)} />
      </div>
    );
  }
}
