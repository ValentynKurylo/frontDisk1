import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import Avatar from "../../images/avatar.svg"
import "./UserPage.css"
import FileService from "../../services/FileService";
import UserService from "../../services/UserService";

const UserPage = () => {
    const URL_API =  "http://localhost:5000/"
    const dispatch = useDispatch()
    const CurrentUser = useSelector((state => state.UserReducer.currentUser))
    const userAvatar = CurrentUser.avatar ? `${URL_API + CurrentUser.avatar}` : `${Avatar}`
    const [avt, setAvt] = useState(false)
    useEffect(()=>{
        console.log("jjjjj")
        UserService.auth().then(value=>{
            console.log(value)
            dispatch({type: 'SET_TOKEN', payload: value.data.token})
            dispatch({type: 'SET_CURRENT_USER', payload: value.data.user})
        })
    }, [avt])
    function fileSize(size){
        if(size > 1024*1024*1024) {
            return (size/(1024*1024*1024)).toFixed(2)+" Gb"
        }
        if(size > 1024*1024) {
            return (size/(1024*1024)).toFixed(2)+" Mb"
        }
        if(size > 1024) {
            return (size/(1024)).toFixed(2)+" Kb"
        }
        return size+" B"
    }

    function avatarUpload(e) {
        const file = e.target.files[0]
        FileService.avatarUpload(file).then(v =>
            setAvt(!avt)
        )

    }

    function deleteAvatar(e) {
        let x = window.confirm("Are you sure?")
        if(x){
            FileService.avatarDelete().then(v =>
                setAvt(!avt)
            )
        }
    }

    return (
        <div className={"UserPageMain"}>
            <div className={"UserPageLeft"}>
                <img className={"avatar1"} src={userAvatar}/>
                <input type={"file"} accept={"image/*"} className={"avatarInput"} onChange={(e)=>avatarUpload(e)}/>
                <button className={"avatarBTN"} onClick={e=>deleteAvatar(e)}>Delete avatar</button>
            </div>
            <div className={"UserPageRight"}>
                <div className={"UserInfo"}>User information:</div>
                <hr/>
                <div className={"UserName"}>Full Name: {CurrentUser.fullName}</div>
                <div className={"UserName"}>Email: {CurrentUser.email}</div>
                <div className={"UserName"}>Disk Space: {fileSize(CurrentUser.diskSpace)}</div>
                <div className={"UserName"}>Used Space: {fileSize(CurrentUser.usedSpace)}</div>
            </div>
        </div>
    );
};

export default UserPage;