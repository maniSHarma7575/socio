import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {Dashboard} from './views'
import {Login} from './views'
import {NotFound} from './views'
import {SignUp} from './views'
import {NewPassword} from './views'

import {reducer,initialState} from './reducers/userReducers'

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      
      <RouteWithLayout
        component={SignUp}
        exact
        layout={MinimalLayout}
        path="/register"
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NewPassword}
        exact
        layout={MinimalLayout}
        path="/reset/:token"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
