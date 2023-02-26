import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import bg2 from '../Images/bg2.png'
import './style.css'
import {
  FilledInput,
  CssBaseline,
  CardMedia,
  Alert,
  AlertTitle,
  Stack,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useStateContext } from "../hooks/useStateContext";
import { createAPIEndpoint } from "../api";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export default function Signup() {
  // Initially, no file is selected
  const { setUser, setLoggedin } = useStateContext();

  const [waitSave, setWaitSave] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errorsignup, setErrorsignup] = useState("");
  const [member, setMember] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
    // console.log(name,value,member,code);
  };

  const validate = () => {
    let temp = {};

    temp.email = /\S+@\S+\.\S+/.test(member.email) ? "" : "Email is not valid.";
    //eslint-disable-next-line
    temp.password = member.password.length >= 8 ? "" : "password to short";

    temp.firstName = member.firstName !== "" ? "" : "Required";
    temp.lastName = member.lastName !== "" ? "" : "Required";

    // console.log(user.password.length);
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const signup = (e) => {
    e.preventDefault();
    setWaitSave(true);
    if (validate())
      createAPIEndpoint("Member")
        .post(member)
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          setLoggedin(true);
          setWaitSave(false);
          navigate("/products");
        })
        .catch((err) => {
          setErrorsignup(err.response.data);
          console.log(err);
          setWaitSave(false);
        });
    else setWaitSave(false);
  };

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "dark",
          primary: { main: "#ffffff" },
          background: {
            paper: "#e91e63e6",
            default: "#673ab7",
          },
          text: { primary: "#ffffff" },
        },
        typography: {
          fontFamily: '"Roboto"',
        },
      })}
    >
      <CssBaseline />
      <CardMedia
        component="img"
        src={bg2}
        width="100%"
        height="100%"
        sx={{ position: "fixed", zIndex: "-1" }}
        loading="lazy"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: 355,
            mt: "66px",
            fontWeight: "600",
            fontSize: "2rem",
            letterSpacing: "0.0938em",
          }}
        >
          <CardHeader sx={{textAlign:"center"}} title="SIGN UP" />

          <CardContent>
            <TextField
              fullWidth
              id="standard-read-only-firstName"
              label="First Name"
              name="firstName"
              defaultValue={member.firstName}
              onChange={handleChange}
              variant="filled"
            />

            {errors.firstName !== "" && (
              <Alert severity="error">{errors.firstName}</Alert>
            )}
          </CardContent>

          <CardContent>
            <TextField
              fullWidth
              id="standard-read-only-lastName"
              label="Last Name"
              name="lastName"
              defaultValue={member.lastName}
              onChange={handleChange}
              variant="filled"
            />

            {errors.lastName !== "" && (
              <Alert severity="error">{errors.lastName}</Alert>
            )}
          </CardContent>

          <CardContent>
            <TextField
              fullWidth
              id="standard-read-only-email"
              label="Email"
              name="email"
              defaultValue={member.email}
              onChange={handleChange}
              variant="filled"
            />

            {errors.email !== "" && (
              <Alert severity="error">{errors.email}</Alert>
            )}
          </CardContent>

          

          <CardContent>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={member.password}
                name="password"
                // inputProps={{
                //   readOnly: readOnly,
                // }}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowpassword(!showPassword)}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {errors.password !== "" && (
              <Alert severity="error">{errors.password}</Alert>
            )}
          </CardContent>
          <IconButton className="goToLogin" onClick={()=>navigate('/')}><Typography >already have account!</Typography></IconButton>

          <CardContent fullwidth="true">
            <Box sx={{ width: "100%", textAlign: "center",mt:3 }}>
              <LoadingButton
                onClick={signup}
                loading={waitSave}
                loadingPosition="start"
                startIcon={<LoginOutlinedIcon />}
                variant="coutained"
              >
                <Typography variant="h6">Sign Up</Typography>
              </LoadingButton>
            </Box>
          </CardContent>
          {errorsignup !== "" && (
            <Stack sx={{ mt: 5 }}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorsignup} <strong>check it out!</strong>
              </Alert>
            </Stack>
          )}
        </Card>
      </div>
    </ThemeProvider>
  );
}
