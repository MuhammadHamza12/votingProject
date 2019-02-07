import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as sharedAction from '../../../Action/SharedActions/SharedActions';
import Validator from '../../formValidator/registrationValidator';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import Avatar from '@material-ui/core/Avatar';
import config from '../../../config';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Email from '@material-ui/icons/Email';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HumanMale from 'mdi-material-ui/HumanMale';
import HumanFemale from 'mdi-material-ui/HumanFemale';
// import { Table, Label, Dimmer, Header, Image } from 'semantic-ui-react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Work from '@material-ui/icons/Work';
import HowToVoteOutlined from '@material-ui/icons/HowToVoteOutlined';
import Grid from '@material-ui/core/Grid';
// import userimg from '../../../images/userimg.jpg';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Divider from '@material-ui/core/Divider';

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const styles = ((theme) => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    margin: 50,
    width: 150,
    height: 150,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  table: {
    minWidth: 700,
  },
  row: {
    width: '100%'
    ,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  }
}));

class VoterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      progressLoader: null,
      proImage: null,
      loader: false,
      errors: {},
    };
    // if (this.props.history.location.pathname == '/dashboard/vProfile')
    //   this.props.checkDisplayStatus.changePageState({ pageState: 'none' });
  }
  fileOnChange = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files[0]);
      this.setState({
        proImage: window.URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  }
  isValid = () => {
    const { errors, isValid } = Validator(this.state, 'voterProfileDisplay');
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    return isValid;
  }
  displayimage = (URLobj, realImgURL, dummyImg) => {
    if (URLobj == null && realImgURL == null) {
      return dummyImg;
    }
    else if (URLobj) {
      console.log('dummyURL', URLobj);
      return URLobj;
    } else if (URLobj !== realImgURL) {
      console.log(`filename : http://localhost:8080/${realImgURL}`);
      return `http://localhost:8080/${realImgURL}`;
    }
  }

  fileUpload(files) {

    let data = new FormData();
    console.log('file', this.state.file);
    data.append('profileimage', files, files.name);
    data.append('email', this.props.userData.email);
    this.setState({
      loader: true,
    });
    axios.put(`${config.localHttp}/getUserUpdate/api`, data, {
      onUploadProgress: (progressEvent) => {
        let percentage = (progressEvent.loaded / progressEvent.total) * 100;
        this.setState({
          progressLoader: percentage,
          loader: false,
        }, () => { console.log(this.state.progressLoader); });
      }
    })
      .then((res) => {
        console.log('response', res);
        this.props.getupdateImg.updateUserImage(this.props.getUserDetailsOBJ, res.data.data);
        this.setState({
          isLoading: false,
        });
        console.log('response', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.fileUpload(this.state.file);
    } else {
      console.log(this.state.errors);
    }
    // this.props.getupdateImg.updateUserImage(this.props.getUserDetailsOBJ,this.state.proImage);
  }
  render() {
    const { classes } = this.props;

    // const content = (
    //   <div>
    //     <Header as='h2' inverted>
    //       upload
    //     </Header>
    //     <input style={{ paddingTop: 100, paddingBottom: 100, width: '50%', height: '50%', opacity: 0 }} onChange={this.fileOnChange} type="file" />
    //   </div>
    // );
    const name = (this.props && this.props.userData && this.props.userData.name) ? this.props.userData.name : 'Loading';
    console.log('voterprofile', this.props.userData);
    const dimmerImage = (
      <div style={{ textAlign: 'center' }} >
        {/* <ButtonBase
          focusRipple
          key={'profile'}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '50%',
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${this.displayimage(this.state.proImage, this.state.profileimage, userimg)})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
        <form onSubmit={this.handleSubmit} >
          <input onChange={this.fileOnChange} type='file' />
          <Button type='submit' variant="contained" size="small" color="primary" className={classes.margin}>
            Done
        </Button>
        </form> */}
        <Avatar style={{ fontSize: 80, position: 'relative', left: 30, textAlign: 'center' }} className={classes.avatar}>{this.props.getAvatarName(name, <CircularProgress />)}</Avatar>
      </div>
    );
    const ProfileStuff = (
      <Grid style={{ textAlign: 'center' }} container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={8}>
              <Grid item xs={4} sm={3}>
                <Paper style={{ borderRadius: '50%', boxShadow: '5px 5px 5px gray' }} className={classes.paper}>
                  {dimmerImage}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Typography style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 40 }} variant="title" gutterBottom>
                    {(this.props && this.props.userData && this.props.userData.name) ? this.props.userData.name : 'Loading...'}
                  </Typography>
                  <React.Fragment>
                    <Table>
                      <TableBody>
                        <TableRow className={classes.row} >
                          <CustomTableCell align="right">
                            <div style={{ display: 'flex', marginLeft: 5 }} >
                              <div>
                                <Email />
                              </div>
                              <div style={{ marginLeft: 5 }} >
                                Email-Address:
                          </div>
                            </div>
                          </CustomTableCell>
                          <CustomTableCell align="right">
                            {(this.props && this.props.userData && this.props.userData.email) ? this.props.userData.email : 'Loading...'}
                          </CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row}  >
                          <CustomTableCell align="right">
                            <div style={{ display: 'flex', marginLeft: 5 }} >
                              <div>
                                <Work />
                              </div>
                              <div style={{ marginLeft: 5 }} >
                                Profession:
                          </div>
                            </div>
                          </CustomTableCell>
                          <CustomTableCell align="right"> {
                            (this.props && this.props.userData && this.props.userData.voterProfession) ? this.props.userData.voterProfession : 'Loading...'
                          }</CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row}  >
                          <CustomTableCell align="right">
                            <div style={{ display: 'flex', marginLeft: 5 }} >
                              <div>
                                <HumanFemale style={{ position: 'relative', right: 7 }} /><HumanMale style={{ position: 'relative', right: 15 }} />
                              </div>
                              <div style={{ marginLeft: 5 }} >
                                Gender:
                            </div>
                            </div>
                          </CustomTableCell>
                          <CustomTableCell align="right">  {(this.props && this.props.userData && this.props.userData.gender) ? this.props.userData.gender : 'Loading...'}</CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row}  >
                          <CustomTableCell align="right">
                            <div style={{ display: 'flex', marginLeft: 5 }} >
                              <div>
                                <HowToVoteOutlined />
                              </div>
                              <div style={{ marginLeft: 5 }} >
                                Voting Status:
                            </div>
                            </div>
                          </CustomTableCell>
                          <CustomTableCell align="right">{
                            (this.props && this.props.userData && this.props.userData.isVoteCasted) ? 'true' : 'false'
                          }</CustomTableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </React.Fragment>
                  <Divider />
                </Paper>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
    const Loader = (
      <div>
        <CircularProgress />
      </div>
    );
    const check = this.props;
    debugger;
    return (
      <div className={classes.root}>
        {
          (this.props && this.props.userData && this.props.userData.name) ? ProfileStuff : Loader
        }
      </div>
    );
  }
}

VoterProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    getupdateImg: bindActionCreators(sharedAction, dispatch),
    checkDisplayStatus: bindActionCreators(sharedAction, dispatch)
  };
}
function mapStateToProps(state) {

  return {
    getPageStatus: state.sharedReducer.pageState,
    getUserDetailsOBJ: state.sharedReducer.UserDetails,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VoterProfile));