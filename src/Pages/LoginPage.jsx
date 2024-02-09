import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import '../css/login.css'

function LoginPage({ setAuth }) {
  const [getdata, setgetdata] = useState({
    name: "",
    password: ""
  })

  const [login, setlogin] = useState(false)

  const [navigate, setnavigate] = useState([])

  const [loader, setloader] = useState(false)

  const [showpass, setshowpass] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/login', getdata);
      localStorage.setItem('auth', JSON.stringify(response.data));
      toast.success('Login Success');
      setAuth(response.data || '');
      setnavigate(response.data || '')
      setlogin(true)
      setloader(true)
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  if (login === true) {
    console.log(navigate.role || '');
    return <Navigate to={'/home'} replace={true} />;
  }



  return (
    <>
      <div className='container-main '>
        <div className="login-head d-flex align-items-center justify-content-center p-5 position-relative ">
          <div className="spiner-loader position-absolute">
            <div className="mesh-loader" style={{ display: loader ? "flex" : "none", zIndex: "1" }}>
              <div className="set-one">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <div className="set-two">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
          </div>
          <form className="form border rounded shadow p-3 col-12 col-lg-6 col-md-6 col-sm-6  row row-cols-2 position-relative " style={{ opacity: loader ? "0.1" : "1" }}>
            <div className="col-lg-6 img-div">
              <img src={require("../img/groups.png")} alt="body-building" className='login-side-img d-sm-none d-lg-flex d-xl-flex' />
            </div>
            <div className="input-values col-12 col-lg-6">
              <h2 className='text-center text-3xl font-semibold text-gray-200 '>Login</h2>
              <div className="username my-5">
                <input
                  type="text"
                  name="usercode"
                  className="input-username"
                  placeholder="   "
                  onChange={(e) => setgetdata({ ...getdata, name: e.target.value })}
                  required
                  autoComplete="off" />
                <label htmlFor="input-username" className=" text-black label-username">
                  Enter UserCode
                </label>
              </div>
              <div className="input-password mt-2">
                <div className="input-container">
                  <input
                    type={showpass ? 'text' : 'password'}
                    name="password"
                    className="form-controls"
                    placeholder="  "
                    id="input-pass"
                    onChange={(e) => setgetdata({ ...getdata, password: e.target.value })}
                    style={{ display: showpass ? '!' : 'flex' }}
                    autoComplete="off"
                  />
                  <label htmlFor="input-pass" className="text-black label-passowrd">
                    Enter Password
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-success bg-green-800 col-12 mt-5" 
                onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default LoginPage
