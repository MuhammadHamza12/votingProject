import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import '../../../css/fonts.css';
import SubRoutes from '../../../routes/SubRoutes.jsx';
import Drawer from '@material-ui/core/Drawer';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import config from '../../../config';

import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UserProfilePopUp from '../../dumpComponents/UserProfilePopUp.jsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dashboardicon from '@material-ui/icons/DashboardOutlined';
import OtherMailFolderListItems from '../../dumpComponents/OtherMailFolderListItems.jsx';
import MailFolderListItems from '../../dumpComponents/MailFolderListItems.jsx';
import img from '../../../images/drawing34.png';
import { bindActionCreators } from 'redux';
import * as sharedAction from '../../../Action/SharedActions/SharedActions';

import { LoginActions } from '../../../Action';
import * as GetCanData from '../../../Action/GET_CAN_DATA/GetCanDataActions';

import { connect } from 'react-redux';

const drawerWidth = 240;
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}
const styles = (theme) => ({
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrowPopper: arrowGenerator(theme.palette.grey[700]),
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapPopper: arrowGenerator(theme.palette.common.black),
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
  },
  bootstrapPlacementLeft: {
    margin: '0 8px',
  },
  bootstrapPlacementRight: {
    margin: '0 8px',
  },
  bootstrapPlacementTop: {
    margin: '8px 0',
  },
  bootstrapPlacementBottom: {
    margin: '8px 0',
  },
  root: {
    flexGrow: 1,
    height: '100hv',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('user details', props.getUserDetails);
    this.state = {
      open: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
      userData: {},
      getApproveCanReq: null,
      getVoteCountData: null,
      tempURL: null,
      arrowRef: null,
    };
  }
  handleArrowRef = (node) => {
    this.setState({
      arrowRef: node,
    });
  };
  isEmptyOBJ = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  componentDidMount() {
    this.props.downloadUserDetails(this.props.getEmail);
    this.props.getApproData.getAllCanReqData(`${config.localHttp}/api/approved/Candidate`)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error);
      });
    this.props.downloadVoteCount.getAllVoteCount(`${config.localHttp}/api/getCountVote`)
      .then((result) => {
        debugger;
        console.log(result)
      }).catch((error) => {
        console.log(error);
      });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    debugger
    if (prevState.userData !== nextProps.getUserDetails) {
      debugger;
      return {
        userData: nextProps.getUserDetails,
        getApproveCanReq: nextProps.getApprovedCandidate,
        getVoteCountData: nextProps.getVoteCountData
      };
    }
    return null;
  }
  changePageState = (pagePath) => {
    if (this.props.match.path === pagePath)
      return 'none';
    else
      return 'block';
  }
  toolTip = (comp, position = 'right', displayComp) => {
    const { classes } = this.props;
    return (
      <Tooltip
        placement={position}
        title={
          <React.Fragment>
            {displayComp}
            <span className={classes.arrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }
        classes={{ popper: classes.arrowPopper }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
      >
        {comp}
      </Tooltip>
    );
  }
  getProfileTemURL = (dataURL) => {
    console.log('tem URLDAta', dataURL);
    this.setState({
      tempURL: dataURL,
    });

  }
  onChangeHanlder(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  getAvatarName = (name, Loader) => {

    if (name === 'Loading' || name === 'undefined' || name == null) {
      return Loader;
    } else {
      return name.charAt(0);
    }
  }
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleDrawerUnique = () => {
    this.props.toggleBtn();
  }
  render() {
    const { classes, theme } = this.props;
    const { profileFlag } = this.props.getProfileInfo.users;
    const name = (this.state && this.state.userData && this.state.userData.name) ? this.state.userData.name : 'Loading';

    const { voteCasted, votingTime } = this.props.getProfileInfo.users;
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              // onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <div>

                <img src={img} width='65%' height='15%' alt="#logo" />
              </div>
            </IconButton>
            <Grid container spacing={24}>
              <Grid item xs={7}>
                <Typography variant='display1' color="inherit" noWrap>
                  <Dashboardicon />
                  Dashboard
                </Typography>
              </Grid>
              <Grid item xs={3}>
              </Grid>
              <Grid item xs={2} >
                <IconButton
                  // aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  // onClick={this.handleMenu}
                  color="inherit"
                >
                  <Tooltip
                    leaveDelay={2000}
                    title={
                      <React.Fragment>
                        <UserProfilePopUp userData={this.state.userData} logout={this.props.logout} voteCasted={voteCasted} votingTime={votingTime} />
                        <span className={classes.arrow} ref={this.handleArrowRef} />
                      </React.Fragment>
                    }
                    classes={{ popper: classes.arrowPopper }}
                    PopperProps={{
                      popperOptions: {
                        modifiers: {
                          arrow: {
                            enabled: Boolean(this.state.arrowRef),
                            element: this.state.arrowRef,
                          },
                        },
                      },
                    }}
                  >
                    <Avatar className={classes.orangeAvatar}>{this.getAvatarName(name, <CircularProgress />)}</Avatar>
                  </Tooltip>
                </IconButton>

              </Grid>
            </Grid>
            {/* <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}  >
              <div>
                <Typography variant='display1' color="inherit" noWrap>
                  <Dashboardicon />
              Dashboard
                </Typography>
              </div>
              <div style={{marginLeft:'auto'}} >
                <IconButton
                // aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  // onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
            
              </div>
            </div> */}

            {/* {renderMenu} */}
            {/* {renderMobileMenu} */}


          </Toolbar>

        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
        // open={this.state.open}
        >
          <div style={{ backgroundColor: '#3F51B5' }} className={classes.toolbar}>
            <div style={{ textAlign: 'left' }} >
              <img src={img} width='65%' height='20%' alt="#logo" />
            </div>
            <div className='fontclass' style={{ color: 'white', fontStyle: 'bold' }} >
              Smart Voting System
            </div>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{<MailFolderListItems tooltip={this.toolTip} profileFlag={profileFlag} btnStatus={this.props.getProfileInfo} />}</List>
          <Divider />
          <List>{<OtherMailFolderListItems tooltip={this.toolTip} userData={this.state.userData} profileFlag={profileFlag} btnStatus={this.props.getProfileInfo} logout={this.props.logout} />}</List>
        </Drawer>
        <main style={{ height: '100hv' }} className={classes.content}>
          <div className={classes.toolbar} />
          <SubRoutes getVoteCountData={this.state.getVoteCountData} getAvatarName={this.getAvatarName} getApproveReq={this.state.getApproveCanReq} getProfileTemURL={this.getProfileTemURL} userData={this.state.userData} profileFlag={profileFlag} changePageState={this.props.checkDisplayStatus} />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    downloadUserDetails: bindActionCreators(sharedAction.downloadUserDetails, dispatch),
    checkDisplayStatus: bindActionCreators(sharedAction.changePageState, dispatch),
    downloadVoteCount: bindActionCreators(GetCanData, dispatch),
    logout: () => dispatch(LoginActions.logout()),
    getApproData: bindActionCreators(GetCanData, dispatch)
  };
}
function mapStateToProps(state) {
  debugger;
  return {
    getApprovedCandidate: state.getCanReqData,
    getProfileInfo: state.authUserReducer,
    getEmail: state.authUserReducer.users.email,
    getUserDetails: state.sharedReducer.UserDetails,
    getVoteCountData: state.getCountVoteData,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard));