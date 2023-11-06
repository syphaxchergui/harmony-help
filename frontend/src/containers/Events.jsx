import React from "react";
import AllEvents from "../components/Sections/AllEvents";

const Events = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-8">
        Find your next event
      </h1>

      <AllEvents />
    </div>
  );
};

export default Events;
