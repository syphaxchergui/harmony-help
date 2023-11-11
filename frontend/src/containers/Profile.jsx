import React, { useState } from "react";
import useToken from "../hooks/useToken";
import { Button, Divider, Modal, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Confetti from "react-confetti";

const Profile = () => {
  const [connectedUser, setConnectedUser] = useToken("_connectedUser");
  const { actions } = useAuth();
  const [selectedReward, setSelectedReward] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [score, setScore] = useState(connectedUser?.score);

  const [myRewards, setMyRewards] = useState([
    {
      id: 1,
      name: "5% Chez Casino",
      description: "5% de réduction sur votre prochain achat chez Casino",
      coupon: "CASINO50",
      points: 100,
    },
  ]);

  const [rewards, setRewards] = useState([
    {
      id: 2,
      name: "Repas gastronomique chez Le Petit Bistro (30% de réduction)",
      description:
        "Savourez un repas gastronomique avec 30% de réduction chez Le Petit Bistro",
      coupon: "BISTRO30",
      points: 100,
    },
    {
      id: 3,
      name: "Shopping de qualité chez Le Grand Magasin (10% de réduction)",
      description:
        "Profitez de 10% de réduction sur des produits de qualité chez Le Grand Magasin",
      coupon: "GRAND10",
      points: 200,
    },
    {
      id: 4,
      name: "Pause café gourmande chez Pâtisserie Delice",
      description:
        "Offrez-vous une pause café gourmande avec un café gratuit chez Pâtisserie Delice",
      coupon: "DELIKCAFÉ",
      points: 250,
    },
    {
      id: 5,
      name: "Expérience cinéma VIP à Nice",
      description:
        "Vivez une expérience cinéma VIP avec un billet gratuit à Nice",
      coupon: "NICEVIP",
      points: 500,
    },
    {
      id: 6,
      name: "Shopping varié sur Amazon",
      description:
        "Faites votre shopping avec une réduction exceptionnelle de 25% sur Amazon",
      coupon: "AMAZON25",
      points: 1000,
    },
  ]);

  const handleClaimReward = (reward) => {
    if (score >= reward.points) {
      setSelectedReward(reward);
      setOpenModal(true);
    }
  };

  const handleConfirmClaim = () => {
    setOpenModal(false);
    setScore(score - selectedReward.points);
    setConnectedUser({
      ...connectedUser,
      score: score - selectedReward.points,
    });
    setMyRewards([...myRewards, selectedReward]);
    setRewards(rewards.filter((reward) => reward.name !== selectedReward.name));
    setSelectedRewardDetails(selectedReward);
    setOpenRewardDetails(true);
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 3000);
  };

  const [openRewardDetails, setOpenRewardDetails] = useState(false);
  const [selectedRewardDetails, setSelectedRewardDetails] = useState(null);

  const handleRewardDetails = (reward) => {
    setSelectedRewardDetails(reward);
    setOpenRewardDetails(true);
  };

  const handleCloseRewardDetails = () => {
    setOpenRewardDetails(false);
  };

  const [confetti, setConfetti] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">Bonjour {connectedUser?.username}</p>
        <Button
          onClick={() => actions.logout()}
          variant="contained"
          color="primary"
          disableElevation
        >
          Se déconnecter
        </Button>
      </div>

      {connectedUser?.role === "benevole" && (
        <>
          <div className="bg-white rounded-lg p-4 mb-6">
            <h1 className="text-xl font-bold mb-4">Mon score</h1>
            <p className="text-2xl text-center text-bold w-full p-4 rounded-lg ring-blue-300 ring-1 bg-blue-50">
              {score} points
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6">
            <h1 className="text-xl font-bold mb-4">Mes récompenses</h1>
            {myRewards.map((reward, index) => (
              <div
                key={index}
                className="flex w-full p-4 bg-blue-100 my-2 rounded-lg items-center justify-between reward-item"
              >
                <p className="text-lg font-medium">{reward.name}</p>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRewardDetails(reward)}
                >
                  Détails
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4">Récompenses disponibles</h1>
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`flex w-full p-4 bg-blue-100 ${
                  score < reward.points && "bg-blue-50 text-gray-500"
                } my-2 rounded-lg items-center justify-between reward-item`}
              >
                <p className="text-lg font-medium">
                  {reward.name} {score < reward.points && "🔐"}
                </p>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={score < reward.points}
                  onClick={() => handleClaimReward(reward)}
                >
                  {`Obtenir ${reward.points} pts`}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
      {confetti && <Confetti />}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {selectedReward?.name}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedReward?.description}
            {`. \nCette récompense coûte ${selectedReward?.points} points. Êtes-vous sûr de vouloir l'obtenir ?`}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenModal(false)}
            sx={{ mt: 2, mr: 1 }}
          >
            Annuler
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleConfirmClaim}
            sx={{ mt: 2 }}
          >
            Confirmer
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openRewardDetails}
        onClose={handleCloseRewardDetails}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" sx={{}}>
            {selectedRewardDetails?.name}
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            {selectedRewardDetails?.description}
          </Typography>
          <Typography
            id="modal-coupon"
            sx={{
              bgcolor: "#f0f0f0",
              px: 2,
              py: 1,
              borderRadius: 2,
              textAlign: "center",
              fontSize: 24,
            }}
          >
            <strong>{selectedRewardDetails?.coupon}</strong>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseRewardDetails}
            sx={{ mt: 2 }}
          >
            Fermer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
