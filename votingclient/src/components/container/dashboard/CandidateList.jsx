import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Feed } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
function mapStateToProps(state) {
  return {

  };
}
const styles = {
  avatar: {
    margin: 10,
  },
};
class CandidateList extends Component {
  constructor(props) {
    super(props);
    // if(this.props.history.location.pathname === '/dashboard/candidateList')
    //   this.props.changePageState({pageState:'none'}); 
  }
  render() {
    const { classes } = this.props;
    console.log(this.props);
    const gateData = this.props.getApproveReq;
    debugger;
    return (
      <div>
        <h1>Candidate List</h1>
        <Card.Group>
          {gateData.map((item, index) => (
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

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(CandidateList));