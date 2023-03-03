import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import EmployeesList from "../components/EmplyeesList";
import FiltersForm from "../components/FiltersForm";
import { fetchEmployees } from "../Redux/EmployeesList/action";
import { fetchFilterdEmployees } from "../Redux/EmployeesList/action";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { useNavigate, useParams } from "react-router-dom";
const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const PersistentDrawerLeft = ({ handleSubmit }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { page } = useParams();
  const employees = useSelector((state) => state.employees);
  const emoloyees_list = employees?.employees;
  const [filteredPersons, setFilteredPersons] = useState([]);
  console.log(filteredPersons, "filteredPersons");
  console.log(emoloyees_list, "emoloyees_list");
  const formNotify = useSelector((state) => state.form);
  console.log(formNotify?.FiltersForm, "formNotify");
  console.log(page, "params");
  console.log(employees?.loading, "employees787");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchEmployees());
    console.log("fetchEmploy");
  }, [formNotify?.FiltersForm?.values]);

  const submit = async (values) => {
    console.log(values, "values");
    const data = {
      email: values.by_email,
      phone: values.by_phone,
      name: values.by_name,
      company: values.by_company,
      date: values.by_date,
    };
    formNotify?.FiltersForm?.values
      ? await dispatch(fetchFilterdEmployees(data))
      : await dispatch(fetchEmployees());
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography
            align="center"
            variant="h3"
            style={{ fontWeight: "bolder" }}
          >
            {" "}
            FILTERS
          </Typography>
        </DrawerHeader>

        <form onSubmit={handleSubmit((values) => submit(values))}>
          <FiltersForm />
        </form>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <EmployeesList pagee={page} emoloyees_list={emoloyees_list} />
      </Main>
    </Box>
  );
};

export default connect(null)(
  reduxForm({ form: "FiltersForm", enableReinitialize: true })(
    PersistentDrawerLeft
  )
);
