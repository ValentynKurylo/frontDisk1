import React from 'react';
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";

import "./Navbar.css"
import Logo from "../../images/navbar-logo.svg"
import Avatar from "../../images/avatar.svg"

const Navbar = () => {
    const URL_API =  "http://localhost:5000/"
    const UserReducer = useSelector((state => state.UserReducer))
    const dispatch = useDispatch()
    const userAvatar = UserReducer.currentUser.avatar ? `${URL_API + UserReducer.currentUser.avatar}` : `${Avatar}`

    function Logout(e) {
        e.preventDefault()
        if(window.confirm("Are you sure?")){
            dispatch({type: "LOGOUT"})
            localStorage.removeItem('token')
        }
    }
    return (
        <div className={"main"}>
            <div className="container">
                <div className={"left"}>

                    <Link to="/"><img src={Logo} alt="" className="logo"/></Link>
                    <Link to="/"> <div className="header">KURYLO CLOUD</div> </Link>
                </div>
               
                <div className={"right"}>
                    {!UserReducer.isAuth && <div className="login"><Link to="/login">Login</Link></div>}
                    {!UserReducer.isAuth && <div className="registration_link"><Link to="/registration">Registration</Link></div>}
                    {UserReducer.isAuth && <div className={"avatar"}><Link to="/userPage"><img src={userAvatar} className={"imgAvatar"}/> </Link></div>}
                    {UserReducer.isAuth && <div className="login" onClick={(e)=>{Logout(e)}}><Link to="/">Logout</Link></div>}

                </div>
            </div>
        </div>
    );
};

export default Navbar;