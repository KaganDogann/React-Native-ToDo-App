import { combineReducers } from "redux";
import doingReducer from "./reducer/doingReducer";
import doneReducer from "./reducer/doneReducer";
import toDoReducer from "./reducer/toDoReducer";


const rootReducer = combineReducers({

    toDo : toDoReducer,
    doing : doingReducer,
    done : doneReducer
})

export default rootReducer;