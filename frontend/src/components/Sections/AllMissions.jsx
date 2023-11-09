import React from "react";
import Mission from "../Cards/Mission";
import useToken from "../../hooks/useToken";

const AllMissions = () => {
  const [storedMissions, storeMissions] = useToken("_missions");
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");

  const missions = connectedUser?.role === "user"
    ? storedMissions?.filter((mission) => mission.author.id === connectedUser.id)
    : storedMissions;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {missions?.length > 0 ? (
        missions.map((mission) => (
          <Mission
            key={mission?.id}
            id={mission?.id}
            title={mission?.title}
            createdAt={mission?.startDate}
            author={
              mission?.author?.username === connectedUser?.username
                ? "toi"
                : mission?.author?.username
            }
            difficulty={mission?.difficulty}
            reward={mission?.reward}
            duration={mission?.duration}
            offers={mission?.offers?.length}
            adresse={mission?.adresse}
          />
        ))
      ) : (
        <p>No missions</p>
      )}
    </div>
  );
};

export default AllMissions;
