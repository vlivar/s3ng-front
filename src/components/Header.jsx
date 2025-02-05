import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { BiCartAlt } from "react-icons/bi";
import { Button } from 'antd';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = props => {
  const isAuth = false
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
            <Button>
                <span>
                    Log Out
                </span>
                <FaSignOutAlt/>
            </Button>
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