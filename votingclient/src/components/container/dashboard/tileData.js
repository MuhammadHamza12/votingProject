import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockSharp from '@material-ui/icons/LockSharp';
import LockOpenSharp from '@material-ui/icons/LockOpenSharp';
// import Stop from 'mdi-material-ui/block'
import GroupRounded from '@material-ui/icons/GroupRounded';
import CastVote from '@material-ui/icons/HowToVoteRounded';
import Result from '@material-ui/icons/HdrStrongOutlined';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import LockOpen from '@material-ui/icons/LockOpen';
import { askForPermissioToReceiveNotifications } from './../../../push-notification';
import { Link  } from 'react-router-dom';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import '../../../css/mycss.css';
export class MailFolderListItems extends React.Component {

  render(){
    const { profileFlag1 } = this.props.btnStatus.users;
    debugger;
    return(
      <div>
        <Link to= {profileFlag1 ? '/dashboard/vProfile' : '/dashboard'} >
          <ListItem disabled={profileFlag1} button>
            <ListItemIcon className={profileFlag1 ? 'enableIcon' : 'disabledIcon'}  >
              <AccountCircleRounded />
            </ListItemIcon>
            <ListItemText className={`${profileFlag1} ? 'enableIcon1' : 'disabledIcon1'`} primary="Profile" />
            {!profileFlag1 ? <LockSharp /> : <LockOpenSharp /> }
          </ListItem>
        </Link>
        <Link to='/dashboard/candidateList' >
          <ListItem button>
            <ListItemIcon>
              <GroupRounded />
            </ListItemIcon>
            <ListItemText primary="Candidate List" />
          </ListItem>
        </Link>
        <Link to='/dashboard/castVote' >
          <ListItem button>
            <ListItemIcon>
              <CastVote />
            </ListItemIcon>
            <ListItemText primary="Cast Vote" />
          </ListItem>
        </Link>
        <Link to='/dashboard/votingResults' >
          <ListItem button>
            <ListItemIcon>
              <Result />
            </ListItemIcon>
            <ListItemText primary="Results" />
          </ListItem>
        </Link>
      </div>
    );
  }
} 

export class OtherMailFolderListItems extends React.Component {
  
  render(){
    console.log(this.props);
    console.log(this.props.btnStatus.users.profileFlag);
    // const { profileFlag } = this.props.btnStatus.users;
    let profileFlag = false;
    return(
      <div>
        <ListItem disabled={this.props.btnStatus.users.profileFlag} onClick={askForPermissioToReceiveNotifications}  button>
          <ListItemIcon className={profileFlag ? 'enableIcon' : 'disabledIcon'}  >
            <NotificationImportant />
          </ListItemIcon>
          <ListItemText className={profileFlag ? 'enableIcon' : 'disabledIcon'}  primary="Get Notification?" />
          {profileFlag ?  <LockOpenSharp /> : <LockSharp />  }
        </ListItem>
        <ListItem onClick={() => this.props.logout()} button>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>
    );
  }
}