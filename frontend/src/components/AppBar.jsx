import React from "react";
import logo from "../assets/logo-text-0.png";
import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useAuth } from "../context/AuthContext";
import { Button, IconButton } from "@mui/material";
import { AccountCircle, LogoutOutlined } from "@mui/icons-material";

const AppBar = () => {
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");
  const { actions } = useAuth();

  return (
    <div className="flex m-auto items-center justify-between w-full px-2 py-4 container">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img
            src={logo}
            className="h-16 object-contain"
            alt="harmony-help-logo"
          />
          {connectedUser?.role === "user" ? <h1>Espace demandeur de service</h1> : <h1>Esapce Benevole</h1>}
        </Link>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Link to="/events">
          <p className="font-medium hover:bg-slate-300 px-6 py-2 rounded mr-2 hidden md:flex">
            Events
          </p>
        </Link>

        {connectedUser?.role === "benevole" && (
          <Link to="/formations">
            <p className="font-medium hover:bg-slate-300 px-6 py-2 rounded mr-2 hidden md:flex">
              Formations
            </p>
          </Link>
        )}

        {connectedUser?.role === "user" && (
          <Link to="/new-mission">
            <Button variant="contained" disableElevation>
              New Mission
            </Button>
          </Link>
        )}

        {connectedUser?.role === "user" ? (
          <IconButton
            onClick={() => actions.logout()}
            edge="end"
            aria-label="profile"
            sx={{
              borderRadius: "10px",
            }}
          >
            <LogoutOutlined fontSize="24" />
          </IconButton>
        ) : (
          <Link to="/profile">
            <Button variant="outlined" disableElevation>
              My profile
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppBar;
