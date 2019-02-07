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

class ApprovedCandidate extends Component {
  state = {
    ApproveCandidate: null,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    if (prevState.ApproveCandidate !== nextProps.getAppCanData) {
      debugger;
      return {
        ApproveCandidate: nextProps.getAppCanData,
      };
    }
    return null;
  }
  render() {
    const { classes } = this.props;
    
    const getData = this.props.getAppAppCanData || this.props.getAdminSetDetails.getApprovedCanData || this.props.getAdminSetDetails.AdminDetails.getApprovedCanData;
    const {ApproveCandidate} = this.state ;
    debugger;
    return (
      <div>
        <h1>Approved Candidate</h1>
        <Card.Group>
          {ApproveCandidate && ApproveCandidate.map((item, index) => (
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
    getAppAppCanData: state.sharedReducer.getApprovedCanData,
    getappdata:state.sharedReducer.AdminDetails.getApprovedCanData,
  };
}
export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(ApprovedCandidate));