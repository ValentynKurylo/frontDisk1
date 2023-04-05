import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";

import './createModal.css'
import FileService from "../../services/FileService"

const CreateModal = () => {
    const createModal = useSelector(state => state.FileReducer.createModal)
    const currentDir = useSelector(state => state.FileReducer.currentDir)
    const dispatch = useDispatch()

    let [dir, setDir] = useState({})
    let nameDirRef = useRef('')

    function createDir() {
        setDir(dir.name = nameDirRef.current.value)
        setDir(dir.type = "dir")
        if(currentDir){
            setDir(dir.parent = currentDir)
        }
        console.log(dir)
        FileService.createDir(dir).then(value => {
            console.log(value)
            dispatch({type: "ADD_FILE", payload: value.data})
        })

    }

    return (
        <div className="popup" onClick={()=>{dispatch({type: "SET_CREATE_MODAL", payload: 'none'})}} style={{display: createModal}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Create new folder</div>
                    <button className="popup__close" onClick={()=>{dispatch({type: "SET_CREATE_MODAL", payload: 'none'})}}>X</button>
                </div>
                <input type="text" ref={nameDirRef} placeholder="Enter name of folder..." />
                <button className="popup__create" onClick={()=>{createDir()}}>Create</button>
            </div>
        </div>
    );
};

export default CreateModal;