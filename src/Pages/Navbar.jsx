import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { RxDashboard } from "react-icons/rx";
import { BiSolidContact } from "react-icons/bi";
import { TbLockAccess } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

import '../css/sidebar.css'

function Navbar({ children }) {

  const [auth, setAuth] = useState()
  useEffect(() => {
    const getdata = () => {
      setAuth(JSON.parse(localStorage.getItem('auth')))
    }
    getdata()
  }, [])


  const navigate = useNavigate()
  const hanlelogout = () => {
    navigate('/login')
    localStorage.clear()
    window.location.reload()
  }
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const hoverStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  };
  const activeStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#000',


  };


  return (
    <div>
      <div className="navbar-admin" style={{ display: 'flex', height: '100%', minHeight: '400px' }}>

        <Sidebar collapsed={collapsed} toggled={collapsed} backgroundColor='#000'>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0)
                  return {
                    color: disabled ? '#000' : '#fff',
                    backgroundColor: active ? activeStyles.backgroundColor : undefined,
                    '&:hover': hoverStyles,
                  };
              },
            }}
          >

            <Link to={'/home'} className='nav-link' >
              <MenuItem className={`${auth?.dashboard === 'a' ? 'd-block' : 'd-none'}`}
                icon={<RxDashboard style={{ fontSize: "25px" }} />}
                active={location.pathname === '/home'}
              lang='en' >
                Dash Board
              </MenuItem>     </Link>
            <SubMenu label='Master' icon={<TbLockAccess style={{ fontSize: "25px" }} />}
              active={location.pathname === '/access'} className={`${auth?.usermaster_main === 'a' ? 'd-block' : 'd-none'}`}>
              <MenuItem
                active={location.pathname === '/access'} className={`${auth?.usertype_sub === 'a' ? 'd-block' : 'd-none'}`} >
                <Link to={'/access'} className="nav-link">Master Type</Link>
              </MenuItem>
              <MenuItem active={location.pathname === '/useraccountreg'} className={`${auth?.userregister_sub === 'a' ? 'd-block' : 'd-none'}`}>
                <Link to={'/useraccountreg'} className="nav-link">User Registeration</Link>
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={<BiSolidContact style={{ fontSize: "25px" }} />}
              active={location.pathname === '/contact'}
              className={`${auth?.contact === 'a' ? 'd-block' : 'd-none'}`}
            >
              <Link to={'/contact'} className="nav-link">UserAccess</Link>
            </MenuItem>
            <MenuItem icon={<RiLogoutCircleLine style={{ fontSize: "25px" }} />} onClick={hanlelogout}>
              Logout
            </MenuItem>
          </Menu>
          <div className=' mt-5 pt-5 text-end'>
            <button className='close-btn' onClick={() => setCollapsed(!collapsed)}>
              <MdNavigateNext style={{ fontSize: '30px', display: collapsed ? 'flex' : 'none', }} className='arrow-close' />

              <MdNavigateBefore style={{ fontSize: '30px', display: collapsed ? 'none' : 'block' }} className='arrow-open' />

            </button>
          </div>
        </Sidebar>


        {/* children pages */}

        <main style={{ padding: 10, width: "auto" }}>
          <div className="child" style={{ padding: "20px" }}>
            {children}
          </div>
        </main>



      </div>

      <Outlet />
    </div>
  )
}

export default Navbar