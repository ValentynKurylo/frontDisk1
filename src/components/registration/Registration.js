import React, {useState, useRef} from 'react';

import "./registration.css"
import UserService from "../../services/UserService";

const Registration = () => {
    let [user, setUser] = useState({})

    let nameRef = useRef('')
    let emailRef = useRef('')
    let passwordRef = useRef('')

    function Registr() {
        setUser(user.fullName = nameRef.current.value)
        setUser(user.email = emailRef.current.value)
        setUser(user.password = passwordRef.current.value)
        console.log(user)
        UserService.registration(user).then(value => {
             alert(value.data.message)
            console.log(value)
        })
    }

    return (
        <div >
            <center>
                <div className='registration'>
                    <div className="header1">Registration</div>
                    <input ref={nameRef} type="text" placeholder="Enter fullName..."/>
                    <hr/>
                    <input ref={emailRef} type="text" placeholder="Enter email..."/>
                    <hr/>
                    <input ref={passwordRef} type="password" placeholder="Enter password..."/>
                    <button className="registration_btn" onClick={() => {
                        Registr()
                    }}>Submit
                    </button>
                </div>
            </center>
        </div>
    );
};

export default Registration;