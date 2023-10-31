import React from "react";
import useToken from "../hooks/useToken";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [connectedUser] = useToken("_connectedUser");
  const { actions } = useAuth();
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold mb-2">Hey {connectedUser?.username}</p>
        <Button onClick={() => actions.logout()}>Logout</Button>
      </div>

      <p className="mb-6 text-2xl text-center w-full p-4 rounded ring-blue-300 ring-1 bg-blue-50">My score: {connectedUser?.score}</p>

      <h1 className="text-xl font-bold mb-2">My rewards</h1>

      <div className="flex w-full p-4 bg-blue-100 my-2 rounded items-center justify-between">
        <p className="text-lg font-bold mb-2">20% Chez carrefour </p>
        <button>Claim for 200 points</button>
      </div>
    </div>
  );
};

export default Profile;
