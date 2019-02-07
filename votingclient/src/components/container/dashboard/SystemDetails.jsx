import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sharedAction from '../../../Action/SharedActions/SharedActions';

class SystemDetails extends Component {
  constructor(props) {
    super(props);

    // if(this.props.history.location.pathname === '/dashboard')
    //   this.props.checkDisplayStatus.changePageState({pageState:'block'}); 
  }

  render() {
    return (
      <div>
        <h1>How To Cast Vote</h1>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    checkDisplayStatus: bindActionCreators(sharedAction, dispatch),
  };
}
function mapStateToProps(state) {
  return {
    getPageStatus: state.sharedReducer.pageState,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SystemDetails);