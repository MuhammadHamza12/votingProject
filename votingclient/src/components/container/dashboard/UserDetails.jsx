import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import * as sharedAction from '../../../Action/SharedActions/SharedActions';
import { Progress } from 'semantic-ui-react';
import Person from '@material-ui/icons/Person';
import RefreshRounded from '@material-ui/icons/RefreshRounded';
import PeopleOutlineRounded from '@material-ui/icons/PeopleOutlineRounded';
import { connect } from 'react-redux';
import { Label , Dimmer, Header, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ProfessionalHexagon from 'mdi-material-ui/ProfessionalHexagon';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { VoterProfileDataActions } from '../../../Action';
import * as LoginAction from '../../../Action/LoginActions';
import axios from 'axios';
import config from '../../../config';
import { LoginActions }  from '../../../Action';
// import Validator from '../../formValidator/registrationValidator';
// import Button from '@material-ui/core/Button';
import { Button } from 'semantic-ui-react';
import img from '../../../images/profilepic.svg';
import { InfoMessage } from '../../dumpComponents/AllFunctionalComponents.jsx';
import validator from '../../formValidator/registrationValidator.js';
import MenuItem from '@material-ui/core/MenuItem';
import HumanMale from 'mdi-material-ui/HumanMale';
import HumanFemale from 'mdi-material-ui/HumanFemale';
import Select from '@material-ui/core/Select';
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
  setLogin : {
    position:'relative',
    bottom:150
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state={
      gender:'',
      name:'',
      profession:'',
      profileimage:null,
      isLoading:false,
      age: '',
      file:'',
      labelWidth: 0,
      errors:{}, 
      progressLoader:null,
    };
    
    if(this.props.history.location.pathname == '/dashboard')
      this.props.checkDisplayStatus.changePageState({pageState:'block'}); 
  }  
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })
  isValid = () =>{
    const {errors,isValid} = validator(this.state,'UserDetailsValidation');
    if(!isValid){
      this.setState({
        errors,
      });
    }
    return isValid;
  }

   fileOnChange = (e) =>{
     if(e.target.files.length > 0){
       this.setState({
         profileimage: window.URL.createObjectURL(e.target.files[0]),
         file:e.target.files[0],
       });
     }
   }
   fileUpload(files) {
     let data = new FormData();
     data.append('profession',this.state.profession);
     data.append('name',this.state.name);
     data.append('gender',this.state.gender);
     data.append('profileimage',files,files.name);
     data.append('voterProfileDataId',this.props.getUserOriginalId);
     axios.post(`${config.localHttp}/getData/api`,data,{
       onUploadProgress: (progressEvent) => {
         let percentage = (progressEvent.loaded / progressEvent.total)*100;
         this.setState({
           progressLoader:percentage,
         },()=>{ console.log(this.state.progressLoader); });
       }
     })
       .then((res)=>{
         this.setState({
           isLoading:false,
         });
         console.log('response',res);
       })
       .catch((err)=>{
         console.log('err',err);
       });
   }
  handleSubmit = (e) =>{
    e.preventDefault();
    if(this.isValid()){
      this.setState({
        isLoading:true,
      });
      this.fileUpload(this.state.file);
      // this.props.sendToServer(this.state.file)
      console.log(this.props);
      //   .then((res)=>{
      //     console.log(res);
      //   })
      //   .catch((err)=>{
      //     console.log(err);
      //   });
    }
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }
  handleCheck = ()=>{
    this.props.checkAction.checkNow({check:true});
  }
  renderPicError (error){
    if(error){
      return(
        <InfoMessage  profileFlag={this.props.profileFlag}  negativeMsg={true} positiveMsg={false} errorMsg={'picture is required'} />
      );
    }
  }
  render (){
    const { active } = this.state;
    const {errors } = this.state;
    const { classes } = this.props;
    console.log(this.state.errors);
    const renderMale = (
      <div style={{display:'flex',flexDirection:'row'}} >
        <div>
          <HumanMale />
        </div>
        <div style={{position:'relative',top:5,left:7}}  > 
          Male
        </div>
      </div>
    );
    const renderFemale = (
      <div style={{display:'flex',flexDirection:'row'}} >
        <div>
          <HumanFemale />
        </div>
        <div style={{position:'relative',top:5,left:7}}  > 
         Female
        </div>
      </div>
    );
    const renderProfession = (data) => (
      <div style={{display:'flex',flexDirection:'row'}} >
        <div>
          <ProfessionalHexagon />
        </div>
        <div style={{position:'relative',top:5,left:7}}  > 
          {data}
        </div>
      </div>
    );
    const content = (
      <div>
        <Header as='h2' inverted>
          upload
        </Header>
        <input  style={{paddingTop:100,paddingBottom:100,width:'50%',height:'50%',opacity:0}}  onChange={this.fileOnChange}  type="file"/>
      </div>
    );
    return (
      <div style={{display:`${this.props.getPageStatus}`}}  className={classes.root}>
        <Grid  container>
          <Grid  style={{  width:'50%' , margin:'auto',paddingTop:30}} item xs={12} sm={4}>
            <InfoMessage positiveMsg={true} negativeMsg={false} msg={'Just one Step away from voting!'}  profileFlag={this.props.profileFlag}  />
            <Paper className={classes.paper}>
              <Grid  item xs={12} sm={12} >
                <div style={{textAlign:'left'}} >

                  <Label as='a' color='blue' size='large' ribbon>
                    <div   style={{display:'flex'}} >
                      <div>
                        <InfoOutlined /> 
                      </div>
                      <div style={{marginLeft:5,marginTop:5}} >  
                          Kindly Help out in maintaining your profile
                      </div>
                    </div>
                  </Label>
                </div>
                <Paper className={classes.paper}>
                  {/* <div className="box">
                    <img id="image" src={(this.state.file == null) ? img : this.state.file} width="300px" height="300px"/>
                    <input type="file" onChange={this.fileOnChange}  className="file"/>
                  </div> */}
                  <Dimmer.Dimmable
                    as={Image}
                    dimmed={active}
                    style={{borderRadius:'50%'}}
                    dimmer={{ active, content }}
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                    size='medium'
                    src={(this.state.profileimage == null) ? img : this.state.profileimage}
                  />
                  {/* <div className='hovercss'>
                    <div className='dohover' >
                      <input type="file" name="file" id="#file"/>
                      <HowToReg style={{fontSize:120}}  />
                    </div>
                  </div> */}
                  <div>
                   
                    {this.renderPicError(errors.file)}
                    <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                      <TextField                      
                        id="filled-simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                        variant="filled"
                        name='name'
                        error={errors.name}
                        fullWidth={true}
                        label="Enter Name *"
                        onChange={this.handleChange}
                        placeholder='Enter Name'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment variant="filled" position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Select
                        value={this.state.gender}
                        onChange={this.handleChange}
                        name="gender"
                        displayEmpty
                        error={errors.gender}
                        className={classes.selectEmpty}
                        fullWidth={true}
                      >
                        <MenuItem value="" disabled>
                          <div style={{display:'flex',flexDirection:'row'}} >
                            <div>
                              <PeopleOutlineRounded /> 
                            </div>
                            <div style={{position:'relative',top:5,left:7}} >
                            Gender *
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem value={'Male'}>{(this.state.gender !== '') ? renderMale : 'Male'}</MenuItem>
                        <MenuItem value={'Female'}>{(this.state.gender !== '') ? renderFemale : 'Female'}</MenuItem>
                      </Select>
                    
                      <Select
                        value={'this.state.profession'}
                        onChange={this.handleChange}
                        name="profession"
                        className={classes.selectEmpty}
                        error={errors.profession}
                      >
                        <MenuItem value="" disabled>
                          <div style={{display:'flex',flexDirection:'row'}} >
                            <div>
                              <ProfessionalHexagon /> 
                            </div>
                            <div style={{position:'relative',top:5,left:7}} >
                            Profession *
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem value={'Student'}>{(this.state.profession !== '') ? renderProfession('Student') : 'Student' }</MenuItem>
                        <MenuItem value={'Developer'}>{(this.state.profession !== '') ? renderProfession('Developer') : 'Developer' }</MenuItem>
                        <MenuItem value={'Clerk'}>{(this.state.profession !== '') ? renderProfession('Clerk') : 'Clerk' }</MenuItem>
                      </Select>
                      <Button disabled={this.state.isLoading} loading={this.state.isLoading} primary  type='submit' style={{width:'100%',marginTop:20}} >
                        <RefreshRounded />
                        <span style={{color:'white',position:'relative',bottom:10}} > 
                           Process
                        </span> 
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

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return{
    checkDisplayStatus:bindActionCreators(sharedAction,dispatch),
    sendToServer: (arg) => dispatch(VoterProfileDataActions.sentDataToServer(arg)),
    updateCurrentUser: bindActionCreators(LoginAction,dispatch),
    updateUserAtServer:bindActionCreators(LoginAction,dispatch),
  };
}
function mapStateToProps(state) {
  return{
    getPageStatus: state.sharedReducer.pageState,
    getUserOriginalId:state.authUserReducer.users.id,
    getUserObject:state.authUserReducer.users,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserDetails));