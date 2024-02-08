import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {

 const [getdata, setgetdata] = useState({
  name: "",
  password: ""
 })

 const Navigate =useNavigate()

 const hanleregister = (e) => {
  e.preventDefault()
  axios.post('http://localhost:3003/register',getdata)
  .then((res)=>{
   console.log(res)
   toast.success(res.data)
   Navigate('/login')
  })
  .catch((err)=> {
   console.log(err)
   toast.error(err.response.data)
  })
 }
 return (
  <div>

   <div className="register-head w-50  d-flex justify-content-center align-items-center ms-auto me-auto mt-5">

    <form action="" className=' form-control row' onSubmit={hanleregister}>

     <div className="name">
      <label htmlFor="name" className=' form-label '>name</label>
      <input type="text" className='form-control' onChange={(e) => setgetdata({ ...getdata, name: e.target.value })} required />
     </div>

     <div className="password mb-3">
      <label htmlFor="name" className=' form-label '>password</label>
      <input type="text" className='form-control' onChange={(e) => setgetdata({ ...getdata, password: e.target.value })}  />
     </div>
      
     <button className=' btn btn-danger'>Register</button>

     <Link to={'/login'} className=' btn btn-success mt-3'>Login</Link>

    </form>

   </div>
<ToastContainer />
  </div>
 )
}

export default RegisterPage 