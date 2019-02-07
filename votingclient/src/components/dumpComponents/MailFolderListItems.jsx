import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GroupRounded from '@material-ui/icons/GroupRounded';
import CastVote from '@material-ui/icons/HowToVoteRounded';
import Result from '@material-ui/icons/HdrStrongOutlined';
import { Link } from 'react-router-dom';
import AccountBoxSharp from '@material-ui/icons/AccountBoxSharp';
import '../../css/newcss.css';
import CommentQuestion from 'mdi-material-ui/CommentQuestion';
import ClockEnd from 'mdi-material-ui/ClockEnd';
import Group from 'mdi-material-ui/Group';
import FaceProfile from 'mdi-material-ui/FaceProfile';
export default function MailFolderListItems(props) {
  return (
    <div>
      <div>
        {props.tooltip(<Link to='/dashboard/vProfile'>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxSharp />
            </ListItemIcon>
          </ListItem>
        </Link>, 'right',
        <React.Fragment>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
                Profile
            </div>
            <div>
              <FaceProfile style={{ fontSize: 30 }} color='secondary' />
            </div>
          </div>
        </React.Fragment>
        )}
      </div>
      {props.tooltip(<Link to={'/dashboard/candidateList'} >
        <ListItem button>
          <ListItemIcon>
            <GroupRounded />
          </ListItemIcon>
        </ListItem>
      </Link>, 'right',
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
              Candidate List
          </div>
          <div>
            <Group style={{ fontSize: 30 }} color='secondary' />
          </div>
        </div>
      </React.Fragment>
      )}
      {props.tooltip(<Link to={'/dashboard/castVote'} >
        <ListItem button>
          <ListItemIcon>
            <CastVote />
          </ListItemIcon>
        </ListItem>
      </Link>, 'right',
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
          Cast Vote
          </div>
          <div>
            <CastVote style={{ fontSize: 30 }} color='secondary' />
          </div>
        </div>
      </React.Fragment>
      )}
      {props.tooltip(<Link to={'/dashboard/votingResults'} >
        <ListItem button>
          <ListItemIcon >
            <Result />
          </ListItemIcon>
        </ListItem>
      </Link>, 'right',
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
          Results
          </div>
          <div>
            <ClockEnd style={{ fontSize: 30 }} color='secondary' />
          </div>
        </div>
      </React.Fragment>
      )}
      
      {props.tooltip(<Link to={'/dashboard'} >
        <ListItem button>
          <ListItemIcon>
            <CommentQuestion />
          </ListItemIcon>
        </ListItem>
      </Link>, 'right',
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ position: 'relative', top: 10, fontSize: 20 }} >
          How to Cast Vote
          </div>
          <div>
            <CommentQuestion style={{ fontSize: 30 }} color='secondary' />
          </div>
        </div>
      </React.Fragment>
      )}     
    </div>
  );
}

