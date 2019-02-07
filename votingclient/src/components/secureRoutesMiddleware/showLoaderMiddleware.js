import React ,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';


import CircularProgress from '@material-ui/core/CircularProgress';
import * as SharedActions  from '../../Action/SharedActions/SharedActions';

export default function(ComposeComponent){
 class Authenticate extends Component {
      constructor(props) {
          super(props);
          this.state={
              isLoading:false,
          }
            if(this.props.getAdminSetDetails.AdminDetails && this.props.getAdminSetDetails.AdminDetails.AdminDetails && this.props.getAdminSetDetails.AdminDetails.AdminDetails.isVotingTimeStart &&  this.props.location.pathname == '/Adashboard/VotingSession'){
              debugger;
              this.props.history.push('/dashboard');
            }
       this.props.getLoaderFlag.setLoadingFalg(true);           
        }
    renderComponent=()=>{
      debugger;
      if(this.props.isLoadingFlag){
          return(
              <div>
                <div style={{textAlign:'center'}} >
                  <CircularProgress />
                  </div>
              </div>
          );
      }
      else{
        debugger;
        return (
        
            <ComposeComponent {...this.props}  />
        
        );
      }
     }
   
render() {
    return(
        <div>
            {this.renderComponent()}
        </div>
    )
}
}
function mapStateToProps(state) {
    return{
      getAdminSetDetails:state.sharedReducer,
      isLoadingFlag: state.sharedReducer.isLoading,
    };
}
function mapDispatchToProps(dispatch){
  return{
    getLoaderFlag:bindActionCreators(SharedActions,dispatch),
  };
}
return connect(mapStateToProps,mapDispatchToProps)(Authenticate);
}
