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
      name: "50% Chez Casino",
      description: "50% off on your next purchase at Casino",
      coupon: "CASINO50",
      points: 100,
    },
  ]);

  const [rewards, setRewards] = useState([
    {
      id: 2,
      name: "50% Chez Lidl",
      description: "50% off on your next purchase at Lidl",
      coupon: "LIDL50",
      points: 100,
    },
    {
      id: 3,
      name: "20% Chez carrefour",
      description: "20% off on your next purchase at Carrefour",
      coupon: "CARREFOUR20",
      points: 200,
    },
    {
      id: 4,
      name: "Free coffee at Starbucks",
      description: "Enjoy a free coffee at Starbucks",
      coupon: "FR33STRBCKS",
      points: 150,
    },
    {
      id: 5,
      name: "Free movie ticket (Nice)",
      description: "Enjoy a free movie ticket at Nice",
      coupon: "NICEMOVIE",
      points: 250,
    },
    {
      id: 6,
      name: "50% off on Amazon",
      description: "50% off on your next purchase at Amazon",
      coupon: "AMAZON50",
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
    setSelectedReward(null);
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
        <p className="text-xl font-bold">Hey {connectedUser?.username}</p>
        <Button
          onClick={() => actions.logout()}
          variant="contained"
          color="primary"
          disableElevation
        >
          Logout
        </Button>
      </div>

      {connectedUser?.role === "benevole" && (
        <>
          <div className="bg-white rounded-lg p-4 mb-6">
            <h1 className="text-xl font-bold mb-4">My score</h1>
            <p className="text-2xl text-center text-bold w-full p-4 rounded-lg ring-blue-300 ring-1 bg-blue-50">
              {score} points
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6">
            <h1 className="text-xl font-bold mb-4">My rewards</h1>
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
                  Details
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4">Available Rewards</h1>
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`flex w-full p-4 bg-blue-100 ${score < reward.points && 'bg-blue-50 text-gray-500'} my-2 rounded-lg items-center justify-between reward-item`}
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
                  {`Claim ${reward.points} pts`}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

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
            {`. \nThis reward costs ${selectedReward?.points} points. Are you sure you want to claim it?`}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenModal(false)}
            sx={{ mt: 2, mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleConfirmClaim}
            sx={{ mt: 2 }}
          >
            Confirm
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
          <Typography id="modal-title" variant="h6" component="h2" sx={{ }}>
            {selectedRewardDetails?.name}
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            {selectedRewardDetails?.description}
          </Typography>
          <Typography id="modal-coupon" sx={{ bgcolor: '#f0f0f0', px: 2, py: 1, borderRadius: 2, textAlign: 'center', fontSize: 24}}>
            <strong>{selectedRewardDetails?.coupon}</strong>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCloseRewardDetails}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {confetti && <Confetti />}
    </div>
  );
};

export default Profile;
