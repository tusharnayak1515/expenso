import { combineReducers } from "redux";
import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
import goalReducer from "./goalReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    expenseReducer: expenseReducer,
    goalReducer: goalReducer
});

export default rootReducer;