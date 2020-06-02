import React,{useContext} from 'react';
import { Route,Redirect } from 'react-router-dom';
import {UserContext} from '../../App'
const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const {state,dispatch}=useContext(UserContext)
  return (
    state?<Redirect to='/dashboard' />:<Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};



export default RouteWithLayout;
