import React,{useContext} from 'react';
import { Route,Redirect } from 'react-router-dom';
import {UserContext} from '../../App'
const PrivateRouteWithLayout = props => {
    const {state,dispatch}=useContext(UserContext)
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    state?<Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />:<Redirect to='/login' />
  );
};



export default PrivateRouteWithLayout;
