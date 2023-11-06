import React from "react";
import AllEvents from "../components/Sections/AllEvents";
import AllCourses from "../components/Sections/AllFormations";

const Formations = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-8">
        Enroll here
      </h1>

      <AllCourses />
    </div>
  );
};

export default Formations;
