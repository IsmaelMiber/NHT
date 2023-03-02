import React from "react";
import { makeStyles } from "@material-ui/core";
import { InputLabel, FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    margin: "10px auto",
    "& label.Mui-focused": {
      color: "blue",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "blue",
      },
    },
  },
}));

const MuiSelectField = ({
  label,
  input,
  children,
  required,
  disabled = false,
  meta: { touched, invalid, error },
}) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      className={classes.root}
      error={touched && invalid}
    >
      <InputLabel>{label}</InputLabel>
      <Select disabled={disabled} label={label} {...input} required={required}>
        {children}
      </Select>
      <FormHelperText>{touched && error && error}</FormHelperText>
    </FormControl>
  );
};

export default MuiSelectField;
