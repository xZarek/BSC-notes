import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import notes from "../duck/notes";
import modal from "../duck/modal";
import language from "../duck/language";


const rootReducer = combineReducers({
    router: routerReducer,
    notes,
    modal,
    language
});
export default rootReducer;