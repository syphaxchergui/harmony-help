import React from "react";
import Mission from "../Cards/Mission";
import useToken from "../../hooks/useToken";

const AllMissions = () => {
  const [storedMissions, storeMissions] = useToken("_missions");
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {connectedUser.role === "user"
        ? storedMissions
            ?.filter((mission) => mission.author.id === connectedUser.id)
            ?.map((mission) => (
              <Mission
                id={mission?.id}
                title={mission?.title}
                createdAt={mission?.startDate}
                author={
                  mission?.author?.username === connectedUser?.username
                    ? "You"
                    : mission?.author?.username
                }
                difficulty={mission?.difficulty}
                reward={mission?.reward}
                duration={mission?.duration}
              />
            ))
        : storedMissions?.map((mission) => (
            <Mission
              id={mission?.id}
              title={mission?.title}
              createdAt={mission?.startDate}
              author={
                mission?.author?.username === connectedUser?.username
                  ? "You"
                  : mission?.author?.username
              }
              difficulty={mission?.difficulty}
              reward={mission?.reward}
              duration={mission?.duration}
            />
          ))}
    </div>
  );
};

export default AllMissions;
