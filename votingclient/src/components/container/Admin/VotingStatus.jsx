import React, { Component } from 'react';
import _ from 'lodash';
import config from '../../../config';

import { Label } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import DisplayVotingTime from './DisplayVotingTime.jsx';
import * as timeActions from '../../../Action/TimeActions';
import { Card, Feed, Button } from 'semantic-ui-react';
class VotingStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VotingDetails: {},
      diff: null,
      Ediff: null,
      fixedDate: null,
      fixedDate2: null,
      STime: '',
      ETime: '',
      SDate: '',
      Ctime: '',
      SstateHours: null,
      EstateHours: null,
      RemainFlag: true,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps && nextProps.getAdminSetDetails && nextProps.getAdminSetDetails.votingStartDate) {
      const dateInRequiredFormate = timeActions.gettingDateIntoRequiredFormate(nextProps.getAdminSetDetails.votingStartDate);
      const howmanytimetoStartvoting = timeActions.TotalVotingStartTimeInMiliseconds(dateInRequiredFormate, nextProps.getAdminSetDetails.votingStartTime);
      const howmanyTimetoFinishVoting = timeActions.TotalVotingEndTimeInMiliseconds(dateInRequiredFormate, nextProps.getAdminSetDetails.votingEndTime);
      const getFixedDate = timeActions.getFixedDate(dateInRequiredFormate, nextProps.getAdminSetDetails.votingStartTime);
      const getFixedDate2 = timeActions.getFixedDate(dateInRequiredFormate, nextProps.getAdminSetDetails.votingEndTime);
      const timeWith12hourFormateStime = timeActions.convert24To12(nextProps.getAdminSetDetails.votingStartTime);
      const timeWith12hourFormateEtime = timeActions.convert24To12(nextProps.getAdminSetDetails.votingEndTime);
      const Statehours = Math.floor(howmanytimetoStartvoting / (60 * 60 * 1000));
      const Estatehours = Math.floor(howmanyTimetoFinishVoting / (60 * 60 * 1000));
      //   const getCurrentDate = timeActions.gettingDateIntoRequiredFormate(timeActions.getCurrentDate());
      //   const getInArray = getCurrentDate.split('-');
      //   const desireCurrentDate = `${getInArray[0]}-${getInArray[2]}-${getInArray[1]}`;
      const getCurrentTime = timeActions.getCurrentTimeInto12hr();
      //   const getTotalStartTimeMiliseconds = timeActions.TotalVotingTimeInMiliseconds(dateInRequiredFormate,nextProps.getAdminSetDetails.votingStartTime,nextProps.getAdminSetDetails.votingEndTime);
      //   const VotingDetails={
      //     cDate : desireCurrentDate,
      //     vData:dateInRequiredFormate,
      //     stime:timeWith12hourFormateStime,
      //     etime:timeWith12hourFormateEtime,
      //     diff:parseInt(getTotalMiliseconds), 
      //     cTime:getCurrentTime,
      //     REtime:nextProps.getAdminSetDetails.votingEndTime,
      //     RStime:nextProps.getAdminSetDetails.votingStartTime,
      //   };
      return {
        VotingDetails: nextProps.getAdminSetDetails,
        diff: howmanytimetoStartvoting,
        Ediff: howmanyTimetoFinishVoting,
        fixedDate: getFixedDate,
        fixedDate2: getFixedDate2,
        STime: timeWith12hourFormateStime,
        ETime: timeWith12hourFormateEtime,
        SDate: dateInRequiredFormate,
        CTime: getCurrentTime,
        SstateHours: Statehours,
        EstateHours: Estatehours,
      };
    }
    return null;
  }
  VotingHasBeenDone = () => {
    axios.post(`${config.localHttp}/sendConfirmation/api`, { flag: false })
      .then((response) => {
        console.log(response);
        this.props.history.push('/Adashboard/VotingSession');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    if (!(this.state.SstateHours < 0)) {
      this.setState((prevState, props) => ({
        diff: prevState.fixedDate - (new Date()).getTime(),
      }));
    } else {
      this.setState((prevState, props) => ({
        Ediff: prevState.fixedDate2 - (new Date()).getTime(),
      }));
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  displayComponent = (enterSecond) => {
    if (enterSecond == 5) {
      return (
        <div>
          time is over
        </div>
      );
    }
  }
  displayRemainTimeInStartVoting = (flag, hours, hours2, mins2, mins, secs2, secs) => {
    if (!(hours < 0)) {
      debugger;
      return (
        <Feed.Event style={{ textAlign: 'center' }} >
          <Feed.Content>
            <div style={{ display: 'flex', flexDirection: 'row' }} >
              <div>
                <Feed.Date content='Remaining Time To Start Voting!' />
              </div>
              <div style={{ position: 'relative', bottom: 5 }} >
                <Label circular color={'yellow'} empty key={'yellow'} />
              </div>
            </div>
            <Feed.Summary>
              <h1>Remaining Time: {hours}:{mins}:{secs}</h1>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      );
    }
    else if (!(hours2 < 0)) {
      return (
        <Feed.Event style={{ textAlign: 'center' }} >
          <Feed.Content>
            <div style={{ display: 'flex', flexDirection: 'row' }} >
              <div>
                <Feed.Date content='Voting Time Has Been Started!' />
              </div>
              <div style={{ position: 'relative', bottom: 5 }} >
                <Label circular color={'green'} empty key={'green'} />
              </div>
            </div>
            <Feed.Summary>
              <h1>Remaining Time: {hours2}:{mins2}:{secs2}</h1>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      );
    } else {
      return (
        <Feed.Event style={{ textAlign: 'center' }} >
          <Feed.Content>
            <div style={{ display: 'flex', flexDirection: 'row' }} >
              <div>
                <Feed.Date content='Voting Time Has Been Finished!' />
              </div>
              <div style={{ position: 'relative', bottom: 5 }} >
                <Label circular color={'grey'} empty key={'grey'} />
              </div>
            </div>
            <Feed.Summary>
              <Button primary onClick={this.VotingHasBeenDone} >Done</Button>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      );
    }
    // else if ((timeActions.comparisonOfTwoTimeString(this.state.Ctime, this.state.STime))) {
    //   if ((hours < 0) || timeActions.comparisonOfTwoTimeString(this.state.Ctime, this.state.STime)  ) {
    //     debugger;
    //     return (
    //       <Feed.Event style={{ textAlign: 'center' }} >
    //         <Feed.Content>
    //           <Feed.Date content='Voting Has been Started!' />
    //           <Label circular color={'green'} empty key={'green'} />
    //           <Feed.Summary>
    //             <h1>Remaining Time: {'54'}:{'45'}:{'4'}</h1>
    //           </Feed.Summary>
    //         </Feed.Content>
    //       </Feed.Event>
    //     );
    //   }
    // }
  }


  render() {
    const { diff } = this.state;
    const { Ediff } = this.state;
    // const moment = new moment.duration(diff);
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const mins = Math.floor((diff - (hours * 60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((diff - (hours * 60 * 60 * 1000) - (mins * 60 * 1000)) / 1000);

    const hours2 = Math.floor(Ediff / (60 * 60 * 1000));
    const mins2 = Math.floor((Ediff - (hours2 * 60 * 60 * 1000)) / (60 * 1000));
    const secs2 = Math.floor((Ediff - (hours2 * 60 * 60 * 1000) - (mins2 * 60 * 1000)) / 1000);

    console.log('next props state', this.state);
    debugger;
    return (
      <div>
        <Card centered={true} >
          <Card.Content  >
            <Card.Header style={{ textAlign: 'center' }} >Voting Status</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Voting Start Date: <a>{this.state.SDate}</a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Voting Start Time: <a>{this.state.STime}</a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Voting End Time: <a>{this.state.ETime}</a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              {this.displayRemainTimeInStartVoting(this.state.RemainFlag, hours, hours2, mins2, mins, secs2, secs)}
            </Feed>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  debugger;
  return {
    getAdminSetDetails: state.sharedReducer && state.sharedReducer.AdminDetails && state.sharedReducer.AdminDetails.AdminDetails,
  };
}
export default connect(mapStateToProps, null)(VotingStatus);