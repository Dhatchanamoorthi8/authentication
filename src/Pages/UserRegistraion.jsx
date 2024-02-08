import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function UserRegistraion() {

 const [data, setdata] = useState({
  name: '',
  userid: '',
  password: '',
  role:''
 })

 const handlesavedata = (e) => {
  e.preventDefault()
  axios.post('http://localhost:3003/userregister', data)
   .then((res) => {
    console.log(res);
    toast.success(res.data)
    setdata({...data,name:'',password:'',userid:'',role:''})
   })
   .catch((err) => {
    console.log(err);
   })
 }
 const [role, setrole] = useState([])

 const dropdown = () => {
  const tokenget = JSON.parse(localStorage.getItem('auth'))
  axios.get('http://localhost:3003/getroledata', {
   headers: { 'auth': `${tokenget.token}` }
  })
   .then((res) => {
    console.log(res.data);
    setrole(res.data)
   })
   .catch((err) => {
    console.log(err);
   })
 }

 useEffect(() => {
  dropdown()
 }, [])

 return (

  <div>

   <div className="user-regster-page">
    <form action="" onSubmit={handlesavedata}>

     <label htmlFor="name" className='form-label '>User Name</label>
     <input type="text" className=' form-control' value={data.name} onChange={(e) => setdata({ ...data, name: e.target.value })} />

     <label htmlFor="name" className='form-label '>User Id</label>
     <input type="text" className=' form-control' value={data.userid} onChange={(e) => setdata({ ...data, userid: e.target.value })} />

     <label htmlFor="name" className='form-label '>Password</label>
     <input type="text" className=' form-control' value={data.password} onChange={(e) => setdata({ ...data, password: e.target.value })} />

     <label htmlFor="role" className='form-label'>Role</label>
     <select name="role" id="role" className='form-select' value={data.role} onChange={(e)=>setdata({...data,role:e.target.value})}>
      <option value="">Select One Role</option>
      {role.map((data, index) => (
       <option value={data.role} key={index}>{data.role}</option>
      ))}
     </select>

     <button type='submit' className=' btn btn-dark mt-3'>Register User</button>
    </form>
   </div>

  </div>
 )
}

export default UserRegistraion