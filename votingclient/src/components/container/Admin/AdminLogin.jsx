import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { Input , Icon  , Button} from 'semantic-ui-react';
import Validator from '../../formValidator/registrationValidator';
import { connect } from 'react-redux';
import * as AdminAction from '../../../Action/AdminLoginAction/index';

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

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false,
      email:'',
      password:'',
      errors:{},
    };
  }
  onHandleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
    });
  }
  isValid = () => {
    const { errors , isValid } = Validator(this.state, 'AdminLoginValidation');
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    return isValid;
  }
  handleSubmit =(e)=>{
    e.preventDefault();
    if(this.isValid()){
      console.log(this.state.password,this.state.email);
      console.log('working');
      this.setState({ errors: {}, loading:true });
      try {
        this.props.Adminaction.Login(this.state)
          .then(
            (res) => {
              console.log('yes response comes here',res);
              this.props.history.push('/Adashboard');
            },
            ((error) => {
              this.setState({ errors: error, loading:false });
              console.log(error.response);
            })
          );
      }
      catch (e) {
        console.log('Network error', e);
      }
    }
  };
  render() { 
    const { classes } = this.props;
    const { errors } = this.state;
    return ( 
      <Grid container>
        <Grid style={{ width: '50%', margin: 'auto', paddingTop: 30 }} item xs={12} sm={6}>
          <Paper style={{backgroundColor:'#FAF8EF '}}  className={classes.paper}>
            <Grid style={{ boxShadow: '5px 5px 80px ##FAF8EF' }} item xs={12}>
              <Paper style={{backgroundColor:'#FAF8EF '}} className={classes.paper}>
                <form onSubmit={this.handleSubmit} >
                  <Input error={errors.email} style={{width:'100%'}} iconPosition='left' placeholder='Enter-Email'>
                    <Icon name='at' />
                    <input  type='email' onChange={this.onHandleChange} name='email' />
                  </Input>
                  <br/>
                  <br/>
                  <Input error={errors.password} style={{width:'100%'}} onChange={this.onHandleChange}  iconPosition='left' placeholder='Enter-Password'>
                    <Icon name='lock' />
                    <input name='password' type='password'  />
                  </Input>
                  <br/>
                  <br/>
                  <Button type='submit' loading={this.state.loading}  style={{width:'100%',color:'#3F51B5'}}  >
                    <Icon name='lock open' />
                  Login
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Paper>  
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    Adminaction : bindActionCreators(AdminAction,dispatch),
  };
}
function mapStateToProps(state) {
  return{
    auth: state.authUserReducer.isAuth,
    authSecond: state.authUserReducer.users.profileFlag,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminLogin));