import React from "react";
import logo from "../assets/logo-text-0.png";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className='flex m-auto items-center justify-between w-full px-2 py-4 container'>
      <div className='flex items-center gap-3'>
        <Link to='/'>
          <img
            src={logo}
            className='h-16 object-contain'
            alt='harmony-help-logo'
          />
        </Link>
      </div>
      <Link to='/profile'>
        <p className='font-medium text-xl hover:bg-slate-300 px-6 py-2 rounded-full mr-2 bg-slate-200'>Your Profile</p>
      </Link>
    </div>
  );
};

export default AppBar;
