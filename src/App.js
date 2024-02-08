// App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Contact from "./Pages/Contact";
import AdminPage from "./Pages/AdminPage";
import Navbar from "./Pages/Navbar";
import PageNotfound from "./Pages/PageNotfound";
import Useraccess from "./Pages/Useraccess";

import UserRegistraion from "./Pages/UserRegistraion";



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { ParallaxProvider} from 'react-scroll-parallax';



function App() {

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))


  useEffect(() => {

    const localData = () => {
      const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
      setAuth(isAuthenticated);
    };
    localData();

  }, []);



  return (
    <>

      <Routes>
        <Route path="/" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterPage />} />



        {auth !== null ? (
          <Route path="/home" element={<Navbar auth={auth}> <AdminPage /> </Navbar>}>
          </Route>
        ) : (
          <Route path="*" element={<PageNotfound />} />
        )}


        <Route path="/access" element={auth?.usertype_sub === 'a' ? (
          <Navbar><Useraccess /></Navbar>) : (
          <PageNotfound />)
        } />

        <Route path="/useraccountreg" element={auth?.userregister_sub === 'a' ? (
          <Navbar><UserRegistraion /></Navbar>) : (
          <PageNotfound />)
        } />

        <Route path="/contact" element={auth?.contact === 'a' ? (
        
            <Navbar ><ParallaxProvider><Contact /></ParallaxProvider></Navbar>
       

        ) : (
          <PageNotfound />)
        } />


        <Route path="*" element={<PageNotfound />} />

      </Routes >
      <ToastContainer />
    </>

  );
}

export default App;
