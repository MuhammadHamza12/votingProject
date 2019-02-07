import React from 'react';
// import { Route , Switch , Router } from 'react-router-dom';
import CustomNavBar from './components/container/publicComponent/CustomNavBar.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes.jsx';
export default class App extends React.Component { 
  render(){
    return(
      <Router>
        <div>
          <CustomNavBar  />
          <MainRoutes />
        </div>
      </Router>
    );
  }
}
