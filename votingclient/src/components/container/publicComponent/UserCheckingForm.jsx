import React , { Component } from 'react';
import SaveIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import validator from '../../formValidator/registrationValidator';
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
  },
});

class UserCheckingForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      errors:{},
      isLoading : false,
      open:false,
      snackBarErrorType:'',
      snackBarMessage:'',  
    };
  }
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
  
  
  render() { 
    const { classes  } = this.props;
    return ( 
      <div>
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
              id="filled-simple-start-adornment"
              className={classNames(classes.margin, classes.textField)}
              variant="filled"
              name='name'
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
            <div style={{alignSelf:'left'}} >

              <Button   disabled={this.state.isLoading}  size='small' type='submit' variant="contained" color="primary">
                <div style={{display:'flex',flexDirection:'row'}} >
                  <div style={{position:'relative',top:8}} >                        
                                      Check
                  </div> 
                  <div >
                    <SaveIcon  style={{position:'relative',top:3}} className={classNames(classes.leftIcon, classes.iconSmall)} />
                  </div>       
                </div>
              </Button>                                    
            </div>
              
          </div>
        </form>

      </div>
    );
  }
}
 
export default UserCheckingForm;