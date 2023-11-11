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
  adresse: "", // nouveau champ
  offers: []
};

const competencies = [
  {
      id: 0,
      value: 10,
      name: "Oil Painting",
  },
  {
      id: 1,
      value: 15,
      name: "Residential Plumbing",
  },
  {
      id: 2,
      value: 23,
      name: "Artisanal Carpentry",
  },
  {
      id: 3,
      value: 29,
      name: "Creative Photography",
  },
  {
      id: 4,
      value: 18,
      name: "Gourmet Cooking",
  },
  {
      id: 5,
      value: 25,
      name: "Advanced Programming",
  },
  {
      id: 6,
      value: 12,
      name: "Organic Gardening",
  },
  {
      id: 7,
      value: 20,
      name: "Foreign Language - Spanish",
  },
];


const difficulties = [
  {
    value: "Facile",
    name: "Facile",
  },
  {
    value: "Moyen",
    name: "Moyen",
  },
  {
    value: "Difficile",
    name: "Difficile",
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
      !data.difficulty ||
      !data.adresse 
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
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
        <h1 className="text-xl font-bold mb-2 ">Créer une mission</h1>
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Titre de la mission <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                placeholder="Titre de la mission"
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
                Description de la mission <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Description de la mission"
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
                Durée de la mission (heures) <span className="text-red-500">*</span>
              </label>
              <input
                id="duration"
                name="duration"
                placeholder="Durée de la mission"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) => setData({ ...data, duration: e.target.value })}
                type="number"
                value={data.duration}
                autoComplete="false"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="adresse" 
                className="block text-gray-700 font-bold mb-2"
              >
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                id="adresse"
                name="adresse"
                placeholder="Adresse"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) => setData({ ...data, adresse: e.target.value })} // nouveau champ
                type="text"
                value={data.adresse}
                autoComplete="false"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="competency"
                className="block text-gray-700 font-bold mb-2"
              >
                Compétence requise <span className="text-red-500">*</span>
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
                  Sélectionnez une compétence
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
                Difficulté <span className="text-red-500">*</span>
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
                  Sélectionnez une difficulté
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
                Date de début
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
              Créer la mission
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
          {"Points de récompense de votre mission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3 className={"text-xl font-bold"}>🏆 {rewardPoints}</h3>
            <p className="mt-2">Ajouter une récompense (une chaise, un service...)</p>
            <TextField
              placeholder="Récompense"
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
            Fermer
          </Button>
          <Button
            onClick={handlePublish}
            color="primary"
            autoFocus
            disabled={loading}
          >
            {loading ? "Publication en cours..." : "Publier la mission"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewMission;
