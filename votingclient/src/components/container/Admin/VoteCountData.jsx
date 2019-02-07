import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Feed, Label } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Header, Image, Table } from 'semantic-ui-react';

const styles = {
  avatar: {
    margin: 10,
  },
};
class VoteCountData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setVoteCount: null,
    };
    // if(this.props.history.location.pathname === '/dashboard/candidateList')
    //   this.props.changePageState({pageState:'none'}); 
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger;
    if (prevState.setVoteCount !== nextProps.getVoteCountData) {
      debugger;
      return {
        setVoteCount: nextProps.getVoteCountData,
      };
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    const { setVoteCount } = this.state;
    const gateData =this.props.getCountData || this.props.getAdminSetDetails.getCountData || this.props.getAdminSetDetails.AdminDetails.getCountData;
    debugger;
    return (
      <div>
        <h1>Candidate Page</h1>
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Candidate</Table.HeaderCell>
              <Table.HeaderCell>Votes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {setVoteCount && setVoteCount.map((item, index) => (
              <Table.Row key={index} >
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div>
                          <Avatar className={classes.avatar}>{item._id.charAt(0)}</Avatar>
                        </div>
                        <div style={{ position: 'relative', top: 15 }} >
                          {item._id}
                          {/* <Header.Subheader>{(item._id == this.props.userData.email) ? (
                            <React.Fragment>
                              You
                         <Label circular color={'green'} empty key={'green'} />
                            </React.Fragment>
                          ) : ''}</Header.Subheader> */}
                        </div>
                      </div>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{item.Vote_Count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  debugger;
  return {
    getCountData: state.sharedReducer.getCountData,
    getappdata:state.sharedReducer.AdminDetails.getApprovedCanData,
  };
}
export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(VoteCountData));