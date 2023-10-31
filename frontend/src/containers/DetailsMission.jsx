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

  useEffect(() => {
    const selectedMission = missions.find((mission) => mission.id === id);
    setMission(selectedMission);
  }, [id]);

  const handleSendOffer = (e) => {
    e.preventDefault();
    setMission({
      ...mission,
      offers: [...mission.offers, { user: connectedUser, status: "pending" }],
    });
    storeMissions([...missions, mission]);
    notify.success("Offer sent successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {mission.createdAt} by {mission?.author?.username}
        </p>
        <h3 className="font-medium text-xl mb-2 flex-wrap">{mission.title}</h3>
        <div className="flex flex-col items-start mt-6 gap-3">
          <p className="rounded-full   bg-green-100 text-green-400 font-medium">
            Difficulty: {mission.difficulty}
          </p>
          <p className="rounded-full   bg-green-100 text-green-400 font-medium">
            Competency required: {mission?.competency}
          </p>

          <p className="rounded-full   bg-blue-50 text-blue-300 font-medium">
            🕐 {mission.duration}
          </p>
          <p className="rounded-full   bg-amber-50 text-amber-300 font-medium">
            🏆 {mission.reward}
          </p>
          <p className="rounded-full   bg-green-100 text-green-400 font-medium">
            Other rewards: {mission?.otherReward}
          </p>
        </div>
        <div className="mt-6">
          <Button variant="contained" onClick={handleSendOffer}>
            Send Offer
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default DetailsMission;
