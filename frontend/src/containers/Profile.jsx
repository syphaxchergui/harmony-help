import React from "react";
import useToken from "../hooks/useToken";
import { Button, Divider } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [connectedUser] = useToken("_connectedUser");
  const { actions } = useAuth();

  const myRewards = [
    {
      name: "50% Chez Casino",
      points: 100,
    },
  ];

  const rewards = [
    {
      name: "50% Chez Lidl",
      points: 100,
    },
    {
      name: "20% Chez carrefour",
      points: 200,
    },
    {
      name: "Free coffee at Starbucks",
      points: 150,
    },
    {
      name: "Free movie ticket (Nice)",
      points: 250,
    },
    {
      name: "50% off on Amazon",
      points: 300,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">Hey {connectedUser?.username}</p>
        <Button
          onClick={() => actions.logout()}
          variant="contained"
          color="primary"
          disableElevation
        >
          Logout
        </Button>
      </div>

      {connectedUser?.role === "benevole" && (
        <>
          <div className="bg-white rounded-lg p-4 mb-6">
          <h1 className="text-xl font-bold mb-4">My score</h1>
            <p className="text-2xl text-center text-bold w-full p-4 rounded-lg ring-blue-300 ring-1 bg-blue-50">
              {connectedUser?.score} points
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6">
            <h1 className="text-xl font-bold mb-4">My rewards</h1>
            {myRewards.map((reward, index) => (
              <div
                key={index}
                className="flex w-full p-4 bg-blue-100 my-2 rounded-lg items-center justify-between reward-item"
              >
                <p className="text-lg font-medium">{reward.name}</p>
                <p>{reward.points} points</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4">Available Rewards</h1>
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="flex w-full p-4 bg-blue-100 my-2 rounded-lg items-center justify-between reward-item"
              >
                <p className="text-lg font-medium">{reward.name}</p>
                <Button variant="outlined" color="primary">
                  Claim for {reward.points} points
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
