import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AccountGroup, FormatListBulleted } from 'mdi-material-ui';
import {
  HowToVoteOutlined,
  TimelapseOutlined,
  HowToVote,
  HowToRegOutlined,
  SupervisedUserCircle
} from '@material-ui/icons';
import AdminSubRoutes from '../../../routes/AdminSubRoutes.jsx';
import { bindActionCreators } from 'redux';
import * as adminActions from '../../../Action/NewAdminActions/Actions';

import * as ShareAction from '../../../Action/SharedActions/SharedActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../../config';

import { connect } from 'react-redux';
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      getCanData: null,
      getAppCanData: null,
      getVoteCountData: null,
      getAllVoterRegData:null,
      getCurrentAdmindata:null,
      getAdminVotingDetails:null,
    };
  }

  componentWillUnmount() {
    this.props.getLoaderFlag.setLoadingFalg(true);
  }

  componentDidMount() {
    Promise.all([
      this.props.adminGetCanReqData.getAllCanReqData(`${config.localHttp}/api/getCanReq/Data`),
      this.props.getApproveCanGetData.getAllApproveCanData(`${config.localHttp}/api/approved/Candidate`),
      this.props.getAllCountVoteData.getAllVoteCountDataForAdmin(`${config.localHttp}/api/getCountVote`),
      this.props.getAllVoterRegData.getAllVoterRegisterdData(`${config.localHttp}/api/getReg/voter`),
      this.props.downloadAdminDetails.getAdminDetailsUsingPost(`${config.localHttp}/api/getAdmin/Details`,this.props.getEmail) 
    ])
      .then((result) => {
        this.props.getLoaderFlag.setLoadingFalg(false);
        debugger;
        console.log(result[0]);
        console.log(result[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    if (prevState.getCanData !== nextProps.getAdminCanReqData ) {
      debugger;
      return {
        getCanData: nextProps.getAdminCanReqData,
        getAppCanData:nextProps.getApproveAllCanData,
        getVoteCountData:nextProps.getAllVoteCountData,
        getAllVoterRegData:nextProps.getVotersRegData,
        // getAdminVotingDetails:nextProps.getAdminSetDetails.AdminDetails.AdminDetails,
      };
    }
    return null;
  }
  myFunction = async () => {
    const data = await this.props.downloadAdminDetails.newdownloadAdminDetails(
      this.props.getEmail
    );
    console.log(data);
    if (data) {
      debugger;
      this.props.getLoaderFlag.setLoadingFalg(false);
    }
  };
  initialize = async () => {
    await this.myFunction();
  };
  handleItemClick = (e, { name }) => {
    //

    this.props.activePage.retainState(name);
    // if(name == 'CandidateRequest'){
    //   this.props.history.push('/Adashboard/CandidateReq');
    //     this.setState({ activeItem: true });
    // }else if(name == 'AddVoter'){
    //   this.props.history.push('/Adashboard/AddVoter');
    //     this.setState({ activeItem: true });
    // }
  };

  render() {
    debugger;
    const loadingComp = (
      <div>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      </div>
    );
    const mainContent = (
      <React.Fragment>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                as={Link}
                to="/Adashboard/CandidateReq"
                name="CandidateRequest"
                active={this.props.activeItem === 'CandidateRequest'}
                icon={
                  <AccountGroup
                    color="primary"
                    style={{ position: 'relative', top: 5 }}
                  />
                }
                onClick={this.handleItemClick}
              />

               <Menu.Item as={Link} to='/Adashboard/AddVoter' name='AddVoter' active={this.props.activeItem === 'AddVoter'} icon={<HowToVoteOutlined color='primary' style={{ position: 'relative', top: 4 }} />} onClick={this.handleItemClick} />
              <Menu.Item
                icon={<TimelapseOutlined style={{ position: 'relative', top: 8 }} color='primary' />}
                as={Link}
                to='/Adashboard/VotingSession'
                name='VotingSession'
                active={this.props.activeItem === 'VotingSession'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                icon={<FormatListBulleted style={{ position: 'relative', top: 8 }} color='primary' />}
                as={Link}
                to='/Adashboard/ApprovedCandidate'
                name='ApprovedCandidate'
                active={this.props.activeItem === 'ApprovedCandidate'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                icon={<HowToVote style={{ position: 'relative', top: 8 }} color='primary' />}
                as={Link}
                to='/Adashboard/CandidateVotes'
                name='Candidate Votes'
                active={this.props.activeItem === 'Candidate Votes'}
                onClick={this.handleItemClick}
              />
           
              <Menu.Item
                icon={<SupervisedUserCircle style={{ position: 'relative', top: 8 }} color='primary' />}
                as={Link}
                to='/Adashboard/RegisteredVoters'
                name='RegisteredVoters'
                active={this.props.activeItem === 'RegisteredVoters'}
                onClick={this.handleItemClick}
              /> 
              <Menu.Item
                icon={<HowToRegOutlined style={{ position: 'relative', top: 8 }} color='primary' />}
                as={Link}
                to='/Adashboard/Results'
                name='Results'
                active={this.props.activeItem === 'Results'}
                onClick={this.handleItemClick}
              /> 
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              <AdminSubRoutes
                getVoteCountData={this.state.getVoteCountData}
                getAppCanData={this.state.getAppCanData}
                getCanData={this.state.getCanData}
                getAllVoterRegData={this.state.getAllVoterRegData}
                getAdminVotingDetails={this.state.getAdminVotingDetails}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
    return <div>{this.props.isLoadingFlag ? loadingComp : mainContent}</div>;
  }
}
function mapStateToProps(state) {
  debugger;
  return {
    activeItem: state.sharedReducer.activeItem,
    getEmail: state.authAdminReducer.users.email,
    isLoadingFlag: state.sharedReducer.isLoading,
    CandidateReqData: state.sharedReducer.getCandidateReqData,
    getCountData: state.sharedReducer.getCountData,
    getRegVoterData: state.sharedReducer.getRegisterdVoters,
    adminGetCanReqData: state.getAdminCanReqData,
    getApproveAllCanData:state.getApproveCanData,
    getAllVoteCountData:state.getAllVoteCountData,
    getVotersRegData:state.getVoterRegData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    activePage: bindActionCreators(ShareAction, dispatch),
    downloadAdminDetails: bindActionCreators(adminActions, dispatch),
    downloadCandidateReqData: bindActionCreators(ShareAction, dispatch),
    downloadApprovedCandidate: bindActionCreators(ShareAction, dispatch),
    getLoaderFlag: bindActionCreators(ShareAction, dispatch),
    downloadCountData: bindActionCreators(ShareAction, dispatch),
    downloadAllRegData: bindActionCreators(ShareAction, dispatch),
    adminGetCanReqData: bindActionCreators(adminActions, dispatch),
    getApproveCanGetData:bindActionCreators(adminActions,dispatch),
    getAllCountVoteData:bindActionCreators(adminActions,dispatch),
    getAllVoterRegData : bindActionCreators(adminActions,dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
