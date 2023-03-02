import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import MuiTextField from "../common/MuiTextField/MuiTextField";
import { Grid  , Button} from "@mui/material";
const FiltersForm = ({  }) => {


  return (
    <>
     
    
     <Grid container columns={12} spacing={2} justifyContent="center" mt={3}>
     <Grid item xs={10} >
     <Field
      
      type="text"
      name="by_email"
      component={MuiTextField}
      label="email"
    />
  </Grid>

  <Grid item xs={10} >
     <Field
      type="number"
      name="by_phone"
      component={MuiTextField}
      label="phone"
    />
  </Grid>

  <Grid item xs={10} >
     <Field
      
      type="text"
      name="by_name"
      component={MuiTextField}
      label="name"
    />
  </Grid>

  <Grid item xs={10} >
     <Field
      
      type="text"
      name="by_company"
      component={MuiTextField}
      label="company"
    />
  </Grid>

  <Grid item xs={10} >
     <Field
      
      type="date"
      name="by_date"
      component={MuiTextField}
      label="date"
    />
  </Grid>
  <Button variant="contained" type="submit">Filter</Button>
     </Grid>
    
   
     </>
  );
};

export default FiltersForm

