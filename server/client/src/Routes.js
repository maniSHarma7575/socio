import { Switch, Redirect ,useHistory} from 'react-router-dom';
import React,{useContext, createContext,useReducer,useEffect} from "react";
import { RouteWithLayout, NotFoundRoute } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {Dashboard} from './views'
import {Login} from './views'
import {NotFound} from './views'
import {SignUp} from './views'
import {NewPassword} from './views'
import {ResetPassword} from './views'
import {ProfileView} from './views'
import {PrivateRouteWithLayout} from './components'
import {reducer,initialState} from './reducers/userReducers'
import {UserContext} from './App'
const Routes = () => {
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)
      useEffect(() => {
        
        const user=JSON.parse(localStorage.getItem('user'))
        if(user)
        {
            dispatch({type:"USER",payload:user})
          
        }
        else{
            if(!history.location.pathname.startsWith('/reset'))
                history.push('/login')
        }
    }, [])
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <PrivateRouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile/:userid"
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
        component={ResetPassword}
        exact
        layout={MinimalLayout}
        path="/reset"
      />
      <NotFoundRoute
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
