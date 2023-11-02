import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo-text.png";
import { Button } from "@mui/material";
import useToken from "../hooks/useToken";
import { useNotifications } from "../context/NotificationContext";

const DetailsMission = () => {
  const { id } = useParams();
  const [mission, setMission] = useState({});
  const [connectedUser, setConnectedUser] = useToken("_connectedUser");
  const [missions, storeMissions] = useToken("_missions");

  const { actions: notify } = useNotifications();

  const navigate = useNavigate();

  useEffect(() => {
    const selectedMission = missions.find((mission) => mission.id === id);
    setMission(selectedMission);
  }, [id]);

  const handleSendOffer = (e) => {
    e.preventDefault();
    const newMission = {
      ...mission,
      offers: [...mission.offers, { user: connectedUser, status: "pending" }],
    };
    setMission(newMission);
    storeMissions([
      ...missions.filter((mission) => mission.id !== newMission.id),
      newMission,
    ]);
    notify.success("Offer sent successfully");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 bg-white rounded-md">
        <h3 className="font-medium text-2xl">{mission.title}</h3>
        <p className="text-sm text-gray-500  mb-4">
          {mission.startDate} by {mission?.author?.username}
        </p>
        <p className="mr-2">Description:</p>
        <p className="text-md font-mono mb-2">
          {mission.description}
        </p>
        <div className="flex flex-col items-start mt-6 gap-2 ">
          <div className="flex items-center">
            <p className="mr-2">Difficulty:</p>
            <div
              className={`rounded-full font-medium px-3 py-1 ${
                mission.difficulty === "easy"
                  ? "bg-green-100 text-green-400"
                  : mission.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-400"
                  : "bg-red-100 text-red-400"
              }`}
            >
              {mission.difficulty}
            </div>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Competency required:</p>
            <div className="rounded-full bg-green-100 text-green-400 font-medium px-3 py-1">
              {mission?.competency?.name}
            </div>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Duration:</p>
            <div className="rounded-full bg-blue-50 text-blue-300 font-medium px-3 py-1">
              🕐 {mission.duration} Hours
            </div>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Reward:</p>
            <div className="rounded-full bg-amber-50 text-amber-300 font-medium px-3 py-1">
              🏆 {mission.reward}
            </div>
          </div>
          {mission?.otherReward && (
            <div className="flex items-center">
              <p className="mr-2">Other rewards:</p>
              <div className=" font-medium px-3 py-1">
                {mission?.otherReward}
              </div>
            </div>
          )}
        </div>
        {connectedUser?.role === "benevole" &&
        !mission?.offers?.find(
          (offer) => offer.user.id === connectedUser.id
        ) ? (
          <div className="mt-6">
            <Button
              disableElevation
              variant="contained"
              onClick={handleSendOffer}
            >
              Send Offer
            </Button>
          </div>
        ) : connectedUser?.role === "benevole" ? (
          <div className="mt-6 font-medium px-4 py-2 rounded text-center bg-blue-50">
            Offer already sent !
          </div>
        ) : null}
      </div>

      {connectedUser?.role === "user" && (
        <div className="p-4 bg-white rounded-md mt-4">
          <p className="text-xl mb-6 font-bold">Benevole offers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mission?.offers?.length > 0 ? (
              mission?.offers?.map((offer) => {
                return (
                  <div
                    className="flex items-center bg-blue-50 rounded p-2 flex-col justify-between gap-2 w-full"
                    key={offer.user}
                  >
                    <div className="flex flex-col justify-center items-start px-4 pt-1 w-full">
                      <span className="flex gap-1">
                        <p className="font-medium ">Benevole:</p>{" "}
                        <p>{offer.user.username} - {offer.user.note}⭐</p>
                      </span>
                      <span className="flex gap-1">
                        <p className="font-medium">Status:</p>
                        <p>{offer.status}</p>
                      </span>
                    </div>

                    <Button>Accept</Button>
                  </div>
                );
              })
            ) : (
              <p>No offers yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsMission;
