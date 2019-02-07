import React, { Component } from 'react';
import { Form, Grid, Image, Segment, Input, Icon, Button } from 'semantic-ui-react';
import validator from '../../formValidator/registrationValidator';
import axios from 'axios';
import config from '../../../config';
import { Header } from 'semantic-ui-react';
class AddVoter extends Component {
  state = {
    email: '',
    errors: {},
    isLoading: false,
    dispFlag: false,
  }
  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  isValid = () => {
    const { errors, isValid } = validator(this.state, 'addVoter');
    console.log(errors);
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    return isValid;
  }
  displayMsg = (displayMsg) => {
    if (displayMsg) {
      return (
        <div onMouseDown={this.onHoverHide} >
          <Header as='h6'>Voter Has Been Successfully Added!</Header>
        </div>
      );
    }
  }
  onhandleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      console.log(this.state.email);
      this.setState({
        isLoading: true,
      });
      axios.post(`${config.localHttp}/addvoter/api`, { email: this.state.email })
        .then((success) => {
          console.log(success);
          if (success && success.data && success.data.error && success.data.error.errors && success.data.error.errors.email) {
            debugger;
            this.setState({
              isLoading: false,
              errors: {
                serverErrors: true,
              },
            });
          } else if (success && success.data && success.status) {
            debugger;
            this.setState({
              isLoading: false,
              errors: {
                successError: true,
                email:'',
              },
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    }
  }
  onHoverHide = () => {
    this.setState({
      dispFlag: false,
    });
  }
  emailMustbeUnique = (flag) => {
    if (flag) {
      return (
        <div>
          <Header color='red' as='h3'>Sorry, Voter Exist!</Header>
        </div>
      );
    }
  }
  SuccessMSg = (flag) => {
    if (flag) {
      return (
        <div>
          <Header color='green' as='h3'> Voter Has Been Successfully Added!</Header>
        </div>
      );
    }
  }
  feildrequired = (flag) => {
    if (flag) {
      return (
        <div>
          <Header color='red' as='h3'>Feild Required!</Header>
        </div>
      );
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Grid stackable columns={1}>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column  >
            <Header as='h2' icon textAlign='center'>
              <Icon name='users' circular />
              <Header.Content>Add Voters</Header.Content>
            </Header>
            {this.emailMustbeUnique(errors.serverErrors)}
            {this.feildrequired(errors.email)}
            {this.SuccessMSg(errors.successError)}
            <Form onSubmit={this.onhandleSubmit}>
              <Segment style={{ textAlign: 'center' }} >
                <Input error={errors.email} style={{ width: '60%' }} iconPosition='left' placeholder='Add-Email'>
                  <Icon name='at' />
                  <input name='email' type='email' onChange={this.onTextChange} style={{ width: '80%' }} />
                </Input>

                <Button loading={this.state.isLoading} primary >Add</Button>
              </Segment>
            </Form>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddVoter;