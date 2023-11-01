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
  duration: "",
  competency: "",
  difficulty: "",
  startDate: new Date().toISOString().substr(0, 10),
  reward: 0,
  otherReward: "",
  offers: []
};

const competencies = [
  {
    id: 0,
    value: 10,
    name: "Competency 01",
  },
  {
    id: 1,
    value: 15,
    name: "Competency 02",
  },
  {
    id: 2,
    value: 23,
    name: "Competency 03",
  },
  {
    id: 3,
    value: 29,
    name: "Competency 04",
  },
];

const difficulties = [
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
  const [rewardPoints, setRewardPoints] = useState(0);
  const [storedMissions, storeMissions] = useToken("_missions");
  const [connectedUser, storeConnectedUser] = useToken("_connectedUser");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !data.title ||
      !data.description ||
      !data.duration ||
      !data.competency ||
      !data.difficulty
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const rewardPoints = rewardsService.calculateRewardPoints(
      data.difficulty,
      data.duration * 1,
      data?.competency?.value || 1 * 1
    );
    setRewardPoints(rewardPoints);
    setData({ ...data, reward: rewardPoints });
    handleOpen();
  };

  const handlePublish = () => {
    setLoading(true);
    const newMission = {
      ...data,
      author: connectedUser,
      id: Math.random().toString(36).substr(2, 9) + Date.now(),
    };
    if (!storedMissions) {
      storeMissions([newMission]);
      handleClose();
      navigate("/");
      setLoading(false);
      return;
    }

    storeMissions([...storedMissions, newMission]);
    handleClose();
    navigate("/");
    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-2 ">Create a mission</h1>
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Mission Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                placeholder="Mission Title"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                type="text"
                value={data.title}
                autoComplete="false"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Mission Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Mission Description"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                value={data.description}
                autoComplete="false"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-gray-700 font-bold mb-2"
              >
                Mission Duration (hours) <span className="text-red-500">*</span>
              </label>
              <input
                id="duration"
                name="duration"
                placeholder="Mission Duration"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) => setData({ ...data, duration: e.target.value })}
                type="number"
                value={data.duration}
                autoComplete="false"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="competency"
                className="block text-gray-700 font-bold mb-2"
              >
                Required Competency <span className="text-red-500">*</span>
              </label>
              <select
                id="competency"
                name="competency"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) => {
                  setData({
                    ...data,
                    competency: competencies.at(e.target.value),
                  });
                  console.log(competencies.at(e.target.value));
                }}
                value={data.competency.id}
              >
                <option value="" disabled>
                  Select a competency
                </option>
                {competencies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="difficulty"
                className="block text-gray-700 font-bold mb-2"
              >
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                id="difficulty"
                name="difficulty"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) =>
                  setData({ ...data, difficulty: e.target.value })
                }
                value={data.difficulty}
              >
                <option value="" disabled>
                  Select a difficulty
                </option>
                {difficulties.map((diff) => (
                  <option key={diff.value} value={diff.value}>
                    {diff.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) =>
                  setData({ ...data, startDate: e.target.value })
                }
                value={data.startDate}
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              disableElevation
              className="mt-6 font-medium hover:bg-blue-400 px-6 py-2 rounded mr-2 bg-blue-300"
            >
              Create Mission
            </Button>
          </form>
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
          <Button
            onClick={handlePublish}
            color="primary"
            autoFocus
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Mission"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewMission;
