import {
    FETCH_Employees_LIST_REQUEST,
    FETCH_Employees_LIST_SUCCESS,
    FETCH_Employees_LIST_FAILURE,
  } from "./type";
  
  import axios from "axios";
  
  export const fetchEmployeesRequest = () => {
    return {
      type: FETCH_Employees_LIST_REQUEST,
    };
  };
  
  const fetchEmployeesSuccess = (employees) => {
    return {
      type: FETCH_Employees_LIST_SUCCESS,
      payload: employees,
    };
  };
  
  const fetchEmployeesFailure = (error) => {
    return {
      type: FETCH_Employees_LIST_FAILURE,
      payload: error,
    };
  };
  
  export const fetchEmployees = () => {
    return (dispatch) => {
      dispatch(fetchEmployeesRequest);
      axios
        .get(`http://localhost:3000/employees`)
        .then((res) => {
          console.log(res?.data
            , "employees");
          const employees = res.data;
          dispatch(fetchEmployeesSuccess(employees, " redux products"));
        })
  
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchEmployeesFailure(errorMsg));
        });
    };
  };

  export const fetchFilterdEmployees = (data) => {
    return (dispatch) => {
      dispatch(fetchEmployeesRequest);
      let url = new URL("http://localhost:3000/employees")
    data.email &&   url.searchParams.set("email" , data.email)
    data.phone &&  url.searchParams.set("phone" , data.phone)
    data.company &&  url.searchParams.set("company" , data.company)
    data.date &&  url.searchParams.set("birthDate" , data.date)
    data.name &&  url.searchParams.set("username" , data.name)
      axios
        .get(url.toString())
        .then((res) => {
          console.log(res?.data
            , "employees");
          const employees = res.data;
          dispatch(fetchEmployeesSuccess(employees, " redux products"));
        })
  
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchEmployeesFailure(errorMsg));
        });
    };
  };
  