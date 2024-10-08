import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import dirLogo from "../../../images/fxemoji_filefolder.svg"
import fileLogo from "../../../images/flat-color-icons_file.svg"
import downImg from "../../../images/Vector.svg"
import deleteImg from "../../../images/Vector 9.svg"
import './File.css'
import FileService from "../../../services/FileService"

const File = ({item}) => {
    const dispatch = useDispatch()
    const stackDir = useSelector(state => state.FileReducer.dirStack)
    function openDir(item) {
        if(item.type === "dir"){
            stackDir.push(item._id)
            dispatch({type: "SET_CURRENT_DIR", payload: item._id})
        }
    }

    function fileSize(size){
        if(size > 1024*1024*1024) {
            return (size/(1024*1024*1024)).toFixed(1)+"Gb"
        }
        if(size > 1024*1024) {
            return (size/(1024*1024)).toFixed(1)+"Mb"
        }
        if(size > 1024) {
            return (size/(1024)).toFixed(1)+"Kb"
        }
        return size+"B"
    }

    function downloadClick(e) {
        e.stopPropagation()
        FileService.downloadFile(item)
    }

    function deleteFile(e) {
        e.stopPropagation()
        let b = prompt("Are you sure? Enter 1")
        if (b) {
            FileService.deleteFile(item).then(value => {
                dispatch({type: "DELETE_FILE", payload: item._id})
                alert(value.data.message)
            })
        }
    }

    return (
        <div className={"file"} onClick={()=> openDir(item)}>
            <img src={item.type === 'dir' ? dirLogo : fileLogo} alt="" className={"file_img"}/>
            <div className={"file_name"}>{item.name}</div>
            <div className={"file_date"}>{item.date.slice(0, 10)}</div>
            <div className={"file_size"}>{fileSize(item.size)}</div>
            <div className={"btns"}>
                {item.type !== "dir" && <img className={"file_btns"} src={downImg} alt={""} onClick={(e)=>downloadClick(e)}/>}
                <img className={"file_btns"}  src={deleteImg} alt={""} onClick={(e)=>{deleteFile(e)}}/>
            </div>
        </div>
    );
};

export default File;