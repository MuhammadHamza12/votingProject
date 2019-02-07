import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Label, Card, Feed, Button } from 'semantic-ui-react';
import * as timeActions from '../../../Action/TimeActions';
import axios from 'axios';
import config from '../../../config';
function mapStateToProps(state) {
  return {

  };
}

class CastVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgFlag: false,
      userData: {},
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
      isVotingStart: false,
    };
    // if(this.props.history.location.pathname == '/dashboard/votingResults')
    //   this.props.changePageState({pageState:'none'}); 
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    if (nextProps && nextProps.userData && nextProps.userData.isVotingTimeStart) {
      debugger;
      const dateInRequiredFormate = timeActions.gettingDateIntoRequiredFormate(nextProps.userData.votingStartDate);
      const howmanytimetoStartvoting = timeActions.TotalVotingStartTimeInMiliseconds(dateInRequiredFormate, nextProps.userData.votingStartTime);
      const howmanyTimetoFinishVoting = timeActions.TotalVotingEndTimeInMiliseconds(dateInRequiredFormate, nextProps.userData.votingEndTime);
      const getFixedDate = timeActions.getFixedDate(dateInRequiredFormate, nextProps.userData.votingStartTime);
      const getFixedDate2 = timeActions.getFixedDate(dateInRequiredFormate, nextProps.userData.votingEndTime);
      const timeWith12hourFormateStime = timeActions.convert24To12(nextProps.userData.votingStartTime);
      const timeWith12hourFormateEtime = timeActions.convert24To12(nextProps.userData.votingEndTime);
      const Statehours = Math.floor(howmanytimetoStartvoting / (60 * 60 * 1000));
      const Estatehours = Math.floor(howmanyTimetoFinishVoting / (60 * 60 * 1000));
      const getCurrentTime = timeActions.getCurrentTimeInto12hr();
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
        userData: nextProps.userData,
        isVotingStart: nextProps.userData.isVotingTimeStart,
      };
    }
    else if (prevState.userData !== nextProps.userData) {
      debugger;
      return {
        userData: nextProps.userData,
        isVotingStart: nextProps && nextProps.userData && nextProps.userData.isVotingTimeStart,
      };
    }
    return null;
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  MsgFlag = (flag) => {
    if (flag) {
      return (
        <div>
          <Header color='black' as='h3'>Kindly Check Your mail!</Header>
        </div>
      );
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  tick() {
    if (this.state.isVotingStart) {
      debugger;
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
  }
  VotingHasBeenDone = (email) => {
    debugger
    console.log(email);
    axios.post(`${config.localHttp}/api/castVote/Voter`, { email: email })
      .then((success) => {
        this.setState({
          msgFlag: true,
        });
        console.log(success);
      }).catch((error) => {
        console.log(error);
      });
  }
  isVotingStartTime = (flag, hours, hours2, mins2, mins, secs2, secs) => {
    if (flag) {
      return (
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
      );
    } else {
      return (
        <Card centered={true} >
          <Card.Content  >
            <Card.Header style={{ textAlign: 'center' }} >Voting Status</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                      <div>
                        <Feed.Date style={{ fontSize: 20 }} content='Voting Time Has Not Been Started! Yet' />
                      </div>
                      <div style={{ position: 'relative', bottom: 5 }} >
                        <Label circular color={'blue'} empty key={'blue'} />
                      </div>
                    </div>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>


            </Feed>
          </Card.Content>
        </Card>
      )
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
              <Button disabled={this.state.userData.isVoteCasted} color='instagram' onClick={() => this.VotingHasBeenDone(this.state.userData.email)} >Cast Vote Now</Button>
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
              <Header color='olive' as='h4'>Thanks for being a part of this voting!</Header>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      );
    }
  }
  render() {
    const { userData } = this.state;
    const { diff } = this.state;
    const { Ediff } = this.state;
    // const moment = new moment.duration(diff);
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const mins = Math.floor((diff - (hours * 60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((diff - (hours * 60 * 60 * 1000) - (mins * 60 * 1000)) / 1000);

    const hours2 = Math.floor(Ediff / (60 * 60 * 1000));
    const mins2 = Math.floor((Ediff - (hours2 * 60 * 60 * 1000)) / (60 * 1000));
    const secs2 = Math.floor((Ediff - (hours2 * 60 * 60 * 1000) - (mins2 * 60 * 1000)) / 1000);

    debugger;
    return (
      <div>
        <h1>Cast Vote</h1>
        {this.MsgFlag(this.state.msgFlag)}
        {this.isVotingStartTime(this.state.isVotingStart, hours, hours2, mins2, mins, secs2, secs)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(CastVote);