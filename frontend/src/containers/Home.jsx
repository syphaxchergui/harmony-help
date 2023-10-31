import React from "react";
import AllMissions from "../components/Sections/AllMissions";

const HomePage = () => {
  return (
    <div className='container mx-auto p-4'>
      {/* <h1 className='text-2xl sm:text-3xl font-bold mt-6 mb-8'>Your upcoming missions</h1>
      <p className="w-full text-xl text-center mb-6">No upcoming missions for you. Find one below.</p> */}
      <h1 className='text-2xl sm:text-3xl font-bold mt-6 mb-8'>Find your next mission</h1>
      <AllMissions />
    </div>
  );
};

export default HomePage;
