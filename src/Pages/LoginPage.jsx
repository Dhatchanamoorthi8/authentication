import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage({ setAuth }) {
  const [getdata, setgetdata] = useState({
    name: "",
    password: ""
  })

  const [login, setlogin] = useState(false)

  const [navigate, setnavigate] = useState([])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/login', getdata);
      localStorage.setItem('auth', JSON.stringify(response.data));
      toast.success('Login Success');
      setAuth(response.data || '');
      setnavigate(response.data || '')
      setlogin(true)
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  if (login === true) {
    console.log(navigate.role || '');
    return <Navigate to={'/home'} replace={true} />;
  }




  return (
    <div>
      <div className="register-head w-50  d-flex justify-content-center align-items-center ms-auto me-auto mt-5">

        <form action="" className=' form-control row' onSubmit={handleLogin}>

          <div className="name">
            <label htmlFor="name" className=' form-label '>name</label>
            <input type="text" className=' form-control ' onChange={(e) => setgetdata({ ...getdata, name: e.target.value })} />
          </div>

          <div className="password mb-3">
            <label htmlFor="name" className=' form-label '>password</label>
            <input type="text" className='form-control' onChange={(e) => setgetdata({ ...getdata, password: e.target.value })} />
          </div>

          <button className=' btn btn-success'>Login</button>
        </form>

      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginPage