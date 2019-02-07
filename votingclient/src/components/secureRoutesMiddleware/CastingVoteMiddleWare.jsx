import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from '../../config';

import CircularProgress from '@material-ui/core/CircularProgress';
export default function (ComposeComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };

      if (this.props.auth && !this.props.getUserDetails.isVoteCasted && this.props.location.pathname === '/dashboard/CastVoteNow') {
        debugger;
        const query = window.location.search.substring(1);
        const getToken = query.split('=');
        const realToken = getToken[1];
        if (!realToken) {
          debugger;
          this.props.history.push('/dashboard/castVote');
        }
        debugger;
        if (realToken) {
          debugger;
          axios.post(`${config.localHttp}/api/CheckToken`, { token: realToken })
            .then((res) => {
              this.setState({ isLoading: false });
              console.log('res', res);
            })
            .catch((err) => {
              console.log('err', err.response);
              this.setState({ isLoading: false })
              // this.props.action.flashMessage({ type: 'expireResetOnWill', text: 'This password reset link is no longer valid, Please try again' });
              this.props.history.push('/dashboard/castVote');
            });
        }

      } else if (this.props.auth && this.props.getUserDetails.isVoteCasted && this.props.location.pathname === '/dashboard/CastVoteNow') {
        debugger;
        this.props.history.push('/dashboard/castVote');
      }else if(!this.props.auth){
        this.props.history.push('/login');
      }
      // this.setState({ isLoading: true })

    }
    renderComponent = () => {
      if (this.state.isLoading) {
        return (
          <div>
            <div style={{ textAlign: 'center' }} >
              <CircularProgress />
            </div>
          </div>
        );
      }
      else {
        return (

          <ComposeComponent {...this.props} />

        )
      }
    }

    render() {
      return (
        <div>
          {this.renderComponent()}
        </div>
      )
    }
  }
  function mapStateToProps(state) {
    debugger;
    return {
      auth: state.authUserReducer.isAuth,
      getUserDetails: state.sharedReducer.UserDetails
    };
  }
  return connect(mapStateToProps, null)(Authenticate);
}
