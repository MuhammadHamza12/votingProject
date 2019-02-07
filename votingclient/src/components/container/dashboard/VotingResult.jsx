import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { Card, Feed } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';
import * as sharedAction from '../../../Action/SharedActions/SharedActions';
import  { bindActionCreators } from 'redux';
import { Button , Header } from 'semantic-ui-react';
import * as timeActions from '../../../Action/TimeActions.js';
const styles = {
  avatar: {
    margin: 10,
  },
};

class VotingResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      getResults:null,
      infoMsg:false,
      isDraw : '',
      displayFlag:false,
    }
    // if(this.props.history.location.pathname == '/dashboard/votingResults')
    //   this.props.checkDisplayStatus.changePageState({pageState:'none'}); 
  }
  onHandleClick = () =>{
      const userData = this.props.userData;
      let getVoteCount = this.props.getVoteCountData;
      const dateInRequiredFormate = timeActions.gettingDateIntoRequiredFormate(userData.votingStartDate);
      // const howmanytimetoStartvoting = timeActions.TotalVotingStartTimeInMiliseconds(dateInRequiredFormate, nextProps.userData.votingStartTime);
      // const howmanyTimetoFinishVoting = timeActions.TotalVotingEndTimeInMiliseconds(dateInRequiredFormate, nextProps.userData.votingEndTime);
      const getFixedDate2 = timeActions.getFixedDate(dateInRequiredFormate,userData.votingEndTime);
      const currentDate = (new Date()).getTime();
      // alert(getFixedDate2 - currentDate);
      if(getFixedDate2 < currentDate ){
        debugger;
        var maxVote = Number.MIN_VALUE;
        getVoteCount.forEach(function (item) {
            maxVote = Math.max(maxVote, item.Vote_Count)
        });

       let getFilter = getVoteCount.filter((item,index)=>{
		if(item.Vote_Count == maxVote){
			return item;
		}
	})
  
        console.log(getFilter)
        if(getFilter.length !== 1) {
          this.setState({
            isDraw:'Draw!'
          })
          return;
        }else{
          this.setState({
            getResults:getFilter,
            displayFlag:true,
          })
        }
      }else {
        this.setState({
          getResults:null,
          displayFlag:false,
          infoMsg:true,
        })      
      }
    }
    
    displayMsg = (flag)=>{
      if(flag){
        return(
          <div>
<Header color='blue' as='h3'>Result will displayed when voting time is completed!</Header>
          </div>
        )
      }
    }
    displayWinner = (flag)=>{
      const { classes } = this.props;
      debugger;
      const { getResults } = this.state;
      if(flag){
        return(
          <div style={{textAlign:'center'}} >
             <Card.Group>
          {getResults.map((item, index) => (
            <Card style={{width:'60%'}} key={index} >
              <Card.Content>
                <Card.Header>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ position: 'relative', bottom: 10 }}>
                      <Avatar className={classes.avatar}>{item._id.charAt(0)}</Avatar>
                    </div>
                    <div>
                      {item._id}
                    </div>
                  </div>
                </Card.Header>
                <Button
                  attached='bottom'
                  content='Winner'
                  color='green'
                />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>


          </div>
        )
      }
    }
   
  render() {
    const { classes } = this.props;
    const { displayFlag } = this.state;
    return (
      <div>
        <h1>VotingResult</h1>
        {this.displayMsg(this.state.infoMsg)}
        <Button onClick={this.onHandleClick}  fluid>Press For Results</Button>
        {this.displayWinner(this.state.displayFlag)}

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return{
    checkDisplayStatus:bindActionCreators(sharedAction,dispatch)
  };
}
function mapStateToProps(state) {
  return{
    getPageStatus: state.sharedReducer.pageState,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(VotingResult));