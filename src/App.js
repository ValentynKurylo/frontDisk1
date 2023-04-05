
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import './App.css';
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login"
import fileComponent from "./components/fileComponent/fileComponent";
import UserService from "./services/UserService";
import UserPage from "./components/userPage/UserPage";

function App() {
    const UserReducer = useSelector((state => state.UserReducer))
    const dispatch = useDispatch()
    useEffect(()=>{
        UserService.auth().then(value => {
            console.log(localStorage.getItem('token'))
            console.log(value)
            if(value.data.status === 200){
                dispatch({type: 'SET_TOKEN', payload: value.data.token})
                dispatch({type: 'SET_CURRENT_USER', payload: value.data.user})
                localStorage.setItem('token', value.data.token)
            }
            else {
                localStorage.removeItem('token')
            }
        })
    }, [])

  return (
    <div className="App">

        <BrowserRouter>
            <Navbar/>
            {!UserReducer.isAuth ?
                <Switch>
                    <Route exact={true} path={'/'} component={Login}/>
                    <Route exact={true} path={'/login'} component={Login}/>
                    <Route exact={true} path={'/registration'} component={Registration}/>
                </Switch> :
                <Switch>
                    <Route exact={true} path={'/userPage'} component={UserPage}/>
                    <Route exact={true} path={''} component={fileComponent}/>
                </Switch>
            }
        </BrowserRouter>
    </div>
  );
}

export default App;
