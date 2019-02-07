import React, { Component } from 'react';
import { Card, Feed, Icon } from 'semantic-ui-react';
import moment from 'moment';
import * as timeActions from '../../../Action/TimeActions';

export default class DisplayVotingTime extends Component {
  constructor(props) {
    super(props);
    // let fixedDate = moment(`${props.getState.VotingDetails.vData} ${props.getState.VotingDetails.REtime}`);
    // let fixedDate3 = moment(`${props.getState.VotingDetails.vData} ${props.getState.VotingDetails.RStime}`);
    // let currentDate = new Date().getTime() + 1000 * 60 * 60 * 24;
    // let differ = currentDate - new Date().getTime();
    // debugger;
    // const fixedDate2 = new Date(fixedDate.toDate());
    // const fixedDate4 = new Date(fixedDate3.toDate());
    // let currentDateplusoneday = currentDate;
    this.state = {
      vDate:props.getState.VotingDetails.vData,
      sTime:props.getState.VotingDetails.stime,
      eTime:props.getState.VotingDetails.etime,
      // fixedDate2,
      // fixedDate4,
      // currentDateplusoneday,
      diff: props.getState.VotingDetails.diff,
      // differ,
    };
  }
  tick() {
    debugger;
    this.setState((prevState, props) => ({
      // differ: prevState.currentDateplusoneday - (new Date()).getTime(),
    }));
  }
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }
  renderRemainingTime = () => {
    // const { differ } = this.state;
    // const hours = Math.floor(differ / (60 * 60 * 1000));
    // const mins = Math.floor((differ - (hours * 60 * 60 * 1000)) / (60 * 1000));
    // const secs = Math.floor((differ - (hours * 60 * 60 * 1000) - (mins * 60 * 1000)) / 1000);
    if ('2019-01-07' === this.props.getState.VotingDetails.cDate) {
      if (timeActions.comparisonOfTwoTimeString('12:40 AM', '12:44 AM')) {
        return (
          <h2>Waktu tersisa </h2>
        );
      }
    }
  }
  render() {
    const { differ } = this.state;
    const hours = Math.floor(differ / (60 * 60 * 1000));
    const mins = Math.floor((differ - (hours * 60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((differ - (hours * 60 * 60 * 1000) - (mins * 60 * 1000)) / 1000);
    debugger;
    return (
      <div>
        <Card centered={true} >
          <Card.Content>
                <Icon name='times rectangle' size='mini' />
            <Card.Header>Voting Status</Card.Header>
            {this.renderRemainingTime()}
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                   Voting Start Date: <a>{this.state.vDate}</a> 
            </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                  Voting Start Time: <a>{this.state.sTime}</a>
            </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                  Voting End Time: <a>{this.state.eTime}</a>
            </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
