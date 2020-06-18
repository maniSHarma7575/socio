import React,{useContext, createContext,useReducer,useEffect} from "react";
import { createBrowserHistory } from 'history';
import {Router,Route, Switch,useHistory} from 'react-router-dom'
import {reducer,initialState} from './reducers/userReducers'
import {postReducer,postinitialState} from './reducers/postReducers'
import { SnackbarProvider } from "notistack";
import Routes from './Routes';
import './assets/scss/index.scss';
import validate from 'validate.js';
import validators from './common/validators';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import {Provider} from 'react-redux'
import {configureStore} from '../src/store'
const browserHistory = createBrowserHistory();
export const UserContext=createContext()
export const PostContext=createContext()

validate.validators = {
    ...validate.validators,
    ...validators
  };
function App() {
    const store=configureStore()
    const [state,dispatch]=useReducer(reducer,initialState)
    const [postStateValue,postDispatchValue]=useReducer(postReducer,postinitialState)
    return (
        <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
            <UserContext.Provider value={{state:state,dispatch:dispatch}}>
                <PostContext.Provider value={{postState:postStateValue,postDispatch:postDispatchValue}}>
                    <Router history={browserHistory}>
                        <Routes/>
                    </Router>
                </PostContext.Provider>
            </UserContext.Provider>
            </SnackbarProvider>
        </ThemeProvider>
        </Provider>
    )
}

export default App;