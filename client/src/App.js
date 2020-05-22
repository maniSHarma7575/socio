import React from "react";
import "./App.css"
import Navbar from './components/Navbar'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from "./components/layouts/Home";
import Login from "./components/layouts/Login";
import SignUp from "./components/layouts/SignUp";
import Profile from "./components/layouts/Profile";
import CreatePost from "./components/layouts/CreatePost"
function App() {
    return (
        <BrowserRouter>
        <Navbar/>
        <Route exact path='/'><Home/></Route>
        <Route path='/login'><Login/></Route>
        <Route path='/register'><SignUp/></Route>
        <Route path='/profile'><Profile/></Route>
        <Route path='/createpost'><CreatePost/></Route>
        </BrowserRouter>
    )
}

export default App;