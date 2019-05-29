import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import notes from "../duck/notes";


const rootReducer = combineReducers({
    router: routerReducer,
    notes
});
export default rootReducer;