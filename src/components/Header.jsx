import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiCartAlt } from "react-icons/bi";
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logoutAction } from '../store/user/userSlice';
import { removeTokenToLocalStorage } from '../helpers/localstorage.helper';

const Header = () => {
  const isAuth = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [shouldNavigate, setShouldNavigate] = useState(false)

  useEffect(() => {
    if (shouldNavigate) {
        navigate("/");
      }
  }, [shouldNavigate])

  const logoutHandler = () => {
    dispatch(logoutAction())
    removeTokenToLocalStorage("token")
    toast.success("logout successfully")
    setShouldNavigate(true)
  }

  return <header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
    <Link to="/">
        <BiCartAlt size={30}/>
    </Link>

    {/* Menu */}
    {
        isAuth && (
            <nav className='ml-auto mr-10'>
                <ul className='ml-auto mr-10 flex items-center gap-5'>
                    <li>
                        <NavLink to={"/"} className={({isActive}) => isActive ? "text-white" : "text-white/50"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/categories"} className={({isActive}) => isActive ? "text-white" : "text-white/50"}>Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/transactions"} className={({isActive}) => isActive ? "text-white" : "text-white/50"}>Transactions</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }

    {/* Actions */}
    {
        isAuth ? (
            <button 
                className='btn btn-red mx-1'
                onClick={logoutHandler}>
                    <span>
                        Log Out
                    </span>
                    <FaSignOutAlt/>
            </button>
        ) : (
            <Link className='py-2 text-white/50 hover:text-white ml-auto' to={"auth"}>
                Log In / Sing In
            </Link>
        )
    }

  </header>
}

Header.propTypes = {}

export default Header