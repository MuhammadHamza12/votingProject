import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Information from 'mdi-material-ui/Information';
import ErrorTwoTone from '@material-ui/icons/ErrorTwoTone';
export function InfoMessage  (props) {

  console.log('all function proops',props);
  if(!props.profileFlag){
    return(
      <Message 
        positive={props.positiveMsg} negative={props.negativeMsg} >
        <Message.Header> 
          <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}} >
            <div style={{marginBottom:5,marginRight:3}} >
              { props.positiveMsg ? <Information/> : null    }  
            </div>
            <div>  
              {(props.msg) ? props.msg : null}
            </div>
          </div>
        </Message.Header>
        {props.negativeMsg ? <ErrorTwoTone /> : null}
        <div style={{position:'relative',bottom:10}} >
        {props.negativeMsg ? props.errorMsg : null}
        </div>

      </Message>
    );
  }else{
    return null;
  }
}
InfoMessage.propTypes = {
  profileFlag:PropTypes.bool.isRequired,
};
