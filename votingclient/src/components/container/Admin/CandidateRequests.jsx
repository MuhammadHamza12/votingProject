import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Accordion, Button, Card, Image, Popup } from 'semantic-ui-react';
import * as sharedActions from '../../../Action/SharedActions/SharedActions';
import { Header, Icon, Modal } from 'semantic-ui-react';
import config from '../../../config';
import { Form, TextArea } from 'semantic-ui-react'
import Validator from 'validator';

import axios from 'axios';
class CandidateRequest extends Component {
  state = {
    getCanReqData: null,
    emailText: '',
    errors: {},
    modalOpen: false,
    flagError: false,
    flagSuccess: false,
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  onTextChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    if (prevState.getCanReqData !== nextProps.getCanData) {
      debugger;
      return {
        getCanReqData: nextProps.getCanData,
      };
    }
    return null;
  }
 
  deleteOBJAndSendDataToServer = (OBJ, emailText) => {
    axios.post(`${config.localHttp}/api/CandidateReqAccept/data`, { data: OBJ })
      .then((result) => {
        debugger;
        console.log(result);
        if (result && result.data && result.data.status) {

          this.deleteOBJDECLINE(OBJ);
          this.setState({
            flagError: false,
            flagSuccess: true,
          });
        }
      })
      .catch((error) => {
        debugger;
        console.log(error.message);
        if (error && error.response && error.response.data && error.response.data.errors && error.response.data.errors.message) {
          this.setState({
            flagError: true,
          });
        }
      });
  }
  displayNameFirstName = (getName) => {
    if (getName) {
      return (
        <React.Fragment>
          {getName.charAt(0)}
        </React.Fragment>
      );
    }
  }
  deleteOBJDECLINE = (id) => {
    this.props.getDeleteMethod.deleteProvidedIdPendCandidateOBJ(id);
  }
  onHandleSubmit = (e) => {
    if (!Validator.isEmpty(this.state.emailText)) {
      // console.log(this.state.emailText, e);
      const OBject = { ...e };
      OBject.emailText = this.state.emailText;
      console.log('real obj', OBject);

      this.props.getDeleteMethod.deleteProvidedIdPendCandidateOBJ(OBject);
      this.setState({
        modalOpen: false,
        emailText: '',
        flagError: false,
      });


    } else {
      debugger;
      this.setState({
        errors: {
          emailText: true
        }
      });
    }


    // this.props.getDeleteMethod.deleteProvidedIdPendCandidateOBJ(id);
  }
  displayError = (flag) => {
    if (flag) {
      return (
        <div style={{ color: 'red' }} >
          outsiders are not allowed!
        </div>
      );
    }
  }
  displaySuccess = (flag) => {
    if (flag) {
      return (
        <div style={{ color: 'blue' }} >
          Candidate approved Successfully!
        </div>
      );
    }
  }
  render() {
    const { getCanReqData } = this.state;
    const getGetdata = this.props && this.props.getAdminSetDetails && this.props.getAdminSetDetails.getCandidateReqData;
    const getData = this.props.getCanReqData || this.props.getCanData || this.props.getAdminSetDetails.getCandidateReqData;

    debugger;
    const { flagError, flagSuccess } = this.state;
    return (
      <div>
        <h1>Candidate Requests</h1>
        {this.displayError(flagError)}
        {this.displaySuccess(flagSuccess)}
        <Card.Group>
           {getCanReqData && getCanReqData.map((item, index) => (
            <Card key={index}>
              <Card.Content>
                <Card.Header>{item.firstname}</Card.Header>
                <Card.Meta>{item.voterProfession}</Card.Meta>
                <Card.Description>
                  {item.firstname} wants to add to the group of <strong>Voting Candidate</strong>
                </Card.Description>
                <Card.Meta>Email-Address:<strong>{item.email}</strong></Card.Meta>
                <Card.Meta>FirstName:<strong>{item.firstname}</strong></Card.Meta>
                <Card.Meta>Last Name:<strong>{item.lastname}</strong></Card.Meta>
                <Card.Meta>Gender:<strong>{item.gender}</strong></Card.Meta>
                <Card.Meta>Nationality:<strong>{item.nationality}</strong></Card.Meta>
                <Card.Meta>Date of Birth:<strong>{item.DateOfBirth}</strong></Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button onClick={() => this.deleteOBJAndSendDataToServer(item)} basic color='green'>
                    Approve
                  </Button>
                  <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    trigger={<Button onClick={this.handleOpen} basic color='red' >Decline</Button>} basic color='red' size='small'>
                    <Header icon='archive' content='Email With' />
                    <Modal.Content>
                      <Form>
                        {(this.state.errors.emailText) ? (<div style={{ color: 'red' }} >feild Required</div>) : null}
                        <TextArea onChange={this.onTextChange} value={this.state.emailText} name='emailText' placeholder='Tell us more' />
                        <Button onClick={() => this.onHandleSubmit(item)} type='submit' basic color='red' inverted>
                          <Icon name='remove' color='red' /> Done
                      </Button>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                    </Modal.Actions>
                  </Modal>
                </div>
              </Card.Content>
            </Card>
          ))} 
        </Card.Group>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getDeleteMethod: bindActionCreators(sharedActions, dispatch),
    downloadallCanReqData: bindActionCreators(sharedActions, dispatch)
  };
}
function mapStateToProps(state) {
  debugger;
  return {
    getCanReqData: state.sharedReducer && state.sharedReducer.AdminDetails && state.sharedReducer.AdminDetails.getCandidateReqData,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CandidateRequest);