import React, {  useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import Login from "./component/Login";
import NotificationSnackbar from "./component/NotificationSnackbar";
import Signup from "./component/SignUp";
import Products from './container/productContainer';
import { useStateContext } from "./hooks/useStateContext";

function App() {
  const {loggedin}=useStateContext()
  useEffect(() => {
    localStorage.setItem("wasLoggedin", loggedin);
  }, [loggedin]);
return(
<BrowserRouter>

  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/products" element={<Products/>}/>  
    <Route path="/signup" element={<Signup />} />

  </Routes>
  <NotificationSnackbar/>

          </BrowserRouter>)}
export default App