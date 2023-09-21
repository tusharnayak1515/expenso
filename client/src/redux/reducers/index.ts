import { combineReducers } from "redux";
import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    expenseReducer: expenseReducer
});

export default rootReducer;