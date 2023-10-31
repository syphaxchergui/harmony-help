import React, { useState } from "react";
import { rewardsService } from "../services/reward.service";
import useToken from "../hooks/useToken";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initialData = {
  title: "",
  description: "",
  competency: null,
  difficulty: null,
  duration: null,
  startDate: new Date(),
  reward: null,
  otherReward:null
};

const competencies = [
  {
    value: 10,
    name: "Competency 01",
  },
  {
    value: 15,
    name: "Competency 02",
  },
  {
    value: 23,
    name: "Competency 03",
  },
  {
    value: 29,
    name: "Competency 04",
  },
];

const difficulies = [
  {
    value: "easy",
    name: "Easy",
  },
  {
    value: "medium",
    name: "Medium",
  },
  {
    value: "hard",
    name: "Hard",
  },
];

const NewMission = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [storedMissions, storeMissions] = useToken("_missions");
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    const rewardPoints = rewardsService.calculateRewardPoints(
      data.difficulty,
      data.duration * 1,
      data.competency * 1
    );
    setRewardPoints(rewardPoints);
    handleOpen();
  };

  const handlePublish = () => {
    const newMission = {
      ...data,
      author: connectedUser,
    };
    if(!storedMissions) { 
      storeMissions([newMission]);
      handleClose();
      navigate('/')
      return;
    }

    storeMissions([...storedMissions, newMission]);
    handleClose();
    navigate('/')
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-2 ">Create a mission</h1>
        <div className="max-w-3xl">
          <p className="mt-2">Mission Title</p>
          <input
            placeholder="Mission Title"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) =>
              setData({ ...data, title: e.target.value })
            }
            type="text"
            value={data.title}
            autoComplete="false"
          />

          <p className="mt-2">Mission Description</p>
          <textarea
            placeholder="Mission Description"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) =>
              setData({ ...data, description: e.target.value })
            }
            value={data.description}
            autoComplete="false"
          />

          <p className="mt-2">Mission Duration (hours)</p>
          <input
            placeholder="Mission Duration"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) =>
              setData({ ...data, duration: e.target.value })
            }
            type="number"
            value={data.duration}
            autoComplete="false"
          />

          <p className="mt-2">Required Competency</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) =>
              setData({ ...data, competency: e.target.value })
            }
            value={data.competency}
          >
            <option value="" disabled>
              Select a competency
            </option>
            {competencies.map((comp) => (
              <option value={comp.value}>{comp.name}</option>
            ))}
          </select>

          <p className="mt-2">Difficulty</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) =>
              setData({ ...data, difficulty: e.target.value })
            }
            value={data.difficulty}
          >
            <option value="" disabled>
              Select a difficulty
            </option>
            {difficulies.map((diff) => (
              <option value={diff.value}>{diff.name}</option>
            ))}
          </select>

          <p className="mt-2">Start Date</p>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            onChange={(e) =>
              setData({ ...data, startDate: e.target.value })
            }
            value={data.startDate}
          />

          <button
            onClick={handleSubmit}
            className="mt-6 font-medium hover:bg-blue-400 px-6 py-2 rounded mr-2 bg-blue-300"
          >
            Create Mission
          </button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You mission's reward points"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3 className={"text-xl font-bold"}>🏆 {rewardPoints}</h3>
            <p className="mt-2">Add a reward (a chair, a service...)</p>
            <TextField
              placeholder="Reward"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) =>
                setData({ ...data, otherReward: e.target.value })
              }
              type="text"
              value={data.otherReward}
              autoComplete="false"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handlePublish} color="primary" autoFocus>
            Publish Mission
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewMission;
