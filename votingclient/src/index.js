import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';
import { BrowserRouter   } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './config/setAuthToken';
import LoginActions from './Action/LoginActions';

import * as AdminAction from './Action/AdminLoginAction/index';

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(LoginActions.setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if(localStorage.jwtToken1){
  setAuthorizationToken(localStorage.jwtToken1);
  store.dispatch(AdminAction.setAdminUser(jwt.decode(localStorage.jwtToken1)));
}


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      <App />
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root'));
// initializeFirebase(); 
registerServiceWorker();
