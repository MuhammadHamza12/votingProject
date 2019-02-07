import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { connect  } from 'react-redux';
import * as sharedActions from '../../../Action/SharedActions/SharedActions';
import { bindActionCreators } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as AdmingLoginAction from '../../../Action/AdminLoginAction/index';

import CheckboxMultipleMarkedCircleOutline from 'mdi-material-ui/CheckboxMultipleMarkedCircleOutline';
import Select from '@material-ui/core/Select';
import { VotingEligibilityAction } from '../../../Action';
import InputAdornment from '@material-ui/core/InputAdornment';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import PeopleOutlineRounded from '@material-ui/icons/PeopleOutlineRounded';
import ProfessionalHexagon from 'mdi-material-ui/ProfessionalHexagon';
import CustomizedSnackbars from '../../dumpComponents/CustomizedSnackbars.jsx';
import validator from '../../formValidator/registrationValidator';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import '../../../css/removeDefaultChromeCss.css';
//using icons
import classNames from 'classnames';
import '../../../css/fonts.css';
import Lock from '@material-ui/icons/Lock';

import GroupRounded from '@material-ui/icons/GroupRounded';
import Logout from 'mdi-material-ui/Logout';
import RefreshRounded from '@material-ui/icons/RefreshRounded';
import SearchTwoTone from '@material-ui/icons/SearchTwoTone';
import Email from '@material-ui/icons/Email';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link  } from 'react-router-dom';
//end of icons
//downslide imports
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Person from '@material-ui/icons/Person';


//end

