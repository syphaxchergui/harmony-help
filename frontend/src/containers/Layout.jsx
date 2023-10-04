import React from "react";
import { Outlet } from "react-router-dom";

import AppBar from "../components/AppBar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen ">
      <AppBar />
      <div className="flex-grow text-black bg-slate-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
