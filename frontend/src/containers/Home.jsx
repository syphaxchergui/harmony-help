import React, { useState, useEffect } from "react";
import AllMissions from "../components/Sections/AllMissions";
import useToken from "../hooks/useToken";
import { CircularProgress } from "@mui/material";

const HomePage = () => {
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-8">
        {connectedUser?.role === "user"
          ? "My missions"
          : "Find your next mission"}
      </h1>
      {isLoading && connectedUser?.role === "benevole" ? (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <p className="text-3xl text-center mb-6 font-medium animate-pulse">
            Wait while we scan your neighborhood for missions...
          </p>
          <CircularProgress />
        </div>
      ) : (
        <AllMissions />
      )}
    </div>
  );
};

export default HomePage;
