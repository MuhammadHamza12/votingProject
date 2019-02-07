import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typing from 'react-typing-animation';
import { Button, Popup, Header } from 'semantic-ui-react';
import img from '../../../images/customPic.svg';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import aixos from 'axios';
import config from '../../../config';

//import for downslide dialog
//end
// imports for selectbox
import PeopleOutlineRounded from '@material-ui/icons/PeopleOutlineRounded';
import ProfessionalHexagon from 'mdi-material-ui/ProfessionalHexagon';

import Select from '@material-ui/core/Select';
//end selectbox imports
import * as sharedAction from '../../../Action/SharedActions/SharedActions';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
//used icons
import SaveIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocationCity from '@material-ui/icons/LocationCity';
import DateRangeTwoTone from '@material-ui/icons/DateRangeTwoTone';
import Email from '@material-ui/icons/Email';
//end of icons
//used validator import
import validator from '../../formValidator/registrationValidator';
//end


const styles = (theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container2: {
    position: 'relative',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});


class CandidateRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      open2: false,
      anchorEl: null,
      nationality: '',
      firstName: '',
      lastName: '',
      dOB: '',
      email: '',
      msg:false,
      gender: '',
      profession: '',
      errors: {},
      loading: false,
    };
    this.props.isLoginPage.isLoginPage({ isLoginPage: false });
  }


  // handler for select box
  handleRef = (node) => this.setState({ node })
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  ConfirmMsg = (flag) => {
    if (flag) {
      return (
        <div>
          <Header color='blue' as='h3'>Request is pending, it will be approved by the admin </Header>
        </div>
      );
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleClose1 = () => {
    this.setState({ open1: false });
  };
  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleOpen1 = () => {
    this.setState({ open1: true });
  };
  handleOpen2 = () => {
    this.setState({ open2: true });
  };
  //endhanlder for selectbox
  //handlerforpopover
  handlePopoverOpening = (event) => {

    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
  //end popoverhandler
  onHandleChage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  isValid = () => {
    const { errors, isValid } = validator(this.state, 'regPageValidation');
    if (!(isValid)) {
      this.setState({
        errors
      });
    }
    return isValid;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true });
      aixos.put(`${config.localHttp}/listenCan/Req/api`, { email: this.state.email, gender: this.state.gender, profession: this.state.profession, DataeOfBirth: this.state.dOB, nationality: this.state.nationality, lastname: this.state.lastName, name: this.state.firstName })
        .then((success) => {

          if(success && success.data && success.data.status){
            debugger;
            this.setState({
              msg:true,
            });
          }
          console.log('congrats no error in data');
          console.log(success);
          this.setState({
            nationality: '',
            firstName: '',
            lastName: '',
            dOB: '',
            email: '',
            gender: '',
            profession: '',
            errors: {},
            loading: false,
          });
        }).catch((error) => {
          console.log(error);
        });
    }
    console.log(this.state.errors);
  }
  componentWillUnmount(){
    // this.setState({
    //   msg:false,
    // });
  }
  render() {
    const { classes } = this.props;
    const { node } = this.state;
    const trigger = <Button content='important note!' />;
    const { errors, nationality, gender, profession } = this.state;
    debugger;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper2}>
              <Typing >
                {/* <Typing.Speed ms={200} /> */}
                <span style={{ fontSize: 20 }} >
                  Are You A Candidate ?
                </span>
              </Typing>
            </Paper>
          </Grid>
          <Grid style={{ margin: 'auto', width: '50%' }} item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div>
                {this.ConfirmMsg(this.state.msg)}
                  <h3>Registration</h3>
                  <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit} >

                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField value={this.state.firstName} name='firstName' onChange={this.onHandleChage} id="input-with-icon-grid" label="First Name *" error={errors.firstName} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField value={this.state.lastName} name='lastName' onChange={this.onHandleChage} id="input-with-icon-grid" label="Last Name *"
                          error={errors.lastName} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end" >

                      <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ position: 'relative', top: 20 }} >
                          <Grid item>
                            <LocationCity />
                          </Grid>
                        </div>
                        <div style={{ paddingLeft: 6, }} >
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-controlled-open-select">Nationality *</InputLabel>
                            <Select
                              name='nationality'
                              open={this.state.open}
                              onClose={this.handleClose}
                              onOpen={this.handleOpen}
                              value={nationality}
                              onChange={this.onHandleChage}
                              inputProps={{

                                id: 'nationalityID',
                              }}
                              error={errors.nationality}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={'pakistan'}>Pakistan</MenuItem>
                              <MenuItem value={'Turkey'}>India</MenuItem>
                              <MenuItem value={'Afghanistan'}>Afghanistan</MenuItem>
                              <MenuItem value={'Saudia Arab'}>Saudia Arab</MenuItem>
                              <MenuItem value={'Qatar'}>Qatar</MenuItem>
                              <MenuItem value={'Iran'}>Iran</MenuItem>
                              <MenuItem value={'Iraq'}>Iraq</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end" >

                      <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ position: 'relative', top: 20 }} >
                          <Grid item>
                            <ProfessionalHexagon />
                          </Grid>
                        </div>
                        <div style={{ paddingLeft: 6, }} >
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-controlled-open-select">Profession *</InputLabel>
                            <Select
                              name='profession'
                              open={this.state.open1}
                              onClose={this.handleClose1}
                              onOpen={this.handleOpen1}
                              value={profession}
                              onChange={this.onHandleChage}
                              inputProps={{

                                id: 'profession',
                              }}
                              error={errors.profession}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={'Developer'}>Developer</MenuItem>
                              <MenuItem value={'Student'}>Student</MenuItem>
                              <MenuItem value={'Clerk'}>Clerk</MenuItem>
                              <MenuItem value={'Teacher'}>Teacher</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end" >

                      <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ position: 'relative', top: 20 }} >
                          <Grid item>
                            <PeopleOutlineRounded />
                          </Grid>
                        </div>
                        <div style={{ paddingLeft: 6, }} >
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-controlled-open-select">Gender *</InputLabel>
                            <Select
                              name='gender'
                              open={this.state.open2}
                              onClose={this.handleClose2}
                              onOpen={this.handleOpen2}
                              value={gender}
                              onChange={this.onHandleChage}
                              inputProps={{

                                id: 'gender',
                              }}
                              error={errors.gender}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={'Male'}>Male</MenuItem>
                              <MenuItem value={'Female'}>Female</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                    </Grid>
                    <Grid item >
                      <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div>
                          <Grid item>
                            <DateRangeTwoTone />
                          </Grid>
                        </div>
                        <div style={{ width: '20%' }} >
                          <Grid item >
                            <TextField
                              id="date"
                              label="Date of birth *"
                              type="date"
                              name='dOB'
                              value={this.state.dOB}
                              onChange={this.onHandleChage}
                              defaultValue={new Date().toLocaleTimeString()}
                              className={classes.textField}
                              InputLabelProps={{
                                name: 'dOB',
                                shrink: true,
                              }}
                              error={errors.dOB}
                            />
                          </Grid>
                        </div>
                      </div>
                    </Grid>

                    <Grid item >
                      <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div>
                          <Grid item >
                            <Email />
                          </Grid>
                        </div>
                        <div style={{ position: 'relative', bottom: 10, paddingLeft: 6 }} >
                          <Grid item >

                            <TextField
                              margin="dense"
                              id="name"
                              label="Email Address *"
                              type="email"
                              name='email'
                              value={this.state.email}
                              error={errors.email}
                              onChange={this.onHandleChage}
                            />
                          </Grid>
                        </div>
                      </div>
                    </Grid>

                    <Grid style={{ paddingLeft: 20 }} container spacing={8} alignItems="flex-end" item>

                      <Button loading={this.state.loading} type='submit' variant="contained" color='blue' size='mini' >
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                          <div>
                            Request
                          </div>
                          <div>
                            <SaveIcon style={{ position: 'relative' }} className={classNames(classes.leftIcon, classes.iconSmall)} />
                          </div>
                        </div>
                      </Button>
                    </Grid>



                  </form>
                  <div style={{ marginTop: 10, textAlign: 'left' }} >
                    <Popup size='mini' trigger={trigger} context={node} content='Your request as a candidate will be first reviewed then, approved by the Adminstrator.' position='top left' />
                    ---------->
                    <strong ref={this.handleRef}>here</strong>
                    {/* <Typography style={{border:'1px solid white', width:100 ,borderRadius:5,display:'flex',boxShadow:'1px 1px 5px gray' , justifyContent:'left'}}
                      aria-owns={open ? 'mouse-over-popover' : null}
                      aria-haspopup="true"
                      onMouseEnter={this.handlePopoverOpening}
                      onMouseLeave={this.handlePopoverClose}
                    >
                      Important Note!
                    </Typography>
                       
                    <Popover
                      id="mouse-over-popover"
                      className={classes.popover}
                      classes={{
                        paper: classes.paper,
                      }}
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      onClose={this.handlePopoverClose}                      
                    >
                      <Typography>Your request as a candidate will be first reviewed then, approved by the Adminstrator.</Typography>
                    </Popover> */}

                  </div>
                </div>
                <div>
                  <img src={img} height='100%' width='85%' alt="#img" />
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

      </div>
    );
  }
}

CandidateRequestPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    isLoginPage: bindActionCreators(sharedAction, dispatch),
  };
}
export default connect(null, mapDispatchToProps)(withStyles(styles)(CandidateRequestPage));