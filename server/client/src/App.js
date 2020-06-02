import React,{useContext, createContext,useReducer,useEffect} from "react";
import { createBrowserHistory } from 'history';
import Navbar from './components/Navbar'
import {Router,Route, Switch,useHistory} from 'react-router-dom'
import Home from "./views/Soscial/Home/Home";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import Profile from "./views/Soscial/Profile/Profile";
import CreatePost from "./views/Soscial/CreatePost/CreatePost"
import UserProfile from "./views/Soscial/UserProfile/UserProfile"
import SubscribePosts from "./views/Soscial/SubscribePosts/SubscribePosts"
import {reducer,initialState} from './reducers/userReducers'
import ResetPassword from "./views/Reset/Reset";
import NewPassword from "./views/NewPassword/NewPassword";
import Routes from './Routes';
import './assets/scss/index.scss';
import validate from 'validate.js';
import validators from './common/validators';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
const browserHistory = createBrowserHistory();
export const UserContext=createContext()
const Routing=()=>{
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
    return(
        <Switch>
            <Route exact path='/'><Home/></Route>
            <Route path='/login'><Login/></Route>
            <Route path='/register'><SignUp/></Route>
            <Route exact path='/profile'><Profile/></Route>
            <Route path='/createpost'><CreatePost/></Route>
            <Route path='/profile/:userid'><UserProfile/></Route>
            <Route path='/myfollowposts'><SubscribePosts/></Route>
            <Route exact path='/reset'><ResetPassword/></Route>
            <Route path='/reset/:token'><NewPassword/></Route>
        </Switch>
    )
}
validate.validators = {
    ...validate.validators,
    ...validators
  };
function App() {
    const [state,dispatch]=useReducer(reducer,initialState)
    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{state:state,dispatch:dispatch}}>
                <Router history={browserHistory}>
                    <Routes/>
                </Router>
            </UserContext.Provider>
        </ThemeProvider>
    )
}

export default App;