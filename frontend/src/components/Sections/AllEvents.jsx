import React, { useState } from "react";
import Event from "../Cards/Event";
import { useNotifications } from "../../context/NotificationContext";
import { Box, Button, Modal } from "@mui/material";

const AllEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { actions: notify } = useNotifications();
  const events = [
    {
      id: 1,
      title: "Concert de bienfaisance",
      createdAt: "1er janvier 2024 à 12h00",
      author: "Jean Dupont",
      address: "123 rue Principale, Ville imaginaire",
      details: 'Rejoignez-nous pour une soirée magique de musique et de solidarité lors de notre Concert de bienfaisance ! Nous avons préparé un spectacle exceptionnel avec des artistes talentueux, le tout dans le but de lever des fonds pour des œuvres caritatives importantes. Venez nombreux partager cette expérience inoubliable et contribuer à faire une différence positive dans notre communauté. La soirée débutera à midi et se tiendra à l\'adresse 123 rue Principale, Ville imaginaire. Ne manquez pas cette opportunité de faire une action bénéfique tout en appréciant de la bonne musique. Ensemble, faisons une différence !',
      nbrOfParticipants: 15,
    },
    {
      id: 2,
      title: "Collecte de nourriture",
      createdAt: "14 février 2024 à 09h00",
      author: "Marie Martin",
      address: "456 rue Orme, Ville imaginaire",
      details: "Participez à notre Collecte de nourriture et aidez-nous à apporter un peu de réconfort aux personnes dans le besoin ! Cette initiative solidaire vise à rassembler des denrées alimentaires pour soutenir les familles défavorisées de notre communauté. Nous vous invitons à vous joindre à nous le 14 février à 9h00 à l'adresse 456 rue Orme, Ville imaginaire. Chaque contribution compte, alors n'hésitez pas à apporter vos dons généreux. Ensemble, faisons en sorte que personne ne souffre de la faim dans notre ville !",
      nbrOfParticipants: 23,
    },
    {
      id: 3,
      title: "Nettoyage bénévole",
      createdAt: "20 mars 2024 à 10h00",
      author: "Robert Tremblay",
      address: "789 rue Chêne, Ville imaginaire",
      details: 'Joignez-vous à nous pour une matinée de solidarité et d\'impact positif lors de notre Nettoyage bénévole ! Nous sommes déterminés à maintenir notre environnement propre et accueillant pour tous. Venez nombreux le 20 mars à 10h00 à l\'adresse 789 rue Chêne, Ville imaginaire, équipés de votre énergie positive et de vos outils de nettoyage. Ensemble, nous pouvons faire une grande différence dans la préservation de notre belle communauté. N\'oubliez pas que chaque geste compte, même le plus petit. Soyons fiers de prendre soin de notre chez-nous commun. Ensemble, faisons de notre ville un endroit encore meilleur !',
      nbrOfParticipants: 10,
    },
  ];
  

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Event
            onAreaClick={() => {
              setOpenModal(true);
              setSelectedEvent(event);
            }}
            key={event.id}
            id={event.id}
            title={event.title}
            createdAt={event.createdAt}
            author={event.author}
            nbrOfParticipants={event.nbrOfParticipants}
            address={event.address}
          />
        ))}
      </div>
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
          <div className="p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-xl flex-wrap">
                {selectedEvent?.title}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {selectedEvent?.createdAt} par {selectedEvent?.author}
            </p>

            <p className="mb-2 font-medium">📍 {selectedEvent?.address}</p>
            <p className="text-sm text-gray-500 mb-2">
              {selectedEvent?.nbrOfParticipants} participants.
            </p>

            <p className=" mb-2">
              {selectedEvent?.details}
            </p>
          </div>
          <Button
            sx={{ mx: 2, mb: 2 }}
            variant="contained"
            disableElevation
            onClick={() => {
              notify.info(
                `Rendez vous le ${selectedEvent?.createdAt}, a ${selectedEvent?.address} !`
              );
              setOpenModal(false);
            }}
          >
            Rejoindre
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AllEvents;
