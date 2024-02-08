import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

function Useraccess() {

  const [roleisert, setroleisert] = useState('')

  const [dropdowndata, setdropdowndata] = useState([])

  const [validation, setvalidation] = useState('')
  console.log(validation,"validation");

  const handleinsertrole = async () => {
    if (roleisert === '') {
      toast.error('Enter Valid Role')
      return
    }
    const isvalidation = validation.some((item)=>{
      return( item.role === roleisert)
    })
    if (isvalidation ) {
      toast.error('The Role Is Already Present')
      return
    }

    const tokenget = await JSON.parse(localStorage.getItem('auth'))
    await axios.post('http://localhost:3003/roleinsert', {
      roleisert
    }, {
      headers: { 'auth': `${tokenget.token}` }
    })
      .then((res) => {
        console.log(res.data);
        toast.success('Role Insert Success')
        setroleisert('')
        dropdownget()
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const dropdownget = () => {
    const tokenget = JSON.parse(localStorage.getItem('auth'))
    axios.get('http://localhost:3003/getroledata', {
      headers: { 'auth': `${tokenget.token}` }
    })
      .then((res) => {
        console.log(res.data || '');
        setdropdowndata(res.data)
        setvalidation(res.data)
        const pageAccessData = res.data.reduce((acc, data) => {
          return {
            ...acc,
            [data.pageid]: {
              dashboard: data.dashboard,
              usermaster_main: data.usermaster_main,
              usertype_sub: data.usertype_sub,
              userregister_sub: data.userregister_sub,
              contact: data.contact,
              pageid: data.pageid,
              role: data.role
            }
          };
        }, {});
        setpagedata(pageAccessData);
      })
      .catch((err) => {
        console.log(err || '');
      })
  }

  useEffect(() => {
    dropdownget()
  }, [])


  const [pagedata, setpagedata] = useState({
    dashboard: '',
    usermaster_main: '',
    usertype_sub: '',
    userregister_sub: '',
    contact: '',
    pageid: 0
  })

  const handledelete = (id) => {
    axios.delete(`http://localhost:3003/deletepageaccess?id=${id}`)
      .then((res) => {
        console.log(res);
        toast.success('Deleted Role Success')
        dropdownget()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handlesavedata = () => {
    axios.put('http://localhost:3003/saveaccesspage', { pagedata })
      .then((res) => {
        console.log(res);
        toast.success('Page Access Successfully Updated')
        dropdownget()
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <div>
      <div className="row">
        <div className="role-insert col-12 col-lg-3 col-md-6 col-xl-3">
          <div className="role-type">
            <label htmlFor="role" className=' form-label '> Enter Role</label>
            <input type="text" className=' form-control mb-3' value={roleisert} onChange={(e) => setroleisert(e.target.value)} />
            <button className='btn btn-success col-12 col-lg-6 col-xl-6 text-center' onClick={handleinsertrole}>Save</button>
          </div>

        </div>

        <div className="give-access-role col">

          {/* <div className="role-select">
            <label htmlFor="role-select " className=' form-label'>Select Role</label>
            <select name="role-select" id="role-select" className=' form-select '>
              <option value="">Select The Role</option>
            </select>
          </div> */}

          <div className="table-role mt-3">
            <Table striped bordered hover variant="light" responsive>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Role</th>
                  <th>Dash Board</th>
                  <th>User Mater(Main)</th>
                  <th>User Type(Sub)</th>
                  <th>User Register(Sub)</th>
                  <th>Contact</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {dropdowndata.map((data, index) => (
                  <tr key={index}>
                    <td key={index}>{data.pageid}</td>
                    <td>{data.role}</td>
                    <td className='text-center'>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${data.pageid}`}
                        checked={pagedata[data.pageid]?.dashboard === 'a'}
                        onChange={(e) => setpagedata({ ...pagedata, [data.pageid]: { ...pagedata[data.pageid], dashboard: e.target.checked ? 'a' : 'i' } })}
                      />
                    </td>
                    <td className='text-center'>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${data.pageid}`}
                        checked={pagedata[data.pageid]?.usermaster_main === 'a'}
                        onChange={(e) => setpagedata({ ...pagedata, [data.pageid]: { ...pagedata[data.pageid], usermaster_main: e.target.checked ? 'a' : 'i' } })}
                      />
                    </td>
                    <td className='text-center'>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${data.pageid}`}
                        checked={pagedata[data.pageid]?.usertype_sub === 'a'}
                        onChange={(e) => setpagedata({ ...pagedata, [data.pageid]: { ...pagedata[data.pageid], usertype_sub: e.target.checked ? 'a' : 'i' } })}
                      />
                    </td>
                    <td className='text-center'>

                      <Form.Check
                        type="switch"
                        id={`custom-switch${data.pageid}`}
                        checked={pagedata[data.pageid]?.userregister_sub === 'a'}
                        onChange={(e) => setpagedata({ ...pagedata, [data.pageid]: { ...pagedata[data.pageid], userregister_sub: e.target.checked ? 'a' : 'i' } })}
                      />
                    </td>
                    <td className='text-center'>

                      <Form.Check
                        type="switch"
                        id={`custom-switch${data.pageid}`}
                        checked={pagedata[data.pageid]?.contact === 'a'}
                        onChange={(e) => setpagedata({ ...pagedata, [data.pageid]: { ...pagedata[data.pageid], contact: e.target.checked ? 'a' : 'i' } })}
                      />
                    </td>
                    <td>
                      <button className='btn btn-danger pt-1 pb-1' onClick={() => handledelete(data.pageid)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="save-data text-end ">
              <button className='btn btn-success' onClick={handlesavedata}>Save</button>
            </div>

          </div>


        </div>

      </div>


    </div>
  )
}

export default Useraccess