import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import "./fileStyle.css"
import fileService from "../../services/FileService"
import File from "./file/File";
import CreateModal from "./createModal";
import UpLoader from "../upLoader/upLoader";
import axios from "axios";

const FileComponent = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.FileReducer.currentDir)
    const files = useSelector(state => state.FileReducer.files)
    const UploaderReducer = useSelector(state => state.UploaderReducer)
    const loader = useSelector(state => state.AppReducer.loader)
    const stackDir = useSelector(state => state.FileReducer.dirStack)
    const [drag, setDrag] = useState(false)
    const [sort, setSort] = useState("type")
    const [search, setSearch] = useState('')
    const [searchTime, setSearchTime] = useState(false)

    useEffect(()=>{
        console.log(currentDir)
        dispatch({type: "SET_LOADER", payload: true})
        fileService.getFiles(currentDir, sort).then(value => {
            dispatch({type: 'SET_FILES', payload: value.data})
            dispatch({type: "SET_LOADER", payload: false})
        })
    }, [currentDir, sort])

    function backDir() {
        const d = stackDir.pop()
        dispatch({type: "SET_CURRENT_DIR", payload: d})
    }

    function fileUpload(e) {
        const url = "http://localhost:5000/file"
        const files1 = [...e.target.files]
        console.log(files1)
        dispatch({type: 'SET_IS_VISIBLE', payload: true})
        for(let i = 0; i < files1.length; i++){
            const formData = new FormData()
            formData.append('file', files1[i])
            console.log("llll", files1[i])
            if (currentDir) {
                formData.append('parent', currentDir)
            }
            let uploadFile = {name: files1[i].name, progress: 0, id: Date.now()}
            dispatch({type: "ADD_UPLOAD_FILE", payload: uploadFile})
            axios.post(`${url}/file`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    if (progressEvent.total) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        console.log(uploadFile)
                        dispatch({type: "CHANGE_UPLOAD_FILE", payload: uploadFile})
                    }
                }
            }).then(value=>{
                dispatch({type: "ADD_FILES", payload: value.data.file})
            })

            /*FileService.postFile(files1[i], currentDir).then(value =>{

                console.log("aaa", value)
                dispatch({type: "CHANGE_UPLOAD_FILE", payload: uploadFile1})
            })*/
        }

    }

    function dragEnter(event){
        event.preventDefault()
        event.stopPropagation()
        setDrag(true)
    }
    function dragLeave(event){
        event.preventDefault()
        event.stopPropagation()
        setDrag(false)
    }
    function dropFile(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        console.log(files)
        for(let i = 0; i < files.length; i++){
            fileService.postFile(files[i], currentDir)
        }
        setDrag(false)
    }

    function searchFile(e) {
        console.log("search", e.target.value)
        setSearch(e.target.value)
        if (searchTime !== false) {
            clearTimeout(searchTime)
        }
        if(e.target.value !== '') {
            setSearchTime(setTimeout((value)=>{
            fileService.searchFiles(value, currentDir).then(value => {
                console.log(value.data)
                dispatch({type: "SET_FILES", payload: value.data})
            })
            }, 500, e.target.value))
        }else{
            fileService.getFiles(currentDir, sort).then(value => {
                dispatch({type: 'SET_FILES', payload: value.data})
            })
        }
    }

    if(loader === true){
        return (<div className={"loader"}>
            <div className="lds-default">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>)
    }

    return ( !drag ?
        <div onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter}>
            <hr/>
            <div className="disk_btns">
                <button className="disk_back" onClick={backDir}>Back</button>
                <button className="disk_create" onClick={() => {
                    dispatch({type: 'SET_CREATE_MODAL', payload: ''})
                }}>Create folder
                </button>

                <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
                <input multiple={true} type="file" id="disk__upload-input" className="disk__upload-input" onChange={(e)=>{fileUpload(e)}}/>
                <div className={"options"}><select value={sort}
                           onChange={(e) => setSort(e.target.value)}
                           className='disk__select'>
                    <option value="name">By name</option>
                    <option value="type">By type</option>
                    <option value="date">By date</option>
                </select>
                    <input
                        className='search'
                        type="text"
                        value={search}
                        placeholder="Search..."
                        onChange={(e)=>searchFile(e)}
                    /></div>
            </div>

            <hr/>
            <div className="filelist_header">
                <div className="filelist_name">Name</div>
                <div className="filelist_date">Date</div>
                <div className="filelist_size">Size</div>
            </div>
            {files ? <TransitionGroup>
                {files.map(file =>
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <File item={file}/>
                    </CSSTransition>
                )}
            </TransitionGroup> : <div>No files</div>}
            <CreateModal/>
            {UploaderReducer.isVisible && <UpLoader/>}
        </div> : <div className={"drag-area"} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter} onDrop={dropFile}>Drag files here!</div>
    );
};

export default FileComponent;