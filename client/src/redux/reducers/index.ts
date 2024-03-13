import { combineReducers } from "redux";
import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
import goalReducer from "./goalReducer";
import contactReducer from "./contactReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    expenseReducer: expenseReducer,
    goalReducer: goalReducer,
    contactReducer: contactReducer,
    transactionReducer: transactionReducer
});

export default rootReducer;