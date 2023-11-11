import React from "react";
import logo from "../../assets/logo-text.png";
import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { Button } from "@mui/material";
import { useNotifications } from "../../context/NotificationContext";

const Event = ({
  id,
  title,
  createdAt,
  author,
  address,
  nbrOfParticipants = 0,
}) => {
  const [connectedUser] = useToken("_connectedUser");
  const { actions: notify } = useNotifications();

  return (
    <div className="bg-white rounded-xl flex flex-col items-stretch hover:bg-slate-50 hover:shadow-md ring-1 ring-blue-200">
      <img
        src={logo}
        className="h-28 p-2 w-full rounded-xl object-contain bg-white"
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-medium text-xl flex-wrap">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {createdAt} par {author}
        </p>

        <p className="mb-2 font-medium">📍 {address}</p>
        <p className="text-sm text-gray-500 mb-2">
          {nbrOfParticipants} participants.
        </p>
      </div>
      <Button
        sx={{ mx: 2, mb: 2 }}
        variant="contained"
        disableElevation
        onClick={() =>
          notify.info(`Rendez vous le ${createdAt}, a ${address} !`)
        }
      >
        Rejoindre
      </Button>
    </div>
  );
};

export default Event;
