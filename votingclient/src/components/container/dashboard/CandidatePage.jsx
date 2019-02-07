import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Feed, Label } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Header, Image, Table } from 'semantic-ui-react';
function mapStateToProps(state) {
  return {

  };
}
const styles = {
  avatar: {
    margin: 10,
  },
};
class CandidatePage extends Component {
  constructor(props) {
    super(props);
    // if(this.props.history.location.pathname === '/dashboard/candidateList')
    //   this.props.changePageState({pageState:'none'}); 
  }
  render() {
    const { classes } = this.props;
    console.log(this.props);
    const userData = this.props.userData;
    const gateData = this.props.getVoteCountData;
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
            {gateData.map((item, index) => (
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
                          <Header.Subheader>{(item._id == this.props.userData.email) ? (
                            <React.Fragment>
                              You
                         <Label circular color={'green'} empty key={'green'} />
                            </React.Fragment>
                          ) : ''}</Header.Subheader>
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

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(CandidatePage));