import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Accordion, Button, Card, Image, Popup } from 'semantic-ui-react';
import * as sharedActions from '../../../Action/SharedActions/SharedActions';
import { Header, Icon, Modal } from 'semantic-ui-react';
import config from '../../../config';
import { Form, TextArea } from 'semantic-ui-react'
import {  Feed } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const styles = {
  avatar: {
    margin: 10,
  },
};

class RegisteredCandidate extends Component {
  state = {
    RegisteredVoters: null,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    if (prevState.ApproveCandidate !== nextProps.getAllVoterRegData) {
      debugger;
      return {
        RegisteredVoters: nextProps.getAllVoterRegData,
      };
    }
    return null;
  }
  render() {
    const { classes } = this.props;
    
    const getData = this.props.getRegVoterData || this.props.getAdminSetDetails.getRegisterdVoters || this.props.getAdminSetDetails.AdminDetails.getRegisterdVoters;
    const {RegisteredVoters} = this.state;
    debugger;
    return (
      <div>
        <h1>Registerd Candidate</h1>
        <Card.Group>
           {RegisteredVoters && RegisteredVoters.map((item, index) => (
            <Card key={index} >
              <Card.Content>
                <Card.Header>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ position: 'relative', bottom: 10 }}>
                      <Avatar className={classes.avatar}>{item.name.charAt(0)}</Avatar>
                    </div>
                    <div>
                      {item.name}
                    </div>
                  </div>
                </Card.Header>
                <Card.Meta>{item.email}</Card.Meta>
                <Card.Meta>{item.voterProfession}</Card.Meta>
                <Card.Meta>{item.gender}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}
function mapStateToProps(state) {
  debugger;
  return {
    getRegVoterData: state.sharedReducer.getRegisterdVoters,
    getappdata:state.sharedReducer.AdminDetails.getApprovedCanData,
  };
}
export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(RegisteredCandidate));