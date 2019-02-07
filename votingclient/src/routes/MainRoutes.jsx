import React, { Component } from 'react';
import { Switch , Route } from 'react-router-dom';
import LoginPage from '../components/container/publicComponent/LoginPage.jsx';
import CandidateRequestPage from '../components/container/publicComponent/CandidateRequestPage.jsx';
import Dashboard from '../components/container/dashboard/Dashboard.jsx';
import requireAuthCommon from '../components/secureRoutesMiddleware/requireAuthCommon';
import AdminLogin from '../components/container/Admin/AdminLogin.jsx';
import AdminDashboard from '../components/container/Admin/AdminDashboard.jsx';
import PageNotFound from './../components/dumpComponents/PageNotFound.jsx';
export default class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={requireAuthCommon(CandidateRequestPage)} />
          <Route path='/login' component={requireAuthCommon(LoginPage)} />
          <Route path='/dashboard' component={requireAuthCommon(Dashboard)} />
          <Route path='/Admin' component={ requireAuthCommon(AdminLogin)} />
          <Route path='/Adashboard' component={requireAuthCommon(AdminDashboard)} />
          <Route component={PageNotFound} />
        </Switch>
        
      </div>
    );
  }
}