import img from '../../../images/drawing34.png';
const styles = (theme) => ({
  root: {
    width: '100%',
    
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }, margin: {
    margin: theme.spacing.unit,
  },
  setLogin : {
    position:'relative',
    bottom:150
  },
  dense: {
    marginTop: 16,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class CustomNavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    email:'',
    errors:{},
    isLoading : false,
    profession:'',
    name:'',
    gender:'',
    open:false,
    snackBarErrorType:'',
    snackBarMessage:'',
  };
  
  handleClose = () => {
    this.props.checkAction.checkNow({check:false});
  };

  handleClickOpen = () => {
    this.props.checkAction.checkNow({check:true});
  };
  handleSnackBarOpen =()=>{
    this.setState({
      open:true,
    });
  }
  handleSnackBarClose =()=>{
    this.setState({
      open:false,
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

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  }; 

isValid = () =>{
  const {errors , isValid} = validator(this.state,'checkPageValidation');
  if(!isValid){
    this.setState({
      errors,
    });
  }
  return isValid;
}

onHandleChange = (e) =>{

  this.setState({
    [e.target.name] : e.target.value,
  });
}

snackBarErrorType =(errorType) =>{
  switch (errorType) {
    case 'invalidEmail':
      this.setState({
        snackBarErrorType:'error',snackBarMessage:'Sorry you cannot being a part of this voting'
      },()=>{ this.handleSnackBarOpen();  }); 
      break;
    
    case 'emailNotVerified':
      this.setState({
        snackBarErrorType:'success',snackBarMessage:'Accepted! kindly check your mail please'
      },()=>{ this.handleSnackBarOpen();  }); 
      break;

    case 'emailVerified':
      this.setState({
        snackBarErrorType:'info',snackBarMessage:'Kindly check your mail please!'
      },()=>{ this.handleSnackBarOpen();  }); 
      break;
    
    default:
      break;
  }
}
// onClickLogout = ()=>{
//   this.props.history
// }
handleSubmit = (e) =>{
  e.preventDefault();
   
  if(this.isValid()){
    this.setState({errors:{},isLoading:true});
    try{
      this.props.isValidEmail({email:this.state.email,gender:this.state.gender,profession:this.state.profession,name:this.state.name})
        .then(
          (res)=>{
            try{
              console.log('response in customnav comp',res);
              this.setState({isLoading:false,email:''});
              if(res && res.data && res.data.type ){
                console.log('inside response snackbar type');
                this.snackBarErrorType(res.data.type);
                this.setState({
                  gender:'',
                  profession:'',
                  name:'',
                  email:'',
                });
              }
            }catch(e){
              console.log(e);
            }
          },
          ((error)=>{

            this.setState({ errors: error, isLoading: false,email:''});
            try{
              console.log(error.response);
              
              if( error && error.response.data && error.response.data.type){
                console.log('working inside snacker type');
                this.snackBarErrorType(error.response.data.type);
              }
            }catch(e){
              console.log(e);
            }
          })
        );
    }
    catch(e){
      console.log('error',e);
    }
  }
  console.log('has some error',this.state.errors);
}

renderCandidateButton (){
  if(this.props.isloginpageflage.isLoginPage === true){
    return(
      <Link style={{color:'white',textDecoration:'none',marginTop:8}} to='/'>
        <Button  style={{border:'1px solid white'}} variant="outlined" size="small" color='inherit'>
          <GroupRounded />Candidate ?
        </Button>
      </Link>
    );
  }
}
render() {
  const { errors ,anchorEl, mobileMoreAnchorEl } = this.state;
  const { classes  } = this.props;
  const { isAuth } = this.props.auth;
  
  console.log('checking for more props props',this.props);
  const { checknow } = this.props.getcheckState;
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={this.handleMenuClose}
    >
      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
      <MenuItem onClick={this.handleClose}>My account</MenuItem>
    </Menu>
  );
   
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={this.handleMobileMenuClose}
    >
      <MenuItem onClick={this.handleClickOpen} >
        <IconButton  color="inherit">
          <SearchTwoTone/>
        </IconButton>
        <p>check voter?</p>
      </MenuItem>
      <Link style={{color:'white',textDecoration:'none'}} to='/login'>
        <MenuItem>
          <IconButton color="inherit">
            <Lock />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Link>
    </Menu>
  );
  const GuestNestedLink = (
    <React.Fragment>
      <div className={classes.sectionDesktop}>
        {this.renderCandidateButton()}
        <Button style={{border:'1px solid white'}} variant="outlined" size="small" color='inherit' onClick={this.handleClickOpen} className={classes.button}>
          <SearchTwoTone/>
          check voting eigibility
        </Button>
        <Link style={{color:'white',textDecoration:'none'}} to='/login'>
          <Button  style={{border:'1px solid white'}} onClick={this.handleclick} variant="outlined" size="small" color='inherit' className={classes.button}>
            <Lock />Login
          </Button>
        </Link>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
          <MoreIcon />
        </IconButton>
      </div>
    </React.Fragment>
  );
  const AdminRoutes = (
    <div>
      <Link to='/Admin' >
        <Button onClick={()=>this.props.adminLogout.logout()} className={classes.button}>
          <Logout style={{color:'white'}} />
          <span style={{color:'white'}} > 
        Logout
          </span>
        </Button>
      </Link>
    </div>
  );
  const GuestLinks = (
    <div>
      <AppBar style={{boxShadow:'5px 5px 58px gray'}} position="static">
        <CustomizedSnackbars 
          open={this.state.open} 
          handleSnackBarOpen={this.handleSnackBarOpen} 
          handleSnackBarClose={this.handleSnackBarClose}  
          errorType ={this.state.snackBarErrorType}
          message={this.state.snackBarMessage}
        />
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <img src={img} alt="#logo" width='60%' height='50%' />
          </IconButton>
          <p style={{fontSize:30,marginTop:15 }} className='fontclass' >Smart Voting System</p> 
          <div className={classes.grow} />
          {this.props.isAdmin ? AdminRoutes : GuestNestedLink }
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
  return (
    <div className={classes.root}>
      {isAuth ? null  : GuestLinks  }
      <Dialog  
            
        fullWidth={true}
        open={(typeof checknow === 'undefined') ? false : checknow}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title">
          <CheckboxMultipleMarkedCircleOutline color='primary' />
          <span style={{position:'relative',bottom:10}} >
          Check Voting Eligibility
          </span>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit} >   
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}} >      
              <TextField
                style={{width:'80%'}}
                id="filled-simple-start-adornment"
                className={classNames(classes.margin, classes.textField)}
                variant="filled"
                name='email'
                type='email'
                error={errors.email}
                fullWidth={true}
                label="Enter Email *"
                onChange={this.onHandleChange}
                placeholder='Enter Email Id'
                InputProps={{
                  startAdornment: (
                    <InputAdornment variant="filled" position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField                      
                style={{width:'55%'}}
                id="filled-simple-start-adornment"
                className={classNames(classes.margin, classes.textField)}
                variant="filled"
                name='name'
                onChange={this.onHandleChange}
                error={errors.name}
                fullWidth={true}
                label="Enter Name *"
                placeholder='Enter Name'
                InputProps={{
                  startAdornment: (
                    <InputAdornment variant="filled" position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-helper"><PeopleOutlineRounded />
                  <span style={{position:'relative',bottom:5}} > Gender</span> 
                </InputLabel>
                <Select
                  value={this.state.gender}
                  onChange={this.onHandleChange}
                  input={<Input name="gender" id="age-helper" />}
                  error={errors.gender}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
                <FormHelperText>Enter Gender</FormHelperText>
              </FormControl>                          
              <FormControl  style={{width:'80%',position:'relative',bottom:20}}  className={classes.formControl}>
                <InputLabel htmlFor="profession-helper">
                  <span style={{position:'relative',bottom:6}} >

                    <ProfessionalHexagon /> 
                  </span>
                  <span style={{position:'relative',bottom:6}} >
                Profession
                  </span>
                </InputLabel>
                <Select
                  error={errors.profession}
                  value={this.state.profession}
                  onChange={this.onHandleChange}
                  input={<Input name="profession" id="age-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Student'}>Student</MenuItem>
                  <MenuItem value={'Developer'}>Developer</MenuItem>
                  <MenuItem value={'Clerk'}>Clerk</MenuItem>
                </Select>
                <FormHelperText>Enter Profession</FormHelperText>
              </FormControl>
              <Button disabled={this.state.isLoading} variant="contained" color='primary'  type='submit' style={{width:'100%',marginTop:20}} >
                <RefreshRounded />
                <span style={{color:'white',position:'relative'}} > 
                           Process
                </span> 
              </Button> 
            </div>
          </form>
          {/* </DialogContentText> */}
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
}

CustomNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return{
    adminLogout:bindActionCreators(AdmingLoginAction,dispatch),
    checkAction:bindActionCreators(sharedActions,dispatch),
    isLoginPage:bindActionCreators(sharedActions,dispatch),
    isValidEmail: (arg) => dispatch(VotingEligibilityAction.checkEmailForVoting(arg))
  };
}
function mapStateToProps(state) {
  return {
    getcheckState: state.sharedReducer,
    isloginpageflage:state.sharedReducer,
    auth:state.authUserReducer,
    isAdmin:state.authAdminReducer.isAdminAuth,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CustomNavBar));
