import React from "react";
import Event from "../Cards/Event";

const AllEvents = () => {
  const events = [
    {
      id: 1,
      title: "Concert de bienfaisance",
      createdAt: "1er janvier 2024 à 12h00",
      author: "Jean Dupont",
      address: "123 rue Principale, Ville imaginaire",
      nbrOfParticipants: 15,
    },
    {
      id: 2,
      title: "Collecte de nourriture",
      createdAt: "14 février 2024 à 09h00",
      author: "Marie Martin",
      address: "456 rue Orme, Ville imaginaire",
      nbrOfParticipants: 23,
    },
    {
      id: 3,
      title: "Nettoyage bénévole",
      createdAt: "20 mars 2024 à 10h00",
      author: "Robert Tremblay",
      address: "789 rue Chêne, Ville imaginaire",
      nbrOfParticipants: 10,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Event
          key={event.id}
          id={event.id}
          title={event.title}
          createdAt={event.createdAt}
          author={event.author}
          nbrOfParticipants={event.nbrOfParticipants}
          address={event.address}
        />
      ))}
    </div>
  );
};

export default AllEvents;
