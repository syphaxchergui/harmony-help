import React from "react";
import logo from "../assets/logo-text-0.png";
import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";

const AppBar = () => {
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");

  return (
    <div className="flex m-auto items-center justify-between w-full px-2 py-4 container">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img
            src={logo}
            className="h-16 object-contain"
            alt="harmony-help-logo"
          />
         {connectedUser?.role === 'benevole' && <p>Benevole</p>} 
        </Link>
      </div>
      <div className="flex items-center justify-end">
        {/* <Link to='/benevoles'>
          <p className='font-medium hover:bg-slate-300 px-6 py-2 rounded mr-2 hidden md:flex'>
            Benevoles
          </p>
        </Link> */}

        <Link to="/profile">
          <p className="font-medium hover:bg-slate-300 px-6 py-2 rounded mr-2 hidden md:flex">
            Your Profile
          </p>
        </Link>

        {connectedUser?.role === "user" && (
          <Link to="/new-mission">
            <p className="font-medium hover:bg-blue-400 px-6 py-2 rounded mr-2 bg-blue-300">
              New Mission
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppBar;
