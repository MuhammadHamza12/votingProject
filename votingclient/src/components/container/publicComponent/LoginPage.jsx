import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import logo from '../../../images/nlogin.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Login from 'mdi-material-ui/Login';
import { LoginActions }  from '../../../Action';
import Check from 'mdi-material-ui/Check';
import * as sharedActions from '../../../Action/SharedActions/SharedActions';
import InputAdornment from '@material-ui/core/InputAdornment';
import HowToVoteRounded from '@material-ui/icons/HowToVoteRounded';
import Validator from '../../formValidator/registrationValidator';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import AccountCircleSharp from '@material-ui/icons/AccountCircleSharp';

import LockRounded from '@material-ui/icons/LockRounded';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 280,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  setLogin: {
    position: 'relative',
    bottom: 150
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },

});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voterId: '',
      password: '',
      isLoading: false,
      errors: {},
    };
    if (this.props.history.location.pathname === '/login') {
      this.props.isLoginPage.isLoginPage({ isLoginPage: true });
    }
  }

  isValid = () => {
    const { errors, isValid } = Validator(this.state, 'loginPageValidation');
    console.log(errors);
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    return isValid;
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      console.log('working');
      this.setState({ errors: {}, isLoading: true });
      try {
        this.props.loginActionCreator(this.state)
          .then(
            (res) => {
              console.log('yes response comes here',res);
              this.props.history.push('/dashboard');
            },
            ((error) => {
              this.setState({ errors: error, isLoading: false });
              console.log(error.response);
            })
          );
      }
      catch (e) {
        console.log('Network error', e);
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleCheck = () => {
    // console.log('working');
    this.props.checkAction.checkNow({ check: true });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid style={{ width: '50%', margin: 'auto', paddingTop: 30 }} item xs={12} sm={3}>
            <Paper style={{ boxShadow: '5px 5px 58px #3F51B5' }} className={classes.paper}>
              <Grid style={{ boxShadow: '5px 5px 80px ##4EAF6D' }} item xs={12}>
                <Paper className={classes.paper}>
                  <img src={logo} alt="#logo" height='40%' width='40%' />
                  <div>
                    <div style={{width:'100%',margin:'0 auto',marginTop:20,borderRadius:10,border:'1px solid #E0E0E0',display:'flex',flexDirection:'row',backgroundColor:'#E0E0E0',justifyContent:'center'}} >
                      <div>
                        <AccountCircleSharp />
                      </div>
                      <div style={{color:'black'}} >
                         Login To Continue  
                      </div>
                    </div>
                    <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                      <TextField
                        className={classNames(classes.margin, classes.textField)}
                        variant="filled"
                        name='voterId'
                        error={errors.voterId}
                        fullWidth={true}
                        label="Enter Voter Id *"
                        onChange={this.handleChange}
                        placeholder='Voter Id'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment variant="filled" position="start">
                              <HowToVoteRounded key="a" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        className={classNames(classes.margin, classes.textField)}
                        variant="filled"
                        fullWidth={true}
                        error={errors.password}
                        type='password'
                        onChange={this.handleChange}
                        name='password'
                        label="Enter Password *"
                        placeholder='Password'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment variant="filled" position="start">
                              <LockRounded />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button disabled={this.state.isLoading} type='submit' style={{ marginTop: 50 }} color='primary' fullWidth={true} variant="contained" className={classes.button}>
                        <Login />
                        Login
                      </Button>
                      <div style={{width:'100%',margin:'0 auto',borderRadius:10,border:'1px solid #E0E0E0',display:'flex',flexDirection:'row',backgroundColor:'#E0E0E0',justifyContent:'center'}} >
                        <div>
                          <QuestionAnswer />
                        </div>
                        <div style={{color:'black'}} >
                         do not have voter id  
                        </div>
                      </div>
                      <Button style={{ marginTop: 20 }} fullWidth={true} variant="contained" onClick={this.handleCheck} className={classes.button}>
                        <Check />
                         Check Now?
                      </Button>
                    </form>
                  </div>
                </Paper>
              </Grid>
            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    checkAction: bindActionCreators(sharedActions, dispatch),
    isLoginPage: bindActionCreators(sharedActions, dispatch),
    loginActionCreator: (arg) => dispatch(LoginActions.Login(arg))
  };
}
function mapStateToProps(state) {
  return{
    auth: state.authUserReducer.isAuth,
    authSecond: state.authUserReducer.users.profileFlag,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));