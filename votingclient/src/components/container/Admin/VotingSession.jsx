import React, { Component } from 'react';
import { Grid, Segment , Button } from 'semantic-ui-react';
import { TimerRounded } from '@material-ui/icons';
import Validator from '../../formValidator/registrationValidator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import DisplayVotingTime from './DisplayVotingTime.jsx';
// import Grid from '@material-ui/core/Grid';
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
import config from '../../../config';
import * as SharedActions  from '../../../Action/SharedActions/SharedActions';


class VotingSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time2: '',
      time: '',
      dateTime: '',
      errors: {},
      isLoading: false,
    };
  }
  setErrorInFeild = (errorText, flag) => {
    if (flag) {
      return (
        <div style={{ color: 'red' }} >
          {errorText}
        </div>
      );
    }
  }

  isValid = () => {
    const { errors, isValid } = Validator(this.state, 'votingSessionForm');
    console.log(errors);
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    return isValid;
  }

  SetInARow = (element, text) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <div style={{ textAlign: 'right' }} >
          <h4>{text}</h4>
        </div>
        <div>
          {element}
        </div>
      </div>
    );
  }
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }
  onHandleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      console.log(this.state);
      axios.post(`${config.localHttp}/api/setVoting/Time`,this.state)
        .then((res)=>{
          this.setState({
            isLoading:false,
          });
          this.props.setFlag.setVotingflag(res.data);
          this.props.history.push('/Adashboard/VotingStatus');  
          console.log('response',res);
        })
        .catch((err)=>{
          console.log('err',err);
        });
    }else{
      console.log(this.state);
    }
  }
  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div>
                  <TimerRounded style={{ fontSize: 40 }} color='secondary' fontSize='default' />
                </div>
                <div style={{ position: 'relative', top: 3 }} >
                  <h3>
                    SET VOTING TIME
                  </h3>
                </div>
              </div>
              <form onSubmit={this.onHandleSubmit} >
                <Grid centered={true} >
                  <Grid.Row mobile={16} tablet={8} computer={4}>
                    <DateInput
                      name="date"
                      placeholder="Set Voting Date"
                      value={this.state.date}
                      iconPosition="left"
                      onChange={this.handleChange}
                    />
                    {this.setErrorInFeild('Date is Required',this.state.errors.date)}
                  </Grid.Row>
                  <Grid.Row mobile={16} tablet={8} computer={4}>
                    <TimeInput
                      name="time"
                      timeFormat='24'
                      placeholder="Set Voting Start Time"
                      value={this.state.time}
                      iconPosition="left"
                      onChange={this.handleChange}
                    />
                    
                    {this.setErrorInFeild('Time is Required',this.state.errors.time)}
                  </Grid.Row>
                  <Grid.Row mobile={16} tablet={8} computer={4}>
                    <TimeInput
                      inlineLabel={true}
                      timeFormat='24'
                      name="time2"
                      placeholder="Set Voting End Time"
                      value={this.state.time2}
                      iconPosition="left"
                      onChange={this.handleChange}
                    />
                    {this.setErrorInFeild('Time is Required',this.state.errors.time2)}
                  </Grid.Row>
                  <Button type='submit' secondary>
                    Confirm
                  </Button>
                </Grid>

              </form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch){
  return{
    setFlag:bindActionCreators(SharedActions,dispatch),
  };
}
export default connect(null,mapDispatchToProps)(VotingSession);