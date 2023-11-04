import React from "react";
import logo from "../../assets/logo-text.png";
import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Mission = ({
  id,
  title,
  difficulty,
  reward,
  duration,
  createdAt,
  author,
  offers, 
  adresse
}) => {
  const [connectedUser] = useToken("_connectedUser");

  return (
    <Link to={`/mission/${id}`} className="">
      <div className="bg-white rounded-xl flex flex-col items-stretch cursor-pointer hover:bg-slate-50 hover:shadow-md ring-1 ring-blue-200">
        {/* <img
          src={logo}
          className="h-28 p-2 w-full rounded-xl object-contain bg-white"
        /> */}
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-xl flex-wrap">{title}</h3>
            {connectedUser.role === 'user' && <p className="text-sm text-gray-500 mb-2">
              {offers} {offers === 1 ? 'offer' : 'offers'}
            </p>}
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {createdAt} by {author}
          </p>
          <p className="mb-2 font-medium">
              📍 {adresse}
            </p>
          <div className="flex items-center justify-between text-center mt-6">
            <p className="rounded-full px-4 bg-green-100 text-green-400 font-medium">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
            <p className="rounded-full px-4 bg-blue-50 text-blue-300 font-medium">
              🕐 {duration}h
            </p>
            <p className="rounded-full px-4 bg-amber-50 text-amber-300 font-medium">
              🏆 {reward}
            </p>
           
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Mission;
