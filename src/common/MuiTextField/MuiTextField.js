import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  root: {
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

const useCustomStyles = makeStyles(() => ({
  root: {
    marginTop: "8px !important",
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
}));

const MuiTextField = ({
  InputLabelProps = {},
  label,
  init_value,
  customText,
  size,
  type,
  name,
  input,
  disabled,
  multiline,
  required = false,
  placeholder,
  rows = 1,
  maxLength,
  certField,
  max,
  min,
  meta: { touched, invalid, error },
}) => {
  const classes = useStyles();
  const customClasses = useCustomStyles();

  useEffect(() => {}, [init_value]);

  return (
    <TextField
      placeholder={placeholder}
      className={customText ? customClasses.root : classes.root}
      name={name}
      multiline={multiline}
      max={max}
      min={min}
      rows={rows}
      value={init_value}
      label={label}
      size={size}
      inputProps={
        maxLength ||
        ((max || min) && { maxLength: maxLength + 1, max: max, min: min })
      }
      disabled={disabled}
      type={type}
      required={required}
      InputLabelProps={
        type === "date" || type === "time" || placeholder || certField
          ? { shrink: true }
          : null
      }
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={
        (touched && error) ||
        (maxLength < input.value.length && `${maxLength}`) ||
        (max < input.value && `${max}`) ||
        (min > input.value && `${min}`)
      }
      error={
        (touched && invalid) ||
        maxLength < input.value.length ||
        max < input.value ||
        min > input.value
      }
      {...input}
    />
  );
};

export default MuiTextField;
