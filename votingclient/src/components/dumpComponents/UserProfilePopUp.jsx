import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Logout from 'mdi-material-ui/Logout';
import PropTypes from 'prop-types';

function UserProfilePopUp(props) {
  console.log(props);

  
  return(
    <React.Fragment>
      <Button onClick={props.logout} variant="outlined" size="small" style={{color:'white'}} >
        <Logout />
           Logout
      </Button>
    </React.Fragment>
  );
}
UserProfilePopUp.propTypes = {
  voteCasted:PropTypes.bool,
  votingTime:PropTypes.number,
  logout:PropTypes.func.isRequired,
};
export default UserProfilePopUp;