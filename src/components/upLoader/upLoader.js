import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import UploadFile from "./UploadFile";
import './upLoader.css'

const UpLoader = () => {
    const dispatch = useDispatch()
    let UploaderReducer = useSelector(state => state.UploaderReducer)
    return (
        <div>
            <div className="uploader">
                <div className="uploader__header">
                    <div className="uploader__title">Uploads:</div>
                    <button className="uploader__close" onClick={()=>{
                        dispatch({type: 'SET_IS_VISIBLE', payload: false})
                        dispatch({type: 'SET_UPLOAD_FILES', payload: []})}
                    }>X</button>
                </div>
                {UploaderReducer.filesUpload.map(file =>
                    <UploadFile key={file.id} file={file}/>
                )}
            </div>
        </div>
    );
};

export default UpLoader;