import {
    FETCH_Employees_LIST_REQUEST,
    FETCH_Employees_LIST_SUCCESS,
    FETCH_Employees_LIST_FAILURE,
  } from "./type";
  
  const initialState = {
    loading: false,
    employees: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_Employees_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_Employees_LIST_SUCCESS:
        return {
          loading: false,
          employees: action.payload,
          error: "",
        };
  
      case FETCH_Employees_LIST_FAILURE:
        return {
          loading: false,
          employees: [],
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  