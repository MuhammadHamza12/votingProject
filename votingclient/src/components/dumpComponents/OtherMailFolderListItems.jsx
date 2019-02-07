
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import LockOpen from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import '../../css/mycss.css';
import Logout from 'mdi-material-ui/Logout';
export default function OtherMailFolderListItems(props) {
  const CandidatePage = (flag) => {
    if (flag) {
      return (
        <React.Fragment>
          {props.tooltip(
            <Link to='/dashboard/candidatePage'>
              <ListItem button>
                <ListItemIcon >
                  <StarBorderOutlined color='secondary' />
                </ListItemIcon>
                <ListItemText primary="Candidate Section" />
              </ListItem>
            </Link>
            , 'right',
            <React.Fragment>
              <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
                  Candidate Section
                </div>
                <div>
                  <StarBorderOutlined style={{ fontSize: 30 }} color='secondary' />
                </div>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  };
  console.log('comes from othermail', props);
  debugger;
  return (
    <div>
      {CandidatePage(props.userData && props.userData.ApplyAsCandidate ? true : false)}
      {props.tooltip(
        <ListItem onClick={() => props.logout()} button>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        , 'right',
        <React.Fragment>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
              Logout ?
            </div>
            <div>
              <Logout style={{ fontSize: 30 }} color='secondary' />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}