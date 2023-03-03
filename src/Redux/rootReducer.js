import { combineReducers } from "redux";
import EmloyeesReducer from "./EmployeesList/reducer";
import { reducer as formReducer } from "redux-form";
const rootReducer = combineReducers({
  employees: EmloyeesReducer,
  form: formReducer,
});

export default rootReducer;
