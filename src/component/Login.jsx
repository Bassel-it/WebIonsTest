import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { createAPIEndpoint } from "../api";
import { useStateContext } from "../hooks/useStateContext";
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { CardMedia, CssBaseline, FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material/';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bg from '../Images/bg.png'

function Login() {
  const { user, setUser, setLoggedin } = useStateContext();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorlogin, setErrorlogin] = useState("");
  const [waitSave, setWaitSave] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(user.email) ? "" : "Email is not valid.";
    //eslint-disable-next-line
    temp.password = user.password.length >= 8 ? "" : "password too short";
    // console.log(user.password.length);
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const login = (e) => {
    setWaitSave(true);
    setErrorlogin("");
    e.preventDefault();
    console.log(process.env);
    if (validate())
      createAPIEndpoint("Member/Login")
        .post(user)
        .then((res) => {
          // console.log("sending", user);
          // console.log("reseiving", res);
          if (res.data === "") {
            setErrorlogin("wrong Password or Email");
            setWaitSave(false);
          } else {
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
            setLoggedin(true);
            setWaitSave(false);
            navigate("/products");
          }
        })
        .catch((err) => {
          setErrorlogin(err.message);
            setWaitSave(false);
            console.log(err);
        });
    else setWaitSave(false);
  };

  return (
    <ThemeProvider
        theme={createTheme({
         
          palette: {
            mode: 'dark',
            primary: { main: '#ffffff' },
            background: {
               paper: '#673ab7ed',
                        default: '#673ab7' 
                      },
            text:{primary:'#ffffff'}
           
          },
          typography:{
                fontFamily:'"Roboto"'
              }
        })}
      > 
      <CssBaseline />
      <CardMedia
        component="img"
        src={bg}
        width="100%"
        height="100%"
        sx={{position:"fixed",zIndex:"-1"}}
        loading="lazy"
        />
        <IconButton sx={{position:"fixed",top:0,right:2}} onClick={()=>{
          navigate('/signup')
        }}><Typography>SIGN UP</Typography></IconButton>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width:{md: 400,xs:350}, mt: {md:"300px",xs:"200px"} }}>
        <CardHeader
         sx={{textAlign:'center'}}
          title="Login"
        />
       


        <CardContent>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            variant="filled"
          />

          {errors.email !== "" && (
            <Typography style={{ color: "red" }}>({errors.email})</Typography>
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
              value={user.password}
              name="password"
              // inputProps={{
              //   readOnly: readOnly,
              // }}
              onChange={handleInputChange}
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
            <Typography style={{ color: "red" }}>({errors.password})</Typography>
          )}
        </CardContent>


        <CardContent fullwidth="true">
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <LoadingButton
              onClick={login}
              loading={waitSave}
              loadingPosition="start"
              startIcon={<LoginOutlinedIcon />}
              variant="coutained"
            >
              Login
            </LoadingButton>
          </Box>
        </CardContent>
        {errorlogin !== "" && (
          <Stack sx={{ mt: 5 }}>
            <Alert severity="error">
              <AlertTitle>{errorlogin}</AlertTitle>
              <strong>check it out!</strong>
            </Alert>
          </Stack>
        )}
      </Card>
    </div>
    </ThemeProvider>
  );
}

export default Login;
