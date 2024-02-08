import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

function Homepage() {
  const [data, setdata] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenget = JSON.parse(localStorage.getItem('auth'));
        const response = await axios.get('http://localhost:3003/getalldata', {
          headers: { 'auth': `${tokenget.token}` }
        });
        setdata(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchData();

  }, []);



  return (
    <div>

      <h2>Well Come to The User Page</h2>
      {JSON.stringify(data)}

      <Outlet />
    </div>
  )
}

export default Homepage