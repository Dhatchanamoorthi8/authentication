import axios from 'axios'
import React, { useEffect, useState } from 'react'
function AdminPage() {
  const [datas, setdata] = useState([])

  useEffect(() => {
    const tokenget = JSON.parse(localStorage.getItem('auth'))

    axios.get('http://localhost:3003/getalldata', {
      headers: { 'auth': `${tokenget.token}` }
    })
      .then((res) => {
        console.log(res.data);
        setdata(res.data || 'loading')
      })
      .catch((err) => {
        console.log(err.response.data);
      })
  }, [])


  return (
    <div>
      <div className="Admin-main z-0 ">
          <h2>Well Come to The Admin Page</h2>
          <div className="conetent">
            <div className="card">
              <div className="card-body">
              <p className='text-center text-wrap '>{JSON.stringify(datas)}</p>
              </div>
            </div>
           
          </div>
      </div>
    </div>
  )
}

export default AdminPage