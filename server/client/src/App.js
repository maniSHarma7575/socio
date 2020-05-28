import React,{useContext, createContext,useReducer,useEffect} from "react";
import "./App.css"
import Navbar from './components/Navbar'
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from "./components/layouts/Home";
import Login from "./components/layouts/Login";
import SignUp from "./components/layouts/SignUp";
import Profile from "./components/layouts/Profile";
import CreatePost from "./components/layouts/CreatePost"
import UserProfile from "./components/layouts/UserProfile"
import SubscribePosts from "./components/layouts/SubscribePosts"
import {reducer,initialState} from './reducers/userReducers'
import ResetPassword from "./components/layouts/Reset";
import NewPassword from "./components/layouts/NewPassword";
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
function App() {
    const [state,dispatch]=useReducer(reducer,initialState)
    return (
        <UserContext.Provider value={{state:state,dispatch:dispatch}}>
        <BrowserRouter>
        <Navbar/>
        <Routing />
        </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;