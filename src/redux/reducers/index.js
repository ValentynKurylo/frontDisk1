import {combineReducers} from "redux";

import {UserReducer} from "./userReducer";
import {FileReducer} from "./fileReducer";
import {UploaderReducer} from "./uploaderReducer";
import {AppReducer} from "./appReducer";

export default combineReducers({
    UserReducer: UserReducer,
    FileReducer: FileReducer,
    UploaderReducer: UploaderReducer,
    AppReducer: AppReducer
});